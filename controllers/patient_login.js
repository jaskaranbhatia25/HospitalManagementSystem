var express = require ('express');
var home = require('./home');
var mysql =require('mysql');
var session = require ('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
var  sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');




router.get('/', function(req ,res){

    res.render('patient_login.ejs');
});

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Hospital_management_system'
});

// router.use(session({

//     secret: 'secret',
//     resave : true ,
//     saveUninitialized : true 

// }));


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.post('/',[
    check('username').notEmpty().withMessage("Username is reequired"),
    check('password').notEmpty().withMessage("Password is required")
    
], function(request , response){
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
      }

    var username = request.body.username;
    var password = request.body.password;

    if (username && password){
        con.query('select * from patient where username = ? and password = ?' , [username, password], function(error , results , fields){
            if (results.length > 0){
                
                request.session.loggedin = true ; 
                request.session.username = username;
                request.session.P_userid = results[0].P_userid;
                response.cookie('username' , username);
               // var status = results[0].email_status;
               // if (status=="not_verified" ){
                 //   response.send("please verify your email");
              //  }
              //  else{
                    sweetalert.fire(`logged In! `);
                    response.redirect('/patient_home');
                  //  response.render('patient_home', {P_userid: request.session.P_userid});

              //  }
               ///${results[0].P_userid}`
            }else{
                response.send('Incorrect username / password');
            }
            response.end();
        });

    }
    
    
    
    
    else{
        response.send('please enter user name and password');
        response.end();
    }

});

module.exports = router;



// var express = require ('express');
// var home = require('./home');
// var mysql =require('mysql');
// var session = require ('express-session');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var db = require.main.require ('./models/db_controller');
// var  sweetalert = require('sweetalert2');
// const { check, validationResult } = require('express-validator');




// router.get('/', function(req ,res){

//     res.render('patient_login.ejs');
// });

// var con = mysql.createConnection({

//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'Hospital_management_system'
// });

// router.use(session({

//     secret: 'secret',
//     resave : true ,
//     saveUninitialized : true 

// }));


// router.use(bodyParser.urlencoded({extended : true}));
// router.use(bodyParser.json());


// router.post('/',[
//     check('username').notEmpty().withMessage("Username is reequired"),
//     check('password').notEmpty().withMessage("Password is required")
    
// ], function(request , response){
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//         return response.status(422).json({ errors: errors.array() });
//       }

//     var username = request.body.username;
//     var password = request.body.password;

//     if (username && password){
//         con.query('select * from patient where username = ? and password = ?' , [username, password], function(error , results , fields){
//             if (results.length > 0){
                
//                 request.session.loggedin = true ; 
//                 request.session.username = username;
//                 response.cookie('username' , username);
//                // var status = results[0].email_status;
//                // if (status=="not_verified" ){
//                  //   response.send("please verify your email");
//               //  }
//               //  else{
//                     sweetalert.fire('logged In!');
//                     response.redirect('/patient_home');
//               //  }
               
//             }else{
//                 response.send('Incorrect username / password');
//             }
//             response.end();
//         });

//     }
    
    
    
    
//     else{
//         response.send('please enter user name and password');
//         response.end();
//     }

// });

// module.exports = router;