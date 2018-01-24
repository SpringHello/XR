/**
 * Created by yunrui001 on 2018-01-12.
 */
import modal from './src/modal.vue'
import Vue from 'vue'

function message(options) {

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
  instance.show()
}

let modalInstance

function getInstance(options) {
  modalInstance = modalInstance || new Vue({
      data: {
        type: '',
        content: '',
        cancelText: '取消',
        onCancel: '',
        okText: '确定'
      },
      render: (h) => {
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
