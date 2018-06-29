<template>
  <div>
    <h1>云主机价格</h1>
    <Table border :columns="columns" :data="data"></Table>
    <p class="zhushi">*主机价格说明：包年价格第一年原价，第二年价格为8.5折，第三价格7.5折*</p>
    <h1>公网IP价格</h1>
    <Table border :columns="columns1" :data="data1"></Table>
    <p class="zhushi">价格计算说明：带宽价格=带宽大小x带宽价格x时长  例如8m带宽一个月格
      为：（2x20+3x25+3x90）x1=385
    </p>
    <h1>磁盘价格</h1>
    <Table border :columns="columns2" :data="data2"></Table>
  </div>
</template>
<style lang="less" scoped>
  p.zhushi {
    margin-top: 30px;
    margin-bottom: 0;
    text-align: right;
  }
</style>
<script>

  export default{
    data(){
      window.scrollTo( 0, 0 );
      return {
        columns: [
          {
            title: 'CPU(核)',
            key: 'cpu',
          },
          {
            title: '内存（GB）',
            key: 'memory',
          },
          {
            title: '价格/月',
            key: 'priceMon',
          },
          {
            title: '价格/年',
            key: 'priceYear',
          },
          {
            title: '价格/小时',
            key: 'priceHour',
          }
        ],
        data: [
          {
            cpu: '1',
            memory: '1',
            priceMon: '30',
            priceYear: '298',
            priceHour: '0.31'
          },
          {
            cpu: '1',
            memory: '2',
            priceMon: '70',
            priceYear: '697',
            priceHour: '0.42'
          },
          {
            cpu: '1',
            memory: '4',
            priceMon: '134',
            priceYear: '1334',
            priceHour: '0.64'
          },
          {
            cpu: '1',
            memory: '8',
            priceMon: '218',
            priceYear: '2180',
            priceHour: '0.86'
          },
          {
            cpu: '2',
            memory: '2',
            priceMon: '133',
            priceYear: '1324',
            priceHour: '0.62'
          },
          {
            cpu: '2',
            memory: '4',
            priceMon: '161',
            priceYear: '1711',
            priceHour: '0.84'
          },
          {
            cpu: '2',
            memory: '8',
            priceMon: '265',
            priceYear: '2611',
            priceHour: '1.28'
          },
          {
            cpu: '2',
            memory: '12',
            priceMon: '365',
            priceYear: '3714',
            priceHour: '0.31'
          },
          {
            cpu: '4',
            memory: '4',
            priceMon: '271',
            priceYear: '2714',
            priceHour: '1.24'
          },
          {
            cpu: '4',
            memory: '8',
            priceMon: '371',
            priceYear: '3711',
            priceHour: '1.68'
          },
          {
            cpu: '4',
            memory: '12',
            priceMon: '471',
            priceYear: '4724',
            priceHour: '2.12'
          },
          {
            cpu: '4',
            memory: '16',
            priceMon: '571',
            priceYear: '5723',
            priceHour: '2.54'
          },
          {
            cpu: '4',
            memory: '24',
            priceMon: '771',
            priceYear: '7734',
            priceHour: '3.42'
          },
          {
            cpu: '8',
            memory: '8',
            priceMon: '567',
            priceYear: '5624',
            priceHour: '2.46'
          },
          {
            cpu: '8',
            memory: '16',
            priceMon: '767',
            priceYear: '7634',
            priceHour: '3.34'
          },
          {
            cpu: '8',
            memory: '24',
            priceMon: '967',
            priceYear: '9730',
            priceHour: '4.2'
          },
          {
            cpu: '8',
            memory: '32',
            priceMon: '1167',
            priceYear: '11634',
            priceHour: '5'
          },
          {
            cpu: '12',
            memory: '12',
            priceMon: '863',
            priceYear: '8634',
            priceHour: '3.7'
          },
          {
            cpu: '12',
            memory: '16',
            priceMon: '963',
            priceYear: '9634',
            priceHour: '4.5'
          },
          {
            cpu: '12',
            memory: '24',
            priceMon: '1163',
            priceYear: '11624',
            priceHour: '5'
          },
          {
            cpu: '12',
            memory: '32',
            priceMon: '1363',
            priceYear: '13643',
            priceHour: '6'
          },
          {
            cpu: '16',
            memory: '16',
            priceMon: '1159',
            priceYear: '11534',
            priceHour: '4.84'
          },
          {
            cpu: '16',
            memory: '24',
            priceMon: '1259',
            priceYear: '12434',
            priceHour: '5.6'
          },
          {
            cpu: '16',
            memory: '32',
            priceMon: '1459',
            priceYear: '14543',
            priceHour: '6.7'
          },
          {
            cpu: '24',
            memory: '24',
            priceMon: '1661',
            priceYear: '16539',
            priceHour: '7.44'
          },
          {
            cpu: '24',
            memory: '32',
            priceMon: '1861',
            priceYear: '18639',
            priceHour: '8'
          },
          {
            cpu: '32',
            memory: '32',
            priceMon: '2272',
            priceYear: '22736',
            priceHour: '10.2'
          },

        ],
        columns1: [
          {
            title: '带宽',
            key: 'keyWidth',
          },
          {
            title: '包年包月',
            key: 'year',
          },
          {
            title: '按量计费',
            key: 'hour'
          }
        ],
        data1: [
          {
            keyWidth: '≤2mbps',
            year: '1m／1月=20',
            hour: '1m／1h=0.063'
          },
          {
            keyWidth: '2<选择带宽<5',
            year: '1m／1月=25',
            hour: ''
          },
          {
            keyWidth: '≥5mbps',
            year: '1m／1月=90',
            hour: '1m／1h=0.25'
          },
        ],
        columns2:[
          {
            title: '规格',
            key: 'type',
          },
          {
            title: '单价（元/GB/月）',
            key: 'month',
          },
          {
            title: '单价（元/GB/年）',
            key: 'year',
          },
          {
            title: '单价（元/100GB/小时）',
            key: 'hour',
          }
        ],
        data2: [
          {
            type: 'SSD磁盘',
            month: '0.8',
            year: '9.6',
            hour: '0.33',
          },
          {
            type: 'STAT',
            month: '0.3',
            year: '0.6',
            hour: '0.04',
          },
          {
            type: 'SAS磁盘',
            month: '0.5',
            year: '6',
            hour: '0.18',
          },
        ]

      }
    }
  }
</script>
