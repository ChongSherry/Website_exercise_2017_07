/*
    管理员模型
*/
const mongoose = require("mongoose");
//定义文档
const manage = new mongoose.Schema({
    user_id:{type:String},
    password:{type:String},
    name:{type:String},
    token:{type:String},
    last_time:{type:Date,default:Date.now},
    is_admin:{type:Boolean,default:false},
    locked:{type:Boolean,default:false},
    is:{type:Boolean,default:false} //是否锁定
});
mongoose.model("manage", manage);
