/**
 * Created by yunrui001 on 2018-01-12.
 */
import modal from './src/modal.vue'
import Vue from 'vue'

function message(options) {

}

message.error = function (options = {}) {
  options.type = 'error'
  var instance = getInstance()
  instance.show(options)
}

message.confirm = function (options = {}) {
  options.type = 'confirm'
  var instance = getInstance(options)
  instance.show(options)
}

let modalInstance

function getInstance(options) {
  modalInstance = modalInstance || new Vue({
      render: (h) => {
        return h(modal)
      }
    })
  modalInstance.$mount()
  document.body.appendChild(modalInstance.$el)
  return {
    show (options) {
      modalInstance.$children[0].visible = true
      modalInstance.$children[0].type = options.type
      modalInstance.$children[0].content = options.content
    },
    remove () {
      modal.visible = false
    }
  }
}

export default message
