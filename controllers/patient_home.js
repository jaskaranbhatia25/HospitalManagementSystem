var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');
var router = express.Router();
var session = require ('express-session');


// router.get('/',function(req,res){
//     res.render('patient_home.ejs');
//     // res.render('patient_home', { P_userid: P_userid });
    
// });
// router.use(cookie());
// router.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));


router.get('/', function(req, res) {
    if (req.session.loggedin) {
        res.render('patient_home', { P_userid: req.session.P_userid });
    } else {
        res.send('Session expired! Please log in to view this page.');
    }
});


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchAppointment(key, function (err, result) {
        console.log(result);

        res.render('patient_appointment.ejs', { list: result });
    });
});




router.get('/patient_profile',function(req,res){
    var username = req.cookies['username'];
    db.getpatientdetails(username,function(err,result){
        //console.log(result);
        res.render('patient_profile.ejs',{list:result});
    });
});

router.post('/patient_profile',function(req,res){
    var username = req.cookies['username'];
    db.getpatientdetails(username,function(err,result){
        var id = result[0].P_userid;
        var password = result[0].password;
        var username = result[0].username; 
        if (password== req.body.password){

            db.edit_patprofile(id,req.body.username,req.body.email,req.body.new_password,function(err,result1){
                if (result1){
                    res.send("Profile edited successfully");
                }
                if(!result1){ res.send("Old password did not match");}
                   
                

            });
        }
        


    }) ;
});



module.exports = router;