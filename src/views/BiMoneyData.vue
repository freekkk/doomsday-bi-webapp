<template>
  <div class="table">

    <div class="filter-container">

      <server-list :exFullServer="true" @change="changeServer"></server-list>

      <span class="demonstration">日期范围：</span>
      <el-date-picker
        v-model="dateTime"
        type="daterange"
        align="right"
        @change="changeDate"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2">
      </el-date-picker>

      <el-button type="primary" @click="fetchChangeData">查询</el-button>

      <el-row>
        <el-col :span="11"><div class="grid-content bg-purple">
          <el-table :data="GameChangeData" border stripe max-height="500" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
            <el-table-column prop="jobDate" fixed sortable label="日期" width="150"></el-table-column>
            <el-table-column prop="moneyProd" label="当日产出" width="150" sortable align="right"></el-table-column>
            <el-table-column prop="moneyExpend" label="当日消耗" width="150" sortable align="right"></el-table-column>
            <el-table-column prop="dayMoneyLeft" label="当日剩余" width="150" sortable align="right"></el-table-column>
            <el-table-column prop="reDayMoneyLeft"  label="昨日剩余" width="150" sortable align="right"></el-table-column>
          </el-table>
        </div></el-col>
        <el-col :span="13"><div class="grid-content bg-purple"><div id="changeChart" style="height: 480px">图表加载失败</div></div></el-col>

      </el-row>
    </div>

<div>
  <span class="demonstration">日期：</span>
  <el-date-picker
    v-model="jobDate"
    align="right"
    type="date"
    @change="changeJobDate"
    placeholder="选择日期"
    :picker-options="pickerOptions1">
  </el-date-picker>

  <el-button type="success" @click="fetchData">查询</el-button>
  <el-row>
    <el-col :span="11"><div class="grid-content bg-purple">
      <el-table :data="prodData" border stripe max-height="500" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
        <el-table-column prop="jobDate"  sortable label="日期" width="150"></el-table-column>
        <el-table-column prop="creason"   label="原因" width="220"></el-table-column>
        <el-table-column prop="delta"  sortable label="产出" width="150" ></el-table-column>
      </el-table>
    </div></el-col>
    <el-col :span="13"><div class="grid-content bg-purple"><div id="prodChart" style="height: 480px">图表加载失败</div></div></el-col>

  </el-row>

  <el-row>
    <el-col :span="11">
      <div class="grid-content bg-purple">
      <el-table :data="expendData" border stripe max-height="500" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
      <el-table-column prop="jobDate"  sortable label="日期" width="150"></el-table-column>
      <el-table-column prop="creason"   label="原因" width="220"></el-table-column>
      <el-table-column prop="delta" sortable label="消耗" width="150" ></el-table-column>
    </el-table></div></el-col>
    <el-col :span="13"><div class="grid-content bg-purple-light"><div id="expendChart" style="height: 480px">图表加载失败</div></div></el-col>
  </el-row>
</div>



  </div>
</template>

