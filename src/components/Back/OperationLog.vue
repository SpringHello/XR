<template>
  <div class="background">
    <div class="wrapper">
      <span>个人中心 / 操作日志</span>
      <div class="content">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#houtaiicon-caozuorizhi"></use>
        </svg>
        <span class="title"
              style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">操作日志</span>
        <div class="logdata">
          <div class="search">
            <span style="margin-top: 29px;font-size: 12px;">操作时间</span>
            <Row style="margin-left: 10px;margin-right: 20px;margin-top: 20px">
              <Col span="12">
                <Date-picker v-model="time" type="daterange" :options="options" placement="bottom-end" placeholder="选择日期"
                             style="width: 231px" @on-change="dataChange"></Date-picker>
              </Col>
            </Row>
            <span style="margin-top: 29px;font-size: 12px">请选择操作对象</span>
            <Select v-model="target" style="width:231px;margin-left: 10px;margin-top: 20px">
              <Option v-for="item in operandList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" style="margin-top: 20px;margin-left: 10px" @click="search">查询</Button>
          </div>
          <div class="log" style="margin-top: 20px">
            <Table highlight-row :columns="columns" :data="tableData"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="total" :current="1" @on-change="currentChange"></Page>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        operandList: [
          {
            value: 'all',
            label: '所有'
          },
          {
            value: 'account',
            label: '账户'
          },
          {
            value: 'host',
            label: '主机'
          },
          {
            value: 'gpu',
            label: 'GPU服务器'
          },
          {
            value: 'db',
            label: '云数据库'
          },
          {
            value: 'disk',
            label: '硬盘'
          },
          {
            value: 'snapshoot',
            label: '快照'
          },
          {
            value: 'subnet',
            label: '子网'
          },
          {
            value: 'vpc',
            label: 'VPC'
          },
          {
            value: 'publicnetwork',
            label: '公网'
          },
          {
            value: 'mirroring',
            label: '镜像'
          },
          {
            value: 'loadbalancing',
            label: '负载均衡'
          },
          {
            value: 'rest',
            label: '其他'
          },
        ],
        options: {
          shortcuts: [
            {
              text: '最近一周',
              value() {
                const end = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value() {
                const end = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value() {
                const end = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
                return [start, end];
              }
            }
          ]
        },
        columns: [
          {
            title: '操作对象',
            key: 'operatetarget',
            align: 'left',
            width: 150,
          },
          {
            title: '操作时间',
            key: 'operatortime',
            align: 'left',
            width: 200,
          },
          {
            title: '操作结果',
            key: 'operatestatus',
            align: 'left',
            width: 150,
            render: (h, params) => {
              return h('span', params.row.operatestatus == 1 ? '成功' : '失败')
            }
          }, {
            title: '行为描述',
            key: 'operatedes',
            align: 'left',
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'cz',
            align: 'left',
            width: 120,
            render: (h, params) => {
              if (params.row.operatestatus != 1) {
                return h('div', [
                  h('span', {
                    style: {
                      cursor: 'pointer',
                      color: ' #2A99F2',
                    },
                    on: {
                      click: () => {
                        //this.$store.commit("setSelect", "workorder")
                        this.$router.push({
                          path: '/ruicloud/workOrder',
                          query: {logData: params.row}
                        });
                      }
                    }
                  }, '申请工单'),
                ]);
              } else {
                return h('span', '--')
              }
            }
          },
        ],
        tableData: [],
        target: '',
        time: '',
        dateRange: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.$http.get('log/queryLog.do', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          target: this.target,
          queryTime: this.time
        }
      }).then(response => {
        this.total = response.data.total;
        this.tableData = response.data.tableData;
      })
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.search();
      },
      dataChange(time) {
        this.dateRange = time;
      },
      search() {
        let queryTime = this.dateRange === '' ? '' : this.dateRange.join(',')
        this.$http.get('log/queryLog.do', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            target: this.target == 'all' ? '' : this.target,
            queryTime: queryTime
          }
        }).then(response => {
          this.total = response.data.total;
          this.tableData = response.data.tableData;
        })
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
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
        height: inherit;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .changecard {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #2A99F2;
          float: right;
          cursor: pointer;
          user-select: none
        }
        .logdata {
          margin-top: 20px;
          border-top: 1px solid #E9E9E9;
          .search {
            display: flex;
          }
        }
      }
    }
  }
</style>
