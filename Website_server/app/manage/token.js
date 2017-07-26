const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');

router.post("*", (req, res, next) => {
    if (req.method =="OPTIONS") {
        res.end();
    } else {
        let top_manage = db.model("manage");
        let token = req.headers.token;
        top_manage.findOne({ "token": token,"is":false }, (err, result) => {
            if(!result){
                httpout(res,httpout.status.e401);
                res.end();
            }else{
                next()
            }
        })
    }
})
module.exports=router;