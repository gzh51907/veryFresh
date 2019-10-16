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
    let result = token.verify({ Authorization });
    let username;
    let userId;
    if (result) {
        var decoded = jwt.verify(Authorization, secret);
        // console.log("解密:", decoded.data) 
        username = decoded.data;

        let result = await mongodb.find_uid('user', { username });
        userId = result[0].userId;
    }
    //解密
    res.send(formatData({ code: result ? 1 : 0, data: { username, userId } })); 
});

module.exports = Router;
