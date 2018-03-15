var config = require('../config/config')
var sequelize = require('../config/db')
var User = require('../db_models/user_model')
var Messages = require('../db_models/messages_model')



module.exports = function(app)
{
sequelize
.authenticate()
.then(()=> {
    console.log("Connection has been established successfully.");
      // event handling:
      User.sync({force: false})
        .then(() => {
          console.log("User synced");
        })
      Messages.sync({force: false})
        .then(() => {
          console.log("Messages synced");
        })   
        .catch(error => {
          console.log("Not synced : " + error);
        });
    app.listen(config.restPort, () => {
            console.log('Express listening on port:', config.restPort);
          });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
      });

    }

