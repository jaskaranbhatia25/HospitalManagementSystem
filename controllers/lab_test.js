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
        res.redirect('/admin_login');
    } else {
        next();
    }
});






router.get('/', function (req, res) {

    db.getAllTests(function (err, result) {
        // if(err)
        // throw err;
        res.render('lab_test.ejs', { list: result })
    });

});




router.get('/add_test', function (req, res) {
 
    res.render('add_test.ejs');

});

router.post('/add_test', function (req, res) {
    console.log('Request body:', req.body);
;
    var record_id = req.body.record_id;
    var type_of_tests = req.body.type_of_tests;
  

    

    db.add_test(record_id, type_of_tests, function (err, result) {
   
        console.log('Lab Tests added successfully!!');
    
        res.redirect('/lab_test');
    });
});

router.get('/edit_test/:test_id', function (req, res) {
    var test_id = req.params.test_id;
    db.getTestsbyId(test_id, function (err, result) {
        res.render('edit_test.ejs', { list: result });
    });
});


router.post('/edit_test/:test_id', function (req, res) {
    var test_id = req.params.test_id;
    db.edit_test(test_id, req.body.record_id, req.body.type_of_tests, function (err, result) {
        res.redirect('/lab_test');

    });
});

router.get('/delete_test/:test_id', function (req, res) {
    var test_id = req.params.test_id;
    db.getTestsbyId(test_id, function (err, result) {
        res.render('delete_test.ejs', { list: result })
    });


});

router.post('/delete_test/:test_id', function (req, res) {
    var test_id = req.params.test_id;
    db.delete_test(test_id, function (err, result) {

        res.redirect('/lab_test');
    });
});


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchTest(key, function (err, result) {
        console.log(result);

        res.render('lab_test.ejs', { list: result });
    });
});










