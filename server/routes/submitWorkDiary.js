const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");

var connection = mysql.createConnection({ //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456789',
    database:'test1'
});
connection.connect();

router.post("/", function(req, res, next){
    
})

module.exports = router;