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
                        <Button @click="$router.push({path:'objectStorage'})">返回</Button>
                        <Button @click="filesList" type="primary">刷新</Button>
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
                        内网访问域名：<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinrui.com</span>
                     </div>
                     <div style="width:50%;">
                      外网访问域名：<span style="color:#2A99F2">asd32.oss-internat.cn-north-1,xinruicloud.com</span>
                    </div>
                  </div>
                     <p style="margin-top:20px;">当月用量 2018/04/28-2018</p>
                        <div class="center_space">
                            <div class="space_Two">
                                <p>存储空间容量</p>
                                <div class="space_text">20KB</div>
                            </div>
                            <div class="space_one">
                                <p>流量</p>
                                <div class="space_text" >20KB</div>
                            </div>
                            <div class="space_one">
                                <p>http请求次数</p>
                                <div class="space_text" >3次</div>
                            </div>
                        </div>
                    <Tabs type="card" style="margin-top:21px;">
                        <TabPane label="Object管理">
                            <div style="display:flex;margin-bottom:15px;">
                                <div style="width:50%">
                                    <Button type="primary" style="margin-right:10px;" @click="modal1 = true">上传</Button>
                                    <Button type="primary" @click="floder = true">新建文件夹</Button>
                                </div>
                                  <div style="width:50%;text-align:right;">
                                   <Input v-model="filename" type="text" placeholder="请输入搜索名称" style="width:231px;"/>
                                    <Button type="primary" @click="filesList">查询</Button>
                                </div>
                            </div>
                            <Table :columns='fileList' :data="fileData"></Table>
                        </TabPane>
                        <TabPane label="空间设置">
                            <div>
                                <p style="font-size:18px;color:#333333;margin:0 0 20px 0;">权限设置</p>
                                <div style="height:187px;border:1px solid #e9e9e9;">
                                  <ul class="space_list">
                                    <li :class="indexs == index? 'space_items':'space_item'" v-for="(item,index) in navList" :key="index" @click="navlists(index)">{{item.name}}</li>
                                  </ul>
                                  <p style="margin:17px 0 0 24px;color:#666666;font-size:14px;width:950px;">{{ptext}}</p>
                                  <div class="custom" v-if="indexs == 3">
                                      <Button type="primary">添加自定义权限</Button>
                                      <Button type="primary">自定义权限编辑器</Button>
                                      <Table></Table>
                                  </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>    
             </div>
        </div>
        <Modal
        v-model="modal1"
        title="上传文件"
        :scrollable='true'
       >
        <p style="font-size:14px;color:#999999;">控制台上传单个文件大小不超过1GB，如需上传更大的文件请使用新睿云对象存储提供的<span style="color:#2A9AF3;cursor:pointer;">API</span></p>
        <p style="font-size:14px;color:#666666;margin:10px 0;">上传路径  文件名称/</p>
        <div class="upload_div">
            <span>待上传文件</span>
            <span>大小</span>
            <span>状态</span>
            <span>操作</span>
        </div>
         <Upload
        ref="upload"
        :show-upload-list="true"
        :on-success="handleSuccess"
        :max-size="1048576"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :on-error="handleError"
        :on-progress="handleUpload"
        multiple
        name="uploadFile"
        :data="fileUpdata"
        type="drag"
        action="http://192.168.3.187:8083/ruirados/object/uploadObject.do"
        class="upload_model" 
       >
        <div class="upload_text">
           <Icon type="ios-upload-outline"></Icon><span>选择文件</span>
           <p style="margin-top:10px;color:#999999;">批量上传单词最多上传24个文件，若上传一存在同名文件会直接覆盖，请谨慎操作</p>
        </div>
    </Upload>
    </Modal>
    <!-- 新建文件夹 -->
       <Modal
        v-model="floder"
        title="新建文件夹"
        :scrollable='true'
        @on-ok="createFlies()"
       >
       <div class="space_folder">
            <p style="font-size:14px;color:#666666;">文件夹名称</p>
            <Input type="text" style="width:317px;" v-model="flies"/>
            <p style="color:#999999;">1.文件夹名称全称不超过24个字符</p>
            <p style="color:#999999;">2.名称仅能由字母，数字，中文，下划线，短横线和小数点组成</p>
       </div>
      </Modal>
      <!-- 查看外链 -->
           <Modal
        v-model="outerChain"
        title="查看外链"
        :scrollable='true'
       >
       <div class="space_folder">
            <p style="font-size:14px;color:#666666;">文件名称</p><span></span>
            <span>外链</span><Input type="text" style="width:317px;" v-model="flies"/>
            <br><br>
            <span>有效期</span><Select v-model="term" style="width:240px;">
              <Option v-for="item in termList" :value="item.term" :key="item.index">{{item.label}}</Option>
            </Select>
       </div>
      </Modal>
    </div>
