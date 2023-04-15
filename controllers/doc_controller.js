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

    db.getAllDoc(function (err, result) {
        // if(err)
        // throw err;
        res.render('doctors.ejs', { list: result })
    });

});


//router.use(bodyParser.urlencoded({extended : true}));
//router.use(bodyParser.json());

router.get('/add_doctor', function (req, res) {
    // db.getalldept(function(err,result){
    res.render('add_doctor.ejs');
    // });
});

router.post('/add_doctor', function (req, res) {
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var username = req.body.username;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;

    db.add_doctor(username, password, first_name, last_name, email, address, phone, function (err, result) {
        //if(db.add_doctor){
        console.log('Doctor added successfully!!');
        //}
        res.redirect('/doctors');
    });
});

router.get('/edit_doctor/:d_id', function (req, res) {
    var d_id = req.params.d_id;
    db.getDocbyId(d_id, function (err, result) {
        res.render('edit_doctor.ejs', { list: result });
    });
});


router.post('/edit_doctor/:d_id', function (req, res) {
    var d_id = req.params.d_id;
    db.editDoc(d_id, req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.address, req.body.phone, function (err, result) {
        // if (err) throw err;

        //res.render('edit_doctor.ejs',{list:result});
        res.redirect('/doctors');

    });
});

router.get('/delete_doctor/:d_id', function (req, res) {
    var d_id = req.params.d_id;
    db.getDocbyId(d_id, function (err, result) {
        res.render('delete_doctor.ejs', { list: result })
    });


});

router.post('/delete_doctor/:d_id', function (req, res) {
    var d_id = req.params.d_id;
    db.deleteDoc(d_id, function (err, result) {

        res.redirect('/doctors');
    });
});






router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchDoc(key, function (err, result) {
        console.log(result);

        res.render('doctors.ejs', { list: result });
    });
});










