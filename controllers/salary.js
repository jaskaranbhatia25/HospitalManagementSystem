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

    db.getAllsalary(function (err, result) {
        // if(err)
        // throw err;
        res.render('salary.ejs', { list: result })
    });

});




router.get('/add_salary', function (req, res) {
    res.render('add_salary.ejs');
   
});

router.post('/add_salary', function (req, res) {
    console.log('Request body:', req.body);
  
    var amount = req.body.amount;
    var d_id = req.body.d_id;

    db.add_salary(amount,d_id, function (err, result) {
        
        console.log('Salary added successfully!!');
       
        res.redirect('/salary');
    });
});

router.get('/edit_salary/:salary_id', function (req, res) {
    var salary_id = req.params.salary_id;
    db.getsalarybyId(salary_id, function (err, result) {
        res.render('edit_salary.ejs', { list: result });
    });
});


router.post('/edit_salary/:salary_id', function (req, res) {
    var salary_id = req.params.salary_id;
    db.edit_salary(salary_id, req.body.amount,req.body.d_id,function (err, result) {
        // if (err) throw err;

        //res.render('edit_doctor.ejs',{list:result});
        res.redirect('/salary');

    });
});

router.get('/delete_salary/:salary_id', function (req, res) {
    var salary_id = req.params.salary_id;
    db.getsalarybyId(salary_id, function (err, result) {
        res.render('delete_salary.ejs', { list: result })
    });


});

router.post('/delete_salary/:salary_id', function (req, res) {
    var salary_id = req.params.salary_id;
    db.delete_salary(salary_id, function (err, result) {

        res.redirect('/salary');
    });
});







// //  router.get('/search',function(req,res){
// //      res.rende
// //      var key = req.body.search;
// //      console.log(key);
// //     db.searchDoc(key,function(err, rows, fields) {
// //         if (err) throw err;
// //       var data=[];
// //       for(i=0;i<rows.length;i++)
// //         {
// //           data.push(rows[i].first_name);
// //         }
// //         res.end(JSON.stringify(data));
// //       });
// //     });


// // router.get('/',function(req,res){

//     db.getAllDoc(function(err,result){
//         if(err)
//         throw err;
//         res.render('doctors.ejs',{list : result})
//     });

// });


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.search_salary(key, function (err, result) {
        console.log(result);

        res.render('salary.ejs', { list: result });
    });
});










