const express = require('express');
const login=require('./manage/login');
// 内容分类
const get_content_class = require('./content/get_content_class');
const post_content_class= require('./content/post_content_class');
// 内容
const get_content = require('./content/get_content');
const post_content = require('./content/post_content');
let router = express.Router();
const db = require('mongoose');
const get_admin=require('./manage/get_admin');
const token=require("./manage/token");
const website_config=require('./website_config/website_config');
const channel=require('./channel/channel');
const Singlepage=require('./Singlepage/Singlepage');
router.get("/",(req,res,next)=>{
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.end("Manage Page");
    next();
});
// get方法生成或者删除以及查询测试数据
router.use("/get_admin",get_admin);
router.use("/get_content_class",get_content_class);
router.use("/get_content",get_content);
// 登录
router.use("/login",login);
// token 验证
router.all("*",token);
// 正式post数据
router.use("/post_content_class",post_content_class);
router.use("/post_content",post_content);
router.use("/website_config",website_config)
router.use('/channel',channel);
router.use('/Singlepage',Singlepage);


module.exports=router;