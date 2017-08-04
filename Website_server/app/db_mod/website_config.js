/*
    内容模型
*/
const moment = require("moment");
const mongoose = require("mongoose");
//定义文档
const website_config = new mongoose.Schema({
    name:{type:String}, //网站名称
    info:{type:String}, //网站简介
    manager:{type:String}, //负责人
    contact:{type:String}, //联系方式
    copyright:{type:String},//网站版权
    domain:{type:String}, //网站域名
    filing_num:{type:String}, //网站备案号
    filing_info:{type:String}, //网站备案信息
    logo_url:{type:String} //网站logo标志url(横图)
});
mongoose.model("website_config", website_config);