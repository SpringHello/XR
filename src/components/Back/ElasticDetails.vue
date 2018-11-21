<template>
  <div id="background">
    <div id="wrapper">
      <p style="margin: 20px 0;">云服务器 / 弹性伸缩</p>
      <div id="content">
        <div class="ela_head">
          <div class="head_right">
            <div class="back" @click="$router.push({path:'elastic'})">
              <div class="back_icon"></div>
              <span>返回</span>
            </div>
            <span>{{elastic.startupconfigname}}</span>
          </div>
          <Button type="ghost" style="float: right;">刷新</Button>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <div class="details">
          <p>配置详情</p>
          <div>
            <p>配置名称</p>
            <p>计费方式</p>
            <p>地域选择</p>
            <p>主机规格</p>
            <p>系统盘</p>
            <p>系统盘容量</p>
            <p>镜像</p>
            <p v-if="elastic.disktype">数据盘类型</p>
            <p v-if="elastic.disktype">数据盘容量</p>
            <p>公网IP</p>
            <p v-if="elastic.bandwidth">带宽</p>
            <p>主机名称</p>
            <p>用户名</p>
            <p>登录方式</p>
            <p>登录密码</p>
            <p>资费</p>
            <p>创建时间</p>
          </div>
          <div>
            <p>{{elastic.startupconfigname}} <span @click="updatesName = true" style="color: #2A99F2;margin-left:8px;cursor: pointer;">修改</span></p>
            <p>实时计费</p>
            <p>{{elastic.zonename}}</p>
            <p>{{elastic.cpu}}核{{elastic.memory}}G</p>
            <p>{{elastic.systemdisktype}}</p>
            <p>{{elastic.systemdisk}}G</p>
            <p>{{elastic.templatename}}</p>
            <p>{{elastic.disktype}}</p>
            <p v-if="elastic.disktype">{{elastic.disksize}}GB</p>
            <p>{{elastic.bandwidth ? '有':'无'}}</p>
            <p v-if="elastic.bandwidth">{{elastic.bandwidth}}MB</p>
            <p>{{elastic.computername == '' ? '---':elastic.computername}}</p>
            <p>{{elastic.systemusername == '' ? '---':elastic.systemusername}}</p>
            <p>{{elastic.loginway == 1 ? '密码设置' : '系统密码'}}</p>
            <p>***********</p>
            <p>{{elastic.billingtype}}元/小时</p>
            <p>{{elastic.createtime}}</p>
          </div>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <div>
          <p style="color: #333333;font-size: 16px;">关联伸缩组</p>
          <div class="telescopic">
            <div style="margin:10px 0;"  v-if="telescopicList.length > 0" v-for="(item,index) in telescopicList" :key="index">
              <span style="color: #2A99F2;font-size: 14px;cursor: pointer;"  @click="elasticJump(item)">{{item.stretchname}}</span>
              <span style="color: #2A99F2;font-size: 14px;cursor: pointer;margin:0 10px 0 10px;" @click="changeTelescopic(index)" >更改伸缩组</span>
            </div> 
             <p style="margin:10px 0;" v-if="telescopicList == undefined || telescopicList.length == 0">暂无伸缩组，<span style="color:#2A99F2;cursor:pointer;" @click="$router.push({path:'elastic'})">立即创建伸缩组</span></p>
          </div>
        </div>
      </div>
    </div>

    <Modal title="修改启动配置名称" width="350" :mask-closable="false" v-model="updatesName">
        <Form ref="elasticName" :model="elasticName" :rules="elasticNameValiator">
          <FormItem label="配置名称" prop="name">
            <Input v-model="elasticName.name" style="width: 200px;"></Input>
          </FormItem>
        </Form>
      <div slot="footer">
        <Button type="ghost" @click="updatesName = false">取消</Button>
        <Button type="primary" @click="updateName">确定</Button>
      </div>
    </Modal>

    <!-- 修改伸缩组 -->
    <modal title="修改伸缩组" v-model="updateTelescopic" width="550" :mask-closable="false">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form ref="updateTelescopicList" :model="updateTelescopicList" :rules="updateRuleValidate" style="width: 519px"  label-position="top" inline>
        <FormItem label="名称" prop="stretchname">
          <Input v-model="updateTelescopicList.stretchname" style="width: 240px" placeholder="请输入名称"></Input>
          <p style="color: #999999;margin-top: 11px;">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
        <FormItem label="启动配置" prop="ownershipbootconfiguration" class="formitem3" >
          <Tooltip placement="right" transfer>
            <p slot="content" style="white-space:normal;">启动配置是自动创建云服务器的模版。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.ownershipbootconfiguration" style="width:240px" placeholder="请选择启动配置" disabled>
            <Option v-for="item in updateTeleList.configureList" :value="item.id" :key="item.id">{{ item.startupconfigname}}</Option>
          </Select>
          <p style="color: #2A99F2;cursor: pointer;margin-top: 11px;" @click="$router.push({path:'newAddElastic'})">新建启动配置</p>
        </FormItem>
        <FormItem label="最小伸缩数" prop="minimumexpansionnumber" class="formitem1">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组中允许的实例最小数量。当伸缩组的云主机数量小于最小伸缩数时，弹性伸缩会增加实例，使得伸缩组当前实例数匹配最小伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.minimumexpansionnumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="负载均衡" class="formitem6" >
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组会自动将新加入的主机添加到负载均衡中。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.externalnetworkloadbalancing" disabled style="width:240px" placeholder="选择负载均衡" @on-change="balancings(updateTelescopicList.externalnetworkloadbalancing)">
            <Option v-for="item in updateTeleList.balancingList" :value="item.loadbalanceroleid" :key="item.loadbalanceroleid">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="最大伸缩数" class="formitem1" prop="maximumexpansionnumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组中允许的实例最大数量。当伸缩组的云主机数量大于最大伸缩数时，弹性伸缩会移出实例，使得伸缩组当前实例数匹配最大伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.maximumexpansionnumber" style="width: 240px" placeholder="请输入1-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属网络">
          <Select v-model="updateTelescopicList.belongvpcid" style="width:240px" placeholder="请选择网络" @on-change="changeNetWork" disabled>
            <Option v-for="item in updateTeleList.belongNetworkList" :value="item.vpcid" :key="item.vpcid">{{ item.vpcname }}</Option>
          </Select>
        </FormItem>
        <FormItem label="初始化实例数" class="formitem2" prop="initialinstancenumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组刚创建时的云服务器数量，伸缩组会为您自动创建对应数量的主机。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.initialinstancenumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属子网">
          <Select v-model="updateTelescopicList.belongsubnet"  style="width:240px" placeholder="请选择网络" disabled>
            <Option v-for="item in updateTeleList.belongSubnetList"   :value="item.ipsegmentid" :key="item.ipsegmentid">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="移除策略" class="formitem5">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">当伸缩组要减少实例且有多重选择时，将根据移出策略来选择移出的主机</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.removestrategy" style="width:240px">
            <Option v-for="item in updateTeleList.removePolicyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="防火墙" class="formitem4" >
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.acclistid" style="width:240px" disabled>
            <Option v-for="item in updateTeleList.firewallList" :value="item.acllistid" :key="item.acllistid">{{ item.acllistname }}</Option>
          </Select>
        </FormItem>
      </Form>
      <p style="color: #999999;">提示：伸缩组创建成功之后，请在伸缩组详情页面继续配置告警策略与定时任务，不然伸缩组无法生效</p>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="updateTelescopic = false">取消</Button>
        <Button type="primary" @click="updateTelescopicFcuntion">完成修改</Button>
      </div>
    </modal>
  </div>
