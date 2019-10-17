const express = require('express');
const Router = express.Router();

const { mongodb } = require('../db');
//自定义的返回信息的一个规范，便于前端处理后端返回的结果
const { formatData, token } = require('../utils');
//引入生成 n 随机数，调用方式，randomCode(n)
const randomCode = require('../assert/common');
// console.log(randomCode(3))

const colName = 'user';

//失去焦点验证用户名
Router.get('/check', async (req, res) => {
    let { username } = req.query;
    // console.log('username', username)
    let result = await mongodb.find(colName, { username });
    // console.log(result)
    if (result.length) {
        res.send(formatData({ code: 0 }))// {code:1,msg:'success',data}
    } else {
        res.send(formatData());
    }
})

//注册
Router.post('/reg', async (req, res) => {
    let userId = `${randomCode(8)}-${randomCode(4)}-${randomCode(4)}-${randomCode(12)}`
    let { username, password } = req.body;
    // console.log("username,password", username, password)
    let result
    try {
        result = await mongodb.create(colName, [{ userId, username, password, regtime: new Date() }]);
        result = formatData();
    } catch (error) {
        result = formatData({ code: 0 });
    }
    res.send(result);
    return result;
})


//登录
Router.get('/login', async (req, res) => {
    let { username, password, mdl } = req.query;

    let result = await mongodb.find(colName, { username, password });

    if (result.length) {
        ///如果前端免登陆，生成一个token返回给前端
        let Authorization
        if (mdl) {
            Authorization = token.create(username);
            // console.log("生成的token:", Authorization)
        }
        //登录成功并返回密文给前端
        res.send(formatData({ data: Authorization }));
    } else {
        res.send(formatData({ code: 0 }));//登录失败
    }
})


module.exports = Router;