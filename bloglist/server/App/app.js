const express = require('express')
const path = require('path')
const middleware = require('../App/Middlewares/middleware')
const blogRouter = require('../App/Routes/blog.router')
const userRouter = require('./Routes/user.router')
const loginRouter = require('./Routes/login.router')
const testRouter = require('./Routes/test.router')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')))
}

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
}

app.use(middleware.getToken)
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
