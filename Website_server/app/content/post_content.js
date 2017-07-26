const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const queryPage=require('./mod/queryPage');
// const post_content_find=require('./mod/post_content_find');
// 添加内容
const content = db.model("content");
router.post('/addContent', (req, res, next) => {
    const {
        beginTime,
        contentText,
        isComment,
        keyword,
        show,
        sort_id,
        subTitle,
        title,
        top
    } = req.body;

    // createtime 默认现在；isdraft 默认不是 ； authttpoutr：默认root；is 删除判断，默认未删除
    let contentList={
        title:title,
        classid:sort_id,
        subTitle:subTitle,
        info:contentText,
        keyword:keyword,
        sendtime:beginTime,
        isshow:show,
        istop:top,
        iscomment:isComment,
        authttpoutr:""
    }
    let top_manage = db.model("manage");
    var user={
         "token": req.headers.token,
          "is": false
    }
    top_manage.find(user,{user_id:1},(err, result) => {
        if (!result) {
            httpout(res, httpout.status.e500);
        } else {
            contentList.authttpoutr=result[0].user_id;
            content.create(contentList,(err,result)=>{
                if(err){
                    httpout(res, httpout.status.e500);
                }else{
                    httpout(res, httpout.status.ok);
                }
            })
        }
    })
});
// 排序获取列表
router.post("/sortContentList", (req, res, next) => {
    let model = content;
    // //接参数
    const { keyword, pageNumber, pageSize, order_field, order_direct, filters } = req.body;
    //查询
    //page, pageSize, Model,queryParams, sortParams, callback
    //queryPage()
    let $where = {
        title: new RegExp(keyword)
    }

    let filter_obj = JSON.parse(filters);

    for (let i in filter_obj) {
        $where[i] = { "$in": filter_obj[i] }
    }


    //'ascend' 'descend'
    let order = {}
    if (order_field) {
        order[order_field] = (order_direct === "ascend") ? 1 : -1;
    }

    queryPage(pageNumber, pageSize, model, $where, order, (error, result) => {
        if (!error) {
            httpout(res, httpout.status.OK, result);
        } else {
            httpout(res, httpout.e500, error);
        }
    });
});

router.post("/removeContent",(req,res)=>{
    const ids = req.body.ids;
    
    let $where = {
        _id:{$in:ids.split(",")}
    };
    content.remove($where, (err) => {
        if (!err) {
            httpout(res, httpout.status.OK);
        } else {
            httpout(res, httpout.status.e500, err);
        }
    })
    
});
// 根据id获取内容
router.post("/idSelectContent",(req,res,next)=>{
    var conntent_ids={
        "_id":req.body.content_id,
        "is":false
    };
    content.find(conntent_ids,(err,result)=>{
        if(!err){
            httpout(res,httpout.status.ok,result);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
})
// updateContent
// 更新数据
router.post('/updateContent', (req, res, next) => {
    const {
        beginTime,
        contentText,
        isComment,
        keyword,
        show,
        sort_id,
        subTitle,
        title,
        top,
        content_id
    } = req.body;
    var content_ids={"_id":content_id};
    // createtime 默认现在；isdraft 默认不是 ； authttpoutr：默认root；is 删除判断，默认未删除
    let contentList={
        title:title,
        classid:sort_id,
        subTitle:subTitle,
        info:contentText,
        keyword:keyword,
        sendtime:beginTime,
        isshow:show,
        istop:top,
        iscomment:isComment
    }
    content.update(content_ids,contentList,(err,reslut)=>{
        if(!err){
            httpout(res,httpout.status.ok);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
});
module.exports=router;