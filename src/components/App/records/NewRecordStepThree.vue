<template>
  <div>
    <records></records>
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
        <div class="main-info" v-for="item in siteListStr">
          <h2>网站信息</h2>
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
            <p>身份证人像面</p>
            <div class="item">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-success="IDCardFront"
                    :before-upload="mark(index)">
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
            <p style="margin-left: 20px">身份证国徽面</p>
            <div class="item" style="margin-left: 20px">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-success="IDCardBack"
                    :before-upload="mark(index)">
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
          </div>
        </div>
        <p @click="addIDPhoto" style="cursor: pointer;color: #377dff; font-size: 14px; margin-top: 10px;" v-if="uploadForm.IDPhotoList.length<3">添加新负责人证件照</p>
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
                  <img src="../../../assets/img/records/records-img3.png">
                  <p>示例图</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传域名证书</h2>
        <div class="upload">
          <div class="uploadTitle">
            <p>执照扫描件</p>
            <div class="item">
              <div class="item-content" style="height: 100%">
                <div style="width:100%;background: #FFF;padding-top: 20px">
                  <p v-for="(file,index) in uploadForm.certifiedDomainNoCertificationDefaultList" style="margin-bottom: 5px;text-align: center;font-size: 14px;line-height: 1.5;">
                    {{ file.name }}
                    <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="handleRemove('1',index)"></Icon>
                  </p>
                  <Upload class="my-upload"
                          type="drag"
                          :default-file-list="uploadForm.certifiedDomainNoCertificationDefaultList"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :before-upload="handleBeforeUpload_1"
                          :on-success="certifiedDomainNoCertification">
                    <span style="font-size: 14px">点击选择文件</span>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传其他资料</h2>
        <p class="titleDescription">如前置审批材料，法人授权委托书等材料（点击<span style="color: #377dff">下载法人授权委托书</span>）</p>
        <div class="upload">
          <div class="uploadTitle">
            <p>其他文件</p>
            <div class="item">
              <div class="item-content" style="height: 100%">
                <div style="width:100%;background: #FFF;padding-top: 20px">
                  <p v-for="(file,index) in uploadForm.otherFile" style="margin-bottom: 5px;text-align: center;font-size: 14px;line-height: 1.5;">
                    {{ file.name }}
                    <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="handleRemove('2',index)"></Icon>
                  </p>
                  <Upload class="my-upload"
                          type="drag"
                          :default-file-list="uploadForm.otherFile"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :before-upload="handleBeforeUpload_2"
                          :on-success="otherFile">
                    <span style="font-size: 14px">点击选择文件</span>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传网站备案信息真实性核验单</h2>
        <p class="titleDescription">1、点击<span style="color: #377dff">下载《网站备案信息真实性核验单》</span>。2、查看核验单样例图，填写以下载的核验单，不得涂改。3、请您保存3份签字的核验单原件以备后续环节使用。</p>
        <div class="upload">
          <div class="uploadTitle">
            <p>其他文件</p>
            <div class="item">
              <div class="item-content" style="height: 100%">
                <div style="width:100%;background: #FFF;padding-top: 20px">
                  <p v-for="(file,index) in uploadForm.CheckList" style="margin-bottom: 5px;text-align: center;font-size: 14px;line-height: 1.5;">
                    {{ file.name }}
                    <Icon type="ios-trash-outline" style="cursor: pointer;margin-left: 10px" @click.native="handleRemove('3',index)"></Icon>
                  </p>
                  <Upload class="my-upload"
                          type="drag"
                          :default-file-list="uploadForm.CheckList"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :before-upload="handleBeforeUpload_3"
                          :on-success="CheckList">
                    <span style="font-size: 14px">点击选择文件</span>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
          <div class="uploadTitle" style="margin: 34px 0 10px 20px;">
            <div class="item" style="text-align: center">
              <img style="height: 203px" src="../../../assets/img/records/records-img4.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <button @click="$router.go(-1)">上一步，填写网站信息</button>
        <button style="margin-left: 20px" @click="netStep()">下一步，提交初审</button>
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
      step, records,oStep
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
        index: '',
        siteInfoShow: false,
        //接受第一页的信息
        mainUnitInformation: {},
        // 接收前一页的主体信息
        siteListStr: [],
        // 备案区域
        area: '',
        zoneId: '',
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 上传资料标记表单
        uploadForm: {
          IDPhotoList: [{
            // 身份证正面
            IDCardFront: '',
            // 身份证反面
            IDCardBack: '',
          }],
          // 相关资料
          combine: '',
          // 域名证书
          certifiedDomainNoCertificationDefaultList: [],
          // 其他文件
          otherFile: [],
          // 核验单
          CheckList: [],
        }
      }
    },
    methods: {
      mark(index) {
        //this. this.index = index
        return () => {
          this.index = index
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
      },
      // 添加新的证件照
      addIDPhoto() {
        let param = {
          // 身份证正面
          IDCardFront: '',
          // 身份证反面
          IDCardBack: '',
        }
        this.uploadForm.IDPhotoList.push(param)
      },
      // 删除上传文件
      handleRemove(value, index) {
        switch (value) {
          case '1':
            this.uploadForm.certifiedDomainNoCertificationDefaultList.splice(index, 1)
            break
          case '2':
            this.uploadForm.otherFile.splice(index, 1)
            break
          case '3':
            this.uploadForm.CheckList.splice(index, 1)
            break
        }

      },
      handleBeforeUpload_1() {
        const check = this.uploadForm.certifiedDomainNoCertificationDefaultList.length < 3;
        if (!check) {
          this.$Message.info({
            content: '上传文件不能超过3个'
          })
        }
        return check
      },
      handleBeforeUpload_2() {
        const check = this.uploadForm.otherFile.length < 4;
        if (!check) {
          this.$Message.info({
            content: '上传文件不能超过4个'
          })
        }
        return check
      },
      handleBeforeUpload_3() {
        const check = this.uploadForm.CheckList.length < 3;
        if (!check) {
          this.$Message.info({
            content: '上传文件不能超过3个'
          })
        }
        return check
      },
      /* 图片上传成功回调，设置图片。每张图片上传都有一个method。
 暂时没有找到更好的方法解决图片标记问题 */
      IDCardFront(response) {
        if (response.status == 1) {
          this.uploadForm.IDPhotoList[this.index].IDCardFront = response.result
        }
      },
      IDCardBack(response) {
        if (response.status == 1) {
          this.uploadForm.IDPhotoList[this.index].IDCardBack = response.result
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
          let param = {
            name: array[index],
            url: response.result
          }
          this.uploadForm.certifiedDomainNoCertificationDefaultList.push(param)
        }
      },
      otherFile(response) {
        if (response.status == 1) {
          let array = response.result.split('/')
          let index = array.length - 1
          let param = {
            name: array[index],
            url: response.result
          }
          this.uploadForm.otherFile.push(param)
        }
      },
      CheckList(response) {
        if (response.status == 1) {
          let array = response.result.split('/')
          let index = array.length - 1
          let param = {
            name: array[index],
            url: response.result
          }
          this.uploadForm.CheckList.push(param)
        }
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
        if (this.uploadForm.certifiedDomainNoCertificationDefaultList.length == 0) {
          this.$Message.info({
            content: '请上传域名证书'
          })
          return
        }
        if (this.uploadForm.otherFile.length == 0) {
          this.$Message.info({
            content: '请上传其他文件'
          })
          return
        }
        if (this.uploadForm.CheckList.length == 0) {
          this.$Message.info({
            content: '请上传核验单'
          })
          return
        }
        let paramsList = this.siteListStr.map(item => {
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
        // 添加网站信息参数
        let params = {
          list_web_message: JSON.stringify(paramsList)
        }
        let companyResponsibilityUrlPositive = this.uploadForm.IDPhotoList.map(item => {
          return item.IDCardFront
        })
        let companyResponsibilityUrlBack = this.uploadForm.IDPhotoList.map(item => {
          return item.IDCardBack
        })
        let certifiedDomainNoCertificationDefaultList = this.uploadForm.certifiedDomainNoCertificationDefaultList.map(item => {
          return item.url
        })
        let otherFile = this.uploadForm.otherFile.map(item => {
          return item.url
        })
        let CheckList = this.uploadForm.CheckList.map(item => {
          return item.url
        })
        let mainCompanyArea = this.mainUnitInformation.maincompanyarea? this.mainUnitInformation.maincompanyarea : (this.mainUnitInformation.province + '-' + this.mainUnitInformation.city + '-' + this.mainUnitInformation.district)
        let addMainCompany = axios.get('recode/addMainCompany.do', {
          params: {
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
            companyResponsibilityUrlPositive: companyResponsibilityUrlPositive + '',
            companyResponsibilityUrlBack: companyResponsibilityUrlBack + '',
            hostCompanyUrl: this.uploadForm.combine,
            domainCertificateUrl: certifiedDomainNoCertificationDefaultList + '',
            otherDataUrl: otherFile + '',
            webRecordAuthenticityUrl: CheckList + '',
          }
        })
        let addMainWeb = axios.post('recode/addMainWeb.do', params)
        Promise.all([addMainCompany, addMainWeb]).then(response => {
          if ((response[0].status == 200 && response[0].data.status == 1) && (response[1].status == 200 && response[1].data.status == 1)) {
            this.$router.push('waitFirstTrial')
            sessionStorage.clear()
          } else {
            this.$message.info({
              content: '平台开小差了，请稍候再试'
            })
          }
        })
      },
    },
    mounted() {
      this.siteInfoShow = true
    },
    computed: {
    }
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

</style>
