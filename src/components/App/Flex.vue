<template>
  <div id="flex">
    <Button type="primary" @click="modal.showModal = true">创建登录表单</Button>
    <Modal v-model="modal.showModal" scrollable title="登录表单">

      <Form  ref='form' :model="modal.formValidate" :rules="modal.ruleValidate"  style="padding-left:20px;">
        <FormItem label="Name" prop="name" style="width: 230px;">
          <Input v-model="modal.formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
          <FormItem label="Phone" prop="phone" style="width: 230px;">
            <Input v-model="modal.formValidate.phone" placeholder="Enter your phone"></Input>
          </FormItem>
        <FormItem label="Email" prop="email" style="width: 230px;">
          <Input v-model="modal.formValidate.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="PassWord" prop="password" style="width: 230px;">
          <Input v-model="modal.formValidate.password" placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem label="Gender" prop="gender" style="width: 230px;">
         <RadioGroup v-model="modal.formValidate.gender">
           <Radio label="male">male</Radio>
           <Radio label="female">female</Radio>
         </RadioGroup>
        </FormItem>
        <FormItem v-if="modal.formValidate.gender == 'male'" style="width: 230px;">
          123
          <Select v-model="modal.formValidate.num">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button @click="close">Cancel</Button>
        <Button @click="next">Next</Button>
        <Button>Complete</Button>
      </div>
    </Modal>
    <div>
      <Tabs type="card" :animated="false">
        <TabPane label='创建' name="1">
          <Table></Table>
        </TabPane>
        <TabPane label='删除' name="2">
          <ul style="font-size: 16px;">
            <li>num1</li>
            <li>num2</li>
            <li>num2</li>
          </ul>
        </TabPane>
      </Tabs>
    </div>
    <div>
      <p style="margin:10px;">加载进度条</p>
      <Button type="primary" @click="start">Start</Button>
      <Button type="primary" @click="finish">Finished</Button>
      <Button type="primary" @click="error">Error</Button>
    </div>
    <div>
      <p style="margin:10px;">步骤</p>
      <Steps size="small" :current="current">
        <Step title="步骤1" content="这是步骤1的内容"></Step>
        <Step title="步骤2" content="这是步骤2的内容"></Step>
        <Step title="步骤3" content="这是步骤3的内容"></Step>
      </Steps>
      <Button type="success" @click="nextStep">下一步</Button>
    </div>
    <div>
      <p style="margin: 10px;">面包屑</p>
      <Breadcrumb>
        <BreadcrumbItem to="/price">Home</BreadcrumbItem>
        <BreadcrumbItem to="/document">document</BreadcrumbItem>
        <BreadcrumbItem to="/abouts">abouts</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div>
      <p style="margin: 10px;">下拉菜单</p>
      <Dropdown>
        <a href="#">重庆特色地方</a>
        <Icon type="arrow-down-b"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem>观音桥</DropdownItem>
          <DropdownItem>解放碑</DropdownItem>
          <DropdownItem>南坪</DropdownItem>
          <DropdownItem>杨家坪</DropdownItem>
          <DropdownItem>沙坪坝</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="margin-left:20px;">
        <Button type="primary">家常菜肴</Button>
        <DropdoenMenu slot="list">
          <DropdownItem>香辣花甲</DropdownItem>
          <DropdownItem>红烧肉</DropdownItem>
          <DropdownItem>海带蹄花汤</DropdownItem>
        </DropdoenMenu>
      </Dropdown>
    </div>
    <div>
      <p style="margin:15px;">Menu导航菜单</p>
      <Menu theme="dark"  mode="horizontal">
        <MenuItem name="1">0</MenuItem>
        <Submenu name="2">
          <template slot="title">1</template>
          <MenuItem>num1</MenuItem>
          <MenuItem>num2</MenuItem>
          <MenuItem>num3</MenuItem>
          <MenuItem>num4</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">2</template>
          <MenuItem>num4</MenuItem>
          <MenuItem>num5</MenuItem>
          <MenuItem>num6</MenuItem>
          <MenuItem>num7</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div>
      <p style="margin: 15px;">Collapse折叠面板</p>
      <Collapse accordion>
        <Panel>
          春晓
          <p slot="content">春眠不觉晓。处处闻啼鸟，夜来风雨声，花落知多少</p>
        </Panel>
        <Panel>
          锄禾
          <p slot="content">锄禾日当午。汉地或下图。水之畔中盘。粒粒皆辛苦</p>
        </Panel>
        <Panel>
          儿歌
          <p slot="content">孩子孩子，为何你着谜坏，欺负 七千，为何你做出来</p>
        </Panel>
      </Collapse>
    </div>

    <div>
      <p style="margin: 15px;">级联选择</p>
      <Cascader :data="data" v-model="values" style="width: 200px;"></Cascader>
    </div>

    <div>
      <p style="margin: 15px;">Select选择器</p>
      <Select style="width: 200px;">
        <Option value="1">haha</Option>
        <Option value="2">baba</Option>
        <Option value="3">nana</Option>
        <Option value="4">dada</Option>
      </Select>
    </div>

    <p style="margin: 15px;">防火墙表格</p>
    <Table border :columns="columns" :data="tableData"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  //import axios from 'axios'
  export default {
      data () {
          return {
            values:[],
            data: [
                {
                value: '四川省',
                label:'四川省',
                children :[
                    {
                    value: '北京',
                   label: '北京',
                      children: [
                        {
                            value: '颐和园',
                          label: '颐和园'
                        },
                        {
                          value: '故宫',
                          label: '故宫'
                        },
                        {
                            value: '天安门',
                          label: '天安门'
                        }
                      ]
                },
                  {
                    value: '上海',
                    label: '上海'
                  },
                  {
                    value: '绵阳',
                    label: '绵阳'
                  },
                  {
                    value: '成都',
                    label: '成都'
                  }
                ]
            },
              {
                  value: '贵州省',
                 label: '贵州省'
              },
              {
                  value: '湖北省',
                 label: '湖北省',
                children: [
                  {
                      value: '邯郸',
                     label: '邯郸'
                  },
                  {
                      value: '哈尔齐',
                    label: '哈尔齐'
                  }
                ]
              }
            ],
            current: 0,
             modal:{
                 showModal: false,
               formValidate:{
                 name: '',
                 gender: ' ',
                 phone: '',
                 email: '',
                 password: '',
                 choose: '',
                 daxiao: '',
                 num: '',


               },
               ruleValidate:{
                 name: [
                   { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                 ],
                 phone: [
                   { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                 ],
                 email: [
                   { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                 ],
                 password: [
                   { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                 ],
                 gender: [
                   { required: true, message: 'The name cannot be empty', trigger: 'change' }
                 ],
                 choose: [
                   { required: true, message: 'The name cannot be empty', trigger: 'change' }
                 ],
                 num: [
                   { required: true, message: 'The name cannot be empty', trigger: 'change' }
                 ],
               }

             },
            columns: [
              {
                type: 'radio',
                width: 60,
                align: 'center',
              },
              {
                title: '名称',
                align: 'center',
                key: 'acllistname'
              },
              {
                title: 'ID',
                align: 'center',
                width: 250,
                render: (h, params) => {
                  return h('Tooltip', {
                      props: {
                        content: params.row.acllistid,
                        placement: 'top'
                      }
                    },
                    params.row.acllistid
                  )
                }
              },
              {
                title: '所属VPC',
                align: 'center',
                key: 'vpcname'
              },
              {
                title: '创建时间',
                align: 'center',
                key: 'createtime'
              },
              {
                title: '操作',
                width: 100,
               render: (h, params) => {
                    return h('span',{
                        style:{
                            color: '#377DFF'
                        },
                      on:{
                            click: ()=>{
                                this.$router.push('balance')
                            }
                      }
                    },'管理')
               }
              }
            ],
            pageInfo: {
              total: 0,
              page: 1,
            },
            tableData:[]
          }
      },
    created (){
      this.$http.get(`network/listAclList.do?pageSize=10&page=${this.pageInfo.page}`).then(response => {
      if(response.status ==200 && response.data.status ==1){
        this.tableData =response.data.result.data
      }
    })
  },
    methods:{
     /* show (){
        this.modal.showModal = true
      }*/
      close () {
        this.modal.showModal = false
        this.$refs.form.resetFields();
      },
      next () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          }
        })
      },
      start () {
          this.$Loading.start();
      },
      error () {
        this.$Loading.error();
      },
      finish () {
        this.$Loading.finish();
      },
      nextStep () {
          if(this.current == 2){
              this.current =0
          }else{
              this.current ++
          }
      }
    },
 }
</script>

<style rel="stylesheet/less" lang="less" scpoed>
  #flex{
    width: 1200px;
    margin: 0 auto;
    padding:20px 0;
  }
</style>
