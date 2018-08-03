<template>
  <div>
    <div class="center_chart">
      <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;">
        <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
        <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
      </div>
      <div class="chart" >
        <ul class="objectList">
          <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dayList" :key="index" @click="dayClick(index)">{{item.value}}</li>
        </ul>
        <div class="chart-rig" >
           <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda('rwPolar')">导出</Button>
          <ul class="objectListT">
            <li :class="chartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartClick(index)">{{item.value}}</li>
          </ul>
        </div>
      </div>
      <chart ref="rwPolar" class="echarts" :options="rwPolar"></chart>
    </div>
    <div class="center_chart">
      <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;margin-top:50px;">
        <div style="width:50%;font-size:16px;color:#333333;">Get请求情况</div>
        <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
      </div>
      <div class="chart" >
        <ul class="objectList">
          <li :class="getIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in getList" :key="index" @click="getClick(index)">{{item.value}}</li>
        </ul>
        <div class="chart-rig">
           <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda('rwNumber')">导出</Button>
          <ul class="objectListT">
            <li :class="getChartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in getChartList" :key="index" @click="getChartClick(index)">{{item.value}}</li>
          </ul>
        </div>
      </div>
      <chart ref="rwNumber" class="echarts" :options="rwNumber"></chart>
    </div>
    <div class="center_chart">
      <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;margin-top:50px;">
        <div style="width:50%;font-size:16px;color:#333333;">Put请求情况</div>
        <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
      </div>
      <div class="chart">
        <ul class="objectList">
          <li :class="putIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in putList" :key="index" @click="putClick(index)">{{item.value}}</li>
        </ul>
        <div class="chart-rig">
           <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda('rwPut')">导出</Button>
          <ul class="objectListT">
            <li :class="putChartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in putChartList" :key="index" @click="putChartClick(index)">{{item.value}}</li>
          </ul>
        </div>
      </div>
      <chart ref="rwPut" class="echarts" :options="rwPut" ></chart>
    </div>
  </div>
</template>

