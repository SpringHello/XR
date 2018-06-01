<template>
  <div>
    <records></records>
    <o-step :onStep="4" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="3" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body">
      <div class="content">
        <h2>请选择核验方式</h2>
        <p>备案ID：{{ recordserviceid }} | 当前状态： <span>复审中</span></p>
      </div>
      <p>您所在北京市地区可选择核验方式：</p>
      <div class="selectWay">
        <div class="title">
          <p :class="{select: photograph === 1}" @click="photograph = 1">现场拍照核验</p>
          <p :class="{select: photograph === 2}" @click="photograph = 2">邮寄幕布拍照核验</p>
        </div>
        <div v-if="photograph === 1">
          <div class="description">
            <p>1.下载填写完成<a href="keepOnRecord/check.doc">《网站备案信息真实性核验单》</a>，按要求填写完成并盖章。</p>
            <p>2.携带核验单至指定位置，提交核验单并完成拍现场拍照。</p>
          </div>
          <div class="footer">
            <button>查看拍照地址</button>
            <button style="margin-left: 20px">将地址发送至手机</button>
            <p>当天拍照完成，当天提交管局，速度较快。</p>
          </div>
        </div>
        <div v-if="photograph === 2 && nextStep === false">
          <div class="description">
            <p>1.下载填写完成<a href="keepOnRecord/check.doc">《网站备案信息真实性核验单》</a>，按要求填写完成并盖章，将填写完成核验单邮寄至新睿云。</p>
            <p>2.由新睿云为您邮寄免费幕布，收到后根据实例要求自行拍照上传。</p>
          </div>
          <div class="footer">
            <button @click="nextStep = true">下一步</button>
            <p>足不出户，需等待2-4天。</p>
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
                <span style="cursor: pointer;color: #377dff;margin-left: 10px;font-size: 14px" @click="updateReceiveForm">使用新地址</span>
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
            <button @click="showModal.logistics = true" v-if="curtainStatus">查看物流</button>
            <button v-else @click="applyCurtain">提交幕布申请</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-show="photograph === 2 && nextStep === true ">
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
                  :on-format-error="handleFormatJpg"
                  :on-success="photoImg">
                  <div class="item-content-text" v-if="upload.photo===''">
                    点击选择文件
                  </div>
                  <img v-else :src="upload.photo" style="height: 165px;width:270px;">
                  <Button type="primary" v-if="upload.photo===''">上传</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
        <div class="uploadTitle" style="margin: 34px 0 10px 20px;">
          <div class="item" style="text-align: center">
            <img style="height: 203px" src="../../../assets/img/records/records-img6.png"/>
          </div>
        </div>
      </div>
      <div style="margin-top: 60px;height: 2px;background: #d9d9d9"></div>
    </div>
    <div class="content-footer" v-show="photograph === 2 && nextStep === true">
      <button @click="sumbitApproval">提交管局审核</button>
    </div>
    <Modal v-model="showModal.logistics" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">物流信息</span>
      </p>
      <div class="logistics">
        <p>物流公司：<span>顺丰速递</span></p>
        <p>物流单号：<span style="color: #377dff">827397239823</span></p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary"
                @click="showModal.logistics = false">确认
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import step from './step.vue'
  import oStep from "./ostep.vue";
  import records from './../Records'

  export default {
    components: {
      step, records, oStep
    },
    beforeRouteEnter(to, from, next) {
      let id = sessionStorage.getItem('id')
      let url = 'recode/listMainWeb.do'
      axios.get(url, {
        params: {
          id: id
        }
      }).then(response => {
        next(vm => {
          window.scroll(0, 525)
          vm.getPersonInfo(response)
        })
      })
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
        // 备案ID
        recordserviceid: '',
        // 备案数据库id
        id: '',
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 拍照类型 1:现场拍照 2: 邮寄幕布
        photograph: 1,
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
        },
        upload: {
          photo: ''
        },
        // 是否申请幕布
        curtainStatus: false
      }
    },
    created() {
      this.$Message.success({
        content: '恭喜您顺利通过备案初审！请尽快提交资料，办理拍照',
        duration: 5,
        closable: true
      })
      let id = sessionStorage.getItem('id')
      this.id = id
    },
    methods: {
      // 获取当前备案网站负责人信息
      getPersonInfo(response) {
        if (response.data.status === 1) {
          this.recordserviceid = response.data.result[0].recordserviceid
          this.recordsType = response.data.result[0].recordtype
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
        } else {
          this.$message.info({
            content: response.data.message
          })
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
            let url = 'recode/updateMainWeb.do'
            axios.get(url, {
              params: {
                id: this.id,
                backgroundAddress: this.receiveForm.address,
                backgroundName: this.receiveForm.person,
                backgroundPhone: this.receiveForm.phone,
              }
            }).then(res => {
              if (res.data.status === 1) {
                this.curtainStatus = false
                this.$Message.success({
                  content: '邮寄地址修改成功'
                })
              } else {
                this.$message.info({
                  content: '平台开小差了，请稍候再试'
                })
              }
            })
            this.canUpdate = true
          } else {
            return
          }
        })
      },
      photoImg(res) {
        if (res.status == 1) {
          this.upload.photo = res.result
        }
      },
      // 提交幕布申请
      applyCurtain() {
        let url = 'recode/updateMainWeb.do'
        axios.get(url, {
          params: {
            id: this.id,
            backgroundAddress: this.receiveForm.address,
            backgroundName: this.receiveForm.person,
            backgroundPhone: this.receiveForm.phone,
          }
        }).then(res => {
          if (res.data.status === 1) {
            this.curtainStatus = true
            this.$Message.success({
              content: '幕布申请成功'
            })
          } else {
            this.$message.info({
              content: '平台开小差了，请稍候再试'
            })
          }
        })
      },
      // 提交管局审批
      sumbitApproval() {
        if (this.upload.photo === '') {
          this.$Message.info('请上传相关幕布背景照片')
          return
        }
        let url = 'recode/updateMainWeb.do'
        axios.get(url, {
          params: {
            id: this.id,
            backgroundUrl: this.upload.photo
          }
        }).then(res => {
          if (res.data.status === 1) {
            this.curtainStatus = false
            this.$Message.success({
              content: '信息提交成功'
            })
            sessionStorage.setItem('recordsType', this.recordsType)
            this.$router.push('waitSecondTrial')
          } else {
            this.$message.info({
              content: '平台开小差了，请稍候再试'
            })
          }
        })
      },
      handleFormatJpg() {
        this.$Message.info({
          content: '请选择jpg、png、jpeg类型的文件进行上传'
        });
      },
    },
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
    padding: 60px 0;
    .center();
    .content {
      h2 {
        .h2();
        margin-left: 20px;
      }
      > p {
        font-size: 14px;
        font-family: PingFangSC-Medium;
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
      font-family: PingFangSC-Medium;
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
          font-family: PingFangSC-Medium;
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
          font-family: PingFangSC-Medium;
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
          font-family: PingFangSC-Medium;
          color: #333;
          outline: none;
          cursor: pointer;
          border: none;
          background: #FFE777;
          padding: 8px 10px;
        }
        > p {
          font-size: 12px;
          font-family: PingFangSC-Medium;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
          margin-top: 10px;
        }
      }
    }
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
        font-family: PingFangSC-Medium;
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
