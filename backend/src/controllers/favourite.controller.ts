import { timestamp } from 'aws-sdk/clients/cloudfront'
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
    const { companyId, userId, savedAt } = req.body
    if (!userId || !companyId || !savedAt) {
      return res
        .status(400)
        .json({ favouriteId: '', error: 'Missing required data!' })
    }

    const newFavourite = await FavouriteService.addFavourite({
      userId,
      companyId,
      savedAt,
    })

    if (!newFavourite) {
      return res
        .status(500)
        .json({ favouriteId: '', error: 'Error creating favourite!' })
    }

    return res.status(201).json({
      favouriteId: newFavourite?.dataValues.favouriteId,
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
    const favourite = await FavouriteService.existsFavourite(
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
  Number | { message: string },
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
      res.json(rows)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
}