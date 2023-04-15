var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bodyParser = require('body-parser');
// var multer = require ('multer');
var fs = require('fs');
var path = require('path');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var db = require.main.require('./models/db_controller');
module.exports = router;

router.get('*', function (req, res, next) {
    if (req.cookies['username'] == null) {
        res.redirect('/doctor_login');
    } else {
        next();
    }
});



router.get('/', function (req, res) {

    db.getAllCase(function (err, result) {
        //
        res.render('d_case.ejs', { list: result })
    });

});



router.get('/d_add_case', function (req, res) {
    
    res.render('d_add_case.ejs');

});

router.post('/d_add_case', function (req, res) {
    console.log('Request body:', req.body);
    var date = req.body.date;
    var time = req.body.time;
    var d_id = req.body.d_id;
    var info = req.body.info;
 

    db.add_case(date, time, d_id, info, function (err, result) {
        
        console.log('Case added successfully!!');
       
        res.redirect('/d_case');
    });
});




router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchCase(key, function (err, result) {
        console.log(result);

        res.render('d_case.ejs', { list: result });
    });
});










