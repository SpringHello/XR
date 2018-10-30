<template>
  <div id="background">
    <div id="wrapper">
       <span class="title">云服务器 /
            <span>弹性伸缩</span>
          </span>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-danxingshensuo4"></use>
          </svg>
          <span id="title">弹性伸缩</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="text-box">
          <p>一种高效的的计算资源管理策略，您可以设定时间周期或者告警策略，让计算资源按照您预期方式进行增加或减少。既能在早高峰时段保证性能，也能在闲时降低成本。</p>
        </div>
        <Tabs type="card" :animated="false" style="margin-top:20px;">
          <TabPane label="启动配置">
            <div>
              <Button type="primary" @click="$router.push({path:'newAddElastic'})" style="margin-bottom: 15px;">新建</Button>
              <Table :columns="settingList" :data="settingData"></Table>
            </div>
          </TabPane>
          <TabPane :label="Groups">
            <div>
              <Button type="primary" @click="newAddTelescopic = true" style="margin-bottom: 15px;">新建</Button>
              <Table :columns="telescopicList" :data="telescopicData"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!--新建伸缩组-->
    <modal title="新建伸缩组" v-model="newAddTelescopic" width="550" :mask-closable="false">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form ref="newAddTelescopicList" :model="newAddTelescopicList" :rules="ruleValidate" style="width: 519px"  label-position="top" inline>
        <FormItem label="名称" prop="addName">
          <Input v-model="newAddTelescopicList.addName" style="width: 240px" placeholder="请输入名称"></Input>
          <p style="color: #999999;margin-top: 11px;">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
        <FormItem label="启动配置" prop="configure" class="formitem3" >
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">启动配置是自动创建云服务器的模版。</p>
           <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="newAddTelescopicList.configure" style="width:240px" placeholder="请选择启动配置">
            <Option v-for="item in newAddTelescopicList.configureList" :value="item.id" :key="item.id">{{ item.startupconfigname}}</Option>
          </Select>
          <p style="color: #2A99F2;cursor: pointer;margin-top: 11px;" @click="$router.push({path:'newAddElastic'})">新建启动配置</p>
        </FormItem>
        <FormItem label="最小伸缩数" prop="minNumber" class="formitem1">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">伸缩组中允许的实例最小数量。当伸缩组的云主机数量小于最小伸缩数时，弹性伸缩会增加实例，使得伸缩组当前实例数匹配最小伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="newAddTelescopicList.minNumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="负载均衡" class="formitem6">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">伸缩组会自动将新加入的主机添加到负载均衡中。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="newAddTelescopicList.balancing" style="width:240px" placeholder="选择负载均衡" @on-change="balancings(newAddTelescopicList.balancing)">
            <Option v-for="item in newAddTelescopicList.balancingList" :value="item.loadbalanceroleid" :key="item.loadbalanceroleid">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="最大伸缩数" class="formitem1" prop="maxNumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">伸缩组中允许的实例最大数量。当伸缩组的云主机数量大于最大伸缩数时，弹性伸缩会移出实例，使得伸缩组当前实例数匹配最大伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="newAddTelescopicList.maxNumber" style="width: 240px" placeholder="请输入1-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属网络">
          <Select v-model="newAddTelescopicList.belongNetwork" style="width:240px" placeholder="请选择网络" @on-change="changeNetWork">
            <Option v-for="item in newAddTelescopicList.belongNetworkList" :value="item.vpcid" :key="item.vpcid">{{ item.vpcname }}</Option>
          </Select>
        </FormItem>
        <FormItem label="初始化实例数" class="formitem2" prop="exampleNumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">伸缩组刚创建时的云服务器数量，伸缩组会为您自动创建对应数量的主机。</p>
           <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="newAddTelescopicList.exampleNumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属子网">
          <Select v-model="newAddTelescopicList.belongSubnet"  style="width:240px" placeholder="请选择网络">
            <Option v-for="item in newAddTelescopicList.belongSubnetList"   :value="item.ipsegmentid" :key="item.ipsegmentid">{{ item.netoffername }}</Option>
          </Select>
        </FormItem>
        <FormItem label="移除策略" class="formitem5">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">当伸缩组要减少实例且有多重选择时，将根据移出策略来选择移出的主机</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="newAddTelescopicList.removePolicy" style="width:240px">
            <Option v-for="item in newAddTelescopicList.removePolicyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="防火墙" class="formitem4">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="newAddTelescopicList.firewall" style="width:240px">
            <Option v-for="item in newAddTelescopicList.firewallList" :value="item.acllistid" :key="item.acllistid">{{ item.acllistname }}</Option>
          </Select>
        </FormItem>
      </Form>
      <p style="color: #999999;">提示：伸缩组创建成功之后，请在伸缩组详情页面继续配置告警策略与定时任务，不然伸缩组无法生效</p>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="newAddTelescopic = false">取消</Button>
        <Button type="primary" @click="createExpansionGroups">完成配置</Button>
      </div>
    </modal>

  </div>
