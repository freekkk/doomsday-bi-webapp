<template>
  <div class="serverList" style="display: inline">
    <span>服务器列表：</span>
    <el-select v-model="serverUrl" placeholder="请选择服务器" @change="changeServerList">
      <el-option
        v-for="server in reServerList"
        :key="server.serverId"
        :label="server.serverName"
        :value="server.apiUrl">
      </el-option>
    </el-select>
  </div>

</template>

<script>
  export default {
    name:'ServerListComp',
    props:{
      exFullServer:{
        type:Boolean,
        default:false
      }
    },
    data:function (){
        return{
          serverList:[],
          serverUrl:''
        }
    },
    created(){
      this.fetchServerList();

    },
    computed:{
      reServerList(){
        if(this.exFullServer)
        {
          if(process.env.ENV_DEV)
            this.serverList.splice(0, 1);
          if(!process.env.ENV_DEV)
            this.serverList.splice(0,2);
        }
        else
        {
          if(!process.env.ENV_DEV)
            this.serverList.splice(1, 1);
        }


        return this.serverList;
      }
    },
    watch:{
      serverList:function (val) {
        if(val !== null)
          this.serverUrl=val[0].apiUrl//默认选中第一个
      }
    },
    methods:{
      fetchServerList()
      {
        let ss=sessionStorage.getItem(this.SS_KEY_SERVER_LIST);
        if(ss!==null)
        {
          console.log('直接从sessionStorage获取服务器列表');
          let list=JSON.parse(ss);
          this.serverList=list;
        }
      else
        {
          let weburl=process.env.API_URL_GET_SERVER_LIST;
          console.log('sessionStorage没有数据，请求服务器获取:'+weburl);
          this.$http.get(weburl).then(response => {
              console.log(response.data);
              let list= response.data;
              //将全服ID存起来
              let fullObj=list[list.length-1];
              //删除全服ID
              list.pop();
              //将全服ID放到数组首位
              list.unshift(fullObj);
              this.serverList=list;
              sessionStorage.setItem(this.SS_KEY_SERVER_LIST,JSON.stringify(list));
            }
          )
        }
      },
      changeServerList(value){
        //console.log(value);
        let obj = {};
        obj = this.serverList.find((item)=>{
          return item.apiUrl === value
        });
        //console.log(obj)
        this.$emit('change',obj)
      }
    }
  };
</script>
