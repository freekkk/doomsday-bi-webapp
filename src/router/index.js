import Vue from "vue";
import Router from "vue-router";


Vue.use(Router)

const HomeComp=resolve => require(['@/views/layout/Home'], resolve);
const LoginComp=resolve => require(['@/views/Login'], resolve);
const BiGeneralDataComp= resolve =>require(['@/views/BiGeneralData'], resolve)
const BiGeneralDataDetailComp=resolve => require(['@/views/BiGeneralDataDetail'], resolve)
const BiCurrentDataComp=resolve => require(['@/views/BiCurrentData'], resolve)
const BiLtvComp=resolve => require(['@/views/BiLTV'], resolve)
const BiRoiComp=resolve => require(['@/views/BiROI'], resolve)
const BiMoneyComp=resolve => require(['@/views/BiMoneyData'], resolve)
const BiLibaoComp=resolve => require(['@/views/BiLibaoData'], resolve)
const BiMissionComp=resolve => require(['@/views/BiMissionData'], resolve)
const BiDayRateComp=resolve => require(['@/views/BiDayRateData'], resolve)
const BiSystemConfComp=resolve => require(['@/views/BiSystemConf'], resolve)
const TESTComp=resolve => require(['@/views/TEST'], resolve)
const ChartsComp=resolve => require(['@/views/charts/Echarts'], resolve)


export default new Router({
  mode: 'history',
  routes: [
    {path:'/home', component:HomeComp ,name:'home',hidden: true,
      children:[
          {
            path: '/bigeneraldata',
            component: BiGeneralDataComp,
            name: 'bigeneraldata',
            title: '整体数据',
            icon: 'el-icon-message'

          },
          {
            path: '/bidayrate',
            component: BiDayRateComp,
            name: 'bidayrate',
            title: '30日留存',
            icon: 'el-icon-picture'
          },
          {
            path: '/bigeneraldatadetail',
            component: BiGeneralDataDetailComp,
            name: 'bigeneraldatadetail',
            title: '国家渠道数据',
            icon: 'el-icon-message'
          },
          {
            path: '/bicurrentdata',
            component: BiCurrentDataComp,
            name: 'bicurrentdata',
            title: '实时数据',
            icon: 'el-icon-time'
          },
          {
            path: '/biltv',
            component: BiLtvComp,
            name: 'biltv',
            title: 'LTV',
            icon: 'el-icon-message'
          },
          // {
          //   path: '/biroi',
          //   component: BiRoiComp,
          //   name: 'biroi',
          //   title: 'ROI',
          //   icon: 'el-icon-message'
          // },
          {
            path: '/bimoney',
            component: BiMoneyComp,
            name: 'bimoney',
            title: '钻石消耗',
            icon: 'el-icon-picture'
          },
          {
            path: '/bilibao',
            component: BiLibaoComp,
            name: 'bilibao',
            title: '礼包销售',
            icon: 'el-icon-picture'
          },
          {
            path: '/bimission',
            component: BiMissionComp,
            name: 'bimission',
            title: '任务通过',
            icon: 'el-icon-picture'
          },
          {
            path: '/bisystemconf',
            component: BiSystemConfComp,
            name: 'bisystemconf',
            title: '系统配置',
            icon: 'el-icon-setting'
          },
          {
            path: '/test',
            component: TESTComp,
            name: 'test',
            title: '测试控制台',
            icon: 'el-icon-setting'
          }
      ]
    },
    {path: '/',redirect: 'login', name: 'index',hidden: true},
    {path: '/login', component: LoginComp,name:'login',hidden: true},


  ]
})
