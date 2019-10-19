//购物车用的接口集合
const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'admin';

const { formatData, token } = require('../utils');

//管理员登录
Router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    // console.log("username,password:", username, password)
    let result = await mongodb.find(colName, { username, password });
    // console.log("result:",result)
    if (result.length) {
        //返回一个token
        Authorization = token.create(username);
        // console.log(Authorization)
        res.send(formatData({ data: Authorization }));
    } else {
        res.send(formatData({ code: 0 }));
    }
});

//查看用户列表
Router.get('/userList', async (req, res) => {
    let { pages, number } = req.query;
    try {
        let result = await mongodb.find_num('user', { pages, number });
        let num = await mongodb.find('user');
        res.send(formatData({ data: { result, AllNum: num.length } }))
    } catch (error) {
        res.send(formatData({ code: 0, data: "请求错误" }))
    }
});

//删除用户
Router.get('/delUser', async (req, res) => {
    let { userId } = req.query;
    if (userId) {
        // console.log("userId:", userId)
        try {
            let result = await mongodb.remove('user', { userId });
            // console.log(result.deletedCount)
            if (result.deletedCount) {
                res.send(formatData({ data: "删除成功!" }));
            } else {
                // console.log("没有用户")
                res.send(formatData({ code: 0, data: "该用户不存在" }));
            }
        } catch (error) {
            res.send(formatData({ code: 0, data: "删除错误" }));
        }
    }
});

//mongoDB 查询商品数据
Router.get('/getNumGoods', async (req, res) => {
    let { pages, number } = req.query;
    // console.log('pages, number', {pages, number})
    // let num = 11;
    // let sub = 0;
    try {
        let result = await mongodb.find_num(colName, { pages, number });
        let num = await mongodb.find(colName);
        res.send(formatData({ data: { result, AllNum: num.length } }))
    } catch (error) {
        res.send(formatData({ code: 0, data: "请求错误" }))
    }
    // console.log(result);
});

module.exports = Router;