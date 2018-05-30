<template>
  <div>
       <div class="center_chart">
                            <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;">
                                <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
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
                         <div class="center_chart">
                            <div style="display:flex;border-bottom:1px solid #E9E9E9;padding-bottom:5px;margin-top:50px;">
                                <div style="width:50%;font-size:16px;color:#333333;">Get请求情况</div>
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
            rwPolar: JSON.parse(disk) 
        }
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
.echarts {
  width: 100%;
  height: 240px;
}
</style>

