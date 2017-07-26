const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');
router.get("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end("Manage Top Page");
    next();
});



// 登录管理员
router.post("/doLogin", (req, res, next) => {
    let top_manage = db.model("manage");
    let user_id = req.body.user_id;
    let pwd = req.body.password;
    let tokens = req.body.token;
    let connten = {
        "user_id": user_id,
        "password": pwd,
        "is":false
    }
    top_manage.findOne(connten, (err, result) => {
        // console.log(result);
        if (!result) {
            httpout(res, httpout.status.e400);
        } else {
            var token = {
                token: uuid()
            };
            top_manage.update(token, (err) => {
                if (err) {
                    httpout(res, httpout.status.e500);
                } else {
                    httpout(res, httpout.status.ok, token);
                }
            })
        }
    })

});
module.exports = router;