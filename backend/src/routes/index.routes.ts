import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import ReviewRouter from './review.routes'
import { Express } from 'express'

export const initRouterV1 = (app: Express) => {
  app.use('/api/v1')

  app.use('/dummy', DummyRouter)
  app.use('/users', UserRouter)
  app.use('/company', CompanyRouter)
  app.use('/review', ReviewRouter)
}
