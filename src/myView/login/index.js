/**
 * Created by yunrui001 on 2018-09-11.
 */
import Vue from 'vue'
import LR from './LR.vue'
export default function login(options) {
  const vm = new Vue({

    render(h){
      return h(LR, {
        props: {
          type: options.type
        },
      })
    }
  })
  const component = vm.$mount()
  document.body.appendChild(component.$el)
}
