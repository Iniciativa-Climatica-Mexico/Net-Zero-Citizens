import User from '../models/users.model'
import Company from '../models/company.model'
import Favourite from '../models/favourite.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

export type FavouriteType = {
  companyId: string
  userId: string
}

/**
 * @brief
 * Función del servicio que agrega un favourite a la base de datos
 * @param params userId, companyId, savedAt
 * @returns Una promesa con la complaint creada
 */

export const addFavourite = async (
  favourite: FavouriteType
): Promise<Favourite> => {
  return await Favourite.create(favourite)
}

/**
 * @brief
 * Función del servicio que busca un favourite en la base de datos
 * @param params favouriteId
 * @returns Una promesa con el favourite buscado
 */

export const getFavouriteById = async (
  favouriteId: string
): Promise<Favourite> => {
  const favourite = await Favourite.findByPk(favouriteId, {
    include: [
      {
        model: Company,
        attributes: ['companyId'],
      },
    ],
  })
  if (favourite) {
    return favourite
  } else {
    throw new Error('Favourite not found')
  }
}

/**
 * @brief
 * Función del servicio que borra un favourite en la base de datos
 * @param params favouriteId
 * @returns Una promesa con los rows afectados
 */

export const deleteFavouriteById = async (
  companyId: string,
  userId: string
): Promise<number> => {
  try {
    return await Favourite.destroy({
      where: { companyId: companyId,
      userId: userId },
    })
  } catch {
    throw new Error('Favourite not found')
  }
}

/**
 * @brief
 * Función del controlador que devuelve todos los favoritos
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 * @returns Una promesa con los objetos de favourite
 */
export const getAllFavouritesByUser = async (
  params: PaginationParams<{ userId: string }>
): Promise<PaginatedQuery<Favourite>> => {
  const { userId } = params
  return Favourite.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      userId: userId,
    },
    include: [
      {
        model: Company,
        as: 'company',
      },
    ],
    order: [['company','name','ASC']]
  })
}
