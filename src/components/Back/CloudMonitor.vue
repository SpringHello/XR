<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">首页
        <!-- / <span>云主机快照</span> -->
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-ECSkuaizhao"></use>
          </svg>
          <span id="title">云监控</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p> 云监控描述</p>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px" @on-click="labelSwitching">
          <TabPane label="监控概览" name="overview">
            <div class="host-monitor">
              <p>云服务器监控</p>
              <ul>
                <li v-for="(item,index) in monitorData" :key="index">
                  <p>{{item.text}}</p>
                  <p><span>{{item.num}}</span>台</p>
                </li>
              </ul>
            </div>
            <!-- <div>
              <chart :options="messageData" style="width: 400px;height:295px;margin-top: 20px; border: solid 1px #D8D8D8;padding: 20px;box-sizing: border-box"></chart>
            </div> -->
            <section>
              <div class="disk">
                 <div class="header">
                  磁盘链接速率
                  <span>
                    <i>编辑</i> | <i>删除</i>
                  </span>
                </div>
                <div class="switch">
                  <RadioGroup v-model="disk.type" type="button" @on-change="timeSwitch('disk')">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary">导出</Button>
                    <RadioGroup v-model="disk.showType" type="button" @on-change="chartTypeSwitch('disk')">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="showChart" style="width: 714px;height:172px;margin-top: 20px;"></chart>
              </div>
              <chart :options="messageData" style="border: solid 1px #D8D8D8;padding: 20px;padding-right:0;box-sizing: border-box;width: 366px;height:295px;"></chart>
            </section>
          </TabPane>
          <TabPane label="自定义监控" name="customMonitoring">
            <div class="cm-content">
              <div class="cm-item" v-for="(item,index) in customMonitoringData">
                <div class="cm-item-title">
                  <p>我关注的指标<span @click="deleteAttention(index)">&nbsp删除</span><span>编辑 |</span></p>
                </div>
              </div>
              <div class="cm-item">
                <div class="cm-item-title">
                  <p>我关注的指标</p>
                </div>
                <div class="cm-item-content" @click="addCustomMonitoring">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="告警策略" name="alarmStrategy">
            3
          </TabPane>
          <TabPane label="告警列表" name="alarmList">
            4
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 添加自定义指标弹窗 -->
    <Modal v-model="showModal.addMonitorIndex" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加监控指标</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-top">
          <div class="left">
            <p>产品类型</p>
            <Select v-model="monitoringIndexForm.product" placeholder="请选择" @on-change="changeProduct" style="width: 240px;" class="cm-select">
              <Option v-for="item in monitoringIndexForm.productGroup" :key="item.value" :value="item.value">
                {{item.value}}
              </Option>
            </Select>
          </div>
          <div class="right">
            <p>指标</p>
            <Select v-model="monitoringIndexForm.productIndex" placeholder="请选择" @on-change="getIndexResource" style="width: 240px;" class="cm-select">
              <Option v-for="item in monitoringIndexForm.productIndexGroup" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </div>
        </div>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有磁盘</p>
            <ul>
              <li>
                <span></span>
                <span></span>
                <i class="bluetext" style="cursor: pointer">+ 添加</i></li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择磁盘</p>
            <ul>
              <li><span></span>
                <i class="bluetext" style="cursor: pointer">
                  <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                  删除</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.addMonitorIndex = false">取消</Button>
        <Button type="primary">完成配置</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import messageMonitor from '@/echarts/cloudMonitor/messagePie'