<script>
  import echarts from 'echarts'
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'MoneyComp',

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        apiUrl:'',
        startDate:'',
        endDate:'',
        jobDate: this.defaultEndDate,
        dateTime: [this.defaultStartDate,this.defaultEndDate],
        GameData:[],
        GameChangeData:[],
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
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    },

    created (){
//      this.fetchData()
//      this.fetchChangeData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.apiUrl+'/bimoney'
        this.$http.post(weburl,{
          startDate:this.jobDate,
          endDate:this.jobDate,
        }).then(response => {
            //console.log(response.data)
            this.GameData=response.data
          }
        )
      },
      fetchChangeData()
      {
        let weburl=this.apiUrl+'/bimoneychange'
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],
        }).then(response => {
            //console.log(response.data)
            this.GameChangeData=response.data
          }
        )
      },
      changeDate(val){
        let str=val.split(" - ")
        this.dateTime[0]=str[0]
        this.dateTime[1]=str[1]
      },

      changeServer(val){
        //console.log(val)
        this.apiUrl=val.apiUrl
      },

      changeJobDate(val){
        this.jobDate=val
      },
      checkDelta(value){
        return value.delta>0
      },
      recheckDelta(value){
        return value.delta<0
      },
      initProdChart() {
        const myChart = echarts.init(document.getElementById('prodChart'));

        myChart.clear()

        myChart.showLoading()
        var option = {
          title : {
            text: '产出',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            //data:  ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '类型',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.prodChartData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option,true);
        myChart.hideLoading();
      },
      initExpendChart() {
        const myChart = echarts.init(document.getElementById('expendChart'));

        myChart.clear()

        myChart.showLoading()
        var option = {
          title : {
            text: '消耗',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            //data:  ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '类别',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.expendChartData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option,true);
        myChart.hideLoading();
      },
      initChangeChart() {
        const myChart = echarts.init(document.getElementById('changeChart'));

        myChart.clear()

        myChart.showLoading()
        var option = {
          title: {
            text: '钻石变化'
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
            data: ['当日剩余','昨日剩余','当日产出','当日消耗']
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
              data:this.getChangeDataJobDate
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '当日剩余',
              type: 'line',
              stack: '总量1',
              areaStyle: { normal: {},smooth:true },
              data:this.getChangeDataDayMoneyLeft
            },
            {
              name: '昨日剩余',
              type: 'line',
              stack: '总量2',
              areaStyle: { normal: {},smooth:true },
              data:this.getChangeDataReDayMoneyLeft
            },
            {
              name: '当日产出',
              type: 'line',
              stack: '总量3',
              areaStyle: { normal: {} },
              data:this.getChangeDataDayMoneyProd
            },
            {
              name: '当日消耗',
              type: 'line',
              stack: '总量4',
              areaStyle: { normal: {} },
              data:this.getChangeDataDayMoneyExpend
            }

          ]
        };
        myChart.setOption(option,true);
        myChart.hideLoading();
      }

    },
    components:{
      serverList
    },
    watch:{
      'prodChartData': 'initProdChart',
      'expendChartData': 'initExpendChart',
      'GameChangeData':'initChangeChart',
      apiUrl:function (val,oldVal) {
        if(oldVal==='') {
          this.fetchData()
          this.fetchChangeData()
        }
      }
    },
    computed:{
      prodData() {
        let reGameData=this.GameData
        reGameData=reGameData.filter(this.checkDelta)

        let delta=0
        if(reGameData.length>10)
        {
          for(var i=10;i<reGameData.length;i++)
          {
            delta+=reGameData[i].delta
          }
        }

        console.log("delta:"+delta)
        var kvmap={"creason":'其他',"delta":delta}
        reGameData.splice(10,0,kvmap)

        return reGameData.slice(0,11)
      },
      prodChartData() {
        let reData=this.prodData
        let list=[]
        reData.forEach(function (element) {
              var kvmap={"name":element.creason,"value":element.delta}
              list.push(kvmap)
        })
        return list
      },
      expendData() {
        let reGameData=this.GameData
        reGameData=reGameData.filter(this.recheckDelta)
        reGameData.reverse()
        let delta=0
        if(reGameData.length>10)
        {
          for(var i=10;i<reGameData.length;i++)
          {
            delta+=reGameData[i].delta
          }
        }

        console.log("delta:"+delta)
        var kvmap={"creason":'其他',"delta":delta}
        reGameData.splice(10,0,kvmap)

        return reGameData.slice(0,11)

      },
      expendChartData() {
        let reData=this.expendData
        let list=[]
        reData.forEach(function (element) {
          var kvmap={"name":element.creason,"value":element.delta}
          list.push(kvmap)
        })
        return list
      },
      getChangeDataJobDate(){
        let list=[];
        this.GameChangeData.find((item)=>{
          list.push(item.jobDate);
        });

        return list.reverse();
      },
      getChangeDataDayMoneyLeft(){
        let list=[];
        this.GameChangeData.find((item)=>{
          list.push(item.dayMoneyLeft);
        });
        return list.reverse();

      },
      getChangeDataReDayMoneyLeft(){
        let list=[];
        this.GameChangeData.find((item)=>{
          list.push(item.reDayMoneyLeft);
        });
        return list.reverse();

      },
      getChangeDataDayMoneyProd(){
        let list=[];
        this.GameChangeData.find((item)=>{
          list.push(item.moneyProd);
        });
        return list.reverse();

      },
      getChangeDataDayMoneyExpend(){
        let list=[];
        this.GameChangeData.find((item)=>{
          list.push(Math.abs(item.moneyExpend));
        });
        return list.reverse();
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
