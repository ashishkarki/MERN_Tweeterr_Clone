import * as express from 'express'
import * as dotenv from 'dotenv'

import { dbConnection } from './db-connection'
import { POSTGRES_PORT } from './utils/constants'

import adminRouter from './routes/Admin'

// Load environment variables from .env file
dotenv.config()

// the app finally
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// the routes
app.use('/', adminRouter)

// the connection to the database and listening
const port = process.env.EXPRESS_PORT || 8081
dbConnection
  .initialize()
  .then(() => {
    console.log(`Connected to postgres on port ${POSTGRES_PORT}`)
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch((err) => console.log(`Error connecting to postgres: ${err}`))
