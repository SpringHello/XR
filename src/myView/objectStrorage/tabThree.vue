<template>
    <div>
        <p style="font-size:16px;color:#000000;margin-bottom:10px;">操作日志</p>
        <div style="height:31px;display:flex;margin-bottom:20px;">
           <ul class="objectList">
                 <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dayList" :key="index" @click="dayClick(1,index)">{{item.value}}</li>
             </ul>
            <div class="journal_right">
                <span>开始结束时间</span>
                 <DatePicker type="daterange" :options="options4" v-model="time"  placement="bottom-end" placeholder= "Select date" style="width: 200px"></DatePicker>
                <Button type="primary"  @click="select">查询</Button>
            </div>
        </div>
        <Table :loading="pageLoading" :columns="journalList" :data="journalData" ></Table>
        <Page :total="total" @on-change="selectLogs"   style="margin-top: 20px;"></Page>
      <!--<Page :total="total" @on-change="dayClick"   style="margin-top: 20px;"></Page>-->
    </div>
</template>

<script>
    export default {
  data() {
    return {
      //日志加载动画
      pageLoading:false,
      //总条数
      total:0,
      //操作日志表头
      journalList: [
        {
          key: "operatetarget",
          title: "操作"
        },
        {
          key: "operatestatus",
          title: "结果",
          render : (h,params) =>{
            return h('div',[
              h('span',{
                  style:{
                    color:'#2A99F2'
                  }
              },params.row.operatestatus==1 ?'成功':'失败')
            ])
          }
        },
        {
          key: "operatortime",
          title: "操作时间"
        }
      ],
      //操作日志数据
      journalData: [],
      dayList:[
          {
              value:'近一天',
              startDate:'',
              endDate:''
          },
          {
              value:'近一周',
              startDate:'',
              endDate:''
          },
          {
              value:'近一月',
              startDate:'',
              endDate:''
          }
      ],
      indexs:-1,
      time:'',
      options4:{
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 6400000;
        }
      },
      //操作日志结束时间
      oneDay:"",
      //操作日志开始时间
      startDate:""
    };
  },
  methods: {
      dayClick(page,val){
          this.indexs = val;
          //获取前七天
          var weeks = new Date();
          var now = new Date(weeks.getTime() - 7 * 24 * 3600 * 1000);
          var weekYear = now.getFullYear();
          var weekMouth = now.getMonth()+1;
          var weekDay = now.getDate();
          var week = weekYear+"-"+(weekMouth<10?('0'+weekMouth):weekMouth)+"-"+(weekDay<10?('0'+weekDay):weekDay);

          var date  = new Date();
          //获取前一天
           var dayOne = new Date(date.getTime() - 1 * 24 * 3600 * 1000);
            var dayYear = dayOne.getFullYear();
            var dayMonth = dayOne.getMonth() +1;
            var dayD = dayOne.getDate();
            var dayTime = dayYear+"-"+(dayMonth<10?('0'+dayMonth):dayMonth)+"-"+(dayD<10?('0'+dayD):dayD);

         //获取当前时间
          var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);

          var y = date.getFullYear();
          var m = date.getMonth()+1;
          var d = date.getDate();
          m = m > 9  ? m : '0'+m;
          d = d > 9 ? d : '0'+d;

          var time = y+'-'+m+'-'+d;
          if(y%4 == 0 && y%100 != 0){
            daysInMonth[2] = 29;
          }
          if(m - 1 == 0)
          {
            y -= 1;
            m = 12;
          }
          else
          {
            m -= 1;
          }
          d = daysInMonth[m] >= d ? d : daysInMonth[m];
          if(m<10)
          {
            m='0'+m;
          }
              this.dayList[val].startDate = time.toString();
              this.dayList[2].endDate = y+'-'+m+'-'+d;
              this.dayList[1].endDate = week;
              this.dayList[0].endDate = dayTime;
              this.oneDay = this.dayList[val].endDate;
              this.startDate = this.dayList[val].startDate;
              console.log(page);
           this.$http.post('operatelog/selectLogFromTime.do',{
            startTime: this.startDate,
            endTime: this.oneDay,
            pageSum:10,
            pageNum:page == undefined ? 1 : page
          }).then(res => {
             if(res.data.status =='1'){
              if(typeof(res.data.data.logs) === "string")
                return this.journalData = [];
              this.journalData = res.data.data.logs;
            }
          })
      },
    select(){
      this.indexs = -1;
        var year = this.time[1].getFullYear();
        var month = this.time[1].getMonth()+1;
        var day = this.time[1].getDate();
        //开始时间
        var star =  year+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day);
        //结束时间
        var year1 = this.time[0].getFullYear();
        var month1 = this.time[0].getMonth()+1;
        var day1 = this.time[0].getDate();
        var end =year1+"-"+(month1<10?('0'+month1):month1)+"-"+(day1<10?('0'+day1):day1);
        this.$http.post('operatelog/selectLogFromTime.do',{
          startTime:star.toString(),
          endTime:end.toString()
        }).then(res => {
          if(res.data.status =='1'){
            if(typeof(res.data.data.logs) === "string")
              return this.journalData = [];
            this.journalData = res.data.data.logs;
          }
        })
      },
    //获取操作日志
    selectLogs(page){
        this.pageLoading = true;
      this.$http.post('operatelog/selectLogs.do',{
        pageSum:10,
        pageNum:page
      }).then(res =>{
        if(res.data.status == '1'){
          if(typeof(res.data.data.logs) === "string"){
            this.journalData = [];
            this.pageLoading = false;
          }else {
            this.pageLoading = false;
            this.journalData = res.data.data.logs;
            this.total = res.data.data.page.sumCount;
          }
        }else{
          this.pageLoading = false;
          this.$Message.error(res.data.msg);
        }
      })
    }
  },
  mounted() {
   this.selectLogs(1);
  }
};
</script>

<style lang="less" scoped>
.journal {
  width: 50%;
  span {
    padding: 6px 16px;
    border: 1px solid #d9d9d9;
    margin-right: -2px;
    cursor: pointer;
    display: inline-block;
  }
  span:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  span:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  span:hover {
    border: 1px solid #2a99f2;
    color: #2a99f2;
  }
}
.journal_right {
  width: 50%;
  text-align: right;
}
 .objectList {
      width:50%;
      font-family: PingFangSC;
      display: flex;
      li:first-child{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      li:last-child{
        border-top-right-radius:4px;
        border-bottom-right-radius: 4px;
      }
      .objectItem {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #D9D9D9;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItems {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #2a99f2;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItem:hover {
        border:1px solid #2a99f2;
        cursor: pointer;
      }
    }
</style>


