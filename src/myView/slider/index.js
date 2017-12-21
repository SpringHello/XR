import slider from './src/main.vue';

slider.install = function(Vue){
    Vue.component(slider.name,slider)
}

export default slider;