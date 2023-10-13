import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import SurveyRouter from './survey.routes'
import ReportRouter from './report.routes'
import ReviewRouter from './review.routes'
import ProducRouter from './product.routes'
import EcofinfoRouter from './ecoinfo.routes'
import ComplaintRouter from './complaints.routes'
import FavouriteRouter from './favourite.routes'
import { validateToken } from '../middlewares/auth.middleware'
import { Express } from 'express'

export const initRouterV1 = (app: Express) => {
  // Public Routes
  app.use('/api/v1/auth', AuthRouter)

  // Middleware
  app.use(validateToken)

  // Private Routes
  app.use('/api/v1/users', UserRouter)
  app.use('/api/v1/company', CompanyRouter)
  app.use('/api/v1/survey', SurveyRouter)
  app.use('/api/v1/review', ReviewRouter)
  app.use('/api/v1/product', ProducRouter)
  app.use('/api/v1/ecoinfo', EcofinfoRouter)
  app.use('/api/v1/report', ReportRouter)
  app.use('/api/v1/complaints', ComplaintRouter)
  app.use('/api/v1/favourites', FavouriteRouter)
}
