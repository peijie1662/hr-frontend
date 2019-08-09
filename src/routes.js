import Login from './views/login.vue'
import Home from './views/home.vue'
import NotFound from './404.vue'
import Dxjl from './views/dxjl.vue'
import Yxyx from './views/yxyx.vue'
import Dxd from './views/dxd.vue'
import Hz from './views/hz.vue'
import Dk from './views/dk.vue'
import DkHis from './views/dkHis.vue'
import Nx from './views/nx.vue'

let routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
},
{
    path: '/home',
    component: Home,
    name: '',
    hidden: true
},
{
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
},
{
    path: '/',
    component: Home,
    name: '我的调休',
    iconCls: 'el-icon-edit-outline',
    children: [
        {
            path: '/dxd', component: Dxd, name: '我的调休单',
            meta: { dis: false }
        },
        {
            path: '/dxjl', component: Dxjl, name: '调休记录查询',
            meta: { dis: false }
        },
        {
            path: '/yxyx', component: Yxyx, name: '填写值班调休',
            meta: { dis: false }
        }
    ]
},
{
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-tickets',
    leaf: true,
    children: [
        {
            path: '/nx', component: Nx, name: '年休一览',
            meta: { dis: false }
        }
    ]
},
{
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-circle-check-outline',
    leaf: true,
    children: [
        {
            path: '/hz', component: Hz, name: '特殊调休核准',
            meta: { dis: true }
        }
    ]
},
{
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-printer',
    leaf: true,
    children: [
        {
            path: '/dk', component: Dk, name: '调休抵扣',
            meta: { dis: true }
        }
    ]
},
{
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-printer',
    leaf: true,
    children: [
        {
            path: '/dkhis', component: DkHis, name: '调休抵扣历史',
            meta: { dis: false }
        }
    ]
},
{
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}]

export default routes;