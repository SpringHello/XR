<template>
  <div style="display: inline-block;vertical-align: bottom;width:100%">
    <div id="pole" ref="pole">
      <span v-for="(point,index) in processPosition" :style="pointPosition(point)" class="points-style"
            :class="{active:processPosition.slice(0,index+1).reduce(function(sum, v) {return sum + v;}, 0)<=value-min}"><label
        class="points">{{showPoints[index+filterStep]+unit}}</label></span>
      <slider
        :value="value"
        @refresh="refresh"
        @setValue="setValue"
        :step="step"
      >
      </slider>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import slider from './button.vue'
  export default{
    name: 'i-slider',
    props: {
      value: {
        type: Number,
        default: 0
      },
      points: {
        type: Array,
        default: function () {
          return []
        }
      },
      unit: {
        type: String,
        default: ''
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      }
    },
    data(){
      return {
        showPoints: this.points,
        filterStep: 0
      }
    },
    components: {
      'slider': slider
    },
    methods: {
      pointPosition(point){
        let position = point / (this.max - this.min) * 100 + '%'
        return {width: position}
      },
      refresh(){
        this.$emit('change')
      },
      setValue(value){
        this.$emit('input', value)
      }
    },
    computed: {
      $sliderSize(){
        return this.$refs.pole.clientWidth
      },
      processPosition(){
        var points = this.points.slice()
        points.push(this.max)
        var length = points.length
        points = points.filter(item => {
          return item > this.min
        })
        this.filterStep = length - points.length
        return points.map((value, index, arr) => {
          if (index)
            return value = value - arr[index - 1]
          return value - this.min
        })
      }
    }
  }
</script>
<style scoped>
  #pole {
    width: 100%;
    height: 16px;
    position: relative;
    font-size: 0px;
  }

  .active {
    color: white;
  }

  .points-style {
    background: #EFEFEF;;
    height: 100%;
    text-align: right;
    font-size: 16px;
    line-height: 90%;
    display: inline-block;
    border-top: 1px solid rgb(221, 221, 221);
    border-left: 1px solid rgb(221, 221, 221);
    border-bottom: 1px solid rgb(221, 221, 221);
    position: relative;
  }

  span:last-of-type {
    border-right: 1px solid rgb(221, 221, 221);
    border-radius: 0px 100px 100px 0px;
  }

  span:first-of-type {
    border-left: 1px solid rgb(221, 221, 221);
    border-radius: 100px 0px 0px 100px;
  }

  .points {
    position: absolute;
    z-index: 100;
    right: 5px;

    font-size: 10px;
  }
</style>
