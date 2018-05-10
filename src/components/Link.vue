<template>
  <div style="height:100%">
    <iframe :src="linkURL" style="width:100%;height:100%"></iframe>
    <Modal v-model="confirm" width="360" :mask-closable="false" :closable="false">
      <p slot="header">
        <span>输入远程连接密码</span>
      </p>
      <div style="text-align:center">
        <Input v-model="password" placeholder="请输入远程连接密码" :maxlength="15"></Input>
      </div>
      <div slot="footer">
        <Button type="primary" @click="link">连接</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default{
    data(){
      return {
        linkURL: '',
        confirm: true,
        password: ''
      }
    },
    created(){
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    methods: {
      link(){
        if (this.password == '') {
          this.$Message.info({
            content: '请输入远程连接密码'
          })
          return
        }
        axios.get('information/judgeConnectCode.do', {
          params: {
            companyid: sessionStorage.getItem('link-companyid'),
            VMId: sessionStorage.getItem('link-vmid'),
            code: this.password,
            zoneId: sessionStorage.getItem('link-zoneid')
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.confirm = false
          } else {
            this.password = ''
            this.$Message.info({
              content: response.data.message
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
