var db = require('../mysql')
var UserModel = require('../../db_models.js/user_model')
const Sequelize = require('sequelize');
var sequelize = require('../../sequilize')


var User={

getAllUsers:function(){
    console.log("UserModel")
    console.log(UserModel)
    UserModel.findAll().then(users => {
       console.log("users1");
       console.log(users[0].dataValues);
       return users; 
      })
      

      
// return db.query("Select * from users",callback);

},
getUserById:function(id,callback){

    return db.query("select * from users where id=?",[id],callback);
},
getUserByEmail:function(email, password,callback){
    console.log("in user")
    return db.query("select * from users where email=? and password=?",[email, password],callback);
},
addUser:function(User,callback){
  
return db.query("Insert into users values(?,?)",[User.email,User.password],callback);
},
deleteUser:function(id,callback){
    return db.query("delete from users where id=?",[id],callback);
},
updateUser:function(id,User,callback){
    return  db.query("update users set email=?,password=? where id=?",[User.email,User.password,id],callback);
},

};
module.exports=User;