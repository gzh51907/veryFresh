
//引入模块
const express = require('express');
//引入端口号
const { PORT } = require('./config.json');
//引入路由，默认找到index.js
const allRouter = require('./routes');
///创建实例
const app = express();

//静态资源服务器
app.use(express.static('./'));
//使用路由
app.use(allRouter);

//监听端口
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
//服务器构建完毕