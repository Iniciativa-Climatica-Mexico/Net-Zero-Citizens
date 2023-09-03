import DotEnv from 'dotenv'
DotEnv.config()

import express from 'express'
import { initRouter } from './src/routes/index.routes'
import { db, initDB } from './src/configs/database.config'

initDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRouter(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
