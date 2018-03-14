var express = require('express');
var router = express.Router();
var db = require('../mysql')
var User = require('../../db_models.js/user_model')
const Sequelize = require('sequelize');
var sequelize = require('../../sequilize')
router.get('/user', function (req, res) {
    let email = 'aranvic1975@gmail.com';
    let password = '1111';
    // let email = req.body.email;
    // let password = req.body.password;
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
        res.json(e)
    });
    // if (!email || !password) {
    //     return res.status(400).send({ error: message_id, message: 'Please check your data' });
    //    }

}); 


router.get('/', function (req, res) {
    User.findAll().then(users => {
        console.log("users1");
        console.log(users[0].dataValues);
        res.json(users) 
       })
       .catch(function (e) {
        console.error("Problems with database");
        res.json(e)
        }); 
    });

router.post('/signup', function (req, res) {
    let email = 'new1@gmail.com';
    let password = '1234'
    User.sync({force: false}).then(() => {
    return User.create({
      email: email,
      password: password
        }).then(function(inserted){
           console.log("datainserted")
            console.log(inserted.dataValues)
            res.json(inserted.dataValues)
            })
            .catch(function (e) {
                console.error("Problems with inserting new user");
                res.json(e)
            });
        });
    })

module.exports = router;