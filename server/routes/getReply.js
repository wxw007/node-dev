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
    // let userInfo = tokenFn.parseToken(token);

    let {id} = req.query;
    let sql = `SELECT a.id, a.artical_id, a.parent_id, a.content, a.user_id, a.create_time, a.belong_to_id, b.nick_name 
    FROM reply a 
    left join user b 
    on a.user_id = b.user_id 
    WHERE artical_id = ${id}`
   

    connection.query(sql, function (err,result0) {
        if(err){
            console.log('出错:',err.message);
            res.json({code: -1, message: "请求失败", content: null})
        } else {
            let result = JSON.parse(JSON.stringify(result0))
            let arr1 = [];
            result.forEach(item => {
                if(!item.belong_to_id){
                    let obj = {}
                    obj =item;
                    obj.children = []
                    arr1.push(obj)
                }
            })

            function order(a,b){
                return a.create_time - b.create_time
            }

            arr1.sort(order)

            arr1.forEach((item1, index1) => {
                result.forEach(item2 => {
                    if(item1.id === item2.belong_to_id){
                        let obj = {...item2};
                        let parentObj = result.find(i => {
                            return i.id === item2.parent_id
                        })
                        obj.parentName = parentObj.nick_name;
                        arr1[index1].children.push(obj)
                        arr1[index1].children.sort(order)
                    }
                })
            })
            
            res.json({code: 0, message: "请求成功", content: arr1})
        }
    })


})

module.exports = router;