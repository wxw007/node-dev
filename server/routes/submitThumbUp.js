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
  database: 'hupicat'
});
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
  let {id, is_thumb_up} = req.body;
  let create_time = Date.now();

  // 连接数据库 
  let sql1 = `SELECT thumb_up_list FROM artical WHERE id = ${id}`;
  connection.query(sql1, function (err, result) {
    if (err) {
      res.json({
        code: -1,
        message: "操作失败",
        content: null
      })
      return false
    } else {
      let result1 = JSON.parse(JSON.stringify(result));
      console.log("--result: ", result)
      let thumb_up_list = ((result1.length>0) && result1[0] && result1[0].thumb_up_list)? JSON.parse(result1[0].thumb_up_list) : [];
      if(is_thumb_up){
            thumb_up_list.push(user_id)

      } else {
          let i =thumb_up_list.findIndex(item => {
            return item === user_id
          })
          thumb_up_list.splice(i, 1)
      }

      let sql2 = `UPDATE artical SET thumb_up_list='${JSON.stringify(thumb_up_list)}' WHERE id=${id}`;
      connection.query(sql2, function (err, result) {
        if (err) {
          res.json({
            code: -1,
            message: "操作失败",
            content: null
          })
          return false
        } else {
          res.json({
            code: 0,
            message: "操作成功",
            content: ""
          })
          return false
        }
      });
      return false
    }
  });
});

module.exports = router;