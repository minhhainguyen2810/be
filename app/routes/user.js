var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var User = require('../model/User')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../../config/auth')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', (req, res) => {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    function (err, user) {
      if (err) return console.error(err)
      res.status(200).send('Saved successfully\n' + user)
    }
  )
})

router.get('/all', async (req, res) => {
  User.find()
    .select('-password')
    .then((users) => {
      res.status(200).send(users)
    })
})

router.post('/authenticate', async (req, res) => {
  const reqToken =
    req.body.token || req.headers['x-access-token'] || req.cookies.token
  let user
  if (!reqToken && !req.body.username)
    return res.status(401).send('something went wrong')
  if (reqToken) {
    try {
      const decoded = jwt.verify(reqToken, config.secret)
      console.log(decoded)
      user = await User.findOne({ _id: decoded.userId })
      user = user.toObject()
      const { password, ...userWithOutPassword } = user
      return res.send({ ...userWithOutPassword })
    } catch (error) {
      console.log(error)
      res.status(401).send('Invalid tokens')
    }
  } else {
    user = await User.findOne({ username: req.body.username })
    user = user.toObject()
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const { password, ...userWithOutPassword } = user
      console.log(user)
      const token = jwt.sign(
        { userId: user._id, expiresIn: '24h' },
        config.secret
      )

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      })
      return res.send({ ...userWithOutPassword, token })
    }
  }

  return res.status(401).send('failed to authenticate')
})

module.exports = router
