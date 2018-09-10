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
                  <li v-for="(item,index) in cpuList" class="nav_item" :class="cpuIndex == index  ?'nav_item_click':''"  @click="cpuClick(index)">{{item.numbers}}</li>
                </ul>
              </div>
              <!--内存-->
              <div>
                <p style="color: #333333;font-size: 16px;">内存</p>
                <ul>
                  <li v-for="(item,index) in memoryList" class="nav_item" :class="memoryIndex == index  ?'nav_item_click':''"  @click="cpuClick(index)">{{item.value}}</li>
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
                <p>应付差价:<span style="float: right;color: #2A99F2;font-size: 24px;">170元</span></p>
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
  export default {
    data(){
      return{
      //  CPU
      cpuList:[
        {
          numbers:'1核',
          className:'',
          css:true,
        },
        {
          numbers:'2核',
          className:'',
          css:true,
        },
        {
          numbers:'4核',
          className:'',
          css:true,
        },
        {
          numbers:'8核',
          className:'',
          css:true,
        },
        {
          numbers:'16核',
          className:'',
          css:true,
        },
        {
          numbers:'64核',
          className:'',
          css:true,
        }
      ],
        cpuIndex:-1,
      //  内存
        memoryList:[
          {
            value:'4G'
          },
          {
            value:'8G'
          },
          {
            value:'12G'
          },
          {
            value:'16G'
          },
          {
            value:'32G'
          }
        ],
        memoryIndex:-1
      }
    },
    methods:{
      cpuClick(val){
        this.cpuIndex = val;
        this.cpuList[val].css = !this.cpuList[val].css;
      }
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
