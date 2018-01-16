<template>
  <div id="background">
    <div id="wrapper">
      <span>安全 / 防火墙</span>
      <div id="content">
        <div id="header">
          <span id="title">防火墙</span>
        </div>
        <Alert>
          防火墙描述
        </Alert>
        <div class="operator-bar">
          <Button type="primary" @click="showModal.newFirewall = true">新建</Button>
          <!--Button type="primary">加入负载均衡</Button-->
          <Button type="primary" @click="listNetwork">应用防火墙规则至</Button>
          <Dropdown style="margin-left: 20px;vertical-align: middle;" @on-click="handleEvent">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Poptip
                confirm
                width="200"
                placement="right"
                title="您确认删除该防火墙？"
                @on-ok="del">
                <li class="del">删除</li>
              </Poptip>
              <Dropdown-item name="modify">修改</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div>
          <Table border :columns="columns" :data="tableData" :border="false"
                 @on-current-change="setSelect" @radio-change="selectChange"></Table>
          <Page :total="pageInfo.total" :current="pageInfo.page" :page-size=10 style="float:right;margin-top:15px"
                @on-change="next"></Page>
        </div>
      </div>
    </div>

    <Modal v-model="showModal.newFirewall" width="620" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        新建防火墙
      </div>
      <div style="width:60%">
        <Form v-model="newForm" :label-width="70" onsubmit="return false">
          <Form-item label="名称">
            <Input v-model="newForm.firewallName" placeholder="请输入防火墙名称"
                   @on-enter="createFirewall"></Input>
          </Form-item>
          <Form-item label="所属VPC">
            <Select v-model="newForm.vpc" placeholder="请选择">
              <Option v-for="item in vpcArray" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <p style="padding:20px;background-color: #F7F7F7;font-size: 14px;color: rgba(0,0,0,0.43);font-weight: 600">
        为保障安全，新建防火墙在未进行创建规则时默认为上行规则可全部使用，下行规则全部禁用。
        如需创建其他规则请进入管理页面进行操作。</p>
      <div slot="footer">
        <Button type="ghost" @click="showModal.newFirewall = false">取消</Button>
        <Button type="primary" :disabled="newForm.firewallName==''||newForm.vpc==''" @click="createFirewall">确定
        </Button>
      </div>
    </Modal>

    <Modal v-model="showModal.apply" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        应用防火墙规则至
      </div>
      <div style="width:60%">
        <Form :model="applyForm" :label-width="80">
          <Form-item label="私有网络">
            <Select v-model="applyForm.network" placeholder="请选择">
              <Option v-for="item in applyForm.networkList" :key="item" :value="item.ipsegmentid">
                {{item.name}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.apply = false;applyForm.network='';applyForm.networkList=[]">取消</Button>
        <Button type="primary" :disabled="applyForm.network==''" @click="apply">确定
        </Button>
      </div>
    </Modal>

    <Modal v-model="showModal.modify" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        修改防火墙
      </div>
      <div style="width:60%">
        <Form :model="modifyForm" :label-width="80">
          <Form-item label="防火墙名称">
            <Input v-model="modifyForm.name" placeholder="请重置防火墙名称"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modify = false;modifyForm.name=''">取消</Button>
        <Button type="primary" :disabled="modifyForm.name==''" @click="modify">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        applyLoading: false,
        deleteLoading: false,
        createLoading: false,
        showModal: {
          newFirewall: false,
          apply: false,
          modify: false
        },
        newForm: {
          firewallName: '',
          vpc: ''
        },
        applyForm: {
          network: '',
          networkList: []
        },
        modifyForm: {
          name: '',
        },
        columns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: '名称',
            align: 'center',
            key: 'acllistname'
          },
          {
            title: 'ID',
            align: 'center',
            width: 250,
            render: (h, params) => {
              return h('Tooltip', {
                  props: {
                    content: params.row.acllistid,
                    placement: 'top'
                  }
                },
                params.row.acllistid
              )
            }
          },
          {
            title: '所属VPC',
            align: 'center',
            key: 'vpcname'
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createtime'
          },
          {
            title: '操作',
            width: 100,
            render: (h, params) => {
              if (params.row.status) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: "inline-block",
                    marginRight: "10px",
                  }
                }), h('span', {}, params.status)])
              }
              return h('div', [
                h('span', {
                    style: {
                      cursor: 'pointer',
                      color: ' #2A99F2',
                    },
                    on: {
                      click: () => {
                        localStorage.fireId = params.row.acllistid
                        localStorage.createTime = params.row.createtime
                        localStorage.firewallName = params.row.acllistname
                        this.$router.push('firewallManage')
                        this.$store.commit("setSelect", "firewall")
                      }
                    }
                  },
                  '管理'
                )
              ])
            }
          }
        ],
        tableData: [],
        vpcArray: [],
        //选中的防火墙
        select: null,
        pageInfo: {
          total: 0,
          page: 1,
        },
        loading: false,
        loadingMessage: ''
      }
    },
    created(){
      this.init()
    },
    methods: {
      init(){
        var url = `network/listAclList.do?pageSize=10&page=${this.pageInfo.page}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.pageInfo.total = response.data.result.total
            this.tableData = response.data.result.data
          }
        })
        var listVPCUrl = `network/listVpc.do?page=1&pageSize=10`
        this.$http.get(listVPCUrl).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vpcArray = response.data.result.data
          } else if (response.status == 200 && response.data.status == 3) {
            this.$router.push({path: 'login'})
          }
        })
      },
      handleEvent(params){
        if (this.select == null) {
          this.$Message.info('请选择需要操作的防火墙')
          return
        }
        this.showModal[params] = true
      },
      setSelect(currentRow, oldCurrentRow){
        this.select = currentRow
      },
      selectChange(select){
        console.log(select)
        this.select = select
      },
      next(page){
        this.pageInfo.page = page
        this.init()
      },
      createFirewall(){
        this.showModal.newFirewall = false
        var url = `network/createNetworkACLList.do?name=${this.newForm.firewallName}&vpcid=${this.newForm.vpc}`
        this.tableData.push({
          acllistid: '创建中',
          acllistname: this.newForm.firewallName,
          createtime: '创建中',
          status: '创建中',
          _disabled: true
        })
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.newForm.firewallName = ''
            this.newForm.vpc = ''
            this.init()
          }
        })
      },
      listNetwork(){
        if (this.select == null) {
          this.$Message.info('请选择要应用的防火墙')
          return
        }
        this.showModal.apply = true
        var url = `network/listNetworkByVpcId.do?vpcid=${this.select.vpcid}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.applyForm.networkList = response.data.result
          }
        })
      },
      apply(){
        this.showModal.apply = false
        this.applyLoading = true
        var url = `network/replaceNetworkACLList.do?aclListId=${this.select.acllistid}&networkId=${this.applyForm.network}`
        this.$http.get(url).then(response => {
          this.showModal.apply = false
          this.applyForm.networkList = []
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          }
        })
      },
      modify(){
        var url = `network/updateAclList.do?name=${this.modifyForm.name}&aclListId=${this.select.acllistid}`
        this.$http.get(url).then(response => {
          this.showModal.modify = false
          this.modifyForm.name = ''
          if (response.status == 200 && response.data.status == 1) {
            this.init()
            this.$Message.success(response.data.message)
          }
        })
      },
      del(){
        if (this.select == null) {
          this.$Message.info('请选中一条防火墙')
          return
        }
        this.deleteLoading = true
        var url = `network/delAclList.do?aclListId=${this.select.id}`
        this.$http.get(url).then(response => {
          this.deleteLoading = false
          if (response.status == 200 && response.data.status == 1) {
            this.init()
            this.deleteLoading = false
            this.$Message.success(response.data.message)
          }
        })
      }
    },
    computed: {
      auth(){
        return this.$store.state.personalAuth == 0 || this.$store.state.enterpriseAuth == 0
      }
    },
    watch: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
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
        min-height: 750px;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-family: 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .operator-bar {
          font-size: 0px;
          margin-top: 20px;
          button {
            margin-right: 10px;
          }
          .ivu-dropdown {
            margin-left: 0px !important;
          }
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
        }
      }
    }
  }
</style>
