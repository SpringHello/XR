/**
 * Created by yunrui001 on 2017-12-21.
 */
/* 包年/包月/实时 选项列表 */
const customTimeOptions = {
  renewalType: [
    {label: '包年', value: 'year'},
    {label: '包月', value: 'month'},
    {label: '实时', value: 'current'}
  ],
  year: [
    {label: '1年', value: '1'},
    {label: '2年', value: '2'},
    {label: '3年', value: '3'}
  ],
  month: [
    {label: '1月', value: '1'},
    {label: '2月', value: '2'},
    {label: '3月', value: '3'},
    {label: '4月', value: '4'},
    {label: '5月', value: '5'},
    {label: '6月', value: '6'},
    {label: '7月', value: '7'},
    {label: '8月', value: '8'},
    {label: '9月', value: '9'},
    {label: '10月', value: '10'}
  ]
}
/* 磁盘类型 选项列表 */
const diskTypeList = [
  // {
  //   value: 'sas',
  //   label: 'SAS存储'
  // },
  {
    value: 'ssd',
    label: 'SSD存储'
  },
  // {
  //   value: 'sata',
  //   label: 'SATA存储'
  // }
]
export {customTimeOptions, diskTypeList}
