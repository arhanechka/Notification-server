var db = require('../mysql')

var Message={

getAllMessages:function(callback){

return db.query("Select * from messages",callback);

},
getMessageById:function(id,callback){

    return db.query("select * from messages where id=?",[id],callback);
},
getMessageByStatus:function(status,callback){
   
    return db.query("select * from messages where status=?",status,callback);
},

deleteMessage:function(id,callback){
    return db.query("delete from messages where id=?",[id],callback);
},
updateMessageStatus:function(id,status,callback){
    return  db.query("update messages set status=? where id=?",[status, id],callback);
},

};
module.exports=Message;