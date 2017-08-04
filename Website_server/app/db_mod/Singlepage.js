//simple_page
/*
    单页模块模
*/
const mongoose = require("mongoose");
//定义分类文档
const Singlepage = new mongoose.Schema({
    title: { type: String },
    url: { type: String }
});
mongoose.model("Singlepage", Singlepage);
