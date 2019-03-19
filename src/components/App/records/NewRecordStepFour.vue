<template>
  <div style="background: #FFF">
    <!--    <records></records>-->
    <o-step :onStep="3" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="2" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body">
      <div class="content">
        <h2>请选择核验方式</h2>
        <p>当前状态： <span>提交资料</span></p>
      </div>
      <p>您所在北京市地区可选择核验方式：</p>
      <div class="selectWay">
        <div class="title">
          <p :class="{select: photograph === 2}" @click="photograph = 2">邮寄幕布拍照核验</p>
          <p :class="{select: photograph === 1}" @click="photograph = 1">现场拍照核验</p>
        </div>
        <div v-if="photograph === 1">
          <div class="description">
            <p>1.下载填写完成<a :href="checkListAddress">《网站备案信息真实性核验单》</a>，按要求填写完成并盖章。</p>
            <p>2.携带核验单、身份证复印件、营业执照复印件、域名证书复印件、网站授权书等文件至指定位置，提交核验单与其他资料并完成现场拍照</p>
          </div>
          <div class="footer">
            <button @click="toMap">查看拍照地址</button>
            <button style="margin-left: 20px" @click="sendAddress">将地址发送至手机</button>
            <p style="border-bottom: 1px solid #999999;width: 765px;padding-bottom: 20px;">当天拍照完成，当天提交管局，速度较快。</p>
          </div>
          <div class="footer" style="padding-top: 0">
            <button @click="applyCurtain(2)" v-show="!nextStep">提交初审</button>
          </div>
        </div>
        <div v-if="photograph === 2 && nextStep === false">
          <div class="description">
            <p>按要求填写完成《网站备案信息真实性核验单》并盖章，将填写完成核验单与其他资料打包邮寄至新睿云。由新睿云承担您的邮件到付费用。</p>
            <p>由新睿云为您邮寄幕布，收到后根据实例要求自行拍照上传。幕布需50元押金，并由您承担到付邮件费用。</p>
          </div>
          <div class="footer">
            <button @click="$router.go(-1)" style="margin-right: 10px">上一步</button>
            <button @click="next">下一步</button>
            <p>足不出户，需等待2-5天,偏远地区另行计算</p>
          </div>
        </div>
        <div v-if="photograph === 2 && nextStep === true">
          <div class="description">
            <p>收件地址</p>
            <Form ref="receiveForm" :model="receiveForm" :rules="receiveFormRuleValidate"
                  :label-width="90">
              <FormItem label="地址" prop="address">
                <Input v-model="receiveForm.address" placeholder="请输入地址"
                       style="width: 500px" :readonly="canUpdate"></Input>
                <span style="cursor: pointer;color: #377dff;margin-left: 10px;font-size: 14px" @click="updateReceiveForm" v-if="!curtainStatus">使用新地址</span>
              </FormItem>
              <FormItem label="收件人" prop="person">
                <Input v-model="receiveForm.person" placeholder="请输入收件人"
                       style="width: 500px" :readonly="canUpdate"></Input>
              </FormItem>
              <FormItem label="联系方式" prop="phone">
                <Input v-model="receiveForm.phone" placeholder="请输入联系方式"
                       style="width: 500px" :readonly="canUpdate"></Input>
              </FormItem>
              <FormItem v-if="canUpdate === false">
                <Button type="primary" @click="submitNewAddress" style="margin-left: 420px">确认提交</Button>
              </FormItem>
            </Form>
          </div>
          <div class="footer" style="padding-top: 0">
            <button @click="nextStep = false" style="margin-right: 10px">上一步</button>
            <button @click="showModal.logistics = true" v-if="curtainStatus">查看物流</button>
            <button v-else @click="showModal.applyHint = true">提交初审并申请幕布</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-show="photograph === 2 && nextStep  && curtainStatus ">
      <div class="content">
        <h2>收到幕布后请按照要求拍照上传</h2>
        <p>请仔细阅读拍照要求，以幕布为背景，拍摄网站负责人的上半身免冠照片。请保持光线充足，照片效果清晰</p>
      </div>
      <div class="upload">
        <div class="uploadTitle">
          <p>核验照片</p>
          <div class="item">
            <div class="item-content">
              <div style="width:100%;">
                <Upload
                  type="drag"
                  :show-upload-list="false"
                  :with-credentials="true"
                  action="file/upFile.do"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-exceeded-size="handleMaxSize"
                  :on-format-error="handleFormatJpg"
                  :on-success="photoImg">
                  <div class="item-content-text" v-if="upload.photo===''">
                    点击选择文件
                  </div>
                  <img v-else :src="upload.photo" style="height: 165px;width:270px;">
                  <Progress v-show="percent>0" :percent="percent"></Progress>
                  <Button type="primary" v-if="upload.photo===''">上传</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
        <div class="uploadTitle" style="margin: 34px 0 10px 20px;">
          <div class="item" style="text-align: center">
            <img @click="imageViewShow=true" style="height: 203px;cursor: zoom-in" src="../../../assets/img/records/records-img6.png"/>
          </div>
        </div>
      </div>
      <div class="rule">
        <p>应部分管局要求：</p>
        <p>1.用户拍照的照片上面要显示拍照时间（水印）</p>
        <p>2.拍照时穿的衣服必须符合当时的季节</p>
        <p>为保障您的资料顺利通过管局审核，请根据以上提示上传符合管局要求图片，如有问题可咨询客服专员<a target="_blank" :href="`tencent://message/?uin=1746856113&amp;Site=www.cloudsoar.com&amp;Menu=yes`">（QQ客服-备案）</a></p>
      </div>
      <div style="margin-top: 60px;height: 2px;background: #d9d9d9"></div>
    </div>
    <div class="ImageView is-active" style="padding-bottom: 10px;" v-show="imageViewShow" @click="imageViewShow=false">
      <div class="ImageView-inner" style="overflow: auto;">
        <img src="../../../assets/img/records/records-img6.png" class="ImageView-img" alt="preview"
             style="width: 520px; transform: translate3d(140%, 25%, 0) scale3d(1.00003, 1.00003, 1); opacity: 1;">
      </div>
    </div>
    <div class="content-footer" v-show="photograph === 2 && nextStep  && curtainStatus">
      <button @click="sumbitApproval">提交初审</button>
    </div>
    <Modal v-model="showModal.logistics" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">物流信息</span>
      </p>
      <div class="logistics">
        <p>物流公司：<span>顺丰速递</span></p>
        <p>物流单号：<span style="color: #377dff">xxx</span></p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary"
                @click="showModal.logistics = false">确认
        </Button>
      </div>
    </Modal>
    <!-- 申请幕布提示 -->
    <Modal v-model="showModal.applyHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">由于背景幕布需回收并多次使用，寄送幕布需要从您的账户冻结50元押金，待我们确认回收幕布之后，押金即解冻。注意：冻结押金不可用于购买和续费。您可以在费用中心查看冻结押金详情。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.applyHint = false">取消</Button>
        <Button type="primary" @click="applyHint_ok">确定</Button>
      </p>
    </Modal>
    <!-- 冻结资金提示 -->
    <Modal v-model="showModal.freezeHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">冻结金额：50元</p>
          <p class="lh24">冻结事由：备案幕布申请</p>
          <p class="lh24">冻结时间：{{ currentData }}-幕布回收确认日</p>
          <p class="lh24">解冻操作：自动解冻</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.freezeHint = false">取消</Button>
        <Button type="primary" @click="freezeHint_ok">确认冻结</Button>
      </p>
    </Modal>
    <!-- 资金不足提示 -->
    <Modal v-model="showModal.shortageHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您的账户余额小于50元，冻结资金不足。请先充值。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.shortageHint = false">取消</Button>
        <Button type="primary" @click="shortageHint_ok">确认充值</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import step from './step.vue'
  import oStep from "./ostep.vue";
  import records from './../Records'
  import $ from 'jquery'

  export default {
    components: {
      step, records, oStep
    },
    beforeRouteEnter(to, from, next) {
      if (sessionStorage.getItem('mainParamsStr')) {
        let mainParamsStr = sessionStorage.getItem('mainParamsStr')
        let siteParamsStr = sessionStorage.getItem('siteParamsStr')
        let area = sessionStorage.getItem('zone')
        let zoneId = sessionStorage.getItem('zoneId')
        let recordsType = sessionStorage.getItem('recordsType')
        let url = 'recode/listMainWeb.do'
        axios.get(url).then(response => {
          next(vm => {
            vm.setData(area, zoneId, recordsType, mainParamsStr, siteParamsStr, response)
            vm.getCheckList()
          })
        })
      } else {
        let id = sessionStorage.getItem('newId')
        let url = 'recode/listMainWeb.do'
        axios.get(url, {
          params: {
            id: id
          }
        }).then(response => {
          next(vm => {
            vm.getPersonInfo(response)
            vm.getCheckList()
          })
        })
      }
    },
    data() {
      //校验手机号码
      const validPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|8|9|6|7]\d{9}$/;
        if (!reg.test(this.receiveForm.phone)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      return {
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 拍照类型 1:现场拍照 2: 邮寄幕布
        photograph: 2,
        // 邮寄下一步
        nextStep: false,
        // 收件信息表单
        receiveForm: {
          address: '',
          person: '',
          phone: ''
        },
        // 判断收件人信息是否可以修改
        canUpdate: true,
        // 收件地址校检
        receiveFormRuleValidate: {
          address: [
            {required: true, message: "请输入邮寄地址", trigger: "blur"}
          ],
          person: [
            {required: true, message: "请输入收件人姓名", trigger: "blur"}
          ],
          phone: [
            {required: true, message: "请输入收件人电话", trigger: "blur"},
            {validator: validPhoneNumber, trigger: "blur"}
          ],
        },
        // 模态框
        showModal: {
          // 物流
          logistics: false,
          applyHint: false,
          freezeHint: false,
          shortageHint: false
        },
        upload: {
          photo: ''
        },
        // 是否申请幕布
        curtainStatus: false,
        //主体信息参数
        mainParams: {},
        // 网站信息参数
        siteParams: {},
        // 用户备案信息
        recordInfo: {},
        isRecord: false,
        checkListAddress: '',
        imageViewShow: false,
        percent: 0,
        balance: 0,
        currentData: this.getCurrentDate(),
        pageTimer: null
      }
    },
    created() {
    },
    methods: {
      setData(area, zoneId, recordsType, mainParamsStr, siteParamsStr, response) {
        this.area = area
        this.zoneId = zoneId
        this.mainParams = JSON.parse(mainParamsStr)
        this.siteParams = JSON.parse(siteParamsStr)
        this.receiveForm.address = this.mainParams.mainCompanyCommunicatLocation
        this.receiveForm.person = this.mainParams.legalName
        this.receiveForm.phone = this.mainParams.phone
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
        if (response.data.status === 1) {
          if (response.data.result.length == 0) {
            this.isRecord = false
          } else {
            this.isRecord = true
          }
        }
      },
      // 获取当前备案网站负责人信息
      getPersonInfo(response) {
        if (response.data.status === 1) {
          this.recordsType = response.data.result[0].recordtype
          this.isRecord = true
          this.recordInfo = response.data.result[0]
          this.nextStep = true
          $('html, body').animate({scrollTop: 800}, 300)
          switch (this.recordsType) {
            case '新增备案':
              this.recordsTypeDesc = '域名未备案，备案主体证件无备案号，需要备案。'
              break
            case '新增接入':
              this.recordsTypeDesc = '域名已在其他平台备案过，需要变更接入商。'
              break
            case '新增网站':
              this.recordsTypeDesc = '主体已经备案过，需要再给其他网站备案。'
              break
            case '变更备案':
              this.recordsTypeDesc = '已有备案号，需要修改之前备案的中内容。'
              break
          }
          // 判断是否申请幕布
          if (response.data.result[0].mark3 != '' && typeof(response.data.result[0].mark3) != "undefined") {
            this.curtainStatus = true
            this.receiveForm.address = response.data.result[0].mark2
            this.receiveForm.person = response.data.result[0].mark3
            this.receiveForm.phone = response.data.result[0].mark4
          } else {
            this.receiveForm.address = response.data.result[0].maincompanycommunicatlocation
            this.receiveForm.person = response.data.result[0].legalname
            this.receiveForm.phone = response.data.result[0].companyphone
          }
        }
      },
      // 使用新地址
      updateReceiveForm() {
        this.canUpdate = false
      },
      // 提交修改的新地址
      submitNewAddress() {
        this.$refs.receiveForm.validate((val) => {
          if (val) {
            this.curtainStatus = false
            this.$Message.success({
              content: '邮寄地址修改成功'
            })
            this.canUpdate = true
          } else {
            return
          }
        })
      },
      photoImg(res) {
        if (res.status == 1) {
          let s = setInterval(() => {
            this.percent++
            if (this.percent > 100) {
              this.upload.photo = res.result
              this.$Message.success('上传成功')
              window.clearInterval(s)
              this.percent = 0
            }
          }, 20)
        } else {
          this.$Message.info('上传失败')
        }
      },
      next() {
        /*        if (this.curtainStatus === true) {

                } else {
                  this.showModal.applyHint = true
                }*/
        this.nextStep = true
      },
      applyHint_ok() {
        this.showModal.applyHint = false
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = response.data.data.remainder
            if (this.balance >= 50) {
              this.showModal.freezeHint = true
            } else {
              this.showModal.shortageHint = true
            }
          }
        })
        // this.showModal.freezeHint = true
      },
      freezeHint_ok() {
        this.showModal.freezeHint = false
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: '50',
          describe: '幕布申请',
          operationType: '幕布申请',
          thawCondition: '幕布回收'
          //choose: '0'
        }
        axios.post(url, params).then(res => {
          if (res.data.status == 1) {
            this.$Message.success('资金冻结成功')
            this.nextStep = true
            this.applyCurtain(1)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      shortageHint_ok() {
        this.showModal.shortageHint = false
        const {href} = this.$router.resolve({
          name: 'recharge',
        })
        window.open(href, '_blank')
        this.pageTimer = setInterval(() => {
          axios.get('activity/compareForMoney.do', {
            params: {freezeMoney: 50}
          }).then(val => {
            if (val.data.status == 1) {
              clearInterval(this.pageTimer)
              this.showModal.freezeHint = true
            }
          })
        }, 2000)
      },
      // 提交幕布申请
      applyCurtain(val) {
        if (val == 1) {
          this.siteParams.backgroundAddress = this.receiveForm.address
          this.siteParams.backgroundName = this.receiveForm.person
          this.siteParams.backgroundPhone = this.receiveForm.phone
        }
        let params = {
          mainCompanyArea: this.mainParams.mainCompanyArea,
          mainCompanyCertificatesType: this.mainParams.mainCompanyCertificatesType,
          mainCompanyNature: this.mainParams.mainCompanyNature,
          mainCompanyNumber: this.mainParams.mainCompanyNumber,
          mainCompanyName: this.mainParams.mainCompanyName,
          mainCompanyCertificatesLoaction: this.mainParams.mainCompanyCertificatesLoaction,
          mainCompanyCommunicatLocation: this.mainParams.mainCompanyCommunicatLocation,
          InvestorName: this.mainParams.InvestorName,
          legalName: this.mainParams.legalName,
          legalCertificatesType: this.mainParams.legalCertificatesType,
          legalCertificatesNumber: this.mainParams.legalCertificatesNumber,
          officeNumber: this.mainParams.officeNumber,
          phone: this.mainParams.phone,
          email: this.mainParams.email,
          zoneId: this.zoneId,
          hostCompanyUrl: this.mainParams.hostCompanyUrl,
        }
        // 有主体信息发送一个请求，没有发送两个请求
        if (this.isRecord == true) {
          let addMainWeb = axios.post('recode/addMainWeb.do', this.siteParams)
          Promise.all([addMainWeb]).then(response => {
            if (response[0].status == 200 && response[0].data.status == 1) {
              this.$router.push('waitFirstTrial')
              sessionStorage.clear()
            } else {
              this.$message.info({
                content: response[0].data.message
              })
            }
          })
        } else {
          let addMainCompany = axios.post('recode/addMainCompany.do', params)
          Promise.all([addMainCompany]).then(response => {
            if ((response[0].status == 200)) {
              axios.post('recode/addMainWeb.do', this.siteParams).then(res => {
                if (res.data.status == 1) {
                  this.$router.push('waitFirstTrial')
                  sessionStorage.clear()
                } else {
                  this.$message.info({
                    content: res.data.message
                  })
                }
              })
            } else {
              this.$message.info({
                content: response[0].data.message
              })
            }
          })
        }
      },
      // 提交幕布
      sumbitApproval() {
        if (this.upload.photo === '') {
          this.$Message.info('请上传相关幕布背景照片')
          return
        }
        let url = 'recode/updateMainWeb.do'
        let id = sessionStorage.getItem('newId')
        let params = {
          id: id,
          backgroundUrl: this.upload.photo
        }
        axios.post(url, params).then(res => {
          if (res.data.status === 1) {
            this.curtainStatus = false
            this.$Message.success({
              content: '信息提交成功'
            })
            sessionStorage.setItem('recordsType', this.recordsType)
            this.$router.push('waitFirstTrial')
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      handleFormatJpg() {
        this.$Message.info({
          content: '请选择jpg、png、jpeg类型的文件进行上传'
        });
      },
      handleMaxSize() {
        this.$Message.info({
          content: '请选择大小小于2M的文件进行上传'
        });
      },
      getCheckList() {
        let province = this.mainParams.mainCompanyArea ? this.mainParams.mainCompanyArea.split('-')[0] : this.recordInfo.maincompanyarea.split('-')[0]
        let mainUnit = this.mainParams.mainCompanyNature || this.recordInfo.maincompanynature
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
      getCurrentDate() {
        return new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString()
      },
      sendAddress() {
        let url = 'recode/sendAddress.do'
        axios.get(url).then(res => {
          if (res.data.status == 1) {
            this.$Message.success('拍照地址已发送至认证手机号')
          } else {
            this.$Message.info('地址发送失败')
          }
        })
      },
      toMap() {
        window.open('map')
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.pageTimer)
      next()
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
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
  }

  // 定义h3公用样式
  .h3() {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
  }

  .body {
    background: #FFF;
    padding: 60px 0;
    .center();
    .content {
      h2 {
        .h2();
        margin-left: 20px;
      }
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-top: 10px;
        margin-left: 20px;
        > span {
          color: #00A854;
          &:before {
            height: 10px;
            width: 10px;
            content: '';
            display: inline-block;
            background: #00A854;
            border-radius: 5px;
            margin: 0 5px;
          }
        }
      }
      &:before {
        content: '';
        width: 8px;
        height: 48px;
        background: rgba(55, 125, 255, 1);
        display: inline-block;
        position: absolute;
      }
    }
    > p {
      margin: 30px 0 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
    }
    .selectWay {
      width: 800px;
      background: #F7F7F7;
      .title {
        height: 40px;
        display: flex;
        > p {
          width: 50%;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 40px;
          text-align: center;
          background: #D8D8D8;
          cursor: pointer;
          &.select {
            background: #377DFF;
            color: #FFF;
          }
        }
      }
      .description {
        padding: 17px 0 0 20px;
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          line-height: 28px;
          > span {
            color: #377dff;
            cursor: pointer;
          }
        }
      }
      .footer {
        padding: 40px 0 40px 20px;
        > button {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #333;
          outline: none;
          cursor: pointer;
          border: none;
          background: #FFE777;
          padding: 8px 10px;
        }
        > p {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
          margin-top: 10px;
        }
      }
    }
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

  .footer {
    .center();
    .content {
      h2 {
        .h2();
        margin-left: 20px;
      }
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-top: 10px;
        margin-left: 20px;
        > span {
          color: #00A854;
          &:before {
            height: 10px;
            width: 10px;
            content: '';
            display: inline-block;
            background: #00A854;
            border-radius: 5px;
            margin: 0 5px;
          }
        }
      }
      &:before {
        content: '';
        width: 8px;
        height: 48px;
        background: rgba(55, 125, 255, 1);
        display: inline-block;
        position: absolute;
      }
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
              padding: 50px 0px;
              margin-bottom: 20px;
              border: 1px solid #ffffff;
              background-color: #ffffff;
              color: #999;
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
    .rule {
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #666666;
        line-height: 14px;
        margin-top: 10px;
      }
    }
  }

  .logistics {
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      > span {
        font-size: 12px;
        color: #999;
      }
    }
  }

</style>
