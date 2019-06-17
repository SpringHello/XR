export default {
  // title: {
  //   text: '折线图堆叠'
  // },
  tooltip: {
    trigger: 'axis'
  },
  // legend: {
  //   data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  // },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '5%',
    containLabel: true
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
    splitLine: {
      show: false
    },
    // boundaryGap: false,
    data: [],
    // axisTick: {
    //   alignWithLabel: true
    // }
    axisLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: 'rgba(17,17,17,0.65)'
      }
    }
  },
  yAxis: {
    type: 'value',
    min: 100,
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: 'rgba(17,17,17,0.65)'
      }
    },
  },
  color: ['#FFE777', '#BFE0FB', '#2A99F2', '#6CC0B5'],
  series: []
}
