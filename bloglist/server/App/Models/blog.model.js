const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform: (doc, resObj) => {
        resObj.id = resObj._id.toString();
        delete resObj._id;
        delete resObj.__v;
      },
    },
  },
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
