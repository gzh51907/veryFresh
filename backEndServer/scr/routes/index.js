//通过index.js封装各种路由，处理各种请求。
const express = require('express');
const Router = express.Router();

//引入每个路由模块，前提各子路存在。

const goodsRouter = require('./goods');
const userRouter = require('./user');
const verifyRouter = require('./verify');
const CartRouter = require('./cart');
const adminRouter = require('./admin');

//自定义中间件，跨域授权
Router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//授权所有地址的跨域的请求  http://localhost:8081
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");  //允许的方法

    //跨域请求CORS中的预处理
    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

//解析body中的参数编码,不写获取请去提的数据时就是undefined了
Router.use(express.urlencoded({ extended: true }), express.json());//推导：内部自动调用next

//使用路由
Router.use('/goods', goodsRouter);
Router.use('/user', userRouter);
Router.use('/token', verifyRouter);
Router.use('/cart', CartRouter);
Router.use('/admin', adminRouter);

//被引入(require)的文件一定要有导出(module.exports)
// console.log("路由管理")
module.exports = Router;