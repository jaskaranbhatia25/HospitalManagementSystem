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

    db.getAllRecords(function (err, result) {
        // if(err)
        // throw err;
        res.render('medical_record.ejs', { list: result })
    });

});


//router.use(bodyParser.urlencoded({extended : true}));
//router.use(bodyParser.json());

router.get('/add_record', function (req, res) {
    // db.getalldept(function(err,result){
    res.render('add_record.ejs');
    // });
});

router.post('/add_record', function (req, res) {
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var p_id = req.body.p_id;
    var date_time = req.body.date_time;
    var a_id = req.body.a_id;
    var case_id = req.body.case_id;
    

    db.add_record(p_id, date_time, a_id, case_id, function (err, result) {
        //if(db.add_doctor){
        console.log('Medical Record added successfully!!');
        //}
        res.redirect('/medical_record');
    });
});

router.get('/edit_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.getRecordsbyId(record_id, function (err, result) {
        res.render('edit_record.ejs', { list: result });
    });
});


router.post('/edit_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.edit_record(record_id, req.body.p_id, req.body.date_time, req.body.a_id, req.body.case_id, function (err, result) {
        // if (err) throw err;

        //res.render('edit_doctor.ejs',{list:result});
        res.redirect('/medical_record');

    });
});

router.get('/delete_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.getRecordsbyId(record_id, function (err, result) {
        res.render('delete_record.ejs', { list: result })
    });


});

router.post('/delete_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.delete_record(record_id, function (err, result) {

        res.redirect('/medical_record');
    });
});


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchRecord(key, function (err, result) {
        console.log(result);

        res.render('medical_record.ejs', { list: result });
    });
});










