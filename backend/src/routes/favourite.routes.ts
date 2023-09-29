import express from 'express'
import * as controller from '../controllers/favourite.controller'

const router = express.Router()

router.post('/create', controller.addFavourite)
router.get('/:favouriteId', controller.getFavouriteById)

router.delete('/delete/:favouriteId', controller.deleteFavouriteById)

router.get('/:userId', controller.getAllFavouritesByUser)

export default router
