import express from 'express'

import {
  getTweets,
  getTweet,
  postTweet,
  updateTweet,
  deleteTweet,
} from '../controllers/Admin'

// the router
const router = express.Router()

// the paths
router.get('/tweets', getTweets)
router.get('/tweets/:id', getTweet)
router.post('/tweets', postTweet)
router.put('/tweets/:id', updateTweet)
router.delete('/tweets/:id', deleteTweet)

// the export
export default router
