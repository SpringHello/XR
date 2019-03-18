<template>
  <div id="background">
    <div id="wrapper">
      <span>资源</span>
      <div class="content">
        <span class="returnmoney">所有资源</span>
        <div class="tn"></div>
        <div class="tiao">
          <div class="tiaoa">
            <span class="tiaoa1"></span>
            <div class="allnum">
              <span class="num1">{{TotalWuantity}}</span>
              <span class="num2">个</span>
              <Poptip trigger="hover">
                <div slot="content" id="ffff">
                  <span>平台所有区域资源数量之和</span>
                </div>
                <i class="iconfont houtaiicon-bangzhu" id="num4"></i><br/>
              </Poptip>
              <div><span class="num3">总数量</span></div>
            </div>
            <img class="img1" src="../../assets/img/back/ziyuan1.png"/>
          </div>
          <div class="tiaoa" style="margin-left: 10px;">
            <span class="tiaoa1"></span>
            <div class="allnum">
              <span class="num1">{{QuantityExpire}}</span>
              <span class="num2">个</span>
              <Poptip trigger="hover">
                <div slot="content" id="ffff">
                  <span>平台所有区域付费资源即将到期提醒，具体提醒政策请参见</br></span>
                  <span>帮助文档-<a href="https://www.xrcloud.net/documentInfo/kiRWuMFJd/km08mXqRb"
                                style="color: #2A99F2FF;text-decoration: underline;">购买指南</a>-到期提醒栏目；</span>
                </div>
                <i class="iconfont houtaiicon-bangzhu" id="num4"></i><br/>
              </Poptip>
              <div><span class="num3">即将过期数量</span></div>
            </div>
            <img class="img1" src="../../assets/img/back/ziyuan2.png"/>
          </div>
          <div class="tiaoa" style="margin-left: 10px;">
            <span class="tiaoa1"></span>
            <div class="allnum">
              <span class="num1">{{OutdatedQuantity}}</span>
              <span class="num2">个</span>
              <Poptip trigger="hover">
                <div slot="content" id="ffff">
                  <span>平台所有区域已经过期的资源总数</span>
                </div>
                <i class="iconfont houtaiicon-bangzhu" id="num4"></i><br/>
              </Poptip>
              <div><span class="num3">已经过期数量</span></div>
            </div>
            <img class="img1" src="../../assets/img/back/ziyuan3.png"/>
          </div>
          <div class="tiaoa" style="margin-left: 10px;">
            <span class="tiaoa1"></span>
            <div class="disan">
              <p style="height: 25px;">
                <span class="num1">{{TotalNumberDomain}}</span>
                <span class="num2">个</span><br/>
              </p>
              <div><span class="num3">域名总数量</span></div>
            </div>
            <span class="tiao2"></span>
            <div class="disan1">
              <p style="height: 25px;">
                <span class="num1">{{TotalNumberCertificates}}</span>
                <span class="num2">个</span><br/>
              </p>
              <div><span class="num3">域名证书总数量</span></div>
            </div>
          </div>
        </div>
        <span class="allziyuan">所有区域</span>
        <Button class="btn1" type="primary" @click="$router.push('/work')">增加配额</Button>
        <span class="xian1"></span>
        <div class="allbox">
          <div class="box" v-for="item in LargeArea">
            <div class="boxtop" v-bind:class="{ newboxtop: item.overview.num>0}"></div>
            <div class="boxtop-all">
              <div class="jjjj" @click="toggleZone(item)">
                <i class="iconfont houtaiicon-weizhihei" id="icon1"></i>
                <span class="boxtop-name">{{item.zoneName}}</span>
              </div>
              <div @click="LJTZ(item)" style="cursor: pointer;">
                <span class="numbercloud" v-if="item.type=='1'">云服务器总数</span>
                <span class="numbercloud1" v-if="item.type=='2'">GPU服务器总数</span>
                <span class="numberofc" v-bind:class="{ newnumberofc: item.overview.num>0}">{{item.overview.num}}</span>
                <span class="numberge">个</span>
              </div>
              <span class="xiantiaoa"></span>
              <i class="iconfont houtaiicon-gouwuche1" id="gouwuche1" @click="JumpGwc(item)"></i>
              <div class="rightall" @click="LJTZ(item)" style="cursor: pointer;">
                <div>
                  <img src="../../assets/img/back/kaiqi.png" class="img-kaiqi"/>
                  <img src="../../assets/img/back/yichang.png" class="img-yichang"/>
                  <img src="../../assets/img/back/qianfei.png" class="img-qianfei"/>
                  <img src="../../assets/img/back/guanji.png" class="img-guanji"/>
                </div>
                <div class="kaiq">
                  <span v-for="iter in item.overview.list">{{iter.name}}</span>
                </div>
                <div class="kaiqzi">
                  <span v-for="iter in item.overview.list">{{iter.num}}</span>
                </div>
              </div>
            </div>
            <div class="boxcontent1">
              <div>
                <span class="fufeinum">其他付费资源数量</span>
                <span class="fufeinum1" v-bind:class="{ newnumberofc: item.payResources.num>0}">{{item.payResources.num}}</span>
                <span class="fufeinum2">种</span>
              </div>
              <br/>
              <div style="margin-top: 13px;margin-left: -5px;">
                <div class="VPCALL" v-for="ited in item.payResources.list" @click="push(item,ited)">
                  <p style="height: 30px;line-height: 30px;margin-top: 5px;">
                    <span class="nnum" v-bind:class="{ newnnum: ited.num>0}">{{ited.num}}</span>
                    <Poptip trigger="hover" v-if="ited.name=='对象存储'">
                      <div slot="content" id="enna">
                        <span>数字代表该区域 </span>
                        <span>存储包 </span>
                        <span>容量 </span>
                      </div>
                      <i class="iconfont houtaiicon-bangzhu"></i>
                    </Poptip>
                    <i class="iconfont houtaiicon-gouwuche1" id="gwchh" @click.stop="pushbuy(item,ited)"></i>
                  </p>
                  <p style="height: 20px;">
                    <span class="nnumzi" v-bind:class="{ newnnumzi: ited.num>0}">{{ited.name}}</span>
                  </p>
                </div>
              </div>
            </div>
            <span class="xiantiaof"></span>
            <div class="boxcontent2">
              <div>
                <span class="mianfeizy">免费资源数量</span>
                <span class="mianfeizy1" v-bind:class="{ newnumberofc: item.freeResources.num>0}">{{item.freeResources.num}}</span>
                <span class="mianfeizy2">种</span>
                <span class="lookgd" @click="toggleZone(item)">查看更多</span>
              </div>
              <br/>
              <div style="margin-top: 13px;margin-left: -5px;">
                <div class="VPCCALL" v-for="ites in item.freeResources.list" @click="freepush(item,ites)">
                  <p style="height: 30px;margin-top: 5px;">
                    <span class="nnum2" v-bind:class="{ newnnum: ites.num>0}">{{ites.num}}</span>
                  </p>
                  <p style="height: 20px;">
                    <span class="nnumzi2" v-bind:class="{ newnnumzi: ites.num>0}">{{ites.name}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '../../vuex'
  import reg from '../../util/regExp'

  export default {

    data() {

      return {
        //总数量
        TotalWuantity: 0,
        //即将过期数量
        QuantityExpire: 0,
        //已经过期数量
        OutdatedQuantity: 0,
        //域名总数量
        TotalNumberDomain: 0,
        //域名证书总数量
        TotalNumberCertificates: 0,
        //云服务器总数量
        TotalCumberCloud: 0,
        //区域详情
        LargeArea: []
      }
    },
    created() {
      this.CallResources()
    },
    methods: {
      CallResources() {
        axios.get('information/getAllResourceByZoneId.do', {
          params: {}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.TotalWuantity = response.data.totalNum
            this.QuantityExpire = response.data.comingExpiredNum
            this.OutdatedQuantity = response.data.alreadyExpiredNum
            this.TotalNumberDomain = response.data.domainNum
            this.TotalNumberCertificates = response.data.sslNum
            this.LargeArea = response.data.result
          } else {

          }
        })
      },
      push(item, ited) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            if (ited.url == 'https://oss-console.xrcloud.net/ruirados/objectStorage') {
              window.location.href = 'https://oss-console.xrcloud.net/ruirados/objectStorage'
            }
            else if (ited.url == 'vpc#NAT') {
              sessionStorage.setItem('VPN', ited.url)
              this.$router.push(ited.url)
            }
            else {
              this.$router.push(ited.url)
            }

          }
        }
      },
      pushbuy(item, ited) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            if (ited.buyUrl == 'vpc#NAT') {
              sessionStorage.setItem('VPN', ited.url)
              this.$router.push(ited.buyUrl)
            }
            else {
              this.$router.push('/buy/' + ited.buyUrl)
            }
          }
        }
      },
      toggleZone(item) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            this.$router.push('/overview')
          }
        }
      },
      JumpGwc(item) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            if (item.type == '2') {
              this.$router.push('/buy/gpu/')
            }
            else if (item.type == '1') {
              this.$router.push('/buy/host/')
            }
          }
        }
      },
      freepush(item, ites) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            this.$router.push(ites.url)
          }
        }
      },
      LJTZ(item) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: item.zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == item.zoneId) {
            $store.commit('setZone', zone);
            if (item.type == '2') {
              this.$router.push('/GpuList')
            }
            else if (item.type == '1') {
              this.$router.push('/host')
            }
          }
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
  }

  .wrapper {
    width: 1200px;
    margin: 0px auto;
  }

  .wrapper span {
    padding: 11px 0px;
    display: block;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  .content {
    background: rgba(255, 255, 255, 1);
    padding: 20px;
    padding-bottom: 80px;
    height: auto;
    border-radius: 2px;
    float: left;
  }

  .returnmoney {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
  }

  .tiao {
    width: 100%;
    height: 96px;
    margin-top: 20px;
    float: left;
  }

  .tiao .tiaoa {
    width: 282px;
    height: 96px;
    float: left;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 9px -2px rgba(0, 0, 0, 0.2);
  }

  .tn {
    width: 100%;
    height: 1px;
    background: rgba(233, 233, 233, 1);
    margin-top: 20px;
  }

  .tiaoa .tiaoa1 {
    width: 100%;
    height: 6px;
    background: rgba(102, 102, 102, 1);
    float: left;
  }

  .allnum {
    width: 191px;
    height: 70px;
    margin-top: 26px;
    margin-left: 20px;
    text-align: left;
  }

  .num1 {
    font-size: 24px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    float: left;
  }

  .num2 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    float: left;
    margin-top: 8px;
    margin-left: 5px;
  }

  #num4 {
    display: block;
    float: left;
    margin-left: 10px;
    color: #2A99F2FF;
    cursor: pointer;
  }

  .num3 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    margin-top: 7px;
    float: left;
  }

  .img1 {
    float: right;
    margin-top: -70px;
  }

  .disan {
    width: 120px;
    height: 50px;
    margin-left: 20px;
    margin-top: 26px;
  }

  .disan1 {
    width: 120px;
    height: 50px;
    margin-top: -50px;
    float: left;
    margin-left: 15px;
  }

  .tiao2 {
    width: 2px;
    height: 70px;
    border: 1px solid rgba(182, 182, 182, 1);
    margin-top: 16px;
    margin-left: 140px;
    float: left;
    margin-top: -60px;
  }

  .allziyuan {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    margin-top: 20px;
    float: left;
  }

  .btn1 {
    float: right;
    margin-top: 24px;
  }

  .xian1 {
    width: 100%;
    height: 1px;
    background: rgba(245, 245, 245, 1);
    margin-top: 10px;
    float: left;
  }

  .allbox {
    width: 1180px;
    height: auto;
    margin-left: -20px;
    float: left;
  }

  .box {
    width: 373px;
    height: 527px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(233, 233, 233, 1);
    margin-top: 20px;
    margin-left: 20px;
    float: left;
  }

  .boxtop {
    width: 371px;
    height: 190px;
    background: rgba(245, 245, 245, 1);
  }

  .boxtop-all {
    width: 371px;
    height: 190px;
    margin-top: -190px;
    position: relative;
  }

  #icon1 {
    font-size: 15px;
    margin-left: 20px;
    margin-top: 20px;
    float: left;
  }

  .boxtop-name {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    line-height: 20px;
    position: absolute;
    margin-top: 22px;
    margin-left: 3px;
  }

  .numbercloud {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    top: 110px;
    left: 30px;
    position: absolute;
  }

  .numbercloud1 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    top: 110px;
    left: 17px;
    position: absolute;
  }

  .numberofc {
    width: 30px;
    font-size: 24px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    top: 103px;
    left: 101px;
    position: absolute;
    text-align: center;
  }

  .numberge {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    top: 111px;
    left: 128px;
    position: absolute;
  }

  .xiantiaoa {
    position: absolute;
    width: 2px;
    height: 130px;
    border: 1px solid rgba(182, 182, 182, 1);
    top: 50px;
    left: 190px;
  }

  #gouwuche1 {
    color: #2A99F2FF;
    position: absolute;
    top: 20px;
    left: 333px;
    display: none;
    cursor: pointer;
  }

  .rightall {
    width: 141px;
    height: 125px;
    position: relative;
    left: 228px;
    top: 62px;
  }

  .img-kaiqi {
    position: absolute;
    left: 0;
  }

  .img-yichang {
    position: absolute;
    margin-top: 30px;
    left: 0;
  }

  .img-qianfei {
    position: absolute;
    margin-top: 60px;
    left: 0;
  }

  .img-guanji {
    position: absolute;
    margin-top: 90px;
    left: 0;
  }

  .kaiq span:nth-of-type(1) {
    position: absolute;
    left: 23px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  .kaiq span:nth-of-type(2) {
    position: absolute;
    left: 23px;
    margin-top: 30px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  .kaiq span:nth-of-type(3) {
    position: absolute;
    left: 23px;
    margin-top: 60px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  .kaiq span:nth-of-type(4) {
    position: absolute;
    left: 23px;
    margin-top: 90px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  .kaiqzi span:nth-of-type(1) {
    position: absolute;
    left: 68px;
    margin-top: -1px;
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(48, 186, 120, 1);
    line-height: 20px;
  }

  .kaiqzi span:nth-of-type(2) {
    position: absolute;
    left: 68px;
    margin-top: 29px;
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(255, 0, 0, 1);
    line-height: 20px;
  }

  .kaiqzi span:nth-of-type(3) {
    position: absolute;
    left: 68px;
    margin-top: 59px;
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(245, 166, 35, 1);
    line-height: 20px;
  }

  .kaiqzi span:nth-of-type(4) {
    position: absolute;
    left: 68px;
    margin-top: 89px;
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }

  .boxcontent1 {
    width: 331px;
    height: 177px;
    margin-left: 20px;
    margin-top: 20px;
  }

  .fufeinum {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    float: left;
    margin-top: 5px;
  }

  .fufeinum1 {
    font-size: 24px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-left: 7px;
    float: left;
  }

  .fufeinum2 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    float: left;
    margin-top: 8px;
    margin-left: 6px;
  }

  .xiantiaof {
    width: 353px;
    height: 2px;
    border: 1px solid rgba(229, 233, 237, 1);
    float: left;
    margin-left: 10px;
  }

  .boxcontent2 {
    width: 331px;
    margin-left: 20px;
    margin-top: 18px;
    float: left;
  }

  .mianfeizy {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    float: left;
    margin-top: 5px;
  }

  .mianfeizy1 {
    font-size: 24px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-left: 7px;
    float: left;
  }

  .mianfeizy2 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    float: left;
    margin-top: 8px;
    margin-left: 6px;
  }

  .nnum {
    max-width: 55px;
    font-size: 14px;
    font-family: ArialMT;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
    margin-left: 10px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nnumzi {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
    margin-left: 10px;
  }

  .nnum2 {
    font-size: 14px;
    font-family: ArialMT;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
    margin-left: 10px;
    float: left;
  }

  .nnumzi2 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
    margin-left: 10px;
  }

  .VPCALL {
    width: 107px;
    height: 61px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
  }

  .VPCALL:hover {
    background: rgba(232, 244, 254, 1);
  }

  .VPCCALL {
    width: 107px;
    height: 61px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
  }

  .VPCCALL:hover {
    background: rgba(232, 244, 254, 1);
  }

  .jjjj {
    color: rgba(51, 51, 51, 1);
  }

  .jjjj:hover {
    cursor: pointer;
    color: rgba(42, 153, 242, 1);
  }

  .lookgd {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(42, 153, 242, 1);
    line-height: 16px;
    float: left;
    margin-top: 8px;
    margin-left: 6px;
    cursor: pointer;
  }

  .newnumberofc {
    color: rgba(51, 51, 51, 1);
  }

  .newnnum {
    color: rgba(51, 51, 51, 1);
  }

  .newnnumzi {
    color: rgba(102, 102, 102, 1);
  }

  .newboxtop {
    width: 371px;
    height: 190px;
    background: linear-gradient(98deg, rgba(40, 132, 221, 1) 0%, rgba(59, 79, 255, 0.12) 100%);
    opacity: 0.0989;
  }

  .boxtop-all:hover #gouwuche1 {
    display: block;
  }

  .VPCALL .houtaiicon-bangzhu {
    color: #2A99F2FF;
    margin-left: 2px;
    display: none;
  }

  .VPCALL:hover .houtaiicon-bangzhu {
    display: block;
  }

  .VPCALL #gwchh {
    color: #2A99F2FF;
    margin-right: 5px;
    float: right;
    display: none;
    cursor: pointer;
  }

  .VPCALL:hover #gwchh {
    display: block;
  }

  #enna {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }

  #enna span:nth-of-type(2) {
    color: #FF624BFF;
  }

  #ffff {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }
</style>
