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
		res.redirect('/doctor_login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getallappointment(function(err,result){
        console.log(result);
        res.render('doctor_appointment.ejs',{list :result});
    })
    
});

// router.get('/d_add_appointment',function(req,res){
//     res.render('d_add_appointment.ejs');
// });

router.get('/d_add_appointment',function(req,res){
    db.getAllDoc(function(err, doctors) {
        if (err) {
            console.log(err);
        } else {
            res.render('d_add_appointment.ejs', {doctors: doctors});
        }
    });
});

router.post('/d_add_appointment', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var p_id = req.body.p_id;
    var p_name = req.body.p_name;
    var d_name = req.body.d_name;
    var date = req.body.date;
    var time = req.body.time;
    

    db.add_appointment(p_id, p_name, d_name, date, time, function(err,result){
    //if(db.add_doctor){
    console.log('Appointment added successfully!!');
    //}
    res.redirect('/doctor_appointment');
    });
});

// router.post('/add_appointment',function(req,res){

//     db.add_appointment(req.body.p_name,req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,function(err,result){
//         res.redirect('/appointment');
//     });

// });


// router.get('/d_edit_appointment/:a_id',function(req,res){
//     var a_id = req.params.a_id;
//     db.getappointmentbyid(a_id,function(err,result){
//         console.log(result);
//         res.render('d_edit_appointment.ejs',{list : result});
//     });

// });

router.get('/d_edit_appointment/:a_id', function(req, res) {
    var a_id = req.params.a_id;
    db.getAllDoc(function(err, doctors) {
        db.getappointmentbyid(a_id, function(err, result) {
            console.log(result);
            res.render('d_edit_appointment.ejs', { list: result, doctors: doctors });
        });
    });
});

router.post('/d_edit_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.edit_appointment(a_id,req.body.p_id,req.body.p_name,req.body.d_name,req.body.date,req.body.time,function(err,result){
        res.redirect('/doctor_appointment');
    });
});


router.get('/d_delete_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.getappointmentbyid(a_id,function(err,result){
        console.log(result);
        res.render('d_delete_appointment.ejs',{list:result});
    })
    
});

router.post('/d_delete_appointment/:a_id',function(req,res){
    var a_id =req.params.a_id;
    db.delete_appointment(a_id,function(err,result){
        res.redirect('/doctor_appointment');
    });
})


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchAppointment(key, function (err, result) {
        console.log(result);

        res.render('doctor_appointment.ejs', { list: result });
    });
});