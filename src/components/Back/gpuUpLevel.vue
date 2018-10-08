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
            <div style="width: 50%">
              <div>
                <p style="color: #333333;font-size: 16px;margin-bottom: 10px;">可升级GPU类型</p>
                <ul>
                  <li v-if="cpuList != '1'" v-for="(item,index) in cpuList" class="nav_item" :class="cpuIndex == index  ?'nav_item_click':''"  @click="cpuClick(index)">
                    <p style="margin-bottom: 5px;">CPU:{{item.cpunum}}核</p>
                    <p>内存:{{item.memory}}G</p>
                  </li>
                  <li v-else class="nav_item"> 暂无可升级配置</li>
                </ul>
              </div>
            </div>
            <div class="gpu_right"  v-if="cpuList != '1'" >
               <div>
                 <p>升级前配置</p>
                 <p>主机名称：{{name}}</p>
                 <p>主机配置：{{gpuDetail.cpuNum}}核{{gpuDetail.memory}}G</p>
                 <p>GPU类型：{{cpuList[cpuIndex].gputype}}</p>
                 <p>剩余时长：{{gpuDetail.endTime}} </p>
                 <p style="color:#2A99F2;text-align: center;position: relative;bottom: 0px">全民普惠，3折减单，最高减免7000元！</p>
               </div>
              <div>
                <p>升级后配置</p>
                <p>主机名称：{{name}}</p>
                <p>主机配置：{{cpuList[cpuIndex].cpunum}}核{{cpuList[cpuIndex].memory}}G</p>
                <p>GPU类型：{{cpuList[cpuIndex].gputype}}</p>
                <p>剩余时长：{{gpuDetail.endTime}}</p>
                <p>应付差价:<span style="float: right;color: #2A99F2;font-size: 24px;">{{upMoney}}元</span></p>
                <p style="color:#2A99F2">购买和计费说明</p>
                <Button type="primary" style="width: 100%;margin-top: 10%;" @click="upGpuConfigSubmit">立即购买</Button>
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
        cpuList:[],
        cpuIndex:0,
        cpuValue:'1',

      //  内存
        memoryIndex:0,
        memoryValue:'',

        //升级价格
        upMoney:'--',

        //gpu详情
        gpuDetail:{},
        name:sessionStorage.getItem('comptername')
      }
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
            this.gpuDetail = res.data.result;
          }
        })
      },

      cpuClick(val){
          this.cpuIndex = val;
          this.cpuValue = this.cpuList[val].cpunum;
          this.memoryValue = this.cpuList[val].memory;
          this.upGpuConfig();
      },
      //获取cpu和内存
      getZonesConfig(){
        // this.getGpuHostDetail();
        let zonesList = this.$http.get('gpuserver/listGpuServerOfferByUp.do',{params:{serviceofferId:sessionStorage.getItem('serviceofferid')}});
        let gpuDetail = axios.get('gpuserver/listGpuServerById.do',{params:{GpuId:sessionStorage.getItem('uuId'),
            zoneId:this.$store.state.zone.zoneid,
            changeCost:'1'}});

        Promise.all([zonesList,gpuDetail]).then(res =>{
          this.gpuDetail = res[1].data.result;
          if(res[0].data.result != undefined){
            for(let i = 0; i < res[0].data.result.length; i++) {
              if (res[0].data.result[i].cpunum != this.gpuDetail.cpunum && res[0].data.result[i].memory != this.gpuDetail.memory) {
                this.cpuList.push(res[0].data.result[i]);
              } else {
                this.cpuList = '1';
              }
            }
          }else {
            this.cpuList = '1';
          }
        })
        // this.$http.get("gpuserver/listGpuServerOfferByUp.do",{
        //   params:{
        //     serviceofferId:sessionStorage.getItem('serviceofferid')
        //   }
        // }).then(res =>{
        //   if(res.status == 200 && res.data.status == 1){
        //     for(let i = 0; i < res.data.result.length; i++){
        //       if(res.data.result[i].cpunum != this.gpuDetail.cpunum && res.data.result[i].memory != this.gpuDetail.memory){
        //         this.cpuList.push(res.data.result[i]);
        //       }else {
        //         this.cpuList = '1';
        //       }
        //     }
        //   }else{
        //     this.cpuList = '1';
        //   }
        // });
      },

      //升级扣费
      upGpuConfig(){
        if(this.cpuList.length != 0){
          axios.get('gpuserver/UpGPUConfigCost.do',{
            params:{
              zoneId:this.$store.state.zone.zoneid,
              cpunum:this.cpuList[this.cpuIndex].cpunum,
              memory:this.cpuList[this.cpuIndex].memory,
              GPUId:sessionStorage.getItem('gpuId')
            }
          }).then(res => {
            if(res.status == 200 && res.data.status ==1){
              this.upMoney = res.data.money
            }
          })
        }
      },

      //升级提交订单
      upGpuConfigSubmit(){
        axios.get('gpuserver/UpGPUConfig.do',{
          params:{
            zoneId:this.$store.state.zone.zoneid,
            cpunum:this.cpuList[this.cpuIndex].cpunum,
            memory:this.cpuList[this.cpuIndex].memory,
            GPUId:sessionStorage.getItem('gpuId')
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success('订单提交成功');
          }else{
            this.$Message.success(res.data.message);
          }
        })
      }
    },
    created(){
        this.getZonesConfig();
    },
    mounted(){
      setTimeout(()=>{
        this.upGpuConfig();
      },200)

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
