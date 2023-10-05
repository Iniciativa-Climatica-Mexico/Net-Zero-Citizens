import Favourite from '../models/favourite.model'
import * as FavouriteService from '../services/favourite.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que crea un favourite
 * en la base de datos
 * @param req La request del body
 */

export const addFavourite: RequestHandler = async (req, res) => {
  try {
    const { companyId, userId } = req.body
    if (!userId || !companyId) {
      return res
        .status(400)
        .json({ favouriteId: '', error: 'Missing required data!' })
    }

    const newFavourite = await FavouriteService.addFavourite({
      userId,
      companyId,
    })

    if (!newFavourite) {
      return res
        .status(500)
        .json({ favouriteId: '', error: 'Error creating favourite!' })
    }

    return res.status(201).json({
      favouriteId: newFavourite?.dataValues.favouriteId,
      companyId: newFavourite?.dataValues.companyId,
      message: 'Favourite created',
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ favouriteId: '', error: 'Error creating favourite!' })
  }
}

/**
 * @brief
 * Función del controlador que abstrae un favourite por el id
 * de la base de datos
 * @param req La request el favouriteId
 */

export const getFavouriteById: RequestHandler<
  NoRecord,
  Favourite | { message: string },
  NoRecord,
  { favouriteId: string }
> = async (req, res) => {
  try {
    const favourite = await FavouriteService.getFavouriteById(
      req.params.favouriteId
    )
    if (!favourite) {
      return res.status(400).json({ message: 'Favourite not found!' })
    } else {
      res.json(favourite)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
}

/**
 * @brief
 * Función del controlador que se encarga de eliminar
 * favorito del usuario de la base de datos
 * @param req La request el favouriteId
 */

export const deleteFavouriteById: RequestHandler<
  NoRecord,
  { rows: number; message: string } | { message: string },
  NoRecord,
  { favouriteId: string }
> = async (req, res) => {
  try {
    const rows = await FavouriteService.deleteFavouriteById(
      req.params.favouriteId
    )
    if (!rows) {
      return res.status(400).json({ message: 'Favourite not found!' })
    } else {
      res.status(201).json({
        rows: rows,
        message: 'Favourite deleted',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
}

/**
 * @brief
 * Función del controlador que se encarga de hacer fetch
 * de favoritos de un usuario
 * @param req La request el userId
 * @returns Una response
 */

export const getAllFavouritesByUser: RequestHandler<
  { userId: string },
  Paginator<Favourite> | { message: string },
  NoRecord,
  NoRecord
> = async (req, res) => {
  const { userId } = req.params
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    userId: userId,
  }
  const favourites = await FavouriteService.getAllFavouritesByUser(params)

  try {
    res.json({
      rows: favourites.rows,
      start: params.start,
      pageSize: params.pageSize,
      total: favourites.count,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error favourites not found!' })
  }
}
