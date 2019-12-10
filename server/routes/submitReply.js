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
  let {content, parent_id, belong_to_id, artical_id} = req.body;
  let create_time = Date.now();

  //转码
function html_encode(str)
{
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br/>");
    return s;
}
// content = html_encode(content)

  

  // 连接数据库 
  
  let insertSql = `INSERT INTO reply (artical_id, parent_id, content, user_id, create_time, belong_to_id) VALUE ('${artical_id}', ${parent_id}, '${content}', '${user_id}', '${create_time}', ${belong_to_id})`;
  connection.query(insertSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
      res.json({
        code: -1,
        message: "评论失败",
        content: null
      })
      return false
    } else {
      console.log('result: ', result)
      res.json({
        code: 0,
        message: "评论成功",
        content: ""
      })
      return false
    }
  });
});

module.exports = router;