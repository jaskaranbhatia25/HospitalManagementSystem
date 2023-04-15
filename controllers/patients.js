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

    db.getAllpatients(function(err,result){
        // if(err)
        // throw err;
        res.render('patients.ejs',{list : result})
    });
    
});




router.get('/add_patients',function(req,res){
    
        res.render('add_patients.ejs');

});

router.post('/add_patients', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var username = req.body.username;   
    var password = req.body.password;
    var f_name = req.body.f_name;
    var l_name = req.body.l_name; 
    var email = req.body.email;
    var address = req.body.address;
    var ph_no = req.body.ph_no;

    db.add_patients(username, password, f_name, l_name, email, address, ph_no ,function(err,result){
    //if(db.add_doctor){
    console.log('Patient added successfully!!');
    //}
    res.redirect('/patients');
    });
});

router.get('/edit_patients/:P_userid',function(req,res){
    var P_userid = req.params.P_userid;
    db.getpatientsbyId(P_userid,function(err,result){
        res.render('edit_patients.ejs' ,{list : result});
    });
});
    

router.post('/edit_patients/:P_userid',function(req,res){
    var P_userid = req.params.P_userid;
    db.edit_patients(P_userid,req.body.username,req.body.password,req.body.f_name,req.body.l_name,req.body.email,req.body.address,req.body.ph_no, function(err,result){
        // if (err) throw err;
        
        //res.render('edit_doctor.ejs',{list:result});
    res.redirect('/patients');
        
    });
});

router.get('/delete_patients/:P_userid',function(req,res){
    var P_userid = req.params.P_userid;
    db.getpatientsbyId(P_userid,function(err,result){
        res.render('delete_patients.ejs',{list:result})
    });

    
});

router.post('/delete_patients/:P_userid',function(req,res){
    var P_userid = req.params.P_userid;
    db.delete_patients(P_userid,function(err,result){

        res.redirect('/patients');
    });
});



router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchPatients(key,function(err,result){
        console.log(result);
        
        res.render('patients.ejs',{list : result});
    });
});

