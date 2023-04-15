var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyParser = require ('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var db = require.main.require('./models/db_controller');
module.exports = router;

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/patient_login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
  //  var P_userid = req.cookies['P_userid'];
    db.getallappointment(function(err,result){
        console.log(result);
        res.render('patient_appointment.ejs/',{list :result});
    })
  
    
});


router.get('/p_add_appointment',function(req,res){
    db.getAllDoc(function(err, doctors) {
        if (err) {
            console.log(err);
        } else {
            res.render('p_add_appointment.ejs', {doctors: doctors});
        }
    });
});

router.post('/p_add_appointment', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var p_id = req.body.p_id;
    var p_name = req.body.p_name;
    var d_name = req.body.d_name;
    var date = req.body.date;
    var time = req.body.time;
    

    db.add_appointment(p_id, p_name, d_name, date, time, function(err,result){

    console.log('appointment added successfully!!');
    res.redirect('/patient_home');
    });
});



router.get('/p_edit_appointment/:a_id', function(req, res) {
    var a_id = req.params.a_id;
    db.getAllDoc(function(err, doctors) {
        db.getappointmentbyid(a_id, function(err, result) {
            console.log(result);
            res.render('p_edit_appointment.ejs', { list: result, doctors: doctors });
        });
    });
});

router.post('/p_edit_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.edit_appointment(a_id,req.body.p_id,req.body.p_name,req.body.d_name,req.body.date,req.body.time,function(err,result){
        res.redirect('/patient_appointment');
    });
});


router.get('/p_delete_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.getappointmentbyid(a_id,function(err,result){
        console.log(result);
        res.render('p_delete_appointment.ejs',{list:result});
    })
    
});

router.post('/p_delete_appointment/:a_id',function(req,res){
    var a_id =req.params.a_id;
    db.delete_appointment(a_id,function(err,result){
        res.redirect('/patient_appointment');
    });
})


