<template>
  <div class="header">
    <div class="logo">Doomsday-BI-WebApp</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../assets/logo.png">
                    {{userName}}
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

  <!--<div>-->
    <!--<header>-->
      <!--<img src="../../assets/logo.png" alt="logo" class="header-logo">-->
      <!--<ul class="header-operations">-->
        <!--<li>-->
          <!--<span class="header-lang is-active">{{user.name}}</span>-->
          <!--<span class="header-opacity">({{user.area}}/{{user.identity}})</span>-->
        <!--</li>-->
        <!--<li>退出系统</li>-->
      <!--</ul>-->
    <!--</header>-->
  <!--</div>-->
</template>

<script>
  export default {
    name:'HeaderComp',
    data() {
        return{

        }
    },
    computed:{
      userName(){
        let user=JSON.parse(sessionStorage.getItem('user'));
        let userName=user.name;
        return userName
      }
    },
    methods:{
      handleCommand(command) {
        if(command == 'loginout'){
          localStorage.removeItem('user');
          this.$router.push('/login');
        }
      }
    }
  };
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }
  .header .logo{
    float: left;
    width:250px;
    text-align: center;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:15px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
