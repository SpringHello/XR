<template>
  <div :class="[prefixCls]" style="cursor:pointer">
    <div @click="upClick"
         @drop.prevent="onDrop"
         @dragover.prevent="dragOver = true"
         @dragleave.prevent="dragOver = false">
      <input @change="checkUp"  ref="input" type="file"  :class="[prefixCls + '-input']"
             multiple="multiple"
             :accept="accept"/>
      <slot></slot>
    </div>
    <div class="upload_list" v-for="(item,index) in fileList" v-if="item.status == 'uploading'">
      <div>
        <span>{{item.name}}</span>
      </div>
      <div>
        <template>{{item.size/1024 < 1000 ? (item.size /1024).toFixed(2)+'kb': item.size/1048576 < 1024 ? (item.size / 1048576).toFixed(2)+'Mb' : (item.size/1073741824).toFixed(2)+'Gb'  }}</template>
      </div>
      <div>
        <i-progress  :percent="item.percentage"  style="width: 90%;" :stroke-width="6" hide-info></i-progress>
        <div style="display: flex;height: 19px;width: 100%;">
          <span style="width: 55px;">1kb</span><span style="width: 125px;color: #999999;font-size:12px;">剩余时间0:0:0</span>
        </div>
      </div>
      <div>
        <span style="margin-right: 20px;cursor: pointer;" @click="uploadFlie">暂停</span>
        <span style="cursor: pointer;" @click="deleteUpload(index)">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'ivu-upload';

  export default {
    data(){
      return{
        dragOver:false,
        prefixCls: prefixCls,
        timeIndex:1,
        fileList:[]
      }
    },
    props:{
      accept:{
        type:String
      },
      action:{
        type:String
      },
      data:{
        type:Object
      },
      // 文件上传成功
      onSuccess:{
        type:Function,
        default(){
          return {}
        }
      },
      // 文件上传失败
      onError:{
        type:Function,
        default(){
          return {}
        }
      },
      // 文件上传过程
      onFileProcess:{
        type:Function,
        default(){
          return {}
        }
      },
      // 文件上传格式错误
      onFileFormart:{
        type:Function,
        default(){
          return {}
        }
      },
      onExceededSize: {
        type: Function,
        default () {
          return {};
        }
      },
      maxSize:{
        type:Number
      }
    },
    methods: {
      // 选择文件触发input点击事件
      upClick(){
       this.$refs.input.click();
      },
      // input选择文件
      checkUp(e){
        const file = e.target.files;
        if(!file){
          return;
        }
        this.uploadFlie(file);
        this.$refs.input.value = null;
      },
      // 上传文件
      uploadFlie(file){
        for(let i =0;i<file.length;i++){
          var  blob= file[i];
          var files = file[i];
        }
        //文件上传进度
        this.uploadStart(files);

        //每块多大
        var chunk = 5*1024 *1024;
        if(this.count == 1){
          chunk = 0;
        }
        var formData = new FormData();
        //循环文件，暂时不行

        //文件的总块数
        // var shardCount  = Math.ceil(blob.size / (5*1024*1024));
        //第几个分块
        var currentChunk = 0;
        var before = currentChunk * chunk,
            after = (currentChunk + 1) * chunk > blob.size ? blob.size : (currentChunk + 1) * chunk;


        if(this.maxSize){
          if(file.size>this.maxSize){
            this.onExceededSize(file,this.fileList);
            return false;
          }
        }
          formData.append('slicesNum',currentChunk);
          formData.append("uploadFile", blob.name);
          formData.append("size",after);
          //如果有data formData追加上传的参数
          if (this.data) {
            //获取对象的key
            Object.keys(this.data).map(key => {
              formData.append(key, this.data[key]);
            });
          }
          var xhr = new XMLHttpRequest();
          xhr.open('post',this.action,true);
          xhr.send(formData);
        //   xhr.upload.onprogress = function(e) {
        //   if (e.lengthComputable) { //lengthComputable 是 progress 的一个属性，表示资源是否可计算字节流
        //     progressBar.value = (e.loaded / e.total) * 100;
        //     progressBar.textContent = progressBar.value; //有点浏览器不支持，这是后备选择
        //   }
        // }
      },
      // 拖拽上传
      onDrop(e){
        this.dragOver = false;
        this.uploadFlie(e.dataTransfer.files);
      },
      uploadProeegs(e,file){
        const _file = file;
        this.onProgress(e, _file, this.fileList);
        _file.percentage = e.percent || 0;
      },
      //文件信息
      uploadStart(file){
        // console.log(file);
      file.Uid =  Date.now() + this.timeIndex++;
        const _flie = {
          status :'uploading',
          name : file.name,
          size : file.size,
          percentage : 0,
          uid: file.Uid,
          showProgress: true
        };
        this.fileList.push(_flie);
      },

      //删除文件
      deleteUpload(index){
        this.fileList.splice(index,1);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .upload_list{
    display: flex;
    height: 50px;
  div:nth-child(1){
    width: 26%;
    height: 25px;
    line-height: 25px;
    color: #666666;
  }
  div:nth-child(2) {
    width: 16%;
    height: 25px;
    line-height: 25px;
    color: #666666;
  }
  div:nth-child(3) {
    width: 33%;
    height: 25px;
    line-height: 25px;
    color: #666666;
  }
  div:nth-child(4) {
    width: 26%;
    height: 25px;
    line-height: 25px;
    color: #2A99F2
  }
  }
</style>
