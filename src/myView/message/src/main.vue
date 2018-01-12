<template>
  <transition name="fade">
    <div v-if="show">
      <div class="mask"></div>
      <div class="modal-wrapper">
        <Notice :type="type" :content="content">
        </Notice>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Notice from './notice.vue'
  export default{
    data() {
      return {
        show: true
      }
    },
    props: {
      type: {
        type: String,
        default: 'error'
      },
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      close(){
        this.show = false
      }
    },
    components: {
      Notice,
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-to {
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
    z-index: 1000;
  }
</style>
