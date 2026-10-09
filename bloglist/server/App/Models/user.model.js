const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    validate: {
      validator: (path) => path.length >= 3,
      message: (props) => `username must be atleast 3 characters long`,
    },
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, resObj) => {
    resObj.id = resObj._id.toString();
    delete resObj._id;
    delete resObj.__v;
    delete resObj.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
