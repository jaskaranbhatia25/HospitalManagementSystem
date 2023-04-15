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

    db.getAlloperation(function(err,result){
        // if(err)
        // throw err;
        res.render('operation.ejs',{list : result})
    });
    
});


router.get('/add_operation',function(req,res){

    res.render('add_operation.ejs');
  
});

router.post('/add_operation', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var op_name = req.body.op_name;
    var cost = req.body.cost;
    var p_id = req.body.p_id;
    var d_id = req.body.d_id;
    var materials_id = req.body.materials_id;
    

    db.add_operation(op_name, cost, p_id, d_id, materials_id, function(err,result){
    //if(db.add_doctor){
    console.log('Operation added successfully!!');
    //}
    res.redirect('/operation');
    });
});

router.get('/edit_operation/:op_id',function(req,res){
    var op_id = req.params.op_id;
    db.getoperationbyId(op_id,function(err,result){
        res.render('edit_operation.ejs' ,{list : result});
    });
});
    

router.post('/edit_operation/:op_id',function(req,res){
    var op_id = req.params.op_id;
    db.edit_operation(op_id,req.body.op_name,req.body.cost,req.body.p_id,req.body.d_id,req.body.materials_id, function(err,result){
        
    res.redirect('/operation');
        
    });
});

router.get('/delete_operation/:op_id',function(req,res){
    var op_id = req.params.op_id;
    db.getoperationbyId(op_id,function(err,result){
        res.render('delete_operation.ejs',{list:result})
    });

    
});

router.post('/delete_operation/:op_id',function(req,res){
    var op_id = req.params.op_id;
    db.delete_operation(op_id,function(err,result){

        res.redirect('/operation');
    });
});


router.post('/search',function(req,res){
    var key = req.body.search;
    db.search_operation(key,function(err,result){
        console.log(result);
        
        res.render('operation.ejs',{list : result});
    });
});

