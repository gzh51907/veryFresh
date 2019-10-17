//购物车用的接口集合
const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'admin';

const { formatData } = require('../utils')

//管理员登录
Router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    // console.log("aa,bb:", username, password)
    let result = await mongodb.find(colName, { username, password });
    // console.log("result:",result)
    if (result.length) {
        res.send(formatData());
    } else {
        res.send(formatData({ code: 0 }));
    }
});

module.exports = Router;