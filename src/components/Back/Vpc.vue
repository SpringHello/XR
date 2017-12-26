<template>
  <div id="vpc">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="body">
        <div class="head-info">
          <h1>虚拟私有云VPC</h1>
          <Button type="primary">刷新</Button>
        </div>
        <Alert>虚拟私有云，通过逻辑方式进行网络隔离，提供安全、隔离的网络环境。VPC为您提供与传统网络无差别的虚拟网络，同时还可以为您提供弹性IP、安全组、VPN等高级网络服务。</Alert>
        <div class="button-group">
          <Button type="primary" @click="modalList.newVpc = true">新建VPC</Button>
          <Button type="primary" @click="modalList.addGateway = true">添加私有网关</Button>
          <Button type="primary">修改VPC</Button>
          <Button type="primary">删除VPC</Button>
          <Button @click="modalList.rederror = true">红色叉叉</Button>
          <Button @click="modalList.yellowdeltte = true">黄色感叹号</Button>
        </div>
        <div class="card-wrap">
          <div class="card" v-for="(item,index) in netData" :key="index" :class="{active:item._select}"
               @click="radio(item)">
            <div class="content">
              <div class="item-wrap">
                <div class="item item1">
                  <p>名称：<span>{{item.vpcname}}</span></p>
                  <p>网段：<span>{{item.cidr}}</span></p>
                </div>
              </div>
              <div class="item-wrap">
                <div class="item"><p>路由器（VPC）：<span>{{item.aclCount}}</span></p></div>
                <span class="dotted-across"></span>
              </div>
              <div class="item-wrap">
                <div class="item"><p>交换机：（子网）<span>{{item.networkCount}}</span></p></div>
                <span class="dotted-vertical"></span>
                <div class="item item4"><p>弹性云主机：<span>{{item.computerCount}}</span></p></div>
              </div>
              <div class="item-wrap">
                <div class="item"><p>防火墙：<span>{{item.aclCount}}</span></p></div>
              </div>
            </div>
            <div class="card-bottom">
              <Button type="primary" class="btn-bgwhite">重启</Button>
              <Button type="primary" @click="manage(item)">管理</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新建vpc modal -->
    <Modal v-model="modalList.newVpc" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建VPC</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newForm" :rules="newRuleValidate" ref="newFormValidate">
          <FormItem label="vpc名称" prop="vpcName">
            <Input v-model="newForm.vpcName"></Input>
          </FormItem>
          <FormItem label="地址范围" prop="vpc">
            <Select v-model="newForm.vpc" placeholder="请选择">
              <Option v-for="item in newForm.VPCOptions" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="vpc描述" prop="desc">
            <Input v-model="newForm.desc"></Input>
          </FormItem>
          <FormItem label="">
          </FormItem>
          <FormItem label="购买方式" prop="timeType">
            <Select v-model="newForm.timeType" @on-change="newForm.timeValue=''">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买时长" prop="timeValue" v-if="newForm.timeType!='current'">
            <Select v-model="newForm.timeValue" @on-change="log">
              <Option v-for="item in customTimeOptions[newForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div>
          <span>是否需要绑定公网IP <Checkbox v-model="newForm.IPReq">&nbsp;</Checkbox></span>
          <div v-if="newForm.IPReq" style="margin-top: 10px;">
            <i-slider v-model="newForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newForm.IPSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleNewSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 添加私有网关 modal -->
    <Modal v-model="modalList.addGateway" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加私有网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addGatewayForm" :rules="gatewayRuleValidate" ref="gatewayFormValidate">
          <FormItem label="物理网络" prop="network">
            <Input v-model="addGatewayForm.network"></Input>
          </FormItem>
          <FormItem label="VLAN/VNI" prop="VNI">
            <Input v-model="addGatewayForm.VNI"></Input>
          </FormItem>
          <FormItem label="IP地址" prop="IP">
            <Input v-model="addGatewayForm.IP"></Input>
          </FormItem>
          <FormItem label="网关" prop="gateway">
            <Input v-model="addGatewayForm.gateway"></Input>
          </FormItem>
          <FormItem label="网络掩码" prop="mask">
            <Input v-model="addGatewayForm.mask"></Input>
          </FormItem>
          <FormItem label="防火墙" prop="firewall">
            <Select v-model="addGatewayForm.firewall">
              <Option v-for="item in firewallList" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div>
          <span>是否需要开启源NAT <Checkbox v-model="addGatewayForm.NAT">&nbsp;</Checkbox></span>
          <div v-if="addGatewayForm.NAT" style="margin-top: 10px;">
            <i-slider v-model="addGatewayForm.NATSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="addGatewayForm.NATSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 错误弹窗 -->
    <Modal v-model="modalList.rederror" :scrollable="true" :closable="false" :width="280">
      <p class="modal-content-s">
        <Icon type="close-circled" class="orange f24 mr10"></Icon>
        弹出错误原因，并提示用户解决办法
      </p>
      <p slot="footer" class="modal-footer-s">
        <Button class="f16" @click="modalList.rederror = false">取消</Button>
        <Button class="f16" type="primary" @on-ok="ok">联系客服</Button>
      </p>
    </Modal>
    <!-- 删除网卡弹窗 -->
    <Modal v-model="modalList.yellowdeltte" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除</strong>
          <p class="lh24">若要删除主网卡，需在主机其他网卡中选择一个从网卡作为新的主网卡。请选择：</p>
          <Select v-model="model1" style="width:296px;" class="mt10" placeholder="请选择网卡">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button class="f16" @click="modalList.yellowdeltte = false">取消</Button>
        <Button class="f16" type="primary" @on-ok="ok">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import axios from 'axios'
  import $store from '../../vuex'

  export default {
    name: 'vpc',
    data() {
      return {
        model1: '',
        // vpc列表数据
        netData: [],
        // 控制模态框是否关闭
        modalList: {
          newVpc: false,
          addGateway: false,
          rederror: false,
          yellowdeltte: false
        },
        // 新建vpc表单数据
        newForm: {
          vpcName: '',
          vpc: '',
          desc: '',
          VPCOptions: ['192.168.0.0/16', '172.16.0.0/16', '172.17.0.0/16', '172.18.0.0/16', '172.19.0.0/16', '172.20.0.0/16', '172.21.0.0/16', '172.22.0.0/16', '172.23.0.0/16', '172.24.0.0/16', '172.25.0.0/16'],
          timeType: '',
          timeValue: '',
          // 是否需要公网IP
          IPReq: false,
          // 公网IP最低1M
          IPSize: 1,
          points: [20, 50]
        },
        // 添加网关表单数据
        addGatewayForm: {
          // 物理网络
          network: '',
          // WLAN/VNI
          VNI: '',
          // ip地址
          IP: '',
          // 网关
          gateway: '',
          // 网络掩码
          mask: '',
          // 防火墙
          firewall: '',
          // 是否开启源NAT
          NAT: false,
          // 源NATSize
          NATSize: 1
        },
        // 新建vpc验证规则
        newRuleValidate: {
          vpcName: [
            {required: true, message: '请输入vpc名称', trigger: 'blur'}
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
        gatewayRuleValidate: {
          network: [
            {required: true, message: '请输入network名称', trigger: 'blur'}
          ],
          VNI: [
            {required: true, message: '请选择vpc地址范围', trigger: 'change'}
          ],
          IP: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          gateway: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ],
          mask: [
            {required: true, message: '请输入vpc名称', trigger: 'blur'}
          ],
          firewall: [
            {required: true, message: '请选择vpc地址范围', trigger: 'change'}
          ]
        },
        customTimeOptions
      }
    },
    beforeRouteEnter(to, from, next) {
      var zoneId = $store.state.zoneList[0].zoneid
      axios.get(`network/listVpc.do?zoneId=${zoneId}`).then(response => {
        if (response.status == 200) {
          next(vm => {
            vm.setData(response)
          })
        } else {
          next()
        }
      })
    },
    methods: {
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            item._select = false
          })
          this.netData = response.data.result
        }
      },
      radio(item){
        this.netData.forEach(item => {
          item._select = false
        })
        item._select = true
      },
      manage: function (item) {
        sessionStorage.setItem('vpcId', item.vpcid)
        this.$router.push('/ruicloud/vpcManage')
      },
      // 提交新建vpc表单
      handleNewSubmit() {
        this.$refs.newFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过

          } else {
            // 表单验证失败
          }
        })
      },
      log() {
        console.log(this.newForm)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #vpc {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 146px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      button {
        padding: 5px 15px;
      }
      #body {
        padding: 20px;
        background: #FFFFFF;
        .head-info {
          padding-bottom: 10px;
          margin-bottom: 8px;
          border-bottom: 1px solid #E9E9E9;
          display: flex;
          justify-content: space-between;
          h1 {
            font-weight: normal;
            color: #111111;
          }
          button {
            font-size: 14px;
          }
        }
        .ivu-alert-info {
          margin: 0;
          padding: 7px 10px;
          background: rgba(42, 153, 242, 0.10);
          border: 1px solid #2A99F2;
          border-radius: 4px;
          font-size: 14px;
          color: #666666;
        }
        .button-group {
          margin: 20px 0;
          button {
            margin-right: 10px;
          }
        }
        .card-wrap {
          display: flex;
          justify-content: space-between;
          .active {
            border: 1px solid #2A99F2;
            box-shadow: 0 2px 8px 0 rgba(42, 153, 242, 0.35);
          }
          .card:hover {
            border: 1px solid #2A99F2;
            box-shadow: 0 2px 8px 0 rgba(42, 153, 242, 0.35);
          }
          .card {
            width: 570px;
            height: 313px;
            padding: 20px;
            border: 1px solid #ffffff;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
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
              }
            }
          }
        }
      }
    }
  }
</style>
