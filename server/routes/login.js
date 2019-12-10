const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const mysqlConfig = require("../mysql/mysql")
var connection = mysql.createConnection(mysqlConfig);
connection.connect();



router.post('/', function(req, res, next) {
  console.log("登录")
    let data = {};
    let sqlData;

  // 连接数据库 
  let {userName, passWord} = req.body;
  let sql = `SELECT * FROM user WHERE user_name = '${userName}' AND pass_word = '${passWord}';`
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
