import * as express from 'express'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { dbConnection } from '../db-connection'
import { Tweet } from '../entity/Tweet'

// the router
const router = express.Router()

// the paths and functionality
router.get('/tweets', async (req: Request, res: Response) => {
  try {
    const tweets = await dbConnection.getRepository(Tweet).find()

    res.status(StatusCodes.OK).json(tweets)
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
})

export default router
