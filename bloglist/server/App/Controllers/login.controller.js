const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const comaparePassword = async (x, y) => {
  return bcrypt.compare(x, y);
};

exports.post = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) {
    return res.status(400).json({ error: 'Username or password is missing' });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await comaparePassword(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Username or password incorrect' });
  }

  const userForToken = {
    username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  res.status(200).send({ token, username: user.username, name: user.name });
};
