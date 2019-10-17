//生成验证码
function randomCode(n) {
    let html = '0987654321zxcvbnmlkjhgfdsaqwertyuiop';
    //生成n个随机数
    let res = '';
    for (let i = 0; i < n; i++) {
        let num = parseInt(Math.random() * html.length);//0- html.length-1
        res += html[num];
    }
    return res;
}

// console.log(randomCode(6)) 

module.exports = randomCode;