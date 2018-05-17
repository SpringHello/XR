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
export default {
  
}
</script>

<style lang="less" scoped>

</style>

