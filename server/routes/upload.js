const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const tokenFn = require("./token");
const formidable = require('formidable'); 
const path = require('path'); 
const fs = require('fs'); 
const OSS = require('ali-oss');
const uuid = require('node-uuid')
const co = require('co');
const mysqlConfig = require("../mysql/mysql")

// ali-oss 配置
const OSSoptions = {
    accessKeyId: 'LTAIyDR8Fs8ueEXR',
    accessKeySecret: 'jkqB6rMdk2CpPa5a12zKEmjYrObx0K',
    bucket: 'hupimao008',
    region: 'oss-cn-shanghai'
}
const client = new OSS(OSSoptions)


var connection = mysql.createConnection(mysqlConfig);

// 连接数据库 
connection.connect();

router.post('/', function(req, res, next) {

    const form = new formidable.IncomingForm();
    const MAX_SIZE = 5*1024*1024;
    form.uploadDir = path.join(__dirname, 'tmp');   //文件保存的临时目录为当前项目下的tmp文件夹   
    // form.maxFieldsSize = MAX_SIZE;  //用户头像大小限制为最大20M    
    form.keepExtensions = true;        //使用文件的原扩展名  

    form.parse(req, function (err, fields, file){
        let fileData = file.avatar;
        let type = fileData.type;
        if(type.indexOf("image") === -1){
            res.json({code:-1, message: "只能上传图片", content: null})
            return false
        }
        if(fileData.size > MAX_SIZE){
            let resData = {}
            resData.code = -1;
            resData.message = "只能上传5M以内的图片";
            resData.content = null;
            res.send(resData)
            return false
        }

        // 上传oss
        async function put () {
            let fileName = Date.now() + '' + uuid.v1();
            // console.log('fileName: ', fileName)
            try {
              let result = await client.put(fileName, './routes/tmp/upload_8c11b6f77aa82247e7491d3246c5d806.jpg');
              console.log('result：', result);
              res.json({code:0, message: "", content: null})
              return false
            } catch (e) {
            //   console.log(e);
              res.json({code:-1, message: "上传失败1", content: null})
              return false
            }
          }
          
          put();
    })
  

});

module.exports = router;
