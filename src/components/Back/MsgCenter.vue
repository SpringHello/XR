<template>
  <div class="background">
    <div class="wrapper">
      <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 消息中心</span>
      <div class="content">
        <div>
          <span class="title">消息中心</span>
        </div>
        <div style="margin-top:10px">
          <Tabs type="card" v-model="pane" :animated="false">
            <Tab-pane :label="'全部'+paneLabel.all" name="all" style="min-height: 500px;">
              <div class="operating-bar">
                <Button type="primary" @click="mark('readed')" style="margin-right: 10px">标为已读</Button>
                <Button type="primary" @click="mark('unreaded')" style="margin-right: 10px">标为未读</Button>
                <Button type="primary" @click="mark('del')">删除</Button>
                <div style="display: inline-block;float:right">
                  <span>接收时间</span>
                  <div style="display: inline-block">
                    <Date-picker v-model="searchInfo.searchDate" type="daterange"
                                 placement="bottom-end"
                                 placeholder="选择日期" style="width: 200px;display: inline-block"
                                 @on-change="dataChange"></Date-picker>
                    <Input v-model="searchInfo.keyWords" placeholder="请输入消息名称"
                           style="width: 200px;display: inline-block;margin-right: 10px"></Input>
                    <Button type="primary" @click="getData('all')">查询</Button>
                  </div>
                </div>
              </div>
              <Table :columns="columns" :data="allData" @on-selection-change="select"></Table>
              <Page style="margin-top:20px" :total="allPageInfo.total" :page="allPageInfo.currentPage" :page-size="15"
                    @on-change="getAllData"></Page>
            </Tab-pane>
            <Tab-pane :label="'未读'+paneLabel.notRead" name="notRead" style="min-height: 500px;">
              <div class="operating-bar">
                <Button type="primary" @click="mark('readed')" style="margin-right: 10px">标为已读</Button>
                <Button type="primary" @click="mark('del')">删除</Button>
                <div style="display: inline-block;float:right">
                  <span>接收时间</span>
                  <div style="display: inline-block">
                    <Date-picker v-model="searchInfo.searchDate" type="daterange"
                                 placement="bottom-end"
                                 placeholder="选择日期" style="width: 200px;display: inline-block"
                                 @on-change="dataChange"></Date-picker>
                    <Input v-model="searchInfo.keyWords" placeholder="请输入消息名称"
                           style="width: 200px;display: inline-block;margin-right: 10px"></Input>
                    <Button type="primary" @click="getData('notRead')">查询</Button>
                  </div>
                </div>
              </div>
              <Table :columns="columns" :data="notReadData" @on-selection-change="select"></Table>
              <Page style="margin-top:20px" :total="notReadPageInfo.total" :page="notReadPageInfo.currentPage"
                    :page-size="15"
                    @on-change="getNotReadData"></Page>
            </Tab-pane>
            <Tab-pane :label="'已读'+paneLabel.read" name="read" style="min-height: 500px;">
              <div class="operating-bar">
                <Button type="primary" @click="mark('unreaded')" style="margin-right: 10px">标为未读</Button>
                <Button type="primary" @click="mark('del')">删除</Button>
                <div style="display: inline-block;float:right">
                  <span>接收时间</span>
                  <div style="display: inline-block">
                    <Date-picker v-model="searchInfo.searchDate" type="daterange"
                                 placement="bottom-end"
                                 placeholder="选择日期" style="width: 200px;display: inline-block;"
                                 @on-change="dataChange"></Date-picker>
                    <Input v-model="searchInfo.keyWords" placeholder="请输入消息名称"
                           style="width: 200px;display: inline-block;margin-right: 10px"></Input>
                    <Button type="primary" @click="getData('read')">查询</Button>
                  </div>
                </div>
              </div>
              <Table :columns="columns" :data="readData" @on-selection-change="select"></Table>
              <Page style="margin-top:20px" :total="readPageInfo.total" :page="readPageInfo.currentPage" :page-size="15"
                    @on-change="getReadData"></Page>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
    <Modal
      v-model="showModal.detail"
      :title="modelInfo.title"
      width="450"
      :scrollable="true">
      <div
        style="height:100px;width:90%;margin:0px auto;font-size: 14px;color: rgba(-2147483648,-2147483648,-2147483648,0.65);line-height: 19px;">
        {{modelInfo.content}}
      </div>
      <div slot="footer" style="display: flex;width:177px;margin-left:350px;">
        <Button type="primary" @click="showModal.detail=false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

  export default{
    data(){
      return {
        showModal: {
          detail: false
        },
        pane: 'all',
        paneLabel: {
          all: '',
          notRead: '',
          read: ''
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '消息名称',
            width: 300,
            render: (h, param) => {
              return h('div', [
                h('span', {
                  style: {
                    width: '7px',
                    height: '7px',
                    backgroundColor: '#3DBD7D',
                    display: param.row.isread == 1 ? 'none' : 'inline-block',
                    borderRadius: '50% 50%',
                    verticalAlign: 'middle',
                    marginRight: '5px',
                    marginBottom: '2px'
                  }
                }, ''),
                h('span', {
                  props: {
                    type: 'person',
                    'class': param.row.isread == 1 ? 'notRead' : 'read'
                  }
                }, param.row.name)
              ]);
            }
          },
          {
            title: '类型',
            width: 200,
            align: 'center',
            key: 'actType',
            filters: [
              {
                label: '业务通知',
                value: '业务通知'
              },
              {
                label: '运维事件',
                value: '运维事件'
              },
              {
                label: '市场活动',
                value: '市场活动'
              },
              {
                label: '工单信息',
                value: '工单信息'
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              return row.msgtype.indexOf(value) > -1;

            }
          },
          {
            title: '发布时间',
            width: 500,
            align: 'center',
            key: 'publishtime'
          },
          {
            title: '操作',
            width: 98,
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params)
                    }
                  }
                }, '查看详情')

              ]);
            }
          }
        ],
        allData: [],
        notReadData: [],
        readData: [],
        searchInfo: {
          searchStartDate: '',
          searchEndDate: '',
          keyWords: '',
        },
        allPageInfo: {
          currentPage: 1,
          pageSize: 15,
          total: 0
        },
        notReadPageInfo: {
          currentPage: 1,
          pageSize: 15,
          total: 0
        },
        readPageInfo: {
          currentPage: 1,
          pageSize: 15,
          total: 0
        },
        allSelect: [],
        notReadSelect: [],
        readSelect: [],
        modelInfo: {
          title: '',
          content: ''
        }
      }
    },
    created(){
      this.getData('all')
      this.getData('notRead')
      this.getData('read')
    },
    methods: {
      getData(type){
        let pageInfo = this[type + 'PageInfo']
        let url = `user/getEventNotifyList.do?rows=${pageInfo.pageSize}&page=${pageInfo.currentPage}`
        if (this.searchInfo.searchStartDate != '') {
          url += '&starttime=' + this.searchInfo.searchStartDate
          url += '&endtime=' + this.searchInfo.searchEndDate
        }
        if (this.searchInfo.keyWords) {
          url += '&name=' + this.searchInfo.keyWords
        }
        if (type == 'read') {
          url += '&isRead=1'
        } else if (type == 'notRead') {
          url += '&isRead=0'
        } else if (type == 'all') {
          url += '&isRead=2'
        }
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this[type + 'Data'] = response.data.result
            pageInfo.total = parseInt(response.data.pageTotal)
            this.paneLabel.all = response.data.total
            this.paneLabel.notRead = response.data.noReadTotal
            this.$store.commit('setMsg', Number.parseInt(response.data.noReadTotal))
            this.paneLabel.read = response.data.alreadyTotal
          }
        })
      },
      getReadData(current){
        this.readPageInfo.currentPage = current
        this.getData('read')
      },
      getNotReadData(current){
        this.notReadPageInfo.currentPage = current
        this.getData('notRead')
      },
      getAllData(current){
        this.allPageInfo.currentPage = current
        this.getData('all')
      },
      select(selection){
        this[this.pane + 'Select'] = selection
      },
      mark(type){
        let ids = this[this.pane + 'Select'].map(item => {
          return {id: item.id}
        })
        let url = `user/${type}EventNotify.do?list=${encodeURI(JSON.stringify(ids))}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.getData('all')
            this.getData('notRead')
            this.getData('read')
          }
        })
      },
      dataChange(data){
        this.searchInfo.searchStartDate = data[0]
        this.searchInfo.searchEndDate = data[1]
      },
      show(param){
        this.modelInfo.title = param.row.name
        this.modelInfo.content = param.row.content
        this.showModal.detail = true
        if (param.row.isread == 0) {
          let url = `user/readedEventNotify.do?list=[{"id":"${param.row.id}"}]`
          this.$http.get(encodeURI(url)).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.getData('all')
              this.getData('notRead')
              this.getData('read')
            }
          })
        }
      }
    },
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
        min-height: 560px;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-family: 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .operating-bar {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
