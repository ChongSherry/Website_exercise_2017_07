/*
    管理员模型
*/
const mongoose = require("mongoose");
//定义文档
const content_class = new mongoose.Schema({
    name:{type:String},
    remark:{type:String},
    creattime:{type:Date,default:Date.now()}
});
mongoose.model("content_class", content_class);
