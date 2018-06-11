<template>
  <div>
    <!--   <records></records>-->
    <o-step :onStep="2" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <div class="main-info">
          <h2>主体信息</h2>
          <div class="main-ul">
            <ul>
              <li v-if="!(mainUnitInformation.maincompanyarea)">主体单位所属区域：{{mainUnitInformation.province}}/{{ mainUnitInformation.city }}/{{ mainUnitInformation.district }}</li>
              <li v-else>主体单位所属区域：{{ mainUnitInformation.maincompanyarea}}</li>
              <li>主体单位证件类型：{{ mainUnitInformation.certificateType}}</li>
              <li>主体单位性质：{{ mainUnitInformation.unitProperties}}
              </li>
              <li>主体单位证件号码：{{ mainUnitInformation.certificateNumber}}</li>
              <li>主体单位名称：{{ mainUnitInformation.unitName }}</li>
            </ul>
            <ul>
              <li>主体单位证件住所：{{mainUnitInformation.certificatesResidence }}</li>
              <li>主体单位通信地址：{{mainUnitInformation.mailingAddress }}</li>
              <li>投资人或主管单位姓名：{{ mainUnitInformation.investorName }}</li>
              <li>法人姓名：{{ mainUnitInformation.legalPersonName}}</li>
              <li>法人证件类型：{{ mainUnitInformation.legalPersonCertificateType}}
              </li>
            </ul>
            <ul>
              <li>法人证件号码：{{ mainUnitInformation.legalPersonIDNumber}}</li>
              <li>办公室电话：{{ mainUnitInformation.officePhone }}</li>
              <li>手机号码：{{ mainUnitInformation.phoneNumber}}</li>
              <li>电子邮箱地址：{{ mainUnitInformation.emailAddress}}</li>
            </ul>
          </div>
        </div>
        <div class="main-info" v-for="(item,index) in siteListStr">
          <h2>网站信息 {{ index + 1}} </h2>
          <transition name="list">
            <div class="main-ul" v-if="siteInfoShow">
              <ul>
                <li>网站名称：{{ item.basicInformation.siteName}}</li>
                <li>网站域名：{{ item.basicInformation.websiteDomain}},{{ item.basicInformation.newWebsiteDomain + '' }}</li>
                <li>网站首页URL：{{ item.basicInformation.websiteHomepage}}</li>
                <li>网站服务内容：{{ item.basicInformation.serviceContent}}</li>
                <li>网站语言：{{ item.basicInformation.contentsLanguage + ''}}</li>
              </ul>
              <ul>
                <li>网站负责人姓名：{{ item.basicInformation.principalName}}</li>
                <li>有效证件类型：{{ item.basicInformation.certificateType}}
                </li>
                <li>有效证件号码：{{ item.basicInformation.certificateNumber}}</li>
                <li>手机号码：{{ item.basicInformation.phoneNumber}}</li>
                <li>电子邮箱地址：{{ item.basicInformation.emailAddress}}</li>
              </ul>
              <ul>
                <li>ISP名称：{{ item.basicInformation.ISPName}}</li>
                <li>网站IP地址：{{ item.basicInformation.IPAddress + ''}}</li>
                <li>网站接入方式：{{ item.basicInformation.accessWay}}</li>
                <li>服务器放置地：{{ item.basicInformation.serverPutArea}}</li>
              </ul>
            </div>
          </transition>
        </div>
        <h2>请上传网站负责人相关资料</h2>
        <p class="titleDescription">温馨提示：如网站负责人和主体负责人不是同一人，请在其他资料中上传法人授权委托书</p>
        <div class="upload" v-for="(item,index) in uploadForm.IDPhotoList">
          <div class="uploadTitle">
            <p>证件人像面 ( 证件号：{{ item.IDNumber.substring(0,3) + '*****' + item.IDNumber.substring(item.IDNumber.length-4,item.IDNumber.length) }})</p>
            <div class="item">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatJpg"
                    :max-size="2048"
                    :on-success="IDCardFront"
                    :before-upload="markIDCard(index)">
                    <div class="item-content-text" v-if="item.IDCardFront==''">
                      暂无图片
                    </div>
                    <img v-else :src="item.IDCardFront" style="height: 120px;width:164px;margin-bottom: 20px">
                    <button>上传</button>
                  </Upload>
                </div>
                <div class="item-img">
                  <img src="../../../assets/img/records/records-img1.png">
                  <p>示例图</p>
                </div>
              </div>
            </div>
          </div>
          <div class="uploadTitle">
            <p style="margin-left: 20px">证件国徽面 ( 证件号：{{ item.IDNumber.substring(0,3) + '*****' + item.IDNumber.substring(item.IDNumber.length-4,item.IDNumber.length) }})</p>
            <div class="item" style="margin-left: 20px">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatJpg"
                    :max-size="2048"
                    :on-success="IDCardBack"
                    :before-upload="markIDCard(index)">
                    <div class="item-content-text" v-if="item.IDCardBack==''">
                      暂无图片
                    </div>
                    <img v-else :src="item.IDCardBack" style="height: 120px;width:164px;margin-bottom: 20px">
                    <button>上传</button>
                  </Upload>
                </div>
                <div class="item-img">
                  <img src="../../../assets/img/records/records-img2.png">
                  <p>示例图</p>
                </div>
              </div>
            </div>
            <!--<p style="color: #377dff;cursor: pointer;margin-top: 10px;text-align: right" v-if="index>0" @click="deleteIDPhoto(index)">删除新负责人证件照</p>-->
          </div>
        </div>
        <!--  <p @click="addIDPhoto" style="cursor: pointer;color: #377dff; font-size: 14px;" v-if="uploadForm.IDPhotoList.length<principalNumber">添加新负责人证件照</p>-->
        <h2>请上传主体单位相关资料</h2>
        <div class="upload">
          <div class="uploadTitle">
            <p>执照扫描件</p>
            <div class="item">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatJpg"
                    action="file/upFile.do"
                    :on-success="combine">
                    <div class="item-content-text" v-if="uploadForm.combine==''">
                      暂无图片
                    </div>
                    <img v-else :src="uploadForm.combine" style="height: 120px;width:164px;margin-bottom: 20px">
                    <button>上传</button>
                  </Upload>
                </div>
                <div class="item-img">
                  <img class="enter" src="../../../assets/img/records/records-img3.png">
                  <p>示例图</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传域名证书</h2>
        <div v-for="(item,upIndex) in uploadForm.certifiedDomainNoCertificationDefault">
          <div class="upload">
            <div class="uploadTitle">
              <p>执照扫描件 (网站{{ upIndex + 1 }})</p>
              <div class="item">
                <div class="item-content" style="height: 100%">
                  <div style="width:100%;background: #FFF;padding-top: 12px">
                    <p v-for="(file,index) in item.certifiedDomainNoCertificationDefaultList" style="margin-bottom: 5px;text-align: center;font-size: 14px;line-height: 1.5;">
                      <img v-if="(file.suffix == 'jpg')||(file.suffix == 'png')"
                           :class="{one:item.certifiedDomainNoCertificationDefaultList.length==1,two:item.certifiedDomainNoCertificationDefaultList.length==2,three:item.certifiedDomainNoCertificationDefaultList.length==3}"
                           src="../../../assets/img/records/records-img.png"/>
                      <img v-if="file.suffix == 'doc'||file.suffix == 'ocx'"
                           :class="{one:item.certifiedDomainNoCertificationDefaultList.length==1,two:item.certifiedDomainNoCertificationDefaultList.length==2,three:item.certifiedDomainNoCertificationDefaultList.length==3}"
                           src="../../../assets/img/records/records-doc.png"/>
                      <img v-if="file.suffix == 'pdf'"
                           :class="{one:item.certifiedDomainNoCertificationDefaultList.length==1,two:item.certifiedDomainNoCertificationDefaultList.length==2,three:item.certifiedDomainNoCertificationDefaultList.length==3}"
                           src="../../../assets/img/records/records-pdf.png"/>
                      {{ file.name }}
                      <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="removeSSL(upIndex,index)"></Icon>
                    </p>
                    <Upload v-if="item.certifiedDomainNoCertificationDefaultList.length<3"
                            class="my-upload"
                            type="drag"
                            :format="['jpg','jpeg','png','doc','pdf','docx']"
                            :on-format-error="handleFormatError"
                            :show-upload-list="false"
                            :with-credentials="true"
                            action="file/upFile.do"
                            :before-upload="markCertifiedDomainNoCertification(upIndex)"
                            :on-success="certifiedDomainNoCertification">
                      <span style="font-size: 14px">点击选择文件</span>
                    </Upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传其他资料</h2>
        <p class="titleDescription">如前置审批材料，法人授权委托书等材料（点击<a :href="mandateAddress">下载法人授权委托书</a>）</p>
        <div v-for="(item, upIndex) in  uploadForm.otherFileGroup">
          <div class="upload">
            <div class="uploadTitle">
              <p>其他文件 (网站{{ upIndex + 1 }})</p>
              <div class="item">
                <div class="item-content" style="height: 100%">
                  <div style="width:100%;background: #FFF;padding-top: 12px">
                    <p v-for="(file,index) in item.otherFile" style="text-align: center;font-size: 14px;margin-bottom:5px;line-height: 1.5;">
                      <img v-if="(file.suffix == 'jpg')||(file.suffix == 'png')"
                           :class="{one:item.otherFile.length==1,two:item.otherFile.length==2,three:item.otherFile.length==3}"
                           src="../../../assets/img/records/records-img.png"/>
                      <img v-if="file.suffix == 'doc'||file.suffix == 'ocx'"
                           :class="{one:item.otherFile.length==1,two:item.otherFile.length==2,three:item.otherFile.length==3}"
                           src="../../../assets/img/records/records-doc.png"/>
                      <img v-if="file.suffix == 'pdf'"
                           :class="{one:item.otherFile.length==1,two:item.otherFile.length==2,three:item.otherFile.length==3}"
                           src="../../../assets/img/records/records-pdf.png"/>
                      {{ file.name }}
                      <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="removeOtherFile(upIndex,index)"></Icon>
                    </p>
                    <Upload v-if="item.otherFile.length<3"
                            class="my-upload"
                            type="drag"
                            :format="['jpg','jpeg','png','doc','pdf','docx']"
                            :on-format-error="handleFormatError"
                            :show-upload-list="false"
                            :with-credentials="true"
                            action="file/upFile.do"
                            :before-upload="markOtherFile(upIndex)"
                            :on-success="otherFile">
                      <span style="font-size: 14px">点击选择文件</span>
                    </Upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传网站备案信息真实性核验单</h2>
        <p class="titleDescription">1、点击<a :href="checkListAddress">下载《网站备案信息真实性核验单》</a>。2、点击查看核验单样例图，填写以下载的核验单，不得涂改。3、请您保存3份签字的核验单原件以备后续环节使用。</p>
        <div class="upload" v-for="(item,upIndex) in uploadForm.checkGroup">
          <div class="uploadTitle">
            <p>其他文件 (网站{{ upIndex + 1 }})</p>
            <div class="item">
              <div class="item-content" style="height: 100%">
                <div style="width:100%;background: #FFF;padding-top: 12px">
                  <p v-for="(file,index) in item.checkList" style="margin-bottom: 5px;text-align: center;font-size: 14px;line-height: 1.5;">
                    <img v-if="(file.suffix == 'jpg')||(file.suffix == 'png')"
                         :class="{one:item.checkList.length==1,two:item.checkList.length==2}"
                         src="../../../assets/img/records/records-img.png"/>
                    <img v-if="file.suffix == 'doc'||file.suffix == 'ocx'"
                         :class="{one:item.checkList.length==1,two:item.checkList.length==2}"
                         src="../../../assets/img/records/records-doc.png"/>
                    <img v-if="file.suffix == 'pdf'"
                         :class="{one:item.checkList.length==1,two:item.checkList.length==2}"
                         src="../../../assets/img/records/records-pdf.png"/>
                    {{ file.name }}
                    <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="removeCheckList(upIndex,index)"></Icon>
                  </p>
                  <Upload v-if="item.checkList.length<1"
                          class="my-upload"
                          type="drag"
                          :show-upload-list="false"
                          :format="['jpg','jpeg','png','doc','pdf','docx']"
                          :on-format-error="handleFormatError"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :before-upload="markCheckList(upIndex)"
                          :on-success="checkList">
                    <span style="font-size: 14px">点击选择文件</span>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
          <div class="uploadTitle" style="margin: 34px 0 10px 20px;">
            <div class="item" style="text-align: center;position: relative">
              <img @click="imageViewShow = true" :src="checkSrc"/>
            </div>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <button @click="$router.go(-1)">上一步，填写网站信息</button>
        <button style="margin-left: 20px" @click="netStep()">下一步，办理拍照/上传资料</button>
      </div>
    </div>
    <div class="ImageView is-active" style="padding-bottom: 10px;" v-show="imageViewShow" @click="imageViewShow=false">
      <div class="ImageView-inner" style="overflow: auto;">
        <img :src="checkSrc" class="ImageView-img" alt="preview"
             style="width: 520px; transform: translate3d(140%, 15%, 0) scale3d(1.00003, 1.00003, 1); opacity: 1;">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'
  import oStep from "./ostep.vue";
  import axios from 'axios'
  import records from './../Records'

  export default {
    components: {
      step, records, oStep
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem('zone')
      var zoneId = sessionStorage.getItem('zoneId')
      var recordsType = sessionStorage.getItem('recordsType')
      var mainUnitInformationStr = sessionStorage.getItem('mainUnitInformationStr')
      var siteListStr = sessionStorage.getItem('siteListStr')
      next(vm => {
        vm.setData(area, zoneId, recordsType, mainUnitInformationStr, siteListStr)
        window.scroll(0, 700)
      })
    },
    data() {
      return {
        // 用与标记正在操作的身份证件照
        IDCardIndex: '',
        // 标记正在操作的域名证书
        certifiedDomainNoCertificationIndex: '',
        // 标记正在操作的其他资料
        otherFileIndex: '',
        // 标记正在操作的核验单
        checkListIndex: '',
        siteInfoShow: false,
        //接受第一页主体信息
        mainUnitInformation: {},
        // 接收前一页网站信息
        siteListStr: [],
        // 网站负责人数量
        principalNumber: 0,
        // 备案区域
        area: '',
        zoneId: '',
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 上传资料标记表单
        uploadForm: {
          IDPhotoList: [],
          // 相关资料
          combine: '',
          // 域名证书
          certifiedDomainNoCertificationDefault: [],
          // 其他资料
          otherFileGroup: [],
          // 核验单
          checkGroup: [],
          mandateAddress: '',
          checkListAddress: ''
        },
        imageViewShow: false,
        checkSrc: ''
      }
    },
    created() {
      this.getMandate()
      this.getCheckList()
      this.getCheckSrc()
    },
    methods: {
      markIDCard(index) {
        return () => {
          this.IDCardIndex = index
        }
      },
      markCertifiedDomainNoCertification(index) {
        return () => {
          this.certifiedDomainNoCertificationIndex = index
        }
      },
      markOtherFile(index) {
        return () => {
          this.otherFileIndex = index
        }
      },
      markCheckList(index) {
        return () => {
          this.checkListIndex = index
        }
      },
      setData(area, zoneId, recordsType, mainUnitInformationStr, siteListStr) {
        this.area = area
        this.zoneId = zoneId
        this.mainUnitInformation = JSON.parse(mainUnitInformationStr)
        this.siteListStr = JSON.parse(siteListStr)
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
        // 获取网站负责人数量
        let principals = []
        this.siteListStr.forEach(item => {
          principals.push(item.basicInformation.certificateNumber)
        })
        // es6 数组去重
        //let arr = Array.from(new Set(principals))
        let arr = [...new Set(principals)]
        this.principalNumber = arr.length
        // 初始化身份证上传框 （根据负责人判断）
        for (let i = 0; i < this.principalNumber; i++) {
          let IDCard = {
            // 身份证正面
            IDCardFront: '',
            // 身份证反面
            IDCardBack: '',
            IDNumber: arr[i]
          }
          this.uploadForm.IDPhotoList.push(IDCard)
        }
        // 初始化其他资料上传框 （根据网站数量判断）
        for (let i = 0, len = this.siteListStr.length; i < len; i++) {
          // 初始化域名证书上传框
          let certifiedDomainNoCertificationDefault = {
            certifiedDomainNoCertificationDefaultList: []
          }
          this.uploadForm.certifiedDomainNoCertificationDefault.push(certifiedDomainNoCertificationDefault)
          // 初始化其他资料上传框
          let otherFile = {
            otherFile: []
          }
          this.uploadForm.otherFileGroup.push(otherFile)
          // 初始化核验单上传框
          let checkList = {
            checkList: []
          }
          this.uploadForm.checkGroup.push(checkList)
        }
      },
      // 移除上传的域名证书
      removeSSL(index1, index2) {
        this.uploadForm.certifiedDomainNoCertificationDefault[index1].certifiedDomainNoCertificationDefaultList.splice(index2, 1)
      },
      // 移除上传的其他资料
      removeOtherFile(index1, index2) {
        this.uploadForm.otherFileGroup[index1].otherFile.splice(index2, 1)
      },
      // 移除上传的核验单
      removeCheckList(index1, index2) {
        this.uploadForm.checkGroup[index1].checkList.splice(index2, 1)
      },
      /* 图片上传成功回调，设置图片。每张图片上传都有一个method。
 暂时没有找到更好的方法解决图片标记问题 */
      IDCardFront(response) {
        if (response.status == 1) {
          this.uploadForm.IDPhotoList[this.IDCardIndex].IDCardFront = response.result
        }
      },
      IDCardBack(response) {
        if (response.status == 1) {
          this.uploadForm.IDPhotoList[this.IDCardIndex].IDCardBack = response.result
        }
      },
      combine(response) {
        if (response.status == 1) {
          this.uploadForm.combine = response.result
        }
      },
      certifiedDomainNoCertification(response) {
        if (response.status == 1) {
          let array = response.result.split('/')
          let index = array.length - 1
          let len = array[index].length
          let suffix = array[index].substring(len - 3)
          let param = {
            name: array[index],
            url: response.result,
            suffix: suffix
          }
          this.uploadForm.certifiedDomainNoCertificationDefault[this.certifiedDomainNoCertificationIndex].certifiedDomainNoCertificationDefaultList.push(param)
        }
      },
      otherFile(response) {
        if (response.status == 1) {
          let array = response.result.split('/')
          let index = array.length - 1
          let len = array[index].length
          let suffix = array[index].substring(len - 3)
          let param = {
            name: array[index],
            url: response.result,
            suffix: suffix
          }
          this.uploadForm.otherFileGroup[this.otherFileIndex].otherFile.push(param)
        }
      },
      checkList(response) {
        if (response.status == 1) {
          let array = response.result.split('/')
          let index = array.length - 1
          let len = array[index].length
          let suffix = array[index].substring(len - 3)
          let param = {
            name: array[index],
            url: response.result,
            suffix: suffix
          }
          this.uploadForm.checkGroup[this.checkListIndex].checkList.push(param)
        }
      },
      // 校验用户上传的文件类型
      handleFormatError() {
        this.$Message.info({
          content: '请选择jpg、png、jpeg、doc、docx、pdf类型的文件进行上传'
        });
      },
      handleFormatJpg() {
        this.$Message.info({
          content: '请选择jpg、png、jpeg类型的文件进行上传'
        });
      },
      // 提交资料
      netStep() {
        let flag = this.uploadForm.IDPhotoList.some(item => {
          return item.IDCardFront === ''
        })
        if (flag) {
          this.$Message.info({
            content: '请上传相关身份证正面照'
          })
          return
        }
        let flag1 = this.uploadForm.IDPhotoList.some(item => {
          return item.IDCardBack === ''
        })
        if (flag1) {
          this.$Message.info({
            content: '请上传相关身份证反面照'
          })
          return
        }
        if (this.uploadForm.combine === '') {
          this.$Message.info({
            content: '请上传公司资质照'
          })
          return
        }
        let flag2 = this.uploadForm.certifiedDomainNoCertificationDefault.some(item => {
          return item.certifiedDomainNoCertificationDefaultList.length === 0
        })
        if (flag2) {
          this.$Message.info({
            content: '请上传相关域名证书'
          })
          return
        }
        let flag3 = this.uploadForm.otherFileGroup.some(item => {
          return item.otherFile.length === 0
        })
        if (flag3) {
          this.$Message.info({
            content: '请上传其他资料（委托书等）'
          })
          return
        }
        let flag4 = this.uploadForm.checkGroup.some(item => {
          return item.checkList.length === 0
        })
        if (flag4) {
          this.$Message.info({
            content: '请上传相关网站核验单'
          })
          return
        }
        let mainCompanyArea = this.mainUnitInformation.maincompanyarea ? this.mainUnitInformation.maincompanyarea : (this.mainUnitInformation.province + '-' + this.mainUnitInformation.city + '-' + this.mainUnitInformation.district)
        let list_web_message = this.siteListStr.map(item => {
          let param = {
            webResponsibilityLinkName: item.basicInformation.principalName,
            webResponsibilityCertificatesType: item.basicInformation.certificateType,
            webResponsibilityCertificatesNumber: item.basicInformation.certificateNumber,
            offaceNumber: item.basicInformation.officePhone,
            phone: item.basicInformation.phoneNumber,
            email: item.basicInformation.emailAddress,
            ISPName: item.basicInformation.ISPName,
            webIp: item.basicInformation.IPAddress + '',
            webAccessType: item.basicInformation.accessWay,
            webServerAddress: item.basicInformation.serverPutArea,
            zoneId: this.zoneId,
            recordType: this.recordsType,
            webDomian: item.basicInformation.websiteDomain + ',' + item.basicInformation.newWebsiteDomain,
            webMessage: item.basicInformation.contentsLanguage + '',
            webName: item.basicInformation.siteName,
            webServerContent: item.basicInformation.serviceContent,
            webUrl: item.basicInformation.websiteHomepage,
          }
          return param
        })
        let list_web_picture_message = this.siteListStr.map((item, index) => {
          let idNumber = ''
          let webResponsibilityUrlPositive = ''
          let webResponsibilityUrlBack = ''
          for (let i = 0, len = this.uploadForm.IDPhotoList.length; i < len; i++) {
            if (this.uploadForm.IDPhotoList[i].IDNumber == item.basicInformation.certificateNumber) {
              idNumber = this.uploadForm.IDPhotoList[i].IDNumber
              webResponsibilityUrlPositive = this.uploadForm.IDPhotoList[i].IDCardFront
              webResponsibilityUrlBack = this.uploadForm.IDPhotoList[i].IDCardBack
              break
            }
          }
          let domainCertificateUrl = this.uploadForm.certifiedDomainNoCertificationDefault[index].certifiedDomainNoCertificationDefaultList.map(val => {
            return val.url
          })
          let otherDataUrl = this.uploadForm.otherFileGroup[index].otherFile.map(val => {
            return val.url
          })
          let webRecordAuthenticityUrl = this.uploadForm.checkGroup[index].checkList.map(val => {
            return val.url
          })
          let params = {
            idNumber: idNumber,
            webResponsibilityUrlPositive: webResponsibilityUrlPositive,
            webResponsibilityUrlBack: webResponsibilityUrlBack,
            domainCertificateUrl: domainCertificateUrl + '',
            otherDataUrl: otherDataUrl + '',
            webRecordAuthenticityUrl: webRecordAuthenticityUrl + ''
          }
          return params
        })
        //  添加网站信息参数
        let siteParams = {
          list_web_message: JSON.stringify(list_web_message),
          list_web_picture_message: JSON.stringify(list_web_picture_message)
        }
        //  主体信息参数
        let mainParams = {
          mainCompanyArea: mainCompanyArea,
          mainCompanyCertificatesType: this.mainUnitInformation.certificateType,
          mainCompanyNature: this.mainUnitInformation.unitProperties,
          mainCompanyNumber: this.mainUnitInformation.certificateNumber,
          mainCompanyName: this.mainUnitInformation.unitName,
          mainCompanyCertificatesLoaction: this.mainUnitInformation.certificatesResidence,
          mainCompanyCommunicatLocation: this.mainUnitInformation.mailingAddress,
          InvestorName: this.mainUnitInformation.investorName,
          legalName: this.mainUnitInformation.legalPersonName,
          legalCertificatesType: this.mainUnitInformation.legalPersonCertificateType,
          legalCertificatesNumber: this.mainUnitInformation.legalPersonIDNumber,
          officeNumber: this.mainUnitInformation.officePhone,
          phone: this.mainUnitInformation.phoneNumber,
          email: this.mainUnitInformation.emailAddress,
          zoneId: this.zoneId,
          hostCompanyUrl: this.uploadForm.combine
        }
        sessionStorage.setItem('mainParamsStr', JSON.stringify(mainParams))
        sessionStorage.setItem('siteParamsStr', JSON.stringify(siteParams))
        this.$router.push('NewRecordStepFour')
      },
      getMandate() {
        let province = JSON.parse(sessionStorage.getItem('mainUnitInformationStr')).province
        switch (province) {
          case '湖北省':
            this.mandateAddress = 'keepOnRecord/attorney_hubei.doc'
            break
          case '湖南省':
            this.mandateAddress = 'keepOnRecord/attorney_hunan.doc'
            break
          case '上海市':
            this.mandateAddress = 'keepOnRecord/attorney_shanghai.doc'
            break
          default:
            this.mandateAddress = 'keepOnRecord/attorney.doc'
            break
        }
      },
      getCheckList() {
        let province = JSON.parse(sessionStorage.getItem('mainUnitInformationStr')).province
        let mainUnit = JSON.parse(sessionStorage.getItem('mainUnitInformationStr')).unitProperties
        if (province == '浙江省') {
          this.checkListAddress = 'keepOnRecord/hyd_for_zj.doc'
        } else if (mainUnit == '企业' && province == '广东省') {
          this.checkListAddress = 'keepOnRecord/hyd_for_gd_person.doc'
        } else if (mainUnit == '个人' && province == '广东省') {
          this.checkListAddress = 'keepOnRecord/hyd_for_gd_business.doc'
        } else {
          this.checkListAddress = 'keepOnRecord/check.doc'
        }
      },
      getCheckSrc() {
        let province = JSON.parse(sessionStorage.getItem('mainUnitInformationStr')).province
        if (province == '广东省') {
          this.checkSrc = require('../../../assets/img/records/records-check1.jpg')
        } else {
          this.checkSrc = require('../../../assets/img/records/records-check2.jpg')
        }
      }
    },
    mounted() {
      this.siteInfoShow = true
    },
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  // 定义center公用样式
  .center() {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  // 定义h2公用样式
  .h2() {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
    margin-top: 60px;
  }

  // 定义h3公用样式
  .h3() {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
  }

  .body-bottom {
    .content {
      padding: 0 0 36px;
      border-bottom: 2px solid #D9D9D9;
      .center();
      h2 {
        .h2();
        &:before {
          content: '';
          width: 8px;
          height: 28px;
          background: rgba(55, 125, 255, 1);
          display: inline-block;
          margin-right: 10px;
          transform: translate(0, 6px);
        }
      }
      h3 {
        .h3();
        margin-bottom: 20px;
        margin-top: 60px;
      }
      .upload {
        display: flex;
        .uploadTitle {
          margin: 20px 0 10px;
          > p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
          }
          .item {
            width: 450px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #d8d8d8;
            margin-top: 20px;
            height: 230px;
            > img {
              height: 203px;
              cursor: zoom-in;
            }
            .item-content {
              display: flex;
              padding: 20px;
              background-color: #f7f7f7;
              .item-content-text {
                height: 125px;
                padding: 50px 0px;
                margin-bottom: 20px;
                border: 1px solid #ffffff;
                background-color: #ffffff;
                color: #999;
              }
              img {
                display: block;
                margin: 0 auto;
                &.one {
                  height: 48px;
                  width: 36px;
                }
                &.two {
                  height: 36px;
                  width: 28px;
                }
                &.three {
                  height: 24px;
                  width: 20px;
                }
              }
              button {
                outline: none;
                cursor: pointer;
                border: none;
                background: rgba(255, 231, 119, 1);
                padding: 5px 15px;
              }
            }
            .item-img {
              width: 130px;
              margin-left: 20px;
              > img {
                margin-bottom: 20px;
                width: 164px;
                height: 120px;
              }
              .enter {
                cursor: zoom-in;
                transition: all 0.6s;
                &:hover {
                  transform: scale(1.5);
                }
              }
              > p {
                text-align: center;
              }
            }
          }
        }
      }
      .titleDescription {
        font-size: 14px;
        font-family: PingFangSC-Medium;
        color: rgba(153, 153, 153, 1);
        margin-top: 10px;
      }
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(100px);
  }

  .ImageView.is-active {
    background-color: rgba(26, 26, 26, .65);
  }

  .ImageView {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 101;
    overflow: hidden;
    transition: background-color .2s ease-in-out;
  }

  .ImageView-inner {
    height: 100%;
    box-sizing: border-box;
  }

  .ImageView-img {
    cursor: zoom-out;
  }
</style>
