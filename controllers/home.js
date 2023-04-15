var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/admin_login');
	}else{
		next();
	}
});






router.get('/',function(req,res){
    db.getAllDoc(function(err,result){
        db.getallappointment(function(err,result1){
        var total_doc = result.length ;
        var appointment = result1.length;
         
        res.render('home.ejs',{doc : total_doc , doclist : result, appointment : appointment, applist : result1});
        });
        //console.log(result.length);
        
    });
   
});


router.get('/departments',function(req,res){

    db.getalldept(function(err,result){

        res.render('departments.ejs',{list:result});

    });
    
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
        var id = result[0].a_id;
        var password = result[0].password;
        var username = result[0].username; 
        if (password== req.body.password){

            db.edit_profile(id,req.body.username,req.body.email,req.body.new_password,function(err,result1){
                if (result1){
                    res.send("Profile edited successfully");
                    
                }
                if(!result1){ res.send("Old password did not match");}
                   
                

            });
        }
        


    }) ;
});

module.exports =router;