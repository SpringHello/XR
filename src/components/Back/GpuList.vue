<template>
    <div id="background">
      <div id="wrapper">
          <p style="margin: 20px 0 20px 0;">云服务器 / <span style="color:#666666">GPU云服务器</span></p>
        <div id="content">
            <div id="header">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fuzaijunheng2"></use>
              </svg>
              <span id="title">GPU云服务器</span>
              <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
            </div>
          <div class="text-box">
            <p></p>
          </div>
          <div style="margin:16px 0 16px 0;">
            <Button type="primary" @click="$router.push({path:'/ruicloud/buy/bgpu'})">创建</Button>
            <div style="display: inline-block;float: right;">
              <Select v-model="gpuTimeValue" style="width:200px" placeholder="计费类型" @on-change="getGpuServerList">
                <Option v-for="item in gpuTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="gpuStatus" style="width:200px" placeholder="主机状态" @on-change="getGpuServerList">
                <Option v-for="item in gpuStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <Table :columns="hostList" :data="hostData"></Table>
        </div>
      </div>

      <!--绑定IP-->
      <Modal title="绑定IP"  :mask-closable="false" v-model="showModal.ipShow">
        <Form ref="ipValidate" :model="ipValidate" :rules="ipRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="ip">
            <Select v-model="ipValidate.ip" placeholder="请选择IP" style="width: 200px">
              <Option v-for="item in ipValidate.ipList" :value="item.publicipid" :key="item.publicipid">{{item.publicip}}</Option>
            </Select>
            <span style="color: #2A99F2;cursor: pointer;" @click="$router.push('buy/bip')">购买弹性IP</span>
          </FormItem>
        </Form>
        <br>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.ipShow=false">取消</Button>
          <Button type="primary" @click="bindipSubmit">确定</Button>
        </div>
      </Modal>



      <!--制作快照-->
      <!--<Modal v-model="showModal.snapshot" width="550" :scrollable="true" class="create-snas-modal">-->
        <!--<p slot="header" class="modal-header-border">-->
          <!--<span class="universal-modal-title">制作快照</span>-->
        <!--</p>-->
        <!--<div class="universal-modal-content-flex">-->
          <!--<p class="mb20">您正为<span class="bluetext">{{companyname}}</span>制作快照</p>-->
          <!--<Form ref="snapshotValidate" :model="snapshotValidate" :rules="snapshotRuleValidate">-->
            <!--<FormItem label="快照名称" prop="name">-->
              <!--<Input v-model="snapshotValidate.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>-->
            <!--</FormItem>-->
            <!--<div style="padding-top: 11px;margin-right: 100px;">-->
              <!--<div style="font-size: 14px;color:#495060;margin-bottom: 15px">是否保存内存信息-->
                <!--<Poptip trigger="hover" width="400">-->
                  <!--<Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>-->
                  <!--<div slot="content">-->
                    <!--<div>-->
                      <!--您可以选择在制作快照的时候保存您主机的当前运行状态。当您选择“保存”之时，-->
                      <!--当前主机的内存将被记录，在您对快照执行回滚操作的时候，也只能在开机状态下执行；当您选择“不保存”时-->
                      <!--此次快照将不记录主机内存信息，您在通过该快照回滚的时候只能在关机状态下执行。-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</Poptip>-->
              <!--</div>-->
              <!--<RadioGroup v-model="snapshotValidate.memory">-->
                <!--<Radio label="1">保存</Radio>-->
                <!--<Radio label="0">不保存</Radio>-->
              <!--</RadioGroup>-->
            <!--</div>-->
          <!--</Form>-->
          <!--<p class="modal-text-hint-bottom">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点-->
          <!--</p>-->
        <!--</div>-->
        <!--<div slot="footer" class="modal-footer-border">-->
          <!--<Button type="ghost" @click="showModal.snapshot = false">取消</Button>-->
          <!--<Button type="primary" @click="createVMSnapshot">确定</Button>-->
        <!--</div>-->
      <!--</Modal>-->


      <!--制作镜像-->
      <Modal title="制作镜像" width="550" :mask-closable="false" v-model="showModal.mirror">
        <hr size="1" color="#999999">
        <br>
        <Form ref="mirrorValidate" :model="mirrorValidate" :rules="mirrorRuleValidate" label-position="top" inline>
          <FormItem label="镜像名称" prop="name">
            <Input v-model="mirrorValidate.name" placeholder="小于20位数字或字母" style="width: 200px;"></Input>
          </FormItem>
          <FormItem label="描述" prop="descript" style="margin-left: 15px;">
            <Input type="textarea" :rows="2" placeholder="小于20个字(选填)" v-model="mirrorValidate.descript" style="width: 200px;"></Input>
          </FormItem>
        </Form>
        <br>
        <hr size="1" color="#999999">
        <br>
        <div slot="footer">
          <Button type="ghost" @click="showModal.mirror = false">取消</Button>
          <Button type="primary" @click="createMrrior">确定</Button>
        </div>
      </Modal>

      <!--主机续费-->
      <Modal title="主机续费" width="550" :mask-closable="false" v-model="showModal.renew" >
        <Form ref="renewValidate" :model="renewValidate" :rules="renewRuleValidate" label-position="top" inline>
          <FormItem label="付费类型" prop="name">
            <Select v-model="timeType" placeholder="请选择付费类型" style="width: 200px" @on-change="renewChange">
              <Option v-for="item in renewValidate.time" :value="item.value" :key="item.value">{{item.timeType}}</Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长" prop="name">
            <Select v-model="timeValue" placeholder="请选择付费时长" style="width: 200px" @on-change="getGpuMonery">
              <Option v-for="item in timeValueList" :value="item.label" :key="item.label">{{item.value}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
        <br>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.renew=false">取消</Button>
          <Button type="primary" @click="setGPuMoney">确定</Button>
        </div>
      </Modal>

      <!--公网IP没购买弹窗-->
      <Modal v-model="showModal.publicIPHint" :scrollable="true" :closable="false" :width="390">
        <div class="modal-content-s">
          <Icon type="android-alert" class="yellow f24 mr10"></Icon>
          <div>
            <strong>提示</strong>
            <p class="lh24">您还未拥有公网IP，请先创建公网IP。</p>
          </div>
        </div>
        <p slot="footer" class="modal-footer-s">
          <Button @click="showModal.publicIPHint = false">取消</Button>
          <Button type="primary" @click="$router.push('buy/bip')">创建公网IP</Button>
        </p>
      </Modal>

    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import merge from 'merge'
  const snoapshotName = (rule,value,callback)=>{
    let reg = /^[0-9]{2,4094}$/
    if(value == ''){
      return callback(new Error('请输入快照名称'));
    }else if(!reg.test(value)){
      return callback(new Error('快照名称格式不正确'));
    }else{
      callback();
    }
  }
  const mirrorName = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]{1,20}$/;
    if(value == ''){
      return callback(new Error('请输入镜像名称'));
    }else if(!reg.test(value)){
      return callback(new Error('镜像名称格式不正确'));
    }else {
      callback();
    }
  }

    export default{
      data(){
        return{
          //GPU的数据库ID
          VMId:'',
          //GPU的computerid
          uuId:'',
          //主机名称
          companyname:'',

          //筛选主机
          gpuTimeValue:'',
          gpuTimeList:[
            {
              value:'',
              label:'请选择'
            },
            {
              value:'1',
              label:'包年'
            },
            {
              value:'2',
              label:'包月'
            },
            {
              value:'3',
              label:'实时'
            }
          ],
          gpuStatus:'',
          gpuStatusList:[
            {
              value:'',
              label:'请选择'
            },
            {
              value:'0',
              label:'关机'
            },
            {
              value:'1',
              label:'开机'
            }
          ],

          //续费原价
          originCost:'--',
          //现价
          cost:'--',

          //是否显示弹出框
          showModal:{
            ipShow:false,
            // snapshot:false,
            mirror:false,
            renew:false,
            publicIPHint:false
          },
          //弹性ip
          ipValidate:{
            ip:'',
            ipList:[]
          },
          ipRuleValidate:{
            ip:[
              {required:true,message:'请选择IP',trigger:'change'}
            ]
          },
          vpcId:'',

          //制作快照
          snapshotValidate:{
            name:'',
            memory:'1'
          },
          snapshotRuleValidate:{
            name:[
              {required:true,validator:snoapshotName,trigger:'blur'}
            ]
          },

          //制作镜像
          mirrorValidate:{
            name:'',
            descript:'',
            rootdiskid:''
          },
          mirrorRuleValidate:{
            name:[
              {required:true,validator:mirrorName,trigger:'blur'}
            ]
          },

          //主机续费
          renewValidate:{
            time:[
              {
                value:'year',
                timeType:'包年',
                date:[
                  {
                    value:'1年',
                    label:'1'
                  },
                  {
                    value:'2年',
                    label:'2'
                  },
                  {
                    value:'3年',
                    label:'3'
                  },
                ]
              },
              {
                value:'month',
                timeType:'包月',
                date:[
                  {
                    value:'1月',
                    label:'1'
                  },
                  {
                    value:'2月',
                    label:'2'
                  },
                  {
                    value:'3月',
                    label:'3'
                  },
                  {
                    value:'4月',
                    label:'4'
                  },
                  {
                    value:'5月',
                    label:'5'
                  },
                  {
                    value:'6月',
                    label:'6'
                  },
                  {
                    value:'7月',
                    label:'7'
                  },
                  {
                    value:'8月',
                    label:'8'
                  },
                  {
                    value:'9月',
                    label:'8'
                  },
                  {
                    value:'10月',
                    label:'10'
                  },
                ]
              }
            ],
          },
          renewRuleValidate:{},
          timeType:'',
          timeValue:'',
          timeValueList:[],

          //table
          hostList:[
            {
              title:'用户名称/唯一名称',
              width:'109',
              render:(h,params)=> {
                //创建中
                if (params.row.status == 2 && params.row.computerstate == undefined) {
                  return h('div', [
                    h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }),
                    h('span', {
                      style: {
                        color: '#2A99F2',
                        cursor: 'pointer'
                      },
                    }, '创建中')])
                } else if (params.row.status == 3) {
                  //删除中
                  return h('div', [
                    h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }),
                    h('span', {
                      style: {
                        color: '#2A99F2',
                        cursor: 'pointer'
                      },
                    }, '删除中')])
                } else if (params.row.status == 2 && params.row.computerstate == 0) {
                  return h('div', [
                    h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }),
                    h('span', {
                      style: {
                        color: '#2A99F2',
                        cursor: 'pointer'
                      },
                    }, '开机中')])
                }else if(params.row.status == 2 && params.row.computerstate == 1){
                  return h('div', [
                    h('Spin', {
                      style: {
                        display: 'inline-block'
                      }
                    }),
                    h('span', {
                      style: {
                        color: '#2A99F2',
                        cursor: 'pointer'
                      },
                    },'关机中')])
                }else{
                  return h('div',[
                    h('span',{
                      style:{
                        color:'#2A99F2',
                        cursor:'pointer',
                        overflow:'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width:'100px'
                      },
                      domProps:{
                        title:params.row.companyname+''+params.row.computername
                      },
                      on: {
                        click: () => {
                          if (params.row.status != -1) {
                            this.$router.push({path: 'gpuManage'});
                            sessionStorage.setItem('uuId', params.row.computerid);
                            sessionStorage.setItem('gpuId',params.row.id);
                            sessionStorage.setItem('gpu_name',params.row.computername)
                          }
                        }
                      }
                    },params.row.companyname+'/'+params.row.computername)])
                }
              }
            },
            {
              title:'状态',
              width:'70',
              render:(h,params) => {
                return h('span',{},params.row.status == '-1' ? '异常' :params.row.status == '0' ? '欠费' : params.row.computerstate == '0' && params.row.status=='1' ? '关机' :params.row.computerstate == '1' && params.row.status=='1'  ? '开机' :'')
              }
            },
            {
              title:'地域节点',
              key:'zonename'
            },
            {
              title:'主机配置',
              key:'serviceoffername'
            },
            {
              title:'镜像系统',
              key:'templatename'
            },
            {
              title:'IP地址',
              key:'publicip'
            },
            {
              title:'创建时间/到期时间',
              render:(h,params)=>{
                return h('div',[
                  h('p',{style:{marginBottom:'5px'}},params.row.createtime+'/'),
                  h('p',{},params.row.caseType == 3 ? '无' : params.row.endtime)])
              }
            },
            {
              title:'计费类型',
              width:'70',
              render:(h,params) =>{
                return h('span',{},params.row.caseType == 1 ?'包年':params.row.caseType == 2 ? '包月' : params.row.caseType == 3 ? '实时' :'')
              }
            },
            {
              title:'操作',
              width:'100',
              render:(h,params)=>{
                if(params.row.status == -1){
                  return h('div',
                    {
                      style:{padding:'8px 0',display:'inline-block'}
                    },[
                    h('p',{style:{color:'#2A99F2'}},'联系客服'),
                    h('p',{style:{margin:'5px 0',color:'#B2B2B2'}},'删除'),
                    h('p',{style:{color:'#B2B2B2'}},'更多操作')
                  ])
                }else {
                return h('div',
                  {
                    style:{color:'#2A99F2',padding:'8px 0',display:'inline-block'}
                  },[
                  h('p',{style:{cursor:'pointer'},on:{click:()=>{ if(params.row.status == 2 || params.row.status == 3){
                        this.$Message.info('请等待主机完成当前操作');
                      }else {this.link(params.row)}}}},'远程链接'),
                  h('p',{style:{cursor:'pointer',margin:'5px 0'},
                    on:{
                    click:()=> {
                      if(params.row.status == 2 || params.row.status == 3){
                        this.$Message.info('请等待主机完成当前操作');
                      }else {
                        this.deleteHost(params.row);
                      }
                    }
                    }
                  },'删除'),
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
                          if(params.row.publicip != '' && params.row.publicip != undefined){
                            this.$Message.info('该主机已绑定IP');
                          }else {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.uuId = params.row.computerid;
                              this.vpcId = params.row.vpcid;
                              this.bindIp();
                            }
                          }
                        }
                      }
                    }, '绑定IP'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.companyname = params.row.companyname;
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.$Modal.confirm({
                                title:'解绑IP',
                                content:'是否解绑该GPU的IP?',
                                onOk:()=>{
                                  this.unbind(params.row.publicip,params.row.computerid);
                                }
                              })
                              this.uuId = params.row.computerid;
                            }
                          }
                        }
                      }, '解绑IP'),
                      // h('DropdownItem', {
                      //   nativeOn: {
                      //     click: () => {
                      //       if(params.row.computerstate == '1' && params.row.status=='1'){
                      //         this.companyname = params.row.companyname;
                      //         if(params.row.status == 2 || params.row.status ==3){
                      //           this.$Message.info('请等待主机完成当前操作');
                      //         }else {
                      //           this.showModal.snapshot = true;
                      //           this.uuId = params.row.computerid;
                      //         }
                      //       }else{
                      //         this.$Message.info('制作快照前请先开启主机');
                      //       }
                      //     }
                      //   }
                      // }, '制作快照'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.computerstate == '0' && params.row.status=='1'){
                              this.uuId = params.row.computerid;
                              if(params.row.status == 2 || params.row.status ==3){
                                this.$Message.info('请等待主机完成当前操作');
                              }else {
                                this.showModal.mirror  = true;
                                this.mirrorValidate.rootdiskid = params.row.rootdiskid;
                              }
                            }else{
                             this.$Message.info('制作镜像前请先关闭主机');
                            }
                          }
                        }
                      }, '制作镜像'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if (params.row.computerstate == '0' && params.row.status == '1') {
                              if (params.row.status == 2 || params.row.status == 3) {
                                this.$Message.info('请等待主机完成当前操作');
                              } else {
                                this.$router.push({path: 'gpuUpLevel'});
                                sessionStorage.setItem('uuId', params.row.computerid);
                                sessionStorage.setItem('comptername', params.row.companyname)
                                sessionStorage.setItem('serviceofferid', params.row.serviceofferid);
                              }
                            }else{
                              this.$Message.info('升级主机前请先关闭主机');
                            }
                          }
                        }
                      }, '主机升级'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.uuId = params.row.computerid;
                            this.$Modal.confirm({
                              title:'提示',
                              content:'确定要重启主机吗',
                              onOk:()=>{
                                this.reStartGPU();
                              }
                            })
                          }
                        }
                      }, '重启主机'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              // if(params.row.caseType == 3){
                              //   this.$Message.info('请选择包年包月主机续费');
                              //   return
                              // }
                              this.VMId = params.row.id;
                              this.showModal.renew = true;
                            }
                          }
                        }
                      }, '主机续费'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.uuId = params.row.computerid;
                            this.$Modal.confirm({
                              title:'提示',
                              content:'确定要开/关机吗',
                              onOk:()=>{
                                if(params.row.status == 2){
                                  this.$Message.info('请等待主机创建完成');
                                }else if(params.row.status == 3){
                                  this.$Message.info('主机正在删除中');
                                }else {
                                  if(params.row.computerstate == '0'){
                                    this.openHost(params.row._index);
                                  }else if(params.row.computerstate == '1'){
                                    this.stopHost(params.row._index);
                                  }
                                }
                              }
                            })
                          }
                        }
                      }, '开机/关机'),])
                    ])
               ])
                }
              }
            }
          ],
          hostData:[],
          zoneId:'',
          intervalInstance: null,
        }
      },
      beforeRouteLeave(to, from , next){
        clearInterval(this.intervalInstance);
        next();
      },
      methods:{
        // 获取GPU主机
       getGpuServerList(){
         axios.get('gpuserver/listGpuServer.do',{
            params:{
              num:'',
              vpcId:'',
              zoneId:this.$store.state.zone.zoneid,
              status:this.gpuStatus,
              timeType:this.gpuTimeValue
            }
          }).then(res => {
            if(res.status === 200 && res.data.status === 1){
              var list = [];
              if(Object.keys(res.data.result).length != 0){
                for(let index in res.data.result){
                  console.log(index);
                    for (let i = 0; i < res.data.result[index].list.length; i++) {
                      list.push(res.data.result[index].list[i]);
                    }
                  this.hostData = list;
                }
              }else{
                this.hostData = [];
              }
            }
          })
       },


        //获取绑定IP
        bindIp(){
         axios.get('network/listPublicIp.do',{
           params: {
             useType: 0,
             zoneId: this.$store.state.zone.zoneid,
             vpcId: this.vpcId
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.ipValidate.ipList = res.data.result;
             if (this.publicIPList == '') {
               this.showModal.publicIPHint = true;
             } else {
               this.showModal.ipShow = true;
             }
           }else{
             this.$Message.info('获取Ip出小差了');
           }
         })
        },

        //绑定IP
        bindipSubmit() {
          this.$refs.ipValidate.validate((valid) => {
              if (valid) {
                this.showModal.publicIPHint = false;
                this.showModal.ipShow = false;
                this.$Message.info({
                  content: `<span style="color:#2A99F2">${this.companyname}</span>GPU云服务器,正在绑定公网IP`
                })
                this.$http.get('network/enableStaticNat.do', {
                  params: {
                    ipId: this.ipValidate.ip,
                    VMId:this.uuId
                  }
                }).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    this.$Message.success(response.data.message)
                  } else {
                    this.$message.info({
                      content: response.data.message
                    })
                  }
                })
              }
            }
          )
        },

        //解绑IP
        unbind(publicip,computerid) {
         if(publicip != ''){
           this.$Message.info({
             content: `<span style="color:#2A99F2"></span>GPU云服务器,正在解绑公网IP`
           })
         }
            this.$http.get('network/disableStaticNat.do', {
              params: {
                ipId:publicip,
                VMId:computerid
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1
              ) {
                this.$Message.success(response.data.message)
              }
              else if (response.status == 200 && response.data.status == 2) {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
        },

        //主机开机
       openHost(){
         this.$http.get('gpuserver/startGPU.do',{
           params:{
             gpuId :this.uuId,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
             this.getGpuServerList();
           }else{
             this.$Message.info(res.data.message);
           }
         })
        },

        //主机关机
       stopHost(){
         this.$http.get('gpuserver/stopGPU.do',{
           params:{
             gpuId :this.uuId,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.$Message.success(res.data.message);
             this.getGpuServerList();
           }else {
             this.$Message.info(res.data.message);
             this.getGpuServerList();
           }
         })
        },

        //删除主机
       deleteHost(info){
         if(info.caseType != 3){
           this.$Message.warning('只能删除实时计费主机');
           return
         }
         if(info.status == 3){
           this.$Message.warning('主机正在删除中');
           return
         }
         this.$Modal.confirm({
           content:`${info.computername}主机删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
           onOk:()=>{
             axios.get('information/deleteVM.do',{
               params:{
                 id: info.id
               }
             }).then(res => {
               if(res.status == 200 && res.data.status == 1){
                 this.$Message.success(res.data.message);
                 this.getGpuServerList();
               }else {
                 this.$message.info({
                   content: res.data.message
                 })
               }
             })
           }
         })

        },

        //重启主机
        reStartGPU(){
          this.$http.get('gpuserver/reStartGPU.do',{
            params:{
              gpuId :this.uuId,
              zoneId:this.$store.state.zone.zoneid
            }
          }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
              this.getGpuServerList();
            }else {
              this.$message.info({
                content: res.data.message
              })
              this.getGpuServerList();
            }
          })
        },

        //创建镜像
        createMrrior(){
          this.$refs.mirrorValidate.validate((valid) => {
            if (valid) {
              axios.get('Snapshot/createTemplate.do', {
                params: {
                  templateName: this.mirrorValidate.name,
                  descript: this.mirrorValidate.descript,
                  rootDiskId: this.mirrorValidate.rootdiskid,
                  zoneId: this.$store.state.zone.zoneid,
                }
              }).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success('镜像创建成功');
                  this.showModal.mirror = false;
                } else {
                  this.$Message.info('镜像创建出小差了');
                }
              })
            }
          })
        },

        //创建快照
        // createVMSnapshot(){
        //   this.$refs.snapshotValidate.validate((valid) => {
        //     if (valid) {
        //       axios.get('Snapshot/createVMSnapshot.do', {
        //         params: {
        //           VMId: this.uuId,
        //           snapshotName: this.snapshotValidate.name,
        //           memoryStatus: this.snapshotValidate.memory,
        //           zoneId: this.$store.state.zone.zoneid
        //         }
        //       }).then(res => {
        //         if (res.status == 200 && res.data.status == 1) {
        //           this.$Message.success('快照创建成功');
        //           this.showModal.snapshot = false;
        //         } else {
        //           this.$Message.info('创建快照出小差了');
        //         }
        //       })
        //     }
        //   })
        // },

        //续费类型切换
        renewChange(index){
          this.timeValue = '';
         if(index == 'year'){
           this.timeValueList = this.renewValidate.time[0].date;
         }else if(index == 'month'){
           this.timeValueList = this.renewValidate.time[1].date;
         }
        },

        //获取主机续费价格
        getGpuMonery(){
         axios.get('information/getYjPrice.do',{
           params:{
             timeType:this.timeType,
             timeValue:this.timeValue,
             gpuArr:this.VMId,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
               this.cost = res.data.result.toFixed(2)
               this.originCost = res.data.result
               if (res.data.cuspon) {
                 this.originCost = Number((this.originCost + res.data.cuspon).toFixed(2))
               }
               if (res.data.continueDiscount) {
                 this.originCost = (this.originCost + res.data.continueDiscount).toFixed(2)
               }
             }
         })
        },

        //主机续费提交
        setGPuMoney(){
         let gpuList =JSON.stringify([{type:6,id:Number(sessionStorage.getItem('gpuId'))}]);
          axios.post('continue/continueOrder.do',{
            zoneId:this.$store.state.zone.zoneid,
            timeType:this.timeType,
            timeValue:this.timeValue,
            list:gpuList
          }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success(res.data.message);
              this.showModal.publicIPHint = false;
            }else {
              this.showModal.publicIPHint = false;
              this.$Modal.warning({
                content:res.data.message
              })
            }
          })
        },


        //连接主机
        link(item) {
          localStorage.setItem('link-companyid', item.companyid)
          localStorage.setItem('link-vmid', item.computerid)
          localStorage.setItem('link-zoneid', item.zoneid)
          localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
          window.open('/ruicloud/link')
        },
      },
      created(){
        this.intervalInstance = setInterval(() => {
          this.getGpuServerList()
        }, 5 * 1000)
      },
      mounted(){
          this.getGpuServerList();
      }
    }
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.text-box{
  border:1px solid #2A99F2;
  background-color: RGBA(42, 153, 242, 0.1);
  height: 32px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>
