<template>
  <div id="template">
    <div class="warn">
      <p>提醒： 域名所有者名称代表域名的拥有权，请填写与所有者证件完全一致的企业名称或姓名。如果修改模板信息，相关域名信息也会随之更改。</p>
    </div>
    <div class="table">
      <Form :model="formValidate" :rules="ruleValidate" :label-width="184">
        <FormItem label="选择已有模板" prop="chooseTemplate">
          <Select v-model="formValidate.chooseTemplate" style="width: 500px;" @on-change="TemplateValue">
            <!--<Option value="temp1">temp1</Option>-->
            <Option value="notemp">请选择</Option>
          </Select>
        </FormItem>
        <div v-show="show==1">
          <FormItem label="域名所有者类型" prop="userType">
            <RadioGroup v-model="formValidate.userType">
              <Radio label="personal">个人</Radio>
              <Radio label="enterprise">企业</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="域名所有者名称（中文）" prop="name">
            <Input v-model="formValidate.name" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="域名管理联系人（中文）" prop="user">
            <Input v-model="formValidate.user" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="所属区域">
            <Cascader :data="formValidate.data" v-model="formValidate.area" style="width: 500px;"></Cascader>
          </FormItem>
          <FormItem label="通讯地址（中文）" prop="address">
            <Input v-model="formValidate.address" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="邮编" prop="postcode">
            <Input v-model="formValidate.postcode" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="电子邮箱" prop="zipcode">
            <Input v-model="formValidate.zipcode" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="电话">
            <div style="display: inline-block;">
            <span style="display: inline-block;padding-right: 20px;">
            国家代码 <Input v-model="formValidate.Countrycode" style="width: 40px;padding-left: 10px;"></Input>
          </span>
              <span style="display: inline-block;padding-right: 20px;">
            区号固定电话或手机号码 <Input v-model="formValidate.phone" style="width: 113px;padding-left: 6px;"></Input>
         </span>
              <span style="display: inline-block;">
            分机号 <Input v-model="formValidate.extension" style="width: 101px;padding-left: 10px;"></Input>
         </span>
            </div>
          </FormItem>
          <FormItem>
            <p style="font-size:14px;color:rgba(17,17,17,0.43);line-height:20px;">例如：国家代码：86，电话号码：01012345678</p>
          </FormItem>
          <FormItem label="传真">
            <div>
              <Input style="width: 101px"></Input>
              <Input style="width: 101px;margin-left: 32px"></Input>
              <Input style="width: 101px;margin-left: 32px"></Input>
              <Input style="width: 101px;margin-left: 32px"></Input>
            </div>
          </FormItem>
          <FormItem>
            <p style="font-size:14px;color:rgba(17,17,17,0.43);line-height:20px;">
              国家区号-地区区号(或手机号码前3位)-电话号码（或手机号码后8位)-分机号(手机不必填)</p>
          </FormItem>
          <FormItem label="域名所有者名称（英文）" prop="Englishname">
            <Input v-model="formValidate.Englishname" style="width: 500px;"></Input>
          </FormItem>
          <FormItem label="域名管理联系人（英文）">
            <Input style="width: 100px"></Input>
            <Input style="width: 100px;margin-left: 32px"></Input>
          </FormItem>
          <FormItem>
            <p style="font-size:14px;color:rgba(17,17,17,0.43);line-height:20px;">姓-名</p>
          </FormItem>
          <FormItem label="通讯地址（英文）" prop="Englishaddress">
            <Input v-model="formValidate.Englishaddress" style="width: 500px;"></Input>
          </FormItem>
          <FormItem>
            <button class="cancel">取消</button>
            <button class="info">确认建立模板</button>
          </FormItem>
        </div>
        <div v-show="show==2"></div>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        show: 1,
        formValidate: {
          chooseTemplate: 'notemp',
          userType: 'personal',
          name: '',
          user: '',
          area: [],
          data: [
            {
              value: 'beijing',
              label: '北京',
              children: [
                {
                  value: 'gugong',
                  label: '故宫'
                },
                {
                  value: 'tiantan',
                  label: '天坛'
                },
                {
                  value: 'wangfujing',
                  label: '王府井'
                }
              ]
            },
            {
              value: 'jiangsu',
              label: '江苏',
              children: [
                {
                  value: 'nanjing',
                  label: '南京',
                  children: [
                    {
                      value: 'fuzimiao',
                      label: '夫子庙',
                    }
                  ]
                },
                {
                  value: 'suzhou',
                  label: '苏州',
                  children: [
                    {
                      value: 'zhuozhengyuan',
                      label: '拙政园',
                    },
                    {
                      value: 'shizilin',
                      label: '狮子林',
                    }
                  ]
                }
              ],
            }
          ],
          address: '',
          postcode: '',
          zipcode: '',
          Countrycode: '',
          phone: '',
          extension: '',
          Englishname: '',
          Englishaddress: ''


        },
        ruleValidate: {
          chooseTemplate: [
            {required: true, message: '', trigger: 'change'}
          ],
          userType: [
            {required: true, message: 'Please select userType', trigger: 'change'}
          ],
          name: [
            {required: true, message: `只允许输入中文、英文、数字,且必须含有中文,特殊字符允许输入 .,、() -"“”&/'·及空格符`, trigger: 'blur'}
          ],
          Englishname: [
            {required: true, message: `只允许输入英文、数字,且必须含有英文,特殊字符允许输入 .,、() -"“”&/'·及空格符`, trigger: 'blur'}
          ],
          user: [
            {required: true, message: `只允许输入中文、英文、数字,且必须含有中文,特殊字符允许输入 .,、() -"“”&/'·及空格符`, trigger: 'blur'}
          ],
          address: [
            {required: true, message: `只允许输入中文、英文、数字,且必须含有中文,特殊字符允许输入 .,、() -"“”&/'·及空格符`, trigger: 'blur'}
          ],
          Englishaddress: [
            {required: true, message: `只允许输入英文、数字,且必须含有英文,特殊字符允许输入 .,、() -"“”&/'·及空格符`, trigger: 'blur'}
          ],
          postcode: [
            {required: true, message: '请输入正确格式的邮编，邮编长度6位', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '请输入正确格式的邮箱地址', trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      TemplateValue(){
        if (this.formValidate.chooseTemplate == 'notemp') {
          this.show = 1
        } else {
          this.show = 2
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #template {
    background: rgba(255, 255, 255, 1);
    padding: 60px 0 200px 0;
  }

  .warn {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    background: rgba(255, 235, 237, 1);
    border-radius: 4px;
    border: 1px solid rgba(255, 0, 31, 1);
    padding: 22px 0;
    p {
      font-size: 14px;
      color: rgba(255, 0, 31, 1);
    }
  }

  .table {
    padding-top: 41px;
    .cancel {
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(217, 217, 217, 1);
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      padding: 5px 15px;
      outline: none;
      cursor: pointer;
    }
    .info {
      background: rgba(42, 153, 242, 1);
      border-radius: 4px;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      padding: 5px 15px;
      outline: none;
      cursor: pointer;
      border: none;
      margin-left: 10px;
    }
  }
</style>
