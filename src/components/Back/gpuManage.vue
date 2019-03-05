<template>
    <div id="background">
      <div id="wrapper">
        <Spin fix v-show="loading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>{{loadingMessage}}</div>
        </Spin>
        <p style="margin: 10px 0 10px 0;">总览 / <span>GPU云服务器</span> / <span>管理</span></p>
        <div class="head">
          <div>
            <div style="display: inline-block;">
              <span style="font-size: 18px;color: #FFFFFF;">{{gpuName}}</span>
            </div>
            <div class="button_right">
              <router-link to="GpuList">
                <Button>返回</Button>
              </router-link>
              <Button @click="$router.push({path:'link'})">连接主机</Button>
            </div>
          </div>
          <div style="display: flex;margin-top: 20px;">
            <div class="host_box">
              <i v-if="gpuDetail.cpuNum">{{gpuDetail.cpuNum}}CPU , </i>
              <i v-if="gpuDetail.memory">{{gpuDetail.memory}}G内存 , </i>
              <i v-if="gpuDetail.bandwith">{{gpuDetail.bandwith}}M宽带 </i>
              <i v-if="gpuDetail.zoneName"> | {{gpuDetail.zoneName}}</i>
                <p>镜像系统：{{gpuDetail.template}}</p>
                <p>到期时间/有效期：{{gpuDetail.case_type == 3 ? '无' : gpuDetail.endTime}}</p>
                <p>内网地址：{{gpuDetail.privateIp}}</p>
              <p>登录密码：  <span :class="[isActive ? 'send' : 'nosend']" @click="lookPassword">{{codePlaceholder}}</span></p>
            </div>
            <div class="host_box">
              <p>所属VPC：<span>{{gpuDetail.vpc}}</span></p>
              <p>绑定公网：<span>{{gpuDetail.publicIp}}</span></p>
              <div>所属负载均衡：
                <Tooltip placement="top-start" v-if="gpuDetail.loadbalance.length>0">
                  <span class="bluetext one-row-text" style="width:100px;">{{gpuDetail.loadbalance.join('|')}}</span>
                  <div slot="content" v-for="(item,index) in gpuDetail.loadbalance" :key="index">
                    <p>{{item}}</p>
                  </div>
                </Tooltip>
                <span class="bluetext" style="width:0px;" v-else>{{gpuDetail.loadbalance.join('|')}}</span>
              </div>
              <div>挂载磁盘：
                <Tooltip placement="top-start" v-if="gpuDetail.disk.length>0">
                  <span class="bluetext one-row-text"  style="width:120px;">{{gpuDetail.disk.join('|')}}</span>
                  <div slot="content" v-for="(item,index) in gpuDetail.disk" :key="index">
                    <p>{{item}}</p>
                  </div>
                </Tooltip>
                <span class="bluetext" style="width:0px;" v-else>{{gpuDetail.disk.join('|')}}</span>
              </div>
            </div>
            <div class="host_box">
              <p>计费类型：{{gpuDetail.case_type == 1 ?'包年计费':gpuDetail.case_type == 2 ? '包月计费' : gpuDetail.case_type == 3 ? '实时计费' :''}}</p>
              <p>创建于：{{gpuDetail.createTime}}</p>
              <p>自动续费：<span>{{gpuDetail.isAutoRenw == 1 ? '开' : '关'}}</span></p>
            </div>
          </div>
        </div>
        
        <div class="tabs">
          <Tabs type="card" :animated="false">
            <TabPane style="background: #FFFFFF;" label="监控">
              <!--CPU利用率-->
              <div class="tab_box">
                <!--<Button type="primary" @click="setMonitoring">监控警告设置</Button>-->
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

            </TabPane>
            <!--快照管理-->
            <!--<TabPane label="快照管理">-->
              <!--<div class="tab_box">-->
                <!--<Button type="primary" style="margin-bottom: 10px;" @click="deleteSnapshot">删除快照</Button>-->
                <!--<Table ref="selection" @on-selection-change="selectKuai" :columns="snapshotList" :data="snapshotData"></Table>-->
              <!--</div>-->
            <!--</TabPane>-->
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

      <!-- 回滚确认弹窗 -->
      <!--<Modal v-model="showWindow.rollback" :scrollable="true" :closable="false" :width="390">-->
        <!--<div class="modal-content-s">-->
          <!--<Icon type="android-alert" class="yellow f24 mr10"></Icon>-->
          <!--<div>-->
            <!--<strong>主机回滚</strong>-->
            <!--<p class="lh24">是否确定回滚主机</p>-->
            <!--<p class="lh24">提示：您正使用<span class="bluetext">{{snapsDetails.snapshotname}}</span>回滚<span-->
              <!--class="bluetext">{{snapsDetails.name}}</span>至<span-->
              <!--class="bluetext">{{snapsDetails.addtime}}</span>，当您确认操作之后，此<span class="bluetext">时间点</span>之后的主机内的数据将丢失。</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<p slot="footer" class="modal-footer-s">-->
          <!--<Button @click="showWindow.rollback = false">取消</Button>-->
          <!--<Button type="primary" @click="goBackSnapshot">确定</Button>-->
        <!--</p>-->
      <!--</Modal>-->
    </div>
</template>

