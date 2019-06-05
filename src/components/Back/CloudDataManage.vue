<template>
  <div id="background">
    <div id="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span class="title" style="background-color: #f5f5f5;">
        <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> /
        <router-link to="host" style="color:rgba(17, 17, 17, 0.43);">云数据库</router-link> / <span>管理</span>
      </span>
      <div class="content">
        <div class="info">
          <header>
            <!-- <span class="arrowdown-icon"></span> -->
            <span style="line-height: 32px;">{{databaseInfo.computername}}</span>
            <div>
              <Button class="btn" @click="$router.go(-1)" style="margin-right: 10px;">返回</Button>
            </div>
          </header>
          <div class="pan" v-if="databaseInfo!=null" style="width:28%">
            <div>
              <!-- <i >{{databaseInfo.serviceoffername}}</i> -->
              <i>{{configure[0]}} ,</i>
              <i v-if="databaseInfo.disksize">{{databaseInfo.disksize}}G硬盘 ,</i>
              <i>{{configure[2]}} </i>
              <i v-if="databaseInfo.zonename"> | {{databaseInfo.zonename}}</i>
            </div>
            <div>镜像系统：{{databaseInfo.templatename}}</div>
            <div>数据库端口：{{databaseInfo.dbPort}} <span class="bluetext" @click="portModify">修改端口</span></div>
            <div>内网地址：{{databaseInfo.privateip}}</div>
            <div>登录密码：
              <span :class="[isActive ? 'send' : 'nosend']" @click="lookPassword()">{{codePlaceholder}}</span>
            </div>
          </div>
          <div class="pan" v-if="databaseInfo!=null" style="width: 20%">
            <div>所属VPC：<span class="bluetext">{{databaseInfo.vpcname}}</span></div>
            <div>绑定公网：<span class="bluetext">{{databaseInfo.publicip}}</span></div>
            <!-- <div>所属负载均衡：
              <Tooltip placement="top-start" v-if="databaseInfo.loadbalance">
                <span class="bluetext one-row-text" style="width:100px;">{{databaseInfo.loadbalance}}</span>
                <div slot="content" v-for="(item,index) in databaseInfo.loadbalance" :key="index">
                  <p>{{item}}</p>
                </div>
              </Tooltip>
              <span class="bluetext" style="width:0px;" v-else>{{databaseInfo.loadbalance}}</span>
            </div> -->
            <div>磁盘容量：
              <span class="bluetext">{{databaseInfo.disksize}} G</span>
              <!--        <Tooltip placement="top-start" v-if="databaseInfo.disk">
                        <span class="bluetext one-row-text" style="width:120px;">{{databaseInfo.disk}}</span>
                        <div slot="content" v-for="(item,index) in databaseInfo.disk" :key="index">
                          <p>{{item}}</p>
                        </div>
                      </Tooltip>
                      <span class="bluetext" style="width:0px;" v-else>{{databaseInfo.disk}}</span>-->
            </div>
            <!-- <div>状态：<span class="bluetext">{{databaseInfo.dbStatus ? "开机" : "关机"}}</span></div> -->
          </div>
          <div class="pan" v-if="databaseInfo!=null" style="width: 20%">
            <div>计费类型：{{databaseInfo.caseType == 1 ? '包年' : databaseInfo.caseType == 2 ? '包月' : '实时'}}计费</div>
            <div>创建于：{{databaseInfo.createtime}}</div>
            <div>到期时间：{{databaseInfo.endtime}}</div>
            <div>自动续费：<span class="bluetext">{{databaseInfo.isautorenew ? '开' : '关'}}</span></div>
          </div>
        </div>
        <div class="charts">
          <Tabs type="card" :animated="false">
            <Tab-pane label="监控">
              <div class="body">
                <!--<Button type="primary" @click="setMonitoring">监控告警设置</Button>-->
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
                    <div style="width:1150px;height:300px;position:relative;overflow: hidden;">
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
                    <div style="width:1150px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="memoryPolar"></chart>
                    </div>
                  </div>
                  <div class="item">
                    <label>磁盘空间利用率<span class="timeText">{{ diskTime }}</span></label>
                    <div style="margin-top:10px;">
                      <Radio-group v-model="disk.type" type="button" @on-change="queryData('disk')">
                        <Radio label="今天"></Radio>
                        <Radio label="最近7天"></Radio>
                        <Radio label="最近30天"></Radio>
                      </Radio-group>
                      <Radio-group v-model="disk.showType" type="button" style="float:right"
                                   @on-change="toggle('disk')">
                        <Radio label="折线"></Radio>
                        <Radio label="柱状图"></Radio>
                      </Radio-group>
                    </div>
                    <div style="width:1150px;height:300px;position:relative;overflow: hidden;">
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
                    <div style="width:1150px;height:300px;position:relative;overflow: hidden;">
                      <chart :options="ipPolar"></chart>
                    </div>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <!-- <TabPane label="备份管理" name="name2">
              <div class="body">
                <Button type="primary" @click="delSnapshot" style="margin-bottom:10px">删除快照</Button>
                <Table ref="selection" :columns="snapshotCol" :data="snapshotData"
                       @radio-change="changeSelection"></Table>
              </div>
            </TabPane> -->
            <Tab-pane label="修改密码">
              <div class="body">
                <label>重置密码</label>
                <Form ref="resetPasswordForm" :model="resetPasswordForm" label-position="left" :label-width="100"
                      style="margin-top:20px;"
                      :rules="resetRuleValidate">
                  <Form-item label="请输入旧密码" prop="oldPassword">
                    <Input v-model="resetPasswordForm.oldPassword" placeholder="请输入旧密码" type="password"
                           style="width:250px;"></Input>
                  </Form-item>
                  <Form-item label="请输入新密码" prop="newPassword">
                    <Input v-model="resetPasswordForm.newPassword" placeholder="请输入至少8位包含大小写与数字的密码" type="password" 
                    @on-focus="passwordForm.passwordHint = true" @on-blur="passwordForm.passwordHint = false"
                           style="width:250px;"></Input>
                    <div class="popTip" v-show="passwordForm.passwordHint">
                      <div><i :class="{reach: passwordForm.secondDegree }"></i>
                        <p>不能输入连续6位数字或字母，如123456aA</p></div>
                      <div><i :class="{reach: passwordForm.firstDegree }"></i>
                        <p>长度8~30位，推荐使用12位以上的密码</p></div>
                      <div><i :class="{reach: passwordForm.thirdDegree }"></i>
                        <p>至少包含：小写字母，大写字母，数字</p></div>
                      <div><p style="color:rgba(102,102,102,1);">可用特殊符号：~:，*</p></div>
                    </div>
                  </Form-item>
                  <Form-item label="请确认新密码" prop="confirmPassword">
                    <Input v-model="resetPasswordForm.confirmPassword" placeholder="请确认新密码" type="password"
                            @on-focus="passwordFormTwo.passwordHint = true" @on-blur="passwordFormTwo.passwordHint = false"
                           style="width:250px;"></Input>
                           <!-- <Input v-model="password" placeholder="请输入至少8位包含大小写与数字的密码"
                       style="width: 300px" @on-change="passwordWarning=''"  ></Input> -->
                    <div class="popTip" v-show="passwordFormTwo.passwordHint">
                      <div><i :class="{reach: passwordFormTwo.secondDegree }"></i>
                        <p>不能输入连续6位数字或字母，如123456aA</p></div>
                      <div><i :class="{reach: passwordFormTwo.firstDegree }"></i>
                        <p>长度8~30位，推荐使用12位以上的密码</p></div>
                      <div><i :class="{reach: passwordFormTwo.thirdDegree }"></i>
                        <p>至少包含：小写字母，大写字母，数字</p></div>
                      <div><p style="color:rgba(102,102,102,1);">可用特殊符号：~:，*</p></div>
                    </div>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" size="small" @click="resetConfirm('resetPasswordForm')">
                      {{resetPasswordForm.buttonMessage}}
                    </Button>
                  </Form-item>
                </Form>
              </div>
            </Tab-pane>
            <Tab-pane label="操作日志">
              <div class="body">
                <label style="border-bottom:none">操作日志</label>
                <div>
                  <RadioGroup v-model="log.type" type="button" @on-change="logToggle('log')">
                    <Radio label="近一天"></Radio>
                    <Radio label="近一周"></Radio>
                    <Radio label="近一月"></Radio>
                  </RadioGroup>
                  <div style="float:right">
                    <span
                      style="font-size: 16px;vertical-align: middle;color: rgba(0,0,0,0.65);">开始结束时间&nbsp;&nbsp;</span>
                    <Date-picker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择日期"
                                 style="width: 200px" @on-change="dataChange"></Date-picker>
                    <button @click="search" style="margin-left: 20px;">查询</button>
                  </div>
                </div>
                <div class="log" style="margin-top: 20px">
                  <Table highlight-row :columns="columnslog" :data="tableDatalog"></Table>
                  <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                      <Page :total="total" :current="1" @on-change="currentChange"></Page>
                    </div>
                  </div>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
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
          <Button type="primary" @click="lookPasswordSubm('lookPasswordForm')"
                  :disabled="!(lookPasswordForm.isemailalarmSec || lookPasswordForm.issmsalarmSec)">确定
          </Button>
        </div>
      </Modal>
      <!-- 告警策略配置弹窗 -->
      <Modal width="550" v-model="showModal.setMonitoringForm" :scrollable="true">
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
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.setMonitoringForm=false">取消</Button>
          <Button type="primary" @click="setMonitoringOk">完成</Button>
        </div>
      </Modal>
      <!-- 回滚确认弹窗 -->
      <Modal v-model="showModal.rollback" :scrollable="true" :closable="false" :width="390">
        <p slot="header" class="modal-header-border">
          <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
          <span class="universal-modal-title">主机回滚</span>
        </p>
        <div class="modal-content-s">
          <div>
            <p class="lh24">是否确定回滚主机</p>
            <p class="lh24">提示：您正使用<span class="bluetext">{{snapsName}}</span>回滚<span
              class="bluetext">{{hostName}}</span>至<span
              class="bluetext">{{hostCreatetime}}</span>，当您确认操作之后，此<span class="bluetext">时间点</span>之后的主机内的数据将丢失。</p>
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
      <!-- 修改端口模态框 -->
      <Modal v-model="showModal.portModify" width="550" :scrollable="true">
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">修改端口</span>
        </p>
        <div class="universal-modal-content-flex">
          <Form :model="portModifyForm" :rules="portModifyRuleValidate" ref="portModifyForm">
            <Form-item label="当前端口">
              <Input v-model="portModifyForm.currentPorts" :readonly="true"></Input>
            </Form-item>
            <Form-item label="修改端口" prop="newPorts">
              <Input v-model="portModifyForm.newPorts" :maxlength="8"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.portModify = false">取消</Button>
          <Button type="primary" @click="portModify_ok('portModifyForm')">确认</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from '@/util/axiosInterceptor'
  import defaultOptions from '@/echarts/defaultOptions'
  import histogram from '@/echarts/Histogram'
  import hostDiskOptions from '@/echarts/hostDiskOptions'
  import hostDiskHistogram from '@/echarts/hostDiskHistogram'
  import ipOptions from '@/echarts/ipOptions'
  import ipHistogram from '@/echarts/ipHistogram'
  import regExp from '@/util/regExp'

  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  var defaultOptionstr = JSON.stringify(defaultOptions)
  var histogramstr = JSON.stringify(histogram)
  var hostDiskOptionstr = JSON.stringify(hostDiskOptions)
  var hostDiskHistogramstr = JSON.stringify(hostDiskHistogram)
  export default {
    data() {
      var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,23}$/
      const validateoldPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!regExp.test(value)) {
          callback(new Error('密码由6位及以上23位以下的字母数字组成，必须包含大小写字母、数字'));
        } else {
          callback();
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!(this.passwordForm.firstDegree&&this.passwordForm.secondDegree&&this.passwordForm.thirdDegree)) {
          callback(new Error('你输入的密码不符合格式要求'));
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
        } else if (!(this.passwordFormTwo.firstDegree&&this.passwordFormTwo.secondDegree&&this.passwordFormTwo.thirdDegree)) {
          callback(new Error('你输入的密码不符合格式要求'));
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
      const validateNewport = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入修改后的端口号'))
        } else {
          if (/^[\d]+$/.test(value) && value < 65536 && value > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的端口号'))
          }
        }
      }
      return {
        passwordForm: {
          passwordHint: false,
          //密码强度
          firstDegree: false,
          secondDegree: false,
          thirdDegree: false
        },
        passwordFormTwo: {
          passwordHint: false,
          //密码强度
          firstDegree: false,
          secondDegree: false,
          thirdDegree: false
        },
        portModifyForm: {
          currentPorts: '',
          newPorts: ''
        },
        portModifyRuleValidate: {
          newPorts: [
            {validator: validateNewport, trigger: 'change'}
          ]
        },
        isActive: true,
        countdown: 60,
        codePlaceholder: '发送密码',
        loading: false,
        loadingMessage: '',
        snapsId: '',
        snapsName: '',
        hostName: '',
        hostCreatetime: '',
        cursnapshot: null,
        CPUTime: this.getCurrentDate(),
        diskTime: this.getCurrentDate(),
        memoryTime: this.getCurrentDate(),
        IPTime: this.getCurrentDate(),
        showPassword: false,
        databaseInfo: null,
        reloadhintForm: {
          input: ''
        },
        //系列化对象
        cpuPolar: JSON.parse(defaultOptionstr),
        diskPolar: JSON.parse(defaultOptionstr),
        memoryPolar: JSON.parse(hostDiskOptionstr),
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
                      // color: '#EE4545'
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
              const text = row.createway === 'hand' ? '手动' : row.createway
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
            title: '创建于',
            key: 'addtime'
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            render: (h, params) => {
              if (params.row.status == 2 || params.row.status == 3) {
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
                      this.cursnapshot = params.row
                      this.snapsName = params.row.snapshotname
                      this.hostName = params.row.name
                      this.hostCreatetime = params.row.addtime
                      // console.log(params.row)
                    }
                  }
                }, '回滚')
              }
            }
          }
        ],
        snapshotData: [],
        // 操作日志
        log: {
          type: '近一天'
        },
        logTime: this.getCurrentDate() + ',' + this.getTomorrow(),
        target: 'db',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        columnslog: [
          {
            title: '操作对象',
            key: 'operatetarget',
          },
          {
            title: '操作时间',
            key: 'operatortime',
          },
          {
            title: '操作结果',
            key: 'operatestatus',
            render: (h, params) => {
              return h('span', params.row.operatestatus == 1 ? '成功' : '失败')
            }
          }, {
            title: '行为描述',
            key: 'operatedes',
            ellipsis: true,
          }
        ],
        tableDatalog: [],
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
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          buttonMessage: '确认重置',
        },
        resetRuleValidate: {
          oldPassword: [
            {required: true, validator: validateoldPassword, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
        },
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
            {required: true, validator: validaSinginName, trigger: 'blur'}
          ]
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
          reload: false,
          lookPassword: false,
          portModify: false
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
      if (sessionStorage.getItem('databaseInfo')) {
        this.databaseInfo = JSON.parse(sessionStorage.getItem('databaseInfo'))
      }
      this.queryData('cpu')
      this.queryData('disk')
      this.queryData('memory')
      this.queryData('flow')
      this.search()
    },
    methods: {
      portModify() {
        this.$message.confirm({
          title: '修改端口',
          content: '修改端口会导致数据库重启，请谨慎操作，是否确认修改端口？',
          onOk: () => {
            this.portModifyForm.currentPorts = this.databaseInfo.dbPort
            this.showModal.portModify = true
          }
        })
      },
      portModify_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.portModify = false
            this.$http.get('database/updateDBPort.do', {
              params: {
                DBId: this.databaseInfo.computerid, //(数据库的UUID),
                port: this.portModifyForm.newPorts //(需要更改的端口)
              }
            }).then(res => {
              if (res.status === 200 && res.data.status === 1) {
                this.$Message.success(res.data.message)
                this.databaseInfo.dbPort = this.portModifyForm.newPorts
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      inter() {
        this.intervalSnapsList = setInterval(() => {
          axios.get('Snapshot/listVMSnapshot.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              resourceType: 1,
              resourceId: this.snapsId
            }
          })
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
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.search();
      },
      dataChange(time) {
        this.logTime = time;
      },
      search() {
        // log/queryLog.do    操作日志   pageSize(1页显示多少条),currentPage（第几页）,target（主机则传 host）  , queryTime（查询时间  格式： 开始时间 , 结束时间  非必传）
        this.$http.get('log/queryLog.do', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            target: this.target,
            queryTime: this.logTime,
            targetId: this.databaseInfo.id
          }
        }).then(response => {
          this.total = response.data.total;
          this.tableDatalog = response.data.tableData;
        })
      },
      logToggle(type) {
        switch (this[type].type) {
          case '近一天':
            this.logTime = this.getCurrentDate() + ',' + this.getTomorrow()
            break
          case '近一周':
            this.logTime = this.logNearlySevenDays() + ',' + this.getTomorrow()
            break
          case '近一月':
            this.logTime = this.logNearlyThirtyDays() + ',' + this.getTomorrow()
            break
        }
        this.search()
      },
      lookPassword() {
        if (this.isActive) {
          this.showModal.lookPassword = true
        }
      },
      lookPasswordSubm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.lookPassword = false
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
              VMId: this.databaseInfo.computerid,
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
              }
              this.lookPasswordForm.input = ''
            })
          }
        })
      },
      // 回滚确认弹窗
      rollbackSubmit() {
        this.showModal.rollback = false
        this.loadingMessage = '正在回滚主机'
        this.loading = true
        axios.get('Snapshot/revertToVMSnapshot.do', {
          params: {
            snapshotId: this.cursnapshot.snapshotid,
            zoneId: $store.state.zone.zoneid
          }
        })
          .then(response => {
            if (response.status == 200) {
              this.loading = false
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
        this.reloadButton = '正在重装...'
        this.$http.post('information/restoreVirtualMachine.do', {
          VMId: this.databaseInfo.computerId,
          templateId: this.reloadForm.system,
          adminPassword: this.reloadForm.password
        }).then(response => {
          this.reloadButton = '确认重装'
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
          this.reloadForm.system = ''
          this.reloadForm.password = ''
        })
      },
      // 获取具体主机下的快照列表
      getsnapsList() {
        axios.get('Snapshot/listVMSnapshot.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            resourceType: 1,
            resourceId: this.snapsId
          }
        })
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
        axios.get('Snapshot/deleteVMSnapshot.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            ids: this.snapsSelection.id
          }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.getsnapsList()
            }
          })
      },
      rollback() {
        this.showModal.rollback = false
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
      toggle(type) {
        if (type == 'cpu' || type == 'memory') {
          var polar = this[type].showType == '折线' ? JSON.parse(defaultOptionstr) : JSON.parse(histogramstr)
          polar.xAxis.data = this[type + 'Polar'].xAxis.data
          polar.series[0].data = this[type + 'Polar'].series[0].data
          this[type + 'Polar'] = polar
        } else if (type == 'flow') {
          polar = this[type].showType == '折线' ? ipOptions : ipHistogram
          polar.xAxis.data = this.ipPolar.xAxis.data
          polar.series[0].data = this.ipPolar.series[0].data
          polar.series[1].data = this.ipPolar.series[1].data
          // console.log(polar)
          this.ipPolar = polar
        } else {
          var polar = this[type].showType == '折线' ? JSON.parse(hostDiskOptionstr) : JSON.parse(hostDiskHistogram)
          polar.xAxis.data = this[type + 'Polar'].xAxis.data
          polar.series[0].data = this[type + 'Polar'].series[0].data
          this[type + 'Polar'] = polar
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
        this.$http.get(url, { params: {
          vmname: this.databaseInfo.instancename,
          type: queryType,
          datetype: dateType
        }}).then(response => {
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
      resetConfirm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.resetPasswordForm.buttonMessage = '正在重置中...'
            this.$http.get('database/updateDBPassword.do', {
              params: {
                DBId: this.databaseInfo.computerid,
                password: this.resetPasswordForm.newPassword,
                // oldPassword: this.resetPasswordForm.oldPassword
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.resetPasswordForm.buttonMessage = '确认重置'
              this.resetPasswordForm.oldPassword = ''
              this.resetPasswordForm.newPassword = ''
              this.resetPasswordForm.confirmPassword = ''
            })
          }
        })
      },
      reload() {
        if (this.reloadForm.system == '') {
          this.$Message.info('请选择一个重装模版')
        } else if (this.reloadForm.password == '') {
          this.$Message.info('请输入登录密码')
        } else {
          this.showModal.reload = true
        }
      },
      setMonitoring() {
        this.showModal.setMonitoringForm = true
        this.$http.get('information/alarmConfig.do', {
          params: {
            instancename: this.databaseInfo.instancename
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
        this.isLetter = this.isletter == true ? 1 : 0
        this.isEmailAlarm = this.isemailalarm == true ? 1 : 0
        this.isSmsAlarm = this.issmsalarm == true ? 1 : 0
        this.$http.get('information/upalarmConfig.do', {
          params: {
            instancename: this.databaseInfo.instancename,
            cpuUse: this.setCPU,
            memoryUse: this.setRAM,
            diskUse: this.setDisk,
            networkIn: this.setFluxIn,
            networkOut: this.setFluxOut,
            isLetter: this.isLetter,
            isSmsAlarm: this.isSmsAlarm,
            isEmailAlarm: this.isEmailAlarm
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.showModal.setMonitoringForm = false
          } else {
            this.showModal.setMonitoringForm = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    watch: {
       'resetPasswordForm.newPassword':{
         handler(val) {
           if(val.length >7 && val.length <31){
              this.passwordForm.firstDegree = true
            } else{
              this.passwordForm.firstDegree = false
            }
            let len = val.length
            let reg = /[0-9]/
            let flag = false
            // 当用户输入到第6位时，开始校验是否有6位连续字符
            if(len>5){
              flag = check(len)
              function check(index){
                let count = 0
                for(let i = index- 5; i < index;i++){
                let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt() // 检查字符是数字还是字母
                let current = reg.test(val[i-1]) ? val[i-1] : val[i-1].charCodeAt()
                if(next-current === 1){ // ACSII 码相差1则为连续
                  count +=1
                }
              }
                if(count > 4){ // 有6位连续字符
                  return true
                } else if(count < 5 && index > 6){
                  return check(index - 1) // 递归继续校验
                } else{
                  return false
                }
              }
            }
           if(flag&&len>5){
          this.passwordForm.secondDegree = false
        } else if(!flag && len>5){
          this.passwordForm.secondDegree = true
        }
        if(len === 0) {
           this.passwordForm.secondDegree = false
        }
            if(regExp.hostPassword(val)){
              this.passwordForm.thirdDegree = true
            } else{
              this.passwordForm.thirdDegree = false
            }
          },
          deep: true
        },
        'resetPasswordForm.confirmPassword':{ 
         handler(val) {
           if(val.length >7 && val.length <31){
              this.passwordFormTwo.firstDegree = true
            } else{
              this.passwordFormTwo.firstDegree = false
            }
            let len = val.length
            let reg = /[0-9]/
            let flag = false
            // 当用户输入到第6位时，开始校验是否有6位连续字符
            if(len>5){
              flag = check(len)
              function check(index){
                let count = 0
                for(let i = index- 5; i < index;i++){
                let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt() // 检查字符是数字还是字母
                let current = reg.test(val[i-1]) ? val[i-1] : val[i-1].charCodeAt()
                if(next-current === 1){ // ACSII 码相差1则为连续
                  count +=1
                }
              }
                if(count > 4){ // 有6位连续字符
                  return true
                } else if(count < 5 && index > 6){
                  return check(index - 1) // 递归继续校验
                } else{
                  return false
                }
              }
            }
        if(flag&&len>5){
          this.passwordFormTwo.secondDegree = false
        } else if(!flag && len>5){
          this.passwordFormTwo.secondDegree = true
        }
        if(len === 0) {
           this.passwordFormTwo.secondDegree = false
        }
            if(regExp.hostPassword(val)){
              this.passwordFormTwo.thirdDegree = true
            } else{
              this.passwordFormTwo.thirdDegree = false
            }
          },
          deep: true
        }
    },
    computed: {
      configure() {
        return this.databaseInfo.serviceoffername.replace('Memory', '内存').replace('核', 'CPU').split('+')
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
  #background {
    @diff: 102px;
    min-height: calc(~"100% - @{diff}");
  }

  #wrapper {
    background: #fff;
  }

  // .arrowdown-icon {
  //   position: relative;
  //   display: inline-block;
  //   width: 14px;
  //   height: 14px;
  //   border: solid 1px #fff;
  //   border-radius: 50%;
  //   &:before {
  //     content: '';
  //     position: absolute;
  //     top: 2px;
  //     left: 3px;
  //     display: inline-block;
  //     width: 6px;
  //     height: 6px;
  //     border: solid 1px #fff;
  //     border-top: 0;
  //     border-left: 0;
  //     transform: rotate(45deg);
  //   }
  // }

  .ivu-tabs-bar {
    padding-left: 55px;
  }

  .content {
    min-height: 745px;
    padding: 0px;
    .info {
      height: 237px;
      background-image: linear-gradient(-224deg, #05bcfd 0%, #4183eb 100%);
      padding: 20px 30px 20px 20px;
      position: relative;
      font-family: Microsoft YaHei;
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
          color: #2a99f2;
          border-radius: 5px;
          padding: 5px 15px;
        }
        .btn:hover {
          color: #fff;
          background: #2a99f2;
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
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
        > div {
          line-height: 20px;
          user-select: none;
          i {
            font-style: normal;
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
      }
      > h1 {
        display: block;
        position: absolute;
        top: 86px;
        left: 313px;
        font-size: 63px;
        color: rgba(0, 0, 0, 0.1);
        user-select: none;
      }
    }
    .arrears {
      background-image: linear-gradient(-225deg, #ffc439 0%, #bd7f14 100%);
    }
    .error {
      background-image: linear-gradient(-226deg, #f09292 0%, #c53c3c 100%);
    }
    .close {
      background: #d9d9d9;
    }
    .charts {
      margin-top: -32px;
      padding-left: 20px;
      .body {
        min-height: 400px;
        margin-top: -17px;
        padding-top: 20px;
        padding-right: 20px;
        background-color: white;
        & > label {
          font-family: "\5FAE\8F6F\96C5\9ED1";
          font-size: 16px;
          color: rgba(17, 17, 17, 0.95);
          line-height: 14px;
          display: block;
          padding-bottom: 12px;
          border-bottom: 1px solid #e9e9e9;
        }
        button {
          outline: none;
          padding: 5px 15px;
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 12px;
          color: #ffffff;
          line-height: 22px;
          background: #2a99f2;
          border-radius: 4.46px;
          border: none;
          margin-bottom: 16px;
          //margin:20px 19px;
        }
        .flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-right: 20px;
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
              border-bottom: 1px solid #e9e9e9;
              .timeText {
                font-family: Microsoft YaHei;
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
              content: "";
              width: 8px;
              height: 8px;
              background-color: #3dbd7d;
              display: inline-block;
              border-radius: 5px;
              margin-right: 5px;
            }
            #out-icon::before {
              content: "";
              width: 8px;
              height: 8px;
              background-color: #2a99f2;
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

  .lookPassword .universal-modal-content-flex form .ivu-form-item {
    width: 100%;
  }

  .lookPassword .ivu-input-wrapper {
    width: 45%;
  }
  .popTip {
    width: 350px;
    padding: 19px 21px;
    position: absolute;
    background: #FFF;
    border-radius: 8px;
    box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
    left: 260px;
    bottom: -30px;
    z-index: 3;
    > div {
      display: flex;
      > i {
        display: inline-block;
        border: 1px solid rgba(151, 151, 151, 1);
        margin-right: 3px;
        margin-top: 5px;
        height: 12px;
        width: 12px;
        border-radius: 6px;
        &.reach {
          background: #09BC1D;
          border: 1px solid #09BC1D;
          color: #fff;
          position: relative;
          &:before {
            content: '✓';
            display: inline-block;
            position: absolute;
            top: -11px;
            color: #fff;
          }
        }
      }
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
    }
  }
</style>
