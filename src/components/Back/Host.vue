<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
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
              <Dropdown-item name="ratesChange" :disabled="status=='欠费'||status=='异常'">资费变更</Dropdown-item>
              <!-- 续费 -->
              <Dropdown-item name="renewal" v-if="status=='异常'" :disabled=true>主机续费
                <!--<span
                  style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>-->
              </Dropdown-item>
              <Dropdown-item name="renewal" v-else>主机续费<!--<span
                style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>-->
              </Dropdown-item>
              <!-- 备份 -->
              <Dropdown-item name="backup" v-if="status!='开启'&&status!='关机'" :disabled=true>
                <Tooltip content="异常、欠费状态，快照不可用" placement="top">
                  制作快照
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="backup" v-else>制作快照</Dropdown-item>
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
                  主机升级<span
                  style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="upgrade" v-else>
                主机升级<span
                style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>
              </Dropdown-item>

              <!-- 重启主机 -->

              <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认重启主机吗？"
                @on-ok="reboot"
                @on-cancel="cancel">
                <li class="del" v-if="status!='欠费'&&status!='异常'&&status!='关机'" :disabled=true>重启主机</li>
              </Poptip>

              <!-- 删除主机 -->

              <Dropdown-item name="delhost" v-if="status=='异常'" :disabled=true>删除主机</Dropdown-item>
              <Dropdown-item name="delhost" v-else>删除主机</Dropdown-item>

              <!-- 解绑主机 -->

              <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认解绑主机IP吗？"
                @on-ok="unbind"
                @on-cancel="cancel"
                style="display: block">
                <li class="del" v-if="status!='异常'" :disabled=true>解绑公网IP</li>
              </Poptip>

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

                <!--<div v-for="(item,index) in openHost" v-if="item.status==1" :key="index" :class="{select:item.select}"-->
                <div v-for="(item,index) in openHost" v-if="item.status!=2" :key="index" :class="{select:item.select}"
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
                                :class="{btnnormal:auth,_hover:auth}">管理
                        </Button>
                        <Button v-if="!auth" :disabled="!auth">连接主机</Button>
                        <Button v-else class="btnnormal _hover" @click="link(item)">连接主机
                        </Button>
                        <!--<a v-else :href="item.connecturl" target="_blank"
                           style="line-height: 30px;border: 1px solid;border-radius: 4px;width: 76px;" class="_hover">连接主机</a>-->
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
                  <Card style="width:375px;height:228px;cursor:pointer">
                    <div
                      style="height: 224px;cursor:pointer"
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
                      <div class="foot" style="background-color: #F24747;">
                        <span style="color:white">{{item.createtime}}</span>
                        <Button type="primary" @click="recoverHost(item.id)" class="abnormal-btn">
                          恢复
                        </Button>
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
                        <button @click="renewHost(item)"
                                style="color: #ffc439;background-color: white;padding: 5px 10px;cursor: pointer;outline: none;border: none">
                          续费
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
                                :class="{btnnormal:auth,_hover:auth}">管理
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

    <!-- 制作快照弹窗 -->
    <Modal v-model="showModal.backup" width="550" :scrollable="true" class="create-snas-modal">
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
              <span style="cursor:pointer;" @click="publicIPHint_ok">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" @click="bindipSubmit('bindForm')">确定
        </Button>
      </div>
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
            <p>如果现在配置内容不支持使用，可进行<span v-if="status =='关机'" @click="renewalUpgrade">主机升级</span><span v-else style="color:#333;cursor:not-allowed">主机升级</span>
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
    <!-- 欠费tab页，续费弹窗 -->
    <Modal v-model="showModal.Renew" width="550" :scrollable="true">
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
    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title"> 选择认证方式</span>
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
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
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>

    <!--远程连接密码提示框-->
    <!--<Modal v-model="showModal.linkPassword" width="360" :scrollable="true">-->
    <!--<p slot="header">-->
    <!--<span>远程连接密码</span>-->
    <!--</p>-->
    <!--<div>-->
    <!--<p style="font-size: 20px;margin-bottom: 15px;">您的远程连接密码是：{{linkPassword}}</p>-->
    <!--<p style="padding:5px;font-size: 12px;line-height: 20px;border:1px solid #cccccc;border-radius: 4px;">警告!-->
    <!--远程连接密码只出现一次，您以后每次远程连接登录时都需要输入该密码，请做好记录存档工作。</p>-->
    <!--</div>-->
    <!--<div slot="footer">-->
    <!--<Button type="primary" size="large" @click="open">登录</Button>-->
    <!--</div>-->
    <!--</Modal>-->

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
        <Button type="primary" @click="publicIPHint_ok">创建公网IP</Button>
      </p>
    </Modal>

  </div>
