<template>
  <div>
    <div class="background">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <div class="wrapper">
        <span style="background-color: #f5f5f5;"><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 一键续费</span>
        <div class="content">
          <span>一键续费</span>
          <div style="margin-top:15px;position:relative">
            <div class="operate">
              <div class="button" @click="selectAll"><span>全选</span></div>
              <div class="button" @click="renewalAll"><span>一键续费</span></div>
              <div style="width:218px;">
                <Select v-model="selectType" @on-change="search">
                  <Option v-for="item in allType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <Tabs type="card" :animated="false" v-model="tabLabel" @on-click="clear">
              <Tab-pane label="全部" name="全部">

                <div class="all">
                  <Alert style="border: solid 1px #2A99F2;border-radius: 4px;width:100%">
                    在余额充足的情况下，如开启自动续费，系统将在资源即将到期时为其续费。如关闭自动续费，系统将不做任何续费操作，且过期后资源进入欠费状态。
                  </Alert>
                  <div v-for="(item,index) in hostList" :key="index" v-bind:class="{select:item.select}"
                       @click="toggle(item)" style="margin-bottom: 20px">
                    <Card style="width:375px">
                      <div style="text-align:center">
                        <div class="head">
                          <div class="icon host" v-if="item.type=='host'"></div>
                          <div class="icon ip" v-if="item.type=='ip'"></div>
                          <div class="icon disk" v-if="item.type=='disk'"></div>
                          <div class="icon nat" v-if="item.type=='nat'"></div>
                          <div class="info">
                            <h1>{{item.resourcesName}}</h1>
                            <span>
                              过期时间：{{item.deadline}}
                            </span>
                            <span>
                              剩余时长：{{item.remainingDay}}天{{item.remainingHour}}时{{item.remainingMinute}}分
                            </span>
                          </div>
                        </div>
                        <div class="foot">
                          <div class="switch">
                            <i-switch v-model="item.isAuto" @on-change="toggleStatus(item)">
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                            </i-switch>
                            <span>自动续费</span></div>
                          <div class="renewal-button" @click.stop="renewalOne(item)">续费</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div class="logo" v-if="hostList.length==0">
                    <span>暂无需要续费资源</span>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="24小时之内" name="24小时之内">
                <div class="all">
                  <Alert style="border: solid 1px #2A99F2;border-radius: 4px;width:100%">
                    在余额充足的情况下，如开启自动续费，系统将在资源即将到期时为其续费。如关闭自动续费，系统将不做任何续费操作，且过期后资源进入欠费状态。
                  </Alert>
                  <div v-for="(item,index) in hostList" :key="index" v-bind:class="{select:item.select}"
                      v-if="item.remainingDay==0" @click="toggle(item)" style="margin-bottom: 20px">
                    <Card style="width:375px">
                      <div style="text-align:center">
                        <div class="head">
                          <div class="icon host" v-if="item.type=='host'"></div>
                          <div class="icon ip" v-if="item.type=='ip'"></div>
                          <div class="icon disk" v-if="item.type=='disk'"></div>
                          <div class="icon nat" v-if="item.type=='nat'"></div>
                          <div class="info">
                            <h1>{{item.resourcesName}}</h1>
                            <span>
                              过期时间：{{item.deadline}}
                            </span>
                            <span>
                              剩余时长：{{item.remainingDay}}天{{item.remainingHour}}时{{item.remainingMinute}}分
                            </span>
                          </div>
                        </div>
                        <div class="foot">
                          <div class="switch">
                            <i-switch v-model="item.isAuto" @on-change="toggleStatus(item)">
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                            </i-switch>
                            <span>自动续费</span></div>
                          <div class="renewal-button" @click.stop="renewalOne(item)">续费</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div class="logo" v-if="hostList.every(item=>{return item.remainingDay!=0})">
                    <span>暂无需要续费资源</span>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="7天内" name="7天内">
                <div class="all">
                  <Alert style="border: solid 1px #2A99F2;border-radius: 4px;width:100%">
                    在余额充足的情况下，如开启自动续费，系统将在资源即将到期时为其续费。如关闭自动续费，系统将不做任何续费操作，且过期后资源进入欠费状态。
                  </Alert>
                  <div v-for="(item,index) in hostList" :key="index" v-bind:class="{select:item.select}"
                       v-if="-1<item.remainingDay&&item.remainingDay<7" @click="toggle(item)"
                       style="margin-bottom: 20px">
                    <Card style="width:375px">
                      <div style="text-align:center">
                        <div class="head">
                          <div class="icon host" v-if="item.type=='host'"></div>
                          <div class="icon ip" v-if="item.type=='ip'"></div>
                          <div class="icon disk" v-if="item.type=='disk'"></div>
                          <div class="icon nat" v-if="item.type=='nat'"></div>
                          <div class="info">
                            <h1>{{item.resourcesName}}</h1>
                            <span>
                              过期时间：{{item.deadline}}
                            </span>
                            <span>
                              剩余时长：{{item.remainingDay}}天{{item.remainingHour}}时{{item.remainingMinute}}分
                            </span>
                          </div>
                        </div>
                        <div class="foot">
                          <div class="switch">
                            <i-switch v-model="item.isAuto" @on-change="toggleStatus(item)">
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                            </i-switch>
                            <span>自动续费</span></div>
                          <div class="renewal-button" @click.stop="renewalOne(item)">续费</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div class="logo" v-if="hostList.every(item=>{return item.remainingDay>=7||item.remainingDay<=-1})">
                    <span>暂无需要续费资源</span>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="已过期" name="已过期">
                <div class="all">
                  <Alert style="border: solid 1px #2A99F2;border-radius: 4px;width:100%">
                    在余额充足的情况下，如开启自动续费，系统将在资源即将到期时为其续费。如关闭自动续费，系统将不做任何续费操作，且过期后资源进入欠费状态。
                  </Alert>
                  <div v-for="(item,index) in hostList" :key="index" v-bind:class="{select:item.select}"
                       v-if="item.remainingDay<0" @click="toggle(item)" style="margin-bottom: 20px">
                    <Card style="width:375px">
                      <div style="text-align:center">
                        <div class="head">
                          <div class="icon host" v-if="item.type=='host'"></div>
                          <div class="icon ip" v-if="item.type=='ip'"></div>
                          <div class="icon disk" v-if="item.type=='disk'"></div>
                          <div class="icon nat" v-if="item.type=='nat'"></div>
                          <div class="info">
                            <h1>{{item.resourcesName}}</h1>
                            <span>
                              过期时间：{{item.deadline}}
                            </span>
                            <span>
                              剩余时长：{{item.remainingDay}}天{{item.remainingHour}}时{{item.remainingMinute}}分
                            </span>
                          </div>
                        </div>
                        <div class="foot">
                          <div class="switch">
                            <i-switch v-model="item.isAuto" @on-change="toggleStatus(item)">
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                            </i-switch>
                            <span>自动续费</span></div>
                          <div class="renewal-button" @click.stop="renewalOne(item)">续费</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div class="logo" v-if="hostList.every(item=>{return item.remainingDay>=0})">
                    <span>暂无需要续费资源</span>
                  </div>
                </div>
              </Tab-pane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal"
      width="550"
      @on-ok="ok" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费选择</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="付费类型 :">
            <Select v-model="renewalType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长 :">
            <Select v-model="renewalTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          应付费:<span style="color: #2b85e4; text-indent:4px;display:inline-block;font-size:24px;">￥{{cost}}
          <span v-if="renewalTime != ''">/</span>
          <span style="font-size: 15px;">{{renewalTime}}<span v-if="renewalType == 'year' && renewalTime != ''">年</span>
          <span v-if="renewalType == 'month' && renewalTime != ''">月</span></span>
        </span>
        </div>
      </div>
      <div slot="footer" style="" class="modal-footer-border">
        <Button class="button cancel" @click="modal=false">取消</Button>
        <Button class="button ok" @click="ok">确认续费</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        hostList: [],
        allType: [{value: '', label: '全部'}, {value: 'host', label: '云主机'}, {value: 'ip', label: '弹性IP'}, {
          value: 'disk',
          label: '硬盘'
        }, {value: 'nat', label: 'NAT网关'}],
        selectType: '',
        modal: false,

        renewalType: '',
        renewalTime: '',
        timeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}],
          renewalTime: [],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '3月', value: 3}, {
            label: '4月',
            value: 4
          }, {label: '5月', value: 5}, {label: '6月', value: 6}, {label: '7月', value: 7}, {
            label: '8月',
            value: 8
          }, {label: '9月', value: 9}, {label: '10月', value: 10}]
        },

        selectArray: [],

        requestParam: {
          ipArray: [],
          hostArray: []
        },

        cost: '--',

        tabLabel: '全部',
        loadingMessage: '',
        loading: false,
        renewal: false,
        renewalItem: null
      }
    },
    created(){
      this.search()
    },
    methods: {
      toggleStatus(item){
        var flag = item.isAuto ? 1 : 0
        var url = `information/setAutoRenew.do?type=${item.type}&id=${item.id}&flag=${flag}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
          } else {
            item.isAuto = !item.isAuto
          }
        })
      },
      search(){
        var url = 'information/listRenew.do'
        if (this.selectType) {
          url += `?type=${this.selectType}`
        }
        this.$http.get(url)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var mSecInDay = 1000 * 60 * 60 * 24
              var mSecInHour = 1000 * 60 * 60
              var mSecInMinute = 1000 * 60
              var nowTime = new Date().getTime()
              response.data.result.forEach((item) => {
                item.select = false
                item.isAuto = item.isAuto == 1
                item.remainingTime = item.deadline - nowTime
                item.remainingDay = Math.floor(item.remainingTime / mSecInDay)
                item.remainingHour = Math.floor((item.remainingTime % mSecInDay) / mSecInHour)
                item.remainingMinute = Math.floor((item.remainingTime % mSecInHour) / mSecInMinute)
                item.deadline = new Date(item.deadline).format('yyyy年MM月dd日 hh:mm:ss')
                item.createTime = new Date(item.createTime).format('yyyy年MM月dd日 hh:mm:ss')
              })
              this.hostList = response.data.result
            }
          })
      },
      renewalAll(){
        if (this.selectArray.length == 0) {
          this.$Message.warning('至少选择一个资源进行续费!')
          return
        }
        this.renewal = false
        this.renewalType = ''
        this.renewalTime = ''
        this.requestParam.ipArray = []
        this.requestParam.hostArray = []
        this.requestParam.diskArray = []
        this.selectArray.forEach((item) => {
          this.requestParam[`${item.type}Array`].push(item.id)
        })
        this.modal = true
      },
      selectAll(){
        this.selectArray = []
        var isselectAll = this.hostList.some((item) => {
            return item.select == true
          })
        if (this.tabLabel == '全部') {
          if (isselectAll) {
              this.hostList.forEach((item) => {
                item.select = false
                this.selectArray.push(item)
              })
          } else {
              this.hostList.forEach((item) => {
                item.select = true
                this.selectArray.push(item)
              })
          }
        } else if (this.tabLabel == '24小时之内') {
          if (isselectAll) {
            this.hostList.forEach((item) => {
              if (item.remainingDay == 0) {
                item.select = false
                this.selectArray.push(item)
              }
            })
          } else{
            this.hostList.forEach((item) => {
              if (item.remainingDay == 0) {
                item.select = true
                this.selectArray.push(item)
              }
            })
          }
        } else if (this.tabLabel == '7天内') {
          if (isselectAll) {
            this.hostList.forEach((item) => {
              if (item.remainingDay > -1 && item.remainingDay < 7) {
                item.select = false
                this.selectArray.push(item)
              }
            })
          } else {
            this.hostList.forEach((item) => {
              if (item.remainingDay > -1 && item.remainingDay < 7) {
                item.select = true
                this.selectArray.push(item)
              }
            })
          }
        } else if (this.tabLabel == '已过期') {
          if (isselectAll) {
            this.hostList.forEach((item) => {
              if (item.remainingDay < 0) {
                item.select = false
                this.selectArray.push(item)
              }
            })
          } else {
            this.hostList.forEach((item) => {
              if (item.remainingDay < 0) {
                item.select = true
                this.selectArray.push(item)
              }
            })
          }
        }
      },
      toggle(item){
        if (!item.select) {
          item.select = true
          this.selectArray.push(item)
          return
        }
        let index = this.selectArray.indexOf(item)
        this.selectArray.splice(index, 1)
        item.select = false
      },
      renewalOne(item){
        this.modal = true
        this.renewalType = ''
        this.renewalTime = ''
        this.requestParam.ipArray = []
        this.requestParam.hostArray = []
        this.requestParam.diskArray = []
        this.renewal = true
        this.renewalItem = item
        this.requestParam[`${item.type}Array`].push(item.id)
      },
      ok(){
        if (this.renewal) {
          var list = [{
            type: this.renewalItem.type == 'host' ? 0 : this.renewalItem.type == 'disk' ? 1 : this.renewalItem.type == 'nat' ? 4 : 2,
            id: this.renewalItem.id
          }]
        } else {
          list = this.selectArray.map((item) => {
            return {
              type: item.type == 'host' ? 0 : item.type == 'disk' ? 1 : this.renewalItem.type == 'nat' ? 4 : 2,
              id: item.id
            }
          })
        }
        var params = {
          timeType: this.renewalType,
          timeValue: this.renewalTime,
          list: JSON.stringify(list)
        }
        this.loadingMessage = '创建订单中'
        this.loading = true
        this.$http.post('continue/continueOrder.do', params).then(response => {
          this.loading = false
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      clear(){
        this.selectArray = []
        this.hostList.forEach(item => {
          item.select = false
        })
      }
    },
    watch: {
      renewalType(type){
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time){
        if (time == '') {
          this.cost = '--'
        } else {
          let url = `information/getYjPrice.do?timeValue=${this.renewalTime}&timeType=${this.renewalType}&ipIdArr=${this.requestParam.ipArray.toString()}&hostIdArr=${this.requestParam.hostArray.toString()}&diskArr=${this.requestParam.diskArray.toString()}`
          this.$http.get(url)
            .then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                this.cost = response.data.result
              }
            })
        }
      },
      '$store.state.zone': {
        handler: function () {
          this.search()
        },
        deep: true
      }
    },
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .ivu-modal-footer {
    .button {
      height: 35.7px;
      padding: 5.7px 17px;
      line-height: 24.7px;
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 16px;
      border-radius: 4.46px;
      cursor: pointer;
      user-select: none;
    }
    .ok {
      color: #FFFFFF;
      background: #2A99F2;
    }
    .cancel {
      //  margin-right: 5px;
      border: 1px solid #D9D9D9;
      color: #666666;
      &:hover {
        color: #377dff;
        border: 1px solid #377DFF;
      }
    }
  }

  .background {
    background-color: #f5f5f5;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .operate {
          position: absolute;
          right: 0px;
          top: -2px;
          width: 370px;
          display: flex;
          height: 31px;
          z-index: 2;
          .button {
            height: 31px;
            background: #2A99F2;
            border-radius: 4px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 28px;
            padding: 0px 15px;
            margin-right: 10px;
            margin-top: 1px;
            cursor: pointer;
            user-select: none;
            &:last-of-type {
              margin-left: 10px;
              margin-right: 0px;
            }
          }
        }
        .head {
          width: 346px;
          height: 113px;
          margin: 0px auto;
          border-bottom: 1px solid #E9E9E9;
          display: flex;
          .icon {
            width: 62px;
            height: 62px;
            margin: 6px;
            margin-top: 20px;
          }
          .host {
            background-image: url('../../assets/img/renew/resource-icon-host.png');
          }
          .ip {
            background-image: url('../../assets/img/renew/resource-icon-ip.png');
          }
          .disk {
            background-image: url('../../assets/img/renew/resource-icon-disk.png');
          }
          .nat{
            background-image: url('../../assets/img/renew/resource-icon-nat.png');
          }
          .info {
            width: 76%;
            margin: 15px 0px;
            padding-left: 15px;
            text-align: left;
            h1 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 18px;
              color: #595959;
              line-height: 18px;
              margin-bottom: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.65);
              line-height: 12px;
              display: block;
              padding-bottom: 10px;
            }
          }
        }
        .foot {
          display: flex;
          width: 95%;
          margin: 15px auto 10px;
          justify-content: space-between;
          .switch {
            span:nth-of-type(2) {
              line-height: 28px;
              font-size: 12px;
              color: #999999;
            }
          }
          .renewal-button {
            float: right;
            width: 54px;
            height: 28px;
            border: 1px solid #2A99F2;
            border-radius: 4.46px;
            line-height: 28px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: #2A99F2;
            cursor: pointer;
            user-select: none;
          }
        }
        .all {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          min-height: 630px;
          &:after {
            content: '';
            width: 373px;
          }
          .item {

          }
          .logo {
            width: 218px;
            height: 80px;
            background: url("../../assets/img/renew/Shape.png") no-repeat center;
            position: absolute;
            top: 207px;
            left: 50%;
            transform: translateX(-50%);
            & > span {
              position: absolute;
              top: 33px;
              left: 53px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #666666;
              letter-spacing: 0;
              user-select: none;
              cursor: default;
            }
          }
        }
        .hour {

        }
        .days {

        }
        .expired {

        }
        .rowLast {
          margin-right: 0px !important;
        }
        .select {
          .ivu-card {
            background: #FFFFFF;
            border: 1px solid #2A99F2;
            box-shadow: 0 2px 16px 0 rgba(93, 177, 245, 0.50);
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
