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
            <TabPane label="我的备案进度">
              <div style="margin-bottom:20px"> 
               <div style="display:inline-block">
                   <span style="display:inline-block">备案类型 </span>
                <Select v-model="recordType"  size="small" style="width:231px;">
                  <Option v-for="item in recordTypeCityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
              </div>
              <div style="display:inline-block;margin-left:20px">
                <span>当前状态</span>
                <Select v-model="currentState" size="small"  style="width:231px;">
                    <Option v-for="item in currentStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
                <Table  ref="selection" :columns="recordTypeList" :data="recordTypeData"></Table>  
            </TabPane>
        
            <TabPane label="已完成备案">
               <div style="margin-bottom:20px"> 
               <div style="display:inline-block">
                   <span style="display:inline-block">备案类型 </span>
                <Select v-model="recordType" size="small" style="width:231px;">
                  <Option v-for="item in recordTypeCityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
              </div>
              <div style="display:inline-block;margin-left:20px">
                <span>当前状态</span>
                <Select v-model="currentState" size="small"  style="width:231px;">
                    <Option v-for="item in currentStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
                <Table  ref="selection" :columns="recordTypeList" :data="recordTypeData"></Table> 
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
      //备案类型下拉列表数据
      recordTypeCityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      //备案类型Select值
      recordType: "",
      //当前状态下拉列表数据
      currentStateList: [
        {
          value: "New York",
          label: "全部"
        },
        {
          value: "London",
          label: "初审中"
        },
        {
          value: "Sydney",
          label: "初审拒绝"
        },
        {
          value: "Ottawa",
          label: "未提交复审"
        },
        {
          value: "Paris",
          label: "管局审核中"
        },
        {
          value: "Canberra",
          label: "管局审核拒绝"
        },
        {
          value: "Canberra",
          label: "审核完成"
        },
        {
          value: "Canberra",
          label: "备案完成"
        }
      ],
      //当前状态Select值
      currentState: "",
      //备案类型表格表头
      recordTypeList: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "备案服务ID",
          key: "recordServiceID"
        },
        {
          title: "关联域名",
          key: "relatedDomainName"
        },
        {
          title: "备案类型",
          key: "recordType"
        },
        {
          title: "备案主体",
          key: "recordSubject"
        },
        {
          title: "最近更新时间",
          key: "updateTime"
        },
        {
          title: "当前状态",
          key: "currentSate",
          render: (h, params) => {
            return h("div", params.row.currentSate.value);
          }
        },
        {
          title: "等待操作",
          key: "waitOperation",
          render: (h, params) => {
            const color =
              params.row.currentSate.label === 1
                ? "#2A99F2"
                : params.row.currentSate.label === 2 ? "" : "#000000";
            return (
              "div",
              [
                h(
                  "span",
                  {
                    style: {
                      color: color,
                      cursor: "pointer"
                    }
                  },
                  params.row.waitOperation
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "operation",
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
                        this.$router.push({ path: "/RecordDetails" });
                      }
                    }
                  },

                  params.row.operation
                )
              ]
            );
          }
        }
      ],
      //备案类型表格数据
      recordTypeData: [
        {
          recordServiceID: "TradeCode21",
          relatedDomainName: "xrcloud.net",
          recordType: "首次备案",
          recordSubject: "北京允睿讯通",
          updateTime: "2016-09-21 08:50:08",
          currentSate: {
            label: 1,
            value: "初审中"
          },
          waitOperation: "上传拍照/邮寄资料",
          operation: "查看详情"
        },
        {
          recordServiceID: "TradeCode22",
          relatedDomainName: "xrcloud.net",
          recordType: "首次备案",
          recordSubject: "北京允睿讯通",
          updateTime: "2016-09-21 08:50:08",
          currentSate: {
            label: 1,
            value: "初审中"
          },
          waitOperation: "上传拍照/邮寄资料",
          operation: "查看详情"
        },
        {
          recordServiceID: "TradeCode23",
          relatedDomainName: "xrcloud.net",
          recordType: "新增接入",
          recordSubject: "百度科技",
          updateTime: "2016-09-21 08:50:08",
          currentSate: {
            label: 2,
            value: "管局审核中"
          },
          waitOperation: "暂无",
          operation: "查看详情"
        },
        {
          recordServiceID: "TradeCode24",
          relatedDomainName: "xrcloud.net",
          recordType: "新增接入",
          recordSubject: "百度科技",
          updateTime: "2016-09-21 08:50:08",
          currentSate: {
            label: 2,
            value: "管局审核中"
          },
          waitOperation: "暂无",
          operation: "查看详情"
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.background {
  background-color: #f5f5f5;
  @diff: 101px;
  min-height: calc(~"100% - @{diff}");
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
.ivu-select .ivu-select-single .ivu-select-selection {
  height: 28px;
}
</style>
