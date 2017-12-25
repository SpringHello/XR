<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 硬盘</span>
      <div class="content">
        <div style="padding-bottom: 20px;border-bottom: 1px solid #E9E9E9;">
          <span class="title">硬盘</span>
        </div>
        <Alert style="margin-top: 20px; border: solid 1px #2A99F2;border-radius: 4px;">
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>
        <div class="operator-bar">
          <Button type="primary" @click="newDisk">新增</Button>
          <Button type="primary" @click="mount" style="margin-left: 10px;">挂载</Button>
          <Button type="primary" @click="unload" style="margin-left: 10px;">卸载</Button>
          <Dropdown style="margin-left: 10px;vertical-align: middle;" @on-click="hideEvent">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <!--<Dropdown-item name="backupsDisk">备份</Dropdown-item>-->
              <Dropdown-item name="dilatationDisk">扩容</Dropdown-item>
              <Dropdown-item name="modificationDisk">修改</Dropdown-item>
              <Dropdown-item name="deleteDisk">删除</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div style="margin-top:20px">
          <Table :columns="diskColumns" :data="diskData" @radio-change="selectDisk"></Table>
        </div>
      </div>
    </div>

    <!-- 新建硬盘模态框 -->
    <Modal v-model="showModal.newDisk" width="550" :scrollable="true">
      <p slot="header">
        <span class="universal-modal-title">新建硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskForm" :rules="newRuleValidate" ref="newDisk">
          <Form-item label="硬盘名称" prop="diskName">
            <Input v-model="diskForm.diskName" placeholder="小于20位数字或字母"></Input>
          </Form-item>
          <Form-item label="类型" prop="diskType">
            <Select v-model="diskForm.diskType" placeholder="请选择">
              <Option v-for="item in diskTypeList" :key="item.value" :value="item.value">{{ item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="购买方式" prop="timeType">
            <Select v-model="diskForm.timeType" placeholder="请选择" @on-change="diskForm.timeValue=''">
              <Option v-for="item in customTimeOptions.renewalType" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="购买时长" v-if="diskForm.timeType!='current'" prop="timeValue">
            <Select v-model="diskForm.timeValue" placeholder="请选择">
              <Option v-for="item in customTimeOptions[diskForm.timeType]" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="容量" style="width:100%;user-select: none">
            <i-slider
              v-model="diskForm.diskSize"
              unit="G"
              :min=20
              :max=1000
              :step=10
              :points="[250,500]"
              style="width:300px;vertical-align: middle;">
            </i-slider>
            <InputNumber :max="1000" :min="20" v-model="diskForm.diskSize" :step=10 :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">GB</span>
          </Form-item>
        </Form>
        <div style="float: right">
          <span class="universal-middle">资费：</span>
          <span class="universal-price"> ￥{{ expenses }}</span>
          <span v-if="diskForm.timeType=='current'">/小时</span>
          <p v-if="coupon>0">已优惠：<span>（￥{{ coupon }}）</span></p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.newDisk = false">取消</Button>
        <Button type="primary" @click="_checkNewForm">确定
        </Button>
      </div>
    </Modal>
    <!-- Modal v-model="showModal.diskUnload" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: MicrosoftYaHei;font-size: 16px;color: #666666;line-height: 24px;">
        卸载硬盘
      </div>
      <div>
        <span style="font-family: MicrosoftYaHei;font-size: 14px;color: #666666;">是否将确认将硬盘<span style="color: #2A99F2 ">（{{ diskname }}）</span>从主机
          <span style="color: #2A99F2 ">（{{ hostname }}）</span>卸载，卸载之后该主机将失去该硬盘所存信息。</span>
        <p style="font-family: MicrosoftYaHei;font-size: 12px;color: #999999;margin-top: 12px">
          警告：如果您卸载的硬盘正处于数据传输的状态中，此时卸载该硬盘可能导致您操作失败或数据丢失，请在硬盘空闲之时执行卸载操作</p>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.diskUnload = false">取消</Button>
        <Button type="primary"
                @click="diskUnload_ok">确认卸载
        </Button>
      </div>
    </Modal>
    <Modal v-model="showModal.modificationDisk" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: MicrosoftYaHei;font-size: 16px;color: #666666;line-height: 24px;">
        修改硬盘
      </div>
      <div style="padding-bottom: 40px">
        <span style="font-family: MicrosoftYaHei;font-size: 14px;color: #666666;line-height: 24px;">硬盘名称：</span>
        <Input v-model="diskname" placeholder="请输入..." style="width: 366px"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modificationDisk = false">取消</Button>
        <Button type="primary"
                @click="modificationDisk_ok">确认修改
        </Button>
      </div>
    </Modal>
    <Modal v-model="showModal.dilatationDisk" width="590">
      <div slot="header"
           style="color:#666666;font-family: MicrosoftYaHei;font-size: 16px;color: #666666;line-height: 24px;">
        调整容量
      </div>
      <div style=" padding-bottom: 80px;">
        <div>
          <span
            style="font-family: MicrosoftYaHei;font-size: 14px;color: rgba(17,17,17,0.65);line-height: 24px;">容量</span>
          <i-slider
            v-model="capacitys"
            unit="G"
            :min="capacitysMin"
            :max=1000
            :step=10
            :points="[500,800]"
            style="width:300px;vertical-align: text-top;">
          </i-slider>
          <InputNumber :max="1000" :min="capacitysMin" v-model="capacitys" :step=10 :editable="false"
                       style="font-size: 16px;height: 30px;width: 80px;margin-left: 20px"></InputNumber>
          <span style="margin-left: 10px">GB</span>
        </div>
        <div style="float: right;margin-top: 20px">
          <span style="font-family: MicrosoftYaHei;font-size: 14px;">资费：</span><span
          style="font-family: MicrosoftYaHei;font-size: 24px;color: #2A99F2;"> ￥{{ diskSizeExpenses }}</span>
        </div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.dilatationDisk = false">取消</Button>
        <Button type="primary" :disabled="capacitys==capacitysMin"
                @click="adjustDisk_ok">确认扩容
        </Button>
      </div>
    </Modal>
    <Modal v-model="showModal.deleteDisk" width="590">
      <div slot="header"
           style="color:#666666;font-family: MicrosoftYaHei;font-size: 16px;color: #666666;line-height: 24px;margin-top: 10px">
        删除硬盘
      </div>
      <div style="padding-bottom: 30px">
        <p style="font-family: MicrosoftYaHei;font-size: 14px;color: #666666;">
          <span style="color:#2d8cf0;">“{{ diskname }}”</span>删除之后将进入回收站，新睿云将为您保留24小时，在24小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。
        </p>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.deleteDisk = false">取消</Button>
        <Button type="primary"
                @click="deleteDisk_ok">确认删除
        </Button>
      </div>
    </Modal>
    <Modal v-model="showModal.mountDisk" width="590">
      <div slot="header"
           style="color:#666666;font-family: MicrosoftYaHei;font-size: 16px;color: #666666;line-height: 24px;margin-top: 10px">
        挂载云主机
      </div>
      <div style="padding-bottom: 30px">
        <span>可挂载主机：</span>
        <Select v-model="mountHost" style="width:300px;margin-left: 20px">
          <Option v-for="item in mountHostList" :value="item.computerid" :key="item.id">{{ item.computername}}
          </Option>
        </Select>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.mountDisk = false">取消</Button>
        <Button type="primary"
                @click="mountDisk_ok">确认挂载
        </Button>
      </div>
    </Modal -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions, diskTypeList} from '../../options'
  import debounce from 'throttle-debounce/debounce'
  export default{
    data(){
      return {
        // 磁盘列包含信息
        diskColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: '硬盘名称',
            align: 'center',
            key: 'diskname'
          },
          {
            title: '硬盘类型',
            align: 'center',
            key: 'diskoffer',
            render: (h, params) => {
              return h('span', params.row.diskoffer == 'ssd' ? '超高性能型' : params.row.diskoffer == 'sas' ? '性能型' : '存储型')
            }
          },
          {
            title: '容量',
            align: 'center',
            key: 'disksize',
            render: (h, params) => {
              return h('span', params.row.disksize + 'GB')
            }
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row
              const text = row.status === 0 ? '欠费' : (row.status === 1 && row.mounton == '' && row.mountonname == '') ? '可挂载' : (row.status === 1 && row.mounton != '' && row.mountonname != '') ? '已启用（' + row.mountonname + ')' : row.status === -1 ? '异常' : row.status === 2 ? '创建中' : row.status === 3 ? '删除中' : row.status === 4 ? '卸载中' : row.status === 5 ? '挂载中' : ''
              if (row.status == 2 || row.status == 3 || row.status == 4 || row.status == 5) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: "inline-block",
                    marginRight: "10px",
                  }
                }), h('span', {}, text)])
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '计费类型',
            align: 'center',
            key: 'caseType',
            render: (h, params) => {
              return h('span', params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : '实时计费')
            }
          },
          {
            title: '价格',
            align: 'center',
            key: 'cpCase',
            render: (h, params) => {
              if (typeof(params.row.cpCase) != "undefined") {
                return h('span', params.row.caseType == 1 ? params.row.cpCase + '元/年' : params.row.caseType == 2 ? params.row.cpCase + '元/月' : params.row.cpCase + '元/小时')
              } else {
                return h('span', '--')
              }
            }
          },
          {
            title: '创建于',
            align: 'center',
            key: 'createtime'
          }
        ],
        // 磁盘数据
        diskData: [],
        // 控制模态框是否显示
        showModal: {
          // 新增磁盘模态框
          newDisk: false
          /*
           diskUnload: false,
           modificationDisk: false,
           dilatationDisk: false,
           deleteDisk: false,
           mountDisk: false,
           */
        },
        // 新增磁盘表单
        diskForm: {
          diskName: '',
          diskType: '',
          timeType: '',
          timeValue: '',
          diskSize: 20
        },
        // 新增磁盘表单的验证规则
        newRuleValidate: {
          diskName: [
            {required: true, message: '请输入vpc名称', trigger: 'blur'}
          ],
          diskType: [
            {required: true, message: '请选择磁盘类型', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // 时间配置对象
        customTimeOptions,
        // 磁盘类型数组
        diskTypeList,
        expenses: 0,
        diskSelection: null,
        diskname: '',
        hostname: '',
        capacitys: 0,
        capacitysMin: 0,
        diskSizeExpenses: 0,
        coupon: 0,
        mountHost: '',
        mountHostList: []
      }
    },
    created(){
      this.listDisk()
    },
    methods: {
      // 验证新建磁盘的表单
      _checkNewForm(){
        this.$refs.newDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            this.newDisk_ok()
          }
        })
      },
      listDisk(){
        this.$http.get('Disk/listDisk.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach((item) => {
              if (item.status != 1)
                item._disabled = true
            })
            this.diskData = response.data.result
            this.diskSelection = null
          }
        })
      },
      newDisk(){
        this.showModal.newDisk = true
        this.diskForm.diskAreaList = this.$store.state.zoneOptions
      },
      mount(){
        if (this.checkSelect() == true) {
          if (this.diskSelection.mounton == '' && this.diskSelection.mountonname == '' && this.diskSelection.status == 1) {
            this.showModal.mountDisk = true
            this.$http.get('Disk/listAttachComputer.do?diskid=' + this.diskSelection.diskid).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.mountHostList = response.data.result
              }
            })
          } else {
            this.$Modal.error({
              content: '所选硬盘不能挂载主机',
            })
          }
        }
      },
      unload(){
        if (this.checkSelect() == true) {
          if (this.diskSelection.mounton != '' && this.diskSelection.mountonname != '' && this.diskSelection.status == 1) {
            this.showModal.diskUnload = true
            this.diskname = this.diskSelection.diskname
            this.hostname = this.diskSelection.mountonname
          } else {
            this.$Modal.error({
              content: '所选硬盘没有挂载主机，无法卸载',
            })
          }
        }
      },
      // 新建磁盘价格查询
      queryDiskPrice: debounce(500, function () {
        this.$http.post('device/QueryBillingPrice.do', {
          cpuNum: 0 + '',
          memory: 0 + '',
          diskSize: this.diskForm.diskSize + '',
          zoneId: this.$store.state.zoneList[0].zoneid,
          timeType: this.diskForm.timeType + '',
          timeValue: this.diskForm.timeValue + '',
          diskType: this.diskForm.diskType + '',
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.expenses = response.data.cost
            if (response.data.coupon) {
              this.coupon = response.data.coupon
            } else {
              this.coupon = 0
            }
          }
        })
      }),
      // 磁盘扩容价格查询
      queryDiskCost: debounce(500, function () {
        this.$http.get('Disk/UpDiskConfigCost.do?diskid=' + this.diskSelection.diskid + '&disksize=' + this.capacitys).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskSizeExpenses = response.data.result
          }
        })
      }),
      newDisk_ok(){
        // 默认zoneList第一个元素为当前选中区域，以后会修改
        var url = `Disk/createVolume.do?zoneId=${this.$store.state.zoneList[0].zoneid}&diskSize=${this.diskForm.diskSize}&diskName=${this.diskForm.diskName}&diskOfferingId=${this.diskForm.diskType}&timeType=${this.diskForm.timeType}&timeValue=${this.diskForm.timeValue}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.$store.commit("setSelect", "order")
            this.$router.push('order')
          }
        })
      },
      selectDisk(currentRow){
        this.diskSelection = currentRow
      },
      /*      backupsDisk(){
       if (this.checkSelect() == true) {
       }
       },*/
      dilatationDisk(){
        if (this.checkSelect() == true) {
          this.capacitys = this.diskSelection.disksize
          this.capacitysMin = this.capacitys
          this.showModal.dilatationDisk = true
        }
      },
      modificationDisk(){
        if (this.checkSelect() == true) {
          this.showModal.modificationDisk = true
          this.diskname = this.diskSelection.diskname
        }
      },
      deleteDisk(){
        if (this.checkSelect() == true) {
          if (this.diskSelection.status == 1 && this.diskSelection.mounton != '' && this.diskSelection.mountonname != '') {
            this.$Modal.confirm({
              content: '所选硬盘已挂载主机，无法删除，若您确认删除，请先卸载该硬盘' + '<span style="color: #2A99F2">（' + this.diskSelection.diskname + '）</span>',
              okText: '卸载硬盘',
              cancelText: '取消',
              onOk: () => {
                this.unload()
              },
              onCancel: () => {
              }
            })
          } else if (this.diskSelection.caseType != 1 && this.diskSelection.caseType != 2) {
            this.showModal.deleteDisk = true
            this.diskname = this.diskSelection.diskname
          } else {
            this.$Modal.info({
              content: '包年包月资费资源无法删除'
            })
          }
        }
      },
      checkSelect(){
        if (this.diskSelection == null) {
          this.$Message.info('请选择需要操作的硬盘')
          return false
        }
        return true
      },
      hideEvent(type){
        switch (type) {
          /*     case 'backupsDisk': {
           this.backupsDisk()
           break
           }*/
          case 'dilatationDisk': {
            this.dilatationDisk()
            break
          }
          case 'modificationDisk': {
            this.modificationDisk()
            break
          }
          case 'deleteDisk': {
            this.deleteDisk()
            break
          }
        }
      },
      diskUnload_ok(){
        this.showModal.diskUnload = false
        this.diskData.forEach(item => {
          if (item.diskid == this.diskSelection.diskid)
            item.status = 4
        })
        this.$http.get('Disk/detachVolume.do?diskid=' + this.diskSelection.id + '&virtualmachineid=' + this.diskSelection.mounton).then(response => {
          this.listDisk()
          if (response.status == 200 && response.statusText == 'OK') {
            this.$Message.success({
              content: response.data.message,
              duration: 5
            })
          }
        })
      },
      modificationDisk_ok(){
        this.$http.get('Disk/updateDisk.do?diskid=' + this.diskSelection.diskid + '&name=' + this.diskname).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message,
              duration: 5
            })
            this.showModal.modificationDisk = false
            this.listDisk()
          }
        })
      },
      deleteDisk_ok(){
        this.showModal.deleteDisk = false
        this.diskData.forEach(item => {
          if (item.diskid == this.diskSelection.diskid)
            item.status = 3
        })
        this.$http.get('Disk/delDisk.do?diskid=' + this.diskSelection.id).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message,
              duration: 5
            })
            this.listDisk()
          }
        })
      },
      mountDisk_ok(){
        this.showModal.mountDisk = false
        this.diskData.forEach(item => {
          if (item.diskid == this.diskSelection.diskid)
            item.status = 5
        })
        this.$http.get('Disk/attachVolume.do?diskid=' + this.diskSelection.id + '&virtualmachineid=' + this.mountHost).then(response => {
          this.listDisk()
          if (response.status == 200 && response.statusText == 'OK') {
            this.$Message.info({
              content: response.data.message,
              duration: 5
            })
          }
        })
      },
      adjustDisk_ok(){
        this.$http.get('Disk/UpDiskConfig.do?diskid=' + this.diskSelection.diskid + '&disksize=' + this.capacitys).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.$store.commit("setSelect", "order")
            this.$router.push('order')
          }
        })
      }
    },
    computed: {
      // 该计算属性用于解决观测对象时currentValue与oldValue指向同一对象的问题，没有其他用处
      copyDiskForm(){
        var obj = {}
        for (var i in this.diskForm) {
          obj[i] = this.diskForm[i]
        }
        return obj
      }
    },
    watch: {
      // 观测计算属性变化，如果不是名称的变化则必须重新计算价格
      'copyDiskForm': {
        handler: function (val, oldVal) {
          if (val.timeType == 'current' || (val.timeType && val.timeValue) && val.diskType) {
            if (val.diskName === oldVal.diskName) {
              this.expenses = '正在计算'
              this.coupon = 0
              this.queryDiskPrice()
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 146px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        min-height: 700px;
        .title {
          font-family: MicrosoftYaHei;
          font-family: 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .operator-bar {
          font-size: 0px;
          margin-top: 20px;
        }
      }
    }
  }
</style>