</template>

<script>
  const nameValidator = (rule,value,callback)=>{
    let reg = /^[0-9a-zA-z\u4E00-\u9FA5]{0,16}$/;
      if(value == ''){
        return callback(new callback('请输入伸缩组名称'));
      }else if(!reg.test(value)){
        return callback(new callback('伸缩组名称格式不正确'));
      }else{
        callback();
      }
  }
  const minNumberValidator = (rule,value,callback) =>{
    let reg = /^([0-9]{1,2}|30)$/;
    if(value == ''){
      return callback(new Error('请输入最小伸缩数'));
    }else if(!reg.test(value)){
      return callback(new Error('请输入0-30之间的数字'));
    }else {
      callback();
    }
  }

  export default{

    data(){
      return{

        Groups:h=>{
          return h('div',{on:{
            click:()=>{
              this.isNotCreateElastic();
              this.selectAllTelescopic();
              if(this.settingData.length != 0){
                this.getAllSelect();
              }
            }
            }},'伸缩组')
       },
        //启动配置table
        settingList:[
          {
            title:'启动配置名称',
            render:(h,params)=>{
              const hide = params.row.hide == 1 ? 'inline-block' : 'none';
              return h('div',[
                h('Spin',{
                  style:{
                    display:hide
                  }
                }),
                h('span',{
                  style:{
                    color:'#2A99F2',
                    cursor:'pointer'
                  },
                  on:{
                    click:() =>{
                      sessionStorage.setItem('telescopic_id',params.row.telescopicgroup)
                      sessionStorage.setItem('elastic_id',params.row.id);
                      this.$router.push({path:'elasticDetails'});
                    }
                  }
                  },params.row.startupconfigname)
              ])
            }
          },
          {
            title:'已绑定伸缩组',
            key:'telescopicgroupname'
          },
          {
            title:'CPU/内存',
            render:(h,params) =>{
              return h('div',[
                h('span',{},params.row.cpu+'核'+'/'),
                h('span',{},params.row.memory+'G')
                ])
            }
          },
          {
            title:'系统盘/数据盘',
            render:(h,params) =>{
              return h('span',{},params.row.systemdisktype+'/'+params.row.disktype)
            }
          },
          {
            title:'状态',
            render:(h,params) =>{
              return h('span',{
              },params.row.status == 1 ?'正常':'异常')
            }
          },
          {
            title:'镜像',
            key:'templatename'
          },
          {
            title:'操作',
            width:160,
            render:(h,params) =>{
              return h('span',{
                 style:{
                   color:'#2A99F2',
                   cursor:'pointer'
                 },
                on:{
                   click:()=>{
                     this.$Modal.confirm({
                       title:'删除',
                       content:'是否删除该启动配置',
                       onOk:()=>{
                         this.deleteElastic(params.row.id);
                       }
                     })

                   }
                }
              },'删除')
            }
          }
        ],
        settingData:[],

        //新建伸缩组
          telescopicList:[
            {
              title:'伸缩组名称',
              render:(h,params) =>{
                const hide =params.row.hide == 1 ? 'inline-block' : 'none';
                return h('div',[
                  h('Spin',{
                      style:{
                        display:hide
                      }
                  }),
                  h('span',{
                    style:{
                      color:'#2A99F2',
                      cursor:'pointer'
                    },
                    on:{
                      click:()=>{
                        sessionStorage.setItem('vpc_id', params.row.id);
                        this.$router.push({path:'telescopicDetails'})
                      }
                    }
                  },params.row.stretchname)
                ])
              }
            },
            {
              title:'已绑定启动配置',
              key:'startconfigname'
            },
            {
              title:'子机数量',
              key:'initialinstancenumber'
            },
            {
              title:'最小伸缩数',
              key:'minimumexpansionnumber'
            },
            {
              title:'最大伸缩数',
              key:'maximumexpansionnumber'
            },
            {
              title:'负载均衡',
              key:'networkloadbalancingname'
            },
            {
              title:'所属网络',
              render:(h,params) =>{
                return h('span',{
                  style:{
                    color:'#2A99F2'
                  }
                },params.row.vpcname)
              }
            },
            {
              title:'操作',
              render:(h,params) =>{
                if(params.row.hide == 1){
                  return h('div',{
                    style:{
                      color:'#2A99F2'
                    }
                  },[
                    h('span',{
                      style:{
                        cursor:'pointer'
                      }
                    },'管理'),
                    h('span',{
                      style:{
                        margin:'0 10px',
                        cursor:'pointer'
                      }
                    },'删除'),
                    h('span',{
                      style:{
                        cursor:'pointer'
                      }
                    },params.row.status == 1 ?'停用':'开启')
                  ])
                }else {
                  return h('div',{
                    style:{
                      color:'#2A99F2'
                    }
                  },[
                    h('span',{
                      style:{
                        cursor:'pointer'
                      },
                      on:{
                        click:()=>{
                          sessionStorage.setItem('vpc_id', params.row.id);
                          this.$router.push({path:'telescopicDetails'})
                        }
                      }
                    },'管理'),
                    h('span',{
                      style:{
                        margin:'0 10px',
                        cursor:'pointer'
                      },
                      on:{
                        click:()=>{
                          this.$Modal.confirm({
                            title:'删除',
                            content:'是否删除该伸缩组',
                            onOk:()=>{
                              this.deleteTelescopic(params.row.id);
                            }
                          })
                        }
                      }
                    },'删除'),
                    h('span',{
                      style:{
                        cursor:'pointer'
                      },
                      on:{
                        click:()=>{
                          this.$Modal.confirm({
                            content:'是否停用/开启该伸缩组',
                            onOk:()=>{
                              this.stopOrOpen(params.row.id,params.row.status);
                            }
                          })
                        }
                      }
                    },params.row.status == 1 ?'停用':'开启')
                  ])
                }
              }
            }
          ],
          telescopicData:[],
          newAddTelescopic:false,
          newAddTelescopicList:{
            //名称
            addName:'',
            //启动配置
            configure:0,
            configureList:[],
            //最小伸缩数
            minNumber:1,
            //所属网络
            belongNetwork:'',
            belongNetworkList:[],
            //最大伸缩数
            maxNumber:1,
            //所属子网
            belongSubnet:'',
            belongSubnetList:[],
            //实例数
            exampleNumber:1,
            //移除策略
            removePolicy:'移除旧主机',
            removePolicyList:[
              {
                value:'移除旧主机',
                label:'移除旧主机'
              },
              {
                value:'移除新主机',
                label:'移除新主机'
              }
            ],
            //负载均衡
            balancing:'',
            balancingList:[],
            //防火墙
            firewall:'',
            firewallList:[],
          },
          ruleValidate:{
            addName:[
              {required:true,validator:nameValidator,trigger:'blur'}
            ],
            configure:[
              {required:true,type:'number',message:'请选择启动配置',trigger:'blur'}
            ],
            minNumber:[
              {required:true,validator:minNumberValidator,trigger:'blur'}
            ],
            maxNumber:[
              {required:true,validator:minNumberValidator,trigger:'blur'}
            ],
            exampleNumber:[
              {required:true,validator:minNumberValidator,trigger:'blur'}
            ]
          },


        }
    },
    methods:{
      //获取启动配置
      selectAllElastic(){
        this.$http.get('elasticScaling/listElasticScalingRunConfig.do',{
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.settingData = res.data.list;
            this.newAddTelescopicList.configureList = res.data.list;
          }else {
            this.$Message.info(res.data.message);
          }
        })
      },

      //是否创建了启动配置
      isNotCreateElastic(){
        if(this.settingData.length == 0 || this.settingData == undefined){
          this.$Modal.info({
            title:'提示',
            content:'<p>您还没有创建启动配置，请先<a style="color: #2A99F2;" href="newAddElastic">创建启动配置</a></p>',
            onOk:()=>{
              this.$router.push({path:'newAddElastic'});
            }
          })
        }
      },

      deleteElastic(id){
        this.$http.get('elasticScaling/deleteElasticScalingRunConfig.do',{
          params:{
            id:id
          }
        }).then(res =>{
          if(res.status === 200 && res.data.status === 1){
            this.$Message.success('删除成功');
            this.selectAllElastic();
          }else {
            this.$Message.info(res.data.message);
          }
        })
        },


      //创建伸缩组
      createExpansionGroups(){
        this.$refs.newAddTelescopicList.validate((valid)=>{
          if(valid){
            let objs = {stretchname:'创建中',hide:1};
            this.telescopicData.push(objs);
            this.$http.post('elasticScaling/createExpansionGroups.do',{
              telescopicGroupName:this.newAddTelescopicList.addName.toString(),
              telescopicMax:this.newAddTelescopicList.maxNumber.toString(),
              telescopicMin:this.newAddTelescopicList.minNumber.toString(),
              configId:this.newAddTelescopicList.configure.toString(),
              strategy:this.newAddTelescopicList.removePolicy.toString(),
              loadBalanceId:this.newAddTelescopicList.balancing.toString(),
              instaceNum:this.newAddTelescopicList.exampleNumber.toString(),
              vpcId:this.newAddTelescopicList.belongNetwork.toString(),
              networkId:this.newAddTelescopicList.belongSubnet.toString(),
              acclistId:this.newAddTelescopicList.firewall.toString()
            }).then(res =>{
              if(res.status == 200 && res.data.status ==1 ){
                this.$Message.success('创建伸缩组成功');
                this.newAddTelescopic = false;
                this.selectAllTelescopic();
              }else{
                this.newAddTelescopic = false;
                this.$Message.info(res.data.message);
                this.selectAllTelescopic();
              }
            })
          }
        })
      },

      //获取伸缩组列表
      selectAllTelescopic(){
        this.$http.get('elasticScaling/listExpansionGroups.do',{
        }).then(res =>{
          if(res.status ==200 && res.data.status == 1){
            this.telescopicData = res.data.list;
          }
        })
        },

      balancings(id){
        this.$http.get('network/getnetworkAndVpcByloadbalance.do',{
          params:{
            loadbalanceId:id,
            type:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.newAddTelescopicList.belongNetworkList = res.data.list;
            this.newAddTelescopicList.belongSubnetList = res.data.list;
          }
        })
      },

      //获取负载均衡
      getAllSelect(){
         this.$http.get('loadbalance/listLoadBalanceRole.do',{
          }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
              if(res.data.result.publicLoadbalance.length != 0 || res.data.result.internalLoadbalance.length != 0 ){
                this.newAddTelescopicList.balancingList = res.data.result.publicLoadbalance.concat(res.data.result.internalLoadbalance);
              }else {
                this.$Modal.info({
                  title:'提示',
                  content:'<p>您还没有创建负载均衡，请先<a style="color: #2A99F2;" href="balance">创建负载均衡</a></p>',
                  onOk:()=>{
                    this.$router.push({path:'balance'});
                  }
                })
              }
            }
          });
        },


      //获取所属子网，防火墙
      changeNetWork(id){
        let f = this.$http.get('network/listAclList.do',{params:{vpcId:id}});
        // let l = this.$http.get('network/getnetworkAndVpcByloadbalance.do',{params:{vpcId:id,type:'1'}});
        Promise.all([f]).then(res =>{
          this.newAddTelescopicList.firewallList = res[0].data.result;
          // this.newAddTelescopicList.belongSubnetList = res[1].data.list;
        })
      },

      //删除伸缩组
      deleteTelescopic(id){
        this.$http.get('elasticScaling/deleteExpansionGroups.do',{
          params:{
            id:id
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success('删除成功');
            this.selectAllTelescopic();
          }else{
            this.$Message.info(res.data.message);
          }
        })
      },

      //停用或开启伸缩组
      stopOrOpen(id,status){
        this.$http.get('elasticScaling/isStartOrClose.do',{
          params:{
            id:id.toString(),
            status:status == 1 ? '0' : '1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status ==1){
            this.selectAllTelescopic();
          }else{
            this.$Message.info(res.data.message);
          }
        })
      },

      refresh(){
        this.selectAllElastic();
        this.selectAllTelescopic();
      },
    },
    created(){
      this.selectAllElastic();
      this.selectAllTelescopic();
      // this.getAllSelect();
      // this.getSelect();
      // this.test();
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .text-box{
    border:1px solid #2A99F2;
    background-color: RGBA(42, 153, 242, 0.1);
    padding: 7px 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size: 14px;
    color: #666666;
  }

  .ivu-icon-ios-help-outline:before{
    color: #2A99F2;
  }
  .ivu-tooltip-inner{
    p{
      line-height: 15px;
    }
  }
  .formitem1{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-13px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 88px;
    }
  }
  .formitem2{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: -19px;
      left: 10px;
    }
    .ivu-icon{
      position: absolute;
      top: 12px;
      left: -24px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -36px;
      left: 101px;
    }
  }
  .formitem3{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-11px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
  .formitem4{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-33px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
  .formitem5{
      .ivu-icon-ios-help-outline:before{
        position: absolute;
        top: 12px;
        left:-22px;
      }
      .ivu-tooltip{
        position:absolute;
        top: -35px;
        left: 75px;
      }
    }
  .formitem6{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-20px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }

</style>
