
var echarts = require('echarts/lib/echarts')
require("echarts/lib/component/legend")
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
        },
      formatter: "{a} <br/>{b} : {c}MB"
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['---', '---', '---', '---', '---', '---', '---'],
        axisLabel: {
          shadowColor: '#2791E5',
        }
    },
    yAxis: {
        axisLabel: {
            formatter: '{value}MB'
        },
        max: function(value) {
          if(value/ 1024 >1){
            return value / 1024;
          }else {
            return value;
          }
        }
    },
    series: [
        {
            name: '下载流量',
            type: 'line',
            stack: '总量',
            clipOverflow:true,
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
            data: [0, 0, 0, 0, 0, 0, 0]
        },
    ]
}
