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
            <Button type="primary" @click="$router.push({path:'buy'})">创建</Button>
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
      <Modal title="绑定IP" width="550" :mask-closable="false" v-model="showModal.ipShow">
        <Form ref="ipValidate" :model="ipValidate" :rules="ipRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="ip">
            <Select v-model="ipValidate.ip" placeholder="请选择IP" style="width: 200px">
              <Option v-for="item in ipValidate.ipList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <span style="color: #2A99F2;cursor: pointer;" @click="$router.push('buy')">购买弹性IP</span>
          </FormItem>
        </Form>
        <br>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.ipShow=false">取消</Button>
          <Button type="primary" @click="bindIp">确定</Button>
        </div>
      </Modal>

      <!--制作快照-->
      <Modal v-model="showModal.snapshot" width="550" :scrollable="true" class="create-snas-modal">
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">制作快照</span>
        </p>
        <div class="universal-modal-content-flex">
          <p class="mb20">您正为<span class="bluetext">{{companyname}}</span>制作快照</p>
          <Form ref="snapshotValidate" :model="snapshotValidate" :rules="snapshotRuleValidate">
            <FormItem label="快照名称" prop="name">
              <Input v-model="snapshotValidate.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>
            </FormItem>
            <div style="padding-top: 11px;margin-right: 100px;">
              <div style="font-size: 14px;color:#495060;margin-bottom: 15px">是否保存内存信息
                <Poptip trigger="hover" width="400">
                  <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
                  <div slot="content">
                    <div>
                      您可以选择在制作快照的时候保存您主机的当前运行状态。当您选择“保存”之时，
                      当前主机的内存将被记录，在您对快照执行回滚操作的时候，也只能在开机状态下执行；当您选择“不保存”时
                      此次快照将不记录主机内存信息，您在通过该快照回滚的时候只能在关机状态下执行。
                    </div>
                  </div>
                </Poptip>
              </div>
              <RadioGroup v-model="snapshotValidate.memory">
                <Radio label="1">保存</Radio>
                <Radio label="0">不保存</Radio>
              </RadioGroup>
            </div>
          </Form>
          <p class="modal-text-hint-bottom">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
          </p>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.snapshot = false">取消</Button>
          <Button type="primary" @click="createVMSnapshot">确定</Button>
        </div>
      </Modal>


      <!--制作镜像-->
      <Modal title="制作镜像" width="550" :mask-closable="false" v-model="showModal.mirror">
        <Form ref="mirrorValidate" :model="mirrorValidate" :rules="mirrorRuleValidate" label-position="top" inline>
          <FormItem label="镜像名称" prop="name">
            <Input v-model="mirrorValidate.name" placeholder="小于20位数字或字母" style="width: 200px;"></Input>
          </FormItem>
          <FormItem label="描述" prop="descript">
            <Input type="textarea" :rows="4" placeholder="小于20个字(选填)" v-model="mirrorValidate.descript" style="width: 200px;"></Input>
          </FormItem>
        </Form>
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
          <Button type="primary" @click="$router.push('buy')">创建公网IP</Button>
        </p>
      </Modal>

    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
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
          //GPUID
          VMId:'',
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
            snapshot:false,
            mirror:false,
            renew:false,
            publicIPHint:false
          },
          //弹性ip
          ipValidate:{
            ip:'',
            ipList:[{value:'199.199.0.120',label:'199.199.0.120'}]
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
                if (params.row.status == 2) {
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
                return h('span',{},params.row.status == '-1' ? '异常' :params.row.computerstate == '1' ? '开机' :params.row.computerstate == '0' ? '关机' :'')
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
              key:'privateip'
            },
            {
              title:'创建时间/到期时间',
              render:(h,params)=>{
                return h('div',[
                  h('p',{},params.row.createtime+'/'),
                  h('p',{},params.row.endtime)])
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
                          if(params.row.status == 2 || params.row.status ==3){
                            this.$Message.info('请等待主机完成当前操作');
                          }else {
                            this.showModal.ipShow = true;
                            this.vpcId = params.row.vpcid;
                            this.bindIp();
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
                              this.showModal.snapshot = true;
                              this.uuId = params.row.computerid;
                            }
                          }
                        }
                      }, '制作快照'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.showModal.mirror  = true;
                              this.mirrorValidate.rootdiskid = params.row.rootdiskid;
                            }
                          }
                        }
                      }, '制作镜像'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            if(params.row.status == 2 || params.row.status ==3){
                              this.$Message.info('请等待主机完成当前操作');
                            }else {
                              this.$router.push({path: 'gpuUpLevel'})
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
        }
      },
      /*beforeRouteEnter(to, from, next){
        next(vm =>{
          axios.get('information/zone.do',{
            params:{
              gpuServer:'1'
            }
          }).then(res => {
            sessionStorage.setItem('zonid',res.data.result[0].zoneid);
            vm.$store.state.zone.zoneid = res.data.result[0].zoneid;
            vm.$store.state.zone.zonename = res.data.result[0].zonename;
          })
        })
      },
      beforeRouteLeave(to, from , next){
        axios.get('information/zone.do',{
        }).then(res => {
          this.$store.state.zone.zoneid = res.data.result[0].zoneid;
          this.$store.state.zone.zonename = res.data.result[0].zonename;
        })
        clearInterval(this.intervalInstance);
        next();
      },*/
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
              if(Object.keys(res.data.result).length != 0){
                for(let key in res.data.result){
                  let list = [];
                  if(key !='open'){
                    list = res.data.result[key].list.concat(res.data.result[key].list);
                  }else {
                    list = res.data.result[key].list;
                  }
                  this.hostData = list;
                }
              }else{
                this.hostData = [];
              }
            }
          })
       },


        //绑定IP
        bindIp(){
         axios.get('network/listPublicIp.do',{
           params: {
             useType: 0,
             zoneId: this.$store.state.zone.zoneid,
             vpcId: this.vpcId
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             if(res.data.result.length == 0){
                this.showModal.publicIPHint = true;
             }else {
               this.showModal.publicIPHint = false;
               this.ipValidate.ipList = res.data.result;
             }
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
        axios.get('Snapshot/createTemplate.do',{
           params:{
             templateName:this.mirrorValidate.name,
             descript:this.mirrorValidate.descript,
             rootdiskId:this.mirrorValidate.rootdiskid,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.$Message.success('镜像创建成功');
             this.showModal.mirror = false;
           }else {
             this.$Message.info('镜像创建出小差了');
           }
        })
        },

        //创建快照
        createVMSnapshot(){
         axios.get('Snapshot/createVMSnapshot.do',{
           params:{
             VMId:this.uuId,
             snapshotName:this.snapshotValidate.name,
             memoryStatus:this.snapshotValidate.memory,
             zoneId:this.$store.state.zone.zoneid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){
             this.$Message.success('快照创建成功');
             this.showModal.snapshot = false;
           }else {
             this.$Message.info('创建快照出小差了');
           }
         })
        },

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
             this.originCost = res.data.result;
             this.cost = res.data.cuspon;
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
          sessionStorage.setItem('link-companyid', item.companyid)
          sessionStorage.setItem('link-vmid', item.computerid)
          sessionStorage.setItem('link-zoneid', item.zoneid)
          sessionStorage.setItem('link-phone', this.$store.state.authInfo.phone)
          this.$router.push('link')
        },
      },
      created(){
        // this.intervalInstance = setInterval(() => {
        //   this.getGpuServerList()
        // }, 5 * 1000)
      },
      mounted(){
        setTimeout(()=>{
          this.getGpuServerList();
        },100)

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
