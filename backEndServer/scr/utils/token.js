
const jwt = require('jsonwebtoken');
/**
 * Token 的生成与校验
 */
//导入秘钥  后端自定义的秘钥
let { secret } = require('../config.json');

/**
 * 创建一个token加密字符串
 * @param {String} data 需要加密的数据
 * @param {Number} expiresIn 密文有效时间，单位s，这里给20
 */
let token;
function create(data, expiresIn = '7d') {  //'7d' 有效期7天
    // console.log("data:", { data })
    // token = jwt.sign({ data }, secret);
    token = jwt.sign({ data }, secret, { expiresIn });
    return token;
}


/**
 * 校验密文
 * @param {String} token 校验的密文 
 */
function verify(token) {
    let Authorization = token.Authorization;
    // console.log('进来校验的 Authorization:', Authorization);
    let res;
    let result;
    try {
        result = jwt.verify(Authorization, secret);
        // console.log("校验结果result:",result);
        res = true;
    } catch (error) {
        res = false;
    }
    // console.log("校验结果result:", result);
    return res;
}
module.exports = {
    create,
    verify
}