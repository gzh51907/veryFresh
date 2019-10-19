//购物车用的接口集合
const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const colName = 'admin';
const randomCode = require('../assert/common');
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
        res.send(formatData({ code: 0, data: "请求错误" }));
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

//管理员添加商品
Router.post('/AddGoods', async (req, res) => {
    let { data } = req.body;
    // console.log(data);
    let productId = `${randomCode(8)}-${randomCode(6)}-${randomCode(6)}-${randomCode(12)}`;
    let shopId = '';
    let shopName = data.shopName;
    //匹配店铺 ID
    if (shopName == "极鲜仓配") {
        shopId = "4ca32455-bda2-4c75-befb-4955c5cbff54";
    } else if (shopName == "波龙巴") {
        shopId = "9aaba2e8-0cd5-487b-8d2e-b2f2d9e12f5f";
    } else if (shopName == "冻品巴-现货") {
        shopId = "3c68b39a-8542-4af7-856a-9e4aa8c4dc35";
    } else if (shopName == "西澳龙.面包蟹巴") {
        shopId = "ad067637-0700-4c80-961c-71b0130887bd";
    }
    let areaName = data.areaName;
    //匹配分区 ID
    console.log("areaName：", areaName)
    let areaId = '';
    if (areaName == "龙虾专区") {
        areaId = "f3287d87-841c-468b-9b26-523b1e32bd0a";
    } else if (areaName == "壳类分区") {
        areaId = "2b3da999-b71e-4fcd-bfb2-20a6410f3ef0";
    } else if (areaName == "其他类") {
        areaId = "bf5abaa7-d7de-48da-8ce6-e9d7d6e2261f";
    } else if (areaName == "蟹类专区") {
        areaId = "1c686a07-fb63-42b6-bdb4-43562dc3d35d";
    } else if (areaName == "肉类专区") {
        areaId = "f4cd1794-1b12-4adc-a5d9-7647053d19a8";
    } else if (areaName == "鱼类专区") {
        areaId = "e199d1a3-526d-46a4-beaf-ddab801eba62";
    }
    let type = parseInt(Math.random() * 2) + 1;
    console.log("areaId：", areaId)
    let insertData = [{
        shopId,
        areaId,
        name: data.name,
        shopName: data.shopName,
        areaName: data.areaName,
        productId,
        abroad: type,
        isValid: false,
        stockQty: data.stockQty,
        imgUrl: "https://file.gfresh.cn/product/2018/4/55/15241277714930.303082088306128042螯龙虾.png",
        unitPrice: data.unitPrice,
        unitName: data.unitName,
        salePrice: (data.unitPrice * 0.8).toFixed(2),
        stockQty: data.stockQty,
        saledQty: data.saledQty,
        sendDate: data.sendDate,
        propertieValue: "公15-20头/500克",
        propertieEnValue: "600~800g",
        packName: "10.0/500克/箱",
        specName: "B级1000g+/只",
        salePriceUnitName: "箱",
        cityName: "上海市",
    }];

    try {
        let result2 = await mongodb.create("goods", insertData);
        // console.log("result2:", result2);
        res.send(formatData({ data: `成功加入购物车` }));
    } catch (error) {
        res.send(formatData({ code: 0, data: `${error}` }))
    }
    // console.log("insertData", insertData);
});

module.exports = Router;