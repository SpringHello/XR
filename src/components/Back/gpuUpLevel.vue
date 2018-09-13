<template>
  <div id="background">
      <div id="wrapper">
        <p style="margin: 20px 0;">云服务器 / <span>GPU云服务器</span> / <span>升级</span></p>
        <div class="conent">
          <div style="margin-bottom: 32px;">
            <span style="color: #333333;font-size: 24px;">升级配置</span>
            <Button style="float: right" @click="$router.push({path:'gpuList'})">返回</Button>
          </div>
          <hr color="#E9E9E9" style="margin-bottom: 10px">
          <div class="gpu_left">
            <!--cpu-->
            <div style="width: 50%">
              <div>
                <p style="color: #333333;font-size: 16px;">CPU</p>
                <ul>
                  <li v-for="(item,index) in cpuList" class="nav_item" :class="cpuIndex == index  ?'nav_item_click':''"  @click="cpuClick(index,'cpu')">{{item.CPU}}核</li>
                </ul>
              </div>
              <!--内存-->
              <div>
                <p style="color: #333333;font-size: 16px;">内存</p>
                <ul>
                  <li v-for="(item,index) in memoryList" class="nav_item" :class="memoryIndex == index  ?'nav_item_click':''"  @click="cpuClick(index,'memory')">{{item.memory}}G</li>
                </ul>
              </div>
            </div>
            <div class="gpu_right">
               <div>
                 <p>升级前配置</p>
                 <p>主机名称：test</p>
                 <p>主机配置：4核4G</p>
                 <p>GPU类型：Tesla P40 GPU</p>
                 <p>剩余时长：2018-07-09 13:17:02 </p>
                 <p style="color:#2A99F2;text-align: center;position: relative;bottom: 0px">全民普惠，3折减单，最高减免7000元！</p>
               </div>
              <div>
                <p>升级后配置</p>
                <p>主机名称：test</p>
                <p>主机配置：8核16G</p>
                <p>GPU类型：Tesla P100 GPU</p>
                <p>剩余时长：2018-07-09 13:17:02 </p>
                <p>应付差价:<span style="float: right;color: #2A99F2;font-size: 24px;">{{upMoney}}元</span></p>
                <p style="color:#2A99F2">购买和计费说明</p>
                <Button type="primary" style="width: 100%;margin-top: 10%;">立即购买</Button>
              </div>
            </div>

          </div>


        </div>
      </div>
  </div>
</template>

<script>
import axios from  'axios'
  export default {
    data(){
      return{
      //  CPU
        cpuList:[
          {
            CPU:'1',
            List:[
              {
                value:'1'
              },
              {
                value:'2'
              },
              {
                value:'4'
              },
              {
                value:'8'
              }
            ],
          },
          {
            CPU:'2',
            List:[
              {
                value:'2'
              },
              {
                value:'4'
              },
              {
                value:'8'
              },
              {
                value:'16'
              }
            ],
          },
          {
            CPU:'4',
            List:[
              {
                value:'4'
              },
              {
                value:'8'
              },
              {
                value:'16'
              },
              {
                value:'32'
              }
            ],
          },
          {
            CPU:'8',
            List:[
              {
                value:'8'
              },
              {
                value:'16'
              },
              {
                value:'32'
              },
              {
                value:'64'
              }
            ],
          },
          {
            CPU:'16',
            List:[
              {
                value:'16'
              },
              {
                value:'32'
              },
              {
                value:'64'
              },
              {
                value:'128'
              }
            ],
          },
          {
            CPU:'32',
            List:[
              {
                value:'64'
              },
              {
                value:'128'
              }
            ]
          },
          {
            CPU:'64',
            List:[
              {
                value:'128'
              },
              {
                value:'256'
              }
            ]
          }
        ],
        cpuIndex:0,
      //  内存
        memoryList:[],
        memoryIndex:0,

        //升级价格
        upMoney:'--'
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        axios.get('information/zone.do',{
          params:{
            gpuServer:'1'
          }
        }).then(res => {
          vm.$store.state.zone.zoneid = res.data.result[0].zoneid;
          vm.$store.state.zone.zonename = res.data.result[0].zonename;
        })
      })
    },
    beforeRouteLeave(){
      axios.get('information/zone.do',{
      }).then(res => {
        this.$store.state.zone.zoneid = res.data.result[0].zoneid;
        this.$store.state.zone.zonename = res.data.result[0].zonename;
      })
    },
    methods:{
      cpuClick(val,name){
        if(name == 'cpu'){
          this.cpuIndex = val;
          this.memoryList = this.cpuList[val].list;
          this.memoryIndex = 0;
          this.upGpuConfig();
        }else if(name == 'memory'){
         this.memoryIndex = val;
          this.upGpuConfig();
        }
      },
      //获取cpu和内存
      getZonesConfig(){
        this.$http.get("information/getZonesConfig.do",{}).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.cpuList = res.data.data;
            this.memoryList = res.data.data[0].list;
          }
        });
      },

      //升级扣费
      upGpuConfig(){
       axios.get('gpuserver/UpGPUConfigCost.do',{
          params:{
            zoneId:this.$store.state.zone.zoneid,
            cpunum:this.cpuList[this.cpuIndex].CPU,
            memory:this.memoryList[this.memoryIndex].memory,
            GPUId:sessionStorage.getItem('gouId')
          }
        }).then(res => {
          if(res.status == 200 && res.data.status ==1){
            // this.upMoney = res.data.
          }
        })
      }
    },
    created(){
      this.getZonesConfig();
      this.upGpuConfig();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .conent{
    padding: 20px;
    background: #FFFFFF;
    min-height: 800px;
    font-family: .AppleSystemUIFont;
    .gpu_left{
      display: flex;
      ul{
        display: inline-block;
        width: 100%;
      }
      .nav_item{
        border: 1px solid #D9D9D9;
        padding: 6px 22px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        float: left;
        cursor: pointer;
        margin-right: 2%;
      }
      .nav_item_click{
        border: 1px solid #2A99F2;
        color: #2A99F2;
      }
    }
    .gpu_right{
      width: 50%;
      display: flex;
      div:nth-child(1){
        margin-right: 3%;
      }
      div{
        padding: 27px;
        height: 280px;
        box-shadow:0 2px 4px 1px rgba(0, 0, 0, 0.35);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        width: 49%;
      }
      p:nth-child(1){
        font-family: PingFangSC;
        font-size: 18px;
        margin-bottom: 10px;
      }
      p{
        font-family: .AppleSystemUIFont;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
      }
    }
  }
</style>
