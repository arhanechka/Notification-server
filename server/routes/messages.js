var express = require('express');
var router = express.Router();
var Message = require('../../db_models.js/messages_model')
const Sequelize = require('sequelize');
var sequelize = require('../../sequilize')

router.get('/', function (req, res) {
    Message.findAll().then(message => {
       res.json(message) 
       })
       .catch(function (e) {
        console.error("Problems with database");
        res.json(e)
        }); 
    });

router.get('/status', function (req, res) {
    let status = 1;
    Message.findAll({
        where: {
          status: status
        }
      }).then(message => {
        res.json(message) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json(e)
        }); 
     });
   
    // if (!status ) {
    //     return res.status(400).send({ error: message_id, message: 'Please check your data' });
    //    }
    


router.put('/updateStatus', function (req, res) {
    let status = 1;
    let id = 10;
     Message.update({
        status: status,
      }, {
        where: {
          id: id
        }
      }).then(message => {
        res.json(message) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json(e)
            }); 
    // if (!status || !id ) {
    //     return res.status(400).send({ error: message_id, message: 'Please check your data' });
    //    }
  
});

router.get('/id', function (req, res) {
    let id = 15;
    // if (!id ) {
    //     return res.status(400).send({ error: message_id, message: 'Please check your data' });
    //    }
       Message.findAll({
        where: {
          id: id
        }
      }).then(message => {
        res.json(message) 
        })
        .catch(function (e) {
            console.error("Problems with database");
            res.json(e)
            }); 
     });
    
// router.get('/messages', function (req, res) {
//     db.query('SELECT message, status FROM messages WHERE status = 0 AND id < 20', function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Messages list.' });
//     });
// }); 


module.exports = router;