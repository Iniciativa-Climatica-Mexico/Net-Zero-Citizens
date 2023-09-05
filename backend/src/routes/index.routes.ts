import DummyRouter from './dummy.routes'
import UserRouter from './user.routes'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/dummy', DummyRouter)
  app.use('/api/v1/users', UserRouter)
}
