var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

UserSchema.pre('save', function(next) {
  var user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})
module.exports = mongoose.model('User', UserSchema)
