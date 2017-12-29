<template>
  <div class="table">

    <div class="filter-container">
      服务器列表：

      <el-button type="primary">查询</el-button>
    </div>


    <div>
      <server-list :exFullServer="true" @change="changettt"></server-list>
      URL:{{url}}

    </div>
    <div>
      ServerList:{{bi_serverList}}
    </div>
  </div>
</template>

<script>
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'TESTComp',

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        url:'',
        bi_serverList:sessionStorage.getItem(this.SS_KEY_SERVER_LIST),
        computeUrl:'',
        modelUrl:'',
        visible:false
      }
    },


    mounted:function () {
      //this.cte()
    },

    methods:{
      changettt(val){
        //console.log(val)
        this.url=val
      }

    },
    components:{
      serverList
    },
    watch:{
      //'$route': 'fetchData'
      url:function (val) {
        this.serverUrl=val.apiUrl;
        console.log("this.serverUrl:"+this.serverUrl)
      }
    },
    computed:{

    }
  }
</script>
