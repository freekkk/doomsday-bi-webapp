<template>
  <div class="login-wrap">
    <div class="ms-title">DoomsDay-BI-WebApp </div>
    <div> </div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:20px;color:#999;">Tips : 用户名和密码随便填。</p>
        <p style="font-size:12px;line-height:20px;color:#0190fe;">Version:{{appVersion}} Env:{{appEnv.NODE_ENV}}</p>

      </el-form>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'

  export default {
    data: function(){
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        url:this.recommendServer,
        appVersion:'20171113001',
        appEnv:process.env
      }
    },
    methods: {
      submitForm(formName) {
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {

            let weburl='http://center.doom.dragonest.net:9000/api/getuserbypassword';

            console.log(weburl);
            this.$http.get(weburl,{
              params:{
                name:this.ruleForm.username,
                password:md5(this.ruleForm.password)
              }
            }).then(response => {
              let resp=response.data;
              //console.log(resp);
              if(resp !=="")
              {
                if(!resp.status)
                  this.$message({
                    type: 'error',
                    message: '账号已封停！'
                  });
                else {
                  let jsonUser=JSON.stringify(resp);
                  sessionStorage.setItem('user',jsonUser);
                  let pages=resp.pages.split(',');
                  self.$router.push({name:pages[0]});
                }

              }
              else {

                this.$message({
                  type: 'error',
                  message: '密码错误！'
                })
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
