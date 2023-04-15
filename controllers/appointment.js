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
		res.redirect('/admin_login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getallappointment(function(err,result){
        console.log(result);
        res.render('appointment.ejs',{list :result});
    })
    
});



router.get('/add_appointment', function(req, res) {
    db.getAllDoc(function(err, doctors) {
        if (err) {
            console.log(err);
        } else {
            db.getAllpatients(function(err, patients) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('add_appointment.ejs', { doctors: doctors, patients: patients });
                }
            });
        }
    });
});



router.post('/add_appointment', function(req,res){
    console.log('Request body:', req.body);
    //var d_id = req.body.d_id;
    var p_id = req.body.p_id;
    var p_name = req.body.p_name;
    var d_name = req.body.d_name;
    var date = req.body.date;
    var time = req.body.time;
    

    db.add_appointment(p_id, p_name, d_name, date, time, function(err,result){
    //if(db.add_doctor){
    console.log('appointment added successfully!!');
    //}
    res.redirect('/appointment');
    });
});



router.get('/edit_appointment/:a_id', function(req, res) {
    var a_id = req.params.a_id;
    db.getAllDoc(function(err, doctors) {
        db.getAllpatients(function(err, patients) {
            db.getappointmentbyid(a_id, function(err, result) {
                console.log(result);
                res.render('edit_appointment.ejs', { list: result, doctors: doctors, patients: patients });
            });
        });
    });
});


router.post('/edit_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.edit_appointment(a_id,req.body.p_id,req.body.p_name,req.body.d_name,req.body.date,req.body.time,function(err,result){
        res.redirect('/appointment');
    });
});


router.get('/delete_appointment/:a_id',function(req,res){
    var a_id = req.params.a_id;
    db.getappointmentbyid(a_id,function(err,result){
        console.log(result);
        res.render('delete_appointment.ejs',{list:result});
    })
    
});

router.post('/delete_appointment/:a_id',function(req,res){
    var a_id =req.params.a_id;
    db.delete_appointment(a_id,function(err,result){
        res.redirect('/appointment');
    });
})

router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchAppointment(key, function (err, result) {
        console.log(result);

        res.render('appointment.ejs', { list: result });
    });
});
