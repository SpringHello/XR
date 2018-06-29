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
            <Button @click="$router.history.go(0)">刷新</Button>
          </div>
        </div>
        <div class="center_p">
          <p>虚拟私有云，通过逻辑方式进行网络隔离，提供安全、隔离的网络环境。VPC为您提供与传统网络无差别的虚拟网络，同时还可以为您提供弹性IP、安全组、VPN等高级网络服务。</p>
        </div>
        <Tabs type="card" :value="name" :animated="false">
          <TabPane label="概览" name="name1">
            <!--<p>当月用量 2018/04/28-2018</p>-->
            <div class="center_space">
              <div class="space_one">
                <p>存储空间容量</p>
                <div style="font-size:36px;color:#333333;margin-top:10px;">{{size}}</div>
              </div>
              <div class="space_one">
                <p>流量</p>
                <div style="font-size:36px;color:#333333;margin-top:10px;">0KB</div>
              </div>
              <div class="space_one">
                <p>http请求次数</p>
                <div style="font-size:36px;color:#333333;margin-top:10px;">0次</div>
              </div>
            </div>
            <div class="center_chart">
            <div style="display:flex;padding-bottom:5px;">
            <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
            <!--<div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>-->
            </div>
            <div class="chart">
            <ul class="objectList">
            <li :class="indexs == item.label? 'objectItems':'objectItem'" v-for="item in dayList" :key="item.label" @click="dayClick(item.label)">{{item.value}}</li>
            </ul>
            <div class="chart-rig">
            <!--<Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda">导出</Button>-->
            <ul class="objectList">
            <li :class="chartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartClick(index)">{{item.value}}</li>
            </ul>
            </div>
            </div>
            <chart class="echarts" :options="rwPolar" ></chart>
            </div>
            <div class="center_chart">
            <div style="display:flex;padding-bottom:5px;margin-top:50px;">
            <div style="width:50%;font-size:16px;color:#333333;">请求次数</div>
            <!--<div style="width:50%;text-align:right;color:#666666;">2017.11.25</div>-->
            </div>
            <div class="chart" >
            <ul class="objectList">
            <li :class="requestIndex == item.label? 'objectItems':'objectItem'" v-for="item in requestList" :key="item.label" @click="requestClick(item.label)">{{item.value}}</li>
            </ul>
            <div class="chart-rig">
            <!-- <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;">导出</Button> -->
            <ul class="objectList">
            <li :class="chartTwoIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartTwotList" :key="index" @click="chartTwoClick(index)">{{item.value}}</li>
            </ul>
            </div>
            </div>
            <chart class="echarts" :options="rwNumber"></chart>
            </div>
          </TabPane>
          <TabPane :label="bucketMange" name="name2" style="height:650px">
            <tabOne></tabOne>
          </TabPane>
          <!--<TabPane label="用量监控" name="name3" style="height:650px">-->
            <!--<div style="text-align: center;">暂无数据</div>-->
            <!--&lt;!&ndash;<tabTwo></tabTwo>&ndash;&gt;-->
          <!--</TabPane>-->
          <TabPane label="操作日志" name="name4" style="min-height: 300px;">
            <tabThree></tabThree>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal v-model="screte" title="提示" :scrollable='true' width="390px" @on-ok="$router.push({path:'SpaceDetails'})"
    >
      <p>尊敬的用户您好，系统检测到您当前没有可用的Access Key，请您到<span style="color:#2A99F2;">Access Key管理</span>去创建Access Key。</p>
    </Modal>
  </div>
</template>

