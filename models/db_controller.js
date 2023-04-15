var mysql = require("mysql");
var express = require("express");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Hospital_management_system",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected");
  }
});

module.exports.signup = function (username, email, password, f_name, l_name, Address, Ph_no, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`, `f_name`,`l_name`,`Address`,`Ph_no`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    f_name +
    "','" +
    l_name +
    "','" +
    Address +
    "','" +
    Ph_no +
    "')";
  con.query(query, callback);
};


module.exports.signup_admin = function (username, email, password, f_name, l_name, address, ph_no, callback) {
  var query =
    "INSERT INTO `administrator`(`username`,`email`,`password`, `f_name`,`l_name`,`address`,`ph_no`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    f_name +
    "','" +
    l_name +
    "','" +
    address +
    "','" +
    ph_no +
    "')";
  con.query(query, callback);
};


module.exports.signup_patient = function (username, password, f_name, l_name, email, address, ph_no, callback) {
  var query =
    "INSERT INTO `patient`(`username`,`password`, `f_name`,`l_name`,`email`,`address`,`ph_no`) VALUES ('" +
    username +
    "','" +
    password +
    "','" +
    f_name +
    "','" +
    l_name +
    "','" +
    email + 
    "','" +
    address +
    "','" +
    ph_no +
    "')";
  con.query(query, callback);
};


module.exports.signup_doctor = function (username, password, first_name, last_name, email, address, phone, callback) {
  var query =
    "INSERT INTO `doctor`(`username`,`password`, `first_name`,`last_name`,`email`,`address`,`phone`) VALUES ('" +
    username +
    "','" +
    password +
    "','" +
    first_name +
    "','" +
    last_name +
    "','" +
    email + 
    "','" +
    address +
    "','" +
    phone +
    "')";
  con.query(query, callback);
};






module.exports.add_doctor = function (
  username,
  password,
  first_name,
  last_name,
  email,
  address,
  phone,
  callback
) {
  var query =
    "INSERT INTO `doctor`(`username`,`password`,`first_name`,`last_name`,`email`,`address`,`phone`) values ('" +
    username +
    "','" +
    password +
    "','" +
    first_name +
    "','" +
    last_name +
    "','" +
    email +
    "','" +
    address +
    "','" +
    phone +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.add_case = function (
  
  date,
  time,
  d_id,
  info,
  callback
){
  var query =
    "INSERT INTO `Casedoctor`(`date`,`time`,`d_id`,`info`) values ('" +
    date +
    "','" +
    time +
    "','" +
    d_id +
    "','" +
    info +
    "')";
  console.log(query);
  con.query(query, callback);
  };

module.exports.add_patients = function (
  username,
  password,
  f_name,
  l_name,
  email,
  address,
  ph_no,
  callback
) {
  var query =
    "INSERT INTO `patient`( `username`, `password`,`f_name`,`l_name`,`email`,`address`,`ph_no`) values ('" +
    
    username +
    "','" +
    password +
    "','" +
    f_name +
    "','" +
    l_name +
    "','" +
    email +
    "','" +
    address +
    "','" +
    ph_no +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.add_record = function (
  p_id,
  date_time,
  a_id,
  case_id,
  callback
) {
  var query =
    "INSERT INTO `patient has medical record`( `p_id`, `date_time`,`a_id`,`case_id`) values ('" +
    p_id +
    "','" +
    date_time +
    "','" +
    a_id +
    "','" +
    case_id +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.add_test = function (
  record_id,
  type_of_tests,
  callback
) {
  var query =
    "INSERT INTO `lab tests`( `record_id`,`type_of_tests`) values ('" +
    record_id +
    "','" +
    type_of_tests +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getAllpatients = function (callback) {
  var query = "select * from patient";
  con.query(query, callback);
};

module.exports.getAllRecords = function (callback) {
  var query = "select * from `patient has medical record`";
  con.query(query, callback);
};

module.exports.getAllTests = function (callback) {
  var query = "select * from `lab tests`";
  con.query(query, callback);
};


module.exports.getpatientsbyId = function (P_userid, callback) {
  var query = "select * from patient where P_userid =" + P_userid;
  con.query(query, callback);
};

module.exports.getRecordsbyId = function (record_id, callback) {
  var query = "select * from `patient has medical record` where record_id =" + record_id;
  con.query(query, callback);
};

module.exports.getTestsbyId = function (test_id, callback) {
  var query = "select * from `lab tests` where test_id =" + test_id;
  con.query(query, callback);
};

module.exports.getpatient = function (P_userid, callback) {
  var query = "select P_userid from patient where P_userid =" + P_userid;
  con.query(query, callback);
};


module.exports.getRecord = function (record_id, callback) {
  var query = "select record_id from `patient has medical record` where record_id =" + record_id;
  con.query(query, callback);
};

module.exports.add_materials = function(
  name,
  cost,
  a_id,
  op_id,
  callback
){
  var query =
    "INSERT INTO `materials`(`name`,`cost`,`a_id`,`op_id`) values ('" +
    name +
    "','" +
    cost +
    "','" +
    a_id +
    "','" +
    op_id +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.add_operation = function(
  //op_id,
  op_name,
  cost,
  p_id,
  d_id,
  materials_id,
  callback
){
  var query =
    "INSERT INTO `operation`(`op_name`,`cost`,`p_id`,`d_id`, `materials_id`) values ('" +
   // op_id +
   // "','" +
    op_name +
    "','" +
    cost +
    "','" +
    p_id +
    "','" +
    d_id +
    "','" +
    materials_id +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getAlloperation = function (callback) {
  var query = "select * from operation";
  con.query(query, callback);
};

module.exports.getoperationbyId = function (op_id, callback) {
  var query = "select * from operation where op_id =" + op_id;
  con.query(query, callback);
};

module.exports.edit_operation = function (
  op_id,
  op_name,
  cost,
  p_id,
  d_id,
  materials_id,
  callback
) {
  var query =
    "update `operation` set `op_name`='" +
    op_name +
    "', `cost`='" +
    cost +
    "', `p_id`='" +
    p_id +
    "', `d_id`='" +
    d_id +
    "', `materials_id`='" +
    materials_id +
    "' where op_id=" +
    op_id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.delete_operation = function (op_id, callback) {
  var query = "delete from operation where op_id=" + op_id;
  con.query(query, callback);
};

module.exports.delete_salary = function (salary_id, callback) {
  var query = "delete from salary where salary_id=" + salary_id;
  con.query(query, callback);
};

module.exports.getAllmaterials = function (callback) {
  var query = "select * from materials";
  con.query(query, callback);
};

module.exports.getMaterialsbyId = function (id, callback) {
  var query = "select * from materials where id =" + id;
  con.query(query, callback);
};
module.exports.getAllAdministrator = function (callback) {
  var query = "select * from administrator";
  con.query(query, callback);
};
module.exports.getAllDoc = function (callback) {
  var query = "select * from doctor";
  con.query(query, callback);
};

module.exports.getAllCase = function (callback) {
  var query = "select * from Casedoctor";
  con.query(query, callback);
};

module.exports.getDocbyId = function (d_id, callback) {
  var query = "select * from doctor where d_id =" + d_id;
  con.query(query, callback);
};


module.exports.getCasebyId = function (case_id, callback) {
  var query = "select * from Casedoctor where case_id =" + case_id;
  con.query(query, callback);
};


module.exports.getAdministratorbyId = function (a_id, callback) {
  var query = "select * from administrator where a_id =" + a_id;
  con.query(query, callback);
};

module.exports.editDoc = function (
  d_id,
  username,
  password,
  first_name,
  last_name,
  email,
  address,
  phone,
  callback
) {
  var query =
    "update `doctor` set `username`='" +
    username +
    "', `password`='" +
    password +
    "', `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "' where d_id=" +
    d_id;
  con.query(query, callback);
  // console.log(query);
};



