const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const queryPage=require('./mod/queryPage');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
// const post_content_find=require('./mod/post_content_find');
// 添加内容
const content = db.model("content");
router.post('/upload', (req, res, next) => {
    let form = new multiparty.Form({ uploadDir: './public/logo/content/' });
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        if (!err) {
            let inputFile = files.logo[0];
            let type = files.logo[0].originalFilename.split(".")[files.logo[0].originalFilename.split(".").length - 1];
            //临时文件的位置
            var uploadedPath = inputFile.path;
            //准备的文件名
            let fileName = `${uuid()}` + "." + type;
            //要保存的文件名
            var dstPath = "./public/logo/content/" + fileName;
            fs.rename(uploadedPath, dstPath, function (err) {
                if (!err) {
                    httpout(res, httpout.status.ok, { fileName: fileName });
                } else {
                    httpout(res, httpout.status.e500);
                }
            });
        } else {
            httpout(res, httpout.status.e500);
        }
    });
})

router.post('/addContent', (req, res, next) => {
    const {
        beginTime,
        isComment,
        info,
        keyword,
        show,
        sort_id,
        subTitle,
        title,
        top,
        isdraft,
        contentText,
        isrecommend,
        logo
    } = req.body;

    // createtime 默认现在；isdraft 默认不是 ； authttpoutr：默认root；is 删除判断，默认未删除
    let contentList={
        title:title,
        classid:sort_id,
        subTitle:subTitle,
        info:info,
        keyword:keyword,
        sendtime:beginTime,
        isshow:show,
        istop:top,
        iscomment:isComment,
        authttpoutr:"",
        isdraft:isdraft,
        content:contentText,
        isrecommend:isrecommend,
        img_url:logo
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
    //page：页码 pageSize：页中数据大小 Model：表
    

    let $where = {
        title: new RegExp(keyword) //RegExp正则表达式
    }

    let filter_obj = JSON.parse(filters);
    //添加进去
    for (let i in filter_obj) {
        $where[i] = { "$in": filter_obj[i] }
    }

    //'ascend' 'descend'
    let order = {}
    if (order_field) {
        order[order_field] = (order_direct === "ascend") ? 1 : -1;
    }
    //queryPage(<页码>，<一页数量>,<链接表>,<查询条件>,<排序>,<回调函数>)
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
        info,
        isComment,
        keyword,
        show,
        sort_id,
        subTitle,
        title,
        top,
        content_id,
        isrecommend,
        isdraft,
        logo
    } = req.body;
    var contentText=req.body.contentText.replace(/{@and}/g,"&");
    var content_ids={"_id":content_id};
    // createtime 默认现在；isdraft 默认不是 ； authttpoutr：默认root；is 删除判断，默认未删除
    let contentList={
        title:title,
        classid:sort_id,
        subTitle:subTitle,
        info:info,
        keyword:keyword,
        sendtime:beginTime,
        isshow:show,
        istop:top,
        iscomment:isComment,
        content:contentText,
        isrecommend:isrecommend,
        isdraft:isdraft,
        img_url:logo
    }
    content.update(content_ids,contentList,(err,reslut)=>{
        if(!err){
            httpout(res,httpout.status.ok);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
});

router.post('/updateBool',(req,res,next)=>{
    const { isshow,isdraft,istop,iscomment,_id ,isrecommend}=req.body;
    var contentList={
        isshow,
        isdraft,
        istop,
        iscomment,
        isrecommend
    }
    content.update({"_id":_id},contentList,(err,reslut)=>{
        if(!err){
            httpout(res,httpout.status.ok);
        }else{
            httpout(res,httpout.status.e500);
        }
    })
})
module.exports=router;