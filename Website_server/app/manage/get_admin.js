const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');
router.get("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end("get_admin Top Page");
    next();
});


// 添加管理员（参数：num(默认：1)）
router.get("/addManage", (req, res, next) => {
    let top_manage = db.model("manage");
    var num = req.query.num;
    const addMen = [];
    if (num != undefined) {
        var nums = num;
    } else {
        var nums = 1;
    }
    for (let i = 0; i < 1 * nums; i++) {
        var add = {
            user_id: 'admin_' + parseInt(i + 1),
            password: md5("123456789"),
            name: 'xp',
            last_time: new Date().toLocaleDateString(),
            token: uuid()
        }
        addMen[i] = add;
    }
    top_manage.create(addMen, (result) => {
        httpout(res, httpout.status.ok);
    })
})

// 删除管理员（参数：name(默认：全部)）
router.get("/removeManage", (req, res, next) => {
    let top_manage = db.model("manage");

    if (req.query.name != undefined) {
        var del = { user_id: req.query.name };
        top_manage.remove(del, (result) => {
            httpout(res, httpout.status.ok);
        })
    } else {
        var del = { name: "xp" };
        top_manage.remove(del, (result) => {
            httpout(res, httpout.status.ok);
        })
    }

})


// 查询人员(参数：user_id(默认：全部))
router.get("/selectManage", (req, res, next) => {

    let top_manage = db.model("manage");
    // top_manage.count((count) => {
    //     console.log(count);
    // });

    if (req.query.user_id != undefined) {
        var content = { user_id: req.query.user_id ,"is":false};
        top_manage.find(content, (err, result) => {
            httpout(res, httpout.status.ok, result);
        })
    } else {
        top_manage.find((err, result) => {
            httpout(res, httpout.status.ok, result);
        })
    }
})

// 添加超级管理员
router.get("/insetAdmin", (req, res, next) => {

    let top_manage = db.model("manage");
    let user_id = "admin";
    let pwd = md5("admin");
    let connten = {
        "user_id": user_id
    }
    top_manage.find(connten, (err, result) => {
        console.log(result.length);
        if (result.length) {
            httpout(res, httpout.status.e403);
        } else {
            var connten2 = {
                "user_id": user_id,
                "password": pwd,
                "name": '超级管理员',
                "last_time": new Date().toLocaleDateString(),
                "token": "",
                "is": false
            }
            top_manage.create(connten2, (err, result) => {
                httpout(res, httpout.status.ok, result);
            })
        }
    })
});
module.exports = router;