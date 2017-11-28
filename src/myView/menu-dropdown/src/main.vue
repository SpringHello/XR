<template>
  <div :class="[prefixCls]">
    <div :class="[`${prefixCls}-rel`]">
      <slot></slot>
    </div>
    <transition name="transition">
      <div :class="[`${prefixCls}-list`]">
        <slot name="list"></slot>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  const prefixCls = 'menu-dropdown'
  export default{
    name: 'menuDropdown',
    data () {
      return {
        prefixCls
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .menu-dropdown {
    .menu-dropdown-rel{
      a{
        color:#ffffff;
        cursor:pointer;
        padding:0px 30px;
        display: block;
      }
    }
    .menu-dropdown-list {
      position:absolute;
      width:100%;
      opacity: 0.96;
      background: #333333;
      top:100%;
      left:0
    }
  }
</style>
