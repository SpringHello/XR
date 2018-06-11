<template>
  <div class="space_box">
    <div class="space_center">
      <p style="margin:10px 0;"><span style="color: #999999;">云储存/</span><span >云硬盘</span></p>
      <div class="space_block">
        <div class="space_top">
          <div style="width:50%">
            <span class="title">空间详情</span>
          </div>
          <div style="width:50%;text-align:right;">
            <Button @click="$router.push({path:'objectStorage'})" style="margin-right: 10px;">返回</Button>
            <Button @click="filesList" type="primary">刷新</Button>
          </div>
        </div>
        <p style="margin:20px 0;color:#333333;font-size:16px;">{{kjName}}</p>
        <div style="height: 100px;border-bottom:1px solid #D8D8D8;">
          <div style="display: flex;margin-bottom: 24px;font-size:14px;">
              <div style="width:37%">
                <span class="title_one">访问权限：{{kjaccessrights}}</span>
              </div>
              <div style="width:50%;">
                创建时间：2016-9-21 08:50:08
              </div>
          </div>
          <div style="display:flex;font-size:14px;">
              <div style="width:37%">
                内网访问域名：<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinrui.com</span>
              </div>
              <div style="width:50%;">
                外网访问域名：<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinruicloud.com</span>
              </div>
          </div>
        </div>

        <p style="margin-top:20px;">当月用量 2018/04/28-2018</p>
        <div class="center_space">
          <div class="space_Two">
            <p>存储空间容量</p>
            <div class="space_text">{{size}}</div>
          </div>
          <div class="space_one">
            <p>流量</p>
            <div class="space_text" >0KB</div>
          </div>
          <div class="space_one">
            <p>http请求次数</p>
            <div class="space_text" >0次</div>
          </div>
        </div>
        <Tabs type="card" style="margin-top:21px;">
          <TabPane label="Object管理">
            <div style="display:flex;margin-bottom:15px;">
              <div style="width:50%">
                <Button type="primary" style="margin-right:10px;" @click="modal1 = true" >上传</Button>
                <Button type="primary" @click="floder = true">新建文件夹</Button>
              </div>
              <div style="width:50%;text-align:right;">
                <Input v-model="filename" type="text" placeholder="请输入搜索名称" style="width:231px;"/>
                <Button type="primary" @click="filesList">查询</Button>
              </div>
            </div>

              <ul style="margin: 0 0 9px 20px;">
                <li style="display: inline-block;color: #2A99F2;cursor:pointer;" @click="selectFileSrc(item.id,index)" v-for="(item,index) in fileObject" :key="index">{{item.name+'/'}}</li>
              </ul>

            <Table :columns='fileList' :data="fileData"></Table>
          </TabPane>
          <TabPane label="空间设置">
            <div>
              <p style="font-size:18px;color:#333333;margin:0 0 20px 0;">权限设置</p>
              <div style="border:1px solid #e9e9e9;">
                <ul class="space_list">
                  <li :class="indexs == index? 'space_items':'space_item'" v-for="(item,index) in navList" :key="index" @click="navlists(index)">{{item.name}}</li>
                </ul>
                <div style="padding:24px">
                  <p style="color:#666666;font-size:14px;width:950px;">{{ptext}}</p>
                  <Button v-if="indexs != 3" type="primary" style="margin:40px 0 0 0;" @click="checkAcl">确定</Button>
                </div>
                <div class="custom" v-if="indexs == 3">
                  <Button type="primary" @click="jurisdiction = true" style="margin-right: 10px;">添加自定义权限</Button>
                  <Button type="primary" @click="edit = true">自定义权限编辑器</Button>
                  <Table style="margin-top:20px;" :columns="rightList" :data="aclData"></Table>
                </div>
              </div>
            </div>
            <br><br>
            <div class="setting">
              <div  style="display:flex;">
                <div style="width:97%;font-size:18px;color:#333333;">跨域访问设置</div>
                  <div style="width: 65px;">
                    <div class="down" :class="{downlower:!corsHide}" @click="corsLower('cors')"></div>
                    <span style="color: #2A99F2;display: inline-block;">收起</span>
                  </div>
              </div>
              <div v-if="corsHide">
                <div style="margin:10px 0 20px 0;">
                  <Button type="primary" @click="cors = true" style="margin-right: 10px;">CORS规则配置</Button>
                  <Button type="primary" @click="corsedit = true">CORS规则编辑器</Button>
                </div>
                <Table :columns="corstList" :data="corsData"></Table>
              </div>
            </div>
            <br>
            <div>
                <div  style="display:flex;">
                    <div style="width:97%;font-size:18px;color:#333333;">静态网站托管</div>
                    <div style="width: 65px;">
                      <div class="down" :class="{downlower:!staticHide}" @click="corsLower('static')"></div>
                      <span style="color: #2A99F2;display: inline-block;">收起</span>
                    </div>
               </div>
              <div v-if="staticHide">
                    <div class="text-boy">
                      新睿云对象存储支持将自己的存储空间配置成静态网站托管模式，启动静态网站托管模式后，请通过XXXXX（域名）或您绑定的自定义域名进行访问。
                    </div>
                    <p style="color:#999999;font-size:14px;">提示：静态网站托管的默认index页配置在具有公有读取权限的Bucket下生效，自定义错误页和访问重定向在全部权限的Bucket下生效。</p>
                    <Form ref="crossDomain" :model="crossDomain" :label-width="100">
                      <FormItem label="自定义">
                        <Input style="width:317px;" v-model="crossDomain.custom" ></Input>
                        <p>请输入浏览器能够识别的文件作为自定义index页的文件名，为空则不启用自定义index页设置，不允许输入/.</p>
                      </FormItem>
                      <FormItem label="自定义错误页">
                        <Input style="width:317px;" v-model="crossDomain.errorPage"></Input>
                        <p>请输入浏览器能够识别的文件作为自定义错误页的文件名，为空则不启用自定义错误页设置</p>
                      </FormItem>
                      <FormItem label="访问重定向配置">
                        <div style="background-color:#F7F7F7;width:317px;height: 144px;padding:20px 13px">
                          <div>
                            400<Input style="width:260px;" v-model="crossDomain.redirectOne" ></Input>
                          </div>
                          <div>
                            403<Input style="width:260px;" v-model="crossDomain.redirectTwo" ></Input>
                          </div>
                          <div>
                            404<Input style="width:260px;" v-model="crossDomain.redirectThree" ></Input>
                          </div>
                        </div>
                        <p>请输入遇到4XX错误时需要重定向到的完整目标域（支持域名或IP格式，可带端口号），为空则不启用重定向设置</p>
                      </FormItem>
                    </Form>
                    <Button type="primary" style="margin:20px  0 0 102px;" @click="up">保存设置</Button>
                  </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal
      v-model="modal1"
      title="上传文件"
      :scrollable='true'
    >
      <p style="font-size:14px;color:#999999;line-height: 20px;">控制台上传单个文件大小不超过1GB，如需上传更大的文件请使用新睿云对象存储提供的<span style="color:#2A9AF3;cursor:pointer;">API</span></p>
      <p style="font-size:14px;color:#666666;margin:10px 0;">上传路径  文件名称/</p>
      <div class="upload_div">
        <span>待上传文件</span>
        <span>大小</span>
        <span>状态</span>
        <span>操作</span>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="true"
        :on-success="handleSuccess"
        :max-size="1048576"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :on-error="handleError"
        :on-progress="handleUpload"
        multiple
        name="uploadFile"
        :data="fileUpdata"
        type="drag"
        action="http://192.168.3.229:8080/ruirados/object/uploadObject.do"
        class="upload_model"
      >
        <div class="upload_text">
          <Icon type="ios-upload-outline"></Icon><span>选择文件</span>
          <p style="margin-top:10px;color:#999999;">批量上传单词最多上传24个文件，若上传一存在同名文件会直接覆盖，请谨慎操作</p>
        </div>
      </Upload>
    </Modal>
    <!-- 新建文件夹 -->

    <Modal
      v-model="floder"
      title="新建文件夹"
      :scrollable='true'
      @on-ok="createFlies()"
    >
      <div class="space_folder">
        <p style="font-size:14px;color:#666666;">文件夹名称</p>
        <Input type="text" style="width:317px;" v-model="flies"/>
        <p style="color:#999999;">1.文件夹名称全称不超过24个字符</p>
        <p style="color:#999999;">2.名称仅能由字母，数字，中文，下划线，短横线和小数点组成</p>
      </div>
    </Modal>
    <!-- 查看外链 -->
    <Modal
      v-model="outerChain"
      title="查看外链"
      :scrollable='true'
    >
      <div class="space_wailian">
        <div style="text-align: right;">
          <p>文件名称</p>
          <p>有效期</p>
          <p>外链</p>
        </div>
        <div style="width: 77%;margin-left: 20px;">
          <p>{{nameFile}}</p>
          <Select v-model="term" style="width:240px;margin: 10px 0;">
            <Option v-for="item in termList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <Button type="primary" @click="geturl">获取外链</Button>
          <Input type="text" style="width:317px;" v-model="flies"  :readonly="true"></Input>
        </div>
      </div>
    </Modal>
    <!-- 自定义权限 -->
    <Modal
      v-model="jurisdiction"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"
      @on-ok="jurisdictionClick"
    >
      <div class="jurisd">
        <div>Bucket名称：{{bucketName}}</div>
        <div style="margin-left:20px;">存储区域：{{zonename}}</div>
      </div>
      <Form ref="jurisdValidate" :model="jurisdValidate" :rules="jurisdRuleValidate">
          <FormItem prop="grantValue">
            <div style="margin-top:20px;">
              <span>用户授权</span>
              <RadioGroup v-model="jurisdValidate.users" @on-change="usersClick">
                <Radio label='0'>全部用户</Radio>
                <Radio label='1'>自定义用户</Radio>
              </RadioGroup>
              <Input :disabled='grant' v-model="jurisdValidate.grantValue" style="width:420px;" :rows="4" type="textarea"/><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
            </div>
          </FormItem>
          <FormItem label="密码接收渠道" prop="channel">
            <div style="width:366px;display:flex;">
              <div style="width:300px;">
                <CheckboxGroup v-model="jurisdValidate.channel">
                  <Checkbox label="putobject">PutObject</Checkbox>
                  <Checkbox label="getobject">GetObject</Checkbox>
                  <Checkbox label="deleteobject">DeleteObject</Checkbox>
                  <Checkbox label="listbucket">ListObject</Checkbox>
                  <Checkbox label="deletebucket">DeleteBucket</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </FormItem>
        <FormItem prop="influenceValue">
          <div style="margin-top:20px;">
            <span>影响资源</span>
            <RadioGroup v-model="jurisdValidate.sources">
              <Radio label='0'>不可操作</Radio>
              <Radio label='1'>可操作</Radio>
            </RadioGroup>
            <Input  v-model="jurisdValidate.influenceValue"  style="width:420px;" :rows="4" type="textarea"/><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
                <Checkbox true-value="1" false-value="0" v-model="jurisdValidate.referer" >允许白名单为空</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem prop="whiteListValue">
          <Input :disabled='whiteList' v-model="jurisdValidate.whiteListValue" style="width:420px;" :rows="4" type="textarea"/><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
        </FormItem>
      </Form>
    </Modal>

    <!--自定义权限编辑-->
    <Modal
      v-model="edit"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"
      @on-ok="jurisdictionClick"
    >
     <pre style="background-color:#FDF6E3;">
       <code></code>
     </pre>
    </Modal>

    <!--修改自定义权限-->
    <Modal
      v-model="updateDiction"
      title="修改自定义权限"
      :scrollable='true'
      width="550px"
      @on-ok="jurisdUpdateClick"
    >

      <div class="jurisd">
        <div>Bucket名称：{{bucketName}}</div>
        <div style="margin-left:20px;">存储区域：{{zonename}}</div>
      </div>
      <Form ref="updateJurisd" v-model="updateJurisd">
        <FormItem>
          <div style="margin-top:20px;">
            <span>用户授权</span>
            <RadioGroup v-model="updateJurisd.updateUsers" @on-change="usersClick">
              <Radio label="0">全部用户</Radio>
              <Radio label="1">自定义用户</Radio>
            </RadioGroup>
            <Input :disabled='updategrant' v-model="updateJurisd.updateGrantValue" style="width:420px;" :rows="4" type="textarea"></Input><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">密码接收渠道</div>
            <div style="width:300px;">
              <CheckboxGroup v-model="updateJurisd.updateChannel">
                <Checkbox label="putobject">PutObject</Checkbox>
                <Checkbox label="getobject">GetObject</Checkbox>
                <Checkbox label="deleteobject">DeleteObject</Checkbox>
                <Checkbox label="listbucket">ListObject</Checkbox>
                <Checkbox label="deletebucket">DeleteBucket</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </FormItem>
        <FormItem>
          <div style="margin-top:20px;">
            <span>影响资源</span>
            <RadioGroup v-model="updateJurisd.updateSources">
              <Radio label="0">不可操作</Radio>
              <Radio label="1">可操作</Radio>
            </RadioGroup>
            <Input  v-model="updateJurisd.updateInfluenceValue"  style="width:420px;" :rows="4" type="textarea"></Input><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
                <Checkbox  v-model="updateJurisd.updateReferer">允许白名单为空</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem>
          <Input :disabled='whiteList' v-model="updateJurisd.updateWhiteListValue" style="width:420px;" :rows="4" type="textarea"></Input><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
        </FormItem>
      </Form>
    </Modal>


    <!--跨域访问CRORS添加规则-->
    <Modal
      v-model="cors"
      title="跨域访问CRORS添加规则"
      :scrollable='true'
      width="550px"

    >
      <div>
        <p>来源Origin</p>
        <Input :disabled='grant' style="width:420px;" :rows="4" type="textarea" placeholder="例如：http://10.100.100.100:8001 https://www.xrcloud.net"></Input><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
        <p style="color: #999999;">来源可设置多个，每行一个，以回车间隔，每行最多能有一个通配符(*)</p>
      </div>
      <br>
      <div style="width:366px;display:flex;">
        <div style="width:115px;font-size:14px;color:#333333;">操作Methods</div>
        <div style="width:300px;">
          <CheckboxGroup >
            <Checkbox label="put">Put</Checkbox>
            <Checkbox label="get">Get</Checkbox>
            <Checkbox label="post">Post</Checkbox>
            <Checkbox label="head">Head</Checkbox>
            <Checkbox label="delete">Delete</Checkbox>
          </CheckboxGroup>
        </div>
        <p>来源可设置多个，每行一个，以回车间隔。</p>
      </div>

      <div style="width:366px;display:flex;">
        <div style="width:115px;font-size:14px;color:#333333;">Expose-Headers</div>
        <br>
        <Input :disabled='whiteList'  style="width:420px;" :rows="4" type="textarea"></Input><Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
      </div>

      <div>
        <p>缓存Max Age</p>
        <Input type="text" style="width:317px" placeholder="请输入0-999999999的正整数"></Input>
      </div>
    </Modal>
    <!--cors规则编辑器-->
    <Modal
      v-model="corsedit"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"

    >
     <pre style="background-color:#FDF6E3;">
       <code></code>
     </pre>
    </Modal>
  </div>
