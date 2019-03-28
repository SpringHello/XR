<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>网络私有云VPC</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="(!auth)||auth && auth.checkstatus !== 0">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-xunisiyouyunVPC"></use>
          </svg>
          <span id="title">网络私有云VPC</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>虚拟私有云，通过逻辑方式进行网络隔离，提供安全、隔离的网络环境。VPC为您提供与传统网络无差别的虚拟网络，同时还可以为您提供弹性IP、安全组、VPN等高级网络服务。</p>
        </div>
        <Tabs type="card" :animated="false" v-model="paneStatus.vpc">
          <TabPane label="虚拟私有云VPC" name="VPC">
            <div class="operator-bar">
              <Button type="primary" @click="openNewVpcModal">新建VPC</Button>
               <Dropdown style="margin-left: 20px" @on-click='vpcClick'>
                   <Button type="primary">更多操作</Button>
                   <DropdownMenu slot="list">
                        <DropdownItem name='add' >添加VPC互通网关</DropdownItem>
                        <DropdownItem name='delete'>删除VPC</DropdownItem>
                        <DropdownItem name='reset'>恢复默认</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="card-wrap">
              <div class="card" v-for="(item,index) in netData" :key="index" :class="{active:item._select}"
                   @click="radio(item)">
                <div class="content">
                  <div class="item-wrap">
                    <div class="item item1">
                      <p>名称：<span style="float:unset">{{item.status==2?'创建中':item.status==3?'清理重启中':item.status==4? '删除中': item.status == -1?'异常' :item.vpcname}}</span>
                        <Spin size="small" v-if="item.status!=1 && item.status!=-1" style="display: inline-block"></Spin>
                      </p>
                      <!-- <p>所属公网IP：<span>{{item.sourcenatip}}</span></p> -->
                      <p>网段：<span>{{item.cidr}}</span></p>
                    </div>
                  </div>
                  <div class="item-wrap">
                    <div class="item" @click="manage(item)" style="cursor:pointer"><p>路由器（VPC）：<span>1</span></p></div>
                    <span class="dotted-across"></span>
                  </div>
                  <div class="item-wrap">
                    <div class="item" v-if="item.status === 2 || item.status === 3"><p>交换机（子网）：<span>{{item.networkCount}}</span>
                    </p></div>
                    <div class="item" @click="manage(item)" style="cursor: pointer" v-else><p>交换机（子网）：<span>{{item.networkCount}}</span>
                    </p></div>
                    <span class="dotted-vertical"></span>
                    <router-link to="host">
                      <div class="item item4"><p>弹性云主机：<span>{{item.computerCount}}</span></p></div>
                    </router-link>
                  </div>
                  <div class="item-wrap">
                    <router-link to="firewall" style="display:inline-block;width:265px;">
                      <div class="item"><p>防火墙：<span>{{item.aclCount}}</span></p></div>
                    </router-link>
                  </div>
                </div>
                <div class="card-bottom">
                  <div>
                    <Button   :disabled='item.status==1?false :true'  @click="restartVpc(item)">重启</Button>
                    <Button type="primary"  :disabled='item.status==1?false :true' @click="manage(item)">管理</Button>
                  </div>
                </div>
              </div>
              <div class="logo" v-if="netData.length === 0">
                <span>暂无VPC数据</span>
              </div>
            </div>
          </TabPane>
          <TabPane label="NAT网关" name="NAT">
            <div class="operator-bar">
              <Button type="primary" @click="openAddNatModal">添加NAT网关</Button>
              <Button type="primary" @click="openDeleteNatModal">删除NAT网关</Button>
              <Button type="primary" @click="natbindIps">续费</Button>
              <Button type="primary" @click="ratesChange">资费变更</Button>
            </div>
            <Table :columns="natColumns" :data="natData" @radio-change="selectNAT"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 新建vpc modal -->
    <Modal v-model="showModal.newVpc" width="500" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建VPC</span>
      </p>
      <div class="universal-modal-content-flex" id="moli2">
        <Form :model="newForm" :rules="newRuleValidate" ref="newFormValidate" style="width: 100%">
          <FormItem label="vpc名称" prop="vpcName">
            <Input v-model="newForm.vpcName" placeholder="请输入vpc名称" style="width:300px;float: right;"></Input>
          </FormItem>
          <FormItem label="地址范围" prop="vpc">
            <Select v-model="newForm.vpc" placeholder="请选择" style="width:300px;float: right;">
              <Option v-for="item in newForm.VPCOptions" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
					<span style="color:rgba(255,98,75,1);position: relative;left: 80px;">重要提醒：地址范围选定之后不可更改。</span>
          <FormItem label="vpc描述" prop="desc" style="margin-top: 10px;">
            <Input v-model="newForm.desc" placeholder="请输入vpc描述" style="width:300px;float: right;"></Input>
          </FormItem>
          <!--          <FormItem label="购买方式" prop="timeType">
                      <Select v-model="newForm.timeType">
                        <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                                :key="item.value">{{ item.label }}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="购买时长" prop="timeValue" v-if="newForm.timeType!='current'">
                      <Select v-model="newForm.timeValue">
                        <Option v-for="item in customTimeOptions[newForm.timeType]" :value="item.value" :key="item.value">
                          {{item.label}}
                        </Option>
                      </Select>
                    </FormItem>-->
					<div class="modal-content-s divall">
					  <div>
					    VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改<span class="spanaa"></span>
					  </div>
					</div>
        </Form>
        <!--创建vpc时暂时不绑定公网IP-->
        <!--<div>
          <span>是否需要绑定公网IP <Checkbox v-model="newForm.IPReq">&nbsp;</Checkbox></span>
          <div v-if="newForm.IPReq" style="margin-top: 10px;">
            <i-slider v-model="newForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newForm.IPSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </div>
        </div>-->
      </div>
      <div slot="footer" class="modal-footer-border">
        <!--  <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
          <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">{{newForm.cost}}元</span>-->
        <Button type="primary" @click="handleNewVpcSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 添加VPC互通网关 modal -->
    <Modal v-model="showModal.addGateway" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加VPC互通网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addGatewayForm" :rules="gatewayRuleValidate" ref="gatewayFormValidate">
          <FormItem label="源VPC" prop="originVPC">
            <Select v-model="addGatewayForm.originVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.targetVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标VPC" prop="targetVPC">
            <Select v-model="addGatewayForm.targetVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.originVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="源防火墙" prop="originFirewall">
            <Select v-model="addGatewayForm.originFirewall">
              <Option v-for="item in addGatewayForm.originFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标防火墙" prop="targetFirewall">
            <Select v-model="addGatewayForm.targetFirewall">
              <Option v-for="item in addGatewayForm.targetFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <!--<FormItem label="源IP" prop="originIP">
            <span>{{addGatewayForm.originPreIP[0]}}.{{addGatewayForm.originPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标IP" prop="originIP">
            <span>{{addGatewayForm.targetPreIP[0]}}.{{addGatewayForm.targetPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="源网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>-->
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.addGateway = false">取消</Button>
        <Button type="primary" @click="handleNewGateSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 添加NAT 网关 -->
    <Modal v-model="showModal.addNat" width="500" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加NAT网关</span>
      </p>
      <div class="universal-modal-content-flex" id="moli2">
        <Form :model="addNatForm" :rules="addNatRuleValidate" ref="addNatFormValidate" style="width: 100%">
          <FormItem label="网关名称" prop="natName">
            <Input v-model="addNatForm.natName" placeholder="请输入网关名称" style="width:300px;float: right;"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpc">
            <Select v-model="addNatForm.vpc" placeholder="请选择" style="width:300px;float: right;" @on-change="listIP">
              <Option v-for="item in netData" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}</Option>
            </Select>
          </FormItem>
          <FormItem label="弹性IP">
            <Select v-model="addNatForm.publicIp" style="width:300px;float: right;">
              <Option v-for="item in addNatForm.publicIpOptions" :value="item.publicipid" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
            <i @click="$router.push('ip')">
              <Icon type="plus" color="#2A99F2" size="17"
                    style="position: relative;top: 35px;cursor:pointer;left:35px;"></Icon>

            </i>
    		<span style="position: relative;top: 11px;cursor:pointer;left:52px;float: left;color:#2A99F2 ;" @click="$router.push('ip')">新建弹性IP</span>
          </FormItem>
          <FormItem label="计费模式" prop="timeType" id="fgfg">
            <Select v-model="addNatForm.timeType" style="width:145px;float: left;">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="" prop="timeValue" v-if="addNatForm.timeType!='current'" id="gfgf">
            <Select v-model="addNatForm.timeValue" style="width:145px;float: right;">
              <Option v-for="item in customTimeOptions[addNatForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="弹性IP带宽" v-if="addNatForm.publicIp=='新建弹性IP'"  style="width:90%">
            <i-slider v-model="addNatForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="addNatForm.IPSize" :editable="false"
                         style="margin-top: 10px;" :precision="0"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </FormItem>
    	  <div>
    		  <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
    		  <span style="font-size: 24px;color: #FF624B;line-height: 32px;float:left">￥{{addNatForm.cost}}
    		  <span v-if="addNatForm.timeValue != ''"> /
    		  <span v-if="addNatForm.timeType == 'year'"
    		        style="font-size: 16px; color: #FF624B;">{{addNatForm.timeValue}}年</span>
    		  <span v-if="addNatForm.timeType == 'month'"
    		        style="font-size: 16px; color: #FF624B;">{{addNatForm.timeValue}}月</span>
    		  </span>
    		  </span>
    	  </div>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
    	  <Button @click="showModal.addNat=false">取消</Button>
        <Button type="primary" @click="handleAddNatSubmit">完成</Button>
      </div>
    </Modal>
    <!-- 删除NAT 网关 -->
    <Modal v-model="showModal.deleteNat" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">删除NAT网关</span>
      </p>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleAddNatSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 绑定源弹性IP -->
    <Modal v-model="showModal.bindIP" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="bindIPForm" :rules="bindIPRuleValidate" ref="bindIPFormValidate">
          <FormItem label="选择源弹性IP" prop="IP">
            <Select v-model="bindIPForm.IP">
              <Option v-for="item in bindIPForm.IPOptions" :value="item.publicip" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
          </FormItem>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 42.5%;"
                @click="buyIP">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买弹性IP
            </span>
        </Form>
        <p class="modal-text-hint-bottom">当前NAT网关可绑定弹性IP剩余额度5</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handlebindIPSubmit">确认绑定</Button>
      </div>
    </Modal>

    <!-- 绑定目标弹性IP -->
    <Modal v-model="showModal.bindTargetIP" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定目标弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="bindTargetIPForm" :rules="bindTargetIPRuleValidate" ref="bindTargetIPFormValidate">
          <FormItem label="选择源弹性IP" prop="IP">
            <Select v-model="bindTargetIPForm.IP">
              <Option v-for="item in bindTargetIPForm.IPOptions" :value="item.publicip" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
          </FormItem>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 42.5%;"
                @click="buyIP">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买弹性IP
            </span>
          <p class="modal-text-hint-bottom">当前NAT网关可绑定弹性IP剩余额度5（点击提升配额）</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handlebindTargetIPSubmit">确认绑定</Button>
      </div>
    </Modal>
    <!-- nat网关续费弹窗 -->
    <Modal
      v-model="showModal.natRenewal"
      width="590"
      :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费选择</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="付费类型 :">
            <Select v-model="renewalType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长 :">
            <Select v-model="renewalTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否同时续费绑定IP" v-if="isIps">
            <CheckboxGroup @on-change="bindRenewal" v-model="bindRenewalIp">
              <Checkbox label="ip">续费绑定IP</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <!-- <span v-if="renewalTime != ''">/</span>
          <span style="font-size: 15px;">{{renewalTime}}<span v-if="renewalType == 'year' && renewalTime != ''">年</span>
          <span v-if="renewalType == 'month' && renewalTime != ''">月</span></span> -->
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.natRenewal = false">取消</Button>
        <Button type="primary" @click="renewalok" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 资费变更弹出框 -->
    <Modal v-model="showModal.ratesChange" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">变更资费选择（资费变更适用于按需收费转包月/年）</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="变更类型 :">
            <Select v-model="ratesChangeType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="变更时长 :">
            <Select v-model="ratesChangeTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{ratesChangeCost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originRatesChangeCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.ratesChange=false">取消</Button>
        <Button type="primary" @click="ratesChange_ok" :disabled="ratesChangeCost=='--'">确认变更</Button>
      </div>
    </Modal>
    <!-- 只有一个vpc时创建互联-->
    <Modal v-model="showModal.createInterconnectByOne" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">VPC互通网关旨在连接两个不同的VPC，使两个VPC通过互通网关实现互联。您当前VPC不足两个，不能创建VPC互通网关。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.createInterconnectByOne = false">取消</Button>
        <Button type="primary" @click="showModal.createInterconnectByOne = false,showModal.newVpc = true">新建VPC</Button>
      </p>
    </Modal>
  </div>

</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  import {mapState} from 'vuex'

  export default {
    name: 'vpc',
    data() {
      // 验证vpc互通网关，源IP与目标IP不能相同
      const validaRegisteredName = regExp.validaRegisteredName
      const validateIP = (rule, value, callback) => {
        if (this.addGatewayForm.originIP == this.addGatewayForm.targetIP && this.addGatewayForm.originIP2 == this.addGatewayForm.targetIP2) {
          callback(new Error('源IP与目标IP不能相同'))
        }
        callback()
      }
      return {
        bindRenewalIp: [],
        isIps: '',
        originCost: '--',
        cost: '--',
        renewalType: '',
        renewalTime: '',
        // 变更资费所需
        originRatesChangeCost: '--',
        ratesChangeCost: '--',
        ratesChangeType: '',
        ratesChangeTime: '',
        timeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}],
          renewalTime: [],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '3月', value: 3}, {
            label: '4月',
            value: 4
          }, {label: '5月', value: 5}, {label: '6月', value: 6}, {label: '7月', value: 7}, {
            label: '8月',
            value: 8
          }, {label: '9月', value: 9}, {label: '10月', value: 10}]
        },
        loadingMessage: '',
        loading: false,
        // vpc列表数据
        netData: [],
        // nat列表数据
        natColumns: [
          {
            type: 'radio',
            width: 60,
          },
          {
            title: '网关名称',
            key: 'natname'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              var status = params.row.status == 1 ? '正常' : '异常'
              return h('span', {}, status)
            }
          },
          {
            title: '计费类型',
            key: 'caseType',
            render: (h, params) => {
              return h('span', params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : '实时计费')
            }
          },
          {
            title: '所属网络',
            key: 'vpcname',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.gotoVpc(params.row.vpcid)
                  }
                },
              }, params.row.vpcname)
            }
          },
          {
            title: '源NAT',
            render: (h, object) => {
              if (object.row._status) {
                let message = object.row._status == 1 ? '正在添加源NAT...' : '正在删除源NAT...'
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, message)])
              }
              if (object.row.sourcenatip) {
                return h('div', [h('span', {
                  style: {
                    marginRight: '10px'
                  }
                }, object.row.sourcenatip), h('Icon', {
                  attrs: {
                    type: 'close'
                  },
                  style: {
                    cursor: 'pointer'
                  },
                  nativeOn: {
                    click: () => {
                      this.$Modal.confirm({
                        render: (h) => {
                          return h('p', {
                            class: 'modal-content-s'
                          }, [h('i', {
                            class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                            style: {
                              color: '#f90'
                            }
                          }), '确认解绑该源NAT?'])
                        },
                        title: '解绑源NAT',
                        scrollable: true,
                        okText: '确定解绑',
                        cancelText: '取消',
                        'onOk': () => {
                          this.natData.forEach(item => {
                            if (item.id == object.row.id) {
                              this.$set(item, '_status', 2)
                            }
                          })
                          var url = 'network/natGatewayUnboundTargetIP.do'
                          this.$http.get(url, {
                            params: {
                              natGatewayId: object.row.id,
                              publicIp: object.row.sourcenatip
                            }
                          }).then(response => {
                            this.refresh()
                            if (response.status == 200 && response.data.status == 1) {
                              this.$Message.success({
                                content: response.data.message
                              })
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
                }, '')])
              } else {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      /*        // 绑定sourceNat
                       if (object.row.prottransip) {
                       var prottransipArray = object.row.prottransip.split(',')
                       prottransipArray.splice(0, 1)
                       this.bindIPForm.IPOptions = prottransipArray
                       }*/
                      this.bindIP(object.row)
                    }
                  }
                }, '绑定源NAT')
              }
            }
          },
          {
            title: '目标IP',
            render: (h, object) => {
              var renderArray = []
              if (object.row.prottransip) {
                var prottransipArray = object.row.prottransip.split(',')
                prottransipArray.splice(0, 1)
                for (let item of prottransipArray) {
                  if (item) {
                    renderArray.push(h('div', [h('span', {
                      style: {
                        marginRight: '10px'
                      }
                    }, item), h('Icon', {
                      attrs: {
                        type: 'close'
                      },
                      style: {
                        cursor: 'pointer'
                      },
                      nativeOn: {
                        click: () => {
                          this.$Modal.confirm({
                            render: (h) => {
                              return h('p', {
                                class: 'modal-content-s'
                              }, [h('i', {
                                class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                                style: {
                                  color: '#f90'
                                }
                              }), '确认解绑该目标IP?'])
                            },
                            title: '解绑目标IP',
                            scrollable: true,
                            okText: '确定解绑',
                            cancelText: '取消',
                            'onOk': () => {
                              var url = 'network/unboundElasticIP.do'
                              this.$http.get(url, {
                                params: {
                                  natGatewayId: object.row.id,
                                  publicIp: item
                                }
                              }).then(response => {
                                if (response.status == 200 && response.data.status == 1) {
                                  this.$Message.success({
                                    content: response.data.message
                                  })
                                  this.refresh()
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
                    }, '')]))
                  }
                }
              }
              renderArray.push(h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.bindTargetIP(object.row)
                  }
                }
              }, '绑定目标IP'))
              return h('div', renderArray)
            }
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '操作',
            width: 100,
            render: (h, object) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    sessionStorage.setItem('currentNat', object.row.id)
                    if (object.row.prottransip) {
                      sessionStorage.setItem('ip', object.row.prottransip.substring(1))
                      sessionStorage.setItem('ipId', object.row.prottransipid.substring(1))
                    }
                    this.$router.push('NATManage')
                  }
                }
              }, '查看详情')
            }
          }
        ],
        natData: [],
        // 当前选中的NAT网关
        select: null,
        // 控制模态框是否关闭
        showModal: {
          newVpc: false,
          addGateway: false,
          // 添加nat网关
          addNat: false,
          // 删除nat网关
          deleteNat: false,
          // 绑定弹性IP模态框
          bindIP: false,
          // 绑定目标ip
          bindTargetIP: false,
          // 解绑弹性IP模态框
          unbindIP: false,
          natRenewal: false,
          ratesChange: false,
          createInterconnectByOne: false
        },
        // 新建vpc表单数据
        newForm: {
          vpcName: '',
          vpc: '',
          desc: '',
          VPCOptions: ['192.168.0.0/16', '172.16.0.0/16', '172.17.0.0/16', '172.18.0.0/16', '172.19.0.0/16', '172.20.0.0/16', '172.21.0.0/16', '172.22.0.0/16', '172.23.0.0/16', '172.24.0.0/16', '172.25.0.0/16'],
          timeType: '',
          timeValue: '',
          // 花费
          cost: 0
        },
        // 添加网关表单数据
        addGatewayForm: {
          // 源/目标VPC
          originVPC: '',
          targetVPC: '',
          // 源/目标IP
          originPreIP: [192, 168],
          originIP: 0,
          originIP2: 0,
          targetPreIP: [192, 168],
          targetIP: 0,
          targetIP2: 0,
          // 源/目标防火墙
          originFirewall: '',
          originFirewallList: [],
          targetFirewall: '',
          targetFirewallList: [],
          // 源/目标子网掩码
          originMask: [0, 0, 0],
          targetMask: [0, 0, 0]
        },
        // 添加nat网关表单
        addNatForm: {
          natName: '',
          vpc: '',
          publicIpOptions: [],
          publicIp: '',
          timeType: '',
          timeValue: '',
          IPSize: 1,
          cost: '--'
        },
        // nat绑定源IP表单
        bindIPForm: {
          // nat网关id(数据库id，当Modal打开时设置)
          natGatewayId: '',
          IP: '',
          IPOptions: []
        },
        // nat绑定目标IP表单
        bindTargetIPForm: {
          // nat网关id(数据库id，当Modal打开时设置)
          natGatewayId: '',
          IP: '',
          IPOptions: []
        },
        // 新建vpc验证规则
        newRuleValidate: {
          vpcName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          vpc: [
            {required: true, message: '请选择vpc地址范围', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // 添加网关验证规则
        gatewayRuleValidate: {
          originVPC: [
            {required: true, message: '请选择源VPC', trigger: 'change'}
          ],
          targetVPC: [
            {required: true, message: '请选择目标VPC', trigger: 'change'}
          ],
          originIP: [
            {validator: validateIP, trigger: 'change'}
          ],
          originFirewall: [
            {required: true, message: '请选择源VPC防火墙', trigger: 'change'}
          ],
          targetFirewall: [
            {required: true, message: '请选择目标VPC防火墙', trigger: 'change'}
          ],
          mask: [
            {required: true, message: '请输入子网掩码', trigger: 'blur'}
          ],
          firewall: [
            {required: true, message: '请选择防火墙', trigger: 'change'}
          ]
        },
        // 添加nat网关验证规则
        addNatRuleValidate: {
          natName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          vpc: [
            {required: true, message: '请选择VPC', trigger: 'change'}
          ],
          publicIp: [
            {required: true, message: '请选择弹性IP', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // nat绑定源IP验证规则
        bindIPRuleValidate: {
          IP: [
            {required: true, message: '请选择一个弹性IP', trigger: 'change'}
          ],
        },
        // nat绑定目标IP验证规则
        bindTargetIPRuleValidate: {
          IP: [
            {required: true, message: '请选择一个弹性IP', trigger: 'change'}
          ],
        },
        // ajax刷新instance，beforeRouteLeave钩子函数中调用clearInterval
        intervalInstance: null,
        customTimeOptions
      }
    },
    beforeRouteEnter(to, from, next) {
      //console.log(to)
      var zoneId = $store.state.zone.zoneid
      // 获取vpc数据
      var vpcResponse = axios.get('network/listVpc.do', {
        params: {
          zoneId: zoneId,
          _t: new Date().getTime()
        }
      })
      // 获取NAT网关数据
      var NATResponse = axios.get('network/listNatGateway.do', {
        params: {
          zoneId: zoneId
        }
      })

      Promise.all([vpcResponse, NATResponse]).then((ResponseValue) => {
        next(vm => {
          vm.setData(ResponseValue[0])
          vm.setNatData(ResponseValue[1])
        })
      })
    },
    created() {
      this.intervalInstance = setInterval(this.getVpcData, 10000)
			this.testjump()
    },
    methods: {
      testjump(){
        this.paneStatus.vpc = this.$route.query.pane
        if (sessionStorage.getItem('modal')) {
          var modalName = sessionStorage.getItem('modal')
          if (modalName == 'confirm') {
            this.$message.confirm({
                content: '请选择VPC并点击【管理】进入VPC详情页新建新的VPC子网',
                duration: 1000,
                top: 150,
                closable: true
            })
          } else {
            this.showModal[modalName] = true
          }
          sessionStorage.removeItem('modal')
        }
      },
      // 区域切换刷新数据
      refresh() {
        var zoneId = $store.state.zone.zoneid
        // 获取vpc数据
        var vpcResponse = axios.get('network/listVpc.do', {
          params: {
            zoneId: zoneId,
            _t: new Date().getTime()
          }
        })
        // 获取NAT网关数据
        var NATResponse = axios.get('network/listNatGateway.do', {
          params: {
            zoneId: zoneId
          }
        })

        Promise.all([vpcResponse, NATResponse]).then((ResponseValue) => {
          this.setData(ResponseValue[0])
          this.setNatData(ResponseValue[1])
          this.select = null
        })
      },
      // 选中当前项
      selectNAT(current) {
        this.select = current
      },
      getVpcData() {
        axios.get('network/listVpc.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            _t: new Date().getTime()
          }
        }).then(response => {
          if (response.status == 200) {
            this.setData(response)
          }
        })
      },
      // 设置查询vpc数据的值，保留原vpc选中状态
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            item._select = false
            this.netData.forEach(i => {
              if (i.vpcid == item.vpcid) {
                item._select = i._select
              }
            })
          })
          this.netData = response.data.result
        }
      },
      // 资费变更
      ratesChange() {
        if (this.select == null) {
          this.$Message.info('请先选择一个网关')
          return false
        }
        // caseTyp 3是实时计费
        if (this.select.caseType !== 3) {
          this.$Message.info('请选择实时计费的NAT网关进行资费变更')
          return false
        }
        this.originRatesChangeCost = '--'
        this.ratesChangeCost = '--'
        this.ratesChangeType = ''
        this.ratesChangeTime = ''
        this.showModal.ratesChange = true
      },
      // 确认变更资费
      ratesChange_ok() {
        let url = 'continue/changeMoney.do'
        let list = [{
          type: 4,
          id: this.select.id
        }]
        this.$http.post(url, {
          timeType: this.ratesChangeType,
          timeValue: this.ratesChangeTime,
          list: JSON.stringify(list)
        }).then(response => {
          if (response.data.status == 1) {
            this.$router.push({path: 'order'})
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      bindRenewal() {
        if (this.cost != '--') {
          var selectIp = ''
          if (this.bindRenewalIp.indexOf('ip') > -1) {
            selectIp = this.isIps
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              natArr: this.select.id,
              ipIdArr: selectIp
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.cost = response.data.result.toFixed(2)
              this.originCost = response.data.result
              if (response.data.cuspon) {
                this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      // 查询nat网关下的ip
      natbindIps() {
        if (this.select == null) {
          this.$Message.info('请先选择一个网关')
          return false
        }
        // caseTyp 3是实时计费
        if (this.select.caseType == 3) {
          this.$Message.info('请选择包年包月的NAT网关进行续费')
          return false
        }
        axios.get('network/listNatGatewayById.do', {
          params: {
            natGatewayId: this.select.id,
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result[0].attachPublicIp) {
              var iparr = response.data.result[0].attachPublicIp.map(item => {
                return item.id
              })
              this.isIps = iparr.join()
            } else {
              this.isIps = ''
            }
            // 清空续费弹窗数据
            this.bindRenewalIp = ['ip']
            this.originCost = '--'
            this.cost = '--'
            this.renewalType = ''
            this.renewalTime = ''
            this.showModal.natRenewal = true
          }
        })
      },
      // nat网关确认续费
      renewalok() {
        var selectIp = ''
        if (this.bindRenewalIp.indexOf('ip') > -1) {
          selectIp = this.isIps
        }
        var iplist = []
        if (selectIp != '') {
          iplist = selectIp.split(',').map(item => {
            return {type: 2, id: parseInt(item)}
          })
        }
        var nat = [
          {type: 4, id: this.select.id}
        ]
        var list = nat.concat(iplist)
        list = JSON.stringify(list)
        this.$http.post('continue/continueOrder.do', {
          list: list,
          timeType: this.renewalType,
          timeValue: this.renewalTime + ''
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      // 设置查询NAT数据的值，保留原NAT选中状态
      setNatData(response) {
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            item._select = false
            this.natData.forEach(i => {
              if (i.id == item.id) {
                item._select = i._select
              }
            })
          })
          this.natData = response.data.result
          if ((!this.auth) || (this.auth && this.auth.checkstatus !== 0)) {
            this.natData.forEach(nat => {
              nat._disabled = true
            })
          }
        }
      },
      radio(item) {
        this.netData.forEach(item => {
          item._select = false
        })
        item._select = true
      },
      manage: function (item) {
        sessionStorage.setItem('vpcId', item.vpcid)
        this.$router.push('/vpcManage')
      },
      // 打开新建vpc modal框
      openNewVpcModal() {
        this.showModal.newVpc = true
        /* var url = 'network/listAclList.do?'
         axios.get() */
      },
      // 打开添加nat网关modal
      openAddNatModal() {
        this.addNatForm.publicIp = ''
        this.showModal.addNat = true
      },
      createInterconnect() {
        if (this.netData.length < 2) {
          this.showModal.createInterconnectByOne = true
        } else {
          this.showModal.addGateway = true
        }
      },
      // 当vpc id变化时，重新查询当前vpc下的弹性IP
      listIP() {
        /*
         useType : 0 代表未使用
         status : 1 代表状态正常
         */
        var url = 'network/listPublicIp.do'
        this.addNatForm.publicIp = ''
        axios.get(url, {
          params: {
            useType: 0,
            status: 1,
            zoneId: $store.state.zone.zoneid,
            vpcId: this.addNatForm.vpc
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // response.data.result.push({publicipid: '新建弹性IP', publicip: '新建弹性IP'})
            this.addNatForm.publicIpOptions = response.data.result
          }
        })
      },
      // 打开删除nat网关modal
      openDeleteNatModal() {
        if (this.select != null) {
          // 单选检测通过
          var url = 'network/delNatGateway.do'
          this.$http.get(url, {
            params: {
              id: this.select.id
            }
          }).then(response => {
            if (response.status != 200 || response.data.status != 1) {
              this.refresh()
              this.$message.info({
                content: response.data.message
              })
            } else {
              this.$message.confirm({
                content: '您正将“' + this.select.natname + '”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。',
                onOk: () => {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.refresh()
                }
              })
            }
          })

        } else {
          this.$Message.info({
            content: '请先选择一个网关',
          })
        }
      },
      // 删除VPC
      delVpc() {
        var select = this.netData.filter(item => item._select)
        if (select.length == 0) {
          this.$Message.info({
            content: '请选择一个VPC'
          })
          return
        }
        this.$message.confirm({
          content: '您确认删除该VPC吗',
          onOk: () => {
            this.netData.forEach(item => {
              if (item.id == select[0].id) {
                this.$set(item, 'status', 4)
              }
            })
            //select[0]._select = 4 // 4代表删除中
            this.$http.get('network/deleteVpc.do', {
              params: {
                id: select[0].id
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.refresh()
              } else {
                this.refresh()
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 重启vpc
      restartVpc(item) {
        this.$message.confirm({
          content: '您确认重启该VPC吗',
          onOk: () => {
            this.$http.get('network/restartVpc.do', {
              params: {
                vpcId: item.vpcid,
                cleanup: true
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 新建vpc价格查询
      queryVpcPrice() {
        if (this.newForm.timeType == 'current' || this.newForm.timeValue != '') {
          axios.post('device/queryVpcPrice.do', {
            type: this.newForm.timeType,
            timelong: this.newForm.timeType == 'current' ? '1' : this.newForm.timeValue + '',
            zoneId: $store.state.zone.zoneid,
            isBindPublicIp: '0'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.newForm.cost = response.data.cost
            }
          })
        }
      },
      // 新建NAT网关价格查询
      queryNatPrice() {
        if (this.addNatForm.timeType == 'current' || this.addNatForm.timeValue != '') {
          axios.post('device/queryNetPrice.do', {
            type: this.addNatForm.timeType,
            timelong: this.addNatForm.timeType == 'current' ? '1' : this.addNatForm.timeValue + '',
            zoneId: $store.state.zone.zoneid,
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.addNatForm.cost = response.data.cost
            }
          })
        }
      },
      // 提交新建vpc表单
      handleNewVpcSubmit() {
        this.$refs.newFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            var url = 'network/createVPC.do'
            axios.get(url, {
              params: {
                vpcName: this.newForm.vpcName,
                displayText: this.newForm.desc,
                zoneId: $store.state.zone.zoneid,
                count: 1,
                cidr: this.newForm.vpc
              }
            }).then(response => {
              this.showModal.newVpc = false
              if (response.status == 200 && response.data.status == 1) {
                this.refresh()
                this.$Message.success({content: response.data.message})
                // this.$error('error', response.data.message)
              } else {
                this.$message.info({content: response.data.message})
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      // 提交新建网关表单
      handleNewGateSubmit() {
        this.$refs.gatewayFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            this.$Message.info('正在添加VPC互通网关，请稍候...')
            this.showModal.addGateway = false
            var url = 'network/addPrivateGateway.do'
            axios.get(url, {
              params: {
                vpcIdStart: this.addGatewayForm.originVPC,
                vpcIdEnd: this.addGatewayForm.targetVPC,
                zoneId: $store.state.zone.zoneid,
                aclIdStart: this.addGatewayForm.originFirewall,
                aclIdEnd: this.addGatewayForm.targetFirewall
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      // 提交新建nat网关表单
      handleAddNatSubmit() {
        this.$refs.addNatFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            let params = {
              isAutorenew: 0,
              natName: this.addNatForm.natName,
              vpcId: this.addNatForm.vpc,
              zoneId: $store.state.zone.zoneid,
              timeType: this.addNatForm.timeType,
              timeValue: this.addNatForm.timeValue || 1
            }
            if (this.addNatForm.publicIp == '新建弹性IP') {
              params.bandWith = this.addNatForm.IPSize
            } else {
              params.publicIpId = this.addNatForm.publicIp
            }
            axios.get('network/createNatGateway.do', {
              params
            }).then(response => {
              this.showModal.addNat = false
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              }
              if (response.status == 200 && response.data.status == 2) {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      // nat网关绑定源IP，获取所有可用的弹性IP
      bindIP(row) {
        this.showModal.bindIP = true
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: '0',
            vpcId: row.vpcid,
            status: '1'
          }
        }).then(response => {
          this.bindIPForm.IPOptions = response.data.result
        })
        this.bindIPForm.natGatewayId = row.id
      },
      // nat网关绑定源IP提交ajax
      handlebindIPSubmit() {
        this.$refs.bindIPFormValidate.validate(validate => {
          if (validate) {
            this.showModal.bindIP = false
            this.natData.forEach(item => {
              if (item.id == this.bindIPForm.natGatewayId) {
                this.$set(item, '_status', 1)
              }
            })
            this.$http.get('network/natGatewayBoundTargetIP.do', {
              params: {
                publicIp: this.bindIPForm.IP,
                natGatewayId: this.bindIPForm.natGatewayId
              }
            }).then(response => {
              this.refresh()
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // nat网关绑定目标IP，获取所有可用的弹性IP
      bindTargetIP(row) {
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: '0',
            vpcId: row.vpcid,
            status: '1'
          }
        }).then(response => {
          this.bindTargetIPForm.IPOptions = response.data.result
        })
        this.bindTargetIPForm.natGatewayId = row.id
        this.showModal.bindTargetIP = true
      },
      // nat网关绑定目标IP提交ajax
      handlebindTargetIPSubmit() {
        this.$refs.bindTargetIPFormValidate.validate(validate => {
          if (validate) {
            this.showModal.bindTargetIP = false
            this.$http.get('network/bindingElasticIP.do', {
              params: {
                publicIp: this.bindTargetIPForm.IP,
                natGatewayId: this.bindTargetIPForm.natGatewayId
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
                this.refresh()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      gotoVpc(vpcId) {
        sessionStorage.setItem('vpcId', vpcId)
        this.$router.push('/vpcManage')
      },
      buyIP() {
        sessionStorage.setItem('pane', 'Peip')
        this.$router.push('/buy/elasticip/')
      },
      restartVpcPlus(){
           let id = ''
          this.netData.forEach(item => {
              if(item.vpcid != undefined)
              id += item.vpcid+','
          });
        this.$message.confirm({
          content: '您确认恢复默认吗',
          onOk: () => {
            this.$http.get('network/restartVpc.do', {
            params: {
                vpcId: id.substring(0,id.length-1),
                cleanup: true
            }
            }).then(res => {
               if(res.status == 200 && res.data.status == 1){
                    this.$Message.success({
                        content: res.data.message
                    })
               }else{
                    this.$Message.info({
                        content: res.data.message
                    })
               }
           })
          }

        })
      },
      vpcClick(name){
          if(name == 'add'){
              this.createInterconnect();
          }
          if(name == 'delete'){
              this.delVpc();
          }
          if(name == 'reset'){
              this.restartVpcPlus();
          }
      }
    },
    computed: mapState({
      paneStatus: state => state.paneStatus,
      auth() {
        return this.$store.state.authInfo
      }
    }),
    watch: {
      renewalType(type) {
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time) {
        if (time == '') {
          this.cost = '--'
        } else {
          var selectIp = ''
          if (this.bindRenewalIp.indexOf('ip') > -1) {
            selectIp = this.isIps
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              natArr: this.select.id,
              ipIdArr: selectIp,
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.cost = response.data.result.toFixed(2)
              this.originCost = response.data.result
              if (response.data.cuspon) {
                this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      // 资费变更
      ratesChangeType(type) {
        this.ratesChangeTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      ratesChangeTime(time) {
        if (time == '') {
          this.ratesChangeCost = '--'
        } else {
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.ratesChangeTime,
              timeType: this.ratesChangeType,
              natArr: this.select.id
            }
          })
            .then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                this.ratesChangeCost = response.data.result.toFixed(2)
                this.originRatesChangeCost = response.data.result
                if (response.data.cuspon) {
                  this.originRatesChangeCost = Number((this.originRatesChangeCost + response.data.cuspon).toFixed(2))
                }
                if (response.data.continueDiscount) {
                  this.originRatesChangeCost = (this.originRatesChangeCost + response.data.continueDiscount).toFixed(2)
                }
              }
            })
        }
      },
      // 检测到新建VPC购买方式发生变化，重新查询价格
      'newForm.timeValue'() {
        this.queryVpcPrice()
      }
      ,
      // 检测到新建VPC购买方式发生变化，重新查询价格
      'newForm.timeType'() {
        this.newForm.timeValue = ''
        this.queryVpcPrice()
      }
      ,
      // 检测到添加NAT网关购买方式发生变化，重新查询价格
      'addNatForm.timeValue'() {
        this.queryNatPrice()
      }
      ,
      // 检测到添加NAT网关购买方式发生变化，重新查询价格
      'addNatForm.timeType'() {
        this.addNatForm.timeValue = ''
        this.queryNatPrice()
      }
      ,
      // 新建弹性IP
      'addNatForm.publicIp'() {
        if (this.addNatForm.publicIp === '新建弹性IP') {
          this.showModal.addNat = false
          window.open('/ip')
          // this.$router.push('ip')
        }
      }
      ,
      // 查询当前源vpc下所有防火墙
      'addGatewayForm.originVPC'() {
        var originPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.originVPC) {
            originPreArray = item.cidr.split('.')
            this.addGatewayForm.originPreIP = [originPreArray[0], originPreArray[1]]
            var url = 'network/listAclList.do'
            axios.get(url, {
              params: {
                zoneId: $store.state.zone.zoneid,
                vpcId: item.vpcid
              }
            }).then(response => {
              this.addGatewayForm.originFirewallList = response.data.result
            })
          }
        })
      }
      ,
      // 查询当前目标vpc下所有防火墙
      'addGatewayForm.targetVPC'() {
        var targetPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.targetVPC) {
            targetPreArray = item.cidr.split('.')
            this.addGatewayForm.targetPreIP = [targetPreArray[0], targetPreArray[1]]
            var url = 'network/listAclList.do'
            axios.get(url, {
              params: {
                zoneId: $store.state.zone.zoneid,
                vpcId: item.vpcid
              }
            }).then(response => {
              this.addGatewayForm.targetFirewallList = response.data.result
            })
          }
        })
      }
      ,
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        }
        ,
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.intervalInstance)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .card-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 200px;
    .card:hover {
      border: 1px solid #2A99F2;
      box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);

    }
    .card {
      width: 570px;
      height: 313px;
      padding: 20px;
      border: 1px solid #ffffff;
      margin: 0px 2px 20px;
      box-shadow: 0px 0px 2px 0 rgba(0, 0, 0, 0.20);
      &.active {
        border: 1px solid #2A99F2;
        box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);
      }
      .content {
        border-bottom: 1px solid #E9E9E9;
        .item-wrap {
          margin-bottom: 20px;
        }
        .item-wrap:nth-child(2) {
          margin-bottom: 0px;
          width: 265px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .dotted-across {
            height: 20px;
            border-right: dotted #979797 1px;
          }
        }
        .item-wrap:nth-child(3) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .dotted-vertical {
            width: 40px;
            border-top: dotted #979797 1px;
          }
        }
        .item {
          width: 265px;
          padding: 10px 20px;
          border: 1px solid #E9E9E9;
          font-size: 14px;
          p {
            span {
              color: #2A99F2;
              float: right;
            }
          }
        }
        .item1 {
          width: 530px;
          display: inline-flex;
          justify-content: space-between;
          p:nth-child(2) {
            color: #2A99F2;
          }
        }
        .item4 {
          width: 225px;
        }
      }
      .card-bottom {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        button {
          margin-left: 10px;
        }
        .btn-bgwhite {
          background: #ffffff;
          color: #2A99F2;
          &:hover {
            background: #2A99F2;
            color: #FFFFFF;
          }
        }
      }
    }
    .logo {
      width: 218px;
      height: 80px;
      background: url("../../assets/img/public/no-info-logo.png") no-repeat center;
      position: absolute;
      top: 160px;
      left: 50%;
      transform: translateX(-50%);
      & > span {
        position: absolute;
        top: 33px;
        left: 38px;
        font-size: 14px;
        color: #666666;
        letter-spacing: 10px;
        user-select: none;
        cursor: default;
      }
    }
  }
	.spanaa {
	  color: #2A99F2;
	  text-decoration: underline;
	  font-size: 12px;
	  font-family: MicrosoftYaHei;
	  cursor: pointer;
	  border: none;
	  padding: 0;
	  margin-top: -3px;
	}

	.divall {
	  background:rgba(42,153,242,0.06);
	  border-radius:2px;
	  border:1px solid rgba(42,153,242,1);
	  width: 460px;
	  height: auto;
	  padding: 10px;
	  font-size: 12px;
	}
</style>