</template>

<script>
import $store from "@/vuex";
const name = sessionStorage.getItem("bucketName");
const zoneId = $store.state.zone.zoneid;
export default {
  data() {
    return {
      //是否隐藏查看外链弹窗
      outerChain:false,
      //是否隐藏上传文件弹窗
      modal1: false,
      //是否隐藏新建文件夹弹窗
      floder: false,
      //权限列表
      navList: [
        {
          name: "私有读写",
          city:
            "Bucket Owner获得全部可执行的操作权限，只有该Bucket的Owner可以对存放在其中的Object进行读/写/删除操作；其他人没有任何权限，在未经授权的情况下无法访问该Bucket内的Object"
        },
        {
          name: "公有读私有写",
          city: ""
        },
        {
          name: "公有读写",
          city: ""
        },
        {
          name: "自定义权限",
          city:
            "可对指定用户设置GetObject、PutObject、DeleteObject、ListObjects、DeleteBucket的权限，并可指定该权限可访问的资源，以及指定具有该权限的IP地址和Referer白名单等"
        }
      ],
      //权限文字
      ptext: "",
      //权限列表index
      indexs: 0,
      //权限期限
      term:'',
      termList:[
        {
           term:'永久有效',
           label:'永久有效'
        },
        {
           term:'7天',
           label:'7天'
        },
        {
           term:'1天',
           label:'1天'
        }
      ],
      //文件夹名称
      flies: "",
        //权限样式
      iSstyle: "",
      //文件名
      filename:null,
      //文件列表数据
      fileData: [],
      //文件列表表头
      fileList: [
        {
          key: "filename",
          title: "文件名称",
          render: (h,params) =>{
            let _self = this;
            _self.fileUpdata.bucketName = name
            _self.fileUpdata.zoneId = zoneId
            _self.isfile = params.row.isfile;
             
            return h('div',[
              h("Icon",{
                props:{
                  type:'ios-folder-outline'
                },
                style:{
                   color:'#2A99F2',
                  display:params.row.isfile == 1?'inline-block':'none',
                }
              }),
               h('span',{
                 style:{
                    color:'#2A99F2',
                    cursor:'pointer',
                    marginLeft:'5px'
                 },
                 on:{
                   click(){
                     _self.filesList(params.row.id,params.row.isfile);//文件标识
                   }
                 }
               },params.row.filename)
            ])
          }
        },
        {
          key: "filesize",
          title: "大小",
          render:(h,params)=>{
            return h('div',[
              h('span',{
              },params.row.filesize /1024 >1 ? ((params.row.filesize/1024).toFixed(2) + "MB") : (params.row.filesize  + "KB"))//换算文件大小单位
            ])
          }
        },
        {
          key: "lasttime",
          title: "最后修改时间"
        },
        {
          key: "createtime",
          title: "创建时间"
        },
        {
            key:'cap',
            title:'操作',
            render:(h,params)=>{
              let _self = this;
                return h('div',[
                  h('span',{
                    style:{
                      color:"#2A99F2",
                      marginRight:'20px',
                      display:params.row.isfile ==1?'none':'inline-block',
                      cursor:'pointer'
                    },
                    on:{
                      click(){
                        _self.outerChain = true;
                      }
                    }
                  },"查看外链"),
                    h('span',{
                        style:{
                            color:"#2A99F2",
                            cursor:'pointer'
                        },
                        on:{
                          click(){
                            _self.deleteFile(params.row.id,params.row.filename);//传入文件Id和文件名称删除
                           }
                        }
                    },"删除")
                ])
            }
        }
      ],
      //文件上传参数
      fileUpdata:{},
      //判断是否是文件夹——1为文件夹——0为文件
      isfile:1
    };
  },
  methods: {
    //上传文件格式错误的方法
    handleFormatError(file) {
      this.$Message.error('格式错误[○･｀Д´･ ○]');
    },
    //上传文件最大限制方法
    handleMaxSize() {
      this.$Message.error('单文件最大只能上传1GB哦~( ˘•ω•˘ )');
    },
    //上传文件之前应用的方法
    handleBeforeUpload(file) {
      let reg = /^[\u4e00-\u9fa5\w\d@\.\-_]{1,20}$/i
     if(!reg.test(file.name)){
       this.$Message.error('文件名不能超过20个字符');
       return false;
     }
    },
    //上传文件成功的方法
    handleSuccess(response) {
      if(response.status == '1'){
         this.$Message.success('上传成功ˊ_>ˋ');
        this.filesList();
      }else{
         this.$Message.error('上传失败ˊ_>ˋ');
      }
     
        console.log(this.fileUpdata);
    },
    //文件上传失败
    handleError(error){
      this.$Message.error('上传失败_(:3」∠)_');
    },
    //上传文件过程的方法
    handleUpload(file,event){
      // let time = new Date().getTime();
      
        console.log(event);
         console.log(file);
    },
    //权限切换
    navlists(val) {
      this.indexs = val;
      this.ptext = this.navList[val].city;
    },
    //列出文件夹列表
    filesList(id,isfile) {
     this.fileUpdata.dirId = id == undefined ? null :id;
      this.$http
        .post("http://192.168.3.187:8083/ruirados/object/listObject.do", {
          bucketName: name,
          dirId: id,
          fileName:this.filename
        })
        .then(res => {
          if (res.data.status == "1") {
            if(isfile == 1 || this.isfile == 1){
              this.fileData = res.data.data.data;
              
            }else{
              return;
            }
          }
        });
    },
    //创建文件夹
    createFlies() {
      this.$http
        .post("http://192.168.3.187:8083/ruirados/object/createObject.do", {
          bucketName: name,
          fileName: this.flies,
          dirId: this.fileUpdata.dirId
        })
        .then(res => {
          if (res.data.status == "1") {
            this.$Message.success("新建成功");
            this.filesList();
          }else{
            this.$Message.error(res.data.msg);
          }
        });
    },
    //删除文件
    deleteFile(id,filename){
      // console.log(id);
      this.$http.post('http://192.168.3.187:8083/ruirados/object/deleteObject.do',{
        bucketName:name,
        fileName:filename,
        dirId:id
      }).then(res =>{
        if(res.data.status == "1"){
          this.$Message.success('删除成功');
          this.filesList();
        }else{
          this.$Message.error(res.data.msg);
        }
      })
    },
    //获取空间详情
    // bucketDetails() {
    //
    //   this.$http
    //     .post(
    //       "http://192.168.3.109:8083/ruirados/bucket/selectByBucketName.do",
    //       {
    //         bucketName:name
    //       }
    //     )
    //     .then(res => {
    //       if (res.data.status == "1") {
    //       }
    //     });
    // },
    //
  },
  mounted() {
    this.ptext = this.navList[0].city; //权限列表默认显示第一个
    this.filesList();
  
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
    .space_list {
      width: 100%;
      font-family: PingFangSC;
      display: flex;
      .space_item {
        display: inline-block;
        padding: 10px 0;
        text-align: center;
        width: 30%;
        border-right: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        color: #2a99f2;
        cursor: pointer;
      }
      .space_items {
        display: inline-block;
        padding: 10px 0;
        text-align: center;
        width: 30%;
        border-right: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        background-color: #2a99f2;
        color: #ffffff;
        cursor: pointer;
      }
      .space_item:hover {
        background-color: #2a99f2;
        color: #ffffff;
        cursor: pointer;
      }
    }
    .center_space {
      width: 1160px;
      padding: 6px 0;
      border-bottom: 1px solid #d9d9d9;
      height: 90px;
      margin-top: 10px;
      display: flex;
      .space_text {
        font-size: 36px;
        color: #333333;
        margin-top: 10px;
      }
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
.custom {
  margin: 10px 0 15px 20px;
}
.upload_div {
  display: flex;
  background-color: #f5f5f5;
  span {
    width: 30%;
    height: 25px;
    line-height: 25px;
    color: #666666;
  }
}
.upload_text {
  background-color: #ffffff;
  span {
    color: #2a9af3;
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 10px;
  }
}
.ivu-icon-ios-upload-outline:before {
  color: #2a9af3;
  font-size: 14px;
}
.space_folder {
  margin: 10px 0 0 0;
  p {
    margin: 10px 0;
  }
}
.upload_model {
  background-color: #ffffff;
  margin-top: 21px;
  min-height: 192px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
