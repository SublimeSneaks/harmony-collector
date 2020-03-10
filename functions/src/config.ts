import 'reflect-metadata'

import * as dotenv from 'dotenv'
import * as path from 'path'

import { Connection, ConnectionOptions, createConnection, getConnection } from 'typeorm'

dotenv.config({ path: path.join(__dirname, '../.env') })

export const ormConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  synchronize: true,
  logging: 'all',
  entities: ['lib/entities/**/*.js'],
  ...(process.env.DB_SSL === 'true' && { ssl: true })
}

export const connect = async () => {
  let connection: Connection

  try {
    connection = getConnection(ormConfig.name)
    console.log(connection)
  } catch (err) {
    connection = await createConnection(ormConfig)
  }

  return connection
}
