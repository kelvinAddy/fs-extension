const User = require('../Models/user.model')
const bcrypt = require('bcrypt')

exports.get = async (req, res) => {
  const data = await User.find({}).populate('blogs', {
    likes: 0,
    user: 0,
  })
  res.json(data)
}

exports.getById = async (req, res) => {
  const data = await User.findById(req?.params?.id).populate('blogs', {
    likes: 0,
    user: 0,
  })

  if (!data) return res.status(404).json({ error: 'Could not find user' })
  res.json(data)
}

exports.post = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) {
    return res.status(400).json({ error: 'Username or password is missing' })
  }

  const { username, password, name } = req.body

  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be 3 or more characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const savedUser = await User.create({
    username,
    name,
    passwordHash: passwordHash,
  })
  res.status(201).json(savedUser)
}
