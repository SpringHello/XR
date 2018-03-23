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
  'NAT网关': 'vpc'
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
                router.push(namePathMap[contentArray[i]])
              }
            }
          }, contentArray[i]))
        }
      }
      return h(modal, {
        props: options
      }, [h('p', result)])
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
