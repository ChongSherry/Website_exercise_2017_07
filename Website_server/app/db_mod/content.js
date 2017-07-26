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
    info:{type:String}, //内容
    isdraft:{type:Boolean,default:false}, //是否为草稿
    keyword:{tyep:String,default:""}, //关键字
    sendtime:{type:Date}, //发送时间
    author:{type:String,default:"root"} ,//作者
    isshow:{type:Boolean,default:true}, //是否显示
    istop:{type:Boolean,default:false}, //是否置顶
    is:{type:Boolean,default:false}, //是否删除
    iscomment:{type:Boolean,default:true} //是否可评论
});
mongoose.model("content", content);
// beginTime "2017-07-27 18:01:06"
// contentText "<p>达瓦</p>"
// draft false
// isComment true
// keyword "达瓦" 
// show true
// sort_id "5976f4d00a565bd09ca6fcc2"
// subTitle "达瓦"
// title "无桥墩"
// top false