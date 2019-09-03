const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const uuid = require("uuid")

var connection = mysql.createConnection({ //创建mysql实例
    host: '0.0.0.0',
    port: '3306',
    user: 'root',
    password: '123456789',
    database: 'test1'
});
connection.connect();

router.post("/", function (req, res, next) {
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
    let create_time = Date.now();

    // 先查询当天是否已经有记录 如果有则添加到已有记录 否则创建当天记录
    queryList()
    function queryList() {
        console.log('content: ', content)


        let start = new Date(new Date().toLocaleDateString()).getTime()
            ;

        // 当天23:59
        let end = new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1


        let sql = `SELECT content, id FROM workDiary WHERE author_id = '${user_id}' AND create_time >= ${start} AND create_time < ${end};`
        connection.query(sql, function (err, result) {
            
            
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
                res.json({ code: -1, message: "保存失败", content: null })
            } else {
                let contentList = JSON.parse(JSON.stringify(result));
                if (result && contentList.length > 0) {
                    let id = contentList[0].id;
                    let oldContent = "";
                    contentList.forEach(item => {
                        oldContent += item.content+','
                    })
                    let reqContent = "";
                    content.forEach( item => {
                        reqContent += item + ','  
                    })
                    let newContent = oldContent + reqContent;
                    newContent = newContent.substring(0, newContent.length - 1)
                    updateWorkDiary(newContent, id)

                } else {
                    insertWorkDiary()
                }

            }
        })
    }



    // 添加一条记录
    function insertWorkDiary() {
        let sqlInsert = `INSERT INTO workDiary (create_time, content, author_id) VALUES ('${create_time}', '${content}', '${user_id}');`
        connection.query(sqlInsert, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
                res.json({ code: -1, message: "保存失败", content: null })
                return
            } else {
                res.json({ code: 0, message: "保存成功", content: null })
                return
            }
        })
    }

    //在已有数据上更新记录
    function updateWorkDiary(newContent, id) {
        let sqlUpdate = `UPDATE workDiary SET content='${newContent}', create_time=${create_time} WHERE author_id='${user_id}' AND id = ${id};`
        console.log('sqlUpdate: ', sqlUpdate)
        connection.query(sqlUpdate, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
                res.json({ code: -1, message: "保存失败", content: null })
                return
            } else {
                res.json({ code: 0, message: "保存成功", content: null })
                return
            }
        })
    }


})

module.exports = router;