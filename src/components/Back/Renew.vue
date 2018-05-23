<template>
  <div>
    <div class="background">
      <div class="wrapper">
        <span style="background-color: #f5f5f5;">
          <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 一键续费</span>
        <div class="content">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yijianxufei"></use>
          </svg>
          <span style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">一键续费</span>
          <div style="margin-top:20px;position:relative">
            <!--<div class="operate">
              <div class="button" @click="selectAll"><span>全选</span></div>
              <div class="button" @click="renewalAll"><span>一键续费</span></div>
              <div style="width:218px;">
                <Select v-model="selectType" @on-change="search">
                  <Option v-for="item in allType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>-->
            <Tabs type="card" :animated="false" v-model="tabLabel" @on-click="clear">
              <Tab-pane label="全部" name="全部">
                <div style="margin-bottom: 20px;">
                  <Alert style="border:1px solid #2A99F2;border-radius: 4px;width:100%">
                    自2018/05/22日起，到2018/07/31。升级与续费本平台任意资源，即可享满减优惠，满20减6元，满300减120，最多可减7000元！
                  </Alert>
                  <Button type="primary">全选</Button>
                  <Button type="primary" @click="renewalAll">一键续费</Button>
                  <div style="float:right">
                    <span>关联选择</span>
                    <i-Switch v-model="linkRenew" @on-change="change"></i-Switch>
                  </div>
                </div>
                <div class="item-wrapper">
                  <p>云主机（{{hostList.length}}）<span :class="{opened:hostOpened}" @click="hostOpened=!hostOpened">{{hostOpened?'收起':'展开'}}</span>
                  </p>
                  <Table :columns="columns" :data="hostList" @on-selection-change="select"></Table>
                </div>
                <div class="item-wrapper">
                  <p>弹性IP（{{ipList.length}}）<span :class="{opened:ipOpened}" @click="ipOpened=!ipOpened">{{ipOpened?'收起':'展开'}}</span>
                  </p>
                  <Table :columns="columns" :data="ipList" @on-selection-change="select"></Table>
                </div>
                <div class="item-wrapper">
                  <p>云硬盘（{{diskList.length}}）<span :class="{opened:diskOpened}" @click="diskOpened=!diskOpened">{{diskOpened?'收起':'展开'}}</span>
                  </p>
                  <Table :columns="columns" :data="diskList" @on-selection-change="select"></Table>
                </div>
                <div class="item-wrapper">
                  <p>NAT网关（{{natList.length}}）<span :class="{opened:natOpened}" @click="natOpened=!natOpened">{{natOpened?'收起':'展开'}}</span>
                  </p>
                  <Table :columns="columns" :data="natList" @on-selection-change="select"></Table>
                </div>
              </Tab-pane>
              <!--<Tab-pane label="24小时之内" name="24小时之内">

              </Tab-pane>
              <Tab-pane label="7天内" name="7天内">

              </Tab-pane>
              <Tab-pane label="已过期" name="已过期">

              </Tab-pane>-->
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
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源名称',
            key: 'resourcesName'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '剩余时长',
            key: 'remainingDay'
          },
          {
            title: '过期时间',
            key: 'deadline'
          },
          {
            title: '操作',
            render: (h, obj) => {
              return h('div', {}, [
                h('span', {
                  style: {
                    marginRight: '10px'
                  }
                }, '续费'),
                h('span', '自动续费'),
                h('i-Switch', {
                  attrs: {
                    //size: 'small'
                    //vModel: obj.row.isAuto == 1
                  },
                  props: {
                    value: obj.row.isAuto
                  },
                  on: {
                    input: () => {
                      console.log(this)
                      console.log(arguments)
                    }
                  }
                })
              ])
            }
          }
        ],

        hostList: [],
        hostOpened: false,
        ipList: [],
        ipOpened: true,
        diskList: [],
        diskOpened: true,
        natList: [],
        natOpened: true,
        groupList: [],

        linkRenew: true,
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
          hostArray: [],
          diskArray: [],
          natArray: []
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
      select(select, notSelection){
        if (this.linkRenew) {
          for (let item of notSelection) {
            if (this.groupList.indexOf(item._groupId) > -1) {
              this.groupList.splice(this.groupList.indexOf(item._groupId), 1)
            }
          }
          for (let item of select) {
            if (this.groupList.indexOf(item._groupId) == -1) {
              this.groupList.push(item._groupId)
            }
          }
          ['host', 'ip', 'disk', 'nat'].forEach(i => {
            this[`${i}List`].forEach(item => {
              if (this.groupList.indexOf(item._groupId) > -1) {
                this.$set(item, '_checked', true)
              } else {
                this.$set(item, '_checked', false)
              }
            })
          })
        } else {
          ['host', 'ip', 'disk', 'nat'].forEach(i => {
            this[`${i}List`].forEach(item => {
              select.forEach(s => {
                if (item.type == s.type && item.id == s.id) {
                  this.$set(item, '_checked', true)
                } else {
                  this.$set(item, '_checked', false)
                }
              })
            })
          })
        }

      },
      // 改变关联续费模式
      change(status){
        if (status) {
          // 如果开启关联续费，必须要检查所有资源是否关联
          this.groupList = [];
          ['host', 'ip', 'disk', 'nat'].forEach(i => {
            this[`${i}List`].forEach(item => {
              console.log(item._checked, item._groupId)
              if (this.groupList.indexOf(item._groupId) == -1 && item._checked) {
                this.groupList.push(item._groupId)
              }
            })
          });
          console.log(this.groupList);
          ['host', 'ip', 'disk', 'nat'].forEach(i => {
            this[`${i}List`].forEach(item => {
              if (this.groupList.indexOf(item._groupId) > -1) {
                console.log('_checked')
                this.$set(item, '_checked', true)
              }
            })
          })
        }
      },
      toggleStatus(item){
        var flag = item.isAuto ? 1 : 0
        var url = 'information/setAutoRenew.do'
        this.$http.get(url, {
          params: {
            type: item.type,
            id: item.id,
            flag: flag
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
          } else {
            item.isAuto = !item.isAuto
          }
        })
      },
      search(){
        this.$http.get('information/listRenew.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            var mSecInDay = 1000 * 60 * 60 * 24
            var mSecInHour = 1000 * 60 * 60
            var mSecInMinute = 1000 * 60
            var nowTime = new Date().getTime()
            var groupId = 0
            response.data.result.forEach((item, index, arr) => {
              item.select = false
              item.isAuto = item.isAuto == 1
              item.remainingTime = item.deadline - nowTime
              item.remainingDay = Math.floor(item.remainingTime / mSecInDay)
              item.remainingHour = Math.floor((item.remainingTime % mSecInDay) / mSecInHour)
              item.remainingMinute = Math.floor((item.remainingTime % mSecInHour) / mSecInMinute)
              item.deadline = new Date(item.deadline).format('yyyy年MM月dd日 hh:mm:ss')
              item.createTime = new Date(item.createTime).format('yyyy年MM月dd日 hh:mm:ss')
              item._checked = false
              if (item._groupId === undefined) {
                item._groupId = groupId
                if (item.relation.length != 0) {
                  for (let it of item.relation) {
                    for (let i = index; i < arr.length; i++) {
                      if (arr[i].type == it.type && arr[i].id == it.value) {
                        arr[i]._groupId = groupId
                      }
                    }
                  }
                }
                groupId++
              }
              switch (item.type) {
                case 'host':
                  this.hostList.push(item)
                  break;
                case 'ip':
                  this.ipList.push(item)
                  break;
                case 'disk':
                  this.diskList.push(item)
                  break;
                case 'nat':
                  this.natList.push(item)
                  break;
              }
            })
          }
        })
      },
      renewalAll(){
        if (this.groupList.length == 0) {
          this.$Message.warning('至少选择一个资源进行续费!')
          return
        }
        this.renewal = false
        this.renewalType = ''
        this.renewalTime = '';
        ['host', 'ip', 'disk', 'nat'].forEach(i => {
          this.requestParam[`${i}Array`] = []
          this[`${i}List`].forEach(item => {
            if (item._checked) {
              this.requestParam[`${i}Array`].push(item.id)
            }
          })
        })
        this.modal = true
      },
      /*selectAll(){
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
       } else {
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
       },*/
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
        let list = [];
        ['host', 'ip', 'disk', 'nat'].forEach(i => {
          this[`${i}List`].forEach(item => {
            if (item._checked) {
              let type
              switch (item.type) {
                case 'host':
                  type = 0
                  break
                case 'ip':
                  type = 2
                  break
                case 'disk':
                  type = 1
                  break
                case 'nat':
                  type = 4
                  break
              }
              list.push({type: type, id: item.id})
            }
          })
        })
        var params = {
          timeType: this.renewalType,
          timeValue: this.renewalTime + '',
          list: JSON.stringify(list)
        }
        //this.loadingMessage = '创建订单中'
        //this.loading = true
        this.$http.post('continue/continueOrder.do', params).then(response => {
          //this.loading = false
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
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              ipIdArr: this.requestParam.ipArray.toString(),
              hostIdArr: this.requestParam.hostArray.toString(),
              diskArr: this.requestParam.diskArray.toString(),
              natArr: this.requestParam.natArray.toString()
            }
          })
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
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .item-wrapper {
          border-top: 1px solid rgba(216, 216, 216, 1);
          padding: 20px 0px;
          > p {
            font-size: 18px;
            line-height: 18px;
            margin-bottom: 10px;
            > span {
              float: right;
              color: #2A99F2;
              font-size: 12px;
              cursor: pointer;
              user-select: none;
              &.opened {
                &:before {
                  transform: translate(-5px, 3px) rotate(135deg);
                }
              }
              &:before {
                content: '';
                display: inline-block;
                width: 9px;
                height: 9px;
                border-bottom: 1px solid #2A99F2;
                border-left: 1px solid #2A99F2;
                transform: translate(-5px, -3px) rotate(-45deg);
              }
            }
          }
        }
      }
    }
  }
</style>
