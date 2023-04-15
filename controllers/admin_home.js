var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');
var router = express.Router();


router.get('/',function(req,res){
    res.render('admin_home.ejs');
});


router.get('/profile',function(req,res){
    var username = req.cookies['username'];
    db.getadmindetails(username,function(err,result){
        //console.log(result);
        res.render('profile.ejs',{list:result});
    });
});

router.post('/profile',function(req,res){
    var username = req.cookies['username'];
    db.getadmindetails(username,function(err,result){
        var id = result[0].id;
        var password = result[0].password;
        var username = result[0].username; 
        if (password== req.body.password){

            db.edit_profile(id,req.body.username,req.body.email,req.body.new_password,function(err,result1){
                if (result1){
                    res.send("profile edited successfully");
                }
                if(!result1){ res.send("old password did not match");}
                   
                

            });
        }
        


    }) ;
});







module.exports = router;