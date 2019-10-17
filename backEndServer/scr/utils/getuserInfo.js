// 此文件的作用： 传入 token 密文，解密出 用户名和查训出该用户 userId

// const express = require('express')
// const Router = express.Router();
const { mongodb } = require('../db');
const colName = 'user';
// const { formatData, token } = require('../utils')

const jwt = require('jsonwebtoken');
let { secret } = require('../config.json'); //秘钥

let tk = jwt.sign({ data: 'lh' }, secret);

async function getUserInfo(token) {
    var decoded = jwt.verify(token, secret);
    let username = decoded.data;

    let result = await mongodb.find_uid(colName, { username });
    let userId = result[0].userId;

    
    return { username, userId };
}

//直接调用 getUserInfo(token) 返回的是promise 对象，并且需要解构,看如下
// (async function aa() {
//     let aa = await getUserInfo(tk);
//     console.log(aa)
// })();

module.exports = getUserInfo;