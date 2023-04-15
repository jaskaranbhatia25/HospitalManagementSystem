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





router.get('/',function(req,res){
    db.getAllabsence(function(err,result){
       
        res.render('absence.ejs',{user : result});
    });
});



router.get('/edit_absence/:leave_id',function(req,res){

    var leave_id = req.params.leave_id;
    db.getabsencebyid(leave_id,function(err,result){
        res.render('edit_absence.ejs',{user:result});
    });
});

router.post('/edit_absence/:leave_id',function(req,res){
    var leave_id = req.params.leave_id;
    db.edit_absence(leave_id,req.body.d_id,req.body.starttime,req.body.endtime,req.body.form,function(err,result){
        res.redirect('/absence');
    });
});

router.get('/delete_absence/:leave_id',function(req,res){
    var leave_id = req.params.leave_id;
    db.getabsencebyid(leave_id,function(err,result){

        res.render('delete_absence.ejs' ,{user : result});
    });
});

router.post('/delete_absence/:leave_id',function(req,res){
    var leave_id = req.params.leave_id;
    
    db.delete_absence(leave_id,function(err,result){
        res.redirect('/absence');
    });

});



router.get('/add_absence',function(req,res){
    res.render('add_absence.ejs');
    
});



router.post('/add_absence', function (req, res) {
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var d_id = req.body.d_id;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var form = req.body.form;
    

    db.add_absence(d_id, starttime, endtime, form, function (err, result) {
        //if(db.add_doctor){
        console.log('leave added successfully!!');
        //}
        res.redirect('/absence');
    });
});

router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchAbsence(key, function (err, result) {
        console.log(result);

        res.render('absence.ejs', { user: result });
    });
});