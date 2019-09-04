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

    let {id, page, rows} = req.query;
    let sql = "";
    // if(!!id){
    //     sql = `SELECT author_id, content, title, id, create_time FROM artical WHERE id = ${id}`
    // } else {
    //     sql = `SELECT author_id, content, title, id, create_time FROM artical`
    // }
    if(!!id){
        sql = `SELECT a.author_id, a.content, a.title, a.id, a.create_time, b.nick_name, b.avatar 
        FROM artical a 
        left join user b 
        on a.author_id = b.user_id 
        WHERE id = ${id}`
    } else {
        let start = (page-1) * rows
        sql = `SELECT a.author_id, a.content, a.title, a.id, a.create_time, b.nick_name, b.avatar FROM artical a left join user b on a.author_id = b.user_id  ORDER BY create_time desc LIMIT ${start},${rows}`
    }

    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]1111:',err.message);
            res.json({code: -1, message: "请求失败", content: null})
        } else {
            res.json({code: 0, message: "请求成功", content: result})
           
        }
    })



    // connection.query(sql, function (err,result) {
    //     if(err){
    //         console.log('[SELECT ERROR]1111:',err.message);
    //         res.json({code: -1, message: "请求失败", content: null})
    //     } else {
    //         let authorId = JSON.parse(JSON.stringify(result))[0].author_id;
    //         getAuthor(authorId, function(author) {
    //             let content = {};
    //             content.author = author[0];
    //             content.artical = JSON.parse(JSON.stringify(result))[0];
    //             res.json({code: 0, message: "请求成功", content: content})
    //         });
           
    //     }
    // })

    // // 通过author_id 获取作者名
    // function getAuthor(authorId, cb){
    //     let author = null;
    //     let getAuthorSql = `SELECT nick_name, avatar FROM user WHERE user_id = '${authorId}'`;
    //     console.log('authorId: ', authorId)
    //     connection.query(getAuthorSql,  (err,result) => {
    //         if(err){
    //             console.log('[SELECT ERROR]2222:',err.message);
    //             res.json({code: -1, message: "查询失败", content: null})
    //         } else {
    //             author = JSON.parse(JSON.stringify(result))
    //             cb(author)
    //             console.log('---------111---------')
    //             console.log(author)
    //             console.log('------------------')
                
    //         }
    //     })
    // }
})

module.exports = router;