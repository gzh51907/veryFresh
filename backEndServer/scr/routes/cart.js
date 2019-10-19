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
    if (token) {
        var decoded = jwt.verify(token, secret);

        let username = decoded.data;
        let result;
        try {
            result = await mongodb.find_uid('user', { username });
            // console.log("用户名：", username)
        } catch (error) {
            // console.log("查找不到用户")
            res.send(formatData({ code: 0, data: "查找不到该用户，请重新登录" }))
        }

        let userId = result[0].userId;//查到用户id
        // console.log("查到的userId:", userId);
        let queryData;
        try {
            queryData = await mongodb.find(colName, { userId });
            // console.log("queryData:", queryData.length);
        } catch (error) {
            res.send(formatData({ code: 0 }))
        }

        //提取店铺名
        let arrShop = [];
        let arrShopId = [];
        queryData.forEach((item, idx) => {
            // console.log(item.shopId);
            arrShop.push(item.shopName);//
            arrShopId.push(item.shopId);
        });
        let datalist = [];
        let arrShop2 = noRepeat(arrShop);
        arrShopId = noRepeat(arrShopId);
        arrShop2.forEach((item, idx) => {
            datalist.push({
                shopName: item,
                shopId: arrShopId[idx],
                store_checked: false,
                shoppingCartVos: []
            })
        });
        queryData.forEach((item, idx1) => {
            // console.log(item)
            datalist.forEach((ele, idx2) => {
                if (item.shopName == ele.shopName) {
                    ele.shoppingCartVos.push(item);
                }
            });
        });
        // console.log("返回的数据Datalist:",datalist)
        res.send(formatData({ data: datalist }));
    } else {
        res.send(formatData({ code: 0, data: "请先登录" }))
    }
});

//查询总记录，为了计算总页数
Router.get('/AllNum', async (req, res) => {
    try {
        let result = await mongodb.find(colName);
        res.send(formatData({ data: result.length }))
    } catch (error) {
        res.send(formatData({ code: 0 }))
    }
});

// 查看购物车列表  有分页的功能查询
Router.get('/cartList', async (req, res) => {
    // let result = await mongodb.find(colName);
    // res.send(formatData({ data: result }));
    let { pages, number } = req.query;
    // console.log('pages, number', { pages, number })
    // let num = 11;
    // let sub = 0; 
    try {
        let result = await mongodb.find_num(colName, { pages, number });
        let num = await mongodb.find(colName);
        res.send(formatData({ data: { result, AllNum: num.length } }))
    } catch (error) {
        res.send(formatData({ code: 0, data: "请求错误" }))
    }
});

//删除购物车商品
/*   传参形式，引号也需要的。
 {rm:`{
     "shopId":["4ca32455-bda2-4c75-befb-4955c5cbff54"],
     "productId":[
         "b657b905-67f3-48da-93b4-94658610f948",
         "49a1806e-955a-4928-b54c-423cbf635d50",
         "ea79296f-3649-4a4d-8473-c8c798622208"]
        }`,
    username:
        'lh'
}
*///用户删除购物车的数据
Router.get('/removeGood', async (req, res) => {
    let { rm, username } = req.query;
    if (username || rm) {
        let userInf = await mongodb.find('user', { username });
        let userId = userInf[0].userId;//查到的用户id
        if (userId) {
            rm = JSON.parse(rm)
            let delObj = [];
            rm.shopId.forEach(item => {
                delObj.push({ "shopId": item });
            });
            rm.productId.forEach(item => {
                delObj.push({ "productId": item })
            });
            // console.log("delObj:",delObj)
            //拼接多条件删除
            let query = {
                $and: [{ userId }],
                $or: delObj
            };
            // console.log("query:",query)
            try {
                let result = await mongodb.delById(colName, query)
                if (result) {
                    res.send(formatData({ data: { deletedCount: result.deletedCount } }))
                } else {
                    res.send(formatData({ code: 1, data: { deletedCount: result.deletedCount } }))
                }
            } catch (error) {
                res.send(formatData({ code: 0, data: "请求错误" }))
            }
        } else {
            res.send(formatData({ code: 0, data: "查找不到该用户，请确认用户名无误后联系开发者" }))
        }
    } else {
        res.send(formatData({ code: 0, data: "请求参数有误" }))
    }

});

//加入购物车
Router.post('/AddToCart', async (req, res) => {

    let goods = req.body;//把商品详情传过来
    // console.log("goods:", goods)
    // let shopId = goods.shopId;
    let productId = goods.productId;
    let username = goods.username;
    let num = goods.qty;

    let userInf = await mongodb.find('user', { username });
    let userId = userInf[0].userId;//查到的用户id

    // // 先查询该购物车中是否有记录，有就更新数量，没有就加入；
    let query;
    let data;
    query = { $and: [{ userId, productId }] };
    // console.log(query)
    try {
        let result1 = await mongodb.find(colName, query);
        // console.log("result1:", result1.length)
        if (result1.length) {
            // console.log("直接修改！")
            //cart 中有数据，直接更新，
            query = {
                $and: [
                    { userId },
                    { productId }
                ]
            };
            data = {
                $set: { num: (result1[0].num - 0) + (num - 0) }
            };
            try {
                await mongodb.update(colName, query, data);
                res.send(formatData({ code: 1, data: "购物车中已有数据，修改数量成功！" }))
            } catch (error) {
                res.send(formatData({ code: 0, data: "加入购物车失败，未知原因" }))
            }
        } else {
            // console.log("购物车中暂无数据！")
            let insertData = [{
                userId,
                shopId: goods.shopId,
                // store_checked: false,
                shopName: goods.shopName,
                productId: goods.productId,
                isValid: false,
                stockQty: goods.stockQty,
                productImg: goods.imgUrl,
                productName: goods.name,
                unitPrice: goods.unitPrice,
                unitPriceUnit: goods.unitName,
                salePrice: goods.salePrice,
                num: goods.qty,
                salePriceUnit: goods.salePriceUnitName,
                propertieValue: goods.propertieValue,
                propertieEnValue: goods.propertieEnValue,
                propertieRemark: goods.propertieRemark
            }];
            // console.log("需要插入的数据：", insertData)
            try {
                let result2 = await mongodb.create(colName, insertData);
                // console.log(result2.insertedCount)
                res.send(formatData({ data: `成功加入购物车` }));
            } catch (error) {
                res.send(formatData({ code: 0, data: `加入购物车失败，请联系开发者` }))
            }
        }
    } catch (error) {
        res.send(formatData({ code: 0, data: "请求出错，请联系开发者!" }))
    }

});

//更新购物商品数量
Router.get('/updateNum', async (req, res) => {
    let { productId, username, num } = req.query;
    // console.log("修改数量：", productId, username, num);
    let userInf = await mongodb.find('user', { username });
    let userId = userInf[0].userId;//查到的用户id
    // console.log("用户Id：", userId);
    let query = {
        $and: [
            { userId },
            { productId }
        ]
    };
    let data = {
        $set: { num }
    };
    try {
        await mongodb.update(colName, query, data);
        res.send(formatData({ code: 1, data: "修改成功" }))
    } catch (error) {
        res.send(formatData({ code: 0 }))
    }
})


module.exports = Router;
