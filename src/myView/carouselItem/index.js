import carouselItem from '../carousel/src/item.vue'

carouselItem.install = function (Vue) {
  Vue.component(carouselItem.name, carouselItem)
}

export default carouselItem
