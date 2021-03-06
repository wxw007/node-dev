const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const uuid = require("uuid");

const mysqlConfig = require("../mysql/mysql")
var connection = mysql.createConnection(mysqlConfig);
connection.connect();


router.post('/', function (req, res, next) {
  let data = {};
  let sqlData;

  // 连接数据库 
  let {
    userName,
    passWord,
    nickName,
    avatarUrl
  } = req.body;
  let userId = uuid.v1();


  // 账号是否被注册
  function isExits() {
    let isExitsSql = `SELECT user_name FROM user WHERE user_name = '${userName}';`
    connection.query(isExitsSql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message);
        res.json({
          code: -1,
          message: "注册失败",
          content: null
        })
        return false
      } else {
        if (!result || result.length === 0) {
          insertSql()
        }
        else {
          res.json({
            code: -1,
            message: "用户已被注册",
            content: ""
          })
          return false
        }
      }
    });
  }

  // 创建用户数据--注册
  function insertSql() {
    let insertSql = `INSERT INTO user (user_id, user_name, pass_word, nick_name, avatar) VALUES ('${userId}','${userName}', '${passWord}', '${nickName}', '${avatarUrl}');`
    connection.query(insertSql, function (err, result) {
      if (err) {
        console.log('------------')
        console.log('[SELECT ERROR]:', err.message);
        console.log('------------')
        res.json({
          code: -1,
          message: "注册失败",
          content: null
        })
        return false
      } else {
        console.log('result: ', result)
        res.json({
          code: 0,
          message: "",
          content: ""
        })
        return false
      }
    });
  }

  isExits()

});

module.exports = router;