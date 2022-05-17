import { TWEETERR_MODEL_NAME } from './../utils/constants'
import { Schema, model } from 'mongoose'

interface ITweeterr {
  tweet: string
  img: string
}

const schema = new Schema<ITweeterr>({
  tweet: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
})

const TweeterrModel = model<ITweeterr>(TWEETERR_MODEL_NAME, schema)

export default TweeterrModel
