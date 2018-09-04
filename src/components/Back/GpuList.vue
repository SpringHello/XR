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
            <Button type="primary">一键启动</Button>
            <Button type="primary" style="margin: 0 10px;" >绑定IP</Button>
            <Dropdown>
              <Button type="primary">
                更多操作
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="rename">重命名</DropdownItem>
                <DropdownItem >重置密码</DropdownItem>
                <DropdownItem name="ratesChange">资费变更</DropdownItem>
                <DropdownItem name="renewal">主机续费</DropdownItem>
                <DropdownItem name="mirror">制作镜像</DropdownItem>
                <!--<DropdownItem @click.native="$router.push({path:'gpuUpLevel'})">主机升级</DropdownItem>-->
                <DropdownItem >重启主机</DropdownItem>
                <DropdownItem name="delhost">删除主机</DropdownItem>
                <DropdownItem>解绑公网IP</DropdownItem>
                <DropdownItem>购买相同配置</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Tabs type="card" :animated="false">
            <TabPane :label="`开启(${tabSate.openLenght})`">
                <div class="flex-wrapper">

                  <!--开启中的主机-->
                  <div  v-for="(item,index) in openGpu" :key="index" v-if="openGpu.length != 0" :class="{select:select}"
                        style="margin-bottom: 20px;height: 228px;" @click="checkedGpuHost">
                    <Card style="width:375px;">
                      <div class="head">
                        <div>
                          <h1>莫要删除|i-11-4557-VM</h1>
                          <i  class="normal" @click="stopHost">
                            <i class="ico">|</i>
                          </i>
                        </div>
                        <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                        <span>镜像系统：{{item.templatename}}</span>
                        <span>计费类型：{{item.endtime}}</span>
                        <span>公网地址：{{item.publicip}}</span>
                        <span>内网地址：{{item.privateip}}</span>
                        <span>运行中</span>
                      </div>
                      <div class="foot">
                        <span>{{item.createtime}}</span>
                        <Button  style="margin-left:55px;" @click="$router.push({path:'gpuManage'})">管理
                        </Button>
                        <Button @click.stop="openHost(index)">连接主机</Button>
                        <!--<Button v-else class="btnnormal _hover" @click="link(item)">连接主机-->
                        <!--</Button>-->
                      </div>
                    </Card>
                  </div>
                  <!--添加新GPU主机-->
                  <div >
                    <Card style="width:375px;height:228px;cursor:pointer">
                      <div style="height: 224px;cursor:pointer">
                        <i class="add"></i>
                        <i class="add" style="transform: translate(-50%,-50%) rotate(90deg);"></i>
                      </div>
                    </Card>
                  </div>
                </div>
            </TabPane>
            <TabPane :label="`异常(${tabSate.abnormalLenght})`">
              <div class="flex-wrapper" >
              <div  v-for="(item,index) in errorGpu" :key="index" v-if="errorGpu.length != 0">
                <Card style="width:375px;">
                  <div class="head">
                    <div>
                      <h1>莫要删除|i-11-4557-VM</h1>
                      <i  class="normal" @click="stopHost">
                        <i class="ico">|</i>
                      </i>
                    </div>
                    <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                    <span>镜像系统：{{item.templatename}}</span>
                    <span>计费类型：{{item.endtime}}</span>
                    <span>公网地址：{{item.publicip}}</span>
                    <span>内网地址：{{item.privateip}}</span>
                    <span>运行中</span>
                  </div>
                  <div class="foot">
                    <span>{{item.createtime}}</span>
                    <Button  style="margin-left:55px;" @click="$router.push({path:'gpuManage'})">管理
                    </Button>
                    <Button @click.stop="openHost(index)">连接主机</Button>
                    <!--<Button v-else class="btnnormal _hover" @click="link(item)">连接主机-->
                    <!--</Button>-->
                  </div>
                </Card>
              </div>
              </div>
            </TabPane>
            <TabPane :label="`欠费(${tabSate.arrearsLenght})`">
              <div class="flex-wrapper" >
                <div  v-for="(item,index) in errorGpu" :key="index" v-if="errorGpu.length != 0">
                  <Card style="width:375px;">
                    <div class="head">
                      <div>
                        <h1>莫要删除|i-11-4557-VM</h1>
                        <i  class="normal" @click="stopHost">
                          <i class="ico">|</i>
                        </i>
                      </div>
                      <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                      <span>镜像系统：{{item.templatename}}</span>
                      <span>计费类型：{{item.endtime}}</span>
                      <span>公网地址：{{item.publicip}}</span>
                      <span>内网地址：{{item.privateip}}</span>
                      <span>运行中</span>
                    </div>
                    <div class="foot">
                      <span>{{item.createtime}}</span>
                      <Button  style="margin-left:55px;" @click="$router.push({path:'gpuManage'})">管理
                      </Button>
                      <Button @click.stop="openHost(index)">连接主机</Button>
                      <!--<Button v-else class="btnnormal _hover" @click="link(item)">连接主机-->
                      <!--</Button>-->
                    </div>
                  </Card>
                </div>
              </div>
            </TabPane>
            <TabPane :label="`关机(${tabSate.closeLenght})`">
              <div class="flex-wrapper" >
                <div  v-for="(item,index) in errorGpu" :key="index" v-if="errorGpu.length != 0">
                  <Card style="width:375px;">
                    <div class="head">
                      <div>
                        <h1>莫要删除|i-11-4557-VM</h1>
                        <i  class="normal" @click="stopHost">
                          <i class="ico">|</i>
                        </i>
                      </div>
                      <span style="margin-top:10px;margin-bottom:20px;color:#989898">{{item.serviceoffername}}&nbsp;|&nbsp;{{item.zonename}}</span>
                      <span>镜像系统：{{item.templatename}}</span>
                      <span>计费类型：{{item.endtime}}</span>
                      <span>公网地址：{{item.publicip}}</span>
                      <span>内网地址：{{item.privateip}}</span>
                      <span>运行中</span>
                    </div>
                    <div class="foot">
                      <span>{{item.createtime}}</span>
                      <Button  style="margin-left:55px;" @click="$router.push({path:'gpuManage'})">管理
                      </Button>
                      <Button @click.stop="openHost(index)">连接主机</Button>
                      <!--<Button v-else class="btnnormal _hover" @click="link(item)">连接主机-->
                      <!--</Button>-->
                    </div>
                  </Card>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data(){
        return{
          tabSate:{
            openLenght:0,
            abnormalLenght:0,
            arrearsLenght:0,
            closeLenght:0
          },
          //异常状态主机
          errorGpu:[],
          // 开机状态主机
          openGpu:[
            {
              serviceoffername:'4核+8Ghz+gl.xlarge',
              zonename:'天津1区',
              templatename:'windows 2012',
              endtime:'包年包月（2017-7-14）',
              publicip:'196.168.33.233',
              privateip:'145.168.35.23',
              createtime:'2018-08-10 14:34:00'
            },
            {
              serviceoffername:'4核+8Ghz+gl.xlarge',
              zonename:'天津1区',
              templatename:'windows 2012',
              endtime:'包年包月（2017-7-14）',
              publicip:'196.168.33.233',
              privateip:'145.168.35.23',
              createtime:'2018-08-10 14:34:00'
            }
          ],

          //临时选中主机字段
          select:false,
        }
      },
      methods:{
        // 获取GPU主机
       getGpuServerList(){
          this.$http.get('gpuserver/listGpuServer.do',{

          }).then(res => {
            if(res.status === 200 && res.data.status === 1){

              // this.openGpu = res.data.result
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
.flex-wrapper{
  display: -webkit-flex;
  display: flex;
  flex-wrap:wrap;
  min-height: 300px;
  flex-direction: row;
  align-items:flex-start;
  justify-content:space-between;
  .head{
    font-size: 0px;
    padding: 23px 19px 0px 19px;
    position: relative;
    h1 {
      font-size: 18px;
      color: #646464;
      line-height: 18px;
      text-align: left;
    }
    span {
      color: #646464;
      font-size: 12px;
      display: block;
      text-align: left;
      margin-bottom: 10px;
      &:last-of-type {
        position: absolute;
        top: 123px;
        right: 38px;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.10);
      }
    }
    i {
      width: 20px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: 22px;
      right: 43px;
      cursor: pointer;
    }
    .normal {
      border: 1px solid #1381f5;
      border-radius: 50%;
    }
    .ico {
      width: 18px;
      height: 6px;
      position: absolute;
      top: -2%;
      left: 50%;
      z-index: 100;
      font-size: 5px;
      color: #1381f5;
      background-color: white;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
  .foot{
    padding: 11px 19px 12px 19px;
    display: flex;
    margin: 0px auto;
    span{
      display: block;
      line-height: 32px;
      font-size: 12px;
      color: #999999;
    }
  }
  .add {
    background: url('../../assets/img/host/cross.png') center no-repeat;
    display: block;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 125px;
    transform: translate(-50%, -50%);
  }
  .select {
    .ivu-card {
      background: #FFFFFF;
      border: 1px solid #2A99F2;
      box-shadow: 0 2px 16px 0 rgba(93, 177, 245, 0.50);
      border-radius: 4px;
    }
  }
}

</style>
