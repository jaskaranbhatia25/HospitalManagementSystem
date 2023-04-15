var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');
var router = express.Router();
var session = require ('express-session');


// router.get('/',function(req,res){
//     res.render('doctor_home.ejs');
// });




router.get('/', function(req, res) {
    if (req.session.loggedin) {
        res.render('doctor_home', { d_id: req.session.d_id });
    } else {
        res.send('Session expired! Please log in to view this page.');
    }
});


router.get('/doctor_profile',function(req,res){
    var username = req.cookies['username'];
    db.getdoctordetails(username,function(err,result){
        //console.log(result);
        res.render('doctor_profile.ejs',{list:result});
    });
});

router.post('/doctor_profile',function(req,res){
    var username = req.cookies['username'];
    db.getdoctordetails(username,function(err,result){
        var id = result[0].d_id;
        var password = result[0].password;
        var username = result[0].username; 
        if (password== req.body.password){

            db.edit_docprofile(id,req.body.username,req.body.email,req.body.new_password,function(err,result1){
                if (result1){
                    res.send("Profile edited successfully");
                }
                if(!result1){ res.send("Old password did not match");}
                   
                

            });
        }
        


    }) ;
});



module.exports = router;