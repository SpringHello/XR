<template>
  <div :class="[prefixCls]">
    <div @click="upClick"
         @drop.prevent="onDrop"
         @dragover.prevent="dragOver = true"
         @dragleave.prevent="dragOver = false"
         style="cursor:pointer">
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
    name:'upload',
    data(){
      return{
        dragOver:false,
        prefixCls: prefixCls,
        timeIndex:1,
        fileList:[],
        unText:'',
        oldTime:0
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
      },
      defaultFileList:{
        type:Array,
        default(){
          return [];
        }
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
        let start = 0;
        if(!file){
          return;
        }
        let chunk = 5*1024 *1024;
        let chunks = [];
        for(let i=0;i<file.length;i++){
          for(let j = 0;j<Math.ceil(file[i].size / chunk);j++){
            let end = start + chunk;
            chunks[i] = file[i].slice(start,end);
            start = end;
          }
        }
        //改变文件对象为数组类型(文件对象切割出来放在数组里面)
        let postFile = Array.prototype.slice.call(file);
        postFile.forEach(file=>{
          this.uploadFlie(file,chunks);
        })
        this.$refs.input.value = null;
      },
      // 上传文件
      uploadFlie(file,chunks){
        let formData = new FormData();
          if(this.maxSize){
            if(file.size > this.maxSize){
              this.onExceededSize(file,this.fileList);
              return false;
            }
          }
          this.uploadStart(file);
        formData.append('uploadFile',file);
        formData.append('chunks',chunks);
          //如果有data formData追加上传的参数
          if (this.data) {
            //获取对象的key
            Object.keys(this.data).map(key => {
              formData.append(key, this.data[key]);
            });
          }

        let xhr = new XMLHttpRequest();
          xhr.open('post',this.action,true);
          xhr.onreadystatechange = function (e){
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                  this.handleProgress(e,file);
                  this.handleSuccess(res,file);
                  this.handleError(e,res,file);
                xhr.upload.onprogress = function(e) {
                  if (e.lengthComputable) { //lengthComputable 是 progress 的一个属性，表示资源是否可计算字节流
                    e.percent = e.loaded / e.total * 100;
                    this.fileList.percentage = e.percent;
                    this.oldTime = 0;
                    // progressBar.textContent = progressBar.value; //有的浏览器不支持，这是后备选择
                    console.log(e.percent);
                  }
                }
              }else if(xhr.status == 500){
                this.$Message.info('平台出小差了');
              }
            }
          }
          xhr.send(formData);
      },
      // 拖拽上传
      onDrop(e){
        this.dragOver = false;
        this.uploadFlie(e.dataTransfer.files);
      },
      uploadProeegs(e){
        // const _file = file;
        // this.onFileProcess(e, _file, this.fileList);
        this.fileList.percentage = e.percent || 0;
      },
      //文件信息
      uploadStart(file){
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
        // console.log(this.fileList);
      },
      //删除文件
      deleteUpload(index){
        this.fileList.splice(index,1);
      },
      //上传成功
      handleSuccess(res,file){
        const _file = file ;
        if(_file){
          _file.status = 'finished';
          _file.response = res;
          if(_file.response.data.status == 1){
            this.onSuccess(res, _file, this.fileList);
            setTimeout(() => {
              _file.showProgress = false;
            }, 1000);
          }
        }
      },
      //文件上传过程
      handleProgress (e, file) {
        const _file = this.getFile(file);
        this.onProgress(e, _file, this.fileList);
        _file.percentage = e.percent || 0;
      },
      //文件上传失败
      handleError(e,res,file){
        this.onError(e,res,file);
      }
    },
    watch: {
      defaultFileList: {
        immediate: true,
        handler(fileList) {
          this.fileList = fileList.map(item => {
            item.status = 'finished';
            item.percentage = 100;
            item.uid = Date.now() + this.tempIndex++;
            return item;
          });
        }
      },
      time: function (fileList) {
        let newTime = new Date().getTime();
        let pertTime = (newTime - this.oldTime) / 1000 ;
        this.oldTime = new Date().getTime();

        let size = (this.fileList.loaded - this.oldSize) / pertTime;
        // var size = this.time.loaded - this.oldSize
        let sped = size;
        this.oldSize = this.fileList.loaded;
        if(size / 1024 >1 && size / 1024 < 1000) {
          size = size / 1024 ;
          this.unText="KB/s";
        }else if(size / 1024 > 1000){
          size = size / 1048576;
          this.unText="MB/s";
        }
        this.fist = size.toFixed(1);
        let listTime = ((this.fileList.total - this.fileList.loaded) / sped);
        console.log(listTime);
        let tina = (listTime / (60*60)).toFixed(0);
        let mint = (listTime / 60).toFixed(0);
        let secor = (listTime % 60).toFixed(0);
        this.listTime = tina +':' +mint +':' +secor
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
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
