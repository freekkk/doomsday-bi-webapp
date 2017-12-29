<template>
  <div class="table">

    <div class="filter-container">
      <!--服务器列表：-->
      <!--<el-select v-model="serverUrl" placeholder="请选择服务器">-->
        <!--<el-option-->
          <!--v-for="server in serverList"-->
          <!--:key="server.id"-->
          <!--:label="server.name"-->
          <!--:value="server.url">-->
        <!--</el-option>-->
      <!--</el-select>-->

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

      <el-button type="primary" @click="fetchData()">查询</el-button>
    </div>
    <el-table :data="reGameData" border stripe max-height="850" style="width: 100%" empty-text="数据量大，请使用删选条件查询！" >
      <el-table-column prop="jobDate" fixed sortable label="日期" width="150"></el-table-column>
      <!--<el-table-column prop="serverId"  label="服务器" width="120" ></el-table-column>-->
      <el-table-column prop="channel" sortable fixed label="渠道" width="140"></el-table-column>
      <el-table-column prop="cname" sortable fixed label="国家" width="150"></el-table-column>
      <el-table-column prop="t" sortable label="T次" width="120"></el-table-column>
      <!--<el-table-column prop="deviceType" label="设备" width="120"></el-table-column>-->
      <el-table-column prop="dau" sortable label="DAU" width="130"></el-table-column>
      <el-table-column prop="nuc" sortable label="新增用户" width="150"></el-table-column>
      <el-table-column prop="ndc" sortable label="新增设备" width="150"></el-table-column>
      <el-table-column prop="drr" label="次留" width="130"></el-table-column>
      <el-table-column prop="d3RR" label="三留" width="130"></el-table-column>
      <el-table-column prop="wrr" label="周留" width="130"></el-table-column>
      <el-table-column prop="hmrr" label="双周留" width="130"></el-table-column>
      <el-table-column prop="mrr" label="月留" width="130"></el-table-column>
      <el-table-column prop="arpu" label="ARPU" width="120"></el-table-column>
      <el-table-column prop="arppu" label="ARPPU" width="130"></el-table-column>
      <el-table-column prop="pac" label="充值总额" width="110" ></el-table-column>
      <el-table-column prop="puc" label="充值用户" width="110" ></el-table-column>
      <el-table-column prop="pur" label="付费渗透率" width="150" ></el-table-column>

    </el-table>

  </div>
</template>

<script>
  import serverList from '@/components/common/ServerList'
  export default {
    name: 'GeneralDataDetailComp',
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

        let weburl=this.apiUrl+'/bigeneraldatadetail'
        console.log("Post url:"+weburl)
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
        //console.log(val)
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
            item.deviceType=this.toDeviceType(item.deviceType)
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