module.exports.editCase = function (
  case_id,
  date,
  time,
  d_id,
  info,
  callback
) {
  var query =
    "update `Casedoctor` set `date`='" +
    date +
    "', `time`='" +
    time +
    "', `d_id`='" +
    d_id +
    "', `info`='" +
    info +
    "' where case_id=" +
    case_id;
  con.query(query, callback);
  // console.log(query);
};


module.exports.edit_patients = function (
  P_userid,
  username,
  password,
  f_name,
  l_name,
  email,
  address,
  ph_no,
  callback
) {
  var query =
    "update `patient` set `username`='" +
    username +
    "', `password`='" +
    password +
    "', `f_name`='" +
    f_name +
    "', `l_name`='" +
    l_name +
    "', `email`='" +
    email +
    "',`address`='" +
    address +
    "',`ph_no`='" +
    ph_no +
    "' where P_userid=" +
    P_userid;
  con.query(query, callback);
  
};

module.exports.edit_record = function (
  record_id,
  p_id,
  date_time,
  a_id,
  case_id,
  callback
) {
  var query =
    "update `patient has medical record` set `p_id`='" +
    p_id +
    "', `date_time`='" +
    date_time +
    "', `a_id`='" +
    a_id +
    "', `case_id`='" +
    case_id +
    "' where record_id=" +
    record_id;
  con.query(query, callback);
  
};

