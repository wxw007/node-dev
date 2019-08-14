const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const uuid = require("uuid")

var connection = mysql.createConnection({ //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456789',
    database:'test1'
});
connection.connect();

router.post("/", function(req, res, next){
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

    let content = req.body.content;
    let id = uuid.v1();
    let create_time = Date.now();
    let sql = `INSERT INTO workDiary (id, create_time, content, author_id) VALUES ('${id}','${create_time}', '${content}', '${user_id}');`
    connection.query(sql, function (err,result) {
        let data = {};
    
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.json({code: -1, message: "保存失败", content: null})
        } else {
            res.json({code: 0, message: "保存成功", content: null})
        }
    })
    
        
})

module.exports = router;