<script>
import diskOptions from "@/echarts/objectStroage";
import objectNumbers from "@/echarts/numberRequests"
import put from "@/echarts/putList"
const disk = JSON.stringify(diskOptions);
const numbers = JSON.stringify(objectNumbers);
const putList = JSON.stringify(put);
export default {
    data(){
        return{
            rwPolar: JSON.parse(disk),
             rwNumber: JSON.parse(numbers),
             rwPut :JSON.parse(putList),
            //下载流量统计图数据
              dayList:[
                    {
                    value:'今天',
                      data: [],
                    day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
                    label:'1'
                    },
                    {
                    value:'昨天',
                      data: [],
                    day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
                    label:'2'
                    },
                    {
                    value:'最近七天',
                      data: [],
                    day:['02/18','02/18','02/18','02/18','02/18','02/18','02/18'],
                    label:'3'
                    },
                    {
                    value:'最近三十天',
                      data: [],
                    day:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15','04/16','04/17','04/18','04/19','04/20','04/21','04/22','04/23','04/24','04/25','04/26','04/27','04/28','04/29','04/30'],
                    label:'30'
                    }
              ],
            //下载流量切换数据
            indexs:0,
            //下载流量切换统计图
              chartList:[
                {
                value:'折线',
                type:'line',
                boundaryGap:false
                },
                {
                value:'柱状图',
                type:'bar',
                boundaryGap:true
                }
            ],
            //下载流量切换统计图
            chartIndex:0,
            //get请求统计图数据
            getList:[
                    {
                    value:'今天',
                    data:[],
                    day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
                    label:'1'
                    },
                    {
                    value:'昨天',
                    data:[],
                    day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
                    label:'2'
                    },
                    {
                    value:'最近七天',
                    data:[],
                    day:['02/18','02/18','02/18','02/18','02/18','02/18','02/18'],
                    label:'3'
                    },
                    {
                    value:'最近三十天',
                    data:[],
                    day:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15','04/16','04/17','04/18','04/19','04/20','04/21','04/22','04/23','04/24','04/25','04/26','04/27','04/28','04/29','04/30'],
                    label:'30'
                    }
              ],
            // get请求切换数据
            getIndex:0 ,
            //get请求切换统计图
            getChartList:[
              {
                value:'折线',
                type:'line',
                boundaryGap:false
              },
              {
                value:'柱状图',
                type:'bar',
                boundaryGap:true
              }
            ],
            getChartIndex:0,
            //put请求数据
            putList:[
              {
              value:'今天',
              data:[],
              day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
              label:'1'
            },
              {
                value:'昨天',
                data:[],
                day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
                label:'2'
              },
              {
                value:'最近七天',
                data:[],
                day:['02/18','02/18','02/18','02/18','02/18','02/18','02/18'],
                label:'3'
              },
              {
                value:'最近三十天',
                data:[],
                day:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15','04/16','04/17','04/18','04/19','04/20','04/21','04/22','04/23','04/24','04/25','04/26','04/27','04/28','04/29','04/30'],
                label:'30'
              }],
            //put请求切换数据
            putIndex:0,
            //put请求切换统计图
            putChartIndex:0,
            //put请求统计图类型
            putChartList:[
              {
                value:'折线',
                type:'line',
                boundaryGap:false
              },
              {
                value:'柱状图',
                type:'bar',
                boundaryGap:true
              }
            ]
        }
    },
  created(){
    this.dayClick(0);
    this.getClick(0);
    this.putClick(0);
  },
    methods:{
            //下载流量点击切换数据
            dayClick(val){
              this.indexs = val;
              this.$http.post('monitor/getMonitorFlow.do',{
                bucketName:'',
                times: this.dayList[val].label
              }).then(res=>{
                if(!res.data.data.dateList){
                  this.rwPolar.xAxis.data = this.dayList[val].day;
                  this.rwPolar.series[0].data =this.changeByte(res.data.data.getFlow);
                }else {
                  this.rwPolar.xAxis.data = res.data.data.dateList;
                  this.rwPolar.series[0].data = this.changeByte(res.data.data.getFlow);
                }
              })
            },
            //下载流量切换统计图类型
            chartClick(val){
                this.chartIndex = val;
                this.rwPolar.series[0].type = this.chartList[val].type;
                this.rwPolar.xAxis.boundaryGap = this.chartList[val].boundaryGap;
            },
            //get请求切换数据
            getClick(val){
              this.getIndex = val;
              this.$http.post('monitor/getTimesList.do',{
                bucketName:'',
                times:this.getList[val].label
              }).then(res => {
                if(res.data.status == '1'){
                  if(!res.data.data.dateList){
                    this.rwNumber.xAxis.data  = this.getList[val].day;
                    this.rwNumber.series[0].data =res.data.data.getTimes;
                  }else{
                    this.rwNumber.xAxis.data= res.data.data.dateList;
                    this.rwNumber.series[0].data = res.data.data.getTimes;
                  }
                }
              });
            },
            //get请求切换统计图
            getChartClick(val){
                this.getChartIndex = val;
                this.rwNumber.series[0].type = this.getChartList[val].type;
                this.rwNumber.xAxis.boundaryGap = this.getChartList[val].boundaryGap;
            },
            //put请求切换数据
            putClick(val){
                this.putIndex = val;
              this.$http.post('monitor/putTimesList.do',{
                bucketName:'',
                times:this.putList[val].label
              }).then(res => {
                if(res.data.status == '1'){
                  if(!res.data.data.dateList){
                    this.rwPut.xAxis.data  = this.putList[val].day;
                    this.rwPut.series[0].data =res.data.data.putTimes;
                  }else{
                    this.rwPut.xAxis.data= res.data.data.dateList;
                    this.rwPut.series[0].data = res.data.data.putTimes;
                  }
                }
              });
            },
            //put请求切换统计图
            putChartClick(val){
                this.putChartIndex = val;
                this.rwPut.series[0].type = this.putChartList[val].type;
                this.rwPut.xAxis.boundaryGap = this.putChartList[val].boundaryGap;
            },
            //转换字节单位
            changeByte(val){
              let byte = [];
              val.forEach(item=>{
                byte.push((item / 1048576).toFixed(2))
              })
              return byte;
            },
            //转换base64格式
            checkImg(code){
              var parts = code.split(';base64,');
              var contentType = parts[0].split(':')[1];
              var raw = window.atob(parts[1]);
              var rawLength = raw.length;
              var uInt8Array = new Uint8Array(rawLength);
              for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
              }
              return new Blob([uInt8Array], {type: contentType});
            },
            //下载统计图
            dowloda(name){
              var img = new Image();
              img = this.$refs[name].getConnectedDataURL({
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                type:'png'
              });
              let a = document.createElement('a');
              document.body.appendChild(a);
              var blob =this.checkImg(img);
              a.style.display = 'none';
              let url = URL.createObjectURL(blob);
              a.href = url;
              //添加了download属性才会是下载文件，不然就是跳转
              a.download = 'echarts';
              a.click();
              document.body.removeChild(a);
            },
    }
}
</script>

<style lang="less" scoped>
    .modal-p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #333333;
  font-family: MicrosoftYaHei;
}
.modal_text {
  margin-top: 20px;
  font-size: 14px;
  color: #999999;
  p {
    line-height: 18px;
  }
}
.boxs {
  font-family: MicrosoftYaHei;
  width: 100%;
  height: 100%;
  .center_chart {
    margin-top: 19px;
    span {
      padding: 5px 16px;
      border: 1px solid #d9d9d9;
      display: inline-block;
      margin-right: -4px;
      cursor: pointer;
      border-radius: 4px 0px 0px 4px;
    }
    span:hover {
      color: #2a99f2;
      border: 1px solid #2a99f2;
      cursor: pointer;
    }
    .chart-text {
      width: 50%;
    }
  }
  .card-center {
    display: flex;
    margin-top: 20px;
    height: 80px;
    border-bottom: 1px solid #e9e9e9;
    div {
      width: 34%;
      display: inline-block;
      .p_text {
        color: #666666;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        margin-bottom: 5px;
      }
      .p_textf {
        color: #2b99f2;
        font-family: MicrosoftYaHei;
        font-size: 18px;
      }
    }
  }
  .card-bottom {
    margin-top: 14px;
    div {
      display: inline-block;
      font-size: 12px;
      color: #666666;
    }
    button {
      float: right;
      height: 28px;
    }
  }
}
    .echarts {
      width: 1160px;
      height: 235px;
    }
    .objectListT{
      width: 150px;
      font-family: PingFangSC;
      display: inline-block;
      li:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      li:last-child {
        border-top-right-radius: 4px;
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
        border: 1px solid #2a99f2;
        cursor: pointer;
      }
    }

 .objectList {
      width:165%;
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
      .chart{
      margin-top:10px;display:flex;height:30px;
    }
    .chart-rig{
      width:23%;text-align:right;height:30px;display: inherit;
    }

</style>

