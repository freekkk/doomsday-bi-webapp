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


    <el-button type="primary" @click="fetchData">查询</el-button>
  </div>
    <el-table :data="reGameData" border stripe max-height="850" style="width: 100%" >
      <el-table-column prop="jobDate" sortable fixed label="日期" width="150"></el-table-column>
      <!--<el-table-column prop="serverId" label="服务器" width="120" ></el-table-column>-->
      <el-table-column prop="nuc" label="新增用户" sortable fixed width="150" align="right"></el-table-column>
      <el-table-column prop="d2RR" label="次留" width="130" align="right"></el-table-column>
      <el-table-column prop="d3RR" label="3日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d4RR" label="4日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d5RR" label="5日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d6RR" label="6日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d7RR" label="7日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d8RR" label="8日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d9RR" label="9日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d10RR" label="10日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d11RR" label="11日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d12RR" label="12日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d13RR" label="13日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d14RR" label="14日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d15RR" label="15日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d16RR" label="16日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d17RR" label="17日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d18RR" label="18日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d19RR" label="19日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d20RR" label="20日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d21RR" label="21日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d22RR" label="22日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d23RR" label="23日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d24RR" label="24日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d25RR" label="25日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d26RR" label="26日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d27RR" label="27日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d28RR" label="28日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d29RR" label="29日留" width="130" align="right"></el-table-column>
      <el-table-column prop="d30RR" label="30日留" width="130" align="right"></el-table-column>

    </el-table>

</div>
</template>

<script>
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'BiDayRateComp',

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
        let weburl=this.apiUrl+'/bidayrate'
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
        if(point !=null)
        {
          let str=Number(point*100).toFixed(2);
          str+="%";
          return str;
        }

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
            item.d2RR=this.toPercent(item.d2RR);
            item.d3RR=this.toPercent(item.d3RR);
            item.d4RR=this.toPercent(item.d4RR);
            item.d5RR=this.toPercent(item.d5RR);
            item.d6RR=this.toPercent(item.d6RR);
            item.d7RR=this.toPercent(item.d7RR);
            item.d8RR=this.toPercent(item.d8RR);
            item.d9RR=this.toPercent(item.d9RR);
            item.d10RR=this.toPercent(item.d10RR);
            item.d11RR=this.toPercent(item.d11RR);
            item.d12RR=this.toPercent(item.d12RR);
            item.d13RR=this.toPercent(item.d13RR);
            item.d14RR=this.toPercent(item.d14RR);
            item.d15RR=this.toPercent(item.d15RR);
            item.d16RR=this.toPercent(item.d16RR);
            item.d17RR=this.toPercent(item.d17RR);
            item.d18RR=this.toPercent(item.d18RR);
            item.d19RR=this.toPercent(item.d19RR);
            item.d20RR=this.toPercent(item.d20RR);
            item.d21RR=this.toPercent(item.d21RR);
            item.d22RR=this.toPercent(item.d22RR);
            item.d23RR=this.toPercent(item.d23RR);
            item.d24RR=this.toPercent(item.d24RR);
            item.d25RR=this.toPercent(item.d25RR);
            item.d26RR=this.toPercent(item.d26RR);
            item.d27RR=this.toPercent(item.d27RR);
            item.d28RR=this.toPercent(item.d28RR);
            item.d29RR=this.toPercent(item.d29RR);
            item.d30RR=this.toPercent(item.d30RR);

            return item
          });

       return reGameData;
      }
    }
  }
</script>

