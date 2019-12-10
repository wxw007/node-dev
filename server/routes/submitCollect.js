const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const _ = require("node-plus-string")

const mysqlConfig = require("../mysql/mysql")
var connection = mysql.createConnection(mysqlConfig);
connection.connect();

router.post('/', function (req, res, next) {

  // 验证token
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
  let {artical_id, is_collect} = req.body;
  let create_time = Date.now();

  // 连接数据库 
  let sql = '';
  if(is_collect){
    sql = `INSERT INTO collection ( artical_id, user_id, create_time) VALUE (${artical_id}, '${user_id}', ${create_time})`
  } else {
    sql = `DELETE FROM collection WHERE artical_id = ${artical_id} AND user_id = '${user_id}'`
  }
  
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
      res.json({
        code: -1,
        message: "操作失败",
        content: null
      })
      return false
    } else {
      console.log('result: ', result)
      res.json({
        code: 0,
        message: "操作成功",
        content: ""
      })
      return false
    }
  });
});

module.exports = router;