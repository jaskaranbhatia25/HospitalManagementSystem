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

    db.getAllRecords(function (err, result) {
        
        res.render('d_medical_record.ejs', { list: result })
    });

});



router.get('/d_add_record', function (req, res) {
    
    res.render('d_add_record.ejs');

});

router.post('/d_add_record', function (req, res) {
    console.log('Request body:', req.body);
 
    var p_id = req.body.p_id;
    var date_time = req.body.date_time;
    var a_id = req.body.a_id;
    var case_id = req.body.case_id;
    

    db.add_record(p_id, date_time, a_id, case_id, function (err, result) {
    
        console.log('Medical Record added successfully!!');
      
        res.redirect('/d_medical_record');
    });
});

router.get('/d_edit_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.getRecordsbyId(record_id, function (err, result) {
        res.render('d_edit_record.ejs', { list: result });
    });
});


router.post('/d_edit_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.edit_record(record_id, req.body.p_id, req.body.date_time, req.body.a_id, req.body.case_id, function (err, result) {
        
        res.redirect('/d_medical_record');

    });
});

router.get('/d_delete_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.getRecordsbyId(record_id, function (err, result) {
        res.render('d_delete_record.ejs', { list: result })
    });


});

router.post('/d_delete_record/:record_id', function (req, res) {
    var record_id = req.params.record_id;
    db.delete_record(record_id, function (err, result) {

        res.redirect('/d_medical_record');
    });
});


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchRecord(key, function (err, result) {
        console.log(result);

        res.render('d_medical_record.ejs', { list: result });
    });
});










