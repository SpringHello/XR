<template>
  <div class="background">
    <div class="wrapper">
      <span class="title">
        <span>费用中心 /</span>
        <span>发票管理</span> /
        <span>发票信息&收件人管理</span>
      </span>
      <div class="content">
        <header>
          <span @click="toExpenses()">
            <Icon type="chevron-left"></Icon>
          </span>
          <h1>发票信息&收件人管理</h1>
        </header>
        <div class="alert-warning">
          <p>1.增值税专用发票开票信息需通过验证之后才可以使用。</p>
          <p>
            2.注意有效增值税发票开票资质仅为一个；发票常见问题查看
            <span>增票资质帮助</span>
          </p>
        </div>
        <div class="invoice-info">
          <div class="title-row">
            <h2>开票信息</h2>
            <Button size="large">新增开票信息</Button>
          </div>
          <Table :columns="columnsInvoice" :data="invoiceList"></Table>
        </div>
        <div class="invoice-info">
          <div class="title-row">
            <h2>收件信息</h2>
            <Button size="large">新增收件信息</Button>
          </div>
          <Table :columns="columnsAddressee" :data="addresseeList"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      columnsInvoice: [
        {
          title: '发票抬头',
          key: 'title'
        },
        {
          title: '发票种类',
          key: 'invoiceType'
        },
        {
          title: '税号',
          key: 'taxNum'
        }, {
          title: '单位地址',
          key: 'companyAddr'
        },
        {
          title: '开户行',
          key: 'bank'
        },
        {
          title: '银行账户',
          key: 'bankAccount'
        }, {
          title: '联系电话',
          key: 'tel'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            return h('div', {
              style: {
                color: '#2A99F2'
              }
            }, [
                h('span', {
                  style: {
                    marginRight: '10px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      alert(params.index)
                    }
                  }
                }, '修改'),
                h('span', {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      alert(params.index)
                    }
                  }
                }, '删除')
              ]);
          }
        }
      ],
      invoiceList: [
        {
          title: '北京允睿讯通科技有限公司',
          invoiceType: '增值税专用发票',
          taxNum: '915001058 1564 125',
          companyAddr: '重庆渝北区洪湖西路神州智慧天地5-D',
          bank: '建行渝北支行',
          bankAccount: '5000233690002345871',
          tel: '023-57898765',
          status: '可用',
          type: ''
        },
      ],
      columnsAddressee: [
        {
          title: '收件人',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'age'
        },
        {
          title: '收件地址',
          key: 'address'
        },
        {
          title: '状态',
          key: 'name'
        },
        {
          title: '操作',
          key: 'age',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  marginRight: '10px',
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    alert(params.index)
                  }
                }
              }, '修改'),
              h('span', {
                style: {
                  marginRight: '10px',
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    alert(params.index)
                  }
                }
              }, '删除'),
              h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    alert(params.index)
                  }
                }
              }, '设为默认')
            ]);
          }
        }
      ],
      addresseeList: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
      ]
    }
  },
  created () {
    this.getInvoiceList()
  },
  mounted () {
  },
  methods: {
    getInvoiceList () {
      this.$http.get('nVersionUser/getExamine.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // this.invoice = response.data.result.result
        }
      })
    },
    invoiceLimit () {
      this.$http.post('user/invoiceExamine.do',{
        type: '0',
        companyName: '新锐云公司',
        identicode: '123456789',
        // address: '',
        // phone: '',
        // bankName: '',
        // bankNum: ''
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // this.invoice = response.data.result.result
        }
      })
    },
    toExpenses () {
      sessionStorage.setItem('expensesTab', 'applyInvoice')
      this.$router.push('expenses')
    }
  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.background {
  font-family: MicrosoftYaHei;
  background-color: #f5f5f5;
  width: 100%;
  @diff: 101px;
  min-height: calc(~"100% - @{diff}");
  .wrapper {
    width: 1200px;
    margin: 0px auto;
    > .title {
      span {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: inline-block;
      }
      span:last-child {
        color: #666;
      }
    }
    .content {
      background-color: white;
      padding: 20px;
    }
  }
}
header {
  margin-bottom: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  span {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: rgba(247, 249, 250, 1);
    border-radius: 2px;
    border: 1px solid rgba(198, 207, 216, 1);
    line-height: 23px;
    text-align: center;
  }
  h1 {
    margin-left: 10px;
    display: inline-block;
    font-size: 24px;
    font-weight: normal;
    vertical-align: middle;
  }
}
.invoice-info {
  margin-top: 28px;
  .title-row {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 18px;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
    }
  }
}
</style>
