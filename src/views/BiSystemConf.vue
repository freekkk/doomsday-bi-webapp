<template>

<div>
  <div class="filter-container">
    <server-list  @change="changeServer"></server-list>
  </div>


  <el-collapse v-model="activeNames">

    <el-collapse-item title="用户管理" name="1">

      <el-row>
        <el-col :span="14"> <div id="addUser">

          <el-form :model="form" ref="form" :rules="rules" label-position="left"  label-width="100px">

            <el-alert title="操作说明" :description="userMsg" :style="{width:800+'px'}" type="info" :closable="false" show-icon></el-alert>

            <div style="margin: 20px 0;"></div>

            <el-form-item label="用户名："  prop="name">
              <el-input v-model="form.name" class="myInput" @blur="onBlur"></el-input>
            </el-form-item>

            <el-form-item label="密  码：" prop="password">
              <el-input type="password"  v-model="form.password" class="myInput"></el-input>
            </el-form-item>

            <el-form-item label="状态：">
              <el-switch v-model="form.delivery"  active-color="#13ce66"
                         inactive-color="#ff4949"
                         on-text="开启"
                         off-text="封停"></el-switch>
            </el-form-item>

            <el-form-item label="页面配置："  prop="pages">
              <el-checkbox-group v-model="form.pages">
                <el-checkbox v-for="item in urlData" :label="item.name" :key="item.name">{{item.title}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item>
              <el-button :type="buttonType" icon="edit" @click="submitForm('form')" :disabled="buttonDisabled" >{{buttonLabel}}</el-button>

            </el-form-item>
          </el-form>
        </div></el-col>
        <el-col :span="10">
          <div id="userList">
          <el-table :data="reUserList" border stripe max-height="800">
            <el-table-column prop="name" label="用户名" sortable ></el-table-column>
            <el-table-column prop="status" label="状态" sortable ></el-table-column>
            <el-table-column prop="createTime" label="日期" sortable ></el-table-column>
          </el-table>
          </div>
        </el-col>
      </el-row>




    </el-collapse-item>

    <el-collapse-item title="计算数据" name="2">

        <div class="container">
          <span>数据项：</span>
          <el-select v-model="procName" placeholder="请选择计算项" @change="changeValue">
              <el-option v-for="item in opData" v-if="item.showFlag>=1"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>

          </el-select>

          <div style="display: inline" v-if="serverId!=110000" >
          <span>是否清空历史数据：</span>
          <el-switch
            v-model="empty"
            on-color="#13ce66"
            off-color="#ff4949"
            >
          </el-switch>
          </div>
          <!--<div style="display: inline" v-if="serverId==110000" >-->
            <!--<span>服务器ID：</span>-->
            <!--<el-select v-model="reServerId" placeholder="请选择服务器ID">-->
              <!--<el-option v-for="item in serverList" v-if="item.showFlag>=1"-->
                         <!--:key="item.id"-->
                         <!--:label="item.name"-->
                         <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->

          <span>日期：</span>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            @change="changeDate"
            placeholder="选择日期范围">
          </el-date-picker>

          <el-button type="success" @click="fetchData" :loading="showLoading"  icon="search">计算</el-button>

          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 40}"
            placeholder="jsonDesc"
            :style="{width:550+'px'}"
            v-if="showFlag==2"
            v-model="textarea">
          </el-input>

          <!--<el-input v-model="input" placeholder="请输入参数" class="myInput"></el-input>-->


          <el-alert
            :title="msg"
            :style="{width:600+'px'}"
            type="warning"
            :closable="false">
          </el-alert>
        </div>

    </el-collapse-item>

  </el-collapse>

</div>
</template>

