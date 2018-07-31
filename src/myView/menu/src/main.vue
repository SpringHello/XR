<template>
  <div style="display: flex;margin-right: 10px;">
    <div style="width:160px;position: relative;background-color: #142133;" :class="{close:!opened}">
      <div style="height:38px;background-color: #1B2940;text-align: center;" @click="toggleHidden">
        <div class="sider">
          <Icon class="rotate" :class="{rotate_icon:!opened}" type="navicon-round" size="26" color="#FFFFFF"></Icon>
        </div>
      </div>
      <ul>
        <div>
          <div class="regionTitle" @click="region = !region">
            <span>{{opened?zoneName:''}}</span>
            <div v-if="opened" :class="{act:!region}"></div>
          </div>
          <ul>
            <li class="subTitle" v-show="region"   v-for="item in zoneList" @click="regionSelect(item.zoneid)">{{item.zonename}}</li>
          </ul>
        </div>

        <li v-for="item in items" class="house">
          <div class="mainTitle" @click="toggleMain(item)" >
            <span :class="{act:openedMain.includes(item.type)}">{{opened?item.mainName:''}}</span>
          </div>
          <ul v-if="openedMain.includes(item.type)">
            <li v-for="sub in item.subItem" @click="jump(sub.type)"  class="subTitle" @mouseenter="go(sub)" @mouseleave="leave(sub)">
              <Tooltip v-if="!opened" :content="sub.subName"  placement="right" style="z-index: 99999;">
                <svg class="icon" aria-hidden="true" style="width:28px;height:28px;vertical-align: middle;">
                  <use :xlink:href="sub.icon"></use>
                </svg>
              </Tooltip>

              <div v-if="opened">
                <svg class="icon" aria-hidden="true" style="width:28px;height:28px;vertical-align: middle;">
                  <use :xlink:href="sub.icon"></use>
                </svg>
                <span v-show="opened" style="vertical-align: middle">{{sub.subName}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <transition name="slide">
        <div class="thr-header" :class="{closeThr:!opened}" ref="thr" @mouseenter="static=true" @mouseleave="_leave">
          <div class="wrapper">
            <div class="operate">
              <ul>
                <li style="font-size: 18px;color: #FFFFFF;">{{subItem}}</li>
                <li v-for="(thr,sIndex) in thrMenu" :key="sIndex" style="cursor: pointer" class="house" @click="jumpList(thr)">
                  {{thr.thrName}}
                </li>
              </ul>
            </div>
            <div style="clear:right"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from  'axios'
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
      },
      changeRgion:{
        type:Function
      }
    },
    data(){
      return {
        // 三级Menu列表
        thrMenu: undefined,
        //二级
        subItem:undefined,
        // 已打开的Main
        openedMain: [],
        static: false,
        // 主menu是否打开
        opened: true,
        //区域
        region:false,
        zoneName:this.$store.state.zone.zonename,
        zoneList:this.$store.state.zoneList
      }
    },
   created(){
    this.go();
  },
    methods: {
      toggleHidden(){
          this.opened = !this.opened;
      },
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
        setTimeout(() => {
          if (sub && sub.thrItem) {
            this.subItem = sub.subName;
            this.thrMenu = sub.thrItem
            this.$refs['thr'].style.width = '160px'
          } else {
            this.subItem = undefined;
            this.thrMenu = undefined
            this.$refs['thr'].style.width = '0px'
          }
        }, 0)
      },
      leave(){
        setTimeout(() => {
          if (!this.static) {
            this.thrMenu = undefined
            this.$refs['thr'].style.width = '0px'
          }
        }, 0)
      },
      _leave(){
        this.static = false
        setTimeout(() => {
          this.$refs['thr'].style.width = '0px'
        }, 0)
      },
      jump(src){
        if(src.substring(0,5) === 'https')
          window.open(src);
        else
        this.$router.push({path:src});
      },
      jumpList(thr){
        if(thr.pane.substring(0,5) === 'https')
          window.open(thr.pane);
        else
          this.$router.push({path:thr.pane});
      },
      regionSelect(zoneId){
        axios.get('user/setDefaultZone.do', {params: {zoneId: zoneId}}).then(response => {
        })
        for (var zone of this.zoneList) {
          if (zone.zoneid == zoneId) {
            this.$store.commit('setZone', zone);
          }
        }
        this.region = false;
      }
    },
    watch: {
      '$store.state.zone':{
        handler:function(){
          this.zoneName = this.$store.state.zone.zonename;
        }
      }
    }
  }

</script>

<style rel="stylesheet/less" lang="less" scoped>
  .house:hover{
      color: #FFFFFF;
  }
  .regionTitle{
    padding: 14px 18px;
    position: relative;
    cursor: pointer;
    background-color: #22344D;
    font-size: 14px;
    color: rgba(163, 186, 204, 1);
    line-height: 14px;
    span {
      &:before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 19px;
        background-image: url("../../../assets/img/back/zoneIcon.png");
        margin-right: 12px;
      }
    }
    div{
      display: inline-block;
      &:after{
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: translateY(2px) rotate(135deg);
        transition: ease-in all 0.2s;
        margin-left: 12px;
      }
      &.act {
        &:after {
          transform: translateY(-3px) rotate(-45deg);
        }
      }
    }
    &:hover{
      color:#FFFFFF;
    }
  }
  .mainTitle {
    padding: 14px 20px;
    position: relative;
    cursor: pointer;
    background-color: #22344D;
    font-size: 14px;
    color: rgba(163, 186, 204, 1);
    line-height: 14px;
    span {
      &:before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transition: ease-in all 0.3s;
        transform: translateY(-3px) rotate(-45deg);
        margin-right: 12px;
      }
      &.act {
        &:before {
          transform: translateY(2px) rotate(135deg);
        }
      }
    }
  }
  .mainTitle:hover{
      color: #FFFFFF;
  }


  .subTitle {
    padding: 14px 10px;
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
    position: absolute;
    left: 160px;
    top: 0px;
    overflow: hidden;
    transition: width .25s;
    bottom: 0px;
    background-color: #262F38;
    z-index: 99999;
    li {
      color: rgba(163, 186, 204, 1);
      padding: 14px 24px;
      background-color: #262F38;
      width: 160px;
    }
  }

  .closeThr {
    left: 48px;
  }

  .close {
    width: 48px !important;
    .subTitle {
      padding: 14px 10px;
    }
  }
  .arrow{
    position:absolute;
    top:5px;
    left:-17px;
    width:0;
    height:0;
    font-size:0;
    border:solid 8px;
    border-color:transparent rgba(70,76,91,.9) transparent transparent;
  }
  .sider{
    padding: 6px;
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
  .rotate{
    transition: ease-in-out all 0.2s;
  }
  .rotate_icon{
    transform: rotate(-90deg);

  }
</style>
