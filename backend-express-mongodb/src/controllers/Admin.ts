import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'

import Tweeterr from '../models/Tweeterr'

export const getTweets = async (req: Request, res: Response) => {
  try {
    const tweets = await Tweeterr.find()
    res.status(StatusCodes.OK).json(tweets)
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const getTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.id

  // check if id is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' })
  }

  try {
    const tweet = await Tweeterr.findById(tweetId)
    res.status(StatusCodes.OK).json(tweet)
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
  }
}

export const postTweet = async (req: Request, res: Response) => {
  const { tweet, img } = req.body

  try {
    const tweeterr = new Tweeterr({ tweet, img })
    await tweeterr.save()
    res.status(StatusCodes.CREATED).json({ message: 'Tweet created' })
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const updateTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.id

  // check if id is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' })
  }

  const { tweet, img } = req.body

  try {
    const tweetToUpdate = await Tweeterr.findById(tweetId)

    if (!tweetToUpdate) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' })
    }

    tweetToUpdate.tweet = tweet
    tweetToUpdate.img = img
    await tweetToUpdate.save()

    res.status(StatusCodes.OK).json({ message: 'Tweet updated' })
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const deleteTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.id

  checkTweetIdValidity(tweetId, res)

  try {
    const tweetToDelete = await Tweeterr.findById(tweetId)

    if (!tweetToDelete) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' })
    }

    await tweetToDelete.remove()

    res.status(StatusCodes.OK).json({ message: 'Tweet deleted' })
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const checkTweetIdValidity = (tweetId: string, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid id' })
  }
}
