<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云主机</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云主机是一台配置好了的服务器，它有您期望的硬件配置、操作系统和网络配置。XRcloud为您提供的云主机具有安全、弹性、高性能等特点。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary">+ 创建</Button>
          <Button type="primary" :disabled="true">关机</Button>
          <Button type="primary">开机</Button>
          <Button type="primary">重启</Button>
          <Button type="primary">删除</Button>
          <Dropdown style="margin-left: 10px;vertical-align: middle;" @on-click="hideEvent" class="moreOperation">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <!-- 加入负载均衡 -->
              <Dropdown-item name="backup">加入负载均衡</Dropdown-item>
              <!-- 绑定ip-->
              <Dropdown-item name="backup">绑定IP</Dropdown-item>
              <!-- 重命名 -->
              <Dropdown-item name="rename">重命名</Dropdown-item>
              <!--资费变更 -->
              <Dropdown-item name="ratesChange">资费变更</Dropdown-item>
              <!-- 续费 -->
              <Dropdown-item name="renewal">主机续费</Dropdown-item>
              <!-- 备份 -->
              <Dropdown-item name="backup">制作快照</Dropdown-item>
              <!-- 镜像 -->
              <Dropdown-item name="mirror">制作镜像</Dropdown-item>
              <!-- 解绑公网IP-->
              <Dropdown-item name="mirror">解绑公网IP</Dropdown-item>
              <!-- 升级 -->
              <Dropdown-item name="upgrade">
                主机升级<span
                style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>
              </Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <Table :columns="hostListColumns" :data="hostListData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="hostPages" :current="currentPage" :page-size="5"></Page>
          </div>
        </div>
      </div>
    </div>

    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择认证方式
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
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
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        showModal: {
          selectAuthType: false
        },
        hostListColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名称/唯一名称',
            ellipsis: true,
            render: (h, params) => {
              let text_1 = params.row.companyname ? params.row.companyname : '----'
              let text_2 = params.row.computername ? params.row.computername : '----'
              return h('ul', {}, [
                h('li', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      alert('跳转管理页面')
                    }
                  }
                }, text_1 + ' / '),
                h('li', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      alert('跳转管理页面')
                    }
                  }
                }, text_2)
              ])
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              let restart = params.row.restart ? params.row.restart : 0
              let icon_1 = require('../../assets/img/host/h-icon1.png')
              let icon_2 = require('../../assets/img/host/h-icon2.png')
              let icon_3 = require('../../assets/img/host/h-icon3.png')
              let icon_4 = require('../../assets/img/host/h-icon4.png')
              let styleInfo = {
                marginLeft: '5px',
                lineHeight: '16px'
              }
              if (restart == 1) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {style: styleInfo}, '重启中')])
              } else {
                switch (params.row.status) {
                  case -1:
                    return h('div', {
                      style: {
                        display: 'flex'
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src: icon_2
                        }
                      }, ''),
                      h('span', {
                        style: styleInfo
                      }, '异常')
                    ])
                    break
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
                    ])
                    break
                  case 1:
                    if (params.row.computerstate == 1) {
                      return h('div', {
                        style: {
                          display: 'flex'
                        }
                      }, [
                        h('img', {
                          attrs: {
                            src: icon_1
                          }
                        }, ''),
                        h('span', {
                          style: styleInfo
                        }, '开启')
                      ])
                    } else {
                      return h('div', {
                        style: {
                          display: 'flex'
                        }
                      }, [
                        h('img', {
                          attrs: {
                            src: icon_4
                          }
                        }, ''),
                        h('span', {
                          style: styleInfo
                        }, '关机')
                      ])
                    }
                    break
                  case 2:
                    if (params.row.computerstate == 0) {
                      return h('div', {}, [h('Spin', {
                        style: {
                          display: 'inline-block'
                        }
                      }), h('span', {style: styleInfo}, '开机中')])
                    } else {
                      return h('div', {}, [h('Spin', {
                        style: {
                          display: 'inline-block'
                        }
                      }), h('span', {style: styleInfo}, '关机中')])
                    }
                    break
                }
              }
            }
          },
          {
            title: '主机配置',
            key: 'serviceoffername'
          },
          {
            title: '镜像系统',
            key: 'templatename',
            render: (h, params) => {
              let templateName = params.row.templatename.substr(0, 1).toUpperCase() // 用第一个字符判断镜像选用图标
              let icon_1 = require('../../assets/img/host/h-icon5.png')
              let icon_2 = require('../../assets/img/host/h-icon6.png')
              let icon_3 = require('../../assets/img/host/h-icon7.png')
              let icon_4 = require('../../assets/img/host/h-icon8.png')
              let imgStyle = {
                height: '16px',
                width: '16px',
                marginTop: '10px',
                marginRight: '5px'
              }
              switch (templateName) {
                case 'W':
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_1
                      },
                      style:imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'C':
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_2
                      },
                      style:imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'U':
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_3
                      },
                      style:imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                  break
                case 'D':
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: icon_4
                      },
                      style:imgStyle
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
            title: 'IP地址',
            ellipsis: true,
            render: (h, params) => {
              let text_1 = params.row.publicip ? params.row.publicip + '（公）' : '----'
              let text_2 = params.row.privateip ? params.row.privateip + '（内）' : '----'
              return h('ul', {}, [
                h('li', {}, text_1),
                h('li', {}, text_2)
              ])
            }
          },
          {
            title: '创建时间/到期时间',
            ellipsis: true,
            render: (h, params) => {
              let text_1 = params.row.createtime ? params.row.createtime + ' / ' : '----'
              let text_2 = params.row.endtime ? params.row.endtime : '----'
              return h('ul', {}, [
                h('li', {}, text_1),
                h('li', {}, text_2)
              ])
            }
          },
          {
            title: '计费类型',
            key: 'caseType',
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
            filterMethod(value, row) {
              if (value === 1) {
                return row.caseType == '1';
              } else if (value === 2) {
                return row.caseType == '2';
              } else if (value === 3) {
                return row.caseType == '3';
              } else if (value === 4) {
                return row.caseType == '4';
              }
            },
            render: (h, params) => {
              let text = params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : params.row.caseType == 3 ? '实时' : '七天'
              return h('span', {}, text)
            }
          },
          {
            title: '操作',
            key: 'name'
          },
        ],
        hostListData: [
          {
            activitynumber: 22,
            caseType: 2,
            companyid: "154234768276",
            companyname: "冷红憬",
            computername: "免费试用主机",
            computertype: "1",
            connectpassword: "",
            connecturl: "",
            connecturlnew: "",
            cpCase: 60,
            createtime: "2018-12-21 16:37:37",
            disksize: 0,
            endtime: "2019-01-21 16:37:37",
            id: 1677617,
            instancename: "i-2-2287-VM",
            isautorenew: 0,
            isfreevm: "1",
            loginname: "administrator",
            owndiskofferid: "d3cd9e1e-d803-426c-93de-3b7b6ed359ae",
            privateip: "192.168.0.34",
            rootdisksize: 40,
            serviceofferid: "034f9e0c-e9b1-4696-a5cf-5c7ed1354f3b",
            serviceoffername: "1核+1Ghz+2GMemory",
            status: 2,
            computerstate: 1,
            templateid: "9833e9b8-8c1d-4571-97ad-189ad13c5f09",
            templatename: "cindows-2008-datacenter-64bit",
            vpcid: "54cbfa78-8a07-499e-baa3-55bec860214c",
            vpcname: "默认VPC",
            zoneid: "ac7d0827-a47e-452b-a1fb-67f5a45d0ebc",
            zonename: "华中二区1",
          }, {
            activitynumber: 22,
            caseType: 2,
            companyid: "154234768276",
            companyname: "冷红憬",
            computername: "免费试用主机",
            computertype: "1",
            connectpassword: "",
            connecturl: "",
            connecturlnew: "",
            cpCase: 60,
            createtime: "2018-12-21 16:37:37",
            disksize: 0,
            endtime: "2019-01-21 16:37:37",
            id: 1677617,
            instancename: "i-2-2287-VM",
            isautorenew: 0,
            isfreevm: "1",
            loginname: "administrator",
            owndiskofferid: "d3cd9e1e-d803-426c-93de-3b7b6ed359ae",
            privateip: "192.168.0.34",
            rootdisksize: 40,
            serviceofferid: "034f9e0c-e9b1-4696-a5cf-5c7ed1354f3b",
            serviceoffername: "1核+1Ghz+2GMemory",
            status: 2,
            computerstate: 0,
            templateid: "9833e9b8-8c1d-4571-97ad-189ad13c5f09",
            templatename: "dindows-2008-datacenter-64bit",
            vpcid: "54cbfa78-8a07-499e-baa3-55bec860214c",
            vpcname: "默认VPC",
            zoneid: "ac7d0827-a47e-452b-a1fb-67f5a45d0ebc",
            zonename: "华中二区1",
          }, {
            activitynumber: 22,
            caseType: 2,
            companyid: "154234768276",
            companyname: "冷红憬",
            computername: "免费试用主机",
            computertype: "1",
            connectpassword: "",
            connecturl: "",
            connecturlnew: "",
            cpCase: 60,
            createtime: "2018-12-21 16:37:37",
            disksize: 0,
            endtime: "2019-01-21 16:37:37",
            id: 1677617,
            instancename: "i-2-2287-VM",
            isautorenew: 0,
            isfreevm: "1",
            loginname: "administrator",
            owndiskofferid: "d3cd9e1e-d803-426c-93de-3b7b6ed359ae",
            privateip: "192.168.0.34",
            rootdisksize: 40,
            serviceofferid: "034f9e0c-e9b1-4696-a5cf-5c7ed1354f3b",
            serviceoffername: "1核+1Ghz+2GMemory",
            status: -1,
            templateid: "9833e9b8-8c1d-4571-97ad-189ad13c5f09",
            templatename: "uindows-2008-datacenter-64bit",
            vpcid: "54cbfa78-8a07-499e-baa3-55bec860214c",
            vpcname: "默认VPC",
            zoneid: "ac7d0827-a47e-452b-a1fb-67f5a45d0ebc",
            zonename: "华中二区1",
          }, {
            activitynumber: 22,
            caseType: 2,
            companyid: "154234768276",
            companyname: "冷红憬",
            computername: "免费试用主机",
            computertype: "1",
            connectpassword: "",
            connecturl: "",
            connecturlnew: "",
            cpCase: 60,
            createtime: "2018-12-21 16:37:37",
            disksize: 0,
            endtime: "2019-01-21 16:37:37",
            id: 1677617,
            instancename: "i-2-2287-VM",
            isautorenew: 0,
            isfreevm: "1",
            loginname: "administrator",
            owndiskofferid: "d3cd9e1e-d803-426c-93de-3b7b6ed359ae",
            privateip: "192.168.0.34",
            rootdisksize: 40,
            serviceofferid: "034f9e0c-e9b1-4696-a5cf-5c7ed1354f3b",
            serviceoffername: "1核+1Ghz+2GMemory",
            status: 0,
            templateid: "9833e9b8-8c1d-4571-97ad-189ad13c5f09",
            templatename: "windows-2008-datacenter-64bit",
            vpcid: "54cbfa78-8a07-499e-baa3-55bec860214c",
            vpcname: "默认VPC",
            zoneid: "ac7d0827-a47e-452b-a1fb-67f5a45d0ebc",
            zonename: "华中二区1",
          }],
        hostPages: 5,
        currentPage: 1
      }
    },
    created() {
      // 用户未认证，弹出认证提示框
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true
      }
      this.getHostList()
    },
    methods: {
      hideEvent(name) {
        console.log(name)
      },
      getHostList() {
        let url = 'information/listVirtualMachines.do'
        this.$http.get(url, {
          params: {
            returnList: '1',
            page: this.currentPage,
            pageSize: '5'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            // this.hostListData = res.data.result.data
            this.hostPages = res.data.total
          }
        })
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

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

</style>
