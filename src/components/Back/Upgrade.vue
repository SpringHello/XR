<template>

  <div id="background">
    <div id="wrapper">
        <span class="title">
          <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> /
          <router-link to="host" style="color:rgba(17, 17, 17, 0.43);">云主机</router-link> / <span>升级</span>
        </span>
      <div id="content" class="upgrade">
        <div style="padding-bottom: 20px;border-bottom: 1px solid #E9E9E9;">
          <span class="title">升级配置</span>
          <Button class="btnnormal" @click="$router.go(-1)" style="float:right">返回</Button>
        </div>
        <div class="body">
          <div style="width:50%">
            <p class="content-title">CPU</p>
            <div class="cpu">
                <span v-for="item in zoneInfo.kernelList"
                      :class="{select:item.value==CPUNum}"
                      @click="changeCPU(item.value)">{{item.value}}核</span>
            </div>
            <p class="content-title">内存</p>
            <div class="cpu" v-for="(item,index) in zoneInfo.kernelList" :key="index" v-if="item.value==CPUNum">
                <span v-for="ram in item.RAMList" :class="{select:ram.value==RAMSize}"
                      v-show="ram.value>=CPUNum" @click="changeCache(ram.value)">{{ram.value}}G</span>
            </div>
            <p class="content-title">系统盘</p>
            <span class="systemdisk-type">{{systemDiskType}}</span>
            <div>
              <div style="width:500px;display: flex;align-items:center">
                <i-slider
                  v-model="systemDiskSize"
                  unit="GB"
                  :min='rootdisksize'
                  :max=1000
                  :step=10
                  :points="[500,800]"
                  style="margin-right:30px;vertical-align: middle;">
                </i-slider>
                <InputNumber :max="1000" :min='rootdisksize' v-model="systemDiskSize" size="large" :step=10
                              :precision="0"></InputNumber>
              </div>
            </div>
          </div>
          <div class="conf-wrapper">
            <h1>升级前配置</h1>
            <span>主机名称 : {{hostname}}</span>
            <span>主机配置 : {{currentCPUNum}}核{{currentRAMSize}}G</span>
            <span>剩余时长 : {{endtime}}</span>
            <router-link to="home" style="bottom:23px;position: absolute">全民普惠，3折减单，最高减免7000元！</router-link>
          </div>
          <div class="conf-wrapper">
            <h1>升级后配置</h1>
            <span>主机名称 : {{hostname}}</span>
            <span>主机配置 : {{CPUNum}}核{{RAMSize}}G</span>
            <span>剩余时长 : {{endtime}}</span>
            <span style="line-height:24px;">应付差价 :
                 <i class="money">{{cost}}元</i>
              </span>
            <span style="margin-top:10px;">
                <a href="/ruicloud/#/computed/3-1" target="_blank">购买和计费说明</a>
              </span>
            <button @click="payOrder">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import uuid from 'uuid'
