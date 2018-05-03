<template>
  <div>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc"></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <div class="main-info">
          <h2>主体信息</h2>
          <div>
            <ul>
              <li>主体单位所属区域：最多显示长度为20字站位站位站位站位站</li>
              <li>主体单位证件类型：我是证件类型</li>
              <li>主体单位性质：我是单位性质</li>
              <li>主体单位证件号码：我是证件号码</li>
              <li>主体单位名称：最多显示长度为20字站位站位站位站位站</li>
            </ul>
            <ul>
              <li>主体单位证件住所：我是证件类型</li>
              <li>主体单位通信地址：我是单位性质</li>
              <li>投资人或主管单位姓名：我是证件号码</li>
              <li>法人姓名：我是法人姓名</li>
              <li>法人证件类型：我是证件类型</li>
            </ul>
            <ul>
              <li>法人证件号码：我是单位性质</li>
              <li>办公室电话：我是证件号码</li>
              <li>手机号码：我是证件号码</li>
              <li>电子邮箱地址：我是证件号码</li>
            </ul>
          </div>
        </div>
        <div class="main-info">
          <h2>网站信息</h2>
          <transition name="list">
            <div v-if="siteInfoShow">
              <ul>
                <li>网站名称：最多显示长度为20字站位站位站位站位站</li>
                <li>网站域名：我是证件类型</li>
                <li>网站首页URL：我是单位性质</li>
                <li>网站服务内容：我是证件号码</li>
                <li>网站语言：最多显示长度为20字站位站位站位站位站</li>
              </ul>
              <ul>
                <li>网站负责人姓名：我是证件类型</li>
                <li>有效证件类型：我是单位性质</li>
                <li>有效证件号码：我是证件号码</li>
                <li>办公室电话：我是法人姓名</li>
                <li>电子邮箱地址：我是证件类型</li>
              </ul>
              <ul>
                <li>ISP名称：我是单位性质</li>
                <li>网站IP地址：我是证件号码</li>
                <li>网站接入方式：我是证件号码</li>
                <li>服务器放置地：我是证件号码</li>
              </ul>
            </div>
          </transition>
        </div>
        <h2>请上传主办单位负责人相关资料</h2>
        <div class="upload">
          <div class="uploadTitle">
            <p>身份证人像面</p>
            <div class="item">
              <div class="item-content">
                <div style="width:50%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do">
                    <div class="item-content-text">
                      暂无图片
                    </div>
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
                    action="file/upFile.do">
                    <div class="item-content-text">
                      暂无图片
                    </div>
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
        <h2>请上传主办单位相关资料</h2>
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
                    action="file/upFile.do">
                    <div class="item-content-text">
                      暂无图片
                    </div>
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
              <div class="item-content">
                <div style="width:100%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do">
                    <div class="item-content-text">
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>请上传其他资料</h2>
        <p class="titleDescription">如前置审批材料，法人授权委托书等材料（点击下载法人授权委托书）</p>
        <div class="upload">
          <div class="uploadTitle">
            <p>其他文件</p>
            <div class="item">
              <div class="item-content">
                <div style="width:100%;">
                  <Upload
                    type="drag"
                    :show-upload-list="false"
                    :with-credentials="true"
                    action="file/upFile.do">
                    <div class="item-content-text">
                      点击选择文件
                    </div>
                    <button>上传</button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <button @click="$router.push('newRecordStepTwo')">上一步，填写网站信息</button>
        <button style="margin-left: 20px">下一步，提交初审</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'

  export default {
    components: {
      step
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem('zone')
      var recordsType = sessionStorage.getItem('recordsType')
      next(vm => {
        vm.setData(area, recordsType)
      })
    },
    data() {
      return {
        siteInfoShow: false,
        // 备案区域
        area: '',
        // 备案类型
        recordsType: '新增备案',
        // 备案类型描述
        recordsTypeDesc: '域名未备案，备案主体证件无备案号，需要备案。',
      }
    },
    methods: {
      setData(area, recordsType) {
        this.area = area
        switch (recordsType) {
          case '2':
            break
          case '3':
            break
        }
      },
    },
    mounted() {
      this.siteInfoShow = true
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
