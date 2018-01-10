/**
 * Created by yunrui001 on 2017-09-11.
 */
export default{
  color: ['#3dbd7d', '#2a99f2'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  toolbox: {
    // y: 'bottom',
    feature: {
      saveAsImage: {
        pixelRatio: 2
      }
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
  }
  ,
  yAxis: [
    {
      type: 'value',
      name: '',
      axisLabel: {
        formatter: '{value} kb/s'
      },
    }
  ],
  series: [
    {
      name: '弹性IP弹性流量流入(kb/s)',
      type: 'bar',
      data: []
    },
    {
      name: '弹性IP弹性流量流出(kb/s)',
      type: 'bar',
      data: []
    }
  ]
};
