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
            <Button size="large" @click="invoiceInfoAdd_open('formInvoice')">新增开票信息</Button>
          </div>
          <Table :columns="columnsInvoice" :data="invoiceList"></Table>
        </div>
        <div class="invoice-info">
          <div class="title-row">
            <h2>收件信息</h2>
            <Button size="large" @click="receiptInfoAdd_open('formReceipt')">新增收件信息</Button>
          </div>
          <Table :columns="columnsAddressee" :data="addresseeList"></Table>
        </div>
      </div>
    </div>

    <!-- 新增收件信息 -->
    <Modal v-model="showModal.receiptInfoAdd" width='500'>
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">{{addresseeTitleModal}}收件信息</span>
        </p>
      <div class="universal-modal-label-14px hide-star-symbol">
        <Form ref="formReceipt" :model="formReceipt" :rules="ruleReceipt" :label-width="82" label-position="left">
          <FormItem prop="recipient" label="收件人姓名">
              <Input type="text" v-model="formReceipt.recipient" placeholder="请输入收件人姓名" style="width:300px;">
              </Input>
          </FormItem>
          <FormItem prop="phone" label="收件人电话">
              <Input type="text" v-model="formReceipt.phone" placeholder="请输入收件人电话" style="width:300px;">
              </Input>
          </FormItem>
          <FormItem label="图形验证码" prop="imgCode">
            <Input v-model="formReceipt.imgCode" style="width:107px;margin-right: 10px;"></Input>
            <img :src="imgSrc" @click="imgSrc=`https://zschj.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`" width="80" height="30"
                  style="vertical-align:middle;cursor:pointer">
          </FormItem>
          <FormItem label="验证码" prop="code">
              <Input type="text" v-model="formReceipt.code" placeholder="请输入验证码" style="width:107px;">
              </Input>
              <Button type="primary" style="margin-left:10px;"  @click="getVerificationCode('msg')" v-if="timeBoo" >获取验证码</Button>
              <Button disabled style="margin-left:10px;" v-else>{{count+'分'}}</Button>
          </FormItem>
          <FormItem label="区域">
            <Select v-model="formReceipt.province" style="width:93px;" @on-change='changeProvince'>
                <Option  v-for="item in area" :value="item.name" :key="item.name">{{item.name}}</Option>
            </Select>
            <Select v-model="formReceipt.city" style="width:93px;" @on-change='changeArea'>
                <Option v-for="item in areaList" :value="item.name"  :key="item.name">{{item.name}}</Option>
            </Select>
            <Select v-model="formReceipt.district" style="width:93px;">
                <Option v-for="item in countyList" :value="item" :key="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="详细地址" prop="address">
             <Input v-model="formReceipt.address" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="请详细填写便于快递投递无误，例如：重庆市 渝北区洪湖西路 智慧大厦A栋5-D"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="v_box">
        <p>没有收到验证码？</p>
        <p>1、网络异常可能会造成短信丢失，请<span @click="getVerificationCode('msg')">重新获取</span>或<span @click="getVerificationCode('voice')">接受语音验证码</span>。</p>
        <p>2、如果手机已丢失或停机，请<a href="https://www.xrcloud.net/work" target="_blank">提交工单</a>或<a class="box_a" target="_blank"
        :href="`tencent://message/?uin=${QQInfo}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
        >联系客服</a>更改手机号。</p>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.receiptInfoAdd = false">取消</Button>
        <Button type="primary" @click="addAdrressOk('formReceipt')">确定</Button>
      </p>
    </Modal>

    <!-- 新增开票信息 -->
    <Modal v-model="showModal.invoiceInfo" width='500'>
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">{{addresseeTitleModal}}开票信息</span>
        </p>
        <div class="universal-modal-label-14px hide-star-symbol">
          <Form ref="formInvoice" :model="formInvoice" :rules="ruleInvoice" :label-width="100">
            <FormItem prop="invoiceSelect" label="发票类型">
              <RadioGroup v-model="formInvoice.invoiceSelect" type="button">
                  <Radio label="normal">增值税普通发票</Radio>
                  <Radio label="personal">增值税专用发票</Radio>
              </RadioGroup>
            </FormItem>
            <div v-if="formInvoice.invoiceSelect == 'normal'">
              <FormItem prop="personal" label="开具类型">
                <RadioGroup v-model="formInvoice.personal" type="button">
                    <Radio :label="2">个人</Radio>
                    <Radio :label="0">企业</Radio>
                </RadioGroup>
              </FormItem> 
              <FormItem prop="rise" label="发票抬头">
                  <Input type="text" v-model="formInvoice.rise" placeholder="您公司营业执照上的全称" style="width:300px;">
                  </Input>
              </FormItem>
              <FormItem prop="taxpayer" label="纳税人识别码" v-if="formInvoice.personal == 0">
                  <Input type="text" v-model="formInvoice.taxpayer" placeholder="15位或18位的英文字符、数字" style="width:300px;">
                  </Input>
              </FormItem>
            </div>
            <div v-if="formInvoice.invoiceSelect == 'personal'">
              <FormItem prop="rise" label="发票抬头">
                  <Input type="text" v-model="formInvoice.rise" placeholder="您公司营业执照上的全称" style="width:300px;">
                  </Input>
              </FormItem>
              <FormItem prop="taxpayer" label="纳税人识别码">
                  <Input type="text" v-model="formInvoice.taxpayer" placeholder="15位或18位的英文字符、数字" style="width:300px;">
                  </Input>
              </FormItem>
              <FormItem prop="address" label="单位地址">
                  <Input type="text" v-model="formInvoice.address" placeholder="您公司营业执照上的注册地址" style="width:300px;">
                  </Input>
              </FormItem>
              <FormItem prop="phone" label="注册电话">
                  <Input type="text" v-model="formInvoice.areaCode" placeholder="区号" style="width:90px;">
                  </Input>
                  ——
                  <Input type="text" v-model="formInvoice.phone" placeholder="电话号" style="width:180px;">
                  </Input>
              </FormItem>
              <FormItem prop="bankName" label="开户银行">
                  <Input type="text" v-model="formInvoice.bankName" placeholder="请精确到支行，如‘招商银行重庆靖城路支行’" style="width:300px;">
                  </Input>
              </FormItem>
              <FormItem prop="bankNum" label="银行账户">
                  <Input type="text" v-model="formInvoice.bankNum" placeholder="您公司开户许可证上的银行账号" style="width:300px;">
                  </Input>
              </FormItem>
            </div>
          </Form>
        </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.invoiceInfo = false">取消</Button>
        <Button type="primary" @click="addInvoiceOk('formInvoice')">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import area from "../../options/area.json";
