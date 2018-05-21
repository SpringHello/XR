<template>
    <div class="space_box">
        <div class="space_center">
             <span>云储存/云硬盘</span>
             <div class="space_block">
                  <div class="space_top">
                     <div style="width:50%"> 
                         <span class="title">空间详情</span>
                     </div>
                    <div style="width:50%;text-align:right;">
                        <Button>返回</Button>
                        <Button type="primary">刷新</Button>
                    </div>
                 </div>
                   <p style="margin:20px 0;">空间名称</p>
                <div class="space_top">
                     <div style="width:30%"> 
                         <span class="title_one">访问权限：私有读写</span>
                     </div>
                     <div style="width:50%;">
                        创建时间：2016-9-21 08:50:08
                    </div>
                 </div>
                 <div style="display:flex;">
                    <div style="width:30%"> 
                        内网访问域名:<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinrui.com</span>
                     </div>
                     <div style="width:50%;">
                      外网访问域名：<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinruicloud.com</span>
                    </div>
                  </div>
                     <p style="margin-top:20px;">当月用量 2018/04/28-2018</p>
                        <div class="center_space">
                            <div class="space_Two">
                                <p>存储空间容量</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">20KB</div>
                            </div>
                            <div class="space_one">
                                <p>流量</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">20KB</div>
                            </div>
                            <div class="space_one">
                                <p>http请求次数</p>
                                <div style="font-size:36px;color:#333333;margin-top:10px;">3次</div>
                            </div>
                        </div>
                    <Tabs type="card" style="margin-top:21px;">
                        <TabPane label="Object管理">
                            <div style="display:flex;margin-bottom:15px;">
                                <div style="width:50%">
                                    <Button type="primary" style="margin-right:10px;" @click="modal1 = true">上传</Button>
                                    <Button type="primary">新建文件夹</Button>
                                </div>
                                  <div style="width:50%;text-align:right;">
                                   <Input type="text" placeholder="请输入搜索名称" style="width:231px;"/>
                                    <Button type="primary">查询</Button>
                                </div>
                            </div>
                            <Table></Table>
                        </TabPane>
                        <TabPane label="空间设置">
                            空间设置
                        </TabPane>
                    </Tabs>    
             </div>
        </div>
        <Modal
        v-model="modal1"
        title="上传文件"
       >
        <p style="font-size:14px;color:#999999;">控制台上传单个文件大小不超过1GB，如需上传更大的文件请使用新睿云对象存储提供的<span style="color:#2A9AF3;cursor:pointer;">API</span></p>
        <p>上传路径  文件名称/</p>
        <p>Content of dialog</p>
    </Modal>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            modal1:false
        }
    }
};
</script>

<style lang="less" scoped>
.space_box {
  width: 100%;
  background-color: #f5f5f5;
  font-family: MicrosoftYaHei;
  .space_center {
    margin: 0 auto;
    width: 1200px;
    .space_block {
      width: inherit;
      padding: 20px;
      background-color: #ffffff;
      height: 1411px;
      .space_top {
        display: flex;
        height: 58px;
        border-bottom: 1px solid #d8d8d8;
        .title_one {
          font-size: 14px;
          color: #5e5e5e;
        }
        .title {
          line-height: 40px;
          display: inline-block;
          vertical-align: top;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
      }
    }
    .center_space {
      width: 1160px;
      padding: 6px 0;
      border-bottom: 1px solid #d9d9d9;
      height: 90px;
      margin-top: 10px;
      display: flex;
      p {
        color: #666666;
        font-size: 16px;
      }
      .space_Two {
        width: 40%;
        display: inline-block;
      }
      .space_one {
        width: 40%;
        display: inline-block;
      }
      .space_one:after {
        content: "";
        width: 2px;
        height: 80px;
        position: relative;
        display: inline-block;
        top: -82px;
        right: 20px;
        background-color: #dfdfdf;
      }
    }
  }
}
</style>
