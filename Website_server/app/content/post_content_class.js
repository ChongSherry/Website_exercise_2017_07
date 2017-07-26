const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const content_class = db.model("content_class");

router.post("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    console.log(req.headers.accept)
    res.end("Content Class config Page");
    next();
});
// 添加内容分类(参数:num(默认：1))
router.post("/addContentClass", function (req, res, next) {
    const { name, remark } = req.body;

    let addMen = {
        name: name,
        remark: remark,
        creattime: Date.now()
    }

    content_class.create(addMen, (err, result) => {
        if (err) {
            httpout(res, httpout.status.e500);
        } else {
            httpout(res, httpout.status.ok);
        }
    })
})

// 查询内容分类（参数：name(默认：全部)）
router.post("/selectContentClass", (req, res, next) => {
    content_class.find({}, (err, result) => {
        httpout(res, httpout.status.ok, result);
    })

})

router.post("/removeContentClass", (req, res, next) => {
    var ids = req.body.ids;
    var idm = ids.split(",");
    if (idm.length > 1) {
        for (var i = 0; i < idm.length; i++) {
            var con = {
                _id: idm[i]
            };
            content_class.remove(con, (err) => {
                if (err) {
                    httpout(res, httpout.status.e500, err);
                } else {
                    
                }
            })
        }
        httpout(res, httpout.status.OK);
    } else {
        let $where = {
            _id: idm
        };
        content_class.remove($where, (err) => {
            if (!err) {
                httpout(res, httpout.status.OK);
            } else {
                httpout(res, httpout.status.e500, err);
            }
        })
    }

})
// 更新内容分类
router.post("/updateContentClass", (req, res, next) => {
    const { name, remark,_id } = req.body;
    var uid={
        _id
    }
    var upd={
        name,
        remark
    }
    content_class.update(uid,upd,(err,result)=>{
        if(!err){
            httpout(res,httpout.status.ok);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
})
module.exports = router;