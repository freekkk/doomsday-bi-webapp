<template>
  <div class="el-table">

    <server-list @change="changeServer"></server-list>
    <el-button type="primary" @click="fetchData">查询</el-button>
    <div id="DAUChart" style="height: 650px">图表加载失败</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import serverList from '@/components/common/ServerList'
export default {
  name: 'CurrentDataComp',
  data() {
    return {
      msg: 'Use Vue 2.0 Today!',
      apiUrl:'',
      todayData: [],
      yesterdayData:[],
      weekData:[],
      createTime:[],
      xDate:[],
      DAU:[],
      NUC:[],
      PAC:[]

    }
  },
  created() {
    //this.fetchData()
    //this.initDAUChart()
  },
  components:{
    serverList
  },
  methods: {
    fetchData() {
      if(this.todayData.length>0)
      {
        this.todayData=[]
        this.yesterdayData=[]
        this.weekData=[]
        this.createTime=[]
      }

      let weburl = this.apiUrl + '/bicurrentdata'
      let self=this
      this.$http.all([
        this.$http.get(weburl,{params:{
          date:new Date().getTime()
        }}),
        this.$http.get(weburl,{params:{
          date:new Date(new Date().getTime()-3600 * 1000 * 24).getTime()
        }}),
        this.$http.get(weburl,{params:{
          date:new Date(new Date().getTime()-3600 * 1000 * 24 * 7).getTime()
        }})
      ]).then(
        this.$http.spread(function (todayResp,yesterdayResp,weekResp) {
          self.todayData=todayResp.data;
          //console.log("todayData:"+todayResp.data);
          self.yesterdayData=yesterdayResp.data;
          //console.log("yesterdayData:"+yesterdayResp.data);
          self.weekData=weekResp.data;
          //console.log("weekData:"+weekResp.data);
        }))
    },
    changeServer(val){
      this.apiUrl=val.apiUrl
    },

    getDate(){
      let list=[]
      //开服第一天，昨日数据肯定是没有的。所以用今日的数据当X轴
      if(this.yesterdayData.length===0)
      {
        this.todayData.find((item)=>{
          list.push(item.createTime);
        });
      }
      else {
        this.yesterdayData.find((item)=>{
          list.push(item.createTime);
        });
      }
      this.xDate=list;
    },

    getDAU(data){
      let list=[]
      data.find((item)=>{
        list.push(item.dau);
      });
      return list
    },
    getNUC(data){
      let list=[]
      data.find((item)=>{
        list.push(item.nuc);
      });
      return list
    },
    getPAC(data){
      let list=[]
      data.find((item)=>{
        list.push(item.pac);
      });
      return list
    },

    initChart() {
      const myChart = echarts.init(document.getElementById('DAUChart'));
      myChart.clear();
      this.getDate();
      myChart.showLoading();
      let option = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['当日DAU','昨日DAU','上周DAU','当日新增用户','昨日新增用户','上周新增用户','当日收入','昨日收入','上周收入']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false,
            data:this.xDate,
            axisLabel: {
              interval: 11,//横轴数量

            },
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '当日DAU',
            type: 'line',
            stack: '总量1',
            areaStyle: { normal: {} },
            data:this.getDAU(this.todayData)

          },
          {
            name: '昨日DAU',
            type: 'line',
            stack: '总量2',
            areaStyle: { normal: {} },
            data:this.getDAU(this.yesterdayData)
          },
          {
            name: '上周DAU',
            type: 'line',
            stack: '总量3',
            areaStyle: { normal: {} },
            data:this.getDAU(this.weekData)
          },
          {
            name: '当日新增用户',
            type: 'line',
            stack: '总量4',
            areaStyle: { normal: {} },
            data:this.getNUC(this.todayData)
          },
          {
            name: '昨日新增用户',
            type: 'line',
            stack: '总量5',
            areaStyle: { normal: {} },
            data:this.getNUC(this.yesterdayData)
          },
          {
            name: '上周新增用户',
            type: 'line',
            stack: '总量6',
            areaStyle: { normal: {} },
            data:this.getNUC(this.weekData)
          },
          {
            name: '当日收入',
            type: 'line',
            stack: '总量7',
            areaStyle: { normal: {} },
            data:this.getPAC(this.todayData)
          },
          {
            name: '昨日收入',
            type: 'line',
            stack: '总量8',
            areaStyle: { normal: {} },
            data:this.getPAC(this.yesterdayData)
          },
          {
            name: '上周收入',
            type: 'line',
            stack: '总量9',
            areaStyle: { normal: {} },
            data:this.getPAC(this.weekData)
          }
        ]
      };
      myChart.setOption(option,true);
      myChart.hideLoading();

    }
  },

  watch:{
    'todayData': 'initChart',
    apiUrl:function (val,oldVal) {
      if(oldVal==='')
        this.fetchData();
    }
  },

}
</script>

