const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

var connection = mysql.createConnection({ //创建mysql实例
    host:'0.0.0.0',
    port:'3306',
    user:'root',
    password:'123456789',
    database:'test1'
});
connection.connect();


router.get('/', function(req, res, next) {
    console.log("header: ", req.headers)

    

  // 连接数据库 
  let {userName, passWord} = req.body;
  
// 验证 token
let token = req.headers.token;
if (!tokenFn.verifyToken(token)) {
    let data = {};
    data.code = -1;
    data.message = "请重新登录";
    data.content = null;
    res.send(data)
    return false
}

// 解析 token
let userInfo = tokenFn.parseToken(token);
let user_id = userInfo.userId;
console.log('user_id: ', user_id)

  let sql = `SELECT nick_name, avatar FROM user WHERE user_id = '${user_id}';`
  connection.query(sql, function (err,result) {
    let data = {};

    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    sqlData = JSON.parse(JSON.stringify(result));
    if(sqlData && sqlData.length>0){
        let content = sqlData[0];
        data.code = 0;
        data.message = "";
        data.content = content;
      } 
      res.send(data)
  });
});

module.exports = router;
