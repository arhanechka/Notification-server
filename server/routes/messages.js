var express = require('express');
var router = express.Router();
var Message = require('../../db_models/messages_model')


router.get('/', function (req, res) {
    Message.findAll().then(messages => {
       res.json({
        success: true, 
        msg: messages}) 
       })
       .catch(function (e) {
        console.error("Problems with database");
        res.json({
          success: false,
          msg: 'problem with getting messages from database.'
        });
        }); 
    });

router.get('/status/:status', function (req, res) {
    let status = req.params.status;
    
    Message.findAll({
        where: {
          status: status
        }
      }).then(message => {
        
        res.json({
          success: true,
          msg: message
        }) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json({
              success: false,
              msg: 'problem with getting messages from database with status ' + status
            });
        }); 
     });
   

router.put('/updateStatus', function (req, res) {
    let status = req.body.status;
    let id = req.body.id;
     Message.update({
        status: status,
      }, {
        where: {
          id: id
        }
      }).then(message => {
        console.log(message)
        res.json({
          success: true,
          msg: message
        }) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json({
              success: false,
              msg: 'problem with updating message status.'
            });
            }); 
   
});

router.get('/:id', function (req, res) {
    let user_id = req.params.id;
      Message.findAll({
        where: {
          user_id: user_id
        }
      }).then(messages => {
        res.json({
          success: true,
          msg: messages}) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json({
              success: false,
              msg: 'problem with getting message status by '+id +" id"
            });
            }); 
     });
     
     router.get('/:id/:status', function (req, res) {
      let id = req.params.id;
      let status = req.params.status;
        Message.findAll({
          where: {
            user_id: id,
            status: status
          }
        }).then(messages => {
          res.json({
            success: true,
            msg: messages}) 
          }) 
          
          .catch(function (e) {
              console.error("Problems with database");
              res.json({
                success: false,
                msg: 'problem with getting unread messages by '+id +" id"
              });
              }); 
       });
          

module.exports = router;