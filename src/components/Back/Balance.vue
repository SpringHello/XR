<template>
  <div id="balance">
    <p>首页</p>
    <div class="til">
      <p style="fontSize:25px;"><a href="#">负载均衡</a></p>
      <Button type="primary">刷新</Button>
    </div>
    <div class="universal-alert">
      <p> 负载均衡通过将访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平的应用程序容错性能。</p>
    </div>
    <!--按钮-->
    <div class="button-group">
      <Button type="primary" @click="showBalanceName = true">创建负载均衡</Button>
      <Button type="primary" style="margin-left: 8px;">绑定虚拟机</Button>
      <Button type="primary" style="margin-left: 8px;">解绑虚拟机</Button>
      <Button type="primary" style="margin-left: 8px;">删除</Button>
    </div>
    <!--负载均衡表-->
    <div class="tab">
      <Table highlight-row stripe :columns="columns" :data="data"></Table>
    </div>
    <!--模态框-->
    <Modal v-model="showBalanceName" scrollable="true" width="550">
      <p slot="header" style="margin-left:20px;font-size:16px">创建负载均衡</p>
      <!--步骤-->
      <div class="margin">
        <Steps size="small" :current="currentStep">
          <Step title="创建负载均衡" class="opacity"></Step>
          <Step title="配置转发规则"></Step>
          <Step title="完成" class="opacity"></Step>
        </Steps>
      </div>
      <div v-if="!currentStep">
        <!--名称-->
        <div class="margin">
          <p>名称</p>
          <Input  placeholder="请输入小于16位的负载均衡名称" style="width: 260px;" class="margin-top"></Input>
        </div>
        <!--类型-->
        <div v-if="choose">
          <div class="margin">
            <p>类型</p>
            <CheckboxGroup v-model="choose" class="margin-top">
              <Checkbox label="公网"></Checkbox>
              <Checkbox label="私网" style="margin-left:25px"></Checkbox>
            </CheckboxGroup>
          </div>
          <!--公网IP-->
          <div class="margin">
            <p>公网IP</p>
            <Select v-model="publicIp" style="width:260px;" class="margin-top">
              <Option v-for="item in publicList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
          </div>
        </div>
        <div v-else>
          <div class="margin">
            <p>类型</p>
            <CheckboxGroup v-model="choose1" class="margin-top">
              <Checkbox label="公网" style="color:#fff;"></Checkbox>
              <Checkbox label="私网" style="margin-left:25px"></Checkbox>
            </CheckboxGroup>
          </div>
          <!--所属子网-->
          <div class="margin">
            <p>所属子网</p>
            <Select style="width:260px;" class="margin-top" placeholder="子网名称" placement="bottom">
              <Option v-for="item in privateList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
          </div>
          <!--内网IP-->
          <div class="margin">
            <p>内网IP</p>
            <CheckboxGroup v-model="intranet" class="margin-top">
              <Checkbox label="自动分配"></Checkbox>
              <Checkbox label="制定IP"></Checkbox>
            </CheckboxGroup>
          </div>

          <div class="margin">
            <span>192.168.2.</span>
            <Input style="width:100px"></Input>
          </div>
          <span style="margin-left:20px;font-size:8px;" class="opacity">网络范围： 192.168.2-254</span>
        </div>
      </div>
      <!--配置转发规则-->
      <div v-if="currentStep">
        <div class="model">
          <div class="margin">
            <p>规则名称</p>
            <Input placeholder="请输入规则名称" style="width:200px;margin-top:10px;"></Input>
          </div>
          <div class="margin" >
            <p>算法</p>
            <Select style="width:200px" class="margin-top">
              <Option value="num1" label="轮询算法">
                <span>轮询算法</span>
                <span style="float:right;"><Icon type="ios-help-outline"></Icon></span>
              </Option>
              <Option value="num2" label="最小连接数">
                <span>最小连接数</span>
                <span style="float:right;"><Icon type="ios-help-outline"></Icon></span>
              </Option>
              <Option value="num3" label="源算法">
                <span>源算法</span>
                <span style="float:right;"><Icon type="ios-help-outline"></Icon></span>
              </Option>
            </Select>
          </div>
        </div>
        <div class="model">
          <div class="margin">
            <p>前端口</p>
            <Input placeholder="请输入0-65535之间任意数字" style="width:200px;margin-top:10px;"></Input>
          </div>
          <div class="margin" >
            <p>后端口</p>
            <Input placeholder="请输入0-65535之间任意数字" style="width:200px;margin-top:10px;"></Input>
          </div>
        </div>
        <p style="margin-left:20px;font-size:8px;padding:6px;line-height:16px;" class="opacity">
          提示：当您完成负载均衡创建之后，您可以在负载均衡管理页面修改转发规则与健康检查规则，并管理您的后端服务器。同时您也可以在该页面选择开启或者关闭会保持功能。
          什么是<a href="#">会话保持？</a>
        </p>
      </div>
      <div slot="footer">
        <Button size="large" @click="removeBalance" v-show="currentStep == 0">取消</Button>
        <Button size="large" v-show="currentStep == 1" @click="preStep">上一步</Button>
        <Button type="primary" size="large"  @click="nextStep" v-show="currentStep == 0">下一步</Button>
        <Button type="primary" size="large" @click="removeBalance" v-show="currentStep == 1">完成</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data (){
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '负载均衡名称',
            key: 'balanceName'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '网络类型',
            key: 'NetworkType'
          },
          {
            title: '公网IP/内网IP',
            key: 'UseOrInpublic'
          },
          {
            title: '创建时间',
            key: 'CreationTime'
          },
          {
            title: '管理',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看详情')
            }
          }
        ],
        data: [
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '公网负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-12-8',
            _checked: true
          },
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '公网负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-11-12',
            _checked: true
          },
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '内网负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-10-24'
          }
        ],
        showBalanceName: false,
        choose: '公网',
        choose1: '私网',
        publicIp: '',
        intranet: '制定IP',
        currentStep: 0,
        publicList: [
          {
            value: '192.168.31.24',
            label: '192.168.31.24'
          },
          {
            value: '192.168.33.45',
            label: '192.168.33.45'
          },
          {
            value: '192.168.44.5',
            label: '192.168.44.5'
          },
          {
            value: '192.144.33.89',
            label: '192.144.33.89'
          }
        ],
        privateList: [
          {
            value: '192.168.33.45',
            label: '192.168.33.45'
          },
          {
            value: '192.168.44.5',
            label: '192.168.44.5'
          },
          {
            value: '192.144.33.89',
            label: '192.144.33.89'
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `balanceName：${this.data[index].balanceName}<br>status：${this.data[index].status}<br>NetworkType: ${this.data[index].NetworkType}<br>UseOrInpublic: ${this.data[index].UseOrInpublic}<br>CreationTime: ${this.data[index].CreationTime}`,
          scrollable: true
        })
      },
      removeBalance (){
        this.showBalanceName = false
      },
      nextStep () {
        if (this.currentStep == 2) {
          this.currentStep = 0
        } else {
          this.currentStep += 1
        }
      },
      preStep () {
        if (this.currentStep > 0) {
          this.currentStep -= 1
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #balance {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    .til {
      margin-top: 1.7%;
      margin-left: 1.5%;
      display: flex;
      justify-content: space-between;
      a {
        color: #333333;
      }
      button {
        margin-right: 1.5%;
      }
    }
    .universal-alert {
      width: 1160px;
      margin: 2% auto;
    }
    .button-group {
      margin: 1.5%;
    }
    .tab {
      width: 1161px;
      height: 159px;
      margin: 0 auto;
    }
  }
</style>
