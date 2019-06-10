<template>
  <div id="apply">
    <div class="head">
      <div class="head-box">申请成为ISV服务供应商</div>
    </div>
    <div class="flow">
      <div class="flow-box">
        <div class="flow-box-hint">
          <div class="step" v-for="(item,index) in step" :key="index">
            <div class="step-icon">
              <img :src="item.status == 0 ? item.unIcon : item.icon"/>
            </div>
            <div class="step-title">{{item.title}}</div>
            <div class="step-q">{{item.hint}}</div>
          </div>
        </div>
        <div class="flow-box-unwire">
          <div class="flow-box-wire"></div>
          <div class="flow-box-num">
            <span v-for="(item,index) in flow" :key="index" :class="{finish:item.status != 0}">{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="success">
      <div class="success-box">
        <div class="success-box-icon">
          <img src="../../../assets/img/market/fails.png" />
        </div>
        <div class="success-box-content">
          <div>提交失败</div>
          <div>信息提交失败，请稍后重试。</div>
        </div>
        <div class="fail-box">
          <Button type="primary" @click="$router.push('apply1')">上一步</Button>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info-box">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  data () {
    return {
      stepNum: 10,
      // 申请流程步骤
      step: [
        {title: '商务对接', hint: '贵方与新睿云的合作意向确认', unIcon: require('../../../assets/img/market/step-1-1.png'), status: 0},
        {title: '部署测试', hint: '为您分配测试主机，测试您需要上架的产品', unIcon: require('../../../assets/img/market/step-2-1.png'), icon: require('../../../assets/img/market/step-2-2.png'), status: 1},
        {title: '商品上架', hint: '测试验收通过之后5个工作日，商品上架', unIcon: require('../../../assets/img/market/step-3-1.png'), icon: require('../../../assets/img/market/step-3-2.png'), status: 0}
      ],
      flow: [
        {num: 1, status: 1},
        {num: 2, status: 2},
        {num: 3, status: 0},
      ],
      // 规格
      sysIndex: false,
      sys: ['1核1G 40G SSD系统盘', '2核4G 40G SSD系统盘', '自定义主机规格'],
      // 区域
      areaIndex: false,
      area: [],
      // 选择器
      vpcList: [],
      vpc: '',
      value: 10,
      info: {
        sys: '',
        area: '',
        network: '',
        size: 10
      }
    }
  },
  methods: {
    changeArea (item,index) {
      this.areaIndex = index
      axios.get('network/listVpcBuyComputer.do', {
        params: {
          zoneId: item.zoneid
        }
      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.vpcList = res.data.result
        }
        console.log(res)
      })
    }
  },
  mounted () {
    axios.get('information/zone.do', {}).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.area = res.data.result
        var zoneId = ''
        this.area.forEach(e => {
          if (e.isdefault == 1) {
            zoneId = e.zoneid
          }
        })
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId:zoneId
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.vpcList = res.data.result
          }
        })
      }
    })
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#apply{
  .head{
    width: 100%;
    background:rgba(255,255,255,1);
    .head-box{
      width: 1200px;
      height: 70px;
      line-height: 70px;
      margin: 0 auto;
      font-size: 22px;
      font-weight: 400;
    }
  }
  .flow{
    width: 100%;
    background: #f4f5f9;
    padding-bottom: 40px;
    box-sizing: border-box;
    .flow-box{
      width: 1200px;
      margin: 0 auto;
      background: #f4f5f9;
      position: relative;
      padding-top: 60px;
      box-sizing: border-box;
      .flow-box-hint{
        display: flex;
        justify-content: space-between;
        padding: 0 130px;
        box-sizing: border-box;
        .step{
          width: 128px;
          text-align: center;
          .step-icon{
            img{
              width: 48px;
              height: 48px;
            }
          }
          .step-title{
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 5px;
          }
          .step-q{
            font-size: 14px;
            font-weight: 400;
            color: rgba(153,153,153,1);
          }
        }
      }
      .flow-box-unwire{
        width: 1200px;
        height: 1px;
        border-bottom: 1px dashed rgba(178,178,178,1);
        margin-top: 37px;
        position: relative;
        margin-bottom: 73px;
        .flow-box-wire{
          width: 600px;
          height: 1px;
          border-top: 1px solid rgba(56,125,255,1);
          position: absolute;
          top: 0;
        }
        .flow-box-num{
          position: absolute;
          top: -14px;
          width: 1200px;
          display: flex;
          justify-content: space-between;
          padding: 0 180px;
          box-sizing: border-box;
          span{
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            display: inline-block;
            border-radius: 50%;
            background: rgba(153,153,153,1);
            font-size: 14px;
            color: rgba(255,255,255,1);
          }
          .finish{
            background: rgba(56,125,255,1);
          }
        }
      }
    }
  }
  .success{
    width: 100%;
    background: rgba(255,255,255,1);
    .success-box{
      width: 1200px;
      margin: 0 auto;
      padding-top: 100px;
      box-sizing: border-box;
      .success-box-icon{
        width: 100%;
        text-align: center;
        padding-bottom: 40px;
      }
      .success-box-content{
        div{
          width: 717px;
          margin: 0 auto;
          text-align: center;
          &:first-of-type{
            font-size: 24px;
            font-weight: 400;
          }
          &:nth-of-type(2){
            font-size: 14px;
            color: rgba(51,51,51,1);
            padding: 10px 0;
          }
        }
      }
      .fail-box{
        text-align: center;;
        padding-top: 50px;
        box-sizing: border-box;
      }
    }
  }
  .info{
    width: 100%;
    background: rgba(255,255,255,1);
    .info-box{
      width: 1200px;
      margin: 0 auto;
      padding-top: 100px;
      box-sizing: border-box;
      .info-box-title{
        font-size: 24px;
        color: rgba(51,51,51,1);
        display: flex;
        line-height: 31px;
        span{
          width: 6px;
          height: 32px;
          display: block;
          background: rgba(56,125,255,1);
          margin-right: 10px;
        }
      }
      .info-box-from{
        width: 1200px;
        padding-top: 50px;
      }
      .ino-box-deploy{
        width: 1200px;
        padding: 50px 174px 100px 200px;
        .ino-box-deploy-item{
          display: flex;
          margin-bottom: 20px;
          &:nth-of-type(2){
            margin-bottom: 0;
            .content{
              span{
                margin-bottom: 20px;
              }
            }
          }
          .title{
            width: 60px;
            font-size: 14px;
            color: rgba(102,102,102,1);
            margin-right: 20px;
            line-height: 35px;
          }
          .content{
            width: 760px;
            span{
              display: inline-block;
              padding: 5px 25px;
              border: 1px solid rgba(217,217,217,1);
              color: rgba(102,102,102,1);;
              font-size: 14px;
              line-height: 25px;
              height: 35px;
              margin-right: 15px;
              cursor: pointer;
            }
            .sysActive{
              background: rgba(56,125,255,1);
              color: white;
              border: 1px solid rgba(56,125,255,1);
            }
            .areaActive{
              background: rgba(56,125,255,1);
              color: white;
              border: 1px solid rgba(56,125,255,1);
            }
            .slier{
              width: 436px;
              height: 28px;
              border: 1px solid gray;
              position: relative;
              .slier-btn{
                position: absolute;
                top: -7px;
                left: -7px;
                width: 14px;
                height: 40px;
                background: #1EBAFC;
                cursor: pointer;
              }
            }
          }
        }
        .sub{
          margin-top: 40px;
          padding-left: 80px;
          box-sizing: border-box;
          button{
            margin-right: 20px;
          }
        }
      }
      .info-box-rate{
        width: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        .info-box-rate-info{
          display: flex;
          justify-content: space-between;
          padding: 0 166px;
          font-size: 14px;
          color: rgba(102,102,102,1);
        }
        .info-box-rate-step{
          width: 100%;
          margin-top: 44px;
          position: relative;
          .dot{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 100px;
            position: absolute;
            z-index: 10;
            span{
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: rgba(56,125,255,1);
            }
          }
          .wire{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 109px;
            position: absolute;
            top: 3px;
            span{
              display: block;
              width: 320px;
              height: 2px;
              background: rgba(230,230,230,1);
            }
          }
        }
        .info-box-rete-stepword{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 24px 40px 50px 40px;
          box-sizing: border-box;
          text-align: center;
          .item{
            p{
              font-size: 14px;
              color: rgba(153,153,153,1);
              &:first-of-type{
                font-size: 16px;
                color: rgba(51,51,51,1);
                margin-bottom: 20px;
              }
              &:nth-of-type(2){
                margin-bottom: 5px;
              }
            }
          }
        }
        .back{
          width: 100%;
          text-align: center;
          padding-bottom: 100px;
          button{
            width: 147px;
            height: 49px;
            background: rgba(255,255,255,1);
            border: 1px solid rgba(56,125,255,1);
            color: rgba(56,125,255,1);
            outline: none;
            cursor: pointer;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
