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

    db.getAllmaterials(function(err,result){
        // if(err)
        // throw err;
        res.render('materials.ejs',{list : result})
    });
    
});


router.get('/add_materials',function(req,res){

    res.render('add_materials.ejs');
  
});

router.post('/add_materials', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var name = req.body.name;
    var cost = req.body.cost;
    var a_id = req.body.a_id;
    var op_id = req.body.op_id;
    

    db.add_materials(name, cost, a_id, op_id, function(err,result){
    //if(db.add_doctor){
    console.log('Materials added successfully!!');
    //}
    res.redirect('/materials');
    });
});

router.get('/edit_materials/:id',function(req,res){
    var id = req.params.id;
    db.getMaterialsbyId(id,function(err,result){
        res.render('edit_materials.ejs' ,{list : result});
    });
});
    

router.post('/edit_materials/:id',function(req,res){
    var id = req.params.id;
    db.edit_materials(id,req.body.name,req.body.cost,req.body.a_id,req.body.op_id, function(err,result){
        
    res.redirect('/materials');
        
    });
});

router.get('/deleteMaterials/:id',function(req,res){
    var id = req.params.id;
    db.getMaterialsbyId(id,function(err,result){
        res.render('delete_materials.ejs',{list:result})
    });

    
});

router.post('/deleteMaterials/:id',function(req,res){
    var id = req.params.id;
    db.deleteMaterials(id,function(err,result){

        res.redirect('/materials');
    });
});










    router.post('/search',function(req,res){
        var key = req.body.search;
        db.searchmaterials(key,function(err,result){
            console.log(result);
            
            res.render('materials.ejs',{list : result});
        });
    });

