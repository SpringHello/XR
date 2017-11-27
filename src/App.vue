<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul>
            <li v-for="(item,index) in titleItem" :key="index" @mouseenter="ME(index,$event)">{{item.title}}</li>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
        <div class="login-form">
        </div>
      </div>
      <div class="content-dropdown" @mouseleave="UML">
        <div class="content" v-for="(item,index) in titleItem" :key="index" ref="content">
          <div v-if="item.content" class="column">
            <div v-for="(prod,index) in item.content">
              <h2>{{prod.prod}}</h2>
              <div v-for="(i,index) in prod.prodItem">
                <a href="i.href">{{i.title}}</a>
                <p>{{i.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  // import debounce from 'throttle-debounce/debounce'
  export default {
    name: 'app',
    data () {
      return {
        titleItem: [
          {title: '首页'},
          {
            title: '产品',
            content: [
              {
                prod: '云计算', prodItem: [
                {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                {title: '裸金属服务器', desc: '专属物理服务器'},
                {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
              ]
              },
              {
                prod: '运网络', prodItem: [
                {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                {title: '裸金属服务器', desc: '专属物理服务器'},
                {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
              ]
              },
              {
                prod: '云计算', prodItem: [
                {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                {title: '裸金属服务器', desc: '专属物理服务器'},
                {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
              ]
              },
              {
                prod: '云计算', prodItem: [
                {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                {title: '裸金属服务器', desc: '专属物理服务器'},
                {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
              ]
              },
              {
                prod: '云计算', prodItem: [
                {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                {title: '裸金属服务器', desc: '专属物理服务器'},
                {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
              ]
              }
            ]
          },
          {title: '价格'},
          {title: '文档'},
          {title: '关于我们'}
        ], // banner item
        currentItem: -1, // 当前选中item  默认为-1(未选中)
        lineStyle: {
          width: '0px',
          left: '0px',
          transition: 'width .3s'
        } // line的width和left属性
      }
    },
    created () {
    },
    methods: {
      /* li mouseenter事件 重新设置line样式 */
      ME (index, event) {
        this.currentItem === -1 ? this.lineStyle.transition = 'width .3s' : this.lineStyle.transition = 'all .3s'
        this.lineStyle.left = `${event.target.offsetLeft}px`
        this.lineStyle.width = `${event.target.clientWidth}px`
        this.currentItem = index
      },
      /* ul mouseleave事件 设置line宽度为0 动画样式width */
      UML () {
        this.currentItem = -1
        this.lineStyle.width = '0px'
      }
    },
    computed: {},
    watch: {
      currentItem () {
        var content = this.$refs.content
        for (var i in content) {
          if (i == this.currentItem) {
            // content[i].style.display = 'block'
            content[i].style.height = `${content[i].firstChild.clientHeight}px`
          } else {
            // content[i].style.display = 'none'
            content[i].style.height = '0px'
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    header {
      width: 100%;
      height: 70px;
      position: relative;
      &::before {
        content: '';
        height: 70px;
        width: 100%;
        //height: 0px;
        display: block;
        position: absolute;
        background-color: #333333;
        transition: height .2s;
        z-index: -1;
      }
      &:hover {
        &::before {
          height: 70px;
        }
      }
      .wrapper {
        width: 1200px;
        height: 70px;
        margin: 0px auto;
        display: flex;
        .logo {
          width: 140px;
          height: 70px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/logo.gif) no-repeat 50%;
            background-size: cover;
          }
        }
        .operate {
          width: 920px;
          text-align: center;
          ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            position: relative;
            li {
              line-height: 70px;
              padding: 0px 30px;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              cursor: pointer;
            }
            .line {
              height: 3px;
              background-color: rgb(0, 193, 222);
              position: absolute;
              bottom: 0px;
            }
          }
        }
      }
      .content-dropdown {
        position: absolute;
        top: 100%;
        width: 100%;
        opacity: 0.96;
        background: #333333;
        color: #ffffff;

        .content {
          width: 1200px;
          margin: 0px auto;
          height: 0px;
          transition: height .3s;
          overflow: hidden;
          .column{
            display: flex;
            padding:26px 0px;
            justify-content: space-between;
            > div{
              width:20%;
            }
            h2{
              font-size: 18px;
              color: #FFFFFF;
              line-height: 32px;
              font-weight: normal;
              border-bottom: 1px solid #E0E0E0;
            }
            a{
              margin-top: 10px;
              display: inline-block;
              font-size: 14px;
              color: #FFFFFF;
              line-height: 25px;
            }
            p{
              font-size: 12px;
              color: #999999;
              line-height: 21px;
            }
          }
        }

      }
    }
  }
</style>
