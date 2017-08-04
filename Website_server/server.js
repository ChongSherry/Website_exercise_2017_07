const express = require('express')
const nextJS = require('next')
var path = require('path');
const dev = process.env.NODE_ENV !== 'production'
const next = nextJS({ dev })
//app布置到全局
global.next = next;
const handle = next.getRequestHandler()
//支持post提交
var bodyParser = require('body-parser');
// 加载数据库配置文件
const mongoose = require('mongoose');
const config = require('./config.js');
const ueditorServer=require('./ueditorServer');
//支持post提交
var bodyParser = require('body-parser');

// 数据库加载**********
const models = path.join(__dirname, config.modalPath);

fs.readdirSync(models)
  .filter(file => {
    return ~file.indexOf('.js');
  }).forEach(file => {
    console.log("引入", path.join(models, file));
    require(path.join(models, file))
  });
// 连接数据库
mongoose.connect(config.db_connection);
// ***数据库加载结束****************

// 引入路由组件
const manage = require('./app/manage');
const website=require('./app/website');

next.prepare()
  .then(() => {
    const server = express()
    // 添加 body-parser 中间件就可以了
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(express.static(path.join(__dirname, 'public')));
    server.use(express.static(path.join(__dirname, 'static')));
    server.all("*", (req, res, next) => {
            //让接口支持跨域请求
            res.header("Access-Control-Allow-Origin", "*"); //设置跨域访问
            res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token");
            next();
        });
    
    server.use("/manage",manage);
    
    server.use("/ueditor/ue",ueditorServer);
    server.use("/", website);
    server.listen(3998, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3998')
    })
  })