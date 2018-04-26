<!-- 步骤一公用样式组件 -->
<template>
  <div class="body-top">
    <div class="content">
      <h2>备案类型：{{ recordsType }}</h2>
      <p>{{ recordsTypeDesc }}</p>
      <div class="recordsFlow">
        <ul v-for="item in flowList" :key="item.step">
          <img v-if="item.step > onStep" :src="item.src"/>
          <img v-else :src="item.onSrc"/>
          <p :class="{onStep: item.step <= onStep}">{{ item.title }}</p>
          <p :class="{onStep: item.step <= onStep}">{{ item.step }}</p>
          <div class="left-line" :class="{onStep: item.step <= onStep}"></div>
          <div class="right-line" :class="{onStep: item.step < onStep}"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 备案流程列表
        flowList: [
          {
            src: require('../../../assets/img/records/records-icon10.png'),
            onSrc:require('../../../assets/img/records/records-icon10.png'),
            title: '填写备案信息',
            step: 1
          },
          {
            src: require('../../../assets/img/records/records-icon11.png'),
            onSrc:require('../../../assets/img/records/records-icon16.png'),
            title: '等待初审',
            step: 2
          },
          {
            src: require('../../../assets/img/records/records-icon12.png'),
            onSrc:require('../../../assets/img/records/records-icon17.png'),
            title: '上传资料/办理拍照',
            step: 3
          },
          {
            src: require('../../../assets/img/records/records-icon13.png'),
            onSrc:require('../../../assets/img/records/records-icon18.png'),
            title: '提交管局审批',
            step: 4
          },
          {
            src: require('../../../assets/img/records/records-icon14.png'),
            onSrc: require('../../../assets/img/records/records-icon14.png'),
            title: '备案短信核验',
            step: 5
          },
          {
            src: require('../../../assets/img/records/records-icon15.png'),
            onSrc: require('../../../assets/img/records/records-icon15.png'),
            title: '备案成功',
            step: 6
          }
        ]
      }
    },
    // 到达第几步
    props: {
      onStep: {
        type: Number
      },
      recordsType: {
        type: String
      },
      recordsTypeDesc: {
        type: String
      }
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
  }

  .body-top {
    background: rgba(248, 249, 251, 1);
    .content {
      padding: 60px 0;
      .center();
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
      }
      .recordsFlow {
        display: flex;
        margin-top: 30px;
        justify-content: space-between;
        ul {
          position: relative;
          height: 130px;
          width: 200px;
          text-align: center;
          z-index: 0;
          p {
            font-size: 18px;
            font-family: PingFangSC-Medium;
            color: rgba(153, 153, 153, 1);
            line-height: 25px;
            margin-top: 20px;
            &.onStep {
              color: rgba(62, 130, 255, 1);
            }
          }
          p:nth-child(3) {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
            height: 24px;
            width: 24px;
            background: rgba(153, 153, 153, 1);
            border-radius: 12px;
            margin: 20px auto 0px auto;
            &.onStep {
              background: rgba(62, 130, 255, 1);
            }
          }
          .left-line {
            height: 0;
            width: 99px;
            border: 1px dashed #999;
            position: absolute;
            bottom: 11px;
            z-index: -1;
            &.onStep {
              border: 1px solid rgba(62, 130, 255, 1);
            }
          }
          .right-line {
            height: 0;
            width: 99px;
            border: 1px dashed #999;
            position: absolute;
            bottom: 11px;
            right: 0px;
            z-index: -1;
            &.onStep {
              border: 1px solid rgba(62, 130, 255, 1);
            }
          }
        }
        ul:nth-child(3) {
          img {
            padding-top: 6px;
          }
        }
        ul:nth-child(5) {
          img {
            padding-top: 8px;
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
  }
</style>
