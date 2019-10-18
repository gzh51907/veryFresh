/**
 * const mongodb = require('mongodb);
 * const MongoClient = mongodb.MongoClient;
 */
const { MongoClient } = require('mongodb');
const { DBurl, DBName } = require('../config.json');

//封装链接mongoDB函数
async function connect() {
    let results;
    try {
        let client = await MongoClient.connect(DBurl, {
            useNewUrlParser: true,   //去掉一个warring提示
            useUnifiedTopology: true //去掉一个warring提示
        });
        let db = client.db(DBName);
        results = { client, db };
    } catch (error) {
        results = error;
    }
    return results;
}

/** 创建集合
 * @param {String} colName 集合名称
 * @param {Array} data 添加的数据
 */
async function create(colName, data) {
    let { db, client } = await connect();
    //获取集合
    let col = db.collection(colName);

    let result = await col.insertMany(data);
    client.close();
    return result;
}
//创建集合(表)操作，
// create('userinf', [{ username: 'lh3', pswd: '123', sex: "不祥" }]);

/**
 * 删除集合
 */
async function remove(colName, query) {
    let { db, client } = await connect();
    //获取集合
    let col = db.collection(colName);
    let result = await col.deleteMany(query);
    //关闭链接
    client.close();
    return result;
}
//删除 username:'lh1' 的记录（行记录）
// remove('userinf',{username:'lh1',});

/**
 * 
 * @param {} colName 集合名字
 * @param {} query 查询条件，相当于where语句
 * @param {} data 需要修改的数据
 */
//修改记录
async function update(colName, query, data) {
    let { db, client } = await connect();

    //获取集合
    let col = db.collection(colName);
    let result = await col.updateMany(query, data);
    client.close(); //关闭资源
    return result;
}

// update('userinf', { sex: "男" }, { $set: { sex: "女" } });

/**
 * 插询数据
 * @param {String} colName 集合名
 * @param {Object} query 查询条件
 */
async function find(colName, query) {
    // if (!num)
    //     num = 0;
    // console.log("query", query)
    let { db, client } = await connect();
    let col = db.collection(colName);
    // console.log(col)
    //查询数据
    let result = await col.find(query).toArray();
    client.close();
    //返回查询结果
    // console.log(result)
    return result;
}
//查询
// find('userinf', { sex: "女" });

/** 
 * 插询指定区间的数据，相当于mysql的limit(a,b)
 * 
*/
async function find_num(colName, { pages, number }) {
    // if (!pages)
    //     pages = 0;
    // if (!number)
    //     number = 10;
    // console.log("num,sub", sub)
    let { db, client } = await connect();
    let col = db.collection(colName);
    //查询数据   从 sub 开始查 num 条数据
    console.log("查询条件:",(number - 0),(number * pages - 0))
    let result = await col.find().limit(number-0).skip((number * pages - 0)).toArray();
    client.close();
    //返回查询结果
    return result;
}

/**
 * 查询信息
 * @param colName 传入的表名，字符串类型  query：查询条件，对象类型
 * */
async function find_uid(colName, query) {
    // console.log("colName, query",colName, query)
    let { db, client } = await connect();
    let col = db.collection(colName);
    let result = await col.find(query).toArray();
    client.close();
    return result;
}


module.exports = {
    create,
    remove,
    update,
    find,
    find_num,
    find_uid
};