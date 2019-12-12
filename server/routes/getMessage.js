const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

const mysqlConfig = require("../mysql/mysql")
var connection = mysql.createConnection(mysqlConfig);
connection.connect();

router.get("/", function (req, res, next) {
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
    let {type} = req.query;


    let sql = "";
    if(type==='num'){
    }

   
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('错误:', err.message);
            res.json({
                code: -1,
                message: "请求失败",
                content: null
            })
        } else {
            let result1 = JSON.parse(JSON.stringify(result))
            result1.forEach(item => {
                if (!item.thumb_up_list) {
                    item.thumb_up_list = []
                } else {
                    item.thumb_up_list = JSON.parse(item.thumb_up_list)
                }
                item.thumb_up_count = item.thumb_up_list.length;
                if (item.thumb_up_list.indexOf(user_id) > -1) {
                    item.is_thumb_up = 1;
                } else {
                    item.is_thumb_up = 0;
                }
            })
            res.json({
                code: 0,
                message: "请求成功",
                content: result1
            })

        }
    })
})



module.exports = router;