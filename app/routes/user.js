var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var User = require("../model/User");
// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
// var config = require("../../config/auth");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/register", (req, res) => {
  User.create(
    { name: req.body.name, email: req.body.email, password: req.body.password },
    function(err, user) {
      if (err) return console.error(err);
      res.status(200).send("Saved successfully\n" + user);
    }
  );
});

module.exports = router;
