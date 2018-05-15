<template>
  <div class="background">
    <div class="card">
      <span>首页 / 备案详情</span>
      <div class="center">
        <div class="center_title">
          <div style="width:1020px;">
            <div style="display:flex">
              <span style="font-size:16px;color:#2A99F2;">备案域名</span>
              <div class="click_icon icons" @click="toolShow(isIcon)" :class="{hide_icon:!isIcon}"></div>
            </div>
            <div style="width:100%;">
              <ul>
                <li class="list_item">备案ID:rtr-589jg294</li>
                <li class="list_item">备案类型:{{hostUnitList.recordtype}}</li>
                <li class="list_item">备案主体:{{hostUnitList.webname}}</li>
                <li class="list_item">当前状态:{{hostUnitList.status}}</li>
                <li class="list_item">最近更新时间:{{hostUnitList.lastupdatetime}}</li>
              </ul>
            </div>
          </div>
          <div style="width:120px;">
            <div class="back_button" @click="$router.go(-1)"><span>返回</span></div>
            <div class="refresh_button" @click="details"><span>刷新</span></div>
          </div>
        </div>
        <!--主办单位信息-->
        <div v-show="isIcon">
          <div class="info_box" >
            <div style="margin-bottom:10px;display:flex;display:-webkit-flex;width:100%;">
              <div class="click_icon icons" :class="{hide_icon:!isIconSon}" @click="infoBoxShow('information')"></div>
              <div style="margin-left:5px;">
                <span>主办单位信息</span>
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
                <li class="nav_item">{{hostUnitList.maincompanyarea}}<div v-if="isShow == 'maincompanyarea'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.maincompanycertificatestype}}<div v-if="isShow == 'maincompanycertificatestype'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.maincompanynature}}<div v-if="isShow == 'maincompanynature'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.maincompanynumber}}<div v-if="isShow == 'maincompanynumber'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">主体单位名称</li>
                <li class="nav_item">主体单位证件住所</li>
                <li class="nav_item">主体单位通信地址</li>
                <li class="nav_item">投资人或主管单位姓名</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.maincompanyname}}<div v-if="isShow == 'maincompanyname'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.maincompanycertificatesloaction}}<div v-if="isShow == 'maincompanycertificatesloaction'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.maincompanycommunicatlocation}}<div  v-if="isShow == 'maincompanycommunicatlocation'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.investorname}}<div v-if="isShow == 'investorname'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="host = true">重新输入</span></div></li>
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
            </div>
            <div class="tables" v-show="isIconPerson">
              <ul class="nav_list">
                <li class="nav_item">法人姓名</li>
                <li class="nav_item">法人证件类型</li>
                <li class="nav_item">法人证件号码</li>
                <li class="nav_item">办公室电话</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.legalname}} <div v-if="isShow == 'legalname'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.legalcertificatestype}} <div v-if="isShow == 'legalcertificatestype'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.legalcertificatesnumber}} <div v-if="isShow == 'legalcertificatesnumber'" class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
                <li class="nav_item">+86  {{hostUnitList.officenumber}}<div v-if="isShow == 'officenumber'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">手机号码</li>
                <li class="nav_item">电子邮箱地址</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.phone}}<div v-if="isShow == 'phone'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.email}}<div v-if="isShow == 'email'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="legal = true">重新输入</span></div></li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <!--网站基本信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconInfo}" @click="infoBoxShow('webInfo')"></div>
              <div style="margin-left:5px;">
                <span>网站基本信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconInfo">
              <ul class="nav_list">
                <li class="nav_item">网站名称</li>
                <li class="nav_item">网站域名</li>
                <li class="nav_item">网站首页URL</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.webname}} <div v-if="isShow == 'webname'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webdomian}} <div v-if="isShow == 'webdomian'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.weburl}} <div v-if="isShow == 'weburl'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">网站服务内容</li>
                <li class="nav_item">网站语言</li>
                <li class="nav_item"></li>
               
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.webservercontent}} <div v-if="isShow == 'webservercontent'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="website = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webmessage}} <div v-if="isShow == 'webmessage'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" website = true">重新输入</span></div></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <!--网站负责人基本信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconWebPerson}" @click="infoBoxShow('webPersonInfo')"></div>
              <div style="margin-left:5px;">
                <span>网站负责人基本信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconWebPerson">
              <ul class="nav_list">
                <li class="nav_item">姓名</li>
                <li class="nav_item">有效证件类型</li>
                <li class="nav_item">有效证件号码</li>
           
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.webresponsibilitylinkname}} <div v-if="isShow == 'webresponsibilitylinkname'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webresponsibilitycertificatestype}} <div v-if="isShow == 'webresponsibilitycertificatestype'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webresponsibilitycertificatesnumber}}<div v-if="isShow == 'webresponsibilitycertificatesnumber'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                
              </ul>
              <ul class="nav_list">
                <li class="nav_item">办公室电话号码</li>
                <li class="nav_item">移动电话号码</li>
                <li class="nav_item">电子邮箱地址</li>
                
              </ul>
              <ul class="nav_list">
                <li class="nav_item">+86  {{hostUnitList.offacenumber}}<div v-if="isShow == 'offacenumber'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.companyphone}}<div v-if="isShow == 'companyphone'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.companyemail}}<div v-if="isShow == 'companyemail'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click=" websitePerson = true">重新输入</span></div></li>
                
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
            </div>
            <div class="tables" v-show="isIconISP">
              <ul class="nav_list">
                <li class="nav_item">ISP名称</li>
                <li class="nav_item">网站IP地址</li>
                <li class="nav_item">网站接入方式</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.ispname}}<div v-if="isShow == 'ispname'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webip}}<div v-if="isShow == 'webip'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div></li>
                <li class="nav_item">{{hostUnitList.webaccesstype}}<div v-if="isShow =='webaccesstype'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">服务器放置地</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList.webserveraddress}}<div v-if="isShow =='webserveraddress'"  class="text_block"><span style="color:red">信息有误</span>  <span style="color:#2a99f2;cursor:pointer;" @click="webIsp = true">重新输入</span></div></li>
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
                  <li class="tab_item" @click="sponsorPhoto = true">点击查看</li>
                  <li class="tab_item">主办单位照片</li>
                  <li class="tab_item" @click="organizerPhoto = true">点击查看</li>
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
                  <li class="tab_item" @click="domainNameCertificate = true">点击查看</li>
                  <li class="tab_item">网站核验单</li>
                  <li class="tab_item" @click="checkList = true">点击查看</li>
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
                  <li class="tab_item" @click="otherInfo = true">点击查看</li>
                  <li class="tab_item"></li>
                  <li class="tab_item"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 网站核验单 -->
     <Modal
        v-model="checkList"
        title="重新上传网站备案信息真实性核验单信息"
        >
        <p style="margin-bottom:5px">1、点击下载<span style="color:#2A99F2;">《网站备案信息真实性核验单》</span></p>
        <p style="margin-bottom:5px">2、查看核验单样例图，填写以下载的核验单，不得涂改</p>
        <p>3、请您保存3份签字的核验单原件以备后续环节试用</p>
        <div class="updatePhoto">
          <div class="updates">
            <div style="width:50%;height:309px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :on-success="otherFile">
                    <div class="item-content-text" v-if="uploadForm.otherFile==''">
                      点击选择文件
                    </div>
                    <div class="item-content-text" v-else>
                      <p>{{uploadForm.otherFile}}</p>
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
            </div>
            <div style="width:50%;height:309px;">
              <div  style="text-align: center">
              <img style="height:222px;margin-bottom:25px" src="../../assets/img/records/records-img4.png"/>
              <p>示例图</p>
            </div>
            </div>
          </div>
        </div>
    </Modal>
    <!-- 主办单位负责人照片 -->
       <Modal
        v-model="sponsorPhoto"
        title="重新上传身份证信息"
        >
        <p>身份证人像面</p>
        <div class="updatePhoto" >
          <div class="updates">
            <div style="width:50%;height:203px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :on-success="otherFile"
                    >
                    <div class="sponsor-text" v-if="uploadForm.companyresponsibilityurlback==''">
                      暂无图片
                    </div>
                    <div style="height:203px;" v-else>
                       <div  style="text-align: center">
                         <img style="height:144px;" :src="hostUnitList.companyresponsibilityurlpositive">
                          <p style="">点击选择文件</p>
                       </div>
                    </div>   
                    <button>上传</button>
                  </Upload>
            </div>
            <div style="width:50%;height:203px;">
              <div  style="text-align: center">
              <img style="height:144px;margin-bottom:20px" src="../../assets/img/records/records-img1.png"/>
              <p>示例图</p>
            </div>
            </div>
          </div>
        </div>
          <p style="margin-top:10px;">身份证国徽面</p>
        <div class="updatePhoto" >
          <div class="updates">
            <div style="width:50%;height:203px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :on-success="otherFile">
                    <div class="sponsor-text" v-if="hostUnitList.companyresponsibilityurlback==''">
                      暂无图片
                    </div>
                    <div style="height:203px;" v-else>
                       <div  style="text-align: center">
                      <img style="height:144px;" :src="hostUnitList.companyresponsibilityurlback">
                      <p style="">点击选择文件</p>
                       </div>
                    </div>
                    <button>上传</button>
                  </Upload>
            </div>
            <div style="width:50%;height:203px;">
              <div  style="text-align: center">
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
        >
        <p>执照扫描件</p>
        <div class="updatePhoto" >
          <div class="updates">
            <div style="width:50%;height:203px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :on-success="otherFile">
                    <div class="sponsor-text" v-if="uploadForm.otherFile==''">
                      暂无图片
                    </div>
                    <div class="sponsor-text" v-else>
                      <p>{{uploadForm.otherFile}}</p>
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
            </div>
             <div style="width:50%;height:203px;">
              <div  style="text-align: center">
                <img style="height:144px;margin-bottom:20px" src="../../assets/img/records/records-img3.png"/>
                <p>示例图</p>
              </div>
            </div>
          </div>
        </div>
    </Modal>
    <!-- 域名证书 -->
       <Modal
        v-model="domainNameCertificate"
        title="重新上传域名证书信息"
        >
        <p>执照扫描件</p>
        <div class="updatePhoto" >
          <div class="updates">
            <div style="width:100%;height:309px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :on-success="otherFile">
                    <div class="item-content" v-if="uploadForm.otherFile==''">
                      点击选择文件
                    </div>
                    <div class="item-content" v-else>
                      <p>{{uploadForm.otherFile}}</p>
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
            </div>
          </div>
        </div>
    </Modal>
    <!-- 其他资料 -->
       <Modal
        v-model="otherInfo"
        title="重新上传其他文件信息"
        >
        <p>如前置审批材料，法人授权委托书等材料（点击下载<span style="color:#2A99F2;">法人委托书</span>）</p>
        <div class="updatePhoto">
          <div class="updates">
            <div style="width:100%;height:309px;">
                <Upload
                    multiple
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :on-success="otherFile">
                    <div class="item-content" v-if="uploadForm.otherFile==''">
                      点击选择文件
                    </div>
                    <div class="item-content" v-else>
                      <p>{{uploadForm.otherFile}}</p>
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
            </div>
          </div>
        </div>
    </Modal>
    <!-- 修改主办单位信息 -->
     <Modal
        v-model="host"
        title="主办单位信息"
        @on-ok="updateHostunit"
       >
       <Form  ref="updateHostUnitList" :model="updateHostUnitList"  :rules="updateHostUnitListValidate"  :label-width="0">
          <FormItem prop="province">
              <p style="margin:10px">主办单位所属区域</p>
               <Select v-model="province"  style="width:170px">
                <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            <Select v-model="city" style="width:140px">
                <Option v-for="item in cityList" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
            <Select v-model="district" style="width:100px">
                <Option v-for="item in districtList" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
           </FormItem>
          <FormItem prop="maincompanycertificatestype">
              <p style="margin:10px">主体单位证件类型</p>
               <Select v-model="updateHostUnitList.maincompanycertificatestype"  style="width:170px">
                <Option v-for="item in updateHostUnitList.maincompanycertificatestypeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
          </FormItem>
          <FormItem prop="maincompanynature">
              <p style="margin:10px">主体单位性质</p>
              <Input type="text" v-model="updateHostUnitList.maincompanynature"/> 
          </FormItem>
          <FormItem prop="maincompanynumber">
              <p style="margin:10px">主办单位证件号码</p>
              <Input type="text" v-model="updateHostUnitList.maincompanynumber"/>
          </FormItem>
          <FormItem prop="maincompanyname">
            <p style="margin:10px">主体单位名称</p>
            <Input type="text" v-model="updateHostUnitList.maincompanyname"/>
          </FormItem>
           <FormItem prop="maincompanycertificatesloaction">
            <p style="margin:10px">主体单位证件住所</p>
            <Input type="text" v-model="updateHostUnitList.maincompanycertificatesloaction"/>
          </FormItem>
           <FormItem prop="maincompanycommunicatlocation">
            <p style="margin:10px">主体单位通信地址</p>
            <Input type="text" v-model="updateHostUnitList.maincompanycommunicatlocation"/>
          </FormItem>
           <FormItem prop="investorname">
            <p style="margin:10px">投资人或主管姓名</p>
            <Input type="text" v-model="updateHostUnitList.investorname"/>
          </FormItem>
       </Form>
    </Modal>
    <!-- 修改主体单位负责人信息 -->
    <Modal
        v-model="legal"
        title="主体单位负责人信息"
        @on-ok="updateHostunitLegal"
       >
        <Form  ref="updateHostUnitList" :model="updateHostUnitList"  :rules="updateHostUnitListValidate"  :label-width="0">
          <FormItem  prop="legalname">
                <p style="margin:10px">法人姓名</p>
                 <Input type="text" v-model="updateHostUnitList.legalname"/>
           </FormItem>
          <FormItem prop="legalcertificatestype">
             <p style="margin:10px">法人证件类型</p>
              <Input type="text" v-model="updateHostUnitList.legalcertificatestype"/>
          </FormItem>
          <FormItem prop="legalcertificatesnumber">
              <p style="margin:10px">法人证件号码</p>
              <Input type="text" v-model="updateHostUnitList.legalcertificatesnumber"/>
          </FormItem>
          <FormItem prop="officenumber">
              <p style="margin:10px">办公室电话</p>
              <Input type="text" v-model="updateHostUnitList.officenumber"/>
          </FormItem>
          <FormItem prop="phone">
              <p style="margin:10px">手机号码</p>
              <Input type="text" v-model="updateHostUnitList.companyphone"/>
          </FormItem>
          <FormItem prop="email">
               <p style="margin:10px">电子邮箱地址</p>
              <Input type="text" v-model="updateHostUnitList.companyemail"/>
          </FormItem>
       </Form>
    </Modal>
        <!-- 修改网站基本信息信息 -->
    <Modal
        v-model="website"
        title="网站基本信息"
        @on-ok="updateWebSite"
       >
        <Form  ref="updateHostUnitList" :model="updateHostUnitList"  :rules="updateHostUnitListValidate"  :label-width="0">
          <FormItem  prop="webname">
                <p style="margin:10px">网站名称</p>
                 <Input type="text" v-model="updateHostUnitList.webname"/>
           </FormItem>
          <FormItem prop="webdomian">
             <p style="margin:10px">网站域名</p>
              <Input type="text" v-model="updateHostUnitList.webdomian"/>
          </FormItem>
          <FormItem prop="weburl">
              <p style="margin:10px">网站首页URL</p>
              <Input type="text" v-model="updateHostUnitList.weburl"/>
          </FormItem>
          <FormItem prop="webservercontent">
              <p style="margin:10px">网站服务内容</p>
             <Input type="text" v-model="updateHostUnitList.webservercontent"/>
          </FormItem>
          <FormItem prop="webmessage">
              <p style="margin:10px">网站语言</p>
               <Input type="text" v-model="updateHostUnitList.webmessage"/>
          </FormItem>
       </Form>
    </Modal>
      <!-- 修改网站负责人基本信息 -->
    <Modal
        v-model="websitePerson"
        title="网站负责人基本信息"
        @on-ok="updateWebsitePerson"
       >
        <Form  ref="updateHostUnitList" :model="updateHostUnitList"  :rules="updateHostUnitListValidate"  :label-width="0">
          <FormItem  prop="webname">
                <p style="margin:10px">姓名</p>
                 <Input type="text" v-model="updateHostUnitList.webresponsibilitylinkname"/>
           </FormItem>
          <FormItem prop="webresponsibilitycertificatestype">
             <p style="margin:10px">有效证件类型</p>
              <Input type="text" v-model="updateHostUnitList.webresponsibilitycertificatestype"/>
          </FormItem>
          <FormItem prop="webresponsibilitycertificatesnumber">
              <p style="margin:10px">有效证件号码</p>
              <Input type="text" v-model="updateHostUnitList.webresponsibilitycertificatesnumber"/>
          </FormItem>
          <FormItem prop="offacenumber">
              <p style="margin:10px">办公室电话号码</p>
              <Input type="text" v-model="updateHostUnitList.offacenumber"/>
          </FormItem>
          <FormItem prop="companyphone">
              <p style="margin:10px">移动电话号码</p>
             <Input type="text" v-model="updateHostUnitList.phone"/>
          </FormItem>
          <FormItem prop="companyemail">
              <p style="margin:10px">电子邮箱地址</p>
             <Input type="text" v-model="updateHostUnitList.email"/>
          </FormItem>
       </Form>
    </Modal>
     <!-- 修改ISP信息信息 -->
    <Modal
        v-model="webIsp"
        title="ISP备案网站接入信息"
        @on-ok="updateHostunit"
       >
        <Form  ref="updateHostUnitList" :model="updateHostUnitList"  :rules="updateHostUnitListValidate"  :label-width="0">
          <FormItem  prop="ispname">
                <p style="margin:10px">ISP名称</p>
                 <Input type="text" v-model="updateHostUnitList.ispname"/>
           </FormItem>
          <FormItem prop="webip">
             <p style="margin:10px">网站IP地址</p>
              <Input type="text" v-model="updateHostUnitList.webip"/>
          </FormItem>
          <FormItem prop="webaccesstype">
              <p style="margin:10px">网站接入方式</p>
              <Input type="text" v-model="updateHostUnitList.webaccesstype"/>
          </FormItem>
          <FormItem prop="webserveraddress">
              <p style="margin:10px">服务器放置地</p>
               <Input type="text" v-model="updateHostUnitList.webserveraddress"/>
          </FormItem>
       </Form>
    </Modal>
  </div>
