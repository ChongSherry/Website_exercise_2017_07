const express = require('express')
const next = require('next')
const path = require('path');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// 加载数据库配置文件
const mongoose = require('mongoose');
const config = require('./config.js');
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

app.prepare()
  .then(() => {
    const server = express()
    // 添加 body-parser 中间件就可以了
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.all("*", (req, res, next) => {
            //让接口支持跨域请求
            res.header("Access-Control-Allow-Origin", "*"); //设置跨域访问
            res.header("Access-Control-Allow-Headers","token");
            next();
        });
    server.get("/",(req,res,next)=>{
      res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
      res.end("这是个首页");
    });
    server.get('/index',function(req,res){
    res.sendFile(__dirname+'/index.html');
    });
    server.use("/manage",manage);
    server.use("/website",website);
    
    server.listen(3998, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3998')
    })
  })