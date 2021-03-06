
var echarts = require('echarts/lib/echarts')
export default {


  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#000000',
        opacity: 0.5,
        type: 'dashed'
      },
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
    },
  series: [
    {
      name: 'CPU利用率',
      type: 'line',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#2A99F2'
        }
      },
      areaStyle: {normal: {  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#2A99F2'
          }, {
            offset: 1,
            color: '#ffe'
          }])}},
      data: []
    },
  ],
}
