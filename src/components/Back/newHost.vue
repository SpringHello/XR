<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云主机</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云主机是一台配置好了的服务器，它有您期望的硬件配置、操作系统和网络配置。XRcloud为您提供的云主机具有安全、弹性、高性能等特点。</p>
        </div>
        <div class="operator-bar" style="position: relative">
          <Button type="primary" @click="$router.push('/buy/host/')">+ 创建</Button>
          <Poptip
            confirm
            width="230"
            placement="right"
            @on-ok="hostShutdown(1)"
            title="您确认关闭选中的主机吗？" style="margin: 0 0 0 10px">
            <Button type="primary" :disabled="shutdownDisabled">关机</Button>
          </Poptip>
          <Button type="primary" @click="hostStart(1)" :disabled="startDisabled">开机</Button>
          <Poptip
            confirm
            width="230"
            placement="right"
            @on-ok="hostRestart(1)"
            title="您确认重启选中的主机吗？" style="margin: 0 10px">
            <Button type="primary" :disabled="restartDisabled">重启</Button>
          </Poptip>
          <Poptip
            confirm
            width="230"
            placement="right"
            @on-ok="hostDelete(1)"
            title="您确认删除选中的主机吗？">
            <Button type="primary" :disabled="deleteDisabled">删除</Button>
          </Poptip>
          <Dropdown style="margin-left: 10px;vertical-align: middle;" @on-click="hideEvent" class="moreOperation">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Dropdown-item name="resetPassword" :disabled="resetPasswordDisabled">重置密码</Dropdown-item>
              <Dropdown-item name="joinLoadBalance" :disabled="joinLoadBalanceDisabled">加入负载均衡</Dropdown-item>
              <Dropdown-item name="bindingIP" :disabled="bindingIPDisabled">绑定IP</Dropdown-item>
              <Dropdown-item name="unbindIP" :disabled="unbindIPDisabled">解绑公网IP</Dropdown-item>
              <Dropdown-item name="rename" :disabled="renameDisabled">重命名</Dropdown-item>
              <Dropdown-item name="ratesChange" :disabled="ratesChangeDisabled">
                <Tooltip content="资费变更只适用于实时计费的资源" placement="top">资费变更
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="renewal" :disabled="hostRenewDisabled">主机续费</Dropdown-item>
              <Dropdown-item name="backup" :disabled="makeSnapshotDisabled">制作快照</Dropdown-item>
              <Dropdown-item name="mirror" :disabled="makeMirrorDisabled">
                <Tooltip content="制作镜像只适用于已关机的资源" placement="top">制作镜像
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="upgrade" :disabled="hostUpgradeDisabled">
                <Tooltip content="主机升级只适用于已关机的资源" placement="top">
                  主机升级<span
                  style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>
                </Tooltip>
              </Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div class="selectMark">
          <img src="../../assets/img/host/h-icon10.png" alt="icon"/>
          <span>共 {{ hostPages}} 项 | 已选择 <span style="color:#FF624B;">{{ hostSelection.length }} </span>项</span>
          <span class="guide" style="margin-left: 20px" @click="$router.push('hostCard')"><Icon type="grid"></Icon></span>
          <span class="guide" @click="$router.push('host')"><Icon type="navicon-round"></Icon></span>
          <div class="hint_1" v-show="guideStep == 1">
            <p>需要新睿云2.0指引提示？</p>
            <span @click="guideNext">需要</span>
            <span @click="seeAll">不需要</span>
            <span>{{guideStep }} / 10</span>
          </div>
          <div class="hint_2" v-show="guideStep == 2">
            <p>连接主机在这里</p>
            <span @click="guideStep = 3">知道了</span>
            <span></span>
            <span>{{guideStep }} / 10</span>
          </div>
          <div class="hint_3" v-show="guideStep == 3">
            <p>上面的操作按钮，可对列表进行批量操作。更多操作里除了更改密码，其余都是单项操作</p>
            <span @click="guideStep = 4">知道了</span>
            <span></span>
            <span>{{guideStep }} / 10</span>
          </div>
          <div class="hint_4" v-show="guideStep == 4">
            <p>点击「状态」可查看该主机的监控数据。（异常和删除至回收站状态不可查看）</p>
            <span @click="guideStep = 5">知道了</span>
            <span></span>
            <span>{{guideStep }} / 10</span>
          </div>
          <div class="hint_5" v-show="guideStep == 5">
            <p>点击用户名称可进入管理页面。</p>
            <span @click="guideStep = 6">知道了</span>
            <span></span>
            <span>{{guideStep }} / 10</span>
          </div>
          <div class="hint_6" v-show="guideStep == 6">
            <p>管理主机在这里</p>
            <span @click="hintToManage">知道了</span>
            <span></span>
            <span>{{guideStep }} / 10</span>
          </div>
        </div>
        <Table :columns="hostListColumns" :data="hostListData" @on-selection-change="hostSelectionChange"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="hostPages" :current="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
    </div>
    <!-- 监控信息 -->
    <div class="monitor" ref="monitor">
      <div class="title">
        <span>{{ monitorName }}云主机监控图表</span>
        <div @click="closeMonitor">
          <Icon type="close" style="font-size: 18px;cursor: pointer"></Icon>
        </div>
      </div>
      <div class="item" v-for="(item,index) in monitoringList">
        <div class="item-title">
          <span>{{ item.title}}</span>
          <span>{{  currentData }}</span>
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
    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title"> 选择认证方式</span>
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用新睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用新睿云所有资源</p>
          <p><i></i>企业级无限量的资源建立额度</p>
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
        <p class="modal-text-hint-bottom">
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：400-050-5565</p>
      </div>
    </Modal>
    <!-- 删除主机弹窗 -->
    <Modal v-model="showModal.delHost" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除主机</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">主机删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delHost = false">取消</Button>
        <Button type="primary" @click="delHostOk">确认删除</Button>
      </p>
    </Modal>
    <!-- 加入负载均衡弹窗 -->
    <Modal v-model="showModal.balance" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">加入负载均衡</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="loadBalanceForm" ref="loadBalanceForm" :rules="loadBalanceFormRule">
          <Form-item label="选择弹性负载均衡名称" prop="loadbalanceroleid">
            <Select v-model="loadBalanceForm.loadbalanceroleid" placeholder="请选择" style="width:240px;">
              <Option v-for="(item,index) in listLoadBalanceRole" :key="index"
                      :value="item.loadbalanceroleid+item.type||item.lbid">
                <span v-if="item.name">{{item.name}}</span>
                <span v-if="item.lbname">{{item.lbname}}</span>
              </Option>
            </Select>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:4px;right:-110px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('balance')">创建负载均衡</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.balance = false">取消</Button>
        <Button type="primary" @click="joinBalanceSubm('loadBalanceForm')">确定
        </Button>
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
        <Button type="primary" @click="$router.push('/buy/elasticip/')">创建公网IP</Button>
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
              <span style="cursor:pointer;" @click="$router.push('/buy/elasticip/')">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" @click="bindIpSubmit('bindForm')">确定
        </Button>
      </div>
    </Modal>
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
    <!-- 资费变更弹出框 -->
    <Modal v-model="showModal.ratesChange" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">变更资费选择（资费变更适用于实时收费转包月/年）</span>
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
          <FormItem label="是否同时变更绑定IP与磁盘" v-if="relevanceDisks||relevanceIps">
            <CheckboxGroup v-model="relevanceAlteration">
              <Checkbox label="ip" v-if="relevanceIps">变更绑定IP</Checkbox>
              <Checkbox label="disk" v-if="relevanceDisks">变更绑定磁盘</Checkbox>
            </CheckboxGroup>
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
    <!-- 包年包月续费弹窗 -->
    <Modal v-model="showModal.renewal" width="590" :scrollable="true">
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
          <div class="renewal-info">
            <ul>
              <li><span>主机名称：</span>{{renewalInfo.computername}}</li>
              <li><span>操作系统：</span>{{renewalInfo.templatename}}</li>
              <li><span>主机配置：</span>{{renewalInfo.serviceoffername}}</li>
              <li><span>剩余时长：</span>{{renewalInfo.endtime}}</li>
            </ul>
          </div>
          <FormItem label="是否同时续费绑定IP与磁盘" v-if="isDisks||isIps">
            <CheckboxGroup @on-change="bindRenewal" v-model="bindRenewalVal">
              <Checkbox label="ip" v-if="isIps">续费绑定IP</Checkbox>
              <Checkbox label="disk" v-if="isDisks">续费磁盘</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div class="renewal-upgrade">
            <p>如果现在配置内容不支持使用，可进行<span style="color:#333;cursor:not-allowed">主机升级</span>
            </p>
          </div>
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
        <Button type="ghost" @click="showModal.renewal = false">取消</Button>
        <Button type="primary" @click="renewalOk" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 实时续费 -->
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
    <!-- 制作快照弹窗 -->
    <Modal v-model="showModal.backup" width="590" :scrollable="true" class="create-snas-modal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作快照</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">您正为<span class="bluetext">{{currentHostname}}</span>制作快照</p>
        <Form ref="backupForm" :model="backupForm" :rules="backupFormRule">
          <FormItem label="快照名称" prop="name">
            <Input v-model="backupForm.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>
          </FormItem>
          <div style="padding-top: 11px;margin-right: 100px;">
            <div style="font-size: 14px;color:#495060;margin-bottom: 15px">是否保存内存信息
              <Poptip trigger="hover" width="400">
                <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
                <div slot="content">
                  <div>
                    您可以选择在制作快照的时候保存您主机的当前运行状态。当您选择“保存”之时，
                    当前主机的内存将被记录，在您对快照执行回滚操作的时候，也只能在开机状态下执行；当您选择“不保存”时
                    此次快照将不记录主机内存信息，您在通过该快照回滚的时候只能在关机状态下执行。
                  </div>
                </div>
              </Poptip>
            </div>
            <RadioGroup v-model="backupForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </div>
        </Form>
        <p class="modal-text-hint-bottom">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backup=false">取消</Button>
        <Button type="primary" @click="backupSubmit('backupForm')">制作快照</Button>
      </div>
    </Modal>
    <!-- 生成镜像弹窗 -->
    <Modal v-model="showModal.mirror" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作镜像</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="mirrorForm" ref="mirrorForm" :rules="mirrorFormRule">
          <Form-item label="镜像名称" prop="mirrorName">
            <Input v-model="mirrorForm.mirrorName" placeholder="小于20位数字或字母"></Input>
          </Form-item>
          <Form-item label="备注">
            <Input v-model="mirrorForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 2}"
                   placeholder="小于20个字（选填)"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mirror = false">取消</Button>
        <Button type="primary" @click="mirrorSubmit('mirrorForm')">确定
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
          <p class="lh24">您确认解绑选中主机的公网IP吗
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unbindIP = false">取消</Button>
        <Button type="primary" @click="unbind">确认解绑</Button>
      </p>
    </Modal>
    <!-- 批量重置密码框-->
    <Modal v-model="showModal.resetPassword" width="700" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">重置密码</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="resetModal-title">您已选 <span>{{ resetPasswordHostData.length }} 台主机</span></p>
        <ul class="resetModal-table">
          <li>No.</li>
          <li>用户名</li>
          <li>主机名</li>
          <li>当前密码</li>
        </ul>
        <ul class="resetModal-table data" v-for="(item,index) in resetPasswordHostData">
          <li>{{ index + 1 }}</li>
          <li>{{ item.computername}}</li>
          <li @click="toManage(item)">{{ item.instancename}}</li>
          <li v-if="item.changepassword">
            <input :class="{error: item.errorMsg}" v-model="item.currentPassword" @input="item.errorMsg = ''" type="text" placeHolder="请输入当前密码" :maxlength="32"></input>
            <p v-if="item.errorMsg == 'passwordMistake'">您输入的密码有误</p>
            <p v-if="item.errorMsg == 'passwordIsEmpty'">请输入主机密码</p>
          </li>
          <li v-else>默认密码</li>
        </ul>
        <div v-if="resetPasswordForm.hintGrade == 0">
          <div class="resetModal-import">
            <span>新密码</span>
            <input v-model="resetPasswordForm.password" type="password" @input="verifyPassword" placeHolder="请输入新密码" ref="passwordInput"/>
            <img src="../../assets/img/login/lr-icon3.png" @click="changeResetPasswordType('passwordInput')"/>
          </div>
          <div class="resetModal-hint">
            <p v-show="resetPasswordForm.errorMsg=='passwordUndercapacity'">您输入的密码强度不足</p>
            <p v-show="resetPasswordForm.errorMsg=='passwordHint'">提醒：密码必须是8-32个包含数字和大小写字母的字符</p>
            <p v-show="resetPasswordForm.errorMsg=='passwordHintTwo'">注意：您的密码已经符合设置密码规则，但密码需要具备一定的强度，建议您设置12位以上，至少包括4项（：，-（）；）的特殊字符，每种字符大于等于2位</p>
          </div>
          <div class="resetModal-import">
            <span>确认密码</span>
            <input type="password" v-model="resetPasswordForm.passwordAffirm" placeHolder="请确认新密码" ref="passwordInputAffirm"/>
            <img src="../../assets/img/login/lr-icon3.png" @click="changeResetPasswordType('passwordInputAffirm')"/>
          </div>
          <div class="resetModal-hint">
            <p v-show="resetPasswordForm.errorMsg=='passwordAffirm'">提醒：两次输入的密码不一致</p>
          </div>
        </div>
        <div v-else class="resetModal-p">
          <p>1、为了避免数据丢失，重置密码需要在<span>关机</span>状态下操作，实例将关机中断您的业务，请仔细确认</p>
          <p>2、强制关机可能会导致数据丢失或文件损坏，您也可以主动关机后进行重置密码</p>
          <p style="margin-bottom: 20px">3、强制关机可能需要您等待较长时间，请耐心等待</p>
          <Checkbox v-model="resetPasswordForm.agreeRule"><span style="margin-left: 10px;font-size: 14px">同意强制关机</span></Checkbox>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.resetPassword = false">取消</Button>
        <Button type="primary" @click="resetPasswordNext" v-if="resetPasswordForm.hintGrade == 0">下一步</Button>
        <Button type="primary" v-else :disabled="!resetPasswordForm.agreeRule" @click="resetPasswordOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'
  import line from '@/echarts/hostManage/line'
  import bar from '@/echarts/hostManage/bar'
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
        guideStep: 1,
        regExpObj: {
          password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,32}$/
        },
        showModal: {
          selectAuthType: false,
          balance: false,
          publicIPHint: false,
          bindIP: false,
          rename: false,
          ratesChange: false,
          renewal: false,
          Renew: false,
          backup: false,
          mirror: false,
          unbindIP: false,
          delHost: false,
          resetPassword: false
        },
        hostListColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            ellipsis: true,
            renderHeader: (h, params) => {
              return h('ul', {}, [
                h('li', {}, '用户名称 / '),
                h('li', {}, '唯一名称')
              ])
            },
            render: (h, params) => {
              let text_1 = params.row.computername ? params.row.computername : '----'
              let text_2 = params.row.instancename ? params.row.instancename : '----'
              if (params.row.status == 1) {
                return h('ul', {}, [
                  h('li', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        sessionStorage.setItem('manageId', params.row.computerid)
                        this.$router.push('manage')
                      }
                    }
                  }, text_1 + ' / '),
                  h('li', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        sessionStorage.setItem('manageId', params.row.computerid)
                        this.$router.push('manage')
                      }
                    }
                  }, text_2)
                ])
              } else {
                return h('ul', {}, [
                  h('li', {}, text_1 + ' / '),
                  h('li', {}, text_2)
                ])
              }
            }
          },
          {
            title: '状态/监控',
            filters: [
              {
                label: '开启',
                value: 1
              },
              {
                label: '关机',
                value: 2
              },
              {
                label: '欠费',
                value: 3
              },
              {
                label: '异常',
                value: 4
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.status == 1 && row.computerstate == 1;
              } else if (value === 2) {
                return row.status == 1 && row.computerstate == 0;
              } else if (value === 3) {
                return row.status == 0;
              } else if (value === 4) {
                return row.status == -1;
              }
            },
            render: (h, params) => {
              let restart = params.row.restart ? params.row.restart : 0
              let restore = params.row.restore ? params.row.restore : 0
              let resetpwd = params.row.resetpwd ? params.row.resetpwd : 0
              let bindip = params.row.bindip ? params.row.bindip : 0
              let icon_1 = require('../../assets/img/host/h-icon1.png')
              let icon_2 = require('../../assets/img/host/h-icon2.png')
              let icon_3 = require('../../assets/img/host/h-icon3.png')
              let icon_4 = require('../../assets/img/host/h-icon4.png')
              let icon_5 = require('../../assets/img/host/h-icon5.png')
              let styleInfo = {
                marginLeft: '5px',
                lineHeight: '16px'
              }
              switch (params.row.status) {
                case -2:
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_5
                      }
                    }, ''),
                    h('span', {
                      style: styleInfo
                    }, '删除至回收站')
                  ])
                  break
                case -1:
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_2
                      }
                    }, ''),
                    h('span', {
                      style: styleInfo
                    }, '异常')
                  ])
                  break
                case 0:
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_3
                      }
                    }, ''),
                    h('span', {
                      style: styleInfo
                    }, '欠费')
                  ])
                  break
                case 1:
                  if (params.row.computerstate == 1) {
                    return h('div', {
                      style: {
                        display: 'flex',
                        cursor: 'pointer',
                      },
                      on: {
                        click: () => {
                          if (this.$refs.monitor.style.width != '600px') {
                            this.showMonitor(params.row.instancename)
                          } else {
                            this.closeMonitor()
                          }
                        }
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src: icon_1
                        }
                      }, ''),
                      h('span', {
                        style: styleInfo
                      }, '开启')
                    ])
                  } else {
                    return h('div', {
                      style: {
                        display: 'flex',
                        cursor: 'pointer',
                      },
                      on: {
                        click: () => {
                          if (this.$refs.monitor.style.width != '600px') {
                            this.showMonitor(params.row.instancename)
                          } else {
                            this.closeMonitor()
                          }
                        }
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src: icon_4
                        }
                      }, ''),
                      h('span', {
                        style: styleInfo
                      }, '关机')
                    ])
                  }
                  break
                case 2:
                  if (restart == 1) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '重启中')])
                  } else if (restore == 1) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '重装中')])
                  } else if (resetpwd == 1) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '重置中')])
                  } else if (bindip == 1) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '绑定中')])
                  } else if (bindip == 2) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '解绑中')])
                  } else if (params.row.computerstate == 0) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '开机中')])
                  } else if (params.row.computerstate == 1) {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '关机中')])
                  } else {
                    return h('div', {}, [h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }), h('span', {style: styleInfo}, '创建中')])
                  }
                  break
              }
            }
          },
          {
            title: '主机配置',
            key: 'serviceoffername',
            render: (h, params) => {
              let textArr = params.row.serviceoffername.split('+')
              let text_1 = 'CPU:' + textArr[0]
              let text_2 = '内存:' + textArr[2]
              let text_3 = '频率:' + textArr[1]
              return h('ul', {}, [
                h('li', {}, text_1),
                h('li', {}, text_2),
                h('li', {}, text_3)
              ])
            }
          },
          {
            title: '镜像系统',
            key: 'templatename',
            render: (h, params) => {
              let templateName = params.row.templatename.substr(0, 1).toUpperCase() // 用第一个字符判断镜像选用图标
              let icon_1 = require('../../assets/img/host/h-icon12.png')
              let icon_2 = require('../../assets/img/host/h-icon6.png')
              let icon_3 = require('../../assets/img/host/h-icon7.png')
              let icon_4 = require('../../assets/img/host/h-icon8.png')
              let imgStyle = {
                marginRight: '5px',
                width: '16px',
              }
              switch (templateName) {
                case 'W':
                  return h('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_1,
                        width: '16',
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'C':
                  return h('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_2
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'U':
                  return h('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_3
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'D':
                  return h('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_4
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                default:
                  return h('span', {}, params.row.templatename)
              }
            }
          },
          {
            title: 'IP地址',
            ellipsis: true,
            render: (h, params) => {
              let text_1 = params.row.publicip ? params.row.publicip + '（公）' : '----'
              let text_2 = params.row.privateip ? params.row.privateip + '（内）' : '----'
              return h('ul', {}, [
                h('li', {}, text_1),
                h('li', {}, text_2)
              ])
            }
          },
          {
            renderHeader: (h, params) => {
              return h('ul', {}, [
                h('li', {}, '创建时间 / '),
                h('li', {}, '到期时间')
              ])
            },
            ellipsis: true,
            render: (h, params) => {
              let text_1 = params.row.createtime ? params.row.createtime + ' / ' : '----'
              let text_2 = params.row.endtime ? params.row.endtime : '----'
              return h('ul', {}, [
                h('li', {}, text_1),
                h('li', {}, text_2)
              ])
            }
          },
          {
            title: '计费类型',
            key: 'caseType',
            filters: [
              {
                label: '包年',
                value: 1
              },
              {
                label: '包月',
                value: 2
              },
              {
                label: '实时',
                value: 3
              },
              {
                label: '7天',
                value: 4
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.caseType == '1';
              } else if (value === 2) {
                return row.caseType == '2';
              } else if (value === 3) {
                return row.caseType == '3';
              } else if (value === 4) {
                return row.caseType == '4';
              }
            },
            render: (h, params) => {
              let text = params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : params.row.caseType == 3 ? '实时' : '七天'
              return h('span', {}, text)
            }
          },
          {
            title: '操作',
            render: (h, params) => {
              switch (params.row.status) {
                case -1:
                  return h('div', {}, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginRight: '10px',
                      lineHeight: '74px'
                    },
                    on: {
                      click: () => {
                        window.open('tencent://message/?uin=1014172393&amp;Site=www.cloudsoar.com&amp;Menu=yes', '_blank')
                      }
                    }
                  }, '联系客服'), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        this.hostDelete(2)
                      }
                    }
                  }, '删除')])
                  break
                case 0:
                  return h('div', {}, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginRight: '10px',
                      lineHeight: '74px'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        this.renewHost(this.hostCurrentSelected)
                      }
                    }
                  }, '续费'), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        this.hostDelete(2)
                      }
                    }
                  }, '删除')])
                  break
                case 1:
                  if (params.row.computerstate == 1) {
                    return h('div', {}, [
                      h('p', {
                        style: {
                          lineHeight: '20px',
                          cursor: 'pointer',
                          color: '#2A99F2'
                        },
                        on: {
                          click: () => {
                            this.linkHost(params.row)
                          }
                        }
                      }, '连接'),
                      h('p', {
                        style: {
                          lineHeight: '30px',
                          cursor: 'pointer',
                          color: '#2A99F2'
                        },
                        on: {
                          click: () => {
                            sessionStorage.setItem('manageId', params.row.computerid)
                            this.$router.push('manage')
                          }
                        }
                      }, '管理'),
                      h('Dropdown', {
                        style: {
                          marginBottom: '5px'
                        },
                        props: {
                          transfer: true
                        },
                        on: {
                          'on-click': (type) => {
                            this.hostCurrentSelected = params.row
                            switch (type) {
                              case 'resetPassword':
                                this.hostResetPassword(2)
                                break
                              case 'joinLoadBalance':
                                this.joinBalance()
                                break
                              case 'bindingIP':
                                this.bindIP()
                                break
                              case 'rename':
                                this.renameForm.hostName = ''
                                this.showModal.rename = true
                                break
                              case 'ratesChange':
                                if (this.hostCurrentSelected.caseType == 3) {
                                  this.ratesChange()
                                } else {
                                  this.$Message.info('资费变更只适用于实时计费的资源')
                                }
                                break
                              case 'hostRenew':
                                this.renewHost(this.hostCurrentSelected)
                                break
                              case 'makeSnapshot':
                                this.backupForm.backupName = ''
                                this.backupForm.description = ''
                                this.currentHostname = this.hostCurrentSelected.computername
                                this.showModal.backup = true
                                break
                              case 'unbindIP':
                                if (this.hostCurrentSelected.publicip) {
                                  this.showModal.unbindIP = true
                                } else {
                                  this.$Message.warning('该主机没有绑定公网IP')
                                }
                                break
                              case 'shutdown':
                                this.hostShutdown(2)
                                break
                              case 'restart':
                                this.hostRestart(2)
                                break
                              case 'deleteHost':
                                this.hostDelete(2)
                                break
                            }
                          }
                        }
                      }, [h('a', {}, ['更多操作 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [
                        h('DropdownItem', {
                          attrs: {
                            name: 'resetPassword'
                          }
                        }, '重置密码'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'joinLoadBalance'
                          }
                        }, '加入负载均衡'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'bindingIP'
                          }
                        }, '绑定IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'rename'
                          }
                        }, '重命名'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'ratesChange'
                          }
                        }, '资费变更'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostRenew'
                          }
                        }, '主机续费'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeSnapshot'
                          }
                        }, '制作快照'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'shutdown'
                          }
                        }, '关机'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'restart'
                          }
                        }, '重启'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'deleteHost'
                          }
                        }, '删除')])])
                    ])
                  } else {
                    return h('div', {}, [
                      h('p', {
                        style: {
                          lineHeight: '20px',
                        }
                      }, '连接'),
                      h('p', {
                        style: {
                          lineHeight: '30px',
                          cursor: 'pointer',
                          color: '#2A99F2'
                        },
                        on: {
                          click: () => {
                            sessionStorage.setItem('manageId', params.row.computerid)
                            this.$router.push('manage')
                          }
                        }
                      }, '管理'),
                      h('Dropdown', {
                        style: {
                          marginBottom: '5px'
                        },
                        props: {
                          transfer: true
                        },
                        on: {
                          'on-click': (type) => {
                            this.hostCurrentSelected = params.row
                            switch (type) {
                              case 'resetPassword':
                                this.hostResetPassword(2)
                                break
                              case 'joinLoadBalance':
                                this.joinBalance()
                                break
                              case 'bindingIP':
                                this.bindIP()
                                break
                              case 'rename':
                                this.renameForm.hostName = ''
                                this.showModal.rename = true
                                break
                              case 'ratesChange':
                                if (this.hostCurrentSelected.caseType == 3) {
                                  this.ratesChange()
                                } else {
                                  this.$Message.info('资费变更只适用于实时计费的资源')
                                }
                                break
                              case 'hostUpgrade':
                                this.$http.get('network/VMIsHaveSnapshot.do', {
                                  params: {
                                    VMId: this.hostCurrentSelected.computerid
                                  }
                                }).then(response => {
                                  if (response.status == 200 && response.data.status == 1) {
                                    if (!response.data.result) {
                                      this.$Modal.confirm({
                                        title: '提示',
                                        content: '您的主机有快照，无法升级，请删除快照再试',
                                        scrollable: true,
                                        okText: '删除快照',
                                        onOk: () => {
                                          this.$router.push('snapshot')
                                        }
                                      })
                                    } else {
                                      sessionStorage.setItem('upgradeId', this.hostCurrentSelected.computerid)
                                      this.$router.push('upgrade')
                                    }
                                  }
                                })
                                break
                              case 'hostRenew':
                                this.renewHost(this.hostCurrentSelected)
                                break
                              case 'makeSnapshot':
                                this.backupForm.backupName = ''
                                this.backupForm.description = ''
                                this.currentHostname = this.hostCurrentSelected.computername
                                this.showModal.backup = true
                                break
                              case 'makeMirror':
                                this.mirrorForm.mirrorName = ''
                                this.mirrorForm.description = ''
                                this.showModal.mirror = true
                                break
                              case 'unbindIP':
                                if (this.hostCurrentSelected.publicip) {
                                  this.showModal.unbindIP = true
                                } else {
                                  this.$Message.warning('该主机没有绑定公网IP')
                                }
                                break
                              case 'startingUp':
                                this.hostStart(2)
                                break
                              case 'deleteHost':
                                this.hostDelete(2)
                                break
                            }
                          }
                        }
                      }, [h('a', {
                        style: {
                          marginBottom: '5px'
                        }
                      }, ['更多操作 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [
                        h('DropdownItem', {
                          attrs: {
                            name: 'resetPassword'
                          }
                        }, '重置密码'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'joinLoadBalance'
                          }
                        }, '加入负载均衡'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'bindingIP'
                          }
                        }, '绑定IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'rename'
                          }
                        }, '重命名'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'ratesChange'
                          }
                        }, '资费变更'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostRenew'
                          }
                        }, '主机续费'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostUpgrade'
                          }
                        }, '主机升级'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeSnapshot'
                          }
                        }, '制作快照'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeMirror'
                          }
                        }, '制作镜像'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'startingUp'
                          }
                        }, '开机'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'deleteHost'
                          }
                        }, '删除')])])
                    ])
                  }
                  break
                default:
                  return h('div', {}, [
                    h('p', {
                      style: {
                        lineHeight: '20px',
                        cursor: 'not-allowed'
                      },
                    }, '连接'),
                    h('p', {
                      style: {
                        lineHeight: '30px',
                        cursor: 'not-allowed'
                      }
                    }, '管理'),
                    h('p', {
                      style: {
                        lineHeight: '23px',
                        cursor: 'not-allowed'
                      }
                    }, '更多操作'),
                  ])
                  break
              }
            }
          },
        ],
        hostListData: [],
        hostPages: 0,
        pageSize: 10,
        currentPage: 1,
        hostSelection: [],
        hostCurrentSelected: null,

        hostDelWay: 1, // 1：点击按钮删除主机 2： 点击更多操作删除；原因是参数传的不同
        resetPasswordWay: 1, // 1：点击顶部更多操作重置 2： 点击行内更多操作重置；原因是参数传的不同,
        resetPasswordHostData: [],
        resetPasswordForm: {
          password: '',
          passwordAffirm: '',
          agreeRule: false,
          hintGrade: 0,
          errorMsg: 'passwordHint'
        },
        listLoadBalanceRole: [],
        loadBalanceForm: {
          loadbalanceroleid: ''
        },
        loadBalanceFormRule: {
          loadbalanceroleid: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        bindForm: {
          publicIP: ''
        },
        bindFormRule: {
          publicIP: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        publicIPList: [],
        renameForm: {
          hostName: ''
        },
        renameFormRule: {
          hostName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
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
        // 变更资费相关
        ratesChangeType: '',
        ratesChangeTime: '',
        originRatesChangeCost: '--',
        ratesChangeCost: '--',
        relevanceAlteration: [],
        relevanceDisks: '',
        relevanceIps: '',
        // 续费相关
        renewalInfo: {},
        renewalType: '',
        renewalTime: '',
        bindRenewalVal: [],
        isDisks: '',
        isIps: '',
        originCost: '--',
        cost: '--',
        RenewForm: {
          cost: 0,
          id: ''
        },
        backupForm: {
          name: '',
          memory: '1'
        },
        currentHostname: [],
        backupFormRule: {
          name: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
        mirrorForm: {
          mirrorName: '',
          description: ''
        },
        mirrorFormRule: {
          mirrorName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ],
        },
        monitorName: '',
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
          }
        ],
        currentData: this.getCurrentDate()
      }
    },
    created() {
      this.toggleZone(this.$store.state.zone.zoneid)
      // 用户未认证，弹出认证提示框
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true
      }
      if (sessionStorage.getItem('isSeeHint')) {
        this.guideStep = 0
      }
      this.getHostList()
    },
    methods: {
      toggleZone(zoneId) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == zoneId) {
            $store.commit('setZone', zone);
          }
        }
      },
      hideEvent(name) {
        if (name !== 'resetPassword') {
          if (this.hostSelection.length !== 1) {
            return false
          }
          this.hostCurrentSelected = this.hostSelection[0]
          switch (name) {
            case 'joinLoadBalance':
              this.joinBalance()
              break
            case 'bindingIP':
              this.bindIP()
              break
            case 'rename':
              this.renameForm.hostName = ''
              this.showModal.rename = true
              break
            case 'ratesChange':
              if (this.hostCurrentSelected.caseType == 3) {
                this.ratesChange()
              }
              break
            case 'renewal':
              this.renewHost(this.hostCurrentSelected)
              break
            case 'backup':
              this.backupForm.backupName = ''
              this.backupForm.description = ''
              this.currentHostname = this.hostCurrentSelected.computername
              this.showModal.backup = true
              break
            case 'mirror':
              if (this.hostCurrentSelected.status == 1 && this.hostCurrentSelected.computerstate == 0) {
                this.mirrorForm.mirrorName = ''
                this.mirrorForm.description = ''
                this.showModal.mirror = true
              }
              break
            case 'unbindIP':
              if (this.hostCurrentSelected.publicip) {
                this.showModal.unbindIP = true
              } else {
                this.$Message.warning('该主机没有绑定公网IP')
              }
              break
            case 'upgrade':
              if (this.hostCurrentSelected.status == 1 && this.hostCurrentSelected.computerstate == 0) {
                this.$http.get('network/VMIsHaveSnapshot.do', {
                  params: {
                    VMId: this.hostCurrentSelected.computerid
                  }
                }).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    if (!response.data.result) {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '您的主机有快照，无法升级，请删除快照再试',
                        scrollable: true,
                        okText: '删除快照',
                        onOk: () => {
                          this.$router.push('snapshot')
                        }
                      })
                    } else {
                      sessionStorage.setItem('upgradeId', this.hostCurrentSelected.computerid)
                      this.$router.push('upgrade')
                    }
                  }
                })
              }
              break
          }
        } else {
          if (this.hostSelection.length > 5) {
            this.$Message.info('重置密码至多选择 5 项')
            return false
          }
          this.hostResetPassword(1)
        }
      },
      getHostList() {
        let url = 'information/listVirtualMachines.do'
        this.$http.get(url, {
          params: {
            returnList: '1',
            page: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostListData = res.data.result.data
            this.hostPages = res.data.result.total
            this.hostListData.forEach(host => {
              if (host.status == 2 || host.status == -2) {
                host._disabled = true
                if (host.id) {
                  this.timingRefresh(host.id)
                } else {
                  this.getHostList()
                }
              }
            })
          }
        })
      },
      changePage(page) {
        this.currentPage = page
        this.hostSelection = []
        this.getHostList()
      },
      hostSelectionChange(selected) {
        this.hostSelection = selected
      },
      /* 局部刷新 */
      timingRefresh(ids) {
        let timer = setInterval(() => {
          let url = 'information/listVirtualMachines.do'
          this.$http.get(url, {
            params: {
              returnList: '1',
              ids: ids
            }
          }).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              let locality = res.data.result.data
              let flag = locality.some(item => {
                return item.status == 2 || item.status == -2
              }) // 操作的主机中是否有过渡状态，没有就清除定时器，取消刷新
              if (!flag) {
                this.hostListData.forEach((host, index) => {
                  locality.forEach(item => {
                    if (host.id == item.id) {
                      this.hostListData.splice(index, 1, item)
                    }
                  })
                })
                clearInterval(timer)
              } else {
                this.hostListData.forEach((host, index) => {
                  locality.forEach(item => {
                    if (host.id == item.id && item.status == 1) {
                      this.hostListData.splice(index, 1, item)
                    }
                  })
                })
              }
            }
          })
        }, 3000)
      },
      // 通过val来区分是批量选择的还是单个列表里操作的
      hostShutdown(val) {
        let params = {}
        if (val == 1) {
          this.hostListData.forEach(host => {
            this.selectHostIds.forEach(item => {
              if (host.id == item) {
                host.bindip = 0
                host.status = 2
                host.computerstate = 1
                host._disabled = true
              }
            })
          })
          params = {
            VMId: this.selectHostComputerIds + '',
            forced: true
          }
        } else {
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.bindip = 0
              host.status = 2
              host.computerstate = 1
              host._disabled = true
            }
          })
          params = {
            VMId: this.hostCurrentSelected.computerid,
            forced: true
          }
        }
        let url = 'information/stopVirtualMachine.do'
        this.$http.get(url, {params}).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$Message.success(res.data.message)
            if (val == 1) {
              this.timingRefresh(this.selectHostIds + '')
            } else {
              this.timingRefresh(this.hostCurrentSelected.id)
            }
            this.hostSelection = []
          } else {
            this.getHostList()
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      hostStart(val) {
        let params = {}
        if (val == 1) {
          this.hostListData.forEach(host => {
            this.selectHostIds.forEach(item => {
              if (host.id == item) {
                host.status = 2
                host.computerstate = 0
                host.bindip = 0
                host._disabled = true
              }
            })
          })
          params = {
            VMId: this.selectHostComputerIds + ''
          }
        } else {
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.status = 2
              host.bindip = 0
              host.computerstate = 0
              host._disabled = true
            }
          })
          params = {
            VMId: this.hostCurrentSelected.computerid,
          }
        }
        let url = 'information/startVirtualMachine.do'
        this.$http.get(url, {params}).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$Message.success(res.data.message)
            if (val == 1) {
              this.timingRefresh(this.selectHostIds + '')
            } else {
              this.timingRefresh(this.hostCurrentSelected.id)
            }
            this.hostSelection = []
          } else {
            this.getHostList()
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      hostRestart(val) {
        let params = {}
        if (val == 1) {
          this.hostListData.forEach(host => {
            this.selectHostIds.forEach(item => {
              if (host.id == item) {
                host.status = 2
                host.restart = 1
                host._disabled = true
              }
            })
          })
          params = {
            VMId: this.selectHostComputerIds + ''
          }
        } else {
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.status = 2
              host.restart = 1
              host._disabled = true
            }
          })
          params = {
            VMId: this.hostCurrentSelected.computerid,
          }
        }
        let url = 'information/rebootVirtualMachine.do'
        this.$http.get(url, {
          params: params
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$Message.success(res.data.message)
            if (val == 1) {
              this.timingRefresh(this.selectHostIds + '')
            } else {
              this.timingRefresh(this.hostCurrentSelected.id)
            }
            this.hostSelection = []
          } else {
            this.getHostList()
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      hostDelete(val) {
        this.hostDelWay = val
        if (val === 1) {
          if (this.hostSelection.length > 5) {
            this.$Message.info('删除主机至多选择 5 项')
            return
          }
          this.showModal.delHost = true
        } else {
          this.showModal.delHost = true
        }
      },
      delHostOk() {
        let params = {}
        if (this.hostDelWay === 1) {
          this.hostListData.forEach(host => {
            this.selectHostIds.forEach(item => {
              if (host.id == item) {
                host.status = -2
                host._disabled = true
              }
            })
          })
          params = {
            id: this.selectHostIds + ''
          }
        } else {
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.status = -2
              host._disabled = true
            }
          })
          params = {
            id: this.hostCurrentSelected.id,
          }
        }
        let url = 'information/deleteVM.do'
        this.$http.get(url, {
          params: params
        }).then(res => {
          this.showModal.delHost = false
          if (res.status === 200 && res.data.status === 1) {
            this.$Message.success(res.data.message)
            if (this.hostDelWay === 1) {
              this.timingRefresh(this.selectHostIds + '')
            } else {
              this.timingRefresh(this.hostCurrentSelected.id)
            }
            this.hostSelection = []
          } else {
            this.getHostList()
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      hostResetPassword(val) {
        this.resetPasswordWay = val
        this.resetPasswordForm.password = ''
        this.resetPasswordForm.hintGrade = 0
        this.resetPasswordForm.passwordAffirm = ''
        if (val === 1) {
          if (this.hostSelection.length === 0) {
            return false
          }
          this.resetPasswordHostData = this.hostSelection
          this.showModal.resetPassword = true
        } else {
          this.resetPasswordHostData = []
          this.resetPasswordHostData[0] = this.hostCurrentSelected
          this.showModal.resetPassword = true
        }
      },
      toManage(item) {
        sessionStorage.setItem('manageId', item.computerid)
        this.$router.push('manage')
      },
      changeResetPasswordType(name) {
        this.$refs[name].type === 'password' ? this.$refs[name].type = 'text' : this.$refs[name].type = 'password'
      },
      verifyPassword() {
        if (this.regExpObj.password.test(this.resetPasswordForm.password)) {
          this.resetPasswordForm.errorMsg = 'passwordHintTwo'
        } else {
          this.resetPasswordForm.errorMsg = 'passwordHint'
        }
      },
      resetPasswordNext() {
        let flag = true
        this.resetPasswordForm.errorMsg = ''
        this.resetPasswordHostData.forEach((item, index) => {
          if (item.changepassword && !item.currentPassword) {
            item.errorMsg = 'passwordIsEmpty'
            this.resetPasswordHostData.splice(index, 1, item)
            flag = false
          }
        })
        if (!this.resetPasswordForm.password || !this.regExpObj.password.test(this.resetPasswordForm.password)) {
          this.resetPasswordForm.errorMsg = 'passwordUndercapacity'
          return false
        }
        if (this.resetPasswordForm.password !== this.resetPasswordForm.passwordAffirm) {
          this.resetPasswordForm.errorMsg = 'passwordAffirm'
          return false
        }
        if (flag) {
          this.resetPasswordForm.hintGrade = 1
        }
      },
      resetPasswordOk() {
        let flag = true
        this.resetPasswordForm.errorMsg = ''
        this.resetPasswordHostData.forEach((item, index) => {
          if (item.changepassword && !item.currentPassword) {
            item.errorMsg = 'passwordIsEmpty'
            this.resetPasswordHostData.splice(index, 1, item)
            flag = false
          }
        })
        if (flag) {
          let url = 'information/resetPasswordForVirtualMachineBatch.do'
          let list = []
          this.resetPasswordHostData.forEach((item, index) => {
            if (item.changepassword && item.currentPassword) {
              list.push({
                VMId: item.computerid,
                oldPassword: item.currentPassword,
                VMName: item.instancename
              })
            } else {
              list.push({
                VMId: item.computerid,
                VMName: item.instancename
              })
            }
          })
          let params = {
            password: this.resetPasswordForm.password,
            list: JSON.stringify(list)
          }
          this.$http.post(url, params).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$Message.success(res.data.message)
              this.showModal.resetPassword = false
              this.hostListData.forEach(host => {
                this.resetPasswordHostData.forEach(item => {
                  if (host.id == item.id) {
                    host.status = 2
                    host.resetpwd = 1
                    host._disabled = true
                  }
                })
              })
              let ids = this.resetPasswordHostData.map(item => {
                return item.id
              })
              this.timingRefresh(ids + '')
              this.hostSelection = []
            } else if (res.status == 200 && res.data.status == 2) {
              if (res.data.result.length != 0) {
                res.data.result.forEach(name => {
                  this.resetPasswordHostData.forEach((item, index) => {
                    if (item.computerid == name.errhost) {
                      item.errorMsg = 'passwordMistake'
                      this.resetPasswordHostData.splice(index, 1, item)
                    }
                  })
                })
              }
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        }
      },
      //加入负载均衡
      joinBalance() {
        axios.get('information/isloadbananceRoleAndServiceSchemeMatching.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            VMIds: this.hostCurrentSelected.computerid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 成功的情况
            axios.get('information/listVMByComputerId.do', {
              params: {
                VMId: this.hostCurrentSelected.computerid,
                zoneId: this.hostCurrentSelected.zoneid
              }
            }).then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                if (response.data.result.loadbalance != '') {
                  this.$message.confirm({
                    title: '提示',
                    content: `该主机已加入负载均衡：${response.data.result.loadbalance[0]}，若您需要修改主机所属负载均衡请先将主机移出该负载均衡在进行操作`,
                    okText: '移出主机',
                    onOk: () => {
                      axios.get('loadbalance/listBalanceRoleAndVMByVMId.do', {
                        params: {
                          computerId: this.hostCurrentSelected.computerid,
                          zoneId: this.hostCurrentSelected.zoneid
                        }
                      }).then(response => {
                        if (response.status == 200 && response.data.status == 1) {
                          sessionStorage.setItem('balanceInfo', JSON.stringify(response.data.result.loadBalance[0]))
                          this.$router.push('BalanceParticulars')
                        }
                      })
                    }
                  })
                } else {
                  axios.get('loadbalance/listLoadBalanceRoleVM.do', {
                    params: {
                      zoneId: $store.state.zone.zoneid,
                      VMId: this.hostCurrentSelected.computerid
                    }
                  }).then(response => {
                    if (response.status == 200 && response.data.status == 1) {
                      var publicLoadbalance = response.data.result.publicLoadbalance
                      publicLoadbalance.forEach(item => {
                        item.type = '#public'
                      })
                      this.listLoadBalanceRole = publicLoadbalance.concat(response.data.result.internalLoadbalance)
                      this.showModal.balance = true
                    }
                  })
                }
              }
            })
          } else if (response.status == 200 && response.data.status == 3) {
            // 需要创建公网负载均衡
            this.$message.confirm({
              title: '提示',
              content: '您还未创建一个负载均衡，请先创建公网负载均衡。',
              okText: '创建负载均衡',
              onOk: () => {
                this.$router.push('balance')
              }
            })
          } else if (response.status == 200 && response.data.status == 4) {
            // 需要创建内网负载均衡
            this.$message.confirm({
              title: '提示',
              content: '您还未创建一个负载均衡，请先创建内网负载均衡。',
              okText: '创建负载均衡',
              onOk: () => {
                this.$router.push('balance')
              }
            })
          } else if (response.status == 200 && response.data.status == 5) {
            // 网络不匹配
            this.$message.confirm({
              title: '提示',
              okText: '调整子网',
              content: '您选择的主机的子网的网络服务方案为普通网络，不支持负载均衡。若您需要将该主机加入负载均衡可将该主机移入子网服务方案为：公网/私网负载均衡网络的子网之后在进行加入负载均衡操作',
              onOk: () => {
                sessionStorage.setItem('vpcId', this.hostCurrentSelected.vpcid)
                this.$router.push('vpcManage')
              }
            })
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      // 确定加入负载均衡
      joinBalanceSubm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.balance = false
            this.$Message.info('主机正在加入负载均衡，请稍后')
            if (this.loadBalanceForm.loadbalanceroleid.split('#')[1] == 'public') {
              axios.get('loadbalance/assignToLoadBalancerRule.do', {
                params: {
                  VMIds: this.hostCurrentSelected.computerid,
                  zoneId: this.hostCurrentSelected.zoneid,
                  roleId: this.loadBalanceForm.loadbalanceroleid.split('#')[0]
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
                this.loadBalanceForm.loadbalanceroleid == ''
              })
            } else {
              axios.get('loadbalance/assignToInternalLoadBalancerRule.do', {
                params: {
                  VMIds: this.hostCurrentSelected.computerid,
                  zoneId: this.hostCurrentSelected.zoneid,
                  roleId: this.loadBalanceForm.loadbalanceroleid,
                  lbId: this.loadBalanceForm.loadbalanceroleid
                }
              })
                .then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    this.$Message.success(response.data.message)
                  } else {
                    this.$message.info({
                      content: response.data.message
                    })
                  }
                  this.loadBalanceForm.loadbalanceroleid == ''
                })
            }
          }
        })
      },
      bindIP() {
        if (this.hostCurrentSelected.publicip) {
          this.$Message.warning('已绑定主机无法再次绑定!')
        } else {
          this.bindForm.publicIP = ''
          axios.get('network/listPublicIp.do', {
            params: {
              useType: 0,
              zoneId: this.hostCurrentSelected.zoneid,
              vpcId: this.hostCurrentSelected.vpcid
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
        }
      },
      bindIpSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.hostListData.forEach(host => {
                if (host.id == this.hostCurrentSelected.id) {
                  host.status = 2
                  host.bindip = 1
                  host._disabled = true
                }
              })
              this.showModal.bindIP = false
              this.$Message.info({
                content: `<span style="color:#2A99F2">${this.hostCurrentSelected.computername}</span>云主机,正在绑定公网IP`
              })
              this.$http.get('network/enableStaticNat.do', {
                params: {
                  ipId: this.bindForm.publicIP,
                  VMId: this.hostCurrentSelected.computerid
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.timingRefresh(this.hostCurrentSelected.id)
                  this.hostSelection = []
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
      checkRenameForm() {
        this.$refs.renameForm.validate((valid) => {
          if (valid) {
            this.showModal.rename = false
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
      ratesChange() {
        let url = 'information/listVirtualMachinesById.do'
        axios.get(url, {
          params: {
            VMId: this.hostCurrentSelected.computerid,
            zoneId: this.hostCurrentSelected.zoneid,
            changeCost: '1'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            var disks = response.data.result[0].attachDisk.map(item => {
              return item.id
            })
            this.relevanceDisks = disks.join()
            var ips = response.data.result[0].attachPublicIp.map(item => {
              return item.id
            })
            this.relevanceIps = ips.join()
            this.relevanceAlteration = ['ip', 'disk']
            this.ratesChangeType = ''
            this.ratesChangeTime = ''
            this.ratesChangeCost = '--'
            this.originRatesChangeCost = '--'
            this.showModal.ratesChange = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 确认变更资费
      ratesChange_ok() {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.relevanceAlteration.length; i++) {
          if (this.relevanceAlteration[i] == 'ip') {
            selectIp = this.relevanceIps
          }
          if (this.relevanceAlteration[i] == 'disk') {
            selectDisk = this.relevanceDisks
          }
        }
        var iplist = []
        if (selectIp != '') {
          iplist = selectIp.split(',').map(item => {
            return {type: 2, id: parseInt(item)}
          })
        }
        var disklist = []
        if (selectDisk != '') {
          disklist = selectDisk.split(',').map(item => {
            return {type: 1, id: parseInt(item)}
          })
        }
        var host = [
          {type: 0, id: this.hostCurrentSelected.id}
        ]
        var list = host.concat(iplist, disklist)
        list = JSON.stringify(list)
        let url = 'continue/changeMoney.do'
        this.$http.post(url, {
          list: list,
          timeType: this.ratesChangeType,
          timeValue: this.ratesChangeTime + '',
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
          var selectDisk = ''
          for (var i = 0; i < this.bindRenewalVal.length; i++) {
            if (this.bindRenewalVal[i] == 'ip') {
              selectIp = this.isIps
            }
            if (this.bindRenewalVal[i] == 'disk') {
              selectDisk = this.isDisks
            }
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              hostIdArr: this.hostCurrentSelected.id,
              ipIdArr: selectIp,
              diskArr: selectDisk
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
      // 包年/月主机续费
      renewalOk() {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.bindRenewalVal.length; i++) {
          if (this.bindRenewalVal[i] == 'ip') {
            selectIp = this.isIps
          }
          if (this.bindRenewalVal[i] == 'disk') {
            selectDisk = this.isDisks
          }
        }
        var iplist = []
        if (selectIp != '') {
          iplist = selectIp.split(',').map(item => {
            return {type: 2, id: parseInt(item)}
          })
        }
        var disklist = []
        if (selectDisk != '') {
          disklist = selectDisk.split(',').map(item => {
            return {type: 1, id: parseInt(item)}
          })
        }
        var host = [
          {type: 0, id: this.hostCurrentSelected.id}
        ]
        var list = host.concat(iplist, disklist)
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
      renewalUpgrade() {
        this.$router.push({
          name: 'upgrade'
        })
      },
      // 欠费主机续费
      renewHost(item) {
        if (item.caseType == 3) {
          if (item.status == 0) {
            this.showModal.Renew = true
            this.RenewForm.id = item.id
            this.RenewForm.cost = item.cpCase
          } else {
            this.$Message.info('请选择包年包月的资源进行续费')
          }
        } else {
          this.renewalInfo = {
            computername: item.computername,
            templatename: item.templatename,
            serviceoffername: item.serviceoffername,
            endtime: item.endtime
          }
          this.renewType()
          this.showModal.renewal = true
        }
      },
      // 查询续费主机下是否有ip或磁盘
      renewType() {
        axios.get('information/listVirtualMachinesById.do', {
          params: {
            VMId: this.hostCurrentSelected.computerid,
            zoneId: this.hostCurrentSelected.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            var diskarr = response.data.result[0].attachDisk.map(item => {
              return item.id
            })
            this.isDisks = diskarr.join()
            var iparr = response.data.result[0].attachPublicIp.map(item => {
              return item.id
            })
            this.isIps = iparr.join()
            // 清空续费弹窗数据
            this.bindRenewalVal = ['ip', 'disk']
            this.cost = '--'
            this.originCost = '--'
            this.renewalType = ''
            this.renewalTime = ''
            this.showModal.renewal = true
          }
        })
      },
      // 实时欠费主机续费确认
      renewOk() {
        this.showModal.Renew = false
        this.$http.get('information/vmRenew.do', {
          params: {
            id: this.RenewForm.id,
          }
        }).then(response => {
          this.getHostList()
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('主机续费成功')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 生成快照
      backupSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.backup = false
            axios.get('Snapshot/createVMSnapshot.do', {
              params: {
                VMId: this.hostCurrentSelected.computerid,
                snapshotName: this.backupForm.name,
                memoryStatus: this.backupForm.memory,
                zoneId: this.hostCurrentSelected.zoneid
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 创建主机镜像
      mirrorSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.mirror = false
            axios.get('Snapshot/createTemplate.do', {
              params: {
                rootDiskId: this.hostCurrentSelected.rootdiskid,
                templateName: this.mirrorForm.mirrorName,
                descript: this.mirrorForm.description,
                zoneId: this.hostCurrentSelected.zoneid
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: '请求成功，镜像正在创建中，您可以到<span style="color: #0db4fa;cursor: pointer;">镜像列表</span>查看该镜像。',
                  duration: 5
                })
              }
            })
          }
        })
      },
      unbind() {
        this.hostListData.forEach(host => {
          if (host.id == this.hostCurrentSelected.id) {
            host.status = 2
            host.bindip = 2
            host._disabled = true
          }
        })
        this.showModal.unbindIP = false
        this.$Message.info({
          content: `<span style="color:#2A99F2">${this.hostCurrentSelected.computername}</span>云主机,正在解绑公网IP`
        })
        this.$http.get('network/disableStaticNat.do', {
          params: {
            ipId: this.hostCurrentSelected.publicip,
            VMId: this.hostCurrentSelected.computerid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.timingRefresh(this.hostCurrentSelected.id)
            this.hostSelection = []
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      linkHost(item) {
        localStorage.setItem('link-companyid', item.companyid)
        localStorage.setItem('link-vmid', item.computerid)
        localStorage.setItem('link-zoneid', item.zoneid)
        localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
        window.open('/link')
      },
      showMonitor(name) {
        this.monitorName = name
        this.monitoringList.forEach(item => {
          item.type = '近一天'
          item.showType = '折线'
        })
        this.getComputerMonitor()
        this.$refs.monitor.style.width = '600px'
        this.$refs.monitor.style.opacity = '1'
        this.$refs.monitor.style.display = 'block'
      },
      closeMonitor() {
        this.$refs.monitor.style.width = '0px'
        this.$refs.monitor.style.opacity = '0'
        this.$refs.monitor.style.display = 'none'
      },
      getComputerMonitor() {
        this.$http.get('alarm/getVmAlarmByHour.do', {
          params: {
            vmname: this.monitorName,
            type: 'core'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 用的以前接口数据格式，只有挨个赋值
            let cpuBrokenLine = JSON.parse(JSON.stringify(line))
            let memoryBrokenLine = JSON.parse(JSON.stringify(line))
            cpuBrokenLine.xAxis.data = response.data.result.xaxis
            memoryBrokenLine.xAxis.data = response.data.result.xaxis
            cpuBrokenLine.series.push({
              name: 'CPU使用率（%）',
              type: 'line',
              data: response.data.result.cpuUse,
              barWidth: '15%'
            })
            this.monitoringList[0].chart = cpuBrokenLine
            memoryBrokenLine.series.push({
              name: '内存使用率（%）',
              type: 'line',
              data: response.data.result.memoryUse,
              barWidth: '15%'
            })
            this.monitoringList[1].chart = memoryBrokenLine
          }
        })
      },
      changeMonitorDate(index) {
        let url = this.monitoringList[index].type == '近一天' ? 'alarm/getVmAlarmByHour.do' : 'alarm/getVmAlarmByDay.do'
        let dateType = this.monitoringList[index].type == '最近7天' ? 'week' : 'month'
        this.$http.get(url, {
          params: {
            vmname: this.monitorName,
            type: 'core',
            datetype: dateType
          }
        }).then(res => {
          if (res.data.status == 1) {
            let broken = this.monitoringList[index].type == 'line' ? JSON.parse(JSON.stringify(line)) : JSON.parse(JSON.stringify(bar))
            let type = this.monitoringList[index].showType == '折线' ? 'line' : 'bar'
            let name = index == 0 ? 'CPU使用率（%）' : '内存使用率（%）'
            let data = index == 0 ? res.data.result.cpuUse : res.data.result.memoryUse
            broken.series.push({
              name: name,
              type: type,
              data: data,
              barWidth: '15%'
            })
            broken.xAxis.data = res.data.result.xaxis
            this.monitoringList[index].chart = broken
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      changeMonitorShowType(index) {
        let broken = {}
        if (this.monitoringList[index].showType == '折线') {
          broken = JSON.parse(JSON.stringify(line))
          broken.series.push({
            name: this.monitoringList[index].chart.series[0].name,
            type: 'line',
            data: this.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.monitoringList[index].chart.xAxis.data
          this.monitoringList[index].chart = broken
        } else {
          broken = JSON.parse(JSON.stringify(bar))
          broken.series.push({
            name: this.monitoringList[index].chart.series[0].name,
            type: 'bar',
            data: this.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.monitoringList[index].chart.xAxis.data
          this.monitoringList[index].chart = broken
        }
      },
      getCurrentDate() {
        return new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString()
      },
      push(type) {
        sessionStorage.setItem('pane', type)
        this.$router.push('/usercenter')
      },
      guideNext() {
        if (this.hostListData.length != 0) {
          let flag = false
          this.hostListData.forEach(item => {
            if (item.status == 1) {
              flag = true
            }
          })
          if (flag) {
            this.guideStep = 2
          } else {
            this.guideStep = 0
            this.$Message.info('您还没有正常状态的云主机，无法查看指引提示，请先创建主机')
          }
        } else {
          this.guideStep = 0
          this.$Message.info('您还没有云主机，无法查看指引提示，请先创建主机')
        }
      },
      hintToManage() {
        this.guideStep = 0
        this.hostListData.forEach(item => {
          if (item.status == 1) {
            sessionStorage.setItem('guideHint', '1')
            sessionStorage.setItem('manageId', item.computerid)
            this.$router.push('manage')
          }
        })
      },
      seeAll() {
        sessionStorage.setItem('isSeeHint', '1')
        this.guideStep = 0
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      selectHostIds() {
        let ids = []
        if (this.hostSelection.length !== 0) {
          ids = this.hostSelection.map(item => {
            return item.id
          })
        }
        return ids
      },
      selectHostComputerIds() {
        let ids = []
        if (this.hostSelection.length !== 0) {
          ids = this.hostSelection.map(item => {
            return item.computerid
          })
        }
        return ids
      },
      /* 根据主机状态确定可操作功能 */
      shutdownDisabled() {
        let len = this.hostSelection.length
        if (len === 0) {
          return true
        } else {
          // 只有开机状态的主机才能关机
          return !this.hostSelection.every(host => {
            return host.status == 1 && host.computerstate == 1
          })
        }
      },
      startDisabled() {
        let len = this.hostSelection.length
        if (len === 0) {
          return true
        } else {
          // 只有关机状态的主机才能开机
          return !this.hostSelection.every(host => {
            return host.status == 1 && host.computerstate == 0
          })
        }
      },
      restartDisabled() {
        let len = this.hostSelection.length
        if (len === 0) {
          return true
        } else {
          // 只有开机状态的主机才能重启
          return !this.hostSelection.every(host => {
            return host.status == 1 && host.computerstate == 1
          })
        }
      },
      deleteDisabled() {
        let len = this.hostSelection.length
        if (len === 0) {
          return true
        } else {
          // 过渡状态主机不能再次删除
          return this.hostSelection.some(host => {
            return host.status == -2 || host.status == 2
          })
        }
      },
      resetPasswordDisabled() {
        let len = this.hostSelection.length
        if (len === 0) {
          return true
        } else {
          // 开启关闭主机才能重置密码
          return this.hostSelection.some(host => {
            return host.status != 1
          })
        }
      },
      joinLoadBalanceDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1
        }
      },
      bindingIPDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1
        }
      },
      renameDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1
        }
      },
      ratesChangeDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return !(this.hostSelection[0].status == 1 && this.hostSelection[0].caseType == 3)
        }
      },
      hostRenewDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1 && this.hostSelection[0].status != 0
        }
      },
      hostUpgradeDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return !(this.hostSelection[0].status == 1 && this.hostSelection[0].computerstate == 0)
        }
      },
      makeSnapshotDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1
        }
      },
      makeMirrorDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return !(this.hostSelection[0].status == 1 && this.hostSelection[0].computerstate == 0)
        }
      },
      unbindIPDisabled() {
        let len = this.hostSelection.length
        if (len !== 1) {
          return true
        } else {
          return this.hostSelection[0].status != 1 && this.hostSelection[0].status != 0
        }
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
          this.originCost = '--'
        } else {
          var selectIp = ''
          var selectDisk = ''
          for (var i = 0; i < this.bindRenewalVal.length; i++) {
            if (this.bindRenewalVal[i] == 'ip') {
              selectIp = this.isIps
            }
            if (this.bindRenewalVal[i] == 'disk') {
              selectDisk = this.isDisks
            }
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              hostIdArr: this.hostCurrentSelected.id,
              ipIdArr: selectIp,
              diskArr: selectDisk
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
          this.originRatesChangeCost = '--'
        } else {
          var selectIp = ''
          var selectDisk = ''
          for (var i = 0; i < this.relevanceAlteration.length; i++) {
            if (this.relevanceAlteration[i] == 'ip') {
              selectIp = this.relevanceIps
            }
            if (this.relevanceAlteration[i] == 'disk') {
              selectDisk = this.relevanceDisks
            }
          }
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.ratesChangeTime,
              timeType: this.ratesChangeType,
              hostIdArr: this.hostCurrentSelected.id,
              ipIdArr: selectIp,
              diskArr: selectDisk
            }
          }).then((response) => {
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
      relevanceAlteration() {
        if (this.ratesChangeTime == '') {
          this.ratesChangeCost = '--'
        } else {
          var selectIp = ''
          var selectDisk = ''
          for (var i = 0; i < this.relevanceAlteration.length; i++) {
            if (this.relevanceAlteration[i] == 'ip') {
              selectIp = this.relevanceIps
            }
            if (this.relevanceAlteration[i] == 'disk') {
              selectDisk = this.relevanceDisks
            }
          }
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.ratesChangeTime,
              timeType: this.ratesChangeType,
              hostIdArr: this.hostCurrentSelected.id,
              ipIdArr: selectIp,
              diskArr: selectDisk
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
      '$store.state.zone': {
        handler: function () {
          this.getHostList()
        },
        deep: true
      }
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
      bottom: -5px;
      right: 50%;
      transform: rotate(135deg);
      box-shadow: 1px -1px 0px 0px rgba(0, 0, 0, 0.2);
    }
  }

  .monitor {
    display: none;
    position: absolute;
    right: 0;
    top: 56px;
    width: 0;
    opacity: 0;
    transition: all .5s;
    @diff: 102px;
    min-height: calc(~"100% - @{diff}");
    background: rgba(255, 255, 255, 1);
    box-shadow: -5px 0px 14px -7px rgba(148, 148, 148, 0.4);
    border-radius: 2px;
    padding: 20px;
    z-index: 3;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      > span {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
      }
    }
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

  .selectAuthType {
    width: 50%;
    h2 {
      text-align: center;
      font-size: 16px;
      color: rgba(17, 17, 17, 0.75);
      margin-bottom: 20px;
    }
    p {
      position: relative;
      font-size: 14px;
      color: rgba(17, 17, 17, 0.65);
      margin-bottom: 10px;
      padding-left: 60px;
      i {
        transform: rotate(-45deg);
        position: absolute;
        width: 7px;
        height: 4px;
        top: 5px;
        left: 62px;
        border-left: 1px solid #3DBD7D;
        border-bottom: 1px solid #3DBD7D;
        display: inline-block;
      }
      &::before {
        margin-right: 7px;
        content: '';
        width: 12px;
        height: 12px;
        border: 1px solid #3DBD7D;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .selectMark {
    margin-bottom: 10px;
    position: relative;
    > img {
      position: relative;
      top: 4px;
    }
    > span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
    .guide {
      float: right;
      cursor: pointer;
      i {
        font-size: 20px;
        &:hover {
          color: #2A99F2;
        }
      }
    }
    .hint_1 {
      .hint();
      right: -60px;
      top: -105px;
    }
    .hint_2 {
      .hint();
      right: 0;
      top: -30px;
    }
    .hint_3 {
      .hint();
      left: 290px;
      top: -215px;
    }
    .hint_4 {
      .hint();
      left: 150px;
      top: -65px;
    }
    .hint_5 {
      .hint();
      left: 10px;
      top: -33px;
    }
    .hint_6 {
      .hint();
      right: 0;
      top: 0;
    }
  }

  .renewal-info {
    margin-bottom: 20px;
    padding: 20px 10px;
    width: 100%;
    background: rgba(245, 245, 245, 1);
    ul {
      li {
        font-size: 14px;
        line-height: 1.5;
        span {
          color: #666;
        }
      }
    }
  }

  .renewal-upgrade {
    margin-bottom: 20px;
    width: 100%;
    font-size: 14px;
    span {
      color: #2A99F2;
      cursor: pointer;
    }
  }

  .resetModal-title {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    > span {
      font-weight: bold;
      color: #333333;
    }
  }

  .resetModal-table {
    margin-top: 14px;
    display: flex;
    justify-items: center;
    align-items: center;
    height: 40px;
    background: rgba(246, 250, 253, 1);
    box-shadow: 0px 1px 1px 0px rgba(204, 204, 204, 0.5);
    > li {
      width: 30%;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      padding-left: 20px;
    }
    li:nth-child(1) {
      width: 10%;
    }
  }

  .data {
    background: #FFF;
    margin-top: 0;
    height: 60px;
    > li {
      > input {
        height: 30px;
        border: 1px solid rgba(225, 225, 225, 1);
        border-radius: 4px;
        padding-left: 5px;
        outline: none;
        &.error {
          border: 1px solid #FF0000;
          color: #FF0000;
        }
      }
      > p {
        color: #FF0000;
        margin-top: 5px
      }
    }
    li:nth-child(3) {
      color: #2A99F2;
      cursor: pointer;
    }
  }

  .resetModal-import {
    margin-top: 20px;
    position: relative;
    > span {
      display: inline-block;
      width: 80px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
    }
    > img {
      cursor: pointer;
      position: absolute;
      left: 54%;
      top: 30%;
    }
    > input {
      height: 30px;
      width: 300px;
      padding-left: 10px;
      border-radius: 2px;
      border: 1px solid rgba(225, 225, 225, 1);
    }
  }

  .resetModal-hint {
    margin-top: 5px;
    > p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 0, 0, 1);
      line-height: 16px;
      padding-left: 82px;
    }
  }

  .resetModal-p {
    margin-top: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      span {
        color: #FF0000;
      }
    }
  }
</style>
