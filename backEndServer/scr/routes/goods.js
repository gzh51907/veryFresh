const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const { formatData } = require('../utils');
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
});

//查询所有数据接口
Router.get('/queryAll', async (req, res) => {
    let result = await mongodb.find(colName);
    res.send(result);
});

//查商品详情接口   参数传递： productId 商品id
Router.get("/queryByPid", async (req, res) => {
    let { productId } = req.query;
    console.log("productId：", productId)
    let result = await mongodb.find(colName, { productId });
    console.log("result:", result.length)
    if (result.length) {
        res.send(formatData({ data: result }))
    } else {
        res.send(formatData({ code: 0 }));
    }
});

//商品分区部分接口
Router.get('/queryArea', async (req, res) => {
    console.log("进入分区路由")
    let area = await mongodb.find("Area");
    let arrArea = [];
    area.forEach(item => {
        arrArea.push({
            areaId :item.areaId,
            areaName: item.areaName,
            quoteList: []
        });
    });
    console.log("areaName：", arrArea);
    let datalist = [];
    res.send(formatData({data:arrArea}))

});


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
