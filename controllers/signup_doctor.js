var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
var mysql = require("mysql");
var nodemailer = require("nodemailer");
var randomToken = require("random-token");
const { check, validationResult } = require("express-validator");
var  sweetalert = require('sweetalert2');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var db = require.main.require ('./models/db_controller');
module.exports=router;

router.get("/", function (req, res) {
  res.render("signup_doctor.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("first_name").notEmpty().withMessage("First name is required"),
    check("last_name").notEmpty().withMessage("Last Name is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("phone").notEmpty().withMessage("Phone Number is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var email = req.body.email;
    var username = req.body.username;


    db.signup_doctor(
      
      req.body.username,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.address,
      req.body.phone,
    );

  sweetalert.fire('Signup Succesfull');

  res.redirect('/doctor_login');
});

