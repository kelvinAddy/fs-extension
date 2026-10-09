const logger = require('../Utils/logger')
const User = require('../Models/user.model')
const jwt = require('jsonwebtoken')

const getToken = (req, res, next) => {
  const authorization = req.get('authorization')
  req.token = null
  if (authorization && authorization.startsWith('Bearer')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token is invalid' })
  }
  const fetchedUser = await User.findById(decodedToken.id)
  req.user = fetchedUser

  next()
}

const requestLogger = (req, res, next) => {
  logger.info('METHOD :', req.method)
  logger.info('PATH :', req.path)
  logger.info('BODY :', req.body)
  logger.info('----')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, req, res, next) => {
  switch (true) {
    case error.name === 'CastError':
      return res.status(500).json({ error: 'Malformed Id' })

    case error.name === 'ValidationError':
      return res.status(400).json(error.message)

    case error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'):
      return res.status(400).json({ error: 'username must be unique' })

    case error.name === 'JsonWebTokenError': {
      return res.status(401).json({ error: 'token is missing or invalid' })
    }
    case error.name === 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' })

    default:
      next(error)
  }
}

module.exports = {
  getToken,
  userExtractor,
  unknownEndpoint,
  errorHandler,
  requestLogger,
}
