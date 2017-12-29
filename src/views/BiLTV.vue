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
      <span class="demonstration">渠道：</span>
      <el-select v-model="channel" multiple placeholder="请选择渠道">
      <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cname"
      :value="item.channel">
      </el-option>
      </el-select>
      <span class="demonstration">设备：</span>
      <el-select v-model="device" placeholder="请选择设备">
        <el-option
          v-for="item in deviceList"
          :key="item.id"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary" @click="fetchData">查询</el-button>
    </div>
    <el-table :data="reGameData" border stripe max-height="850" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
      <el-table-column prop="jobDate" fixed sortable label="日期" width="150"></el-table-column>
      <!--<el-table-column prop="serverId"  label="服务器" width="120" ></el-table-column>-->
      <el-table-column prop="channel" sortable fixed label="渠道" width="140"></el-table-column>
      <el-table-column prop="cname" sortable fixed label="国家" width="150"></el-table-column>
      <el-table-column prop="t" sortable label="T次" width="120"></el-table-column>
      <el-table-column prop="deviceType" label="设备" width="120"></el-table-column>
      <el-table-column prop="pac" label="充值总额" width="150" align="right" ></el-table-column>
      <el-table-column prop="puc" label="充值用户" width="130" align="right"></el-table-column>
      <el-table-column prop="nuc" label="新增用户" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv1" label="ltv1" width="150" align="right" ></el-table-column>
      <el-table-column prop="ltv2" label="ltv2" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv3" label="ltv3" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv4" label="ltv4" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv5" label="ltv5" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv6" label="ltv6" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv7" label="ltv7" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv14" label="ltv14" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv21" label="ltv21" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv30" label="ltv30" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv60" label="ltv60" width="150" align="right"></el-table-column>
      <el-table-column prop="ltv90" label="ltv90" width="150" align="right"></el-table-column>
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
    name: 'LtvComp',

    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        countryList:this.confData.COUNTRYS,
        channelList:this.confData.CHANNELS,
        deviceList:this.confData.DEVICE,
        apiUrl:'',
        startDate:'',
        endDate:'',
        device:'1',
        value: '',
        country:['CN'],
        channel: ['longyuan1'],
        dateTime: [this.defaultStartDate,this.defaultEndDate],
        GameData:[],
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
      //this.fetchData()
    },
    methods:{
      fetchData()
      {
        let weburl=this.apiUrl+'/biltv'
        this.$http.post(weburl,{
          startDate:this.dateTime[0],
          endDate:this.dateTime[1],
          channel:this.channel,
          country:this.country,
          deviceType:this.device
        }).then(response => {
            console.log(response.data)
            this.GameData=response.data
          }
        )
      },
      changeDate(val){
        let str=val.split(" - ")
        this.dateTime[0]=str[0]
        this.dateTime[1]=str[1]
      },

      changeServer(val){
        this.apiUrl=val.apiUrl
      },

      toPercent(point){
        if(point ==='0')
            return ""
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
      },
      toDeviceType(val)
      {
        let str;
        switch (val){
          default:
            str='未知'
                break
          case 1:
            str='安卓'
                break
          case 2:
            str='IOS'
                break
        }
        return str
      }
    },
    components:{
      serverList
    },
    watch:{
      //'country': 'changeCountry'
      apiUrl:function (val,oldVal) {
        if(oldVal==='')
          this.fetchData();
      }
    },
    computed:{
      reGameData() {
        let reGameData=this.GameData;
        reGameData=reGameData.filter(item =>{
            item.deviceType=this.toDeviceType(item.deviceType)
            return item
        })
        return reGameData;
      }

    }
  }
</script>
