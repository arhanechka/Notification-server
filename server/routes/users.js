var express = require('express');
var router = express.Router();
var User = require('../../db_models.js/user_model')


router.get('/user', function (req, res) {
    let email = 'aranvic1975@gmail.com';
    let password = '1111';
    User.findAll({
        where: {
          email: email
        }
      }).then(users => {
        console.log("users1");
        console.log(users);
        res.json(users) 
       })
       .catch(function (e) {
        console.error("Problems with database");
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
    let email = 'new2@gmail.com';
    let password = '1234'
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