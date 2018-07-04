<template>
  <div class="background">
    <div class="card">
      <span>首页 / 备案详情</span>
      <div class="center">
        <div class="center_title">
          <div style="width:1020px;">
            <div style="display:flex">
              <span style="font-size:16px;color:#2A99F2;">备案域名</span>
              <!-- <div class="click_icon icons" @click="toolShow(isIcon)" :class="{hide_icon:!isIcon}"></div> -->
            </div>
            <div style="width:100%;">
              <ul style="display: flex">
                <li class="list_item">备案ID:{{hostUnitList.recordserviceid}}</li>
                <li class="list_item">备案类型:{{hostUnitList.recordtype}}</li>
                <li class="list_item">备案主体:{{hostUnitList.webname}}</li>
                <li class="list_item">当前状态:{{hostUnitList.status}}</li>
                <li class="list_item">最近更新时间:{{hostUnitList.lastupdatetime}}</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="back_button" @click="$router.go(-1)"><span>返回</span></div>
            <div class="refresh_button" @click="details"><span>刷新</span></div>
          </div>
        </div>
        <!--主办单位信息-->
        <div>
          <div class="info_box">
            <div style="margin-bottom:20px;display:flex;display:-webkit-flex;width:100%;">
              <div class="click_icon icons" :class="{hide_icon:!isIconSon}" @click="infoBoxShow('information')"></div>
              <div style="margin-left:5px;width: 80px;">
                <span>主办单位信息</span>
              </div>
              <div style="width:90%;text-align: right;">
                <Button type="primary" style="margin-right: 10px;" @click="changeCompile('isChange')" v-show="!isCompile">变更备案</Button>
                <Button type="primary" style="margin-right: 10px;" @click="changeCompile('isCanl')" v-show="isCompile">取消变更</Button>
                <Button @click="domain = true" v-show="!isCompile">注销主体</Button>
                <Button type="primary" style="margin-left: 10px" v-show="isCompile" @click="host = true">修改主体</Button>
              </div>
            </div>
            <div class="tables" v-show="isIconSon">
              <ul class="nav_list">
                <li class="nav_item">主体单位所属区域</li>
                <li class="nav_item">主体单位证件类型</li>
                <li class="nav_item">主体单位性质</li>
                <li class="nav_item">主体单位证件号码</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanyarea}}</p>
                  <div v-if="mainCompanyAreaHide == 'mainCompanyArea'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycertificatestype}}</p>
                  <div v-if="mainCompanyCertificatesTypeHide == 'mainCompanyCertificatesType'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanynature}}</p>
                  <div v-if="mainCompanyNatureHide == 'mainCompanyNature'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanynumber}}</p>
                  <div v-if="mainCompanyNumberHide == 'mainCompanyNumber'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div>
                </li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">主体单位名称</li>
                <li class="nav_item">主体单位证件住所</li>
                <li class="nav_item">主体单位通信地址</li>
                <li class="nav_item">投资人或主管单位姓名</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanyname}}</p>
                  <div v-if="mainCompanyNameHide == 'mainCompanyName'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycertificatesloaction}}</p>
                  <div v-if="mainCompanyCertificatesLoactionHide == 'mainCompanyCertificatesLoaction'"
                       class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycommunicatlocation}}</p>
                  <div v-if="mainCompanyCommunicatLocationHide == 'mainCompanyCommunicatLocation'" class="text_block">
                    <span style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                              @click="host = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.investorname}}</p>
                  <div v-if="investorNameHide == 'investorName'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div>
                </li>
              </ul>
            </div>
          </div>
          <!--主体单位负责人信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconPerson}" @click="infoBoxShow('personInfo')"></div>
              <div style="margin-left:5px;">
                <span>主体单位负责人信息</span>
              </div>
              <div style="width:87.5%;text-align: right;" v-show="isCompile">
                <Button type="primary" @click="legal = true">修改主体负责人</Button>
              </div>
            </div>
            <div class="tables" v-show="isIconPerson">
              <ul class="nav_list">
                <li class="nav_item">法人姓名</li>
                <li class="nav_item">法人证件类型</li>
                <li class="nav_item">法人证件号码</li>
                <li class="nav_item">办公室电话</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.legalname}}</p>
                  <div v-if="legalNameHide == 'legalName'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.legalcertificatestype}}</p>
                  <div v-if="legalCertificatesTypeHide == 'legalCertificatesType'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click="legal = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.legalcertificatesnumber}}</p>
                  <div v-if="legalCertificatesNumberHide == 'legalCertificatesNumber'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click="legal = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>+86 {{hostUnitList.officenumber}}</p>
                  <div v-if="officeNumberHide == 'officeNumber'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div>
                </li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">手机号码</li>
                <li class="nav_item">电子邮箱地址</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.companyphone}}</p>
                  <div v-if="companyPhoneHide == 'companyPhone'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.companyemail}}</p>
                  <div v-if="companyEmailHide == 'companyEmail'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div>
                </li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <!--网站基本信息-->
          <div class="info_box">
            <div style="margin-bottom:20px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconInfo}" @click="infoBoxShow('webInfo')"></div>
              <div style="margin-left:5px;width:80px;">
                <span>网站基本信息</span>
              </div>

              <div style="width:90%;text-align: right;">
                <Button type="primary" @click="cancel = true" v-show="!isCompile">取消接入</Button>
                <Button @click="cancellation = true" style="margin-left: 10px" v-show="!isCompile">注销网站</Button>
                <Button type="primary" style="margin-left: 10px" v-show="isCompile" @click="website= true">修改网站</Button>
              </div>
            </div>
            <div class="tables" v-show="isIconInfo">
              <ul class="nav_list">
                <li class="nav_item">网站名称</li>
                <li class="nav_item">网站域名</li>
                <li class="nav_item">网站首页URL</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.webname}}</p>
                  <div v-if="webNameHide == 'webName'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webdomian}}</p>
                  <div v-if="webDomianHide == 'webDomian'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.weburl}}</p>
                  <div v-if="webUrlHide == 'webUrl'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div>
                </li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">网站服务内容</li>
                <li class="nav_item">网站语言</li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.webservercontent}}</p>
                  <div v-if="webServerContentHide == 'webservercontent'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span>
                  </div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webmessage}}</p>
                  <div v-if="webMessageHide == 'webmessage'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click=" website = true">重新输入</span></div>
                </li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <!--网站负责人基本信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconWebPerson}"
                   @click="infoBoxShow('webPersonInfo')"></div>
              <div style="margin-left:5px;">
                <span>网站负责人基本信息</span>
              </div>
              <div style="width:87.5%;text-align: right;" v-show="isCompile">
                <Button type="primary" @click="websitePerson = true">修改网站负责人</Button>
              </div>
            </div>
            <div class="tables" v-show="isIconWebPerson">
              <ul class="nav_list">
                <li class="nav_item">姓名</li>
                <li class="nav_item">有效证件类型</li>
                <li class="nav_item">有效证件号码</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.webresponsibilitylinkname}}</p>
                  <div v-if="webResponsibilityLinkNameHide == 'webResponsibilityLinkName'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;"
                                                        @click=" websitePerson = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webresponsibilitycertificatestype}}</p>
                  <div v-if="webResponsibilityCertificatesTypeHide == 'webResponsibilityCertificatesType'"
                       class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span>
                  </div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webresponsibilitycertificatesnumber}}</p>
                  <div v-if="webResponsibilityCertificatesNumberHide == 'webResponsibilityCertificatesNumber'"
                       class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div>
                </li>

              </ul>
              <ul class="nav_list">
                <li class="nav_item">办公室电话号码</li>
                <li class="nav_item">移动电话号码</li>
                <li class="nav_item">电子邮箱地址</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>+86 {{hostUnitList.offacenumber}}</p>
                  <div v-if="offaceNumberHide == 'offaceNumber'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.phone}}</p>
                  <div v-if="phoneHide == 'phone'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.email}}</p>
                  <div v-if="emailHide == 'email'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div>
                </li>
              </ul>
            </div>
          </div>
          <!--ISP备案网站接入信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconISP}" @click="infoBoxShow('inforISP')"></div>
              <div style="margin-left:5px;">
                <span>ISP备案网站接入信息</span>
              </div>
              <div style="width:86.5%;text-align: right;" v-show="isCompile">
                <Button type="primary" @click="webIsp = true">修改ISP信息</Button>
              </div>
            </div>
            <div class="tables" v-show="isIconISP">
              <ul class="nav_list">
                <li class="nav_item">ISP名称</li>
                <li class="nav_item">网站IP地址</li>
                <li class="nav_item">网站接入方式</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.ispname}}</p>
                  <div v-if="ISPNameHide == 'ISPName'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webip}}</p>
                  <div v-if="webIpHide == 'webIp'" class="text_block"><span style="color:red">信息有误</span> <span
                    style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webaccesstype}}</p>
                  <div v-if="webAccessTypeHide =='webAccessType'" class="text_block"><span style="color:red">信息有误</span>
                    <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span>
                  </div>
                </li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">服务器放置地</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">
                  <p>{{hostUnitList.webserveraddress}}</p>
                  <div v-if="webServerAddressHide =='webServerAddress'" class="text_block"><span
                    style="color:red">信息有误</span> <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span>
                  </div>
                </li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <div class="info_box">
            <div>
              <div style="margin-bottom:10px;">
                <div style="margin-left:5px;">
                  <span>主办单位与负责人相关资料</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">主办单位负责人照片</li>
                  <li class="tab_item" @click="sponsorPhoto = true">点击查看
                    <div v-if="sponsorPhotoHide =='sponsorPhoto'" class="text_block"><span style="color:red">信息有误</span>
                      <span style="color:#2a99f2;cursor:pointer;" @click="sponsorPhoto = true">重新输入</span>
                    </div>
                  </li>
                  <li class="tab_item">主办单位照片</li>
                  <li class="tab_item" @click="organizerPhoto = true">点击查看
                    <div v-if="organizerPhotoHide =='organizerPhoto'" class="text_block"><span style="color:red">信息有误</span>
                      <span style="color:#2a99f2;cursor:pointer;" @click="organizerPhoto = true">重新输入</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div style="margin-bottom:10px;margin-top: 6px;">
                <div style="margin-left:5px;">
                  <span>域名证书与网站核验单</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">域名证书</li>
                  <li class="tab_item" @click="domainNameCertificate = true">点击查看
                    <div v-if="domainNameCertificateHide =='domainNameCertificate'" class="text_block"><span style="color:red">信息有误</span>
                      <span style="color:#2a99f2;cursor:pointer;" @click="domainNameCertificate = true">重新输入</span>
                    </div>
                  </li>
                  <li class="tab_item">网站核验单</li>
                  <li class="tab_item" @click="checkList = true">点击查看
                    <div v-if="checkListHide =='checkList'" class="text_block"><span style="color:red">信息有误</span>
                      <span style="color:#2a99f2;cursor:pointer;" @click="checkList = true">重新输入</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div style="margin-bottom:10px;margin-top: 6px;">
                <div style="margin-left:5px;">
                  <span>其他资料</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">其他资料</li>
                  <li class="tab_item" @click="otherInfo = true">点击查看
                    <div v-if="otherInfoHide =='otherInfo'" class="text_block"><span style="color:red">信息有误</span>
                      <span style="color:#2a99f2;cursor:pointer;" @click="otherInfo = true">重新输入</span>
                    </div>
                  </li>
                  <li class="tab_item"></li>
                  <li class="tab_item"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin:20px 0 80px 0;" v-if="hostUnitList.errorMessage != null || isCompile">
          <Button type="primary" @click="allUpdate">重新提交</Button>
        </div>
      </div>
    </div>
    <!-- 网站核验单 -->
    <Modal
      v-model="checkList"
      title="重新上传网站备案信息真实性核验单信息"
      :scrollable="true"
    >
      <p style="margin-bottom:5px">1、点击下载<a :href="single" style="color:#2A99F2;">《网站备案信息真实性核验单》</a></p>
      <p style="margin-bottom:5px">2、查看核验单样例图，填写以下载的核验单，不得涂改</p>
      <p>3、请您保存3份签字的核验单原件以备后续环节试用</p>
      <div class="updatePhoto">
        <div class="updates">
          <div style="width:50%;min-height: 197px;">
            <div v-if="isCompile">
              <div style="text-align: center;margin-top:10px;" v-for="(item,index) in webRecordData">
                <img style="width: 38px;height: 42px;" :src="item.img">
                <p style="line-height: 20px;">
                  <span>{{item.name}}</span>
                  <Icon type="ios-trash-outline" @click.native="deletePhoto('web',index)"></Icon>
                </p>
              </div>
              <Upload
                multiple
                type="drag"
                :show-upload-list="false"
                :with-credentials="true"
                action="file/upFile.do"
                :format="['jpg','jpeg','png','doc','docx','pdf']"
                :on-success="webRecordSuccess"
                :on-format-error="webRecordFormatError"
                :before-upload="webRecordBeforeUpload"
              >
                <div class="sponsor-text" v-if="hostUnitList.webrecordauthenticityurl==''">
                  暂无文件
                </div>
                <Progress v-show="percentCheckList>0&&percentCheckList<=100" :percent="percentCheckList"></Progress>
                <span class="item-content-text">
                   点击选择文件
               </span>
              </Upload>
            </div>
            <div v-else>
              <p class="hide-text" v-if="webRecordData.length==0">暂无执照扫描件</p>
              <div style="text-align: center;margin-top:10px;" v-else v-for="item in webRecordData">
                <img style="width: 38px;height: 42px;" :src="item.img">
                <p style="line-height: 20px;">
                  <span>{{item.name}}</span>
                </p>
              </div>
            </div>
          </div>
          <div style="width:50%;">
            <div style="text-align: center">
              <img @click="visibleWeb = true" style="height:222px;margin-bottom:25px;cursor:zoom-in;" :src="examples"/>
              <p>示例图</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!--网站核验单示例图大图-->
    <div class="outImg is_activ" v-if="visibleWeb" @click="visibleWeb = false">
      <div class="bigImg">
        <img :src="examples" style=" transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);width: 100%;cursor:zoom-out;" @click="visibleWeb = false">
      </div>
    </div>


    <!-- 主办单位负责人照片 -->
    <Modal
      v-model="sponsorPhoto"
      title="重新上传身份证信息"
      :scrollable="true"
    >
      <p>身份证人像面</p>
      <div class="updatePhoto">
        <div class="updates">
          <div v-if="isCompile">
            <div style="width:50%;">
              <p class="sponsor-text" v-if="hostUnitList.webresponsibilityurlpositive==''">暂无图片</p>
              <img style="width:198px;height:144px;" :src="hostUnitList.webresponsibilityurlpositive" v-else>
            </div>
            <Upload
              multiple
              type="drag"
              :show-upload-list="false"
              :with-credentials="true"
              action="file/upFile.do"
              :format="['jpg','jpeg','png']"
              :on-success="cardSuccess"
              :on-format-error="cardFormatError">
              <div class="sponsor-text" v-if="hostUnitList.webresponsibilityurlpositive==''">
                暂无图片
              </div>
              <Progress v-show="percent>0&&percent<=100" :percent="percent"></Progress>
              <span class="item-content-text">
                   点击选择文件
               </span>
            </Upload>
          </div>
          <div style="width:50%;" v-else>
            <p class="sponsor-text" v-if="hostUnitList.webresponsibilityurlpositive==''">暂无图片</p>
            <img style="width:198px;height:144px;" :src="hostUnitList.webresponsibilityurlpositive" v-else>
          </div>
          <div style="width:50%;height:203px;">
            <div style="text-align: center">
              <img style="width:198px;height:144px;margin-bottom:20px" src="../../assets/img/records/records-img1.png"/>
              <p>示例图</p>
            </div>
          </div>
        </div>
      </div>
      <p style="margin-top:10px;">身份证国徽面</p>
      <div class="updatePhoto">
        <div class="updates">
          <div v-if="isCompile">
            <div style="width:50%;">
              <p class="sponsor-text" v-if="hostUnitList.webresponsibilityurlback==''">暂无图片</p>
              <img style="width:198px;height:144px;" :src="hostUnitList.webresponsibilityurlback" v-else>
            </div>
            <Upload
              multiple
              type="drag"
              :show-upload-list="false"
              :with-credentials="true"
              action="file/upFile.do"
              :format="['jpg','jpeg','png']"
              :on-success="cardBackSuccess"
              :on-format-error="cardBackFormatError">
              <div class="sponsor-text" v-if="hostUnitList.webresponsibilityurlback==''">
                暂无图片
              </div>
              <Progress v-show="percentBack>0&&percentBack<=100" :percent="percentBack"></Progress>
              <span class="item-content-text">
                   点击选择文件
               </span>
            </Upload>
          </div>
          <div style="width:50%;" v-else>
            <p class="sponsor-text" v-if="hostUnitList.webresponsibilityurlback==''">暂无图片</p>
            <img style="width:198px;height:144px;" :src="hostUnitList.webresponsibilityurlback" v-else>
          </div>
          <div style="width:50%;height:203px;">
            <div style="text-align: center">
              <img style="height:144px;margin-bottom:20px" src="../../assets/img/records/records-img2.png"/>
              <p>示例图</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 主办单位照片 -->
    <Modal
      v-model="organizerPhoto"
      title="重新上传营业执照信息"
      :scrollable="true"
    >
      <p>执照扫描件</p>
      <div class="updatePhoto">
        <div class="updates">
          <div style="width:50%;height:203px;">
            <div v-if="isCompile">
              <div style="width:50%;text-align: center;">
                <p class="hide-text" v-if="hostUnitList.hostcompanyurl==''"></p>
                <img style="width:198px;height:144px;" :src="hostUnitList.hostcompanyurl" v-else>
                <!--<div v-for="item in uploadHost">-->
                <!--<Progress v-if="item.showProgress" :percent="item.percentage" status="active"></Progress>-->
                <!--</div>-->
              </div>
              <Upload
                multiple
                ref="uploadHost"
                type="drag"
                :show-upload-list="false"
                :with-credentials="true"
                action="file/upFile.do"
                :format="['jpg','jpeg','png']"
                :on-success="organizerSuccess"
                :on-format-error="organizerFormatError"
              >
                <div>
                  <div style="text-align: center">
                    <Progress v-show="percentCombine>0&&percentCombine<=100" :percent="percentCombine"></Progress>
                    <p class="hide-text">点击选择文件</p>
                  </div>
                </div>
              </Upload>
            </div>
            <div style="width:50%;text-align: center;" v-else>
              <p class="hide-text" v-if="hostUnitList.hostcompanyurl==''"></p>
              <img style="width:198px;height:144px;" :src="hostUnitList.hostcompanyurl" v-else>
            </div>

          </div>
          <div style="width:50%;height:203px;">
            <div style="text-align: center">
              <img @click="visible = true" style="height:144px;margin-bottom:20px;cursor: zoom-in;" src="../../assets/img/records/records-img3.png"/>
              <p>示例图</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!--营业执照示例图大图-->
    <div class="outImg is_activ" v-if="visible" @click="visible = false">
      <div class="bigImg">
        <img src="../../assets/img/records/records-img3.png" @click="visible = false"
             style="transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);width: 100%;cursor:zoom-out;cursor:zoom-out;">
      </div>
    </div>
    <!-- 域名证书 -->
    <Modal
      v-model="domainNameCertificate"
      title="重新上传域名证书信息"
      :scrollable="true"
    >
      <p>执照扫描件</p>
      <div class="updatePhoto">
        <div class="updates">
          <div style="width:100%;min-height: 197px;" v-if="isCompile">
            <p class="hide-text" v-if="addy.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-for="(item,index) in addy">
              <img style="width: 38px;height: 42px;" :src="item.img">
              <p style="line-height: 20px;">
                <span>{{item.name}}</span>
                <Icon v-if="isCompile" type="ios-trash-outline" @click.native="deletePhoto('aunthen',index)"></Icon>
              </p>
              <!--<div v-for="item in uploadDomain">-->
              <!--<Progress v-if="item.showProgress" :percent="item.percentage" status="active"></Progress>-->
              <!--</div>-->
            </div>
            <Upload
              multiple
              ref="uploadDomain"
              type="drag"
              :show-upload-list="false"
              :with-credentials="true"
              action="file/upFile.do"
              :on-success="domainNameSuccess"
              :on-format-error="domainNameFormatError"
              :before-upload="domainNameBeforeUpload"
              :format="['jpg','jpeg','png','doc','docx','pdf']">
              <Progress v-show="percentCertification>0&&percentCertification<=100" :percent="percentCertification"></Progress>
              <span class="item-content-text">点击选择文件</span>
            </Upload>
          </div>
          <div style="width:100%;min-height: 197px;" v-else>
            <p class="hide-text" v-if="addy.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-for="item in addy">
              <img style="width: 38px;height: 42px;" :src="item.img">
              <p style="line-height: 20px;">
                <span>{{item.name}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 其他资料 -->
    <Modal
      v-model="otherInfo"
      title="重新上传其他文件信息"
      :scrollable="true"
    >
      <div class="updatePhoto">
        <div class="updates">
          <div style="width:100%;min-height:200px;" v-if="isCompile">
            <div style="text-align: center;margin-top:10px;" v-for="(item,index) in otherData">
              <img style="width: 38px;height: 42px;" :src="item.img">
              <p style="line-height: 20px;">
                <span>{{item.name}}</span>
                <Icon v-if="isCompile" type="ios-trash-outline" @click.native="deletePhoto('onther',index)"></Icon>
              </p>
            </div>
            <Upload
              multiple
              type="drag"
              :show-upload-list="false"
              :with-credentials="true"
              action="file/upFile.do"
              :on-success="otherFileSuccess"
              :on-format-error="otherFormatError"
              :before-upload="otherBeforeUpload"
            >
              <Progress v-show="percentOtherFile>0&&percentOtherFile<=100" :percent="percentOtherFile"></Progress>
              <span class="item-content-text">点击选择文件</span>
            </Upload>
          </div>
          <div style="width:100%;min-height: 197px;" v-else>
            <p class="hide-text" v-if="otherData.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-else v-for="item in otherData">
              <img style="width: 38px;height: 42px;" :src="item.img">
              <p style="line-height: 20px;">
                <span>{{item.name}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 修改主办单位信息 -->
    <Modal v-model="host" title="主办单位信息" :scrollable="true">
      <Form ref="hostUpdate" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
        <FormItem prop="district">
          <p style="margin:10px">主办单位所属区域</p>
          <Select v-model="province" style="width:170px" @on-change="changeProvince">
            <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
          <Select v-model="city" style="width:140px" @on-change="changeCity">
            <Option v-for="item in cityList" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
          <Select v-model="district" style="width:100px">
            <Option v-for="item in districtList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="maincompanynature">
          <p style="margin:10px">主体单位性质</p>
          <Select v-model="updateHostUnitList.maincompanynature" @on-change="changeUnitProperties">
            <Option v-for="item in unitPropertiesList" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="maincompanycertificatestype">
          <p style="margin:10px">主体单位证件类型</p>
          <Select v-model="updateHostUnitList.maincompanycertificatestype">
            <Option v-for="item in certificateTypeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="maincompanynumber">
          <p style="margin:10px">主办单位证件号码</p>
          <Input type="text" v-model="updateHostUnitList.maincompanynumber"></Input>
        </FormItem>
        <FormItem prop="maincompanyname">
          <p style="margin:10px">主体单位名称</p>
          <Input type="text" v-model="updateHostUnitList.maincompanyname"></Input>
        </FormItem>
        <FormItem prop="maincompanycertificatesloaction">
          <p style="margin:10px">主体单位证件住所</p>
          <Input type="text" v-model="updateHostUnitList.maincompanycertificatesloaction"></Input>
        </FormItem>
        <FormItem prop="maincompanycommunicatlocation">
          <p style="margin:10px">主体单位通信地址</p>
          <Input type="text" v-model="updateHostUnitList.maincompanycommunicatlocation"></Input>
        </FormItem>
        <FormItem prop="investorname">
          <p style="margin:10px">投资人或主管姓名</p>
          <Input type="text" v-model="updateHostUnitList.investorname"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="host = false">取消</Button>
        <Button type="primary" @click="hostUpdate('hostUpdate')">确定</Button>
      </div>
    </Modal>
    <!-- 修改主体单位负责人信息 -->
    <Modal
      v-model="legal"
      title="主体单位负责人信息"
      :scrollable="true"
    >
      <Form ref="legalUpdate" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
        <FormItem prop="legalname">
          <p style="margin:10px">法人姓名</p>
          <Input type="text" v-model="updateHostUnitList.legalname"></Input>
        </FormItem>
        <FormItem prop="legalcertificatestype">
          <p style="margin:10px">法人证件类型</p>
          <Select v-model="updateHostUnitList.legalcertificatestype">
            <Option v-for="item in legalPersonCertificateTypeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="legalcertificatesnumber">
          <p style="margin:10px">法人证件号码</p>
          <Input type="text" v-model="updateHostUnitList.legalcertificatesnumber"></Input>
        </FormItem>
        <FormItem prop="officenumber">
          <p style="margin:10px">办公室电话</p>
          <Input type="text" v-model="updateHostUnitList.officenumber"></Input>
        </FormItem>
        <FormItem prop="companyphone">
          <p style="margin:10px">手机号码</p>
          <Input type="text" v-model="updateHostUnitList.companyphone"></Input>
        </FormItem>
        <FormItem prop="companyemail">
          <p style="margin:10px">电子邮箱地址</p>
          <Input type="text" v-model="updateHostUnitList.companyemail"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="legal = false">取消</Button>
        <Button type="primary" @click="hostUpdate('legalUpdate')">确定</Button>
      </div>
    </Modal>
    <!-- 修改网站基本信息信息 -->
    <Modal
      v-model="website"
      title="网站基本信息"
      :scrollable="true"
    >
      <Form ref="website" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
        <FormItem prop="webname">
          <p style="margin:10px">网站名称</p>
          <Input type="text" v-model="updateHostUnitList.webname"></Input>
        </FormItem>
        <FormItem prop="webdomian">
          <p style="margin:10px">网站域名</p>
          <Input type="text" v-model="updateHostUnitList.webdomian"></Input>
        </FormItem>
        <FormItem prop="weburl">
          <p style="margin:10px">网站首页URL</p>
          <Input type="text" v-model="updateHostUnitList.weburl"></Input>
        </FormItem>
        <FormItem prop="webservercontent">
          <p style="margin:10px">网站服务内容</p>
          <Input type="text" v-model="updateHostUnitList.webservercontent"></Input>
        </FormItem>
        <FormItem prop="webmessage">
          <p style="margin:10px">网站语言</p>
          <Input type="text" v-model="updateHostUnitList.webmessage"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="website = false">取消</Button>
        <Button type="primary" @click="hostUpdate('website')">确定</Button>
      </div>
    </Modal>
    <!-- 修改网站负责人基本信息 -->
    <Modal
      v-model="websitePerson"
      title="网站负责人基本信息"
      :scrollable="true"
    >
      <Form ref="websitePerson" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
        <FormItem prop="webresponsibilitylinkname">
          <p style="margin:10px">姓名</p>
          <Input type="text" v-model="updateHostUnitList.webresponsibilitylinkname"></Input>
        </FormItem>
        <FormItem prop="webresponsibilitycertificatestype">
          <p style="margin:10px">有效证件类型</p>
          <Select v-model="updateHostUnitList.webresponsibilitycertificatestype">
            <Option v-for="item in legalPersonCertificateTypeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="webresponsibilitycertificatesnumber">
          <p style="margin:10px">有效证件号码</p>
          <Input type="text" v-model="updateHostUnitList.webresponsibilitycertificatesnumber"></Input>
        </FormItem>
        <FormItem prop="offacenumber">
          <p style="margin:10px">办公室电话号码</p>
          <Input type="text" v-model="updateHostUnitList.offacenumber"></Input>
        </FormItem>
        <FormItem prop="phone">
          <p style="margin:10px">移动电话号码</p>
          <Input type="text" v-model="updateHostUnitList.phone"></Input>
        </FormItem>
        <FormItem prop="email">
          <p style="margin:10px">电子邮箱地址</p>
          <Input type="text" v-model="updateHostUnitList.email"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="websitePerson = false">取消</Button>
        <Button type="primary" @click="hostUpdate('websitePerson')">确定</Button>
      </div>
    </Modal>
    <!-- 修改ISP信息信息 -->
    <Modal
      v-model="webIsp"
      title="ISP备案网站接入信息"
      :scrollable="true"
    >
      <Form ref="webIsp" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
        <FormItem prop="ispname">
          <p style="margin:10px">ISP名称</p>
          <Input :readonly="true" type="text" v-model="updateHostUnitList.ispname"></Input>
        </FormItem>
        <FormItem prop="webip">
          <p style="margin:10px">网站IP地址</p>
          <Select v-model="webip" multiple>
            <Option v-for="(item,index) in webipList" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="webaccesstype">
          <p style="margin:10px">网站接入方式</p>
          <Select v-model="updateHostUnitList.webaccesstype">
            <Option v-for="item in webaccessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="webserveraddress">
          <p style="margin:10px">服务器放置地</p>
          <Input :readonly="true" type="text" v-model="updateHostUnitList.webserveraddress"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="webIsp = false">取消</Button>
        <Button type="primary" @click="hostUpdate('webIsp')">确定</Button>
      </div>
    </Modal>
    <!--取消接入-->
    <Modal v-model="cancel" title="取消接入" :scrollable="true" @on-ok="delMainWeb('取消接入确认')">
      <div class="cancel">
        <p>确定要取消此备案接入信息？</p>
        <p>取消接入后，如果您的备案信息没有对应接入商，管局可能会注销您的备案号，导致您的域名不能访问。申请提交到通信管理局后，不可撤回。</p>
        <ul>
          <li> 网站名称：{{hostUnitList.webname}}</li>
          <li> 网站首页：{{hostUnitList.weburl}}</li>
        </ul>
      </div>
    </Modal>
    <!--注销网站-->
    <Modal v-model="cancellation" title="注销网站" :scrollable="true" @on-ok="delMainWeb('注销网站确认')">
      <div class="cancel">
        <p>确定要注销网站？</p>
        <p>取消接入后，如果您的备案信息没有对应接入商，管局可能会注销您的备案号，导致您的域名不能访问。申请提交到通信管理局后，不可撤回。</p>
        <ul>
          <li> 网站名称：{{hostUnitList.webname}}</li>
          <li> 网站首页：{{hostUnitList.weburl}}</li>
        </ul>
      </div>
    </Modal>
    <!--注销主体-->
    <Modal v-model="domain" title="注销主体" :scrollable="true">
      <div class="cancel">
        <p>验证备案号码</p>
        <!--<div style="display: flex;">-->
        <Form ref="domainList" :model="domainList" :rules="domainListValiot" label-position="top">
          <FormItem label="主体备案号">
            <Input type="text" v-model="hostUnitList.recordserviceid" :readonly="true"></Input>
          </FormItem>
          <FormItem label="主体备案密码" prop="password">
            <Input type="text" v-model="domainList.password" placeholder="小于20位数字或字母"></Input>
          </FormItem>
        </Form>
        <!--</div>-->

      </div>
      <div slot="footer">
        <Button type="primary" @click="delMainWeb('注销主体确认')">下一步，提交审核</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import area from "../../options/area.json";
  import certificates from "../../options/certificates.json";

  import axios from "axios"
  //备案ID


  const imgPdf = require('../../assets/img/records/records-pdf.png');
  const imgJpg = require('../../assets/img/records/records-img.png');
  const imgDoc = require('../../assets/img/records/records-doc.png');
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
      });
    },
    data() {
      // 校验地区
      const validateArea = (rule, value, callback) => {
        if (
          this.province == "" ||
          this.city == "" ||
          this.district == ""
        ) {
          return callback(new Error("请选择所属区域"));
        } else {
          callback();
        }
      };
      //校验座机号码
      const validOfficePhone = (rule, value, callback) => {
        let reg = /^0\d{2,3}-?\d{7,8}$/;
        let regNumber = /^[0-9]+$/;
        if (!reg.test(this.updateHostUnitList.officenumber)) {
          return callback(new Error("请输入正确的座机号码"));
        } else {
          callback();
        }
      };
      const validOffacePhone = (rule, value, callback) => {
        let reg = /^0\d{2,3}-?\d{7,8}$/;
        let regNumber = /^[0-9]+$/;
        if (!reg.test(this.updateHostUnitList.offacenumber)) {
          return callback(new Error("请输入正确的座机号码"));
        } else {
          callback();
        }
      };
      //校验手机号码
      const validPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|8|9|6|7]\d{9}$/;
        if (!reg.test(this.updateHostUnitList.phone)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      const validCompanyPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|8|9|6|7]\d{9}$/;
        if (!reg.test(this.updateHostUnitList.companyphone)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      //校验不能为数字
      const validLegalPersonName = (rule, value, callback) => {
        let regNumber = /^[0-9]+$/;
        if (regNumber.test(this.updateHostUnitList.legalname)) {
          return callback(new Error("姓名不能输入数字"));
        } else {
          callback();
        }
      };
      //校验网站域名
      const validWebsiteDomain = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9]+(\.[a-zA-Z]+)$/;
        if (value == "") {
          return callback(new Error("请输入网站域名"));
        } else if (!reg.test(value)) {
          return callback(new Error("域名不正确"));
        } else {
          callback();
        }
      };
      //校验网站负责人证件号码
      const validCertificateNumber = (rule, value, callback) => {
        let regCord = /^[0-9]*$/;
        if (value == "") {
          return callback(new Error("请输入证件号码"));
        }
        if (!regCord.test(value)) {
          return callback(new Error("请输入正确的证件号码"));
        } else {
          callback();
        }
      };
      //校验新增域名
      const validNewWebsiteDomain = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]+(\.[a-zA-Z]+)$/;
        for (let i = 0; i <= value.length; i++) {
          if (value.length == 0 || value[i] == "") {
            return callback(new Error("请输入网站域名"));
          } else if (!reg.test(value[i]) && value[i] !== "") {
            // console.log(value[i]);
            return callback(new Error("请输入正确的网站域名"));
          } else {
            callback();
          }
        }
      };
      //校验网站首页URL
      const validWebsiteHomepage = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]+(\.[a-zA-Z]+)$/;
        if (value == "") {
          return callback(new Error("请输入网站首页URL"));
        } else if (!reg.test(value)) {
          return callback(new Error("请输入正确的网站首页URL"));
        } else {
          callback();
        }
      };
      return {
        //是否显示重新输入
        mainCompanyAreaHide: null,
        mainCompanyCertificatesTypeHide: null,
        mainCompanyNatureHide: null,
        mainCompanyNumberHide: null,
        mainCompanyNameHide: null,
        mainCompanyCertificatesLoactionHide: null,
        mainCompanyCommunicatLocationHide: null,
        investorNameHide: null,
        legalNameHide: null,
        legalCertificatesTypeHide: null,
        legalCertificatesNumberHide: null,
        officeNumberHide: null,
        phoneHide: null,
        emailHide: null,
        webNameHide: null,
        webDomianHide: null,
        webUrlHide: null,
        webServerContentHide: null,
        webMessageHide: null,
        webResponsibilityLinkNameHide: null,
        webResponsibilityCertificatesTypeHide: null,
        webResponsibilityCertificatesNumberHide: null,
        offaceNumberHide: null,
        companyPhoneHide: null,
        companyEmailHide: null,
        ISPNameHide: null,
        webIpHide: null,
        webAccessTypeHide: null,
        webServerAddressHide: null,
        domainNameCertificateHide: null,
        checkListHide: null,
        sponsorPhotoHide: null,
        organizerPhotoHide: null,
        otherInfoHide: null,
        //网站核验单大图
        visibleWeb: false,
        //营业执照大图
        visible: false,
        //主办单位弹窗
        host: false,
        //主体单位负责人弹窗
        legal: false,
        //网站基本信息弹窗
        website: false,
        //网站负责人弹窗
        websitePerson: false,
        //ISP备案网站接入信息弹窗
        webIsp: false,
        //备案区域
        area: "",
        //图标切换
        // isIcon: true,
        //主办单位信息详情隐藏与否
        isIconSon: true,
        //主办单位负责人详情隐藏与否
        isIconPerson: true,
        //网站基本信息详情隐藏与否
        isIconInfo: true,
        //网站负责人基本信息详情隐藏与否
        isIconWebPerson: true,
        //ISP备案网站接入详情隐藏与否
        isIconISP: true,
        //网站核验单
        checkList: false,
        //主板单位负责人照片
        sponsorPhoto: false,
        //主办单位照片
        organizerPhoto: false,
        //域名证书
        domainNameCertificate: false,
        //其他资料
        otherInfo: false,
        //备案详情数据
        hostUnitList: {},
        //主体单位证件类型选项
        maincompanycertificatestypeList: [],
        // 上传资料标记表单
        uploadForm: {
          IDPhotoList: [
            {
              // 身份证正面
              IDCardFront: "",
              // 身份证反面
              IDCardBack: ""
            }
          ],
          // 相关资料
          combine: "",
          // 域名证书
          certifiedDomainNoCertification: "",
          // 其他文件
          otherFile: "",
          // 核验单
          CheckList: ""
        },
        // 省
        provinceList: area,
        province: "",
        // 市
        city: "",
        cityList: [],
        // 区
        district: "",
        districtList: [],
        //接收修改的数据
        updateHostUnitList: {},
        //主体单位性质
        unitProperties: "",
        unitPropertiesList: certificates,
        //主体单位证件类型
        certificateTypeList: [],
        //法人证件类型
        legalPersonCertificateTypeList: ["身份证", "护照", "军官证", "台胞证"],
        //弹窗验证
        updateHostUnitListValidate: {
          district: [
            {required: true, validator: validateArea, trigger: "blur"}
          ],
          maincompanynature: [
            {required: true, message: "请选择单位性质", trigger: "change"}
          ],
          maincompanycertificatestype: [
            {required: true, message: "请选择证件类型", trigger: "change"}
          ],
          maincompanynumber: [
            {required: true, message: "请输入单位证件号码", trigger: "blur"},
            {validator: validCertificateNumber, trigger: "blur"}
          ],
          maincompanyname: [
            {required: true, message: "请输入主体单位名称", trigger: "blur"},
            {type: "string", max: 20, message: "最多只能输入20个字"}
          ],
          maincompanycertificatesloaction: [
            {required: true, message: "请输入主体单位证件住所", trigger: "blur"}
          ],
          maincompanycommunicatlocation: [
            {required: true, message: "请输入主体单位通信地址", trigger: "blur"}
          ],
          investorname: [
            {
              required: true,
              message: "请输入投资人或主管单位姓名",
              trigger: "blur"
            }
          ],
          legalname: [
            {required: true, message: "请输入法人姓名", trigger: "blur"},
            {validator: validLegalPersonName, trigger: "blur"}
          ],
          legalcertificatestype: [
            {required: true, message: "请选择法人证件类型", trigger: "change"}
          ],
          legalcertificatesnumber: [
            {required: true, validator: validCertificateNumber, trigger: "blur"}
          ],
          officenumber: [
            {required: true, message: "请输入办公室电话", trigger: "blur"},
            {validator: validOfficePhone, trigger: "blur"}
          ],
          phone: [
            {required: true, message: "请输入手机号码", trigger: "blur"},
            {validator: validPhoneNumber, tirgger: "blur"}
          ],
          email: [
            {required: true, message: "请输入电子邮箱地址", trigger: "blur"},
            {
              type: "email",
              message: "请输入正确的电子邮箱地址",
              tirgger: "blur"
            }
          ],
          webname: [
            {required: true, message: "请输入网站名称", trigger: "blur"}
          ],
          webdomian: [
            {required: true, validator: validWebsiteDomain, trigger: "blur"}
          ],
          newWebsiteDomain: [
            {required: true, validator: validNewWebsiteDomain, trigger: "blur"}
          ],
          webservercontent: [
            {required: true, message: "请输入网站服务内容", trigger: "blur"}
          ],
          webmessage: [
            {required: true, message: "请输入网站语言", trigger: "blur"}
          ],
          remark: [{type: "string", max: 50, message: "最多输入五十个字"}],
          webresponsibilitylinkname: [
            {required: true, message: "请输入负责人姓名", trigger: "blur"}
          ],
          webresponsibilitycertificatestype: [
            {required: true, message: "请选择证件类型", trigger: "change"}
          ],
          webresponsibilitycertificatesnumber: [
            {required: true, validator: validCertificateNumber, trigger: "blur"}
          ],
          offacenumber: [
            {required: true, validator: validOffacePhone, trigger: "blur"}
          ],
          companyphone: [
            {required: true, message: "请输入手机号码", trigger: "blur"},
            {required: true, validator: validCompanyPhoneNumber, trigger: "blur"}
          ],
          companyemail: [
            {required: true, message: "请输入邮箱地址", trigger: "blur"},
            {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"}
          ],
          weburl: [
            {required: true, validator: validWebsiteHomepage, trigger: "blur"}
          ],
          webaccesstype: [
            {required: true, message: "请选网站接入方式", trigger: 'blur'}
          ],
          webip: [
            {required: true, message: "请选择网站ip", trigger: "blur"}
          ]
        },
        //获取域名证书文件
        addy: [],
        imgUrl: '',
        //获取其他文件
        otherData: [],
        //获取网站核验单
        webRecordData: [],
        isAllUpate: true,
        //委托书路径
        keep: '',
        //网站核验单路径
        single: '',
        //网站核验单示例图路径
        examples: '',
        //注销网站弹窗
        cancellation: false,
        //取消接入弹窗
        cancel: false,
        id: '',
        isCompile: false,
        //注销主体
        domainList: {
          //备案密码
          password: '',
        },
        domainListValiot: {
          password: [
            {required: true, message: '请输入主体备案密码', trigger: 'blur'},
            {max: 20, trigger: 'blur'}
          ]
        },
        //注销主体弹窗
        domain: false,
        //获取上传文件
        uploadHost: [],
        uploadDomain: [],
        //ISP网站ip
        webip: [],
        webipList: [],
        //ISP服务器接入方式
        webaccessList: [
          {
            label: '专线',
            value: '专线'
          },
          {
            label: '主机托管',
            value: '主机托管'
          },
          {
            label: '虚拟主机',
            value: '虚拟主机'
          },
          {
            label: '其他',
            value: '其他'
          }
        ],
        percent: 0,
        percentBack: 0,
        percentCombine: 0,
        percentCertification: 0,
        percentOtherFile: 0,
        percentCheckList: 0
      };
    },
    created() {
      //备案ID
      this.id = sessionStorage.getItem("id");
    },
    methods: {
      infoBoxShow(value) {
        value == "information"
          ? (this.isIconSon = !this.isIconSon)
          : value == "personInfo"
          ? (this.isIconPerson = !this.isIconPerson)
          : value == "webInfo"
            ? (this.isIconInfo = !this.isIconInfo)
            : value == "webPersonInfo"
              ? (this.isIconWebPerson = !this.isIconWebPerson)
              : value == "inforISP" ? (this.isIconISP = !this.isIconISP) : "";
      },
      //查看备案详情
      details() {
        this.$Loading.start();
        var id = sessionStorage.getItem("id");
        this.$http
          .get("recode/listMainWeb.do", {
            params: {
              id: this.id,
            }
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$Loading.finish();
              this.hostUnitList = res.data.result[0];
              //JSON对象深拷贝，只能用在可以转换为JSon对象的上面
              this.updateHostUnitList = JSON.parse(JSON.stringify(res.data.result[0]));
              this.webip.push(this.updateHostUnitList.webip.slice(','));
              let arr = new Array();
              arr = this.updateHostUnitList.maincompanyarea.split("-");
              this.province = arr[0];
              this.city = arr[1];
              this.district = arr[2];
              //委托书路径
              let region = this.hostUnitList.maincompanyarea.substring(0, this.hostUnitList.maincompanyarea.indexOf('-'));

              if (region == '湖北省') {
                this.keep = 'keepOnRecord/attorney_hubei.doc';
              } else if (region == '湖南省') {
                this.keep = 'keepOnRecord/attorney_hunan.doc';
              } else if (region == '上海市') {
                this.keep = 'keepOnRecord/attorney_shanghai.doc';
              } else {
                this.keep = 'keepOnRecord/attorney.doc';
              }
              //核验单路径
              if (region == '广东省' && this.hostUnitList.maincompanynature == '个人') {
                this.single = 'keepOnRecord/hyd_for_gd_business.doc';
              } else if (region == '广东省' && this.hostUnitList.maincompanynature == '企业') {
                this.single = 'keepOnRecord/hyd_for_gd_person.doc';
              } else if (region == '浙江省') {
                this.single = 'keepOnRecord/hyd_for_zj.doc';
              } else {
                this.single = 'keepOnRecord/check.doc';
              }
              //网站核验单示例图
              const gd = require('../../assets/img/records/records-check1.jpg');
              const qt = require('../../assets/img/records/records-check2.jpg');
              region == '广东省' ? (this.examples = gd) : (this.examples = qt);


              //分割图片路径取出后缀名显示响应的文件类型图片
              if (this.hostUnitList.domaincertificateurl.indexOf(',') > 0) {
                let addy = this.hostUnitList.domaincertificateurl.split(",");
                for (let i = 0; i < addy.length; i++) {
                  let object = new Object();
                  addy[i].substring(addy[i].lastIndexOf('/') + 1);
                  object.name = (addy[i].substring(addy[i].lastIndexOf('/') + 1));
                  this.addy.push(object);
                  switch (this.addy[i].name.substring(this.addy[i].name.length - 3)) {
                    case 'pdf' :
                      this.addy[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.addy[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.addy[i].img = imgDoc;
                      break;
                  }
                }
              } else {
                let addy = this.hostUnitList.domaincertificateurl;
                let object = new Object();
                addy.substring(addy.lastIndexOf('/') + 1);
                object.name = (addy.substring(addy.lastIndexOf('/') + 1));
                this.addy.push(object);
                switch (this.addy[0].name.substring(this.addy[0].name.length - 3)) {
                  case 'pdf' :
                    this.addy[0].img = imgPdf;
                    break;
                  case 'jpg' :
                    this.addy[0].img = imgJpg;
                    break;
                  case 'doc' :
                    this.addy[0].img = imgDoc;
                    break;
                }
              }

              if (this.hostUnitList.otherdataurl.indexOf(',') > 0) {
                let onther = this.hostUnitList.otherdataurl.split(",");
                for (let j = 0; j < onther.length; j++) {
                  let obj = new Object();
                  onther[j].substring(onther[j].lastIndexOf('/') + 1);
                  obj.name = (onther[j].substring(onther[j].lastIndexOf('/') + 1));
                  this.otherData.push(obj);
                  switch (this.otherData[j].name.substring(this.otherData[j].name.length - 3)) {
                    case 'pdf' :
                      this.otherData[j].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.otherData[j].img = imgJpg;
                      break;
                    case 'doc' :
                      this.otherData[j].img = imgDoc;
                      break;
                  }
                }
              } else {
                let onther = this.hostUnitList.otherdataurl
                let obj = new Object();
                onther.substring(onther.lastIndexOf('/') + 1);
                obj.name = (onther.substring(onther.lastIndexOf('/') + 1));
                this.otherData.push(obj);
                switch (this.otherData[0].name.substring(this.otherData[0].name.length - 3)) {
                  case 'pdf' :
                    this.otherData[0].img = imgPdf;
                    break;
                  case 'jpg' :
                    this.otherData[0].img = imgJpg;
                    break;
                  case 'doc' :
                    this.otherData[0].img = imgDoc;
                    break;
                }
              }
              // console.log(this.hostUnitList);
              if (this.hostUnitList.webrecordauthenticityurl.indexOf(',') > 0) {
                let webRecord = this.hostUnitList.webrecordauthenticityurl.split(",");
                for (let j = 0; j < onther.length; j++) {
                  let objc = new Object();
                  webRecord[j].substring(webRecord[j].lastIndexOf('/') + 1);
                  objc.name = (webRecord[j].substring(webRecord[j].lastIndexOf('/') + 1));
                  this.webRecordData.push(objc);
                  switch (this.webRecordData[j].name.substring(this.webRecordData[j].name.length - 3)) {
                    case 'pdf' :
                      this.webRecordData[j].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.webRecordData[j].img = imgJpg;
                      break;
                    case 'doc' :
                      this.webRecordData[j].img = imgDoc;
                      break;
                  }
                }
              } else {
                let webRecord = this.hostUnitList.webrecordauthenticityurl
                let obj = new Object();
                webRecord.substring(webRecord.lastIndexOf('/') + 1);
                obj.name = (webRecord.substring(webRecord.lastIndexOf('/') + 1));
                this.webRecordData.push(obj);
                switch (this.webRecordData[0].name.substring(this.webRecordData[0].name.length - 3)) {
                  case 'pdf' :
                    this.webRecordData[0].img = imgPdf;
                    break;
                  case 'jpg' :
                    this.webRecordData[0].img = imgJpg;
                    break;
                  case 'doc' :
                    this.webRecordData[0].img = imgDoc;
                    break;
                }
              }
              //查询错误的备案信息然后显示出来重新输入
              if (typeof (this.hostUnitList.errorMessage) != 'undefined') {

                this.isAllUpate = false;
                this.hostUnitList.errorMessage.forEach(item => {
                  switch (item) {
                    case 'webresponsibilitylinkname':
                      this.webResponsibilityLinkNameHide = 'webResponsibilityLinkName'
                      break
                    case 'phone':
                      this.phoneHide = 'phone'
                      break
                    case 'offacenumber':
                      this.offaceNumberHide = 'offaceNumber'
                      break
                    case 'webresponsibilitycertificatestype':
                      this.webResponsibilityCertificatesTypeHide = 'webResponsibilityCertificatesType'
                      break
                    case 'maincompanyarea':
                      this.mainCompanyAreaHide = 'mainCompanyArea'
                      break
                    case 'maincompanycertificatestype':
                      this.mainCompanyCertificatesTypeHide = 'mainCompanyCertificatesType'
                      break
                    case 'maincompanynature':
                      this.mainCompanyNatureHide = 'mainCompanyNature'
                      break
                    case 'maincompanynumber':
                      this.mainCompanyNumberHide = 'mainCompanyNumber'
                      break
                    case 'maincompanyname':
                      this.mainCompanyNameHide = 'mainCompanyName'
                      break
                    case 'maincompanycertificatesloaction':
                      this.mainCompanyCertificatesLoactionHide = 'mainCompanyCertificatesLoaction'
                      break
                    case 'investorname':
                      this.investorNameHide = 'investorName'
                      break
                    case 'legalname':
                      this.legalNameHide = 'legalName'
                      break
                    case 'legalcertificatestype':
                      this.legalCertificatesTypeHide = 'legalCertificatesType'
                      break
                    case 'legalcertificatesnumber':
                      this.legalCertificatesNumberHide = 'legalCertificatesNumber'
                      break
                    case 'officenumber':
                      this.officeNumberHide = 'officeNumber'
                      break
                    case 'phone':
                      this.phoneHide = 'phone'
                      break
                    case 'email':
                      this.emailHide = 'email'
                      break
                    case 'webname':
                      this.webNameHide = 'webName'
                      break
                    case 'webdomian':
                      this.webDomianHide = 'webDomian'
                      break
                    case 'weburl':
                      this.webUrlHide = 'webUrl'
                      break
                    case 'webservercontent':
                      this.webServerContentHide = 'webServerContent'
                      break
                    case 'webmessage':
                      this.webMessageHide = 'webMessage'
                      break
                    case 'webresponsibilitycertificatesnumber':
                      this.webResponsibilityCertificatesNumberHide = 'webResponsibilityCertificatesNumber'
                      break
                    case 'companyemail':
                      this.companyEmailHide = 'companyEmail'
                      break
                    case 'companyphone':
                      this.companyPhoneHide = 'companyPhone'
                      break
                    case 'ispname':
                      this.ISPNameHide = 'ISPName'
                      break
                    case 'webip':
                      this.webIpHide = 'webIp'
                      break
                    case 'webaccesstype':
                      this.webAccessTypeHide = 'webAccessType'
                      break
                    case 'webserveraddress':
                      this.webServerAddressHide = 'webServerAddress'
                      break
                    case 'maincompanycommunicatlocation':
                      this.mainCompanyCommunicatLocationHide = 'mainCompanyCommunicatLocation'
                      break
                  }
                })
              } else {
                this.isAllUpate = true;
              }
            } else {
              this.$Loading.finish();
              this.$Message.info('平台出小差了');
            }
          });
      },
      //获取公网ip
      getPublicIP() {
        let url = 'network/listPublicIp.do'
        this.$http.get(url, {
          params: {
            status: 1
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            for (let i = 0; i < response.data.result.length; i++) {
              this.webipList.push(response.data.result[i].publicip);
            }
          }
        })
      },
      //取消接入
      delMainWeb(status) {
        this.domain = false;
        axios.post('recode/updateMainWeb.do', {
          id: this.id,
          status: status
        }).then(res => {
          if (res.data.status == 1) {
            this.details();
            this.$Message.success('提交成功');
            this.$router.push({path: 'BRecords'});
          } else {
            this.$Message.info(res.data.message)
          }
        })
        this.$Modal.confirm({
          render: (h) => {
            return h('div', [
              h('p', {style: {color: '#333333', fontSize: '14px'}}, '申请已提交'),
              h('p', {style: {color: '#666666', fontSize: '14px'}}, '新睿云将在1个工作日内将您的申请提交至通信管理局。')
            ])
          }
        })
      },
      // 重新选择省份
      changeProvince(val) {
        area.forEach(item => {
          if (item.name == val) {
            this.cityList = item.city;
          }
        });
      },
      // 重新选择市
      changeCity(val) {
        this.cityList.forEach(item => {
          if (item.name == val) {
            this.districtList = item.area;
          }
        });
      },
      changeUnitProperties(val) {
        this.unitPropertiesList.forEach(item => {
          if (item.name == val) {
            this.certificateTypeList = item.certificate;
          }
        });
      },
      allUpdate() {
        let webcompany_Id = sessionStorage.getItem('webcompany_Id');
        this.updateHostUnitList.id = this.id;
        if(this.addy.length == 0){
          this.$Message.info('请上传相关域名证书')
          return
        }
        if(this.webRecordData.length == 0){
          this.$Message.info('请上传相关网站核验单')
          return
        }
        if(this.otherData.length == 0){
          this.$Message.info('请上传委托书等其他相关资料')
          return
        }
        let domaincertificateurl = this.addy.map(item => {
          return item.name
        })
        this.updateHostUnitList.domaincertificateurl = domaincertificateurl + ''
        let webrecordauthenticityurl = this.webRecordData.map(item => {
          return item.name
        })
        this.updateHostUnitList.webrecordauthenticityurl = webrecordauthenticityurl + '';
        let otherdataurl = this.otherData.map(item => {
          return item.name
        })
        this.updateHostUnitList.otherdataurl = otherdataurl + '';
        let web = {
          id: this.id,
          status: '变更确认',
          ISPName: this.updateHostUnitList.ispname,
          webIp: this.updateHostUnitList.webip,
          webAccessType: this.updateHostUnitList.webaccesstype,
          webServerAddress: this.updateHostUnitList.webserveraddress,
          webResponsibilityLinkName: this.updateHostUnitList
            .webresponsibilitylinkname,
          webResponsibilityCertificatesType: this.updateHostUnitList
            .webresponsibilitycertificatestype,
          webResponsibilityCertificatesNumber: this.updateHostUnitList
            .webresponsibilitycertificatesnumber,
          offaceNumber: this.updateHostUnitList.offacenumber,
          webName: this.updateHostUnitList.webname,
          webDomian: this.updateHostUnitList.webdomian,
          webUrl: this.updateHostUnitList.weburl,
          webServerContent: this.updateHostUnitList.webservercontent,
          webMessage: this.updateHostUnitList.webmessage,
          phone: this.updateHostUnitList.phone,
          email: this.updateHostUnitList.email,
          webRecordAuthenticityUrl: this.updateHostUnitList.webrecordauthenticityurl,
          companyResponsibilityUrlPositive: this.updateHostUnitList.webresponsibilityurlpositive,
          companyResponsibilityUrlBack: this.updateHostUnitList.webresponsibilityurlback,
          domainCertificateUrl: this.updateHostUnitList.domaincertificateurl,
          otherDataUrl: this.updateHostUnitList.otherdataurl
        }
        let update = this.$http.post("recode/updateMainWeb.do", web);
        let main = {
          id: webcompany_Id,
          phone: this.updateHostUnitList.companyphone,
          email: this.updateHostUnitList.companyemail,
          legalName: this.updateHostUnitList.legalname,
          legalCertificatesType: this.updateHostUnitList
            .legalcertificatestype,
          legalCertificatesNumber: this.updateHostUnitList
            .legalcertificatesnumber,
          mainCompanyCertificatesType: this.updateHostUnitList
            .maincompanycertificatestype,
          mainCompanyNature: this.updateHostUnitList.maincompanynature,
          mainCompanyName: this.updateHostUnitList.maincompanyname,
          mainCompanyNumber: this.updateHostUnitList.maincompanynumber,
          mainCompanyCertificatesLoaction: this.updateHostUnitList
            .maincompanycertificatesloaction,
          mainCompanyCommunicatLocation: this.updateHostUnitList
            .maincompanycommunicatlocation,
          InvestorName: this.updateHostUnitList.investorname,
          /*

          照片
        */
          hostCompanyUrl: this.updateHostUnitList.hostcompanyurl,
          officeNumber: this.updateHostUnitList.officenumber,
          mainCompanyArea: this.updateHostUnitList.maincompanyarea
        }
        let addMian = this.$http.get('recode/addMainCompany.do', {params: main})
        Promise.all([update, addMian]).then(res => {
          if (res[0].data.status == 1 && res[1].data.status == 1) {
            this.$router.push({path: 'BRecords'});
            this.$Message.success("修改成功");
          } else {
            this.$Message.info(res.data.message);
          }
        })
      },
      //删除上传文件
      deletePhoto(val, index) {
        if (val == 'aunthen') {
          this.addy.splice(index, 1);
        } else if (val == 'web') {
          this.webRecordData.splice(index, 1);
        } else if (val == 'onther') {
          this.otherData.splice(index, 1);
        }
      },
      //主体表单修改验证
      hostUpdate(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            name == 'hostUpdate' ? this.host = false :
              name == 'legalUpdate' ? this.legal = false :
                name == 'website' ? this.website = false :
                  name == 'websitePerson' ? this.websitePerson = false :
                    name == 'webIsp' ? this.webIsp = false : '';
            this.hostUnitList = JSON.parse(JSON.stringify(this.updateHostUnitList));
            this.hostUnitList.maincompanyarea = this.province + '-' + this.city + '-' + this.district;
            this.hostUnitList.webip = this.webip.join(' ');
          } else {
            return;
          }
        })
      },
      webRecordFormatError() {
        this.$Message.info('网站核验单只能上传jpg,jpeg,png,doc,docx,pdf类型的文件');
      },
      //网站核验单上传成功
      webRecordSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percentCheckList++
            if (this.percentCheckList > 100) {
              this.updateHostUnitList.webrecordauthenticityurl = response.result;
              if (this.updateHostUnitList.webrecordauthenticityurl.indexOf(',') > 0) {
                let webRecord = this.updateHostUnitList.webrecordauthenticityurl.split(",");
                for (let j = 0; j < onther.length; j++) {
                  let objc = new Object();
                  webRecord[j].substring(webRecord[j].lastIndexOf('/') + 1);
                  objc.name = (webRecord[j].substring(webRecord[j].lastIndexOf('/') + 1));
                  this.webRecordData.push(objc);
                  switch (this.webRecordData[j].name.substring(this.webRecordData[j].name.length - 3)) {
                    case 'pdf' :
                      this.webRecordData[j].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.webRecordData[j].img = imgJpg;
                      break;
                    case 'doc' :
                      this.webRecordData[j].img = imgDoc;
                      break;
                  }
                }
              } else {
                let webRecord = this.updateHostUnitList.webrecordauthenticityurl;
                let objc = new Object();
                webRecord.substring(webRecord.lastIndexOf('/') + 1);
                objc.name = (webRecord.substring(webRecord.lastIndexOf('/') + 1));
                this.webRecordData.push(objc);
                for (let i = 0; i < this.webRecordData.length; i++) {
                  switch (this.webRecordData[i].name.substring(this.webRecordData[0].name.length - 3)) {
                    case 'pdf' :
                      this.webRecordData[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.webRecordData[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.webRecordData[i].img = imgDoc;
                      break;
                  }
                }
              }
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percentCheckList = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      webRecordBeforeUpload() {
        if (this.webRecordData.length > 0) {
          this.$Message.info('网站核验单最多只能上传一张');
          return false;
        }
      },
      //身份证正面上传格式错误
      cardFormatError() {
        this.$Message.info('身份证正面只能上传jpg,jpeg,png类型的文件');
      },
      //身份证正面上传成功
      cardSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percent++
            if (this.percent > 100) {
              this.hostUnitList.webresponsibilityurlpositive = response.result;
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percent = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      //身份证背面上传格式错误
      cardBackFormatError() {
        this.$Message.info('身份证背面只能上传jpg,jpeg,png类型的文件');
      },
      cardBackSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percentBack++
            if (this.percentBack > 100) {
              this.hostUnitList.webresponsibilityurlback = response.result;
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percentBack = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      //营业执照上传格式错误
      organizerFormatError() {
        this.$Message.info('营业执照只能上传jpg,jpeg,png类型的文件');
      },
      organizerSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percentCombine++
            if (this.percentCombine > 100) {
              this.hostUnitList.hostcompanyurl = response.result;
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percentCombine = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      //上传域名证书格式错误
      domainNameFormatError() {
        this.$Message.info('域名证书只能上传jpg,jpeg,png,doc,docx,pdf类型的文件');
      },
      domainNameSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percentCertification++
            if (this.percentCertification > 100) {
              this.updateHostUnitList.domaincertificateurl = response.result;
              if (this.updateHostUnitList.domaincertificateurl.indexOf(',') > 0) {
                let addy = this.updateHostUnitList.domaincertificateurl.split(",");
                for (let i = 0; i < addy.length; i++) {
                  let object = new Object();
                  addy[i].substring(addy[i].lastIndexOf('/') + 1);
                  object.name = (addy[i].substring(addy[i].lastIndexOf('/') + 1));
                  this.addy.push(object);
                  switch (this.addy[i].name.substring(this.addy[i].name.length - 3)) {
                    case 'pdf' :
                      this.addy[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.addy[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.addy[i].img = imgDoc;
                      break;
                  }
                }
              } else {
                let addy = this.updateHostUnitList.domaincertificateurl;
                let object = new Object();
                addy.substring(addy.lastIndexOf('/') + 1);
                object.name = (addy.substring(addy.lastIndexOf('/') + 1));
                this.addy.push(object);
                for (let i = 0; i < this.addy.length; i++) {
                  switch (this.addy[i].name.substring(this.addy[0].name.length - 3)) {
                    case 'pdf' :
                      this.addy[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.addy[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.addy[i].img = imgDoc;
                      break;
                  }
                }
              }
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percentCertification = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      domainNameBeforeUpload() {
        if (this.addy.length > 2) {
          this.$Message.info('只能上传三个域名证书信息');
          return false;
        }
      },
      //其他文件上传
      otherFileSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percentOtherFile++
            if (this.percentOtherFile > 100) {
              this.updateHostUnitList.otherdataurl = response.result;
              if (this.updateHostUnitList.otherdataurl.indexOf(',') > 0) {
                let addy = this.updateHostUnitList.otherdataurl.split(",");
                for (let i = 0; i < addy.length; i++) {
                  let object = new Object();
                  addy[i].substring(addy[i].lastIndexOf('/') + 1);
                  object.name = (addy[i].substring(addy[i].lastIndexOf('/') + 1));
                  this.otherData.push(object);
                  switch (this.otherData[i].name.substring(this.otherData[i].name.length - 3)) {
                    case 'pdf' :
                      this.otherData[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.otherData[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.otherData[i].img = imgDoc;
                      break;
                  }
                }
              } else {
                let addy = this.updateHostUnitList.otherdataurl;
                let object = new Object();
                addy.substring(addy.lastIndexOf('/') + 1);
                object.name = (addy.substring(addy.lastIndexOf('/') + 1));
                this.otherData.push(object);
                for (let i = 0; i < this.otherData.length; i++) {
                  switch (this.otherData[i].name.substring(this.otherData[0].name.length - 3)) {
                    case 'pdf' :
                      this.otherData[i].img = imgPdf;
                      break;
                    case 'jpg' :
                      this.otherData[i].img = imgJpg;
                      break;
                    case 'doc' :
                      this.otherData[i].img = imgDoc;
                      break;
                  }
                }
              }
              this.$Message.success('上传成功');
              window.clearInterval(s)
              this.percentOtherFile = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败');
        }
      },
      otherBeforeUpload() {
        if (this.otherData.length > 2) {
          this.$Message.info('只能上传三个其他文件信息');
          return false;
        }
      },
      otherFormatError() {
        this.$Message.info('其他资料只能上传jpg,jpeg,png,doc,docx,pdf类型的文件');
      },
      //改变变更备案
      changeCompile(val) {
        if (val == 'isChange') {
          this.isCompile = true;
        } else {
          this.isCompile = false;
        }
      }
    },
    mounted() {
      this.details();
      this.getPublicIP();
      // console.log( this.$refs.uploadHost);
      // this.uploadHost = this.$refs.uploadHost.fileList;
      // this.uploadDomain = this.$refs.uploadDomain.fileList;
    },
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .ivu-form-item {
    margin-bottom: 15px;
  }

  .updatePhoto {
    width: 490px;

    margin-top: 10px;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
    background-color: #ffffff;
    .updates {
      display: flex;
      background: #f7f7f7;
      padding: 15px 10px;
      font-family: MicrosoftYaHei;
      .item-content {
        padding: 50px 0px;
        margin-bottom: 20px;
        border: 1px solid #ffffff;
        background-color: #ffffff;
        color: #999;
        line-height: 138px;
        text-align: center;
      }
      .item-content-text {
        font-size: 14px;
        line-height: 20px;
        color: #999;
      }
      button {
        outline: none;
        cursor: pointer;
        border: none;
        background: rgba(255, 231, 119, 1);
        padding: 5px 15px;
        border-radius: 4px;
      }
      .sponsor-text {
        width: 186px;
        height: 140px;
        padding: 50px 0px;
        margin-bottom: 20px;
        border: 1px solid #ffffff;
        background-color: #ffffff;
        color: #999;
        line-height: 42px;
      }
      .hide-text {
        margin-bottom: 20px;
        border: 1px solid #ffffff;
        color: #999;
        line-height: 42px;
        text-align: center;
      }
    }
  }

  .background {
    background-color: #f5f5f5;
    width: 100%;
    // height: 100%;
    font-family: MicrosoftYaHei;
    input {
      border: none;
      background: rgba(225, 225, 225, 0.1);
      width: 195px;
      margin-right: 5px;
    }
    //图标箭头向下样式
    .click_icon.icons {
      width: 13px !important;
      height: 13px !important;
      border: 1px solid #2a99f2;
      border-radius: 50%;
      transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      transition: all 0.5s;
      cursor: pointer;
      margin-left: 10px;
      margin-top: 3px;
    }
    .click_icon.icons::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 3px;
      width: 7px !important;
      height: 6px !important;
      border: #2a99f2 solid 1px;
      border-top-style: none;
      border-right-style: none;
    }
    //图标向上样式
    .hide_icon.icons {
      transform: rotate(-225deg);
      -ms-transform: rotate(-225deg);
      -webkit-transform: rotate(-225deg);
    }
    .card {
      width: 1200px;
      margin: 0 auto;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .center {
        width: 1200px;
        background: #ffffff;
        min-height: 1529px;
        padding: 20px 20px;
        .center_title {
          border-bottom: 1px solid #d8d8d8;
          height: 64px;
          display: flex;
          .back_button {
            width: 58px;
            height: 30px;
            margin-right: 10px;
            border: 1px solid #2a99f2;
            border-radius: 2px;
            display: inline-block;
            cursor: pointer;
            > span {
              display: block;
              height: inherit;
              text-align: center;
              line-height: 30px;
              font-size: 14px;
              color: #2a99f2;
            }
          }
          .refresh_button {
            width: 58px;
            height: 30px;
            border: 1px solid #2a99f2;
            border-radius: 2px;
            background-color: #2a99f2;
            display: inline-block;
            cursor: pointer;
            > span {
              display: block;
              height: inherit;
              text-align: center;
              line-height: 30px;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
      }
      li {
        list-style: none;
      }
      .list_item {
        display: inline;
        line-height: 40px;
        margin-right: 24px;
        font-size: 14px;
      }
      .list_item:nth-child(1){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
      }

      .info_box {
        width: 1160px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        padding: 20px 20px;
        margin-top: 20px;
        > span {
          color: #333333;
        }
        .tables {
          border: 1px solid #e9e9e9;
          border-radius: 4px;
          display: flex;
          display: -webkit-flex;
        }
        .nav_list {
          width: 280px;
          .text_block {
            width: 100px;
            float: right;
          }
          .nav_item {
            padding: 10px 10px 5px 10px;
            height: 38px;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
          }
          p {
            width: 145px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .nav_item:nth-child(odd) {
            background-color: #f7f7f7;
          }
        }
        .tab_list {
          height: 39px;

          .tab_item {
            padding: 5px 10px 5px 10px;
            float: left;
            width: 279px;
            height: 39px;
            border-right: 1px solid #e9e9e9;
          }
          .tab_item:last-child {
            border: none;
          }
          .tab_item:nth-child(even) {
            color: #2a99f2;
            cursor: pointer;
          }
        }
      }

    }
  }

  .outImg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color .3s ease-in-out;
    z-index: 9999;
  }

  .bigImg {
    position: fixed;
    top: 50%;
    left: 50%;

    transition: transform .3s ease-in-out;
    width: 627px;
    height: 866px;
  }

  .is_activ {
    background-color: rgba(55, 55, 55, .6);
  }

  .cancel {
    p {
      line-height: 20px;
    }
    font-family: 'MicrosoftYaHei';
    p:nth-child(1) {
      color: #333333;
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: Bold;
    }
    p:nth-child(2) {
      color: #666666;
      font-size: 14px;
      margin-bottom: 10px;
    }
    ul li {
      margin-left: 25px;
      color: #333333;
      font-size: 14px;
      list-style: disc;
    }

  }
</style>

