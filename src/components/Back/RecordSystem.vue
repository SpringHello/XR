<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">备案系统
        <!--<span>备份</span>-->
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yunyingpanbeifen"></use>
          </svg>
          <span id="title">备案管理系统</span>
          <button id="refresh_button" @click="refreshPage" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>备案系统描述</p>
        </div>
        <Tabs type="card" :animated="false" v-model="tabPaneName">
          <TabPane label="我的备案进度" name="recordSchedule">
            <div class="content">
              <span>备案类型</span>
              <Select v-model="recordType" style="width:200px;margin: 0 20px 0 10px" placeholder="请选择备案类型" @on-change="searchByRecordType">
                <Option v-for="item in recordTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <span>当前状态</span>
              <Select v-model="recordStatus" style="width:200px;margin-left: 10px" placeholder="请选择备案状态" @on-change="searchByRecordStatus">
                <Option v-for="item in recordStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="recordScheduleData">
              <Table :columns="recordScheduleColumns" :data="recordScheduleData"></Table>
            </div>
          </TabPane>
          <TabPane label="已完成备案" name="recordFinished">

          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 备案类型选择
        recordType: 'all',
        recordTypeList: [
          {
            label: '全部类型',
            value: 'all'
          },
          {
            label: '首次备案',
            value: '1'
          },
          {
            label: '新增网站',
            value: '2'
          },
          {
            label: '新增接入',
            value: '3'
          },
          {
            label: '变更备案',
            value: '4'
          },
        ],
        // 标签页位置
        tabPaneName: 'recordSchedule',
        // 备案状态
        recordStatus: 'all',
        recordStatusList: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '初审中',
            value: '1'
          },
          {
            label: '初审拒绝',
            value: '2'
          },
          {
            label: '未提交复审',
            value: '3'
          },
          {
            label: '管局审核中',
            value: '4'
          },
          {
            label: '管局审核拒绝',
            value: '5'
          },
          {
            label: '审核完成',
            value: '6'
          },
          {
            label: '备案完成',
            value: '7'
          },
        ],
        // 备案进度表格数据
        recordScheduleColumns: [
          {
            title: '备案服务ID',
            key: '1',
            ellipsis: 'true'
          },
          {
            title: '关联域名',
            key: '2',
          },
          {
            title: '备案类型',
            key: '3',
          },
          {
            title: '备案主体',
            key: '4',
          },
          {
            title: '当前状态',
            key: '5',
          },
          {
            title: '等待操作',
            key: '6',
          },
          {
            title: '操作',
            render(h, params) {
              return h('span', {
                style: {
                  color: '#377DFF',
                  cursor: 'pointer'
                },
                on: {
                  click: ()=>{
                    alert('111')
                  }
                }
              }, '查看详情')
            }
          },
        ],
        recordScheduleData: [
          {},
          {}
        ]
      }
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([]).then(() => {
        next(vm => {
        })
      })
    },
    created() {
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    methods: {
      /* 刷新页面 */
      refreshPage() {
      },
      /* 区域变更刷新数据 */
      refresh() {
      },
      /* 切换备案类型时查询数据 */
      searchByRecordType(value) {
        console.log(value)
      },
      /* 切换备案状态时查询数据 */
      searchByRecordStatus(value) {
        console.log(value)
      }
    },
    watch: {
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
  #background {
    background-color: #f5f5f5;
    width: 100%;
    min-height: 870px;
  }

  .content {
    > span {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
  }

  .recordScheduleData {
    margin-top: 10px;
    min-height: 500px;
  }
</style>