<script>
  import serverList from '@/components/common/ServerList'
  import md5 from 'js-md5'


  export default {
    name: 'SystemConfComp',

    data() {
      return {
        userMsg:'自动检测用户名是否存：不存在执行增加用户操作；存在执行更新用户操作,更新用户是如不修改密码可以不用填写。',
        msg: '结果：',
        jsonFlag:false,
        jsonDesc:'',
        actId:'',
        apiUrl:'',
        dialogVisible:false,
        showLoading:false,
        showFlag:'',
        serverId:'',
        textarea:'',
        empty:'',
        activeNames: ['1','2'],
        opData:[],
        procName:'',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateTime: [this.defaultStartDate,this.defaultEndDate],
        urlData:this.$router.options.routes[0].children,
        buttonLabel:'增加用户',
        buttonType:'primary',
        buttonDisabled:false,
        updateUser:false,
        userList:[],
        form:{
          name:'',
          password:'',
          delivery:true,
          pages:[]
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: this.updateUser, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          pages: [
            { type: 'array', required: true, message: '请至少选择一个页面', trigger: 'change' }
          ]
        }

      }
    },

    created (){
      this.getUserList()
    },
    methods:{
      changeServer(val){
        console.log(val)
        this.apiUrl=val.apiUrl
      },

      fetchData()
      {
        this.$confirm('确认此次操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showLoading=true;
          let weburl=this.apiUrl+'/systemconf';
          console.log(weburl);
          this.$http.post(weburl,{
            procName:this.procName,
            empty:this.empty,
            serverId:this.reServerId,
            jsonData:this.textarea,
            startDate:this.dateTime[0],
            endDate:this.dateTime[1],

          }).then(response => {
              console.log(response.data)
              this.msg="服务器返回："+response.data
              this.$message({
                type: 'success',
                message: '操作成功,服务器返回值：'+this.msg
              })
              this.showLoading=false
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      changeValue(value){
        console.log(value);
        let obj = {};
        obj = this.opData.find((item)=>{
          return item.value === value
        });
        this.showFlag=obj.showFlag;
        let id=obj.id;
        console.log("showFlag:"+this.showFlag)
      },

      getUserList()
      {
        //let weburl='http://localhost:9000/api/getuserlist';
        let weburl='http://center.doom.dragonest.net:9000/api/getuserlist';
        console.log(weburl);
        this.$http.get(weburl).then(response => {
          console.log(response.data)
          this.userList=response.data;
        });
      },

      toUserStatus(val)
      {
        if(val)
          return '开启';
        else
          return '封停';
      },

      changeDate(val){
        if(val !==null)
        {
          let str=val.split(" - ")
          this.dateTime[0]=str[0]
          this.dateTime[1]=str[1]
        }
      },
      submitForm(formName)
      {
        if(this.updateUser)
        {
          //更新用户
          let URL=this.apiUrl+'/updateuser';
          let data={
            name:this.form.name,
            password:md5(this.form.password),
            status:this.form.delivery,
            pages:this.form.pages.toString()
          };
          if(this.form.password.length<6)
            delete data.password;

          console.log(URL);
          this.$http.post(URL,data)
              .then(response => {
                let resp=response.data;
                if(resp===-1)
                {
                  this.$message({
                    type: 'error',
                    message: '重复用户名，操作失败,服务器返回值：'+resp
                  })
                }
                else
                {
                  this.buttonDisabled=true;
                  this.$message({
                    type: 'success',
                    message: '操作成功,服务器返回值：'+resp
                  })
                }
                this.showLoading=false
          });
        }
        else {
          //增加用户
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.showLoading=true;
                let URL=this.apiUrl+'/adduser';
                console.log(URL);
                this.$http.post(URL,{
                  name:this.form.name,
                  password:md5(this.form.password),
                  status:this.form.delivery,
                  pages:this.form.pages.toString()
                }).then(response => {

                  let resp=response.data;
                  if(resp===-1)
                  {
                    this.$message({
                      type: 'error',
                      message: '重复用户名，操作失败,服务器返回值：'+resp
                    })
                  }
                  else
                  {
                    this.buttonDisabled=true;
                    this.$message({
                      type: 'success',
                      message: '操作成功,服务器返回值：'+resp
                    })
                  }
                  this.showLoading=false
                });
              } else {

                return false;
              }
            });
        }
      },
      onBlur()
      {
        if(this.form.name ==="")
          return;
        let weburl=this.apiUrl+'/getuserbyname';
        console.log(weburl);
        this.$http.get(weburl,{
          params:{
            name:this.form.name
          }
        }).then(response => {
          let resp=response.data;
          console.log(resp);
          if(resp !=="")
          {
            this.buttonLabel='更新用户';
            this.buttonType='warning';
            this.buttonDisabled=false;
            this.updateUser=true;
            this.form.pages=resp.pages.split(",");
            this.form.delivery=resp.status;

              this.$message({
              type: 'warning',
              message: '用户名已存在，将进行更新用户操作！'
            })
          }
          else {
            this.buttonLabel='增加用户';
            this.buttonType='primary';
            this.updateUser=false;
            this.$message({
              type: 'info',
              message: '用户名可用，将进行增加用户操作！'
            })
          }
        });

      }
    },

    components:{
      serverList
    },

    computed:{
      reUserList(){
        let list=this.userList;
        list.filter(item=>{
          item.status=this.toUserStatus(item.status);
          return item;
        });
        return list;
      }
    },

    watch:{
      apiUrl:function (val,oldVal) {
        if(val==="http://center.doom.dragonest.net:9000/api")
          this.opData=this.confData.SYSTEMCONF[0].options
        else
          this.opData=this.confData.SYSTEMCONF[1].options
      },
      buttonDisabled:'getUserList'

    }
  }
</script>

<style>
.myInput{
  width: 300px;
}

</style>
