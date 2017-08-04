/*
    内容模型
*/
const moment = require("moment");
const mongoose = require("mongoose");
//定义文档
const content = new mongoose.Schema({
    title:{type:String}, //标题
    classid:{type:String}, //分类id
    subTitle:{type:String}, //子标题
    createtime:{type:Date,default:moment().format('YYYY-MM-DD HH:mm:ss')}, //创建时间
    info:{type:String}, //简介
    isdraft:{type:Boolean,default:false}, //是否为草稿
    keyword:{tyep:String,default:""}, //关键字
    sendtime:{type:Date}, //发送时间
    author:{type:String,default:"root"} ,//作者
    isshow:{type:Boolean,default:false}, //是否显示
    istop:{type:Boolean,default:false}, //是否置顶
    is:{type:Boolean,default:false}, //是否删除
    iscomment:{type:Boolean,default:false}, //是否可评论
    content:{type:String,default:""},   //内容
    isrecommend:{type:Boolean,default:false},
    img_url:{type:String}
});
mongoose.model("content", content);