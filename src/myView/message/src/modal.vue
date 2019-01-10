<template>
  <div>
    <transition name="mask">
      <div v-show="visible" class="mask"></div>
    </transition>
    <transition name="modal">
      <div v-show="visible" class="modal-wrapper" @click="close" ref="animation">
        <div class="modal">
          <div class="header">
            <p>
              <Icon type="close-circled" class="icon error-icon" v-if="type==='error'"></Icon>
              <Icon type="ios-information" class="icon warning-icon" v-if="type==='confirm'"></Icon>
              <Icon type="information-circled" class="icon info-icon" v-if="type==='info'"></Icon>
              <span style="vertical-align: middle">{{title}}</span>
            </p>
          </div>
          <div class="modal-body">
           <p v-html="content"></p>
          </div>
          <div class="modal-foot">
            <Button @click="cancel" v-if="type==='confirm'">{{cancelText}}</Button>
            <Button type="primary" @click="ok">{{okText}}</Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        visible: true,
        animationEnd: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'info'
      },
      title: {
        type: String,
        default: '错误'
      },
      content: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      onCancel: {
        type: Function,
        default: () => {
        }
      },
      okText: {
        type: String,
        default: '确定'
      },
      onOk: {
        type: Function,
        default: () => {
        }
      }
    },
    create(){

    },
    methods: {
      show(){
        this.visible = true
      },
      close(event){
        if (event.target === event.currentTarget) {
          this.visible = false
        }
      },
      cancel(){
        this.onCancel()
        this.visible = false
      },
      ok(){
        this.onOk()
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .mask-enter-active, .mask-leave-active {
    transition: opacity .3s;
  }

  .mask-enter, .mask-leave-to {
    opacity: 0;
  }

  .modal-enter-active {
    transition: all .3s;
    animation: bounce-in .3s;
  }

  .modal-leave-active {
    transition: all .3s;
    animation: bounce-in .3s reverse;
    animation-fill-mode: forwards;
  }

  .modal-enter, .modal-leave-to {
    opacity: 0;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(.8);
    }
    100% {
      transform: scale(1);
    }
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, .6);
    height: 100%;
    z-index: 1000;
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0px auto;
    z-index: 1000;
    .modal {
      border-radius: 5px;
      margin: 0 auto;
      position: relative;
      outline: 0;
      top: 100px;
      width: 350px;
      background-color: #ffffff;
      .header {
        background: #333;
        padding: 15px 30px ;
        .icon {
          margin-right: 10px;
          font-size: 20px;
          vertical-align: middle;
        }
        .info-icon {
          color: #FFBF00;
        }
        .warning-icon {
          color: #FFBF00;
        }
        .error-icon {

          color: #FFBF00;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          color: #FFF;
        }
      }
      .modal-body {
        padding: 10px 30px 0px;
        font-size: 14px;
        color: #666666;
      }
      .modal-foot {
        padding: 20px 30px;
        text-align: right;
      }
    }
  }
</style>