import line from '@/echarts/cloudMonitor/line'
import bar from '@/echarts/cloudMonitor/bar'
export default {
  data () {
    return {
      messageData: messageMonitor,
      line,
      bar,
      showChart: line,
      monitorData: [
        {
          text: '云主机Ping不可达',
          num: '0'
        },
        {
          text: '未处理告警',
          num: '0'
        },
        {
          text: '已关机云主机',
          num: '0'
        }
      ],
      disk: {
        showType: 'line',
        timeType: 'day'
      },
      monitorData: [
        {
          text: '云主机Ping不可达',
          num: '0'
        },
        {
          text: '未处理告警',
          num: '0'
        },
        {
          text: '已关机云主机',
          num: '0'
        }
      ],
      customMonitoringData: [],
      showModal: {
        addMonitorIndex: false
      },
      monitoringIndexForm: {
        productGroup: [
          {
            value: '云主机',
            indexGroup: [
              {
                label: 'CPU使用率',
                value: 'cpu'
              }, {
                label: '磁盘使用率',
                value: 'disk'
              }, {
                label: '内存使用率',
                value: 'memory'
              }, {
                label: '网进',
                value: 'networkin'
              }, {
                label: '网出',
                value: 'networkout'
              }
            ]
          }, {
            value: '对象存储',
            indexGroup: [
              {
                label: '容量',
                value: 'capacity'
              }, {
                label: '流量',
                value: 'flow'
              }, {
                label: 'get请求次数',
                value: 'gethttp'
              }, {
                label: 'post请求次数',
                value: 'posthttp'
              }, {
                label: 'put请求次数',
                value: 'puthttp'
              }, {
                label: 'delete请求次数',
                value: 'deletehttp'
              }
            ]
          },
        ],
        product: '',
        productIndexGroup: [],
        productIndex: ''
      }
    }
  },
  created () {
    //  短信剩余配额数据模拟
    var mockMessageData = [
      { value: 130, name: '剩余配额' },
      { value: 80, name: '自定义监控告警' },
      { value: 120, name: '基础告警' },
      { value: 30, name: '财务与信息系统' }
    ]
    mockMessageData.forEach(item => {
      if (item.name == "剩余配额") {
        item.selected = true
      }
      item.name += '(' + item.value + ')'
    })
    var mockMessagelegend = mockMessageData.map(item => {
      return item.name
    })
    this.messageData.series[0].data = mockMessageData
    this.messageData.legend.data = mockMessagelegend
  },
  methods: {
    // 区域变更，刷新数据
    refresh () {
    },
    labelSwitching (name) {
      console.log(name)
    },
    chartTypeSwitch (type) {
      this[type].showType == 'line' ? this.showChart = this.line : this.showChart = this.bar
      // if (type == 'cpu' || type == 'memory') {
      //   var polar = this[type].showType == '折线' ? JSON.parse(defaultOptionstr) : JSON.parse(histogramstr)
      //   polar.xAxis.data = this[type + 'Polar'].xAxis.data
      //   polar.series[0].data = this[type + 'Polar'].series[0].data
      //   this[type + 'Polar'] = polar
      // } else if (type == 'flow') {
      //   polar = this[type].showType == '折线' ? ipOptions : ipHistogram
      //   polar.xAxis.data = this.ipPolar.xAxis.data
      //   polar.series[0].data = this.ipPolar.series[0].data
      //   polar.series[1].data = this.ipPolar.series[1].data
      //   // console.log(polar)
      //   this.ipPolar = polar
      // } else {
      //   var polar = this[type].showType == '折线' ? JSON.parse(hostDiskOptionstr) : JSON.parse(hostDiskHistogram)
      //   polar.xAxis.data = this[type + 'Polar'].xAxis.data
      //   polar.series[0].data = this[type + 'Polar'].series[0].data
      //   this[type + 'Polar'] = polar
      // }

    },
    labelSwitching(name) {
      console.log(name)
    },
    // 删除关注
    deleteAttention(index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除当前关注的指标吗？</p>',
        onOk: () => {
          this.$Message.info('确定');
        },
        onCancel: () => {
          this.$Message.info('取消');
        }
      });
    },
    addCustomMonitoring() {
      this.showModal.addMonitorIndex = true
    },
    changeProduct(val) {
      this.monitoringIndexForm.productIndex = ''
      this.monitoringIndexForm.productGroup.forEach(item => {
        if (item.value == val) {
          this.monitoringIndexForm.productIndexGroup = item.indexGroup
        }
      })
    },
    // 获取指标资源
    getIndexResource() {
      let url = 'monitor/listZoneVMAndDiskAndVpcAndObject.do'
      this.$http.get(url, {
        params: {
          productType: this.monitoringIndexForm.product,
          index: this.monitoringIndexForm.productIndex
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {

        }
      })
    }
  },
  computed: {
    auth () {
      return this.$store.state.authInfo != null
    }
  },
  watch: {
    '$store.state.zone': {
      handler: function () {
        this.refresh()
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.host-monitor {
  font-family: MicrosoftYaHei;
  padding: 20px 0;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(216, 216, 216, 1);
  color: #666666;
  > p {
    font-size: 14px;
    padding-left: 20px;
  }
  ul {
    display: flex;
    li {
      flex: auto;
      border-right: solid 1px #d8d8d8;
      padding-left: 20px;
      &:last-of-type {
        border-right: none;
      }
      p {
        font-size: 12px;
        padding-top: 12px;
        span {
          font-size: 18px;
          padding-right: 10px;
        }
      }
    }
  }
}
section {
  margin-top: 20px;
  &:first-of-type {
    display: flex;
    justify-content: space-between;
  }
}
.disk {
  width: 774px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(216, 216, 216, 1);
  .header {
    font-size: 14px;
    color: #111111;
    span {
      float: right;
      color: #2a99f2;
      i {
        font-style: normal;
        cursor: pointer;
      }
    }
  }
  .switch {
    display: flex;
    justify-content: space-between;
  }
}

  .cm-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cm-item {
      margin-top: 20px;
      padding: 20px;
      float: left;
      width: 49%;
      height: 295px;
      border: 1px solid rgba(216, 216, 216, 1);
      .cm-item-title {
        > p {
          height: 20%;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          line-height: 19px;
          span {
            color: #2A99F2;
            cursor: pointer;
            float: right;
          }
        }
      }
      .cm-item-content {
        height: 80%;
        padding-top: 12%;
        cursor: pointer;
        text-align: center;
        .cross {
          background: rgba(42, 153, 242, 1);
          height: 40px;
          position: relative;
          width: 1px;
          margin: 0 auto;
          &:after {
            background: #2a99f2;
            content: "";
            height: 1px;
            left: -20px;
            position: absolute;
            top: 20px;
            width: 40px;
          }
        }
        > p {
          margin-top: 20px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 16px;
        }
      }
    }
  }

  .modal-top {
    display: flex;
    margin-bottom: 20px;
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(17, 17, 17, 0.65);
      line-height: 16px;
      margin-bottom: 10px;
    }
    .left {
      width: 50%;
    }
    .right {
      padding-left: 14px;
      width: 50%;
    }
  }

  .modal-main {
    height: 146px;
    display: flex;
    border: 1px solid #D8D8D8;
    border-radius: 4px;
    div {
      height: 146px;
      padding: 0 10px 10px;
      overflow: scroll;
      width: 250px;
      overflow-x: hidden;
      p {
        line-height: 36px;
      }
      li {
        font-size: 12px;
        line-height: 28px;
        &:nth-child(odd) {
          background: #F7F7F7;
        }
        > i {
          float: right;
          font-size: 10px;
          font-style: normal;
        }

      }
    }
  }
</style>
