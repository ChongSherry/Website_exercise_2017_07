const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const content_class = db.model("content_class");

router.get("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    console.log(req.headers.accept)
    res.end("Content Page");
    next();
});
// 添加内容分类(参数:num(默认：1))
router.get("/addContentClass", function (req, res, next) {
    if (req.query.num) {
        var nums = req.query.num;
    } else {
        var nums = 1;
    }
    const addMen = [];
    for (let i = 0; i < 1 * nums; i++) {
        var x=parseInt(Math.random() * 20)+2;
        var str="H";
        for(let j=0;j<x;j++){
            str=str+String.fromCharCode(64 + parseInt(Math.random() * 27));
        }
        var add = {
            name: str,
            remark: str
        }
        addMen[i] = add;
    }
    content_class.create(addMen, (result) => {
        httpout(res, httpout.status.ok);
    })
})

// 查询内容分类（参数：name(默认：全部)）
router.get("/selectContentClass", (req, res, next) => {
    content_class.find({}, (err, result) => {
        httpout(res, httpout.status.ok, result);
    })

})

router.get("/removeContentClass",(req,res,next)=>{
    if(req.query._id){
        var id={
            _id:req.query._id
        }
    }else{
        var id={}
    }
    content_class.remove(id,(err,result)=>{
        err?(httpout(res, httpout.status.e500)):(httpout(res, httpout.status.ok))
    })
})

module.exports = router;