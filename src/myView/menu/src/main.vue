<template>
  <div style="display: flex">
    <div style="width:160px;">
      <div style="height:38px;background-color: #1B2940"></div>
      <ul>
        <li v-for="item in items">
          <div class="mainTitle" @click="toggleMain(item)">{{item.mainName}}</div>
          <ul v-if="openedMain.includes(item.type)">
            <li v-for="sub in item.subItem" class="subTitle" @click="go(sub)">
              {{sub.subName}}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <transition name="slide">
      <div class="thr-header" v-show="thrMenu">
        <div class="wrapper">
          <div class="operate">
            <ul>
              <li v-for="(thr,sIndex) in thrMenu" :key="sIndex">
                {{thr.thrName}}
              </li>
            </ul>
          </div>
          <div style="clear:right"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'my-menu',
    props: {
      items: {
        type: Array,
        default: []
      },
      accordion: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        // 三级Menu列表
        thrMenu: undefined,
        // 已打开的Main
        openedMain: []
      }
    },
    mounted(){

    },
    methods: {
      // 切换Main状态
      toggleMain(item){
        if (this.accordion) {
          this.openedMain = [item.type]
        } else {
          if (this.openedMain.indexOf(item.type) > -1) {
            this.openedMain.splice(this.openedMain.indexOf(item.type), 1)
          } else {
            this.openedMain.push(item.type)
          }
        }

      },
      go(sub){
        this.thrMenu = sub.thrItem || undefined
      }
    },
    watch: {}
  }

</script>

<style rel="stylesheet/less" lang="less" scoped>
  .mainTitle {
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    background-color: #22344D;
    font-size: 14px;
    color: rgba(163, 186, 204, 1);
    line-height: 14px;

  }

  .subTitle {
    padding: 14px 24px;
    background-color: #142133;
    font-size: 14px;
    color: rgba(163, 186, 204, 1);
    line-height: 14px;
    cursor: pointer;
    &:hover {
      background-color: #2A99F2;
      color: #fff;
    }
    .thr {
      top: 0px;
      right: 0px;
    }
  }

  .thr-header {
    li {
      color: rgba(163, 186, 204, 1);
      padding: 14px 24px;
      background-color: #262F38;
      width: 160px;
    }
  }

  .slide-enter-active {
    transition: all .3s;
  }

  .slide-leave-active {
    transition: all .3s;
  }

  .slide-enter {
    width: 0px;
  }

  .slide-leave-to {
    width: 0px;
  }
</style>
