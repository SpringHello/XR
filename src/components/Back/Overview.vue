<template>
  <div class="background">
    <div class="wrapper">
      <span>总览</span>
      <Alert type="warning" show-icon style="margin-bottom:0px"
             v-if="!(this.$store.state.personalAuth == 0 || this.$store.state.enterpriseAuth == 0)">
        您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/usercenter">立即认证</router-link>
      </Alert>
      <div class="content">
        <div>
          <span class="title">云主机(<span v-if="limitArray[0]">{{limitArray[0].used}}</span>)</span>
          <span style="font-size:12px;color: rgba(153,153,153,0.75);" v-if="limitArray[0]">云主机配额 {{limitArray[0].used}}/{{limitArray[0].max}}</span>
          <div class="status">
            <span class="normal">正常</span>
            <span class="abnormal">异常</span>
            <span class="arrears">欠费</span>
            <span class="shutdown">关机</span>
          </div>
          <div class="host">
            <div class="host-item" v-for="item in hostData" :key="item">
              <span class="head">{{item.area}} {{item.total}}</span>
              <div class="body" v-if="item.open+item.error+item.arrears+item.close+item.wait>0">
                <div class="host-icon">
                  <i class="open" @click="push('host','open')"><span>{{item.open+item.wait}}</span></i>
                </div>
                <div class="host-icon">
                  <i class="error" @click="push('host','error')"><span>{{item.error}}</span></i>
                </div>
                <div class="host-icon">
                  <i class="arrears" @click="push('host','arrears')"><span>{{item.arrears}}</span></i>
                </div>
                <div class="host-icon">
                  <i class="close" @click="push('host','close')"><span>{{item.close}}</span></i>
                </div>
              </div>
              <div class="body" v-if="item.open+item.error+item.arrears+item.close+item.wait==0">
                <div class="newHost">
                  <i class="bigHost" @click="create">
                    <span @click="create" style="cursor: pointer">点击创建云主机</span>
                  </i>
                  <router-link to="vps"
                               style="bottom: 10px;left: 43%;font-size: 12px;color: #2A99F2;cursor: pointer;position:absolute">
                    申请免费试用
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex;margin-top:15px;justify-content: space-between">
        <div class="content" style="width:580px">
          <div>
            <span class="title">弹性IP(<span v-if="limitArray[0]">{{limitArray[2].used}}</span>)</span>
            <span style="font-size:12px;color: rgba(153,153,153,0.75);" v-if="limitArray[0]">弹性IP配额 {{limitArray[2].used}}/{{limitArray[2].max}}</span>
            <div class="status">
              <span class="normal">已绑定</span>
              <span class="abnormal">异常</span>
              <span class="arrears">欠费</span>
              <span class="shutdown">未绑定</span>
            </div>

            <div class="host">
              <div class="host-item" style="width:25%;height:190px;border-right:none">
                <i class="ip-bind" @click="push('network')"><span>{{ip.use}}</span></i>
              </div>
              <div class="host-item" style="width:25%;height:190px;border-right:none">
                <i class="ip-error" @click="push('network')"><span>{{ip.error}}</span></i>
              </div>
              <div class="host-item" style="width:25%;height:190px;border-right:none">
                <i class="ip-arrears" @click="push('network')"><span>{{ip.accountOver}}</span></i>
              </div>
              <div class="host-item" style="width:25%;height:190px;border-right:none">
                <i class="ip-unbind" @click="push('network')"><span>{{ip.nouse}}</span></i>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap">
          <div>
            <span v-if="limitArray[0]">镜像配额 {{limitArray[5].used}}/{{limitArray[5].max}}</span>
            <i class="mirror" @click="push('mirror')"><span>镜像 <span v-if="limitArray[0]">{{limitArray[5].used}}</span></span></i>
          </div>
          <div>
            <span v-if="limitArray[0]">硬盘配额 {{limitArray[1].used}}/{{limitArray[1].max}}</span>
            <i class="disk" @click="push('disk')"><span>硬盘 <span
              v-if="limitArray[0]">{{limitArray[1].used}}</span></span></i>
          </div>
          <div style="margin-top: 20px;">
            <span v-if="limitArray[0]">备份配额 {{limitArray[4].used}}/{{limitArray[4].max}}</span>
            <i class="snapshot" @click="push('snapshot')"><span>备份 <span
              v-if="limitArray[0]">{{limitArray[4].used}}</span></span></i>
          </div>
          <div style="margin-top: 20px;">
            <span v-if="limitArray[0]">VPC配额 {{limitArray[6].used}}/{{limitArray[6].max}}</span>
            <i class="vpc" @click="push('network')"><span>VPC <span
              v-if="limitArray[0]">{{limitArray[6].used}}</span></span></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        hostData: [],
        limitArray: [],
        ip: {}
      }
    },
    created() {
      this.$http.get('information/listVmNum.do')
        .then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            Object.keys(response.data.result).forEach(key => {
              response.data.result[key].total = response.data.result[key].arrears + response.data.result[key].close + response.data.result[key].error + response.data.result[key].open + response.data.result[key].wait
              response.data.result[key].area = key
              this.hostData.push(response.data.result[key])
            })
          }
        })

      this.$http.get('user/showPublicIpUse.do')
        .then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.ip = response.data.result
          }
        })

      this.$http.get('user/userSourceManager.do')
        .then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.limitArray = response.data.result
          }
        })
    },
    methods: {
      create () {
        this.$store.commit('setSelect', 'new')
        this.$router.push({path: 'new'})
      },
      push (path, type) {
        sessionStorage.setItem('type', type)
        this.$store.commit('setSelect', path)
        this.$router.push(path)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .wrap {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 300px;
        align-items: stretch;
        & > div {
          width: 290px;
          height: 140px;
          background-color: white;
          position: relative;
          padding: 10px;
          & > span {
            font-size: 12px;
            color: rgba(153, 153, 153, 0.75);
          }
          i {
            width: 150px;
            height: 54px;
            display: block;
            position: absolute;
            top: 50%;
            left: 40%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            &.mirror {
              background: url('../../assets/img/mirror.png');
              background-repeat: no-repeat;
            }
            &.disk {
              background: url('../../assets/img/disk.png');
              background-repeat: no-repeat;
            }
            &.snapshot {
              background: url('../../assets/img/snapshot.png');
              background-repeat: no-repeat;
            }
            &.vpc {
              background: url('../../assets/img/vpc.png');
              background-repeat: no-repeat;
            }
            & > span {
              position: absolute;
              top: 19px;
              left: 60px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 16px;
              color: rgba(17, 17, 17, 0.65);
              font-style: normal;
            }
          }
        }
      }
      .content {
        padding: 20px;
        background-color: white;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .status {
          display: inline-block;
          float: right;
          span {
            margin-right: 22px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.65);
            &::before {
              content: '';
              width: 10px;
              height: 10px;
              display: inline-block;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          .normal::before {
            background-color: #17C786;
          }
          .abnormal::before {
            background-color: #F24747;;
          }
          .arrears::before {
            background-color: #cccccc;
          }
          .shutdown::before {
            background-color: #404040;
          }
          .dropdown-icon {
            border-top: 3px solid #989898;
            border-left: 3px solid #989898;
            width: 15px;
            height: 15px;
            box-sizing: content-box;
            display: inline-block;
            transform: rotate(45deg) translate(0px, 13px);
          }
        }
        .host {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .host-item {
            width: 49%;
            margin-top: 15px;
            position: relative;
            &:nth-child(odd) {
              border-right: 1px solid #dcd7d7
            }
            & > i {
              width: 51px;
              height: 51px;
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              background-position: center;
              transform: translate(-50%, -50%);
              background-size: 100%;
              cursor: pointer;
              span {
                position: absolute;
                left: 54px;
                top: 16px;
                font-family: Microsoft Yahei, 微软雅黑;
                font-size: 16px;
                color: rgba(17, 17, 17, 0.65);
                font-style: normal;
              }
            }
            .ip-bind {
              background: url('../../assets/img/ipBind.png');
            }
            .ip-error {
              background: url('../../assets/img/ipError.png');
            }
            .ip-arrears {
              background: url('../../assets/img/ipArrears.png');
            }
            .ip-unbind {
              background: url('../../assets/img/ipUnbind.png');
            }
          }
          .head {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 14px;
            color: rgba(17, 17, 17, 0.65);
          }
          .body {
            display: flex;
            margin-right: 25px;
            .host-icon {
              height: 150px;
              width: 25%;
              position: relative;
              & > i {
                width: 48px;
                height: 48px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                background-position: center;
                transform: translate(-50%, -50%);
                background-size: 100%;
                cursor: pointer;
                span {
                  position: absolute;
                  left: 49px;
                  top: 16px;
                  font-family: Microsoft Yahei, 微软雅黑;
                  font-size: 16px;
                  color: rgba(17, 17, 17, 0.65);
                  font-style: normal;
                }
                &.open {
                  background-image: url('../../assets/img/openHost.png')
                }
                &.error {
                  background-image: url('../../assets/img/errorHost.png')
                }
                &.arrears {
                  background-image: url('../../assets/img/arrearsHost.png')
                }
                &.close {
                  background-image: url('../../assets/img/closeHost.png')
                }
              }
            }
            .newHost {
              position: relative;
              height: 150px;
              width: 100%;
              .bigHost {
                cursor: pointer;

              }
              & > i {
                width: 137px;
                height: 85px;
                display: block;
                position: absolute;
                top: 34%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-size: contain !important;
                background: url('../../assets/img/bigHost.png') no-repeat center;
                span {
                  font-family: Microsoft Yahei, 微软雅黑;
                  font-size: 16px;
                  color: rgba(17, 17, 17, 0.75);
                  position: absolute;
                  left: 12px;
                  bottom: -25px;
                  font-style: normal;
                }
              }
            }
          }
          .foot {
            padding: 20px 25px 20px 0px;
            display: flex;
            justify-content: space-between;
            span {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 12px;
              color: rgba(17, 17, 17, 0.65);
            }
          }
        }
      }
    }
  }
</style>
