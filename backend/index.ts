import DotEnv from 'dotenv'
DotEnv.config()

import express from 'express'
import cors from 'cors'
import { initRouterV1 } from './src/routes/index.routes'
import { initDB } from './src/configs/database.config'
import morgan from 'morgan'
import { loadFromJson } from './scripts/loadCompanies'
import { cronEcoInfo, fetchEcoInfo } from './src/services/ecoinfo.service'

initDB().then(() => {
  if (process.env.NODE_ENV === 'development')
    loadFromJson('scripts/parsedCompanies.json')
})

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRouterV1(app)

cronEcoInfo.start()
fetchEcoInfo()

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
