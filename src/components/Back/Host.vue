<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>主机</span>
      </span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/host/cloudhost-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">云主机</span>
          <button id="refresh_button" @click="$router.go(0)">刷新</button>
        </div>
        <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
          <router-link to="/ruicloud/userCenter">立即认证</router-link>
        </Alert>
        <div class="universal-alert">
          <p>为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="startUp">一键启动</Button>
          <Button type="primary" @click="joinBalance" :disabled="status!='开启'">加入负载均衡</Button>
          <Button type="primary" @click="bindIP" :disabled="status!='开启'&&status!='关机'">绑定IP</Button>
          <Dropdown style="margin-left: 10px;vertical-align: middle;" @on-click="hideEvent" class="moreOperation">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <!-- 重命名 -->
              <Dropdown-item name="rename" v-if="status=='欠费'||status=='异常'" :disabled=true>重命名</Dropdown-item>
              <Dropdown-item name="rename" v-else>重命名</Dropdown-item>
              <!-- 续费 -->
              <Dropdown-item name="renewal" v-if="status=='欠费'||status=='异常'" :disabled=true>主机续费</Dropdown-item>
              <Dropdown-item name="renewal" v-else>主机续费</Dropdown-item>
              <!-- 备份 -->
              <Dropdown-item name="backup" v-if="status!='开启'&&status!='关机'" :disabled=true>
                <Tooltip content="异常、欠费状态，快照不可用" placement="top">
                  创建快照
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="backup" v-else>创建快照</Dropdown-item>
              <!-- 镜像 -->
              <Dropdown-item name="mirror" v-if="status!='关机'" :disabled=true>
                <Tooltip content="制作镜像前您必须关闭主机" placement="top">
                  制作镜像
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="mirror" v-else>制作镜像</Dropdown-item>
              <!-- 升级主机 -->
              <Dropdown-item name="upgrade" v-if="status!='关机'" :disabled=true>
                <Tooltip content="升级主机前您必须关闭主机" placement="top">
                  主机升级
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="upgrade" v-else>
                升级
              </Dropdown-item>

              <!-- 重启主机 -->

              <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认重启主机吗？"
                @on-ok="reboot"
                @on-cancel="cancel">
                <li class="del" v-if="status!='欠费'&&status!='异常'" :disabled=true>重启主机</li>
              </Poptip>

              <!-- 删除主机 -->

              <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认删除这台主机吗？"
                @on-ok="del"
                @on-cancel="cancel"
                style="display: block">
                <li class="del" v-if="status!='欠费'&&status!='异常'" :disabled=true>删除主机</li>
              </Poptip>


              <!-- 解绑主机 -->

              <!-- <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认解绑主机IP吗？"
                @on-ok="unbind"
                @on-cancel="cancel"
                style="display: block">
                <li class="del" v-if="status!='欠费'&&status!='异常'" :disabled=true>解绑公网IP</li>
              </Poptip> -->

            </Dropdown-menu>
          </Dropdown>
        </div>
        <div>
          <Tabs type="card" :animated="false" v-model="status">

            <Tab-pane :label="`开启(${openHost.length+waitHost.length})`" name="开启">
              <div class="flex-wrapper">
                <!-- 创建中主机列表 -->
                <div v-for="(item,index) in waitHost" :key="index" :class="{select:item.select}"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1 v-if="item.computername">{{item.computername}}</h1>
                          <h1 v-else>创建中</h1>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span>创建中</span>
                      </div>
                      <div class="foot">
                        <span>{{item.createtime}}</span>
                      </div>
                    </div>
                  </Card>
                </div>


                <div v-for="(item,index) in openHost" v-if="item.status==1" :key="index" :class="{select:item.select}"
                     @click="toggle(item)"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                          <i v-if="auth" class="normal" @click="stop(item)">
                            <i class="ico">|</i>
                          </i>
                          <i v-else class="normal">
                            <i class="ico">|</i>
                          </i>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span v-if="!auth">公网地址:*******</span>
                        <span v-else>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span v-if="item.restart==1">重启中</span>
                        <span v-else>运行中</span>
                      </div>
                      <div class="foot">
                        <span>{{item.createtime}}</span>
                        <Button @click.stop="manage(item,'normal')" style="margin-left:55px;" :disabled="!auth"
                                :class="{btnnormal:auth}" class="_hover">管理
                        </Button>
                        <Button v-if="!auth" :disabled="!auth">连接主机</Button>
                        <a v-else :href="item.connecturl" target="_blank"
                           style="line-height: 30px;border: 1px solid;border-radius: 4px;width: 76px;" class="_hover">连接主机</a>
                      </div>
                    </div>
                  </Card>
                </div>

                <!-- 关机中中主机列表 -->
                <div v-for="(item,index) in openHost" v-if="item.status==2" :key="index" :class="{select:item.select}"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span>关机中</span>
                      </div>
                      <div class="foot">
                        <span>{{item.createtime}}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div @click="createHost">
                  <Card style="width:375px;height:228px;">
                    <div
                      style="height: 224px;pxcursor:pointer"
                      @click="gotoNew">
                      <i class="add"></i>
                      <i class="add" style="transform: translate(-50%,-50%) rotate(90deg);"></i>

                    </div>
                  </Card>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane :label="`异常(${errorHost.length})`" name="异常">
              <div class="flex-wrapper">
                <div v-for="(item,index) in errorHost" :key="index" :class="{select:item.select}" @click="toggle(item)"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span style="color:#f24747;top:112px">异常</span>
                      </div>
                      <div class="foot" style="background-color: #F24747">
                        <span style="color:white">{{item.createtime}}</span>
                        <button @click="recoverHost(item.id)"
                                style="margin-left: 55px;color: rgb(242, 71, 71);background-color: white;border-color: white;">
                          恢复
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div v-if="errorHost.length==0" class="logo">
                  <span>您的云主机很健康，请继续保持哦</span>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane :label="`欠费(${arrearsHost.length})`" name="欠费">
              <div class="flex-wrapper">
                <div v-for="(item,index) in arrearsHost" :key="index" :class="{select:item.select}"
                     @click="toggle(item)"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span style="color:#FFC439">欠费</span>
                      </div>
                      <div class="foot" style="background-color: #ffc439">
                        <span style="color:white">{{item.createtime}}</span>
                        <button @click="renewHost(item.id)"
                                style="margin-left: 55px;color: #ffc439;background-color: white;border-color: white;">续费
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div v-if="arrearsHost.length==0" class="logo">
                  <span style="left:60px">暂无欠费云主机</span>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane :label="`关机(${closeHost.length})`" name="关机">
              <div class="flex-wrapper">
                <div v-for="(item,index) in closeHost" v-if="item.status==1" :key="index" :class="{select:item.select}"
                     @click="toggle(item)"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                          <i v-if="auth" class="normal" @click="start(item)">
                            <i class="ico">|</i>
                          </i>
                          <i v-else class="normal">
                            <i class="ico">|</i>
                          </i>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span>关机</span>
                      </div>
                      <div class="foot" style="background-color: #D9D9D9">
                        <span style="color: rgba(17,17,17,0.65);">{{item.createtime}}</span>
                        <Button @click.stop="manage(item,'close')" style="margin-left:55px;" :disabled="!auth"
                                :class="{btnnormal:auth}" class="_hover">管理
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                <!-- 开机中中主机列表 -->
                <div v-for="(item,index) in closeHost" v-if="item.status==2" :key="index" :class="{select:item.select}"
                     style="margin-bottom: 20px;height:228px;">
                  <Card style="width:375px;height:228px;">
                    <div style="text-align:center">
                      <div class="head">
                        <div class="info">
                          <h1>{{item.computername}} | {{item.instancename}}</h1>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统:{{item.templatename}}</span>
                        <span>到期时间/有效期:{{item.endtime}}</span>
                        <span>公网地址:{{item.publicip}}</span>
                        <span>内网地址:{{item.privateip}}</span>
                        <span>开机中</span>
                      </div>
                      <div class="foot">
                        <span>{{item.createtime}}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div v-if="closeHost.length==0" class="logo">
                  <span style="left:60px">暂无关机云主机</span>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>

    <!-- 创建快照弹窗 -->
    <Modal v-model="showModal.backup" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建快照</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">您正为<span class="bluetext">主机名称</span>创建快照</p>
        <Form :model="backupForm" ref="backupForm">
          <FormItem label="快照名称">
            <Input v-model="backupForm.backupName" placeholder="请输入2-4094范围内任意数字"></Input>
          </FormItem>
          <FormItem label="是否保存内存信息">
            <RadioGroup v-model="backupForm.radio">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backup=false">取消</Button>
        <Button type="primary" :disabled="backupForm.backupName==''" @click="backup">创建快照</Button>
      </div>
    </Modal>
    <!-- 主机重命名弹窗 -->
    <Modal v-model="showModal.rename" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">主机重命名</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="renameForm">
          <Form-item label="主机名">
            <Input v-model="renameForm.hostName" placeholder="请输入新主机名" :maxlength="15"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.rename = false">取消</Button>
        <Button type="primary" :disabled="renameForm.hostName==''" @click="rename">确定
        </Button>
      </div>
    </Modal>

    <!-- 生成镜像弹窗 -->
    <Modal v-model="showModal.mirror" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border" >
        <span class="universal-modal-title">制作镜像</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="mirrorForm">
          <Form-item label="镜像名称">
            <Input v-model="mirrorForm.mirrorName" placeholder="小于20位数字或字母小于20位数字或字母" type="textarea" :rows="3"></Input>
          </Form-item>
          <Form-item label="备注">
            <Input v-model="mirrorForm.description" type="textarea" :autosize="{minRows: 3,maxRows: 3}"
                   placeholder="小于20位数字、字母、中文及下划线（选填）"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mirror = false">取消</Button>
        <Button type="primary" :disabled="mirrorForm.mirrorName==''||mirrorForm.description==''" @click="mirror">确定
        </Button>
      </div>
    </Modal>

    <!-- 绑定静态IP -->
    <Modal v-model="showModal.bindIP" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定静态IP</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="bindForm">
          <Form-item label="公网IP">
            <Select v-model="bindForm.publicIP" placeholder="请选择">
              <Option v-for="(item,index) in publicIPList" :key="index" :value="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" :disabled="bindForm.publicIP==''" @click="bind">确定
        </Button>
      </div>
    </Modal>
    <!-- 加入负载均衡弹窗 -->
    <Modal v-model="showModal.balance" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        加入负载均衡
      </div>
      <div>
        <Form :model="loadBalanceForm" label-position="top">
          <Form-item label="选择弹性负载均衡名称 ">
            <Select v-model="loadBalanceForm.loadbalanceroleid" placeholder="请选择" style="width:240px;">
              <Option v-for="(item,index) in listLoadBalanceRole" :key="index" :value="item.loadbalanceroleid">
                {{item.name}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.balance = false">取消</Button>
        <Button type="primary" :disabled="loadBalanceForm.loadbalanceroleid==''" @click="joinBalanceSubm">确定
        </Button>
      </div>
    </Modal>
    <!-- 续费弹窗 -->
    <Modal
      v-model="showModal.renewal"
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
        </Form>
        <div style="font-size:16px;">
          应付费:<span style="color: #2b85e4; text-indent:4px;display:inline-block">{{cost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <!-- <div type="ghost" @click="modal=false">取消</div> -->
        <Button type="primary" @click="renewalok">确认续费</Button>
      </div>
    </Modal>
    <!-- 欠费，续费弹窗 -->
    <Modal v-model="showModal.Renew" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费主机</span>
      </div>
      <div class="universal-modal-content-flex">
        <p style="margin-bottom: 20px">温馨提示：当前资源已欠费，如需激活需要<span class="bluetext">1小时费用</span></p>
        <Form :model="RenewForm" label-position="left">
          <Form-item label="所需资费">
            <span style="font-size: 25px;color: #2b85e4;">￥{{RenewForm.cost}}</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.Renew = false">取消</Button>
        <Button type="primary" @click="renewOk">确定
        </Button>
      </div>
    </Modal>
    <!-- 认证弹窗 -->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">选择认证方式</span>
      </div>
      <div class="select-auth">
        <div class="content">
          <h2>个人用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
          <p><i></i>最长一个月的免费试用时间</p>
        </div>
        <div class="content">
          <h2>企业用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>企业级无限量的资源建立额度</p>
          <p><i></i>最长一个月的免费试用时间</p>
          <p><i></i>专业免费的点对点咨询服务</p>
        </div>
      </div>
      <div style="display: flex;margin-top:20px">
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('person')">立即认证</Button>
        </div>
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('company')">立即认证</Button>
        </div>
      </div>
      <div slot="footer">
        <p class="modal-text-hint-bottom">提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import merge from 'merge'
  // import {mapState} from 'vuex'
  import $store from '@/vuex'
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    data() {
      var status = '开启'
      if (sessionStorage.getItem('type')) {
        switch (sessionStorage.getItem('type')) {
          case 'open':
            break
          case 'close':
            status = '关机'
            break
          case 'arrears':
            status = '欠费'
            break
          case 'error':
            status = '异常'
            break
        }
        sessionStorage.removeItem('type')
      }
      return {
        cost: '--',
        listLoadBalanceRole: [],
        openHost: [],
        closeHost: [],
        arrearsHost: [],
        errorHost: [],
        waitHost: [],
        currentHost: [],
        status,
        showModal: {
          backup: false,
          mirror: false,
          bindIP: false,
          renewal: false,
          rename: false,
          Renew: false,
          selectAuthType: false,
          balance: false
        },
        renameForm: {
          hostName: ''
        },
        backupForm: {
          backupName: '',
          radio: '1'
        },
        mirrorForm: {
          mirrorName: '',
          description: ''
        },
        bindForm: {
          publicIP: ''
        },
        loadBalanceForm: {
          loadbalanceroleid: ''
        },
        publicIPList: [],
        renewalType: '',
        renewalTime: '',
        timeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}],
          renewalTime: [],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '6月', value: 6}]
        },
        requestParam: {
          ipArray: [],
          hostArray: []
        },
        loadingMessage: '',
        loading: false,
        intervalInstance: null,
        RenewForm: {
          cost: 0,
          id: ''
        }
      }
    },
    created() {
      this.getData()
      // 定时发送ajax 刷新页面
      this.intervalInstance = setInterval(() => {
        this.getData()
      }, 5 * 1000)
    },
    methods: {
      //加入负载均衡
      joinBalance() {
        if (this.checkSelect()) {
          if (this.currentHost[0].loadbalance) {
            this.$Message.warning('啊哦!已绑定主机无法再次绑定!')
          } else {
            this.showModal.balance = true
            // 获取负载均衡规则
            var balanceUrl = `loadbalance/listLoadBalanceRole.do?zoneId=${$store.state.zone.zoneid}`
            axios.get(balanceUrl)
              .then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.listLoadBalanceRole = response.data.result.publicLoadbalance
                }
              })
          }
        }
      },
      // 确定加入负载均衡
      joinBalanceSubm() {
        this.showModal.balance = false
        axios.get(`loadbalance/assignToLoadBalancerRule.do?zoneId=${this.currentHost[0].zoneid}&roleId=${this.loadBalanceForm.loadbalanceroleid}&VMIds=${this.currentHost[0].computerid}`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
      },
      //恢复主机
      recoverHost(id) {
        this.$Modal.confirm({
          title: '',
          content: '<p>确定要恢复当前主机吗？</p>',
          onOk: () => {
            this.$Message.info('主机正在恢复，请稍后')
            this.$http.get('information/recoverVM.do?id=' + id).then(response => {
              if (response.status == 200) {
                this.$Message.info(response.data.message)
                this.getData()
              } else {
                this.$message.error({
                  content: '服务器出错'
                })
                this.getData()
              }
            })
          }
        })
      },
      // 欠费主机续费
      renewHost(id) {
        this.showModal.Renew = true
        this.RenewForm.id = id
        this.$http.get('information/getResCost.do?id=' + id + '&type=' + 'computer').then(response => {
            if (response.status == 200) {
              this.RenewForm.cost = response.data.cost
            }
          }
        )
      },
      // 欠费主机续费确认
      renewOk() {
        this.showModal.Renew = false
        this.$http.get('information/vmRenew.do?id=' + this.RenewForm.id).then(response => {
          this.getData()
          if (response.status == 200) {
            this.$Message.success('主机续费成功')
          }
        })
      },
      // 获取数据的主要接口
      getData() {
        var url = 'information/listVirtualMachines.do'
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 遍历各种主机类型，开启、关闭、欠费、错误、创建中
            for (var type in response.data.result) {
              var list = []
              var target = response.data.result[type]
              for (var index in target.list) {
                var host = merge(this[`${type}Host`][index] || {}, target.list[index], {_select: this[`${type}Host`][index] ? this[`${type}Host`][index]._select : false})
                list.push(host)
              }
              this[`${type}Host`] = list
            }
          }
        })
      },
      toggleData() {
        var url = 'information/listVirtualMachines.do'
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.openHost = []
            this.closeHost = []
            this.arrearsHost = []
            this.errorHost = []
            this.waitHost = []
            this.currentHost = []
            // 遍历各种主机类型，开启、关闭、欠费、错误、创建中
            for (var type in response.data.result) {
              var list = []
              var target = response.data.result[type]
              for (var index in target.list) {
                var host = merge(this[`${type}Host`][index] || {}, target.list[index], {_select: this[`${type}Host`][index] ? this[`${type}Host`][index]._select : false})
                list.push(host)
              }
              this[`${type}Host`] = list
            }
          }
        })
      },
      toggle(item) {
        if (!this.auth) {
          return
        }
        this.$set(item, 'select', !item.select)
      },
      createHost() {

      },
      manage(item, status) {
        this.$router.push({
          path: 'manage',
          query: {
            computername: item.computername,
            zoneid: item.zoneid,
            vmid: item.computerid,
            instancename: item.instancename,
            connecturl: item.connecturl,
            id: item.id
          }
        })
        // sessionStorage.setItem('oneHostinfo', JSON.stringify(item))
        // this.$router.push('manage')
      },
      startUp() {
        switch (this.status) {
          case '开启':
            this.$Message.warning('请选择未开启的主机!')
            break
          case '异常':
            this.$Message.warning('异常主机无法启动!')
            break
          case '欠费':
            this.$Message.warning('主机欠费请续费!')
            break
          case '关机':
            if (this.closeHost.every(item => {
                return item.select == false
              })) {
              this.$Message.warning('请选择主机')
              return
            }
            var num = 0
            this.closeHost.forEach(item => {
              if (item.select == true) {
                num++
              }
            })
            this.loadingMessage = '正在启动主机'
            this.loading = true
            this.closeHost.forEach(item => {
              if (item.select == true) {
                this.$http.get(`information/startVirtualMachine.do?VMId=${item.computerid}`).then(response => {
                  num--
                  if (num == 0) {
                    this.loading = false
                  }
                  if (response.status == 200 && response.data.status == 1) {
                    this.openHost.push(this.closeHost.splice(this.closeHost.indexOf(item), 1)[0])
                  }
                })
              }
            })
            break
        }
      },
      stop(item){
        this.loadingMessage = '正在停止主机'
        this.loading = true
        item.select = false
        item.status = 2
        this.$http.get(`information/stopVirtualMachine.do?VMId=${item.computerid}&forced=true`)
          .then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              item.status = 2
              this.$Message.info(response.data.message)
            } else {
              item.status = 1
            }
          })
      },
      start(item){
        this.loadingMessage = '正在启动主机'
        this.loading = true
        item.select = false
        item.status = 2
        this.$http.get(`information/startVirtualMachine.do?VMId=${item.computerid}`).then(response => {
          this.loading = false
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info(response.data.message)
          } else {
            item.status = 1
          }
        })
      },
      bindIP() {
        if (this.checkSelect()) {
          if (this.currentHost[0].publicip) {
            this.$Message.warning('啊哦!已绑定主机无法再次绑定!')
          } else {
            this.loadingMessage = '正在绑定IP'
            this.loading = true
            this.bindForm.publicIP = ''
            this.showModal.bindIP = true
            axios.get(`network/listPublicIp.do?useType=1&zoneId=${this.currentHost[0].zoneid}`)
              .then(response => {
                this.loading = false
                if (response.status == 200 && response.data.status == 1) {
                  this.publicIPList = response.data.result
                }
              })
          }
        }
      },
      bind() {
        this.showModal.bindIP = false
        var url = `network/enableStaticNat.do?ipId=${this.bindForm.publicIP}&VMId=${this.currentHost[0].computerid}`
        this.$http.get(url)
          .then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
      },
      unbind() {
        if (this.checkSelect()) {
          var url = `network/disableStaticNat.do?ipId=${this.currentHost[0].belongnetworkid.split('#')[0]}&computerId=${this.currentHost[0].computerid}`
          this.loadingMessage = '正在解绑公网IP'
          this.loading = true
          this.$http.get(url).then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.currentHost[0].belongnetworkid = ''
              this.currentHost[0].publicip = ''
            }
          })
        }
      },
      gotoNew() {
        this.$store.commit('setSelect', 'new')
        this.$router.push('buy')
      },
      hideEvent(name) {
        switch (name) {
          case 'rename':
            if (this.checkSelect()) {
              this.renameForm.hostName = ''
              this.showModal.rename = true
            }
            break
          case 'renewal':
            if (this.checkSelect()) {
              this.showModal.renewal = true
            }
            break
          case 'backup':
            if (this.status != '开启' && this.status != '关机') {
              return
            }
            if (this.checkSelect()) {
              this.backupForm.backupName = ''
              this.backupForm.description = ''
              this.showModal.backup = true
            }
            break
          case 'mirror':
            if (this.status != '关机') {
              return
            }
            if (this.checkSelect()) {
              this.mirrorForm.mirrorName = ''
              this.mirrorForm.description = ''
              this.showModal.mirror = true
            }
            break
          case 'upgrade':
            if (this.status != '关机') {
              return
            }
            if (this.checkSelect()) {
              localStorage.setItem('serviceoffername', this.currentHost[0].serviceoffername)
              localStorage.setItem('disksize', this.currentHost[0].disksize)
              localStorage.setItem('virtualMachineid', this.currentHost[0].computerid)
              localStorage.setItem('zoneid', this.currentHost[0].zoneid)
              this.$router.push({
                name: 'upgrade'
              })
            }
            break
          case 'reboot':
            if (this.checkSelect()) {

            }
            this.reboot()
            break
        }
      },
      checkSelect() {
        switch (this.status) {
          case '开启':
            this.currentHost = this.openHost.filter(item => {
              return item.select == true
            })
            break
          case '关机':
            this.currentHost = this.closeHost.filter(item => {
              return item.select == true
            })
            break
          case '异常':
            this.currentHost = this.errorHost.filter(item => {
              return item.select == true
            })
            break
          case '欠费':
            this.currentHost = this.arrearsHost.filter(item => {
              return item.select == true
            })
            break
        }
        if (this.currentHost.length != 1) {
          this.$Message.warning('请选择1个主机')
          return false
        }
        return true
      },
      // 生成快照
      backup() {
        this.showModal.backup = false
        var url = `Snapshot/createVMSnapshot.do?VMId=${this.currentHost[0].computerid}&snapshotName=${this.backupForm.backupName}&&memoryStatus=${this.backupForm.radio}&zoneId=${this.currentHost[0].zoneid}`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          }
        })
      },
      // 重命名主机
      rename() {
        this.showModal.rename = false
        this.loadingMessage = '正在修改主机名'
        this.loading = true
        this.$http.post('information/changeVmName.do', {
          vmId: this.currentHost[0].computerid,
          name: this.renameForm.hostName
        }).then(response => {
          this.loading = false
          if (response.status == 200 && response.data.status == 1) {
            this.currentHost[0].computername = response.data.message
            this.$Message.success('主机名修改成功')
          }
        })
      },
      // 主机续费
      renewalok() {
        var list = [
          {type: 0, id: this.currentHost[0].id}
        ]
        var param = {
          timeType: this.renewalType,
          timeValue: this.renewalTime,
          list: JSON.stringify(list)
        }
        this.$http.post("continue/continueOrder.do", param).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      // 创建主机镜像
      mirror() {
        this.showModal.mirror = false
        var url = `Snapshot/createTemplate.do?rootDiskId=${this.currentHost[0].rootdiskid}&templateName=${this.mirrorForm.mirrorName}&descript=${this.mirrorForm.description}&zoneId=${this.currentHost[0].zoneid}`
        axios.get(url).then(response => {
          this.loading = false
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: '请求成功，镜像正在创建中，您可以到<span style="color: #0db4fa;cursor: pointer;"@click="toMirror">镜像列表</span>查看该镜像。',
              duration: 5
            })
          }
        })
      },
      toMirror() {
        this.$store.commit('setSelect', 'mirror')
        this.$router.push('mirror')
      },
      del() {
        if (this.checkSelect()) {
          if (this.currentHost[0].caseType != 3) {
            this.$Message.warning('只能删除实时计费主机')
            return
          }
          this.loadingMessage = '正在删除主机'
          this.loading = true
          this.$http.get('information/deleteVM.do?id=' + this.currentHost[0].id)
            .then(response => {
              this.loading = false
              if (response.status == 200 && response.data.status == 1) {
                // initRecycle.bind(this)()
                this.$Message.success(response.data.message)
                this.getData()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
        }
      },
      upgrade() {
        this.$router.push('/upgrade')
      },
      reboot() {
        if (this.checkSelect()) {
          this.loadingMessage = '正在重启主机'
          this.loading = true
          this.$http.get('information/rebootVirtualMachine.do?VMId=' + this.currentHost[0].computerid)
            .then(response => {
              this.loading = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.error({
                  content: response.data.message
                })
              }
            })
        }
      },
      cancel() {

      },
      push(type) {
        sessionStorage.setItem('authType', type)
        this.$router.push('usercenter')
      },
    },
    computed: {
      auth(){
        return this.$store.state.userInfo.personalauth == 0 || this.$store.state.userInfo.companyauth == 0
      }
    },
    watch: {
      renewalType(type) {
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time) {
        if (time == '') {
          this.cost = '--'
        } else {
          var url = `information/getYjPrice.do?timeValue=${this.renewalTime}&timeType=${this.renewalType}&hostIdArr=${this.currentHost[0].id}`
          this.$http.get(url)
            .then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                this.cost = response.data.result
              } else {
                this.$message.error({
                  content: response.data.message
                })
              }
            })
        }
      },
      '$store.state.zone': {
        handler: function () {
          this.toggleData()
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      clearInterval(this.intervalInstance)// 可以访问组件实例 `this`
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
 .select-auth {
   display: flex;
   justify-content: space-around;
   .content{
     p{
       line-height: 18px;
     }
   }
 }
  .btnnormal {
    border: #2a99f2 solid 1px;
    color: #2a99f2
  }

  .ivu-modal-footer {
    .button {
      height: 35.7px;
      padding: 5.7px 17px;
      line-height: 24.7px;
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 16px;
      border-radius: 4.46px;
      cursor: pointer;
      user-select: none;
    }
    .ok {
      color: #FFFFFF;
      background: #2A99F2;
    }
    .cancel {
      margin-right: 10.5px;
      border: 1px solid #D9D9D9;
      color: #666666;
    }
  }

  .link-host {
    background: #2A99F2;
    color: #fff;
  }

  .moreOperation .ivu-poptip-rel li {
    font-size: 12px;
    line-height: normal;
    padding: 7px 16px;
    width: 100px;
    cursor: pointer;
    &:hover {
      background: #f3f3f3;
    }
  }

  .flex-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    min-height: 300px;
    &:after {
      content: '';
      width: 373px;
    }
    .head {
      font-size: 0px;
      padding: 23px 19px 0px 19px;
      position: relative;
      h1 {
        font-size: 18px;
        color: #646464;
        line-height: 18px;
        text-align: left;
      }
      span {
        color: #646464;
        font-size: 12px;
        display: block;
        text-align: left;
        margin-bottom: 10px;
        &:last-of-type {
          position: absolute;
          top: 123px;
          right: 38px;
          font-size: 30px;
          color: rgba(0, 0, 0, 0.10);
        }
      }
      i {
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        top: 22px;
        right: 43px;
        cursor: pointer;
      }
      .normal {
        border: 1px solid #1381f5;
        border-radius: 50%;
      }
      .ico {
        width: 18px;
        height: 6px;
        position: absolute;
        top: -2%;
        left: 50%;
        z-index: 100;
        font-size: 5px;
        color: #1381f5;
        background-color: white;
        transform: translate(-50%, -50%);
      }
    }
    .foot {
      padding: 11px 19px 12px 19px;
      display: flex;
      margin: 0px auto;
      justify-content: space-between;
      span {
        display: block;
        line-height: 32px;
        font-size: 12px;
        color: #999999;
      }

    }
    .select {
      .ivu-card {
        background: #FFFFFF;
        border: 1px solid #2A99F2;
        box-shadow: 0 2px 16px 0 rgba(93, 177, 245, 0.50);
        border-radius: 4px;
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
        left: 8px;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        user-select: none;
        cursor: default;
      }
    }
    .add {
      background: url('../../assets/img/host/cross.png') center no-repeat;
      display: block;
      height: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 125px;
      transform: translate(-50%, -50%);
    }
    ._hover {
      &:hover{
        background: #2A99F2;
        color: #FFFFFF;
      }
    }
  }
</style>
