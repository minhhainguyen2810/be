const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

const verifyToken = (req, res, next) => {
  const reqToken =
    req.body.token || req.headers['x-access-token'] || req.cookies.token

  if (!reqToken) {
    res.status(403).send('Missing tokens')
  }

  try {
    const decoded = jwt.verify(reqToken, config.secret)
    req.user = decoded
  } catch (error) {
    console.log(error)
    res.status(401).send('Invalid tokens')
  }

  next()
}

module.exports = verifyToken
