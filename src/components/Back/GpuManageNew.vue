<template>
    <div id="background">
      <div id="wrapper">
        <Spin fix v-show="loading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>{{loadingMessage}}</div>
        </Spin>
        <p style="margin: 10px 0 10px 0;color:#999999">总览 / <span>GPU云服务器</span> / <span style="color:#666;">管理</span></p>
        <div class="head">
          <div>
            <div class="host-name">
              <img style="cursor:pointer;" @click="$router.push('GpuListNew')" src="../../assets/img/host/h-icon9.png"/>
              <span >名称:{{gpuName}}</span>
              <img  src="../../assets/img/host/h-icon11.png" @click="showWindow.rename = true" style="height:16px;cursor:pointer;">
            </div>
            <div class="button_right">
              <button class="button-one" @click="link" v-if="gpuDetail.computerStatus == 1">连接主机</button>
              <button class="button-tow" @click="$router.go(0)">刷新</button>
            </div>
          </div>
          <div class="host-details">
              <p>{{gpuDetail.cpuNum}}CPU ,{{gpuDetail.memory}}G内存 ,{{gpuDetail.bandwith}}M宽带 </p>
          </div>
        </div>
        <div class="config-type">
          <ul v-for="item in configTypes" :class="{selected: configType == item}" @click="changeTabs(item)">{{ item }}</ul>
        </div>
        <div class="config-info">
          <div class="tab-1" v-if="configType == '基础信息' ">
                <div>
                   <p>主机信息</p>  
                  <ul>
                    <li><span class="one">镜像系统</span><span class="two">{{ gpuDetail.template}}</span><span class="three" @click="modifyMirror"> [修改]</span></li>
                    <li><span class="one">系统盘容量</span><span class="two">{{ gpuDetail.rootDiskSize}}G</span></li>
                    <li><span class="one">数据盘容量</span><span class="two">{{ gpuDetail.diskSize}}G</span><span class="three" @click="diskMount"> [挂载</span><span class="three" @click="diskUnload"> / 卸载]</span></li>
                    <li><span class="one">登陆密码</span><span class="two">{{ gpuDetail.template}}</span><span class="three" v-if="codePlaceholder == '发送密码'" @click="showWindow.lookPassword = true"> [{{codePlaceholder}}]</span>
                      <span class="two" v-else> [{{codePlaceholder}}]</span></li>
                    <li><span class="one">主机状态</span> <span  class="two">{{ gpuDetail.computerStatus? '开机': '关机' }}</span></li>
                  </ul>
                </div>
                 <div>
                   <p>网络信息</p>
                    <ul>
                      <li><span class="four">所属VPC</span>
                        <span class="three" v-if="gpuDetail.vpc" @click="toOther('vpc')">{{ gpuDetail.vpc}}</span>
                        <span v-else class="two">----</span></li>
                      <li><span class="four">所属子网</span>
                        <span class="three" v-if="gpuDetail.networkName" @click="toOther('vpc')">{{ gpuDetail.networkName}}</span>
                        <span v-else class="two">----</span></li>
                      <li><span class="four">内网IP</span><span class="two">{{ gpuDetail.privateIp?gpuDetail.privateIp:'----'}}</span></li>
                      <li><span class="four">外网IP</span><span class="two">{{ gpuDetail.publicIp? gpuDetail.publicIp : '----'}}</span>
                        <span :class="{three: bindForm.unbindText == '解绑IP'}" v-if="gpuDetail.publicIp" @click="unbindIp"> [{{ bindForm.unbindText}}]</span>
                        <span :class="{three: bindForm.bindIpText == '绑定IP' }" v-else @click="bindIP"> [{{ bindForm.bindIpText }}]</span></li>
                      <li><span class="four">带宽</span><span class="two">{{ gpuDetail.bandwith?gpuDetail.bandwith: '0'}}M</span>
                        <span class="three" v-if="gpuDetail.bandwith" @click="adjustIP"> [扩容]</span></li>
                      <li><span class="four">负载均衡</span><span class="two">{{(gpuDetail.loadbalance + '') ? gpuDetail.loadbalance + '' : '----'}}</span></li>
                      <li><span class="four">NAT网关</span><span class="two">{{ gpuDetail.netGateway? gpuDetail.netGateway : '----'}}</span></li>
                    </ul>
                </div>
                 <div>
                    <p>安全信息</p>
                    <ul>
                      <li><span class="four">安全组</span><span :class="{three: gpuDetail.firewall}" @click="toOther('firewall')"> {{ gpuDetail.firewall ? gpuDetail.firewall: '----'}}</span>
                      </li>
                      <li><span class="four">开放端口</span><span class="two"> {{gpuDetail.ports? gpuDetail.ports: '----' }}</span></li>
                    </ul>
                </div>
                 <div>
                  <p>资费信息</p>
                  <ul>
                    <li><span class="four">计费类型</span><span
                      class="two"> {{ gpuDetail.case_type == 1 ? '包年' : gpuDetail.casetype == 2 ? '包月' : gpuDetail.casetype == 3 ? '实时' : '七天'}}</span></li>
                    <li><span class="four">自动续费</span>
                      <i-switch size="small" style="position: relative;top: -2px;" v-model="isAutoRenew" @on-change="changAutoRenew"></i-switch>
                    </li>
                    <li><span class="four">创建时间</span><span class="two"> {{ gpuDetail.createTime}}</span></li>
                    <li><span class="four">到期时间</span><span class="two"> {{ gpuDetail.endTime}}</span></li>
                  </ul>
                </div>
          </div>
          <div class="tab-2" v-if="configType == '主机监控'">
            <div class="tab_box">
                <div class="title-Png">
                  <span>CPU利用率</span>
                  <span style="float: right">{{CPUTime}}</span>
                </div>
                <div style="width: 100%" class="center_chart">
                  <div class="chart" >
                    <ul class="objectList">
                      <li :class="cpuIndex == item.label? 'objectItems':'objectItem'" v-for="item in dayList" :key="item.label" @click="requestClick('cpu',item.label)">{{item.value}}</li>
                    </ul>
                    <div class="chart-rig">
                       <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda('cpu')">导出</Button>
                      <ul class="objectList">
                        <li :class="cpuMapIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartTwoClick('cpu',index)">{{item.value}}</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <chart ref="cpu" :options="cpu"></chart>
                  </div>
                </div>

              <!--内存使用率-->
              <div>
                <div class="title-Png">
                  <span>内存使用率</span>
                  <span style="float: right">{{momeryTime}}</span>
                </div>
                <div style="width: 100%" class="center_chart">
                  <div class="chart" >
                    <ul class="objectList">
                      <li :class="momeryIndex == item.label? 'objectItems':'objectItem'" v-for="item in momeryList" :key="item.label" @click="requestClick('memory',item.label)">{{item.value}}</li>
                    </ul>
                    <div class="chart-rig">
                      <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;" @click="dowloda('momery')">导出</Button>
                      <ul class="objectList">
                        <li :class="momeryMapIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in momeryMapList" :key="index" @click="chartTwoClick('memory',index)">{{item.value}}</li>
                      </ul>
                    </div>
                  </div>
                  <div style="width: 99%">
                    <chart ref="momery" :options="momery"></chart>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <div class="tab-3" v-if="configType == '防火墙'">
            <div class="content">
              <div class="tab-3-title">
                <span>{{ gpuDetail.firewall ? gpuDetail.firewall: '----'}}</span>
                <span style="margin-left: 40px">所属Vpc：<span @click="toOther('vpc')">{{gpuDetail.vpc}}</span></span>
                <RadioGroup v-model="tab3.rule" type="button" style="float: right" @on-change='tab3RadioChange'>
                  <Radio label="出站规则"></Radio>
                  <Radio label="入站规则"></Radio>
                </RadioGroup>
              </div>
              <div class="firewal">
                <div>
                  <Button type="primary" @click="showWindow.createRule = true">创建规则</Button>
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
          <div class="tab-5" v-if="configType == '操作日志'">
            <div class="tab_box">
                <p style="margin-bottom: 10px">操作日志</p>
                <div style="display: inline-block">
                  <ul class="objectList">
                    <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dateList" :key="index" @click="dayClick(index)">{{item.value}}</li>
                  </ul>
                </div>
                <div style="display: inline-block;float: right">
                  <span>开始结束时间</span>
                  <Date-picker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择日期"
                               style="width: 200px" :transfer="true"  @on-change="dataTimeChange"></Date-picker>
                  <Button type="primary" size="small" @click="selectOperationLog">查询</Button>
                </div>
                <Table :columns="journalList" :data="journalData" :loading='logLoading' style="margin-top: 10px;"></Table>
                <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                    <Page :total="total" :current="1" @on-change="currentChange"></Page>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
      <!--监控警告设置-->
      <modal v-model="showWindow.warningSetting">
        <div slot="header" class="modal-header-border">
          <span class="universal-modal-title">告警策略配置</span>
        </div>
        <div>
          <div style="display:flex;">
            <p style=" font-size: 14px;line-height: 22px;">通知类型</p>
            <Checkbox v-model="isletter" size="large" style="margin-left: 20px">站内信</Checkbox>
            <Checkbox v-model="isemailalarm" size="large" style="margin-left: 20px">邮箱</Checkbox>
            <Checkbox v-model="issmsalarm" size="large" style="margin-left: 20px">短信</Checkbox>
          </div>
          <div class="universal-modal-content-flex">
            <Form>
              <FormItem label="CPU利用率设定">
                <Select v-model="setCPU">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="内存使用率设定">
                <Select v-model="setRAM">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="磁盘空间利用率设定">
                <Select v-model="setDisk">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="流量流入告警设定">
                <Select v-model="setFluxIn">
                  <Option v-for="item in fluxList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="流量流出告警设定">
                <Select v-model="setFluxOut">
                  <Option v-for="item in fluxList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
        </div>
        <div slot="footer">
          <Button type="ghost" @click="showWindow.warningSetting=false">取消</Button>
          <Button type="primary" @click="setMonitoringOk">完成</Button>
        </div>
      </modal>

      <!--发送密码-->
      <Modal width="550" v-model="showWindow.lookPassword" :scrollable="true" class="lookPassword">
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
          <Button type="ghost" @click="showWindow.lookPassword=false">取消</Button>
          <Button type="primary" @click="lookPasswordSubm('lookPasswordForm')"
                  :disabled="!(lookPasswordForm.isemailalarmSec || lookPasswordForm.issmsalarmSec)">确定
          </Button>
        </div>
      </Modal>

        <!-- 修改主机名称 -->
      <Modal v-model="showWindow.rename" width="550" :scrollable="true">
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
          <Button type="ghost" @click="showWindow.rename = false">取消</Button>
          <Button type="primary" @click="checkRenameForm">确定</Button>
        </div>
      </Modal>
      <!-- 创建规则 -->
      <Modal v-model="showWindow.createRule" width="550" :scrollable="true">
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
          <Button type="ghost" @click="showWindow.createRule = false">取消
          </Button>
          <Button type="primary" @click="handleSubmit">确定
          </Button>
        </div>
      </Modal>
      <!-- 修改镜像重装系统 -->
      <Modal v-model="showWindow.mirrorModify" width="550" :scrollable="true">
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
          <Button type="ghost" @click="showWindow.mirrorModify = false">取消</Button>
          <Button type="primary" @click="resetSystem" :disabled="mirrorModifyForm.buttonText == '重装中'">{{mirrorModifyForm.buttonText}}</Button>
        </div>
      </Modal>

      <!-- 确认系统重装弹窗 -->
    <Modal v-model="showWindow.reload" :scrollable="true" :closable="false" :width="390">
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
        <Button @click="showWindow.reload=false">取消</Button>
        <Button type="primary" @click="resetSystem_ok" :disabled="reloadHintForm.input!='confirm'">确定</Button>
      </p>
    </Modal>

    <!-- 挂载硬盘模态框 -->
    <Modal v-model="showWindow.mountDisk" width="550" :scrollable="true">
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
                @click="$router.push('/buy/disk/')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买磁盘
            </span>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showWindow.mountDisk = false">取消</Button>
        <Button type="primary" @click="mountDisk_ok">确认挂载</Button>
      </div>
    </Modal>
    <!-- 修改密码 -->
    <Modal v-model="showWindow.modifyPassword" width="550" :scrollable="true">
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
        <Button type="ghost" @click="showWindow.modifyPassword = false">取消</Button>
        <Button type="primary" @click="modifyPassword_ok">确认修改</Button>
      </div>
    </Modal>

    <!-- 绑定ip时，没有公网ip提示 -->
    <Modal v-model="showWindow.publicIPHint" :scrollable="true" :closable="false" :width="390">
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
        <Button @click="showWindow.publicIPHint = false">取消</Button>
        <Button type="primary" @click="$router.push('/buy/elasticip/')">创建公网IP</Button>
      </p>
    </Modal>
    <!-- 绑定静态IP -->
    <Modal v-model="showWindow.bindIP" width="590" :scrollable="true">
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
              <span style="cursor:pointer;" @click="$router.push('/buy/elasticip/')">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showWindow.bindIP = false">取消</Button>
        <Button type="primary" @click="bindIp_ok('bindForm')">确定
        </Button>
      </div>
    </Modal>
    <!-- 解绑公网ip确认框 -->
    <Modal v-model="showWindow.unbindIP" :scrollable="true" :closable="false" :width="390">
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
        <Button @click="showWindow.unbindIP = false">取消</Button>
        <Button type="primary" @click="unbind_ok">确认解绑</Button>
      </p>
    </Modal>
    <!-- 带宽调整 -->
    <Modal v-model="showWindow.adjust" width="550" :scrollable="true">
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
        <Button type="ghost" @click="showWindow.adjust = false">取消</Button>
        <Button type="primary" @click="adjustOK" :disabled="adjustForm.brand == adjustForm.minBrand">确定
        </Button>
      </div>
    </Modal>
    </div>
