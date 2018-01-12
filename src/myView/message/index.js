/**
 * Created by yunrui001 on 2018-01-12.
 */
import main from './src/main.vue'
import Vue from 'vue'

function notice(type, content) {
  var vm = new Vue({
    render(h){
      return h(main, {props: {type, content}})
    }
  })
  document.body.appendChild(vm.$mount().$el)
}

export default notice

