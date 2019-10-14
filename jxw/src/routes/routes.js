

//导入路由
import NotFound from '../pages/NotFound';
import home from '../pages/home';
import type from '../pages/type';
import book from '../pages/book';
import cart from '../pages/cart';
import mine from '../pages/mine';
import detail from '../pages/detail';
import cart_rules from '../pages/cart_rules';

//配置
let routes = [
    {
        path: '/home',
        component: home
    },
    {
        path: '/type',
        component: type
    },
    {
        path: '/book',
        component: book
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/mine',
        component: mine
    },
    //商品详情动态路由
    {
        path: '/detail/:gid',
        component: detail
    },
    //404
    {
        path: '/404',
        component: NotFound
    },
     //购物车-规则详情
     {
         path: '/cart_rules',
         component: cart_rules
     },
];

export default routes;