<template>
  <div id="buy">
    <div id="wrapper">
      <div id="header" style="margin-bottom: 30px">
        <Select @on-change="change" v-model="product.currentProduct" class="mySelect" style="width: 102px">
          <Option v-for="item in product.productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <router-link :to="`/ruicloud/${docPath}`" target="_blank">查看产品详情</router-link>
      </div>
      <div id="body">
        <router-view/>
        <div id="list">
          <div ref="list"
               style="padding:30px 30px 0 30px;background-color: #ffffff;max-height: 1050px;overflow-y: auto">
            <p
              style="font-size: 24px;color: #333333;line-height: 43px;text-align: center;border-bottom: 1px solid #D9D9D9; padding-bottom: 30px;">
              价格预算清单</p>
            <div v-for="(prod,index) in cart" ref="detailed" style="padding-top: 20px">
              <div style="display: flex;justify-content: space-between;">
                <h2 style="width:110px;text-align: center;font-size: 18px;color: #333333;line-height: 32px;">
                  {{prod.typeName}}</h2>
                <p
                  style="cursor: pointer;font-family: Microsoft YaHei;font-size: 14px;color: #2A99F2; line-height: 25px;"
                  @click="delDetailed(index)">删除</p>
              </div>
              <div style="padding-top:20px">
                <!--公共展示区-->
                <div class="public">
                  <p class="item"><span class="hidden">$</span><span class="title">区域</span><span
                    class="hidden">#</span>{{prod.zone.zonename}}
                  </p>
                  <p class="item">
                    <span class="hidden">$</span><span class="title">计费模式</span><span class="hidden">#</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月`:prod.timeForm.currentTimeType=='current'?'实时计费':'七天计费'}}
                  </p>
                  <p class="item" v-if="prod.timeForm.currentTimeType=='annual'">
                    <span class="hidden">$</span><span class="title">购买时长</span><span
                    class="hidden">#</span>{{prod.timeForm.currentTimeValue.label}}
                  </p>
                </div>
                <!--快速创建主机-->
                <div v-if="prod.createType=='fast'">
                  <!--公共镜像-->
                  <p class="item" v-if="prod.currentType=='public'">
                    <span class="hidden">$</span>
                    <span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.system.systemName}}
                  </p>
                  <!--自定义镜像-->
                  <p class="item" v-if="prod.currentType=='custom'">
                    <span class="hidden">$</span><span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.customMirror.templatename}}
                  </p>

                  <p class="item"><span class="hidden">$</span><span class="title">配置</span><span
                    class="hidden">#</span>{{`${prod.currentSystem.kernel}核${prod.currentSystem.RAM}G、${prod.publicIP?prod.currentSystem.bandWidth:0}M带宽、${prod.currentSystem.diskSize}G系统盘`}}
                  </p>
                </div>
                <!--自定义创建主机-->
                <div v-if="prod.createType=='custom'">
                  <!--公共镜像-->
                  <p class="item" v-if="prod.currentType=='public'">
                    <span class="hidden">$</span>
                    <span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.system.systemName}}
                  </p>
                  <!--自定义镜像-->
                  <p class="item" v-if="prod.currentType=='custom'">
                    <span class="hidden">$</span><span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.customMirror.templatename}}
                  </p>

                  <p class="item" v-if="prod.IPConfig.publicIP">
                    <span class="hidden">$</span>
                    <span class="title">配置</span><span
                    class="hidden">#</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.IPConfig.bandWidth}M带宽、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <p class="item" v-else><span class="title">配置</span><span class="hidden">#</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <!--快速创建没有数据盘，只有自定义配置包含硬盘-->
                  <p class="item" v-for="disk in prod.dataDiskList">
                    <span class="hidden">$</span>
                    <span class="title">硬盘</span><span
                    class="hidden">#</span>{{disk.size+disk.label}}
                  </p>
                </div>
                <!--磁盘清单字段-->
                <div v-if="prod.type=='Pdisk'">
                  <p class="item" v-for="disk in prod.dataDiskList">
                    <span class="hidden">$</span>
                    <span class="title">硬盘</span><span class="hidden">#</span>{{disk.size}}G{{disk.label}}
                  </p>
                </div>

                <!--公网IP清单字段-->
                <div v-if="prod.type=='Peip'">
                  <p class="item">
                    <span class="hidden">$</span>
                    <span class="title">带宽</span><span class="hidden">#</span>{{prod.bandWidth}}M
                  </p>
                </div>
                <!--云数据库清单字段-->
                <div v-if="prod.type=='Pdata'">
                  <p class="item">
                    <span class="hidden">$</span><span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.system.systemName}}
                  </p>
                  <p class="item" v-if="prod.IPConfig.publicIP">
                    <span class="hidden">$</span>
                    <span class="title">带宽</span><span class="hidden">#</span>{{prod.IPConfig.bandWidth}}M
                  </p>
                  <p class="item" v-for="disk in prod.dataDiskList">
                    <span class="hidden">$</span>
                    <span class="title">硬盘</span><span class="hidden">#</span>{{disk.size}}G{{disk.label}}
                  </p>
                </div>
                <!--gpu清单字段-->
                <div v-if="prod.type=='Pgpu'">
                  <p class="item">
                    <span class="hidden">$</span><span class="title">镜像</span><span
                    class="hidden">#</span>{{prod.system.systemName}}
                  </p>
                  <p class="item">
                    <span class="hidden">$</span><span class="title">GPU</span><span
                    class="hidden">#</span>{{`${prod.gpuSelection.gputype}、${prod.gpuSelection.gpusize}*${prod.gpuSelection.memory}GB`}}
                  </p>
                  <p class="item" v-if="prod.IPConfig.publicIP">
                    <span class="hidden">$</span>
                    <span class="title">带宽</span><span class="hidden">#</span>{{prod.IPConfig.bandWidth}}M
                  </p>
                  <p class="item" v-for="disk in prod.dataDiskList">
                    <span class="hidden">$</span>
                    <span class="title">硬盘</span><span class="hidden">#</span>{{disk.size}}G{{disk.label}}
                  </p>
                </div>
                <!--对象存储清单字段-->
                <div v-if="prod.type=='Pobj'">
                  <p class="item">
                    <span class="hidden">$</span><span class="title">存储包</span><span
                    class="hidden">#</span>{{prod.save}}
                  </p>
                  <p class="item">
                    <span class="hidden">$</span><span class="title">下行流量包</span><span
                    class="hidden">#</span>{{prod.downLoad}}
                  </p>
                </div>
                <!--底部价格公共区域-->
                <div style="border-bottom:1px solid #ccc;padding-bottom: 20px">
                  <p class="item" style="margin-top: 10px">
                    <span class="hidden">$</span>
                    <span class="title" style="vertical-align: middle">价格</span>
                    <span class="hidden">#</span>
                    <span style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{(prod.cost * prod.count).toFixed(2)}}元</span>
                  </p>
                  <p class="item" style="margin-top: 10px">
                    <span class="title" style="vertical-align: middle">购买数量</span>
                  <ul style="display: inline-block;font-size: 14px;user-select: none">
                    <span class="numberAdd" v-if="prod.count == 1">-</span>
                    <span class="numberAdd" style="cursor: pointer"
                          @click="prod.count -= 1" v-else>-</span>
                    <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                    <span class="numberMinus" v-if="prod.count == 5">+</span>
                    <span class="numberMinus" style="cursor: pointer"
                          @click="prod.count += 1" v-else>+</span>
                  </ul>
                  </p>

                </div>
              </div>
            </div>
          </div>
          <div
            style="padding:30px 40px;box-shadow: 0 2px 14px 0 rgba(193,193,193,0.30);background-color: #ffffff;width:380px;"
            ref="buyDiv">
            <p
              style="font-size: 14px;margin:10px 0px;vertical-align:middle;color: #666666;line-height: 25px;text-align: center">
              总计：<span class="hidden">#</span><span
              style="font-size: 24px;color: #F85E1D;line-height: 25px;vertical-align: middle;margin-left:10px;user-select: none;">{{billListCost.toFixed(2)}}元</span>
            </p>
            <button @click="buyNow"
                    style="display:block;width:300px;margin-bottom: 10px;cursor: pointer;outline: none;padding: 10px 38px; border: 1px solid #2A99F2;border-radius: 10px;background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);border-radius: 10px;font-size: 16px;color: #FFF;">
              立即购买
            </button>
            <button class="buyButton" style="display:block;width:300px;" @click="exportXLSX">导出预算清单</button>
            <p style="font-size: 12px;color: #333333;margin:20px 0px 10px;">如有需要请联系客服，或者致电：400-0505-565</p>
            <p style="font-size: 12px;color: #999999;line-height: 21px;">关闭该页面后系统不会保存清单内容，如您需要请及时导出清单。</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showModal.login" width="420" class="login-modal" :scrollable="true">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="body">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="text" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit" onfocus="this.type='password'">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import XLSX from 'xlsx'
  import XLSX_SAVE from 'file-saver'
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  import regExp from '@/util/regExp'
  import uuid from 'uuid'

  // xlsx 文件输出操作方法
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }

  export default {
    data() {
      var cart = []
      if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'))
      }
      var zone = null
      this.$store.state.zoneList.forEach(item => {
        if (item.isdefault === 1) {
          zone = item
        }
      })
      return {
        zone,
        // 产品类型及选中类型
        product: {
          currentProduct: this.$route.name,
          productList: [{label: '云主机', value: 'bhost'}, {label: '云硬盘', value: 'bdisk'}, {
            label: '公网IP',
            value: 'bip'
          }, {label: '数据库', value: 'bdata'}, {label: '对象存储', value: 'bobj'}, {label: 'GPU服务器', value: 'bgpu'}]
        },
        // 当前可以创建的剩余资源数
        remainCount: {},
        // 登录Modal需要的数据
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
        },
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          }
        },
        imgSrc: '/ruicloud/user/getKaptchaImage.do',
        showModal: {
          login: false
        },
        // 购物车
        cart,
        // 区域核心内存配置详细信息
        info: [],
        scrollFun: () => {
          if (window.innerHeight - this.$refs.list.getBoundingClientRect().bottom < 246) {
            this.$refs.buyDiv.style.position = 'fixed'
            this.$refs.buyDiv.style.bottom = 0
          } else {
            this.$refs.buyDiv.style.position = 'unset'
          }
        }
      }
    },
    created(){
      this.$http.get('information/getServiceoffers.do').then(
        response => {
          this.info = response.data.info
        }
      )
      scrollTo(0, 0)
    },
    mounted(){
      window.addEventListener('scroll', this.scrollFun)
    },
    methods: {
      submit() {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$router.go(0)
            } else {
              this.imgSrc = `/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        })
      },
      // 立即购买
      buyNow() {
        if (this.cart.length == 0) {
          this.$message.info({
            content: '请添加商品到清单'
          })
          return
        }
        if (this.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var PromiseList = []
        // 批次号
        var countOrder = uuid.v4()
        // 创建的主机数量  创建的磁盘数量 创建的公网IP数量
        for (var prod of this.cart) {
          if (prod.type == 'Pecs') {
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              templateId: prod.currentType == 'public' ? prod.system.systemtemplateid : prod.customMirror.systemtemplateid,
              isAutoRenew: prod.autoRenewal ? '1' : '0',
              count: prod.count,
              countOrder
            }
            // 快速创建主机
            if (prod.createType == 'fast') {
              params.cpuNum = prod.currentSystem.kernel
              params.memory = prod.currentSystem.RAM
              params.bandWidth = prod.publicIP ? prod.currentSystem.bandWidth : 0
              params.rootDiskType = prod.currentSystem.diskType
              params.networkId = 'no'
              params.vpcId = 'no'
            } else {
              params.cpuNum = prod.vmConfig.kernel
              params.memory = prod.vmConfig.RAM
              params.bandWidth = prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0
              params.rootDiskType = prod.vmConfig.diskType
              params.networkId = prod.network
              params.vpcId = prod.vpc
              var diskType = '', diskSize = ''
              for (let disk of prod.dataDiskList) {
                diskType += `${disk.type},`
                diskSize += `${disk.size},`
              }
              params.diskType = diskType
              params.diskSize = diskSize
            }
            if (prod.currentType === 'app') {
              params.templateId = prod.currentApp.templateid
            } else if (prod.currentType === 'public') {
              params.templateId = prod.system.systemId
            } else {
              params.templateId = prod.customMirror.systemtemplateid
            }
            // 设置了主机名和密码
            if (prod.currentLoginType == 'custom') {
              params.VMName = prod.computerName
              params.password = prod.password
            }
            PromiseList.push(axios.get('information/deployVirtualMachine.do', {params}))
          } else if (prod.type == 'Pdisk') {
            var diskSize = ''
            var diskType = ''
            var count = prod.count
            // 多个磁盘订单
            for (var i = 0; i < count; i++) {
              prod.dataDiskList.forEach(item => {
                diskSize += `${item.size},`
                diskType += `${item.type},`
              })
            }
            var params = {
              zoneId: prod.zone.zoneid,
              diskSize: diskSize,
              diskName: prod.diskName,
              diskOfferingId: diskType,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutorenew: prod.autoRenewal ? '1' : '0',
              countOrder
            }
            PromiseList.push(axios.get('Disk/createVolume.do', {params}))
          } else if (prod.type == 'Peip') {
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              count: prod.count,
              isAutorenew: prod.autoRenewal ? '1' : '0',
              brandWith: prod.bandWidth,
              vpcId: prod.vpc,
              countOrder
            }
            PromiseList.push(axios.get('network/createPublicIp.do', {params}))
          } else if (prod.type == 'Pdata') {
            for (var i = 0; i < count; i++) {
              prod.dataDiskList.forEach(item => {
                diskSize += `${item.size},`
                diskType += `${item.type},`
              })
            }
            var params = {
              zoneId: prod.zone.zoneid,
              templateId: prod.system.systemId,
              bandWidth: prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutoRenew: prod.autoRenewal ? '1' : '0',
              count: prod.count,
              cpuNum: prod.vmConfig.kernel,
              memory: prod.vmConfig.RAM,
              networkId: prod.network,
              rootDiskType: 'ssd',
              vpcId: prod.vpc,
              diskSize,
              diskType,
              countOrder,
            }
            if (prod.VMName.trim() != '') {
              params.VMName = prod.VMName
            }
            PromiseList.push(axios.get('database/createDB.do', {params}))
          } else if (prod.type == 'Pgpu') {


            var diskSize = '', diskType = ''
            prod.dataDiskList.forEach(item => {
              diskSize += `${item.size},`
              diskType += `${item.type},`
            })
            let params = {
              zoneId: prod.zone.zoneid,
              templateId: prod.currentType == 'public' ? prod.system.systemId : prod.customMirror.systemtemplateid,
              bandWidth: prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              count: prod.count,
              isAutoRenew: prod.autoRenewal ? '1' : '0',
              cpuNum: prod.gpuSelection.cpunum,
              memory: prod.gpuSelection.memory,
              networkId: prod.network,
              //ipAddress,
              rootDiskType: prod.gpuSelection.rootdisktype,
              vpcId: prod.vpc,
              gpusize: prod.gpuSelection.gpusize,
              serviceType: prod.gpuSelection.servicetype,
              diskType,
              diskSize,
              countOrder
            }
            // 设置了主机名和密码
            if (prod.currentLoginType == 'custom') {
              params.VMName = prod.computerName
              params.password = prod.password
            }
            PromiseList.push(axios.get('gpuserver/createGpuServer.do', {params}))
          }
        }
        sessionStorage.removeItem('cart')
        Promise.all(PromiseList).then(responseList => {
          if (responseList.every(item => {
              return item.status == 200 && item.data.status == 1
            })) {
            this.$router.push({
              path: '/ruicloud/order', query: {
                countOrder
              }
            })
          } else {
            this.$message.info({
              content: responseList[0].data.message
            })
          }
        })

      },
      /* 删除一条购买清单 */
      delDetailed(index) {
        this.cart.splice(index, 1)
        this.store()
      },
      // 订单信息存入sessionStorage
      store() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart))
      },
      change(value){
        this.$router.push(`/ruicloud/buy/${value}`)
      },
      // 导出清单
      exportXLSX() {
        if (this.cart.length != 0) {
          // 记录当前行数
          let currentRow = 0
          let data = []
          for (let i = 0; i < this.cart.length; i++) {
            let contentArray = this.$refs.detailed[i].innerText.replace(/[\r\n'删除']/g, ' ').split('$')
            //第一行字段代表订单类型特殊处理
            data[currentRow] = new Array(2)
            data[currentRow][0] = contentArray[0].trim()
            currentRow++
            for (let j = 1; j < contentArray.length; j++) {
              data[currentRow] = new Array(2)
              data[currentRow][0] = contentArray[j].split('#')[0].trim()
              data[currentRow][1] = contentArray[j].split('#')[1].trim()
              currentRow++
            }
            data[currentRow] = new Array(2)
            currentRow++
          }
          // covert json to sheet
          const ws = XLSX.utils.aoa_to_sheet(data)
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
          // save
          const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
          XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'detailedList.xlsx')
        }
      },
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      userInfo(){
        return this.$store.state.userInfo
      },
      // 商品清单总价
      billListCost() {
        var cost = 0
        for (var prod of this.cart) {
          cost += prod.cost * prod.count
        }
        return cost
      },
      docPath(){
        let map = {
          bhost: 'Pecs',
          bdisk: 'Pdisk',
          bip: 'Peip',
          bdata: 'PdataBase',
          bgpu: 'Pgpu',
          bobj: 'PobjStorage',
        }
        return map[this.product.currentProduct]
      }
    },
    watch: {
      'cart': {
        handler(){
          this.store()
        },
        deep: true
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollFun)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #buy {
    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          //width: 101px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          padding: 6px 15px;
          display: inline-block;
        }
        .timeType {
          width: 55px;
          margin: 0px;
          border: 1px solid #d9d9d9;
          border-right: none;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          padding: 6px 0px;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .item-wrapper {
          margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
      }
    }
  }

  .body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .foot {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
</style>
