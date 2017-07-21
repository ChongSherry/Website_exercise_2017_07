const express = require('express');
const manage_top=require('./manage/admin');

let router = express.Router();
let db = require('mongoose');

router.get("/",(req,res,next)=>{
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.end("Manage Page");
    next();
});

router.use("/top",manage_top);

module.exports=router;