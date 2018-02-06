<template>
  <div class="background">
    <div class="wrapper">
      <span>
        <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> /
        <router-link to="host" style="color:rgba(17, 17, 17, 0.43);">云主机</router-link> / 管理
      </span>
      <div class="content">
        <div class="info">

          <header>
            <Icon type="chevron-down"></Icon>
            <span>{{this.$route.query.computername}}</span>
            <div>
              <Button class="btn">返回</Button>
              <Button class="btn">连接主机</Button>
              <!-- <Poptip confirm title="您确认关闭主机吗？">
                <Icon type="power" style="padding-left: 10px;padding-top:2px;font-size: 25px;"></Icon>
              </Poptip> -->

            </div>

          </header>
          <div class="pan" v-if="computerInfo!=null" style="width:28%">
            <span>
              <i v-if="computerInfo.cpuNum">{{computerInfo.cpuNum}}CPU  , </i>
              <i v-if="computerInfo.memory">{{computerInfo.memory}}G内存 , </i>
              <i v-if="computerInfo.bandwith">{{computerInfo.bandwith}}M宽带  </i>
              <i v-if="computerInfo.zoneName"> | {{computerInfo.zoneName}}</i>
            </span>
            <span>镜像系统：{{computerInfo.template}}</span>
            <span>到期时间／有效期：{{computerInfo.endtime}}</span>
            <span>内网地址：{{computerInfo.privateIp}}</span>
            <span><span>登录密码：</span>
              <span v-show="showPassword" class="bluetext">{{computerInfo.password}}</span>
              <span v-show="!showPassword" class="bluetext">******</span>
              <label :class="{close:showPassword}" @click="showPassword=!showPassword"></label></span>
          </div>
          <div class="pan" v-if="computerInfo!=null" style="width: 20%">

            <span>所属VPC：<span class="bluetext">{{computerInfo.vpc}}</span></span>
            <span>绑定公网：<span class="bluetext">{{computerInfo.publicIp}}</span></span>
            <span>所属负载均衡：<span class="bluetext">{{computerInfo.loadbalance.join('|')}}</span></span>
            <span>挂载磁盘：<span class="bluetext">{{computerInfo.disk.join('|')}}</span></span>
            <span>状态：<span class="bluetext">{{computerInfo.computerStatus ? "开机" : "关机"}}</span></span>
          </div>
          <div class="pan" v-if="computerInfo!=null" style="width: 20%">

            <span>计费类型：{{computerInfo.case_type == 1 ? '包年' : computerInfo.case_type == 2 ? '包月' : '实时'}}</span>
            <span>创建于：{{computerInfo.createTime}}</span>
            <span>自动续费：<span class="bluetext">{{computerInfo.isAutoRenw ? '开' : '关'}}</span></span>

          </div>
        </div>

        <div class="charts">
          <Tabs type="card" :animated="false">
            <Tab-pane label="监控">
              <div class="body">
                <Button type="primary" @click="setMonitoring">监控告警设置</Button>
                <div class="flex">
                  <div class="item">
                    <label>CPU利用率 <span class="timeText">{{ CPUTime}}</span></label>
                    <div style="margin-top:10px;">
                      <Radio-group v-model="cpu.type" type="button" @on-change="queryData('cpu')">
                        <Radio label="今天"></Radio>
                        <Radio label="最近7天"></Radio>
                        <Radio label="最近30天"></Radio>
                      </Radio-group>
                      <Radio-group v-model="cpu.showType" type="button" style="float:right" @on-change="toggle('cpu')">
                        <Radio label="折线"></Radio>
                        <Radio label="柱状图"></Radio>
                      </Radio-group>

                    </div>
                    <div style="width:1180px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="cpuPolar"></chart>
                    </div>
                  </div>
                  <div class="item">
                    <label>内存使用率<span class="timeText">{{ memoryTime}}</span></label>
                    <div style="margin-top:10px;">
                      <Radio-group v-model="memory.type" type="button" @on-change="queryData('memory')">
                        <Radio label="今天"></Radio>
                        <Radio label="最近7天"></Radio>
                        <Radio label="最近30天"></Radio>
                      </Radio-group>
                      <Radio-group v-model="memory.showType" type="button" style="float:right"
                                   @on-change="toggle('memory')">
                        <Radio label="折线"></Radio>
                        <Radio label="柱状图"></Radio>
                      </Radio-group>

                    </div>
                    <div style="width:1180px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="memoryPolar"></chart>
                    </div>
                  </div>

                  <div class="item">
                    <label>磁盘空间利用率<span class="timeText">{{ diskTime }}</span></label>
                    <div style="margin-top:10px;">
                      <Radio-group v-model="disk.type" type="button" @on-change="queryData('disk')">
                        <Radio label="今日"></Radio>
                        <Radio label="最近7天"></Radio>
                        <Radio label="最近30天"></Radio>
                      </Radio-group>
                      <Radio-group v-model="disk.showType" type="button" style="float:right"
                                   @on-change="toggle('disk')">
                        <Radio label="折线"></Radio>
                        <Radio label="柱状图"></Radio>
                      </Radio-group>

                    </div>
                    <div style="width:1180px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="diskPolar"></chart>
                    </div>
                  </div>

                  <div class="item">
                    <label>弹性IP弹性流量<span class="timeText">{{ IPTime}}</span></label>
                    <div style="margin-top:10px;">
                      <Radio-group v-model="flow.type" type="button" @on-change="queryData('flow')">
                        <Radio label="今天"></Radio>
                        <Radio label="最近7天"></Radio>
                        <Radio label="最近30天"></Radio>
                      </Radio-group>
                      <div style="display: inline-block;height: 32px;vertical-align: top;padding: 9px 4px;">
                        <span id="in-icon" style="margin: 0px 23px;">入网</span>
                        <span id="out-icon" style="margin: 0px 16px;">出网</span>
                      </div>
                      <Radio-group v-model="flow.showType" type="button" style="float:right"
                                   @on-change="toggle('flow')">
                        <Radio label="折线"></Radio>
                        <Radio label="柱状图"></Radio>
                      </Radio-group>

                    </div>
                    <div style="width:1180px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="ipPolar"></chart>
                    </div>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <TabPane label="快照管理" name="name2">
              <div class="body">
              <Button type="primary" @click="delSnapshot" style="margin-bottom:10px">删除快照</Button>

                <Table ref="selection" :columns="snapshotCol" :data="snapshotData"
                        @radio-change="changeSelection"></Table>
              </div>
            </TabPane>
            <Tab-pane label="修改密码">
              <div class="body">
                <label>重置密码</label>
                <Form ref="reset" :model="resetPasswordForm" label-position="left" :label-width="100"
                      style="margin-top:20px;"
                      :rules="resetRuleValidate">
                  <Form-item label="请输入旧密码" prop="oldPassword">
                    <Input v-model="resetPasswordForm.oldPassword" placeholder="请输入旧密码" type="password"
                           style="width:200px;"></Input>
                  </Form-item>
                  <Form-item label="请输入新密码" prop="newPassword">
                    <Input v-model="resetPasswordForm.newPassword" placeholder="请输入不小于六位数的新密码" type="password"
                           style="width:200px;"></Input>
                  </Form-item>
                  <Form-item label="请确认新密码" prop="confirmPassword">
                    <Input v-model="resetPasswordForm.confirmPassword" placeholder="请确认新密码" type="password"
                           style="width:200px;"></Input>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" size="small" @click="resetConfirm"
                            :disabled="resetPasswordForm.buttonDisabled">
                      {{resetPasswordForm.buttonMessage}}
                    </Button>
                  </Form-item>
                </Form>

                <label>重装系统</label>

                <Form :model="reloadForm" :label-width="100" label-position="left" style="margin-top:20px;width:350px;">
                  <Form-item label="选择镜像">
                    <Select v-model="reloadForm.system">
                      <OptionGroup label="ubuntu" v-show="osOptions.ubuntu.length>0">
                        <Option v-for="(item,index) in osOptions.ubuntu" :key="index" :value="item.systemtemplateid">
                          {{item.templatename}}
                        </Option>
                      </OptionGroup>
                      <OptionGroup label="window" v-show="osOptions.window.length>0">
                        <Option v-for="(item,index) in osOptions.window" :key="index" :value="item.systemtemplateid">
                          {{item.templatename}}
                        </Option>
                      </OptionGroup>
                      <OptionGroup label="centos" v-show="osOptions.centos.length>0">
                        <Option v-for="(item,index) in osOptions.centos" :key="index" :value="item.systemtemplateid">
                          {{item.templatename}}
                        </Option>
                      </OptionGroup>
                      <OptionGroup label="debian" v-show="osOptions.debian.length>0">
                        <Option v-for="(item,index) in osOptions.debian" :key="index" :value="item.systemtemplateid">
                          {{item.templatename}}
                        </Option>
                      </OptionGroup>
                    </Select>
                  </Form-item>
                  <Form-item label="管理员密码">
                    <Input v-model="reloadForm.password" placeholder="8～20位大小写字母加数字" type="password"></Input>
                  </Form-item>
                  <p
                    style="font-size: 14px;color: rgba(-2147483648,-2147483648,-2147483648,0.43);line-height: 18px;margin-bottom:15px;">
                    *提示：重装主机后，将无法找回系统盘数据， 数据盘需要重新挂载。请按照
                    <router-link to="overview">帮助中心</router-link>
                    中的指导说明进行。
                  </p>
                  <Form-item>
                    <Button v-if="reloadButton=='确认重装'" type="primary" size="small" @click="reload">{{reloadButton}}
                    </Button>
                    <Button v-else type="primary" size="small" disabled>{{reloadButton}}</Button>
                  </Form-item>
                </Form>

              </div>
            </Tab-pane>
            <Tab-pane label="网卡设置">
              <div class="body">
                <label style="border-bottom:none">网卡设置</label>
                <div>
                  <button>绑定网卡</button>
                  <button>解绑网卡</button>
                  <button>修改内网IP</button>
                  <button>删除</button>
                  <div style="float:right">
                    <span
                      style="font-size: 16px;vertical-align: middle;color: rgba(0,0,0,0.65);">开始结束时间&nbsp;&nbsp;</span>
                    <Date-picker :value="searchDate" format="yyyy-MM-dd" type="daterange" placement="bottom-end"
                                 placeholder="选择日期" style="width: 200px"></Date-picker>
                    <button>查询</button>
                  </div>
                </div>

                <Table :columns="columns" :data="tableData"></Table>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <Modal width="700" v-model="showModal.setMonitoringForm" :scrollable="true">
        <div slot="header" class="modal-header-border"
             style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;font-weight: 600">
          告警策略配置
        </div>
        <div style="height: 250px">
          <div style="display:flex;">
            <p style=" font-size: 14px;line-height: 22px;">通知类型</p>
            <Checkbox v-model="isletter" size="large" style="margin-left: 20px;font-size: 12px;line-height: 22px;">站内信</Checkbox>
            <Checkbox v-model="isemailalarm" size="large" style="margin-left: 20px;font-size: 12px;line-height: 22px;">邮箱</Checkbox>
            <Checkbox v-model="issmsalarm" size="large" style="margin-left: 20px;font-size: 12px;line-height: 22px;">短信</Checkbox>
          </div>
          <div class="setForm">
            <div>
              <div>
                <p>CPU利用率设定</p>
                <Select v-model="setCPU" class="setSelect">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div style="margin-top: 40px;">
                <p>内存使用率设定</p>
                <Select v-model="setRAM" class="setSelect">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div>
              <div>
                <p>磁盘空间利用率设定</p>
                <Select v-model="setDisk" class="setSelect">
                  <Option v-for="item in setList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div style="margin-top: 40px;float: right">
                <p>流量告警设定</p>
                <Select v-model="setFluxIn" class="setSelect">
                  <Option v-for="item in fluxList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
          </div>
          <!-- <div style=" margin-top: 40px;padding-left: 15px;">
            <p style="font-size: 16px;line-height: 30px;">流量流出告警设定</p>
            <Select v-model="setFluxOut" style="  width:150px;margin-left: 5px">
              <Option v-for="item in fluxList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div> -->
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.setMonitoringForm=false">取消</Button>
          <Button type="primary" @click="setMonitoringOk">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 回滚确认弹窗 -->
    <Modal v-model="showModal.rollback" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>主机回滚</strong>
          <p class="lh24">是否确定回滚主机</p>
          <p class="lh24">提示：您正使用<span class="bluetext">{{snapsName}}</span>回滚<span class="bluetext">{{hostName}}</span>至<span
            class="bluetext">时间点</span>，当您确认操作之后，此<span class="bluetext">时间点</span>之后的主机内的数据将丢失。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rollback=false">取消</Button>
        <Button type="primary" @click="rollbackSubmit">确定</Button>
      </p>
    </Modal>
     <!-- 确认系统重装弹窗 -->
    <Modal v-model="showModal.reload" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>警告</strong>
          <p class="lh24">为了数据安全，系统重装之前主机会自动关闭。重装结束后，主机会自动开机。</p>
          <Input v-model="reloadhintForm.input" placeholder="请输入“confirm”" style="width: 300px"></Input>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.reload=false">取消</Button>
        <Button type="primary" @click="reloadSubm" :disabled="reloadhintForm.input!='confirm'">确定</Button>
      </p>
    </Modal>
    <!-- 删除快照弹窗 -->
    <Modal v-model="showModal.delsnaps" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除快照</strong>
          <p class="lh24">确定要删除选中的快照吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delsnaps=false">取消</Button>
        <Button type="primary" @click="delsnapsSubm">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'
  import defaultOptions from '@/echarts/defaultOptions'
  import histogram from '@/echarts/Histogram'
  import ipOptions from '@/echarts/ipOptions'
  import ipHistogram from '@/echarts/ipHistogram'
  // import {deepClone} from '../util/util'
  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  var defaultOptionstr = JSON.stringify(defaultOptions)
  var histogramstr = JSON.stringify(histogram)
  export default {

    data() {
      const validatePassword = (rule, value, callback) => {
        if (value != '') {
          var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,}$/
          if (!regExp.test(value)) {
            return callback(new Error('密码由6位及以上的字母数字组成，必须包含大小写字母、数字'))
          }
          return callback()
        } else if (value == '') {
          return callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      return {
        snapsId: '',
        snapsName: '',
        hostName: '',
        cursnapshot: null,
        CPUTime: '',
        diskTime: '',
        memoryTime: '',
        IPTime: '',
        showPassword: false,
        computerInfo: null,
        reloadhintForm: {
          input: ''
        },
        //系列化对象
        cpuPolar: JSON.parse(defaultOptionstr),
        diskPolar: JSON.parse(defaultOptionstr),
        memoryPolar: JSON.parse(defaultOptionstr),
        ipPolar: ipOptions,
        snapshotCol: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '快照名称',
            key: 'snapshotname'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              switch (params.row.status) {
                case 1:
                  return h('span', {}, '正常')
                case -1:
                  return h('span', {
                    style: {
                      color: '#EE4545'
                    }
                  }, '正常')
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
            title: '间隔类型',
            key: 'interval',
            render: (h, params) => {
              const row = params.row
              const text = row.createway === 'hand' ? '手动' : row.createway === 'day' ? '每天' : row.createway === 'week' ? '每周' : row.createway === 'month' ? '每月' : ''
              return h('span', {}, text)
            }
          },
          {
            title: '创建于',
            key: 'addtime'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'point'
                },
                on: {
                  click: () => {
                    this.showModal.rollback = true
                    this.cursnapshot = params.row
                    this.snapsName = params.row.snapshotname
                    this.hostName = params.row.name
                  }
                }
              }, '回滚')
            }
          }
        ],
        snapshotData: [],
        cpu: {
          type: '今天',
          showType: '折线'
        },
        memory: {
          type: '今天',
          showType: '折线'
        },
        disk: {
          type: '今天',
          showType: '折线'
        },
        flow: {
          type: '今天',
          showType: '折线'
        },

        columns: [
          {
            title: 'ID',
            key: 'publicipid',
            align: 'center'
          },
          {
            title: 'IP地址',
            key: 'publicip',
            align: 'center'
          },
          {
            title: '区域',
            key: 'zonename',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render(h, obj) {
              let value = ''
              switch (obj.row.status) {
                case 1:
                  value = '正常'
                  break
                case 0:
                  value = '欠费'
                  break
                case -2:
                  value = '正常'
                  break
                case -1:
                  value = '其他原因失败'
              }
              console.log(value)
              return h('span', value)
            }
          },
          {
            title: '绑定资源',
            key: 'computername',
            align: 'center'
          },
          {
            title: '消费类型',
            key: 'caseType',
            align: 'center',
            render(h, obj) {
              let value = ''
              switch (obj.row.caseType) {
                case 1:
                  value = '包年'
                  break
                case 2:
                  value = '包月'
                  break
                case 3:
                  value = '实时计费'
              }
              return h('span', value)
            }
          },
          {
            title: '带宽',
            key: 'bandwith',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createtime',
            align: 'center'
          }
        ],
        tableData: [],

        resetPasswordForm: {
          newPassword: '',
          confirmPassword: '',
          buttonMessage: '确认重置',
          buttonDisabled: false
        },
        resetRuleValidate: {
          oldPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
        },
        reloadForm: {
          system: '',
          password: ''
        },
        osOptions: {
          ubuntu: [],
          window: [],
          centos: [],
          debian: []
        },
        searchDate: [],
        reloadButton: '确认重装',
        showModal: {
          setMonitoringForm: false,
          rollback: false,
          delsnaps: false,
          reload: false
        },
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
        isLetter: 0,
        isEmailAlarm: 0,
        isSmsAlarm: 0,
        TIME: ''
      }
    },
    created() {
      // if (sessionStorage.getItem('oneHostinfo')) {
      //   this.computerInfo = JSON.parse(sessionStorage.getItem('oneHostinfo'))
      // }
      this.snapsId = this.$route.query.vmid
      var computerInfoURL = `information/listVMByComputerId.do?VMId=${this.$route.query.vmid}&zoneId=${this.$route.query.zoneid}`
      axios.get(computerInfoURL)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.computerInfo = response.data.result
            axios.get(`information/listTemplates.do?osType=${this.computerInfo.computerOsType}&zoneId=${this.$route.query.zoneid}`)
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.osOptions = response.data.result
                }
              })
          }
        })
      var url1 = `alarm/getVmAlarmByHour.do?vmname=${this.$route.query.instancename}&type=core`
      this.$http.get(url1)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.cpuPolar.series[0].data = response.data.result.cpuUse
            // this.diskPolar.series[0].data = response.data.result.diskUse
            // this.memoryPolar.series[0].data = response.data.result.memoryUse
            this.cpuPolar.series[0].data = [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.diskPolar.series[0].data = [0, 0, 0, 70, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.memoryPolar.series[0].data = [0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.cpuPolar.xAxis.data = response.data.result.xaxis
            this.diskPolar.xAxis.data = response.data.result.xaxis
            this.memoryPolar.xAxis.data = response.data.result.xaxis
          }
        })
      // var url2 = `network/listNetworkByVM.do?vmid=${this.$route.query.vmid}`
      // this.$http.get(url2)
      //   .then(response => {
      //     if (response.status == 200 && response.data.status == 1) {
      //       this.tableData = response.data.result
      //     }
      //   })

      var networkURL = `alarm/getVmAlarmByHour.do?vmname=${this.$route.query.instancename}&type=network`
      this.$http.get(networkURL)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.ipPolar.series[0].data = response.data.result.networkIn
            this.ipPolar.series[0].data = [0, 0, 0, 70, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.ipPolar.series[1].data = response.data.result.networkOut
            this.ipPolar.xAxis.data = response.data.result.xaxis
          }
        })
      this.CPUTime = this.getCurrentDate()
      this.diskTime = this.getCurrentDate()
      this.memoryTime = this.getCurrentDate()
      this.IPTime = this.getCurrentDate()
      this.getsnapsList()
      this.inter()
    },
    methods: {
      inter() {
        this.intervalSnapsList = setInterval(() => {
          var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1&resourceId=${this.snapsId}`
          axios.get(snapsURL)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var snapshotData = response.data.result
                  snapshotData.forEach(item => {
                        if (this.snapsSelection) {
                          if (this.snapsSelection.id == item.id) {
                            item._checked = true
                          }
                          if (item.status == 2) {
                            item._disabled = true
                          }
                        }
                      })
                      this.snapshotData = snapshotData
                    }
            })
          }, 1000 * 10)
      },
      // 回滚确认弹窗
      rollbackSubmit() {
        this.showModal.rollback = false
        var URL = `Snapshot/revertToVMSnapshot.do?snapshotId=${this.cursnapshot.snapshotid}&zoneId=${$store.state.zone.zoneid}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200) {
              this.$Message.success({
                content: response.data.message,
                duration: 5
              })
            }
          })
      },
      changeSelection(selection) {
        this.snapsSelection = selection
      },
      // 系统重装确认弹窗
      reloadSubm() {
        this.showModal.reload = false
        this.reloadhintForm.input = ''
        var url = `information/restoreVirtualMachine.do?VMId=${this.computerInfo.computerId}&templateId=${this.reloadForm.system}&adminPassword=${this.reloadForm.password}`
          this.reloadButton = '正在重装...'
          this.$http.get(url).then(response => {
            this.reloadButton = '确认重装'
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$message.info(response.data.message)
            }
          })
      },
      // 获取具体主机下的快照列表
      getsnapsList() {
        var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1&resourceId=${this.snapsId}`
        axios.get(snapsURL)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var snapshotData = response.data.result
                  snapshotData.forEach(item => {
                        if (this.snapsSelection) {
                          if (this.snapsSelection.id == item.id) {
                            item._checked = true
                          }
                          if (item.status == 2) {
                            item._disabled = true
                          }
                        }
                      })
                      this.snapshotData = snapshotData
                    }
            })
      },
      delSnapshot() {
        if (this.snapsSelection == null) {
          this.$Message.warning('请选择一个快照')
          return
        }
        this.showModal.delsnaps = true
      },
      delsnapsSubm() {
        this.showModal.delsnaps = false
        this.snapshotData.forEach(item => {
          if (item.snapshotid == this.snapsSelection.snapshotid) {
            item.status = 3
          }
        })
        var URL = `Snapshot/deleteVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&ids=${this.snapsSelection.id}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.getsnapsList()
            }
          })
      },
      rollback() {
        this.showModal.rollback = false
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
      toggle(type) {
        if (type != 'flow') {
          var polar = this[type].showType == '折线' ? JSON.parse(defaultOptionstr) : JSON.parse(histogramstr)
          polar.xAxis.data = this[type + 'Polar'].xAxis.data
          polar.series[0].data = this[type + 'Polar'].series[0].data
          this[type + 'Polar'] = polar
        } else {
          polar = this[type].showType == '折线' ? ipOptions : ipHistogram
          polar.xAxis.data = this.ipPolar.xAxis.data
          polar.series[0].data = this.ipPolar.series[0].data
          polar.series[1].data = this.ipPolar.series[1].data
          console.log(polar)
          this.ipPolar = polar
        }
      },
      queryData(type) {
        if (type == 'cpu') {
          switch (this[type].type) {
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
        } else if (type == 'memory') {
          switch (this[type].type) {
            case '今天':
              this.memoryTime = this.getCurrentDate()
              break
            case '最近7天':
              this.memoryTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
            case '最近30天':
              this.memoryTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
          }
        } else if (type == 'disk') {
          switch (this[type].type) {
            case '今天':
              this.diskTime = this.getCurrentDate()
              break
            case '最近7天':
              this.diskTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
            case '最近30天':
              this.diskTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
          }
        } else if (type == 'flow') {
          switch (this[type].type) {
            case '今天':
              this.IPTime = this.getCurrentDate()
              break
            case '最近7天':
              this.IPTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
            case '最近30天':
              this.IPTime = this.getNearlySevenDays() + '--' + this.getCurrentDate()
              break
          }
        }
        var url = this[type].type == '今天' ? urlList.dayURL : urlList.otherURL
        var queryType = type == 'flow' ? 'network' : 'core'
        var dateType = this[type].type == '最近7天' ? 'week' : 'month'
        this.$http.get(`${url}?vmname=${this.$route.query.instancename}&type=${queryType}&datetype=${dateType}`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (type == 'flow') {
                this.ipPolar.xAxis.data = response.data.result.xaxis
                this.ipPolar.series[0].data = response.data.result.networkIn
                this.ipPolar.series[1].data = response.data.result.networkOut
              } else {
                this[type + 'Polar'].xAxis.data = response.data.result.xaxis
                this[type + 'Polar'].series[0].data = response.data.result[type + 'Use']
              }
            }
          })
      },
      resetConfirm() {
        this.$message.confirm({
          title: '确认重置密码？',
          content: '<p>重置密码后，原密码失效。必须使用新密码登录主机</p>',
          onOk: () => {
            this.reset()
          }
        })
      },
      reset() {
        var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,}$/
        if (regExp.test(this.resetPasswordForm.newPassword) && this.resetPasswordForm.newPassword == this.resetPasswordForm.confirmPassword) {
          var url = `information/resetPasswordForVirtualMachine.do?VMId=${this.computerInfo.computerId}&password=${this.resetPasswordForm.newPassword}&oldPassword=${this.resetPasswordForm.newPassword}`
          var password = this.resetPasswordForm.newPassword
          this.resetPasswordForm.buttonMessage = '正在重置中...'
          this.resetPasswordForm.buttonDisabled = true
          this.$http.get(url).then(response => {
            this.resetPasswordForm.buttonMessage = '确认重置'
            this.resetPasswordForm.buttonDisabled = false
            if (response.status == 200 && response.data.status == 1) {
              this.computerInfo.password = password
              this.resetPasswordForm.newPassword = ''
              this.resetPasswordForm.confirmPassword = ''
              this.$Message.success(response.data.message)
            } else {
              this.$message.info(response.data.message)
            }
          })
        } else if (this.resetPasswordForm.newPassword != this.resetPasswordForm.confirmPassword) {
          this.$message.info('密码与确认密码不一致')
        }
      },
      reload() {
        if (this.reloadForm.system == '') {
          this.$message.info('请选择一个重装模版')
        } else if (this.reloadForm.password == '') {
          this.$message.info('请输入登录密码')
        } else {
          this.showModal.reload = true
        }
      },
      setMonitoring() {
        this.showModal.setMonitoringForm = true
        var url = `information/alarmConfig.do?instancename=${this.$route.query.instancename}`
        this.$http.get(url).then(response => {
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
            this.$message.info(response.data.message)
          }
        })
      },
      // 告警策略配置确定
      setMonitoringOk() {
        this.isLetter = this.isletter == true ? 1 : 0
        this.isEmailAlarm = this.isemailalarm == true ? 1 : 0
        this.isSmsAlarm = this.issmsalarm == true ? 1 : 0
        var url = `information/upalarmConfig.do?instancename=${this.$route.query.instancename}&cpuUse=${this.setCPU}&memoryUse=${this.setRAM}&diskUse=${this.setDisk}&networkIn=${this.setFluxIn}&networkOut=${this.setFluxOut}&isLetter=${this.isLetter}&isSmsAlarm=${this.isSmsAlarm}&isEmailAlarm=${this.isEmailAlarm}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.showModal.setMonitoringForm = false
          } else {
            this.showModal.setMonitoringForm = false
            this.$message.info(response.data.message)
          }
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      clearInterval(this.intervalSnapsList)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .ivu-tabs-bar {
    padding-left: 55px;
  }

  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        padding: 0px;
        .info {
          height: 237px;
          background-image: linear-gradient(-224deg, #05BCFD 0%, #4183EB 100%);
          padding: 24px 30px 24px 20px;
          position: relative;
          font-family: MicrosoftYaHei;
          header {
            margin-bottom: 20px;
            font-size: 18px;
            color: white;
            span {
              margin-left: 10px;
            }
            div {
              float: right;
            }
            .btn {
              color: #2A99F2;
              border-radius: 5px;
              padding: 5px 15px;
            }
          }
          .pan {
            float: left;
            margin-right: 20px;
            padding: 10px 20px;
            height: 120px;
            background: white;
            color: #666666;
            font-size: 12px;
            line-height: 12px;
            // box-shadow: 1px 1px 1px #666666;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
            .bluetext {
              color: rgb(42, 153, 242);
            }
            > span {
              /*font-family: PingFangSC-Medium;*/
              margin-bottom: 10px;
              display: block;
              user-select: none;
              i {
                font-style: normal;
              }
            }
            label {
              width: 24px;
              height: 15px;
              display: inline-block;
              bottom: 18px;
              right: 43px;
              cursor: pointer;
              vertical-align: sub;
              background-image: url("../../assets/img/manage/closeEye.png");
              &.close {
                background-image: url("../../assets/img/manage/eye.png");
              }
            }
          }
          > h1 {
            display: block;
            position: absolute;
            top: 86px;
            left: 313px;
            font-size: 63px;
            color: rgba(0, 0, 0, 0.10);
            user-select: none;
          }
        }
        .arrears {
          background-image: linear-gradient(-225deg, #FFC439 0%, #BD7F14 100%);
        }
        .error {
          background-image: linear-gradient(-226deg, #F09292 0%, #C53C3C 100%);
        }
        .close {
          background: #D9D9D9;
        }
        .charts {
          margin-top: -32px;
          .body {
            padding: 20px 19px;
            margin-top: -17px;
            background-color: white;
            & > label {
              font-family: "\5FAE\8F6F\96C5\9ED1";
              font-size: 16px;
              color: rgba(17, 17, 17, 0.95);
              line-height: 14px;
              display: block;
              padding-bottom: 12px;
              border-bottom: 1px solid #E9E9E9;
            }
            button {
              outline: none;
              padding: 5px 15px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 12px;
              color: #FFFFFF;
              line-height: 22px;
              background: #2A99F2;
              border-radius: 4.46px;
              border: none;
              margin-bottom: 16px;
              //margin:20px 19px;
            }
            .flex {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .item {
                width: 100%;
                margin-bottom: 50px;
                //height: 444px;
                & > label {
                  font-family: "微软雅黑";
                  font-size: 16px;
                  color: rgba(17, 17, 17, 0.95);
                  line-height: 14px;
                  display: block;
                  padding-bottom: 12px;
                  border-bottom: 1px solid #E9E9E9;
                  .timeText {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: rgba(102, 102, 102, 0.75);
                    line-height: 25px;
                    float: right;
                  }
                }
                button {
                  font-size: 12px;
                  margin-bottom: 0px;
                  padding: 5px 15px;
                  vertical-align: bottom;
                  margin-right: 20px;
                  float: right;
                }
                #in-icon::before {
                  content: '';
                  width: 8px;
                  height: 8px;
                  background-color: #3DBD7D;
                  display: inline-block;
                  border-radius: 5px;
                  margin-right: 5px;
                }
                #out-icon::before {
                  content: '';
                  width: 8px;
                  height: 8px;
                  background-color: #2A99F2;
                  display: inline-block;
                  border-radius: 5px;
                  margin-right: 5px;
                }
              }
            }
          }
          .echarts {
            width: 100%;
            height: 300px;
          }
        }
      }
    }
  }

  .setForm {
    display: flex;
    margin-top: 28px;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    p {
      font-size: 14px;
      line-height: 30px;
    }
    .setSelect {
      width: 240px;
    }
  }
</style>
