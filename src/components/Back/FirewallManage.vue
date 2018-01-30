<template>
  <div class="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div class="wrapper">
      <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / <router-link
        to="firewall" style="color:rgba(17, 17, 17, 0.43);">防火墙</router-link> / 管理</span>
      <div class="content">
        <div>
          <span class="title">防火墙名称</span>
          <span class="info" style="min-width: 80px;display: inline-block">{{firewallInfo.firewallName}}</span>
        </div>
        <div style="margin-top:20px">
          <div class="operator-bar">
            <Button type="primary" @click="showModal.createRule = true">创建规则</Button>
          </div>
          <div class="body">
            <div class="network-wrapper">
              <i class="arrow" :class="{open:downInformation.open}"
                 @click="downInformation.open=!downInformation.open"></i><span style="user-select:none">出站规则</span>
              <div>
                <Table v-if="downInformation.open" style="margin-top:15px;transition:.5s"
                       :data="downInformation.tableData"
                       :columns="Columns"></Table>
              </div>
            </div>

            <div class="network-wrapper">
              <i class="arrow" :class="{open:upInformation.open}"
                 @click="upInformation.open=!upInformation.open"></i><span style="user-select:none">入站规则</span>
              <div>
                <Table v-if="upInformation.open" style="margin-top:15px;transition:.5s"
                       :data="upInformation.tableData"
                       :columns="Columns"></Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="showModal.createRule" width="660" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        添加防火墙规则
      </div>
      <div style="width:100%;display: flex">
        <Form ref="first" :model="newRuleForm" :rules="ruleValidate" :label-width="80" style="width:47%">
          <Form-item label="名称" prop="name">
            <Input v-model="newRuleForm.name" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="方向" prop="way">
            <Select v-model="newRuleForm.way" placeholder="请选择">
              <Option value="Egress">
                入站规则
              </Option>
              <Option value="Ingress">
                出站规则
              </Option>
            </Select>
          </Form-item>
          <Form-item label="协议" prop="protocol">
            <Select v-model="newRuleForm.protocol" placeholder="请选择">
              <Option v-for="item in newRuleForm.protocolOptions" :value="item" :key="item">
                {{item}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="起始端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.startPort" :max="65535" :min="0"></InputNumber>
          </Form-item>
        </Form>
        <Form ref="second" :model="newRuleForm" :rules="ruleValidate" :label-width="80" style="width:47%">
          <Form-item label="优先级">
            <InputNumber v-model="newRuleForm.itemid" :max="10" :min="0"></InputNumber>
          </Form-item>
          <Form-item label="行为" prop="access">
            <Select v-model="newRuleForm.access" placeholder="请选择">
              <Option value="Allow">
                接受
              </Option>
              <Option value="Deny">
                拒绝
              </Option>
            </Select>
          </Form-item>
          <Form-item label="CIDR" prop="cidr">
            <Input v-model="newRuleForm.cidr" placeholder="请输入IP地址..."></Input>
          </Form-item>
          <Form-item label="结束端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.endPort" :max="65535" :min="0"></InputNumber>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.createRule = false">取消</Button>
        <Button type="primary" @click="handleSubmit('first','second')">确定
        </Button>
      </div>
    </Modal>


    <!--Modal v-model="showModal.charges" width="590" scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        修改私有网络属性
      </div>
      <div style="width:69%">
        <Form :model="updateForm" :label-width="80">
          <Form-item label="名称">
            <Input v-model="updateForm.name" placeholder="请输入..." style="width: 300px"></Input>
          </Form-item>
          <Form-item label="描述">
            <Input v-model="updateForm.description" type="textarea" :rows="4" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.update = false">取消</Button>
        <Button type="primary" @click="update">确定
        </Button>
      </div>
    </Modal>

    <Modal v-model="showModal.addHost" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        添加主机
      </div>
      <p style="padding:20px;">注：一个主机在同一个私有网络内只能被选择一次，操作成功后系统将在此主机的网卡设置中自动生成一个IP地址与此私有网络相对应的新的从网卡。</p>
      <div style="width:69%">

        <Form :model="addHostForm" :label-width="80">
          <Form-item label="主机">
            <Select v-model="addHostForm.hostid" placeholder="请选择">
              <Option v-for="item in addHostForm.hostList" :key="item" :value="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.addHost = false">取消</Button>
        <Button type="primary" @click="addCommit">确定
        </Button>
      </div>
    </Modal>

    <Modal v-model="showModal.newVPC" width="590">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        新建VPC
      </div>
      <div style="width:60%">
        <Form :model="newVPCForm" :label-width="80">
          <Form-item label="区域选择">
            <Select v-model="newVPCForm.zone" placeholder="请选择">
              <Option v-for="item in zoneOptions" :key="item.zoneid" :value="item.zoneid">{{item.zonename}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="VPC名称">
            <Input v-model="newVPCForm.VPCName" placeholder="请输入..." style="width: 255px"></Input>
          </Form-item>
          <Form-item label="地址范围">
            <Select v-model="newVPCForm.VPC" placeholder="请选择">
              <Option v-for="item in newVPCForm.VPCOptions" :key="item" :value="item">{{item}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="VPC描述">
            <Input v-model="newVPCForm.VPCDescription" placeholder="请输入..." type="textarea" :rows="4"
                   style="width: 255px"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.newVPC = false">取消</Button>
        <Button type="primary" :disabled="newVPCForm.VPCName==''||newVPCForm.zone==''||newVPCForm.VPCDescription==''"
                @click="createVPC">确定
        </Button>
      </div>
    </Modal>

    <Modal v-model="showModal.modifyVPC" width="590">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        修改VPC属性
      </div>
      <div style="width:60%">
        <Form :model="modifyVPCForm" :label-width="80">
          <Form-item label="名称">
            <Input v-model="modifyVPCForm.VPCName" placeholder="请输入..." style="width: 255px"></Input>
          </Form-item>
          <Form-item label="描述">
            <Input v-model="modifyVPCForm.VPCDescription" type="textarea" :rows="4" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyVPC = false">取消</Button>
        <Button type="primary" @click="modifyVPC">确定
        </Button>
      </div>
    </Modal-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      const validateCdir = (rule, value, callback) => {
        var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/(\d|[1-2]\d|3[0-2])$/
        if (!value) {
          return callback(new Error('CIDR不能为空'));
        } else {
          if (!re.test(value)) {
            callback(new Error('请输入正确的CIDR'));
          } else {
            callback();
          }
        }
      };
      return {
        showModal: {
          createRule: false
        },
        firewallInfo: {
          fireId: localStorage.fireId,
          createTime: localStorage.createTime,
          firewallName: localStorage.firewallName
        },
        upInformation: {
          open: true,
          tableData: []
        },
        downInformation: {
          open: true,
          tableData: []
        },
        Columns: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          {
            title: '优先级',
            key: 'itemid'
          },
          {
            title: '协议',
            key: 'agreement'
          },
          {
            title: '行为',
            key: 'operation'
          },
          {
            title: '起始端口',
            key: 'startport'
          },
          {
            title: '结束端口',
            key: 'endport'
          },
          {
            title: 'CIDR',
            key: 'cidr',
          },
          {
            title: '操作',
            width: 100,
            render: (h, params) => {
              if (params.row.closing) {
                return h('div', {}, [h('Spin'), h('span', {}, '删除中')])
              }
              return h('div', {},
                [
                  h('Poptip', {
                    props: {
                      confirm: true,
                      placement: 'top-end',
                      width: 200,
                      title: '确认要删除该规则？',
                    },
                    on: {
                      'on-ok': () => {
                        this.del(params.row.id)
                      }
                    }
                  }, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    }
                  }, '删除')])
                ]
              );
            }
          }
        ],
        loadingMessage: '',
        loading: false,
        newRuleForm: {
          name: '',
          way: '',
          protocol: '',
          protocolOptions: ['TCP', 'UDP', 'ICMP', 'ALL'],
          endPort: 1,
          startPort: 1,
          access: '',
          cidr: '0.0.0.0/0',
          itemid: 1,
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'change'}
          ],
          way: [
            {required: true, message: '请选择方向', trigger: 'change'},
          ],
          protocol: [
            {required: true, message: '请选择协议', trigger: 'change'}
          ],
          itemid: [
            {required: true, message: '请填写优先级', trigger: 'change'},
          ],
          access: [
            {required: true, message: '请选择行为', trigger: 'change'},
          ],
          cidr: [
            {required: true, validator: validateCdir, trigger: 'blur'}
          ]
        },
        updateForm: {
          name: '',
          description: ''
        },
        addHostForm: {
          hostid: '',
          hostList: []
        },
        currentNetwork: ''
      }
    },
    created(){
      this.init()
    },
    methods: {
      init(){
        let url = `network/listaclListItem.do?aclListId=${this.firewallInfo.fireId}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.upInformation.tableData = response.data.result.up
            this.downInformation.tableData = response.data.result.down
          }
        })
      },
      handleSubmit (first, second) {
        let bol = true
        this.$refs[first].validate((valid) => {
          bol = bol && valid
        })
        this.$refs[second].validate((valid) => {
          bol = bol && valid
        })

        if (bol) {
          this.showModal.createRule = false
          this.loadingMessage = '正在创建防火墙规则'
          this.loading = true
          if (this.newRuleForm.protocol == 'ALL' || this.newRuleForm.protocol == 'ICMP') {
            this.newRuleForm.startPort = 1
            this.newRuleForm.endPort = 65535
          }
          var url = `network/createNetworkACL.do?name=${this.newRuleForm.name}&way=${this.newRuleForm.way}&protocol=${this.newRuleForm.protocol}&itemid=${this.newRuleForm.itemid}&cdir=${this.newRuleForm.cidr}&startport=${this.newRuleForm.startPort}&endport=${this.newRuleForm.endPort}&acllistid=${this.firewallInfo.fireId}&access=${this.newRuleForm.access}`
          this.$http.get(url).then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.init()
              this.$Message.success(response.data.message)
            }
          })
        }
      },
      del(acllistitemid){
        this.upInformation.tableData.forEach(item => {
          if (item.acllistitemid == acllistitemid) {
            item.closing = true
          }
        })
        this.downInformation.tableData.forEach(item => {
          if (item.acllistitemid == acllistitemid) {
            item.closing = true
          }
        })
        this.loadingMessage = '正在删除规则'
        this.loading = true
        var url = `network/deleteNetworkACL.do?aclListItemId=${acllistitemid}`
        this.$http.get(url).then(response => {
          this.loading = false
          if (response.status == 200 && response.data.status == 1) {
            this.upInformation.tableData = this.upInformation.tableData.filter(item => {
              return item.acllistitemid != acllistitemid
            })
            this.downInformation.tableData = this.downInformation.tableData.filter(item => {
              return item.acllistitemid != acllistitemid
            })
            this.$Message.success(response.data.message)
          }
        })
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
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
        background-color: white;
        padding: 20px;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-family: 微软雅黑;
          font-size: 16px;
          color: #2A99F2;
          display: block;
          margin-bottom: 10px
        }
        .info {
          font-weight: 600;
          margin-right: 25px;
          font-size: 14px;
          color: #5E5E5E;
        }
        .operator-bar {

        }
        .body {
          min-height: 500px;
          .network-wrapper {
            margin-top: 20px;
            min-height: 50px;
            background-color: #e9f4fd;
            border-radius: 5px;
            border-radius: 5px;
            padding: 18px 25px;
            .arrow {
              border-top: 14px solid #2A99F2;
              border-left: 7px solid rgba(0, 0, 0, 0);
              border-right: 7px solid rgba(0, 0, 0, 0);
              display: inline-block;
              margin-right: 5px;
              transition: .5s;
              vertical-align: middle;
              cursor: pointer
            }
            .open {
              transform: rotate(-180deg);
            }
            .show {
              height: 0px;
            }
            & > span {
              font-size: 13px;
              color: rgba(17, 17, 17, 0.75);
              line-height: 18px;
              font-weight: 600;
              margin-right: 40px;
            }
            .operatingArea {
              display: inline-block;
              float: right;
              & > span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
