
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
        },
      formatter: "{a} <br/>{b} : {c}"
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
      show:true,
        feature: {
            saveAsImage: {pixelRatio: 2}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['---', '---', '---', '---', '---', '---', '---']
    },
    yAxis: {
        axisLabel: {
            formatter: '{value}'
        },
      minInterval: 1,
      max:function(value){
        console.log(value);
        return value.max -20;
      }
    },
    series: [
        {
            name: '请求次数',
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
            data: [0, 0, 0, 0, 0, 0, 0]
        },
    ]
}
