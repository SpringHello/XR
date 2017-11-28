import menuDropdown from './src/main.vue'

menuDropdown.install = function (Vue) {
  Vue.component(menuDropdown.name, menuDropdown)
}

export default menuDropdown
