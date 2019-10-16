//导入路由
import NotFound from '../pages/NotFound';
import home from '../pages/home';
import user from '../pages/user';
import adduser from '../pages/adduser';
import goods from '../pages/goods';
import login from '../pages/login';
import regist from '../pages/regist';


//配置
let routes = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/user',
        name: 'user',
        component: user
    },
    {
        path: '/adduser',
        name: 'adduser',
        component: adduser
    },
    {
        path: '/goods',
        name: 'goods',
        component: goods
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/regist',
        name: 'regist',
        component: regist
    },
    //404
    {
        path: '/404',
        component: NotFound
    },
    //*
    {
        path: '*',
        redirect: '/404'
    },
    //默认首页
    {
        path: '/',
        redirect: '/home'
    },
];

export default routes;