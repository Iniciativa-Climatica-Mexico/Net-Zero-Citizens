import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import ReviewRouter from './review.routes'
import { validateToken, validateRole } from '../middlewares/auth.middleware'
import { Express } from 'express'

export const initRouterV1 = (app: Express) => {
  // Public Routes
  app.use('/api/v1')
  app.use('/auth', AuthRouter)

  // Middleware
  app.use(validateToken)
  
  // Dummy routes
  app.use('/dummy', DummyRouter)
  app.use('/admin/dummy', validateRole(['admin']), DummyRouter)

  // Private Routes
  app.use('/users', UserRouter)
  app.use('/company', CompanyRouter)
  app.use('/review', ReviewRouter)
}
