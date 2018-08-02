<template>
  <div id="background">
    <div id="wrapper">
      <p v-if="index" style="margin: 20px 20px;color: #999999;">云网络 / 网络私有云VPC</p>
      <div class="content">
        <div class="operator">
          <Button type="primary" @click="openNewVpcModal">新建VPC</Button>
          <Button type="primary" @click="showModal.addGateway = true">添加VPC互通网关</Button>
          <!--<Button type="primary">修改VPC</Button>-->
          <Button type="primary" @click="delVpc">删除VPC</Button>
        </div>
        <div class="card-wrap">
          <div class="card" v-for="(item,index) in netData" :key="index" :class="{active:item._select}"
               @click="radio(item)">
            <div class="content">
              <div class="item-wrap">
                <div class="item item1">
                  <p>名称：<span style="float:unset">{{item.status==2?'创建中':item.status==3?'删除中':item.vpcname}}</span>
                    <Spin size="small" v-if="item.status!=1" style="display: inline-block"></Spin>
                  </p>
                  <p>网段：<span>{{item.cidr}}</span></p>
                </div>
              </div>
              <div class="item-wrap">
                <div class="item" @click="manage(item)" style="cursor:pointer"><p>路由器（VPC）：<span>1</span></p></div>
                <span class="dotted-across"></span>
              </div>
              <div class="item-wrap">
                <div class="item" v-if="item.status === 2 || item.status === 3"><p>交换机（子网）：<span>{{item.networkCount}}</span>
                </p></div>
                <div class="item" @click="manage(item)" style="cursor: pointer" v-else><p>交换机（子网）：<span>{{item.networkCount}}</span>
                </p></div>
                <span class="dotted-vertical"></span>
                <router-link to="host">
                  <div class="item item4"><p>弹性云主机：<span>{{item.computerCount}}</span></p></div>
                </router-link>
              </div>
              <div class="item-wrap">
                <router-link to="firewall" style="display:inline-block;width:265px;">
                  <div class="item"><p>防火墙：<span>{{item.aclCount}}</span></p></div>
                </router-link>
              </div>
            </div>
            <div class="card-bottom">
              <div v-if="item.status!=2">
                <Button type="primary" class="btn-bgwhite" @click="restartVpc(item)">重启</Button>
                <Button type="primary" @click="manage(item)">管理</Button>
              </div>
            </div>
          </div>
          <div class="logo" v-if="netData.length === 0">
            <span>暂无VPC数据</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建vpc modal -->
    <Modal v-model="showModal.newVpc" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建VPC</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newForm" :rules="newRuleValidate" ref="newFormValidate">
          <FormItem label="vpc名称" prop="vpcName">
            <Input v-model="newForm.vpcName" placeholder="请输入vpc名称"></Input>
          </FormItem>
          <FormItem label="地址范围" prop="vpc">
            <Select v-model="newForm.vpc" placeholder="请选择">
              <Option v-for="item in newForm.VPCOptions" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="vpc描述" prop="desc">
            <Input v-model="newForm.desc" placeholder="请输入vpc描述"></Input>
          </FormItem>
          <!--          <FormItem label="购买方式" prop="timeType">
                      <Select v-model="newForm.timeType">
                        <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                                :key="item.value">{{ item.label }}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="购买时长" prop="timeValue" v-if="newForm.timeType!='current'">
                      <Select v-model="newForm.timeValue">
                        <Option v-for="item in customTimeOptions[newForm.timeType]" :value="item.value" :key="item.value">
                          {{item.label}}
                        </Option>
                      </Select>
                    </FormItem>-->
          <p class="modal-text-hint-bottom">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
        <!--创建vpc时暂时不绑定公网IP-->
        <!--<div>
          <span>是否需要绑定公网IP <Checkbox v-model="newForm.IPReq">&nbsp;</Checkbox></span>
          <div v-if="newForm.IPReq" style="margin-top: 10px;">
            <i-slider v-model="newForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newForm.IPSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </div>
        </div>-->
      </div>
      <div slot="footer" class="modal-footer-border">
        <!--  <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
          <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">{{newForm.cost}}元</span>-->
        <Button type="primary" @click="handleNewVpcSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 添加VPC互通网关 modal -->
    <Modal v-model="showModal.addGateway" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加VPC互通网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addGatewayForm" :rules="gatewayRuleValidate" ref="gatewayFormValidate">
          <FormItem label="源VPC" prop="originVPC">
            <Select v-model="addGatewayForm.originVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.targetVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标VPC" prop="targetVPC">
            <Select v-model="addGatewayForm.targetVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.originVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="源防火墙" prop="originFirewall">
            <Select v-model="addGatewayForm.originFirewall">
              <Option v-for="item in addGatewayForm.originFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标防火墙" prop="targetFirewall">
            <Select v-model="addGatewayForm.targetFirewall">
              <Option v-for="item in addGatewayForm.targetFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <!--<FormItem label="源IP" prop="originIP">
            <span>{{addGatewayForm.originPreIP[0]}}.{{addGatewayForm.originPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标IP" prop="originIP">
            <span>{{addGatewayForm.targetPreIP[0]}}.{{addGatewayForm.targetPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="源网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>-->
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.addGateway = false">取消</Button>
        <Button type="primary" @click="handleNewGateSubmit">完成配置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  // 验证vpc互通网关，源IP与目标IP不能相同
  const validaRegisteredName = regExp.validaRegisteredName
  const validateIP = (rule, value, callback) => {
    if (this.addGatewayForm.originIP == this.addGatewayForm.targetIP && this.addGatewayForm.originIP2 == this.addGatewayForm.targetIP2) {
      callback(new Error('源IP与目标IP不能相同'))
    }
    callback()
  }
    export default {
      data(){
        return{
          // 控制模态框是否关闭
          showModal: {
            newVpc: false,
            addGateway: false,
            // 添加nat网关
            addNat: false,
            // 删除nat网关
            deleteNat: false,
            // 绑定弹性IP模态框
            bindIP: false,
            // 绑定目标ip
            bindTargetIP: false,
            // 解绑弹性IP模态框
            unbindIP: false,
            natRenewal: false,
            ratesChange: false
          },
          // vpc列表数据
          netData: [],
          // 新建vpc表单数据
          newForm: {
            vpcName: '',
            vpc: '',
            desc: '',
            VPCOptions: ['192.168.0.0/16', '172.16.0.0/16', '172.17.0.0/16', '172.18.0.0/16', '172.19.0.0/16', '172.20.0.0/16', '172.21.0.0/16', '172.22.0.0/16', '172.23.0.0/16', '172.24.0.0/16', '172.25.0.0/16'],
            timeType: '',
            timeValue: '',
            // 花费
            cost: 0
          },
          // 添加网关表单数据
          addGatewayForm: {
            // 源/目标VPC
            originVPC: '',
            targetVPC: '',
            // 源/目标IP
            originPreIP: [192, 168],
            originIP: 0,
            originIP2: 0,
            targetPreIP: [192, 168],
            targetIP: 0,
            targetIP2: 0,
            // 源/目标防火墙
            originFirewall: '',
            originFirewallList: [],
            targetFirewall: '',
            targetFirewallList: [],
            // 源/目标子网掩码
            originMask: [0, 0, 0],
            targetMask: [0, 0, 0]
          },
          // 新建vpc验证规则
          newRuleValidate: {
            vpcName: [
              {required: true, validator: validaRegisteredName, trigger: 'blur'}
            ],
            vpc: [
              {required: true, message: '请选择vpc地址范围', trigger: 'change'}
            ],
            timeType: [
              {required: true, message: '请选择购买方式', trigger: 'change'}
            ],
            timeValue: [
              {required: true, message: '请选择购买时长', trigger: 'change'}
            ]
          },
          // 添加网关验证规则
          gatewayRuleValidate: {
            originVPC: [
              {required: true, message: '请选择源VPC', trigger: 'change'}
            ],
            targetVPC: [
              {required: true, message: '请选择目标VPC', trigger: 'change'}
            ],
            originIP: [
              {validator: validateIP, trigger: 'change'}
            ],
            originFirewall: [
              {required: true, message: '请选择源VPC防火墙', trigger: 'change'}
            ],
            targetFirewall: [
              {required: true, message: '请选择目标VPC防火墙', trigger: 'change'}
            ],
            mask: [
              {required: true, message: '请输入子网掩码', trigger: 'blur'}
            ],
            firewall: [
              {required: true, message: '请选择防火墙', trigger: 'change'}
            ]
          },
        }
      },
      props:{
        index:{
          type:Boolean,
          default:true
        }
      },
      beforeRouteEnter(to, from, next) {
        var zoneId = $store.state.zone.zoneid
        // 获取vpc数据
        // var vpcResponse =
          axios.get('network/listVpc.do', {
          params: {
            zoneId: zoneId,
            _t: new Date().getTime()
          }
        }).then(ResponseValue =>{
          if(ResponseValue.status == 200 && ResponseValue.data.status == 1){
            next(vm =>{
              vm.setData(ResponseValue.data);
            })
          }
          })
        // Promise.all(vpcResponse).then((ResponseValue) => {
        //   next(vm => {
        //     vm.setData(ResponseValue[0])
        //   })
        // })
      },
      created(){
        this.intervalInstance = setInterval(this.getVpcData, 10000)
      },
      methods:{
        // 区域切换刷新数据
        refresh () {
          var zoneId = $store.state.zone.zoneid
          // 获取vpc数据
         axios.get('network/listVpc.do', {
            params: {
              zoneId: zoneId,
              _t: new Date().getTime()
            }
          }).then(ResponseValue =>{
            if(ResponseValue.status == 200 && ResponseValue.data.status == 1){
              this.setData(ResponseValue)
            }
          })
          // Promise.all(vpcResponse).then((ResponseValue) => {
          //   this.setData(ResponseValue[0])
          //   this.select = null
          // })
        },
        // 设置查询vpc数据的值，保留原vpc选中状态
        setData(response) {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach(item => {
              item._select = false
              this.netData.forEach(i => {
                if (i.vpcid == item.vpcid) {
                  item._select = i._select
                }
              })
            })
            this.netData = response.data.result
          }
        },
        getVpcData(){
          axios.get('network/listVpc.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              _t: new Date().getTime()
            }
          }).then(response => {
            if (response.status == 200) {
              this.setData(response)
            }
          })
        },
        // 打开新建vpc modal框
        openNewVpcModal(){
          this.showModal.newVpc = true
          /* var url = 'network/listAclList.do?'
           axios.get() */
        },
        radio(item){
          this.netData.forEach(item => {
            item._select = false
          })
          item._select = true
        },
        manage(item) {
          sessionStorage.setItem('vpcId', item.vpcid)
          this.$router.push('/ruicloud/vpcManage')
        },
        // 重启vpc
        restartVpc(item) {
          this.$message.confirm({
            content: '您确认重启该VPC吗',
            onOk: () => {
              this.$http.get('network/restartVpc.do', {
                params: {
                  vpcId: item.vpcid
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          })
        },
        // 提交新建vpc表单
        handleNewVpcSubmit() {
          this.$refs.newFormValidate.validate((valid) => {
            if (valid) {
              // 表单验证通过
              var url = 'network/createVPC.do'
              axios.get(url, {
                params: {
                  vpcName: this.newForm.vpcName,
                  displayText: this.newForm.desc,
                  zoneId: $store.state.zone.zoneid,
                  count: 1,
                  cidr: this.newForm.vpc
                }
              }).then(response => {
                this.showModal.newVpc = false
                if (response.status == 200 && response.data.status == 1) {
                  this.refresh()
                  this.$Message.success({content: response.data.message})
                  // this.$error('error', response.data.message)
                } else {
                  this.$message.info({content: response.data.message})
                }
              })
            } else {
              // 表单验证失败
            }
          })
        },
        // 提交新建网关表单
        handleNewGateSubmit(){
          this.$refs.gatewayFormValidate.validate((valid) => {
            if (valid) {
              // 表单验证通过
              this.$Message.info('正在添加VPC互通网关，请稍候...')
              this.showModal.addGateway = false
              var url = 'network/addPrivateGateway.do'
              axios.get(url, {
                params: {
                  vpcIdStart: this.addGatewayForm.originVPC,
                  vpcIdEnd: this.addGatewayForm.targetVPC,
                  zoneId: $store.state.zone.zoneid,
                  aclIdStart: this.addGatewayForm.originFirewall,
                  aclIdEnd: this.addGatewayForm.targetFirewall
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            } else {
              // 表单验证失败
            }
          })
        },
        // 删除VPC
        delVpc(){
          var select = this.netData.filter(item => item._select)
          if (select.length == 0) {
            this.$Message.info({
              content: '请选择一个VPC'
            })
            return
          }
          this.$message.confirm({
            content: '您确认删除该VPC吗',
            onOk: () => {
              this.netData.forEach(item => {
                if (item.id == select[0].id) {
                  this.$set(item, 'status', 3)
                }
              })
              //select[0]._select = 3 // 3代表删除中
              this.$http.get('network/deleteVpc.do', {
                params: {
                  id: select[0].id
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.refresh()
                } else {
                  this.refresh()
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          })
        },
      },
      watch:{
        // 检测到新建VPC购买方式发生变化，重新查询价格
        'newForm.timeValue'()
        {
          this.queryVpcPrice()
        },
        // 检测到新建VPC购买方式发生变化，重新查询价格
        'newForm.timeType'()
        {
          this.newForm.timeValue = ''
          this.queryVpcPrice()
        },
        '$store.state.zone': {
          handler: function () {
            this.refresh()
          }
          ,
          deep: true
        }
      },
      beforeRouteLeave(to, from, next){
        clearInterval(this.intervalInstance)
        next()
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .card-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 200px;
    background:#f5f5f5;
    margin-top: 10px;
    .card:hover {
      border: 1px solid #2A99F2;
      box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);
    }
  .card {
    width: 570px;
    height: 313px;
    padding: 20px;
    border: 1px solid #ffffff;
    margin: 0px 2px 20px;
    box-shadow: 0px 0px 2px 0 rgba(0, 0, 0, 0.20);
  &.active {
     border: 1px solid #2A99F2;
     box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);
   }
  .content {
    border-bottom: 1px solid #E9E9E9;
  .item-wrap {
    margin-bottom: 20px;
  }
  .item-wrap:nth-child(2) {
    margin-bottom: 0px;
    width: 265px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  .dotted-across {
    height: 20px;
    border-right: dotted #979797 1px;
  }
  }
  .item-wrap:nth-child(3) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  .dotted-vertical {
    width: 40px;
    border-top: dotted #979797 1px;
  }
  }
  .item {
    width: 265px;
    padding: 10px 20px;
    border: 1px solid #E9E9E9;
    font-size: 14px;
  p {
  span {
    color: #2A99F2;
    float: right;
  }
  }
  }
  .item1 {
    width: 530px;
    display: inline-flex;
    justify-content: space-between;
  p:nth-child(2) {
    color: #2A99F2;
  }
  }
  .item4 {
    width: 225px;
  }
  }
  .card-bottom {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  button {
    margin-left: 10px;
  }
  .btn-bgwhite {
    background: #ffffff;
    color: #2A99F2;
  &:hover {
     background: #2A99F2;
     color: #FFFFFF;
   }
  }
  }
  }
  .logo {
      width: 218px;
      height: 80px;
      background: url("../../assets/img/public/no-info-logo.png") no-repeat center;
      position: relative;
      top: 52px;
      left: 50%;
      transform: translateX(-50%);
      & > span {
        position: absolute;
        top: 33px;
        left: 38px;
        font-size: 14px;
        color: #666666;
        letter-spacing: 10px;
        user-select: none;
        cursor: default;
      }
    }
  }

  .content{
    background: #FFFFFF;
    padding: 10px 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    min-width: 400px;
  }
</style>
