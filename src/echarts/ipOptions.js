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
    name: '',
    boundaryGap: false,
    splitLine: {show: false},
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
    // type: 'log',
    name: '',
    axisLabel: {
      formatter: '{value} kb/s'
    }
  },
  series: [
    {
      type: 'line',
      name: '弹性IP弹性流量流出(kb/s)',
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
    },
    {
      type: 'line',
      name: '弹性IP弹性流量流入(kb/s)',
      lineStyle: {
        normal: {
          color: '#3DBD7D'
        }
      },
      itemStyle: {
        normal: {
          color: '#3DBD7D'
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(61,189,125)'
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
