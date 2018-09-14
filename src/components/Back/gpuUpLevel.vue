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
                <p style="color: #333333;font-size: 16px;margin-bottom: 10px;">CPU</p>
                <ul>
                  <li v-for="(item,index) in cpuList" class="nav_item" :class="cpuIndex == index  ?'nav_item_click':''"  @click="cpuClick(index,'cpu')">{{item.CPU}}核</li>
                </ul>
              </div>
              <!--内存-->
              <div>
                <p style="color: #333333;font-size: 16px;margin: 10px 0;">内存</p>
                <div>{{memoryList.length}}</div>
                <ul>
                  <li v-if="memoryList.length != 0" v-for="(item,index) in memoryList" class="nav_item" :class="memoryIndex == index  ?'nav_item_click':''"  @click="cpuClick(index,'memory')">{{item.memory}}G</li>
                  <li v-else class="nav_item nav_item_click">暂无</li>
                </ul>
              </div>
            </div>
            <div class="gpu_right">
               <div>
                 <p>升级前配置</p>
                 <p>主机名称：{{gpuDetail.computername}}</p>
                 <p>主机配置：{{gpuDetail.peizhi[0]}}{{memoryValue}}</p>
                 <p>GPU类型：{{gpuDetail.peizhi[2]}}</p>
                 <p>剩余时长：{{gpuDetail.endtime}} </p>
                 <p style="color:#2A99F2;text-align: center;position: relative;bottom: 0px">全民普惠，3折减单，最高减免7000元！</p>
               </div>
              <div>
                <p>升级后配置</p>
                <p>主机名称：{{gpuDetail.computername}}</p>
                <p>主机配置：{{cpuValue}}核16G</p>
                <p>GPU类型：{{gpuDetail.peizhi[2]}}</p>
                <p>剩余时长：{{gpuDetail.endtime}}</p>
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
        cpuValue:'1',

      //  内存
        memoryList:[],
        memoryIndex:0,
        memoryValue:'',

        //升级价格
        upMoney:'--',

        //gpu详情
        gpuDetail:{}
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
    beforeRouteLeave(to,from,next){
      axios.get('information/zone.do',{
      }).then(res => {
        this.$store.state.zone.zoneid = res.data.result[0].zoneid;
        this.$store.state.zone.zonename = res.data.result[0].zonename;
      })
      next();
    },
    methods:{
      //获取GPU服务器详情
      getGpuHostDetail(){
        axios.get('gpuserver/listGpuServerById.do',{
          params:{
            GpuId:sessionStorage.getItem('uuId'),
            zoneId:this.$store.state.zone.zoneid,
            changeCost:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.gpuDetail = res.data.result[0];
            this.gpuDetail.peizhi = res.data.result[0].serviceoffername.split('+');
           this.memoryValue =  this.gpuDetail.peizhi[1].substr(0,this.gpuDetail.peizhi[1].indexOf('G')+1);
          }
        })
      },

      cpuClick(val,name){
        if(name == 'cpu'){
          this.cpuIndex = val;
          this.cpuValue = this.cpuList[val].CPU;
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
            console.log(this.memoryList.length === 0 + ".....................");
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
      },

      //升级提交订单
      upGpuConfigSubmit(){
        axios.get('gpuserver/UpGPUConfig.do',{
          params:{
            zoneId:this.$store.state.zone.zoneid,
            cpunum:this.cpuList[this.cpuIndex].CPU,
            memory:this.memoryList[this.memoryIndex].memory,
            GPUId:sessionStorage.getItem('gouId')
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success(res.data.message);
          }
        })
      }
    },
    created(){
      this.getZonesConfig();
      // this.upGpuConfig();
      this.getGpuHostDetail();
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
