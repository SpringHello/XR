/**
 * Created by yunrui001 on 2018-01-12.
 */
import modal from './src/modal.vue'
import Vue from 'vue'
import router from '../../router'
function message(options) {

}
// 名称与路径的Map
var namePathMap = {
  'NAT网关': 'vpc',
  '回收站': 'recycle',
  '防火墙': 'firewall',
  '虚拟私有云VPC': 'vpc',
  '弹性IP': 'ip',
  '负载均衡': 'balance',
  '虚拟专网VPN': 'vpn',
  '云硬盘': 'disk',
  '云硬盘备份': 'diskBackup',
  '云主机': 'host',
  '云主机快照': 'snapshot',
  '云主机镜像': 'mirror',
  '用户中心': 'userCenter',
  '工单': 'work'
}
message.error = function (options = {}) {
  options.type = 'error'
  options.title = options.title || '错误'
  var instance = getInstance(options)
  instance.show(options)
}

message.confirm = function (options = {}) {
  options.type = 'confirm'
  options.title = options.title || '确认'
  var instance = getInstance(options)
  instance.show()
}

message.info = function (options = {}) {
  options.type = 'info'
  options.title = options.title || '信息'
  var instance = getInstance(options)
  // instance.show()
}

let modalInstance

function getInstance(options) {
  modalInstance = new Vue({
    data: {
      type: '',
      content: '',
      cancelText: '取消',
      onCancel: '',
      okText: '确定'
    },
    render: (h) => {
      var contentArray = options.content.split(/\<a\>(.+?)\<\/a\>/)
      var result = []
      for (let i = 0; i < contentArray.length; i++) {
        if (i % 2 == 0) {
          result.push(contentArray[i])
        } else {
          result.push(h('a', {
            on: {
              click: () => {
                modalInstance.$children[0].visible = false
                router.push(namePathMap[contentArray[i]])
              }
            }
          }, contentArray[i]))
        }
      }
      return h(modal, {
        props: options
      })
    }
  })
  modalInstance.$mount()
  document.body.appendChild(modalInstance.$el)
  return {
    show () {
      modalInstance.$children[0].visible = true
    },
    remove () {
      modal.visible = false
    }
  }
}

export default message
