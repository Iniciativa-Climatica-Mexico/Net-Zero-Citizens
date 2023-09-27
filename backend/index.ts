import DotEnv from 'dotenv'
DotEnv.config()

import express from 'express'
import cors from 'cors'
import { initRouterV1 } from './src/routes/index.routes'
import { initDB } from './src/configs/database.config'
import morgan from 'morgan'
import { loadFromJson } from './scripts/loadCompanies'

initDB().then(() => {
  loadFromJson('scripts/parsedCompanies.json')
})

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initRouterV1(app)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
