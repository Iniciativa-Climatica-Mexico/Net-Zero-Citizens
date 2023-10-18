import CompanyProducts from '../models/companyProducts.model'
import CompanyFiles from '../models/companyFiles.model'
import { downloadCompanyFile } from './companyFiles.service'
import Product from '../models/products.model'
import Complaint from '../models/complaint.model'
import Review from '../models/review.model'
import { Op, col, fn, literal } from 'sequelize'
import Company from '../models/company.model'
import CompanyProduct from '../models/companyProducts.model'
import {
  PaginationParams,
  PaginatedQuery,
  Paginator,
} from '../utils/RequestResponse'
import { sendNotification } from './notification.service'
import NodeGeocoder from 'node-geocoder'
import User from '../models/users.model'

// TYPES
/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyType = {
  companyId?: string
  name: string
  description: string
  email: string
  phone: string
  webPage?: string | null
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  userId: string | null
  profilePicture?: string | null
  status?: string
}

/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyProductType = {
  companyId: string
  productId: string
  pdfProductCertificationUrl: string
}

/**
 * @brief
 * Tipo de dato para el estatus de la compañia
 */
export type StatusEnum = 'approved' | 'pending_approval' | 'rejected'

/**
 * @brief
 * Función del servicio que devuelve todos los proveedores de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con los proveedores y la información de paginación
 */

export type FilterGetCompanies = {
  ordering?: 'distance' | 'score'
  name?: string
  state?: string
  productName?: 'Paneles Solares' | 'Calentadores Solares'
  latitude?: number // Used for distance ordering
  longitude?: number // Used for distance ordering
}

export type FiltersGetCompaniesByStatus = FilterGetCompanies & {
  status?: StatusEnum
}

/**
 * @brief
 * Función del servicio que devuelve todos los proveedores con el status especificado
 * @params Los parametros de paginación
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const getAllCompanies = async (
  params?: PaginationParams<FiltersGetCompaniesByStatus>
): Promise<PaginatedQuery<Company & { score: number }>> => {
  const { start, pageSize, ordering, name, state, productName, status } =
    params ?? {}

  const filters = []
  if (status)
    filters.push({
      status,
    })

  if (name) filters.push(literal(`LOWER(Company.name) LIKE LOWER('%${name}%')`))

  if (state)
    filters.push(literal(`LOWER(Company.state) LIKE LOWER('%${state}%')`))

  const res = await Company.findAndCountAll({
    // offset: start || 0,
    // limit: pageSize || 1000,
    // Sequelize llora si le pones offset y limit en el join
    where: {
      [Op.and]: filters,
    },
    attributes: {
      include: [[fn('AVG', col('score')), 'score']],
    },
    include: [
      {
        model: Review,
        as: 'reviews',
        attributes: [],
      },
    ],
    order: ordering === 'score' ? literal('score DESC') : undefined,
    group: ['companyId'],
  })

  if (productName) {
    // make an array of false the same length as companies
    const companiesMask = Array(res.rows.length).fill(false)

    await Promise.all(
      res.rows.map(async (company, index) => {
        const products = await CompanyProducts.findAll({
          where: {
            companyId: company.companyId,
          },
          include: [
            {
              model: Product,
              where: {
                name: productName,
              },
            },
          ],
        })
        if (products.length > 0) {
          companiesMask[index] = true
        }
      })
    )

    res.rows = res.rows.filter((_, index) => companiesMask[index])
  }

  if (ordering === 'distance') {
    const { latitude, longitude } = params ?? {}

    if (!latitude || !longitude) {
      throw new Error(
        'Latitude and longitude must be provided for distance ordering'
      )
    }

    const geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    })
    await Promise.all(
      res.rows.map(async (company) => {
        await fetchAndSaveCoordinates(company, geocoder)
      })
    )

    const distances: Record<string, number> = {}
    res.rows.forEach((company) => {
      const { latitude: lat, longitude: lon } = company
      if (!lat || !lon) return Infinity
      distances[company.companyId] = getDistanceFromLatLonInKm(
        lat as number,
        lon as number,
        latitude,
        longitude
      )
    })
    res.rows.sort((a, b) => {
      const distA = distances[a.companyId]
      const distB = distances[b.companyId]
      return distA - distB
    })
  }

  for (const company of res.rows as (Company & { score: number })[]) {
    company.dataValues.score = Number(company.dataValues.score) ?? null
    const companyFiles = await getCompanyFiles(company.companyId)
    const files: CompanyFiles[] = []

    companyFiles?.forEach(async function (file) {
      files.push(file.dataValues)

      // Descargar el archivo y asignarlo a la propiedad del objeto
      /*const downloadedFile = await downloadCompanyFile(
        company.companyId,
        file.fileDescription,
        file.fileFormat
      )
      if (downloadedFile) {
        file.dataValues.fileContent = downloadedFile
      }*/
    })

    company.dataValues.files = files
  }

  return {
    count: res.count.length,
    rows: res.rows as (Company & { score: number })[],
  }
}

