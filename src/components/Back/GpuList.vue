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
            <Button type="primary">创建</Button>
            <div style="display: inline-block;float: right;">
              <Select v-model="model1" style="width:200px" placeholder="计费类型">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px" placeholder="主机状态">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
            <span style="color: #2A99F2;cursor: pointer;">购买弹性IP</span>
          </FormItem>
        </Form>
        <br>
      </Modal>

      <!--制作快照-->
      <Modal title="制作快照" width="550" :mask-closable="false" v-model="showModal.snapshot">
        <p>您正为<span style="color: #2A99F2;">1192,0</span>制作快照</p>
        <Form ref="snapshotValidate" :model="snapshotValidate" :rules="snapshotRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="name">
            <Input v-model="snapshotValidate.name" style="width: 200px;"></Input>
          </FormItem>
        </Form>
        <br>
      </Modal>

      <!--制作镜像-->
      <Modal title="制作镜像" width="550" :mask-closable="false" v-model="showModal.mirror">
        <p>您正为<span style="color: #2A99F2;">1192,0</span>制作快照</p>
        <Form ref="mirrorValidate" :model="mirrorValidate" :rules="mirrorRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="name">
            <Input v-model="snapshotValidate.name" style="width: 200px;"></Input>
          </FormItem>
        </Form>
        <br>
      </Modal>

      <!--主机续费-->
      <Modal title="制作镜像" width="550" :mask-closable="false" v-model="showModal.renew">
        <p>您正为<span style="color: #2A99F2;">1192,0</span>制作快照</p>
        <Form ref="renewValidate" :model="renewValidate" :rules="renewRuleValidate" label-position="top">
          <FormItem label="选择IP" prop="name">
            <Select v-model="ipValidate.ip" placeholder="请选择IP" style="width: 200px">
              <Option v-for="item in ipValidate.ipList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择IP" prop="name">
            <Select v-model="ipValidate.ip" placeholder="请选择IP" style="width: 200px">
              <Option v-for="item in ipValidate.ipList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Form>
        <br>
      </Modal>

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data(){
        return{
          model1:'',
          cityList:[],
          //是否显示弹出框
          showModal:{
            ipShow:false,
            snapshot:false,
            mirror:false,
            renew:false
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
          //制作快照
          snapshotValidate:{
            name:''
          },
          snapshotRuleValidate:{
            name:[
              {required:true,message:'请输入快照名称',trigger:'blur'}
            ]
          },
          //制作镜像
          mirrorValidate:{},
          mirrorRuleValidate:{},
          //主机续费
          renewValidate:{},
          renewRuleValidate:{},
          //table
          hostList:[
            {
              title:'用户名称/唯一名称',
              width:'109',
              key:'name',
              render:(h,params)=>{
                return h('span',{
                  style:{
                    color:'#2A99F2',
                    cursor:'pointer'
                  },
                  on:{
                    click:()=>{
                      this.$router.push({path:'gpuManage'})
                    }
                  }
                },params.row.name)
              }
            },
            {
              title:'状态',
              key:'status'
            },
            {
              title:'地域节点',
              key:'address'
            },
            {
              title:'主机配置',
              key:'peizhi'
            },
            {
              title:'镜像系统',
              key:'jinxinag'
            },
            {
              title:'IP地址',
              key:'Ip'
            },
            {
              title:'创建时间/到期时间',
              key:'time'
            },
            {
              title:'计费类型',
              key:'moneyType'
            },
            {
              title:'操作',
              width:'100',
              render:(h,params)=>{
                return h('div',
                  {
                    style:{color:'#2A99F2',padding:'8px 0',display:'inline-block'}
                  },[
                  h('p',{style:{cursor:'pointer'}},'远程链接'),
                  h('p',{style:{cursor:'pointer',margin:'5px 0'}},'删除'),
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
                         this.showModal.ipShow = true;
                        }
                      }
                    }, '绑定IP'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                        this.showModal.snapshot = true;
                          }
                        }
                      }, '制作快照'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                        this.showModal.mirror  = true;
                          }
                        }
                      }, '制作镜像'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                            this.$router.push({path:'gpuUpLevel'})
                          }
                        }
                      }, '主机升级'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {

                          }
                        }
                      }, '重启主机'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {
                           this.showModal.renew = true;
                          }
                        }
                      }, '主机续费'),
                      h('DropdownItem', {
                        nativeOn: {
                          click: () => {

                          }
                        }
                      }, '开机/关机'),])
                    ])
                 ])
              }
            }
          ],
          hostData:[
            {
              name:'用户名称是…/ i-11-3876-VM',
              status:'开机',
              address:'北京一区',
              peizhi:'CPU:4核 内存：8G GPU:gl.xlarge',
              jinxinag:'windows-2012-DataCenter-64',
              Ip:'192.168.0.35(公)118.187.7.170(内)',
              time:'2018-6-21 13:34:56/ 2018-7-21 13:34:56 ',
              moneyType:'包年'
            }
          ]
        }
      },
      methods:{
        // 获取GPU主机
       getGpuServerList(){
          this.$http.get('gpuserver/listGpuServer.do',{

          }).then(res => {
            if(res.status === 200 && res.data.status === 1){

              // this.hostData = res.data.result
            }
          })
       },

        //主机主机
       openHost(vmid){
         this.$http.get('information/startVirtualMachine.do',{
           params:{
             VMId:vmid
           }
         }).then(res => {
           if(res.status == 200 && res.data.status == 1){

           }
         })
        },

        //主机关机
       stopHost(){
         this.$http.get('information/stopVirtualMachine.do',{
           params:{
             VMId:'',
             companyId:'',
             forced:'',
             overTime:''
           }
         })
        },

        //删除主机
       deleteHost(){
         this.$http.get('information/destroyVirtualMachine.do',{
           params:{
             id:'',
             companyId:''
           }
         })
        },

        //是否选中主机
        checkedGpuHost(){
        this.select = !this.select;
        }
      },
      created(){
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
