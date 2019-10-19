const express = require('express')
const Router = express.Router();

const { formatData, token } = require('../utils')
const { mongodb } = require('../db');

const jwt = require('jsonwebtoken');
let { secret } = require('../config.json');

//
Router.get('/verify', async (req, res) => {
    // console.log("进来校验token密文")
    let { Authorization } = req.query;
    // console.log("校验的token",Authorization)

    // 校验token有效性
    let result = token.verify({ Authorization });//result 为 true || false
    let username;
    let userId;
    if (result) {//token 有效
        var decoded = jwt.verify(Authorization, secret);
        // console.log("解密:", decoded.data) 
        username = decoded.data;
        try {
            let result2 = await mongodb.find("user", { username });
            // console.log("是否有用户？", result2);
            if (result2.length) {
                res.send(formatData({ code: 1, data: { username } }));
            }else{
                res.send(formatData({ code: 0, data: "没有该用户，请重新登录" }));
            }
        } catch (error) {
            res.send(formatData({ code: 0, data: "查找用户时出错，请联系开发者" }))
        }
        //用于查询当前用户id
        // let result = await mongodb.find_uid('user', { username });
        // userId = result[0].userId;
    }else{
        res.send(formatData({code:0}))
    }
    //  返回的数据 data有用户名 和用户id
    // res.send(formatData({ code: result ? 1 : 0, data: { username, userId } })); 
    // res.send(formatData({ code: result ? 1 : 0, data: { username } }));
});

module.exports = Router;
