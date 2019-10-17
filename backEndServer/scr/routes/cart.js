//购物车用的接口集合
const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'cart';
const jwt = require('jsonwebtoken');
let { secret } = require('../config.json');

const { formatData } = require('../utils')

//数组去重
function noRepeat(arr) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr2.indexOf(arr[i]) == -1) {
            arr2.push(arr[i]);
        }
    }
    // console.log(arr2)
    return arr2;
}

//查询购物车数据，进入购物车路由时，传来token 解密出用户名，
//再根据用户名去 user 表查出userId  最后根据 userId 查cart，得到数据，返回渲染
Router.get('/queryAll', async (req, res) => {
    // console.log("进入接口了")
    //接收来自前端的token 
    let { token } = req.query;
    // data = JSON.stringify(data)
    // console.log("购物车传来的token：", token);
    var decoded = jwt.verify(token, secret);

    let username = decoded.data;
    // console.log("解密username:", username)

    let result = await mongodb.find_uid('user', { username });
    let userId = result[0].userId;//查到用户id
    // console.log("userId:", userId);

    let queryData = await mongodb.find(colName, { userId });
    // console.log("queryData:",queryData);
    datalist = [];
    let arrShop = [];
    queryData.forEach((item, idx) => {
        // console.log(item.shopId);
        arrShop.push(item.shopId);
    });
    console.log("arrShop:",arrShop);
    console.log("---------------------------分隔线-------------------------------")
    arrShop = noRepeat(arrShop)
    console.log("arrShop:", arrShop)

    console.log("---------------------------分隔线-------------------------------")
    // shoppingCartVos


    // res.send(formatData({ data: queryData }))
    res.send(queryData);
});


module.exports = Router;
