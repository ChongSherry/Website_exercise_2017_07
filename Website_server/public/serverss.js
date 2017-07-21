const express = require('express')
const next = require('next')
var path = require('path');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
//支持post提交
var bodyParser = require('body-parser');

//引入数据库和配置
const mongoose = require("mongoose");
const config = require("./config.js");

/* 数据库配置 */
// 数据库加载**************************** begin ****************
//引入mongoose
//引入mongoose模块
const models = path.join(__dirname, config.modelPath);

fs.readdirSync(models)
    .filter(file => {
        return ~file.indexOf('.js');
    }).forEach(file => {
        console.log("引入", path.join(models, file));
        require(path.join(models, file))
    });
//连接数据库
mongoose.connect(config.db_connection);
// 数据库加载**************************** end ****************

/* 引入路由中间件 */
const admin = require("./app/admin");

app.prepare()
    .then(() => {
        const server = express();
        // 添加 body-parser 中间件就可以了
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.all("*", (req, res, next) => {
            //让接口支持跨域请求
            res.header("Access-Control-Allow-Origin", "*"); //设置跨域访问
            next();
        });

        server.get("/", (req, res, next) => {
            res.end("!!!!!!!!!!!!!!!!");
        });

        server.use("/admin", admin);



        //   server.get('/a', (req, res) => {
        //     return app.render(req, res, '/b', req.query)
        //   })

        //   server.get('/b', (req, res) => {
        //     return app.render(req, res, '/a', req.query)
        //   })

        //   server.get('*', (req, res) => {
        //     return handle(req, res)
        //   })

        server.listen(3001, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3001')
        })
    })