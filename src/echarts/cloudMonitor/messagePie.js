export default {
    title: {
      text: '当月短信剩余配额',
      textStyle: {
        color: '#666666',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14
      },
      x: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: [],
      y: 60,
      itemGap: 23,
      itemWidth: 16,
      itemHeight: 16,
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
    },
    textStyle: {
      color: 'black'
    },
    lineStyle: {
      color: 'red'
    },

    series: [{
      type: 'pie',
      radius: '55%',
      center: ['74%', '55%'],
      color: ['#FFE777', '#BFE0FB', '#2A99F2', '#6CC0B5'],
      label: {
        normal: {
          show: false,
          textStyle: {
            fontSize: 12,
            color: '#666'
          }
        }
      },
      labelLine: {
        normal: {
          show: false,
        }
      },
      data: [

      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
}
