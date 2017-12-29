<template>
  <div class="wrapper">
    <v-head></v-head>
    <sidebar></sidebar>
    <div class="content">
      <!--<div class="filter-container">-->
      <!--服务器列表：-->
      <!--<el-select v-model="serverUrl" placeholder="请选择服务器">-->
        <!--<el-option-->
          <!--v-for="server in serverList"-->
          <!--:key="server.id"-->
          <!--:label="server.name"-->
          <!--:value="server.url">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<span class="demonstration">日期范围：</span>-->
      <!--<el-date-picker-->
        <!--v-model="dateTime"-->
        <!--type="daterange"-->
        <!--align="right"-->
        <!--placeholder="选择日期范围"-->
        <!--:picker-options="pickerOptions2">-->
      <!--</el-date-picker>-->
      <!--<span class="demonstration">国家：</span>-->
      <!--<el-select v-model="country" multiple placeholder="请选择国家">-->
        <!--<el-option-->
          <!--v-for="item in countryList"-->
          <!--:key="item.id"-->
          <!--:label="item.cname"-->
          <!--:value="item.country">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<span class="demonstration">渠道：</span>-->
      <!--<el-select v-model="channel" multiple placeholder="请选择渠道">-->
        <!--<el-option-->
          <!--v-for="item in channelList"-->
          <!--:key="item.id"-->
          <!--:label="item.cname"-->
          <!--:value="item.channel">-->
        <!--</el-option>-->
      <!--</el-select>-->

      <!--<el-button type="primary" @click="changeUrl()">查询</el-button>-->
    <!--</div>-->
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
  import vHead from '../../components/common/Header.vue'
  import sidebar from '../../components/common/Sidebar.vue'

  export default {
    name: 'HomeComp',

    data(){
      return {
        msg: 'Use Vue 2.0 Today!',
//        countryList:this.confData.COUNTRYS,
//        channelList:this.confData.CHANNELS,
//        serverList:this.confData.SERVERS,
//        pickerOptions2: {
//          shortcuts: [{
//            text: '最近一周',
//            onClick(picker) {
//              const end = new Date();
//              const start = new Date();
//              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
//              picker.$emit('pick', [start, end]);
//            }
//          }, {
//            text: '最近一个月',
//            onClick(picker) {
//              const end = new Date();
//              const start = new Date();
//              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
//              picker.$emit('pick', [start, end]);
//            }
//          }, {
//            text: '最近三个月',
//            onClick(picker) {
//              const end = new Date();
//              const start = new Date();
//              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
//              picker.$emit('pick', [start, end]);
//            }
//          }]
//        },
//        serverUrl:this.recommendServer,
//        value: '',
//        country:[],
//        channel: [],
//        //dateTime: [this.defaultStartDate,this.defaultEndDate]
//        dateTime: []
      }
    },
    created(){

    },
    components: {
      vHead,
      sidebar,
      //zdatePicker
    },
    methods:{
      changeUrl() {
        const self = this

        console.log(self.$route.name)
        self.$router.push({path:self.$route.name,
          query:{serverurl:self.serverUrl,datetime:self.dateTime,country:self.country,channel:self.channel}
        })

        console.log(self.$route.query)

      },
    }
  }
</script>

