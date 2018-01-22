<template>
  <div>
    <transition name="mask">
      <div v-show="visible" class="mask"></div>
    </transition>
    <div v-if="visible" class="modal-wrapper" @click="close">
      <transition name="modal">
        <div class="modal">
          <div class="header">
            <p>
              <Icon type="close-circled" class="icon"></Icon>
              <span style="vertical-align: middle">错误</span>
            </p>
          </div>
          <div class="modal-body">
            <p>需挂载主机有备份，无法挂载，若您仍需挂载硬盘，请先删除主机备份，在执行挂载操作。</p>
          </div>
          <div class="modal-foot">
            <Button>{{cancelText}}</Button>
            <Button type="primary">{{okText}}</Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        visible: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'info'
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
        type: function () {
          this.$parent.close()
        }
      },
      okText: {
        type: String,
        default: '确定'
      },
      onOk: {
        type: function () {
          this.$parent.close()
        }
      }
    },
    methods: {
      show(options){
        this.this.visible = true
      },
      close(){
        console.log('close')
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .mask-enter-active, .mask-leave-active {
    transition: opacity .5s;
  }

  .mask-enter, .mask-leave-to {
    opacity: 0;
  }

  .modal-enter-active, .modal-leave-active {
    transition: all .5s;
  }

  .modal-enter {
    width: 0px;
    height: 0px;
    opacity: 0;
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
        padding: 30px 30px 0px;
        .icon {
          color: #F56A00;
          margin-right: 10px;
          font-size: 24px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          color: #333333;
        }
      }
      .modal-body {
        padding: 10px 30px 0px;
        font-size: 14px;
        color: rgba(17, 17, 17, 0.65);
        p {
          line-height: 25px;
        }
      }
      .modal-foot {
        padding: 20px 30px;
        text-align: right;
      }
    }
  }
</style>
