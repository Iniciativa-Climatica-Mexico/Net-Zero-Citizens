import DotEnv from 'dotenv'
DotEnv.config()

import express from 'express'
import { initRouterV1 } from './src/routes/index.routes'
import { initDB } from './src/configs/database.config'
import morgan from 'morgan'

initDB()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRouterV1(app)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
