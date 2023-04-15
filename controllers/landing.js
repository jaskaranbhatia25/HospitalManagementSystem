var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');
var router = express.Router();


// router.get('/',function(req,res){
//     res.render('landing.ejs');
// });



router.get('/', function(req, res) {
    db.getAllDoc(function(err, doctors) {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching doctors');
        } else {
            res.render('landing.ejs', { doctors: doctors });
        }
    });
});






module.exports = router;