</template>

<script>
  import axios from 'axios'
  const validConfigName = (rule,value,callback)=>{
    let reg =/^[0-9a-zA-z\u4E00-\u9FA5]{0,16}$/;
    if(value == ""){
      return callback(new Error('请输入配置名称'));
    }else if(!reg.test(value)){
      return callback(new Error('配置名称不符合规范'));
    }else {
      callback();
    }
  }
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

  export default {
    data(){
      return{
        details:[
          {
            value:'配置名称'
          },
          {
            value:'计费方式'
          },
          {
            value:'地域选择'
          },
          {
            value:'主机规格'
          },
          {
            value:'系统盘'
          },
          {
            value:'系统盘容量'
          },
          {
            value:'镜像'
          },
          {
            value:'数据盘类型'
          },
          {
            value:'数据盘容量'
          },
          {
            value:'公网IP'
          },
          {
            value:'带宽'
          },
          {
            value:'主机名称'
          },
          {
            value:'用户名'
          },
          {
            value:'登录方式'
          },
          {
            value:'登录密码'
          },
          {
            value:'资费'
          },
        ],
        elastic:{},
        updatesName:false,
        elasticName:{
          name:''
        },
        elasticNameValiator:{
          name:[
            {required:true,validator:validConfigName,trigger:'blur'}
          ]
        },
        telescopicList:[],
        
        //修改伸缩组
         updateTelescopic:false,
        updateTeleList:{
          //启动配置
          configureList:[],
          //所属网络
          belongNetworkList:[],
          //所属子网
          belongSubnetList:[],
          //移除策略
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
          balancingList:[],
          //防火墙
          firewallList:[],
        },
        updateTelescopicList:{
        },
        updateRuleValidate:{
          stretchname:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ],
          ownershipbootconfiguration:[
            {required:true,message:'请选择启动配置',trigger:'blur'}
          ],
          minimumexpansionnumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ],
          maximumexpansionnumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ],
          initialinstancenumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ]
        },
        tList:[],
      }
    },
    created(){
      this.getElastic();
      this.getTelescopic();
      this.getAllSelect();
    },
    methods:{
      getElastic(){
        this.$http.get('elasticScaling/getElasticScalingRunConfigMessage.do',{
          params:{
            id:sessionStorage.getItem('elastic_id')
          }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.elastic = res.data.list[0];
                console.log(this.elastic);
                this.updateTeleList.configureList = res.data.list;
            }
        })
      },
      
      //修改启动配置名字
      updateName(){
        axios.post('elasticScaling/updateNewCreateElasticScalingRunConfig.do',{
          ElasticScalingName:this.elasticName.name,
          id:this.elastic.id
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.updatesName = false;
            this.$Message.success('修改成功');
            this.getElastic();
          }else {
            this.$Message.info(res.data.message);
          }
        })
      },

       //获取负载均衡
      getAllSelect(){
        this.$http.get('loadbalance/listLoadBalanceRole.do',{
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            if(res.data.result.publicLoadbalance.length != 0 || res.data.result.internalLoadbalance.length != 0 ){
              this.updateTeleList.balancingList = res.data.result.publicLoadbalance.concat(res.data.result.internalLoadbalance);
            }
          }
        });
      },

       //获取防火墙
      changeNetWork(id){
        let f = this.$http.get('network/listAclList.do',{params:{vpcId:id}});
        Promise.all([f]).then(res =>{
          this.updateTeleList.firewallList = res[0].data.result;
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
            this.updateTeleList.belongNetworkList = res.data.list;
            this.updateTeleList.belongSubnetList = res.data.list;
          }
        })
      },

        //修改伸缩组
      updateTelescopicFcuntion(){
        this.$http.post('elasticScaling/updateExpansionGroups.do',{
            telescopicGroupName:this.updateTelescopicList.stretchname,
            telescopicMax:this.updateTelescopicList.maximumexpansionnumber,
            telescopicMin:this.updateTelescopicList.minimumexpansionnumber,
            strategy:this.updateTelescopicList.removestrategy,
            instaceNum:this.updateTelescopicList.initialinstancenumber,
            id:this.updateTelescopicList.id,
            configId:this.updateTelescopicList.ownershipbootconfiguration
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success('修改成功');
              this.updateTelescopic = false;
            }else{
              this.$Message.info(res.data.message);
              this.updateTelescopic = false;
            }
        })
      },

      //伸缩组
      changeTelescopic(index){
        this.updateTelescopic = true;
          this.updateTelescopicList = this.tList[index];
      },

      //获取关联的伸缩组
      getTelescopic(){
        this.$http.get('elasticScaling/listTelescopicGroupByFeild.do',{
          params:{
            feild:sessionStorage.getItem('telescopic_id')== undefined ? 'undefined':sessionStorage.getItem('telescopic_id')
          }
        }).then(res =>{
            this.telescopicList = res.data.list;
            console.log(this.telescopicList.length)
             this.tList = JSON.parse(JSON.stringify(res.data.list));
        });
      },


    //跳转伸缩组详情页面
    elasticJump(item){
        sessionStorage.setItem('vpc_id',item.id);
        this.$router.push({path:'telescopicDetails'})
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
  .ela_head{
    .head_right{
      display: inline-block;
      .back{
        width: 52px;
        height: 25px;
        position: relative;
        line-height: 25px;
        display: inline-block;
        cursor: pointer;
        .back_icon{
          border-top: 1px solid #2A99F2;
          border-left: 1px solid #2A99F2;
          width: 9px;
          height:9px;
          display: inline-block;
          transform: rotate(-45deg);
        }
        >span{
          font-size: 14px;
          color: #2A99F2;
        }
      }
      .back::after{
        content: '';
        width: 1px;
        height: 25px;
        position: absolute;
        right: 0px;
        background: #D8D8D8;
      }
      >span{
        margin-left: 10px;
        vertical-align: middle;
        font-size: 18px;
        color: #111111;
      }
    }
  }
  .details{
    >p{
      color: #333333;
      font-size: 16px;
      font-family: 'MicrosoftYaHei';
      margin-bottom: 10px;
    }
    div:nth-child(2){
      display: inline-block;
       width: 80px;
       text-align: left;
       color:RGBA(17, 17, 17, 0.65);
       font-size: 14px;
       p{
         margin: 10px 0;
       }
     }
    div:nth-child(3){
      display: inline-block;
      text-align: left;
      color:RGBA(17, 17, 17, 0.65);
      font-size: 14px;
      p{
        margin: 10px 0;
      }
    }
  }
  .telescopic{
    display: flex;
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
