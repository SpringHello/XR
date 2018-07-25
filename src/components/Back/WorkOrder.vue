<template>
  <div class="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div class="wrapper">
      <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 工单</span>
      <div class="content">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#houtaiicon-gongdan"></use>
        </svg>
        <span style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">工单</span>
        <div style="margin-top:20px;min-height:660px;">
          <Tabs type="card" v-model="tableName" :animated="false">
            <Tab-pane label="发起工单" name="发起工单">

              <div class="new-order">
                <div class="form">
                  <Form :model="formItem" :label-width="71">
                    <Form-item label="工单标题" required>
                      <Input :maxlength="20" v-model="formItem.title" placeholder="请以1-20个字简单描述一下问题"></Input>
                    </Form-item>
                    <Form-item label="问题类型" required>
                      <Select v-model="formItem.type" placeholder="产品功能咨询" @on-change="clear">
                        <Option v-for="item in Object.keys(orderType)" :value="item" :key="item">{{item}}</Option>
                      </Select>
                    </Form-item>
                    <Form-item label="产品" required>
                      <Select v-model="formItem.product" placeholder="产品功能咨询">
                        <Option v-for="item in orderType[formItem.type]" :value="item.id" :key="item.id">
                          {{item.description}}
                        </Option>
                      </Select>
                    </Form-item>
                    <Form-item label="问题描述" required>
                      <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 5,maxRows: 7}"
                             placeholder="请输入..."></Input>
                    </Form-item>
                    <span class="submit" :class="{disabled:disabled}" @click="submit">提交工单</span>
                  </Form>
                </div>

                <div class="question">
                  <label>常见问题</label>
                  <span class="q">1、带宽不够怎么办？</span>
                  <span class="a">购买成功后可以通过控制台升级带宽，睿云主机最大支持100Mbps带宽。</span>
                  <span class="q">2、购买后是否支持升级？</span>
                  <span class="a">购买的默认主机无法升级配置，仅可升级带宽，定制主机可随时根据需要升级配置。</span>
                  <span class="q">3、Windows服务器只有一个分区吗？</span>
                  <span class="a">默认提供的硬盘为20GB空间，默认硬盘没有分区，用户可根据自身需求在windows操作系统的计算机管理-》磁盘管理中通过压缩卷创建D盘。</span>
                  <span class="q">4、云主机初次登录时，提示密码不正确？</span>
                  <span class="a">请根据购买之后您收到登录名和密码登陆主机，您可以在消息中心、绑定邮箱／手机短信中查看账户名和密码。如您忘记密码可通过控制台，先将主机关闭后，再进行重置密码。</span>
                  <span class="q">5、主机远程连接失败？</span>
                  <span class="a">系统默认打开防火墙22端口（linux系统远程连接）和3389端口（windows系统远程连接），如果关闭了，通过客户端进行主机远程连接需要打开相应端口。</span>
                  <span class="q">6、为何无法访问我的服务器上的服务？</span>
                  <span class="a">请先检查您的防火墙设置。为了加强主机的安全性， 初始状态下每个防火墙只默认打开22、3389、80、443端口和ping命令，如需要访问数据库、FTP等服务，请添加相应端口。</span>
                </div>
              </div>


            </Tab-pane>
            <Tab-pane label="处理中的工单" name="处理中的工单">
              <div class="operating">
                <div style="width:35%">
                  <div>
                    <div v-for="(item,index) in operatingOrder" :key="item" class="item">
                      <label>{{item.title}}</label>
                      <div style="display: flex;flex-wrap: wrap">
                        <span style="width:38%">问题类型 : {{item.description}}</span>
                        <span style="width:62%">创建时间 : {{item.puddate}}</span>
                        <span style="width:38%">所属产品 : {{item.subdescription}}</span>
                        <span style="width:62%">持续时间 : {{item.timeago}}</span>
                      </div>
                      <div class="operating-menu">
                        <span @click="viewDetail(item)">查看详情</span>
                        <span @click="urge">催一催</span>
                        <span>
                        <Poptip
                          confirm
                          title="您确认关闭这条工单吗？"
                          width="200"
                          @on-ok="ok(item,index)">
                          <span style="margin-right: 10px;color: #2A99F2;cursor: pointer;">关闭工单</span>
                        </Poptip>
                      </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="operatingOrder.length==0" class="logo">
                    <span>暂无处理中工单</span>
                  </div>
                  <Page v-if="operatingOrder.length!=0" :total="operatingTotal" :page-size='pageSize'
                        :current="operatingCurrPage"
                        @on-change="changeOperatingPage"></Page>
                </div>
                <div class="question">
                  <label style="margin-top:0px">常见问题</label>
                  <span class="q">1、带宽不够怎么办？</span>
                  <span class="a">购买成功后可以通过控制台升级带宽，睿云主机最大支持xMbps带宽。</span>
                  <span class="q">2、购买后是否支持升级？</span>
                  <span class="a">购买的默认主机无法升级配置，仅可升级带宽，定制主机可随时根据需要升级配置。</span>
                  <span class="q">3、Windows服务器只有一个分区吗？</span>
                  <span class="a">默认提供的硬盘为100GB空间，默认硬盘没有分区，用户可根据自身需求在windows操作系统的计算机管理-》磁盘管理中通过压缩卷创建D盘。</span>
                  <span class="q">4、云主机初次登录时，提示密码不正确？</span>
                  <span class="a">请根据购买之后您收到登录名和密码登陆主机，您可以在消息中心、绑定邮箱／手机短信中查看账户名和密码。如您忘记密码可通过控制台，先将主机关闭后，再进行重置密码。</span>
                  <span class="q">5、主机远程连接失败？</span>
                  <span class="a">系统默认打开防火墙22端口（linux系统远程连接）和3389端口（windows系统远程连接），如果关闭了，通过客户端进行主机远程连接需要打开相应端口。</span>
                  <span class="q">6、为何无法访问我的服务器上的服务？</span>
                  <span
                    class="a">请先检查您的防火墙设置。为了加强主机的安全性， 初始状态下每个防火墙只默认打开22、3389、80、443端口和ping命令，如需要访问数据库、FTP等服务，请添加相应端口。</span>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane label="已关闭工单" name="已关闭工单">
              <div style="display: flex;justify-content: space-between;">
                <div class="operating" style="width:35%">
                  <div>
                    <div v-for="(item,index) in closingOrder" :key="item" class="item">
                      <label>{{item.title}}</label>
                      <div style="display: flex; flex-wrap: wrap;">
                        <span style="width:38%">问题类型 : {{item.description}}</span>
                        <span style="width:62%">创建时间 : {{item.puddate}}</span>
                        <span style="width:38%">所属产品 : {{item.subdescription}}</span>
                        <span style="width:62%">经过时间 : {{item.timeago}}</span>
                      </div>
                      <div class="operating-menu">
                        <span @click="viewDetail(item)">查看详情</span>
                        <span>
                        <Poptip
                          confirm
                          title="您确认删除这条工单吗？"
                          width="200"
                          @on-ok="del(item,index)">
                          <span style="margin-right: 10px;color: #2A99F2;cursor: pointer;">删除工单</span>
                        </Poptip>
                      </span>
                      </div>
                    </div>
                    <Page :total="closingTotal" v-if="closingOrder.length!=0" :page-size="pageSize"
                          :current="closingCurrPage"
                          @on-change="changeClosingPage"></Page>
                  </div>
                  <div v-if="closingOrder.length==0" class="logo">
                    <span style="left:15px;">暂无关闭工单</span>
                  </div>

                </div>
                <div class="question">
                  <label>常见问题</label>
                  <span class="q">1、带宽不够怎么办？</span>
                  <span class="a">购买成功后可以通过控制台升级带宽，睿云主机最大支持xMbps带宽。</span>
                  <span class="q">2、购买后是否支持升级？</span>
                  <span class="a">购买的默认主机无法升级配置，仅可升级带宽，定制主机可随时根据需要升级配置。</span>
                  <span class="q">3、Windows服务器只有一个分区吗？</span>
                  <span class="a">默认提供的硬盘为100GB空间，默认硬盘没有分区，用户可根据自身需求在windows操作系统的计算机管理-》磁盘管理中通过压缩卷创建D盘。</span>
                  <span class="q">4、云主机初次登录时，提示密码不正确？</span>
                  <span class="a">请根据购买之后您收到登录名和密码登陆主机，您可以在消息中心、绑定邮箱／手机短信中查看账户名和密码。如您忘记密码可通过控制台，先将主机关闭后，再进行重置密码。</span>
                  <span class="q">5、主机远程连接失败？</span>
                  <span class="a">系统默认打开防火墙22端口（linux系统远程连接）和3389端口（windows系统远程连接），如果关闭了，通过客户端进行主机远程连接需要打开相应端口。</span>
                  <span class="q">6、为何无法访问我的服务器上的服务？</span>
                  <span
                    class="a">请先检查您的防火墙设置。为了加强主机的安全性， 初始状态下每个防火墙只默认打开22、3389、80、443端口和ping命令，如需要访问数据库、FTP等服务，请添加相应端口。</span>
                </div>
              </div>

            </Tab-pane>
            <Tab-pane label="工单详情" :disabled="true" name="工单详情">
              <div style="display: flex;justify-content: space-between;">
                <div class="operating detail" style="width:52%;display: block">
                  <div class="item">
                    <label>{{orderDetail[2][0].title}}</label>
                    <div>
                      <span>问题类型 : {{orderDetail[0].description}}</span>
                      <span>创建时间 : {{new Date(Number.parseInt(orderDetail[2][0].puddate)).format('yyyy-MM-dd')}}</span>
                      <!--span>{{orderDetail[1].description}}</span-->
                    </div>
                    <div class="reply-wrapper" ref="reply">
                      <div class="item" style="border-bottom:1px solid #d8d8d8">
                        <span class="main">问题描述</span>
                        <span class="mini" style="margin-bottom:13px">{{orderDetail[2][0].issue}}</span>
                      </div>
                      <div class="item" v-for="item in orderDetail[3]" style="position: relative">
                        <span v-if="item.uname!=null" class="main">客服工程师</span>
                        <span v-if="item.uname==null" class="main">您</span>
                        <span class="mini">{{item.g_reply}}</span>
                        <span
                          style="position: absolute;bottom: -17px;right: 65px;font-size: 12px;color: rgba(153,153,153,0.65);">{{new Date(Number.parseInt(item.repdate)).format('yyyy-MM-dd hh:mm')}}</span>
                      </div>

                    </div>
                  </div>
                  <div style="margin-top:20px;" v-if="orderDetail[2][0].wc_sataus==2">
                    <Input v-model="editorValue" type="textarea" :rows="4" placeholder="请输入..."></Input>
                    <button @click="reply">发送</button>
                  </div>
                </div>
                <div class="question">
                  <label>常见问题</label>
                  <span class="q">1、带宽不够怎么办？</span>
                  <span class="a">购买成功后可以通过控制台升级带宽，睿云主机最大支持xMbps带宽。</span>
                  <span class="q">2、购买后是否支持升级？</span>
                  <span class="a">购买的默认主机无法升级配置，仅可升级带宽，定制主机可随时根据需要升级配置。</span>
                  <span class="q">3、Windows服务器只有一个分区吗？</span>
                  <span class="a">默认提供的硬盘为100GB空间，默认硬盘没有分区，用户可根据自身需求在windows操作系统的计算机管理-》磁盘管理中通过压缩卷创建D盘。</span>
                  <span class="q">4、云主机初次登录时，提示密码不正确？</span>
                  <span class="a">请根据购买之后您收到登录名和密码登陆主机，您可以在消息中心、绑定邮箱／手机短信中查看账户名和密码。如您忘记密码可通过控制台，先将主机关闭后，再进行重置密码。</span>
                  <span class="q">5、主机远程连接失败？</span>
                  <span class="a">系统默认打开防火墙22端口（linux系统远程连接）和3389端口（windows系统远程连接），如果关闭了，通过客户端进行主机远程连接需要打开相应端口。</span>
                  <span class="q">6、为何无法访问我的服务器上的服务？</span>
                  <span
                    class="a">请先检查您的防火墙设置。为了加强主机的安全性， 初始状态下每个防火墙只默认打开22、3389、80、443端口和ping命令，如需要访问数据库、FTP等服务，请添加相应端口。</span>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import timeago from 'timeago.js'
  export default{
    data(){
      return {
        formItem: {
          title: '',
          type: '',
          product: null,
          description: ''
        },
        tableName: '发起工单',
        orderList: [],
        orderDetail: [{}, {}, [{}], []],

        orderType: [],

        operatingOrder: [],
        closingOrder: [],

        editorValue: '',

        operatingCurrPage: 1,
        operatingTotal: 0,

        closingCurrPage: 1,
        closingTotal: 0,

        pageSize: 4,

        loadingMessage: '',
        loading: false,

      }
    },
    created(){
      this.$http.get('order/orderType.do')
        .then((response) => {
          if (response.status == 200) {
            this.orderType = response.data.result
          } else {
            this.$Message.error('工单接口错误');
          }
        })
      this.getOrders('operating');
      this.getOrders('closing');
      if (this.$route.query.logData) {
        this.formItem.type = '产品故障';
        switch (this.$route.query.logData.operatetarget) {
          case'主机':
            this.formItem.product = '19'
            break;
          case'快照':
            this.formItem.product = '20'
            break;
          case'子网':
            this.formItem.product = '29'
            break;
          case'VPC':
            this.formItem.product = '29'
            break;
          case'公网':
            this.formItem.product = '29'
            break;
          case'镜像':
            this.formItem.product = '27'
            break;
          case'负载均衡':
            this.formItem.product = '28'
            break;
          case'防火墙':
            this.formItem.product = '30'
            break;
          case'硬盘':
            this.formItem.product = '31'
            break;
        }
        this.formItem.description = this.$route.query.logData.operatedes + '失败';
      }
    },
    methods: {
      urge(){
        this.$Message.success({
          content: '提醒成功，我们将为您加紧处理。',
          top: 150,
          duration: 2,
          closable: true
        })
      },
      ok(order, index){
        var url = 'order/closeOrder.do'
        this.$http.get(url,{
            params:{
              orderid:order.id
            }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.operatingOrder.splice(index, 1)
              this.closingOrder.push(order)
              this.$Message.success('已关闭工单')
            } else {
              this.$message.info({
                  content: response.data.msg
              })
            }
          })

      },
      del(item, index){
        var url = 'order/delOrder.do'
        this.$http.get(url,{
            params:{
              orderid:item.id
            }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.closingOrder.splice(index, 1);
              this.$Message.success(response.data.msg)
            } else {
              this.$message.info({
                content: response.data.msg
              })
            }
          })
      },
      viewDetail(item){

        var url = 'order/viewOrder.do'
        this.$Loading.start();
        this.$http.get(url,{
            params:{
              orderid:item.id
            }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.orderDetail = response.data.msg
            this.$Loading.finish()
            this.tableName = '工单详情'
          }
        })
      },
      clear(value){
        this.formItem.product = ''
      },
      submit(){
        if (this.disabled) {
          this.$Message.warning({
            content: '请输入必填项',
            top: 150,
            duration: 2,
            closable: true
          })
          return
        }
        this.loadingMessage = '创建工单中'
        this.loading = true
        var url = 'order/createOrder.do'
        this.$http.get(url,{
            params:{
              title:this.formItem.title,
              content:this.formItem.description,
              gid:this.orderType[this.formItem.type][0].gid,
              cid:this.formItem.product
            }
        })
          .then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.getOrders('operating');
              this.formItem.title = ''
              this.formItem.type = ''
              this.formItem.description = ''
              this.formItem.product = null
              this.$Message.success({
                content: response.data.msg,
                top: 150,
                duration: 2,
                closable: true
              })
              this.tableName = '处理中的工单'
            } else {
              this.$message.info({
                content: response.data.msg,
              })
            }
          })

      },
      reply(){
        if (this.editorValue.trim() == '') {
          this.$Message.warning("请输入回复内容!");
          return
        }
        var url = 'order/reply.do'
        this.$http.get(url,{
          orderid:this.orderDetail[2][0].id,
          editorValue:this.editorValue
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.orderDetail[3].push({g_reply: response.data.msg.g_reply, uname: null, repdate: new Date().getTime()})
              this.editorValue = ''
            }
          })
      },
      getOrders(type){
        var url = 'order/getOrders.do'
        this.$http.get(url,{
            params:{
              type:type,
              currentPage:this[type + 'CurrPage'],
              pageSize:this.pageSize
            }
        })
          .then(response => {
            if (response.status == 200) {
              this[type + 'Order'] = []
              this[type + 'Total'] = response.data.count
              response.data.result.forEach(item => {
                item.puddate = Number.parseInt(item.puddate)
                //item.remainingTime = nowTime - item.puddate
                item.timeago = timeago().format(item.puddate, 'zh_CN');
                item.puddate = new Date(item.puddate).format('yyyy年MM月dd日 hh:mm:ss')
                /*item.remainingDay = Math.floor(item.remainingTime/mSecInDay)
                 item.remainingHour = Math.floor((item.remainingTime%mSecInDay)/mSecInHour)
                 item.remainingMinute = Math.floor((item.remainingTime%mSecInHour)/mSecInMinute)*/
                this[type + 'Order'].push(item)
              })
            }
          })
        /*.catch(response=>{
         this.$Message.error({
         content:'啊哦,服务器内部错误!',
         top: 150,
         duration: 2,
         closable: true
         })
         })*/
      },
      changeOperatingPage(page){
        this.operatingCurrPage = page
        this.getOrders("operating")
      },
      changeClosingPage(page){
        this.closingCurrPage = page
        this.getOrders("closing")
      }
    },
    computed: {
      disabled(){
        return !(this.formItem.title && this.formItem.type && this.formItem.product && this.formItem.description)
      }
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
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .new-order {
          display: flex;
          justify-content: space-between;
          .form {
            width: 35%;
            .submit {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 12px;
              color: #FFFFFF;
              line-height: 18px;
              background: #2A99F2;
              border-radius: 4px;
              padding: 5px 15px;
              cursor: pointer;
              user-select: none;
              float: right;
            }
            .disabled {
              cursor: not-allowed;
            }
          }
        }
        .operating {
          width: 100%;
          min-height: 500px;
          display: flex;
          //display: block;
          justify-content: space-between;
          .item:first-of-type {
            label {
              margin-top: 0px;
            }
          }
          label {
            font-family: Microsoft YaHei;
            font-size: 18px;
            color: rgba(17, 17, 17, .85);
            letter-spacing: 0;
            margin: 40px 0px 20px;
            display: block;
          }
          span {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 14px;
            color: rgba(17, 17, 17, 0.65);
            letter-spacing: 0;
            margin-bottom: 5px;
            //width: 160px;
            display: inline-block;
          }
          .margin {
            margin-top: 10px;
          }
          .operating-menu {
            margin-top: 15px;
            & > span {
              margin-right: 10px;
              color: #2A99F2;
              cursor: pointer;
            }
          }
          .ivu-page {
            margin-top: 15px;
          }
          .reply-wrapper {
            padding: 10px 0px;
            margin-top: 15px;
            .item {
              width: 80%;
              margin-top: 40px;
              span {
                word-wrap: break-word;
                margin-right: 0px;
                word-break: break-all
              }
              &:first-of-type {
                margin-top: 0px;
              }
              &:nth-of-type(2) {
                margin-top: 20px;
              }
              .main {
                font-family: Microsoft Yahei, 微软雅黑;
                font-size: 16px;
                color: rgba(2, 2, 2, 0.75);
                display: block;
                margin-bottom: 9px;
              }
              .mini {
                font-family: Microsoft Yahei, 微软雅黑;
                font-size: 12px;
                color: rgba(17, 17, 17, 0.65);
                line-height: 19px;
              }
            }
          }
          button {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 15px;
            color: #FFFFFF;
            background: #2A99F2;
            border-radius: 4px;
            padding: 5px 15px;
            float: right;
            margin-top: 15px;
            outline: none;
            border: none;
          }
          .logo {
            width: 113px;
            height: 80px;
            // background: url("../../assets/img/Shape.png");
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 150px;
            left: 158px;
            & > span {
              position: absolute;
              top: 33px;
              left: 8px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: #666666;
              letter-spacing: 0;
              user-select: none;
              cursor: default;
            }
          }
        }
        .question {
          width: 40%;
          border-left: 1px solid #E9E9E9;
          padding-left: 15px;
          label {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 18px;
            color: rgba(2, 2, 2, 0.75);
            margin-bottom: 15px;
            display: block;
          }
          span {
            display: block;
            line-height: 19px;
            margin-bottom: 15px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 14px;
          }
          .q {
            color: rgba(-2147483648, -2147483648, -2147483648, 0.75);
          }
          .a {
            color: rgba(-2147483648, -2147483648, -2147483648, 0.43);
          }
        }
      }
    }
  }
</style>
