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
                <span v-for="item in CPU" v-if="currentCPUNum <= item.CPU" :class="{select:item.CPU==CPUNum}" :key="item.CPU"
                      @click="changeCPU(item)">{{item.CPU}}核</span>
            </div>
            <p class="content-title">内存</p>
            <div class="cpu">
                <span v-for="item in RAM"  v-if="currentRAMSize <= item.memory" :class="{select:item.memory==RAMSize}" :key="item.memory"
                      @click="changeCache(item)">{{item.memory}}G</span>
            </div>
          </div>
          <div class="conf-wrapper">
            <h1>升级前配置</h1>
            <span>主机名称 : {{hostname}}</span>
            <span>主机配置 : {{currentCPUNum}}核{{currentRAMSize}}G</span>
            <span>剩余时长 : {{endtime}}</span>
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
            <button @click="payOrder" :class="{ dis: cost==0}">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default {
    data() {
      var currentCPUNum = Number.parseInt(localStorage.serviceoffername.replace(/[^0-9]/ig, "")[0])
      var currentRAMSize = Number.parseInt(localStorage.serviceoffername.replace(/[^0-9]/ig, "")[2])
      var hostname = sessionStorage.getItem('hostname')
      var endtime = sessionStorage.getItem('endtime')
      sessionStorage.removeItem('hostname')
      sessionStorage.removeItem('endtime')
      return {
        currentCPUNum,
        currentRAMSize,
        hostname,
        endtime,
        CPUNum: currentCPUNum,
        RAMSize: currentRAMSize,
        minDisk: Number.parseInt(localStorage.disksize),
        diskSize: localStorage.disksize,
        virtualMachineid: localStorage.virtualMachineid,
        cost: 0,
        CPU: [],
        RAM: []
      }
    },
    beforeRouteEnter(from, to, next) {
      // 获取负载均衡的初始数据
      var zoneId = localStorage.getItem('zoneid')
      axios.get(`information/getZonesConfig.do`, {
        params: {
          zoneId: zoneId
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    created() {
    },
    methods: {
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.CPU = response.data.data
          this.CPU.forEach(item => {
            if (Number(item.CPU) === this.CPUNum) {
              this.RAM = item.list
            }
          })
        }
      },
      changeCPU(cpu) {
        this.CPUNum = cpu.CPU
        this.RAM = cpu.list
        this.RAMSize = cpu.list[0].memory
        this.calCost()
      },
      changeCache(ram) {
        this.RAMSize = ram.memory
        this.calCost()
      },
      calCost(){
        var url = 'information/UpVMConfigCost.do'
        this.$http.get(url,{
          params:{
            cpunum:this.CPUNum,
            memory:this.RAMSize,
            VMId:this.virtualMachineid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.result
          } else {
            this.$Message.error(response.data.result.message)
          }
        })
      },
      payOrder() {
        if (this.cost === 0) {
          return
        }
<<<<<<< HEAD
        var url = 'information/UpVMConfig.do'
        this.$http.get(url,{
            params:{
              cpunum:this.CPUNum,
              memory:this.RAMSize,
              VMId:this.virtualMachineid,
              disksize:this.diskSize
            }
=======
        var url = `information/UpVMConfig.do`
        this.$http.get(url, {
          params: {
            cpunum: this.CPUNum,
            memory: this.RAMSize,
            VMId: this.virtualMachineid,
            disksize: this.diskSize
          }
>>>>>>> 82e2407623b8cb73b0d249d62ec57c529ff2c783
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.error(response.data.message)
          }
        })
      }
    },
    watch: {
    }
  }
</script>


<style rel="stylesheet/less" lang="less" scoped>
  #background {
    @diff: 102px;
    min-height: calc(~"100% - @{diff}")
  }

  .upgrade {
    background-color: white;
    padding: 20px;
    .title {
      font-family: Microsoft YaHei-Bold;
      font-size: 24px;
      color: hsla(0, 0%, 7%, .75);
      font-weight: 700;
    }
    .body {
      display: flex;
      margin-top: 15px;
      justify-content: space-between;
      .content-title {
        font-size: 16px;
        font-weight: 700;
        color: rgba(17, 17, 17, 0.75);
        line-height: 18px
      }
      .cpu {
        margin-top: 13px;
        margin-bottom: 25px;
        span {
          width: 63px;
          padding: 7px 15px;
          background: #FFFFFF;
          border: 1px solid #D9D9D9;
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
          border: 1px solid #118FEA;
        }
        .disabled {
          cursor: not-allowed;
        }
      }
      .conf-wrapper {
        width: 274px;
        height: 245px;
        background: #FFFFFF;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
        border-radius: 4px;
        padding: 23px 19px;
        .money {
          font-size: 24px;
          color: #2A99F2;
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
          background: #2A99F2;
          border-radius: 4.46px;
          outline: none;
          border: 1px solid #2a99f2;
          cursor: pointer;
          font-size: 12px;
          color: #FFFFFF;
          &.dis{
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
