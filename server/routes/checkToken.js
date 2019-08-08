const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

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
  let {userName, passWord} = req.body;
  
// 验证 token
let token = req.body.token || "";
if (!tokenFn.verifyToken(token)) {
    let data = {};
    data.code = -1;
    data.message = "登录已失效";
    data.content = null;
    res.send(data)
    return
}

// 解析 token
let userInfo = tokenFn.parseToken(token);
let user_id = userInfo.userId;

  let sql = `SELECT * FROM login WHERE user_id = '${user_id}';`
  connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    sqlData = JSON.parse(JSON.stringify(result));
    if(sqlData && sqlData.length>0){
        let content = sqlData[0];
        let userId = content.user_id || "";
        let token = tokenFn.createToken(userId, 30);
        data.code = 0;
        data.message = "";
        data.content = content;
      } else {
        data.code = -1;
        data.message = "用户不存在";
        data.content = null;
      }
      res.send(data)
  });
});

module.exports = router;
