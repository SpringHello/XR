<template>
  <div class="space_box">
    <div class="space_center">
      <p style="margin:10px 0;"><span style="color: #999999;">云储存/</span><span>云硬盘</span></p>
      <div class="space_block">
        <div class="space_top">
          <div style="width:50%">
            <span class="title">空间详情</span>
          </div>
          <div style="width:50%;text-align:right;">
            <Button @click="$router.push({path:'objectStorage'})" style="margin-right: 10px;">返回</Button>
            <Button @click="filesList(undefined)" type="primary">刷新</Button>
          </div>
        </div>
        <p style="margin:20px 0;color:#333333;font-size:16px;">{{kjName}}</p>
        <div style="height: 100px;border-bottom:1px solid #D8D8D8;">
          <div style="display: flex;margin-bottom: 24px;font-size:14px;">
            <div style="width:37%">
              <span class="title_one">访问权限：{{kjaccessrights}}</span>
            </div>
            <div style="width:50%;">
              创建时间：{{createtime}}
            </div>
          </div>
          <div style="display:flex;font-size:14px;">
            <div style="width:37%">
              默认访问域名：<span style="color:#2A99F2">{{defaultDomain}}</span>
            </div>
            <div style="width:50%;">
              自定义外网访问域名：<span style="color:#2A99F2">{{custom}}</span><span style="color:#2A99F2;margin-left: 10px;cursor: pointer;" @click="mainName = true">修改</span>
            </div>
          </div>
        </div>

        <!--<p style="margin-top:20px;">当月用量 2018/04/28-2018</p>-->
        <div class="center_space">
          <div class="space_Two">
            <p>存储空间容量</p>
            <div class="space_text">
             {{size}}
            </div>
          </div>
          <div class="space_one">
            <p>流量</p>
            <div class="space_text">0KB</div>
          </div>
          <div class="space_one">
            <p>http请求次数</p>
            <div class="space_text">0次</div>
          </div>
        </div>
        <Tabs type="card" style="margin-top:21px;" value="objects" @on-click="checkTab" :animated="false">
          <TabPane label="Object管理" name="objects">
            <div style="display:flex;margin-bottom:15px;">
              <div style="width:50%">
                <Button type="primary" style="margin-right:10px;" @click="modal1 = true">上传</Button>
                <Button type="primary" @click="floderCLick">新建文件夹</Button>
              </div>
              <div style="width:50%;text-align:right;">
                <Input v-model="filename" type="text" placeholder="请输入搜索名称" style="width:231px;"/>
                <Button type="primary" @click="filesList(undefined)">查询</Button>
              </div>
            </div>

            <ul style="margin: 0 0 9px 20px;">
              <li class="fileObject" style="margin-right: 10px;" v-if="this.fileObject.length !=0" @click="backPage"> 返回</li>
              <li class="fileObject" @click="selectFileSrc(item.id,index)" v-for="(item,index) in fileObject" :key="index">
                {{item.name+'/'}}
              </li>
            </ul>
            <Table :columns='fileList' :loading="tabLoading" :data="fileData"></Table>
          </TabPane>
          <TabPane label="空间设置" name="space">
            <div>
              <p style="font-size:18px;color:#333333;margin:0 0 20px 0;">权限设置</p>
              <div style="border:1px solid #e9e9e9;">
                <ul class="space_list">
                  <li :class="indexs == index? 'space_items':'space_item'" v-for="(item,index) in navList" :key="index"
                      @click="navlists(index)">{{item.name}}
                  </li>
                </ul>
                <div style="padding:24px">
                  <p style="color:#666666;font-size:14px;width:950px;">{{ptext}}</p>
                  <Button v-if="indexs != 3" type="primary" style="margin:40px 0 0 0;" @click="checkAcl">确定</Button>
                </div>
                <div class="custom" v-if="indexs == 3">
                  <Button type="primary" @click="openJurisdiction" style="margin-right: 10px;">添加自定义权限</Button>
                  <Button type="primary" @click="edit = true">自定义权限编辑器</Button>
                  <Table :loading="jurisdLoading" style="margin-top:20px;" :columns="rightList" :data="aclData"></Table>
                </div>
              </div>
            </div>
            <br><br>
            <div class="setting">
              <div>
                <div style="font-size:18px;color:#333333;display: inline-block;">跨域访问设置</div>
                  <span style="float:right;color: #2A99F2;" class="down" :class="{downlower:!corsHide}"  @click="corsLower('cors')">
                    {{corsHide?'收起':'展开'}}
                  </span>
                </div>
              <div v-if="corsHide">
                <div style="margin:10px 0 20px 0;">
                  <Button type="primary" @click="openCros" style="margin-right: 10px;">CORS规则配置</Button>
                  <Button type="primary" @click="corsedit = true">CORS规则编辑器</Button>
                </div>
                <Table :columns="corstList" :data="corsData"></Table>
              </div>
            </div>
            <!--<br>-->
            <!--<div>-->
              <!--<div>-->
                <!--<div style="font-size:18px;color:#333333;display: inline-block">静态网站托管</div>-->
                <!--<span style="float:right" class="down" :class="{downlower:staticHide}" @click="corsLower('static')">-->
                  <!--{{staticHide?'收起':'展开'}}-->
                <!--</span>-->
              <!--</div>-->
              <!--<div v-if="staticHide">-->
                <!--<div class="text-boy">-->
                  <!--新睿云对象存储支持将自己的存储空间配置成静态网站托管模式，启动静态网站托管模式后，请通过XXXXX（域名）或您绑定的自定义域名进行访问。-->
                <!--</div>-->
                <!--<p style="color:#999999;font-size:14px;">-->
                  <!--提示：静态网站托管的默认index页配置在具有公有读取权限的Bucket下生效，自定义错误页和访问重定向在全部权限的Bucket下生效。</p>-->
                <!--<Form ref="crossDomain" :model="crossDomain" :label-width="100">-->
                  <!--<FormItem label="自定义">-->
                    <!--<Input style="width:317px;" v-model="crossDomain.custom"></Input>-->
                    <!--<p>请输入浏览器能够识别的文件作为自定义index页的文件名，为空则不启用自定义index页设置，不允许输入/.</p>-->
                  <!--</FormItem>-->
                  <!--<FormItem label="自定义错误页">-->
                    <!--<Input style="width:317px;" v-model="crossDomain.errorPage"></Input>-->
                    <!--<p>请输入浏览器能够识别的文件作为自定义错误页的文件名，为空则不启用自定义错误页设置</p>-->
                  <!--</FormItem>-->
                  <!--<FormItem label="访问重定向配置">-->
                    <!--<div style="background-color:#F7F7F7;width:317px;height: 144px;padding:20px 13px">-->
                      <!--<div>-->
                        <!--400<Input style="width:260px;" v-model="crossDomain.redirectOne"></Input>-->
                      <!--</div>-->
                      <!--<div>-->
                        <!--403<Input style="width:260px;" v-model="crossDomain.redirectTwo"></Input>-->
                      <!--</div>-->
                      <!--<div>-->
                        <!--404<Input style="width:260px;" v-model="crossDomain.redirectThree"></Input>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<p>请输入遇到4XX错误时需要重定向到的完整目标域（支持域名或IP格式，可带端口号），为空则不启用重定向设置</p>-->
                  <!--</FormItem>-->
                <!--</Form>-->
                <!--<Button type="primary" style="margin:20px  0 0 102px;" @click="up">保存设置</Button>-->
              <!--</div>-->
            <!--</div>-->
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!--自定义外网域名-->
    <Modal
      v-model="mainName"
      title="自定义外网访问域名"
      :scrollable='true'
      :mask-closable="false"
    >
      <Form ref="domain" :model="domain" :rules="domainValiDate" label-position="top">
        <FormItem label="自定义外网域名" prop="route" >
          <Input type="text" style="width:317px;" v-model="domain.route"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="mainName = false">取消</Button>
        <Button type="primary" @click="updateCustom" :loading="domainLodaing">确定</Button>
      </div>
    </Modal>
    <!--上传文件-->
    <Modal
      v-model="modal1"
      title="上传文件"
      :scrollable='true'
      :mask-closable="false"
    >
      <p style="font-size:14px;color:#999999;line-height: 20px;">控制台上传单个文件大小不超过1GB，如需上传更大的文件请使用新睿云对象存储提供的<span
        style="color:#2A9AF3;cursor:pointer;">API</span></p>
      <p style="font-size:14px;color:#666666;margin:10px 0;">上传路径 文件名称/</p>
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
        action="http://192.168.3.109:8080/ruirados/object/uploadObject.do"
        class="upload_model"
      >
        <div class="upload_text">
          <Icon type="ios-upload-outline"></Icon>
          <span>选择文件</span>
          <p style="margin-top:10px;color:#999999;">批量上传最多上传24个文件，若上传一存在同名文件会直接覆盖，请谨慎操作</p>
        </div>
      </Upload>
    </Modal>
    <!-- 新建文件夹 -->
    <Modal
      v-model="floder"
      title="新建文件夹"
      :scrollable='true'
      :mask-closable="false"
    >
      <div class="space_folder">
        <Form ref="createF" :model="createFile" :rules="createFilesValiDate" label-position="top">
          <FormItem label="文件夹名称" prop="flies" >
            <Input type="text" style="width:317px;" v-model="createFile.flies"/>
          </FormItem>
        </Form>
        <p style="color:#999999;">1.文件夹名称全称不超过24个字符</p>
        <p style="color:#999999;">2.名称仅能由字母，数字，中文，下划线，短横线和小数点组成</p>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="floder = false">取消</Button>
        <Button type="primary" @click="createFlies">确定</Button>
      </div>
    </Modal>
    <!-- 查看外链 -->
    <Modal
      v-model="outerChain"
      title="查看外链"
      :scrollable='true'
      :mask-closable="false"
    >
      <div class="space_wailian">
        <div style="text-align: right;">
          <p>文件名称</p>
          <p>有效期</p>
          <p>使用HTTPS</p>
          <p>外链</p>
        </div>
        <div style="width: 77%;margin-left: 20px;">
          <p>{{nameFile}}</p>
          <Select v-model="term" style="width:240px;margin: 10px 0;">
            <Option v-for="item in termList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <div>
            <i-switch @on-change="geturl" v-model="http" true-value="https" false-value="http"></i-switch>
          </div>
          <br>
          <!--<Button type="primary" :loading="tremLoading" @click="geturl">获取外链</Button>-->
          <textarea  ref="copy" id="copy" v-model="fliesTerm"  type="textarea" rows="5"   readonly="true" wrap="hard"></textarea >
          <div class="copyClass">
            <span @click="openUrl">打开文件URL</span><span @click="copyUrl">复制文件URL</span>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 添加自定义权限 -->
    <Modal
      v-model="jurisdiction"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"
      :mask-closable="false"
    >
      <div class="jurisd">
        <div>Bucket名称：{{bucketName}}</div>
        <div style="margin-left:20px;">存储区域：{{zonename}}</div>
      </div>
      <Form ref="jurisdValidate" :model="jurisdValidate" :rules="jurisdRuleValidate">
        <FormItem prop="grantValue" label="用户授权">
          <div >
            <RadioGroup v-model="jurisdValidate.users" @on-change="usersClick()">
              <Radio label='0'>全部用户</Radio>
              <Radio label='1'>自定义用户</Radio>
            </RadioGroup>
            <Input :disabled='grant' v-model="jurisdValidate.grantValue" style="width:420px;" :rows="4" type="textarea"/>
            <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
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
        <FormItem prop="influenceValue" label="影响资源">
          <div>
            <RadioGroup v-model="jurisdValidate.sources">
              <Radio label='0'>不可操作</Radio>
              <Radio label='1'>可操作</Radio>
            </RadioGroup>
            <Input v-model="jurisdValidate.influenceValue" style="width:420px;" :rows="4" type="textarea"/>
            <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem prop="whiteListValue">
          <div style="width:366px;display:flex;" >
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
              <Checkbox @on-change="changes" true-value="1" false-value="0" v-model="jurisdValidate.referer">允许白名单为空</Checkbox>
            </div>
          </div>
          <Input  v-model="jurisdValidate.whiteListValue" style="width:420px;" :rows="4" type="textarea"/>
          <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="jurisdiction = false">取消</Button>
        <Button type="primary" @click="jurisdictionClick">确定</Button>
      </div>
    </Modal>

    <!--自定义权限编辑-->
    <Modal
      v-model="edit"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"
      :mask-closable="false"
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
      :mask-closable="false"
    >
      <div class="jurisd">
        <div>Bucket名称：{{bucketName}}</div>
        <div style="margin-left:20px;">存储区域：{{zonename}}</div>
      </div>
      <Form ref="updateJurisds" :model="updateJurisd" :rules="updateJurisdValid">
        <FormItem prop="updateGrantValue" label="用户授权">
          <div>
            <RadioGroup v-model="updateJurisd.updateUsers" @on-change="usersClick">
              <Radio label="0">全部用户</Radio>
              <Radio label="1">自定义用户</Radio>
            </RadioGroup>
            <Input :disabled='updategrant' v-model="updateJurisd.updateGrantValue" style="width:420px;" :rows="4" type="textarea"></Input>
            <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem prop="updateChannel">
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
        <FormItem prop="updateInfluenceValue" label="影响资源">
          <div>
            <RadioGroup v-model="updateJurisd.updateSources">
              <Radio label="0">不可操作</Radio>
              <Radio label="1">可操作</Radio>
            </RadioGroup>
            <Input v-model="updateJurisd.updateInfluenceValue" style="width:420px;" :rows="4" type="textarea"></Input>
            <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
              <Checkbox  v-model="updateJurisd.updateReferer" true-value="1" false-value="0">允许白名单为空</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem prop="updateWhiteListValue">
          <Input  v-model="updateJurisd.updateWhiteListValue" style="width:420px;" :rows="4" type="textarea"></Input>
          <Icon style="color:#2A99F2;" type="ios-help-outline"></Icon>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="updateDiction = false">取消</Button>
        <Button type="primary" @click="jurisdUpdateClick">确定</Button>
      </div>
    </Modal>


    <!-- Cros规则配置 -->
    <Modal v-model="cors" width="550" :scrollable="true" style="top:50px"  :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">跨域访问CRORS添加规则</span>
      </p>
      <div class="universal-modal-content-flex">
        <!--<Form :model="addCorsForm" :rules="newRuleValidate" ref="newDisk">-->
        <Form :model="addCorsForm" :rules="addCorsFormValidateL" ref="newCros">
          <Form-item label="来源Origin" prop="orgins">
            <Input :rows="3" type="textarea" v-model="addCorsForm.orgins"
                   placeholder="例如：http://10.100.100.100:8001 https://www.xrcloud.net"></Input>
          </Form-item>
          <p style="color: #999999;">来源可设置多个，每行一个，以回车间隔，每行最多能有一个通配符(*)</p>
          <Form-item label="操作" prop="methods">
            <CheckboxGroup v-model="addCorsForm.methods">
              <Checkbox label="put">Put</Checkbox>
              <Checkbox label="get">Get</Checkbox>
              <Checkbox label="post">Post</Checkbox>
              <Checkbox label="head">Head</Checkbox>
              <Checkbox label="delete">Delete</Checkbox>
            </CheckboxGroup>
          </Form-item>
          <Form-item label="Allow-Headers" prop="allowsHeaders">
            <Input style="width:420px;" :rows="3" type="textarea"
                   v-model="addCorsForm.allowsHeaders"></Input>
          </Form-item>
          <p style="color: #999999;">来源可设置多个，每行一个，以回车间隔。</p>
          <Form-item label="Allow-Expose-Headers" prop="ExposeHeaders">
            <Input style="width:420px;" :rows="3" type="textarea"
                   v-model="addCorsForm.ExposeHeaders"></Input>
          </Form-item>
          <p style="color: #999999;">来源可设置多个，每行一个，以回车间隔，不允许通配符(*)</p>
          <Form-item label="缓存Max Age">
            <InputNumber :max="999999" :min="0" v-model="addCorsForm.maxAge" style="width:250px;"></InputNumber>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="cors = false">取消</Button>
        <Button type="primary" @click="_checkNewCros">确定新建</Button>
      </div>
    </Modal>

    <!--修改CROS规则配置-->
    <Modal v-model="updateCors" width="550" :scrollable="true" style="top:50px"  :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">跨域访问CRORS添加规则</span>
      </p>
      <div class="universal-modal-content-flex">

        <Form :model="updateCorsForm" :rules="updateCorsFormValidateL" ref="oldCros">
          <Form-item label="来源Origin" prop="orgins">
            <Input :rows="3" type="textarea" v-model="updateCorsForm.orgins"
                   placeholder="例如：http://10.100.100.100:8001 https://www.xrcloud.net"></Input>
          </Form-item>
          <p style="color: #999999;">来源可设置多个，每行一个，以回车间隔，每行最多能有一个通配符(*)</p>
          <Form-item label="操作" prop="methods">
            <CheckboxGroup v-model="updateCorsForm.methods">
              <Checkbox label="put">Put</Checkbox>
              <Checkbox label="get">Get</Checkbox>
              <Checkbox label="post">Post</Checkbox>
              <Checkbox label="head">Head</Checkbox>
              <Checkbox label="delete">Delete</Checkbox>
            </CheckboxGroup>
          </Form-item>
          <Form-item label="Allow-Headers" prop="allowsheaders">
            <Input style="width:420px;" :rows="3" type="textarea"
                   v-model="updateCorsForm.allowsheaders"></Input>
          </Form-item>
          <Form-item label="Allow-Expose-Headers" prop="exposeheaders">
            <Input style="width:420px;" :rows="3" type="textarea"
                   v-model="updateCorsForm.exposeheaders"></Input>
          </Form-item>
          <Form-item label="缓存Max Age">
            <InputNumber :max="999999" :min="0" v-model="updateCorsForm.maxage" style="width:250px;"></InputNumber>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="updateCors = false">取消</Button>
        <Button type="primary" @click="updateCros">确定新建</Button>
      </div>
    </Modal>

    <!--cors规则编辑器-->
    <Modal
      v-model="corsedit"
      title="添加自定义权限"
      :scrollable='true'
      width="550px"
      :mask-closable="false">
     <pre style="background-color:#FDF6E3;">
       <code></code>
     </pre>
    </Modal>
  </div>
