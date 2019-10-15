//导入路由
import NotFound from '../pages/NotFound';
import home from '../pages/home';
import type from '../pages/type';
import book from '../pages/book';
import cart from '../pages/cart';
import mine from '../pages/mine';
import detail from '../pages/detail';
import cart_rules from '../pages/cart_rules';
import list from '../pages/list';
import register_login from '../pages/register_login';
import quit from '../pages/quit';

//配置
let routes = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/type',
        name: 'type',
        component: type
    },
    {
        path: '/book',
        name: 'book',
        component: book
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/mine',
        name: 'mine',
        component: mine
    },
    {
        path: '/quit',
        component: quit
    },
    //商品详情动态路由
    {
        path: '/detail/gid=:gid',
        name: 'detail',
        component: detail
    },
    //商品列表动态路由
    {
        path: '/list/:gid',
        name: 'list',
        component: list
    },
    //404
    {
        path: '/404',
        component: NotFound
    },
    //购物车-规则详情
    {
        path: '/cart_rules',
        name: 'cart_rules',
        component: cart_rules
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
    //登录与注册页
    {
        path: '/register_login',
        name: 'register_login',
        component: register_login
    }
];

export default routes;