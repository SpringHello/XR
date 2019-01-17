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
          <!--<span class="title">{{firewallInfo.firewallName}}</span>-->
          <span class="info" style="min-width: 80px;display: inline-block;line-height: 32px;">{{firewallInfo.firewallName}}</span>
          <div style="float: right;">
            <Button class="btn" @click="$router.go(-1)">返回</Button>
            <Button class="btn" @click="$router.go(0)">刷新</Button>
          </div>
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
              <i class="arrow" :class="{open:upInformation.open}" @click="upInformation.open=!upInformation.open"></i>
              <span style="user-select:none">入站规则</span>
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

    <Modal v-model="showModal.createRule" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建规则</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form ref="newRuleFormValidate" :model="newRuleForm" :rules="ruleValidate">
          <Form-item label="名称" prop="name">
            <Input v-model="newRuleForm.name" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="方向" prop="way">
            <Select v-model="newRuleForm.way" placeholder="请选择">
              <Option value="Egress">
                出站规则
              </Option>
              <Option value="Ingress">
                入站规则
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
          <Form-item label="CIDR" prop="cidr">
            <Input v-model="newRuleForm.cidr" placeholder="请输入IP地址..."></Input>
          </Form-item>
          <!--<Form-item label="优先级（数字越小优先级越高）">
            <InputNumber v-model="newRuleForm.itemid" :max="10" :min="1"></InputNumber>
          </Form-item>-->
          <Form-item label="起始端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.startPort" :max="65535" :min="0" :precision="0"></InputNumber>
          </Form-item>
          <Form-item label="结束端口" v-show="newRuleForm.protocol != 'ICMP' && newRuleForm.protocol != 'ALL'">
            <InputNumber v-model="newRuleForm.endPort" :max="65535" :min="0" :precision="0"></InputNumber>
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
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createRule = false">取消
        </Button>
        <Button type="primary" @click="handleSubmit">确定
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
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
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
  }
  export default{
    beforeRouteEnter(from, to, next){
      axios.get('network/listaclListItem.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          aclListId: sessionStorage.getItem('firewallId')
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data(){
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        loadingMessage: '',
        loading: false,
        showModal: {
          createRule: false
        },
        // 防火墙信息
        firewallInfo: {
          firewallName: sessionStorage.getItem('firewallName')
        },
        // 上行规则数据
        upInformation: {
          open: true,
          tableData: []
        },
        // 下行规则数据
        downInformation: {
          open: true,
          tableData: []
        },
        Columns: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          /*{
           title: '优先级',
           key: 'itemid'
           },*/
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
            render(h, obj){
              if (obj.row.agreement == 'ICMP' || obj.row.agreement == 'ALL') {
                return h('span', '--')
              } else {
                return h('span', obj.row.startport)
              }
            }
          },
          {
            title: '结束端口',
            render(h, obj){
              if (obj.row.agreement == 'ICMP' || obj.row.agreement == 'ALL') {
                return h('span', '--')
              } else {
                return h('span', obj.row.endport)
              }
            }
          },
          {
            title: 'CIDR',
            key: 'cidr',
          },
          {
            title: '操作',
            width: 150,
            render: (h, params) => {
              const message = params.row._status == 1 ? '规则创建中...' : '规则删除中...'
              if (params.row._status) {
                return h('div', [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {
                  style: {
                    verticalAlign: 'middle'
                  }
                }, message)])
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
                    }, '删除')]
                  )
                ]
              )
                ;
            }
          }
        ],
        // 新建规则表单
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
        }
        ,
        ruleValidate: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'change'}
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
        }
        ,
        updateForm: {
          name: '',
          description: ''
        }
        ,
        addHostForm: {
          hostid: '',
          hostList: []
        }
        ,
        currentNetwork: ''
      }
    },
    created(){
      // this.init()
    },
    methods: {
      // 设置数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.upInformation.tableData = response.data.result.up
          this.downInformation.tableData = response.data.result.down
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      },
      // 提交创建规则请求
      handleSubmit () {
        this.$refs.newRuleFormValidate.validate(validate => {
            if (validate) {
              if (this.newRuleForm.protocol == 'ALL' || this.newRuleForm.protocol == 'ICMP') {
                this.newRuleForm.startPort = 1
                this.newRuleForm.endPort = 65535
              }
              this.showModal.createRule = false
              let data = {
                acllistitemname: this.newRuleForm.name,
                //itemid: this.newRuleForm.itemid,
                agreement: this.newRuleForm.protocol,
                operation: this.newRuleForm.access == 'Allow' ? '接受' : '拒绝',
                _status: 1
              }
              if (this.newRuleForm.way != 'Egress') {
                this.upInformation.tableData.push(data)
              } else {
                this.downInformation.tableData.push(data)
              }
              //this.loadingMessage = '正在创建规则，请稍候'
              //this.loading = true
              this.$http.get('network/createNetworkACL.do', {
                params: {
                  name: this.newRuleForm.name,
                  way: this.newRuleForm.way,
                  protocol: this.newRuleForm.protocol,
                  //itemid: this.newRuleForm.itemid,
                  cdir: this.newRuleForm.cidr,
                  startport: this.newRuleForm.startPort,
                  endport: this.newRuleForm.endPort,
                  acllistid: sessionStorage.getItem('firewallId'),
                  access: this.newRuleForm.access
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  //this.loading = false
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.$http.get('network/listaclListItem.do', {
                    params: {
                      aclListId: sessionStorage.getItem('firewallId')
                    }
                  }).then(response => {
                    this.setData(response)
                  })
                }
                else {
                  this.$http.get('network/listaclListItem.do', {
                    params: {
                      aclListId: sessionStorage.getItem('firewallId')
                    }
                  }).then(response => {
                    this.setData(response)
                  })
                  //this.loading = false
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          }
        )
      },
      // 删除规则
      del(aclId){
        //this.loadingMessage = '正在删除规则，请稍候'
        //this.loading = true
        this.upInformation.tableData.forEach(item => {
          if (item.id == aclId) {
            this.$set(item, '_status', 2)
          }
        })
        this.downInformation.tableData.forEach(item => {
          if (item.id == aclId) {
            this.$set(item, '_status', 2)
          }
        })
        this.$http.get('network/deleteNetworkACL.do', {
          params: {
            id: aclId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            //this.loading = false
            this.$Message.success({
              content: response.data.message
            })
            this.$http.get('network/listaclListItem.do', {
              params: {
                aclListId: sessionStorage.getItem('firewallId')
              }
            }).then(response => {
              this.setData(response)
            })
          } else {
            this.$http.get('network/listaclListItem.do', {
              params: {
                aclListId: sessionStorage.getItem('firewallId')
              }
            }).then(response => {
              this.setData(response)
            })
            //this.loading = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    watch: {
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.$router.push('/ruicloud/firewall')
        },
        deep: true
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 146px;
    min-height: calc(~'100% - @{diff}');
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
          // font-weight: 600;
          margin-right: 25px;
          font-size: 16px;
          color: #2a99f2;
        }
        .btn {
          border-color: #2A99F2;
          color: #2A99F2;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #2A99F2;
            color: #fff;
          }
        }
        .operator-bar {

        }
        .body {
          min-height: 500px;
          .network-wrapper {
            margin-top: 20px;
            min-height: 50px;
            // background-color: #e9f4fd;
            border-radius: 5px;
            border-radius: 5px;
            padding: 18px 25px;
            border: 1px solid #d8d8d8;
            .arrow {
              display: inline-block;
              margin-right: 5px;
              position: relative;
              width: 13px;
              height: 13px;
              border: solid 1px #2A99F2;
              border-radius: 50%;
              transition: .5s;
              vertical-align: middle;
              cursor: pointer;
              transform: rotate(-45deg);
              -ms-transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
            .arrow:before {
              content: '';
              position: absolute;
              top: 2px;
              left: 4px;
              width: 5px;
              height: 5px;
              border: #2A99F2 solid 1px;
              border-top-style: none;
              border-right-style: none;
            }
            .open {
              transform: rotate(-225deg);
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
