const express = require('express');

let router = express.Router();
let db = require('mongoose');

router.get("/",(req,res,next)=>{
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.end("Manage Page");
    next();
});

module.exports=router;