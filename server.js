const express = require('express')
const db = require('./config/db')
var mongoose = require('mongoose')
const app = express()
var routes = require('./app/routes')
var session = require('express-session')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var path = require('path')

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
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })
  // app.get('/', (req, res) => {
  //   res.send('Hello world\n')
  // })
  app.listen(process.env.PORT || 5000)

  console.log(`Running on http://${HOST}:${PORT}`)
})
