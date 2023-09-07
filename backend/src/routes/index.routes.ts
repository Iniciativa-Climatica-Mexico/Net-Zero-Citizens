import DummyRouter from './dummy.routes'
import CompanyRouter from './company.routes'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/dummy', DummyRouter)
  app.use('/api/v1/company', CompanyRouter)
}