module.exports.edit_test = function (
  test_id,
  record_id,
  type_of_tests,
  callback
) {
  var query =
    "update `lab tests` set `record_id`='" +
    record_id +
    "', `type_of_tests`='" +
    type_of_tests +
    "' where test_id=" +
    test_id;
  con.query(query, callback);
  
};


module.exports.edit_materials = function (
  id,
  name,
  cost,
  a_id,
  op_id,
  callback
) {
  var query =
    "update `materials` set `name`='" +
    name +
    "', `cost`='" +
    cost +
    "', `a_id`='" +
    a_id +
    "', `op_id`='" +
    op_id +
    "' where id=" +
    id;
  con.query(query, callback);
  
};

module.exports.editAdministrator = function (
  a_id,
  username,
  email,
  password,
  f_name,
  l_name,
  address,
  ph_no,
  callback
) {
  var query =
    "update `administrator` set `username`='" +
    username +
    "', `email`='" +
    email +
    "', `password`='" +
    password +
    "', `f_name`='" +
    f_name +
    "',`l_name`='" +
    l_name +
    "',`address`='" +
    address +
    "',`ph_no`='" +
    ph_no +
    "' where a_id=" +
    a_id;
  con.query(query, callback);
  
};

module.exports.deleteDoc = function (d_id, callback) {

  var query = "delete from doctor where d_id=" + d_id;
  con.query(query, callback);
};


module.exports.deleteCase = function (case_id, callback) {

  var query = "delete from Casedoctor where case_id=" + case_id;
  con.query(query, callback);
};


module.exports.delete_patients = function (P_userid, callback) {

  var query = "delete from patient where P_userid=" + P_userid;
  con.query(query, callback);
};

module.exports.delete_record = function (record_id, callback) {

  var query = "delete from `patient has medical record` where record_id=" + record_id;
  con.query(query, callback);
};

module.exports.delete_test = function (test_id, callback) {

  var query = "delete from `lab tests` where test_id=" + test_id;
  con.query(query, callback);
};


module.exports.deleteAdministrator = function (a_id, callback) {

  var query = "delete from administrator where a_id=" + a_id;
  con.query(query, callback);
};

module.exports.deleteMaterials = function (id, callback) {

  var query = "delete from materials where id=" + id;
  con.query(query, callback);
};



