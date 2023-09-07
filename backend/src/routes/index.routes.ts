import DummyRouter from './dummy.routes'
import CompanyRouter from './company.routes'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/company', CompanyRouter)
  app.use('/dummy', DummyRouter)
  app.use('/company', CompanyRouter)
}