/**
 * @brief Función para calcular la distancia entre dos puntos
 * Para mas info: https://www.movable-type.co.uk/scripts/latlong.html
 * @param lat1 Latitud del punto 1
 * @param lon1 Longitud del punto 1
 * @param lat2 Latitud del punto 2
 * @param lon2 Longitud del punto 2
 * @returns Distancia entre los dos puntos en km
 */
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

/**
 * Funcion para convertr grados a radianes
 * @param deg Grados
 * @returns Radianes
 */

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

export type UpdateCompanyInfoBody = {
  name: string
  description: string
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phone: string
  webPage: string
}

export interface FilteredCompany {
  companyId: string
  name: string
  latitude: number
  longitude: number
  profilePicture: string | null
}

export interface CompanyWithComplaints extends Company {
  complaints: Complaint[]
}

/**
 * Function to fetch and save coordinates of a company if they are not already saved
 * @param company Company entity object to fetch coordinates
 * @param geocoder geocoder object to connect to google API
 * @returns Nothing, modiiies the company object
 */
const fetchAndSaveCoordinates = async (
  company: Company,
  geocoder: NodeGeocoder.Geocoder
): Promise<FilteredCompany | null> => {
  const {
    companyId,
    name,
    profilePicture,
    street,
    streetNumber,
    city,
    state,
    zipCode,
    latitude,
    longitude,
  } = company

  if (latitude && longitude) {
    return {
      companyId,
      name,
      latitude,
      longitude,
      profilePicture,
    }
  }

  const address = `${street} ${streetNumber}, ${city}, ${state}, ${zipCode}`

  try {
    const geocodeResult = await geocoder.geocode(address)

    if (geocodeResult.length > 0) {
      const { latitude, longitude } = geocodeResult[0]

      if (!latitude || !longitude) return null

      company.latitude = latitude
      company.longitude = longitude
      await company.save()
      return {
        companyId,
        name,
        latitude,
        longitude,
        profilePicture,
      }
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error al geocodificar la empresa ${company}: ${error}`)
    return null
  }
}

/**
 * Obtiene la ubicacion de una compañia en coordenadas geograficas
 * @param status El estatus de la compañia (solo approved)
 * @param params Los parametros de paginación
 * @returns Promise<FilteredCompany[]> Una promesa con los proveedores
 *          y su ubicacion en coordenadas geograficas
 */
export const getCompaniesWithCoordinates = async (
  status: StatusEnum
): Promise<FilteredCompany[]> => {
  const companies = await getAllCompanies({ status })
  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
  })

  const companiesWithCoordinates = await Promise.all(
    companies.rows.map(
      async (company) => await fetchAndSaveCoordinates(company, geocoder)
    )
  )
  return companiesWithCoordinates.filter(Boolean) as FilteredCompany[]
}

export const getCoordinatesIos = async (): Promise<
  Paginator<FilteredCompany>
> => {
  const companies = await getAllCompanies({ status: 'approved' })

  // Configura el geocoder con tu clave de API
  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
  })

  const companiesWithCoordinates = await Promise.all(
    companies.rows.map(
      async (company) => await fetchAndSaveCoordinates(company, geocoder)
    )
  )

  // Filtra las empresas que no pudieron geocodificarse
  const filteredCompanies = companiesWithCoordinates.filter(
    (company) => company !== null
  )

  const filteredCompaniesTyped: FilteredCompany[] = filteredCompanies.filter(
    (company): company is FilteredCompany => company !== null
  )

  for (const company of filteredCompaniesTyped) {
    company.latitude = Number(company.latitude)
    company.longitude = Number(company.longitude)
  }

  const paginator: Paginator<FilteredCompany> = {
    rows: filteredCompaniesTyped,
    start: 0,
    pageSize: filteredCompanies.length,
    total: filteredCompanies.length,
  }
  return paginator
}

/**
 * @brief
 * Actualiza en la base de datos el proveedor con los datos pasados en los parametros
 * @param companyId
 * @param newCompanyInfo
 * @returns Una promesa de la actualización del proveedor en la base de datos.
 */
export const updateCompanyInfo = async (
  companyId: string,
  newCompanyInfo: UpdateCompanyInfoBody
): Promise<Company | null> => {
  const companyInfo = await Company.findByPk(companyId)
  if (companyInfo) {
    await companyInfo.update(newCompanyInfo)
    if (newCompanyInfo.status === 'approved') {
      await sendNotification(
        'Aprobado',
        'Tu compañia ha sido aprobada',
        `${process.env.AWS_ARN}`,
        companyId
      )
    } else if (newCompanyInfo.status === 'rejected') {
      await sendNotification(
        'Rechazado',
        'Tu compañia ha sido rechazada',
        `${process.env.AWS_ARN}`,
        companyId
      )
    }
    return companyInfo
  } else {
    return null
  }
}

/**
 * @brief
 * Función del servicio para crear una nueva compañia
 * @param company La compañia a crear
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const createCompany = async (
  company: CompanyType
): Promise<Company | null> => {
  return await Company.create(company)
}

/**
 * @brief
 * Función del servicio para crear asociar un producto a una compañia
 * @param CompanyProduct La información de la asociación (companyId, productId, pdfProductCertificationUrl)
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const addProducts = async (
  products: string[],
  companyId: string
): Promise<(CompanyProduct | null)[]> => {
  return await Promise.all(
    products.map(async (productName) => {
      const product = await Product.findOne({
        where: {
          name: productName,
        },
      })

      if (!product) return null

      let companyProduct = await CompanyProducts.findOne({
        where: {
          companyId: companyId,
          productId: product.productId,
        },
      })

      if (companyProduct) {
        // Si el producto ya existe para la compañía, actualízalo
        companyProduct.pdfProductCertificationUrl = ''
        await companyProduct.save()
      } else {
        // Si no existe, créalo
        companyProduct = await CompanyProducts.create({
          companyId: companyId,
          productId: product.productId,
          pdfProductCertificationUrl: '',
        })
      }

      return companyProduct
    })
  )
}

/**
 * @brief
 * Obtiene un proveedor por su id y lo devuelve en la respuesta. Si no
 * existe el proveedor, devuelve null. Añade la puntuación media del proveedor
 * y los productos que vende
 * @param id Id del proveedor a buscar
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const getCompanyById = async (id: string): Promise<Company | null> => {
  const company = await Company.findByPk(id)
  const companyScore = await getCompanyScore(id)
  const companyProducts = await getCompanyProducts(id)
  const companyFiles = await getCompanyFiles(id)
  const rating = Math.round(companyScore?.[0].getDataValue('score') * 10) / 10
  const comment = companyScore?.[0].getDataValue('review')
  const products: Product[] = []
  const files: CompanyFiles[] = []

  companyProducts?.forEach(function (product) {
    products.push(product.getDataValue('product').dataValues)
  })

  companyFiles?.forEach(function (file) {
    files.push(file.dataValues)
  })

  company?.setDataValue('products', products)
  company?.setDataValue('score', rating)
  company?.setDataValue('oneComment', comment)
  company?.setDataValue('files', files)

  return company
}

/**
 * @brief
 * Valida si el usuario tiene una compañia asignada
 * @param uuid Id del usuario
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const getCompanyByUserId = async (
  uuid: string
): Promise<Company | null> => {
  const company = await Company.findOne({
    where: {
      userId: uuid,
    },
  })

  return company
}

/**
 * @brief
 * Desasigna un usuario de una compañia
 * @param uuid Id del usuario
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const unbindUserFromCompany = async (
  uuid: string
): Promise<Company | null> => {
  const company = await Company.findOne({
    where: {
      userId: uuid,
    },
  })

  if (company) {
    company.userId = null
    await company.save()
  }

  return company
}

const getCompanyFiles = async (id: string): Promise<CompanyFiles[] | null> => {
  return await CompanyFiles.findAll({
    where: {
      companyId: id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
}

export const getApprovedCompaniesWithComplaints = async (): Promise<
  Company[] | null
> => {
  return await Company.findAll({
    where: {
      status: 'approved',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Complaint,
        where: {
          complaintStatus: 'active',
        },
        attributes: {
          exclude: ['updatedAt'],
        },
      },
    ],
  })
}

const getCompanyProducts = async (
  id: string
): Promise<CompanyProducts[] | null> => {
  return await CompanyProducts.findAll({
    where: {
      companyId: id,
    },
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
}

const getCompanyScore = async (id: string): Promise<Review[] | null> => {
  return await Review.findAll({
    where: {
      companyId: id,
    },
    attributes: {
      include: [[fn('AVG', col('score')), 'score'], 'review'],
      exclude: [
        'score',
        'review',
        'reviewId',
        'userId',
        'createdAt',
        'updatedAt',
      ],
    },
  })
}

type assignCompanyUserResponse =
  | 'success'
  | 'El usuario ya tiene una compañía asignada'
  | 'La compañía ya tiene un usuario asignado'
  | 'La companía no existe'
  | 'El usuario no existe'
  | 'Error no esperado'

/**
 * @brief
 * Función del servicio para asignarle un usuario a una compañia
 * @param req La request HTTP al servidor
 * @param res Un resultado de la operación
 */
export const assignCompanyUser = async (
  companyId: string,
  userId: string
): Promise<assignCompanyUserResponse> => {
  try {
    const user = await User.findByPk(userId)
    if (!user) return 'El usuario no existe'
    if (user.companyId !== null)
      return 'El usuario ya tiene una compañía asignada'

    const company = await Company.findByPk(companyId)
    if (!company) return 'La companía no existe'
    if (company.userId !== null)
      return 'La compañía ya tiene un usuario asignado'

    company.userId = userId
    user.companyId = companyId
    user.roleId = 'COMAPNY_ROLE_ID'

    await company.save()
    try {
      await user.save()
    } catch (error) {
      console.log(error)
    }
    return 'success'
  } catch (error) {
    console.log(error)
    return 'Error no esperado'
  }
}
