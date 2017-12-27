<template>
  <div class="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div class="wrapper">
      <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 备份</span>
      <Alert type="warning" show-icon style="margin-bottom:0px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/usercenter">立即认证</router-link>
      </Alert>
      <div class="content">
        <div>
          <span class="title">备份</span>
        </div>
        <div class="operator-bar">
          <!--Button type="primary">恢复</Button>
          <!--Button type="primary">加入负载均衡</Button-->
          <!--Button type="primary">删除</Button-->
        </div>
        <div style="margin-top:10px">
          <Tabs type="card" :animated="false" v-model="status">
            <Tab-pane label="主机" name="主机">
              <Table :columns="backupsColumns" :data="hostTable"></Table>
            </Tab-pane>
            <!--Tab-pane :disabled="true" label="硬盘" name="硬盘">
              <Table :columns="diskColumns" :data="diskTable"></Table>
            </Tab-pane-->
          </Tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        status: '主机',
        hostTable: [],
        loadingMessage: '',
        loading: false,
        intervalInstance: null,
        backupsColumns: [
          {
            title: '备份名称',
            align: 'center',
            key: 'snapshotname'
          },
          {
            title: '备份描述',
            align: 'center',
            key: 'snapshotdescript'
          },
          {
            title: '备份主机名',
            align: 'center',
            key: 'name'
          },

          {
            title: '状态',
            align: 'center',
            key: 'status',
            render: (h, params) => {
              const row = params.row;
              const text = row.status === 1 ? '正常' : row.status === 2 ? '创建中' : row.status === 3 ? '删除中' : row.status === 4 ? '恢复中' : '异常';
              if (row.status != 1) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: "inline-block",
                    marginRight: "10px",
                  }
                }), h('span', {}, text)]);
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '创建日期',
            align: 'center',
            key: 'addtime'
          },
          {
            title: '操作',
            align: 'center',
            key: 'action',
            render: (h, params) => {
              console.log(this)
              return h('div', [
                h('span', {
                  style: {
                    marginRight: '20px',
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '',
                        content: '<p style="font-size: 16px;">您确认使用' + params.row.snapshotname + '恢复' + params.row.name + '吗</p>',
                        onOk: () => {
                          this.recover(params.row)
                        }
                      })
                    }
                  }
                }, '恢复'),
                h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '',
                        content: '<p style="font-size: 16px;">您确认删除该备份吗？</p>',
                        onOk: () => {
                          this.del(params.row)
                        }
                      })
                    }
                  }
                }, '删除')
              ]);
            },
          }
        ],
        diskTable: [],
        diskColumns: [],
      }
    },
    created(){
      var url = `Snapshot/listVMSnapshotAll.do`;
      this.$http.get(url)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach(item => {
              item.progress = 0
            })
            this.hostTable = response.data.result
            this.inter();
          }
        })
    },
    methods: {
      inter(){
        var url = 'Snapshot/listVMSnapshotAll.do';
        this.intervalInstance = setInterval(() => {
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              response.data.result.forEach(item => {
                item.progress = 0
                this.hostTable.forEach(i => {
                  if (item.snapshotid == i.snapshotid) {
                    item.progress = i.progress;
                    item.status = i.status != 1 ? i.status : item.status
                  }
                })
              })
              this.hostTable = response.data.result
            }
          })
        }, 1000 * 5)
      },
      recover(item){
        item.status = 4
        item.progress = 0
        this.$http.get("Snapshot/revertToVMSnapshot.do?vmsnapshotid=" + item.snapshotid)
          .then(response => {
            item.status = 1
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              /*this.$Modal.warning({
               title: "",
               content: `<p style='font-size: 16px;color: rgba(17,17,17,0.75);line-height: 21px;'>提示:</p><span style="font-size: 14px;color: rgba(17,17,17,0.65);line-height: 21px;">${response.data.message}</span>`
               });*/
              this.$Message.error(response.data.message)
            }
          })
      },
      del(item){
        item.status = 3
        var snapshotid = item.id
        this.$http.get("Snapshot/deleteVMSnapshot.do?vmsnapshotid=" + item.id)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.hostTable = this.hostTable.filter(item => {
                return item.id != snapshotid
              })
            } else {
              this.$Message.error(response.data.message)
            }
          })
      },
    },
    computed: {
      auth(){
        return this.$store.state.personalAuth == 0 || this.$store.state.enterpriseAuth == 0
      }
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      clearInterval(this.intervalInstance)// 可以访问组件实例 `this`
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto 25px;
      & > span {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        min-height: 700px;
        .flex-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          min-height: 630px;
          &:after {
            content: '';
            width: 373px;
          }
          .head {
            font-size: 0px;
            padding: 23px 19px 0px 19px;
            position: relative;
            h1 {
              font-size: 18px;
              color: #646464;
              line-height: 18px;
              text-align: left;
              margin-bottom: 15px;
            }
            span {
              color: #646464;
              font-size: 12px;
              display: block;
              text-align: left;
              margin-bottom: 10px;
            }
          }
          .foot {
            padding: 11px 0px 12px 0px;
            margin: 0px auto;
            margin-left: 222px;
            span {
              display: block;
              line-height: 28px;
              font-size: 12px;
              color: #999999;
            }
            button {
              border: 1px solid #2A99F2;
              border-radius: 4.46px;
              line-height: 18px;
              font-size: 12px;
              color: #2A99F2;
              cursor: pointer;
              user-select: none;
              padding: 5px 15px;
              outline: none;
              margin-right: 15px;
              background-color: white;
              &.error {
                background-color: #ed3f14;
                border-color: #ed3f14;
                color: white
              }
              &.primary {
                background-color: #2b85e4;
                border-color: #2b85e4;
                color: white
              }
            }
          }
          .ivu-card-body {
            padding: 0px;
          }
          .select {
            .ivu-card {
              background: #FFFFFF;
              border: 1px solid #2A99F2;
              box-shadow: 0 2px 16px 0 rgba(93, 177, 245, 0.50);
              border-radius: 4px;
            }
          }
          .logo {
            width: 218px;
            height: 80px;
            background: url("../../assets/img/public/no-info-logo.png") no-repeat center;
            position: absolute;
            top: 160px;
            left: 50%;
            transform: translateX(-50%);
            & > span {
              position: absolute;
              top: 33px;
              left: 8px;
              font-size: 14px;
              color: #666666;
              letter-spacing: 0;
              user-select: none;
              cursor: default;
            }
          }
        }
        .logo {
          width: 113px;
          height: 80px;
          background: url("../../assets/img/public/no-info-logo.png") no-repeat center;
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          & > span {
            position: absolute;
            top: 33px;
            left: 8px;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            user-select: none;
            cursor: default;
          }
        }
        .title {
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .operator-bar {
          font-size: 0px;
          margin-top: 20px;
          .del {
            margin: 0;
            line-height: normal;
            padding: 7px 16px;
            clear: both;
            color: #495060;
            font-size: 12px !important;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            transition: background .2s ease-in-out;
            display: inline-block;
            width: 100px;
            &:hover {
              background-color: #f3f3f3;
            }
          }
          button {
            margin-right: 10px;
          }
          .ivu-dropdown {
            margin-left: 0px !important;
          }
        }
      }
    }
  }
</style>
