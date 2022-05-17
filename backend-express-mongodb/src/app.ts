import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import adminRouter from './routes/Admin'

// Load environment variables from .env file
dotenv.config()
// console.log(`Environment variables: ${JSON.stringify(process.env)}`)

// the app finally
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// if you are confused like me: https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(express.urlencoded({ extended: false }))

// the routes
app.use('/', adminRouter)

// the connection to the database and listening
const port = process.env.EXPRESS_PORT || 8080
mongoose
  .connect(`${process.env.DB_HOST_DOCKER}`)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`))
