<template>
  <div>
    <div class="com-slider-active" :style="sliderActive"></div>
    <div
      class="com-slider-button"
      :style="styleWrapper"
      :class="{hover:hovering,dragging:dragging}"
      @mousedown="handleMouseDown"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'COMSlider',
    props: [
      'points',
      'unit',
      'value',
      'step'
    ],
    data(){
      return {
        hovering: false,
        dragging: false,
        startX: 0,
        currentX: 0,
        startPosition: 0,
        oldValue: this.value
      }
    },
    computed: {
      min(){
        return this.$parent.min
      },
      max(){
        return this.$parent.max
      },
      styleWrapper(){
        return {left: this.currentPosition}
      },
      sliderActive(){
        return {width: this.currentPosition}
      },
      currentPosition(){
        return `${(this.oldValue - this.min) / (this.max - this.min) * 100}%`
      }
    },
    methods: {
      handleMouseEnter(){
        this.hovering = true
      },
      handleMouseLeave(){
        this.hovering = false
      },
      handleMouseDown(event){
        event.preventDefault()
        this.startX = event.clientX
        this.startPosition = parseFloat(this.currentPosition)
        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('mouseup', this.DraggingEnd)
      },
      onDragging: function (event) {
        this.currentX = event.clientX
        let diff = (this.currentX - this.startX) / this.$parent.$sliderSize * 100
        let newPosition = this.startPosition + diff
        this.setPosition(newPosition)
        this.$emit('refresh')
      },
      DraggingEnd: function () {
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.DraggingEnd)
      },
      setPosition (newPosition) {
        if (newPosition > 100) {
          newPosition = 100
        }
        if (newPosition < 0) {
          newPosition = 0
        }
        this.oldValue = parseInt((newPosition / 100) * (this.max - this.min)) + this.min
        this.oldValue = Math.round(this.oldValue / this.step) * this.step
        this.$emit('setValue', this.oldValue)
      }
    },
    watch: {
      value(){
        this.oldValue = this.value
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com-slider-button {
    width: 14px;
    height: 40px;
    border-radius: 1px;
    background-color: #2b99f2;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    z-index: 101;
    &::before {
      content: '';
      width: 2px;
      height: 15px;
      background-color: #fff;
      display: block;
      position: absolute;
      top: 50%;
      left: 4px;
      transform: translateY(-50%);
    }
    &::after {
      content: '';
      width: 2px;
      height: 15px;
      background-color: #fff;
      display: block;
      position: absolute;
      top: 50%;
      right: 4px;
      transform: translateY(-50%);
    }
  }

  .hover {
  }

  .com-slider-active {
    border: 1px solid #2A99F2;
    border-right: none;
    position: absolute;
    border-radius: 1px 0px 0px 1px;
    height: 100%;
    left: 0px;
    top: 0px;
    background: #ADD8F7;
  }

</style>
