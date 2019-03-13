<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机 / </span>
        <span>管理</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div class="host-config">
        <div class="config-top">
          <p class="title"><img @click="$router.push('host')" src="../../assets/img/host/h-icon9.png" alt="back to hostList"/> 名称：{{ hostInfo.computerName}}
            <img class="last" @click="renameForm.hostName = '',showModal.rename = true" src="../../assets/img/host/h-icon11.png" alt="modification computerName"/>
            <button @click="$router.go(0)">刷新</button>
            <button style="margin-right: 10px;background: #2A99F2;color: #FFF" @click="linkHost" v-if="hostInfo.computerStatus == 1">连接主机</button>
          </p>
          <p>{{ hostInfo.cpuNum }}核CPU，{{ hostInfo.memory}}G内存，{{ hostInfo.rootDiskSize}}G硬盘，{{ hostInfo.bandwith}}M带宽 | {{ hostInfo.zoneName}} <span
            @click="hostUpgrade">[升级]</span>
          </p>
        </div>
        <div class="config-type">
          <ul v-for="item in configTypes" :class="{selected: configType == item}" @click="changeTabs(item)">{{ item }}</ul>
        </div>
        <div class="hint_1" v-show="guideStep == 1">
          <p>点击「升级」可进行主机升级。</p>
          <span @click="guideStep = 2">知道了</span>
          <span></span>
          <span>{{guideStep + 6 }} / 10</span>
        </div>
        <div class="hint_2" v-show="guideStep == 2">
          <p>主机信息项可进行镜像修改、数据盘扩容、数据盘挂/卸载、修改密码等操作。</p>
          <span @click="guideStep = 3">知道了</span>
          <span></span>
          <span>{{guideStep  + 6 }} / 10</span>
        </div>
        <div class="hint_3" v-show="guideStep == 3">
          <p>网络信息项可进行公网IP解绑，带宽扩容等操作。</p>
          <span @click="guideStep = 4">知道了</span>
          <span></span>
          <span>{{guideStep  + 6 }} / 10</span>
        </div>
        <div class="hint_4" v-show="guideStep == 4">
          <p>资费信息项可进行自动续费的开启和关闭操作。</p>
          <span @click="seeAll">知道了</span>
          <span></span>
          <span>{{guideStep  + 6 }} / 10</span>
        </div>
      </div>
      <div class="config-info">
        <div class="tab-1" v-show="configType == '基础信息' ">
          <div>
            <p>主机信息<!--<span>[设置]</span>--></p>
            <ul>
              <li><span class="one">镜像系统</span><span class="two">{{ hostInfo.template}}</span><span class="three" @click="modifyMirror"> [修改]</span></li>
              <li><span class="one">系统盘容量</span><span class="two">{{ hostInfo.rootDiskSize}}G</span><span class="three" @click="hostUpgrade"> [扩容]</span></li>
              <li><span class="one">数据盘容量</span><span class="two">{{ hostInfo.diskSize}}G</span><span class="three" @click="diskMount"> [挂载</span><span class="three"
                                                                                                                                                        @click="diskUnload"> / 卸载]</span>
              </li>
              <li><span class="one">关联弹性伸缩</span><span class="two"> {{ hostInfo.telescopic ? hostInfo.telescopic : '----'}}</span></li>
              <li><span class="one">登录密码</span>
                <span class="three" v-if="codePlaceholder == '发送密码'" @click="showModal.lookPassword = true"> [{{codePlaceholder}}]</span>
                <span class="two" v-else> [{{codePlaceholder}}]</span>
                <span class="three" @click="showModal.modifyPassword = true"> [修改密码]</span></li>
              <li><span class="one">主机状态</span><span class="two"> {{ hostInfo.computerStatus? '开机': '关机' }}</span></li>
            </ul>
          </div>
          <div>
            <p>网络信息<!--<span> [设置]</span>--></p>
            <ul>
              <li><span class="four">所属VPC</span>
                <span class="three" v-if="hostInfo.vpc" @click="toOther('vpc')">{{ hostInfo.vpc}}</span>
                <span v-else class="two">----</span></li>
              <li><span class="four">所属子网</span>
                <span class="three" v-if="hostInfo.networkName" @click="toOther('vpc')">{{ hostInfo.networkName}}</span>
                <span v-else class="two">----</span></li>
              <li><span class="four">内网IP</span><span class="two">{{ hostInfo.privateIp?hostInfo.privateIp:'----'}}</span></li>
              <li><span class="four">外网IP</span><span class="two">{{ hostInfo.publicIp? hostInfo.publicIp : '----'}}</span>
                <span :class="{three: bindForm.unbindText == '解绑IP'}" v-if="hostInfo.publicIp" @click="unbindIp"> [{{ bindForm.unbindText}}]</span>
                <span :class="{three: bindForm.bindIpText == '绑定IP' }" v-else @click="bindIP"> [{{ bindForm.bindIpText }}]</span></li>
              <li><span class="four">带宽</span><span class="two">{{ hostInfo.bandwith?hostInfo.bandwith: '0'}}M</span>
                <span class="three" v-if="hostInfo.bandwith" @click="adjustIP"> [扩容]</span></li>
              <li><span class="four">负载均衡</span><span class="two">{{(hostInfo.loadbalance + '') ? hostInfo.loadbalance + '' : '----'}}</span></li>
              <li><span class="four">NAT网关</span><span class="two">{{ hostInfo.netGateway? hostInfo.netGateway : '----'}}</span></li>
            </ul>
          </div>
          <div>
            <p>安全信息<!--<span> [设置]</span>--></p>
            <ul>
              <li><span class="four">安全组</span><span :class="{three: hostInfo.firewall}" @click="toOther('firewall')"> {{ hostInfo.firewall ? hostInfo.firewall: '----'}}</span>
              </li>
              <li><span class="four">开放端口</span><span class="two"> {{hostInfo.ports? hostInfo.ports: '----' }}</span></li>
            </ul>
          </div>
          <div>
            <p>资费信息<!--<span> [设置]</span>--></p>
            <ul>
              <li><span class="four">计费类型</span><span
                class="two"> {{ hostInfo.case_type == 1 ? '包年' : hostInfo.case_type == 2 ? '包月' : hostInfo.case_type == 3 ? '实时' : '七天'}}</span></li>
              <li><span class="four">自动续费</span>
                <i-switch size="small" style="position: relative;top: -2px;" v-model="isAutoRenew" @on-change="changAutoRenew"
                          :disabled="hostInfo.case_type != 2 && hostInfo.case_type != 1"></i-switch>
              </li>
              <li><span class="four">创建时间</span><span class="two"> {{ hostInfo.createTime}}</span></li>
              <li><span class="four">到期时间</span><span class="two"> {{ hostInfo.endTime}}</span></li>
            </ul>
          </div>
        </div>
        <div class="tab-2" v-show="configType == '主机监控'">
          <div class="item" v-for="(item,index) in tab2.monitoringList">
            <div class="item-title">
              <span>{{ item.title}}</span>
              <span>{{  tab2.currentData }}</span>
            </div>
            <div class="item-type">
              <Radio-group v-model="item.type" type="button" @on-change="changeMonitorDate(index)">
                <Radio label="近一天"></Radio>
                <Radio label="最近7天"></Radio>
                <Radio label="最近30天"></Radio>
              </Radio-group>
              <Radio-group v-model="item.showType" type="button" @on-change="changeMonitorShowType(index)" style="float:right">
                <Radio label="折线"></Radio>
                <Radio label="柱状图"></Radio>
              </Radio-group>
            </div>
            <chart :options="item.chart" style="width:100%;height:80%;"></chart>
          </div>
        </div>
        <div class="tab-3" v-show="configType == '防火墙'">
          <div class="content">
            <div class="tab-3-title">
              <span>{{ hostInfo.firewall ? hostInfo.firewall: '----'}}</span>
              <span style="margin-left: 40px">所属Vpc：<span @click="toOther('vpc')">{{hostInfo.vpc}}</span></span>
              <RadioGroup v-model="tab3.rule" type="button" style="float: right" @on-change='tab3RadioChange'>
                <Radio label="出站规则"></Radio>
                <Radio label="入站规则"></Radio>
              </RadioGroup>
            </div>
            <div class="firewal">
              <div>
                <Button type="primary" @click="showModal.createRule = true">创建规则</Button>
                <!-- <Button type="primary" style="margin-left:10px;" @click="del('')">删除</Button> -->
                <!-- <Button >开启所有端口</Button>
                <Button >关闭所有端口</Button>
                <Button >恢复默认</Button> -->
              </div>
              <div class="selectMark">
                <img src="../../assets/img/host/h-icon10.png"/>
                <span>共 {{tab3.totalLenght}} 项 | 已选择 <span style="color:#FF624B;">{{selectLenght}}</span>项</span>
              </div>
              <Table :columns='tab3.firewalList' :data='tab3.firewalData' :loading='tab3.firewalLoading' @on-selection-change="firewalSelectionChange"></Table>
            </div>
          </div>
        </div>
        <div class="tab-4" v-show="configType == '快照管理'">
          <Button type="primary" :disabled="delSnapshootDisabled" @click="showModal.delsnaps = true">删除快照</Button>
          <div class="selectMark">
            <img src="../../assets/img/host/h-icon10.png"/>
            <span>共 {{ tab4.pageSize}} 项 | 已选择 <span style="color:#FF624B;">{{ tab4.snapshootSelection.length }} </span>项</span>
          </div>
          <Table :columns="tab4.snapshootColumns" :data="tab4.snapshootData" @on-selection-change="snapshootSelectionChange"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="tab4.snapshootPages" :current="tab4.currentPage" :page-size="tab4.pageSize" @on-change="changeSnapshootPage"></Page>
            </div>
          </div>
        </div>
        <div class="tab-5" v-show="configType == '操作日志'">
          <div class="title">
            <RadioGroup v-model="tab5.timeHorizon" type="button" @on-change="logToggle">
              <Radio label="近一天"></Radio>
              <Radio label="近一周"></Radio>
              <Radio label="近一月"></Radio>
            </RadioGroup>
            <Input v-model="tab5.searchName" style="width: 25%" placeholder="请输入搜索的关键字">
            <span slot="prepend">操作名称</span>
            <Button slot="append" icon="ios-search" @click="getHostLog"></Button>
            </Input>
          </div>
          <Table :columns="tab5.logColumns" :data="tab5.logData"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="tab5.logPages" :current="tab5.currentPage" :page-size="tab5.pageSize" @on-change="changeLogPage"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主机重命名弹窗 -->
    <Modal v-model="showModal.rename" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">主机重命名</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="renameForm" ref="renameForm" :rules="renameFormRule">
          <Form-item label="主机名" prop="hostName">
            <Input v-model="renameForm.hostName" placeholder="请输入新主机名" :maxlength="15"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.rename = false">取消</Button>
        <Button type="primary" @click="checkRenameForm">确定
        </Button>
      </div>
    </Modal>
    <!-- 修改镜像系统弹窗-->
    <Modal v-model="showModal.mirrorModify" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改镜像系统</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="modal-p">*提示：重装主机后，将无法找回系统盘数据。数据盘需要重新挂载，请按照帮助中心中的指导说明进行。</p>
        <Form :model="mirrorModifyForm" ref="mirrorModifyForm" :rules="mirrorModifyFormRule">
          <Form-item label="选择镜像" style="width: 70%" prop="system">
            <Cascader :data="osOptions" v-model="mirrorModifyForm.system"></Cascader>
          </Form-item>
          <Form-item label="控制台密码" style="width: 70%" prop="consolePassword">
            <Input v-model="mirrorModifyForm.consolePassword" type="password" placeholder="请输入控制台登录密码"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mirrorModify = false">取消</Button>
        <Button type="primary" @click="resetSystem" :disabled="mirrorModifyForm.buttonText == '重装中'">{{mirrorModifyForm.buttonText}}</Button>
      </div>
    </Modal>
    <!-- 确认系统重装弹窗 -->
    <Modal v-model="showModal.reload" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">警告</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">为了数据安全，系统重装之前主机会自动关闭。重装结束后，主机会自动开机。</p>
          <p>请输入“confirm”</p>
          <Input v-model="reloadHintForm.input" placeholder="请输入“confirm”"
                 style="width: 300px;margin-top: 10px;"></Input>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.reload=false">取消</Button>
        <Button type="primary" @click="resetSystem_ok" :disabled="reloadHintForm.input!='confirm'">确定</Button>
      </p>
    </Modal>
    <!-- 挂载硬盘模态框 -->
    <Modal v-model="showModal.mountDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">挂载云硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskMountForm" :rules="mountRuleValidate" ref="mountDisk">
          <Form-item label="可挂载磁盘列表" prop="mountDisk">
            <Select v-model="diskMountForm.mountDisk" placeholder="请选择">
              <Option v-for="(item,index) in diskMountForm.diskList" :key="index" :value="item.diskid">{{ item.diskname}}
              </Option>
            </Select>
          </Form-item>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 45%;"
                @click="$router.push('buy/bdisk')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买磁盘
            </span>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mountDisk = false">取消</Button>
        <Button type="primary" @click="mountDisk_ok">确认挂载</Button>
      </div>
    </Modal>
    <!-- 卸载硬盘模态框 -->
    <Modal v-model="showModal.unloadDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">卸载云硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskUnloadForm" :rules="unloadRuleValidate" ref="unloadDisk">
          <Form-item label="可挂载磁盘列表" prop="unloadDisk">
            <Select v-model="diskUnloadForm.unloadDisk" placeholder="请选择">
              <Option v-for="(item,index) in diskUnloadForm.diskList" :key="index" :value="item.diskid">{{ item.diskname}}
              </Option>
            </Select>
          </Form-item>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 45%;"
                @click="$router.push('buy/bdisk')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买磁盘
            </span>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.unloadDisk = false">取消</Button>
        <Button type="primary" @click="diskUnload_ok">确认卸载</Button>
      </div>
    </Modal>
    <!-- 查看密码弹窗 -->
    <Modal width="550" v-model="showModal.lookPassword" :scrollable="true" class="lookPassword">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">查看登录密码</span>
      </div>
      <div>
        <div class="universal-modal-content-flex">
          <Form :model="lookPasswordForm" ref="lookPasswordForm" :rules="lookPasswordFormRule" @submit.native.prevent>
            <FormItem label="请输入控制台登录密码" prop="input">
              <Input v-model="lookPasswordForm.input" placeholder="请输入控制台登录密码" type="password"></Input>
            </FormItem>
            <!--<input type="text" hidden>-->
          </Form>
        </div>
        <div style="display:flex;">
          <p style=" font-size: 14px;line-height: 22px;">密码接收渠道</p>
          <Checkbox v-model="lookPasswordForm.isemailalarmSec" size="large"
                    style="margin-left: 20px;font-size: 12px;">邮箱
          </Checkbox>
          <Checkbox v-model="lookPasswordForm.issmsalarmSec" size="large" style="margin-left: 20px;font-size: 12px;">
            短信
          </Checkbox>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.lookPassword=false">取消</Button>
        <Button type="primary" @click="sendPassword('lookPasswordForm')"
                :disabled="!(lookPasswordForm.isemailalarmSec || lookPasswordForm.issmsalarmSec)">确定
        </Button>
      </div>
    </Modal>
    <!-- 修改密码弹窗 -->
    <Modal v-model="showModal.modifyPassword" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改密码</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="modifyPasswordForm" ref="modifyPassword" :rules="modifyPasswordFormRule">
          <FormItem label="当前密码" prop="oldPassword" style="width: 80%;margin-bottom: 10px">
            <Input type="password" :type="modifyPasswordForm.oldPasswordInput" v-model="modifyPasswordForm.oldPassword"></Input>
            <img class="modal-img" @click="changeLoginPasType(1)" src="../../assets/img/login/lr-icon3.png"/>
          </FormItem>
          <FormItem label="新的密码" prop="newPassword" style="width: 80%;margin-bottom: 10px">
            <Input type="password" :type="modifyPasswordForm.newPasswordInput" v-model="modifyPasswordForm.newPassword"></Input>
            <img class="modal-img" @click="changeLoginPasType(2)" src="../../assets/img/login/lr-icon3.png"/>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword" style="width: 80%;margin-bottom: 10px">
            <Input type="password" :type="modifyPasswordForm.confirmPasswordInput" v-model="modifyPasswordForm.confirmPassword"></Input>
            <img class="modal-img" @click="changeLoginPasType(3)" src="../../assets/img/login/lr-icon3.png"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modifyPassword = false">取消</Button>
        <Button type="primary" @click="modifyPassword_ok">确认修改</Button>
      </div>
    </Modal>
    <!-- 绑定ip时，没有公网ip提示 -->
    <Modal v-model="showModal.publicIPHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您还未拥有公网IP，请先创建公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.publicIPHint = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/buy/bip')">创建公网IP</Button>
      </p>
    </Modal>
    <!-- 绑定静态IP -->
    <Modal v-model="showModal.bindIP" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定IP</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="bindForm" ref="bindForm" :rules="bindFormRule">
          <Form-item label="选择弹性IP" prop="publicIP">
            <Select v-model="bindForm.publicIP" placeholder="请选择">
              <Option v-for="(item,index) in publicIPList" :key="index" :value="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:4px;right:-110px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('/ruicloud/buy/bip')">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" @click="bindIp_ok('bindForm')">确定
        </Button>
      </div>
    </Modal>
    <!-- 解绑公网ip确认框 -->
    <Modal v-model="showModal.unbindIP" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">解绑IP</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您确认解绑主机的公网IP吗
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unbindIP = false">取消</Button>
        <Button type="primary" @click="unbind_ok">确认解绑</Button>
      </p>
    </Modal>
    <!-- 带宽调整 -->
    <Modal v-model="showModal.adjust" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">带宽调整</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="adjustForm" label-position="left">
          <Form-item label="带宽" style="width: 80%">
            <div style="width:300px;display: inline-block;vertical-align: middle;margin-left: 11px">
              <Slider v-model='adjustForm.brand' show-input :min='adjustForm.minBrand'></Slider>
            </div>
            <span>Mbps</span>
          </Form-item>
          <Form-item label="应付差价：" style="width: 80%">
            <span style="font-family: Microsoft YaHei;font-size: 24px;color: #2A99F2;line-height: 43px;">￥{{adjustForm.cost}}
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.adjust = false">取消</Button>
        <Button type="primary" @click="adjustOK" :disabled="adjustForm.brand == adjustForm.minBrand">确定
        </Button>
      </div>
    </Modal>
    <!-- 回滚弹窗 -->
    <Modal v-model="showModal.rollback" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">主机回滚</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">是否确定回滚主机</p>
          <p class="lh24">提示：您正使用<span class="bluetext">{{tab4.snapsName}}</span>回滚<span class="bluetext">{{tab4.hostName}}</span>至<span
            class="bluetext">{{tab4.hostCreatetime}}</span>，当您确认操作之后，此<span class="bluetext">时间点</span>之后的主机内的数据将丢失。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rollback=false">取消</Button>
        <Button type="primary" @click="rollbackSubmit">确定</Button>
      </p>
    </Modal>
    <!-- 删除快照弹窗 -->
    <Modal v-model="showModal.delsnaps" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除快照</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">确定要删除选中的快照吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delsnaps=false">取消</Button>
        <Button type="primary" @click="delsnapsSubm">确定</Button>
      </p>
    </Modal>
    <!-- 创建规则 -->
    <Modal v-model="showModal.createRule" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建规则</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form ref="newRuleFormValidate" :model="newRuleForm" :rules="ruleValidate">
          <Form-item label="名称" prop="name">
            <Input v-model="newRuleForm.name" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="方向" prop="way">
            <Select v-model="newRuleForm.way" placeholder="请选择">
              <Option value="Egress">
                出站规则
              </Option>
              <Option value="Ingress">
                入站规则
              </Option>
            </Select>
          </Form-item>
          <Form-item label="协议" prop="protocol">
            <Select v-model="newRuleForm.protocol" placeholder="请选择">
              <Option v-for="item in newRuleForm.protocolOptions" :value="item" :key="item">
                {{item}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="CIDR" prop="cidr">
            <Input v-model="newRuleForm.cidr" placeholder="请输入IP地址..."></Input>
          </Form-item>
          <!--<Form-item label="优先级（数字越小优先级越高）">
            <InputNumber v-model="newRuleForm.itemid" :max="10" :min="1"></InputNumber>
          </Form-item>-->
          <Form-item label="起始端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.startPort" :max="65535" :min="0" :precision="0"></InputNumber>
          </Form-item>
          <Form-item label="结束端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.endPort" :max="65535" :min="0" :precision="0"></InputNumber>
          </Form-item>
          <Form-item label="行为" prop="access">
            <Select v-model="newRuleForm.access" placeholder="请选择">
              <Option value="Allow">
                接受
              </Option>
              <Option value="Deny">
                拒绝
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createRule = false">取消
        </Button>
        <Button type="primary" @click="handleSubmit">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import line from '@/echarts/hostManage/line'
  import bar from '@/echarts/hostManage/bar'
  import regExp from '../../util/regExp'
  import {debounce} from 'throttle-debounce'

  const validateCdir = (rule, value, callback) => {
    var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/(\d|[1-2]\d|3[0-2])$/
    if (!value) {
      return callback(new Error('CIDR不能为空'));
    } else {
      if (!re.test(value)) {
        callback(new Error('请输入正确的CIDR'));
      } else {
        callback();
      }
    }
  }
  export default {
    data() {
      const validaSystem = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请选择镜像系统'));
        } else {
          callback();
        }
      }
      const validaRegisteredPassWord = (rule, value, callback) => {
        if (value.length < 8 || value.length > 30) {
          callback(new Error('密码长度8-30字符'));
        } else if (!regExp.registerPasswordVail(value)) {
          callback(new Error('密码必须包含数字和字母大小写,不限特殊字符和空格'));
        } else {
          callback()
        }
      }
      const validaRegisteredPassWordTwo = (rule, value, callback) => {
        if (this.modifyPasswordForm.newPassword != value) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback()
        }
      }
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        guideStep: 0,
        hostInfo: {},
        computerId: '',
        showModal: {
          rename: false,
          mirrorModify: false,
          reload: false,
          mountDisk: false,
          unloadDisk: false,
          lookPassword: false,
          modifyPassword: false,
          publicIPHint: false,
          bindIP: false,
          unbindIP: false,
          adjust: false,
          rollback: false,
          delsnaps: false,
          createRule: false
        },
        renameForm: {
          hostName: ''
        },
        renameFormRule: {
          hostName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
        osOptions: [],
        mirrorModifyForm: {
          system: [],
          consolePassword: '',
          buttonText: '确认重装'
        },
        mirrorModifyFormRule: {
          system: [
            {required: true, validator: validaSystem, trigger: 'change'}
          ],
          consolePassword: [
            {required: true, message: '请输入控制台登录密码', trigger: 'blur'}
          ]
        },
        reloadHintForm: {
          input: ''
        },
        configType: '基础信息',
        configTypes: ['基础信息', '主机监控', '防火墙', '快照管理', '操作日志'],
        isAutoRenew: false,
        diskMountForm: {
          mountDisk: '',
          diskList: []
        },
        mountRuleValidate: {
          mountDisk: [
            {required: true, message: '请选择挂载的磁盘', trigger: 'change'}
          ]
        },
        diskUnloadForm: {
          unloadDisk: '',
          diskList: []
        },
        unloadRuleValidate: {
          unloadDisk: [
            {required: true, message: '请选择卸载的磁盘', trigger: 'change'}
          ]
        },
        codePlaceholder: '发送密码',
        lookPasswordForm: {
          input: '',
          isletterSec: false,
          isemailalarmSec: false,
          issmsalarmSec: true,
          isLetterSec: 0,
          isEmailAlarmSec: 0,
          isSmsAlarmSec: 1,
        },
        lookPasswordFormRule: {
          input: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        modifyPasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          oldPasswordInput: 'password',
          newPasswordInput: 'password',
          confirmPasswordInput: 'password',
        },
        modifyPasswordFormRule: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: validaRegisteredPassWord, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: validaRegisteredPassWordTwo, trigger: 'blur'}
          ],
        },
        publicIPList: [],
        bindForm: {
          publicIP: '',
          bindIpText: '绑定IP',
          unbindText: '解绑IP'
        },
        bindFormRule: {
          publicIP: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        adjustForm: {
          minBrand: 0,
          brand: 0,
          cost: '0',
          caseType: 0
        },

        tab2: {
          monitoringList: [
            {
              title: 'CPU使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '内存使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '磁盘使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            }
          ],
          currentData: this.getCurrentDate()
        },

        tab3: {
          rule: '出站规则',
          id: '',
          totalLenght: 0,
          selectLenght: 0,
          firewalLoading: false,
          firewalList: [
            {
              type: 'selection',
              width: 55,
              align: 'center'
            },
            {
              title: '安全组名称',
              key: 'acllistitemname'
            },
            {
              title: '协议',
              key: 'agreement'
            },
            {
              title: '行为',
              key: 'operation'
            },
            {
              title: '起始端口',
              key: 'startport'
            },
            {
              title: '结束端口',
              key: 'endport'
            },
            {
              title: 'CIDR',
              key: 'cidr'
            },
            {
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('span', {
                    style: {color: '#FF0000', cursor: 'pointer'}, on: {
                      click: () => {
                        this.del(params.row.id);
                      }
                    }
                  }, '删除'),
                  // h('span',{style:{margin:'0 10px',color:'#999999'}},'|'),
                  // h('span',{style:{color:'#2A99F2',cursor:'pointer'}},'修改规则')
                ])
              }
            }
          ],
          firewalData: []
        },

        tab4: {
          snapshootColumns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '快照名称',
              key: 'snapshotname',
            },
            {
              title: '状态',
              key: 'status',
              render: (h, params) => {
                switch (params.row.status) {
                  case 1:
                    return h('span', {}, '正常')
                  case -1:
                    return h('span', {}, '异常')
                  case 2:
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block',
                        marginRight: '10px'
                      }
                    }), h('span', {}, '创建中')])
                  case 3:
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block',
                        marginRight: '10px'
                      }
                    }), h('span', {}, '删除中')])
                }
              }
            },
            {
              title: '快照策略',
              key: 'createway',
              render: (h, params) => {
                const row = params.row
                const text = row.createway === 'hand' ? '手动备份' : row.createway
                return h('span', {}, text)
              }
            },
            {
              title: '快照间隔',
              key: 'intervals',
              render: (h, params) => {
                const row = params.row
                const text = row.intervals === 'hand' ? '手动' : row.intervals === 'day' ? '每天' : row.intervals === 'week' ? '每周' : row.intervals === 'month' ? '每月' : ''
                return h('span', {}, text)
              }
            },
            {
              title: '创建时间',
              key: 'addtime',
            },
            {
              title: '操作',
              key: 'action',
              width: 100,
              render: (h, params) => {
                if (params.row.status !== 1) {
                  return h('span', {
                    style: {
                      cursor: 'not-allowed'
                    },
                  }, '回滚')
                } else {
                  return h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.showModal.rollback = true
                        this.tab4.cursnapshot = params.row
                        this.tab4.snapsName = params.row.snapshotname
                        this.tab4.hostName = params.row.name
                        this.tab4.hostCreatetime = params.row.addtime
                      }
                    }
                  }, '回滚')
                }
              }
            }
          ],
          snapshootData: [],
          snapshootPages: 0,
          currentPage: 1,
          pageSize: 10,
          snapshootSelection: [],
          cursnapshot: null,
          snapsName: '',
          hostName: '',
          hostCreatetime: ''
        },

        tab5: {
          timeHorizon: '近一天',
          searchName: '',
          logColumns: [
            {
              title: '操作',
              key: 'operatedes'
            },
            {
              title: '操作结果',
              render: (h, params) => {
                let text = params.row.operatestatus == 1 ? '成功' : '失败'
                return h('span', {}, text)
              },
              filters: [
                {
                  label: '成功',
                  value: 1
                },
                {
                  label: '失败',
                  value: 2
                }
              ],
              filterMultiple: false,
              filterMethod(value, row) {
                if (value === 1) {
                  return row.operatestatus == 1
                } else if (value === 2) {
                  return row.operatestatus != 1
                }
              }
            },
            {
              title: '创建时间',
              key: 'operatortime',
              sortable: true
            }
          ],
          logData: [],
          logPages: 0,
          currentPage: 1,
          pageSize: 10,
          logTime: this.getCurrentDate() + ',' + this.getTomorrow()
        },
        newRuleForm: {
          name: '',
          way: '',
          protocol: '',
          protocolOptions: ['TCP', 'UDP', 'ICMP', 'ALL'],
          endPort: 1,
          startPort: 1,
          access: '',
          cidr: '0.0.0.0/0',
          itemid: 1,
        },
        ruleValidate: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'change'}
          ],
          way: [
            {required: true, message: '请选择方向', trigger: 'change'},
          ],
          protocol: [
            {required: true, message: '请选择协议', trigger: 'change'}
          ],
          itemid: [
            {required: true, message: '请填写优先级', trigger: 'change'},
          ],
          access: [
            {required: true, message: '请选择行为', trigger: 'change'},
          ],
          cidr: [
            {required: true, validator: validateCdir, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.computerId = sessionStorage.getItem('manageId')
      this.getHostInfo()
      if (sessionStorage.getItem('guideHint')) {
        this.guideStep = 1
        sessionStorage.removeItem('guideHint')
      }
      if (sessionStorage.getItem('isSeeHint')) {
        this.guideStep = 0
      }
    },
    methods: {
      changeTabs(item) {
        this.configType = item
        switch (item) {
          case '基础信息':
            this.getHostInfo()
            break
          case '主机监控':
            this.getComputerMonitor()
            break
          case '防火墙':
            this.getAclList()
            break
          case '快照管理':
            this.getHostSnapshoot()
            break
          case '操作日志':
            this.getHostLog()
            break
        }
      },
      getHostInfo() {
        let url = 'information/listVMByComputerId.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.hostInfo = res.data.result
            this.isAutoRenew = Boolean(this.hostInfo.isAutoRenw)
          }
        })
      },
      checkRenameForm() {
        this.$refs.renameForm.validate((valid) => {
          if (valid) {
            this.showModal.rename = false
            this.$http.post('information/changeVmName.do', {
              vmId: this.computerId,
              name: this.renameForm.hostName
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getHostInfo()
              }
            })
          }
        })
      },
      linkHost() {
        localStorage.setItem('link-companyid', this.hostInfo.companyId)
        localStorage.setItem('link-vmid', this.hostInfo.computerId)
        localStorage.setItem('link-zoneid', this.hostInfo.zoneId)
        localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
        window.open('/ruicloud/link')
      },
      hostUpgrade() {
        if (this.hostInfo.computerStatus == 1) {
          this.$Message.info('主机需要在关机状态下才能升级扩容')
          return
        }
        this.$http.get('network/VMIsHaveSnapshot.do', {
          params: {
            VMId: this.computerId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (!response.data.result) {
              this.$Modal.confirm({
                title: '提示',
                content: '您的主机有快照，无法升级扩容，请删除快照再试',
                scrollable: true,
                okText: '删除快照',
                onOk: () => {
                  this.$router.push('snapshot')
                }
              })
            } else {
              sessionStorage.setItem('upgradeId', this.computerId)
              this.$router.push('upgrade')
            }
          }
        })
      },
      modifyMirror() {
        this.getMirrorList()
        this.showModal.mirrorModify = true
      },
      getMirrorList() {
        let url = 'information/getTemplateAndTemplateFunction.do'
        this.$http.get(url, {
          params: {}
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.osOptions = res.data.result
          } else {
            this.$Message.info(res.data.message)
          }
        })
      },
      resetSystem() {
        this.$refs.mirrorModifyForm.validate((valid) => {
          if (valid) {
            this.showModal.reload = true
          }
        })
      },
      resetSystem_ok() {
        this.showModal.reload = false
        this.mirrorModifyForm.buttonText = '重装中'
        this.$http.post('information/restoreVirtualMachine.do', {
          VMId: this.computerId,
          templateId: this.mirrorModifyForm.system[1],
          adminPassword: this.mirrorModifyForm.consolePassword
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.mirrorModify = false
            this.mirrorModifyForm.buttonText = '确认重装'
            this.mirrorModifyForm.system = []
            this.mirrorModifyForm.consolePassword = ''
            this.$Message.success('系统重装成功')
            this.getHostInfo()
          } else {
            this.mirrorModifyForm.buttonText = '确认重装'
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      diskMount() {
        this.getDiskList()
        this.showModal.mountDisk = true
      },
      getDiskList() {
        let url = 'Disk/listDisk.do'
        this.$http.get(url, {
          params: {
            isCanAttach: '1'
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskMountForm.diskList = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      mountDisk_ok() {
        this.$refs.mountDisk.validate((valid) => {
          if (valid) {
            this.$Message.info('磁盘正在挂载，请稍候。。。')
            this.showModal.mountDisk = false
            this.$http.get('Disk/attachVolume.do', {
              params: {
                diskId: this.diskMountForm.mountDisk,
                VMId: this.computerId
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.info({
                  content: response.data.message,
                })
                this.getHostInfo()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      diskUnload() {
        this.getDiskListByComputerId()
        this.showModal.unloadDisk = true
      },
      getDiskListByComputerId() {
        let url = 'Disk/listDisk.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskUnloadForm.diskList = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      diskUnload_ok() {
        this.$refs.unloadDisk.validate((valid) => {
          if (valid) {
            this.$Message.info('磁盘正在卸载，请稍候。。。')
            this.showModal.unloadDisk = false
            this.$http.get('Disk/detachVolume.do', {
              params: {
                diskId: this.diskUnloadForm.unloadDisk,
                VMId: this.computerId
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.info({
                  content: response.data.message,
                })
                this.getHostInfo()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      sendPassword(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.lookPassword = false
            this.lookPasswordForm.isLetterSec = this.lookPasswordForm.isletterSec == false ? 0 : 1
            this.lookPasswordForm.isSmsAlarmSec = this.lookPasswordForm.issmsalarmSec == false ? 0 : 1
            this.lookPasswordForm.isEmailAlarmSec = this.lookPasswordForm.isemailalarmSec == false ? 0 : 1
            this.$http.post('log/sendVMPassword.do', {
              VMId: this.computerId,
              password: this.lookPasswordForm.input,
              letter: this.lookPasswordForm.isLetterSec,
              meail: this.lookPasswordForm.isEmailAlarmSec,
              phone: this.lookPasswordForm.isSmsAlarmSec
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.codePlaceholder = '(60s)'
                let countdown = 60
                let inter = setInterval(() => {
                  countdown--
                  this.codePlaceholder = '(' + countdown + 's)'
                  if (countdown == 0) {
                    clearInterval(inter)
                    this.codePlaceholder = '发送密码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.lookPasswordForm.input = ''
            })
          }
        })
      },
      changeLoginPasType(val) {
        switch (val) {
          case 1:
            this.modifyPasswordForm.oldPasswordInput == 'password' ? this.modifyPasswordForm.oldPasswordInput = 'text' : this.modifyPasswordForm.oldPasswordInput = 'password'
            break
          case 2:
            this.modifyPasswordForm.newPasswordInput == 'password' ? this.modifyPasswordForm.newPasswordInput = 'text' : this.modifyPasswordForm.newPasswordInput = 'password'
            break
          case 3:
            this.modifyPasswordForm.confirmPasswordInput == 'password' ? this.modifyPasswordForm.confirmPasswordInput = 'text' : this.modifyPasswordForm.confirmPasswordInput = 'password'
            break
        }
      },
      modifyPassword_ok() {
        this.$refs.modifyPassword.validate((valid) => {
          if (valid) {
            this.showModal.modifyPassword = false
            let url = 'information/resetPasswordForVirtualMachine.do'
            this.$http.get(url, {
              params: {
                VMId: this.computerId,
                password: this.modifyPasswordForm.newPassword,
                oldPassword: this.modifyPasswordForm.oldPassword
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$Message.info({
                  content: res.data.message,
                })
                this.getHostInfo()
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      toOther(val) {
        switch (val) {
          case 'vpc':
            sessionStorage.setItem('vpcId', this.hostInfo.vpcId)
            this.$router.push('vpcManage')
            break
          case 'firewall':
            if (this.hostInfo.firewall) {
              sessionStorage.setItem('firewallId', this.hostInfo.firewallId)
              this.$router.push('firewallManage')
            }
            break
        }
      },
      bindIP() {
        if (this.bindForm.bindIpText != '绑定IP') {
          return
        }
        this.bindForm.publicIP = ''
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: 0,
            vpcId: this.hostInfo.vpcId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicIPList = response.data.result
            if (this.publicIPList == '') {
              this.showModal.publicIPHint = true
            } else {
              this.showModal.bindIP = true
            }
          }
        })
      },
      bindIp_ok(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.showModal.bindIP = false
              this.$http.get('network/enableStaticNat.do', {
                params: {
                  ipId: this.bindForm.publicIP,
                  VMId: this.computerId
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.info(response.data.message)
                  this.bindForm.bindIpText = '绑定中'
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          }
        )
      },
      unbindIp() {
        if (this.bindForm.unbindText != '解绑IP') {
          return
        }
        this.showModal.unbindIP = true
      },
      unbind_ok() {
        this.showModal.unbindIP = false
        this.$http.get('network/disableStaticNat.do', {
          params: {
            ipId: this.hostInfo.publicIpId,
            VMId: this.computerId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.info(response.data.message)
            this.bindForm.unbindText = '解绑中'
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      adjustIP() {
        this.adjustForm.brand = parseInt(this.hostInfo.bandwith)
        this.adjustForm.minBrand = parseInt(this.hostInfo.bandwith)
        this.showModal.adjust = true
      },
      adjustOK() {
        this.showModal.adjust = false
        this.$http.get('continue/UpPublicBnadwith.do', {
          params: {
            bandwith: this.adjustForm.brand,
            publicIpId: this.hostInfo.publicId
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push({path: 'order'})
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          }
        )
      },
      queryAdjustPrice: debounce(500, function () {
        this.$http.get('continue/countMoneyByUpPublicBandwith.do', {
          params: {
            brandwith: this.adjustForm.brand,
            publicIpId: this.hostInfo.publicId
          }
        }).then(response => {
          if (response.status == 200) {
            this.adjustForm.cost = response.data.result
          } else {
            this.adjustForm.cost = '正在计算'
          }
        })
      }),
      changAutoRenew() {
        let url = 'information/setAutoRenew.do'
        this.$http.get(url, {
          params: {
            type: 'host',
            id: this.hostInfo.id,
            flag: this.isAutoRenew ? '1' : '0'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.$Message.info(res.data.message)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },

      getComputerMonitor() {
        this.$http.get('alarm/getVmAlarmByHour.do', {
          params: {
            vmname: this.hostInfo.instanceName,
            type: 'core'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 用的以前接口数据格式，只有挨个赋值
            let cpuBrokenLine = JSON.parse(JSON.stringify(line))
            let memoryBrokenLine = JSON.parse(JSON.stringify(line))
            let diskBrokenLine = JSON.parse(JSON.stringify(line))
            cpuBrokenLine.xAxis.data = response.data.result.xaxis
            memoryBrokenLine.xAxis.data = response.data.result.xaxis
            diskBrokenLine.xAxis.data = response.data.result.xaxis
            cpuBrokenLine.series.push({
              name: 'CPU使用率（%）',
              type: 'line',
              data: response.data.result.cpuUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[0].chart = cpuBrokenLine
            memoryBrokenLine.series.push({
              name: '内存使用率（%）',
              type: 'line',
              data: response.data.result.memoryUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[1].chart = memoryBrokenLine
            diskBrokenLine.series.push({
              name: '磁盘使用率（%）',
              type: 'line',
              data: response.data.result.diskUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[2].chart = diskBrokenLine
          }
        })
      },
      changeMonitorDate(index) {
        let url = this.tab2.monitoringList[index].type == '近一天' ? 'alarm/getVmAlarmByHour.do' : 'alarm/getVmAlarmByDay.do'
        let dateType = this.tab2.monitoringList[index].type == '最近7天' ? 'week' : 'month'
        this.$http.get(url, {
          params: {
            vmname: this.hostInfo.instanceName,
            type: 'core',
            datetype: dateType
          }
        }).then(res => {
          if (res.data.status == 1) {
            let broken = this.tab2.monitoringList[index].type == 'line' ? JSON.parse(JSON.stringify(line)) : JSON.parse(JSON.stringify(bar))
            let type = this.tab2.monitoringList[index].showType == '折线' ? 'line' : 'bar'
            let name = index == 0 ? 'CPU使用率（%）' : index == 1 ? '内存使用率（%）' : '磁盘使用率（%）'
            let data = index == 0 ? res.data.result.cpuUse : index == 1 ? res.data.result.memoryUse : res.data.result.diskUse
            broken.series.push({
              name: name,
              type: type,
              data: data,
              barWidth: '15%'
            })
            broken.xAxis.data = res.data.result.xaxis
            this.tab2.monitoringList[index].chart = broken
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      changeMonitorShowType(index) {
        let broken = {}
        if (this.tab2.monitoringList[index].showType == '折线') {
          broken = JSON.parse(JSON.stringify(line))
          broken.series.push({
            name: this.tab2.monitoringList[index].chart.series[0].name,
            type: 'line',
            data: this.tab2.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.tab2.monitoringList[index].chart.xAxis.data
          this.tab2.monitoringList[index].chart = broken
        } else {
          broken = JSON.parse(JSON.stringify(bar))
          broken.series.push({
            name: this.tab2.monitoringList[index].chart.series[0].name,
            type: 'bar',
            data: this.tab2.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.tab2.monitoringList[index].chart.xAxis.data
          this.tab2.monitoringList[index].chart = broken
        }
      },
      getHostSnapshoot() {
        this.$http.get('Snapshot/listVMSnapshot.do', {
          params: {
            resourceType: 1,
            resourceId: this.computerId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.tab4.snapshootData = response.data.result
          }
        })
      },
      snapshootSelectionChange(selected) {
        this.tab4.snapshootSelection = selected
      },
      changeSnapshootPage(page) {
        this.tab4.currentPage = page
        this.getHostSnapshoot()
      },
      rollbackSubmit() {
        this.showModal.rollback = false
        let URL = 'Snapshot/revertToVMSnapshot.do'
        this.$http.get(URL, {
          params: {
            snapshotId: this.tab4.cursnapshot.snapshotid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message,
              duration: 5
            })
          } else {
            this.$message.info({
              content: response.data.message,
            })
          }
        })
      },
      // 确定删除快照
      delsnapsSubm() {
        this.showModal.delsnaps = false
        this.tab4.snapshootData.forEach(item => {
          this.tab4.snapshootSelection.forEach(item1 => {
            if (item.snapshotid == item1.snapshotid) {
              item.status = 3
            }
          })
        })
        let ids = this.tab4.snapshootSelection.map(item => {
          return item.id
        })
        this.tab4.snapshootSelection = []
        var URL = 'Snapshot/deleteVMSnapshot.do'
        this.$http.get(URL, {
          params: {
            ids: ids + ''
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.getHostSnapshoot()
          } else {
            this.$message.info({
              content: response.data.message,
            })
          }
        })
      },
      changeLogPage(page) {
        this.tab5.currentPage = page
        this.getHostLog()
      },
      getHostLog() {
        this.$http.get('log/queryLog.do', {
          params: {
            pageSize: this.tab5.pageSize,
            currentPage: this.tab5.currentPage,
            target: 'host',
            queryTime: this.tab5.logTime,
            targetId: this.hostInfo.id,
            message: this.tab5.searchName
          }
        }).then(response => {
          this.tab5.logPages = response.data.total
          this.tab5.logData = response.data.tableData
        })
      },
      logToggle() {
        switch (this.tab5.timeHorizon) {
          case '近一天':
            this.tab5.logTime = this.getCurrentDate() + ',' + this.getTomorrow()
            break
          case '近一周':
            this.tab5.logTime = this.logNearlySevenDays() + ',' + this.getTomorrow()
            break
          case '近一月':
            this.tab5.logTime = this.logNearlyThirtyDays() + ',' + this.getTomorrow()
            break
        }
        this.tab5.currentPage = 1
        this.getHostLog()
      },
      getTomorrow() {
        var day = new Date()
        day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      logNearlySevenDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 6)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      logNearlyThirtyDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 29)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      getCurrentDate() {
        return new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString()
      },

      // 获取安全组
      getAclList() {
        this.tab3.firewalLoading = true;
        this.$http.get('network/listaclListItem.do', {
          params: {
            aclListId: this.hostInfo.firewallId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (this.tab3.rule == '出站规则') {
              this.tab3.selectLenght = 0;
              this.tab3.firewalData = response.data.result.down;
              this.tab3.totalLenght = response.data.result.down.length;
              this.tab3.firewalLoading = false;
            }
            if (this.tab3.rule == '入站规则') {
              this.tab3.selectLenght = 0;
              this.tab3.firewalData = response.data.result.up;
              this.tab3.totalLenght = response.data.result.up.length;
              this.tab3.firewalLoading = false;
            }
          } else {
            this.$Message.info({
              content: response.data.message,
              duration: 5
            })
            this.tab3.firewalLoading = false;
          }
        }).catch(err => {
          if (err)
            this.tab3.firewalLoading = false;
        })
      },
      tab3RadioChange() {
        this.getAclList();
      },
      firewalSelectionChange(selection) {
        this.tab3.selectLenght = selection.length;
        selection.forEach(item => {
          this.tab3.id += item.id + ','
        })
      },
      handleSubmit() {
        this.$refs.newRuleFormValidate.validate(validate => {
            if (validate) {
              if (this.newRuleForm.protocol == 'ALL' || this.newRuleForm.protocol == 'ICMP') {
                this.newRuleForm.startPort = 1
                this.newRuleForm.endPort = 65535
              }
              this.showModal.createRule = false
              let data = {
                acllistitemname: this.newRuleForm.name,
                //itemid: this.newRuleForm.itemid,
                agreement: this.newRuleForm.protocol,
                operation: this.newRuleForm.access == 'Allow' ? '接受' : '拒绝',
                _status: 1
              }
              if (this.newRuleForm.way != 'Egress') {
                this.tab3.firewalData.push(data);
                this.tab3.rule = '入站规则';
              } else {
                this.tab3.firewalData.push(data);
                this.tab3.rule = '出站规则';
              }
              //this.loadingMessage = '正在创建规则，请稍候'
              //this.loading = true
              this.$http.get('network/createNetworkACL.do', {
                params: {
                  name: this.newRuleForm.name,
                  way: this.newRuleForm.way,
                  protocol: this.newRuleForm.protocol,
                  //itemid: this.newRuleForm.itemid,
                  cdir: this.newRuleForm.cidr,
                  startport: this.newRuleForm.startPort,
                  endport: this.newRuleForm.endPort,
                  acllistid: sessionStorage.getItem('firewallId'),
                  access: this.newRuleForm.access
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  //this.loading = false
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.getAclList();
                } else {
                  this.getAclList();
                  //this.loading = false
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          }
        )
      },
      del(aclId) {
        // this.upInformation.tableData.forEach(item => {
        //   if (item.id == aclId) {
        //     this.$set(item, '_status', 2)
        //   }
        // })
        // this.downInformation.tableData.forEach(item => {
        //   if (item.id == aclId) {
        //     this.$set(item, '_status', 2)
        //   }
        // })
        this.$http.get('network/deleteNetworkACL.do', {
          params: {
            id: aclId == '' ? this.tab3.id.substring(0, this.tab3.id.length - 1) : aclId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message
            })
            this.getAclList();
          } else {
            this.getAclList();
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      seeAll() {
        sessionStorage.setItem('isSeeHint','1')
        this.guideStep = 5
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      delSnapshootDisabled() {
        return this.tab4.snapshootSelection.length === 0
      },
      selectLenght() {
        return this.tab3.selectLenght;
      }
    },
    watch: {
      'adjustForm.brand'(value, oldValue) {
        this.adjustForm.cost = '正在计算'
        this.queryAdjustPrice()
      },
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      },
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .hint() {
    width: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: absolute;
    z-index: 9999;
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #666666;
      line-height: 20px;
      margin-bottom: 20px;
    }
    > span {
      float: right;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(24, 144, 255, 1);
      cursor: pointer;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
    span:nth-child(4) {
      float: left;
      cursor: auto;
      color: #666666;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #FFF;
      position: absolute;
      bottom: -6px;
      right: 50%;
      transform: rotate(135deg);
      box-shadow: 1px -1px 0px 0px rgba(0, 0, 0, 0.2);
    }
  }

  .host-config {
    padding: 20px 20px 0;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    position: relative;
    .config-top {
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        > span {
          cursor: pointer;
          color: #2A99F2;
        }
        > img {
          vertical-align: text-top;
          cursor: pointer;
          &.last {
            position: relative;
            top: -2px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        > button {
          float: right;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          font-size: 12px;
          line-height: 24px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          border: 1px solid rgba(42, 153, 242, 1);
          padding: 0px 15px;
          &:hover {
            background: rgba(42, 153, 242, 1);
            color: #FFFFFF;
          }
        }
        &.title {
          font-size: 18px;
        }
      }
    }
    .config-type {
      display: flex;
      > ul {
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        &.selected {
          background: #FFF;
          color: #2A99F2;
        }
      }
    }
    .hint_1 {
      .hint();
      left: 250px;
      top: -60px;
    }
    .hint_2 {
      .hint();
      left: -35px;
      top: 25px;
    }
    .hint_3 {
      .hint();
      left: 270px;
      top: 65px;
    }
    .hint_4 {
      .hint();
      top: 65px;
      right: 150px;
    }
  }

  .config-info {
    background: #FFF;
    padding: 20px;
    min-height: 660px;
    .tab-1 {
      display: flex;
      justify-content: space-between;
      > div {
        min-height: 280px;
        width: 280px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 20px;
        border: 1px dashed rgba(153, 153, 153, 1);
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          > span {
            color: rgba(42, 153, 242, 1);
            cursor: pointer;
          }
        }
        > ul {
          margin-top: 20px;
          > li {
            line-height: 28px;
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              &.one {
                display: inline-block;
                width: 90px;
              }
              &.two {
                color: rgba(51, 51, 51, 1);
              }
              &.three {
                cursor: pointer;
                color: #2A99F2;
              }
              &.four {
                display: inline-block;
                width: 80px;
              }
            }
          }
        }
      }
    }
    .tab-2 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        border-radius: 4px;
        padding: 20px;
        border: 1px dashed rgba(153, 153, 153, 1);
        width: 570px;
        height: 405px;
        margin-bottom: 20px;
        .item-title {
          border-bottom: 1px solid rgba(233, 233, 233, 1);
          padding-bottom: 10px;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
          span:nth-child(2) {
            float: right;
            color: rgba(153, 153, 153, 1);
          }
        }
        .item-type {
          margin-top: 18px;
        }
      }
    }
    .tab-3 {
      .content {
        padding: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(229, 233, 237, 1);
        .tab-3-title {
          border-bottom: 1px solid rgba(233, 233, 233, 1);
          padding-bottom: 20px;
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            span {
              color: #2A99F2;
              cursor: pointer;
            }
          }
        }
      }
      .selectMark {
        margin: 10px 0;
        > img {
          position: relative;
          top: 4px;
        }
        > span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
        }
      }
      .firewal {
        padding: 20px 0;
      }
    }
    .tab-4 {
      .selectMark {
        margin: 10px 0;
        > img {
          position: relative;
          top: 4px;
        }
        > span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .tab-5 {
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }

  .modal-p {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 20px;
  }

  .modal-img {
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 10px;
  }
</style>
