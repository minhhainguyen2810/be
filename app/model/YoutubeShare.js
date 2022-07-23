var mongoose = require('mongoose')
var YoutubeShareSchema = new mongoose.Schema({
  url: String,
  sharedBy: String,
})

mongoose.model('YoutubeShare', YoutubeShareSchema)

module.exports = mongoose.model('YoutubeShare')
