<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云存储 &nbsp; / &nbsp; <span>云硬盘</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/disk/disk.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">云硬盘</span>
          <button id="refresh_button" @click="refreshPage">刷新</button>
        </div>
        <div class="universal-alert">
          <p>为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="newDisk">创建云硬盘</Button>
          <Button type="primary" @click="deleteDisk">删除云硬盘</Button>
        </div>
        <div style="margin-top:20px">
          <Table :columns="diskColumns" :data="diskData" @radio-change="selectDisk"></Table>
        </div>
      </div>
    </div>

    <!-- 新建硬盘模态框 -->
    <Modal v-model="showModal.newDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskForm" :rules="newRuleValidate" ref="newDisk">
          <Form-item label="硬盘名称" prop="diskName">
            <Input v-model="diskForm.diskName" placeholder="小于20位数字或字母"></Input>
          </Form-item>
          <!--      <Form-item label="区域" prop="diskArea">
                  <Select v-model="diskForm.diskArea" placeholder="请选择">
                    <Option v-for="item in diskAreaList" :key="item.zoneid" :value="item.zoneid">{{ item.zonename }}
                    </Option>
                  </Select>
                </Form-item>-->
          <Form-item label="类型" prop="diskType">
            <Select v-model="diskForm.diskType" placeholder="请选择">
              <Option v-for="item in diskTypeList" :key="item.value" :value="item.value">{{ item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="购买数量" style="width: 65%">
            <div class="quantity">
              <p @click="reduce"><i></i></p>
              <p style="width: 38px;cursor: auto;color:#2A99F2;margin:0 10px ">{{ diskForm.quantity }}</p>
              <p @click="diskForm.quantity+=1"><i style="transform: translateX(-2px) rotate(311deg)"></i></p>
            </div>
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
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="float: left">
          <span class="universal-middle">资费：</span>
          <span class="universal-price"> ￥{{ expenses }}</span>
          <span v-if="diskForm.timeValue != ''" style="color: #2A99F2;font-size: 24px;"> /
            <span style="font-size: 16px;color: #2A99F2;" v-if="diskForm.timeType == 'year'">{{diskForm.timeValue}}年</span>
            <span style="font-size: 16px;color: #2A99F2;" v-if="diskForm.timeType == 'month'">{{diskForm.timeValue}}月</span>
          </span>
          <!--<span v-if="diskForm.timeType=='current'" style="color: #2A99F2;font-size: 24px;"> / <span style="font-size: 16px;color: #2A99F2;">小时</span></span>-->
          <p v-if="coupon>0">已优惠：<span style="font-size: 16px;color: #2A99F2;">（￥{{ coupon }}）</span></p>
        </div>
        <Button type="ghost" @click="showModal.newDisk = false">取消</Button>
        <Button type="primary" @click="_checkNewForm">确定新建</Button>
      </div>
    </Modal>
    <!-- 挂载硬盘模态框 -->
    <Modal v-model="showModal.mountDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">挂载云主机</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskMountForm" :rules="mountRuleValidate" ref="mountDisk">
          <Form-item label="可挂载主机列表" prop="mountHost">
            <Select v-model="diskMountForm.mountHost" placeholder="请选择">
              <Option v-for="item in mountHostList" :key="item.computerid" :value="item.computerid">{{ item.computername
                }}
              </Option>
            </Select>
          </Form-item>
        </Form>
        <span>提示：如果您购买了主机但主机列表中无选项，是因为待绑定主机上存在快照，无法完成挂载。</span>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mountDisk = false">取消</Button>
        <Button type="primary" @click="_checkMountForm">确认挂载</Button>
      </div>
    </Modal>
    <!-- 扩展磁盘模态框 -->
    <Modal v-model="showModal.dilatationDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">调整容量</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="dilatationForm">
          <Form-item label="扩展后容量" style="width:100%;user-select: none">
            <i-slider
              v-model="dilatationForm.diskSize"
              unit="G"
              :min="dilatationForm.minDiskSize"
              :max=1000
              :step=10
              :points="[250,500]"
              style="width:300px;vertical-align: middle;">
            </i-slider>
            <InputNumber :max="1000" :min="dilatationForm.minDiskSize" v-model="dilatationForm.diskSize" :step=10
                         :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">GB</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="float: left">
          <span class="universal-middle">资费：</span>
          <span class="universal-price"> ￥{{ diskSizeExpenses }}</span>
          <span style="color: #2A99F2;font-size: 24px;"> / </span>
          <span style="font-size: 16px;color: #2A99F2;">{{dilatationDiskCaseType}}</span>
        </div>
        <Button type="ghost" @click="showModal.dilatationDisk = false">取消</Button>
        <Button type="primary" :disabled="dilatationForm.minDiskSize==dilatationForm.diskSize"
                @click="adjustDisk_ok">确认调整
        </Button>
      </div>
    </Modal>
    <!-- 删除磁盘模态框 -->
    <Modal v-model="showModal.deleteDisk" width="390" :scrollable="true">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除硬盘</strong>
          <p class="lh24"><span style="color: #2A99F2 ">（{{ diskName }}）</span>删除之后将进入回收站，新睿云将为您保留24小时，在24小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.deleteDisk = false">取消</Button>
        <Button type="primary" @click="deleteDisk_ok">确认删除</Button>
      </p>
    </Modal>

    <!-- 错误弹出框 -->
    <Modal v-model="showModal.error" :scrollable="true" :closable="false" :width="350">
      <p class="modal-content-s">
        <Icon type="close-circled" class="orange f24 mr10"></Icon>
        {{ errorMessage}}
      </p>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary" @click="showModal.error = false">确定</Button>
      </p>
    </Modal>

    <!-- 卸载硬盘确认框 -->
    <Modal v-model="showModal.diskUnload" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>卸载硬盘</strong>
          <p class="lh24">是否将确认将硬盘<span style="color: #2A99F2 ">（{{ diskName }}）</span>从主机<span style="color: #2A99F2 ">（{{ hostName }}）</span>卸载，卸载之后该主机将失去该硬盘所存信息
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.diskUnload = false">取消</Button>
        <Button type="primary" @click="diskUnload_ok">确认卸载</Button>
      </p>
    </Modal>

    <!-- 该磁盘已挂载主机，无法删除。弹出确认卸载框，点击卸载 -->
    <Modal v-model="showModal.beforeDelete" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除硬盘</strong>
          <p class="lh24">所选硬盘已挂载主机，无法删除，若您确认删除，请先卸载该硬盘</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.beforeDelete = false">取消</Button>
        <Button type="primary" @click="beforeDelete">卸载硬盘</Button>
      </p>
    </Modal>
    <!-- 修改磁盘名称模态框 -->
    <Modal v-model="showModal.modificationDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改硬盘</span>
      </p>
      <div>
        <Form :model="modificationDiskForm" :rules="modificationDiskRuleValidate" ref="modificationDisk">
          <Form-item label="硬盘名称" prop="diskName">
            <Input v-model="modificationDiskForm.diskName" placeholder="请输入"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modificationDisk = false">取消</Button>
        <Button type="primary"
                @click="_checkModificationDiskForm">确认修改
        </Button>
      </div>
    </Modal>
    <!-- 创建磁盘备份模态框 -->
    <Modal v-model="showModal.createDiskBackup" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建磁盘备份</span>
      </p>
      <div>
        <p style="margin-bottom: 20px">您正为<span style="color:#2A99F2">{{ backupForDiskName}}</span>创建备份</p>
        <div class="universal-modal-content-flex">
          <Form :model="createBackupsForm" :rules="createBackupsRuleValidate" ref="createBackups">
            <Form-item label="备份名称" prop="backupsName">
              <Input v-model="createBackupsForm.backupsName" placeholder="请输入"></Input>
            </Form-item>
          </Form>
          <p style="font-family: MicrosoftYaHei;font-size: 12px;line-height:20px;color: #999999;">提示：云硬盘数据服务为每块磁盘提供<span
            style="color:#2A99F2">8</span>个备份额度，当某块磁盘的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。</p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createDiskBackup = false">取消</Button>
        <Button type="primary"
                @click="_checkCreateBackupsForm">确认创建
        </Button>
      </div>
    </Modal>

  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions, diskTypeList} from '../../options'
  import debounce from 'throttle-debounce/debounce'
  import axios from 'axios'
  import regExp from '../../util/regExp'
  export default{
    data(){
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        dilatationDiskCaseType: '',
        // 磁盘列包含信息
        diskColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '硬盘名称',
            ellipsis: true,
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('diskInfo', JSON.stringify(params.row))
                      this.$router.push('DiskParticulars')
                    }
                  }
                }, params.row.diskname)
              } else {
                return h('span', {}, params.row.diskname)
              }
            }
          },
          {
            title: '硬盘类型',
            key: 'diskoffer',
            render: (h, params) => {
              return h('span', params.row.diskoffer == 'ssd' ? 'SSD存储' : params.row.diskoffer == 'sas' ? 'SAS存储' : 'SATA存储')
            }
          },
          {
            title: '容量',
            key: 'disksize',
            render: (h, params) => {
              return h('span', params.row.disksize + 'GB')
            }
          },
          {
            title: '状态',
            key: 'status',
            ellipsis: true,
            render: (h, params) => {
              const row = params.row
              const text = row.status === 0 ? '欠费' : (row.status === 1 && !row.mounton && !row.mountonname) ? '可挂载' : (row.status === 1 && row.mounton && row.mountonname) ? '已启用（' + row.mountonname + ')' : row.status === -1 ? '异常' : row.status === 2 ? '创建中' : row.status === 3 ? '删除中' : row.status === 4 ? '卸载中' : row.status === 5 ? '挂载中' :row.status === 6 ? '备份中': ''
              if (row.status == 2 || row.status == 3 || row.status == 4 || row.status == 5|| row.status == 6) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, text)])
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '计费类型',
            key: 'caseType',
            render: (h, params) => {
              return h('span', params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : '实时计费')
            }
          },
          {
            title: '价格',
            key: 'cpCase',
            render: (h, params) => {
              if (typeof (params.row.cpCase) != 'undefined') {
                return h('span', params.row.caseType == 1 ? params.row.cpCase + '元/年' : params.row.caseType == 2 ? params.row.cpCase + '元/月' : params.row.cpCase + '元/小时')
              } else {
                return h('span', '--')
              }
            }
          },
          {
            title: '创建时间',
            ellipsis: true,
            width:160,
            key: 'createtime',
          },
          {
            title: '操作',
            width: 200,
            render: (h, params) => {
              if (params.row.status == 1) {
                return h('div', {}, [
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.mount(params.row)
                      }
                    }
                  }, '挂载'),
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.unload(params.row)
                      }
                    }
                  }, '卸载'),
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.beforeCreateDiskBackup(params.row)
                      }
                    }
                  }, '备份'),
                  h('Dropdown', {
                    props: {
                      trigger: 'click'
                    }
                  }, [h('a', {
                    attrs: {
                      href: 'javascript:void(0)'
                    }
                  }, '更多操作'), h('DropdownMenu', {
                    slot: 'list'
                  }, [h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.dilatationDisk(params.row)
                      }
                    }
                  }, '扩容磁盘'), h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.modificationDisk(params.row)
                      }
                    }
                  }, '修改资料')])
                  ])])
              } else {
                return h('div', {}, [
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#495060',
                    }
                  }, '挂载'),
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#495060',
                    }
                  }, '卸载'),
                  h('span', {
                    style: {
                      marginRight: '10px',
                      color: '#495060',
                    }
                  }, '备份')])
              }
            }
          }
        ],
        // 磁盘数据
        diskData: [],
        // 控制模态框是否显示
        showModal: {
          // 新增磁盘模态框
          newDisk: false,
          // 挂载磁盘
          mountDisk: false,
          // 卸载硬盘
          diskUnload: false,
          // 磁盘扩容模态框
          dilatationDisk: false,
          // 删除磁盘模态框
          deleteDisk: false,
          // 挂载主机，弹出无法卸载框。
          beforeDelete: false,
          // 修改磁盘名称模态框
          modificationDisk: false,
          // 创建磁盘备份模态框
          createDiskBackup: false,
          // 错误提示框
          error: false
          /*

           mountDisk: false,
           */
        },
        // 新增磁盘表单
        diskForm: {
          diskName: '',
          diskType: '',
          diskArea: '',
          timeType: '',
          timeValue: '',
          diskSize: 20,
          // 购买磁盘数量
          quantity: 1,
        },
        modificationDiskForm: {
          diskName: '',
        },
        modificationDiskRuleValidate: {
          diskName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        // 挂载磁盘表单（只含有一个字段）
        diskMountForm: {
          mountHost: ''
        },
        // 磁盘扩容表单
        dilatationForm: {
          // 扩容后的磁盘大小
          diskSize: 0,
          // 扩容前的磁盘大小
          minDiskSize: 0
        },
        // 挂载磁盘表单验证规则
        mountRuleValidate: {
          mountHost: [
            {required: true, message: '请选择挂载主机', trigger: 'change'}
          ]
        },
        // 新增磁盘表单的验证规则
        newRuleValidate: {
          diskName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          diskType: [
            {required: true, message: '请选择磁盘类型', trigger: 'change'}
          ],
          diskArea: [
            {required: true, message: '请选择磁盘区域', trigger: 'change'}
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
        // 新建磁盘费用
        expenses: 0,
        // 磁盘区域列表
        diskAreaList: [],
        // 新建磁盘优惠费用
        coupon: 0,
        // 错误提示
        errorMessage: '',
        // 选中的磁盘对象
        diskSelection: null,
        // 操作对象
        operand: null,
        // 修改的磁盘名称
        diskName: '',
        // 需要备份的磁盘名称
        backupForDiskName: '',
        // 被卸载的磁盘的主机
        hostName: '',
        // 磁盘备份名称
        createBackupsForm: {
          backupsName: ''
        },
        // 新建备份表单验证
        createBackupsRuleValidate: {
          backupsName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        // 可挂载主机列表
        mountHostList: [],
        diskSizeExpenses: 0
      }
    },
    created(){
      this.diskAreaList = this.$store.state.zoneList
      this.listDisk()
    },
    methods: {
      /* 刷新页面 */
      refreshPage () {
        this.$router.go(0)
        this.listDisk()
      },
      refresh () {
        this.diskAreaList = this.$store.state.zoneList
        this.listDisk()
      },
      // 验证新建磁盘的表单
      _checkNewForm(){
        this.$refs.newDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            this.newDisk_ok()
          }
        })
      },
      // 验证挂载磁盘的表单
      _checkMountForm () {
        this.$refs.mountDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用挂载磁盘方法
            this.mountDisk_ok()
          }
        })
      },
      // 验证新建备份表单
      _checkCreateBackupsForm(){
        this.$refs.createBackups.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份策略方法
            this.createDiskBackup_ok()
          }
        })
      },
      // 验证修改磁盘表单
      _checkModificationDiskForm(){
        this.$refs.modificationDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份策略方法
            this.modificationDisk_ok()
          }
        })
      },
      listDisk(){
        this.$http.get('Disk/listDisk.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
     /*       response.data.result.forEach((item) => {
              if (item.status != 1) {
                item._disabled = true
              }
            })*/
            this.diskData = response.data.result
            this.diskSelection = null
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      // 弹出新建磁盘模态框
      newDisk(){
        this.showModal.newDisk = true
      },
      // 挂载磁盘到主机
      mount(data){
        if (!data.mounton && !data.mountonname && data.status == 1) {
          this.operand = data
          this.showModal.mountDisk = true
          this.$http.get('Disk/listAttachComputer.do?diskId=' + data.diskid).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.mountHostList = response.data.result
            }
          })
        } else {
          this.$message.error({
            content: '该硬盘已挂载主机“' + data.mountonname + '”，若需挂载其他主机请先卸载硬盘。'
          })
        }
      },
      // 从主机中卸载磁盘
      unload(data){
        this.operand = data
        if (this.operand.mounton  && this.operand.mountonname  && this.operand.status == 1) {
          this.showModal.diskUnload = true
          this.diskName = this.operand.diskname
          this.hostName = this.operand.mountonname
        } else {
          this.$message.error({
            content: '该硬盘没有挂载主机，无法卸载'
          })
        }
      },
      // 新建磁盘价格查询
      queryDiskPrice: debounce(500, function () {
        var diskType = ''
        var diskSize = ''
        if (this.diskForm.quantity === 1){
          diskType = this.diskForm.diskType
          diskSize = this.diskForm.diskSize + ''
        } else {
          for(var i = 0; i< this.diskForm.quantity; i++){
            diskType += this.diskForm.diskType + ','
            diskSize += this.diskForm.diskSize + ','
          }
          diskType = diskType.substring(0,diskType.length - 1)
          diskSize = diskSize.substring(0,diskSize.length - 1)
        }
        this.$http.post('device/QueryBillingPrice.do', {
          cpuNum: 0 + '',
          memory: 0 + '',
          diskSize: diskSize,
          zoneId: this.$store.state.zoneList[0].zoneid,
          timeType: this.diskForm.timeType + '',
          timeValue: this.diskForm.timeValue + '',
          diskType: diskType
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.expenses = response.data.cost
            if (response.data.coupon) {
              this.coupon = response.data.coupon
            } else {
              this.coupon = 0
            }
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      }),
      // 磁盘扩容价格查询
      queryDiskCost: debounce(500, function () {
        axios.get(`Disk/UpDiskConfigCost.do?diskId=${this.operand.diskid}&diskSize=${this.dilatationForm.diskSize}&zoneId=${this.operand.zoneid}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskSizeExpenses = response.data.result
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      }),
      // 确认创建磁盘
      newDisk_ok(){
        var diskType = ''
        var diskSize = ''
        if (this.diskForm.quantity === 1){
          diskType = this.diskForm.diskType
          diskSize = this.diskForm.diskSize + ''
        } else {
          for(var i = 0; i< this.diskForm.quantity; i++){
            diskType += this.diskForm.diskType + ','
            diskSize += this.diskForm.diskSize + ','
          }
          diskType = diskType.substring(0,diskType.length - 1)
          diskSize = diskSize.substring(0,diskSize.length - 1)
        }
        // 默认zoneList第一个元素为当前选中区域，以后会修改
        var url = `Disk/createVolume.do?diskSize=${diskSize}&diskName=${this.diskForm.diskName}&diskOfferingId=${diskType}&timeType=${this.diskForm.timeType}&timeValue=${this.diskForm.timeValue || 1}&isAutorenew=0`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      // 选中表中的一项
      selectDisk(currentRow){
        this.diskSelection = currentRow
      },
      // 打开扩容模态框
      dilatationDisk(data){
        if (data.status == 1) {
          this.operand = data
          this.dilatationForm.diskSize = this.operand.disksize
          this.dilatationForm.minDiskSize = this.dilatationForm.diskSize
          switch(this.operand.caseType) {
            case 1:
             this.dilatationDiskCaseType = '年'
                  break;
            case 2:
              this.dilatationDiskCaseType = '月'
              break;
            case 3:
              this.dilatationDiskCaseType = '时'
              break;
         }

          this.showModal.dilatationDisk = true
        } else {
          this.$message.error({
            content: '该硬盘当前状态下不能扩容'
          })
        }
      },
      // 修改磁盘名称弹出模态框
      modificationDisk(data){
        if (data.status == 1) {
          this.operand = data
          this.showModal.modificationDisk = true
          this.modificationDiskForm.diskName = this.operand.diskname
        } else {
          this.$message.error({
            content: '该硬盘当前状态下不能修改'
          })
        }
      },
      // 删除跳转到卸载模态框
      beforeDelete(){
        this.showModal.beforeDelete = false
        this.operand = this.diskSelection
        this.diskName = this.operand.diskname
        this.hostName = this.operand.mountonname
        this.showModal.diskUnload = true
      },
      // 删除磁盘
      deleteDisk(){
        if (this.checkSelect() == true) {
          if (this.diskSelection.status == 1 && this.diskSelection.mounton  && this.diskSelection.mountonname ) {
            // 该磁盘已挂载主机，无法删除。弹出确认卸载框，点击卸载
            this.showModal.beforeDelete = true
          } else if (this.diskSelection.caseType != 1 && this.diskSelection.caseType != 2) {
            // 弹出删除框
            this.showModal.deleteDisk = true
            this.diskName = this.diskSelection.diskname
          } else {
            this.$message.error({
              content: '包年包月资费资源无法删除'
            })
          }
        }
      },
      // 检测是否选中一项数据
      checkSelect(){
        if (this.diskSelection == null) {
          this.$Message.info('请选择需要删除的磁盘')
          return false
        }
        return true
      },
      /* 确认卸载磁盘 */
      diskUnload_ok(){
        this.showModal.diskUnload = false
        this.diskData.forEach(item => {
          if (item.diskid == this.operand.diskid) {
            item.status = 4
          }
        })
        axios.get(`Disk/detachVolume.do?zoneId=${this.operand.zoneid}&diskId=${this.operand.diskid}&VMId=${this.operand.mounton}`).then(response => {
          this.listDisk()
          if (response.status == 200 && response.statusText == 'OK') {
            this.$Message.info({
              content: response.data.message,
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认修改磁盘名称 */
      modificationDisk_ok(){
        this.$http.get('Disk/updateDisk.do?diskId=' + this.operand.diskid + '&diskName=' + this.modificationDiskForm.diskName).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.info({
              content: response.data.message,
            })
            this.showModal.modificationDisk = false
            this.listDisk()
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认删除磁盘 */
      deleteDisk_ok(){
        this.showModal.deleteDisk = false
        this.diskData.forEach(item => {
          if (item.diskid == this.diskSelection.diskid) {
            item.status = 3
          }
        })
        this.$http.get('Disk/delDisk.do?id=' + this.diskSelection.id + '').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.info({
              content: response.data.message,
            })
            this.listDisk()
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认挂载磁盘 */
      mountDisk_ok(){
        this.showModal.mountDisk = false
        this.diskData.forEach(item => {
          if (item.diskid == this.operand.diskid) {
            item.status = 5
          }
        })
        this.$http.get('Disk/attachVolume.do?diskId=' + this.operand.diskid + '&VMId=' + this.diskMountForm.mountHost).then(response => {
          this.listDisk()
          if (response.status == 200 && response.statusText == 'OK') {
            this.$Message.info({
              content: response.data.message,
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认扩容磁盘 */
      adjustDisk_ok(){
        this.$http.get('Disk/UpDiskConfig.do?diskId=' + this.operand.diskid + '&diskSize=' + this.dilatationForm.diskSize).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.$store.commit('setSelect', 'order')
            this.$router.push('order')
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 创建磁盘备份前的方法 （判断是否可以创建） */
      beforeCreateDiskBackup(data) {
        if (data.status == 1) {
          this.backupForDiskName = data.diskname
          this.operand = data
          this.showModal.createDiskBackup = true
        } else {
          this.$message.error({
            content: '该硬盘当前状态下不能备份'
          })
        }
      },
      /* 确认创建磁盘备份 */
      createDiskBackup_ok() {
        this.showModal.createDiskBackup = false
        this.diskData.forEach(item => {
          if (item.diskid == this.operand.diskid) {
            item.status = 6
          }
        })
        var url = `Snapshot/createDiskSnapshot.do?diskId=${this.operand.diskid}&name=${this.createBackupsForm.backupsName}&zoneId=${this.operand.zoneid}`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.info(response.data.message)
            this.$router.push('diskBackup')
          } else {
            this.$message.error({
              content: response.data.message
            })
            this.refresh()
          }
        })
      },
      /* 购买数量操作 */
      reduce () {
        this.diskForm.quantity -= 1
        switch (this.diskForm.quantity) {
          case 0:
            this.diskForm.quantity = 1
            break
          default:
            break
        }
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
      },
      auth(){
        return this.$store.state.userInfo.personalauth == 0 || this.$store.state.userInfo.companyauth == 0

      }
    },
    watch: {
      // 观测计算属性变化，如果不是名称的变化则必须重新计算价格
      // 新建磁盘价格计算
      'copyDiskForm': {
        handler: function (val, oldVal) {
          if (val.timeType == 'current' || ((val.timeType && val.timeValue) && val.diskType)) {
            if (val.diskName === oldVal.diskName) {
              this.expenses = '正在计算'
              this.coupon = 0
              this.queryDiskPrice()
            }
          }
        },
        deep: true
      },
      // 磁盘扩容价格计算
      'dilatationForm.diskSize'(){
        this.diskSizeExpenses = '正在计算'
        this.queryDiskCost()
      },
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
