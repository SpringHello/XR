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
        <div class="flow-box-tooltip">
          尊敬的（联系人名称），您的公司信息已填写完成，我们的商务人员将在24小时内与您取得联系，在此之前您可以选择您需要的测试主机规格，当新睿云的商务人员与您确认之后，将为您分配您所选择的主机
        </div>
      </div>
    </div>
    <div class="success" style="display: none;">
      <div class="success-box">
        <div class="success-box-icon">
          <img src="../../../assets/img/market/success.png" />
        </div>
        <div class="success-box-content">
          <div>提交成功</div>
          <div>信息提交成功，新睿云的商务人员将在24小时内与您取得联系</div>
          <div>部署测试将分为两个阶段，您在接收到测试主机并部署完成之后需要进行一次测试验收，通过之后将测试结果反馈至新睿云商务人员，我方将安排技术人员进行二次测试，若通过测试将安排进入商品上架流程</div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info-box">
        <div class="info-box-title"><span></span>部署测试</div>
        <div class="ino-box-deploy">
          <div class="ino-box-deploy-item">
            <div class="title">规格选择</div>
            <div class="content">
              <span v-for="(item,index) in sys"  :key="index" :class="{sysActive: sysIndex == index }" @click="sysIndex = index">{{item}}</span>
            </div>
          </div>
          <div class="ino-box-deploy-item">
            <div class="title">选择区域</div>
            <div class="content">
              <span v-for="(item,index) in area"  :key="index" :class="{areaActive: areaIndex == index }" @click="changeArea(item,index)">{{item.zonename}}</span>
            </div>
          </div>
          <div class="ino-box-deploy-item">
            <div class="title">所属网络</div>
            <div class="content">
              <Select v-model="vpc" style="width:300px;margin-right: 20px;" placeholder="请选择">
                <Option v-for="item in vpcList" :value="item.vpcname" :key="item.value">{{ item.vpcname }}</Option>
              </Select>
              <router-link to="">新建VPC</router-link>
            </div>
          </div>
          <div class="ino-box-deploy-item">
            <div class="title">宽带大小</div>
            <div class="content">
              <i-slider
                v-model="value"
                unit="MB"
                :min=1
                :max=100
                :step=1
                :points="[10,30,50,100]"
                style="width:500px;vertical-align: middle;">
              </i-slider>
              <InputNumber :max="100" :min="1" v-model="value"
                           :editable="false"
                           style="margin-left: 20px" :precision="0"></InputNumber>
            </div>
          </div>
          
          <div class="sub">
            <Button type="primary">提交</Button>
            <Button type="primary" @click="$router.go(-1)">上一步</Button>
          </div>
        </div>

        <div class="info-box-rate" style="display: none;">
          <div class="info-box-rate-info">
            <div>项目ID：00236</div>
            <div>新睿云商务：江杨</div>
            <div>主机发放时间：2019-09-23 12:24</div>
          </div>
          <div class="info-box-rate-step">
            <div class="dot">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="wire">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="info-box-rete-stepword">
            <div class="item">
              <p>发放测试主机</p>
              <p>江杨</p>
              <p>2019-09-23 12:24</p>
            </div>
            <div class="item">
              <p>发放测试主机</p>
              <p>江杨</p>
              <p>2019-09-23 12:24</p>
            </div>
            <div class="item">
              <p>发放测试主机</p>
              <p>江杨</p>
              <p>2019-09-23 12:24</p>
            </div>
            <div class="item">
              <p>发放测试主机</p>
              <p>江杨</p>
              <p>2019-09-23 12:24</p>
            </div>
          </div>
          <div class="back">
            <button>返回</button>
          </div>
        </div>
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
      .flow-box-tooltip{
        width: 951px;
        height: 88px;
        background: rgba(255,250,235,1);
        border-radius: 4px;
        margin: 0 auto;
        font-size: 14px;
        color: rgba(102,102,102,1);
        padding: 20px 32px;
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
          &:last-of-type{
            font-size: 14px;
            color: rgba(153,153,153,1);
          }
        }
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
