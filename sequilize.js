//var data = require('./fanoutC.js')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test_sqz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// Or you can simply use a connection uri
//const sequelize = new Sequelize('http://127.0.0.1:3306/sequilize');

sequelize
  .authenticate()
  .then(() => {
  console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
 //force: true will drop the table if it already exists
 

//  Messages.sync({force: false}).then(() => {
//     // Table created
//     return Messages.create({
      
//       message: "My mess"
//     }).then(function(inserted){
//         console.log(inserted.dataValues)
//     });
//   });
//   Messages.findAll().then(messages => {
//     console.log(messages)
//   })
module.exports = sequelize;