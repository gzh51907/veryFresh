//购物车用的接口集合
const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'admin';

const { formatData ,token} = require('../utils');

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
        res.send(formatData({data:Authorization}));
    } else {
        res.send(formatData({ code: 0 }));
    }
});

//查看用户列表
Router.get('/userList', async (req, res) => {
    let result;
    try {
        result = await mongodb.find('user');
    } catch (error) {
        res.send(formatData({ code: 0 }))
    }
    // console.log("用户列表:",result);
    res.send(formatData({ data: result }));
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
                res.send(formatData({code:0, data: "该用户不存在" }));
            }
        } catch (error) {
            res.send(formatData({code:0, data: "删除错误" }));
        }
    }
})

module.exports = Router;