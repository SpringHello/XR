<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>VPN</span>
      </span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/network/vpn-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">VPN</span>
          <button id="refresh_button" @click="$router.go(0)">刷新</button>
        </div>
        <div class="universal-alert">
          <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
        </div>

        <Tabs type="card" :animated="false" v-model="pane">
          <TabPane label="远程接入" name="remote">
            <div class="operator-bar">
              <Button type="primary" @click="newRemoteAccess">创建VPN接入点</Button>
              <Button type="primary" @click="delRemoteAccess">挂断VPN接入</Button>
              <Table :columns="remoteVpnColumns" :data="remoteVpnData" @radio-change="remoteRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
          <TabPane label="隧道VPN" name="VPN">
            <div class="operator-bar">
              <Button type="primary" @click="newTunnelVpn">创建隧道</Button>
              <!--<Button type="primary">重启隧道</Button>-->
              <Button type="primary" @click="delTunnelVpn">删除隧道</Button>
              <Table :columns="tunnelVpnColumns" :data="tunnelVpnData" @radio-change="tunnelRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 新建vpn接入点 modal -->
    <Modal v-model="showModal.newRemoteAccess" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新增VPN接入点</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newRemoteAccessForm" :rules="newRemoteAccessFormValidate" ref="newRemoteAccessFormValidate">
          <FormItem label="接入点名称" prop="vpnName">
            <Input v-model="newRemoteAccessForm.vpnName" placeholder="请输入接入点名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpcId">
            <Select v-model="newRemoteAccessForm.vpcId">
              <Option v-for="item in newRemoteAccessForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="newRemoteAccessForm.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="newRemoteAccessForm.password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="newRemoteAccessOk">完成配置</Button>
      </div>
    </Modal>

    <!-- 新建vpn隧道 modal -->
    <Modal v-model="showModal.newTunnelVpn" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建隧道</span>
      </p>
      <Steps :current="newTunnelVpnForm.step" size="small">
        <Step title="创建本地网关"></Step>
        <Step title="创建客户网关"></Step>
        <Step title="创建连接"></Step>
      </Steps>
      <div class="universal-modal-content-flex">
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate0">
          <FormItem label="源VPC" prop="vpcId1" v-show="newTunnelVpnForm.step==0">
            <Select v-model="newTunnelVpnForm.vpcId1">
              <Option v-for="item in newTunnelVpnForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=newTunnelVpnForm.vpcId2">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标VPC" prop="vpcId2" v-show="newTunnelVpnForm.step==0">
            <Select v-model="newTunnelVpnForm.vpcId2">
              <Option v-for="item in newTunnelVpnForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=newTunnelVpnForm.vpcId1">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate1">
          <FormItem label="名称" v-if="newTunnelVpnForm.step==1" prop="name1">
            <Input v-model="newTunnelVpnForm.name1" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <FormItem label="名称" v-if="newTunnelVpnForm.step==1" prop="name2">
            <Input v-model="newTunnelVpnForm.name2" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <!--<FormItem label="目的IP地址" v-if="newTunnelVpnForm.step==1" prop="ip">
            <Input v-model="newTunnelVpnForm.IP" placeholder="例如10.132.31.27"></Input>
          </FormItem>
          <FormItem label="网关" v-if="newTunnelVpnForm.step==1" prop="gateway">
            <Input v-model="newTunnelVpnForm.gateway" placeholder="例如192.168.0.0"></Input>
          </FormItem>
          <FormItem label="目的网络CIDR" v-if="newTunnelVpnForm.step==1" prop="cidr">
            <Input v-model="newTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16"></Input>
          </FormItem>-->
          <FormItem label="域共享密钥" v-if="newTunnelVpnForm.step==1" prop="key">
            <Input v-model="newTunnelVpnForm.key" placeholder="请输入0-128字节密码"></Input>
          </FormItem>
        </Form>
        <span style="display: inline-block;color:#2A99F2;cursor:pointer" @click="newTunnelVpnForm.showDetail=true"
              v-show="!newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            高级选项&nbsp;
          </span>
        <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer"
              @click="newTunnelVpnForm.showDetail=false"
              v-show="newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            隐藏高级选项
          </span>

        <!--高级选项FormItem-->
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="IKE加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKE">
              <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESP">
              <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKEHash">
              <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESPHash">
              <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>

        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="连接方式" v-if="newTunnelVpnForm.step==2" prop="password">
            <Select v-model="newTunnelVpnForm.connType">
              <Option v-for="item in newTunnelVpnForm.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="newRemoteAccessOk" v-if="newTunnelVpnForm.step==0">取消</Button>
        <Button @click="newTunnelVpnForm.step--" v-if="newTunnelVpnForm.step!=0">上一步</Button>
        <Button type="primary" @click="nextStep" v-if="newTunnelVpnForm.step!=2">下一步</Button>
        <Button type="primary" @click="newTunnelVpnOk" v-if="newTunnelVpnForm.step==2">完成</Button>
      </div>
    </Modal>

    <!-- 接入点用户管理 modal -->
    <Modal v-model="showModal.userManage" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">接入点用户管理</span>
      </p>
      <div>
        <p style="color: rgba(17,17,17,0.65);margin-bottom: 20px">您在对接入点进行用户管理</p>
        <div>
          <p v-for="(item,index) in userList" :key="item"
             style="display: flex;font-size: 12px;color: rgba(17,17,17,0.65);margin-bottom: 20px">
            <span style="width:60%">{{item.name||item}}</span>
            <span style="width:30%">用户密码：**********</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==1">创建中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==2">删除中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-else
                  @click="delUser(item,index)">删除</span>
          </p>
        </div>
        <div class="universal-modal-content-flex">
          <Form :model="addUserForm" :rules="addUserFormValidate" ref="addUserFormValidate">
            <FormItem label="用户名称" prop="userName">
              <Input v-model="addUserForm.userName" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="addUserForm.password" placeholder="请输入密码"></Input>
            </FormItem>
          </Form>
          <Button type="primary" style="float:right" @click="addUser">添加用户</Button>
          <div style="clear: both"></div>
        </div>
        <p style="color:#999999">提示：若您忘记用户密码，可删除该账户并重新添加新的用户名与密码。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary">完成配置</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '@/vuex'
  export default{
    beforeRouteEnter(from, to, next){
      // 远程接入列表
      var remote = axios.get('network/listRemoteVpn.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      // 隧道VPN
      var customer = axios.get('network/listVpnCustomerGateways.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([remote, customer]).then(values => {
        next(vm => {
          vm.initRemoteData(values[0])
          vm.initCustomerData(values[1])
        })
      })
    },
    data(){
      var pane = sessionStorage.getItem('pane') || 'remote'
      sessionStorage.removeItem('pane')
      return {
        pane,
        showModal: {
          // 远程VPN
          newRemoteAccess: false,
          // 隧道VPN
          newTunnelVpn: false,
          // 接入点用户管理
          userManage: false
        },
        // 新建vpc接入点表单
        newRemoteAccessForm: {
          userName: '',
          password: '',
          vpcId: '',
          vpcIdOptions: [],
          vpnName: ''
        },
        newRemoteAccessFormValidate: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          vpcId: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpnName: [
            {required: true, message: '请输入VPN名称', trigger: 'blur'}
          ],
        },
        // 新建隧道VPN表单
        newTunnelVpnForm: {
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP: '',
          gateway: '',
          CIDR: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '主动 ----> 被动', key: 'true'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          showDetail: false,
          step: 0
        },
        newTunnelVpnFormValidate: {
          vpcId1: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpcId2: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          name1: [
            {required: true, message: '请输入隧道名称', trigger: 'blur'}
          ],
          name2: [
            {required: true, message: '请输入隧道名称', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '请输入共享域密码', trigger: 'blur'}
          ],
        },
        // 远程vpn列表
        remoteVpnColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: 'VPN',
            align: 'center',
            key: 'vpcname'
          },
          {
            title: '域共享密钥',
            align: 'center',
            key: 'ipseckey'
          },
          {
            title: '弹性IP地址',
            align: 'center',
            key: 'publicip'
          },
          {
            title: '用户一名称',
            align: 'center',
            render: (h, object) => {
              if (object.row.sourcenatip) {
                return h('div', [h('span', {
                  style: {
                    marginRight: '10px'
                  }
                }, object.row.sourcenatip), h('Icon', {
                  attrs: {
                    type: 'close'
                  },
                  style: {
                    cursor: 'pointer'
                  },
                  nativeOn: {
                    click: () => {
                      this.$Modal.confirm({
                        render: (h) => {
                          return h('p', {
                            class: 'modal-content-s'
                          }, [h('i', {
                            class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                            style: {
                              color: '#f90'
                            }
                          }), '确认解绑该弹性IP?'])
                        },
                        title: '解绑弹性IP',
                        scrollable: true,
                        okText: '确定解绑',
                        cancelText: '取消',
                        'onOk': () => {
                          var url = 'network/unboundElasticIP.do'
                          this.$http.get(url, {
                            params: {
                              natGatewayId: object.row.id
                            }
                          }).then(response => {
                            if (response.status == 200 && response.data.status == 1) {
                              delete object.row.sourcenatip
                            }
                          })
                        }
                      })
                    }
                  }
                }, '')])
              } else {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      // 绑定sourceNat
                      this.bindIP(object.row)
                    }
                  }
                }, '绑定弹性IP')
              }
            }
          },
          {
            title: '用户二名称',
            align: 'center',
            render: (h, object) => {
              var renderArray = []
              if (object.row.prottransip) {
                var prottransipArray = object.row.prottransip.split(',')
                for (var item of prottransipArray) {
                  renderArray.push(h('div', [h('span', {
                    style: {
                      marginRight: '10px'
                    }
                  }, item), h('Icon', {
                    attrs: {
                      type: 'close'
                    },
                    style: {
                      cursor: 'pointer'
                    },
                    nativeOn: {
                      click: () => {
                        console.log('click')
                        this.$Modal.confirm({
                          render: (h) => {
                            return h('p', {
                              class: 'modal-content-s'
                            }, [h('i', {
                              class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                              style: {
                                color: '#f90'
                              }
                            }), '确认解绑该弹性IP?'])
                          },
                          title: '解绑弹性IP',
                          scrollable: true,
                          okText: '确定解绑',
                          cancelText: '取消',
                          'onOk': () => {
                            var url = `network/delNatGateway.do?natGatewayId=${this.select.id}`
                            axios.get(url).then(response => {
                              console.log(response)
                            })
                          }
                        })
                      }
                    }
                  }, '')]))
                }
              }
              renderArray.push(h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.showModal.bindIP = true
                  }
                }
              }, '绑定弹性IP'))
              return h('div', renderArray)
            }
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createtime'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, object) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.current = object.row.id
                    this.listUser()
                    this.showModal.userManage = true
                  }
                }
              }, '管理用户')
            }
          }
        ],
        remoteVpnData: [],
        // 隧道vpn
        tunnelVpnColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: 'VPN',
            align: 'center',
            key: 'vpnCustomerName1'
          },
          {
            title: 'VPC',
            align: 'center',
            key: 'vpcName1'
            /*      render: (h, params) => {
             var status = params.row.status == 1 ? '正常' : '异常'
             return h('span', {}, status)
             }*/
          },
          {
            title: '本地IP地址',
            align: 'center',
            key: 'destinationipaddress1',
            /*            render: (h, params) => {
             return h('span', {
             style: {
             color: '#2A99F2',
             cursor: 'pointer'
             },
             on: {
             click: this.gotoVpc(params.row.id)
             },
             }, params.row.vpcname)
             }*/
          },
          {
            title: '目的IP地址',
            align: 'center',
            render: (h, object) => {
              if (object.row.sourcenatip) {
                return h('div', [h('span', {
                  style: {
                    marginRight: '10px'
                  }
                }, object.row.sourcenatip), h('Icon', {
                  attrs: {
                    type: 'close'
                  },
                  style: {
                    cursor: 'pointer'
                  },
                  nativeOn: {
                    click: () => {
                      this.$Modal.confirm({
                        render: (h) => {
                          return h('p', {
                            class: 'modal-content-s'
                          }, [h('i', {
                            class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                            style: {
                              color: '#f90'
                            }
                          }), '确认解绑该弹性IP?'])
                        },
                        title: '解绑弹性IP',
                        scrollable: true,
                        okText: '确定解绑',
                        cancelText: '取消',
                        'onOk': () => {
                          var url = 'network/unboundElasticIP.do'
                          this.$http.get(url, {
                            params: {
                              natGatewayId: object.row.id
                            }
                          }).then(response => {
                            if (response.status == 200 && response.data.status == 1) {
                              delete object.row.sourcenatip
                            }
                          })
                        }
                      })
                    }
                  }
                }, '')])
              } else {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      // 绑定sourceNat
                      this.bindIP(object.row)
                    }
                  }
                }, '绑定弹性IP')
              }
            }
          },
          {
            title: '目的网络CIDR',
            align: 'center',
            render: (h, object) => {
              var renderArray = []
              if (object.row.prottransip) {
                var prottransipArray = object.row.prottransip.split(',')
                for (var item of prottransipArray) {
                  renderArray.push(h('div', [h('span', {
                    style: {
                      marginRight: '10px'
                    }
                  }, item), h('Icon', {
                    attrs: {
                      type: 'close'
                    },
                    style: {
                      cursor: 'pointer'
                    },
                    nativeOn: {
                      click: () => {
                        console.log('click')
                        this.$Modal.confirm({
                          render: (h) => {
                            return h('p', {
                              class: 'modal-content-s'
                            }, [h('i', {
                              class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                              style: {
                                color: '#f90'
                              }
                            }), '确认解绑该弹性IP?'])
                          },
                          title: '解绑弹性IP',
                          scrollable: true,
                          okText: '确定解绑',
                          cancelText: '取消',
                          'onOk': () => {
                            var url = `network/delNatGateway.do?natGatewayId=${this.select.id}`
                            axios.get(url).then(response => {
                              console.log(response)
                            })
                          }
                        })
                      }
                    }
                  }, '')]))
                }
              }
              renderArray.push(h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.showModal.bindIP = true
                  }
                }
              }, '绑定弹性IP'))
              return h('div', renderArray)
            }
          },
          {
            title: '状态',
            align: 'center',
            render: (h, object) => {
              var renderArray = []
              if (object.row.prottransip) {
                var prottransipArray = object.row.prottransip.split(',')
                for (var item of prottransipArray) {
                  renderArray.push(h('div', [h('span', {
                    style: {
                      marginRight: '10px'
                    }
                  }, item), h('Icon', {
                    attrs: {
                      type: 'close'
                    },
                    style: {
                      cursor: 'pointer'
                    },
                    nativeOn: {
                      click: () => {
                        console.log('click')
                        this.$Modal.confirm({
                          render: (h) => {
                            return h('p', {
                              class: 'modal-content-s'
                            }, [h('i', {
                              class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                              style: {
                                color: '#f90'
                              }
                            }), '确认解绑该弹性IP?'])
                          },
                          title: '解绑弹性IP',
                          scrollable: true,
                          okText: '确定解绑',
                          cancelText: '取消',
                          'onOk': () => {
                            var url = `network/delNatGateway.do?natGatewayId=${this.select.id}`
                            axios.get(url).then(response => {
                              console.log(response)
                            })
                          }
                        })
                      }
                    }
                  }, '')]))
                }
              }
              renderArray.push(h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.showModal.bindIP = true
                  }
                }
              }, '绑定弹性IP'))
              return h('div', renderArray)
            }
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createtime2'
          }
        ],
        tunnelVpnData: [],
        // 管理用户列表
        userList: [],
        // 远程VPN id
        current: null,
        // 添加用户Form表单
        addUserForm: {
          userName: '',
          password: '',
        },
        addUserFormValidate: {
          userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        // 当前选中远程接入
        currentRemote: null,
        currentTunnel: null,

      }
    },
    methods: {
      // 切换地区重新获取数据
      refresh () {
        // 远程接入列表
        var remote = axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        })
        // 隧道VPN
        var customer = axios.get('network/listVpnCustomerGateways.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        })
        Promise.all([remote, customer]).then(values => {
          this.initRemoteData(values[0])
          this.initCustomerData(values[1])
        })
      },
      initRemoteData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.remoteVpnData = response.data.result
        }
      },
      initCustomerData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.tunnelVpnData = response.data.result
        }
      },
      // 打开远程接入modal
      newRemoteAccess(){
        this.showModal.newRemoteAccess = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newRemoteAccessForm.vpcIdOptions = response.data.result
        })
      },
      // 提交远程接入请求
      newRemoteAccessOk(){
        this.$refs.newRemoteAccessFormValidate.validate(validate => {
          if (validate) {
            this.$http.get('network/createRemoteAccessVpn.do', {
              params: {
                remoteVpnName: this.newRemoteAccessForm.vpnName,
                vpcId: this.newRemoteAccessForm.vpcId,
                userName: this.newRemoteAccessForm.userName,
                password: this.newRemoteAccessForm.password
              }
            }).then(response => {
              this.showModal.newRemoteAccess = false
              this.refresh()
              if (response.status == 200 && response.data.status == 2) {
                this.refresh()
                this.$message.error({
                  content: response.data.message
                })
              }
            })
          }
        })
        this.showModal.newTunnelVpn = false

      },
      // 打开创建隧道VPN modal
      newTunnelVpn(){
        this.showModal.newTunnelVpn = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newTunnelVpnForm.vpcIdOptions = response.data.result
        })
      },
      nextStep(){
        this.$refs[`newTunnelVpnFormValidate${this.newTunnelVpnForm.step}`].validate(validate => {
          console.log(validate)
          if (validate) {
            this.newTunnelVpnForm.step++
          }
        })
      },
      // 提交新建VPN隧道请求
      newTunnelVpnOk(){
        this.showModal.newTunnelVpn = false
        this.newTunnelVpnForm.step = 0
        this.newTunnelVpnForm.showDetail = false
        this.$http.get('network/createTunnelVpnNew.do', {
          params: {
            sourceVpcId: this.newTunnelVpnForm.vpcId1, // 源vpcid   目标vpcid
            targetVpcId: this.newTunnelVpnForm.vpcId2, // 源vpcid   目标vpcid
            nameOne: this.newTunnelVpnForm.name1, // 源vpcid   目标vpcid  名称1
            nameTwo: this.newTunnelVpnForm.name2, // 源vpcid   目标vpcid
            ipsecKey: this.newTunnelVpnForm.key,
            ikeEncryption: this.newTunnelVpnForm.IKE,
            ikeHash: this.newTunnelVpnForm.IKEHash,
            // ikeDH: '',
            espEncryption: this.newTunnelVpnForm.ESP,
            espHash: this.newTunnelVpnForm.ESPHash,
            passive: this.newTunnelVpnForm.connType
          }
        }).then(response => {
          this.refresh()
          if (response.status == 200 && response.data.status == 2) {
            this.refresh()
            this.$message.error({
              content: response.data.message
            })
          }
        })
        /*this.$http.get('network/createTunnelVpn.do', {
         params: {
         vpcId: this.newTunnelVpnForm.vpcId,
         name: this.newTunnelVpnForm.name,
         cidr: this.newTunnelVpnForm.CIDR,
         ipsecKey: this.newTunnelVpnForm.key,
         ikeEncryption: this.newTunnelVpnForm.IKE,
         ikeHash: this.newTunnelVpnForm.IKEHash,
         // ikeDH: '',
         gateway: this.newTunnelVpnForm.gateway,
         espEncryption: this.newTunnelVpnForm.ESP,
         espHash: this.newTunnelVpnForm.ESPHash,
         destinationIpAddress: this.newTunnelVpnForm.IP,
         passive: this.newTunnelVpnForm.connType
         }
         }).then(response => {
         if (response.status == 200 && response.data.status == 2) {
         this.$message.error({
         content: response.data.message
         })
         }
         })*/
      },
      // 选中远程接入
      remoteRadio(current){
        this.currentRemote = current
      },
      // 选中隧道VPN
      tunnelRadio(current){
        this.currentTunnel = current
      },
      // 挂断VPN接入
      delRemoteAccess(){
        if (this.currentRemote == null) {
          this.$message.info({
            content: '请选择要挂断的远程VPN接入'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该远程VPN接入吗',
            onOk: () => {
              this.$http.get('network/deleteRemoteAccessVpn.do', {
                params: {
                  id: this.currentRemote.id
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.refresh()
                } else {
                  this.$message.error({
                    content: response.data.message
                  })
                  this.refresh()
                }
              })
            }
          })
        }
      },
      // 删除隧道VPN
      delTunnelVpn(){
        if (this.currentTunnel == null) {
          this.$Message.info({
            content: '请选择要删除的隧道VPN'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该隧道VPN吗',
            onOk: () => {
              console.log(this.currentTunnel)
              this.$http.get(`network/deleteTunnelVpn.do?id=${this.currentTunnel.id}`).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.refresh()
                } else {
                  this.$message.error({
                    content: response.data.message
                  })
                  this.refresh()
                }
              })
            }
          })
        }
      },
      // 列出所有用户
      listUser(){
        this.$http.get('network/listVpnUsers.do', {
          params: {
            remoteVpnId: this.current
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.userList = response.data.result
          }
        })
      },
      // 用户管理添加用户
      addUser(){
        this.$refs.addUserFormValidate.validate(validate => {
          if (validate) {
            // status   1：创建中  2：删除中
            this.userList.push({name: this.addUserForm.userName, status: 1})
            this.$http.get('network/addVpnUser.do', {
              params: {
                userName: this.addUserForm.userName,
                password: this.addUserForm.password,
                remoteVpnId: this.current,
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.listUser()
              } else {
                this.listUser()
                this.$Message.error(response.data.message)
              }
            })
            this.addUserForm.userName = ''
            this.addUserForm.password = ''
          }
        })
      },
      // 删除用户
      delUser(userName, index){
        this.userList.splice(index, 1, {
          name: userName,
          status: 2
        })
        this.$http.get('network/removeVpnUser.do', {
          params: {
            userName,
            remoteVpnId: this.current
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.listUser()
          } else {
            this.listUser()
            this.$Message.error(response.data.message)
          }
        })
      }
    },
    watch: {
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
