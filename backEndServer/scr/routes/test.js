
// const express = require('express')
// const Router = express.Router();

// const { formatData, token } = require('../utils')

/// 用来测试 token 的加密 和解密

const jwt = require('jsonwebtoken');
let { secret } = require('../config.json'); //秘钥

var token = jwt.sign({ data: 'bar' }, secret);//加密的数据


// console.log("生成的密文：", token)

var decoded = jwt.verify(token, secret);
// console.log("解密:", decoded.data) // bar
// module.exports = Router;
