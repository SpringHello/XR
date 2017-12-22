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
      },
      DraggingEnd: function () {
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.DraggingEnd)
        this.$emit('refresh')
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

<style scoped>
  .com-slider-button {
    width: 8px;
    height: 30px;
    border-radius: 100px;
    background-color: #2A99F2;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    z-index: 101
  }

  .hover {
  }

  .com-slider-active {
    position: absolute;
    border-radius:100px 0px 0px 100px;
    height: 100%;
    left: 0px;
    top: 0px;
    background: #ADD8F7;
  }

</style>
