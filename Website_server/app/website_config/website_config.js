const express = require('express');
const router = express.Router();
const db = require('mongoose');
const httpout = require('../base/httpOutput');
const md5 = require('md5');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const config = db.model("website_config");

router.post('/logoUpload', (req, res, next) => {
    let form = new multiparty.Form({ uploadDir: './public/logo/website/' });
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
            var dstPath = "./public/logo/website/" + fileName;
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
router.post('/createConfig', (req, res, next) => {
    const { 
        contact, 
        copyright,
        domain, 
        filing_info, 
        filing_num, 
        info, 
        logo_url, 
        manager, 
        name 
    } = req.body;
    let creates={
        contact, 
        copyright,
        domain, 
        filing_info, 
        filing_num, 
        info, 
        logo_url, 
        manager, 
        name 
    }

    config.remove({},(err,result)=>{
        if(err){
            httpout(res, httpout.status.e500);
        }else{
            config.create(creates,(err,result)=>{
                if(err){
                    httpout(res, httpout.status.e500);
                }else{
                    httpout(res, httpout.status.ok);                    
                }
            })
        }
    })
})

router.get('/getConfig',(req,res,next)=>{
    config.find({},(err,result)=>{
        if(err){
            httpout(res, httpout.status.e500);
        }else{
            httpout(res, httpout.status.ok,result);
        }
    })
})
module.exports = router;