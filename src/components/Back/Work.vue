<template>
  <div class="background">
    <!-- Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin -->
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
                  <Form ref="workForm" :model="formItem" :label-width="71" :rules="formItemRules">
                    <Form-item label="工单标题" prop="title">
                      <Input :maxlength="20" v-model="formItem.title" placeholder="请以1-20个字简单描述一下问题"></Input>
                    </Form-item>
                    <Form-item label="问题类型" prop="type">
                      <Select v-model="formItem.type" placeholder="产品功能咨询" @on-change="clear">
                        <Option v-for="(item,index) in Object.keys(orderType)" :value="item" :key="index">{{item}}</Option>
                      </Select>
                    </Form-item>
                    <Form-item label="产品" prop="product">
                      <Select v-model="formItem.product" placeholder="产品功能咨询">
                        <Option v-for="item in orderType[formItem.type]" :value="item.id" :key="item.id">
                          {{item.description}}
                        </Option>
                      </Select>
                    </Form-item>
                    <Form-item label="提现金额" prop="cost" v-if="formItem.product=='19'">
                      <InputNumber :max="formItem.remainder" :min="10" v-model="formItem.cost"
                                   style="width:300px"></InputNumber>
                    </Form-item>
                    <Form-item label="问题描述" prop="description">
                      <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 5,maxRows: 7}"
                             placeholder="请输入..."></Input>
                    </Form-item>
                    <FormItem label="手机号码" prop="phoneNumber">
                      <Input v-model="formItem.phoneNumber" placeholder="请输入手机号码"></Input>
                    </FormItem>
					<FormItem label="" style="width: 552px;">
						<p style="color:rgba(0,0,0,0.43);">
						  可上传5个大小不超过5M的附件，支持格式：jpg,png,gif,txt,doc,docx,eml,pdf, xlsx, xls</p>
					  <div>
					    <div style="display: flex;padding:20px;margin-left: -20px;line-height: 0;">
					      <div>
					        <div class="demo-upload-list" v-for="item,index in uploadList">
								<template v-if="item.status === 'finished'">
										<img :src="item.url" :onerror="errorimg" style="width: 80px;height: 80px;position: relative;">
										<div v-if="file !== null" class="imgzi">{{ item.name }}</div>
										<div class="demo-upload-list-cover">
												<Icon type="ios-eye-outline" @click.native="showPicture(item,item.name,index)"></Icon>
												<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
										</div>
								</template>
								<template v-else>
										<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
								<Upload
										ref="upload"
										:show-upload-list="false"
										:default-file-list="defaultList"
										:on-success="combine"
										:format="['jpg','jpeg','png','gif','txt','doc','docx','eml','pdf','xlsx','xls']"
										:max-size="5120"
										:on-format-error="handleFormatError"
										:on-exceeded-size="handleMaxSize"
										:before-upload="handleUpload"
										type="drag"
										action="https://zschj.xrcloud.net/file/upFile.do"
										style="display: inline-block;">
										<div v-if="uploadList.length < 5" style="padding: 20px;height: 80px;border:1px solid rgba(217,217,217,1);color: #999;background:rgba(255,255,255,1);width: 80px;">
												<img src="../../assets/img/usercenter/uc-add.png" />
										</div>
								</Upload>
					      </div>
					    </div>
					  </div>
					</FormItem>					
                    <span class="submit" @click="submit('workForm')">提交工单</span>
                  </Form>
                </div>

                <div class="question">
                  <label>常见问题</label>
                  <span class="q">1、带宽不够怎么办？</span>
                  <span class="a">购买成功后可以通过控制台升级带宽，新睿云主机最大支持100Mbps带宽。</span>
                  <span class="q">2、购买后是否支持升级？</span>
                  <span class="a">购买的默认主机无法升级配置，仅可升级带宽，定制主机可随时根据需要升级配置。</span>
                  <span class="q">3、Windows服务器只有一个分区吗？</span>
                  <span class="a">默认提供的硬盘为40GB空间，默认硬盘没有分区，用户可根据自身需求在windows操作系统的计算机管理-》磁盘管理中通过压缩卷创建D盘。</span>
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
                <div style="width:561px;">
                  <div>
                    <div v-for="(item,index) in operatingOrder" :key="index" class="item" style="width:561px;background:rgba(255,255,255,1);box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);border-radius:10px;padding: 20px;margin: 0 0 30px 3px;">
                      <label>{{item.title}}</label>
                      <div style="display: flex;flex-wrap: wrap">
                        <span style="width:38%">问题类型 : {{item.description}}</span>
                        <span style="width:62%">创建时间 : {{item.puddate}}</span>
                        <span style="width:38%;margin-top: 10px;">所属产品 : {{item.subdescription}}</span>
                        <span style="width:62%;margin-top: 10px;">持续时间 : {{item.timeago}}</span>
						<span style="width:100%;"><img src="../../assets/img/work/txt.png" style="width: 80px;height: 80px;margin: 20px 20px 0 0;" /></span>
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
                    <div v-for="(item,index) in closingOrder" :key="item.id" class="item">
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
            <Tab-pane label="工单详情" :disabled="false" name="工单详情">
              <div style="display: flex;justify-content: space-between;">
                <div class="operating detail" style="width:52%;display: block">
                  <div class="item">
                    <label>{{orderDetail[2][0].title}}</label>
                    <div>
                      <span style="width:38%;">问题类型 : {{orderDetail[0].description}}</span>
                      <span style="width:38%;">创建时间 : {{new Date(parseInt(orderDetail[2][0].puddate)).format('yyyy-MM-dd')}}</span>
					  <span style="width:38%;margin-top: 10px;">持续时间 : {{orderDetail[0].timeago}}</span>
					  <span style="width:38%;margin-top: 10px;">所属产品 : {{orderDetail[0].subdescription}}</span>
                      <!--span>{{orderDetail[1].description}}</span-->
                    </div>
                    <div class="reply-wrapper" ref="reply">
                      <div class="item" style="border-bottom:1px solid #d8d8d8">
                        <span class="main">问题描述</span>
                        <span class="mini" style="margin-bottom:13px">{{orderDetail[2][0].issue}}</span>
						<span style="width:100%;"><img src="../../assets/img/work/txt.png" style="width: 80px;height: 80px;margin: 7px 20px 15px 0;" /></span>
                      </div>
                      <div class="item" v-for="item in orderDetail[3]" style="position: relative">
                        <span v-if="item.uname!=null" class="main">客服工程师</span>
                        <span v-if="item.uname==null" class="main">您</span>
                        <span class="mini">{{item.g_reply}}</span>
                        <span
                          style="position: absolute;bottom: -17px;right: 65px;font-size: 12px;color: rgba(153,153,153,0.65);">{{new Date(parseInt(item.repdate)).format('yyyy-MM-dd hh:mm')}}</span>
                      </div>

                    </div>
                  </div>
                  <div style="margin-top:20px;" v-if="orderDetail[2][0].wcSataus!=4">
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
			 <!--显示图片-->
			<Modal width="960" v-model="showModal.showPicture" :scrollable="true" id="modelimg">
			  <div class="newPhone">
			    <img :src="imgName" style="display:block;max-height: 600px;max-width: 900px;">
			  </div>
			  <div slot="footer">
			  </div>
			</Modal>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import timeago from 'timeago.js'
	import regExp from '../../util/regExp'
	import axios from 'axios'
	import $store from '../../vuex'

  export default {
    data() {
      const validPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|7|8|9|6|7]\d{9}$/;
        if (!reg.test(this.formItem.phoneNumber)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      return {
		  errorimg: '',
		  UploadLeix:[],
		  Leixsta:[],
				defaultList: [],
                imgName: [],
                visible: false,
                uploadList: [],
				showModal:{
					showPicture:false
				},
				file: null,
        formItem: {
          title: '',
          type: '',
          product: null,
          description: '',
          remainder: 0,
          cost: 10,
					combine: '',
          phoneNumber: ''
        },
        formItemRules: {
          title: [
            {required: true, message: "请输入工单标题", trigger: "blur"}
          ],
          type: [
            {required: true, message: "请选择问题类型", trigger: "change"}
          ],
          product: [
            {required: true, message: "请选择产品", trigger: "change"}
          ],
          description: [
            {required: true, message: "请输入问题描述", trigger: "blur"}
          ],
          cost: [
            {required: true, message: "请输入提现金额", trigger: "blur"}
          ],
          phoneNumber: [
            {required: true, message: "请输入手机号码", trigger: "blur"},
            {validator: validPhoneNumber, tirgger: "blur"}
          ],
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
        loading: false
      }
    },
    created() {
      this.$http.get('order/orderType.do').then((response) => {
        if (response.status == 200) {
          this.orderType = response.data.result
        } else {
          this.$Message.error('工单接口错误')
        }
      })
      this.getOrders('operating')
      this.getOrders('closing')
      this.$http.post('device/DescribeWalletsBalance.do').then(response => {
        this.formItem.remainder = Number(response.data.data.remainder)
      })
      /* if (this.$route.query.logData) {
         this.formItem.type = '产品故障'
         switch (this.$route.query.logData.operatetarget) {
           case '主机':
             this.formItem.product = '19'
             break
           case '快照':
             this.formItem.product = '20'
             break
           case '子网':
             this.formItem.product = '29'
             break
           case 'VPC':
             this.formItem.product = '29'
             break
           case '公网':
             this.formItem.product = '29'
             break
           case '镜像':
             this.formItem.product = '27'
             break
           case '负载均衡':
             this.formItem.product = '28'
             break
           case '防火墙':
             this.formItem.product = '30'
             break
           case '硬盘':
             this.formItem.product = '31'
             break
           case'云数据库':
             this.formItem.product = '33'
             break;
           case'GPU服务器':
             this.formItem.product = '34'
             break;
         }
         this.formItem.description = this.$route.query.logData.operatedes + '失败'
       }*/
    },
    methods: {
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
			//显示原图
			showPicture(item,name,index) {
			  if(this.UploadLeix[index]==true){
				  this.imgName=item.url
				  this.showModal.showPicture = true
			  }
			  else if(this.UploadLeix[index]==false){
				  this.$Message.info({
				    content: '该文件格式不支持放大查看！'
				  })
			  }
			},
			handleFormatError() {
			  this.$Message.info({
			    content: '仅支持jpg,png,gif,txt,doc,docx,eml,pdf, xlsx, xls格式的文件上传'
			  })
			},
			handleMaxSize() {
			  this.$Message.info({
			    content: '上传的文件过大'
			  })
			},
			handleUpload (file) {
          this.file = file;
					const check = this.uploadList.length < 5;
					if (!check) {
					    this.$Notice.warning({
					        title: '可上传文件不超过五个！'
					    });
					}
					return check;
      },
			combine(response,file) {
			  if (response.status == 1) {
					file.url = response.result
					console.log(file)
					//获取最后一个.的位置
					var site11 = file.name.lastIndexOf("\.");
					//截取最后一个.后的值
					var end11=this.file.name.substring(site11 + 1, file.name.length);
					if(end11=='jpg'||end11=='jpeg'||end11=='png'||end11=='gif'){
						this.UploadLeix.push(true)
					}
					else if(end11=='txt'){
						this.errorimg='this.src="' + require('../../assets/img/work/txt.png') + '"'
						this.UploadLeix.push(false)
					}
					else if(end11=='doc'||end11=='docx'){
						this.errorimg='this.src="' + require('../../assets/img/work/doc.png') + '"'
						this.UploadLeix.push(false)
					}
					else if(end11=='eml'){
						this.errorimg='this.src="' + require('../../assets/img/work/eml.png') + '"'
						this.UploadLeix.push(false)
					}
					else if(end11=='pdf'){
						this.errorimg='this.src="' + require('../../assets/img/work/pdf.png') + '"'
						this.UploadLeix.push(false)
					}
					else if(end11=='xlsx'||end11=='xls'){
						this.errorimg='this.src="' + require('../../assets/img/work/xlsx.png') + '"'
						this.UploadLeix.push(false)
					}
					if(this.file.name.length<=17){
						file.name = this.file.name
					}
					else{
						var before=this.file.name.split('.')[0]
						var berorett=before.substring(before.length-1);
						//var enter=this.file.name.split('.')[1]
						 //获取最后一个.的位置
						var site = this.file.name.lastIndexOf("\.");
						//截取最后一个.后的值
						var end=this.file.name.substring(site + 1, this.file.name.length);
						file.name= this.file.name.slice(0,17)+"..."+berorett+'.'+end;
					}
			  }
			},
      urge() {
        this.$Message.success({
          content: '提醒成功，我们将为您加紧处理。',
          top: 150,
          duration: 2,
          closable: true
        })
      },
      ok(order, index) {
        var url = 'order/closeOrder.do'
        this.$http.get(url, {
          params: {
            orderid: order.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.operatingOrder.splice(index, 1)
            this.closingOrder.push(order)
            this.$Message.success('已关闭工单')
            if(this.operatingCurrPage !== 1 && this.operatingOrder.length === 0){
              this.operatingCurrPage -=1
            }
            this.getOrders('operating')
            this.getOrders('closing')
          }
        })
      },
      del(item, index) {
        var url = 'order/delOrder.do'
        this.$http.get(url, {
          params: {
            orderid: item.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.closingOrder.splice(index, 1)
            this.$Message.success(response.data.msg)
            if(this.closingCurrPage !== 1 && this.closingOrder.length === 0){
              this.closingCurrPage -=1
            }
            this.getOrders('closing')
            this.getOrders('operating')
          }
        })
      },
      viewDetail(item) {
        var url = 'order/viewOrder.do'
        this.$Loading.start()
        this.$http.get(url, {
          params: {
            orderid: item.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.orderDetail = response.data.msg
            this.$Loading.finish()
            this.tableName = '工单详情'
          }
        })
      },
      clear(value) {
        this.formItem.product = ''
      },
      submit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            var url = 'order/createOrder.do'
            let params = {
              title: this.formItem.title,
              content: this.formItem.description,
              gid: this.orderType[this.formItem.type][0].gid,
              cid: this.formItem.product,
              phone: this.formItem.phoneNumber
            }
            // 32代表提现，需要多设置一个参数
            if (params.cid == '19') {
              params.userRefund = this.formItem.cost
            }
            this.$http.get(url, {
              params
            }).then(response => {
              this.loading = false
              if (response.status == 200 && response.data.status == 1) {
                this.getOrders('operating')
                this.formItem.title = ''
                this.formItem.type = ''
                this.formItem.description = ''
                this.formItem.product = null
                this.$Message.success({
                  content: response.data.message,
                  top: 150,
                  duration: 2,
                  closable: true
                })
                this.tableName = '处理中的工单'
              } else {
                this.$Message.warning({
                  content: response.data.message,
                  top: 150,
                  duration: 2,
                  closable: true
                })
              }
            })
          }
        })
      },
      reply() {
        if (this.editorValue.trim() == '') {
          this.$Message.warning('请输入回复内容! ')
          return
        }
        var url = 'order/reply.do'
        this.$http.get(url, {
          params: {
            orderid: this.orderDetail[2][0].id,
            editorValue: this.editorValue
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.orderDetail[3].push({g_reply: response.data.msg.g_reply, uname: null, repdate: new Date().getTime()})
            this.editorValue = ''
          }
        })
      },
      getOrders(type) {
        var url = 'order/getOrders.do'
        this.$http.get(url, {
          params: {
            type: type,
            currentPage: this[type + 'CurrPage'],
            pageSize: this.pageSize
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this[type + 'Order'] = []
            this[type + 'Total'] = Number(response.data.count)
            response.data.result.forEach(item => {
              item.puddate = parseInt(item.puddate)
              item.timeago = timeago().format(item.puddate, 'zh_CN')
              item.puddate = new Date(item.puddate).format('yyyy年MM月dd日 hh:mm:ss')
              this[type + 'Order'].push(item)
            })
          }
        })
      },
      changeOperatingPage(page) {
        this.operatingCurrPage = page
        this.getOrders('operating')
      },
      changeClosingPage(page) {
        this.closingCurrPage = page
        this.getOrders('closing')
      }
    },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
    computed: {
      disabled() {
        return !(this.formItem.title && this.formItem.type && this.formItem.product && this.formItem.description)
      }
    }

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
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
              margin-left: 75px;
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
            margin: 0px 0px 20px;
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
	.imgzi{
		width:80px;
		height:30px;
		font-size:12px;
		color:rgba(102,102,102,1);
		line-height:15px;
		position: relative;
		margin-top: -30px;
		overflow: hidden;
		word-break:break-all;
	}
	.demo-upload-list{
		height: 80px;
		border:1px solid rgba(217,217,217,1);
		color: #999;
		background:rgba(255,255,255,1);
		width: 80px;
		margin: 0;
		line-height: 80px;
        display: inline-block;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
		vertical-align: top;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 5px;
    }
</style>
