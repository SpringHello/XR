<template>
  <div>
    <div class="background">
      <div class="wrapper">
        <span class="title">
          <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link>
           / <span style="color: #666666;">回收站</span>
        </span>
        <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
          <router-link to="/ruicloud/userCenter">立即认证</router-link>
        </Alert>
        <div class="content">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huishouzhan"></use>
          </svg>
          <span style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">回收站</span>
          <div style="margin-top:20px;position:relative">
            <div class="operate">
              <Button type="ghost" class="ghost" @click="deleteSelect" style="margin-right:10px;">一键删除</Button>
              <Button type="primary" @click="recoverSelect">一键还原</Button>
              <div style="float:right">
                <Input v-model="keyWords" placeholder="请输入关键字" style="width: 200px;margin-right: 10px"></Input>
                <Button type="primary" @click="fetchData">确定</Button>
              </div>
            </div>
            <Tabs type="card" :animated="false" v-model="currentPane">
              <Tab-pane label="全部" name="全部">
                <div class="all">
                  <Table :columns="columns" :data="allList" @on-selection-change="selectionChange"></Table>
                </div>
              </Tab-pane>
              <Tab-pane label="云主机" name="云主机">
                <div class="all">
                  <Table :columns="columns" :data="hostList" @on-selection-change="selectionChange"></Table>
                </div>
              </Tab-pane>
              <Tab-pane label="弹性IP" name="弹性IP">
                <div class="all">
                  <Table :columns="columns" :data="ipList" @on-selection-change="selectionChange"></Table>
                </div>
              </Tab-pane>
              <Tab-pane label="硬盘" name="硬盘">
                <div class="all">
                  <Table :columns="columns" :data="diskList" @on-selection-change="selectionChange"></Table>
                </div>
              </Tab-pane>
              <Tab-pane label="NAT网关" name="NAT网关">
                <div class="all">
                  <Table :columns="columns" :data="natList" @on-selection-change="selectionChange"></Table>
                </div>
              </Tab-pane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {initRecycle} from '../../util/publicMethod'
  export default{
    data(){
      return {
        currentPane: '全部',

        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        },
          {
            title: '资源名称',
            key: 'resourcesName',
          },
          {
            title: '删除时间',
            key: 'deleteTime',
          },
          {
            title: '销毁倒计时',
            render: (h, params) => {
              return h('span', {}, `${params.row.remainingDay}天${params.row.remainingHour}时${params.row.remainingMinute}分`)
            },
          },
          {
            title: '操作',
            width: 180,
            render: (h, params) => {
              if (params.row.loading) {
                return h('Spin', {})
              }
              return h('div', {}, [h('Poptip', {
                style: {
                  marginRight: '20px'
                },
                props: {
                  title: '您确认还原该回收站资源吗？',
                  confirm: true
                },
                on: {
                  'on-ok': () => {
                    this.recover(params.row)
                  }
                },
              }, [h('span', {
                style: {
                  cursor: 'pointer',
                  color: '#2A99F2'
                }
              }, '还原')]), h('Poptip', {
                props: {
                  title: '您确认删除该回收站资源吗？',
                  width: 208,
                  confirm: true
                },
                on: {
                  'on-ok': () => {
                    this.del(params.row)
                  }
                },
              }, [h('span', {
                style: {
                  cursor: 'pointer',
                  color: '#2A99F2'
                }
              }, '删除')])])
            }
          }],
        allList: [],
        allSelection: [],
        hostList: [],
        hostSelection: [],
        ipList: [],
        ipSelection: [],
        diskList: [],
        diskSelection: [],
        natList: [],
        natSelection: [],
        keyWords: '',
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        let params = {}
        if (this.keyWords != '') {
          params.name = this.keyWords
        }
        this.$http.post('information/listRecharge.do', params).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            var mSecInDay = 1000 * 60 * 60 * 24
            var mSecInHour = 1000 * 60 * 60
            var mSecInMinute = 1000 * 60
            var nowTime = new Date().getTime()
            response.data.result.forEach((item) => {
              item.remainingDay = Math.floor(item.remainTime / mSecInDay)
              item.remainingHour = Math.floor((item.remainTime % mSecInDay) / mSecInHour)
              item.remainingMinute = Math.floor((item.remainTime % mSecInHour) / mSecInMinute)
              item.deleteTime = new Date(item.deleteTime).format('yyyy年MM月dd日 hh:mm:ss')
              item.createTime = new Date(item.createTime).format('yyyy年MM月dd日 hh:mm:ss')
              item.loading = false
            })
            var host = [], ip = [], disk = [], nat = []
            response.data.result.forEach(item => {
              switch (item.type) {
                case 'host':
                  host.push(item)
                  break;
                case 'ip':
                  ip.push(item)
                  break;
                case 'disk':
                  disk.push(item)
                  break;
                case 'nat':
                  nat.push(item)
                  break
              }
            })
            this.allList = response.data.result
            this.hostList = host
            this.ipList = ip
            this.diskList = disk
            this.natList = nat
          }
        })
      },
      selectionChange(selections){
        switch (this.currentPane) {
          case '全部':
            this.allSelection = selections
            break
          case '云主机':
            this.hostSelection = selections
            break
          case '弹性IP':
            this.ipSelection = selections
            break
          case '硬盘':
            this.diskSelection = selections
            break
          case 'NAT网关':
            this.natSelection = selections
            break
        }
      },
      recover(item){
        var arr = [{id: item.id, type: item.type}]
        var param = JSON.stringify(arr)
        this.$http.post('information/recover.do', {
          list: param
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            initRecycle.bind(this)()
            this.fetchData()
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      recoverSelect(){
        var operatingList = []
        switch (this.currentPane) {
          case '全部':
            operatingList = this.allSelection
            break
          case '云主机':
            operatingList = this.hostSelection
            break
          case '弹性IP':
            operatingList = this.ipSelection
            break
          case '硬盘':
            operatingList = this.diskSelection
            break
          case 'NAT网关':
            operatingList = this.natSelection
            break
        }
        var arr = []
        operatingList.forEach(item => {
          item.loading = true
          arr.push({id: item.id, type: item.type})
        })
        if (arr.length == 0) {
          this.$Message.info("请至少选择一个资源进行操作")
          return
        }
        var param = JSON.stringify(arr)
        this.$http.post("information/recover.do", {
          list: param
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            initRecycle.bind(this)()
            this.fetchData()
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      del(item){
        var arr = [{id: item.id, type: item.type}]
        var param = JSON.stringify(arr)
        this.$http.post("information/deleteRecover.do", {
          list: param
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            initRecycle.bind(this)()
            this.fetchData()
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      deleteSelect(){
        var operatingList = []
        switch (this.currentPane) {
          case '全部':
            operatingList = this.allSelection
            break
          case '云主机':
            operatingList = this.hostSelection
            break
          case '弹性IP':
            operatingList = this.ipSelection
            break
          case '硬盘':
            operatingList = this.diskSelection
            break
          case 'NAT网关':
            operatingList = this.natSelection
            break
        }
        var arr = []
        operatingList.forEach(item => {
          arr.push({id: item.id, type: item.type})
          this.allList.forEach(i => {
            if (i.id == item.id) {
              i.loading = true
            }
          })
        })
        if (arr.length == 0) {
          this.$Message.info("请至少选择一个资源进行操作")
          return
        }
        var param = JSON.stringify(arr)
        this.$http.post("information/deleteRecover.do", {
          list: param
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            initRecycle.bind(this)()
            this.fetchData()
          } else {
            this.$Message.info(response.data.message)
          }
        })
      }
    },
    computed: {
      auth(){
        return this.$store.state.authInfo != null

      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .ivu-modal-footer {
    .button {
      height: 35.7px;
      padding: 5.7px 17px;
      line-height: 24.7px;
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 16px;
      border-radius: 4.46px;
      cursor: pointer;
      user-select: none;
    }
    .ok {
      color: #FFFFFF;
      background: #2A99F2;
    }
    .cancel {
      margin-right: 10.5px;
      border: 1px solid #D9D9D9;
      color: #666666;
    }
  }

  .ghost {
    border-color: #2A99F2;
    color: #2A99F2;
  }

  .background {
    background-color: #f5f5f5;
    width: 100%;
    min-width: 1600px;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
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
        & > span {
          font-family: Microsoft YaHei;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .operate {
          margin: 15px 0px;
          height: 31px;
          .button {
            height: 31px;
            background: #2A99F2;
            border-radius: 4px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 28px;
            padding: 0px 15px;
            margin-right: 10px;
            margin-top: 1px;
            cursor: pointer;
            user-select: none;
            &:last-of-type {
              margin-left: 10px;
              margin-right: 0px;
            }
          }
        }
        .all {
          min-height: 630px;
        }
      }
    }
  }
</style>
