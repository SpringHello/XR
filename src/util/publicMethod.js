/**
 * Created by yunrui001 on 2017-10-20.
 */
function initRecycle() {
  this.$http.get('information/listRechargeCount.do').then(response => {
    if (response.status == 200 && response.data.status == 1) {
      this.$store.commit('setRechargeCount', response.data.result)
    }
  })
}

function initMsg() {
  this.$http.get('user/getEventNum.do?isRead=0').then(res => {
    if (res.status == 200 && res.data.status == 1) {
      this.$store.commit('setMsg', res.data.number)
    }
  })
}

export {initRecycle, initMsg}
