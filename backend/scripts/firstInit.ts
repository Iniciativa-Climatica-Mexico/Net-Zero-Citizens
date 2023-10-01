import { Sequelize } from 'sequelize-typescript'
import { bootstrapDB } from '../src/configs/database.bootstrap'
import DotEnv from 'dotenv'

DotEnv.config()
const db = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  {
    dialect: 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    define: {
      freezeTableName: true,
    },
  }
)

db.addModels([
  __dirname + '/../**/*.model.ts',
  __dirname + '/../**/*.model.js',
])

const init = async () => {
  try {
    await db.authenticate()
    console.log('Database connected')
    await db.sync({
      force: true,
    })
    console.log('Database synchronized')
    console.log('Bootstrapping database')
    await bootstrapDB()
  } catch (error) {
    console.error('Unable to init connection to DB:', error)
  }
}

init()
