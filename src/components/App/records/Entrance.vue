<template>
  <div>
    <div class="body-top">
      <div class="content">
        <h2>备案类型选择</h2>
        <div class="recordsType">
          <ul v-for="item in typeList" :class="{ select: type === item.value }" @click="type = item.value" :key="item.value">
            <p>{{ item.title }}</p>
            <p>{{ item.descript }}</p>
          </ul>
        </div>
      </div>
    </div>
    <div class="body-center">
      <div class="content">
        <img src="../../../assets/img/records/records-icon9.png"/>
        <ul v-for="item in flowList" :key="item.step">
          <img :src="item.src"/>
          <p>{{ item.title }}</p>
          <p>{{ item.step }}</p>
          <div></div>
        </ul>
      </div>
    </div>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域选择</h2>
        <div class="area">
          <button v-for="item in areaList" :key="item.zoneId" :class="{select: item.text === area }" @click="changeArea(item)"><img :src="item.src"/> {{ item.text }}</button>
        </div>
        <button @click="putOnRecord">立即备案</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 备案类型列表
        typeList: [
          {
            title: '新增备案',
            descript: '域名未备案，备案主体证件无备案号，需要备案。',
            value: 1
          },
          {
            title: '新增接入',
            descript: '域名已在其他平台备案过，需要变更接入商。',
            value: 2
          },
          {
            title: '新增网站',
            descript: '主体已经备案过，需要再给其他网站备案。',
            value: 3
          },
          {
            title: '变更备案',
            descript: '已有备案号，需要修改之前备案的中内容。',
            value: 4
          }
        ],
        // 备案类型： 1：新增备案；2：新增接入；3：新增网站；4：变更备案
        type: 1,
        // 备案流程列表
        flowList: [
          {
            src: require('../../../assets/img/records/records-icon1.png'),
            title: '填写备案信息',
            step: 1
          },
          {
            src: require('../../../assets/img/records/records-icon2.png'),
            title: '等待初审',
            step: 2
          },
          {
            src: require('../../../assets/img/records/records-icon3.png'),
            title: '上传资料/办理拍照',
            step: 3
          },
          {
            src: require('../../../assets/img/records/records-icon4.png'),
            title: '提交管局审批',
            step: 4
          },
          {
            src: require('../../../assets/img/records/records-icon5.png'),
            title: '备案短信核验',
            step: 5
          },
          {
            src: require('../../../assets/img/records/records-icon6.png'),
            title: '备案成功',
            step: 6
          }
        ],
        // 区域选择列表
        areaList: [
          {
            text: '北京一区',
            src: require('../../../assets/img/records/records-icon7.png'),
            zoneId: '1'
          }, {
            text: '北方一区',
            src: require('../../../assets/img/records/records-icon8.png'),
            zoneId: '2'
          }, {
            text: '北方二区',
            src: require('../../../assets/img/records/records-icon8.png'),
            zoneId: '3'
          }, {
            text: '华北一区',
            src: require('../../../assets/img/records/records-icon8.png'),
            zoneId: '4'
          }, {
            text: '华北二区',
            src: require('../../../assets/img/records/records-icon8.png'),
            zoneId: '5'
          }
        ],
        area: '北京一区',
        // 区域切换时icon变化
        selectImg: require('../../../assets/img/records/records-icon7.png'),
        unSelectImg: require('../../../assets/img/records/records-icon8.png')
      }
    },
    created() {
    },
    methods: {
      // 切换区域
      changeArea(item) {
        this.areaList.forEach(area => {
          area.src = this.unSelectImg
        })
        this.area = item.text
        item.src = this.selectImg
      },
      // 立即备案
      putOnRecord () {
        sessionStorage.setItem('zone', this.area)
        sessionStorage.setItem('recordsType',this.type + '')
        // 根据选择的备案类型决定跳入哪个起始页面
        switch (this.type) {
          case 1:
            this.$router.push('newRecord')
            break
          case 2:
            this.$router.push('newAccess')
            break;
          case 3:
            this.$router.push('newAccess')
            break
          case 4:
            break
        }
      }
    },
    computed: {},
    watch: {}
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  // 定义center公用样式
  .center() {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  // 定义button的公用样式
  .but() {
    outline: none;
    cursor: pointer;
  }

  // 定义h2公用样式
  .h2() {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
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

  // 定义区域选择按钮公用样式
  .area-but() {
    border: none;
    width: 224px;
    height: 50px;
    background: rgba(55, 125, 255, 0.05);
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
    &.select {
      box-shadow: 0px 2px 19px -8px rgba(55, 125, 255, 0.67);
      background: rgba(55, 125, 255, 0.8);
      color: rgba(255, 255, 255, 1);
    }
  }

  .body-top {
    background: #FFFFFF;
    .content {
      .center();
      padding: 60px 0 40px;
      h2 {
        .h2();
      }
      .recordsType {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        ul {
          width: 285px;
          height: 178px;
          background: rgba(55, 125, 255, 0.05);
          border-radius: 4px;
          padding: 40px;
          cursor: pointer;
          p {
            font-size: 24px;
            font-family: PingFangSC-Medium;
            color: rgba(102, 102, 102, 1);
            line-height: 33px;
          }
          &.select {
            background: rgba(55, 125, 255, 0.8);
            box-shadow: 0px 0px 24px -9px rgba(55, 125, 255, 0.71);
            p {
              color: #FFF;
            }
          }
          p:nth-child(2) {
            font-size: 14px;
            line-height: 20px;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .body-center {
    height: 270px;
    background: #F8F9FB;
    position: relative;
    .content {
      display: flex;
      padding: 80px 0 60px;
      position: relative;
      .center();
      >img{
        position: absolute;
        top: -22px;
        left: 135px;
      }
      ul {
        position: relative;
        height: 130px;
        width: 200px;
        text-align: center;
        z-index: 0;
        p {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin-top: 20px;
        }
        p:nth-child(3) {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          height: 24px;
          width: 24px;
          background: #333333;
          border-radius: 12px;
          margin: 20px auto 0px auto;
        }
        > div {
          height: 3px;
          width: 200px;
          background: #999999;
          position: absolute;
          bottom: 11px;
          z-index: -1;
        }
      }
      ul:nth-child(4) {
        img {
          padding-top: 6px;
        }
      }
      ul:nth-child(6) {
        img {
          padding-top: 8px;
        }
      }
    }
  }

  .body-bottom {
    .content {
      padding: 60px 0 60px;
      .center();
      h2 {
        .h2()
      }
      .area {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 30px;
        button {
          .but();
          .area-but();
          img {
            position: relative;
            top: 3px;
          }
        }
      }
      > button {
        .but();
        margin-top: 60px;
        border: none;
        width: 221px;
        height: 49px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        background: rgba(255, 231, 119, 1);
        box-shadow: 0px 2px 21px -6px rgba(255, 231, 119, 1);
      }
    }
  }
</style>
