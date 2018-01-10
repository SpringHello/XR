<template>
  <div id="background">
    <div id="wrapper">
      <span>首页 / 硬盘</span>
      <div id="content">
        <div id="header">
          <span id="title">硬盘</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>
        <div class="operator-bar">
          <Button type="primary" @click="modalList.newVpc = true">新建VPC</Button>
          <Button type="primary" @click="modalList.addGateway = true">添加私有网关</Button>
          <Button type="primary">修改VPC</Button>
          <Button type="primary">删除VPC</Button>
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

  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import axios from 'axios'
  import $store from '@/vuex'

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
</style>
