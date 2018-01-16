var echarts = require('echarts/lib/echarts')
export default {
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  toolbox: {
    // y: 'bottom',
    feature: {
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {show: false},
    boundaryGap: false,
    data: []
  },
  grid: {
    left: '0%',
    right: '2%',
    bottom: '0%',
    top: '5%',
    containLabel: true
  },
  yAxis: {
    name: '',
    axisLabel: {
      formatter: '{value}%'
      // formatter: function (value, index) {
      //  var texts = value * 100 + '----'
      //  return texts
      //  }
    },
    max: 100
  },
  series: [
    {
      type: 'line',
      name: '使用率(%)',
      lineStyle: {
        normal: {
          color: '#2A99F2'
        }
      },
      itemStyle: {
        normal: {
          color: '#2A99F2'
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(65,155,249)'
          }, {
            offset: 1,
            color: 'rgb(254,254,255)'
          }])
        }
      },
      data: []
    }
  ]
}
