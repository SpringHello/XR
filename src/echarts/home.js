import echarts from 'echarts'
var allData = {
  "moveLines": [
    {"fromName": "乙晓光", "toName": "重庆", "coords": [[118.296893, 33.952050], [106.54, 29.59]]},
    {"fromName": "丁来杭", "toName": "重庆", "coords": [[120.219375, 30.259244], [106.54, 29.59]]},
    {"fromName": "丁学东", "toName": "重庆", "coords": [[119.981861, 31.771397], [106.54, 29.59]]},
    {"fromName": "丁薛祥", "toName": "重庆", "coords": [[120.873801, 32.014665], [106.54, 29.59]]},
    {"fromName": "于伟国", "toName": "重庆", "coords": [[122.093958, 37.528787], [106.54, 29.59]]},
    {"fromName": "于忠福", "toName": "重庆", "coords": [[120.751343, 36.905533], [106.54, 29.59]]},
    {"fromName": "万立骏", "toName": "重庆", "coords": [[121.593478, 38.948710], [106.54, 29.59]]},
    {"fromName": "习近平", "toName": "重庆", "coords": [[109.235940, 34.879424], [106.54, 29.59]]},
    {"fromName": "马飚", "toName": "重庆", "coords": [[108.924274, 23.552255], [106.54, 29.59]]},
    {"fromName": "马兴瑞", "toName": "重庆", "coords": [[118.527663, 36.099290], [106.54, 29.59]]},
    {"fromName": "王宁", "toName": "重庆", "coords": [[122.406926, 37.128686], [106.54, 29.59]]},
    {"fromName": "王军", "toName": "重庆", "coords": [[115.641886, 34.438589], [106.54, 29.59]]},
    {"fromName": "王勇", "toName": "重庆", "coords": [[122.477327, 40.235441], [106.54, 29.59]]},
    {"fromName": "王晨", "toName": "重庆", "coords": [[116.395645, 39.929986], [106.54, 29.59]]},
    {"fromName": "王毅", "toName": "重庆", "coords": [[116.395645, 39.929986], [106.54, 29.59]]},
    {"fromName": "王小洪", "toName": "重庆", "coords": [[119.330221, 26.047125], [106.54, 29.59]]},
    {"fromName": "王玉普", "toName": "重庆", "coords": [[122.866418, 42.016776], [106.54, 29.59]]},
    {"fromName": "王正伟", "toName": "重庆", "coords": [[106.155481, 37.321323], [106.54, 29.59]]},
    {"fromName": "王东明", "toName": "重庆", "coords": [[124.934106, 40.766142], [106.54, 29.59]]},
    {"fromName": "王东峰", "toName": "重庆", "coords": [[108.953098, 34.277800], [106.54, 29.59]]},

    {"fromName": "王尔乘", "toName": "武汉", "coords": [[124.338543, 40.129023], [114.31, 30.52]]},
    {"fromName": "王志民", "toName": "福建师范大学", "coords": [[118.704626, 25.468258], [114.31, 30.52]]},
    {"fromName": "王志刚", "toName": "西北电讯工程学院", "coords": [[117.665965, 32.473259], [114.31, 30.52]]},
    {"fromName": "王沪宁", "toName": "复旦大学", "coords": [[116.325882, 39.828278], [114.31, 30.52]]},
    {"fromName": "王国生", "toName": "山东大学", "coords": [[116.283198, 36.331642], [114.31, 30.52]]},
    {"fromName": "王建军", "toName": "中央党校", "coords": [[110.801229, 32.636994], [114.31, 30.52]]},
    {"fromName": "王建武", "toName": "缺失", "coords": [[111.506791, 34.345208], [114.31, 30.52]]},
    {"fromName": "王晓东", "toName": "中央党校", "coords": [[114.981800, 25.286018], [114.31, 30.52]]},
    {"fromName": "王晓晖", "toName": "吉林大学", "coords": [[123.866504, 44.305645], [114.31, 30.52]]},
    {"fromName": "王家胜", "toName": "国防科学技术大学", "coords": [[123.172451, 41.273339], [114.31, 30.52]]},
    {"fromName": "王蒙徽", "toName": "清华大学", "coords": [[119.368489, 33.013797], [114.31, 30.52]]},
    {"fromName": "尤权", "toName": "中国人民大学", "coords": [[118.985564, 39.920978], [114.31, 30.52]]},
    {"fromName": "车俊", "toName": "中央党校", "coords": [[117.880490, 31.608733], [114.31, 30.52]]},
    {"fromName": "尹力", "toName": "国外院校", "coords": [[116.899595, 37.235893], [114.31, 30.52]]},
    {"fromName": "巴音朝鲁", "toName": "吉林大学", "coords": [[114.415868, 43.468238], [114.31, 30.52]]},
    {"fromName": "巴特尔", "toName": "复旦大学", "coords": [[123.273598, 42.765541], [114.31, 30.52]]},
    {"fromName": "艾力更·依明巴海", "toName": "西北轻工学院", "coords": [[76.368709, 38.800015], [114.31, 30.52]]},
    {"fromName": "石泰峰", "toName": "北京大学", "coords": [[112.954181, 37.140050], [114.31, 30.52]]},
    {"fromName": "布小林", "toName": "北京大学", "coords": [[114.415868, 43.468238], [114.31, 30.52]]},
    {"fromName": "卢展工", "toName": "哈尔滨建筑工程学院", "coords": [[121.338408, 30.189257], [114.31, 30.52]]},
    {"fromName": "白春礼", "toName": "中国科学院", "coords": [[123.346069, 40.403181], [114.31, 30.52]]},
    {"fromName": "吉炳轩　", "toName": "郑州大学", "coords": [[112.476996, 34.831148], [114.31, 30.52]]},
    {"fromName": "毕井泉", "toName": "中央党校", "coords": [[127.844490, 47.070366], [114.31, 30.52]]},
    {"fromName": "曲青山", "toName": "陕西师范大学", "coords": [[122.406926, 37.128686], [114.31, 30.52]]},
    {"fromName": "朱生岭", "toName": "解放军陆军指挥学院", "coords": [[120.563769, 32.791443], [114.31, 30.52]]},
    {"fromName": "刘奇", "toName": "西安交通大学", "coords": [[118.609358, 35.914369], [114.31, 30.52]]},
    {"fromName": "刘雷", "toName": "缺失", "coords": [[115.986869, 36.455829], [114.31, 30.52]]},
    {"fromName": "刘鹤", "toName": "中国人民大学", "coords": [[119.094621, 39.638021], [114.31, 30.52]]},
    {"fromName": "刘士余", "toName": "清华大学", "coords": [[119.392775, 34.406832], [114.31, 30.52]]},
    {"fromName": "刘万龙", "toName": "缺失", "coords": [[115.986869, 36.455829], [114.31, 30.52]]},
    {"fromName": "刘奇葆", "toName": "吉林大学", "coords": [[117.216005, 31.859252], [114.31, 30.52]]},
    {"fromName": "刘国中", "toName": "华东工程学院", "coords": [[128.047414, 47.356592], [114.31, 30.52]]},
    {"fromName": "刘国治", "toName": "清华大学", "coords": [[122.753592, 41.621600], [114.31, 30.52]]},
    {"fromName": "刘金国", "toName": "中央党校", "coords": [[119.094621, 39.638021], [114.31, 30.52]]},
    {"fromName": "刘结一", "toName": "北京外国语学院", "coords": [[116.395645, 39.929986], [114.31, 30.52]]},

  ]
};