import axios from "axios";

let val = '/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/'; //营业执照格式
const vailAucct = (rule, value, callback) => {
  let reg = /^1[4|3|5|8|9|6|7]\d{9}$/;
  if (value == "") {
    return callback(new Error("请输入收件人手机号"));
  }else if (!reg.test(value)) {
    return callback(new Error("手机号码格式不正确"));
  } else{
    callback();
  }
};
const validTaxpayer = (rule, value, callback) =>{
  let reg = /^([0-9a-zA-z]{15}|[0-9a-zA-z]{18})$/;
  if(value == ''){
    return callback(new Error('请输入纳税人识别码'));
  }else if(!reg.test(value)){
    return callback(new Error('请输入正确的纳税人识别码'));
  }else{
    callback();
  }
}
const validateAddress = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('收件人地址不能为空'))
    }
    if ((/^[0-9a-zA-Z]+$/.test(value)) || (/\s+/.test(value))) {
      callback(new Error('收件地址不能包含空格或是纯数字、英文'))
    } else {
      callback()
    }
  }

export default {
  data() {
    return {
      imgSrc: 'https://zschj.xrcloud.net/user/getKaptchaImage.do',
      addresseeTitleModal: '新增',
      area: area,
      QQInfo: "",
      columnsInvoice: [
        {
          title: "发票抬头",
          key: "companyname"
        },
        {
          title: "发票种类",
          key: "type",
          render: (h, params) => {
            // 0  普通发票 企业  1  增值税专用发票  2 普通发票 个人
            return h('span',params.row.type==0?'增值税普通发票(企业)':(params.row.type==1?'增值税专用发票':'增值税普通发票(个人)'))
          }
        },
        {
          title: "税号",
          key: "identicode"
        },
        {
          title: "单位地址",
          key: "address"
        },
        {
          title: "开户行",
          key: "bankname"
        },
        {
          title: "银行账户",
          key: "banknum"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            //0 审核通过  1  审核失败  2 审核中
            return h('span',params.row.type==0?'可用':(params.row.type==1?'审核失败':'审核中'))
          }
        },
        {
          title: "操作",
          key: "address",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#2A99F2"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "10px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$refs['formInvoice'].resetFields()
                        this.addresseeTitleModal = '修改'
                        this.formInvoice = {
                          personal: params.row.type,
                          id: params.row.id,
                          rise: params.row.companyname,
                          taxpayer: params.row.identicode,
                          address: params.row.address,
                          phone: params.row.phone,
                          areaCode: params.row.areacode,
                          bankName: params.row.bankname,
                          bankNum: params.row.banknum,
                          invoiceSelect:params.row.type == 1?'personal':'normal'
                        }
                        this.showModal.invoiceInfo = true;
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$message.confirm({
                          content: '你是否确认删除？',
                          onOk: () => {
                            this.$http.get('nVersionUser/deleteExamine.do', {
                              params: {
                                id: params.row.id,
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.getInvoiceList()
                              }
                            })
                          }
                        })
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      invoiceList: [
      ],
      columnsAddressee: [
        {
          title: "收件人",
          key: "recipient"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "收件地址",
          key: "address"
        },
        {
          title: "状态",
          key: "status",
          render: (h,params)=>{
            return h('span',params.row.status?'可用':'默认')
          }
        },
        {
          title: "操作",
          key: "age",
          render: (h, params) => {
            let color = params.row.status?'#2A99F2':'#999999'
            
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    color: "#2A99F2",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$refs['formReceipt'].resetFields()
                      this.formReceipt = params.row
                      this.formReceipt.code =''
                      this.addresseeTitleModal = '修改'
                      this.showModal.receiptInfoAdd = true
                    }
                  }
                },
                "修改"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    color: "#2A99F2",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                          content: '你是否确认删除？',
                          onOk: () => {
                            this.$http.get('nVersionUser/deleteReciveinfo.do', {
                              params: {
                                id: params.row.id,
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.getAddresseeList()
                              }
                            })
                          }
                        })
                    }
                  }
                },
                "删除"
              ),
              h(
                "span",
                {
                  style: {
                    color: color,
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      if(params.row.status){
                        this.$message.confirm({
                          content: '你确定设置为默认？',
                          onOk: () => {
                            this.$http.get('nVersionUser/setDefoultAddress.do', {
                              params: {
                                id: params.row.id,
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.getAddresseeList()
                              }
                            })
                          }
                        })
                      }
                    }
                  }
                },
                "设为默认"
              )
            ]);
          }
        }
      ],
      addresseeList: [
      ],
      showModal: {
        receiptInfoAdd: false,
        invoiceInfo: false,
      },
      // 收件信息
      ruleReceipt: {
        recipient:[
          {required:true,message:'请输入收件人姓名',trigger:'blur'}
        ],
        phone:[ 
          {required:true,validator:vailAucct,trigger:'blur'}
        ],
        imgCode:[ 
          {required:true,message:'请输入图形验证码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'}
        ],
        desc: [
          {required: true, validator: validateAddress, trigger: 'blur'}
        ],
      },
      formReceipt: {
        recipient: "",
        phone: "",
        province: "北京市",
        city: "",
        district: "",
        address: "",
        code:'',
        imgCode: ''
      },
      // 开票信息
      ruleInvoice: {
        rise:[
          {required:true,message:'请输入发票抬头',trigger:'blur'}
        ],
        taxpayer:[
          {required:true,validator:validTaxpayer,trigger:'blur'}
        ],
        address:[
          {required:true,message:'请输入单位地址',trigger:'blur'}
        ],
        bankName:[
          {required:true,message:'请输入开户银行',trigger:'blur'}
        ],
        bankNum:[
          {required:true,message:'请输入银行账号',trigger:'blur'}
        ]
      },
      formInvoice: {
        invoiceSelect: "normal",
        personal: 2,
        rise: "",
        taxpayer: "",
        address:'',
        phone:'',
        areaCode: '',
        bankName:'',
        bankNum:''
      },
      //区列表
      areaList: [],
      countyList: [],
      count: 60,
      timeBoo:true
    };
  },
  created() {
    axios.get("network/getQQCustomerServiceStatus.do", {}).then(response => {
      this.QQInfo = response.data.kefu[0].qqnumber;
    });
    this.changeProvince('北京市');
    this.changeArea('北京市');
    this.getInvoiceList()
    this.getAddresseeList()
  },
  mounted() {},
  methods: {
    getInvoiceList () {
      this.$http.get('nVersionUser/getExamine.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.invoiceList = response.data.result.result
        }
      })
    },
    getAddresseeList() {
      this.$http.get('nVersionUser/getReciveinfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.addresseeList = response.data.result.data
        }
      })
    },
    toExpenses() {
      sessionStorage.setItem("expensesTab", "applyInvoice");
      this.$router.push("expenses");
    },
    receiptInfoAdd_open(name) {
      this.$refs[name].resetFields()
      this.addresseeTitleModal='新增'
      // this.formReceipt = {}
      this.showModal.receiptInfoAdd = true
    },
    invoiceInfoAdd_open(name) {
      this.$refs[name].resetFields()
      this.addresseeTitleModal='新增'
      this.formInvoice = {
        invoiceSelect: 'normal',
        personal: 2
      }
      this.showModal.invoiceInfo = true
    },
    // 切换省份
    changeProvince(val) {
      this.area.forEach(item => {
        if (item.name == val) {
          this.formReceipt.city =  item.city[0].name;
          this.areaList = item.city;
        }
      });
    },

    // 切换区
    changeArea(val) {
      this.areaList.forEach(item => {
        if (item.name == val) {
          this.formReceipt.district = item.area[0];
          this.countyList = item.area;
        }
      });
    },

    //获取手机验证码
    getVerificationCode(type) {
      let url = ''
      let params = {}
      if (type=='msg') {
        url = 'user/code.do'
        params = {
          aim: this.formReceipt.phone,
          isemail: 0,
          vailCode: this.formReceipt.imgCode
        }
      } else {
        url = 'user/voiceCode.do'
        params = {
          aim: this.formReceipt.phone,
          vailCode: this.formReceipt.imgCode
        }
      }
      let imgCodeMsg = ''
      let phoneMsg = ''
      this.$refs.formReceipt.validateField('phone',(msg)=>{
        phoneMsg = msg
      });
      this.$refs.formReceipt.validateField('imgCode',(msg)=>{
        imgCodeMsg = msg
      });
      if (!(imgCodeMsg||phoneMsg)) {
        axios.get(url, {params: params}).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.timeBoo = false
                this.$Message.success(res.data.message)
                let char = setInterval(() => {
                  if (this.count != 0) {
                    this.count--;
                  } else {
                    clearInterval(char);
                    this.count = 60;
                    this.timeBoo = true;
                  }
                }, 1000)
              } else {
                this.imgSrc = this.imgSrc + `?t=${new Date().getTime()}`;
                this.$Message.error({
                  content: res.data.message,
                  duration: 5
                })
              }
            })
      }
    },
    addAdrressOk(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            let params = {
                  recipient: this.formReceipt.recipient,
                  phone: this.formReceipt.phone,
                  province: this.formReceipt.province,
                  city: this.formReceipt.city,
                  district: this.formReceipt.district,
                  address: this.formReceipt.address,
                  smsCode: this.formReceipt.code
                }
            let url = 'nVersionUser/addReciveinfo.do'
            if(this.addresseeTitleModal == '修改'){
              params.id = this.formReceipt.id
              url = 'nVersionUser/modifyReciveinfo.do'
            }
            axios.post(url,params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(`${this.addresseeTitleModal}收件信息成功`)
              this.showModal.receiptInfoAdd = false
              this.getAddresseeList()
            } else {
              this.$Message.error(response.data.message)
            }
          })
        }
      })
    },
    addInvoiceOk(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            // normal 普通发票 personal 专用发票
            // 发票类型判断 2个人 0企业 1专用 
            let type = this.formInvoice.personal
            if(this.formInvoice.invoiceSelect == 'personal') {
              type = 1
            }
            let params = {}
            switch (type) {
              case 2:
                params.type = type
                params.companyName = this.formInvoice.rise
                break;
              case 0:
                params.type = type
                params.companyName = this.formInvoice.rise
                params.identicode = this.formInvoice.taxpayer
                break;
              case 1:
                params.type = type
                params.companyName = this.formInvoice.rise
                params.identicode = this.formInvoice.taxpayer
                params.address = this.formInvoice.address
                params.phone = this.formInvoice.phone
                params.areaCode = this.formInvoice.areaCode
                params.bankName = this.formInvoice.bankName
                params.bankNum = this.formInvoice.bankNum
                break;
              default:
                break;
            }
            let url = 'user/invoiceExamine.do'
            if(this.addresseeTitleModal == '修改'){
              if(this.formInvoice.taxpayer) {
                delete params['identicode']
                params.identiCode = this.formInvoice.taxpayer
              }
              params.id = this.formInvoice.id
              url = 'nVersionUser/modifyExamine.do'
            }
            axios.post(url,params).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(`${this.addresseeTitleModal}收件开票成功`)
                this.showModal.invoiceInfo = false
                this.getInvoiceList()
              } else {
                this.$Message.error(response.data.message)
              }
            })
        }
      })
    }
  },
  computed: {},
  watch: {},
  components: {}
};
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
.v_box {
  width: 460px;
  height: 112px;
  padding: 20px;
  background: #f6fafd;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-family: "MicrosoftYaHei";
  color: #666666;
  margin: 10px 0 0 0;
  p {
    font-size: 14px;
    line-height: 21px;
  }
  span {
    color: #2a99f2;
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    text-decoration: underline;
    color: #2a99f2;
  }
}
</style>