</template>

<script>
  import $store from "@/vuex"
  var buckname = sessionStorage.getItem('bucketName');
  const validRoute = (rule, value, callback) => {
    let reg = /^[a-zA-Z]+(\.[a-zA-Z0-9]+)+(\.[a-zA-Z]+)$/;
      if ( value == "") {
        return callback(new Error("请输入网站域名"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入正确的网站域名"));
      } else {
        callback();
      }
  };
  const validRed = (rule,value,callback)=>{
    console.log(rule);
   if(rule.field == 'whiteListValue'){
     if (value == '') {
       return callback(new Error("请输入白名单"));
     }else{
       callback();
     }
   }else{
     callback();
   }
  }
  export default {
    data() {
      return {
        //自定义域名弹窗
        mainName:false,
        domain:{
          route:''
        },
        domainValiDate:{

        },
        domainLodaing:false,
        //自定义权限表格加载
        jurisdLoading:false,
        isClass:true,
        //数字渐变动画
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
        //查看外链
        tremLoading:false,
        fliesTerm:'',
        //新建文件夹table加载动画
        tabLoading:false,
        //收起cors
        corsHide: true,
        staticHide: true,
        hide: 2,
        //显示修改自定义权限弹窗
        updateDiction: false,
        //空间名称
        bucketName: '',
        //用户授权输入框是否禁用
        grant: true,
        //影响资源输入框是否禁用
        influence: true,
        //是否隐藏自定义弹窗
        jurisdiction: false,
        //是否隐藏查看外链弹窗
        outerChain: false,
        //是否隐藏上传文件弹窗
        modal1: false,
        //是否隐藏新建文件夹弹窗
        floder: false,
        //权限列表
        navList: [
          {
            name: "私有读写",
            city: "Bucket Owner获得全部可执行的操作权限，只有该Bucket的Owner可以对存放在其中的Object进行读/写/删除操作；其他人没有任何权限，在未经授权的情况下无法访问该Bucket内的Object"
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
            city: "可对指定用户设置GetObject、PutObject、DeleteObject、ListObjects、DeleteBucket的权限，并可指定该权限可访问的资源，以及指定具有该权限的IP地址和Referer白名单等"
          }
        ],
        //权限文字
        ptext: "",
        //权限列表index
        indexs: 0,
        //权限期限
        term: '',
        termList: [
          {
            value: '3',
            label: '永久有效'
          },
          {
            value: '2',
            label: '7天'
          },
          {
            value: '1',
            label: '1天'
          }
        ],
        //权限样式
        iSstyle: "",
        //文件名
        filename: null,
        //文件列表数据
        fileData: [],
        //文件外链是否为http
        http:'',
        //文件列表表头
        fileList: [
          {
            key: "filename",
            title: "文件名称",
            render: (h, params) => {
              this.isfile = params.row.isfile;
              const hide = params.row.hide == 1 ?'inline-block':'none';
              if (params.row.isfile == 1) {
                return h('div', [
                  h('Spin',{
                    prop:{
                      size:'small'
                    },
                    style:{
                      display:hide
                    }
                  }),
                  h("Icon", {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      color: '#2A99F2',
                      display: params.row.isfile == 1 ? 'inline-block' : 'none',
                    }
                  }),
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer',
                      marginLeft: '5px'
                    },
                    on: {
                      click: () => {
                        var object = new Object();
                        object.id = params.row.id;
                        object.name = params.row.filename;
                         this.fileObject.push(object);
                        this.filesList(params.row.id,object);//文件标识
                      }

                    }
                  }, params.row.filename)
                ])
              } else {
                return h('div', [
                  h('Spin',{
                    prop:{
                      size:'small'
                    },
                    style:{
                      display:hide
                    }
                  }),
                  h('span',{
                  style: {
                    color: '#2A99F2',
                  },
                },params.row.filename)
                ])
              }
            }
          },
          {
            key: "filesize",
            title: "大小",
            render: (h, params) => {
              return h('div', [
                h('span', {},  params.row.filesize > 1000 || params.row.filesize / 1024 > 1  ? ((params.row.filesize / 1024).toFixed(2) + "MB") : (params.row.filesize + "KB"))//换算文件大小单位
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
            key: 'cap',
            title: '操作',
            render: (h, params) => {
              if(params.row.hide != 1){
                return h('div', [
                  h('span', {
                    style: {
                      color: "#2A99F2",
                      marginRight: '20px',
                      display: params.row.isfile == 1 ? 'none' : 'inline-block',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.nameFile = params.row.filename;
                        this.outerChain = true;
                        this.flieSrc = params.row.filesrc;
                        this.term = this.termList[1].value;
                        this.http = sessionStorage.getItem('http');
                        this.geturl(params.row.filesrc);
                      }
                    }
                  }, "查看外链"),
                  h('span', {
                    style: {
                      color: "#2A99F2",
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.deleteFile(params.row.id, params.row.filename,params.row._index);//传入文件Id和文件名称删除
                      }
                    }
                  }, "删除")
                ])
              }
            }
          }
        ],
        //文件上传参数
        fileUpdata: {},
        //判断是否是文件夹——1为文件夹——0为文件
        isfile: 1,
        //添加自定义权限数据
        jurisdValidate: {
          grantValue: '*',
          //影响资源输入框的值
          influenceValue: '',
          //referer白名单输入框的值
          whiteListValue: '',
          //用户授权
          users: '0',
          //影响资源
          sources: '0',
          //密码接收渠道
          channel: [],
          //白名单
          referer: '0',
        },
        //修改自定义数据
        updateJurisd: {
          updateWhiteListValue: '',
          updateReferer: '0',
          updateInfluenceValue: '',
          updateSources: '',
          updateChannel: [],
          updateGrantValue: '',
          updateUsers: '',
        },
        //添加自定义权限表单验证
        jurisdRuleValidate: {
          grantValue: [
            {required: true, message: '请输入自定义用户', trigger: 'blur'},
            {max: 12, message: '自定义用户的名称只能输入12位'}
          ],
          channel: [
            {required: true, type: 'array', message: '请选择密码接受渠道', trigger: 'change'}
          ],
          influenceValue: [
            {required: true, message: '请输入影响资源', trigger: 'blur'},
          ],
          whiteListValue:[
            {required: true,validator:validRed, trigger: 'blur'},
          ]
        },
        updateJurisdValid:{
          updateGrantValue: [
            {required: true, message: '请输入自定义用户', trigger: 'blur'},
            {max: 12, message: '自定义用户的名称只能输入12位'}
          ],
          updateChannel: [
            {required: true, type: 'array', message: '请选择密码接受渠道', trigger: 'change'}
          ],
          updateInfluenceValue: [
            {required: true, message: '请输入影响资源', trigger: 'blur'},
          ]
        },
        //权限表格表头
        rightList: [
          {
            key: 'userauthorization',
            title: '授权用户ID',
            render:(h,params) =>{
              const hide = params.row.hide == 1 ?'inline-block':'none';
                return h('div',[
                  h('Spin',{
                    prop:{
                      size:'small'
                    },
                    style:{
                      display:hide
                    }
                  }),
                  h('span',{},params.row.userauthorization)
                ])
            }
          },
          {
            key: 'resource',
            title: '相关资源'
          },
          {
            title: '操作权限',
            render: (h, obj) => {
              return h('span', obj.row.iseffectres == 1 ? '可操作' : '不可操作')
            }
          },
          {
            title: '涉及操作',
            render: (h, obj) => {
              let str = '';
              ['putobject', 'getobject', 'deleteobject', 'listbucket', 'deletebucket'].forEach(name => {
                if (obj.row[name] == 1) {
                  str += name+' '
                }
              })
              return h('span', str)
            }
          },
          {
            key: 'refererip',
            title: 'Referer'
          },
          {
            title: '操作',
            render: (h, obj) => {
              if(obj.row.hide != 1) {
                return h('div', [h('span', {
                  style: {
                    marginRight: '20px',
                    color: 'rgb(42, 153, 242)',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.updateDiction = true;
                      obj.row.userauthorization == '*' ? this.updateJurisd.updateUsers = '0' : this.updateJurisd.updateUsers = '1';
                      this.updateJurisd.updateGrantValue = obj.row.userauthorization;
                      this.inputValue = obj.row.userauthorization;
                      //允许白名单是否为空
                      this.updateJurisd.updateReferer = obj.row.iseffectrefip + '';
                      //影响资源
                      this.updateJurisd.updateInfluenceValue = obj.row.resource;
                      //影响资源操作
                      this.updateJurisd.updateSources = obj.row.iseffectres;
                      this.updateJurisd.updateChannel = [];
                      let str = '';
                      ['putobject', 'getobject', 'deleteobject', 'listbucket', 'deletebucket'].forEach(name => {
                        if (obj.row[name] == 1) {
                          this.updateJurisd.updateChannel.push(name);
                        }
                      })
                      console.log(this.updateJurisd.updateChannel);
                      this.updateJurisd.updateWhiteListValue = obj.row.refererip;
                      this.code = obj.row.code;
                      this.usersClick();
                    }
                  }
                }, '修改'),
                  h('span', {
                    style: {
                      color: 'rgb(42, 153, 242)',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.deleteFromBucketId(obj.row.code, obj.row._index);
                      }
                    }
                  }, '删除')
                ])
              }
            }
          },
        ],
        //权限表格数据
        aclData: [],
        //跨域访问规则表单
        formValidate: {
          name: ''
        },
        ruleValidate: {},
        //修改自定义权限
        //cors弹窗
        cors: false,
        //cors访问规则表头
        corstList: [
          {
            title: '来源Allowed Origin',
            render:(h,params) =>{
              const hide = params.row.hide == 1 ?'inline-block':'none';
              return h('div',[
                h('Spin',{
                  prop:{
                    size:'small'
                  },
                  style:{
                    display:hide
                  }
                }),
                h('span',{

                },params.row.orgins)
              ])
            }
          },
          {
            key: 'methods',
            title: 'Allowed Methods'
          },
          {
            key: 'allowsheaders',
            title: 'Allowed Headers'
          },
          {
            key: 'exposeheaders',
            title: 'Exposed Headers'
          },
          {
            key: 'maxage',
            title: '缓存Max Age'
          },
          {
            title: '操作',
            render: (h, params) => {
              if(params.row.hide != 1) {
                return h('div', [
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      marginRight: '10px',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.updateCorsForm = JSON.parse(JSON.stringify(params.row));
                        this.updateCorsForm.methods = params.row.methods.split(',');
                        this.updateCors = true;
                        this.corsIndex = params.row._index;
                        this.corsid = params.row.corsid;
                      }
                    }
                  }, '修改'),
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.deleteCros(params.row.corsid, params.row._index);
                      }
                    }
                  }, '删除')
                ])
              }
            }
          }
        ],
        corsData: [],
        //自定义权限编辑弹窗
        edit: false,
        zonename: $store.state.zone.zonename,
        //修改自定义权限是否禁用用后授权
        updategrant: false,
        //规则编辑器弹窗
        corsedit: false,
        //文件名称
        nameFile: '',
        //跨域访问设置数据
        crossDomain: {
          //自定义
          custom: '',
          errorPage: '',
          redirectOne: '',
          redirectTwo: '',
          redirectThree: ''
        },
        //创建时间
        createtime:'',
        //空间名字
        kjName: '',
        //访问权限
        kjaccessrights: '',
        //存储空间大小
        size: '',
        //获取外链文件路径
        flieSrc: '',
        addCorsForm: {
          orgins: '',
          methods: [],
          allowsHeaders: '',
          ExposeHeaders: '',
          maxAge: 0
        },
        addCorsFormValidateL: {
          orgins: [
            {required: true, message: '请填写来源Origin'}
          ],
          methods: [
            {required: true, message: '请选择操作Method'}
          ],
          allowsHeaders: [
            {required: true, message: '请填写allowsHeaders'}
          ],
          ExposeHeaders: [
            {required: true, message: '请填写ExposeHeaders'}
          ]
        },
        //修改权限需要的code
        code: '',
        //文件路径
        fileObject: [],
        int:0,
        //修改权限白名单是否禁用
        whiteListUpdate:false,
        inputValue:'',
        //新建文件
        createFile:{
          flies: ""
        },
        createFilesValiDate:{
          flies:[
            {required:"true",message:"请输入文件夹名称",trigger:"blur"}
          ]
        },
        //修改CORS规则弹窗
        updateCors:false,
        updateCorsForm:{
          orgins: '',
          methods: [],
          allowsheaders: '',
          exposeheaders: '',
          maxage: 100
        },
        updateCorsFormValidateL:{
          orgins: [
            {required: true, message: '请填写来源Origin'}
          ],
          methods: [
            {required: true, message: '请选择操作Method'}
          ],
          allowsheaders: [
            {required: true, message: '请填写allowsHeaders'}
          ],
          exposeheaders: [
            {required: true, message: '请填写ExposeHeaders'}
          ]
        },
        //获取表格当前要修改数据的index
        corsIndex:0,
        corsid:'',
        //默认域名
        defaultDomain:'',
        custom:'',
      }
    },
    methods: {
      _checkNewCros(){
        this.$refs.newCros.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            this.addCors()
          }
        })
      },
      // 添加Cros
      addCors(){
        let corsObject = {orgins:'创建中',methods:'————',allowsheaders:'————',exposeheaders:'————',maxage:'————'}
        this.corsData.push(corsObject);
        this.$http.post('cors/addCors.do', {
          bucketid: sessionStorage.getItem('bucketId'),
          bucketName: sessionStorage.getItem('bucketName'),
          orgins: this.addCorsForm.orgins,
          methods: this.addCorsForm.methods,
          allowsHeaders: this.addCorsForm.allowsHeaders,
          ExposeHeaders: this.addCorsForm.ExposeHeaders,
          maxAge: this.addCorsForm.maxAge + ''
        }).then(response => {
          if(response.status == 200 && response.data.status =="1"){
            this.cors = false;
            this.$Message.success('CROS规则配置成功');
            this.selectCors();
          }else{
            this.$Message.info(response.data.msg);
          }
        })
      },
      //获取Cros列表
      selectCors(){
        this.$http.post('cors/selectCorsAll.do',{
          bucketId:sessionStorage.getItem('bucketId')
        }).then(response =>{
          if(response.status == 200 && response.data.status == '1'){}
            this.corsData = response.data.data.OssCors;
        })
      },
      //修改CROS规则配置
      updateCros(){
        this.$refs.oldCros.validate((valid) =>{
          if(valid){
            //取名有点混乱，这个是修改cros的弹窗
            this.updateCors = false;
            let corsObject =  {orgins:'创建中',hide:1,methods:'————',allowsheaders:'————',exposeheaders:'————',maxage:'————'}
            this.corsData[this.corsIndex] = corsObject;
            console.log(this.corsData);
            this.$http.post('cors/updateCors.do',{
              bucketName:sessionStorage.getItem('bucketName'),
              orgins:this.updateCorsForm.orgins,
              methods:this.updateCorsForm.methods,
              allowsHeaders:this.updateCorsForm.allowsheaders,
              ExposeHeaders:this.updateCorsForm.exposeheaders,
              maxAge:this.updateCorsForm.maxage+"",
              corsid:this.corsid
              }
            ).then(response =>{
              if(response.status == 200 && response.data.status == '1'){
                this.$Message.success('修改成功');
                this.selectCors();
              }else {
                this.$Message.info(response.data.msg);
                this.selectCors();
              }
            })
          }
        })

      },
      //删除CROS规则配置
      deleteCros(id,index){
        let corsObject = {orgins:'删除中'}
        this.corsData.splice(index,1)
        this.corsData.splice(index,1,corsObject);
        this.$http.post('cors/deleteCors.do',{
          corsid:id+"",
          bucketName:sessionStorage.getItem('bucketName')
        }).then(response =>{
            if(response.status == 200 && response.data.status == '1'){
              this.$Message.success('删除成功');
              this.selectCors();
            }
        })
      },
      //自定义域名
      updateCustom(){
        this.domainLodaing = true;
        this.$http.post('user/updateCustom.do',{
          cephCustomDomain:this.domain.route
        }).then(response => {
          if(response.status == 200 && response.data.status == '1'){
            this.getCustom();
            this.$Message.success('自定义域名成功');
            this.domainLodaing = false;
            this.domainLodaing == false? this.mainName = false : this.mainName = true;
          }else{
            this.$Message.info('平台出小差了');
            this.domainLodaing = false;
          }
        })
      },
      //上传文件格式错误的方法
      handleFormatError(file) {
        this.$Message.info('格式错误');
      },
      //上传文件最大限制方法
      handleMaxSize() {
        this.$Message.info('单文件最大只能上传1GB哦');
      },
      //上传文件之前应用的方法
      handleBeforeUpload(file) {
        let reg = /^[\u4e00-\u9fa5\w\d@\.\-_]{1,20}$/i
        if (!reg.test(file.name)) {
          this.$Message.info('文件名不能超过20个字符');
          return false;
        }
      },
      //上传文件成功的方法
      handleSuccess(response) {
        console.log(response);
        if (response.status == '1') {
          this.$Message.success('上传成功');
          this.filesList(this.fileUpdata.dirId);
          this.getAllsize();
        } else {
          this.$Message.info(response.msg);
        }
      },
      //文件上传失败
      handleError(error) {
        this.$Message.info('上传失败');
      },
      //上传文件过程的方法
      handleUpload(file, event) {
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
      filesList(id,object) {
        this.tabLoading = true;
        var name = sessionStorage.getItem("bucketName");
        this.fileUpdata.bucketName = name;
        this.fileUpdata.zoneId = $store.state.zone.zoneid;
        this.fileUpdata.dirId = (id == undefined ? null : id.toString());
        this.$http
          .post("object/listObject.do", {
            bucketName: name,
            dirId: this.fileUpdata.dirId,
            fileName: this.filename == "" ? null :this.filename
          })
          .then(res => {
            if (res.data.status == "1") {
              this.fileData = res.data.data.data;
              if (typeof(object) != "undefined") {
                this.tabLoading = false;
              } else {
                this.tabLoading = false;
                return ;
              }
            }
          }).catch(error =>{
          this.tabLoading = false;
        });
      },
      //创建文件夹
      createFlies() {
        var name = sessionStorage.getItem("bucketName");
        this.floder = false;
        let obj = {filename:'创建中',filesize:'0',hide:1};
        this.fileData.push(obj);
        this.$refs.createF.validate((valid) => {
          if (valid) {
        this.$http
          .post("object/createObject.do", {
            bucketName: name,
            fileName: this.createFile.flies,
            dirId: this.fileUpdata.dirId
          })
          .then(res => {
            if (res.data.status == "1") {
              this.$Message.success("新建成功");
              let id = res.data.data.currentDir.dirId;
              // this.floder = false;
              this.filesList(id);
            } else {
              this.$Message.info('平台开小差了');
              this.filesList();
            }
          });
          }
        })
      },
      //删除文件
      deleteFile(id, filename,index) {
        var name = sessionStorage.getItem("bucketName");
        let obj = {filename:'删除中',filesize:'0',hide:1};
        this.fileData.splice(index,1);
        this.fileData.splice(index,1,obj);
        this.$http.post('object/deleteObject.do', {
          bucketName: name,
          fileName: filename,
          dirId: id.toString()
        }).then(res => {
          if (res.data.status == "1") {
            this.$Message.success('删除成功');
            this.filesList(this.fileUpdata.dirId);
            this.getAllsize();
          } else {
            this.$Message.info(res.data.msg);
            this.filesList(this.fileUpdata.dirId);
          }
        })
      },
      //用户授权radio切换
      usersClick() {
        if (this.updateJurisd.updateUsers == '0') {
          this.updategrant = true;
          this.updateJurisd.updateGrantValue = '*';
        } else {
          this.updategrant = false;
          this.updateJurisd.updateGrantValue = this.inputValue == "*" ?'' : this.inputValue;
        }
        if (this.jurisdValidate.users == '0') {
          this.grant = true;
          this.jurisdValidate.grantValue = '*';
        } else {
          this.grant = false;
          this.jurisdValidate.grantValue = '';

        }
      },
      //添加自定义权限
      jurisdictionClick() {
        this.$refs.jurisdValidate.validate((valid) => {
          if(valid){
            // console.log(this.jurisdValidate);
              this.jurisdiction = false;
              var name = sessionStorage.getItem("bucketName");
              var bucketId = sessionStorage.getItem('bucketId');
              let obj = {userauthorization:'创建中',hide:1};
              this.aclData.push(obj);
              this.$http.post('bucketAcl/createCustomAcl.do', {
                bucketName: name,
                bucketId: bucketId,
                objectNames: this.jurisdValidate.influenceValue,
                isOperation: this.jurisdValidate.sources.toString(),
                customPermission: this.jurisdValidate.channel,
                isReferer: this.jurisdValidate.referer,
                refereIp: this.jurisdValidate.whiteListValue,
                userAuths: this.jurisdValidate.grantValue
              }).then(res => {
                if (res.data.status == '1') {
                  this.$Message.success('添加自定义权限成功');
                  this.selectAclAll();
                } else {
                  this.$Message.info('平台出小差了');
                }
              })
            }
        })
      },
      //获取权限列表
      selectAclAll() {
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        this.jurisdLoading = true;
        this.$http.post('bucketAcl/selectAclAll.do', {
          bucketName: name,
          bucketId: bucketId
        }).then(res => {
          if (res.data.status == "1") {
            this.aclData = res.data.data.list;
            this.jurisdLoading = false;
          } else if (res.data.status == '16') {
            this.aclData = [];
            this.jurisdLoading = false;
          } else {
            this.$Message.info('平台出小差了');
            this.jurisdLoading = false;
          }
        })
      },
      //切换权限
      checkAcl() {
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        let index = this.indexs+1;
        this.$http.post('bucketAcl/aclCut.do', {
          accessrights: index.toString(),
          bucketId: bucketId,
          bucketName: name
        }).then(res => {
          if (res.data.status == '1') {
            this.$Message.success('权限切换成功');
          } else {
            this.$Message.info('切换权限失败');
          }
        })
      },
      /**
       *获取外链
       */
      geturl(filesrc) {
        this.tremLoading = true;
        var name = sessionStorage.getItem("bucketName");
        this.$http.post('object/geturl.do', {
          bucketName: name,
          timelimit: this.term == ''? '2': this.term,
          fileSrc: this.flieSrc,
          protocol:this.http
        }).then(res => {
          if (res.data.status == '1') {
            this.fliesTerm = res.data.data.data;
            this.tremLoading = false;
            this.$Message.success('获取成功');
          } else {
            this.tremLoading = false;
            this.$Message.info(res.data.msg);
          }
        })
      },
      /**
       * 删除权限
       */
      deleteFromBucketId(code,index) {
        var name = sessionStorage.getItem("bucketName");
        let obj = {userauthorization:'删除中',hide:1};
        this.aclData.splice(index,1);
        this.aclData.splice(index,1,obj);
        this.$http.post('bucketAcl/deleteFromBucketId.do', {
          bucketName: name,
          code: code
        }).then(res => {
          if (res.data.status == '1') {
            this.$Message.success('删除成功');
            this.selectAclAll();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
      },
      //修改自定义权限
      jurisdUpdateClick() {
        this.$refs.updateJurisds.validate((valid) => {
          console.log(valid);
          if(valid){
            this.updateDiction = false;
            var name = sessionStorage.getItem("bucketName");
            let obj = {userauthorization:'修改中',hide:1};
            this.aclData.push(obj);
            this.$http.post('bucketAcl/updateFromCode.do', {
              bucketName: name,
              code: this.code,
              userAuths: this.updateJurisd.updateUsers,
              customPermission: this.updateJurisd.updateChannel,
              objectNames: this.updateJurisd.updateInfluenceValue,
              isOperation: this.updateJurisd.updateSources.toString(),
              isReferer: this.updateJurisd.updateReferer == true ? '1' : this.updateJurisd.updateReferer == false ? '0' : '',
              refereIp: this.updateJurisd.updateWhiteListValue
            }).then(res => {
              if (res.data.status == '1') {
                this.$Message.success('修改成功');
                this.selectAclAll();
              } else {
                this.$Message.info(res.data.msg);
              }
            })
          }
        })

      },
      up() {
        this.$Message.info('暂无操作');
        this.crossDomain = {};
      },
      //cors收起
      //切换tab请求相应的接口
      checkTab(name){
        if(name == 'objects'){
          this.filesList();
        }else if(name == 'space'){
          this.selectAclAll();
          this.selectCors();
        }
      },
      corsLower(val) {
        val == 'cors' ? (this.corsHide = !this.corsHide) : val == 'static' ? (this.staticHide = !this.staticHide) : ''
      },
      //获取存储空间容量
      getAllsize(instance) {
        this.$http.post('object/getAllSize.do', {}).then(res => {
          if (res.data.status == '1') {
            this.size = res.data.data.data / 1024 > 1 || res.data.data.data >1000 ? (res.data.data.data / 1024).toFixed(2) + 'MB' : res.data.data.data + 'KB';
          } else {
            this.size = "0KB";
            this.$Message.info('出错了');
          }
          sessionStorage.setItem('size', this.size);

        })
      },
      //获取文件路径返回
      selectFileSrc(id, index) {
        this.fileData.id = id;
        let number = this.fileObject.length - (index + 1);
        this.fileObject.splice(index + 1, number);
        this.filesList(this.fileData.id)

      },
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
      //返回根路径
      backPage(){
        this.fileObject = [];
        this.filesList(null);
      },
      //复制文件外链路径
      copyUrl(){
        this.$refs.copy.focus();
        this.$refs.copy.select();
         document.execCommand('copy')
        try {
          if(document.execCommand('copy')){
            this.$Message.success('复制成功');
          }else {
            this.$Message.info('平台出小差了');
          }
        }catch (err) {
          if(err){
            this.$Message.info('该浏览器暂不支持复制');
          }
        }
      },
      //打开文件外链路径
      openUrl(){
        window.open(this.fliesTerm);
      },
      //获取默认域名
      getCustom(){
        this.$http.post('user/getCustom.do',{

        }).then(response =>{
          if(response.status == 200 && response.data.status == '1'){
            this.defaultDomain = response.data.data.default;
            this.custom = response.data.data.custom;
            this.domain.route = response.data.data.custom;
          }
        })
      },
      //累赘三号号函数：打开新建文件夹弹窗，清空值
      floderCLick(){
        this.floder = true;
        this.createFile.flies = '';
      },
      //累赘一号函数：打开添加自定义权限弹窗，清空值
      openJurisdiction(){
        this.jurisdiction = true;
        this.jurisdValidate = {
          grantValue: '*',
            //影响资源输入框的值
            influenceValue: '',
            //referer白名单输入框的值
            whiteListValue:'',
            //用户授权
            users: '0',
            //影响资源
            sources: '0',
            //密码接收渠道
            channel: [],
            //白名单
            referer: '0',
        }
      },
      //累赘二号函数：打开CROS规则配置弹窗，清空值
      openCros(){
        this.cors = true;
        this.addCorsForm= {
          orgins: '',
            methods: [],
            allowsHeaders: '',
            ExposeHeaders: '',
            maxAge: 0
        }
      },
      changes(){
        console.log(this.jurisdValidate.referer);
      }
    },
    created(){
      this.bucketName = sessionStorage.getItem('bucketName');
      this.ptext = this.navList[0].city; //权限列表默认显示第一个
      this.filesList();
      this.selectAclAll();
      this.getAllsize();
      this.selectCors();
      this.getCustom();
      this.createtime = sessionStorage.getItem('createtime');
      this.kjName = sessionStorage.getItem('bucketName');
      this.kjaccessrights = sessionStorage.getItem('accessrights') == 1 ? '私有读写' : sessionStorage.getItem('accessrights') == 2 ? '公有读私有写' : sessionStorage.getItem('accessrights') == 3 ? '公有读写' : '自定义权限';
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
        margin-bottom: 40px;
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
          transition: ease-in-out .3s;
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

  .fileObject{
    display: inline-block;
    color: #2A99F2;
    cursor:pointer;
  }
  .fileShow{
    display: inline-block;
    color: #2A99F2;
    cursor:pointer;
    transition:all .3s ease-in-out;
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

  .space_wailian {
    display: flex;
    p:nth-child(2) {
      margin: 16px 0;
    }
    p:nth-child(3) {
      margin: 20px 0;
    }
  }

  .upload_model {
    background-color: #ffffff;
    margin-top: 21px;
    min-height: 192px;
    border-bottom: 1px solid #e9e9e9;

  }
  .ivu-upload>.ivu-upload-list{
    overflow: hidden;
    height: 20px;
  }
  .ivu-upload-list::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .ivu-upload-list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .ivu-upload-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }

  .jurisd {
    display: flex;
  }

  .setting {
    padding: 14px 0 40px 0;
    border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
  }

  .text-boy {
    padding: 7px 0 6px 10px;
    font-size: 14px;
    background-color: #E9F4FD;
    border: 1px solid #2A99F2;
    border-radius: 4px;
    margin: 20px 0 10px 0;
  }

  .down {
    color: #2A99F2;
    cursor: pointer;
    display: inline-block;
  }

  .down::before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    border-top: 1px solid #2A99F2;
    border-left: 1px solid #2A99F2;
    transform: translateY(-2px) rotate(-135deg);
  }
  .copyClass{
    margin-top: 5px;
    span:nth-child(1){
      color:#2A99F2;cursor: pointer;
    }
    span:nth-child(2){
      color:#2A99F2;cursor: pointer;
      margin-left: 5px;
    }
  }

  .downlower::before {
    transform: translateY(4px) rotate(45deg);
  }

  p {
    line-height: 20px;
  }
  #copy{
    display: inline-block;
    width: 100%;
    height: auto;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    overflow-x:visible;overflow-y:visible;
  }
  .red{
    border:1px solid #ed3f14;
  }
</style>
