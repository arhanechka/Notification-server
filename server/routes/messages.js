var express = require('express');
var router = express.Router();
var db = require('../mysql')
var Message = require('../models/messages')

router.get('/', function (req, res) {
    Message.getAllMessages(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    })
});

router.get('/status', function (req, res) {
    let status = 1;
    
    // let status = req.body.status;
    // let id = req.body.id;
    if (!status ) {
        return res.status(400).send({ error: message_id, message: 'Please check your data' });
       }
    Message.getMessageByStatus(status,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}); 

router.put('/updateStatus', function (req, res) {
    let status = 1;
    let id = 17;
    // let status = req.body.status;
    // let id = req.body.id;
    if (!status || !id ) {
        return res.status(400).send({ error: message_id, message: 'Please check your data' });
       }
    Message.updateMessageStatus(id,status,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get('/id', function (req, res) {
    let id = 15;
    
    // let status = req.body.status;
    // let id = req.body.id;
    if (!id ) {
        return res.status(400).send({ error: message_id, message: 'Please check your data' });
       }
    Message.getMessageById(id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}); 

router.get('/messages', function (req, res) {
    db.query('SELECT message, status FROM messages WHERE status = 0 AND id < 20', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Messages list.' });
    });
}); 

router.put('/messages', function (req, res) {
    let message_id = req.body.message_id;
   
    if (!message_id) {
        return res.status(400).send({ error: message_id, message: 'Please provide message_id' });
    }
    
    db.query('UPDATE messages SET status = 1 WHERE id = ?', message_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Message updated.' });
    });
}); 

module.exports = router;