var info = [
  {
    zoneId: '39a6af0b-6624-4194-b9d5-0c552d903858',
    zoneName: '北京一区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 }
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '64核',
        value: 64,
        RAMList: [
          { label: '128G', value: 128 },
          { label: '256G', value: 256 },
        ]
      }
    ],
  },
  {
    zoneId: '1ce0d0b9-a964-432f-8078-a61100789e30',
    zoneName: '北方二区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 }
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '64核',
        value: 64,
        RAMList: [
          { label: '128G', value: 128 },
          { label: '256G', value: 256 },
        ]
      }
    ],
  },
  {
    zoneId: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d',
    zoneName: '北方一区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '12G', value: 12 },
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '12G', value: 12 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '24G', value: 24 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '24G', value: 24 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '32G', value: 32 }
        ]
      }
    ],
  },
  {
    zoneId: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c',
    zoneName: '华中一区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '12G', value: 12 },
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '12G', value: 12 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '24G', value: 24 },
          { label: '32G', value: 32 },
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '24G', value: 24 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '32G', value: 32 }
        ]
      }
    ],
  },
  {
    zoneId: 'ac7d0827-a47e-452b-a1fb-67f5a45d0ebc',
    zoneName: '华中二区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 }
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '32G', value: 32 }
        ]
      }
    ],
  },
  {
    zoneId: 'c6dcb310-3e37-4431-87f3-d8ada0cf3d91',
    zoneName: '华东一区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 }
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '64核',
        value: 64,
        RAMList: [
          { label: '128G', value: 128 },
          { label: '256G', value: 256 },
        ]
      }
    ],
  },
  {
    zoneId: 'a6a20cc2-f84c-409d-9c11-c88a04cce852',
    zoneName: '华南一区',
    kernelList: [
      {
        label: '1核',
        value: 1,
        RAMList: [
          { label: '1G', value: 1 },
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 }
        ]
      },
      {
        label: '2核',
        value: 2,
        RAMList: [
          { label: '2G', value: 2 },
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 }
        ]
      },
      {
        label: '4核',
        value: 4,
        RAMList: [
          { label: '4G', value: 4 },
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 }
        ]
      },
      {
        label: '8核',
        value: 8,
        RAMList: [
          { label: '8G', value: 8 },
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 }
        ]
      },
      {
        label: '16核',
        value: 16,
        RAMList: [
          { label: '16G', value: 16 },
          { label: '32G', value: 32 },
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '32核',
        value: 32,
        RAMList: [
          { label: '64G', value: 64 },
          { label: '128G', value: 128 }
        ]
      },
      {
        label: '64核',
        value: 64,
        RAMList: [
          { label: '128G', value: 128 },
          { label: '256G', value: 256 },
        ]
      }
    ],
  },
]
import $store from '@/vuex'
export default {
  data () {
    var confInfo = localStorage.getItem('serviceoffername').match(/\d+/g)
    var currentCPUNum = Number.parseInt(confInfo[0])
    var currentRAMSize = Number.parseInt(confInfo[2])
    var hostname = sessionStorage.getItem('hostname')
    var endtime = sessionStorage.getItem('endtime')
    var rootdiskid = sessionStorage.getItem('rootdiskid')
    var rootdisksize = parseInt(sessionStorage.getItem('rootdisksize'))
    // sessionStorage.removeItem('hostname')
    // sessionStorage.removeItem('endtime')
    var zoneInfo = null
    info.forEach(item => {
      if (item.zoneId == $store.state.zone.zoneid) {
        zoneInfo = item
      }
    })
    return {
      // diskSize: rootdisksize,
      systemDiskType: 'SSD存储',
      // systemDiskList: [40, 100, 500, 1000],
      rootdisksize,
      systemDiskSize: rootdisksize,
      currentCPUNum,
      currentRAMSize,
      hostname,
      endtime,
      CPUNum: currentCPUNum,
      RAMSize: currentRAMSize,
      virtualMachineid: localStorage.virtualMachineid,
      rootdiskid,
      systemDiskCost: 0,
      cpuMemoryCost: 0,
      CPU: [1, 2, 4, 8, 16, 32],
      RAM: [1, 2, 4, 8, 16, 32],
      zoneInfo
    }
  },
  created () {
  },
  methods: {
    changeCPU (cpu) {
      /*if (this.currentCPUNum > cpu) {
        this.$Message.info("无法选择更低的配置")
        return
      }*/
      this.zoneInfo.kernelList.forEach(item => {
        if (item.value == cpu) {
          this.RAMSize = this.currentRAMSize > item.RAMList[0].value ? this.currentRAMSize : item.RAMList[0].value
        }
      })
      this.CPUNum = cpu;
      this.calCost()
    },
    changeCache (ram) {
      /*if (ram < this.currentRAMSize) {
        this.$Message.info("无法选择更低的配置")
        return
      }*/
      this.RAMSize = ram
      this.calCost()
    },
    calCost () {
      this.$http.get('information/UpVMConfigCost.do', {
        params: {
          cpunum: this.CPUNum,
          memory: this.RAMSize,
          VMId: this.virtualMachineid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.cpuMemoryCost = response.data.result
        } else {
          this.$Message.error(response.data.result.message)
        }
      })
    },
    payOrder () {
      if (this.cost == 0) {
        return false
      }
      if (this.CPUNum + this.RAMSize != this.currentCPUNum + this.currentRAMSize && this.systemDiskSize == this.rootdisksize) {
        // console.log(1)
        this.$http.get('information/UpVMConfig.do', {
          params: {
            cpunum: this.CPUNum,
            memory: this.RAMSize,
            VMId: this.virtualMachineid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('订单提交成功')
            this.$router.replace("order")
          } else {
            this.$Message.error(response.data.message)
          }
        })
      } else if (this.CPUNum + this.RAMSize == this.currentCPUNum + this.currentRAMSize && this.systemDiskSize != this.rootdisksize){
        // console.log(2)
        this.$http.get('information/resizeRootVolume.do', {
          params: {
            computerId: this.virtualMachineid,
            roodDiskId: this.rootdiskid,
            rootDiskSize: this.systemDiskSize,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('订单提交成功')
            this.$router.replace("order")
          } else {
            this.$Message.error(response.data.message)
          }
        })
      } else if (this.CPUNum + this.RAMSize != this.currentCPUNum + this.currentRAMSize && this.systemDiskSize != this.rootdisksize) {
        // console.log(3)
        var countOrder = uuid.v4()
        var cpuMemoryRsp = this.$http.get('information/UpVMConfig.do', {
          params: {
            cpunum: this.CPUNum,
            memory: this.RAMSize,
            VMId: this.virtualMachineid,
            countOrder
          }
        })
        var systemDiskRsp = this.$http.get('information/resizeRootVolume.do', {
          params: {
            computerId: this.virtualMachineid,
            roodDiskId: this.rootdiskid,
            rootDiskSize: this.systemDiskSize,
            countOrder
          }
        })
        // var systemDiskRsp = this.$http.get('information/UpVMConfig.do', {
        //   params: {
        //     cpunum: 8,
        //     memory: 8,
        //     VMId: '6a1e3b7b-5714-441b-912b-8b50aebadc9c',
        //     countOrder
        //   }
        // })
        Promise.all([cpuMemoryRsp, systemDiskRsp]).then(res => {
          if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1) {
            this.$Message.success('订单提交成功')
            // this.$router.replace("order")
            this.$router.push({
              path: '/ruicloud/order', query: {
                countOrder
              }
            })
          }
        })
      }
    }
  },
  computed: {
    cost() {
      return this.systemDiskCost + this.cpuMemoryCost
    }
  },
  watch: {
    'systemDiskSize': {
      handler() {
        this.$http.get('information/resizeRootVolumeCost.do', {
          params: {
            computerId: this.virtualMachineid,
            roodDiskId: this.rootdiskid,
            rootDiskSize: this.systemDiskSize,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.systemDiskCost = response.data.result
          } else {
            this.$Message.error(response.data.result.message)
          }
        })
      }
    }
  }
}
</script>


