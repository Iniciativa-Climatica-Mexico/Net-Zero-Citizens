import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import ReviewRouter from './review.routes'
import { validateToken, validateRole } from '../middlewares/auth.middleware'
import { Express } from 'express'

export const initRouterV1 = (app: Express) => {
  // Public Routes
  app.use('/api/v1/auth', AuthRouter)

  // Middleware
  app.use(validateToken)
  
  // Dummy routes
  app.use('/api/v1/admin/dummy', validateRole(['admin']), DummyRouter)

  // Private Routes
  app.use('/api/v1/dummy', DummyRouter)
  app.use('/api/v1/users', UserRouter)
  app.use('/api/v1/company', CompanyRouter)
  app.use('/api/v1/review', ReviewRouter)
}
