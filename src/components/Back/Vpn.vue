<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>VPN</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-xunizhuanwangVPN"></use>
          </svg>
          <span id="title">VPN</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
        </div>

        <Tabs type="card" :animated="false" v-model="paneStatus.vpn">
          <TabPane label="远程接入" name="remote">
            <div class="operator-bar">
              <Button type="primary" @click="newRemoteAccess">创建VPN接入点</Button>
              <Button type="primary" @click="delRemoteAccess">挂断VPN接入</Button>
              <Table :columns="remoteVpnColumns" :data="remoteVpnData" @radio-change="remoteRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
          <TabPane label="隧道VPN" name="VPN">
            <div class="operator-bar">
              <Button type="primary" @click="newTunnelVpn">创建隧道</Button>
              <!--<Button type="primary">重启隧道</Button>-->
              <Button type="primary" @click="delTunnelVpn">删除隧道</Button>
              <Button type="primary" @click="restartVpn">重启连接</Button>
              <Table :columns="tunnelVpnColumns" :data="tunnelVpnData" @radio-change="tunnelRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 新建vpn接入点 modal -->
    <Modal v-model="showModal.newRemoteAccess" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新增VPN接入点</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newRemoteAccessForm" :rules="newRemoteAccessFormValidate" ref="newRemoteAccessFormValidate">
          <FormItem label="接入点名称" prop="vpnName">
            <Input v-model="newRemoteAccessForm.vpnName" placeholder="请输入接入点名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpcId">
            <Select v-model="newRemoteAccessForm.vpcId" @on-change="isHaveNat">
              <Option v-for="item in newRemoteAccessForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="newRemoteAccessForm.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="newRemoteAccessForm.password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="newRemoteAccessOk">完成配置</Button>
      </div>
    </Modal>

    <!-- 新建vpn隧道 modal -->
    <Modal v-model="showModal.newTunnelVpn" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建隧道</span>
      </p>
      <Steps :current="newTunnelVpnForm.step" size="small">
        <Step title="创建本地网关"></Step>
        <Step title="创建客户网关"></Step>
        <Step title="创建连接"></Step>
      </Steps>
      <div class="universal-modal-content-flex">
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate0">
          <FormItem label="源VPC" prop="vpcId1" v-show="newTunnelVpnForm.step==0">
            <Select v-model="newTunnelVpnForm.vpcId1">
              <Option v-for="item in newTunnelVpnForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=newTunnelVpnForm.vpcId2">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <Form :model="newTunnelVpnForm" v-if="newTunnelVpnForm.step==1" :rules="newTunnelVpnFormValidate"
              ref="newTunnelVpnFormValidate1">
          <FormItem label="名称" prop="name1">
            <Input v-model="newTunnelVpnForm.name1" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <FormItem label="对端源IP地址" prop="IP">
            <Input v-model="newTunnelVpnForm.IP" placeholder="例如10.132.31.27"></Input>
          </FormItem>
          <FormItem label="对端网络CIDR" prop="CIDR">
            <Input v-model="newTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16"></Input>
          </FormItem>
          <FormItem label="预共享密钥" prop="key">
            <Input v-model="newTunnelVpnForm.key" placeholder="请输入0-128字节密码"></Input>
          </FormItem>
        </Form>
        <p v-if="newTunnelVpnForm.step==1" style="opacity: 0.8;text-align: right;">本端的共享密钥必须和对端的共享密钥一致</p>
        <span style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="newTunnelVpnForm.showDetail=true"
              v-show="!newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            高级选项&nbsp;
          </span>
        <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="newTunnelVpnForm.showDetail=false"
              v-show="newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            隐藏高级选项
          </span>

        <!--高级选项FormItem-->
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="IKE加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKE">
              <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESP">
              <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKEHash">
              <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESPHash">
              <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE DH算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKEDH">
              <Option v-for="item in newTunnelVpnForm.IKEDHoptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="完全正向保密" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.secret">
              <Option v-for="item in newTunnelVpnForm.secretOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <InputNumber v-model="newTunnelVpnForm.ikelifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="ESP使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <InputNumber v-model="newTunnelVpnForm.esplifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">

            <Checkbox v-model="newTunnelVpnForm.checkGroup1">失效对等检测</Checkbox>

          </FormItem>
          <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">

            <Checkbox v-model="newTunnelVpnForm.checkGroup2">Force UDP</Checkbox>

          </FormItem>

        </Form>

        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="连接方式" v-if="newTunnelVpnForm.step==2" prop="password">
            <Select v-model="newTunnelVpnForm.connType">
              <Option v-for="item in newTunnelVpnForm.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <Poptip trigger="hover" style="float: right;position: relative;right: 250px;top: 40px;"
                  v-if="newTunnelVpnForm.step==2">
            <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
            <div slot="content">
              <div>
                <p style="line-height: 20px;">注意在选择连接方式的时候:</p>
                <p style="line-height: 18px;">本端连接方式选择的是主动,对端的连接方式必须是被动。</p>
                <p style="line-height: 18px;">本端连接方式选择的是被动,对端的连接方式必须是主动。</p>
              </div>
            </div>
          </Poptip>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.newTunnelVpn = false" v-if="newTunnelVpnForm.step==0">取消</Button>
        <Button @click="newTunnelVpnForm.step--" v-if="newTunnelVpnForm.step!=0">上一步</Button>
        <Button type="primary" @click="nextStep" v-if="newTunnelVpnForm.step!=2">下一步</Button>
        <Button type="primary" @click="newTunnelVpnOk" v-if="newTunnelVpnForm.step==2">完成</Button>
      </div>
    </Modal>

    <!--vpn修改配置-->
    <Modal v-model="showModal.FixVPN" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改配置</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="modifyTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate1">
          <FormItem label="名称" prop="name1">
            <Input v-model="modifyTunnelVpnForm.name1" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <FormItem label="对端源IP地址" prop="IP">
            <Input v-model="modifyTunnelVpnForm.IP" placeholder="例如10.132.31.27"></Input>
          </FormItem>
          <FormItem label="对端网络CIDR" prop="CIDR">
            <Input v-model="modifyTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16"></Input>
          </FormItem>
          <FormItem label="预共享密钥" prop="key">
            <Input v-model="modifyTunnelVpnForm.key" placeholder="请输入0-128字节密码"></Input>
          </FormItem>
        </Form>
        <p style="opacity: 0.8;text-align: right;">本端的共享密钥必须和对端的共享密钥一致</p>
        <span style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="modifyTunnelVpnForm.showDetail=true"
              v-show="!modifyTunnelVpnForm.showDetail">
            高级选项&nbsp;
          </span>
        <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="modifyTunnelVpnForm.showDetail=false"
              v-show="modifyTunnelVpnForm.showDetail">
            隐藏高级选项
          </span>

        <!--高级选项FormItem-->
        <Form :model="modifyTunnelVpnForm" :rules="newTunnelVpnFormValidate">
          <FormItem label="IKE加密算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKE">
              <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP加密算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.ESP">
              <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE哈希算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKEHash">
              <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP哈希算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.ESPHash">
              <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE DH算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKEDH">
              <Option v-for="item in newTunnelVpnForm.IKEDHoptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="完全正向保密" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.secret">
              <Option v-for="item in newTunnelVpnForm.secretOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE使用期限第二阶段" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <InputNumber v-model="modifyTunnelVpnForm.ikelifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="ESP使用期限第二阶段" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <InputNumber v-model="modifyTunnelVpnForm.esplifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">

            <Checkbox v-model="modifyTunnelVpnForm.checkGroup1">失效对等检测</Checkbox>

          </FormItem>
          <FormItem label="" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">

            <Checkbox v-model="modifyTunnelVpnForm.checkGroup2">Force UDP</Checkbox>

          </FormItem>

        </Form>

      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.FixVPN = false">取消</Button>
        <Button type="primary" @click="fixConfig">完成</Button>
      </div>
    </Modal>

    <!--修改连接方式-->
    <Modal v-model="showModal.FixVPNContent" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改连接方式</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate">
          <FormItem label="连接方式" prop="password">
            <Select v-model="modifyForm.connectType">
              <Option v-for="item in newTunnelVpnForm.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <Poptip trigger="hover" style="float: right;position: relative;right: 250px;top: 40px;">
            <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
            <div slot="content">
              <div>
                <p style="line-height: 20px;">注意在选择连接方式的时候:</p>
                <p style="line-height: 18px;">本端连接方式选择的是主动,对端的连接方式必须是被动。</p>
                <p style="line-height: 18px;">本端连接方式选择的是被动,对端的连接方式必须是主动。</p>
              </div>
            </div>
          </Poptip>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.FixVPNContent = false">取消</Button>
        <Button type="primary" @click="modifyConnection">确认</Button>
      </div>
    </Modal>
    <!-- 接入点用户管理 modal -->
    <Modal v-model="showModal.userManage" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">接入点用户管理</span>
      </p>
      <div>
        <p style="color: rgba(17,17,17,0.65);margin-bottom: 20px">您在对接入点进行用户管理</p>
        <div>
          <p v-for="(item,index) in userList" :key="item"
             style="display: flex;font-size: 12px;color: rgba(17,17,17,0.65);margin-bottom: 20px">
            <span style="width:60%">{{item.name||item}}</span>
            <span style="width:30%">用户密码：**********</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==1">创建中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==2">删除中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-else
                  @click="delUser(item,index)">删除</span>
          </p>
        </div>
        <div class="universal-modal-content-flex">
          <Form :model="addUserForm" :rules="addUserFormValidate" ref="addUserFormValidate">
            <FormItem label="用户名称" prop="userName">
              <Input v-model="addUserForm.userName" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="addUserForm.password" placeholder="请输入密码"></Input>
            </FormItem>
          </Form>
          <div style="clear: both"></div>
        </div>
        <p style="color:#999999">提示：若您忘记用户密码，可删除该账户并重新添加新的用户名与密码。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="addUser">确定添加</Button>
      </div>
    </Modal>
    <!-- 只有一个vpc时创建互联-->
    <Modal v-model="showModal.notHaveNAT" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>提示</strong>
          <p class="lh24">VPC不存在NAT网关或者NAT网关没有绑定公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.notHaveNAT = false">取消</Button>
        <Button type="primary" @click="createNAT">创建NAT网关</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  import {mapState} from 'vuex'

  export default {
    beforeRouteEnter(from, to, next) {
      // 远程接入列表
      var remote = axios.get('network/listRemoteVpn.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      // 隧道VPN
      var customer = axios.get('network/listVpnCustomerGateways.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      })
      Promise.all([remote, customer]).then(values => {
        next(vm => {
          vm.initRemoteData(values[0])
          vm.initCustomerData(values[1])
        })
      })
    },
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      var pane = sessionStorage.getItem('pane') || 'remote'
      sessionStorage.removeItem('pane')
      // 校验接入点用户名
      const validateUserName = (rule, value, callback) => {
        if (!/^\w{1,6}$/.test(value)) {
          callback(new Error('用户名由1-6位字母或数字组成'))
        }
        callback()
      }
      const validalength = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        }
        if (value.length > 8) {
          callback(new Error('长度小于等于8位'))
        } else {
          callback()
        }
      }
      return {
        $store,
        loadingMessage: '',
        loading: false,
        showModal: {
          // 远程VPN
          newRemoteAccess: false,
          // 隧道VPN
          newTunnelVpn: false,
          // vpn 修改
          FixVPN: false,
          FixVPN1: false,
          FixVPNContent: false,
          // 接入点用户管理
          userManage: false,
          notHaveNAT: false
        },
        // 新建vpc接入点表单
        newRemoteAccessForm: {
          userName: '',
          password: '',
          vpcId: '',
          vpcIdOptions: [],
          vpnName: ''
        },
        newRemoteAccessFormValidate: {
          userName: [
            {required: true, validator: validalength, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          vpcId: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpnName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
        },
        // 新建隧道VPN表单
        newTunnelVpnForm: {
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP: '',
          gateway: '',
          CIDR: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          IKEDH: 'modp1536',
          IKEDHoptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          secret: 'modp1536',
          secretOptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          ikelifetime: 86400,
          esplifetime: 3600,
          checkGroup1: true,
          checkGroup2: true,
          showDetail: false,
          step: 0
        },
        modifyTunnelVpnForm: {
          customerVPNid: '',
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP: '',
          gateway: '',
          CIDR: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          IKEDH: 'modp1536',
          IKEDHoptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          secret: 'modp1536',
          secretOptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          ikelifetime: 86400,
          esplifetime: 3600,
          checkGroup1: true,
          checkGroup2: true,
          showDetail: false,
        },
        newTunnelVpnFormValidate: {
          vpcId1: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpcId2: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          name1: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          name2: [
            {required: true, message: '请输入隧道名称', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '请输入预共享密钥', trigger: 'blur'}
          ],
          IP: [
            {required: true, message: '请输入对端源IP地址', trigger: 'blur'}
          ],
          CIDR: [
            {required: true, message: '请输入对端网络CIDR', trigger: 'blur'}
          ],
        },
        // 远程vpn列表
        remoteVpnColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: 'VPN',
            width: 120,
            key: 'remoteVpnName'
          },
          {
            title: '预共享密钥',
            width: 260,
            key: 'ipseckey'
          },
          {
            title: '弹性IP地址',
            width: 200,
            key: 'publicip'
          },
          {
            title: '用户名',
            width: 160,
            render: (h, object) => {
              var resultArr = []
              var arr = object.row.username.split(',')
              for (var i = 0; i < arr.length; i++) {
                resultArr.push(h('p', {style: {lineHeight: '1.5'}}, arr[i]))
              }
              return h('div', resultArr)
            }
          },
          {
            title: '创建时间',
            width: 220,
            key: 'createtime'
          },
          {
            title: '操作',
            render: (h, object) => {
              if (object.row.status) {
                let message = object.row.status == 1 ? '正在创建VPN接入点...' : '正在删除VPN接入点...'
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, message)])
              }
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.current = object.row
                    this.listUser()
                    this.showModal.userManage = true
                  }
                }
              }, '管理用户')
            }
          }
        ],
        remoteVpnData: [],
        // 隧道vpn
        tunnelVpnColumns: [
          {
            type: 'radio',
            align: 'center',
            width: 60,
          },
          {
            title: '本端CIDR',
            key: 'localcidr'
          },
          {
            title: '本端IP地址',
            key: 'localgateway',
          },
          {
            title: '对端IP地址',
            key: 'targetdestinationipaddress'
          },
          {
            title: '对端网络CIDR',
            key: 'targetcidr',
          },
          {
            title: '状态',
            key: 'sourcestatus',
            render: (h, obj) => {
              var text = ''
              switch (obj.row.sourcestatus) {
                case '-2':
                  text = '创建中'
                  break
                case '-3':
                  text = '重新连接中'
                  break
                case '-4':
                  text = '修改连接方式中'
                  break
                case '-5':
                  text = '修改配置中'
                  break
              }
              if (text) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, text)])
              }
              if (obj.row.sourcestatus == -2) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '创建中')])
              }
              else if (obj.row.sourcestatus == -1) {
                text = '异常'
              }
              else if (obj.row.sourcestatus == 2) {
                text = '未连接'
              }
              else if (obj.row.sourcestatus == 1) {
                if (obj.row.passive == 'false') {
                  text = '已连接（主动）'
                } else {
                  text = '已连接（被动）'
                }
              }
              return h('span', {}, text)
            }
          },
          {
            title: '预共享秘钥',
            key: 'sourceipsecKey'
          },
          {
            title: '操作',
            width: 200,
            render: (h, params) => {
              let operateList = []
              let style = {
                marginRight: '10px',
                color: '#2A99F2',
                cursor: 'pointer'
              }
              // 异常提交工单
              switch (params.row.sourcestatus) {
                case '-1':
                  operateList.push(h('span', {
                    style,
                    on: {
                      click: () => {
                        this.$router.push('work')
                      }
                    }
                  }, '提交工单'))
                  break
                // 已断开连接 重新连接
                case '2':
                  operateList.push(h('span', {
                    style,
                    on: {
                      click: () => {
                        this.$message.confirm({
                          content: '确认重新连接？',
                          scrollable: true,
                          onOk: () => {
                            this.connect(params.row)
                          }
                        })
                      }
                    }
                  }, '重新连接'))
                  operateList.push(h('span', {
                    style,
                    on: {
                      click: () => {
                        this.modifyTunnelVpnForm.customerVPNid = params.row.customerVPNid
                        this.modifyTunnelVpnForm.name1 = params.row.customername
                        this.modifyTunnelVpnForm.IP = params.row.targetdestinationipaddress
                        this.modifyTunnelVpnForm.CIDR = params.row.targetcidr
                        this.modifyTunnelVpnForm.key = params.row.sourceipsecKey
                        this.modifyTunnelVpnForm.IKE = params.row.ikeencryption
                        this.modifyTunnelVpnForm.ESP = params.row.espencryption
                        this.modifyTunnelVpnForm.IKEHash = params.row.ikehash
                        this.modifyTunnelVpnForm.ESPHash = params.row.esphash
                        this.modifyTunnelVpnForm.IKEDH = params.row.ikedhalgorithm

                        this.modifyTunnelVpnForm.secret = params.row.completesecrecy
                        this.modifyTunnelVpnForm.ikelifetime = params.row.ikelifetime
                        this.modifyTunnelVpnForm.esplifetime = params.row.esplifetime
                        this.modifyTunnelVpnForm.checkGroup1 = Boolean(params.row.failureDetection == 'true')
                        this.modifyTunnelVpnForm.checkGroup2 = Boolean(params.row.forceUdpEspPackets == 'true')
                        this.showModal.FixVPN = true
                      }
                    }
                  }, '修改配置'))
                  break
                // 已连接 断开连接
                case '1':
                  operateList.push(h('span', {
                    style,
                    on: {
                      click: () => {
                        this.$message.confirm({
                          content: '确认断开连接？',
                          scrollable: true,
                          onOk: () => {
                            this.disconnect(params.row.sourcevpnconId)
                          }
                        })
                      }
                    }
                  }, '断开连接'))
                  operateList.push(h('span', {
                    style,
                    on: {
                      click: () => {
                        this.modifyForm.connectType = params.row.passive
                        this.modifyForm.sourcevpnconId = params.row.sourcevpnconId
                        this.modifyForm.sourcevpnId = params.row.sourcevpnId
                        this.showModal.FixVPNContent = true
                      }
                    }
                  }, '修改连接方式'))
                  break
              }
              return h('div', {}, operateList)
            }
          }
        ],
        tunnelVpnData: [],
        // 管理用户列表
        userList: [],
        // 远程VPN id
        current: null,
        // 添加用户Form表单
        addUserForm: {
          userName: '',
          password: '',
        },
        addUserFormValidate: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validateUserName, trigger: 'blur'}
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        // 当前选中远程接入
        currentRemote: null,
        currentTunnel: null,
        modifyForm: {
          sourcevpnId: '',
          connectType: '',
          sourcevpnconId: ''
        }

      }
    },
    methods: {
      // 切换地区重新获取数据
      refresh() {
        // 远程接入列表
        var remote = axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        })
        // 隧道VPN
        var customer = axios.get('network/listVpnCustomerGateways.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
          }
        })
        Promise.all([remote, customer]).then(values => {
          this.initRemoteData(values[0])
          this.initCustomerData(values[1])
          this.currentTunnel = null
          this.currentRemote = null
        })
      },
      initRemoteData(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.remoteVpnData = response.data.result
        }
      },
      initCustomerData(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.tunnelVpnData = response.data.result
        }
      },
      // 打开远程接入modal
      newRemoteAccess() {
        this.showModal.newRemoteAccess = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newRemoteAccessForm.vpcIdOptions = response.data.result
        })
      },
      isHaveNat(val) {
        let url = 'network/isNatWay.do'
        this.$http.get(url, {
          params: {
            vpcId: val
          }
        }).then(res => {
          if (res.data.status == 1 && !res.data.result) {
            this.showModal.newRemoteAccess = false
            this.showModal.notHaveNAT = true
          }
        })
      },
      createNAT() {
        sessionStorage.setItem('VPN','VPN')
        this.$router.push('vpc')
      },
      // 提交远程接入请求
      newRemoteAccessOk() {
        this.$refs.newRemoteAccessFormValidate.validate(validate => {
          if (validate) {
            this.showModal.newRemoteAccess = false
            this.remoteVpnData.push({
              vpcname: this.newRemoteAccessForm.vpnName,
              ipseckey: '******',
              publicip: '******',
              username: '',
              // 状态1代表创建中
              status: 1
            })
            this.$http.get('network/createRemoteAccessVpn.do', {
              params: {
                remoteVpnName: this.newRemoteAccessForm.vpnName,
                vpcId: this.newRemoteAccessForm.vpcId,
                userName: this.newRemoteAccessForm.userName,
                password: this.newRemoteAccessForm.password
              }
            }).then(response => {
              this.refresh()
              if (response.status == 200 && response.data.status == 1) {
                this.$message.info({
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
        this.showModal.newTunnelVpn = false

      },
      // 打开创建隧道VPN modal
      newTunnelVpn() {
        this.showModal.newTunnelVpn = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newTunnelVpnForm.vpcIdOptions = response.data.result
        })
      },
      nextStep() {
        this.$refs[`newTunnelVpnFormValidate${this.newTunnelVpnForm.step}`].validate(validate => {
          if (validate) {
            this.newTunnelVpnForm.step++
          }
        })
      },
      // 提交新建VPN隧道请求
      newTunnelVpnOk() {
        this.showModal.newTunnelVpn = false
        this.newTunnelVpnForm.step = 0
        this.newTunnelVpnForm.showDetail = false
        let localcidr, localgateway
        this.newTunnelVpnForm.vpcIdOptions.forEach(item => {
          if (this.newTunnelVpnForm.vpcId1 == item.vpcid) {
            localcidr = item.cidr
            localgateway = item.sourcenatip
          }
        })
        this.tunnelVpnData.push({
          localcidr,
          localgateway,
          targetdestinationipaddress: this.newTunnelVpnForm.IP,
          targetcidr: this.newTunnelVpnForm.CIDR,
          sourcestatus: '-2',
          sourceipsecKey: this.newTunnelVpnForm.key,
          sourcecreatetime: '创建中'
        })
        this.$http.get('network/createTunnelVpn.do', {
          params: {
            vpcId: this.newTunnelVpnForm.vpcId1, // 源vpcid   目标vpcid
            // targetVpcId: this.newTunnelVpnForm.vpcId2, // 源vpcid   目标vpcid
            name: this.newTunnelVpnForm.name1, // 源vpcid   目标vpcid  名称1
            // nameTwo: this.newTunnelVpnForm.name2, // 源vpcid   目标vpcid
            destinationIpAddress: this.newTunnelVpnForm.IP,
            cidr: this.newTunnelVpnForm.CIDR,
            ipsecKey: this.newTunnelVpnForm.key,
            ikeEncryption: this.newTunnelVpnForm.IKE,
            ikeHash: this.newTunnelVpnForm.IKEHash,
            espEncryption: this.newTunnelVpnForm.ESP,
            espHash: this.newTunnelVpnForm.ESPHash,
            passive: this.newTunnelVpnForm.connType,
            completeSecrecy: this.newTunnelVpnForm.secret,
            ikeDH: this.newTunnelVpnForm.IKEDH,
            ikelifetime: this.newTunnelVpnForm.ikelifetime,
            esplifetime: this.newTunnelVpnForm.esplifetime,
            failureDetection: this.newTunnelVpnForm.checkGroup1,
            forceUdpEspPackets: this.newTunnelVpnForm.checkGroup2,

          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.refresh()
            this.$Message.success({
              content: response.data.message
            })
          } else {
            this.refresh()
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 选中远程接入
      remoteRadio(current) {
        this.currentRemote = current
      },
      // 选中隧道VPN
      tunnelRadio(current) {
        this.currentTunnel = current
      },
      // 挂断VPN接入
      delRemoteAccess() {
        if (this.currentRemote == null) {
          this.$Message.info({
            content: '请选择要挂断的远程VPN接入'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该远程VPN接入吗',
            onOk: () => {
              this.remoteVpnData.forEach(item => {
                if (item.id == this.currentRemote.id) {
                  // status为2代表正在删除
                  this.$set(item, 'status', 2)
                }
              })
              this.$http.get('network/deleteRemoteAccessVpn.do', {
                params: {
                  id: this.currentRemote.id
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
      },
      // 删除隧道VPN
      delTunnelVpn() {
        if (this.currentTunnel == null) {
          this.$Message.info({
            content: '请选择要删除的隧道VPN'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该隧道VPN吗',
            onOk: () => {
              this.$http.get('network/deleteTunnelVpn.do', {
                params: {
                  s2sVpnGatewayId: this.currentTunnel.sourcevpnId,
                  vpcId: this.currentTunnel.sourcevpcId,
                  zoneId: $store.state.zone.zoneid

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
                  this.refresh()
                }
              })
            }
          })
        }
      },
      //vpn 删除连接
      disconnect(sourcevpnconId) {
        this.$http.get('network/deleteVpnConnection.do', {
          params: {
            id: sourcevpnconId
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
            this.refresh()
          }
        })
      },
      // vpn 重新连接
      connect(row) {
        this.tunnelVpnData.forEach(item => {
          if (item.sourcevpnId == row.sourcevpnId) {
            this.$set(item, 'sourcestatus', '-3')
          }
        })
        this.$http.get('network/createVpnConnection.do', {
          params: {
            s2sVpnGatewayid: row.sourcevpnId,
            s2sCustomerGatewayid: row.customerVPNid,
            passive: false
          }
        }).then(response => {
          this.refresh()
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // vpn 修改配置
      fixConfig() {
        this.showModal.FixVPN = false
        this.tunnelVpnData.forEach(item => {
          if (item.customerVPNid == this.modifyTunnelVpnForm.customerVPNid) {
            this.$set(item, 'sourcestatus', '-5')
          }
        })
        this.$http.post('network/updateVpnCustomerGateway.do', {
          customerGatewayId: this.modifyTunnelVpnForm.customerVPNid,
          targetCidr: this.modifyTunnelVpnForm.CIDR,
          targetIP: this.modifyTunnelVpnForm.IP,
          ipsecKey: this.modifyTunnelVpnForm.key,
          name: this.modifyTunnelVpnForm.name1,
          ikeEncryption: this.modifyTunnelVpnForm.IKE,
          ikeHash: this.modifyTunnelVpnForm.IKEHash,
          espEncryption: this.modifyTunnelVpnForm.ESP,
          espHash: this.modifyTunnelVpnForm.ESPHash,
          completeSecrecy: this.modifyTunnelVpnForm.secret,
          ikeDH: this.modifyTunnelVpnForm.IKEDH,
          ikelifetime: this.modifyTunnelVpnForm.ikelifetime,
          esplifetime: this.modifyTunnelVpnForm.esplifetime,
          failureDetection: this.modifyTunnelVpnForm.checkGroup1,
          forceUdpEspPackets: this.modifyTunnelVpnForm.checkGroup2,
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
            this.refresh()
          }
        })
      },
      // 修改连接方式
      modifyConnection() {
        this.showModal.FixVPNContent = false
        this.tunnelVpnData.forEach(item => {
          if (item.sourcevpnId == this.modifyForm.sourcevpnId) {
            this.$set(item, 'sourcestatus', '-4')
          }
        })
        this.$http.get('network/updateVpnConnection.do', {
          params: {
            vpnconId: this.modifyForm.sourcevpnconId,
            passive: this.modifyForm.connectType
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
            this.refresh()
          }
        })
      },
      // 重启VPN
      restartVpn() {
        if (this.currentTunnel == null) {
          this.$Message.info({
            content: '请选择要重启隧道VPN'
          })
          return
        } else (
          this.$message.confirm({
            content: '确认重启连接？',
            onOk: () => {
              if (this.currentTunnel.sourcestatus == 1) {
                this.$http.get('network/resetVpnConnection.do', {
                  params: {
                    zoneId: $store.state.zone.zoneid,
                    vpnConnectionId: this.currentTunnel.sourcevpnconId
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
                    this.refresh()
                  }
                })
              } else {
                this.$Message.info({
                  content: '请先连接在重启连接'
                })
              }
            }

          })
        )
      },
      // 列出所有用户
      listUser() {
        this.$http.get('network/listVpnUsers.do', {
          params: {
            remoteVpnId: this.current.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.userList = response.data.result
          }
        })
      },
      // 远程vpn数据
      remoteData() {
        axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.remoteVpnData = response.data.result
          }
        })
      },
      // 用户管理添加用户
      addUser() {
        this.$refs.addUserFormValidate.validate(validate => {
          if (validate) {
            // status   1：创建中  2：删除中
            this.userList.push({name: this.addUserForm.userName, status: 1})
            this.$http.get('network/addVpnUser.do', {
              params: {
                vpcId: this.current.vpcid,
                userName: this.addUserForm.userName,
                password: this.addUserForm.password,
                remoteVpnId: this.current.id,
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.listUser()
                this.remoteData()
              } else {
                this.$Message.error(response.data.message)
              }
            })
            this.addUserForm.userName = ''
            this.addUserForm.password = ''
          }
        })
      },
      // 删除用户
      delUser(userName, index) {
        this.userList.splice(index, 1, {
          name: userName,
          status: 2
        })
        this.$http.get('network/removeVpnUser.do', {
          params: {
            userName,
            remoteVpnId: this.current.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listUser()
            this.remoteData()
          } else {
            this.$message.info(response.data.message)
          }
        })
      }
    },
    watch: {
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        }
        ,
        deep: true
      }
    },
    computed: mapState({
      paneStatus: state => state.paneStatus,
      auth() {
        return this.$store.state.authInfo != null
      }
    })
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
