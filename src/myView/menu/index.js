/**
 * Created by yunrui001 on 2018-07-09.
 */
import menu from './src/main.vue'

menu.install = function (Vue) {
  Vue.component(menu.name, menu)
}

export default menu
