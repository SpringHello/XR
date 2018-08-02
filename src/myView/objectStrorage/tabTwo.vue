<template>
  <div style="width: 100%;margin-top: 20px;min-width: 1600px;">
       <div class="center_chart">
                            <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;">
                                <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
                                <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
                            </div>
                            <div class="chart" >
                                <ul class="objectList">
                                    <li :class="indexs == item.label? 'objectItems':'objectItem'" v-for="item in dayList" :key="item.label" @click="dayClick(item.label)">{{item.value}}</li>
                                </ul>
                                <div class="chart-rig" >
                                    <!-- <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;">导出</Button> -->
                                    <ul class="objectList">
                                        <li :class="chartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartClick(index)">{{item.value}}</li>
                                    </ul>
                                </div>
                            </div>
                            <chart class="echarts" :options="rwPolar"></chart>
                        </div>
                         <div class="center_chart">
                            <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;margin-top:50px;">
                                <div style="width:50%;font-size:16px;color:#333333;">Get请求情况</div>
                                <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
                            </div>
                            <div class="chart" >
                                <div class="chart-text">
                                    <span >今天</span>
                                    <span >昨天</span>
                                    <span >最近7天</span>
                                    <span >最近30天</span>
                                </div>
                                <div class="chart-rig">
                                    <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;">导出</Button>
                                     <span style="">折线</span>
                                    <span >柱状图</span>
                                </div>
                            </div>
                            <chart class="echarts" :options="rwPolar"></chart>
                        </div>
                        <div class="center_chart">
                            <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;margin-top:50px;">
                                <div style="width:50%;font-size:16px;color:#333333;">Put请求情况</div>
                                <div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>
                            </div>
                            <div style="margin-top:10px;">
                                <div class="chart-text">
                                    <span >今天</span>
                                    <span >昨天</span>
                                    <span >最近7天</span>
                                    <span >最近30天</span>
                                </div>
                                <div style="float:right">
                                    <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;">导出</Button>
                                     <span style="">折线</span>
                                    <span >柱状图</span>
                                </div>
                            </div>
                            <chart class="echarts" :options="rwPolar"></chart>
                        </div>
  </div>
</template>

<script>
import diskOptions from "@/echarts/objectStroage";
const disk = JSON.stringify(diskOptions);
export default {
    data(){
        return{
            rwPolar: JSON.parse(disk),
              dayList:[
                    {
                    value:'今天',
                    data:[20,30,40,50,60],
                    day:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
                    label:0
                    },
                    {
                    value:'昨天',
                    data:[20,30,40,50,60],
                    day:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
                    label:1
                    },
                    {
                    value:'最近七天',
                    data:[20,30,40,50,60,22,100],
                    day:['02/18','02/18','02/18','02/18','02/18','02/18','02/18'],
                    label:2
                    },
                    {
                    value:'最近三十天',
                    data:[20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,100,33,28,90,55],
                    day:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15','04/16','04/17','04/18','04/19','04/20','04/21','04/22','04/23','04/24','04/25','04/26','04/27','04/28','04/29','04/30'],
                    label:3
                    }
              ],
                //下载流量切换统计图数据
            chartClick(val){
                this.chartIndex = val;
                this.rwPolar.series[0].type = this.chartList[val].type;
                this.rwPolar.xAxis.boundaryGap = this.chartList[val].boundaryGap;
            },
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
        }
    },
    methods:{
         //下载流量点击切换数据
            dayClick(val){
            console.log(val);
            this.indexs = val;
            this.rwPolar.xAxis.data = this.dayList[val].day;
            this.rwPolar.series[0].data = this.dayList[val].data;
            console.log(this.rwPolar);
            }
    },
    mounted(){
          this.rwPolar.xAxis.data = this.dayList[0].day;
         this.rwPolar.series[0].data = this.dayList[0].data;
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
      width:23%;text-align:right;height:30px;
    }
.echarts {
  width: 100%;
  height: 240px;
}
</style>

