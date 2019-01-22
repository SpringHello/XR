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
          <Button type="primary" @click="$router.push('/ruicloud/buy/bhost')">+ 创建</Button>
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
              <Dropdown-item name="joinLoadBalance" :disabled="joinLoadBalanceDisabled">加入负载均衡</Dropdown-item>
              <Dropdown-item name="bindingIP" :disabled="bindingIPDisabled">绑定IP</Dropdown-item>
              <Dropdown-item name="rename" :disabled="renameDisabled">重命名</Dropdown-item>
              <Dropdown-item name="ratesChange" :disabled="ratesChangeDisabled">
                <Tooltip content="资费变更只适用于实时计费的资源" placement="top">资费变更
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="renewal" :disabled="histRenewDisabled">主机续费</Dropdown-item>
              <Dropdown-item name="backup" :disabled="makeSnapshotDisabled">制作快照</Dropdown-item>
              <Dropdown-item name="mirror" :disabled="makeMirrorDisabled">
                <Tooltip content="制作镜像只适用于已关机的资源" placement="top">制作镜像
                </Tooltip>
              </Dropdown-item>
              <Dropdown-item name="unbindIP" :disabled="unbindIPDisabled">解绑公网IP</Dropdown-item>
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
          <img src="../../assets/img/host/h-icon10.png"/>
          <span>共 {{ pageSize}} 项 | 已选择 <span style="color:#FF624B;">{{ hostSelection.length }} </span>项</span>
        </div>
        <Table :columns="hostListColumns" :data="hostListData" @on-selection-change="hostSelectionChange"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="hostPages" :current="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
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
        <Button type="primary" @click="bindipSubmit('bindForm')">确定
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
        <Button type="primary" @click="renewalok" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 实时续费 -->
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
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
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
          unbindIP: false
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
              let text_1 = params.row.companyname ? params.row.companyname : '----'
              let text_2 = params.row.computername ? params.row.computername : '----'
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
                        this.$router.push('newHostManage')
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
                        this.$router.push('newHostManage')
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
              let bindip = params.row.bindip ? params.row.bindip : 0
              let icon_1 = require('../../assets/img/host/h-icon1.png')
              let icon_2 = require('../../assets/img/host/h-icon2.png')
              let icon_3 = require('../../assets/img/host/h-icon3.png')
              let icon_4 = require('../../assets/img/host/h-icon4.png')
              let styleInfo = {
                marginLeft: '5px',
                lineHeight: '16px'
              }
              switch (params.row.status) {
                case -2:
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', {style: styleInfo}, '销毁中')])
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
                        display: 'flex'
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
                        display: 'flex'
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
              let text_3 = '带宽:' + textArr[1]
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
              let icon_1 = require('../../assets/img/host/h-icon5.png')
              let icon_2 = require('../../assets/img/host/h-icon6.png')
              let icon_3 = require('../../assets/img/host/h-icon7.png')
              let icon_4 = require('../../assets/img/host/h-icon8.png')
              let imgStyle = {
                height: '16px',
                width: '16px',
                marginRight: '5px'
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
                        src: icon_1
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
                      marginRight: '10px'
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
                        alert('删除')
                      }
                    }
                  }, '删除')])
                  break
                case 0:
                  return h('div', {}, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginRight: '10px'
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
                        alert('删除')
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
                            this.$router.push('newHostManage')
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
                                break
                            }
                          }
                        }
                      }, [h('a', {}, ['更多操作 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [h('DropdownItem', {
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
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
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
                            this.$router.push('newHostManage')
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
                                      this.$router.push('newUpgrade')
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
                                break
                            }
                          }
                        }
                      }, [h('a', {
                        style: {
                          marginBottom: '5px'
                        }
                      }, ['更多操作 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [h('DropdownItem', {
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
                            name: 'histRenew'
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
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
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
                  return h('span', {}, '----')
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
      }
    },
    created() {
      this.toggleZone(this.$store.state.zone.zoneid)
      // 用户未认证，弹出认证提示框
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true
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
                    this.$router.push('newUpgrade')
                  }
                }
              })
            }
            break
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
              }

            }
          })
        }, 3000)
      },
      hostShutdown(val) {
        let params = {}
        if (val == 1) {
          this.hostListData.forEach(host => {
            this.selectHostIds.forEach(item => {
              if (host.id == item) {
                host.bindip = 0
                host.status = 2
                host.computerstate = 1
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
      hostDelete() {
        if (this.hostSelection.length > 5) {
          this.$Message.info('删除主机至多选择 5 项')
          return
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
                sessionStorage.setItem('vpcId', item.vpcid)
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
      bindipSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.hostListData.forEach(host => {
                if (host.id == this.hostCurrentSelected.id) {
                  host.status = 2
                  host.bindip = 1
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
                this.getHostList()
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
          }
          else if (response.status == 200 && response.data.status == 2) {
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
        window.open('/ruicloud/link')
      },
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
          // 只有开机状态的主机才能关机
          return !this.hostSelection.every(host => {
            return host.status == 1 && host.computerstate == 1
          })
        }
      },
      deleteDisabled() {
        return this.hostSelection.length === 0
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
      histRenewDisabled() {
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
          return this.hostSelection[0].status != 1
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
              hostIdArr: this.hostSelection[0].id,
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
              hostIdArr: this.hostSelection[0].id,
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
              hostIdArr: this.hostSelection[0].id,
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
