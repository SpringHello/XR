<template>
  <div class="modal">
    <header>
      <div>
        <i class="orange f24 mr10 ivu-icon ivu-icon-close-circled"></i>
        <p>{{content}}</p>
      </div>
    </header>
    <div class="modal-footer">
      <Button type="primary" @click="closeModal">确定</Button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      content: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    methods: {
      closeModal(){
        this.$parent.close()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .modal {
    position: relative;
    top: 100px;
    width: 280px;
    margin: 0px auto;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    header {
      padding-bottom: 20px;
      div {
        display: flex;
        padding: 10px 10px 0px;
        p {
          font-size: 14px;
          line-height: 24px;
          color: #666666;
        }

      }
    }
    .modal-footer {
      text-align: right;
    }
  }
</style>
