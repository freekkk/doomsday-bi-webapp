<template>
  <div class="table">

    <div class="filter-container">

      <server-list @change="changeServer"></server-list>

      <span class="demonstration">日期范围：</span>
      <el-date-picker
        v-model="dateTime"
        type="daterange"
        align="right"
        @change="changeDate"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2">
      </el-date-picker>

      <el-button type="primary" @click="getData">查询</el-button>

      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple"><div id="prodChart" style="height: 480px">图表加载失败</div></div>

        </el-col>
        <el-col :span="13">
          <div class="grid-content bg-purple">
            <el-table :data="GameData" border stripe max-height="480" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
              <el-table-column prop="libaoName" fixed sortable label="礼包名称" width="180"></el-table-column>
              <el-table-column prop="humanCount" label="人次" sortable width="130" align="right"></el-table-column>
              <el-table-column prop="libaoCount" label="单数" sortable width="130" align="right"></el-table-column>
              <el-table-column prop="moneyNum" label="金额" sortable width="130" align="right"></el-table-column>
              <el-table-column prop="totalNum"  label="总额" sortable width="150" align="right"></el-table-column>
              <el-table-column prop="percent"  label="百分比" sortable width="150" align="right"></el-table-column>
            </el-table>
          </div>

        </el-col>

      </el-row>
    </div>
    <div></div>
    <div>
      <h4>礼包售卖明细</h4>
      <el-table :data="GameDataDetail" border stripe max-height="500" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
        <el-table-column prop="libaoName" fixed sortable label="礼包名称" width="300"></el-table-column>
        <el-table-column prop="libaoId" label="礼包Id" width="200" sortable ></el-table-column>
        <el-table-column prop="humanCount" label="人次" width="130" sortable align="right"></el-table-column>
        <el-table-column prop="libaoCount" label="单数" width="130" sortable align="right" ></el-table-column>
        <el-table-column prop="moneyNum" label="金额" width="130" sortable align="right"></el-table-column>
        <!--<el-table-column prop="totalNum"  label="总额" width="150"></el-table-column>-->
        <el-table-column prop="percent"  label="百分比" width="150" sortable align="right"></el-table-column>
      </el-table>
    </div>

  </div>


</template>

<script>
  import echarts from 'echarts'
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'LibaoComp',
    components:{
      serverList
    },
    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        serverList:this.confData.SERVERS,
        apiUrl:'',
        startDate:'',
        endDate:'',
        dateTime: [this.defaultStartDate,this.defaultEndDate],
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
//        this.fetchData(),
//        this.fetchDetailData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.apiUrl+'/bilibao'
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],
        }).then(response => {
            //console.log(response.data)
            this.GameData=response.data
          }
        )
      },
      fetchDetailData()
      {
        let weburl=this.apiUrl+'/bilibaodetail'
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],
        }).then(response => {
            //console.log(response.data)
            this.GameDataDetail=response.data
          }
        )
      },
      changeServer(val){
        //console.log(val)
        this.apiUrl=val.apiUrl
      },
      getData()
      {
        this.fetchData()
        this.fetchDetailData()
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
          title : {
            text: '礼包售卖',
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


    },

    watch:{
      'prodChartData': 'initProdChart',
      apiUrl:function (val,oldVal) {
        if(oldVal===''){
          this.fetchData()
          this.fetchDetailData()
        }

      }
    },
    computed:{
      prodData() {
        let reGameData=this.GameData
        return reGameData
      },
      prodChartData() {
        let reData=this.prodData
        let list=[]
        reData.forEach(function (element) {
              var kvmap={"name":element.libaoName,"value":element.moneyNum}
              list.push(kvmap)
        })
        return list
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
