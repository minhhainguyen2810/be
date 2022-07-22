const express = require('express')
const db = require('./config/db')
var mongoose = require('mongoose')
const app = express()
var routes = require('./app/routes')
var session = require('express-session')
var cors = require('cors')
var cookieParser = require('cookie-parser')

const PORT = 8080
const HOST = '0.0.0.0'

mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
var database = mongoose.connection
database.on('error', console.error.bind(console, 'connection error:'))
database.once('open', function () {
  app.use(
    cors({
      origin: 'https://minhnguyen-remitano-test-fe.netlify.app',
      credentials: true,
    })
  )
  app.use(cookieParser())
  routes(app)
  app.use(
    session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false,
    })
  )
  app.get('/', (req, res) => {
    res.send('Hello world\n')
  })
  app.listen(process.env.PORT || 5000)

  console.log(`Running on http://${HOST}:${PORT}`)
})
