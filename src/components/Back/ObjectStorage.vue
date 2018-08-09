<template>
  <div class="centerBox">
    <div class="objectBox">
      <span class="text">云存储/对象存储</span>
      <div class="center">
        <div class="center_top">
          <div style="width:50%">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yijianxufei"></use>
            </svg>
            <span class="title">对象存储</span>
          </div>
          <div style="width:50%;text-align:right;line-height:2;">
            <Button @click="$router.history.go(0)">刷新</Button>
          </div>
        </div>
        <div class="center_p">
          <p>对象存储是新睿云自主研发的大规模分布式对象存储服务，面向企业和个人开发者提供高可用、低成本、强安全的云端存储服务。</p>
        </div>
        <Tabs type="card" :value="name" :animated="false">
          <TabPane label="概览" name="name1">
            <p>当月用量 {{endTime}}-{{starTime}}</p>
            <div class="center_space">
              <div class="space_two">
                  <p>已用空间容量</p>
                  <div style="font-size:36px;color:#333333;margin-top:10px;">{{size}}</div>
              </div>
              <div class="space_one">
                <div style="display: inline-block;width: 97%;margin-left:10px;">
                  <p>已下载流量</p>
                  <div style="font-size:36px;color:#333333;margin-top:10px;">{{flow}}</div>
                </div>
              </div>
              <div class="space_one">
                <div style="display: inline-block;width: 97%;margin-left:10px;">
                  <p>http请求次数</p>
                  <div style="font-size:36px;color:#333333;margin-top:10px;">{{frequency}}次</div>
                </div>
              </div>
            </div>
            <div class="center_chart">
            <div style="display:flex;padding-bottom:5px;">
            <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
            <div style="width:50%;text-align:right;color:#666666;">{{starTime}}</div>
            </div>
            <div class="chart">
              <ul class="objectList">
                <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dayList" :key="index" @click="dayClick(index)">{{item.value}}</li>
              </ul>
              <div class="chart-rig">
              <Button type="primary" size="small" style="margin-top:-3px;padding:5px 15px;" @click="dowloda('rwPolar')">导出</Button>
                <ul class="objectListT">
                  <li :class="chartIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartClick(index)">{{item.value}}</li>
                </ul>
              </div>
            </div>
            <chart ref="rwPolar" class="echarts" :options="rwPolar" ></chart>
            </div>
            <div class="center_chart">
              <div style="display:flex;padding-bottom:5px;margin-top:50px;">
                <div style="width:50%;font-size:16px;color:#333333;">请求次数</div>
                <div style="width:50%;text-align:right;color:#666666;">{{starTime}}</div>
              </div>
              <div class="chart" >
                <ul class="objectList">
                  <li :class="requestIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in requestList" :key="index" @click="requestClick(index)">{{item.value}}</li>
                </ul>
                <div class="chart-rig">
                 <Button type="primary" size="small" style="margin-top:-3px;padding:5px 15px;" @click="dowloda('rwNumber')">导出</Button>
                  <ul class="objectListT">
                    <li :class="chartTwoIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartTwotList" :key="index" @click="chartTwoClick(index)">{{item.value}}</li>
                  </ul>
                </div>
              </div>
              <chart ref="rwNumber" class="echarts" :options="rwNumber"></chart>
            </div>
          </TabPane>
          <TabPane :label="bucketMange" name="name2" style="height:650px">
            <tabOne></tabOne>
          </TabPane>
          <TabPane label="用量监控" name="name3" >
            <tabTwo></tabTwo>
          </TabPane>
          <TabPane label="操作日志" name="name4" style="min-height: 300px;">
            <tabThree></tabThree>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
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
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
            label: '1'
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
            label: '2'
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: '3'
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label:'30'
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
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
            label: '1'
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
            label: '2'
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: '3'
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label: '30'
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
        //存储空间容量
        size: '',
        //概览统计流量
        flow:'',
        //概览统计http请求次数
        frequency:'',
        //统计时间开始
        starTime:'',
        //统计时间结束
        endTime:''
      }
    },
    components: {
      tabOne: deferLoad(tabOne, 100),
      tabTwo: deferLoad(tabTwo, 100),
      tabThree: deferLoad(tabThree, 100)
    },
    created(){
      this.dayClick(0);
      this.requestClick(0);
    },
    methods: {
      //下载流量点击切换数据
      dayClick(val){
        this.indexs = val;
        this.$http.post('monitor/getMonitorFlow.do',{
          bucketName:'',
          times: this.dayList[val].label
        }).then(res=>{
          if(!res.data.data.dateList){
            this.rwPolar.xAxis.data = this.dayList[val].day;
            this.rwPolar.series[0].data = this.changeByte(res.data.data.getFlow);
            // this.rwPolar.yAxis.axisLabel.formatter = this.changeByte2(res.data.data.getFlow);
            // this.rwPolar.max = this.maxs(res.data.data.getFlow);
          }else {
            this.rwPolar.xAxis.data = res.data.data.dateList;
            this.rwPolar.series[0].data = this.changeByte(res.data.data.getFlow);
            // this.rwPolar.yAxis.axisLabel.formatter = this.changeByte2(res.data.data.getFlow);
            // this.rwPolar.max = this.maxs(res.data.data.getFlow);
            // console.log(this.rwPolar);
          }
        })
      },
      //请求次数点击切换数据
      requestClick(val){
        this.requestIndex = val;
        this.$http.post('monitor/getMonitorAllTimes.do',{
          bucketName:'',
          times: this.requestList[val].label
        }).then(res=>{
          if(!res.data.data.dateList){
            this.rwNumber.xAxis.data = this.requestList[val].day;
            this.rwNumber.series[0].data = res.data.data.allTimes;
          }else {
            this.rwNumber.xAxis.data = res.data.data.dateList;
            this.rwNumber.series[0].data = res.data.data.allTimes;
          }
        })
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
      //转换字节单位
      changeByte(val){
        let byte = [];
        val.forEach(item=>{
          byte.push((item / 1048576).toFixed(2) )
        })
       return byte;
      },
      changeByte2(val){
        let byte = [];
        val.forEach(item=>{
          if(item / 1073741824 >16){
            byte.push("GB")
          }else if(item / 1073741824<1){
            byte.push("MB")
          }else {
            byte.push("Kb")
          }
        })
        return byte;
      },
      //表格最大值
      maxs(val){
       val.sort((num1,num2) =>{
         return num1 - num2 < 0
       })
      return val[0] / 1073741824 > 1 ? (val[0] / 1073741824 ).toFixed(0)+'GB' : val[0] / 1048576 > 1 ? ((val[0] / 1048576).toFixed(0))+'MB'  : ((val[0] / 1024).toFixed(0))+'KB';
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
      //获取存储空间容量
      getAllsize(){
        this.$http.post('object/getAllSize.do', {}).then(res => {
          if (res.data.status == '1') {
            this.size = res.data.data.allsize / 1048576>1 ? (res.data.data.allsize / 1048576).toFixed(2) +'GB': res.data.data.allsize > 1000 || res.data.data.allsize / 1024 > 1 ? (res.data.data.allsize / 1024).toFixed(2) + 'MB' : res.data.data.allsize.toFixed(2) + 'KB';
          } else {
            this.size = "0KB";
            this.$Message.info('平台出小差了');
          }
          localStorage.setItem('size', this.size);
        }).catch(error => {
          this.$Message.info('平台出小差了');
          this.size = "0KB"
        })
      },
      //概览统计情况
      getOverview(){
        this.$http.post('monitor/allMonitorTimes.do',{
          bucketName:''
        }).then(res =>{
          if(res.data.status =='1'){
            this.frequency = res.data.data.requesttimes;
             this.flow = res.data.data.flowsize / 1073741824 > 1   ? ((res.data.data.flowsize / 1073741824).toFixed(2) +'GB' ):  res.data.data.flowsize / 1048576 > 1 ? ((res.data.data.flowsize / 1048576).toFixed(2) + 'MB')   : ((res.data.data.flowsize /1024).toFixed(2) + 'KB')
          }else{
            this.frequency = '0';
            this.flow = '0KB';
            this.$Message.info('平台出小差了');
          }
        }).catch(error =>{
          this.frequency = '0';
          this.flow = '0KB';
        })
      },
      // //云储存服务开通提示框
      // buy(){
      //    let status = true;
      //   if(!!status)
      //   this.$Modal.confirm({
      //     title: '提示',
      //     content: '<p style="line-height: 16px">尊敬的用户您好，您尚未开通云存储服务，对象存储服务根据使用量后付费，收费项目包括：存储空间、源站流量等，详细信息请见<span>购买须知</span></p>',
      //     okText:'确认开通',
      //     onOk:()=>{
      //         this.$Message.success('开通成功');
      //
      //     }
      //   });
      // },
      showUserAcessAll(){
        axios.get('user/showUserAcessAll.do',{}).then(res => {
          if(res.status === 200 && res.data.status == '18')
              this.$Modal.confirm({
                  title:'提示',
                  content:'<p style="line-height: 16px">尊敬的用户您好，系统检测到您当前没有可用的Access Key，请您到<a href="https://bj.xrcloud.net/ruicloud/userCenter">Access Key管理</a>去创建Access Key。</p>',
                  onOk:()=>{
                   window.open('https://bj.xrcloud.net/ruicloud/userCenter','_self');
                   },
                  onCancel:()=>{
                    window.open('https://bj.xrcloud.net/ruicloud/userCenter','_self');
                  }
              })
        })
      },
      //获取时间
      getTime(){
        var date  = new Date();
        var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        m = m > 9  ? m : '0'+m;
        d = d > 9 ? d : '0'+d;
        this.starTime = y+'/'+m+'/'+d;
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
        this.endTime = y+'/'+m+'/'+d;
      }
    },
    mounted(){
      this.getAllsize();
      this.getOverview();
      // this.buy();
      this.getTime();
      this.showUserAcessAll();
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
          }
        }
        .center_p {
          margin-top: 9px;
          margin-bottom: 20px;
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
          .space_two{
            width: 317px;
            display: inline-block;
          }
          .space_one {
            width: 387px;
            display: flex;
            margin-left: 5px;
          }
          .space_one:before {
            content: "";
            width: 1px;
            height: 80px;
            display: inline-block;
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
    width: 43%;
    text-align: right;
    height: 30px;
  }

  .echarts {
    width: 100%;
    height: 240px;
  }
</style>
