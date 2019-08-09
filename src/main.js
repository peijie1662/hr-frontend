import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './routes'
import './assets/iconfont/iconfont.css'
import './assets/iconfont-crab/iconfont.css';
import { auth } from "./api/api";
import VueKonva from 'vue-konva'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueKonva)

const router = new VueRouter({
  //mode: "history",
  routes
})

//通过beforeEach判断用户是否登录，
router.beforeEach((to, from, next) => {
  //登录动作删除原用户
  if (to.path == '/login') {
    sessionStorage.removeItem('userinfo');
    //将权限复位
    let rs = router.options.routes;
    for (let i in rs) {
      if ("children" in rs[i]) {
        for (let m in rs[i].children) {
          let r = rs[i].children[m];
          if (r.path == "/hz" || r.path == "/dk") {
            r.meta.dis = true;
          }
        }
      }
    }
    next()
  } else {
    //如果无登录信息则转向登录页面，否则继续加载组件.
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
    if (!userinfo && to.path != '/login') {
      next({ path: '/login' })
    } else {
      let rs = router.options.routes;
      for (let i in rs) {
        if ("children" in rs[i]) {
          for (let m in rs[i].children) {
            let r = rs[i].children[m];
            //核准权限
            if ((r.path == "/hz") && (userinfo.userId == "XZL" || userinfo.userId == "JQF")) {
              r.meta.dis = false;
            }
            //抵扣权限
            if (r.path == "/dk" && userinfo.userId == "CLP") {
              r.meta.dis = false;
            }
          }
        }
      }
      next()
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