</template>

<script type="text/ecmascript-6">
  import merge from 'merge'
  // import {mapState} from 'vuex'
  import $store from '@/vuex'
  import axios from '@/util/axiosInterceptor'
  import Vue from 'vue'
  import regExp from '../../util/regExp'

  export default {
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      var status = '开启'
      if (sessionStorage.getItem('pane')) {
        switch (sessionStorage.getItem('pane')) {
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
        sessionStorage.removeItem('pane')
      }
      return {
        renewalInfo: '',
        originCost: '--',
        cost: '--',
        listLoadBalanceRole: [],
        openHost: [],
        closeHost: [],
        arrearsHost: [],
        errorHost: [],
        waitHost: [],
        currentHost: [],
        currentHostname: [],
        status,
        showModal: {
          backup: false,
          mirror: false,
          bindIP: false,
          renewal: false,
          rename: false,
          Renew: false,
          selectAuthType: false,
          balance: false,
          linkPassword: false,
          ratesChange: false,
          publicIPHint: false,
        },
        ratesChangeType: '',
        ratesChangeTime: '',
        originRatesChangeCost: '--',
        ratesChangeCost: '--',
        renameForm: {
          hostName: ''
        },
        renameFormRule: {
          hostName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        backupForm: {
          name: '',
          memory: '1'
        },
        backupFormRule: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        mirrorForm: {
          mirrorName: '',
          description: ''
        },
        mirrorFormRule: {
          mirrorName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
        },
        bindForm: {
          publicIP: ''
        },
        bindFormRule: {
          publicIP: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        loadBalanceForm: {
          loadbalanceroleid: ''
        },
        loadBalanceFormRule: {
          loadbalanceroleid: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        publicIPList: [],
        bindRenewalVal: [],
        isDisks: '',
        isIps: '',
        renewalType: '',
        renewalTime: '',
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
        },
        linkPassword: '111',
        // 变更资费关联相关
        relevanceAlteration: [],
        relevanceDisks: '',
        relevanceIps: ''
      }
    },
    created() {
      this.toggleZone(this.$store.state.zone.zoneid)
      // 用户未认证，弹出认证提示框
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true
      }
      /*if (this.$store.state.userInfo.personalauth != 0 && this.$store.state.userInfo.companyauth != 0) {
       this.showModal.selectAuthType = true
       }*/
      if (this.$route.query.name) {
        this.status = '关机'
      }

      this.getData()
      // 定时发送ajax 刷新页面
      this.intervalInstance = setInterval(() => {
        this.getData()
      }, 5 * 1000)
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
      publicIPHint_ok() {
        this.$router.push('/ruicloud/buy/bip')
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
              hostIdArr: this.currentHost[0].id,
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
      checkRenameForm() {
        this.$refs.renameForm.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用重命名的方法
            this.rename()
          }
        })
      },
      //加入负载均衡
      joinBalance() {
        if (this.checkSelect()) {
          axios.get('information/isloadbananceRoleAndServiceSchemeMatching.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              VMIds: this.currentHost[0].computerid,
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              // 成功的情况
              axios.get('information/listVMByComputerId.do', {
                params: {
                  VMId: this.currentHost[0].computerid,
                  zoneId: this.currentHost[0].zoneid
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
                            computerId: this.currentHost[0].computerid,
                            zoneId: this.currentHost[0].zoneid
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
                        VMId: this.currentHost[0].computerid
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
                  sessionStorage.setItem('vpcId', this.currentHost[0].vpcid)
                  this.$router.push('vpcManage')
                }
              })
            } else {
              this.$Message.info(response.data.message)
            }
          })
        }
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
                  VMIds: this.currentHost[0].computerid,
                  zoneId: this.currentHost[0].zoneid,
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
                  VMIds: this.currentHost[0].computerid,
                  zoneId: this.currentHost[0].zoneid,
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
      //恢复主机
      recoverHost(id) {
        this.$Modal.confirm({
          title: '',
          content: '<p>确定要恢复当前主机吗？</p>',
          scrollable: true,
          onOk: () => {
            this.$Message.info('主机正在恢复，请稍后')
            this.$http.get('information/recoverVM.do', {
              params: {
                id: id
              }
            }).then(response => {
              if (response.status == 200) {
                this.$Message.info(response.data.message)
                this.getData()
              } else {
                this.$message.info({
                  content: '服务器出错'
                })
                this.getData()
              }
            })
          }
        })
      },
      // 欠费主机续费
      renewHost(item) {
        if (item.caseType == 3) {
          this.showModal.Renew = true
          this.RenewForm.id = item.id
          this.RenewForm.cost = item.cpCase
        } else {
          this.currentHost[0] = item
          this.renewalInfo = {
            computername: this.currentHost[0].computername,
            templatename: this.currentHost[0].templatename,
            serviceoffername: this.currentHost[0].serviceoffername,
            endtime: this.currentHost[0].endtime
          }
          this.renewType()
          this.showModal.renewal = true
        }
      },
      // 实时欠费主机续费确认
      renewOk() {
        this.showModal.Renew = false
        this.$http.get('information/vmRenew.do', {
          params: {
            id: this.RenewForm.id,
          }
        }).then(response => {
          this.getData()
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('主机续费成功')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 获取数据的主要接口
      getData() {
        this.$http.get('information/listVirtualMachines.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 遍历各种主机类型，开启、关闭、欠费、错误、创建中
            for (var type of ['open', 'close', 'arrears', 'error', 'wait']) {
              var list = []
              var target = response.data.result[type] || {list: []}
              // console.log(target)
              for (var index in target.list) {
                var host = merge(this[`${type}Host`][index] || {}, target.list[index], {_select: this[`${type}Host`][index] ? this[`${type}Host`][index]._select : false})
                list.push(host)
              }
              this[`${type}Host`] = list
              // console.log(this[`${type}Host`])
            }
          }
        })
      },
      toggleData() {
        this.openHost = []
        this.closeHost = []
        this.arrearsHost = []
        this.errorHost = []
        this.waitHost = []
        this.currentHost = []
        this.$http.get('information/listVirtualMachines.do').then(response => {
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
            companyid: item.companyid,
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
                this.$http.get('information/startVirtualMachine.do', {
                  params: {
                    VMId: item.computerid
                  }
                }).then(response => {
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
      stop(item) {
        item.select = false
        item.status = 2
        this.$http.get('information/stopVirtualMachine.do', {
          params: {
            VMId: item.computerid,
            forced: true
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            item.status = 2
            this.$Message.info(response.data.message)
          } else {
            item.status = 1
          }
        })
      },
      start(item) {
        this.loadingMessage = '正在启动主机'
        this.loading = true
        item.select = false
        item.status = 2
        this.$http.get('information/startVirtualMachine.do', {
          params: {
            VMId: item.computerid
          }
        }).then(response => {
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
            this.$Message.warning('已绑定主机无法再次绑定!')
          } else {
            this.bindForm.publicIP = ''
            axios.get('network/listPublicIp.do', {
              params: {
                useType: 0,
                zoneId: this.currentHost[0].zoneid,
                vpcId: this.currentHost[0].vpcid
              }
            }).then(response => {
              this.loading = false
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
        }
      },
      bindipSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.showModal.bindIP = false
              this.$Message.info({
                content: `<span style="color:#2A99F2">${this.currentHost[0].computername}</span>云主机,正在绑定公网IP`
              })
              this.$http.get('network/enableStaticNat.do', {
                params: {
                  ipId: this.bindForm.publicIP,
                  VMId: this.currentHost[0].computerid
                }
              }).then(response => {
                this.loading = false
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
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
      unbind() {
        if (this.checkSelect()) {
          this.$Message.info({
            content: `<span style="color:#2A99F2">${this.currentHost[0].computername}</span>云主机,正在解绑公网IP`
          })
          this.$http.get('network/disableStaticNat.do', {
            params: {
              ipId: this.currentHost[0].publicip,
              VMId: this.currentHost[0].computerid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.currentHost[0].publicip = ''
            }
            else if (response.status == 200 && response.data.status == 2) {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      gotoNew() {
        this.$store.commit('setSelect', 'new')
        this.$router.push('buy')
      },
      // 查询续费主机下是否有ip或磁盘
      renewType() {
        axios.get('information/listVirtualMachinesById.do', {
          params: {
            VMId: this.currentHost[0].computerid,
            zoneId: this.currentHost[0].zoneid
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
      renewalUpgrade() {
        localStorage.setItem('serviceoffername', this.currentHost[0].serviceoffername)
        localStorage.setItem('virtualMachineid', this.currentHost[0].computerid)
        // localStorage.setItem('zoneid', this.currentHost[0].zoneid)
        sessionStorage.setItem('hostname', this.currentHost[0].computername)
        sessionStorage.setItem('endtime', this.currentHost[0].endtime)
        sessionStorage.setItem('rootdiskid', this.currentHost[0].rootdiskid)
        sessionStorage.setItem('rootdisksize', this.currentHost[0].rootdisksize)
        this.$router.push({
          name: 'upgrade'
        })
      },
      hideEvent(name) {
        switch (name) {
          case 'delhost':
            if (this.checkSelect()) {
              this.del()
            }
            break
          case 'rename':
            if (this.checkSelect()) {
              this.renameForm.hostName = ''
              this.showModal.rename = true
            }
            break
          case 'ratesChange':
            if (this.checkSelect()) {
              if (this.currentHost[0].caseType == 3) {
                this.ratesChange()
              } else {
                this.$Message.info('请选择实时计费的云主机进行资费变更')
              }
            }
            break
          case 'renewal':
            if (this.checkSelect()) {
              if (this.currentHost[0].caseType !== 3) {
                this.renewalInfo = {
                  computername: this.currentHost[0].computername,
                  templatename: this.currentHost[0].templatename,
                  serviceoffername: this.currentHost[0].serviceoffername,
                  endtime: this.currentHost[0].endtime
                }
                this.renewType()
              } else {
                this.$Message.info('请选择包年包月的云主机进行续费')
              }
            }
            break
          case 'backup':
            if (this.status != '开启' && this.status != '关机') {
              return
            }
            if (this.checkSelect()) {
              this.backupForm.backupName = ''
              this.backupForm.description = ''
              this.currentHostname = this.currentHost[0].computername
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
              this.$http.get('network/VMIsHaveSnapshot.do', {
                params: {
                  VMId: this.currentHost[0].computerid
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
                    localStorage.setItem('serviceoffername', this.currentHost[0].serviceoffername)
                    localStorage.setItem('disksize', this.currentHost[0].disksize)
                    localStorage.setItem('virtualMachineid', this.currentHost[0].computerid)
                    localStorage.setItem('zoneid', this.currentHost[0].zoneid)
                    sessionStorage.setItem('hostname', this.currentHost[0].computername)
                    sessionStorage.setItem('endtime', this.currentHost[0].endtime)
                    sessionStorage.setItem('rootdiskid', this.currentHost[0].rootdiskid)
                    sessionStorage.setItem('rootdisksize', this.currentHost[0].rootdisksize)
                    this.$router.push({
                      name: 'upgrade'
                    })
                  }
                }
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
      ratesChange() {
        let url = 'information/listVirtualMachinesById.do'
        axios.get(url, {
          params: {
            VMId: this.currentHost[0].computerid,
            zoneId: this.currentHost[0].zoneid,
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
            // console.log(this.relevanceDisks)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
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
      backupSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.backup = false
            axios.get('Snapshot/createVMSnapshot.do', {
              params: {
                VMId: this.currentHost[0].computerid,
                snapshotName: this.backupForm.name,
                memoryStatus: this.backupForm.memory,
                zoneId: this.currentHost[0].zoneid
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
      // 包年/月主机续费
      renewalok() {
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
          {type: 0, id: this.currentHost[0].id}
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
          {type: 0, id: this.currentHost[0].id}
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
      // 创建主机镜像
      mirrorSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.mirror = false
            axios.get('Snapshot/createTemplate.do', {
              params: {
                rootDiskId: this.currentHost[0].rootdiskid,
                templateName: this.mirrorForm.mirrorName,
                descript: this.mirrorForm.description,
                zoneId: this.currentHost[0].zoneid
              }
            }).then(response => {
              this.loading = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: '请求成功，镜像正在创建中，您可以到<span style="color: #0db4fa;cursor: pointer;"@click="toMirror">镜像列表</span>查看该镜像。',
                  duration: 5
                })
              }
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
          // 实时主机或者活动主机可以删除
          // if (this.currentHost[0].caseType != 3 || this.currentHost[0].isfreevm == 1) {
          //   this.$Message.warning('只能删除实时计费主机')
          //   return
          // }
          this.$message.confirm({
            content: `${this.currentHost[0].computername}主机删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
            onOk: () => {
              this.$http.get('information/deleteVM.do', {
                params: {
                  id: this.currentHost[0].id
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
                  this.getData()
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
      upgrade() {
        this.$router.push('/upgrade')
      },
      reboot() {
        if (this.checkSelect()) {
          this.loadingMessage = '正在重启主机'
          this.loading = true
          this.$http.get('information/rebootVirtualMachine.do', {
            params: {
              VMId: this.currentHost[0].computerid
            }
          }).then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      cancel() {

      },
      push(type) {
        sessionStorage.setItem('pane', type)
        this.$router.push('/ruicloud/usercenter')
      },
      // 连接主机动作
      link(item) {
        localStorage.setItem('link-companyid', item.companyid)
        localStorage.setItem('link-vmid', item.computerid)
        localStorage.setItem('link-zoneid', item.zoneid)
        localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
        window.open('/ruicloud/link')
        //this.$router.push('link')
        /*this.$http.get('information/connectVm.do', {
         params: {
         VMId: item.computerid
         }}).then(response => {
         if (response.data.connectCode == '') {
         /!*var form = document.createElement('form');
         form.action = 'https://www.baidu.com';
         form.target = '_blank';

         form.method = 'POST';

         document.body.appendChild(form);
         form.submit();*!/
         //window.open('/ruicloud/link')
         tempwindow.location = 'https://www.baidu.com';
         } else {
         tempwindow.close()
         // 是第一次连接，弹出模态框
         this.linkPassword = response.data.connectCode
         this.showModal.linkPassword = true
         }
         })*/
      },
      // open(){
      //   window.open('/ruicloud/link')
      // }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
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
              hostIdArr: this.currentHost[0].id,
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
          // console.log(this.relevanceDisks)
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.ratesChangeTime,
              timeType: this.ratesChangeType,
              hostIdArr: this.currentHost[0].id,
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
              hostIdArr: this.currentHost[0].id,
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
      .abnormal-btn {
        color: #2A99F2;
        background-color: #FFF;
        &:hover {
          background: #2A99F2;
          color: #FFFFFF;
        }
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
      &:hover {
        background: #2A99F2;
        color: #FFFFFF
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
</style>
