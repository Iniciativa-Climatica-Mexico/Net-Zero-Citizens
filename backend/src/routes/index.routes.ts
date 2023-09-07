import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/auth', AuthRouter)

  app.use('/dummy', DummyRouter)
  app.use('/company', CompanyRouter)
}