</template>

<script>
  import $store from "@/vuex";
  var buckname = sessionStorage.getItem('bucketName');

  export default {
    data() {
      return {
        //收起cors
        corsHide:true,
        staticHide:true,
        hide:2,
        //显示修改自定义权限弹窗
        updateDiction:false,
        //空间名称
        bucketName:'',
        //用户授权输入框是否禁用
        grant:true,
        //影响资源输入框是否禁用
        influence:true,
        //refere白名单输入框是否禁用
        whiteList:false,
        //是否隐藏自定义弹窗
        jurisdiction:false,
        //是否隐藏查看外链弹窗
        outerChain:false,
        //是否隐藏上传文件弹窗
        modal1: false,
        //是否隐藏新建文件夹弹窗
        floder: false,
        //权限列表
        navList: [
          {
            name: "私有读写",
            city:
              "Bucket Owner获得全部可执行的操作权限，只有该Bucket的Owner可以对存放在其中的Object进行读/写/删除操作；其他人没有任何权限，在未经授权的情况下无法访问该Bucket内的Object"
          },
          {
            name: "公有读私有写",
            city: "公有读私有写"
          },
          {
            name: "公有读写",
            city: "公有读写"
          },
          {
            name: "自定义权限",
            city:
              "可对指定用户设置GetObject、PutObject、DeleteObject、ListObjects、DeleteBucket的权限，并可指定该权限可访问的资源，以及指定具有该权限的IP地址和Referer白名单等"
          }
        ],
        //权限文字
        ptext: "",
        //权限列表index
        indexs: 0,
        //权限期限
        term:'',
        termList:[
          {
            value:'3',
            label:'永久有效'
          },
          {
            value:'2',
            label:'7天'
          },
          {
            value:'1',
            label:'1天'
          }
        ],
        //文件夹名称
        flies: "",
        //权限样式
        iSstyle: "",
        //文件名
        filename:null,
        //文件列表数据
        fileData: [],
        //文件列表表头
        fileList: [
          {
            key: "filename",
            title: "文件名称",
            render: (h,params) =>{
              this.fileUpdata.bucketName = buckname;
              this.fileUpdata.zoneId = $store.state.zone.zoneid
              this.isfile = params.row.isfile;
              return h('div',[
                h("Icon",{
                  props:{
                    type:'ios-folder-outline'
                  },
                  style:{
                    color:'#2A99F2',
                    display:params.row.isfile == 1?'inline-block':'none',
                  }
                }),
                h('span',{
                  style:{
                    color:'#2A99F2',
                    cursor:'pointer',
                    marginLeft:'5px'
                  },
                  on:{
                    click:()=>{
                      var object = new Object();
                      object.id = params.row.id,
                        object.name = params.row.filename;
                      this.fileObject.push(object);

                      // if(this.fileObject.length >1){
                      //   this.fileObject.splice(params.index,1);
                      // }else {
                      //   this.fileObject.push(object);
                      // }
                      // console.log(this.fileObject[0].name);
                      this.filesList(params.row.id,params.row.isfile);//文件标识
                    }
                  }
                },params.row.filename)
              ])
            }
          },
          {
            key: "filesize",
            title: "大小",
            render:(h,params)=>{
              return h('div',[
                h('span',{
                },params.row.filesize /1024 >1 ? ((params.row.filesize/1024).toFixed(2) + "MB") : (params.row.filesize  + "KB"))//换算文件大小单位
              ])
            }
          },
          {
            key: "lasttime",
            title: "最后修改时间"
          },
          {
            key: "createtime",
            title: "创建时间"
          },
          {
            key:'cap',
            title:'操作',
            render:(h,params)=>{
              return h('div',[
                h('span',{
                  style:{
                    color:"#2A99F2",
                    marginRight:'20px',
                    display:params.row.isfile ==1?'none':'inline-block',
                    cursor:'pointer'
                  },
                  on:{
                    click:()=>{
                      this.nameFile = params.row.filename;
                      this.outerChain = true;
                      this.flieSrc = params.row.filesrc;
                    }
                  }
                },"查看外链"),
                h('span',{
                  style:{
                    color:"#2A99F2",
                    cursor:'pointer'
                  },
                  on:{
                    click:()=>{
                      this.deleteFile(params.row.id,params.row.filename);//传入文件Id和文件名称删除
                    }
                  }
                },"删除")
              ])
            }
          }
        ],
        //文件上传参数
        fileUpdata:{},
        //判断是否是文件夹——1为文件夹——0为文件
        isfile:1,
        //添加自定义权限数据
        jurisdValidate:{
          grantValue:'*',
          //影响资源输入框的值
          influenceValue:'',
          //referer白名单输入框的值
          whiteListValue:'',
          //用户授权
          users:'0',
          //影响资源
          sources:'0',
          //密码接收渠道
          channel:['PutObject'],
          //白名单
          referer:'',
        },
        //添加自定义权限表单验证
        jurisdRuleValidate:{
          grantValue:[
            {required: true, message: '请输入自定义用户', trigger: 'blur'},
            {max:12,message:'自定义用户的名称只能输入12位'}
          ],
          channel:[
            {required:true,type: 'array', message: '请选择密码接受渠道',trigger: 'change'}
          ],
          influenceValue:[
            {required: true, message: '请输入影响资源', trigger: 'blur'},
          ]
        },

        //权限表格表头
        rightList:[
          {
            key:'userauthorization',
            title:'授权用户ID'
          },
          {
            key:'resource',
            title:'相关资源'
          },
          {
            title:'操作权限',
            render:(h,obj)=>{
              return h('span',obj.row.iseffectres == 1?'可操作':'不可操作')
            }
          },
          {
            title:'涉及操作',
            render:(h,obj)=>{
              let str = '';
              ['putobject','getobject','deleteobject','listbucket','deletebucket'].forEach(name=>{
                if(obj.row[name]==1){
                  str += name
                }
              })
              return h('span',str)
            }
          },
          {
            key:'refererip',
            title:'Referer'
          },
          {
            title:'操作',
            render:(h,obj)=>{
              return h('div',[h('span',{style:{
                marginRight:'20px',
                  color:'rgb(42, 153, 242)',
                  cursor:'pointer'
                },
                on:{
                click:()=>{
                  this.updateDiction = true;
                  obj.row.userauthorization == '*' ? (this.updateJurisd.updateUsers = '0') : (this.updateJurisd.updateUsers = '1');
                  this.updateJurisd.updateReferer = obj.row.refererip == '1' ? true : obj.row.refererip =='0' ? false :'';
                  this.updateJurisd.updateInfluenceValue = obj.row.resource;
                  this.updateJurisd.updateSources = obj.row.iseffectres;
                  let str = '';
                  ['putobject','getobject','deleteobject','listbucket','deletebucket'].forEach(name=>{
                    if(obj.row[name]==1){
                      str += name
                    }
                  })
                  this.updateJurisd.updateChannel.push(str);
                  console.log( this.updateJurisd.updateChannel);
                    this.updateJurisd.updateGrantValue = obj.row.userauthorization;
                    this.updateJurisd.updateWhiteListValue = obj.row.refererip;
                  this.code = obj.row.code;

                  this.usersClick();
                }
                }},'修改'),h('span',{
                  style:{
                    color:'rgb(42, 153, 242)',
                    cursor:'pointer'
                  },
                on:{
                    click:()=>{

                      this.deleteFromBucketId(obj.row.code);
                    }
                }
              },'删除')])
            }
          },
        ],
        //修改自定义数据
        updateJurisd:{
          updateWhiteListValue:'',
          updateReferer:'0',
          updateInfluenceValue:'',
          updateSources:'',
          updateChannel:[],
          updateGrantValue:'',
          updateUsers:'',
        },
        //权限列表
        aclData:[],
        //跨域访问规则表单
        formValidate:{
          name:''
        },
        ruleValidate:{},
        //修改自定义权限

        //cors弹窗
        cors:false,
        //cors访问规则表头
        corstList:[
          {
            key:'origin',
            title:'来源Allowed Origin'
          },
          {
            key:'methods',
            title:'Allowed Methods'
          },
          {
            key:'headers',
            title:'Allowed Headers'
          },
          {
            key:'exposed',
            title:'Exposed Headers'
          },
          {
            key:'age',
            title:'缓存Max Age'
          },
          {
            title:'操作',
            render : (h,params)=>{
              return h('div',[
                h('span',{
                  style:{
                    color:'#2A99F2',
                    marginRight:'10px'
                  }
                },'修改'),
                h('span',{
                  style:{
                    color:'#2A99F2'
                  }
                },'删除')
              ])
            }
          }
        ],
        corsData:[],
        //自定义权限编辑弹窗
        edit:false,
        zonename:$store.state.zone.zonename,
        //修改自定义权限是否禁用用后授权
        updategrant:false,
        //规则编辑器弹窗
        corsedit:false,
        //文件名称
        nameFile:'',
        //跨域访问设置数据
        crossDomain:{
          //自定义
          custom:'',
          errorPage:'',
          redirectOne:'',
          redirectTwo:'',
          redirectThree:''
        },
        //空间名字
      kjName:'',
        //访问权限
        kjaccessrights:'',
        //存储空间大小
        size:'',
        //获取外链文件路径
        flieSrc:'',
        //修改权限需要的code
        code:'',
        //文件路径
        fileObject:[]
      }
    },
    methods: {
      //上传文件格式错误的方法
      handleFormatError(file) {
        this.$Message.error('格式错误');
      },
      //上传文件最大限制方法
      handleMaxSize() {
        this.$Message.error('单文件最大只能上传1GB哦');
      },
      //上传文件之前应用的方法
      handleBeforeUpload(file) {
        let reg = /^[\u4e00-\u9fa5\w\d@\.\-_]{1,20}$/i
        if(!reg.test(file.name)){
          this.$Message.error('文件名不能超过20个字符');
          return false;
        }
      },
      //上传文件成功的方法
      handleSuccess(response) {
        if(response.status == '1'){
          this.$Message.success('上传成功');
          this.filesList();
          this.getAllsize();
        }else{
          this.$Message.error(response.msg);
        }
        console.log(this.fileUpdata);
      },
      //文件上传失败
      handleError(error){
        this.$Message.error('上传失败');
      },
      //上传文件过程的方法
      handleUpload(file,event){
        // let time = new Date().getTime();

        console.log(event);
        console.log(file);
      },
      //权限切换
      navlists(val) {
        this.indexs = val;
        this.ptext = this.navList[val].city;
      },
      //列出文件夹列表
      filesList(id,isfile) {
        var name = sessionStorage.getItem("bucketName");
        this.fileUpdata.dirId = (id == undefined ? null :id.toString());
        this.$http
          .post("object/listObject.do", {
            bucketName: name,
            dirId: this.fileUpdata.dirId,
            fileName:this.filename
          })
          .then(res => {
            if (res.data.status == "1") {
              if(isfile == 1 || this.isfile == 1){
                this.fileData = res.data.data.data;
                console.log(this.fileData);
              }else{
                return;
              }
            }
          });
      },
      //创建文件夹
      createFlies() {
        var name = sessionStorage.getItem("bucketName");
        this.$http
          .post("object/createObject.do", {
            bucketName: name,
            fileName: this.flies,
            dirId: this.fileUpdata.dirId
          })
          .then(res => {
            if (res.data.status == "1") {
              this.$Message.success("新建成功");
              this.filesList();
            }else{
              this.$Message.error(res.data.msg);
            }
          });
      },
      //删除文件
      deleteFile(id,filename){
        // console.log(id);
        var name = sessionStorage.getItem("bucketName");
        this.$http.post('object/deleteObject.do',{
          bucketName:name,
          fileName:filename,
          dirId:id.toString()
        }).then(res =>{
          if(res.data.status == "1"){
            this.$Message.success('删除成功');
            this.filesList();
            this.getAllsize();
          }else{
            this.$Message.error(res.data.msg);
          }
        })
      },
      //用户授权radio切换
      usersClick(){
        if(this.updateJurisd.updateUsers == '0'){
          this.updategrant = true;
          this.updateJurisd.updateGrantValue = '*';
        }else{
          this.updategrant = false;
          this.updateJurisd.updateGrantValue = '';
        }
        if(this.jurisdValidate.users == '0'){
          this.grant = true;
          this.jurisdValidate.grantValue = '*';
        }else{
          this.grant = false;
          this.jurisdValidate.grantValue = '';

        }
      },
      //添加自定义权限
      jurisdictionClick(){
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        this.$http.post('bucketAcl/createCustomAcl.do',{
          bucketName:name,
          bucketId:bucketId,
          objectNames:this.jurisdValidate.influenceValue,
          isOperation:this.jurisdValidate.sources.toString(),
          customPermission:this.jurisdValidate.channel,
          isReferer:this.jurisdValidate.referer,
          refereIp:this.jurisdValidate.whiteListValue,
          userAuths:this.jurisdValidate.grantValue
        }).then(res => {
          if(res.data.status == '1'){
            this.$Message.success('添加自定义权限成功');
            this.selectAclAll();
          }else{
            this.$Message.error(res.data.msg);
          }
        })
      },
      //获取权限列表
      selectAclAll(){
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        this.$http.post('bucketAcl/selectAclAll.do',{
          bucketName:name,
          bucketId:bucketId
        }).then(res =>{
          if(res.data.status == "1"){
            this.aclData = res.data.data.list;
          }else if(res.data.status == '16'){
            this.aclData = [];
          }else{
            this.$Message.error(res.data.msg);
          }
        })
      },
      //切换权限
      checkAcl(){
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        this.$http.post('bucketAcl/aclCut.do',{
          accessrights:this.indexs.toString(),
          bucketId:bucketId,
          bucketName:name
        }).then(res =>{
          if(res.data.status =='1'){
            this.$Message.success('权限切换成功');
          }else{
            this.$Message.error('切换权限失败');
          }
        })
      },
    /**
     *获取外链
     */
      geturl(filesrc){
      var name = sessionStorage.getItem("bucketName");
        this.$http.post('object/geturl.do',{
          bucketName:name,
          timelimit:this.term,
          fileSrc:this.flieSrc
        }).then(res => {
          if(res.data.status == '1'){
            this.flies = res.data.data.data;
          }else{
            this.$Message.error(res.data.msg);
          }
        })
     },
      /**
       * 删除权限
       */
      deleteFromBucketId(code){
        var name = sessionStorage.getItem("bucketName");
       this.$http.post('bucketAcl/deleteFromBucketId.do',{
          bucketName:name,
          code:code
        }).then(res =>{
          if(res.data.status == '1'){
            this.$Message.success('删除成功');
            this.selectAclAll();
          }else{
            this.$Message.error(res.data.msg);
          }
        })
      },
      //修改自定义权限
      jurisdUpdateClick(code){
        var name = sessionStorage.getItem("bucketName");
        this.$http.post('bucketAcl/updateFromCode.do',{
          bucketName:name,
          code:this.code,
          userAuths:this.updateJurisd.updateUsers,
          customPermission:this.updateJurisd.updateChannel,
          objectNames:this.updateJurisd.updateInfluenceValue,
          isOperation:this.updateJurisd.updateSources.toString(),
          isReferer:this.updateJurisd.updateReferer == true ? '1' : this.updateJurisd.updateReferer ==false ? '0' :'',
          refereIp:this.updateJurisd.updateWhiteListValue
        }).then(res =>{
          if(res.data.status == '1'){
            this.$Message.success('修改成功');
            this.selectAclAll();
          }else{
            this.$Message.error(res.data.msg);
          }
        })
      },
      up(){
        this.$Message.info('暂无操作');
        this.crossDomain = {};
      },
      //cors收起
      corsLower(val){
        val == 'cors' ?(this.corsHide = !this.corsHide) :val == 'static' ? (this.staticHide = !this.staticHide) :''
      },
      //获取存储空间容量
      getAllsize(){
        this.$http.post('object/getAllSize.do',{
        }).then(res =>{
          if(res.data.status == '1'){
            this.size =  res.data.data.data / 1024 > 1 ?  (res.data.data.data / 1024).toFixed(2) + 'MB' :res.data.data.data + 'KB';

          }else{
            this.size = "0KB";
            this.$Message.error('出错了');
          }
          sessionStorage.setItem('size',this.size);
        }).catch(error =>{
          this.$Message.error('网络连接出错');
          this.size = "0KB"
        })
      },
      //获取文件路径返回
      selectFileSrc(id,index){
        this.fileData.id = id;
          console.log(index);
        let number = this.fileObject.length - (index+1);
        this.fileObject.splice(index+1,number);
        this.filesList(this.fileData.id)

      }
    //获取空间详情
      // bucketDetails() {
      //
      //   this.$http
      //     .post(
      //       "http://192.168.3.109:8083/ruirados/bucket/selectByBucketName.do",
      //       {
      //         bucketName:name
      //       }
      //     )
      //     .then(res => {
      //       if (res.data.status == "1") {
      //       }
      //     });
      // },
      //
    },
    mounted() {
      this.bucketName = sessionStorage.getItem('bucketName');
      this.ptext = this.navList[0].city; //权限列表默认显示第一个
      this.filesList();
      this.selectAclAll();
      this.getAllsize();
      this.kjName = sessionStorage.getItem('bucketName');
      this.kjaccessrights = sessionStorage.getItem('accessrights') == 1? '私有读写' : sessionStorage.getItem('accessrights') == 2 ? '公有读私有写' : sessionStorage.getItem('accessrights') == 3? '公有读写':'自定义权限';
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .space_box {
    width: 100%;
    background-color: #f5f5f5;
    font-family: MicrosoftYaHei;
    .space_center {
      margin: 0 auto;
      width: 1200px;
      .space_block {
        width: inherit;
        padding: 20px;
        background-color: #ffffff;
        .space_top {
          display: flex;
          height: 58px;
          border-bottom: 1px solid #d8d8d8;
          .title_one {
            font-size: 14px;
            color: #5e5e5e;
          }
          .title {
            line-height: 40px;
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            color: rgba(17, 17, 17, 0.75);
            font-weight: bold;
          }
        }
      }
      .space_list {
        width: 100%;
        font-family: PingFangSC;
        display: flex;
        .space_item {
          display: inline-block;
          padding: 10px 0;
          text-align: center;
          width: 30%;
          border-right: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
          color: #2a99f2;
          cursor: pointer;
        }
        .space_items {
          display: inline-block;
          padding: 10px 0;
          text-align: center;
          width: 30%;
          border-right: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
          background-color: #2a99f2;
          color: #ffffff;
          cursor: pointer;
        }
        .space_item:hover {
          background-color: #2a99f2;
          color: #ffffff;
          cursor: pointer;
        }
      }
      .center_space {
        width: 1160px;
        padding: 6px 0;
        border-bottom: 1px solid #d9d9d9;
        height: 90px;
        margin-top: 10px;
        display: flex;
        .space_text {
          font-size: 36px;
          color: #333333;
          margin-top: 10px;
        }
        p {
          color: #666666;
          font-size: 16px;
        }
        .space_Two {
          width: 40%;
          display: inline-block;
        }
        .space_one {
          width: 40%;
          display: inline-block;
        }
        .space_one:after {
          content: "";
          width: 2px;
          height: 80px;
          position: relative;
          display: inline-block;
          top: -82px;
          right: 20px;
          background-color: #dfdfdf;
        }
      }
    }
  }
  .custom {
    margin: 10px 0 15px 20px;
  }
  .upload_div {
    display: flex;
    background-color: #f5f5f5;
    span {
      width: 30%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
  }
  .upload_text {
    background-color: #ffffff;
    span {
      color: #2a9af3;
      font-size: 14px;
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }
  .ivu-icon-ios-upload-outline:before {
    color: #2a9af3;
    font-size: 14px;
  }
  .space_folder {
    margin: 10px 0 0 0;
    p {
      margin: 10px 0;
    }
  }
  .space_wailian{
    display: flex;
    p:nth-child(2){
      margin:19px 0;
    }
  }
  .upload_model {
    background-color: #ffffff;
    margin-top: 21px;
    min-height: 192px;
    border-bottom: 1px solid #e9e9e9;
  }
  .jurisd{
    display: flex;
  }
  .setting{
    padding: 14px 0 40px 0;
    border-top: 1px solid #D8D8D8;
    border-bottom:1px solid #D8D8D8;
  }
  .text-boy{
    padding:7px 0 6px 10px;font-size:14px;background-color:#E9F4FD;
    border:1px solid #2A99F2;
    border-radius:4px;
    margin:20px 0 10px 0;
  }
  .down{
    color:#2A99F2;
    width: 24px !important;
    height:22px !important;
    border-radius: 50%;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transition: all 0.3s;
    cursor:pointer;
    display: inline-block;
  }
  .down::before{
    content:'';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 14px !important;
    height: 12px !important;
    border: 1px solid #2A99F2;
    border-top-style:none ;
    border-right-style: none;

  }
  .downlower{
    transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
    -moz-transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
  }
  p{
    line-height:20px;
  }
</style>
