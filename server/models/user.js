var db = require('../mysql')

var User={

getAllUsers:function(callback){

return db.query("Select * from users",callback);

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