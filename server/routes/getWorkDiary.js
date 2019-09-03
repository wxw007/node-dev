const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

var connection = mysql.createConnection({ //创建mysql实例
    host:'0.0.0.0',
    port:'3306',
    user:'root',
    password:'123456789',
    database:'test1'
});
connection.connect();

router.get("/", function(req, res, next){
    let token = req.headers.token;
    let weekStartDate = req.query.weekStartDate-0 || 0;
    let weekEndDate = req.query.weekEndDate-0 || 0;
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

    let sql = "";
    console.log(req.query)
    if(weekStartDate && weekEndDate){
        sql = `SELECT create_time, content FROM workDiary WHERE author_id = '${user_id}' AND create_time >= ${weekStartDate} AND create_time <= ${weekEndDate} ORDER BY create_time DESC;`
    } else {
        sql = `SELECT create_time, content FROM workDiary WHERE author_id = '${user_id}' ORDER BY create_time DESC;`
    }
    
    connection.query(sql, function (err,result) {
        let data = {};
    
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.json({code: -1, message: "请求失败", content: null})
        } else {
            res.json({code: 0, message: "请求成功", content: result})
        }
    })
    
        
})

module.exports = router;