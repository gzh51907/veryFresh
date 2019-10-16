
import NotFound from '../pages/NotFound'
import home from '../pages/home'

let routes = [
    {
        path: '/home',
        component: home
    },
    //404
    {
        path: '/404',
        component: NotFound
    },
];

export default routes;