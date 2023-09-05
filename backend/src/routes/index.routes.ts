import DummyRouter from './dummy.routes'
import UserRouter from './users.routes'
import { Express } from 'express'

export const initRouter = (app: Express) => {
  app.use('/dummy', DummyRouter)
}

export const initUserRouter = (app: Express) => {
  app.use('/users', UserRouter)
}