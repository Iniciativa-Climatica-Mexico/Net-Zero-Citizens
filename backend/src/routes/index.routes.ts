import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import ReviewRouter from './review.routes'
import ProducRouter from './product.routes'
import { validateToken, validateRole } from '../middlewares/auth.middleware'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/auth', AuthRouter)

  // Middleware
  app.use(validateToken)
  
  // Dummy routes
  app.use('/api/v1/admin/dummy', validateRole(['admin']), DummyRouter)

  // Private Routes
  app.use('/api/v1/dummy', DummyRouter)
  app.use('/api/v1/users', UserRouter)
  app.use('/api/v1/company', CompanyRouter)
  app.use('/api/v1/review', ReviewRouter)
  app.use('/api/v1/product', ProducRouter)
}
