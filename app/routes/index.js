const kittyRoutes = require('./kitty')
const userRoutes = require('./user')

module.exports = function(app) {
  app.use('/kitty', kittyRoutes)
  app.use('/user', userRoutes)
}