<style rel="stylesheet/less" lang="less" scoped>
#background {
  @diff: 102px;
  min-height: calc(~"100% - @{diff}");
}

.upgrade {
  background-color: white;
  padding: 20px;
  .title {
    font-family: Microsoft YaHei-Bold;
    font-size: 24px;
    color: hsla(0, 0%, 7%, 0.75);
    font-weight: 700;
  }
  .body {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    .systemdisk-type {
      margin: 10px 0;
      display: inline-block;
      width: 108px;
      height: 35px;
      background: rgba(42, 153, 242, 1);
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 35px;
    }
    .content-title {
      font-size: 16px;
      font-weight: 700;
      color: rgba(17, 17, 17, 0.75);
      line-height: 18px;
    }
    .cpu {
      margin-top: 13px;
      margin-bottom: 25px;
      span {
        width: 63px;
        padding: 7px 0;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 14px;
        color: rgba(17, 17, 17, 0.65);
        margin-right: 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }
      .select {
        border: 1px solid #118fea;
      }
      .disabled {
        cursor: not-allowed;
      }
    }
    .conf-wrapper {
      width: 274px;
      height: 245px;
      background: #ffffff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 23px 19px;
      position: relative;
      .money {
        font-size: 24px;
        color: #2a99f2;
        font-style: normal;
        float: right;
      }
      .disabled {
        cursor: not-allowed;
        color: #bbbec4;
        background-color: #f7f7f7;
        border-color: #dddee1;
      }
      & > h1 {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 18px;
        color: rgba(17, 17, 17, 0.65);
        line-height: 18px;
        margin-bottom: 20px;
      }
      span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.65);
        line-height: 12px;
        margin-bottom: 10px;
        display: block;
      }
      button {
        margin-top: 10px;
        padding: 7px 0px;
        width: 100%;
        background: #2a99f2;
        border-radius: 4.46px;
        outline: none;
        border: 1px solid #2a99f2;
        cursor: pointer;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }
}
</style>
