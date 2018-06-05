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
            <TabPane :label="tabValueCom">
              <div style="margin-bottom:20px">
                <div style="display:inline-block">
                  <span style="display:inline-block;margin-right:10px;">备案类型 </span>
                  <Select v-model="recordType" size="small" style="width:231px;" @on-change="listMainWeb()">
                    <Option v-for="item in recordTypeCityList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
                <div style="display:inline-block;margin-left:20px">
                  <span style="display:inline-block;margin-right:10px;">当前状态</span>
                  <Select v-model="currentState" size="small" style="width:231px;" @on-change="listMainWeb()">
                    <Option v-for="item in currentStateList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
              </div>
              <router-link to="entrance">
                <Button style="margin-bottom:10px;" type="primary">新增备案</Button>
              </router-link>

              <Table  ref="selection" :columns="recordTypeList" :data="recordProgressList"></Table>
            </TabPane>

            <TabPane :label="tabValue">
              <div style="margin-bottom:20px">
                <div style="display:inline-block">
                  <span style="display:inline-block;margin-right:10px;">备案类型 </span>
                  <Select v-model="completeRecordType" size="small" style="width:231px;" @on-change="completeClick">
                    <Option v-for="item in recordTypeCityList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </div>
              </div>
                <router-link to="entrance">
                <Button style="margin-bottom:10px;" type="primary">新增备案</Button>
              </router-link>
              <Table  ref="selection" :columns="completeRecordTypeList" :data="recordTypeData"></Table>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data: function() {
    return {
      //我的备案进度标签值
      tabValueCom: h => {
        return h("div", [
          h(
            "span",
            {
              on: {
                click: () => {
                  this.listMainWeb();
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
                  this.completeClick();
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
          value: "首次备案",
          label: "首次备案"
        },
        {
          value: "新增接入",
          label: "新增接入"
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
          value: "未提交复审",
          label: "未提交复审"
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
          value: "审核完成",
          label: "审核完成"
        },
        {
          value: "备案完成",
          label: "备案完成"
        }
      ],
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
            return h("div", params.row.status);
          }
        },
        {
          title: "等待操作",
          key: "operation",
          render: (h, params) => {
            const row = params.row;
            const color =  row.operation == ""? "":"#2A99F2";
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
                        if (row.operation == "上传拍照/邮寄资料") {
                          sessionStorage.setItem("newId", row.id);
                          sessionStorage.setItem(
                            "newRecordtype",
                            row.recordType
                          );
                          this.$router.push({path:"newRecordStepFour"});
                        } else if (row.status == "管局审核拒绝") {
                          this.$router.push({path:"newRecordStepFour"});
                        } else if (row.status == "初审拒绝") {
                           this.jumpRecord(row.id,row.webcompany_Id);
                        } else if( row.status == "重新提交资料"){
                            this.jumpRecord(row.id,row.webcompany_Id);
                        }
                      }
                    }
                  },
                 row.operation == "" ? "暂无" : row.operation
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
                        this.jumpRecord(params.row.id,params.row.webcompany_Id);
                      }
                    }
                  },
                  params.row.waitOperation
                )
              ]
            );
          }
        }
      ],
      //已完成备案数据
      completeRecordTypeList: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
                        sessionStorage.setItem("id",params.row.id);
                        sessionStorage.setItem("webcompany_Id", params.row.webcompany_Id);
                        this.$router.push({ path: "completedFilingDetails" });
                      }
                    }
                  },
                  params.row.waitOperation
                )
              ]
            );
          }
        }
      ],
      //已完成备案表格数据
      recordTypeData: []
    };
  },
  methods: {
    //备案进度表格
    listMainWeb() {
      let userList = this.$store.state.userInfo;
      if (this.currentState == "全部") {
        this.currentState = "";
      }
      if (userList != null) {
        this.$http
          .get("recode/listMainWeb.do", {
            params: {
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
              console.log("出错了");
            }
          });
      }
    },
    //已完成备案数据获取点击事件
    completeClick() {
      let userList = this.$store.state.userInfo;
      if (userList != null) {
        this.$http
          .get("recode/listMainWeb.do", {
            params: {
              recordtype: this.completeRecordType,
              status: "已完成备案"
            }
          })
          .then(res => {
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
    jumpRecord(id,webcompany_Id) {
      this.$router.push({ path: "RecordDetails"});
      sessionStorage.setItem("id",id);
      sessionStorage.setItem("webcompany_Id", webcompany_Id);
    }
  },
  mounted() {
    this.listMainWeb();
  }
};
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
