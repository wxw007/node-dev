const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

var connection = mysql.createConnection({ //创建mysql实例
    host: '0.0.0.0',
    port: '3306',
    user: 'root',
    password: '123456789',
    database: 'test1'
});
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

    let {
        id,
        page,
        rows,
        type
    } = req.query;
    let sql = "";
    if (!!id) {
        sql = `SELECT a.author_id, a.content, a.title, a.id, a.create_time, a.is_open, b.nick_name, b.avatar 
        FROM artical a 
        left join user b 
        on a.author_id = b.user_id 
        WHERE id = ${id}`
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('错误:', err.message);
                res.json({
                    code: -1,
                    message: "请求失败",
                    content: null
                })
            } else {
                let artical = JSON.parse(JSON.stringify(result))
                
                if (!artical || artical.length === 0) {
                    res.json({
                        code: 0,
                        message: "请求成功",
                        content: artical
                    })
                } else {
                    if (user_id === artical[0].author_id || artical[0].is_open) {
                        
                        res.json({
                            code: 0,
                            message: "请求成功",
                            content: artical
                        })
                    } else {
                        res.json({
                            code: -1,
                            message: "无权限查看",
                            content: ""
                        })
                    }
                }
            }
        })
    } else {
        let start = (page - 1) * rows;
        if (type === "open") {
            sql = `SELECT a.author_id, a.content, a.title, a.id, a.create_time, a.is_open, b.nick_name, b.avatar FROM artical a left join user b on a.author_id = b.user_id WHERE is_open = 1 ORDER BY update_time desc LIMIT ${start},${rows}`

        } else if (type === "self") {
            sql = `SELECT a.author_id, a.content, a.title, a.id, a.create_time, a.is_open, b.nick_name, b.avatar FROM artical a left join user b on a.author_id = b.user_id WHERE author_id = '${user_id}' ORDER BY create_time desc LIMIT ${start},${rows}`

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
                res.json({
                    code: 0,
                    message: "请求成功",
                    content: result
                })

            }
        })

    }
})

module.exports = router;