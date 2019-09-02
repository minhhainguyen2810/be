var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Kitten = require("../model/Kitty");

router.get("/", (req, res) => {
  Kitten.find((err, kittens) => {
    const a = "asd";
    if (err) return console.error(err);
    res.status(200).send(kittens);
  });
});

router.post("/", (req, res) => {
  var fluffy = new Kitten({ name: req.body.name });
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function(err, fluffy) {
    if (err) return console.error(err);
    res.status(200).send("Saved successfully" + fluffy);
  });
});

router.put("/:id", (req, res) => {
  Kitten.updateOne(
    { _id: req.params.id },
    { name: req.body.name },
    (err, kitten) => {
      if (err) return console.error(err);
      res.status(200).send(kitten);
    }
  );
});

router.delete("/:id", (req, res) => {
  Kitten.find(
    { _id: req.params.id },
    { name: req.body.name },
    (err, kitten) => {
      if (err) return console.error(err);
      res.status(200).send(kitten);
    }
  );
});
module.exports = router;
