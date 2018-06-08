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
              <ul>
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
                <Button type="primary" style="margin-right: 10px;" @click="isCompile = true">变更备案</Button>
                <Button @click="domain = true">注销主体</Button>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycertificatestype}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanynature}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanynumber}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycertificatesloaction}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.maincompanycommunicatlocation}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.investorname}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.legalcertificatestype}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.legalcertificatesnumber}}</p>
                </li>
                <li class="nav_item">
                  <p>+86 {{hostUnitList.officenumber}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.companyemail}}</p>
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
                <Button type="primary" @click="cancel = true">取消接入</Button>
                <Button @click="cancellation = true" style="margin-left: 10px">注销网站</Button>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webdomian}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.weburl}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webmessage}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webresponsibilitycertificatestype}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webresponsibilitycertificatesnumber}}</p>
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.phone}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.email}}</p>
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
              <div style="width:87%;text-align: right;" v-show="isCompile">
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
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webip}}</p>
                </li>
                <li class="nav_item">
                  <p>{{hostUnitList.webaccesstype}}</p>
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
        <div style="text-align:center;margin:20px 0 80px 0;" v-show="isCompile">
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
            <p class="hide-text" v-if="webRecordData.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-else v-for="(item,index) in webRecordData">
              <img style="width: 38px;height: 42px;" :src="item.img">
              <p style="line-height: 20px;">
                <span>{{item.name}}</span>
                <Icon v-if="hostUnitList.status =='初审拒绝'|| hostUnitList.status =='管局审核拒绝'" type="ios-trash-outline" @click.native="deletePhoto('aunthen',index)"></Icon>
              </p>
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
          <div style="width:50%;">
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
          <div style="width:50%;">
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
          <div style="width:50%;text-align: center;">
            <p class="hide-text" v-if="hostUnitList.hostcompanyurl==''">暂无图片</p>
            <img style="width:198px;height:144px;" :src="hostUnitList.hostcompanyurl" v-else>
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
          <div style="width:100%;min-height: 197px;">
            <p class="hide-text" v-if="addy.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-for="(item,index) in addy">
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
          <div style="width:100%;min-height: 197px;">
            <p class="item-content" v-if="otherData.length==0">暂无执照扫描件</p>
            <div style="text-align: center;margin-top:10px;" v-else v-for="(item,index) in otherData">
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
    <Modal
      v-model="host"
      title="主办单位信息"
      :scrollable="true"
    >
      <Form ref="updateHostUnitList" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
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
    </Modal>
    <!-- 修改主体单位负责人信息 -->
    <Modal
      v-model="legal"
      title="主体单位负责人信息"

      :scrollable="true"
    >
      <Form ref="updateHostUnitList" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
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
    </Modal>
    <!-- 修改网站基本信息信息 -->
    <Modal
      v-model="website"
      title="网站基本信息"

      :scrollable="true"
    >
      <Form ref="updateHostUnitList" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
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
    </Modal>
    <!-- 修改网站负责人基本信息 -->
    <Modal
      v-model="websitePerson"
      title="网站负责人基本信息"

      :scrollable="true"
    >
      <Form ref="updateHostUnitList" :model="updateHostUnitList" :rules="updateHostUnitListValidate" :label-width="0">
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

    </Modal>
    <!--取消接入-->
    <Modal v-model="cancel"  title="取消接入" :scrollable="true" @on-ok="delMainWeb('取消接入中')">
      <div class="cancel">
        <p>确定要取消此备案接入信息？</p>
        <p>取消接入后，如果您的备案信息没有对应接入商，管局可能会注销您的备案号，导致您的域名不能访问。申请提交到通信管理局后，不可撤回。</p>
        <ul>
          <li>  网站名称：{{hostUnitList.webname}}</li>
          <li>  网站首页：{{hostUnitList.weburl}}</li>
        </ul>
      </div>
    </Modal>
    <!--注销网站-->
    <Modal v-model="cancellation"  title="注销网站" :scrollable="true" @on-ok="delMainWeb('注销网站中')">
      <div class="cancel">
        <p>确定要注销网站？</p>
        <p>取消接入后，如果您的备案信息没有对应接入商，管局可能会注销您的备案号，导致您的域名不能访问。申请提交到通信管理局后，不可撤回。</p>
        <ul>
          <li>  网站名称：{{hostUnitList.webname}}</li>
          <li>  网站首页：{{hostUnitList.weburl}}</li>
        </ul>
      </div>
    </Modal>
    <!--注销主体-->
    <Modal ref="footer" v-model="domain"  title="注销主体" :scrollable="true" >
      <div class="cancel">
        <p>验证备案号码</p>
        <!--<div style="display: flex;">-->
          <Form ref="domainList"  :model="domainList" :rules="domainListValiot" label-position="top">
            <FormItem label="主体备案号">
              <Input  type="text" v-model="hostUnitList.recordserviceid" :readonly="true"></Input>
            </FormItem>
            <FormItem label="主体备案密码" prop="password">
              <Input type="text" v-model="domainList.password"  placeholder="小于20位数字或字母"></Input>
            </FormItem>
          </Form>
        <!--</div>-->

      </div>
      <div slot="footer" >
        <Button type="primary" @click="delMainWeb('注销主体中')">下一步，提交审核</Button>
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
        if (value == "") {
          return callback(new Error("请输入网站负责人证件号码"));
        } /*else if (
         !this.siteList[0].basicInformation.certificateTypeList[
         this.siteList[0].basicInformation.certificateType - 1
         ].reg.test(value)
         ) {
         return callback(
         new Error(
         "请输入正确的" +
         this.siteList[0].basicInformation.certificateTypeList[
         this.siteList[0].basicInformation.certificateType - 1
         ].label
         )
         );
         }*/ else {
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
            {required: true, message: "请输入单位证件号码", trigger: "blur"}
            // { validator: validUnitProperties, trigger: "blur" }
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
            {required: true, message: "请输入法人证件号码", trigger: "blur"}
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
        cancellation:false,
        //取消接入弹窗
        cancel: false,
        id: '',
        isCompile: false,
        //注销主体
        domainList:{
          //备案密码
          password:'',
        },
        domainListValiot:{
          password:[
              {required:true,message:'请输入主体备案密码',trigger:'blur'},
              {max:20,trigger:'blur'}
            ]
        },
        //注销主体弹窗
        domain:false
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
        var id = sessionStorage.getItem("id");
        this.$http
          .get("recode/listMainWeb.do", {
            params: {
              id: this.id,
            }
          })
          .then(res => {
            if (res.data.status == 1) {
              this.hostUnitList = res.data.result[0];
              this.updateHostUnitList = res.data.result[0];
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
              // console.log(this.hostUnitList);
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
              console.log("出错了");
            }
          });
      },
      //取消接入
      delMainWeb(status){
        this.domain = false;
        axios.post('recode/updateMainWeb.do',{
            id:this.id,
            status:status
        }).then(res =>{
          if(res.data.status ==1){
            this.details();
            this.$Message.success('提交成功');
          }else {
            this.$Message.error(res.data.message)
          }
        })
          this.$Modal.confirm({
            render: (h) => {
              return h('div', [
                h('p',{style:{color:'#333333',fontSize:'14px'}},'申请已提交'),
                h('p',{style:{color:'#666666',fontSize:'14px'}},'新睿云将在1个工作日内将您的申请提交至通信管理局。')
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
      allUpdate(){
        this.$http
          .get("recode/updateMainWeb.do", {
            params: {
              id: this.id,
              ISPName: this.updateHostUnitList.ispname,
              webIp: this.updateHostUnitList.webip,
              webAccessType: this.updateHostUnitList.webaccesstype,
              webServerAddress: this.updateHostUnitList.webserveraddress,
              webResponsibilitylinkName: this.updateHostUnitList
                .webresponsibilitylinkname,
              webResponsibilityCertificatesType: this.updateHostUnitList
                .webresponsibilitycertificatestype,
              webResponsibilityCertificatesNumber: this.updateHostUnitList
                .webresponsibilitycertificatesnumber,
              offaceNumber: this.updateHostUnitList.offacenumber,
              phone: this.updateHostUnitList.phone,
              email: this.updateHostUnitList.email,
              webName: this.updateHostUnitList.webname,
              webDomian: this.updateHostUnitList.webdomian,
              webUrl: this.updateHostUnitList.weburl,
              webServerContent: this.updateHostUnitList.webservercontent,
              webMessage: this.updateHostUnitList.webmessage,
              legalName: this.updateHostUnitList.legalname,
              companyPhone: this.updateHostUnitList.companyphone,
              companyEmail: this.updateHostUnitList.companyemail,
              officeNumber: this.updateHostUnitList.officenumber,
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
              InvestorName: this.updateHostUnitList.investorname
            }
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error(res.data.message);
            }
          });
      }
    },
    mounted() {
      this.details();
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
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

