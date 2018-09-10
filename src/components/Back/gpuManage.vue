<template>
    <div id="background">
      <div id="wrapper">
        <p style="margin: 10px 0 10px 0;">总览 / <span>GPU云服务器</span> / <span>管理</span></p>
        <div class="head">
          <div>
            <div style="display: inline-block;">
              <span style="font-size: 18px;color: #FFFFFF;">{{gpuDetail.instancename}}</span>
            </div>
            <div class="button_right">
              <router-link to="GpuList">
                <Button>返回</Button>
              </router-link>
              <Button>连接主机</Button>
            </div>
          </div>
          <div style="display: flex;margin-top: 20px;">
            <div class="host_box">
                <p>4CPU，8G内存，gl.xlarge显卡 | 天津1区</p>
                <p>镜像系统：{{gpuDetail.templatename}}</p>
                <p>到期时间/有效期：{{gpuDetail.templatename}}</p>
                <p>内网地址：145.168.35.23</p>
              <p>登录密码：  <span :class="[isActive ? 'send' : 'nosend']" @click="lookPassword">{{codePlaceholder}}</span></p>
            </div>
            <div class="host_box">
              <p>所属VPC：<span>{{gpuDetail.vpcname}}</span></p>
              <p>绑定公网：<span>196.168.33.233</span></p>
              <p>所属负载均衡：<span>基础</span></p>
              <p>挂载磁盘：<span style="color: #2A99F2;">发送密码</span></p>
            </div>
            <div class="host_box">
              <p>计费类型：{{gpuDetail.caseType == 1 ?'包年计费':gpuDetail.caseType == 2 ? '包月计费' : gpuDetail.caseType == 3 ? '实时计费' :''}}</p>
              <p>创建于：{{gpuDetail.createtime}}</p>
              <p>自动续费：<span>开</span></p>
            </div>
          </div>
        </div>
        <div class="tabs">
          <Tabs type="card" :animated="false" >
            <TabPane style="background: #FFFFFF;" label="监控">
              <!--CPU利用率-->
              <div class="tab_box">
                <Button type="primary" @click="showWindow.warningSetting = true">监控警告设置</Button>
                <div class="title-Png">
                  <span>CPU利用率</span>
                  <span style="float: right">2017.11.25</span>
                </div>
                <div style="width: 100%" class="center_chart">
                  <div class="chart" >
                    <ul class="objectList">
                      <li :class="requestIndex == item.label? 'objectItems':'objectItem'" v-for="item in dayList" :key="item.label" @click="requestClick(item.label)">{{item.value}}</li>
                    </ul>
                    <div class="chart-rig">
                       <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;">导出</Button>
                      <ul class="objectList">
                        <li :class="chartTwoIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartTwoClick(index)">{{item.value}}</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <chart :options="cpu"></chart>
                  </div>
                </div>

              <!--内存使用率-->
              <div>
                <div class="title-Png">
                  <span>内存使用率</span>
                  <span style="float: right">2017.11.25</span>
                </div>
                <div style="width: 100%" class="center_chart">
                  <div class="chart" >
                    <ul class="objectList">
                      <li :class="requestIndex == item.label? 'objectItems':'objectItem'" v-for="item in dayList" :key="item.label" @click="requestClick(item.label)">{{item.value}}</li>
                    </ul>
                    <div class="chart-rig">
                      <Button type="primary" size="small" style="margin-right:30px;margin-top:-3px;padding:5px 15px;">导出</Button>
                      <ul class="objectList">
                        <li :class="chartTwoIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in chartList" :key="index" @click="chartTwoClick(index)">{{item.value}}</li>
                      </ul>
                    </div>
                  </div>
                  <div style="width: 99%">
                    <chart :options="cpu"></chart>
                  </div>
                </div>
              </div>
              </div>

            </TabPane>
            <!--快照管理-->
            <TabPane label="快照管理">
              <div class="tab_box">
                <Button type="primary">删除快照</Button>
                <Table ref="selection" :columns="snapshotList" :data="snapshotData"></Table>
              </div>
            </TabPane>
            <!--操作日志-->
            <TabPane label="操作日志">
              <div class="tab_box">
                <p style="margin-bottom: 10px">操作日志</p>
                <div style="display: inline-block">
                  <ul class="objectList">
                    <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dateList" :key="index" @click="dayClick(index)">{{item.value}}</li>
                  </ul>
                </div>
                <div style="display: inline-block;float: right">
                  <span>开始结束时间</span>
                  <DatePicker type="date" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                  <Button type="primary" size="small">查询</Button>
                </div>
                <Table :columns="journalList" :data="journalData" style="margin-top: 10px;"></Table>
              </div>
            </TabPane>
            <!--修改密码-->
            <TabPane label="修改密码">
              <div class="tab_box">
                <label>重置密码</label>
                <Form ref="resetPasswordForm" :model="resetPasswordForm" label-position="left" :label-width="100"
                      style="margin-top:20px;"
                      :rules="resetRuleValidate">
                  <Form-item label="请输入旧密码" prop="oldPassword">
                    <Input v-model="resetPasswordForm.oldPassword" placeholder="请输入旧密码" type="password"
                           style="width:250px;"></Input>
                  </Form-item>
                  <Form-item label="请输入新密码" prop="newPassword">
                    <Input v-model="resetPasswordForm.newPassword" placeholder="请输入不小于六位数的新密码" type="password"
                           style="width:250px;"></Input>
                  </Form-item>
                  <Form-item label="请确认新密码" prop="confirmPassword">
                    <Input v-model="resetPasswordForm.confirmPassword" placeholder="请确认新密码" type="password"
                           style="width:250px;"></Input>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" size="small" @click="resetConfirm('resetPasswordForm')">
                      {{resetPasswordForm.buttonMessage}}
                    </Button>
                  </Form-item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
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
          <Button type="ghost" @click="showModal.setMonitoringForm=false">取消</Button>
          <Button type="primary" >完成</Button>
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
    </div>
