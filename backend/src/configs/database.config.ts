'use strict'

import { Sequelize } from 'sequelize'
import { bootstrapDB } from './database.bootstrap'

const env = process.env.NODE_ENV || 'development'

let db: Sequelize

if (env === 'production') {
  db = new Sequelize(
    process.env.DB_NAME || 'database',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD,
    {
      dialect: 'sqlite',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      define: {
        freezeTableName: true,
      },
    }
  )
} else {
  console.log('Using development database (In memory)')
  db = new Sequelize('sqlite::memory:', {
    define: {
      freezeTableName: true,
    },
  })
}

const initDB = async () => {
  try {
    console.log(await db.authenticate())
    console.log('Database connected')

    const modules = [
      import('../models/surveys.model'),
      import('../models/questions.model'),
      import('../models/answers.model'),
      import('../models/questionOptions.model'),
    ]

    console.log(await db.sync())
    console.log('Database synchronized')
    if (process.env.NODE_ENV !== 'production') {
      console.log('Bootstrapping database')
      await bootstrapDB()
    }
  } catch (error) {
    console.error('Unable to init connection to DB:', error)
  }
}

export { db, initDB }
