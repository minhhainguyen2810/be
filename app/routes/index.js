const kittyRoutes = require('./kitty')
const userRoutes = require('./user')
const youtubeShare = require('./youtubeShare')

module.exports = function (app) {
  app.use('/kitty', kittyRoutes)
  app.use('/user', userRoutes)
  app.use('/youtubeShare', youtubeShare)
}
