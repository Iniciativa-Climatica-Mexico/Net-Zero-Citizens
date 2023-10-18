import Company from '../models/company.model'
import CompanyProduct from '../models/companyProducts.model'
import * as CompanyService from '../services/company.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { Request, Response, RequestHandler } from 'express'
import { Prettify } from '../utils/RequestResponse'

type GetCompaniesQueryParams = Prettify<
  PaginationParams<CompanyService.FiltersGetCompaniesByStatus>
>
/**
 * @brief
 * Función del controlador que devuelve todos los proveedores
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const getAllCompanies: RequestHandler<
  NoRecord,
  Paginator<Company> | { error: string },
  NoRecord,
  GetCompaniesQueryParams
> = async (req, res) => {
  const params = req.query
  params.start = params.start || 0
  params.pageSize = params.pageSize || 1000
  try {
    const companies = await CompanyService.getAllCompanies(params)
    res.json({
      rows: companies.rows,
      start: params.start,
      pageSize: params.pageSize,
      total: companies.count,
    })
  } catch (error) {
    res.status(400).json({ error: 'Error getting users' })
  }
}

/**
 * @brief
 * Obtiene un proveedor por su id y lo devuelve en la respuesta
 * @param req Request con el id del proveedor
 * @param res Response con el proveedor
 */
export const getCompanyById: RequestHandler<
  NoRecord,
  Company | { message: string },
  NoRecord,
  { id: string }
> = async (req, res) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id)

    if (!company) {
      res.status(404).json({ message: 'Company not found' })
    } else {
      res.json(company)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

type GetCompaniesNoStatusQueryParams = Prettify<
  PaginationParams<CompanyService.FiltersGetCompaniesByStatus>
>

/**
 * @brief
 * Función del controlador que devuelve todos los proveedores aprobados de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const getApprovedCompanies: RequestHandler<
  NoRecord,
  Paginator<Company>,
  NoRecord,
  GetCompaniesNoStatusQueryParams
> = async (req, res) => {
  const params = req.query
  params.start = params.start || 0
  params.pageSize = params.pageSize || 1000
  const companies = await CompanyService.getAllCompanies({
    ...params,
    status: 'approved',
  })
  res.json({
    rows: companies.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: companies.count,
  })
}

/**
 * @brief
 * Función del controlador que devuelve todos los proveedores pendientes por aprobar de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const getPendingCompanies: RequestHandler<
  NoRecord,
  Paginator<Company>,
  NoRecord,
  GetCompaniesNoStatusQueryParams
> = async (req, res) => {
  const params = req.query
  params.start = params.start || 0
  params.pageSize = params.pageSize || 1000

  const companies = await CompanyService.getAllCompanies({
    ...params,
    status: 'pending_approval',
  })
  res.json({
    rows: companies.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: companies.count,
  })
}

/**
 * @brief
 * Función del controlador que devuelve todos los proveedores aprovados y con quejas de la base de datos
 * @param _req
 * @param res
 */
export const getApprovedCompaniesWithComplaints: RequestHandler<
  NoRecord,
  CompanyService.CompanyWithComplaints[] | { message: string },
  NoRecord,
  NoRecord
> = async (_req, res) => {
  try {
    const companies = await CompanyService.getApprovedCompaniesWithComplaints()
    if (!companies) {
      res.status(404).json({ message: 'Companies not found' })
    } else {
      const filteredCompanies = companies.filter(
        (company) => company.complaints.length > 0
      )
      res.json(filteredCompanies)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

/**
 * @brief
 * Función del controlador que actualiza a un proveedor de la base de datos
 * @param req
 * @param res
 */
export const updateCompanyInfo: RequestHandler<
  { companyId: string },
  { message: string },
  CompanyService.UpdateCompanyInfoBody
> = async (req, res) => {
  const compId = req.params.companyId
  const companyInfo = await CompanyService.getCompanyById(compId)
  if (companyInfo) {
    await CompanyService.updateCompanyInfo(compId, req.body)
    res.status(201).json({ message: 'Company updated' })
  } else {
    res.status(404).json({ message: 'Company not found' })
  }
}
/**
 * @brief
 * Función del controlador para registrar un nuevo proveedor
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const createCompany: RequestHandler<
  NoRecord,
  { companyId: string; message?: string; error?: string },
  { company: Company },
  NoRecord
> = async (req, res) => {
  try {
    if (!req.body.company)
      return res
        .status(400)
        .json({ companyId: '', error: 'Missing company data' })
    const company = req.body.company

    const newCompany = await CompanyService.createCompany(company)

    if (!newCompany)
      return res
        .status(400)
        .json({ companyId: '', error: 'Error creating company' })

    return res.json({
      companyId: newCompany?.dataValues.companyId,
      message: 'Company created',
    })
  } catch (error) {
    res.status(400).json({ companyId: '', error: 'Error creating company' })
  }
}

/**
 * @brief
 * Función del controlador para añadir un producto a un proveedor
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const addProduct: RequestHandler<
  { companyId: string },
  { message?: string; error?: string },
  { products: string[] },
  NoRecord
> = async (req, res) => {
  try {
    console.log("Request -----", req.body.products, req.params.companyId)
    if (!req.body.products || !req.params.companyId)
      res.status(400).json({
        error: 'Missing company or product data',
      })
    const products = req.body.products
    const companyId = req.params.companyId
    const newCompanyProduct = await CompanyService.addProducts(
      products,
      companyId
    )

    if (!newCompanyProduct)
      res.status(400).json({
        error: 'Error adding product to company',
      })

    res.json({
      message: 'Product added to company',
    })
  } catch (error) {
    res.status(400).json({ error: 'Error adding product to company' })
  }
}

/**
 * @brief
 * Función del controlador que convierte las ubicaciones
 * de los proveedores aprovados a longitudes y latitudes
 * @param req
 * @param res
 */
export const getCoordinatesAndroid: RequestHandler<
  NoRecord,
  CompanyService.FilteredCompany[] | { error: string },
  NoRecord,
  PaginationParams<{ status: string }>
> = async (_req, res) => {
  try {
    const companies =
      await CompanyService.getCompaniesWithCoordinates('approved')

    return res.json(companies)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
/**
 * @brief
 * Función del controlador que convierte las ubicaciones
 * de los proveedores aprovados a longitudes y latitudes
 * @param req
 * @param res
 */
export const getCoordinatesIos: RequestHandler<
  NoRecord,
  Paginator<CompanyService.FilteredCompany>,
  NoRecord,
  NoRecord
> = async (_req, res) => {
  const paginator = await CompanyService.getCoordinatesIos()
  res.json(paginator)
}
/**
 * @brief
 * Función del controller para asignarle un usuario a una compañia
 * @param req La request HTTP al servidor
 * @param res Un resultado de la operación
 */
export const assignCompanyUser: RequestHandler<
  { companyId: string },
  { message: string },
  { userId: string },
  NoRecord
> = async (req, res) => {
  const companyId = req.params.companyId
  const userId = req.body.userId
  const assign = await CompanyService.assignCompanyUser(companyId, userId)
  console.log(assign)
  if (assign === 'success') {
    res.status(200).json({ message: assign })
  } else {
    res.status(400).json({ message: assign })
  }
}
