const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const moment=require('moment');
// 链接表
const content = db.model("content");
// 首页
router.get("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end("Get Content test data Page"+moment().format('YYYY-MM-DD HH:mm:ss'));
    next();
});

// 添加内容
router.get('/addContent', (req, res, next) => {
    var x=parseInt(Math.random*5);
    var y;
    if(x<3){
        y="59772e8d1739f8f4040b4cf7"
    }else{
        y="59772e931739f8f4040b4cf8";
    }
    var data_add = {
        title: "测试标题",
        classid:y,
        subTitle: "测试子标题",
        info: "测试信息",
        isdraft:false,
        keyword: "测试",
        sendtime:moment("2017-04-22 19:50:16",'YYYY-MM-DD HH:mm:ss'),
        author:"admin"
    }
    content.create(data_add,(err,result)=>{
        if(!err){
            content.find({},(err,result)=>{
                !err?(httpout(res,httpout.status.ok,result)):(httpout(res,httpout.status.e500));
            })
        }else{
            httpout(res,httpout.status.e500);
        }
    })
})

// 查询内容
router.get('/sselectContent', (req, res, next) => {
    
    content.find({},(err,result)=>{
        if(!err){
           httpout(res,httpout.status.ok,result);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
})


module.exports=router;