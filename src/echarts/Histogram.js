/**
 * Created by yunrui001 on 2017-09-11.
 */
export default{
  color: ['#3398DB'],
  toolbox: {
    // y: 'bottom',
    feature: {
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      },
      max:100,
    }
  ],
  series: [
    {
      name: '使用率(%)',
      type: 'bar',
      barWidth: '60%',
      data: []
    }
  ]
};
