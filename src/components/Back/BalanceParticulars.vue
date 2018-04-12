<template>
  <div id="background">
    <div id="wrapper">
      <span>云网络 / 负载均衡</span>
      <!-- 负载均衡相关信息 -->
      <div class="balanceInfo">
        <div class="title">
          <span style="color:#2A99F2">{{ balanceName }}</span>
          <div style="float: right;">
            <button @click="$router.go(0)">刷新</button>
            <button style="margin-right: 10px" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="center">
          <ul style="padding: 0 20px 0 0">
            <li>ID: {{ balanceId }}</li>
            <li>区域：{{ balanceInfo.zonename }}</li>
          </ul>
          <ul>
            <li>IP地址：{{ ipAddress }}</li>
            <li>状态：正常</li>
          </ul>
          <ul style="border-right: none">
            <li>类型：{{ balanceType }}</li>
            <li>创建时间：{{ balanceInfo.createtime}}</li>
          </ul>
        </div>
        <div class="footer">
          <ul>
            <span>负载均衡规则</span>
            <li>算法：{{algorithm}}</li>
            <li v-if="balanceInfo.privateport">内网端口：{{ balanceInfo.privateport}}</li>
            <li v-if="balanceInfo.publicport">外网端口：{{ balanceInfo.publicport}}</li>
            <li v-if="balanceInfo.sourceport">源端口：{{balanceInfo.sourceport}}</li>
            <li v-if="balanceInfo.instanceport">实例端口：{{balanceInfo.instanceport}}</li>
            <li style="margin-left: 618px;color: #2A99F2;cursor: pointer" @click="bind(balanceInfo.balanceId)">添加主机</li>
          </ul>
          <Table :columns="hostColumns" :data="hostData"></Table>
        </div>
      </div>
    </div>
    <!-- 绑定虚拟机 -->
    <Modal v-model="showModal.bind" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定虚拟机</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="bindHostForm" multiple>
          <FormItem label="请选择虚拟机" prop="vm">
            <Select v-model="bindHostForm.vm" multiple>
              <Option v-for="item in bindHostForm.vmOptions" :value="item.computerid" :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindHost_ok">确认绑定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        balanceInfo: null,
        hostColumns: [
          {
            title: '主机ID',
            ellipsis: 'true',
            key: 'computerid'
          },
          {
            title: '主机名称',
            key: 'computername'
          },
          {
            title: '状态',
            render: (h, object) => {
              return h('span', {}, '正常')
            }
          },
          {
            title: 'IP地址',
            key: 'privateip'
          },
          {
            title: '操作',
            width: 100,
            render: (h, object) => {
              if (object.row._status == 1) {
                return h('div', [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {
                  style: {
                    verticalAlign: 'middle'
                  }
                }, '正在添加主机...')])
              }
              if (object.row._status == 2) {
                return h('div', [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {
                  style: {
                    verticalAlign: 'middle'
                  }
                }, '正在删除主机...')])
              }
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$message.confirm({
                      content: '确认从负载均衡中移除该主机？',
                      onOk: () => {
                        var url = ``
                        if (this.balanceInfo._internal) {
                          url = `loadbalance/removeFromInternalLoadBalancerRule.do?VMIds=${object.row.computerid}&lbId=${this.balanceInfo.lbid}`
                        } else {
                          url = `loadbalance/removeFromLoadBalancerRule.do?VMIds=${object.row.computerid}&roleId=${this.balanceInfo.loadbalanceroleid}`
                        }
                        this.hostData.forEach(item => {
                          if (item.computerid == object.row.computerid) {
                            this.$set(item, '_status', 2)
                          }
                        })
                        this.$http.get(url).then(response => {
                          if (response.status == 200 && response.data.status == 1) {
                            this.$Message.success({
                              content: response.data.message
                            })
                            this.listHostByBalance()
                          } else {
                            this.$message.info({
                              content: response.data.message
                            })
                          }
                        })
                      }
                    })
                  }
                }
              }, '移除该主机')
            }
          }
        ],
        hostData: [],
        showModal: {
          bind: false
        },
        bindHostForm: {
          vm: [],
          vmOptions: []
        }
      }
    },
    created(){
      if (sessionStorage.getItem('balanceInfo')) {
        this.balanceInfo = JSON.parse(sessionStorage.getItem('balanceInfo'))
      }
      this.listHostByBalance()
    },
    methods: {
      /*  列出该负载均衡下的主机*/
      listHostByBalance () {
        var loadbalanceType = this.balanceInfo._internal ? '' : '1'
        var roleId = this.balanceInfo.loadbalanceroleid || this.balanceInfo.lbid
        var url = `loadbalance/listVmByRoleId.do?roleId=${roleId}&loadbalanceType=${loadbalanceType}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.hostData = response.data.result
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 负载均衡绑定主机
      bind(loadbalanceId){
        var internalLoadbalance = this.balanceInfo._internal ? '1' : ''
        this.showModal.bind = true
        var url = `network/showLoadBalanceVM.do?netwrokId=${this.balanceInfo.networkid}&internalLoadbalance=${internalLoadbalance}&loadbalanceId=${loadbalanceId}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.bindHostForm.vmOptions = response.data.result
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /* 负载均衡确定绑定虚拟机 */
      bindHost_ok () {
        if (this.bindHostForm.vm.length != 0) {
          var url = ``
          if (this.balanceInfo._internal) {
            url = `loadbalance/assignToInternalLoadBalancerRule.do?VMIds=${this.bindHostForm.vm}&lbId=${this.balanceInfo.lbid}&_t=${new Date().toTimeString()}`
          } else {
            url = `loadbalance/assignToLoadBalancerRule.do?VMIds=${this.bindHostForm.vm}&roleId=${this.balanceInfo.loadbalanceroleid}&_t=${new Date().toTimeString()}`
          }
          this.showModal.bind = false
          this.hostData.push({
            computername: '添加中...',
            privateip: '添加中...',
            computerid: this.bindHostForm.vm,
            _status: 1
          })
          this.$http.get(url).then(response => {
            this.listHostByBalance()
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success({
                content: response.data.message
              })
            } else {
              this.hostData.pop()
              this.$message.info({
                content: response.data.message
              })
            }
          })
        } else {
          this.showModal.bind = false
        }
      }
    },
    computed: {
      /* 负载均衡详情显示转换内容 */
      balanceName () {
        return this.balanceInfo.lbname || this.balanceInfo.name
      },
      balanceId () {
        return this.balanceInfo.lbid || this.balanceInfo.loadbalanceroleid
      },
      ipAddress () {
        return this.balanceInfo.networkip || this.balanceInfo.belongpublicip
      },
      balanceType () {
        return this.balanceInfo._internal ? '内网负载均衡' : '公网负载均衡'
      },
      algorithm () {
        return this.balanceInfo.algorithm == 'leastconn' ? '最小连接数算法' : this.balanceInfo.algorithm == 'source' ? '源算法' : '轮询算法'
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.$router.push('/ruicloud/balance')
        },
        deep: true
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  // css3下拉显示小图标
  .clock-show.icon {
    margin-left: 10px;
    color: #2A99F2;
    position: relative;
    width: 13px;
    height: 13px;
    border: solid 1px currentColor;
    border-radius: 50%;
  }

  .balanceInfo {
    background-color: #FFFFFF;
    padding: 20px;
    .title {
      // display: inline;
      span {
        font-family: Microsoft YaHei;
        font-size: 16px;
        color: #2A99F2;
        letter-spacing: 0;
      }
      button {
        border: 1px solid #2A99F2;
        border-radius: 4px;
        font-family: Microsoft YaHei;
        font-size: 14px;
        color: #2A99F2;
        line-height: 18px;
        height: 29px;
        width: 58px;
        background: #FFFFFF;
        cursor: pointer;
        outline: none;
        float: right;
        &:hover {
          background: #2A99F2;
          color: #FFFFFF;
        }
      }
    }
    .center {
      display: flex;
      padding-bottom: 20px;
      ul {
        padding: 0 20px;
        border-right: 1px solid #D9D9D9;
        li {
          font-family: Microsoft YaHei;
          font-size: 14px;
          line-height: 28px;
          color: #5E5E5E;
          letter-spacing: 0;
        }
      }
    }
    .footer {
      margin-top: 20px;
      border: 1px solid #E9E9E9;
      border-radius: 4px;
      padding: 20px;
      ul {
        display: -webkit-box;
        font-size: 12px;
        margin-bottom: 20px;
        li {
          margin-left: 40px;
        }
      }
    }
  }
</style>
