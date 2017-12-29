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
      <span class="demonstration">国家：</span>
      <el-select v-model="country" multiple placeholder="请选择国家">
        <el-option
          v-for="item in countryList"
          :key="item.id"
          :label="item.cname"
          :value="item.country">
        </el-option>
      </el-select>

      <el-button type="primary" @click="fetchData">查询</el-button>


      <div class="grid-content bg-purple"><div id="prodChart" style="height: 480px">图表加载失败</div></div>


      <div class="grid-content bg-purple">
        <el-table :data="GameData" border stripe max-height="480" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
          <!--<el-table-column prop="id" fixed sortable label="id" width="180"></el-table-column>-->
          <el-table-column prop="missionId" label="任务Id" width="150"></el-table-column>
          <el-table-column prop="missionName" label="任务名称" width="250" ></el-table-column>
          <el-table-column prop="getCount" label="领取任务" width="130" ></el-table-column>
          <el-table-column prop="finishCount"  label="完成任务" width="150"></el-table-column>
          <el-table-column prop="awardCount"  label="领取奖励" width="130"></el-table-column>
          <el-table-column prop="surplusPercent"  label="剩余百分比" width="150"></el-table-column>
          <el-table-column prop="lostPercent"  label="流失百分比" width="150"></el-table-column>
        </el-table>
      </div>

    </div>

  </div>


</template>

<script>
  import echarts from 'echarts'
  import serverList from '@/components/common/ServerList'

  export default {
    name: 'MissionComp',

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        countryList:this.confData.COUNTRYS,
        apiUrl:'',
        startDate:'',
        endDate:'',
        dateTime: [this.defaultStartDate,this.defaultEndDate],
        country:['RU'],
        GameData:[],
        GameDataDetail:[],
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
        }
      }
    },

    created (){
        this.fetchData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.apiUrl+'/bimission'

        //let weburl='http://localhost:9000/api/bimission';
        console.log("Post url:"+weburl)
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],
          country:this.country,
        }).then(response => {
            //console.log(response.data)
            this.GameData=response.data
          }
        )
      },
      changeServer(val){
        console.log(val)
        this.apiUrl=val.apiUrl
      },

      changeDate(val){
        let str=val.split(" - ")
        this.dateTime[0]=str[0]
        this.dateTime[1]=str[1]
      },

      initProdChart() {
        const myChart = echarts.init(document.getElementById('prodChart'));

        myChart.clear()

        myChart.showLoading()
        var option = {
          title: {
            text: '任务通过率'
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
            data: ['剩余','流失']
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
              data: this.missionName,
              axisLabel: {
                interval: 0,//横轴信息全部显示
                rotate: 0,//60度角倾斜显示
                formatter: function (val) {
                  return val.split("").join("\n"); //横轴信息文字竖直显示
                }
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
              name: '剩余',
              type: 'line',
              stack: '总量1',
              areaStyle: { normal: {},smooth:true },
              data:this.surplus
            },
            {
              name: '流失',
              type: 'line',
              stack: '总量2',
              areaStyle: { normal: {},smooth:true },
              data:this.lost
            }
          ]
        };
        myChart.setOption(option,true);
        myChart.hideLoading();
      },


    },
    components:{
      serverList
    },
    watch:{
      'GameData': 'initProdChart',
      apiUrl:function (val,oldVal) {
        if(oldVal==='')
          this.fetchData();
      }
    },
    computed:{
      prodData() {
        let reGameData=this.GameData
        return reGameData
      },
      missionName(){
        let list=[]
        // 取出任务里面前18新手引导任务
        for(var i =0; i<18; i++)
        {
          var o=this.GameData[i]
          list.push(o.missionName)
        }
        return list
      },
      surplus()
      {
        let list=[]
        // 取出任务里面前18新手引导任务
        for(var i =0; i<18; i++)
        {
          var o=this.GameData[i]
          list.push(o.surplusPercent)
        }
        return list
      },
      lost()
      {
        let list=[]
        // 取出任务里面前18新手引导任务
        for(var i =0; i<18; i++)
        {
          var o=this.GameData[i]
          list.push(o.lostPercent)
        }
        return list
      }
    }
  }
</script>
