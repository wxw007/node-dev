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
  console.log("登录")
    let data = {};
    let sqlData;

  // 连接数据库 
  let {userName, passWord} = req.body;
  let sql = `SELECT * FROM login WHERE user_name = '${userName}' AND pass_word = '${passWord}';`
  connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    sqlData = JSON.parse(JSON.stringify(result));
    if(sqlData && sqlData.length>0){
        let content = sqlData[0];
        let userId = content.user_id || "";
        let token = tokenFn.createToken(userId, "3", "days");
        data.code = 0;
        data.message = "";
        data.content = token;
      } else {
        data.code = -1;
        data.message = "用户名或密码错误";
        data.content = null;
      }
      res.send(data)
  });
});

module.exports = router;
