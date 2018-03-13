var express = require('express');
var router = express.Router();
var db = require('../mysql')
var User = require('../models/user')

router.get('/user', function (req, res) {
    let email = 'aranvic1976@gmail.com';
    let password = '1111';
    // let email = req.body.email;
    // let password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ error: message_id, message: 'Please check your data' });
       }
    User.getUserByEmail(email,password,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}); 


router.get('/', function (req, res) {
    User.getAllUsers(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}); 

module.exports = router;