<script>
  import axios from 'axios'
  import $store from '@/vuex'
  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  import cpuOptions from "@/echarts/cpuUtilization"
  import momeryOptions from  "@/echarts/memory"
  const momery = JSON.stringify(momeryOptions);
  const cpu = JSON.stringify(cpuOptions);

  export default {
    data(){
      var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,23}$/
      const validateoldPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } /*else if (!regExp.test(value)) {
          callback(new Error('密码由6位以上的字母数字组成，必须包含大小写字母、数字'));
        } */else {
          callback();
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
        //快照
        // snapshotList:[
        //   {
        //     type: 'selection',
        //     width:'70'
        //   },
        //   {
        //     title:'快照名称',
        //     key:'snapshotname',
        //     render:(h,params) =>{
        //       if (params.row.status == 2) {
        //         return h('div', [
        //           h('Spin', {
        //             style: {
        //               display: 'inline-block'
        //             }
        //           }),
        //           h('span',{
        //             style: {
        //               color:'#2A99F2'
        //             }
        //           },'创建中')
        //         ])
        //       } else{
        //         return h('span',{
        //
        //         },params.row.snapshotname)
        //       }
        //     }
        //   },
        //   {
        //     title:'快照策略',
        //     render:(h,params) =>{
        //       return h('span',{},params.row.createway == 'hand' ? '手动' :'')
        //     }
        //   },
        //   {
        //     title:'快照间隔',
        //     render:(h,params) =>{
        //       return h('span',{},params.row.intervals == 'hand' ? '手动' :'')
        //     }
        //   },
        //   {
        //     title:'创建于',
        //     key:'addtime'
        //   },
        //   {
        //     title:'操作',
        //     width:100,
        //     render:(h,params) =>{
        //       if (params.row.status == -1 ) {
        //         return h('span', {
        //           style: {
        //             cursor: 'not-allowed'
        //           },
        //         }, '异常')
        //       } else if(params.row.status == 3){
        //       return h('span',{
        //         style:{
        //           color:'#2A99F2',
        //           cursor:'pointer'
        //         },
        //         on:{
        //           click: () => {
        //             this.showWindow.rollback = true;
        //             this.snapsDetails = params.row;
        //           }
        //         }
        //       },'回滚')
        //     }
        //    }
        //   }
        // ],
        // snapshotData:[],
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

        //修改密码
        resetPasswordForm:{
          oldPassword:'',
          newPassword:'',
          confirmPassword:'',
          buttonMessage:'确认重置'
        },
        resetRuleValidate:{
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


        //Gpu服务器详情
        gpuDetail:{},

        //显示弹窗
        showWindow:{
          //警告设置
          warningSetting:false,
          lookPassword:false,
          rollback:false
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
        countdown:60
      }
    },
    methods:{

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
          }
        })
      },

      //列出快照
      // selectSnapshotList(){
      //   axios.get('Snapshot/listVMSnapshot.do',{
      //     params:{
      //       zoneId:this.$store.state.zone.zoneid,
      //       resourceId:sessionStorage.getItem('uuId')
      //     }
      //   }).then(res => {
      //     if(res.status == 200 && res.data.status == 1){
      //       this.snapshotData = res.data.result;
      //     }
      //   })
      // },
      // selectKuai(val){
      //   for(let i=0;i<val.length;i++){
      //     let idList = new Array();
      //     idList.push(val[i].id);
      //     this.ids = idList.join(',');
      //     console.log(this.ids);
      //   }
      // },

      //删除快照
      // deleteSnapshot(){
      //   if(this.ids == ''){
      //     this.$Message.info('请先选择一个快照');
      //     return;
      //   }
      //   this.$Modal.confirm({
      //     title:'删除快照',
      //     content:'是否删除快照',
      //     onOk:()=>{
      //         axios.get('Snapshot/deleteVMSnapshot.do',{
      //           params:{
      //             zoneId:this.$store.state.zone.zoneid,
      //             ids:this.ids
      //           }
      //         }).then(res => {
      //           if(res.status == 200 && res.data.status == 1){
      //            this.$Message.success('删除快照成功');
      //            this.selectSnapshotList();
      //           }else {
      //             this.$Message.info('删除快照出小差了');
      //           }
      //         })
      //     }
      //   })
      // },

      //回滚快照
      // goBackSnapshot(){
      //   console.log(this.snapsDetails);
      //   return;
      //     this.showWindow.rollback = false
      //     this.loadingMessage = '正在回滚主机'
      //     this.loading = true
      //     axios.get('Snapshot/revertToVMSnapshot.do', {
      //       params: {
      //         snapshotId: this.snapsDetails.snapshotid,
      //         zoneId: this.$store.state.zone.zoneid,
      //       }
      //     })
      //       .then(response => {
      //         if (response.status == 200) {
      //           this.loading = false
      //           this.$Message.success({
      //             content: response.data.message,
      //             duration: 5
      //           })
      //         }
      //       })
      // },

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
              this.resetPasswordForm.buttonMessage = '确认重置'
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
      link(item) {
        sessionStorage.setItem('link-companyid', item.companyid);
        sessionStorage.setItem('link-vmid', item.computerid);
        sessionStorage.setItem('link-zoneid', item.zoneid);
        sessionStorage.setItem('link-phone', this.$store.state.authInfo.phone);
        this.$router.push('link');
      },
    },

    created(){
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
      // this.selectSnapshotList();

    },

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
  .one-row-text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
