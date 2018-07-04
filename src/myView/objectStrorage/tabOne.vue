<template>
    <div class="boxs">
        <div >
            <Button type="primary" @click="modal6 = true">新建空间</Button>
        </div>
        <div style="margin-top:10px;">
             <Table   :columns="spaceColumns" :data="spaceData" no-data-text="您还没有创建Bucket（存储空间）,请点击新建空间"></Table>
        </div>
        <!--新建空间-->
         <Modal
        v-model="modal6"
        title="新建空间"
        :scrollable='true'>
           <hr color="#D8D8D8" size=1/>
           <br/>
        <Form ref="bucketInline" :model="bucketInline" :rules="bucketRule" label-position="top">
          <FormItem prop="bucketName" label="空间名称">
             <Input type="text" v-model="bucketInline.bucketName" placeholder="请输入少于20位的数字与字母名称" style="width:240px;"></Input>
          </FormItem>
          <FormItem prop="visit" label="访问权限">
            <Select v-model="bucketInline.visit" style="width:240px">
                <Option v-for="item in visitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
        <div class="modal_text">
            <p>1.私有读写：对文件的所有访问操作由文件的所有者授权的操作人完成。</p>
            <p>2.公有读私有写：任何人都可以读取文件，对文件的写入、删除等操作仍需要由文件的所有者授权的操作人完成 </p>
            <p>3.公有读写：所有人均可读写Bucket内的Object，无需身份验证。该权限安全风险极高，为确保您的数据安全，请谨慎选择!</p>
        </div>
           <div slot="footer" class="modal-footer-border">
             <Button type="ghost" @click="modal6 = false">取消</Button>
             <Button type="primary" @click="bucketClick">确定新建</Button>
           </div>
    </Modal>
    </div>

</template>

<script >
  const bucketValid = (rule,value,callback)=>{
      let reg =  /^[a-z]{3,20}$/;
      if(value == ''){
        return callback(new Error('请输入空间名称'));
      }else if(!reg.test(value)){
        return callback(new Error('空间名字只能为小写字母且长度不能小于3位大于20位'));
      }else {
        callback();
      }
  }
export default {
  data() {
    return {
      //创建空间
      bucketInline: {
        //空间名字
        bucketName: "",
        //访问权限
        visit: ""
      },
      bucketRule: {
        bucketName: [
          { required: true,validator:bucketValid, trigger: "blur" },
        ],
        visit: [{ required: true, message: "请选择权限", trigger: "change" }]
      },
      //空间管理数据表格表头
      spaceColumns: [
        {
          key: "name",
          title: "空间名称",
          render: (h, parasm) => {
            const hide = parasm.row.hide == 1 ?'inline-block':'none';
            return h("div", [
              h('Spin',{
                prop:{
                  size:'small'
                },
                style:{
                  display:hide,
                }
              }),
              h(
                "span",
                {
                  style:{
                    cursor:'pointer',
                    color:'#2A99F2'
                  },
                  on:{
                    click:()=>{
                      // eventBus.$emit('bucketName', parasm.row.name);
                      sessionStorage.setItem("bucketName", parasm.row.name);
                      sessionStorage.setItem('bucketId', parasm.row.id);
                      sessionStorage.setItem('accessrights', parasm.row.accessrights)
                      sessionStorage.setItem('createtime', parasm.row.createtime);
                      this.$router.push({path: "SpaceDetails"});
                    }
                  }
                },
                parasm.row.name
              )
            ]);
          }
        },
        {
          key: "accessrights",
          title: "权限",
          render: (h, parasm) => {
            return h("div", [
              h(
                "span",
                {},
                parasm.row.accessrights == 1 ? "私有读写" : parasm.row.accessrights ==2 ? "公有读私有写" : parasm.row.accessrights == 3 ?"公有读写" : parasm.row.accessrights == 4 ?'自定义权限':'————'
              )
            ]);
          }
        },
        {
          key: "createtime",
          title: "创建时间"
        },
        {
          key: "operation",
          title: "操作",
          render: (h, parasm) => {
            if(parasm.row.hide != 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#2A99F2",
                      marginRight: "20px",
                      cursor: "pointer"
                    },
                    on: {
                      click:()=> {
                        this.$Modal.confirm({
                          title: '删除空间',
                          content: '<p>是否删除该空间</p>',
                          onOk: () => {
                            this.bucketDelete(parasm.row.name, parasm.row._index);
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ])
            }
          }
        }
      ],
      //空间管理表格数据
      spaceData: [],
      modal6: false,
      //访问权限
      visitList: [
        {
          label: "私有读写",
          value: "1"
        },
        {
          label: "公有读私有写",
          value: "2"
        },
        {
          label:'公有读写',
          value:'3'
        }
      ],
      buckLoading:false
    };
  },
  methods: {
    //获取空间列表
    getBuckets() {
      this.buckLoading = true;
      this.$http
        .post("bucket/getBuckets.do", {})
        .then(res => {
          if (res.data.status == "1") {
            this.spaceData = res.data.data.bucket;
            sessionStorage.setItem('http',res.data.data.protocol);
            this.buckLoading = false;
          } else {
            this.spaceData = [];
            this.buckLoading = false;
            this.$Message.info(res.data.msg);
          }
        });
    },
    //创建空间
    bucketClick() {
      this.modal6 = false;
      this.$refs.bucketInline.validate(valid => {
        if (valid) {
          let obj = {name:'创建中',hide:1,createtime:'————',operation:'————',accessrights:'————'};
          this.spaceData.push(obj);
          this.$http
            .post("bucket/createBucket.do", {
              bucketName: this.bucketInline.bucketName,
              accessrights: this.bucketInline.visit
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$Message.success("创建成功");
                this.getBuckets();
              } else {
                this.$Message.info('平台出小差了');
              }
            });
        }
      });
    },
    //删除空间
    bucketDelete(name,index) {
      let object = {name:'删除中',hide:1,createtime:'————',operation:'————',accessrights:'————'};
      this.spaceData.splice(index,1,object);
      this.$http
        .post(
          "bucket/forceDestroyBucket.do",
          {
            bucketName: name
          }
        )
        .then(res => {
          if (res.data.status == "1") {
            this.getBuckets();
            this.$Message.success("删除成功");
          } else {
            this.$Message.info('平台出小差了');
          }
        });
    },
  },
  mounted() {
    this.getBuckets();
  }
};
</script>

<style lang="less" scoped>
.modal-p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #333333;
  font-family: MicrosoftYaHei;
}
.modal_text {
  margin-top: 20px;
  font-size: 14px;
  color: #999999;
  p {
    line-height: 18px;
  }
}
.boxs {
  font-family: MicrosoftYaHei;
  width: 100%;
  height: 100%;

  .card-center {
    display: flex;
    margin-top: 20px;
    height: 80px;
    border-bottom: 1px solid #e9e9e9;
    div {
      width: 34%;
      display: inline-block;
      .p_text {
        color: #666666;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        margin-bottom: 5px;
      }
      .p_textf {
        color: #2b99f2;
        font-family: MicrosoftYaHei;
        font-size: 18px;
      }
    }
  }
  .card-bottom {
    margin-top: 14px;
    div {
      display: inline-block;
      font-size: 12px;
      color: #666666;
    }
    button {
      float: right;
      height: 28px;
    }
  }
}
</style>

