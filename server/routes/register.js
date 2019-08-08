const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const uuid = require("uuid");

var connection = mysql.createConnection({ //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456789',
    database:'test1'
});
connection.connect();


router.post('/', function(req, res, next) {
    let data = {};
    let sqlData;

  // 连接数据库 
  console.log(req.body)
  let {userName, passWord, nickName, avatarUrl} = req.body;
  let userId = uuid.v1();
  let sql = `INSERT INTO login (user_id, user_name, pass_word, nick_name, avatar) VALUES ('${userId}','${userName}', '${passWord}', '${nickName}', '${avatarUrl}');`
  connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
        res.json({code:-1, message: "注册失败", content: null})
        return false
    } else {
        console.log('result: ',result)
        res.json({code:0, message: "", content: ""})
        return false
    }
    
    
  });
});

module.exports = router;