export default{
  backgroundColor: '#f9f9f9',
  legend: {
    show: false,
    orient: 'vertical',
    top: 'bottom',
    left: 'right',
    data: ['地点', '线路'],
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: false,
    zoom: 1,
    itemStyle: {
      normal: {
        areaColor: '#377dff',
        borderColor: '#ffffff'
      },
      emphasis: {
        areaColor: '#377dff',
        borderColor: '#ffffff'
      },
    },
    regions: [{
      name: '湖北',
      itemStyle: {
        normal: {
          areaColor: '#f4e925',
          color: 'red'
        }
      }
    }]
  },
  series: [
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {name: '重庆', value: [106.54, 29.59, 100]},
        {name: '武汉', value: [114.31, 30.52, 100]},
        {name: '沈阳', value: [123.38, 41.8, 100]},
        {name: '北京', value: [116.46, 39.92, 100]}
      ],
      symbolSize: 10,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#ffffff',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1,
      silent: true
    },
    {
      name: '线路',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      large: true,
      effect: {
        show: true,
        constantSpeed: 30,
        symbol: 'pin',
        symbolSize: 3,
        trailLength: 0,
      },
      lineStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#ffffff'
          }, {
            offset: 1, color: '#F58158'
          }], false),
          width: 1,
          opacity: 0.2,
          curveness: 0.1
        }
      },
      data: allData.moveLines
    }]
};
