var express = require('express');
var router = express.Router();
var User = require('../../db_models.js/user_model')


router.post('/signin', function (req, res) {
   
    let email = req.body.email;
    // let email = 'new@gmail.com';
    // let password = '1111';
    User.findAll({
        where: {
          email: email
        }
      }).then(user => {
      
        res.json({
            success: false,
            msg:user 
       })})
       .catch(function (e) {
        console.error(e);
        res.json({
            success: false,
            msg: 'no such user in database.'
          });
    });
}); 


router.get('/', function (req, res) {
    User.findAll().then(users => {
        console.log("users1");
        console.log(users[0].dataValues);
        res.json(users) 
       })
       .catch(function (e) {
        console.error("Problems with database");
        res.json({
            success: false,
            msg: 'problem with getting users from database.'
          });
        }); 
    });

router.post('/signup', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.create({
      email: email,
      password: password
        }).then(function(inserted){
           console.log("datainserted")
            console.log(inserted.dataValues)
            res.json(inserted.dataValues)
            })
            .catch(function (e) {
                console.error("Problems with inserting new user");
                    res.json({
                    success: false,
                    msg: 'email already exists.'
                  });
            });
        });
    

module.exports = router;