</template>

<script>
  import area from "../../options/area.json";
  //备案ID
     const id = sessionStorage.getItem("id");
     const webcompany_Id = sessionStorage.getItem('webcompany_Id');
export default {
   beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem("zone");
      var recordsType = sessionStorage.getItem("recordsType");
      next(vm => {
        vm.setData(area, recordsType);
        window.scroll(0, 525);
      });
    },
  data() {
    return {
      //是否显示重新输入
      isShow:null,
      //主办单位弹窗
      host: false,
      //主体单位负责人弹窗 
      legal : false,
      //网站基本信息弹窗
      website:false,
      //网站负责人弹窗
      websitePerson:false,
      //ISP备案网站接入信息弹窗
      webIsp:false,
      //备案区域
        area:"",
        // 备案类型
        recordsType: "",
      //图标切换
      isIcon: true,
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
      maincompanycertificatestypeList:[],
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
      updateHostUnitListValidate:{}
    };
  },
  methods: {
     setData(area, recordsType) {
        this.area = area;
        switch (recordsType) {
          case '1':
            this.recordsType = '新增备案'
            this.recordsTypeDesc = '域名未备案，备案主体证件无备案号，需要备案。'
            break
          case '2':
            this.recordsType = '新增接入'
            this.recordsTypeDesc = '域名已在其他平台备案过，需要变更接入商。'
            break
          case '3':
            this.recordsType = '新增网站'
            this.recordsTypeDesc = '主体已经备案过，需要再给其他网站备案。'
            break
        }
      },
    //图标切换方法
    toolShow(isIcon) {
      this.isIcon = !isIcon;
    },
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
      this.$http
        .get("recode/listMainWeb.do", {
          params: {
            id: id,
            recordtype: "",
            status: ""
          }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.hostUnitList = res.data.result[0];
            this.updateHostUnitList = res.data.result[0];
              for(let item of this.hostUnitList.errorMessage){
                console.log(item);
                item == 'offaceNumber' ? this.isShow = 'offacenumber' : null;
                item == 'webResponsibilityCertificatesType' ? this.isShow = 'webresponsibilitycertificatestype' : null;
              }
            // Array.prototype.contains = function(element) {
            //   for (let i = 0; i < list.length; i++) {
            //     if (list[i] === element) {
            //       return true;
            //     }
            //   }
            //   return false;
            // };
            // var arr = new Array(['pffaceNumber']);
            // if (arr.contains("offaceNumber") == true) {
            //   console.log(this.hostUnitList[0].offacenumber);
            // }
          } else {
            console.log("出错了");
          }
        });
    },
    //修改主办单位信息表单
    updateHostunit() {
      this.$http
        .get("recode/addMainCompany.do", {
          params: {
            id:webcompany_Id,
            mainCompanyCertificatesType:this.updateHostUnitList.maincompanycertificatestype,
            mainCompanyNature:this.updateHostUnitList.maincompanynature,
            mainCompanyName :this.updateHostUnitList.maincompanyname,
            mainCompanyNumber:this.updateHostUnitList.maincompanynumber,
            mainCompanyCertificatesLoaction:this.updateHostUnitList.maincompanycertificatesloaction,
            mainCompanyCommunicatLocation:this.updateHostUnitList.maincompanycommunicatlocation,
            InvestorName:this.updateHostUnitList.investorname
          }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    //修改法人信息
    updateHostunitLegal(){
        this.$http.get('recode/addMainCompany.do',{
          params:{
            id:webcompany_Id,
            legalName:this.updateHostUnitList.legalname,
            companyPhone:this.updateHostUnitList.companyphone,
            companyEmail:this.updateHostUnitList.companyemail,
            officeNumber: this.updateHostUnitList.officenumber,
           legalCertificatesType:this.updateHostUnitList.legalcertificatestype,
           legalCertificatesNumber:this.updateHostUnitList.legalcertificatesnumber
          }
        }).then(res => {
          if(res.data.status == 1){
            this.$Message.success('修改成功');
          }else{
            this.$Message.error(res.data.message);
          }
        })
    },
    //修改网站基本信息
    updateWebSite(){
      this.$http.get('recode/updateMainWeb.do',{
          params:{
            id:id,
            webName:this.updateHostUnitList.webname,
            webDomian:this.updateHostUnitList.webdomian,
            webUrl:updateHostUnitList.weburl,
            webServerContent:this.updateHostUnitList.webservercontent,
            webMessage:this.updateHostUnitList.webmessage
          }
      }).then(res => {
        if(res.data.status == 1){
          this.$Message.success('修改成功');
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
    //修改网站负责人信息
    updateWebsitePerson(){
      this.$http.get('recode/updateMainWeb.do',{
        params:{
          id:id,
          webResponsibilitylinkName:this.updateHostUnitList.webresponsibilitylinkname,
          webResponsibilityCertificatesType:this.updateHostUnitList.webresponsibilitycertificatestype,
          webResponsibilityCertificatesNumber:this.updateHostUnitList.webresponsibilitycertificatesnumber,
          offaceNumber:this.updateHostUnitList.offacenumber,
          phone:this.updateHostUnitList.phone,
          email:this.updateHostUnitList.email
        }
      }).then(res => {
        if(res.data.status == 1){
          this.$Message.success('修改成功');
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
    //修改ISP备案网站接入信息
    updateWebIsp(){
      this.$http.get('recode/updateMainWeb.do',{
        params:{
          id:id,
          ISPName:this.updateHostUnitList.ispname,
          webIp:this.updateHostUnitList.webip,
          webAccessType:this.updateHostUnitList.webaccesstype,
          webServerAddress:this.updateHostUnitList.webserveraddress
        }
      }).then(res => {
        if(res.data.status == 1){
          this.$Message.success('修改成功');
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
    otherFile(res, file) {
      console.log(res);
      console.log(file);
      this.$http
        .post("recode/addMainCompany.do", {
          id: id,
          companyresponsibilityurlback: this.hostUnitList
            .companyresponsibilityurlback
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success("上传图片成功");
          } else {
            this.$Message.error(res.data.message);
          }
        });
    }
  },
  mounted() {
    this.details();
  }
};
</script>

<style lang="less" scoped>
.ivu-form-item{
  margin-bottom: 5px;
}
.updatePhoto {
  width: 490px;
  height: 351px;
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
      line-height: 156px;
    }
    .item-content-text {
      width: 186px;
      height: 222px;
      padding: 50px 0px;
      margin-bottom: 20px;
      border: 1px solid #ffffff;
      background-color: #ffffff;
      color: #999;
      line-height: 156px;
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
  }
}

.background {
  background-color: #f5f5f5;
  padding-right: 17px;
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
      height: 1529px;
      padding: 10px 20px;
      .center_title {
        border-bottom: 1px solid #d8d8d8;
        height: 64px;
        display: flex;
        .back_button {
          width: 58px;
          height: 30px;
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
      margin-right: 40px;
      font-size: 14px;
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
        .text_block{
          width: 100px;
          float: right;
        }
        .nav_item {
          padding: 5px 10px 5px 10px;
          height: 38px;
          border-right: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
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
</style>

