import { POSTGRES_PORT } from './utils/constants'
import { DataSource } from 'typeorm'

export const dbConnection: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: POSTGRES_PORT,
  username: process.env.POSTGRES_USER || 'tweeterr',
  password: process.env.POSTGRES_PASSWORD || 'tweeterr',
  database: 'tweeterr',
  entities: [__dirname + '/entity/*.ts'],
  // [__dirname + '../dist/src/entity/*.js'],
  synchronize: true,
  logging: true,
})
