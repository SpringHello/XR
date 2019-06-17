<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 备案</span>
      <div class="content">
        <div class="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-yijianxufei"></use>
          </svg>
          <span class="title">备案管理系统</span>
        </div>
        <div class="operator-bar">
          <div class="universal-alert">
            <p>根据《互联网信息服务管理办法》与《非经营性互联网信息服务备案管理办法》规定，开办网站必须先办理网站备案。</p>
          </div>
          <Tabs type="card" :animated='false'>
            <TabPane :label="tabValueCom" style="min-height: 300px;">
              <div style="margin-bottom:20px">
                <div style="display:inline-block">
                  <span style="display:inline-block;margin-right:10px;">备案类型 </span>
                  <Select v-model="recordType" size="small" style="width:231px;" @on-change="listMainWeb(0)">
                    <Option v-for="item in recordTypeCityList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
                <div style="display:inline-block;margin-left:20px">
                  <span style="display:inline-block;margin-right:10px;">当前状态</span>
                  <Select v-model="currentState" size="small" style="width:231px;" @on-change="listMainWeb(0)">
                    <Option v-for="item in currentStateList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
              </div>
              <Button style="margin-bottom:10px;" @click="toEntrance" type="primary" :disabled="recordFlag">新增备案</Button>
              <Table ref="selection" :columns="recordTypeList" :data="recordProgressList"></Table>
            </TabPane>

            <TabPane :label="tabValue" style="min-height: 300px;">
              <div style="margin-bottom:20px;">
                <div style="display:inline-block">
                  <span style="display:inline-block;margin-right:10px;">备案类型 </span>
                  <Select v-model="completeRecordType" size="small" style="width:231px;" @on-change="completeClick(1)">
                    <Option v-for="item in completeTypeCityList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
                <div style="display:inline-block;margin-left:20px">
                  <span style="display:inline-block;margin-right:10px;">当前状态</span>
                  <Select v-model="completeState" size="small" style="width:231px;" @on-change="completeClick(1)">
                    <Option v-for="item in completeStateList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
              </div>
              <Table ref="selection" :columns="completeRecordTypeList" :data="recordTypeData"></Table>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
      <Modal v-model="showModal.beforeDelete" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">是否撤销备案</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="color: rgba(255,57,42,1)">若您是因为资料填写错误而准备撤销，您可以联系客服人员进行备案资料修改。当您确认放弃此次备案之时，再选择撤销备案。
                        请注意，若您撤销备案之时已冻结押金，请您在解冻押金之后在申请撤销备案</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.beforeDelete = false">取消</Button>
        <Button type="primary" :disabled="deleteRecordDisabled" @click="custom">确定{{ deleteRecordText}}</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '../../vuex'
  import axios from 'axios'

  export default {
    data() {
      return {
        showModal:{
          beforeDelete:false
        },
        recordId: '',
        //我的备案进度标签值
        tabValueCom: h => {
          return h("div", [
            h(
              "span",
              {
                on: {
                  click: () => {
                    this.listMainWeb(0);
                  }
                }
              },
              "我的备案进度"
            )
          ]);
        },
        //完成备案的备案类型
        completeRecordType: "",
        //已完成备案标签页的值
        tabValue: h => {
          return h("div", [
            h(
              "span",
              {
                on: {
                  click: () => {
                    this.completeClick(1);
                  }
                }
              },
              "已完成备案"
            )
          ]);
        },
        //备案进度
        recordProgressList: [],
        //备案类型下拉列表数据
        recordTypeCityList: [
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "新增备案",
            label: "新增备案"
          },
          {
            value: "新增接入",
            label: "新增接入"
          },
          {
            value: "取消接入",
            label: "取消接入"
          },
          {
            value: "变更备案",
            label: "变更备案"
          }
        ],
        //备案类型Select值
        recordType: "",
        //当前状态下拉列表数据
        currentStateList: [
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "初审中",
            label: "初审中"
          },
          {
            value: "初审拒绝",
            label: "初审拒绝"
          },
          {
            value: "管局审核中",
            label: "管局审核中"
          },
          {
            value: "管局审核拒绝",
            label: "管局审核拒绝"
          },
          {
            value: "管局审核通过",
            label: "管局审核通过"
          }
        ],
        //已备案完成当前状态
        completeStateList: [
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "管局审核中",
            label: "管局审核中"
          },
          {
            value: "管局审核拒绝",
            label: "管局审核拒绝"
          },
          {
            value: "管局审核成功",
            label: "管局审核成功"
          },
          {
            value: "取消接入成功",
            label: "取消接入成功"
          },
          {
            value: "注销网站成功",
            label: "注销网站成功"
          },
          {
            value: "变更备案成功",
            label: "变更备案成功"
          },
        ],
        //已完成备案备案类型
        completeTypeCityList: [
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "新增备案",
            label: "新增备案"
          },
          {
            value: "新增接入",
            label: "新增接入"
          },
          {
            value: "取消接入",
            label: "取消接入"
          },
          {
            value: "变更备案",
            label: "变更备案"
          }
        ],
        //已完成备案
        completeState: '',
        //当前状态Select值
        currentState: "",
        //备案类型表格表头
        recordTypeList: [
          {
            title: "备案服务ID",
            key: "recordserviceid"
          },
          {
            title: "关联域名",
            key: "webdomian"
          },
          {
            title: "备案类型",
            key: "recordtype"
          },
          {
            title: "备案主体",
            key: "webname"
          },
          {
            title: "最近更新时间",
            key: "lastupdatetime"
          },
          {
            title: "当前状态",
            key: "status",
            render: (h, params) => {
              return h("div", params.row.status == '初审成功' ? '管局审核中' : params.row.status);
            }
          },
          {
            title: "等待操作",
            key: "operation",
            render: (h, params) => {
              const row = params.row;
              const color = row.status == "初审成功" ? "" : "#2A99F2";
              const text = row.status == "初审中" ? "上传拍照/邮寄资料" : row.status == '初审拒绝' || row.status == '管局审核拒绝' ? "重新提交资料" : row.status == '初审成功' ||row.status == '上传成功' ? "等待短信核验" : row.operation == '短信核验' ? '等待短信核验' : row.status == '管局审核成功' ? '暂无' : '暂无'
              return (
                "div",
                  [
                    h("span",
                      {
                        style: {
                          color: color,
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            if (row.status == "初审中") {
                              sessionStorage.setItem("newId", row.id);
                              sessionStorage.setItem(
                                "newRecordtype",
                                row.recordType
                              );
                              this.$router.push({path: "newRecordStepFour"});
                            } else if (row.status == "管局审核拒绝" || row.status == "初审拒绝") {
                              this.jumpRecord(row.id, row.webcompany_Id);
                            } else if (row.status == '初审成功' ||row.status == '上传成功') {
                              window.open('https://www.xrcloud.net/support_docs/qHwTxQKS7_qZhAC3dxb.html')
                            }
                          }
                        }
                      },
                      text
                    )
                  ]
              );
            }
          },
          {
            title: "操作",
            key: "waitOperation",
            render: (h, params) => {
              const hide = params.row.status == '初审中' || params.row.status == '初审拒绝' || params.row.status == '上传' ? '' : 'none'
              return (
                "div",
                  [
                    h(
                      "span",
                      {
                        style: {
                          color: "#2A99F2",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.jumpRecord(params.row.id, params.row.webcompany_Id);
                          }
                        }
                      },
                      '查看详情'
                    ),
                    h(
                      "span",
                      {
                        style: {
                          color: "#2A99F2",
                          cursor: "pointer",
                          display: hide,
                          marginLeft: '5px'
                        },
                        on: {
                          click: () => {
                            window.clearInterval(this.deleteRecordTimer)
                            this.recordId = params.row.id
                            this.deleteRecordDisabled = true
                            this.deleteRecordText = '(5S)'
                            let i = 5
                            this.deleteRecordTimer = setInterval(() => {
                            i -= 1
                            if (i == 0) {
                            window.clearInterval(this.deleteRecordTimer)
                                 this.deleteRecordDisabled = false
                                this.deleteRecordText = ''
                                 } else {
                                this.deleteRecordText = '(0' + i + 'S)'
                                  this.deleteRecordDisabled = true
                                     }
                                }, 1000)
                            this.showModal.beforeDelete = true
                          }
                        }
                      },
                      '撤销备案'
                    )
                  ]
              );
            }
          }
        ],
        //已完成备案表格
        completeRecordTypeList: [
          {
            title: "备案服务ID",
            key: "recordserviceid"
          },
          {
            title: "关联域名",
            key: "webdomian"
          },
          {
            title: "备案类型",
            key: "recordtype"
          },
          {
            title: "备案主体",
            key: "webname"
          },
          {
            title: "最近更新时间",
            key: "lastupdatetime"
          },
          {
            title: "当前状态",
            key: "status",
            render: (h, params) => {
              return h("div", params.row.status == "取消接入确认" || params.row.status == "注销主体确认" || params.row.status == "注销网站确认" || params.row.status == "变更确认" ? "确认中" : params.row.status);
            }
          },
          {
            title: "等待操作",
            key: "operation",
            render: (h, params) => {
              if (params.row.status == "取消接入确认" || params.row.status == "注销主体确认" || params.row.status == "注销网站确认" || params.row.status == "变更确认") {
                return h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      this.updateMainWeb(params.row.id, '备案成功')
                    }
                  }
                }, '放弃')
              } else if (params.row.status == '管局审核失败') {
                return h('span', {}, '联系客服')
              } else {
                return h('span', {}, '暂无')
              }
            }
          },
          {
            title: "操作",
            key: "waitOperation",
            render: (h, params) => {
              return (
                "div",
                  [
                    h(
                      "span",
                      {
                        style: {
                          color: "#2A99F2",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            sessionStorage.setItem("id", params.row.id);
                            sessionStorage.setItem("webcompany_Id", params.row.webcompany_Id);
                            this.$router.push({path: "completedFilingDetails"});
                          }
                        }
                      },
                      "查看详情"
                    )
                  ]
              );
            }
          }
        ],
        //已完成备案表格数据
        recordTypeData: [],
        deleteRecordDisabled: true,
        deleteRecordText:'(5S)',
        deleteRecordTimer:null,
      }
    },
    created() {
      this.listMainWeb(0);
    },
    methods: {
      //备案进度表格
      listMainWeb(overType) {
        let userList = this.$store.state.userInfo;
        if (this.currentState == "全部") {
          this.currentState = "";
        }
        if (this.recordType == '全部') {
          this.recordType = "";
        }
        if (userList != null) {
          this.$http
            .get("recode/listMainWeb.do", {
              params: {
                overType: overType,
                recordType: this.recordType,
                status: this.currentState
              }
            })
            .then(res => {
              if (res.data.status == 1) {
                this.recordProgressList = res.data.result;
                for (let i = 0; i < this.recordProgressList.length; i++) {
                  this.recordProgressList[i].waitOperation = "查看详情";
                }
              } else {
                this.$Message.error(res.data.message);
              }
            });
        }
      },
      //已完成备案数据获取点击事件
      completeClick(overType) {
        let userList = this.$store.state.userInfo;
        if (this.completeState == "全部") {
          this.completeState = "";
        }
        this.completeRecordType == "全部" ? "" : this.completeRecordType;
        if (userList != null) {
          this.$http
            .get("recode/listMainWeb.do", {
              params: {
                recordType: this.completeRecordType,
                overType: overType,
                status: this.completeState
              }
            })
            .then(res => {
              this.recordTypeData = [];
              if (res.data.status == 1) {
                this.recordTypeData = res.data.result;
                for (let i = 0; i < this.recordTypeData.length; i++) {
                  this.recordTypeData[i].waitOperation = "查看详情";
                }
              }
            });
        }
      },
      //跳转详情页面
      jumpRecord(id, webcompany_Id) {
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("webcompany_Id", webcompany_Id);
        this.$router.push({path: "RecordDetails"});
      },
      custom() {
        this.showModal.beforeDelete = false
          axios.post('recode/updateMainWeb.do', {
              id: this.recordId,
              status: '撤销备案'
            }).then(res => {
              if (res.data.status == 1) {
                this.$Message.success('您的申请提交成功');
                this.listMainWeb(0);
              } else {
                this.$message.info({
                  content:res.data.message
                });
              }
            })
      },
      toEntrance() {
        sessionStorage.setItem('back', 'back')
        this.$router.push('/icp/')
      },
      updateMainWeb(id, status) {
        this.domain = false;
        axios.post('recode/updateMainWeb.do', {
          id: id,
          status: status
        }).then(res => {
          if (res.data.status == 1) {
            this.$Message.success('提交成功');
            this.completeClick(1);
          } else {
            this.$Message.info(res.data.message)
          }
        })
      },
    },
    computed: {
      recordFlag() {
        return this.recordProgressList.length != 0
      }
    }
  }

</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    @diff: 104px;
    // min-height: calc(~"100% - @{diff}");
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        height: 844px;
        > .header {
          > .title {
            line-height: 40px;
            display: inline-block;
            vertical-align: top;
            margin-left: 5px;
            font-family: Microsoft YaHei-Bold;
            font-size: 24px;
            color: rgba(17, 17, 17, 0.75);
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