<script>
  import diskOptions from "@/echarts/objectStroage";
  import objectNumbers from "@/echarts/numberRequests"
  import tabOne from "../../myView/objectStrorage/tabOne";
  import tabTwo from "../../myView/objectStrorage/tabTwo";
  import tabThree from "../../myView/objectStrorage/tabThree";
  const disk = JSON.stringify(diskOptions);
  const numbers = JSON.stringify(objectNumbers);
  //延迟加载子组件
  function deferLoad(component, time = 0) {
    return resolve => {
      window.setTimeout(() => resolve(component), time);
    };
  }
  export default {
    data() {
      return {
        name: '',
        bucketMange: h => {
          return h('div', [
            h('span', {
              on: {
                click: () => {

                }
              }
            }, '空间管理')
          ])
        },
        //下载流量统计图
        rwPolar: JSON.parse(disk),
        //请求次数统计图
        rwNumber: JSON.parse(numbers),
        //下载流量统计图数据
        dayList: [
          {
            value: '今天',
            data: [0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            label: 0
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            label: 1
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: 2
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label: 3
          }
        ],
        //下载流量选择时间
        indexs: 0,
        requestIndex: 0,
        //请求次数统计图数据
        requestList: [
          {
            value: '今天',
            data: [0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            label: 0
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            label: 1
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: 2
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label: 3
          }
        ],
        //下载流量切换统计图
        chartList: [
          {
            value: '折线',
            type: 'line',
            boundaryGap: false
          },
          {
            value: '柱状图',
            type: 'bar',
            boundaryGap: true
          }
        ],
        //下载流量切换统计图
        chartIndex: 0,
        //请求次数切换统计图
        chartTwotList: [
          {
            value: '折线',
            type: 'line',
            boundaryGap: false
          },
          {
            value: '柱状图',
            type: 'bar',
            boundaryGap: true
          }
        ],
        chartTwoIndex: 0,
        //检测access
        screte: false,
        //存储空间容量
        size: ''
      }
    },
    components: {
      tabOne: deferLoad(tabOne, 100),
      tabTwo: deferLoad(tabTwo, 100),
      tabThree: deferLoad(tabThree, 100)
    },
    methods: {
      //下载流量点击切换数据
      dayClick(val){
        console.log(val);
        this.indexs = val;
        this.rwPolar.xAxis.data = this.dayList[val].day;
        this.rwPolar.series[0].data = this.dayList[val].data;
        console.log(this.rwPolar);
      },
      //请求次数点击切换数据
      requestClick(val){
        this.requestIndex = val;
        this.rwNumber.xAxis.data = this.requestList[val].day;
        this.rwNumber.series[0].data = this.requestList[val].data;
      },
      //下载统计图
      dowloda(){
        var img = new Image();
        img.src = disk.getDataURL({
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        })
      },
      //下载流量切换统计图
      chartClick(val){
        this.chartIndex = val;
        this.rwPolar.series[0].type = this.chartList[val].type;
        this.rwPolar.xAxis.boundaryGap = this.chartList[val].boundaryGap;
      },
      //请求次数切换统计图
      chartTwoClick(val){
        this.chartTwoIndex = val;
        this.rwNumber.series[0].type = this.chartTwotList[val].type;
        this.rwNumber.xAxis.boundaryGap = this.chartTwotList[val].boundaryGap;
      },
      //检测access
      // showUserAcessAll(){
      //   axios.get('user/showUserAcessAll.do',{
      //   }).then(res => {
      //     if(res.data.status == '1'){
      //     }else {
      //       this.screte = true;
      //     }
      //   })
      // },
      //获取存储空间容量
      getAllsize(){
        this.$http.post('object/getAllSize.do', {}).then(res => {
          if (res.data.status == '1') {
            this.size = res.data.data.data > 1000 || res.data.data.data / 1024 > 1 ? (res.data.data.data / 1024).toFixed(2) + 'MB' : res.data.data.data + 'KB';
          } else {
            this.size = "0KB";
            this.$Message.inof('平台出小差了');
          }
          localStorage.setItem('size', this.size);
        }).catch(error => {
          this.$Message.info('平台出小差了');
          this.size = "0KB"
        })
      }
    },
    mounted(){
      this.rwPolar.xAxis.data = this.dayList[0].day;
      this.rwPolar.series[0].data = this.dayList[0].data;
      this.rwNumber.xAxis.data = this.requestList[0].day;
      this.rwNumber.series[0].data = this.requestList[0].data;
      // this.showUserAcessAll();
      this.getAllsize();
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  p {
    line-height: 20px;
  }

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
      }
    }
  }

  .objectList {
    width: 165%;
    font-family: PingFangSC;
    display: flex;
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

  .chart {
    margin-top: 10px;
    display: flex;
    height: 30px;
  }

  .chart-rig {
    width: 23%;
    text-align: right;
    height: 30px;
  }

  .echarts {
    width: 100%;
    height: 240px;
  }
</style>
