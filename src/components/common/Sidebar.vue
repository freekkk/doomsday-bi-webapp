<template>
  <div class="sidebar">
    <!--<el-menu :default-active="$route.path"  dark unique-opened router>-->
      <!--<template v-for="item in items">-->
        <!--<template v-if="item.subs">-->
          <!--<el-submenu :index="item.index">-->
            <!--<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>-->
            <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</template>-->
        <!--<template v-else>-->
          <!--<el-menu-item :index="item.index">-->
            <!--<i :class="item.icon"></i>{{ item.title }}-->
          <!--</el-menu-item>-->
        <!--</template>-->
      <!--</template>-->
    <!--</el-menu>-->

    <!--<el-menu mode="vertical" :default-active="$route.path" class="el-menu-vertical-demo" router dark>-->
      <!--<el-menu-item-group title="基本数据">-->
        <!--<el-menu-item index="/dashboard"><i class="el-icon-message"></i>总体数据</el-menu-item>-->
        <!--<el-menu-item index="/generaldatadetail"><i class="el-icon-message"></i>国家渠道数据</el-menu-item>-->

      <!--</el-menu-item-group>-->

      <!--<el-menu-item-group title="实时数据">-->
        <!--<el-menu-item index="/currentdata"><i class="el-icon-time"></i>实时数据</el-menu-item>-->
        <!--<el-menu-item index="3"><i class="el-icon-time"></i>在线曲线</el-menu-item>-->
      <!--</el-menu-item-group>-->

      <!--<el-menu-item-group title="玩家行为">-->
        <!--<el-menu-item index="3"><i class="el-icon-message"></i>金币流向</el-menu-item>-->
        <!--<el-menu-item index="4"><i class="el-icon-message"></i>任务明细</el-menu-item>-->
      <!--</el-menu-item-group>-->
    <!--</el-menu>-->

    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
      <template v-for="(item,index) in routeList" v-if="!item.hidden">
        <template v-if="item.subs">
          <el-submenu :index="item.path">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.path">{{ subItem.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
          </template>
        <!--<el-menu-item :index="item.path" ><i :class="item.icon"></i>{{item.cname}}</el-menu-item>-->
      </template>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name:'SidebarComp',
      data() {
        return {
          path:'',
          urlData:this.$router.options.routes[0].children
        }
      },
      computed: {
        routeList () {
          let user= JSON.parse( sessionStorage.getItem('user'));
          let pages=user.pages.split(',');
          return this.urlData.filter((item)=>{
            for(let i=0;i<pages.length;i++){
              if(item.name===pages[i])
                return item;
            }
          });


        }
      }
    }
</script>
<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 200px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
