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


    <el-button type="primary" @click="fetchData">查询</el-button>
  </div>
    <el-table :data="reGameData" border stripe max-height="850" style="width: 100%" >
      <el-table-column prop="jobDate" sortable fixed label="日期" width="150"></el-table-column>
      <!--<el-table-column prop="serverId" label="服务器" width="120" ></el-table-column>-->
      <el-table-column prop="dau" label="DAU" sortable width="130" align="right"></el-table-column>
      <el-table-column prop="nuc" label="新增用户" sortable width="150" align="right"></el-table-column>
      <el-table-column prop="pac" label="充值总额" sortable width="150" align="right" ></el-table-column>
      <el-table-column prop="drr" label="次留" width="130" align="right"></el-table-column>
      <el-table-column prop="d3RR" label="三留" width="130" align="right"></el-table-column>
      <el-table-column prop="wrr" label="周留" width="130" align="right"></el-table-column>
      <el-table-column prop="hmrr" label="双周留" width="130" align="right"></el-table-column>
      <el-table-column prop="mrr" label="月留" width="130" align="right"></el-table-column>
      <el-table-column prop="arpu" label="ARPU" width="120" align="right"></el-table-column>
      <el-table-column prop="arppu" label="ARPPU" width="130" align="right"></el-table-column>
      <el-table-column prop="ndc" label="新增设备" width="130" align="right"></el-table-column>
      <el-table-column prop="puc" label="充值用户" width="130" align="right" ></el-table-column>
      <el-table-column prop="pur" label="付费渗透率" width="150" align="right" ></el-table-column>

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
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'BiGeneralComp',

    components:{
      serverList
    },

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        countryList:this.confData.COUNTRYS,
        channelList:this.confData.CHANNELS,
        apiUrl:'',
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
        dateTime: [this.defaultStartDate,this.defaultEndDate],
        GameData:[]
      }
    },

    created (){
      //this.fetchData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.apiUrl+'/bigeneraldata'
        console.log(weburl)
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],

        }).then(response => {
            console.log(response.data)
            this.GameData=response.data
          }
        )
      },

      changeServer(val){
        //console.log(val)
        this.apiUrl=val.apiUrl
      },

      toPercent(point){
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
      },

      changeDate(val){
        let str=val.split(" - ")
        this.dateTime[0]=str[0]
        this.dateTime[1]=str[1]
      }

    },
    watch:{
      apiUrl:function (val,oldVal) {
        if(oldVal==='')
          this.fetchData();
      }
    },
    computed:{
      reGameData() {
          let reGameData=this.GameData;
          reGameData=reGameData.filter(item =>{
              item.drr=this.toPercent(item.drr)
              item.d3RR=this.toPercent(item.d3RR)
              item.wrr=this.toPercent(item.wrr)
              item.hmrr=this.toPercent(item.hmrr)
              item.mrr=this.toPercent(item.mrr)
              item.pur=this.toPercent(item.pur)
              return item
          })

       return reGameData;
      }
    }
  }
</script>