module.exports.add_appointment = function (
  p_id,
  p_name,
  d_name,
  date,
  time,
  callback
) {
  var query =
    "insert into appointment (p_id,p_name,d_name,date,time) values ('" +
    p_id +
    "','" +
    p_name +
    "','" +
    d_name +
    "','" +
    date +
    "','" +
    time +
    "')";
  con.query(query, callback);
};

module.exports.getallappointment = function (callback) {
  var query = "select * from appointment";
  con.query(query, callback);
};



module.exports.getPatientappointment = function ( callback) {
  var query = "select * from appointment, patient where patient.P_userid = appointment.p_id";
  con.query(query, callback); 
};

module.exports.searchDoc = function (key, callback) {
  var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};


module.exports.searchCase = function (key, callback) {
  var query = 'SELECT  *from Casedoctor where d_id like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};



module.exports.search_operation = function (op_name, callback) {
  var query = 'SELECT  *from operation where op_name like "%' + op_name + '%"';
  con.query(query, callback);
  console.log(query);
};


module.exports.searchoperations = function (d_id, callback) {
  var query = 'SELECT  *from operation where d_id like "%' + d_id + '%"';
  con.query(query, callback);
  console.log(query);
};



module.exports.searchPatients = function (f_name, callback) {
  var query = 'SELECT  *from patient where f_name like "%' + f_name + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.searchRecord = function (record_id, callback) {
  var query = 'SELECT  *from `patient has medical record` where record_id like "%' + record_id + '%"';
  con.query(query, callback);
  console.log(query);
};


module.exports.searchTest = function (test_id, callback) {
  var query = 'SELECT  *from `lab tests` where test_id like "%' + test_id + '%"';
  con.query(query, callback);
  console.log(query);
};


module.exports.searchmaterials = function (name, callback) {
  var query = 'SELECT  *from materials where name like "%' + name + '%"';
  con.query(query, callback);
};

module.exports.searchAdministrator = function (f_name, callback) {
  var query = 'SELECT  *from administrator where f_name like "%' + f_name + '%"';
  con.query(query, callback);
 // console.log(query);
};

module.exports.searchAppointment = function (p_id, callback) {
  var query = "SELECT  *from appointment where p_id = " + p_id ;
  con.query(query, callback);
 // console.log(query);
};

module.exports.searchAppointment_bydoc = function (d_name, callback) {
  var query = "SELECT  *from appointment where d_name = " + d_name ;
  con.query(query, callback);
 // console.log(query);
};


module.exports.searchAbsence = function (d_id, callback) {
  var query = 'SELECT  *from absence where d_id like "%' + d_id +'%"' ;
  con.query(query, callback);
 // console.log(query);
};

module.exports.getappointmentbyid = function (a_id, callback) {
  var query = "select * from appointment where a_id=" + a_id;
  console.log(query);
  con.query(query, callback);
};

module.exports.getappointmentbypatientid = function (p_id, callback) {
  var query = "select * from appointment where p_id=" + p_id;
  console.log(query);
};

module.exports.edit_appointment = function (
  a_id,
  p_id,
  p_name,
  d_name,
  date,
  time,
  callback
) {
  var query =
    "update appointment set p_id='" +
    p_id +
    "',p_name='" +
    p_name +
    "',d_name='" +
    d_name +
    "',date='" +
    date +
    "',time='" +
    time +
    "' where a_id=" +
    a_id;
  con.query(query, callback);
};

module.exports.delete_appointment = function (a_id, callback) {
  var query = "delete from appointment where a_id=" + a_id;
  con.query(query, callback);
};
//module.exports =router;




module.exports.setpassword = function (id, newpassword, callback) {
  var query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.add_administrator = function (
  username,
  email,
  password,
  f_name,
  l_name,
  address,
  ph_no,
  callback
) {
  var query =
    "Insert into `administrator` (`username`,`email`,`password`,`f_name`,`l_name`,`address`, `ph_no`) values ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    f_name +
    "','" +
    l_name +
    "','" +
    address +
    "','" +
    ph_no +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.addMed = function (
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "Insert into `store` (name,p_date,expire,expire_end,price,quantity) values('" +
    name +
    "','" +
    p_date +
    "','" +
    expire +
    "','" +
    e_date +
    "','" +
    price +
    "','" +
    quantity +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getMedbyId = function (id, callback) {
  var query = "select * from store where id=" + id;
  con.query(query, callback);
};

module.exports.editmed = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "update store set name='" +
    name +
    "', p_date='" +
    p_date +
    "',expire='" +
    expire +
    "' ,expire_end='" +
    e_date +
    "',price='" +
    price +
    "',quantity='" +
    quantity +
    "' where id=" +
    id;
  console.log(query);
  con.query(query, callback);
};



module.exports.getadministrator = function (callback) {
  var query = "select * from administrator";
  con.query(query, callback);
};

module.exports.add_absence = function (
  d_id,
  starttime,
  endtime,
  form,
  callback
) {
  var query =
    "Insert into `absence` (`d_id`,`starttime`,`endtime`,`form`) values ('" +
    d_id +
    "','" +
    starttime +
    "','" +
    endtime +
    "','" +
    form +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getAllabsence = function (callback) {
  var query = "Select * from absence";
  con.query(query, callback);
};





module.exports.getpatientdetails = function (username, callback) {
  var query = "select * from patient where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.getadmindetails = function (username, callback) {
  var query = "select * from administrator where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.getdoctordetails = function (username, callback) {
  var query = "select * from doctor where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.getcasedetails = function (case_id, callback) {
  var query = "select * from Casedoctor where case_id='" + case_id + "'";
  con.query(query, callback);
  console.log(query);
};


module.exports.patient_profile = function (
  P_userid,
  username,
  email,
  password,
  callback
) {
  var query =
    "update patient set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where P_userid=" +
    P_userid;
  con.query(query, callback);
  console.log(query);
};


module.exports.edit_profile = function (
  a_id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update administrator set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where a_id=" +
    a_id;
  con.query(query, callback);
  console.log(query);
};


module.exports.edit_docprofile = function (
  d_id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update doctor set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where d_id=" +
    d_id;
  con.query(query, callback);
  console.log(query);
};


module.exports.edit_patprofile = function (
  P_userid,
  username,
  email,
  password,
  callback
) {
  var query =
    "update patient set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where P_userid=" +
    P_userid;
  con.query(query, callback);
  console.log(query);
};




module.exports.getabsencebyid = function (leave_id, callback) {
  var query = "select * from absence where leave_id=" + leave_id;
  con.query(query, callback);
};

module.exports.delete_absence= function (leave_id, callback) {
  var query = "delete from absence where leave_id=" + leave_id;
  con.query(query, callback);
};

module.exports.edit_absence = function (
  leave_id,
  d_id,
  starttime,
  endtime,
  form,
  callback
) {
  var query =
    "update absence set d_id='" +
    d_id +
    "',starttime='" +
    starttime +
    "',endtime='" +
    endtime +
    "',form='" +
    form +
    "' where leave_id=" +
    leave_id;
  con.query(query, callback);
};

module.exports.add_salary = function (
  amount,
  d_id,
  callback
) {
  var query =
    "INSERT INTO `salary` (amount, d_id) VALUES ('" +
    amount +  
    "','" +
    d_id +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.edit_salary = function (
  salary_id,
  amount,
  d_id,
  callback
) {
  var query =
    "update `salary` set `amount`='" +
    amount +
    "', `d_id`='" +
    d_id +
    "' where salary_id=" +
    salary_id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.getAllsalary = function (callback) {
  var query = "select * from salary";
  con.query(query, callback);
};

module.exports.getsalarybyId = function (salary_id, callback) {
  var query = "select * from salary where salary_id =" + salary_id;
  con.query(query, callback);
};

module.exports.search_salary = function (key, callback) {
  var query = 'SELECT  *from salary where d_id like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};