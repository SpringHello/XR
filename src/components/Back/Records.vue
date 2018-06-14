<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 备案</span>
      <div class="content">
        <div class="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yijianxufei"></use>
          </svg>
          <span class="title">备案管理系统</span>
        </div>
        <div class="operator-bar">
          <div class="universal-alert">
            <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
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
              <Button style="margin-bottom:10px;" @click="toEntrance" type="primary">新增备案</Button>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
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
            value: "初审中",
            label: "初审中"
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
              return h("div", params.row.status == '待审核' ? '初审中' : params.row.status == '管局审核中' ? '初审成功' : params.row.status);
            }
          },
          {
            title: "等待操作",
            key: "operation",
            render: (h, params) => {
              const row = params.row;
              const color = row.status == "初审成功" ? "" : "#2A99F2";
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
                            if (row.status == "待审核") {
                              sessionStorage.setItem("newId", row.id);
                              sessionStorage.setItem(
                                "newRecordtype",
                                row.recordType
                              );
                              this.$router.push({path: "newRecordStepFour"});
                            } else if (row.status == "管局审核拒绝" || row.status == "初审拒绝") {
                              this.jumpRecord(row.id, row.webcompany_Id);
                            }
                          }
                        }
                      },
                      row.status == "待审核" ? "上传拍照/邮寄资料" : row.status == '初审拒绝' || row.status == '管局审核拒绝' ? "重新提交资料" : row.status == '初审成功' ? "暂无" : row.status == '管局审核成功' ? '短信核验(特殊区域)' : '暂无'
                    )
                  ]
              );
            }
          },
          {
            title: "操作",
            key: "waitOperation",
            render: (h, params) => {
              const hide = params.row.status == '待审核' || params.row.status == '初审拒绝' ? '' : 'none'
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
                            this.custom(params.row.id);
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
              return h("div", params.row.status == "待审核" ? "确认中" : params.row.status == "取消接入确认" || params.row.status == "注销主体" || params.row.status == "网站确认" || params.row.status == "变更确认" ? "管局审核中" : params.row.status);
            }
          },
          {
            title: "等待操作",
            key: "operation",
            render: (h, params) => {
              const row = params.row;
              const color = row.status == "待审核" || row.status == "管局审核失败" ? "#2A99F2" : "";
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
                            if (row.status == "确认中") {
                              sessionStorage.setItem("newId", row.id);
                              sessionStorage.setItem(
                                "newRecordtype",
                                row.recordType
                              );
                              this.$router.push({path: "CompletedFilingDetails"});
                            }
                          }
                        }
                      },
                      row.status == "待审核" ? "放弃" : row.status == "管局审核失败" ? "联系客服(变更备案错误项目)" : '暂无'
                    )
                  ]
              );
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
        recordTypeData: []
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
        if (userList != null) {
          this.$http
            .get("recode/listMainWeb.do", {
              params: {
                overType: overType,
                recordtype: this.recordType,
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
        if (userList != null) {
          this.$http
            .get("recode/listMainWeb.do", {
              params: {
                recordtype: this.completeRecordType,
                overType: overType,
                status: this.completeState
              }
            })
            .then(res => {
              this.recordTypeData = [];
              if (res.data.status == 1) {
                this.recordTypeData = res.data.result;
                console.log(res.data.result);
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
      custom(id) {
        this.$Modal.confirm({
          title: '是否撤销备案',
          content: '<p>撤销备案此条备案信息会被删除</p>',
          okText: '确定',
          cancelText: '取消',
          onOk: {
            click: () => {
              axios.post('recode/delMainWeb.do', {
                id: id
              }).then(res => {
                if (res.data.status == 1) {
                  this.$Message.success('撤销成功');
                }
              })
            }
          }
        });
      },
      toEntrance() {
        sessionStorage.setItem('back','back')
        this.$router.push('entrance')
      }
    },

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
