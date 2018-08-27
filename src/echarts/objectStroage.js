
// var echarts = require('echarts/echarts.all.js');

// function renderItem(params,api){
//   return{
//     type:'line',
//     shape:echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//       offset: 0,
//       color: '#2A99F2'
//     }, {
//       offset: 1,
//       color: '#ffe'
//     }]),
//     style:api.style()
//   }
// }


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
      formatter: "{a}<br>{b} : {c}MB",
      // formatter: function (params) {
      //    return
      // }
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
           formatter: "{value}MB",
           //  formatter:function (value){
           //    if(value / 1024 < 1){
           //      return value+'b';
           //    }else if(value / 1048576 <1){
           //      return (value/1024).toFixed(2)+'kb';
           //    } else if(value / 1073741824<1){
           //      return (value / 1048576).toFixed(2)+'mb';
           //    }else {
           //      return (value / 1073741824).toFixed(2)+'Gb';
           //    }
           //    return value+'b';
           //  }
         },
      // max:1073741824
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
            data: [0, 0, 0, 0, 0, 0, 0]
        },
    ]
}
