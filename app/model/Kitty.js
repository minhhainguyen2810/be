var mongoose = require('mongoose')
var KittySchema = new mongoose.Schema({
  name: String
})

KittySchema.methods.speak = function() {
  var greeting = this.name ? 'Meow name is ' + this.name : 'I dont have a name'
  console.log(greeting)
}
mongoose.model('Kitties', KittySchema)

module.exports = mongoose.model('Kitties')
