import DummyRouter from './dummy.routes'
import CompanyRouter from './company.routes'
import AuthRouter from './auth.routes'
import { validateToken } from '../middlewares/auth.middleware'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/auth', AuthRouter)

  app.use(validateToken)
  
  app.use('/dummy', DummyRouter)
  app.use('/company', CompanyRouter)
}
