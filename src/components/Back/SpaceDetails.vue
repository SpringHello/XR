<template>
  <div class="space_box">
    <div class="space_center">
      <p style="margin:10px 0;"><span style="color: #999999;">云储存/</span><span>对象存储</span></p>
      <div class="space_block">
        <div class="space_top">
          <div style="width:50%">
            <span class="title">空间详情</span>
          </div>
          <div style="width:50%;text-align:right;">
            <Button @click="$router.push({path:'objectStorage'})" style="margin-right: 10px;">返回</Button>
            <Button @click="$router.history.go(0)" type="primary">刷新</Button>
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

        <p style="margin-top:20px;">当月用量 {{endTime}}-{{starTime}}</p>
        <div class="center_space">
          <div class="space_Two">
            <p>已用空间容量</p>
            <div class="space_text">
             {{size}}
            </div>
          </div>
          <div class="space_one">
            <div style="display: inline-block;width: 97%;margin-left:10px;">
              <p>已下载流量</p>
              <div style="font-size:36px;color:#333333;margin-top:10px;">{{flow}}</div>
            </div>
          </div>
          <div class="space_one">
            <div style="display: inline-block;width: 97%;margin-left:10px;">
              <p>http请求次数</p>
              <div style="font-size:36px;color:#333333;margin-top:10px;">{{frequency}}次</div>
            </div>
          </div>
        </div>
        <div class="monitor" :class="{monitors:!monitorHide}" @click="monitorHide = !monitorHide"  style="color: #2A99F2;">{{monitorHide?'收起':'查看监控'}}</div>
        <!--监控流量-->
        <div style="display:flex;margin-top: 10px;" v-if="monitorHide">
          <!--请求次数-->
            <div style="width: 50%;">
              <div class="center_chart">
                <div style="display:flex;padding-bottom:5px;">
                  <div style="width:50%;font-size:16px;color:#333333;">请求次数</div>
                  <div style="width:46%;text-align:right;color:#666666;font-size: 14px;">{{starTime}}</div>
                </div>
                <div class="chart">
                  <ul class="objectList">
                    <li :class=" requestIndex== index? 'objectItems':'objectItem'" v-for="(item,index) in requestList" :key="index" @click="requestClick(index)">{{item.value}}</li>
                  </ul>
                  <div class="chart-rig">
                    <Button type="primary" size="small" style="padding:5px 15px;" @click="dowloda('rwPolar')">导出</Button>
                    <ul class="objectListT">
                      <li class="objectItems">折线</li>
                    </ul>
                  </div>
                </div>
                <chart ref="rwNumber" class="echarts" :options="rwNumber"></chart>
              </div>
            </div>
          <!--下载流量情况-->
            <div style="width: 50%;">
            <div class="center_chart">
              <div style="display:flex;padding-bottom:5px;">
                <div style="width:50%;font-size:16px;color:#333333;">下载流量情况</div>
                <div style="width:46%;text-align:right;color:#666666;font-size: 14px;">{{starTime}}</div>
              </div>
              <div class="chart" >
                <ul class="objectList">
                  <li :class="dayIndex == index? 'objectItems':'objectItem'" v-for="(item,index) in dayList" :key="index" @click="dayClick(index)">{{item.value}}</li>
                </ul>
                <div class="chart-rig">
                   <Button type="primary" size="small" style="padding:5px 15px;" @click="dowloda('rwNumber')">导出</Button>
                  <ul class="objectListT">
                    <li class="objectItems">折线</li>
                  </ul>
                </div>
              </div>
              <chart ref="rwPolar" class="echarts" :options="rwPolar" ></chart>
            </div>
          </div>
        </div>
        <Tabs type="card" style="margin-top:25px;" value="objects" @on-click="checkTab" :animated="false" >
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
              <li class="fileObject" @click="backPage(1)">根目录</li>
              <li class="fileObject" style="margin-right: 10px;margin-left: 10px;" v-if="this.fileObject.length !=0" @click="backPage"><div class="leftArrow"></div>返回</li>
              <li class="fileObject" v-for="(item,index) in fileObject" @click="selectFileSrc(item.dirId,index)" :key="index">
                {{item.src+'/'}}
              </li>
            </ul>
            <Table :columns='fileList' :loading="tabLoading" :data="fileData"></Table>
          </TabPane>
          <TabPane label="空间设置" name="space">
            <div>
              <p style="font-size:18px;color:#333333;margin:0 0 20px 0;">权限设置</p>
              <div style="border:1px solid #e9e9e9;position: relative;">
                <Spin fix  v-if="aclLoading">
                  <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
                  <div>Loading</div>
                </Spin>
                <ul class="space_list">
                  <li :class="indexs == index? 'space_items':'space_item'" v-for="(item,index) in navList" :key="index"
                      @click="navlists(index)">{{item.name}}
                  </li>
                </ul>
                <div style="padding:24px">
                  <p style="color:#666666;font-size:14px;width:950px;">{{ptext}}</p>
                  <Button v-if="indexs != 3"  type="primary" style="margin:40px 0 0 0;" @click="checkAcl">确定</Button>
                </div>
                <div class="custom" v-if="indexs == 3">
                  <Button type="primary" @click="openJurisdiction" style="margin-right: 10px;">添加自定义权限</Button>
                  <!--<Button type="primary" @click="edit = true">自定义权限编辑器</Button>-->
                  <Table :loading="jurisdLoading" style="margin-top:20px;" :columns="rightList" :data="aclData" ></Table>
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
                  <!--<Button type="primary" @click="corsedit = true">CORS规则编辑器</Button>-->
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
          <Input type="text" style="width:317px;" v-model="domain.route" placeholder=""/>
          <p style="color: #999999;margin-top: 10px;">绑定自定义域名前，请先在域名管理平台将当前域名解析到{{zoneName}}</p>
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
      <p style="font-size:14px;color:#999999;line-height: 20px;margin:10px 0;">控制台上传单个文件大小不超过1GB，如需上传更大的文件请使用新睿云对象存储提供的<span
        style="color:#2A9AF3;cursor:pointer;">API</span></p>
      <p style="font-size:14px;color:#666666;margin:10px 0;">上传路径 {{routeName == undefined || routeName == "" ? '根目录':routeName}}/</p>
      <p style="text-align: right;color: #999999;">{{uploadList.length}}/24</p>
      <div class="upload_Box">
        <div class="upload_div">
          <span>待上传文件</span>
          <span>大小</span>
          <span>状态</span>
          <span>操作</span>
        </div>
        <!--<cunt ref="upload"-->
        <!--:onSuccess="handleSuccess"-->
        <!--:onFileProcess="handleUpload"-->
        <!--:onError="handleError"-->
        <!--:data="fileUpdata"-->
        <!--action="http://192.168.3.95:8086/ruirados/object/uploadObject.do">-->
        <!--<div class="upload_text">-->
        <!--<Icon type="ios-upload-outline"></Icon>-->
        <!--<span>选择文件</span>-->
        <!--<p style="margin-top:5px;color:#999999;">批量上传最多上传24个文件，若上传一存在同名文件会直接覆盖，请谨慎操作</p>-->
        <!--</div>-->
        <!--</cunt>-->
        <Upload
          ref="upload"
          :show-upload-list="false"
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
          action="object/uploadObject.do"
          class="upload_model"
          v-show="uploadList.length == 0"
        >
          <div class="upload_text">
            <Icon type="ios-upload-outline"></Icon>
            <span>选择文件</span>
            <p style="margin-top:10px;color:#999999;">批量上传最多上传24个文件，若上传一存在同名文件会直接覆盖，请谨慎操作</p>
          </div>
        </Upload>
        <div class="upload_list" v-for="(item,index) in uploadList" v-show="uploadList.length != 0">
          <div>
            <span :title='item.name'>{{item.name}}</span>
          </div>
          <div>
            <template>{{item.size/1024 < 1000 ? (item.size /1024).toFixed(2)+'kb': item.size/1048576 < 1024 ? (item.size / 1048576).toFixed(2)+'Mb' : (item.size/1073741824).toFixed(2)+'Gb'  }}</template>
          </div>
          <div>
            <i-progress  :percent="item.percentage"  style="width: 90%;" :stroke-width="6" hide-info></i-progress>
            <!--<div style="display: flex;height: 19px;width: 100%;">-->
            <!--<span style="width: 55px;">{{fist}}{{unText}}</span><span style="width: 125px;color: #999999;font-size:12px;">剩余时间{{listTime}}</span>-->
            <!--</div>-->
          </div>
          <div>
            <!--<span style="margin-right: 20px;cursor: pointer;" @click="stop = 1">暂停</span>-->
            <!--<span style="cursor: pointer;" @click="deleteUpload(index)">删除</span>-->
          </div>
        </div>
      </div>
      <br/>
      <hr color="#D8D8D8" size=1/>
    </Modal>

    <!-- 新建文件夹 -->
    <Modal
      v-model="floder"
      title="新建文件夹"
      :scrollable='true'
      :mask-closable="false"
    >
      <hr color="#D8D8D8" size=1/>
      <br/>
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
          <Select v-model="term" style="width:240px;margin: 10px 0;" @on-change="geturl">
            <Option v-for="item in termList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <div>
            <i-switch @on-change="geturl" v-model="http" true-value="https" false-value="http"></i-switch>
          </div>
          <br>
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
              <!--<Radio label='1'>自定义用户</Radio>-->
            </RadioGroup>
            <Input :disabled='grant' v-model="jurisdValidate.grantValue" style="width:420px;" :rows="4" type="textarea"/>
            <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(6)" @mouseout.native="toopHide(0)"></Icon>
            <transition name="fade">
              <div class="tooltip-popper" style="top:34px;" v-if="isToolHide == 6">
                <div class="tooltip-center">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip">用户ID可以在用户中心查看：点击查看 可以设置多个用户ID，每行1个用户ID；“*”代表所有用户，最多支持1个“*”
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </FormItem>
        <FormItem label="密码接收渠道" prop="channel">
          <div style="width:366px;display:flex;">
            <div style="width:300px;">
              <CheckboxGroup v-model="jurisdValidate.channel" @on-change="channelAggregate">
                <Checkbox :disabled="channelTop" label="putobject">PutObject</Checkbox>
                <Checkbox :disabled="channelTop" label="getobject">GetObject</Checkbox>
                <Checkbox :disabled="channelTop" label="deleteobject">DeleteObject</Checkbox>
                <Checkbox :disabled="channelBottom" label="listbucket">ListBucket</Checkbox>
                <Checkbox :disabled="channelBottom" label="deletebucket">DeleteBucket</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </FormItem>
        <FormItem prop="influenceValue" label="影响资源">
          <div>
            <RadioGroup v-model="jurisdValidate.sources">
              <Radio label='1'>可操作</Radio>
            </RadioGroup>
            <Input v-model="jurisdValidate.influenceValue" style="width:420px;" :rows="4" type="textarea"/>
            <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(7)" @mouseout.native="toopHide(0)"></Icon>
            <transition name="fade">
              <div class="tooltip-popper" style="top:16px" v-if="isToolHide == 7">
                <div class="tooltip-center">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip">资源留空等同于“Bucket名称”
                    资源如果只有1个斜杠，不能以斜杠结尾
                    资源可以设置多个，每行1个；每行最多1个通配符
                    （*），并且以通配符结尾。最多增加10条记录
                    示例:myfolder/object
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;" >
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
              <Checkbox @on-change="changes" true-value="1" false-value="0" v-model="jurisdValidate.referer">允许白名单为空</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem prop="whiteListValue">
          <Input :disabled="refererDisabled"  v-model="jurisdValidate.whiteListValue" style="width:420px;" :rows="4" type="textarea"/>
          <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(8)" @mouseout.native="toopHide(0)"></Icon>
          <transition name="fade">
            <div class="tooltip-popper" style="top:10px" v-if="isToolHide == 8">
              <div class="tooltip-center">
                <div class="tooltip-arrow"></div>
                <div class="tooltip">1.白名单用于添加允许访问的来源地址 2.输入多个地址请用回车分隔，不需要写http://或https://
                </div>
              </div>
            </div>
          </transition>
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
              <!--<Radio label="1">自定义用户</Radio>-->
            </RadioGroup>
            <Input :disabled='updategrant' v-model="updateJurisd.updateGrantValue" style="width:420px;" :rows="4" type="textarea"></Input>
              <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(6)" @mouseout.native="toopHide(0)"></Icon>
              <transition name="fade">
                <div class="tooltip-popper" style="top:34px;" v-if="isToolHide == 6">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">用户ID可以在用户中心查看：点击查看 可以设置多个用户ID，每行1个用户ID；“*”代表所有用户，最多支持1个“*”
                    </div>
                  </div>
                </div>
              </transition>
          </div>
        </FormItem>
        <FormItem prop="updateChannel">
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">密码接收渠道</div>
            <div style="width:300px;">
              <CheckboxGroup v-model="updateJurisd.updateChannel" @on-change="updateChannelAggregate">
                <Checkbox :disabled="UpdateChannelTop" label="putobject">PutObject</Checkbox>
                <Checkbox :disabled="UpdateChannelTop" label="getobject">GetObject</Checkbox>
                <Checkbox :disabled="UpdateChannelTop" label="deleteobject">DeleteObject</Checkbox>
                <Checkbox :disabled="UpdateChannelDown" label="listbucket">ListBucket</Checkbox>
                <Checkbox :disabled="UpdateChannelDown" label="deletebucket">DeleteBucket</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </FormItem>
        <FormItem prop="updateInfluenceValue" label="影响资源">
          <div>
            <RadioGroup v-model="updateJurisd.updateSources">
              <Radio label="1">可操作</Radio>
            </RadioGroup>
            <Input v-model="updateJurisd.updateInfluenceValue" style="width:420px;" :rows="4" type="textarea"></Input>
              <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(7)" @mouseout.native="toopHide(0)"></Icon>
              <transition name="fade">
                <div class="tooltip-popper" style="top:16px" v-if="isToolHide == 7">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">资源留空等同于“Bucket名称”
                      资源如果只有1个斜杠，不能以斜杠结尾
                      资源可以设置多个，每行1个；每行最多1个通配符
                      （*），并且以通配符结尾。最多增加10条记录
                      示例:myfolder/object
                    </div>
                  </div>
                </div>
              </transition>
          </div>
        </FormItem>
        <FormItem>
          <div style="width:366px;display:flex;">
            <div style="width:115px;font-size:14px;color:#333333;">Referer白名单</div>
            <div style="width:300px;">
              <Checkbox @on-change="changesUpdate"  v-model="updateJurisd.updateReferer" true-value="1" false-value="0">允许白名单为空</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem prop="updateWhiteListValue">
          <Input :disabled="refererUpdateDisabled" v-model="updateJurisd.updateWhiteListValue" style="width:420px;" :rows="4" type="textarea"></Input>
            <Icon style="color:#2A99F2;" type="ios-help-outline" @mouseover.native="toopHide(8)" @mouseout.native="toopHide(0)"></Icon>
            <transition name="fade">
              <div class="tooltip-popper" style="top:10px" v-if="isToolHide == 8">
                <div class="tooltip-center">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip">1.白名单用于添加允许访问的来源地址 2.输入多个地址请用回车分隔，不需要写http://或https://
                  </div>
                </div>
              </div>
            </transition>
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
  import diskOptions from "@/echarts/objectStroage";
  import objectNumbers from "@/echarts/numberRequests"
  import $store from "@/vuex";
  import cunt from '../../myView/objectStrorage/cunt.vue'
  const disk = JSON.stringify(diskOptions);
  const numbers = JSON.stringify(objectNumbers);

  const validRoute = (rule, value, callback) => {
    let reg = /^\s*$|[a-zA-Z]+(\.[a-zA-Z0-9]+)+(\.[a-zA-Z]+)$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的网站域名"));
      } else {
        callback();
      }
  };
  const validateUpdateField ={
    min(rule, value, callback){
      let ref = /^\s*$|[a-zA-Z]+(\.[a-zA-Z0-9]+)+(\.[a-zA-Z]+)$/;
      if (value == '')
        return callback(new Error('请输入白名单'));
      else if(!ref.test(value))
        callback(new Error('请输入正确的白名单地址'));
      else
        callback();
    }
  }
  const validatorFloder = (rule,value,callback)=>{
    let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5\.-]{1,24}$/;
    if(value == ""){
      return callback(new Error('请输入文件夹名称'));
    }else if(!reg.test(value)){
      return callback(new Error('请输入正确的文件夹名称'));
    }else {
      callback();
    }
  }
    export default {
    data() {
      return {
        isToolHide:0,
        //密码接受渠道是否禁用
        channelTop:false,
        channelBottom:false,
        //修改密码接受渠道是否禁用
        UpdateChannelDown:false,
        UpdateChannelTop:false,
        //是否隐藏查看监控
        monitorHide:true,
        unText:'',
        // 上传时间
        time:'',
        //上传耗时
        listTime:'',
        //上传速率
        fist:'',
        // 请求间隔时间
        oldTime:0,
        //请求间隔文件大小
        oldSize:0,
        // 上传文件列表
        uploadList:[],
        //自定义域名弹窗
        mainName:false,
        domain:{
          route:''
        },
        domainValiDate:{
          route:[
            {required:true,validator:validRoute,trigger:'blur'}
          ]
        },
        domainLodaing:false,
        //自定义权限表格加载
        jurisdLoading:false,
        isClass:true,
        //数字渐变动画
        // options: {
        //   useEasing: true,
        //   useGrouping: true,
        //   separator: ',',
        //   decimal: '.',
        //   prefix: '',
        //   suffix: ''
        // },
        //查看外链
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
        //白名单输入框是否禁用
        refererDisabled: false,
        refererUpdateDisabled:false,
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
            city: "任何人都可以读取文件，对文件的写入、删除等操作仍需要由文件的所有者授权的操作人完成"
          },
          {
            name: "公有读写",
            city: "所有人均可读写Bucket内的Object，无需身份验证。该权限安全风险极高，为确保您的数据安全，请谨慎选择"
          },
          {
            name: "自定义权限",
            city: "可对指定用户设置GetObject、PutObject、DeleteObject、ListObjects、DeleteBucket的权限，并可指定该权限可访问的资源，以及指定具有该权限的IP地址和Referer白名单等"
          }
        ],
        //权限文字
        ptext: "",
        //权限列表index
        dayIndex: 0,
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
        //当前文件目录ID
        currentId:'',
        //后端返回的路径
        readFileObject:[],
        routeName:'',
        //文件列表表头
        fileList: [
          {
            key: "filename",
            title: "文件名称",
            render: (h, params) => {
              this.isfile = params.row.isfile;
              const hide = params.row.hide == 1 ?'inline-block':'none';
              const hides = params.row.hides == 1 ?'none':'inline-block'
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
                      marginLeft: '5px',
                      maxWidth:'150px',
                      overflow:'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      display:'inline-block'
                    },
                    domProps:{
                      title:params.row.filename
                    },
                    on: {
                      click: () => {
                        //清空搜索文件的名称
                        this.routeName = params.row.filename;
                        this.filename = "";
                        var object = new Object();
                        object.src = params.row.filename;
                        object.dirId = params.row.id;
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
                    style:{
                      color: '#666666',
                      maxWidth:'150px',
                      overflow:'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      display:'inline-block',
                      height:'15px'
                    },
                    domProps:{
                      title:params.row.filename
                    },
                },params.row.filename),
                  h('span',{
                    style:{
                      color:'#2A99F2',
                      marginLeft:'5px',
                      cursor:'pointer',
                      display:hides,
                      verticalAlign:'top'
                    },
                    on:{
                      click:()=>{
                        this.downloadObject(params.row.filesrc);
                      }
                    }
                  },'下载')
                ])
              }
            }
          },
          {
            key: "filesize",
            title: "大小",
            render: (h, params) => {
              return h('div', [
                h('span', {},  params.row.filesize / 1048576 > 1   ? ((params.row.filesize / 1048576).toFixed(2) + "GB"): params.row.filesize > 1000 || params.row.filesize / 1024 > 1 ? ((params.row.filesize / 1024).toFixed(2) + "MB")   : (params.row.filesize + 'KB'))//换算文件大小单位
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
            width:150,
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
                        this.geturl(params.row.filesrc);
                      }
                    }
                  }, "查看外链"),
                  h('span', {
                    style: {
                      color: "#2A99F2",
                      cursor: 'pointer',

                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '删除文件/文件夹',
                          content: '<p>是否删除该文件/文件夹</p>',
                          onOk: () => {
                            this.deleteFile(params.row);//传入文件Id和文件名称删除
                          }
                        });

                      }
                    }
                  }, "删除")
                ])
              }
            }
          },
          {
            key:'isfile',
            sortType:'desc',
            width:'1',
            className:'files',
            renderHeader:(h,data)=>{
              return h('div','')
            },
            render:(h,params)=>{
              return h('span',{
                  style:{
                    display:'none'
                  }
                },params.row.isfile)
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
          sources: '1',
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
          updateSources: '1',
          updateChannel: [],
          updateGrantValue: '',
          updateUsers: ''
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
            {validator:validateUpdateField.min, trigger: 'blur'},
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
          ],
          updateWhiteListValue:[
            {validator:validateUpdateField.min,trigger:'blur'}
          ]
        },
        //删除权限表格下标
        jurisdIndex:0,
        //权限表格表头
        rightList: [
          {
            key: 'userauthorization',
            title: '授权用户ID',
            render:(h,params) =>{
              const hide = params.row.hide == 1 ?'inline-block':'none';
              this.jurisdIndex = params.row._index;
                return h('div',[
                  h('Spin',{
                    prop:{
                      size:'small'
                    },
                    style:{
                      display:hide
                    }
                  }),
                  h('span',{},params.row.userauthorization == '0'?'*':params.row.userauthorization )
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
                      this.updateJurisd.updateWhiteListValue = obj.row.refererip;
                      this.code = obj.row.code;
                      this.updateChannelAggregate();
                      this.changesUpdate();
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
                        this.$Modal.confirm({
                          title: '删除权限',
                          content: '<p>是否删除该权限</p>',
                          onOk: () => {
                            this.deleteFromBucketId(obj.row);
                          }
                        });
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
                        this.$Modal.confirm({
                          title: '删除CROS配置',
                          content: '<p>是否删除该CROS配置</p>',
                          onOk: () => {
                            this.deleteCros(params.row.corsid, params.row._index);
                          }
                        });
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
            {required:"true",validator:validatorFloder,trigger:"blur"}
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
        //接受ceph服务器域名
        zoneName:'',
        //下载流量统计图
        rwPolar: JSON.parse(disk),
        //请求次数统计图
        rwNumber: JSON.parse(numbers),
        //下载流量统计图数据
        dayList: [
          {
            value: '今天',
            data: [0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],            label:'1'
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],            label:'2'
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: '3'
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label: '30'
          }
        ],
        //下载流量选择时间
        indexs: 0,
        requestIndex: 0,
        //请求次数统计图数据
        requestList: [
          {
            value: '今天',
            data: [0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],            label: '1'
          },
          {
            value: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00','20:00','21:00','22:00','23:00'],
            label: '2'
          },
          {
            value: '最近七天',
            data: [0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---'],
            label: '3'
          },
          {
            value: '最近三十天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            day: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            label: '30'
          }
        ],
        frequency:'',
        flow:'',
        //统计时间开始
        starTime:'',
        //统计时间结束
        endTime:'',
        //切换权限按钮loading
        aclLoading:false
      }
    },
    components:{
      cunt
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
            this.selectCors();
          }
        })
      },
      //获取Cros列表
      selectCors(){
        this.$http.post('cors/selectCorsAll.do',{
          bucketId:sessionStorage.getItem('bucketId')
        }).then(response =>{
          if(response.status == 200 && response.data.status == '1'){
            this.corsData = response.data.data.OssCors;
          }else{
            this.$Message.info('平台出小差了');
          }
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
        this.corsData.splice(index,1,corsObject);
        this.$http.post('cors/deleteCors.do',{
          corsid:id+"",
          bucketName:sessionStorage.getItem('bucketName')
        }).then(response =>{
            if(response.status == 200 && response.data.status == '1'){
              this.$Message.success('删除成功');
              this.selectCors();
            }else{
              this.$Message.info(res.data.msg);
              this.selectCors();
            }
        })
      },
      //自定义域名
      updateCustom(){
        this.domainLodaing = true;
        this.$refs.domain.validate((valid)=>{
          if(valid){
            this.$http.post('user/updateCustom.do',{
              cephCustomDomain:this.domain.route
            }).then(response => {
              if(response.status == 200 && response.data.status == '1'){
                this.getCustom();
                this.$Message.success('自定义域名成功');
                this.domainLodaing = false;
                this.domainLodaing == false? this.mainName = false : this.mainName = true;
              }else{
                this.$Message.info(response.data.msg);
                this.domainLodaing = false;
                this.getCustom();
              }
            })
          }else {
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
        if(this.uploadList.length>24){
          this.$Message.info('最多一次性上传24个文件');
          return false;
        }
      },
      //上传文件成功的方法
      handleSuccess(response,file) {
        const fileList = this.$refs.upload.fileList;
        if (response.status == '1') {
          this.$Message.success('上传成功');
          fileList.splice(fileList.indexOf(file), 1);
          this.filesList(this.fileUpdata.dirId);
          this.getAllsize();
        } else {
          fileList.splice(fileList.indexOf(file), 1);
          this.$Message.info(response.msg);
        }
      },
      //文件上传失败
      handleError(error) {
        this.$Message.info('上传失败');
      },
      //上传文件过程的方法
      handleUpload(event, file) {
        this.oldTime = new Date().getTime();
        this.time =  event;
        // console.log(event.total / event.timeStamp);
      },
      //权限切换
      navlists(val) {
        this.indexs = val;
        this.ptext = this.navList[val].city;
        if(sessionStorage.getItem('accessrights') == 1 || sessionStorage.getItem('accessrights') == 2 ||sessionStorage.getItem('accessrights') == 3){

        }else{
          if(val == 3){
            this.aclData = [];
          }
        }
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
              // console.log(res.data.data.dirMeta); log输出的内容报错也会阻断代码运行
              // console.log(res.data.data.dirMeta.dirList != []);
              if( typeof(res.data.data.dirMeta) != "undefined" && res.data.data.dirMeta.dirList != [] ){
                this.fileObject = res.data.data.dirMeta.dirList;
              }else{
                this.fileObject = [];
                this.tabLoading = false;
              }
              if (typeof(object) != "undefined") {
                this.tabLoading = false;
              } else {
                this.tabLoading = false;
              }
            }
          }).catch(error =>{
          this.tabLoading = false;
        });
      },
      //创建文件夹
      createFlies() {
        var name = sessionStorage.getItem("bucketName");
        this.$refs.createF.validate((valid) => {
          if (valid) {
            let obj = {filename:'创建中',filesize:'0',hide:1,isfile:'1'};
            this.fileData.push(obj);
            this.floder = false;
        this.$http
          .post("object/createObject.do", {
            bucketName: name,
            fileName: this.createFile.flies,
            dirId: this.fileUpdata.dirId
          })
          .then(res => {
            if (res.data.status == "1") {
              this.$Message.success("新建成功");
              let id = res.data.data.currentDir.dirId == '0' ? null : res.data.data.currentDir.dirId;
              // this.floder = false;
              this.filesList(id);
            } else {
              this.$Message.info(res.data.msg);
              this.filesList();
            }
          });
          }
        })
      },
      //删除文件
      deleteFile(params) {
        var name = sessionStorage.getItem("bucketName");
        let obj = {filename:'删除中',filesize:'0',hide:1,hides:1,isfile:params.isfile};
        this.fileData.splice(params._index,1,obj);
        this.$http.post('object/deleteObject.do', {
          bucketName: name,
          fileName: params.filename,
          dirId: params.id.toString()
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
          this.updateJurisd.updateGrantValue = this.updateGrantValue == "*" ? '' : this.updateGrantValue;
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
                  this.kjaccessrights = '自定义权限';
                  this.selectAclAll();
                } else {
                  this.$Message.info(res.data.msg);
                  this.selectAclAll();
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
        this.aclLoading = true;
        var name = sessionStorage.getItem("bucketName");
        var bucketId = sessionStorage.getItem('bucketId');
        let index = this.indexs+1;
        this.$http.post('bucketAcl/aclCut.do', {
          accessrights: index.toString(),
          bucketId: bucketId,
          bucketName: name
        }).then(res => {
          if (res.data.status == '1') {
            sessionStorage.setItem('accessrights', index);
            this.kjaccessrights = sessionStorage.getItem('accessrights') == 1 ? '私有读写' : sessionStorage.getItem('accessrights') == 2 ? '公有读私有写' :sessionStorage.getItem('accessrights')== 3 ? '公有读写' : '自定义权限';
            this.$Message.success('权限切换成功');
            this.aclLoading = false;
          } else {
            this.$Message.info('切换权限失败');
            this.aclLoading = false;
          }
        })
      },
      /**
       *获取外链
       */
      geturl() {
        var name = sessionStorage.getItem("bucketName");
        this.$http.post('object/geturl.do', {
          bucketName: name,
          timelimit: this.term == ''? '2': this.term,
          fileSrc: this.flieSrc,
          protocol:this.http == ''?'http':this.http
        }).then(res => {
          if (res.data.status == '1') {
            this.fliesTerm = res.data.data.data;
          } else {
            this.$Message.info(res.data.message);
          }
        }).catch(error =>{
          if(error)
            this.$Message.info('平台出小差了');
        })
      },
      /**
       * 删除权限
       */
      deleteFromBucketId(objs) {
        var name = sessionStorage.getItem("bucketName");
        let obj = {userauthorization:'删除中',hide:1};
        this.aclData.splice(objs._index,1,obj);
        this.$http.post('bucketAcl/deleteFromBucketId.do', {
          bucketName: name,
          code: objs.code,
          userAuths:objs.userAuths,
          objectNames:objs.objectNames
        }).then(res => {
          if (res.data.status == '1') {
            this.$Message.success('删除成功');
            this.selectAclAll();
          } else {
            this.$Message.info(res.data.msg);
            this.selectAclAll();
          }
        }).catch(error =>{
          this.$Message.info('平台出小差了');
          this.selectAclAll();
        })
      },
      //修改自定义权限
      jurisdUpdateClick() {
        this.$refs.updateJurisds.validate((valid) => {
          if(valid){
            this.updateDiction = false;
            var name = sessionStorage.getItem("bucketName");
            let obj = {userauthorization:'修改中',hide:1};
            this.aclData.splice(this.jurisdIndex,1,obj);
            this.$http.post('bucketAcl/updateFromCode.do', {
              bucketName: name,
              code: this.code,
              userAuths: this.updateJurisd.updateGrantValue,
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
                this.selectAclAll();
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
          if(sessionStorage.getItem('accessrights')!=1&&sessionStorage.getItem('accessrights')!=2&&sessionStorage.getItem('accessrights')!=3) {
            this.selectAclAll();
          }
          this.selectCors();
        }
      },
      corsLower(val) {
        val == 'cors' ? (this.corsHide = !this.corsHide) : val == 'static' ? (this.staticHide = !this.staticHide) : ''
      },
      //获取存储空间容量
      getAllsize() {
        this.$http.post('object/getAllSize.do', {
          bucketName:sessionStorage.getItem('bucketName')
        }).then(res => {
          if (res.data.status == '1') {
            this.size = res.data.data.allsize / 1048576>1 ? (res.data.data.allsize /1048576).toFixed(2) +'GB': res.data.data.allsize > 1000 || res.data.data.allsize / 1024 > 1 ? (res.data.data.allsize / 1024).toFixed(2) + 'MB' : res.data.data.allsize.toFixed(2) + 'KB';
          } else {
            this.size = "0KB";
            this.$Message.info('出错了');
          }
          localStorage.setItem('size', this.size);
        })
      },
      //获取文件路径返回
      selectFileSrc(id,index) {
        let number = this.fileObject.length - (index + 1);
        this.fileObject.splice(index + 1, number);
        this.filesList(id)
      },
      //返回根路径
      backPage(val){
        if(val == 1){
          this.fileObject = [];
          this.filename = '';
          this.filesList();
        }else{
          this.fileObject.pop();
          if(!this.fileObject[this.fileObject.length-1]){
            this.filesList(null);
          }else{
            this.filesList(this.fileObject[this.fileObject.length-1].dirId);
          }
        }

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
        this.refererDisabled = false;
        this.jurisdValidate = {
          grantValue: '*',
            //影响资源输入框的值
            influenceValue: '',
            //referer白名单输入框的值
            whiteListValue:'',
            //用户授权
            users: '0',
            //影响资源
            sources: '1',
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
      //添加权限弹窗白名单验证切换
      changes(){
       if(this.jurisdValidate.referer == '1'){
           this.$refs.jurisdValidate.rules.whiteListValue[0].validator=null;
       }else{
         this.$refs.jurisdValidate.rules.whiteListValue[0].validator=validateUpdateField.min;
       }
      },
      //修改权限弹窗白名单验证切换
      changesUpdate(){
        if(this.updateJurisd.updateReferer == '1'){
          this.$refs.updateJurisds.rules.updateWhiteListValue[0].validator= null;
        }else{
          this.$refs.updateJurisds.rules.updateWhiteListValue[0].validator = validateUpdateField.min;
        }
      },
      //添加权限弹窗密码渠道
      channelAggregate(){
        if([...this.jurisdValidate.channel].length != 0){
          [...this.jurisdValidate.channel].findIndex((value,index,arr)=>{
            if(value == 'deletebucket' || value == 'listbucket'){
              this.channelTop = true;
            }else {
              this.channelBottom = true;
            }
          })
        }else{
          this.channelTop = false;
          this.channelBottom = false;
        }
      },
      updateChannelAggregate(){
        if([...this.updateJurisd.updateChannel].length != 0){
          [...this.updateJurisd.updateChannel].findIndex((value,index,arr)=>{
            if(value == 'deletebucket' || value == 'listbucket'){
              this.UpdateChannelTop = true;
            }else {
              this.UpdateChannelDown = true;
            }
          })
        }else{
          this.UpdateChannelTop = false;
          this.UpdateChannelDown = false;
        }
      },
      //获取ceph服务器域名
      getZoneDomain(){
        this.$http.get('zone/getZoneDomain.do',{
          zonename:$store.state.zone.zonename
        }).then(res => {
          this.zoneName = res.data.data.zoneDomain;
        })

      },
      //下载文件
      downloadObject(filesrc) {
        if($store.state.zoneId == undefined || $store.state.zoneId == 'undefined'){
          this.$http.post('object/geturl.do', {
            bucketName: sessionStorage.getItem('bucketName'),
            timelimit: '0',
            fileSrc: filesrc,
            protocol: 'http'
          }).then(res => {
            if (res.data.status == '1') {
              let url = res.data.data.data;
              this.$http.get(url,{}).then(res =>{if(res.status != 200)return this.$Message.info('下载失败请重试');});
              var eleLink = document.createElement('a');
              document.body.appendChild(eleLink);
              eleLink.style.display = 'none';
              eleLink.href =url;
              eleLink.click();
              document.body.removeChild(eleLink);
            } else {
              this.$Message.info('平台出小差了');
            }
          })
        }else{
          this.$Message.info('请先登录');
        }
      },
      //删除上传文件
      deleteUpload(index){
        this.uploadList.splice(index,1);
      },
      //转换字节单位
      changeByte(val){
        let byte = [];
        val.forEach(item=>{
          byte.push((item / 1048576).toFixed(2))
        })
        return byte;
      },
      //下载流量点击切换数据
      dayClick(val){
        this.dayIndex = val;
        this.$http.post('monitor/getMonitorFlow.do',{
          bucketName:sessionStorage.getItem('bucketName'),
          times: this.dayList[val].label
        }).then(res=>{
          if(!res.data.data.dateList){
            this.rwPolar.xAxis.data = this.dayList[val].day;
            this.rwPolar.series[0].data =this.changeByte(res.data.data.getFlow);
          }else {
            this.rwPolar.xAxis.data = res.data.data.dateList;
            this.rwPolar.series[0].data = this.changeByte(res.data.data.getFlow);
          }
        })
      },
      //请求次数点击切换数据
      requestClick(val){
        this.requestIndex = val;
        this.$http.post('monitor/getMonitorAllTimes.do',{
          bucketName:sessionStorage.getItem("bucketName"),
          times: this.requestList[val].label
        }).then(res=>{
          if(!res.data.data.dateList){
            this.rwNumber.xAxis.data = this.requestList[val].day;
            this.rwNumber.series[0].data = res.data.data.allTimes;
          }else {
            this.rwNumber.xAxis.data = res.data.data.dateList;
            this.rwNumber.series[0].data = res.data.data.allTimes;
          }
        })
      },
      //转换base64格式为blob
      checkImg(code){
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
      },
      //下载统计图
      dowloda(name){
        var img = new Image();
        img = this.$refs[name].getConnectedDataURL({
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          type:'png'
        });
        let a = document.createElement('a');
        document.body.appendChild(a);
        let blob =this.checkImg(img);
        a.style.display = 'none';
        let url = URL.createObjectURL(blob);
        a.href = url;
        //添加了download属性才会是下载文件，不然就是跳转
        a.download = 'echarts';
        a.click();
        document.body.removeChild(a);
      },
      //概览统计情况
      getOverview(){
        this.$http.post('monitor/allMonitorTimes.do',{
          bucketName:sessionStorage.getItem('bucketName')
        }).then(res =>{
          if(res.data.status =='1'){
            this.frequency = res.data.data.requesttimes;
            this.flow = res.data.data.flowsize / 1073741824 > 1   ? ((res.data.data.flowsize / 1073741824).toFixed(2) +'GB' ):  res.data.data.flowsize / 1048576 > 1 ? ((res.data.data.flowsize / 1048576).toFixed(2) + 'MB')   : ((res.data.data.flowsize /1024).toFixed(2) + 'KB')
          }else{
            this.frequency = '0';
            this.flow = '0KB';
            this.$Message.info('平台出小差了');
          }
        }).catch(error =>{
          this.frequency = '0';
          this.flow = '0KB';
        })
      },
      //获取时间
      getTime(){
        var date  = new Date();
        var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        m = m > 9  ? m : '0'+m;
        d = d > 9 ? d : '0'+d;
        this.starTime = y+'/'+m+'/'+d;
        if(y%4 == 0 && y%100 != 0){
          daysInMonth[2] = 29;
        }
        if(m - 1 == 0)
        {
          y -= 1;
          m = 12;
        }
        else
        {
          m -= 1;
        }
        d = daysInMonth[m] >= d ? d : daysInMonth[m];
        if(m<10)
        {
          m='0'+m;
        }
        this.endTime = y+'/'+m+'/'+d;
      },
      toopHide(value){
        this.isToolHide = value;
      }
    },
    created(){
      this.bucketName = sessionStorage.getItem('bucketName');
      this.ptext = this.navList[0].city; //权限列表默认显示第一个
      this.filesList();
      if(sessionStorage.getItem('accessr')!=1&&sessionStorage.getItem('accessr')!=2&&sessionStorage.getItem('accessr')!=3){
        this.selectAclAll();
      }
      this.getAllsize();
      this.selectCors();
      this.getCustom();
      this.getZoneDomain();
      this.getOverview();
      this.dayClick(0);
      this.requestClick(0);
      this.createtime = sessionStorage.getItem('createtime');
      this.kjName = sessionStorage.getItem('bucketName');
      this.kjaccessrights = sessionStorage.getItem('accessr') == 1 ? '私有读写' : sessionStorage.getItem('accessr') == 2 ? '公有读私有写' : sessionStorage.getItem('accessr') == 3 ? '公有读写' : '自定义权限';
    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;
      this.getTime();
    },
    // watch: {
    //   time: function () {
    //     let newTime = new Date().getTime();
    //
    //     var pertTime = (newTime - this.oldTime) / 1000 <1 ?1 :(newTime - this.oldTime) / 1000;
    //     this.oldTime = new Date().getTime();
    //     /**
    //      * 上传文件先传给后台，后台接收值，暂停停止给后台传输文件，继续再调用接口*/
    //     var size = (this.time.loaded - this.oldSize) / pertTime;
    //     // var size = this.time.loaded - this.oldSize
    //     var sped = size;
    //     this.oldSize = this.time.loaded;
    //     if(size / 1024 >1 && size / 1024 < 1000) {
    //       size = size / 1024 ;
    //       this.unText="KB/s";
    //     }else if(size / 1024 > 1000){
    //       size = size / 1048576;
    //       this.unText="MB/s";
    //     }
    //     this.fist = size.toFixed(1);
    //     var listTime = ((this.time.total - this.time.loaded) / sped);
    //     console.log(listTime);
    //     var tina = (listTime / (60*60)).toFixed(0);
    //     var mint = (listTime / 60).toFixed(0);
    //     var secor = (listTime % 60).toFixed(0);
    //     this.listTime = tina +':' +mint +':' +secor
    //   }
    // }
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
        min-height:700px;
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
            color: #333333;
            font-size: 18px;
            font-family:MicrosoftYaHei
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
          width: 387px;
          display: flex;
          margin-left: 5px;
        }
        .space_one:before {
          content: "";
          width: 1px;
          height: 80px;
          display: inline-block;
          background-color: #dfdfdf;
        }
      }
    }
  }
  .objectListT{
    width: 65px;
    font-family: PingFangSC;
    display: inline-block;
    li:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    li:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .objectItem {
      display: inline-block;
      padding: 5px 16px;
      text-align: center;
      border: 1px solid #D9D9D9;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItems {
      display: inline-block;
      padding: 5px 16px;
      text-align: center;
      border: 1px solid #2a99f2;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItem:hover {
      border: 1px solid #2a99f2;
      cursor: pointer;
    }
  }
  .center_chart {
    margin-top: 19px;
    span {
      padding: 5px 16px;
      border: 1px solid #d9d9d9;
      display: inline-block;
      margin-right: -4px;
      cursor: pointer;
      border-radius: 4px 0px 0px 4px;
    }
    span:hover {
      color: #2a99f2;
      border: 1px solid #2a99f2;
      cursor: pointer;
    }
    .chart-text {
      width: 50%;
    }
  }
  .objectList {
    width: 75%;
    font-family: PingFangSC;
    display: flex;
    li:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    li:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .objectItem {
      display: inline-block;
      padding: 3px 15px;
      height: 26px;
      text-align: center;
      border: 1px solid #D9D9D9;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItems {
      display: inline-block;
      padding: 3px 15px;
      height: 26px;
      text-align: center;
      border: 1px solid #2a99f2;
      color: #2a99f2;
      cursor: pointer;
    }
    .objectItem:hover {
      border: 1px solid #2a99f2;
      cursor: pointer;
    }
  }

  .chart {
    margin-top: 10px;
    display: flex;
    height: 30px;
  }

  .chart-rig {
    width: 23%;
    text-align: right;
    height: 30px;
    display: inherit;
  }

  .echarts {
    width: 100%;
    height: 240px;
  }
  .right_tool{
    white-space: normal;
  }
  .leftArrow{
    width: 10px;
    height: 10px;
    display: inline-block;
    border-top: 1px solid #2A99F2;
    border-left: 1px solid #2A99F2;
    transform: translateY(0px) rotate(-48deg);
    margin-right: 6px;
  }
  .monitor{
    width: 100%;
    text-align: right;
    margin-top: 5px;
    cursor: pointer;
  }
  .monitor::before{
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    border-top: 1px solid #2A99F2;
    border-left: 1px solid #2A99F2;
    transform: translateY(4px) rotate(45deg);
    margin-right: 6px;
  }
  .monitors::before{
    transform: translateY(-2px) rotate(-138deg);
  }

  .uploader-example{
    background-color: #FFFFFF;
  }
  .upload_Box{
    height: 200px;
    overflow: auto;
    border-right: 1px solid #E9E9E9;
    border-left: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
  }
  .upload_Box::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .upload_Box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(144,144,144,0.2);
    background: #999999;
  }
  .upload_Box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
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


  .upload_list{
    display: flex;
    height: 50px;
    padding:5px;
    div:nth-child(1){
      width: 26%;
      height: 25px;
      line-height: 25px;
      color: #666666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    div:nth-child(2) {
      width: 16%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
    div:nth-child(3) {
      width: 33%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
    div:nth-child(4) {
      width: 26%;
      height: 25px;
      line-height: 25px;
      color: #2A99F2
    }
  }
  .upload_div {
    display: flex;
    background-color: #E9E9E9;
    span:nth-child(1) {
      width: 26%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
    span:nth-child(2) {
      width: 16%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
    span:nth-child(3) {
      width: 33%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
    span:nth-child(4) {
      width: 26%;
      height: 25px;
      line-height: 25px;
      color: #666666;
    }
  }
  .ivu-table td.files{
    display: none;
  }
  .upload_text {
    margin-top: 5px;
    background-color: #ffffff;
    text-align: center;
    span {
      color: #2a9af3;
      font-size: 14px;
      margin: 10px 5px 10px 0;
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
  }

  .jurisd {
    display: flex;
  }

  .setting {
    padding: 14px 0 40px 0;
    border-top: 1px solid #D8D8D8;
    /*border-bottom: 1px solid #D8D8D8;*/
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
  .ivu-table td .fileCame{
    color: #666666;
    max-width:150px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display:inline-block;
    height:15px;
    &:hover{
      color: #2A99F2;
    }
  }

  .tooltip {
    max-width: 250px;
    width: 211px;
    min-height: 34px;
    padding: 8px 12px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color: rgba(70, 76, 91, 0.9);
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  .tooltip-popper {
    position: absolute;
    top: -1px;
    left: 437px;
    will-change: top, left;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    z-index: 1060;
    padding: 0 5px 0 8px;
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    top: 50%;
    margin-top: -5px;
    left: 3px;
    border-width: 5px 5px 5px 0;
    border-right-color: rgba(70, 76, 91, 0.9);
  }
</style>
