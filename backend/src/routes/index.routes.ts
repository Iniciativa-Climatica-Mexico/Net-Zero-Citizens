import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import ReviewRouter from './review.routes'
import { Express } from 'express'

export const initRouterV1 = (app: Express) => {
  app.use('/api/v1/dummy', DummyRouter)
  app.use('/api/v1/users', UserRouter)
  app.use('/api/v1/company', CompanyRouter)
  app.use('/api/v1/review', ReviewRouter)
}
