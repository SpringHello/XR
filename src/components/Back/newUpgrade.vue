<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机 / </span>
        <span>升级</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid rgba(233,233,233,1);">
          <span id="title">升级配置</span>
          <button id="refresh_button" @click="$router.go(-1)" style="margin-top: 10px;">返回</button>
        </div>
        <div class="host-config">
          <div class="config-top">
            <p>主机名称：{{ hostInfo.computerName}}</p>
            <p>{{ hostInfo.cpuNum }}核CPU，{{ hostInfo.memory}}G内存，{{ hostInfo.rootDiskSize}}G硬盘，{{ hostInfo.bandwith}}M带宽 | {{ hostInfo.zoneName}}</p>
          </div>
          <div class="config-bottom">
            <p>系统盘类型: <span> {{ hostInfo.rootDiskType}}</span></p>
            <p>系统盘大小: <span> {{ hostInfo.rootDiskSize}}GB</span></p>
            <p>到期时间: <span> {{ hostInfo.endTime}}</span></p>
          </div>
        </div>
        <div class="config-selected">
          <h4>可升级配置</h4>
          <div class="config-group">
            <p>CPU</p>
            <div>
              <ul v-for="(item,index) in CPUList" :key="index" :class="{selected: endCPU== item.CPU}" v-if="item.CPU >=hostInfo.cpuNum"
                  @click="changeCPU(item)">{{ item.CPU }}核
              </ul>
            </div>
            <p>内存</p>
            <div>
              <ul v-for="(item,index) in memoryList" :key="index" :class="{selected: endMemory==item.memory}" v-if="item.memory >=hostInfo.memory"
                  @click="endMemory = item.memory">{{ item.memory }}GB
              </ul>
            </div>
            <p>系统盘</p>
            <div style="width:500px;align-items:center">
              <i-slider
                v-model="systemDiskSize"
                unit="GB"
                :min='rootDiskSize'
                :max=1000
                :step=10
                :points="[500,800]"
                style="margin-right:30px;vertical-align: middle;">
              </i-slider>
              <InputNumber :max="1000" :min='rootDiskSize' v-model="systemDiskSize" size="large" :step=10
                           :precision="0"></InputNumber>
            </div>
          </div>
        </div>
        <div class="end-config">
          <h4>升级后配置</h4>
          <div class="end-info">
            <p>主机CPU: <span> {{endCPU}}核</span></p>
            <p>主机内存: <span> {{endMemory}}G</span></p>
            <p>系统盘容量: <span> {{ systemDiskSize}}GB</span></p>
            <div class="price">
              <a href="/support_docs/kiRWuMFJd_kmeqtVSId.html" target="_blank">购买和计费说明</a>
              <p>应付差价：<span>{{ price }}</span>元</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <Button style="margin-right: 10px" type="ghost" @click="$router.push('host')">取消升级</Button>
          <Button type="primary" :disabled="price == 0" @click="payOrder">立即购买</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import uuid from 'uuid'

  export default {
    data() {
      return {
        hostInfo: {},
        computerId: '',
        endCPU: '',
        CPUList: [],
        endMemory: '',
        memoryList: [],
        systemDiskSize: 0,
        rootDiskSize: 0,
        cpuMemoryCost: 0,
        rootDiskCost: 0
      }
    },
    created() {
      this.computerId = sessionStorage.getItem('upgradeId')
      this.getHostInfo()
    },
    methods: {
      getHostInfo() {
        let url = 'information/listVMByComputerId.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.hostInfo = res.data.result
            this.endCPU = this.hostInfo.cpuNum
            this.endMemory = this.hostInfo.memory
            this.rootDiskSize = this.hostInfo.rootDiskSize
            this.systemDiskSize = this.hostInfo.rootDiskSize
            this.getZoneConfig()
          }
        })
      },
      getZoneConfig() {
        let url = 'information/getZonesConfig.do'
        this.$http.get(url, {
          params: {}
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.CPUList = res.data.data
            this.CPUList.forEach(item => {
              if (this.endCPU == item.CPU) {
                this.memoryList = item.list
                this.memoryList.forEach((mem, index) => {
                  if (mem.memory < this.hostInfo.memory) {
                    this.memoryList.splice(index, 1)
                  }
                })
              }
            })
          }
        })
      },
      changeCPU(item) {
        this.endCPU = item.CPU
        this.memoryList = item.list
        this.memoryList.forEach((mem, index) => {
          if (mem.memory < this.hostInfo.memory) {
            this.memoryList.splice(index, 1)
          }
        })
        this.endMemory = this.memoryList[0].memory
        this.getCfgCost()
      },
      getCfgCost() {
        this.$http.get('information/UpVMConfigCost.do', {
          params: {
            cpunum: this.endCPU,
            memory: this.endMemory,
            VMId: this.computerId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cpuMemoryCost = response.data.result
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      payOrder() {
        if (this.cpuMemoryCost != 0 && this.rootDiskCost == 0) {
          this.$http.get('information/UpVMConfig.do', {
            params: {
              cpunum: this.endCPU,
              memory: this.endMemory,
              VMId: this.computerId
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success('订单提交成功')
              this.$router.push('order')
            } else {
              this.$Message.info(response.data.message)
            }
          })
        } else if (this.cpuMemoryCost == 0 && this.rootDiskCost != 0) {
          this.$http.get('information/resizeRootVolume.do', {
            params: {
              computerId: this.computerId,
              roodDiskId: this.hostInfo.rootDiskId,
              rootDiskSize: this.systemDiskSize
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success('订单提交成功')
              this.$router.push('order')
            } else {
              this.$Message.info(response.data.message)
            }
          })
        } else if (this.cpuMemoryCost != 0 && this.rootDiskCost != 0) {
          let countOrder = uuid.v4()
          let cpuMemoryRsp = this.$http.get('information/UpVMConfig.do', {
            params: {
              cpunum: this.endCPU,
              memory: this.endMemory,
              VMId: this.computerId,
              countOrder
            }
          })
          var systemDiskRsp = this.$http.get('information/resizeRootVolume.do', {
            params: {
              computerId: this.computerId,
              roodDiskId: this.hostInfo.rootDiskId,
              rootDiskSize: this.systemDiskSize,
              countOrder
            }
          })

          Promise.all([cpuMemoryRsp, systemDiskRsp]).then(res => {
            if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1) {
              this.$Message.success('订单提交成功')
              this.$router.push({
                path: '/order', query: {
                  countOrder
                }
              })
            }
          })
        }
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      price() {
        return (this.cpuMemoryCost + this.rootDiskCost).toFixed(2)
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      },
      endMemory() {
        this.getCfgCost()
      },
      systemDiskSize() {
        this.$http.get('information/resizeRootVolumeCost.do', {
          params: {
            computerId: this.computerId,
            roodDiskId: this.hostInfo.rootDiskId,
            rootDiskSize: this.systemDiskSize,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.rootDiskCost = response.data.result
          } else {
            this.$Message.info(response.data.message)
          }
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host-config {
    padding: 20px;
    margin-top: 18px;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    .config-top {
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
    }
    .config-bottom {
      padding-top: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        > span {
          color: #333333;
        }
      }
    }
  }

  h4 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .config-selected {
    padding: 20px 0 10px 0;
    .config-group {
      border-radius: 2px;
      border: 1px solid rgba(233, 233, 233, 1);
      padding: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
      }
      > div {
        display: flex;
        margin: 10px 0 20px;
        > ul {
          width: 59px;
          height: 35px;
          background: rgba(255, 255, 255, 1);
          border-radius: 0px 2px 2px 0px;
          border: 1px solid rgba(229, 233, 237, 1);
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          cursor: pointer;
          text-align: center;
          line-height: 34px;
          &.selected {
            background: rgba(237, 247, 255, 1);
            border-radius: 2px 0px 0px 2px;
            border: 1px solid rgba(42, 153, 242, 1);
            color: #2A99F2;
          }
        }
      }
    }
  }

  .end-config {
    padding: 20px 0 10px 0;
    .end-info {
      padding: 20px;
      border-radius: 2px;
      border: 1px solid rgba(233, 233, 233, 1);
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        > span {
          color: #FF624B;
        }
      }
      .price {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(233, 233, 233, 1);
        > a {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          cursor: pointer;
        }
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(0, 0, 0, 0.65);
          float: right;
          > span {
            font-size: 24px;
            color: #FF624B;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
