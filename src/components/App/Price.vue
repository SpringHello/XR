<template>
  <div class="background">
    <div class="wrapper">
      <div class="header">
        <!--<Icon type="chevron-down" color="#2A99F2" size="18" style="line-height: 47px"></Icon>-->
        <Select v-model="title" class="mySelect" style="width: 148px">
          <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <h2>查看产品详情</h2>
      </div>
      <div class="body">
        <div class="left">
          <div class="title" v-if="title=='host'">
            <div class="titleText" :class="{select:pitchOn=='quick'}" @click=" [pitchOn='quick'] "><span>快速配置</span>
            </div>
            <div class="titleText" :class="{select:pitchOn=='custom'}" @click="[pitchOn='custom']"><span>自定义配置</span>
            </div>
          </div>
          <div class="content">
            <!--区域选择-->
            <div class="region">
              <h3 style="margin-top: 0">区域选择</h3>
              <div class="config-button">
                <button v-for="item in zoneList" :class="{select:item.zoneid==zone}" @click="zone=item.zoneid">
                  {{item.zonename}}
                </button>
              </div>
              <p>不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
            </div>
            <!--计费方式选择-->
            <div class="billing">
              <h3>计费方式选择</h3>
              <div class="config-button">
                <button :class="{select:type=='month'}" @click="type='month'" style="margin-right: 8px">包年包月<i>惠</i>
                </button>
                <button :class="{select:type=='current'}" @click="type='current'">实时计费</button>
              </div>
              <div v-if="type=='month'" class="time" style="margin-bottom:20px">
                <label :class="{select:time==1&&timeType!='year'}" @click="time=1;timeType='month'">1月</label>
                <label v-for="item in timeList" :class="{select:time==item&&timeType!='year'}"
                       @click="time=item;timeType='month'">{{item}}</label>
                <label
                  :class="{select:time==1&&timeType=='year'}"
                  @click="time=1;timeType='year'"
                  style="border-left:none;border-radius: 0px">1年<i>惠</i></label>
                <label
                  :class="{select:time==2&&timeType=='year'}"
                  @click="time=2;timeType='year'"
                  style="border-left:none;border-radius: 0px">2年<i>惠</i></label>
                <label
                  :class="{select:time==3&&timeType=='year'}"
                  @click="time=3;timeType='year'"
                  style="border-left:none;border-top-left-radius: 0px;border-bottom-left-radius: 0px">3年<i>惠</i></label>
              </div>
              <p>满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
            </div>
            <!--自定义配置-->
            <div v-if="pitchOn=='custom'||title=='elasticIP'||title=='disk'">
              <div class="specification" v-if="title=='host'">
                <h3>主机规格选择</h3>
                <div class="config-button">
                  <span>类型</span>
                  <Poptip trigger="hover" content="经典1：2与1：4配比，实现计算、网络与资源的良好平衡，高性价比" placement="top-start">
                    <button :class="{select:type=='1'}" @click="type='1'">标准型</button>
                  </Poptip>
                  <button :class="{select:type=='2'}" @click="type='2'">内存优化型</button>
                  <button :class="{select:type=='3'}" @click="type='3'">高I/O型</button>
                </div>
                <div class="config-button">
                  <span>镜像</span>
                  <button :class="{select:type=='1'}" @click="type='1'">镜像+应用</button>
                  <button :class="{select:type=='2'}" @click="type='2'">公共镜像</button>
                  <button :class="{select:type=='3'}" @click="type='3'">自定义镜像</button>
                </div>
                <div class="config-button" style="margin-left: 103px;" v-if="type=='2'">
                  <button :class="{select:type=='1'}" @click="type='1'">Windows</button>
                  <button :class="{select:type=='2'}" @click="type='2'">Centos</button>
                  <button :class="{select:type=='3'}" @click="type='3'">Ubuntu</button>
                </div>
                <div class="configMirror-button" v-if="type=='1'">
                  <button v-for="item in quickMirrorConfigList" :class="{select:item.value==quickMirrorConfig}"
                          @click="quickMirrorConfig=item.value">
                    <div
                      style="background: #D8D8D8;height:40px;width:40px;border: 1px solid #979797;margin-left: 10px"></div>
                    <div style="display: flex;flex-direction:column;text-align: left;margin-left: 10px;">
                      <p>{{ item.title}}</p>
                      <p style="color: #999999;">{{ item.discript}}</p>
                    </div>
                  </button>
                </div>
                <div class="config-button">
                  <span style="margin-right: 52px">系统盘</span>
                  <Poptip trigger="hover" content="全SSD架构，超高IOPS，适用于核心数据库与对I/O要求较高的业务。" placement="top-start">
                    <button :class="{select:type=='1'}" @click="type='1'">超高IO型</button>
                  </Poptip>
                  <Poptip trigger="hover" content="适用于顺序读写，如日志流水，流媒体等场景，高性价比。" placement="top-start">
                    <button :class="{select:type=='2'}" @click="type='2'">高IO型</button>
                  </Poptip>
                  <Poptip trigger="hover" content="超大存储容量，超高性价比。" placement="top-start">
                    <button :class="{select:type=='3'}" @click="type='3'">普通型</button>
                  </Poptip>
                </div>
                <div class="config-button">
                  <span style="margin-right: 52px">核心数</span>
                  <button v-for="item in cpuList" :class="{select:item==cpuNum}" @click="changeCPU(item)"
                          style="margin-right: 14px">{{item}}核
                  </button>
                </div>
                <div class="config-button">
                  <span>内存</span>
                  <button style="margin-right: 14px" v-for="item in memoryList" v-show="item>=cpuNum&&item<=cpuNum*4"
                          :class="{select:item==memorySize}"
                          @click="memorySize=item">{{item}}G
                  </button>
                </div>
                <div style="margin-top: 20px">
                  <span>价格</span>
                  <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ hostPrice}}元/月</span>
                </div>
              </div>
              <!--网络与带宽-->
              <div class="networkAndBandwidth" v-if="title=='host'||title=='elasticIP'">
                <h3>网络与带宽</h3>
                <div>
                  <span>虚拟私有云</span>
                  <Select style="width:180px;margin-left: 20px">
                    <Option v-for="item in netList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <p>如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span>控制台新建</span>。</p>
                </div>
                <div>
                  <span>网卡</span>
                  <Select v-model="networkCard" style="width:180px;margin-left: 68px">
                    <Option v-for="item in networkCardList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                  <span v-show="networkCard==1"
                        style="border: 1px solid #E9E9E9;font-size: 14px;padding: 4px 25px 8px 25px;margin-left: 10px;color: #666666;">自动分配IP地址</span>
                  <p style=" color:#333333;"><span style="margin-right: 20px">添加网卡</span>你还可以添加<span
                    style="color:#F85E1D">4张</span>网卡</p>
                </div>
                <div>
                  <span>公网IP</span>
                  <Checkbox v-model="buyPublicIP" size="large" style="margin-left: 53px;font-size: 18px">购买公网IP
                  </Checkbox>
                </div>
                <div v-if="buyPublicIP==true">
                  <span>带宽</span>
                  <i-slider v-model="publicIP" :min=0 :max=100 unit="MB" :points="[10,60]"
                            style="margin-right:30px;vertical-align: middle;width:66%;margin-left: 68px;"></i-slider>
                  <InputNumber :max="100" :min="0" v-model="publicIP" size="large"></InputNumber>
                </div>
                <div v-if="pitchOn=='custom'&&title=='host'">
                  <span>防火墙</span>
                  <span
                    style="border: 1px solid #E9E9E9;font-size: 14px;padding: 5px 25px;margin-left: 53px;color: #666666;">默认配置</span>
                  <p>默认防火墙仅打开22、3389端口，您可以在创建之后再控制台自定义防火墙规则。<span>如何修改</span></p>
                </div>
                <div>
                  <span style="margin-right: 68px">价格</span>
                  <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ hostPrice}}元/月</span>
                </div>
                <div v-if="title=='disk'||title=='elasticIP'">
                  <span style="margin-right: 36px;">自动续费</span>
                  <i-switch v-model="autoRenewal" style="margin-right: 0;margin-bottom: 5px;">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                  </i-switch>
                  <p style="display: inline;margin-left: 10px">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
                </div>
              </div>
              <!--硬盘-->
              <div class="disk" v-if="title=='host'||title=='disk'">
                <h3>云硬盘<span style="font-size:14px;color: #2A99F2;font-weight: normal;float: right;">删除</span></h3>
                <div class="config-button">
                  <span>类型</span>
                  <Poptip trigger="hover" content="全SSD架构，超高IOPS，适用于核心数据库与对I/O要求较高的业务。" placement="top-start">
                    <button :class="{select:type=='1'}" @click="type='1'">超高性能型</button>
                  </Poptip>
                  <Poptip trigger="hover" content="适用于顺序读写，如日志流水，流媒体等场景，高性价比。" placement="top-start">
                    <button :class="{select:type=='2'}" @click="type='2'">性能型</button>
                  </Poptip>
                  <Poptip trigger="hover" content="超大存储容量，超高性价比。" placement="top-start">
                    <button :class="{select:type=='3'}" @click="type='3'">存储型</button>
                  </Poptip>
                </div>
                <div>
                  <span>容量</span>
                  <i-slider
                    v-model="diskSize"
                    unit="GB"
                    :min=20
                    :max=500
                    :step=10
                    :points="[100,250]"
                    style="margin-right:30px;vertical-align: middle;width:66%">
                  </i-slider>
                  <InputNumber :max="500" :min="20" v-model="diskSize" size="large" :step=10></InputNumber>
                  <p>添加数据盘<span>你还可以添加<span style="color:#F85E1D;margin-left: 0">4块</span>数据盘</span></p>
                </div>
                <div>
                  <span style="margin-right: 68px">价格</span>
                  <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ hostPrice}}元/月</span>
                </div>
              </div>
            </div>
            <!--快速配置-->
            <div class="specification" v-if="pitchOn=='quick'&&title=='host'">
              <h3>主机规格选择</h3>
              <div class="config-button">
                <span>镜像</span>
                <button :class="{select:type=='1'}" @click="type='1'">镜像+应用</button>
                <button :class="{select:type=='2'}" @click="type='2'">公共镜像</button>
                <button :class="{select:type=='3'}" @click="type='3'">自定义镜像</button>
              </div>
              <div class="config-button" style="margin-left: 103px;" v-if="type=='2'">
                <button :class="{select:publicType=='1'}" @click="publicType='1'">Windows</button>
                <button :class="{select:publicType=='2'}" @click="publicType='2'">Centos</button>
                <button :class="{select:publicType=='3'}" @click="publicType='3'">Ubuntu</button>
              </div>
              <div class="configMirror-button" v-if="type=='1'">
                <button v-for="item in quickMirrorConfigList" :class="{select:item.value==quickMirrorConfig}"
                        @click="quickMirrorConfig=item.value">
                  <div
                    style="background: #D8D8D8;height:40px;width:40px;border: 1px solid #979797;margin-left: 10px"></div>
                  <div style="display: flex;flex-direction:column;text-align: left;margin-left: 10px;">
                    <p>{{ item.title}}</p>
                    <p style="color: #999999;">{{ item.discript}}</p>
                  </div>
                </button>
              </div>
              <div>
                <span style="margin-right: 53px;">公网IP</span>
                <Checkbox v-model="buyQuickPublicIP" size="large" style="font-size: 18px">购买公网IP</Checkbox>
              </div>
              <div class="config-button" style="display: -webkit-box;" v-if="buyQuickPublicIP">
                <span>配置</span>
                <div>
                  <button style="width: 360px;margin-bottom:10px;" v-for="item in quickConfigList"
                          :class="{select:item.value==quickConfig}" @click="quickConfig=item.value">
                    {{item.discript}}
                  </button>
                </div>
              </div>
              <div class="config-button" style="display: -webkit-box;" v-else>
                <span>配置</span>
                <div>
                  <button style="width: 360px;margin-bottom:10px;" v-for="item in quickNoNetConfigList"
                          :class="{select:item.value==quickNoNetConfig}" @click="quickNoNetConfig=item.value">
                    {{item.discript}}
                  </button>
                </div>
              </div>
            </div>
            <!--登录设置-->
            <div class="accountOptions" v-if="title=='host'">
              <h3>登录设置</h3>
              <div class="config-button">
                <span>主机信息</span>
                <button :class="{select:type=='5'}" @click="type='5'">默认设置</button>
                <button :class="{select:type=='6'}" @click="type='6'">自定义设置</button>
              </div>
              <div v-if="type==6">
                <span>主机名称</span>
                <Input v-model="hostName" placeholder="如不填写，系统自动生成" style="width: 360px"></Input>
                <p>当购买数量大于1台之时，主机命名规则为主机名称加随机数字。</p>
              </div>
              <div v-if="type==6">
                <span>登录密码</span>
                <Input v-model="hostPassword" placeholder="请输入主机登录密码" style="width: 360px"></Input>
              </div>
              <div v-if="type==5">
                <span>安全组</span>
                <Select style="width:216px;margin-left: 16px">
                  <Option v-for="item in safeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div>
                <span>自动续费</span>
                <i-switch v-model="autoRenewal" style="margin-right: 0;margin-bottom: 5px;">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>
                <p style="display: inline;margin-left: 10px">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
              </div>
            </div>
            <!--计价详情-->
            <div class="settleAccounts">
              <span>查看计价详情</span>
              <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">305元</span></p>
              <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">35元</span></p>
            </div>
            <!--购买按钮-->
            <div class="buy-button">
              <button>加入预算清单</button>
              <button style="margin-right: 0" :class="{select:true}">立即购买</button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="inventory">
            <h1>价格预算清单</h1>
            <div v-for="item in detailedList" class="detailed">
              <div class="title">
                <h3>云主机</h3>
                <p>删除</p>
              </div>
              <div class="configuration">
                <ul>
                  <li>区域<span>北方一区</span></li>
                  <li style="padding-left: 0;">计费模式<span>包年包月、1个月</span></li>
                  <li>镜像<span>Windows</span></li>
                  <li>配置<span>2核4G、1m带宽、50系统盘</span></li>
                  <li>硬盘<span>100G超高性能型</span></li>
                  <li>网络<span>默认VPC、默认子网</span></li>
                </ul>
              </div>
              <div class="footer">
                <p>价格<span>105元</span></p>
                <div class="quantity">
                  <p @click="reduce">-</p>
                  <p style="width: 50px;cursor: auto">{{ quantity }}</p>
                  <p style="border-right:0" @click="quantity+=1">+</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bulkOrderPrice">
            <p class="p1">总价<span>201元</span>已省56元</p>
            <div class="buy-button">
              <button style="margin-right: 0" :class="{select:true}">立即购买</button>
              <button>导出预算清单</button>
            </div>
            <p class="p2">如有需要请<span>联系客服</span>，或者致电：010-82527988</p>
            <p class="p2" style="color: #999999;margin-top: 10px;">关闭该页面后系统不会保存清单内容，如您需要请及时导出清单。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        productList: [
          {
            label: '云主机',
            value: 'host'
          }, {
            label: '云硬盘',
            value: 'disk'
          }, {
            label: '弹性公网IP',
            value: 'elasticIP'
          }
        ],
        title: 'host',
        zoneList: [
          {
            zonename: '北方一区',
            zoneid: '1'
          }, {
            zonename: '华中一区',
            zoneid: '2'
          }
        ],
        zone: '1',
        configChange: false,
        pitchOn: 'quick',
        type: 'month',
        timeType: 'month',
        timeList: ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        time: 1,
        cpuNum: 1,
        cpuList: [1, 2, 4, 8, 16],
        memorySize: 1,
        memoryList: [1, 2, 4, 8, 16, 32],
        hostPrice: 0,
        netList: [{
          label: '默认网络',
          value: '1'
        }],
        safeList: [{
          label: '默认安全组',
          value: '1'
        }],
        networkCardList: [
          {
            label: '主网卡',
            value: '1'
          }
        ],
        networkCard: '',
        buyPublicIP: true,
        buyQuickPublicIP: true,
        publicIP: 0,
        diskSize: 20,
        hostName: '',
        hostPassword: '',
        autoRenewal: true,
        quantity: 1,
        detailedList: [
          {}
        ],
        quickConfigList: [
          {
            discript: '1核1G、1m带宽、50G系统盘(性能型）',
            value: '1'
          }, {
            discript: '2核4G、1m带宽、50G系统盘（性能型号）',
            value: '2'
          }, {
            discript: '4核4G、2m带宽、50G系统盘（超高性能型号）',
            value: '3'
          }, {
            discript: '4核8G、2m带宽、50G系统盘（超高性能型号）',
            value: '4'
          }
        ],
        quickConfig: '1',
        quickNoNetConfigList: [
          {
            discript: '1核1G、50G系统盘(性能型）',
            value: '1'
          }, {
            discript: '2核4G、50G系统盘（性能型号）',
            value: '2'
          }, {
            discript: '4核4G、50G系统盘（超高性能型号）',
            value: '3'
          }, {
            discript: '4核8G、50G系统盘（超高性能型号）',
            value: '4'
          }
        ],
        quickNoNetConfig: '1',
        publicType: '1',
        quickMirrorConfigList: [
          {
            discript: '一键部署WordPress和LAMP，海量免费主题和插件。 ',
            title: 'WordPress开源博客系统（Centos）',
            value: '1'
          }, {
            title: 'LAMP集成环境（Centos）, ',
            discript: '一键部署Linux、Apache 、PHP 、MySQL 、phpMyAdmin',
            value: '2'
          }, {
            title: 'RedMine（Centos）',
            discript: ' Redmine与Git/SVN一键集成，方便开发和项目管理。',
            value: '3'
          }
        ],
        quickMirrorConfig: '1'
      }
    },
    created () {
    },
    methods: {
      changeCPU (item) {
        if (this.memorySize < item) {
          this.memorySize = item
        }
        if (this.memorySize > item * 4) {
          this.memorySize = item * 4
        }
        this.cpuNum = item
      },
      reduce () {
        this.quantity -= 1
        switch (this.quantity) {
          case 0:
            this.quantity = 1
            break
          default:
            break
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #F7F7F7;
    width: 100%;
    margin-bottom: 50px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      .header {
        margin-top: 50px;
        display: flex;
        h1 {
          font-family: MicrosoftYaHei;
          font-size: 24px;
          color: #333333;
          line-height: 43px;
          margin-left: 10px;
          font-weight: normal;
        }
        h2 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #2A99F2;
          line-height: 52px;
          font-weight: normal;
          margin-left: 20px;
        }
      }
      .body {
        display: flex;
        margin-top: 20px;
        .left {
          box-shadow: 0 2px 14px 0;
          width: 800px;
          .title {
            display: flex;
            justify-content: space-between;
            .titleText {
              height: 83px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50%;
              cursor: pointer;
              span {
                font-family: MicrosoftYaHei;
                font-size: 24px;
                color: #666666;
                line-height: 43px;
              }
              &.select {
                background: #FFFFFF;
                span {
                  color: #2A99F2 !important;
                }
              }
            }
          }
          .content {
            background: #FFFFFF;
            padding: 65px 40px 40px 40px;
            h3 {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              color: #333333;
              line-height: 32px;
              margin-top: 20px;
            }
            .region {
              border-bottom: 1px solid #E9E9E9;
              p {
                margin-top: 10px;
                margin-bottom: 20px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #999999;
                line-height: 25px;
              }
            }
            .billing {
              border-bottom: 1px solid #E9E9E9;
              .time {
                margin-top: 10px;
                font-size: 0px;
                label {
                  font-size: 14px;
                  display: inline-block;
                  width: 53px;
                  border: 1px solid #d9d9d9;
                  border-left: none;
                  text-align: center;
                  line-height: 38px;
                  height: 38px;
                  cursor: pointer;
                  position: relative;
                  &.select {
                    background-image: linear-gradient(-225deg, #0DB4FA 0%, #388BEE 100%);
                    color: white;
                    border-color: #0DB4FA;
                  }
                  &:first-child {
                    border-left: 1px solid #d9d9d9;
                    border-bottom-left-radius: 3px;
                    border-top-left-radius: 3px;
                  }
                  &:last-child {
                    border-bottom-right-radius: 3px;
                    border-top-right-radius: 3px;
                  }
                  i {
                    font-style: normal;
                    position: absolute;
                    display: inline-block;
                    background-color: #FF7D2D;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    color: white;
                    right: 2px;
                    font-size: 12px;
                  }
                }
              }
              p {
                margin-top: 10px;
                margin-bottom: 20px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #999999;
                line-height: 25px;
              }
            }
            .specification {
              border-bottom: 1px solid #E9E9E9;
              padding-bottom: 20px;
              & > div {
                margin-top: 20px;
              }
              span {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #333333;
                line-height: 29px;
                margin-right: 68px;
              }
            }
            .networkAndBandwidth {
              border-bottom: 1px solid #E9E9E9;
              padding-bottom: 20px;
              & > div {
                margin-top: 20px;
                & > span {
                  ont-family: MicrosoftYaHei;
                  font-size: 16px;
                  color: #333333;
                  line-height: 29px;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #999999;
                  line-height: 25px;
                  margin-top: 10px;
                  margin-left: 104px;
                  span {
                    color: #2A99F2;
                    font-size: 14px;
                    line-height: 25px;
                  }
                }
              }
            }
            .config-button {
              margin-top: 20px;
              button {
                width: 101px;
                height: 35px;
                outline: none;
                background-color: white;
                border: 1px solid #d9d9d9;
                font-size: 14px;
                color: #666666;
                cursor: pointer;
                margin-right: 10px;
                &.select {
                  background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
                  color: white;
                }
                i {
                  font-style: normal;
                  position: relative;
                  display: inline-block;
                  background-color: #FF7D2D;
                  border-radius: 50%;
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  color: white;
                  font-size: 12px;
                  bottom: 7px;
                  left: 10px;
                }
              }
            }
            .configMirror-button {
              margin-top: 20px;
              button {
                display: flex;
                width: 480px;
                height: 65px;
                outline: none;
                background-color: white;
                border: 1px solid #d9d9d9;
                font-size: 14px;
                color: #666666;
                cursor: pointer;
                margin-right: 10px;
                margin-bottom: 10px;
                margin-left: 102px;
                &.select {
                  background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
                  color: white;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #666666;
                }
              }
            }
            .disk {
              border-bottom: 1px solid #E9E9E9;
              padding-bottom: 20px;
              & > div {
                margin-top: 20px;
                & > span {
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  color: #333333;
                  line-height: 29px;
                  margin-right: 68px;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #2A99F2;
                  line-height: 25px;
                  margin-top: 20px;
                  margin-left: 102px;
                  span {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #333333;
                    line-height: 25px;
                    margin-left: 20px;
                  }
                }
              }
            }
            .accountOptions {
              border-bottom: 1px solid #E9E9E9;
              padding-bottom: 20px;
              & > div {
                margin-top: 20px;
                & > span {
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  color: #333333;
                  line-height: 29px;
                  margin-right: 35px;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #999999;
                  line-height: 25px;
                  margin-left: 102px;
                }
              }
            }
            .settleAccounts {
              margin-top: 20px;
              span {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #2A99F2;
                line-height: 25px;
              }
              p {
                font-size: 14px;
                text-align: right;
              }
            }
            .buy-button {
              text-align: right;
              margin-top: 10px;
              button {
                width: 170px;
                height: 35px;
                outline: none;
                background-color: white;
                border: 1px solid #2A99F2;
                font-size: 14px;
                color: #2A99F2;
                cursor: pointer;
                margin-right: 10px;
                border-radius: 10px;
                &.select {
                  background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
                  color: white;
                }
              }
            }
          }
        }
        .right {
          box-shadow: 0 2px 14px 0;
          width: 380px;
          margin-left: 20px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          height: fit-content;
          .inventory {
            width: 300px;
            margin: 0px auto;
            h1 {
              font-family: MicrosoftYaHei;
              font-size: 24px;
              color: #333333;
              line-height: 43px;
              font-weight: normal;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .detailed {
              border-top: 1px solid #E9E9E9;
              padding-top: 30px;
              .title {
                display: flex;
                justify-content: space-between;
                h3 {
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  color: #333333;
                  line-height: 32px;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #2A99F2;
                  line-height: 25px;
                }
              }
              .configuration {
                margin-top: 10px;
                ul {
                  li {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #666666;
                    line-height: 25px;
                    padding-left: 28px;
                    span {
                      margin-left: 20px;
                    }
                  }
                }
              }
              .footer {
                margin-top: 20px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                & > p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #666666;
                  line-height: 25px;
                  margin-left: 28px;
                  & > span {
                    font-family: MicrosoftYaHei;
                    font-size: 24px;
                    color: #F85E1D;
                    line-height: 25px;
                    margin-left: 20px;
                  }
                }
                .quantity {
                  border: 1px solid #E9E9E9;
                  height: 35px;
                  width: 110px;
                  display: flex;
                  p {
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                    align-items: center;
                    border-right: 1px solid #E9E9E9;
                    cursor: pointer
                  }
                }
              }
            }
          }
          .bulkOrderPrice {
            height: 300px;
            width: 380px;
            padding: 30px 40px 40px 40px;
            background: #FFFFFF;
            box-shadow: 0 2px 14px 0;
            .p1 {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #666666;
              line-height: 25px;
              margin-left: 28px;
              span {
                font-family: MicrosoftYaHei;
                font-size: 24px;
                color: #F85E1D;
                line-height: 25px;
                margin-left: 20px;
                margin-right: 10px;
              }
            }
            .p2 {
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #333333;
              line-height: 21px;
              margin-top: 20px;
              span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
            .buy-button {
              margin-top: 10px;
              button {
                width: 300px;
                height: 40px;
                outline: none;
                background-color: white;
                border: 1px solid #2A99F2;
                font-size: 14px;
                color: #2A99F2;
                cursor: pointer;
                margin-top: 10px;
                border-radius: 10px;
                &.select {
                  background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
                  color: white;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
