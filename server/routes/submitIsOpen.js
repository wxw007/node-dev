const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const _ = require("node-plus-string")

var connection = mysql.createConnection({ //创建mysql实例
  host: '0.0.0.0',
  port: '3306',
  user: 'root',
  password: '123456789',
  database: 'test1'
});
connection.connect();


router.post('/', function (req, res, next) {
  let data = {};
  let sqlData;

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

  let {is_open, artical_id} = req.body;


  // 连接数据库 
  
//   let updateSql = `INSERT INTO artical (author_id, content, title, create_time) VALUE ('${author_id}', '${content}', '${title}', '${create_time}')`;
  let updateSql = `UPDATE artical SET content = '${content}', title = '${title}' WHERE id = ${id}`;
  connection.query(updateSql, function (err, result) {
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