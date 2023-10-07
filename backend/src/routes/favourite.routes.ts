import express from 'express'
import * as controller from '../controllers/favourite.controller'

const router = express.Router()

router.post('/create', controller.addFavourite)
router.get('/:favouriteId', controller.getFavouriteById)

router.delete('/delete/:companyId/user/:userId', controller.deleteFavouriteById)

router.get('/user/:userId', controller.getAllFavouritesByUser)

export default router
