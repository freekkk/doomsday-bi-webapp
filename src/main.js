// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
//import "../static/css/theme-green/index.css"; // 浅绿色主题
import axios from "axios";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条 样式
import ConfData from '../static/conf/Data.json'
//import ConfData from '../config/conf/Data-dev.json'
// import Mock from './mock/mock'
// Mock.mockData()

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.confData=ConfData;
Vue.prototype.SS_KEY_SERVER_LIST='server_list';
Vue.prototype.defaultStartDate=new Date(new Date().getTime()-3600 * 1000 * 24 * 14);
Vue.prototype.defaultEndDate=new Date(new Date().getTime()-3600 * 1000 * 24 );
//axios.defaults.baseURL ='/api'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to,from,next)  => {
  NProgress.start();// 开启Progress
  let user=sessionStorage.getItem("user");
  if (to.path !== '/login') {
    if(!user){
      next({path:'/login'})
    }
    else
    {
      let toPath=to.path;
      let jsonUser=JSON.parse(user);
      let pages=jsonUser.pages.split(',');
      let toPathName=toPath.substr(1);
      if(pages.indexOf(toPathName) ===-1)
      {
        console.log("没有权限访问"+toPathName);
        next({path:'/login'})
      }
      else
        next()

    }
  }
  next()


});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }

});
