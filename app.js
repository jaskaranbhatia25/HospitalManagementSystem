var express = require ('express');
var session = require ('express-session');
var cookie = require ('cookie-parser');
var path = require ('path');
var ejs= require ('ejs');
var multer = require('multer');
var path = require ('path');
var async = require ('async');
var nodmailer = require ('nodemailer');
var crypto = require ('crypto');
var expressValidator = require ('express-validator');
var  sweetalert = require('sweetalert2');
var app = express();



var bodyParser = require ('body-parser');

var  login = require ('./controllers/login');
var  home = require ('./controllers/home');
var  signup = require ('./controllers/signup');
var  doc_controller = require ('./controllers/doc_controller');
var db = require ('./models/db_controller');
var administrator = require ('./controllers/administrator');
var logout = require ('./controllers/logout');
var landing = require ('./controllers/landing');

var appointment = require ('./controllers/appointment');

var materials = require ('./controllers/materials');
var patients = require ('./controllers/patients');
var operation = require ('./controllers/operation');
var absence = require ('./controllers/absence');
var patient_home = require ('./controllers/patient_home');
var patient_login = require ('./controllers/patient_login');
var patient_appointment = require ('./controllers/patient_appointment');
var admin_login = require ('./controllers/admin_login');
var admin_home = require ('./controllers/admin_home');
var signup_admin = require ('./controllers/signup_admin');
var signup_patient = require ('./controllers/signup_patient');
var doctor_login = require ('./controllers/doctor_login');
var doctor_home = require ('./controllers/doctor_home');
var salary = require ('./controllers/salary');
var signup_doctor = require ('./controllers/signup_doctor');
var doctor_appointment = require ('./controllers/doctor_appointment');
var medical_record = require ('./controllers/medical_record');
var lab_test = require ('./controllers/lab_test');
var doctor_salary = require ('./controllers/doctor_salary');
var d_medical_record = require ('./controllers/d_medical_record');
var cases = require ('./controllers/Casedoctor');
var d_case = require ('./controllers/d_case');
var d_operation = require ('./controllers/d_operation');
var app = express();


app.set('view engine', 'ejs');




app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var server =app.listen(3000 , function(){

    console.log('server started');
});

app.use(cookie());

app.use(session({
    key: 'user_sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000000 // 10 minutes
    }
}));


app.use('/login' ,login);
app.use('/home' , home);
app.use('/signup' , signup);
app.use('/doctors', doc_controller);
app.use('/administrator',administrator);
app.use ('/logout',logout);


app.use ('/',landing);

app.use ('/appointment',appointment);

app.use('/materials',materials);
app.use('/patients',patients);
app.use('/operation', operation);
app.use('/absence', absence);
app.use('/patient_home', patient_home);
app.use('/patient_login', patient_login);
app.use('/patient_appointment', patient_appointment);
app.use('/admin_login', admin_login);
app.use('/admin_home', admin_home);
app.use('/signup_admin', signup_admin);
app.use('/signup_patient', signup_patient);
app.use('/doctor_login', doctor_login);
app.use('/doctor_home', doctor_home);
app.use('/salary', salary);
app.use('/signup_doctor', signup_doctor);
app.use('/doctor_appointment', doctor_appointment);
app.use('/medical_record', medical_record);
app.use('/lab_test', lab_test);
app.use('/doctor_salary', doctor_salary);
app.use('/d_medical_record', d_medical_record);
app.use('/cases', cases);
app.use('/d_case', d_case);
app.use('/d_operation', d_operation);

