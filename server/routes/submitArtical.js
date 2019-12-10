const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const _ = require("node-plus-string")

const mysqlConfig = require("../mysql/mysql")
var connection = mysql.createConnection(mysqlConfig);
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

  let author_id = userInfo.userId;
  let {content, title, is_open} = req.body;
  let create_time = Date.now();

  if(!title){
    res.json({code: -1, message: "标题不能为空", content: ""})
    return false
  }
  if(!content){
    res.json({code: -1, message: "内容不能为空", content: ""})
    return false
  }

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
  
  let insertSql = `INSERT INTO artical (author_id, content, title, create_time, is_open, update_time) VALUE ('${author_id}', '${content}', '${title}', '${create_time}', ${is_open}, '${create_time}')`;
  connection.query(insertSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
      res.json({
        code: -1,
        message: "发布失败",
        content: null
      })
      return false
    } else {
      console.log('result: ', result)
      res.json({
        code: 0,
        message: "添加成功",
        content: ""
      })
      return false
    }
  });
});

module.exports = router;