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
    

    db.getAllCase(function (err, result) {
        
      
        res.render('cases.ejs', { list: result })
    });


});






router.get('/add_case', function (req, res) {
    db.getAllDoc(function (err, doctors) {

        if (err) {
            console.log(err);
        } else {
            res.render('add_case.ejs', {doctors: doctors});
        }
})
});

// router.get('/add_case',function(req,res){

//     res.render('add_case.ejs');
  
// });

router.post('/add_case', function (req, res) {
    console.log('Request body:', req.body);
  
    var date = req.body.date;
    var time = req.body.time;
    var d_id = req.body.d_id;
    var info = req.body.info;

    db.add_case(date, time, d_id, info, function (err, result) {
   
        console.log('Case added successfully!!');

        res.redirect('/cases');
    });
});

router.get('/edit_case/:case_id', function (req, res) {
    var case_id = req.params.case_id;
    db.getAllDoc(function (err, doctors) {
        db.getCasebyId(case_id, function (err, result) {
            console.log(result);
            res.render('edit_case.ejs', { list: result, doctors: doctors });
    });
});
});


router.post('/edit_case/:case_id', function (req, res) {
    var case_id = req.params.case_id;

    db.editCase(case_id, req.body.date, req.body.time, req.body.d_id, req.body.info, function (err, result) {
        
        res.redirect('/cases');

    });
});

router.get('/delete_case/:case_id', function (req, res) {
    var case_id = req.params.case_id;
    db.getCasebyId(case_id, function (err, result) {
        res.render('delete_case.ejs', { list: result })
    });


});

router.post('/delete_case/:case_id', function (req, res) {
    var case_id = req.params.case_id;
    db.deleteCase(case_id, function (err, result) {

        res.redirect('/cases');
    });
});






router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchCase(key, function (err, result) {
        console.log(result);

        res.render('cases.ejs', { list: result });
    });
});










