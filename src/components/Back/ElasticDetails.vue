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
            <p v-for="item in details">{{item.value}}</p>
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
            <p>{{elastic.disksize}}GB</p>
            <p>有</p>
            <p>10MB</p>
            <p>{{elastic.computername == '' ? '---':elastic.computername}}</p>
            <p>{{elastic.systemusername == '' ? '---':elastic.systemusername}}</p>
            <p>{{elastic.loginway == 1 ? '密码设置' : '系统密码'}}</p>
            <p>***********</p>
            <p>{{elastic.billingtype}}元/小时</p>
          </div>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <div>
          <p style="color: #333333;font-size: 16px;">关联伸缩组</p>
          <p style="color: #2A99F2;font-size: 14px;margin: 10px 0;cursor: pointer;" @click="elasticJump()" v-if="elastic.telescopicgroupname !=''">{{elastic.telescopicgroupname}}</p>
          <p v-else>您还没有</p>
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


      }
    },
    created(){
      this.getElastic();
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
            }
        })
      },
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

      elasticJump(){
        console.log(this.elastic);
        return;
        sessionStorage.setItem('vpc_id',this.elastic.id);
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
</style>
