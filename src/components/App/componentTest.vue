<template>
  <div class="page">
    <slot name="header">默认头部</slot>
    <button @click="count++">{{count}}</button>
    <span>{{title11}}</span>
    <slot name="footer"></slot>
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      count: 0
    }
  },
  // props: ['title11'],
  props: {
    title11: {
      required: false,
      type: String,
      default: "awq",
    },
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