</template>

<script>
  import axios from 'axios'
  import $store from '@/vuex'
  import {debounce} from 'throttle-debounce'
  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  import regExps from '../../util/regExp'
  import cpuOptions from "@/echarts/cpuUtilization"
  import momeryOptions from  "@/echarts/memory"
  const momery = JSON.stringify(momeryOptions);
  const cpu = JSON.stringify(cpuOptions);
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
    data(){
      var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,23}$/
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
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!regExp.test(value)) {
          callback(new Error('新密码由6-23位的字母数字组成，必须包含大小写字母、数字'));
        } else {
          if (regExp.test(value)) {
            this.$refs.resetPasswordForm.validateField('confirmPassword');
          }
          callback();
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (this.resetPasswordForm.newPassword != value) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      }
      const validaSinginName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (value.length < 8) {
          callback(new Error('长度至少为8位'));
        } else {
          callback();
        }
      }
      const validaSystem = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请选择镜像系统'));
        } else {
          callback();
        }
      }
      const validaRegisteredName = regExps.validaRegisteredName
      return{
        indexs:0,
        cpu:JSON.parse(cpu),
        momery:JSON.parse(momery),

        //操作日志查询动效
        logLoading:false,
        //快照id
          ids:'',
        //gpuName
        gpuName:sessionStorage.getItem('gpu_name'),
        isAutoRenew:'',
        //cpu统计图
        dayList:[
          {
            value:'今天',
            data:[0,0,0,0,0],
            day:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
            label:0
          },
          {
            value:'最近7天',
            data:[0,0,0,0,0,0,0],
            day:['---','---','---','---','---','---','---'],
            label:1
          },
          {
            value:'最近30天',
            data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            day:['---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---'],
            label:2
          }
        ],
        chartList:[
          {
            value:'折线',
            type:'line',
            boundaryGap:false
          },
          {
            value:'柱状图',
            type:'bar',
            boundaryGap:true
          }
        ],
        cpuIndex:0,
        cpuMapIndex:0,
        CPUTime:'',

        //内存统计图
        momeryList:[
          {
            value:'今天',
            data:[0,0,0,0,0],
            day:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
            label:0
          },
          {
            value:'最近7天',
            data:[0,0,0,0,0,0,0],
            day:['---','---','---','---','---','---','---'],
            label:1
          },
          {
            value:'最近30天',
            data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            day:['---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---','---'],
            label:2
          }
        ],
        momeryMapList:[
          {
            value:'折线',
            type:'line',
            boundaryGap:false
          },
          {
            value:'柱状图',
            type:'bar',
            boundaryGap:true
          }
        ],
        momeryMapIndex:0,
        momeryIndex:0,
        momeryTime:'',

        //快照详情
        snapsDetails:{},
        //回滚信息
        loadingMessage:'',
        loading:false,
        
        dateList:[
          {
            value:'近一天'
          },
          {
            value:'近一周'
          },
          {
            value:'近三十天'
          }
        ],

        //操作日志
        journalList:[
          {
            title:'操作对象',
            key:'operatetarget'
          },
          {
            title:'操作时间',
            key:'operatortime'
          },
          {
            title:'操作结果',
            render:(h,params) =>{
              return h('span', params.row.operatestatus == 1 ? '成功' : '失败')
            }
          },
          {
            title:'行为描述',
            key:'operatedes'
          }
        ],
        journalData:[],
        total:0,
        logTime:'',
        currentPage:1,

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
        //发送密码
        isActive:true,
        codePlaceholder:'发送密码',
        lookPasswordForm:{
          input:'',
          isemailalarmSec:'',
          issmsalarmSec:'',
        },
        lookPasswordFormRule:{
          input:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ]
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
        },

        //Gpu服务器详情
        gpuDetail:{},

        //显示弹窗
        showWindow:{
          //警告设置
          warningSetting:false,
          lookPassword:false,
          rollback:false,
          rename:false,
          createRule:false,
          mirrorModify:false,
          reload:false,
          mountDisk:false,
          modifyPassword:false,
          publicIPHint: false,
          bindIP: false,
          unbindIP: false,
          adjust:false
        },
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
        osOptions: [],
        reloadHintForm: {
          input: ''
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
        diskMountForm: {
          mountDisk: '',
          diskList: []
        },
        mountRuleValidate: {
          mountDisk: [
            {required: true, message: '请选择挂载的磁盘', trigger: 'change'}
          ]
        },
        //告警设置字段
        setList: [
          {
            value: 0.6,
            label: '60%'
          }, {
            value: 0.7,
            label: '70%'
          }, {
            value: 0.8,
            label: '80%'
          }, {
            value: 0.9,
            label: '90%'
          }, {
            value: 1,
            label: '100%'
          }
        ],
        fluxList: [
          {
            value: 1,
            label: '1M'
          }, {
            value: 2,
            label: '2M'
          }, {
            value: 3,
            label: '3M'
          }, {
            value: 4,
            label: '4M'
          }, {
            value: 5,
            label: '5M'
          }, {
            value: 6,
            label: '6M'
          }, {
            value: 7,
            label: '7M'
          }, {
            value: 8,
            label: '8M'
          }, {
            value: 9,
            label: '9M'
          }, {
            value: 10,
            label: '10M'
          }
        ],
        setCPU: 0.6,
        setRAM: 0.6,
        setDisk: 0.6,
        setFluxIn: 1,
        setFluxOut: 1,
        isletter: false,
        isemailalarm: false,
        issmsalarm: false,
        countdown:60,

        renameForm:{
            hostName:''
        },
        renameFormRule:[
            {
                hostName:{required:'true',message:'请输入主机名称',trigger:'blur'}
            }
        ],    
        configType: '基础信息',
        configTypes: ['基础信息', '主机监控', '防火墙', '操作日志'],
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
      }
    },
    methods:{
       changeTabs(item) {
        this.configType = item;
        switch (item) {
          case '基础信息':
            this.getGpuHostDetail()
            break
          case '主机监控':
            this.getUtilization()
            break
          case '防火墙':
            this.getAclList()
            break
          case '操作日志':
            this.selectOperationLog()
            break
        }
      },
      //获取GPU服务器详情
      getGpuHostDetail(){
        axios.get('gpuserver/listGpuServerById.do',{
          params:{
            GpuId:sessionStorage.getItem('uuId'),
            zoneId:this.$store.state.zone.zoneid,
            changeCost:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.gpuDetail = res.data.result;
            this.isAutoRenew = Boolean(this.gpuDetail.isAutoRenw)
          }
        })
      },


      //重置密码
      resetConfirm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.resetPasswordForm.buttonMessage = '正在重置中...'
            this.$http.get('information/resetPasswordForVirtualMachine.do', {
              params: {
                VMId: sessionStorage.getItem('uuId'),
                password: this.resetPasswordForm.newPassword,
                oldPassword: this.resetPasswordForm.oldPassword,
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.resetPasswordForm.buttonMessage = '确认修改'
              this.resetPasswordForm.oldPassword = ''
              this.resetPasswordForm.newPassword = ''
              this.resetPasswordForm.confirmPassword = ''
            })
          }
        })
      },

      //发送密码
      lookPasswordSubm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showWindow.lookPassword = false
            this.isActive = false
            this.codePlaceholder = '发送密码（60s）'
            var inter = setInterval(() => {
              this.countdown--
              this.codePlaceholder = '发送密码（' + this.countdown + 's）'
              if (this.countdown == 0) {
                clearInterval(inter)
                this.countdown = 60
                this.codePlaceholder = '发送密码'
                this.isActive = true
              }
            }, 1000)
            this.lookPasswordForm.isLetterSec = this.lookPasswordForm.isletterSec == false ? 0 : 1
            this.lookPasswordForm.isSmsAlarmSec = this.lookPasswordForm.issmsalarmSec == false ? 0 : 1
            this.lookPasswordForm.isEmailAlarmSec = this.lookPasswordForm.isemailalarmSec == false ? 0 : 1
            this.$http.post('log/sendVMPassword.do', {
              VMId: sessionStorage.getItem('uuId'),
              password: this.lookPasswordForm.input,
              letter: this.lookPasswordForm.isLetterSec,
              meail: this.lookPasswordForm.isEmailAlarmSec,
              phone: this.lookPasswordForm.isSmsAlarmSec
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.countdown=1;
              }
              this.lookPasswordForm.input = ''
            })
          }
        })
      },
      //发送密码
      lookPassword(){
        if(this.isActive)
          this.showWindow.lookPassword = true;
      },

      // 获取操作日志，近一天日期应该设置明天
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
      getYesterday() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },

      getNearlySevenDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 7)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      getNearlyThirtyDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 30)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },

      //获取操作日志
      selectOperationLog(){
        this.logLoading = true;
        axios.get('log/queryLog.do',{
          params:{
            zoneId:this.$store.state.zone.zoneid,
            pageSize: 10,
            currentPage: this.currentPage,
            target: 'gpu',
            targetId:sessionStorage.getItem('gpuId'),
            queryTime: this.logTime,
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.journalData = res.data.tableData;
            this.logLoading = false;
          }else{
            this.$Message.info(res.data.message);
            this.logLoading = false;
          }
        }).catch(err =>{
          if(err)
          this.logLoading = false;
        })
      },
      dataTimeChange(time){
        this.logTime = time.join(',');
      },
      currentChange(currentPage){
        this.currentPage = currentPage;
        this.selectOperationLog();
      },
      dayClick(val){
        this.indexs = val;
        if(val == 0){
          this.logTime = this.getCurrentDate() + ',' + this.getTomorrow();
        }else if(val == 1){
          this.logTime = this.logNearlySevenDays() + ',' + this.getTomorrow()
        }else if(val == 2){
          this.logTime = this.logNearlyThirtyDays() + ',' + this.getTomorrow()
        }
        this.selectOperationLog();
      },

      //导出统计图
      checkImg(code){
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
      },
      dowloda(name){
        var img = new Image();
        img = this.$refs[name].getConnectedDataURL({
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          type:'png'
        });
        let a = document.createElement('a');
        document.body.appendChild(a);
        var blob =this.checkImg(img);
        a.style.display = 'none';
        let url = URL.createObjectURL(blob);
        a.href = url;
        //添加了download属性才会是下载文件，不然就是跳转
        a.download = 'echarts';
        a.click();
        document.body.removeChild(a);
      },


      //获取CPU利用率和内存使用率
      getUtilization(){
        axios.get('alarm/getVmAlarmByHour.do',{
          params:{
            vmname:sessionStorage.getItem('instancename'),
            type: 'core'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.cpu.series[0].data = response.data.result.cpuUse;
            this.cpu.xAxis.data = response.data.result.xaxis;
          }
        })
      },

      //cpu选择
      requestClick(name,val){
        if(name == 'cpu'){
          this.cpuIndex = val;
          switch (this.dayList[val].value) {
            case '今天':
              this.CPUTime = this.getCurrentDate()
              break
            case '最近7天':
              this.CPUTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
            case '最近30天':
              this.CPUTime = this.getNearlyThirtyDays() + '--' + this.getCurrentDate()
              break
          }
        }else if(name == 'memory'){
          this.momeryIndex = val;
          switch (this.momeryList[val].value) {
            case '今天':
              this.momeryTime = this.getCurrentDate()
              break
            case '最近7天':
              this.momeryTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
            case '最近30天':
              this.momeryTime = this.getNearlyThirtyDays() + '--' + this.getCurrentDate()
              break
          }
        }
        let url='';
        let dateType = '';
       if(name == 'cpu'){
         url =  this.dayList[val].value == '今天'?urlList.dayURL : urlList.otherURL;
         dateType = this.dayList[val].label == 1 ? 'week' :'month';
        }else if(name == 'memory'){
          url =  this.momeryList[val].value == '今天'?urlList.dayURL : urlList.otherURL;
         dateType = this.momeryList[val].label == 1 ? 'week' :'month';
       }
       axios.get(url,{
         params:{
           vmname:sessionStorage.getItem('instancename'),
           type:'core',
           datetype:dateType,
           zoneId:this.$store.state.zone.zoneid
         }
       }).then(res => {
         if(res.status == 200 && res.data.status == 1){
           if(name == 'cpu'){
             this.cpu.xAxis.data = res.data.result.xaxis;
             this.cpu.series[0].data =  res.data.result[name + 'Use'];
           }else {
            this.momery.xAxis.data = res.data.result.xaxis;
             this.momery.series[0].data =  res.data.result[name + 'Use'];
           }
         }
       })
      },
      chartTwoClick(name,val){
        if(name == 'cpu'){
          this.cpuMapIndex = val;
          this.cpu.series[0].type = this.chartList[val].type;
          this.cpu.xAxis.boundaryGap = this.chartList[val].boundaryGap;
        }else if(name == 'memory'){
          this.momeryMapIndex = val;
          this.momery.series[0].type = this.momeryMapList[val].type;
          this.momery.xAxis.boundaryGap = this.momeryMapList[val].boundaryGap;
        }
      },

      setMonitoring() {
        this.showWindow.warningSetting = true;
        this.$http.get('information/alarmConfig.do', {
          params: {
            instancename: sessionStorage.getItem('instancename')
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.setCPU = response.data.result.cpuuse
            this.setRAM = response.data.result.memoryuse
            this.setDisk = response.data.result.diskuse
            this.setFluxIn = response.data.result.networkin
            this.setFluxOut = response.data.result.networkout
            this.isletter = response.data.result.isletter == 0 ? false : true
            this.isemailalarm = response.data.result.isemailalarm == 0 ? false : true
            this.issmsalarm = response.data.result.issmsalarm == 0 ? false : true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
       // 告警策略配置确定
      setMonitoringOk() {
        this.$http.get('information/upalarmConfig.do', {
          params: {
            instancename: sessionStorage.getItem('instancename'),
            cpuUse: this.setCPU,
            memoryUse: this.setRAM,
            diskUse: this.setDisk,
            networkIn: this.setFluxIn,
            networkOut: this.setFluxOut,
            isLetter:  this.isletter == true ? '1' : '0',
            isSmsAlarm: this.issmsalarm == true ? '1' : '0',
            isEmailAlarm: this.isemailalarm == true ? '1' : '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.showWindow.warningSetting = false
          } else {
            this.showWindow.warningSetting = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },

      //连接主机
      link() {
        sessionStorage.setItem('link-companyid', this.gpuDetail.companyid);
        sessionStorage.setItem('link-vmid', this.gpuDetail.computerid);
        sessionStorage.setItem('link-zoneid', this.gpuDetail.zoneid);
        sessionStorage.setItem('link-phone', this.$store.state.authInfo.phone);
        this.$router.push('link');
      },

      checkRenameForm() {
        this.$refs.renameForm.validate((valid) => {
          if (valid) {
            this.showWindow.rename = false
            this.$http.post('information/changeVmName.do', {
              vmId: this.hostCurrentSelected.computerid,
              name: this.renameForm.hostName
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.hostSelection = []
                this.getHostList()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },

      tab3RadioChange() {
        this.getAclList();
      },
      // 获取防火墙
      getAclList() {
        this.tab3.firewalLoading = true;
        this.$http.get('network/listaclListItem.do', {
          params: {
            aclListId: this.gpuDetail.firewallId
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
              this.showWindow.createRule = false
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
                  acllistid: this.gpuDetail.firewallId,
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

      modifyMirror() {
        this.getMirrorList()
        this.showWindow.mirrorModify = true
      },

      resetSystem() {
        this.$refs.mirrorModifyForm.validate((valid) => {
          if (valid) {
            this.showWindow.reload = true
          }
        })
      },
      resetSystem_ok() {
        this.showWindow.reload = false
        this.mirrorModifyForm.buttonText = '重装中'
        this.$http.post('information/restoreVirtualMachine.do', {
          VMId: this.gpuDetail.computerid,
          templateId: this.mirrorModifyForm.system[1],
          adminPassword: this.mirrorModifyForm.consolePassword
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showWindow.mirrorModify = false
            this.mirrorModifyForm.buttonText = '确认重装'
            this.mirrorModifyForm.system = []
            this.mirrorModifyForm.consolePassword = ''
            this.$Message.success('系统重装成功')
            this.getGpuHostDetail()
          } else {
            this.mirrorModifyForm.buttonText = '确认重装'
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
       
     
      // 挂载磁盘
      diskMount() {
        this.getDiskList()
        this.showWindow.mountDisk = true
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
            this.showWindow.mountDisk = false
            this.$http.get('Disk/attachVolume.do', {
              params: {
                diskId: this.diskMountForm.mountDisk,
                VMId: this.gpuDetail.computerid
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.info({
                  content: response.data.message,
                })
                this.getGpuHostDetail()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      modifyPassword_ok() {
        this.$refs.modifyPassword.validate((valid) => {
          if (valid) {
            this.showWindow.modifyPassword = false
            let url = 'information/resetPasswordForVirtualMachine.do'
            this.$http.get(url, {
              params: {
                VMId:this.gpuDetail.computerid,
                password: this.modifyPasswordForm.newPassword,
                oldPassword: this.modifyPasswordForm.oldPassword
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$Message.info({
                  content: res.data.message,
                })
                this.getGpuHostDetail()
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
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
      toOther(val) {
        switch (val) {
          case 'vpc':
            sessionStorage.setItem('vpcId', this.gpuDetail.vpcId)
            this.$router.push('vpcManage')
            break
          case 'firewall':
            if (this.gpuDetail.firewall) {
              sessionStorage.setItem('firewallId', this.gpuDetail.firewallId)
              this.$router.push('firewallManage')
            }
            break
        }
      },
      changAutoRenew() {
        if (this.gpuDetail.casetype != 2 && this.gpuDetail.casetype != 1) {
          this.getGpuHostDetail()
          return
        }
        let url = 'information/setAutoRenew.do'
        this.$http.get(url, {
          params: {
            type: 'host',
            id: this.gpuDetail.id,
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
      
      bindIP() {
        if (this.bindForm.bindIpText != '绑定IP') {
          return
        }
        this.bindForm.publicIP = ''
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: 0,
            vpcId: this.gpuDetail.vpcId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicIPList = response.data.result
            if (this.publicIPList == '') {
              this.showWindow.publicIPHint = true
            } else {
              this.showWindow.bindIP = true
            }
          }
        })
      },
      bindIp_ok(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.showWindow.bindIP = false
              this.$http.get('network/enableStaticNat.do', {
                params: {
                  ipId: this.bindForm.publicIP,
                  VMId: this.gpuDetail.computerid
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
        this.showWindow.unbindIP = true
      },
      unbind_ok() {
        this.showWindow.unbindIP = false
        this.$http.get('network/disableStaticNat.do', {
          params: {
            ipId: this.gpuDetail.publicIpId,
            VMId: this.gpuDetail.computerid
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
        this.adjustForm.brand = parseInt(this.gpuDetail.bandwith)
        this.adjustForm.minBrand = parseInt(this.gpuDetail.bandwith)
        this.showWindow.adjust = true
      },
      adjustOK() {
        this.showWindow.adjust = false
        this.$http.get('continue/UpPublicBnadwith.do', {
          params: {
            bandwith: this.adjustForm.brand,
            publicIpId: this.gpuDetail.publicId
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
            publicIpId: this.gpuDetail.publicId
          }
        }).then(response => {
          if (response.status == 200) {
            this.adjustForm.cost = response.data.result
          } else {
            this.adjustForm.cost = '正在计算'
          }
        })
      }),
    },

    created(){
        this.computerId = sessionStorage.getItem('manageId')
        this.getGpuHostDetail();
        this.getUtilization();
        this.logTime = this.getCurrentDate() + ',' + this.getTomorrow();
        this.CPUTime = this.getCurrentDate();
        this.momeryTime = this.getCurrentDate();
        this.selectOperationLog();
        this.$http.get('alarm/getVmAlarmByHour.do', {
          params: {
            vmname: sessionStorage.getItem('instancename'),
            type: 'core',
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cpu.series[0].data = response.data.result.cpuUse;
            this.momery.series[0].data = response.data.result.memoryUse;
            this.cpu.xAxis.data = response.data.result.xaxis;
            this.momery.xAxis.data = response.data.result.xaxis;
          }
        })

    },
    watch:{
      'adjustForm.brand'(value, oldValue) {
        this.adjustForm.cost = '正在计算'
        this.queryAdjustPrice()
      },
    }

  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .head{
     background:#F6FAFD;
    height: 137px;
    padding: 20px;
    .host-details{
      margin-top: 17px;
      font-size: 14px;
      color: #333;
    }
  }
  .tabs{
    padding: 0 0 20px 20px;
    margin-top: -32px;
    .tabs-info{
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        vertical-align:top;
        >p{
           color: #333; 
        }
        span{
            margin-left: 5px;
            color:#2A99F2;
        }
        border: 1px dashed #999999;
        padding: 20px 0 0 20px;
        border-radius: 4px;
        width: 280px;
        height: 280px;
        .info-subject{
            margin-top: 20px;
            color:#666666;
            >p{
              margin:7px 0;
            }
        }
    }
  }
  .tabpane .ivu-tabs-bar{
            border: none;
    }
  .button_right{
    float: right;
    color: #2A99F2;
    .button-one{
      width: 78px;
      height: 28px;
      background-color: #2A99F2;
      color: #fff;
      margin-right: 10px;
      cursor: pointer;
      border: none;
      border:1px solid #2A99F2;
      box-shadow: 0px 0px 0px rgb(42, 153, 242);
      border-radius: 4px;
    }
    .button-tow{
      width: 78px;
      height: 28px;
      background-color: #fff;
      color: #2a99f2;
      margin-right: 10px;
      cursor: pointer;
      border: none;
      border:1px solid #2A99F2;
      border-radius: 4px;
    }
    .button-tow:hover{
      color: #fff;
      background-color: #2A99F2;
    }
  }
  .host_box{
    background: #FFFFFF;
    padding:10px 92px 10px 24px;
    font-family: '.AppleSystemUIFont';
    margin-right: 1%;
    box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.35);
    span{
      color: #2A99F2;
      cursor:pointer;
    }
    p{
      line-height: 18px;
    }
  }
  .tab_box{
    width: 100%;
    margin-top: -14px;
    padding: 10px 20px 0 0;
    background: #FFFFFF;
  }
  .center_chart {
    margin-top: 19px;
    span {
      padding: 5px 16px;
      border: 1px solid #d9d9d9;
      display: inline-block;
      margin-right: -4px;
      cursor: pointer;
      border-radius: 4px  0px  0px  4px;
    }
    span:hover {
      color: #2a99f2;
      border: 1px solid #2a99f2;
      cursor: pointer;
    }
    .chart-text {
      width: 50%;
    }
    .objectList {
      font-family: PingFangSC;
      display: inline-block;
      li:first-child{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      li:last-child{
        border-top-right-radius:4px;
        border-bottom-right-radius: 4px;
      }
      .objectItem {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #D9D9D9;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItems {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #2a99f2;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItem:hover {
        border:1px solid #2a99f2;
        cursor: pointer;
      }
    }
    .chart{
      margin-top:10px;height:30px;
    }
    .chart-rig{
     height:30px;float: right;
    }
  }
  .echarts {
    width: 100%;
    height: 440px;
  }
  .title-Png{
    font-family: '.AppleSystemUIFont';
    margin-top: 10px;
    span:nth-child(1){
      font-size: 16px;
      color: #333333;
    }
    span:nth-child(2){
      font-size: 14px;
      color: #666666;
    }
  }
  .objectList {
    font-family: PingFangSC;
    li:first-child{
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    li:last-child{
      border-top-right-radius:4px;
      border-bottom-right-radius: 4px;
    }
    .objectItem {
      display: inline-block;
      padding: 5px 16px;
      text-align: center;
      border: 1px solid #D9D9D9;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItems {
      display: inline-block;
      padding: 5px 16px;
      text-align: center;
      border: 1px solid #2a99f2;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItem:hover {
      border:1px solid #2a99f2;
      cursor: pointer;
    }
  }
  .send {
    color: rgb(42, 153, 242);
    cursor: pointer;
  }
  .nosend {
    color: #666666;
    cursor: not-allowed;
  }
  .one-row-text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .host-name{
      display: inline-block;
      img{
          vertical-align: middle;
      }
      span{
          vertical-align: middle;
          font-size: 18px;
          margin: 0 10px 0 5px;
      }
  }
  .config-type {
      margin-top: -40px;
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
          margin-bottom: 20px;
          > span {
            color: rgba(42, 153, 242, 1);
            // cursor: pointer;
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
</style>
