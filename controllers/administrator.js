var express = require('express');
var router = express.Router();
var mysql =require('mysql');
const bodyParser = require('body-parser');
// var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var db = require.main.require ('./models/db_controller');
module.exports = router;

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/admin_login');
	}else{
		next();
	}
});






router.get('/',function(req,res){

    db.getAllAdministrator(function(err,result){
        // if(err)
        // throw err;
        res.render('administrator.ejs',{list : result})
    });
    
});


//router.use(bodyParser.urlencoded({extended : true}));
//router.use(bodyParser.json());

router.get('/add_administrator',function(req,res){
    // db.getalldept(function(err,result){
        res.render('add_administrator.ejs');
    // });
});

router.post('/add_administrator', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var address = req.body.address;
    var ph_no = req.body.ph_no;

    db.add_administrator(username, email, password, f_name, l_name, address, ph_no ,function(err,result){
    //if(db.add_doctor){
    console.log('/Administrator added successfully!!');
    //}
    res.redirect('/administrator');
    });
});

router.get('/edit_administrator/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.getAdministratorbyId(a_id,function(err,result){
        res.render('edit_administrator.ejs' ,{list : result});
    });
});
    

router.post('/edit_administrator/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.editAdministrator(a_id,req.body.username,req.body.email,req.body.password,req.body.f_name,req.body.l_name,req.body.address,req.body.ph_no, function(err,result){
    res.redirect('/administrator');
        
    });
});

router.get('/delete_administrator/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.getAdministratorbyId(a_id,function(err,result){
        res.render('delete_administrator.ejs',{list:result})
    });

    
});

router.post('/delete_administrator/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.deleteAdministrator(a_id,function(err,result){

        res.redirect('/administrator');
    });
});

router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchAdministrator(key,function(err,result){
        console.log(result);
        
        res.render('administrator.ejs',{list : result});
    });
});

