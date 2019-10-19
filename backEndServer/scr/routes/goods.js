const express = require('express');
const Router = express.Router();
//导入 mongodb  数据库方法
const { mongodb } = require('../db');
const { formatData } = require('../utils');
const colName = 'goods';

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

//查询所有数据接口
Router.get('/queryAll', async (req, res) => {
    let result = await mongodb.find(colName);
    res.send(result);
});

//查商品详情接口   参数传递： productId 商品id
Router.get("/queryByPid", async (req, res) => {
    let { productId } = req.query;
    // console.log("productId：", productId)
    let result = await mongodb.find(colName, { productId });
    // console.log("result:", result.length)
    if (result.length) {
        res.send(formatData({ data: result }))
    } else {
        res.send(formatData({ code: 0 }));
    }
});

//商品分区部分接口
Router.get('/queryArea', async (req, res) => {
    // console.log("进入分区路由")
    let { pagesNum } = req.query;
    // console.log("需要显示的数量:", pagesNum)
    let area = await mongodb.find("Area");
    let AllData = await mongodb.find(colName);
    let datalist = [];
    //查找出有分区并写进数据结构
    area.forEach(item => {
        datalist.push({
            areaId: item.areaId,
            areaName: item.areaName,
            quoteList: []
        });
    });
    //，每个分区只查询 5 条数据
    AllData.forEach((item) => {
        datalist.forEach(ele => {
            if (item.areaName == ele.areaName) {
                if (ele.quoteList.length < 5) {
                    ele.quoteList.push(item)
                } else {
                    return false;
                }
            }
        });
    });
    // console.log("datalist", datalist);
    res.send(formatData({ data: datalist }));

});

//管理员删除商品,支持多个删除。
Router.get('/removeGoods', async (req, res) => {
    let { productId } = req.query;
    // console.log("需要删除的商品的productId列表：", productId)
    if (productId) {
        let delArr = [];
        productId.forEach(item => {
            delArr.push({ productId: item });
        });
        let query = {
            $or: delArr
        }
        // console.log("query:", query)
        try {
            let result = await mongodb.remove(colName, query);
            // console.log(result.deletedCount)
            if (result.deletedCount) {
                res.send(formatData({ data: `删除成功！deletedCount=${result.deletedCount}` }));
            } else {
                res.send(formatData({ code: 0, data: "没有该商品，删除失败！" }));
            }
        } catch (error) {
            res.send(formatData({ code: 0 }));
        }
    } else {
        res.send(formatData({ code: 0, data: "删除商品失败，请检查传参是否正确" }))
    }
});

//获取活动方面的数据
Router.get('/getActiveData', async (req, res) => {
    try {
        let result = await mongodb.find(colName);
        let arr = [
            {
                id: "1324f76f-43f0-4de0-86fa-62b4f3333743",
                actName: "优选现货",
                products: [],
            },
            {
                id: "ae3510d4-884b-4579-8d65-cdec21b007d4",
                actName: "好货限时抢",
                products: [],
            },
            {
                id: "ae3510d4-884b-4579-6676-cdec21b007d4",
                actName: "猜你喜欢",
                products: [],
            }
        ];
        result.forEach(item => {
            arr.forEach(ele => {
                if (ele.actName == item.actName) {
                    if (ele.products.length < 10) {
                        ele.products.push(item);
                    } else {
                        return false;
                    }
                }
            });
        });
        // console.log("arr:", arr);
        res.send(formatData({ data: arr }))
    } catch (error) {
        res.send(formatData({ code: 0, data: error }))
    }
});

module.exports = Router;
