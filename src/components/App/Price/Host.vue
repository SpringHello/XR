<template>
  <div>
    <div class="title">
      <div class="titleText" :class="{select:pitchOn=='quick'}" @click=" [pitchOn='quick',addButton=false,buyButton=false] "><span>快速配置</span>
      </div>
      <div class="titleText" :class="{select:pitchOn=='custom'}" @click="[pitchOn='custom',addButton=false,buyButton=false]"><span>自定义配置</span>
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
          <button :class="{select:timeType=='month'||timeType=='year'}" @click="timeType='month'" style="margin-right: 8px">包年包月<i>惠</i>
          </button>
          <button :class="{select:timeType=='current'}" @click="timeType='current';time=1">实时计费</button>
        </div>
        <div v-if="timeType=='month'||timeType=='year'" class="time" style="margin-bottom:20px">
          <label :class="{select:time==1&&timeType!='year'}" @click="time=1;timeType='month'">1月</label>
          <label v-for="item in timeList" :class="{select:time==item&&timeType!='year'}"
                 @click="time=item;timeType='month'">{{item}}</label>
          <Tooltip :content="`买满1年，立享3折。`" placement="top">
            <label
              :class="{select:time==1&&timeType=='year'}"
              @click="time=1;timeType='year'"
              style="border-left:none;border-radius: 0px">1年<i>惠</i></label>
          </Tooltip>
          <Tooltip :content="`买满2年，立享2折。`" placement="top">
            <label
              :class="{select:time==2&&timeType=='year'}"
              @click="time=2;timeType='year'"
              style="border-left:none;border-radius: 0px">2年<i>惠</i></label>
          </Tooltip>
          <Tooltip :content="`买满3年，立享3折。`" placement="top">
            <label
              :class="{select:time==3&&timeType=='year'}"
              @click="time=3;timeType='year'"
              style="border-left:none;border-top-left-radius: 0px;border-bottom-left-radius: 0px">3年<i>惠</i></label>
          </Tooltip>
        </div>
        <p>满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
      </div>
      <!--自定义配置-->
      <div v-if="pitchOn=='custom'">
        <div class="specification">
          <h3>主机规格选择</h3>
          <div class="config-button">
            <span>类型</span>
            <Poptip trigger="hover" content="经典1：2与1：4配比，实现计算、网络与资源的良好平衡，高性价比" placement="top-start">
              <button :class="{select:hostType=='standard'}" @click="hostType='standard'">标准型</button>
            </Poptip>
            <button :class="{select:hostType=='memoryUp'}" @click="hostType='memoryUp'">内存优化型</button>
            <button :class="{select:hostType=='highIO'}" @click="hostType='highIO'">高I/O型</button>
          </div>
          <div class="config-button">
            <span>镜像</span>
            <button :class="{select:mirror=='imageApplication'}" @click="mirror='imageApplication',mirrorType='1'">镜像+应用</button>
            <button :class="{select:mirror=='UHub'}" @click="mirror='UHub',mirrorType='Windows'">公共镜像</button>
            <button :class="{select:mirror=='customImage'}" @click="mirror='customImage',mirrorType=''">自定义镜像</button>
          </div>
          <div class="config-button" style="margin-left: 103px;" v-if="mirror=='UHub'">
            <button :class="{select:mirrorType=='Windows'}" @click="mirrorType='Windows'">Windows</button>
            <button :class="{select:mirrorType=='Centos'}" @click="mirrorType='Centos'">Centos</button>
            <button :class="{select:mirrorType=='Ubuntu'}" @click="mirrorType='Ubuntu'">Ubuntu</button>
          </div>
          <div class="configMirror-button" v-if="mirror=='imageApplication'">
            <button v-for="item in mirrorConfigList" :class="{select:item.value==mirrorType}"
                    @click="mirrorType=item.value">
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
              <button :class="{select:hostType=='highIO'}" @click="hostType='highIO'">超高IO型</button>
            </Poptip>
            <Poptip trigger="hover" content="适用于顺序读写，如日志流水，流媒体等场景，高性价比。" placement="top-start">
              <button :class="{select:hostType=='memoryUp'}" @click="hostType='memoryUp'">性能型</button>
            </Poptip>
            <Poptip trigger="hover" content="超大存储容量，超高性价比。" placement="top-start">
              <button :class="{select:hostType=='standard'}" @click="hostType='standard'">普通型</button>
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
        <div class="networkAndBandwidth">
          <h3>网络与带宽</h3>
          <div>
            <span>虚拟私有云</span>
            <Select v-model="net" style="width:180px;margin-left: 20px">
              <Option v-for="item in netList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <p>如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span>控制台新建</span>。</p>
          </div>
          <div v-for="(item,index) in netWorkCards">
            <span>网卡</span>
            <Select v-model="networkCard" style="width:180px;margin-left: 68px">
              <Option v-for="item in networkCardList" :value="item.value" :key="item.value">{{ item.label }}
              </Option>
            </Select>
            <span v-show="networkCard==1" style="border: 1px solid #E9E9E9;font-size: 14px;padding: 4px 25px 8px 25px;margin-left: 10px;color: #666666;">自动分配IP地址</span>
            <span style="font-size: 14px;color: #2A99F2;cursor: pointer;float: right" @click="delNetWorkCard(index)">删除</span>
          </div>
          <div style="display: flex">
            <p style="cursor: pointer;color: #2A99F2" @click="addNetWorkCard" v-if="netWorkCardLimit!=0">添加网卡</p>
            <p style="color: #666666" v-else>添加网卡</p>
            <span class="s2">您还可以添加<span style="color:#F85E1D ">{{netWorkCardLimit}}</span>张网卡</span>
          </div>
          <div>
            <span>公网IP</span>
            <Checkbox v-model="buyPublicIP" size="large" style="margin-left: 53px;font-size: 16px">购买公网IP
            </Checkbox>
          </div>
          <div v-if="buyPublicIP==true">
            <span>带宽</span>
            <!-- <i-slider v-model="publicIP" :min=0 :max=100 unit="MB" :points="[10,60]"
                        style="margin-right:30px;vertical-align: middle;width:66%;margin-left: 68px;"></i-slider>-->
            <InputNumber :max="100" :min="0" v-model="publicIP" size="large"></InputNumber>
          </div>
          <div v-if="pitchOn=='custom'">
            <span>防火墙</span>
            <span
              style="border: 1px solid #E9E9E9;font-size: 14px;padding: 5px 25px;margin-left: 53px;color: #666666;">默认配置</span>
            <p>默认防火墙仅打开22、3389端口，您可以在创建之后再控制台自定义防火墙规则。<span>如何修改</span></p>
          </div>
          <div>
            <span style="margin-right: 68px">价格</span>
            <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ netPrice}}元/月</span>
          </div>
        </div>
        <!--硬盘-->
        <div class="disk" >
          <h3 v-if="diskList.length==0">云硬盘</h3>
          <div v-for="(item,index) in diskList" class="diskItem">
            <h3>云硬盘<span style="font-size:14px;color: #2A99F2;font-weight: normal;float: right;cursor: pointer" @click="delDisk(index)">删除</span></h3>
            <div class="config-button">
              <span>类型</span>
              <Poptip trigger="hover" content="全SSD架构，超高IOPS，适用于核心数据库与对I/O要求较高的业务。" placement="top-start">
                <button :class="{select:item.diskType=='ssd'}" @click="item.diskType='ssd'">超高性能型</button>
              </Poptip>
              <Poptip trigger="hover" content="适用于顺序读写，如日志流水，流媒体等场景，高性价比。" placement="top-start">
                <button :class="{select:item.diskType=='sas'}" @click="item.diskType='sas'">性能型</button>
              </Poptip>
              <Poptip trigger="hover" content="超大存储容量，超高性价比。" placement="top-start">
                <button :class="{select:item.diskType=='sata'}" @click="item.diskType='sata'">存储型</button>
              </Poptip>
            </div>
            <div>
              <span>容量</span>
              <!--  <i-slider
                    v-model="diskSize"
                    unit="GB"
                    :min=20
                    :max=500
                    :step=10
                    :points="[100,250]"
                    style="margin-right:30px;vertical-align: middle;width:66%">
                  </i-slider>-->
              <InputNumber :max="500" :min="20" v-model="item.diskSize" size="large" :step=10></InputNumber>
            </div>
          </div>
          <div :class="{addDisk:diskList.length!=0}" style="display: flex">
            <p v-if="diskLimit!=0" style="cursor: pointer;color: #2A99F2" @click="addDisk">添加数据盘</p><p v-if="diskLimit==0">添加数据盘</p><span class="s1">您还可以添加<span class="s1" style="color:#F85E1D;margin-left: 0">{{ diskLimit}}块</span>数据盘</span>
          </div>
          <div v-if="diskList.length!=0">
            <span style="margin-right: 68px">价格</span>
            <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ diskPrice}}元/月</span>
          </div>
        </div>
      </div>
      <!--快速配置-->
      <div class="specification" v-if="pitchOn=='quick'">
        <h3>主机规格选择</h3>
        <div class="config-button">
          <span>镜像</span>
          <button :class="{select:mirror=='imageApplication'}" @click="mirror='imageApplication',mirrorType='1'">镜像+应用</button>
          <button :class="{select:mirror=='UHub'}" @click="mirror='UHub',mirrorType='Windows'">公共镜像</button>
          <button :class="{select:mirror=='customImage'}" @click="mirror='customImage',mirrorType=''">自定义镜像</button>
        </div>
        <div class="config-button" style="margin-left: 103px;" v-if="mirror=='UHub'">
          <button :class="{select:mirrorType=='Windows'}" @click="mirrorType='Windows'">Windows</button>
          <button :class="{select:mirrorType=='Centos'}" @click="mirrorType='Centos'">Centos</button>
          <button :class="{select:mirrorType=='Ubuntu'}" @click="mirrorType='Ubuntu'">Ubuntu</button>
        </div>
        <div class="configMirror-button" v-if="mirror=='imageApplication'">
          <button v-for="item in mirrorConfigList" :class="{select:item.value==mirrorType}"
                  @click="mirrorType=item.value">
            <div
              style="background: #D8D8D8;height:40px;width:40px;border: 1px solid #979797;margin-left: 10px"></div>
            <div style="display: flex;flex-direction:column;text-align: left;margin-left: 10px;">
              <p>{{ item.title}}</p>
              <p style="color: #999999;margin-top: 10px;">{{ item.discript}}</p>
            </div>
          </button>
        </div>
        <div>
          <span style="margin-right: 53px;">公网IP</span>
          <Checkbox v-model="buyQuickPublicIP" size="large" style="font-size: 16px">购买公网IP</Checkbox>
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
      <div class="accountOptions">
        <h3>登录设置</h3>
        <div class="config-button">
          <span>主机信息</span>
          <button :class="{select:hostIfo=='defaultSetting'}" @click="hostIfo='defaultSetting'">默认设置</button>
          <button :class="{select:hostIfo=='customSetup'}" @click="hostIfo='customSetup'">自定义设置</button>
        </div>
        <div v-if="hostIfo=='customSetup'">
          <span>主机名称</span>
          <Input v-model="hostName" placeholder="如不填写，系统自动生成" style="width: 360px"></Input>
          <p>当购买数量大于1台之时，主机命名规则为主机名称加随机数字。</p>
        </div>
        <div v-if="hostIfo=='customSetup'">
          <span>登录密码</span>
          <Input v-model="hostPassword" placeholder="请输入主机登录密码" style="width: 360px"></Input>
        </div>
        <div v-if="hostIfo=='defaultSetting'">
          <span>安全组</span>
          <Select  v-model="safetyGroup" style="width:216px;margin-left: 16px">
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
      <div class="settleAccounts" v-if="pitchOn=='quick'">
        <span>查看计价详情</span>
        <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">{{ quickTotalCost }}元</span></p>
        <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">35元</span></p>
      </div>
      <div class="settleAccounts" v-else>
        <span>查看计价详情</span>
        <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">{{ customTotalCost }}元</span></p>
        <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">35元</span></p>
      </div>
      <!--购买按钮-->
      <div class="buy-button">
        <button @click="addBudgetList" :class="{select:addButton,disabled:hostDisabled}" :disabled="hostDisabled">加入预算清单</button>
        <button style="margin-right: 0" :class="{select:buyButton,disabled:hostDisabled}" @click="buyImmediately" :disabled="hostDisabled">立即购买</button>
      </div>
    </div>
    <!--登录弹框-->
    <Modal v-model="showModal.login" width="450" class="login-modal" scrollable>
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="modalBody">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="modalFooter">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../../util/regExp'
  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码'
    },
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
  export default{
    data () {
      return {
        // 产品类型
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
        // 地区
        zoneList: [
          {
            zonename: '北方一区',
            zoneid: '1'
          }, {
            zonename: '华中一区',
            zoneid: '2'
          }
        ],
        // 地区id
        zone: '1',
        // 主机类型：快速配置+自定义配置
        pitchOn: 'quick',
        // 购买日期类型
        timeType: 'month',
        timeList: ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        // 日期值
        time: 1,
        // 主机型号：标准 高性能。。。
        hostType: 'standard',
        // 镜像类型
        mirror: 'UHub',
        // 镜像准确版本
        mirrorType: 'Windows',
        // 主机信息
        hostIfo: 'defaultSetting',
        // 核心数
        cpuNum: 1,
        cpuList: [1, 2, 4, 8, 16],
        // 内存
        memorySize: 1,
        memoryList: [1, 2, 4, 8, 16, 32],
        // 自定义主机规格价值
        hostPrice: 998,
        // 自定义网络带宽价格
        netPrice: 199,
        // 自定义磁盘价格
        diskPrice: 588,
        netList: [{
          label: '默认网络',
          value: '1'
        }],
        net: '1',
        // 安全组
        safeList: [{
          label: '默认安全组',
          value: '1'
        }],
        safetyGroup: '1',
        // 网卡
        networkCardList: [
          {
            label: '主网卡',
            value: '1'
          }
        ],
        networkCard: '',
        // 自定义主机是否购买公网ip
        buyPublicIP: true,
        // 快速主机是否购买公网ip
        buyQuickPublicIP: true,
        publicIP: 1,
        // 主机名
        hostName: '',
        // 主机密码
        hostPassword: '',
        // 是否自动续费
        autoRenewal: true,
        // 某个订单数量
        quantity: 1,
        // 快速主机配置表（有公网）
        quickConfigList: [
          {
            discript: '1核1G、1m带宽、50G系统盘(性能型）',
            value: '1'
          }, {
            discript: '2核4G、1m带宽、50G系统盘（性能型）',
            value: '2'
          }, {
            discript: '4核4G、2m带宽、50G系统盘（超高性能型）',
            value: '3'
          }, {
            discript: '4核8G、2m带宽、50G系统盘（超高性能型）',
            value: '4'
          }
        ],
        quickConfig: '1',
        // 快速主机配置表（无公网）
        quickNoNetConfigList: [
          {
            discript: '1核1G、50G系统盘(性能型）',
            value: '5'
          }, {
            discript: '2核4G、50G系统盘（性能型）',
            value: '6'
          }, {
            discript: '4核4G、50G系统盘（超高性能型）',
            value: '7'
          }, {
            discript: '4核8G、50G系统盘（超高性能型）',
            value: '8'
          }
        ],
        quickNoNetConfig: '5',
        // 镜像+应用表
        mirrorConfigList: [
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
        // 自定义主机磁盘表
        diskList: [],
        // 登录表
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
        },
        // 校检表
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          }
        },
        // 验证码路径
        imgSrc: '',
        showModal: {
          login: false
        },
        // 磁盘限制数
        diskLimit: 4,
        // 自定义主机总价格
        customTotalCost: 998,
        // 快速主机总价格
        quickTotalCost: 699,
        // 判断按钮选中class
        buyButton: false,
        addButton: false,
        // 网卡限制数量
        netWorkCardLimit: 4,
        netWorkCards: []
      }
    },
    created () {
    },
    methods: {
       /* 核心数切换 */
      changeCPU (item) {
        if (this.memorySize < item) {
          this.memorySize = item
        }
        if (this.memorySize > item * 4) {
          this.memorySize = item * 4
        }
        this.cpuNum = item
      },
      /* 加入预算清单 */
      addBudgetList () {
        this.buyButton = false
        this.addButton = true
        var list = []
        if (sessionStorage.getItem('budget')) {
          list = JSON.parse(sessionStorage.getItem('budget'))
        }
        if (this.pitchOn === 'quick') {
          var params = {
            budgetType: 'quickHost',
            timeType: this.timeType,
            time: this.time + '',
            mirror: this.mirror === 'imageApplication' ? 'imageApplication' : this.mirror === 'UHub' ? 'UHub' : 'customImage',
            mirrorType: this.mirrorType,
            config: this.buyQuickPublicIP ? this.quickConfig : this.quickNoNetConfig,
            cost: this.quickTotalCost
          }
          list.push(params)
          sessionStorage.setItem('budget', JSON.stringify(list))
          this.$parent.updateList()
        } else {
          var param = {
            budgetType: 'customHost',
            timeType: this.timeType,
            time: this.time + '',
            mirror: this.mirror === 'imageApplication' ? 'imageApplication' : this.mirror === 'UHub' ? 'UHub' : 'customImage',
            mirrorType: this.mirrorType,
            cpuNum: this.cpuNum + '',
            memorySize: this.memorySize + '',
            buyPublicIP: this.buyPublicIP,
            publicIP: this.publicIP + '',
            diskList: this.diskList,
            cost: this.customTotalCost
          }
          list.push(param)
          sessionStorage.setItem('budget', JSON.stringify(list))
          this.$parent.updateList()
        }
      },
      /* 立即购买 */
      buyImmediately () {
        this.buyButton = true
        this.addButton = false
        this.showModal.login = true
      },
      /* 登录框校检等 */
      vail (field) {
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect (field) {
        if (field == 'vailCode') {
          // this.vailForm.vailCode.message = messageMap.vailCode.placeholder
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }
      },
      focus (field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      submit () {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$router.go(0)
            } else {
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        }).catch(() => {
          this.vailForm.loginname.message = '服务器异常'
          this.vailForm.loginname.warning = true
        })
      },
      /* 删除磁盘 */
      delDisk (index) {
        this.diskList.splice(index, 1)
        if (this.diskLimit < 4) {
          this.diskLimit++
        }
      },
      /* 添加磁盘 */
      addDisk () {
        var params = {
          diskType: 'ssd',
          diskSize: 20
        }
        this.diskList.push(params)
        if (this.diskLimit > 0) {
          this.diskLimit--
        }
      },
      /* 添加网卡 */
      addNetWorkCard () {
        var parms = { value: 1 }
        this.netWorkCards.push(parms)
        if (this.netWorkCardLimit > 0) {
          this.netWorkCardLimit--
        }
      },
      /* 删除网卡 */
      delNetWorkCard (index) {
        this.netWorkCards.splice(index, 1)
        if (this.netWorkCardLimit < 4) {
          this.netWorkCardLimit++
        }
      }
    },
    computed: {
      /* 校检登录信息完整 */
      disabled () {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      },
      /* 快速自定义主机切换后按钮class变化 */
      hostDisabled () {
        if (this.pitchOn == 'custom') {
          return (this.customTotalCost == 0)
        } else {
          return (this.quickTotalCost == 0)
        }
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
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
    padding: 40px 40px 40px 40px;
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
          font-family: MicrosoftYaHei;
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
        .s2{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          line-height: 25px;
          margin-top: 10px;
          margin-left: 20px;
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
      .diskItem{
        & > div {
          margin-top: 20px;
          & > span {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #333333;
            line-height: 29px;
            margin-right: 68px;
          }
        }
      }
      .addDisk{
        padding-left: 102px;
      }
      & > div {
        margin-top: 20px;
        & > span{
          font-family: MicrosoftYaHei;
          font-size: 16px;
          color: #333333;
          line-height: 29px;
          margin-right: 52px;
        }
        p{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          line-height: 25px;
        }
        .s1 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          line-height: 25px;
          margin-left: 20px;
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
        &.disabled{
          cursor: not-allowed;
        }
        &.select {
          background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
          color: white;
        }
      }
    }
  }
  .modalBody {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }
  .modalFooter {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }
</style>
