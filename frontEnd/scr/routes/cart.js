const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'cart';


//查询购物车数据
Router.get('/queryAll', async (req, res) => {
    let { num, sub } = req.query;
    // console.log('num,sub', num, sub)
    // let num = 11;
    // let sub = 0;
    let result = await mongodb.find_num('cart_test', { num, sub });
    // console.log(result);
    res.send(result)
});


module.exports = Router;
