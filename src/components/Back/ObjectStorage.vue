<template>
    <div class="centerBox">
        <div class="objectBox">
             <span class="text">云存储/云硬盘</span>
             <div class="center">
                 <div class="center_top">
                     <div style="width:50%"> 
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yijianxufei"></use>
                        </svg>
                         <span class="title">对象存储</span>
                     </div>
                    <div style="width:50%;text-align:right;line-height:4;">
                        <Button>刷新</Button>
                    </div>
                 </div>
                 <div class="center_p">
                      <p>虚拟私有云，通过逻辑方式进行网络隔离，提供安全、隔离的网络环境。VPC为您提供与传统网络无差别的虚拟网络，同时还可以为您提供弹性IP、安全组、VPN等高级网络服务。</p>
                 </div>
                  <Tabs type="card">
                    <TabPane label="概览">
                        <p>当月用量 2018/04/28-2018</p>
                        <div class="center_space">
                            <div class="space_one">
                                <p>存储空间容量</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">20KB</div>
                            </div>
                            <div class="space_one">
                                <p>流量</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">20KB</div>
                            </div>
                            <div class="space_one">
                                <p>http请求次数</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">3次</div>
                            </div>
                        </div>
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
                                <div style="width:50%;font-size:16px;color:#333333;">请求次数</div>
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
                    </TabPane>
                    <TabPane label="空间管理" >
                        <tabOne></tabOne>
                    </TabPane>
                    <TabPane label="用量监控">
                        <tabTwo></tabTwo>
                        </TabPane>
                     <TabPane label="操作日志">
                         <tabThree></tabThree>
                     </TabPane>
                </Tabs>
             </div>
        </div>
    </div>
</template>

<script>
import diskOptions from "@/echarts/objectStroage";
import tabOne from "../../myView/objectStrorage/tabOne"
import tabTwo from "../../myView/objectStrorage/tabTwo"
import tabThree from "../../myView/objectStrorage/tabThree"
const disk = JSON.stringify(diskOptions);
    
function deferLoad (component, time = 0) {
    return (resolve) => {
        window.setTimeout(() => resolve(component), time)
    };
}
export default {
  data() {
    return {
      rwPolar: JSON.parse(disk)
    };
  },
  components:{
      tabOne:deferLoad(tabOne,100),
      tabTwo:deferLoad(tabTwo,100),
      tabThree:deferLoad(tabThree,100)
  }
};
</script>

<style lang="less" scoped>
.centerBox {
  background-color: #f5f5f5;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: MicrosoftYaHei;
  .objectBox {
    width: 1200px;
    margin: 0 auto;
    .text {
      padding: 10px 0;
      display: block;
      font-size: 12px;
      color: rgba(17, 17, 17, 0.43);
    }
    .center {
      width: inherit;
      background-color: #ffffff;
      min-height: 1625px;
      padding: 20px;
      .center_top {
        display: flex;
        height: 48px;
        .title {
          line-height: 40px;
          display: inline-block;
          margin-left: 5px;
          vertical-align: top;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
      }
      .center_p {
        margin-top: 20px;
        margin-bottom: 27px;
        width: 1160px;
        height: 32px;
        background-color: rgba(42, 153, 242, 0.1);
        border: 1px solid #2a99f2;
        border-radius: 4px;
        padding: 7px 10px;
        font-size: 14px;
      }
      .center_space {
        width: 1160px;
        padding: 6px 0;
        border-bottom: 1px solid #d9d9d9;
        height: 90px;
        margin-top: 10px;
        display: flex;
        p {
          color: #666666;
          font-size: 16px;
        }
        .space_one {
          width: 40%;
          display: inline-block;
        }
        .space_one:after {
          content: "";
          width: 2px;
          height: 80px;
          position: relative;
          display: inline-block;
          top: -82px;
          right: 20px;
          background-color: #dfdfdf;
        }
      }
      .center_chart {
        margin-top: 19px;
         span {
            padding: 5px 16px;
            border: 1px solid #D9D9D9;
            display: inline-block;
            margin-right: -4px;
            cursor: pointer;
            border-radius: 4px  0px  0px  4px;
          }
          span:hover{
              color: #2A99F2;
              border:1px solid #2A99F2;
                cursor: pointer;
          }
        .chart-text {
          width: 273px;
          display: inline-block;
        }
      }
    }
  }
}
.echarts {
  width: 100%;
  height: 240px;
}
</style>
