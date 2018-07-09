<template>
  <div style="display: flex">
    <div>
      <div style="height:38px;background-color: #1B2940"></div>
      <ul>
        <li v-for="item in items">
          <div class="mainTitle">{{item.mainName}}</div>
          <ul>
            <li v-for="sub in item.subItem" class="subTitle">
              {{sub.subName}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <ul v-if="sub.thrItem" class="thr">
        <li v-for="thr in sub.thrItem">
          {{thr.thrName}}
        </li>
      </ul>
    </div>
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
      return {}
    },
    mounted(){

    },
    methods: {},
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
</style>
