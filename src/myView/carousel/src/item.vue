<template>
  <div class="carousel-item" :class="{isActive:active,prevActive:prevActive,fadeOut:!active}"
       :style="{transform:`translateX(${translate}px)`}">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'my-carousel-item',
    data(){
      return {
        translate: 0,
        active: false,
        prevActive: false
      }
    },
    created(){

    },
    methods: {
      calculatePosition(index, activeIndex, total, parentWidth){
        this.prevActive = this.active
        this.active = index === activeIndex
        if (Math.abs(index - activeIndex) > 0) {
          if (index - activeIndex > 0) {
            this.translate = parentWidth
          } else {
            this.translate = -parentWidth
          }
        }
        if (activeIndex == total - 1 && index == 0) {
          this.translate = parentWidth
        }
        if (activeIndex == 0 && index == total - 1) {
          this.translate = -parentWidth
        }
        if (index == activeIndex) {
          this.translate = 0
        }
      },
      fade(index, activeIndex){
        this.active = index === activeIndex
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .carousel-item {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
    z-index: 1;
  }

  .isActive {
    z-index: 3
  }

  .prevActive {
    z-index: 2
  }

  .fadeOut {
    opacity: 0;
  }
</style>
