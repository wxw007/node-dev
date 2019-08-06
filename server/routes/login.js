var express = require('express');
var router = express.Router();
var mysql = require("mysql");

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
  let sql = `SELECT * FROM login WHERE user_name = '${userName}' AND pass_word = '${passWord}';`
  connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    sqlData = result
    if(sqlData && sqlData.length>0){
        data.code = 0;
        data.message = "";
        data.content = sqlData;
      } else {
        data.code = -1;
        data.message = "登录失败";
        data.content = null;
      }
      res.send(data)
  });
});

module.exports = router;
