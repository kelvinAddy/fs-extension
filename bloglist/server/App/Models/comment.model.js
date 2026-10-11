const mongoose = require('mongoose')

const commentScehma = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 3,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform: (doc, resObj) => {
        resObj.id = resObj._id.toString()
        delete resObj._id
        delete resObj.__v
      },
    },
  },
)

const Comment = mongoose.model('Comment', commentScehma)

module.exports = Comment
