<template>
  <div style="display: inline-block;vertical-align: bottom;width:100%">
    <div id="pole" ref="pole">
      <span v-for="(point,index) in processPosition" :style="pointPosition(point)" class="points-style"
            :class="{active:pointActive(index)}">
        <label class="points">{{innerPoints[index]+unit}}</label>
      </span>
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
      return {}
    },
    methods: {
      // 断点占据百分比的位置，注意：point是该断点离上一个断点的位置
      pointPosition(point){
        // console.log(point)
        let position = point / (this.max - this.min) * 100 + '%'
        return {width: position}
      },
      pointActive(index){
        return this.value >= this.innerPoints[index]
      },
      // 触发change事件
      refresh(){
        this.$emit('change')
      },
      // 双向绑定触发事件
      setValue(value){
        this.$emit('input', value)
      }
    },
    computed: {
      $sliderSize(){
        return this.$refs.pole.clientWidth
      },
      innerPoints(){
        // 去除一些明显不可能的断点
        var innerPoints = this.points.filter(item => {
          return item > this.min && item < this.max
        })
        // 最大值必须加上断点
        innerPoints.push(this.max)
        return innerPoints
      },
      processPosition(){
        // 每个断点距离前一个断点的距离
        return this.innerPoints.map((value, index, arr) => {
          if (index) {
            return value - arr[index - 1]
          }
          return value - this.min
        })
      }
    },
    components: {
      'slider': slider
    }
  }
</script>
<style scoped>
  #pole {
    width: 100%;
    height: 28px;
    position: relative;
    font-size: 0px;
    user-select: none;
  }

  .active {
    color: white;
  }

  .points-style {
    background: #f5f5f5;;
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
    border-radius: 0px 1px 1px 0px;
  }

  span:first-of-type {
    border-left: 1px solid rgb(221, 221, 221);
    border-radius: 1px 0px 0px 1px;
  }

  .points {
    position: absolute;
    z-index: 100;
    right: 8px;
    padding-left: 8px;
    line-height: 26px;
    font-size: 12px;
  }

  .last {
    right: 8px;
  }
</style>