</template>

<script>
  import axios from 'axios'
  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  import cpuOptions from "@/echarts/cpuUtilization"
  const cpu = JSON.stringify(cpuOptions);
  export default {
    data(){
      return{
        indexs:0,
        cpu:JSON.parse(cpu),

        //cpu统计图
        dayList:[
          {
            value:'今天',
            data:[20,30,40,50,60],
            day:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
            label:0
          },
          {
            value:'最近七天',
            data:[20,30,40,50,60,22,100],
            day:['02/18','02/18','02/18','02/18','02/18','02/18','02/18'],
            label:2
          },
          {
            value:'最近三十天',
            data:[20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,20,30,40,50,60,100,33,28,90,55],
            day:['04/01','04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15','04/16','04/17','04/18','04/19','04/20','04/21','04/22','04/23','04/24','04/25','04/26','04/27','04/28','04/29','04/30'],
            label:3
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
        requestIndex:0,
        chartTwoIndex:0,

        //快照
        snapshotList:[
          {
            type: 'selection',
            width:'70'
          },
          {
            title:'快照名称',
            key:'snapshotname'
          },
          {
            title:'快照策略',
            render:(h,params) =>{
              return h('span',{},params.row.createway == 'hand' ? '手动' :'')
            }
          },
          {
            title:'快照间隔',
            render:(h,params) =>{
              return h('span',{},params.row.intervals == 'hand' ? '手动' :'')
            }
          },
          {
            title:'创建于',
            key:'addtime'
          },
          {
            title:'操作',
            width:100,
            render:(h,params) =>{
              return h('span',{},'回滚')
            }
          }
        ],
        snapshotData:[],
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
            title:'操作对象'
          },
          {
            title:'操作时间'
          },
          {
            title:'操作结果'
          },
          {
            title:'行为描述'
          }
        ],
        journalData:[],

        //修改密码
        resetPasswordForm:{
          oldPassword:'',
          newPassword:'',
          confirmPassword:'',
          buttonMessage:'确认重置'
        },
        resetRuleValidate:{},

        //发送密码
        isActive:true,
        codePlaceholder:'发送密码',
        lookPasswordForm:{
          input:'',
          isemailalarmSec:'',
          issmsalarmSec:'',
        },
        lookPasswordFormRule:{},


        //Gpu服务器详情
        gpuDetail:{},

        //显示弹窗
        showWindow:{
          //警告设置
          warningSetting:false,
          lookPassword:false
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
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        axios.get('information/zone.do',{
          params:{
            gpuServer:'1'
          }
        }).then(res => {
          vm.$store.state.zone.zoneId = res.data.result[0].zoneid;
          vm.$store.state.zone.zonename = res.data.result[0].zonename;
        })
      })
    },
    methods:{

      //获取GPU服务器详情
      getGpuHostDetail(){
        axios.get('gpuserver/listGpuServerById.do',{
          params:{
            GpuId:sessionStorage.getItem('uuId'),
            zoneId:this.$store.state.zone.zoneId,
            changeCost:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.gpuDetail = res.data.result[0];
          }
        })
      },

      //列出快照
      selectSnapshotList(){
        axios.get('Snapshot/listVMSnapshot.do',{
          params:{
            zoneId:this.$store.state.zone.zoneId,
            resourceId:sessionStorage.getItem('uuId')
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.snapshotData = res.data.result;
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
              VMId: sessionStorage.getItem('gpuId'),
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
    },
    created(){
      this.getGpuHostDetail();
      this.selectSnapshotList();
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .head{
  background:linear-gradient(left,#1EBAFC,#3B84EB);
    height: 237px;
    padding: 20px;
  }
  .tabs{
    padding: 0 0 20px 20px;
    margin-top: -32px;
  }
  .button_right{
    float: right;
    color: #2A99F2;
  }
  .host_box{
    background: #FFFFFF;
    padding:10px 92px 10px 24px;
    font-family: .AppleSystemUIFont;
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
    font-family: .AppleSystemUIFont;
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
</style>
