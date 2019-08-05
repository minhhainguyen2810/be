var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Kitten = require("../model/Kitty");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

router.get("/", (req, res) => {
  Kitten.find((err, kittens) => {
    if (err) return console.error(err);
    res.status(200).send(kittens);
  });
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://minhhainguyen.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "https://test-api",
  issuer: "https://minhhainguyen.auth0.com/",
  algorithms: ["RS256"]
});

router.use(checkJwt);

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
