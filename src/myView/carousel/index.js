import carousel from './src/main.vue'

carousel.install = function (Vue) {
  Vue.component(carousel.name, carousel)
}

export default carousel
