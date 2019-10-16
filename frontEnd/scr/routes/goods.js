const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'goods';

//mongoDB 查询商品数据
Router.get('/goodList', async (req, res) => {
    let { num, sub } = req.query;
    // console.log('num,sub', num, sub)
    // let num = 11;
    // let sub = 0;
    let result = await mongodb.find_num(colName, { num, sub });
    // console.log(result);
    res.send(result)
})

//购物车 
Router.get('/cart', async (req, res) => {
    let { num, sub } = req.query;
    // console.log('num,sub', num, sub)
    // let num = 11;
    // let sub = 0;
    let result = await mongodb.find_num('cart', { num, sub });
    // console.log(result);
    res.send(result)
});

//测试用的 购物车 
Router.get('/cart_test', async (req, res) => {
    let { num, sub } = req.query;
    // console.log('num,sub', num, sub)
    // let num = 11;
    // let sub = 0;
    let result = await mongodb.find_num('cart_test', { num, sub });
    // console.log(result);
    res.send(result)
});



module.exports = Router;
