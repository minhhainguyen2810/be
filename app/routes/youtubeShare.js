var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
var YoutubeShare = require('../model/YoutubeShare')
const auth = require('../middlewares/auth')

router.get('/', (req, res) => {
  YoutubeShare.find((err, shares) => {
    if (err) return console.error(err)
    console.log(shares)
    res.status(200).send(shares)
  })
})

router.post('/', auth, (req, res) => {
  var youtubeShare = new YoutubeShare({
    url: req.body.url,
    sharedBy: req.body.sharedBy,
  })

  youtubeShare.save(function (err, share) {
    if (err) return console.error(err)
    res.status(200).send('Saved successfully' + share)
  })
})

router.put('/:id', auth, (req, res) => {
  YoutubeShare.updateOne(
    { _id: req.params.id },
    { url: req.body.url },
    (err, share) => {
      if (err) return console.error(err)
      res.status(200).send(share)
    }
  )
})

router.delete('/:id', auth, (req, res) => {
  YoutubeShare.find(
    { _id: req.params.id },
    { name: req.body.name },
    (err, share) => {
      if (err) return console.error(err)
      res.status(200).send(share)
    }
  )
})
module.exports = router
