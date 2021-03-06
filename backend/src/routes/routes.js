//导入路由
import NotFound from '../pages/NotFound';
import user from '../pages/user';
import adduser from '../pages/adduser';
import goods from '../pages/goods';
import addgoods from '../pages/addgoods';
import login from '../pages/login';
import booklist from '../pages/booklist';


//配置
let routes = [
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
        path: '/addgoods',
        name: 'addgoods',
        component: addgoods
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/booklist',
        name: 'booklist',
        component: booklist
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
        redirect: '/goods'
    },
];

export default routes;