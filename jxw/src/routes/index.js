import Vue from 'vue';
import axios from 'axios';

// 1. 引入vue-router
import VueRouter from "vue-router";

// 2. 使用vue-router（script标签引入方式自动完成）
Vue.use(VueRouter);

// 引入路由配置参数
import routers from './routes';

// 3. 实例化router并配置参数
let router = new VueRouter({
    //mode: 'hash' 
    // 配置参数:不同的 URL 显示不同的内容  
    routes: routers
});


// 全局路由守卫
router.beforeEach(async function (to, from, next) {
    // window.console.log('beforeEach', to);
    // 在全局路由守卫beforeEach中进行页面权限访问控制
    // 先判断目标路由是否需要鉴权
    if (to.meta.requiresAuth) {
        let Authorization = localStorage.getItem('Authorization');//检测本地是否有 token 密文 
        if (Authorization) {
            //校验密文的有效性 接口 http://10.3.133.72:10086/token/verify
            let { data } = await axios.get("http://10.3.133.72:10086/token/verify", {
                params: {
                    Authorization
                }
            })
            // console.log(data);
            if (data.code == 1) {
                next();
            } else {
                alert("身份已过期，请重新登录");
                router.push({
                    path: '/register_login',
                    query: {
                        targetUrl: to.fullPath
                    }
                })
            }
        }else{
            router.push({
                path: '/register_login',
                query: {
                    targetUrl: to.fullPath
                }
            })
        }
    } else {
        next();
    }

})

// router.afterEach(function (to, from) {
//     window.console.log('afterEach');
// })

export default router;