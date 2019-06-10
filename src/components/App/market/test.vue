<template>
    <div id="mtest">
        <div class="scroll">
            <img src="../../../assets/img/market/left.png" class="left" @click="left"/>
            <img src="../../../assets/img/market/right.png" class="right" @click="right"/>
            <div class="scroll-item">
               <div class="item">
                   <div v-for="(item,index) in tests">{{item}}</div>
               </div>
            </div>
        </div>
    </div>
</template>

<script script type="text/ecmascript-6">
export default {
  data () {
    return {
      tests:['1','2','3','4','5','6','7','8'],
      distance: 0
    }
  },
  methods: {
    right (e) {
      // 获取显示宽度
      let sumDistance = this.tests.length * 280 - 4*280
      if (this.distance < sumDistance) {
        this.distance += 307
        document.querySelector('.item').style.transform = 'translateX(-'+ this.distance +'px)'
      }
    },
    left (e) {
      if (this.distance > 0) {
        this.distance -= 307
        document.querySelector('.item').style.transform = 'translateX(-'+ this.distance +'px)'
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .scroll {
        width: 1200px;
        margin: 100px auto;
        position: relative;
        img {
            width: 70px;
            height: 70px;
            display: block;
            position: absolute;
        }
        .left {
            top: 40%;
            left: -90px;
        }
        .right {
            top: 40%;
            right: -90px;
        }
        .scroll-item {
            width: 1200px;
            overflow: hidden;
          .item {
              white-space: nowrap;
              transition: 0.5s;
              div {
                  display: inline-block;
                  width: 280px;
                  height: 250px;
                  background: #2A99F2;
                  margin-right: 27px;
              }
          }
        }
    }
</style>