<template>

<div class="table">
  <div class="filter-container">
    服务器列表：
    <el-select v-model="serverUrl" placeholder="请选择服务器">
      <el-option
        v-for="server in serverList"
        :key="server.id"
        :label="server.name"
        :value="server.url">
      </el-option>
    </el-select>
    <span class="demonstration">日期范围：</span>
    <el-date-picker
      v-model="dateTime"
      type="daterange"
      align="right"
      @change="changeDate"
      placeholder="选择日期范围"
      :picker-options="pickerOptions2">
    </el-date-picker>
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

    <el-button type="primary" @click="fetchData">查询</el-button>
  </div>
    <el-table :data="reGameData" border stripe max-height="850" style="width: 100%" >
      <el-table-column prop="jobDate" sortable fixed label="日期" width="150"></el-table-column>
      <!--<el-table-column prop="serverId" label="服务器" width="120" ></el-table-column>-->
      <el-table-column prop="dau" label="DAU" width="110"></el-table-column>
      <el-table-column prop="nuc" label="新增用户" width="110"></el-table-column>
      <el-table-column prop="ndc" label="新增设备" width="110"></el-table-column>
      <el-table-column prop="drr" label="次留" width="130"></el-table-column>
      <el-table-column prop="d3RR" label="三留" width="130"></el-table-column>
      <el-table-column prop="wrr" label="周留" width="130"></el-table-column>
      <el-table-column prop="hmrr" label="双周留" width="130"></el-table-column>
      <el-table-column prop="mrr" label="月留" width="130"></el-table-column>
      <el-table-column prop="arpu" label="ARPU" width="120"></el-table-column>
      <el-table-column prop="arppu" label="ARPPU" width="130"></el-table-column>
      <el-table-column prop="pac" label="充值总额" width="110" ></el-table-column>
      <el-table-column prop="puc" label="充值用户" width="110" ></el-table-column>
      <el-table-column prop="pur" label="付费渗透率" width="130" ></el-table-column>

    </el-table>
  <!--<div class="pagination">-->
    <!--<el-pagination-->
      <!--@current-change ="handleCurrentChange"-->
      <!--layout="prev, pager, next"-->
      <!--:total="1000">-->
    <!--</el-pagination>-->
  <!--</div>-->
</div>
</template>

<script>
  export default {
    name: 'DashboardComp',

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        countryList:this.confData.COUNTRYS,
        channelList:this.confData.CHANNELS,
        serverList:this.confData.SERVERS,
        serverUrl:this.recommendServer,
        startDate:'',
        endDate:'',

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

        value: '',
        country:[],
        channel: [],
        dateTime: [],
        todayData:[]
      }
    },
//    mounted(){
//      let self=this;
//      bus.$on('serverIdChange',function (value) {
//        self.serverId=value
//        let weburl='http://s'+self.serverId+'.doom.dragonest.net:9000/api/bigeneraldata'
//        console.log(weburl)
//        self.$http.get(weburl)
//          .then(response => {
//            console.log(response.data)
//            self.gamedata = response.data
//          })
//          .catch(error=>{
//            console.log(error)
//          })
//      })
//    },
    created (){
      this.fetchData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.serverUrl+'/bigeneraldata'
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],

        }).then(response => {
            console.log(response.data)
            this.todayData=response.data
          }
        )
      },

      toPercent(point){
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
      },

      changeDate(val){
        let str=val.split(" - ")
        this.startDate=str[0]
        this.endDate=str[1]
      }
//      changeUrl() {
//        const self = this
//
//        console.log(self.$route.name)
//        self.$router.push({path:self.$route.name,
//          query:{serverurl:self.serverUrl,datetime:self.dateTime,country:self.country,channel:self.channel}
//        })
//
//        console.log(self.$route.query)
//
//      }
    },
    components:{

    },
    watch:{
//      '$route': 'fetchData',
//      'serverUrl':'fetchData',
//      'startDate':'fetchData',
//      'endDate':'fetchData'
      //'dateTime':'changeDate'
    },
    computed:{
      reGameData() {
          let reGameData=this.todayData.reverse();
          reGameData=reGameData.filter(item =>{
              item.drr=this.toPercent(item.drr)
              item.d3RR=this.toPercent(item.d3RR)
              item.wrr=this.toPercent(item.wrr)
              item.hmrr=this.toPercent(item.hmrr)
              item.mrr=this.toPercent(item.mrr)
              item.pur=this.toPercent(item.pur)
              return item
          })
        //console.log(reGameData);
       return reGameData;
      }
    }
  }
</script>

