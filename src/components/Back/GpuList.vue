<template>
    <div id="background">
      <div id="wrapper">
          <span class="title">云服务器 /
            <span>GPU云服务器</span>
          </span>
          <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
            <router-link to="/userCenter">立即认证</router-link>
          </Alert>
        <div id="content">
            <div id="header">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fuzaijunheng2"></use>
              </svg>
              <span id="title">GPU云服务器</span>
              <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
            </div>
          <div class="text-box">
          <p>基于GPU应用的计算服务，具有实时的并行计算和浮点计算能力，适用于3D图形应用、深度学习、科学计算等</p>
          </div>
          <div style="margin:16px 0 16px 0;">
            <Button type="primary"  @click="$router.push({path:'/buy/gpu/'})">+  创建</Button>
              <Poptip
                confirm
                width="230"
                placement="right"
                @on-ok="hostShutdown(1)"
                title="您确认关闭选中的主机吗？" style="margin: 0 0 0 10px">
                <Button type="primary" :disabled='disabledList.closeDisbled' style="margin:0 10px;">关机</Button>
              </Poptip>
            <Button type="primary" :disabled='disabledList.openDisbled' @click="openHost">开机</Button>
            <Poptip
              confirm
              width="230"
              placement="right"
              @on-ok="reStartGPU"
              title="您确认重启选中的主机吗？" style="margin: 0 10px">
              <Button type="primary" :disabled="disabledList.closeDisbled">重启</Button>
            </Poptip>
             <Poptip
              confirm
              width="230"
              placement="right"
              @on-ok="deleteHost"
              title="您确认删除选中的主机吗？">
              <Button type="primary" :disabled="disabledList.deleteDisbled">删除</Button>
            </Poptip>
            <Button type="primary" :disabled='disabledList.deleteDisbled' style="margin:0 10px;" @click="deleteHost">删除</Button>
            <Dropdown>
              <Button type="primary" style="margin:0 10px;" @click="hideEvent">更多操作
                 <Icon type="arrow-down-b"></Icon>
              </Button>
             
              <DropdownMenu slot="list">
                  <DropdownItem name="resetPassword" :disabled="resetPasswordDisabled">重置密码</DropdownItem>
                  <DropdownItem name="bindingIP" :disabled="bindingIPDisabled">绑定IP</DropdownItem>
                  <Dropdown-item name="unbindIP" :disabled="unbindIPDisabled">解绑公网IP</Dropdown-item>
                  <DropdownItem name="rename" :disabled="renameDisabled">重命名</DropdownItem>
                  <DropdownItem name="ratesChange" :disabled="ratesChangeDisabled">
                    <Tooltip content="资费变更只适用于实时计费的资源" placement="top">资费变更
                    </Tooltip>
                  </DropdownItem>
                  <DropdownItem name="renewal" :disabled="hostRenewDisabled">主机续费</DropdownItem>
                  <DropdownItem name="mirror" :disabled="makeMirrorDisabled">
                    <Tooltip content="制作镜像只适用于已关机的资源" placement="top">制作镜像
                    </Tooltip>
                  </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
           <div class="selectMark">
            <img src="../../assets/img/host/h-icon10.png"/>
            <span>共 {{ total}} 项 | 已选择 <span style="color:#FF624B;">{{ selectLength.length }} </span>项</span>
          </div>
          <Table :columns="hostList" :data="hostData"  @on-selection-change="selectIndex"></Table>
        </div>
      </div>

      <div :class="[isSource== false?'right-surface-hidde':'right-surface']">
        <div class="tab_box">
          <div class="tab-top">
            <span>{{monitorName}} GPU服务器监控图表</span>
            <div @click="isSource = false">
              <Icon type="close" style="font-size: 18px;cursor: pointer"></Icon>
            </div>
          </div>
          <div class="surface-boder">
            <div class="title-Png">
                <span>CPU利用率</span>
                <span style="float: right">{{CPUTime}}</span>
            </div>
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
                <chart ref="cpu" :options="cpu" style="width: 100%;height: 80%;user-select: none; position: relative; background: transparent;"></chart>
          </div>

          <div class="surface-boder">
                <div class="title-Png">
                  <span>内存使用率</span>
                  <span style="float: right">{{momeryTime}}</span>
                </div>
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
                  <chart ref="momery" style="width: 100%;height: 80%;user-select: none; position: relative; background: transparent;" :options="momery"></chart>
          </div>

        </div>
      </div>



      <!--绑定IP-->
      <Modal title="绑定IP"  :mask-closable="false" v-model="showModal.ipShow">
        <Form ref="ipValidate" :model="ipValidate" :rules="ipRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="ip">
            <Select v-model="ipValidate.ip" placeholder="请选择IP" style="width: 200px">
              <Option v-for="item in ipValidate.ipList" :value="item.publicipid" :key="item.publicipid">{{item.publicip}}</Option>
            </Select>
            <span style="color: #2A99F2;cursor: pointer;" @click="$router.push('/buy/elasticip/')">购买弹性IP</span>
          </FormItem>
        </Form>
        <br>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.ipShow=false">取消</Button>
          <Button type="primary" @click="bindipSubmit">确定</Button>
        </div>
      </Modal>


      <!--制作镜像-->
      <Modal title="制作镜像" width="550" :mask-closable="false" v-model="showModal.mirror">
        <hr size="1" color="#999999">
        <br>
        <Form ref="mirrorValidate" :model="mirrorValidate" :rules="mirrorRuleValidate" label-position="top" inline>
          <FormItem label="镜像名称" prop="name">
            <Input v-model="mirrorValidate.name" placeholder="小于20位数字或字母" style="width: 200px;"></Input>
          </FormItem>
          <FormItem label="描述" prop="descript" style="margin-left: 15px;">
            <Input type="textarea" :rows="2" placeholder="小于20个字(选填)" v-model="mirrorValidate.descript" style="width: 200px;"></Input>
          </FormItem>
        </Form>
        <br>
        <hr size="1" color="#999999">
        <br>
        <div slot="footer">
          <Button type="ghost" @click="showModal.mirror = false">取消</Button>
          <Button type="primary" @click="createMrrior">确定</Button>
        </div>
      </Modal>

      <!--主机续费-->
      <Modal title="主机续费" width="550" :mask-closable="false" v-model="showModal.renew" >
        <Form ref="renewValidate" :model="renewValidate" :rules="renewRuleValidate" label-position="top" inline>
          <FormItem label="付费类型" prop="name">
            <Select v-model="timeType" placeholder="请选择付费类型" style="width: 200px" @on-change="renewChange">
              <Option v-for="item in renewValidate.time" :value="item.value" :key="item.value">{{item.timeType}}</Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长" prop="name">
            <Select v-model="timeValue" placeholder="请选择付费时长" style="width: 200px" @on-change="getGpuMonery">
              <Option v-for="item in timeValueList" :value="item.label" :key="item.label">{{item.value}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
        <br>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.renew=false">取消</Button>
          <Button type="primary" @click="setGPuMoney">确定</Button>
        </div>
      </Modal>

      <!--公网IP没购买弹窗-->
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

      <!-- 资费变更弹出框 -->
    <Modal v-model="showModal.ratesChange" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">变更资费选择（资费变更适用于按需收费转包月/年）</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="变更类型 :">
            <Select v-model="ratesChangeType" @on-change='ratesChangeTimes'>
              <Option v-for="item in renewValidate.time" :value="item.value" :key="item.value">{{item.timeType}}</Option>
            </Select>
          </FormItem>
          <FormItem label="变更时长 :">
            <Select v-model="ratesChangeTime">
              <Option v-for="item in timeValueList" :value="item.label" :key="item.label">{{ item.value }}
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

     <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择认证方式
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

    <!-- 批量重置密码 -->
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
        <ul class="resetModal-table data" v-for="(item,index) in resetPasswordHostData" :key="index"> 
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
  import axios from 'axios'
  import $store from '@/vuex'
  import merge from 'merge'
  import cpuOptions from "@/echarts/cpuUtilization"
  import momeryOptions from  "@/echarts/memory"
   var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,23}$/;
  var urlList = {
    dayURL: 'alarm/getVmAlarmByHour.do',
    otherURL: 'alarm/getVmAlarmByDay.do'
  }
  const momery = JSON.stringify(momeryOptions);
  const cpu = JSON.stringify(cpuOptions);

  const snoapshotName = (rule,value,callback)=>{
    let reg = /^[0-9]{2,4094}$/
    if(value == ''){
      return callback(new Error('请输入快照名称'));
    }else if(!reg.test(value)){
      return callback(new Error('快照名称格式不正确'));
    }else{
      callback();
    }
  }
  const mirrorName = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]{1,20}$/;
    if(value == ''){
      return callback(new Error('请输入镜像名称'));
    }else if(!reg.test(value)){
      return callback(new Error('镜像名称格式不正确'));
    }else {
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
  const validateoldPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } /*else if (!regExp.test(value)) {
          callback(new Error('密码由6位以上的字母数字组成，必须包含大小写字母、数字'));
        } */else {
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

    export default{
      data(){
        return{
          isSource:false,
          cpu:JSON.parse(cpu),
          momery:JSON.parse(momery),
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
          //GPU的数据库ID
          VMId:'',
          //GPU的computerid
          uuId:'',
          //主机名称
          companyname:'',

          resetPasswordHostData:[],
          resetPasswordForm:{
            password: '',
            passwordAffirm: '',
            agreeRule: false,
            hintGrade: 0,
            errorMsg: 'passwordHint'
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
          //筛选主机
          gpuTimeValue:'',
          gpuTimeList:[
            {
              value:'',
              label:'请选择'
            },
            {
              value:'1',
              label:'包年'
            },
            {
              value:'2',
              label:'包月'
            },
            {
              value:'3',
              label:'实时'
            }
          ],
          gpuStatus:'',
          gpuStatusList:[
            {
              value:'',
              label:'请选择'
            },
            {
              value:'0',
              label:'关机'
            },
            {
              value:'1',
              label:'开机'
            }
          ],

          //续费原价
          originCost:'--',
          //现价
          cost:'--',

          //是否显示弹出框
          showModal:{
            ipShow:false,
            // snapshot:false,
            mirror:false,
            renew:false,
            publicIPHint:false,
            ratesChange:false,
            selectAuthType:false,
            resetPassword:false
          },
          //弹性ip
          ipValidate:{
            ip:'',
            ipList:[]
          },
          ipRuleValidate:{
            ip:[
              {required:true,message:'请选择IP',trigger:'change'}
            ]
          },
          vpcId:'',

          //制作快照
          snapshotValidate:{
            name:'',
            memory:'1'
          },
          snapshotRuleValidate:{
            name:[
              {required:true,validator:snoapshotName,trigger:'blur'}
            ]
          },

          //制作镜像
          mirrorValidate:{
            name:'',
            descript:'',
            rootdiskid:''
          },
          mirrorRuleValidate:{
            name:[
              {required:true,validator:mirrorName,trigger:'blur'}
            ]
          },

          //主机续费
          renewValidate:{
            time:[
              {
                value:'year',
                timeType:'包年',
                date:[
                  {
                    value:'1年',
                    label:'1'
                  },
                  {
                    value:'2年',
                    label:'2'
                  },
                  {
                    value:'3年',
                    label:'3'
                  },
                ]
              },
              {
                value:'month',
                timeType:'包月',
                date:[
                  {
                    value:'1月',
                    label:'1'
                  },
                  {
                    value:'2月',
                    label:'2'
                  },
                  {
                    value:'3月',
                    label:'3'
                  },
                  {
                    value:'4月',
                    label:'4'
                  },
                  {
                    value:'5月',
                    label:'5'
                  },
                  {
                    value:'6月',
                    label:'6'
                  },
                  {
                    value:'7月',
                    label:'7'
                  },
                  {
                    value:'8月',
                    label:'8'
                  },
                  {
                    value:'9月',
                    label:'8'
                  },
                  {
                    value:'10月',
                    label:'10'
                  },
                ]
              }
            ],
          },
          renewRuleValidate:{},
          timeType:'',
          timeValue:'',
          timeValueList:[],

          //资费变更
          ratesChangeType:'',
          ratesChangeTime:'',
          ratesChangeCost:'--',
          originRatesChangeCost:'--',
          relevanceDisks:false,
          relevanceIps: false,
          relevanceAlteration:[],
          monitorName:'',
          //table
          hostList:[
            {
              type: 'selection',
              width: 55,
              align: 'center'
            },
            {
              // width:109,
               renderHeader: (h, params) => {
                return h('ul', {}, [
                  h('li', {}, '用户名称 / '),
                  h('li', {}, '唯一名称')
                ])
              },
              render:(h,params)=> {
                if (params.row.status == 1){
                  return h('ul',[
                    h('li',{
                      style:{
                        color:'#2A99F2',
                        cursor:'pointer',
                        width:'100px'
                      },
                      domProps:{
                        title:params.row.companyname+'/'+params.row.computername
                      },
                      on: {
                        click: () => {
                          if (params.row.status != -1) {
                            this.$router.push({path: 'gpuManageNew'});
                            this.$store.commit('setZone',params.row);
                            sessionStorage.setItem('uuId', params.row.computerid);
                            sessionStorage.setItem('gpuId',params.row.id);
                            sessionStorage.setItem('gpu_name',params.row.computername);
                            sessionStorage.setItem('instancename',params.row.instancename)
                          }
                        }
                      }
                    },params.row.companyname ? params.row.companyname : '----'+'/'),
                    h('li',{
                      style:{
                        color:'#2A99F2',
                        cursor:'pointer',
                        width:'100px'
                      },
                      on: {
                        click: () => {
                          if (params.row.status != -1) {
                            this.$router.push({path: 'gpuManageNew'});
                            this.$store.commit('setZone',params.row);
                            sessionStorage.setItem('uuId', params.row.computerid);
                            sessionStorage.setItem('gpuId',params.row.id);
                            sessionStorage.setItem('gpu_name',params.row.computername);
                            sessionStorage.setItem('instancename',params.row.instancename)
                          }
                        }
                      }
                    },params.row.computername ? params.row.computername : '----')])
                    }else{
                      return h('ul', {}, [
                        h('li', {}, params.row.companyname ? params.row.companyname+ ' / ' : '----' + ' / '),
                        h('li', {},params.row.computername ? params.row.computername : '----')
                      ])
                    }
                }
            },
            {
              title:'状态/监控(全部)',
              // width:138,
              render:(h,params) => {
              let restart = params.row.restart ? params.row.restart : 0;
              let restore = params.row.restore ? params.row.restore : 0;
              let bindip = params.row.bindip ? params.row.bindip : 0;
              let icon_1 = require('../../assets/img/host/h-icon1.png');
              let icon_2 = require('../../assets/img/host/h-icon2.png');
              let icon_3 = require('../../assets/img/host/h-icon3.png');
              let icon_4 = require('../../assets/img/host/h-icon4.png');
              let styleInfo = {
                marginLeft: '5px',
                lineHeight: '16px'
              }
              switch (params.row.status){
                case -2:
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', {style: styleInfo}, '销毁中')])
                  break;
                case -1:
                  return h('div',{
                    style: {
                      display: 'flex'
                    }
                  },[h('img',{
                      attrs: {
                        src: icon_2
                      }
                    }, ''),
                    h('span', {
                      style: styleInfo
                    }, '异常')
                  ]);
                break;
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
                  ]);
                break;
                case 1:
                  if (params.row.computerstate == 1) {
                    return h('div',{
                      style:{
                        display:'flex',
                        cursor:'pointer'
                      },
                      on:{
                        click:()=>{
                          this.isSource = !this.isSource;
                          this.monitorName = params.row.computername;
                          if(this.isSource != false){
                            sessionStorage.setItem('instancename',params.row.instancename);
                            this.showGetChart();
                          }
                        }
                      }
                    },[h('img',{
                      attrs:{
                        src:icon_1
                      }
                    },''),h('span',{
                      style:styleInfo
                    },'开启')
                    ]);
                  }else{
                    return h('div',{
                      style:{
                        display:'flex',
                        cursor:'pointer'
                      },
                      on:{
                        click:()=>{
                          this.isSource = !this.isSource;
                          this.monitorName = params.row.computername;
                           if(this.isSource != false){
                            sessionStorage.setItem('instancename',params.row.instancename);
                            this.showGetChart();
                          }
                        }
                      }
                      },[h('img',{
                        attrs:{
                          src:icon_4
                        }
                      },''),h('span',{
                          style:styleInfo
                      },'关机')
                      ]);
                  }
                break;
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
              },
               filters: [
                {
                  label: '开机',
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
              filterMethod (value, row) {
                if (value === 1) {
                  return row.status === 1 && row.computerstate == 1;
                } else if (value === 2) {
                  return row.status === 1 &&row.computerstate== 0;
                }else if(value === 3){
                  return row.status === 0
                }else if(value === 4){
                  return row.status === -1
                }
              }
            },
            {
              title:'主机配置',
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
              title:'镜像系统',
              render:(h,params) => {
                let templateName = params.row.templatename.substr(0, 1).toUpperCase(); // 用第一个字符判断镜像选用图标
                let icon_1 = require('../../assets/img/host/h-icon12.png')
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
              title:'IP地址',
              render:(h,params)=>{
                return h('div',[
                  h('p',{},params.row.publicip ?params.row.publicip+'(公)':'----'),
                  h('p',{},params.row.publicip ?params.row.publicip+'(内)':'----')
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
            width:160,
              render:(h,params)=>{
                return h('div',[
                  h('p',{style:{marginBottom:'5px'}},params.row.createtime+'/'),
                  h('p',{},params.row.caseType == 3 ? '无' : params.row.endtime)])
              }
            },
            {
              title:'计费类型(全部)',
              width:138,
              render:(h,params) =>{
                return h('span',{},params.row.caseType == 1 ?'包年':params.row.caseType == 2 ? '包月' : params.row.caseType == 3 ? '实时' :'7天')
              },
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
              filterMethod (value, row) {
                if (value === 1) {
                  return row.caseType === 1;
                } else if (value === 2) {
                  return row.caseType === 2;
                }else if(value === 3){
                  return row.caseType === 3
                }else if(value === 4){
                  return row.caseType === 4
                }
              }
            },
            {
              title:'操作',
              width:100,
              render:(h,params)=>{
                if( this.$store.state.authInfo ==null){
                  return h('div',
                    {
                      style:{padding:'8px 0',display:'inline-block'}
                    },[
                    h('p',{style:{color:'#B2B2B2'}},'连接'),
                    h('p',{style:{margin:'5px 0',color:'#B2B2B2'}},'管理'),
                    h('p',{style:{color:'#B2B2B2'}},'更多操作')
                  ])
                }else {
                switch (params.row.status) {
                  case -1:
                    return h('div', {}, [h('span', {
                      style: {
                        cursor: 'pointer',
                        color: '#2A99F2',
                        marginRight: '10px',
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
                          this.deleteHost(params.row)
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
                      },
                      on: {
                        click: () => {
                          this.showModal.renew = true;
                        }
                      }
                    }, '续费'), h('span', {
                      style: {
                        cursor: 'pointer',
                        color: '#2A99F2'
                      },
                      on: {
                        click: () => {
                          this.deleteHost(params.row)
                        }
                      }
                    }, '删除')])
                    break  
                   case 1: 
                   return h('div',
                  {
                    style:{color:'#2A99F2',padding:'8px 0',display:'inline-block'}
                  },[
                  h('p',{style:{cursor:'pointer'},on:{click:()=>{ if(params.row.status == 2 || params.row.status == 3){
                        this.$Message.info('请等待主机完成当前操作');
                      }else {this.link(params.row)}}}},'远程链接'),
                  h('p',{style:{cursor:'pointer',margin:'5px 0'},
                    on:{
                    click:()=> {
                        this.uuId = params.row.computerid;
                        let msg = params.row.computerstate == '0' ?'确定要开机吗':'确定要关机吗'
                        this.$Modal.confirm({
                          title:'提示',
                          content:msg,
                          onOk:()=>{
                              if(params.row.status == 2){
                                  this.$Message.info('请等待主机创建完成');
                              }else if(params.row.status == 3){
                                  this.$Message.info('主机正在删除中');
                              }else {
                              if(params.row.computerstate == '0'){
                                 this.openHost(params.row._index);
                              }else if(params.row.computerstate == '1'){
                                this.stopHost(params.row._index);
                              }
                            }
                          }
                      })
                    }
                    }
                  },params.row.computerstate == '0' && params.row.status == '1'?'开机':'关机'),
                    h('Dropdown', {
                      props: {
                        trigger: 'click'
                      }
                    }, [h('a', {
                      attrs: {
                        href: 'javascript:void(0)'
                      }
                    }, '更多操作'), h('DropdownMenu', {
                      slot: 'list'
                    }, [h('DropdownItem', {
                      nativeOn: {
                        click: () => {
                          if(params.row.publicip != '' && params.row.publicip != undefined){
                            this.$Message.info('该主机已绑定IP');
                          }else {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.uuId = params.row.computerid;
                              this.vpcId = params.row.vpcid;
                              this.bindIp();
                            }
                          }
                        }
                      }
                    }, '绑定IP'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.companyname = params.row.companyname;
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.$Modal.confirm({
                                title:'解绑IP',
                                content:'是否解绑该GPU的IP?',
                                onOk:()=>{
                                  this.unbind(params.row.publicip,params.row.computerid);
                                }
                              })
                              this.uuId = params.row.computerid;
                            }
                          }
                        }
                      }, '解绑IP'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.computerstate == '0' && params.row.status=='1'){
                              this.uuId = params.row.computerid;
                              if(params.row.status == 2 || params.row.status ==3){
                                this.$Message.info('请等待主机完成当前操作');
                              }else {
                                this.showModal.mirror  = true;
                                this.mirrorValidate.rootdiskid = params.row.rootdiskid;
                              }
                            }else{
                             this.$Message.info('制作镜像前请先关闭主机');
                            }
                          }
                        }
                      }, '制作镜像'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.uuId = params.row.computerid;
                            this.$Modal.confirm({
                              title:'提示',
                              content:'确定要重启主机吗',
                              onOk:()=>{
                                this.reStartGPU();
                              }
                            })
                          }
                        }
                      }, '重启主机'),
                         h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              if(params.row.caseType != 3){
                                this.$Message.info('请选择实时计费的云主机进行资费变更');
                                return
                              }
                              this.VMId = params.row.id;
                              this.uuId = params.row.computerid;
                              this.ratesChange();
                              this.showModal.ratesChange = true;
                            }
                          }
                        }
                      }, '资费变更'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              if(params.row.caseType == 3){
                                this.$Message.info('请选择包年包月主机续费');
                                return
                              }
                              this.VMId = params.row.id;
                              this.showModal.renew = true;
                            }
                          }
                        }
                      }, '主机续费'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                           if(params.row.status == 2 || params.row.status == 3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.deleteList = params.row;
                              this.deleteHost();
                            }
                          }
                        }
                      }, '删除'),])
                    ])
                ])
                break
                }
              }
              }
            }
          ],
          hostData:[],
          zoneId:'',
          intervalInstance: null,
          disabledList:{
            openDisbled:true,
            closeDisbled:true,
            deleteDisbled:true,
          },
          selectLength:[],
          total:0,
          deleteId:0,
          deleteList:''
        }
      },
      beforeRouteLeave(to, from , next){
        clearInterval(this.intervalInstance);
        next();
      },
      methods:{
        toggleZone(zoneId) {
          // 切换gpu第一个区为默认区
          axios.get('user/setDefaultZone.do', {params: {zoneId: zoneId}}).then(response => {
          })
          for (var zone of this.$store.state.zoneList) {
            if (zone.zoneid == zoneId) {
              $store.commit('setZone', zone);
            }
          }
        },
        // 获取GPU主机
       getGpuServerList(){
         axios.get('gpuserver/listGpuServer.do',{
            params:{
              num:'',
              vpcId:'',
              zoneId:this.$store.state.zone.zoneid,
              status:this.gpuStatus,
              timeType:this.gpuTimeValue
            }
          }).then(res => {
            if(res.status === 200 && res.data.status === 1){
              var list = [];
              if(Object.keys(res.data.result).length != 0){
                for(let index in res.data.result){
                    for (let i = 0; i < res.data.result[index].list.length; i++) {
                      list.push(res.data.result[index].list[i]);
                    }
                  this.hostData = list;
                }
                this.total = list.length;
              }else{
                this.hostData = [];
              }
            }
          })
       },

        //获取绑定IP
        bindIp(){
         axios.get('network/listPublicIp.do',{
           params: {
             useType: 0,
             zoneId: this.$store.state.zone.zoneid,
             vpcId: this.vpcId
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.ipValidate.ipList = res.data.result;
             if (this.publicIPList == '') {
               this.showModal.publicIPHint = true;
             } else {
               this.showModal.ipShow = true;
             }
           }else{
             this.$Message.info(res.data.message);
           }
         })
        },

        //绑定IP
        bindipSubmit() {
          this.$refs.ipValidate.validate((valid) => {
              if (valid) {
                this.showModal.publicIPHint = false;
                this.showModal.ipShow = false;
                this.$Message.info({
                  content: `<span style="color:#2A99F2">${this.companyname}</span>GPU云服务器,正在绑定公网IP`
                })
                this.$http.get('network/enableStaticNat.do', {
                  params: {
                    ipId: this.ipValidate.ip,
                    VMId:this.uuId
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
            }
          )
        },

        //解绑IP
        unbind(publicip,computerid) {
         if(publicip != ''){
           this.$Message.info({
             content: `<span style="color:#2A99F2">${this.companyname}</span>GPU云服务器,正在解绑公网IP`
           })
         }
            this.$http.get('network/disableStaticNat.do', {
              params: {
                ipId:publicip,
                VMId:computerid
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1
              ) {
                this.$Message.success(response.data.message)
              }
              else if (response.status == 200 && response.data.status == 2) {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
        },

        //主机开机
       openHost(){
         if(this.selectLength.length == 0){
            this.$Message.info({
              content:'请选择一个主机',
              duration:5
            });
            return;
          }
         this.$http.get('gpuserver/startGPU.do',{
           params:{
             gpuId :this.uuId,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
             this.getGpuServerList();
           }else{
             this.$Message.info(res.data.message);
           }
         })
        },

      //主机关机
       stopHost(){
         if(this.selectLength.length == 0){
            this.$Message.info({
              content:'请选择一个主机',
              duration:5
            });
            return;
          }
         this.$http.get('gpuserver/stopGPU.do',{
           params:{
             gpuId :this.uuId,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.$Message.success(res.data.message);
             this.getGpuServerList();
           }else {
             this.$Message.info(res.data.message);
             this.getGpuServerList();
           }
         })
        },

      //删除主机
       deleteHost(){
          if(this.deleteList !=""){

          }else{
            if(this.selectLength.length>5){
              this.$Message.info('删除主机至多选择 5 项')
            }else{
              this.selectLength.forEach(item =>{
              this.deleteId += item.id+','
            })
            }
          }
        //  if(this.deleteList == '' && this.selectLength.length == 0){
        //     this.$Message.info({
        //       content:'请选择一个主机',
        //       duration:5
        //     })
        //     return;
        //   }
        //  if(this.deleteList.caseType != 3){
        //    this.$Message.warning('只能删除实时计费主机');
        //    return
        //  }
         this.$Modal.confirm({
           content:`主机删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
           onOk:()=>{
             axios.get('information/deleteVM.do',{
               params:{
                 id: this.deleteList.id == undefined? this.deleteId:this.deleteList.id
               }
             }).then(res => {
               if(res.status == 200 && res.data.status == 1){
                 this.$Message.success(res.data.message);
                 this.getGpuServerList();
               }else {
                 this.$message.info({
                   content: res.data.message
                 })
               }
             })
           }
         })
        },


      //重启主机
      reStartGPU(){
          if(this.selectLength.length == 0){
            this.$Message.info({
              content:'请选择一个主机',
              duration:5
            });
            return;
          }
          this.$http.get('gpuserver/reStartGPU.do',{
            params:{
              gpuId :this.uuId,
              zoneId:this.$store.state.zone.zoneid
            }
          }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
              this.getGpuServerList();
            }else {
              this.$message.info({
                content: res.data.message
              })
              this.getGpuServerList();
            }
          })
      },

      // 选中主机
      selectIndex(selection){
        this.selectLength = selection;
        if(selection.length != 0){
          for(let i = 0;i<selection.length;i++){
          this.uuid += selection[i].computerid+',';
          this.uuid = this.uuid.substring(0,this.uuid.length-1);
          this.deleteId += selection[i].id+',';
           this.deleteId = this.deleteId.substring(0,this.deleteId.length-1);
            if(selection[i].computerstate == 1 && selection[i].status ==1){ //开机状态
               this.disabledList.closeDisbled = false;
            }else if(selection[i].computerstate == 0 && selection[i].status ==1){ // 关机状态
               this.disabledList.openDisbled = false;
               this.disabledList.deleteDisbled = false;
            }
            if(selection[i].status == -1){
              this.disabledList.deleteDisbled = false;
            }
        }
        }else{
          this.disabledList.deleteDisbled = true;
          this.disabledList.openDisbled = true;
          this.disabledList.closeDisbled = true;
        }

      },

        //创建镜像
      createMrrior(){
          this.$refs.mirrorValidate.validate((valid) => {
            if (valid) {
              axios.get('Snapshot/createTemplate.do', {
                params: {
                  templateName: this.mirrorValidate.name,
                  descript: this.mirrorValidate.descript,
                  rootDiskId: this.mirrorValidate.rootdiskid,
                  zoneId: this.$store.state.zone.zoneid,
                }
              }).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success(res.data.message);
                  this.showModal.mirror = false;
                } else {
                  this.$Message.info(res.data.message);
                }
              })
            }
          })
      },

        //续费类型切换
      renewChange(index){
          this.timeValue = '';
         if(index == 'year'){
           this.timeValueList = this.renewValidate.time[0].date;
         }else if(index == 'month'){
           this.timeValueList = this.renewValidate.time[1].date;
         }
      },

        //资费变更切换
      ratesChangeTimes(index){
            this.ratesChangeTime = '';
          if(index == 'year'){
            this.timeValueList = this.renewValidate.time[0].date;
          }else if(index == 'month'){
            this.timeValueList = this.renewValidate.time[1].date;
          }
      },

         //获取主机续费价格
      getGpuMonery(){
         axios.get('information/getYjPrice.do',{
           params:{
            timeType:this.timeType,
            timeValue:this.timeValue,
            gpuArr:this.VMId,
            zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
               this.cost = res.data.result.toFixed(2)
               this.originCost = res.data.result
               if (res.data.cuspon) {
                 this.originCost = Number((this.originCost + res.data.cuspon).toFixed(2))
               }
               if (res.data.continueDiscount) {
                 this.originCost = (this.originCost + res.data.continueDiscount).toFixed(2)
               }
             }
         })
      },

        //主机续费提交
      setGPuMoney(){
         let gpuList =JSON.stringify([{type:6,id:this.VMId}]);
          axios.post('continue/continueOrder.do',{
            zoneId:this.$store.state.zone.zoneid,
            timeType:this.timeType,
            timeValue:this.timeValue,
            list:gpuList
          }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
              this.showModal.renew = false;
              this.$router.push({path:'order'});
            }else {
              this.showModal.renew = false;
              this.$Modal.warning({
                content:res.data.message
              })
            }
          })
      },

      //资费变更查询ip
      ratesChange() {
        let url = 'information/listVirtualMachinesById.do'
        axios.get(url, {
          params: {
            VMId: this.uuId,
            zoneId: this.$store.state.zone.zoneid,
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

        //资费变更确定
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
          {type: 6, id: this.VMId}
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

        //连接主机
      link(item) {
          localStorage.setItem('link-companyid', item.companyid)
          localStorage.setItem('link-vmid', item.computerid)
          localStorage.setItem('link-zoneid', item.zoneid)
          localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
          window.open('/link')
      },

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
      showGetChart(){
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

      // 重置密码
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
    hideEvent(name) {
        if (name !== 'resetPassword') {
          if (this.selectLength.length !== 1) {
            return false
          }
          // this.hostCurrentSelected = this.hostSelection[0]
          switch (name) {
            case 'bindingIP':
              this.showModal.ipShow = true;
              break
            case 'rename':
              this.renameForm.hostName = ''
              this.showModal.rename = true
              break
            case 'ratesChange':
              if (this.selectLength[0].caseType == 3) {
                this.showModal.ratesChange = true;
              }
              break
            case 'renewal':
              this.showModal.renew = true;
              break
            case 'mirror':
              if (this.selectLength[0].status == 1 && this.selectLength[0].computerstate == 0) {
                this.showModal.mirror = true
              }
              break
            case 'unbindIP':
              if (this.selectLength[0].publicip) {
                 this.unbind(this.selectLength[0].publicip,this.selectLength[0].computerid);
              } else {
                this.$Message.warning('该主机没有绑定公网IP')
              }
              break
          }
        } else {
          if (this.selectLength.length > 5) {
            this.$Message.info('重置密码至多选择 5 项')
            return false
          }
          this.hostResetPassword(1)
        }
    },
    hostResetPassword(val) {
        this.resetPasswordForm.password = ''
        this.resetPasswordForm.hintGrade = 0
        this.resetPasswordForm.passwordAffirm = ''
        if (val === 1) {
          if (this.selectLength.length === 0) {
            return false
          }
          this.resetPasswordHostData = this.selectLength
          this.showModal.resetPassword = true
        } else {
          this.resetPasswordHostData = []
          this.resetPasswordHostData[0] = this.selectLength[0]
          this.showModal.resetPassword = true
        }
    },
    verifyPassword() {
        if (this.regExpObj.password.test(this.resetPasswordForm.password)) {
          this.resetPasswordForm.errorMsg = 'passwordHintTwo'
        } else {
          this.resetPasswordForm.errorMsg = 'passwordHint'
        }
    },
  },
    created(){
        this.toggleZone(this.$store.state.zone.zoneid)
        if (this.$store.state.authInfo == null) {
          this.showModal.selectAuthType = true
        }
        this.CPUTime = this.getCurrentDate();
        this.momeryTime = this.getCurrentDate();
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
    computed:{
        auth() {
          return this.$store.state.authInfo != null
        },
        resetPasswordDisabled() {
          let len = this.selectLength.length
          if (len === 0) {
            return true
          } else {
            // 开启关闭主机才能重置密码
            return this.selectLength.some(host => {
              return host.status != 1
            })
          }
        },
        bindingIPDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return this.selectLength[0].status != 1
          }
        },
        unbindIPDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return this.selectLength[0].status != 1 && this.selectLength[0].status != 0
          }
        },
        renameDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return this.selectLength[0].status != 1
          }
        },
        ratesChangeDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return !(this.selectLength[0].status == 1 && this.selectLength[0].caseType == 3)
          }
        },
        hostRenewDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return this.selectLength[0].status != 1 && this.selectLength[0].status != 0
          }
        },
        makeMirrorDisabled() {
          let len = this.selectLength.length
          if (len !== 1) {
            return true
          } else {
            return !(this.selectLength[0].status == 1 && this.selectLength[0].computerstate == 0)
          }
        },
    },
    mounted(){
          this.getGpuServerList();
    },
    watch: {
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
              gpuArr: this.VMId,
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
              gpuArr: this.VMId,
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
      
    }
  }
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.text-box{
  border:1px solid #2A99F2;
  background-color: RGBA(42, 153, 242, 0.1);
  padding: 7px 10px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #666666;
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


    .surface-boder{
      border-radius:4px;
      border:1px dashed  rgba(153,153,153,1);
      padding: 20px;
      margin-top: 20px;
      width: 570px;
      height: 405px;
    }
    .tab_box{
        padding: 20px 20px;
        background: #FFFFFF;
        .tab-top{
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          > span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
          }
        }
    }
    .title-Png{
      font-family: MicrosoftYaHei;
      margin-top: 10px;
      border-bottom: 1px solid #E9E9E9;
      padding-bottom: 10px;
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
      display: inline-block;
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
  .chart{
      margin-top:10px;height:30px;
  }
    .chart-rig{
     height:30px;
     display: inline-block;
     margin-left:86px
    }
  .right-surface{
    position: absolute;
    right: 0;
    top: 56px;
    background: #fff;
    width: 600px;
    height: 100%;
    z-index: 1000;
    box-shadow:-5px 0px 14px -7px rgba(148,148,148,0.4);
    border-radius:2px;
    transition: width ease-in-out 0.5s, opacity ease-in-out 0.5s;
    opacity: 1;
  }

  .right-surface-hidde{
    position: absolute;
    right: 0;
    top: 56px;
    background: #fff;
    width: 600px;
    height: 100%;
    z-index: 1000;
    box-shadow:-5px 0px 14px -7px rgba(148,148,148,0.4);
    border-radius:2px;
    opacity: 0;
    display: none;
    transition: width ease-in-out 0.5s, opacity ease-in-out 0.5s;
  }
</style>
