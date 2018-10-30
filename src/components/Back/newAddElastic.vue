<template>
  <div id="background">
    <div id="wrapper">
      <p style="margin: 20px 0;">云服务器 / 弹性伸缩</p>
      <div id="content">
        <div class="ela_head">
          <div class="head_right">
            <div class="back" @click="$router.push({path:'elastic'})">
              <div class="back_icon"></div>
              <span>返回</span>
            </div>
            <span>新建启动配置</span>
          </div>
          <Button type="ghost" style="float: right;">刷新</Button>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <div class="next_pace">
          <div class="next_box" :class="item.className" v-for="(item,index) in nextList" :key="index"> 
            <div :class="item.yuanName">{{item.number}}</div>
            <span style="margin-left: 10px;font-size: 14px;">{{item.value}}</span>
            <i :class="item.arrowName" v-if="index !=3">
              <i></i>
            </i>
          </div>
        </div>
        <p style="margin: 20px 0;font-size: 14px;color: #999999;">提示：启动配置之时模板，创建启动配置不收费，按照启动配置增加的主机才按照实时价格计费。</p>
        <!--第一步-->
        <div style="width: 700px;" v-show="hostSpecification.nextIndex == 1">
          <Form ref="config" :model="config" :rules="configValidate" :label-width="80">
            <FormItem label="配置名称" prop="configName">
              <Input v-model="config.configName" style="width: 317px"></Input>
              <p style="color: #666666;margin-top:10px;">请输入不超过16位字符名称，支持中文、字母与数字</p>
            </FormItem>
          </Form>
          <div style="margin-bottom:20px;">
            <span style="margin-right:20px;">计费方式</span>
            <span>实时计费</span>
          </div>
          <div>
            <span style="margin-right:20px;">地域选择</span>
            <span>{{$store.state.zone.zonename}}</span>
          </div>
          <p style="font-size: 14px;color: #333333;margin: 20px 0 16px 0;">主机规格</p>
          <div>
            <div class="cpu_list">
              <span>核心数</span>
              <ul>
                <li v-for="(item,index) in hostSpecification.cpuList" :key="index" class="nav_item" :class="hostSpecification.cpuIndex == index  ?'nav_item_click':''"  @click="cpuClick('cpu',index)">{{item.CPU}}核</li>
              </ul>
            </div>
            <div class="cpu_list" style="margin: 20px 0;">
              <span style="margin-right: 42px">内存</span>
              <ul>
                <li v-for="(item,index) in hostSpecification.memoryList" :key="index" class="nav_item" :class="hostSpecification.memoryIndex == index  ?'nav_item_click':''"  @click="cpuClick('memory',index)">{{item.memory}}G</li>
              </ul>
            </div>
            <div class="cpu_list">
              <span>系统盘</span>
              <ul>
                <li v-for="(item,index) in hostSpecification.systemData" :key="index" class="nav_item" :class="hostSpecification.systemIndex == index  ?'nav_item_click':''"  @click="cpuClick('system',index)">{{item.value}}</li>
              </ul>
            </div>
            <div style="margin: 20px 0;">
              <span style="margin-right: 5px;">系统盘容量</span>
              <span>40G</span>
            </div>
            <div>
              <span style="margin-right: 40px;">资费</span>
              <span>{{hostSpecification.money}}元/小时</span>
            </div>
          </div>
        </div>
        <!--已选配置-->
        <div v-if="hostSpecification.nextIndex != 1">
          <div class="selected">
            <div style="width: 70px;">
              <p style="color: #333333;font-size: 14px;">已选配置</p>
            </div>
            <div style="width: 97px;">
              <div class="next_two">
                <p>配置名称</p>
                <p>计费方式</p>
                <p>地域选择</p>
                <p>主机规格</p>
                <p>系统盘</p>
                <p>系统盘容量</p>
                <p v-if="hostSpecification.nextIndex > 2">镜像</p>
                <div v-if="hostSpecification.nextIndex > 3">
                  <p v-if="dataCheckout">数据盘类型</p>
                  <p v-if="dataCheckout">数据盘容量</p>
                  <p>公网IP</p>
                  <p v-if="single">带宽</p>
                </div>
              </div>
              <p>资费</p>
            </div>
            <div>
              <div class="next_two">
                <p>{{selectedList.name}}</p>
                <p>{{selectedList.timeType}}</p>
                <p>{{selectedList.zoneName}}</p>
                <p>{{selectedList.hostFormat}}</p>
                <p>{{selectedList.systemDiskType}}</p>
                <p>40GB</p>
                <p v-if="hostSpecification.nextIndex > 2">{{selectedList.mirrorName}}</p>
                <div v-if="hostSpecification.nextIndex > 3">
                  <p v-if="dataCheckout">{{selectedList.dataDiskType}}</p>
                  <p v-if="dataCheckout">{{selectedList.diskSize}}GB</p>
                  <p>{{selectedList.publicIp}}</p>
                  <p v-if="single">{{selectedList.bandWidth}}MB</p>
                </div>
              </div>
              <p v-if="hostSpecification.nextIndex < 4">{{hostSpecification.money}}元/小时</p>
              <p v-else>{{selectedList.money}}元/小时</p>
            </div>
          </div>
        </div>
        <!--第二步-->
        <div v-if="hostSpecification.nextIndex == 2">
          <div style="display: flex;padding: 20px 0;">
            <div style="width: 70px;line-height: 40px">
              <span style="color: #333333;font-size: 14px;display: block;height: 32px;line-height: 32px;">镜像</span>
            </div>
            <div style="width: 100%;">
              <ul>
                <li v-for="(item,index) in mirror" class="nav_item" :key="index" :class="mirrorIndex == index  ?'nav_item_click':''"  @click="cpuClick('mirror',index)">{{item.value}}</li>
              </ul>
              <p style="color: #666666;margin: 10px 0 20px 0;">为了使主机创建完成后直接可用，强烈建议您将业务应用部署在自定义镜像中</p>
              <div v-if="mirrorIndex == 0">
                <Select v-model="mirrorName" style="width:200px" v-if="mirrorList.length !=0" >
                  <Option v-for="item in mirrorList" :value="item.systemtemplateid" :key="item.systemtemplateid">{{ item.ostypename }}</Option>
                </Select>
                <div v-else >您还没有自定义镜像，点击<span @click="showModal.createMirror = true" style="color: #2A99F2;cursor: pointer;">新建镜像</span></div>
              </div>
              <div v-if="mirrorIndex == 1">
                <Dropdown v-for="(item,index) in systemMirror.publicList"  :key="item.ostypeid" @on-click="setOs">
                    <div class="mirror">
                      {{item.selectSystem||item.system}}
                    </div>
                  <DropdownMenu slot="list">
                    <DropdownItem  style="white-space: pre-wrap;display:block;" v-for="system in item.systemList" :key="system.ostypeid" :name="`${system.ostypename}#${system.systemtemplateid}#${index}`">{{system.templatename}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <!--第三步-->
        <div v-if="hostSpecification.nextIndex == 3">
          <div style="display:flex;padding: 20px 0;">
            <div class="next_wo">
              <p>数据盘</p>
              <p style="height: 32px;line-height: 32px;" v-if="dataCheckout">数据盘类型</p>
              <p style="margin: 26px 0;height: 40px;line-height: 40px;" v-if="dataCheckout">容量</p>
              <p>公网IP</p>
              <p style="margin: 26px 0;height: 40px;line-height: 40px;"  v-if="single">带宽</p>
              <p v-if="hostSpecification.nextIndex == 3" style="margin-top: 28px;">资费</p>
            </div>
            <div style="width: 100%;">
              <div>
                <Checkbox v-model="dataCheckout" @on-change="getCapacityPrice" style="margin-bottom:10px;">数据盘</Checkbox> 
              </div>
              <ul v-if="dataCheckout">
                <li v-for="(item,index) in dataDiskType" class="nav_item" :key="index" :class="dataIndex == index  ?'nav_item_click':''"  @click="cpuClick('data',index)">{{item.value}}</li>
              </ul>
              <div v-if="dataCheckout" style="width:500px;display: flex;align-items:center;margin: 26px 0;">
                <i-slider
                  v-model="diskSize"
                  unit="GB"
                  :min=20
                  :max=1000
                  :step=10
                  :points="[500,800]"
                  style="margin-right:30px;vertical-align: middle;">
                </i-slider>
                <InputNumber :max="1000" :min="20" v-model="diskSize" size="large" :step=10
                             @on-blur="changeDiskSize(index,diskSize)"
                             @on-focus="changeDiskSize(index,diskSize)"></InputNumber>
              </div>
              <div>
                <Checkbox v-model="single" @on-change="getCapacityPrice">公网IP</Checkbox>
              </div>
              <div style="width:500px;display: flex;align-items:center;margin-top: 28px;" v-if="single">
                <i-slider
                  v-model="bandWidth"
                  unit="MB"
                  :min=1
                  :max=100
                  :step=1
                  :points="[20,50]"
                  style="margin-right:30px;vertical-align: middle;">
                </i-slider>
                <InputNumber :max="100" :min="1" v-model="bandWidth" size="large"
                             @on-blur="changeDiskSize(index,bandWidth)"
                             @on-focus="changeDiskSize(index,bandWidth)"></InputNumber>
              </div>
              <p v-if="hostSpecification.nextIndex == 3" style="margin-top: 28px;">{{price}}元/小时</p>
            </div>
          </div>
        </div>
        <!--第四步-->
        <div v-if="hostSpecification.nextIndex == 4">
          <div style="display:flex;padding: 20px 0;">
              <div class="next_wo">
                <p style="height: 32px;line-height: 32px;">主机名称</p>
                <p style="margin: 26px 0;height: 40px;line-height: 40px;">系统用户名</p>
                <p >登录方式</p>
                <p v-if="passwordList == 1" style="margin: 26px 0;height: 40px;line-height: 40px;">登录密码</p>
              </div>
              <div>
                <Input v-model="computerName" ></Input>
                <p style="color:#999999;margin: 10px 0 17px 0;">当购买数量大于1台之时，主机命名规则为主机名称加随机数字。</p>
                <p>{{systemUsername}}</p>
                <RadioGroup v-model="passwordList" style="margin-top: 40px">
                  <Radio label="1">
                    <span>密码设置</span>
                  </Radio>
                  <Radio label="2">
                    <span>系统密码</span>
                  </Radio>
                  <Radio label="3" style="display: none">
                    <span>保留镜像设置</span>
                  </Radio>
                </RadioGroup>
                <div style="margin: 30px 0 0 0;" v-if="passwordList == 1">
                  <Form ref="password" :model="password" :rules="passwordValidate">
                    <FormItem label="" prop="divPassWord">
                      <Input v-model="password.divPassWord" placeholder="请输入6-23位包含大小写与数字的密码"></Input>
                      <p style="color:#999999;margin-top: 10px">登录密码可用特殊字符为：',?</p>
                    </FormItem>
                  </Form>
                </div>
                <p style="color:#999999;margin-top: 10px" v-if="passwordList == 2">系统密码在主机创建成功之后将通过密码/邮箱与站内信发送给您</p>
              </div>
          </div>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <Button type="ghost" @click="upper" v-if="hostSpecification.nextIndex!=1" style="margin-right: 10px;">上一步</Button>
        <Button type="primary" @click="next" v-if="hostSpecification.nextIndex < 4">下一步</Button>
        <Button type="primary" @click="okSetting" v-else>完成设置</Button>
      </div>

      <!--新建镜像-->
      <Modal
        :scrollable="true"
        v-model="showModal.createMirror"
        @on-ok="ok">
        <div slot="header" class="modal-header-border">
          <span class="universal-modal-title">制作镜像</span>
        </div>
        <div class="universal-modal-content-flex">
          <Form :model="formItem" ref="formItem" :rules="ruleMirror" style="align-items:flex-end">
            <FormItem label="主机" prop="vmInfo">
              <Select v-model="formItem.vmInfo">
                <Option v-for="item in hostName" :value="`${item.rootdiskid}#${item.zoneid}`"
                        :key="item.computerid">
                  {{item.computername}}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
            <span style="color:#2A99F2;font-size:14px;padding-top:34px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('buy')">购买主机</span>
            </span>
            </FormItem>
            <FormItem label="镜像名称" prop="mirrorName">
              <Input v-model="formItem.mirrorName" type="textarea" placeholder="请输入" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="备注">
              <Input v-model="formItem.mirrorDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."></Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.createMirror = false">取消</Button>
          <Button type="primary" @click="checkFormItem">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import regExp from '../../util/regExp'
  const validaRegisteredName = regExp.validaRegisteredName
  const validConfigName = (rule,value,callback)=>{
    let reg =/^[0-9a-zA-z\u4E00-\u9FA5]{0,16}$/;
    if(value == ""){
      return callback(new Error('请输入配置名称'));
    }else if(!reg.test(value)){
      return callback(new Error('配置名称不符合规范'));
    }else {
      callback();
    }
  }

  const validLoginPassword = (rule,value,callback)=>{
    let reg = /^[0-9a-zA-z\u4E00-\u9FA5',?？]{6,23}$/;
    if(value == ''){
      return callback(new Error('请输入登录密码'));
    }else if(!reg.test(value)){
      return callback(new Error('登录密码格式不正确'));
    }else{
      callback();
    }
  }
  export default {
    data(){
      return{
        //新建镜像
        showModal:{
          createMirror:false
        },
        hostName: [],
        formItem: {
          vmInfo: '',
          mirrorName: '',
          mirrorDescription: ''
        },
        ruleMirror: {
          vmInfo: [
            {required: true, message: '请选择一台主机', trigger: 'change'}
          ],
          mirrorName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },

        //步骤条
        nextList:[
          {
            number:1,
            value:'选择机型',
            className:'next_pace_select',
            yuanName:'next_numbers',
            arrowName:'next_arrows'
          },
          {
            number:2,
            value:'选择镜像',
            className:'',
            yuanName:'next_number',
            arrowName:'next_arrow'
          },
          {
            number:3,
            value:'选择存储网络',
            className:'',
            yuanName:'next_number',
            arrowName:'next_arrow'
          },
          {
            number:4,
            value:'主机登录信息设置',
            className:'',
            yuanName:'next_number',
            arrowName:'next_arrow'
          }
        ],
        //配置名称
        config:{
          configName:''
        },
        configValidate: {
          configName: [
            {required:true,validator:validConfigName,trigger:'blur'}
          ]
        },
        //主机规格
        hostSpecification:{
          //CPU
          cpuList:[
            {
              CPU:'',
              List:[
              ],
            },
            {
              CPU:'',
              List:[
              ],
            },
            {
              CPU:'',
             List:[
              ],
            },
            {
              CPU:'',
              List:[
              ],
            },
            {
              CPU:'',
              List:[

              ],
            },
            {
              CPU:'',
              List:[]
            },
            {
              CPU:'',
              List:[
              ]
            }
          ],
          cpuIndex:0,
          //内存
          memoryList:[
            {
              memory:'1'
            },
            {
              memory:'2'
            },
            {
              memory:'4'
            },
            {
              memory:'8'
            }
          ],
          memoryIndex:0,
          //系统盘
          systemData:[
            {
              value:'SAS',
              label:'sas'
            },
            {
              value:'SSD',
              label:'ssd'
            }
          ],
          systemIndex:0,
          //下一步坐标
          nextIndex:1,
          money:0
        },
        //已选配置
        selectedList: {},

        //镜像
        mirror:[
          {
            value:'自定义镜像'
          },
          {
            value:'系统镜像'
          }
        ],
        mirrorIndex:0,
        mirrorName:'',
        mirrorList:[
        ],

        //系统镜像
        systemMirror:{
          publicList:[
            {
              system: 'Windows', systemList: [], selectSystem: ''
            },
            {
              system: 'Centos', systemList: [], selectSystem: ''
            },
            {
              system: 'Ubuntu', systemList: [], selectSystem: ''
            },
            {
              system: 'Debian', systemList: [], selectSystem: ''
            }
          ],
          system:{}
        },
        systemIndex:0,
        systemUsername:'',

        //数据盘类型
        dataDiskType:[
          {
            value:'SAS',
            label:'sas'
          },
          {
            value:'SSD',
            label:'ssd'
          }
        ],
        dataIndex:0,
        dataCheckout:false,

        //容量
        diskSize:20,
        single:false,

        //带宽
        bandWidth:1,
        //带宽和容量资费
        price:0,

        //登录密码
        passwordList:"1",
        password:{
          divPassWord:''
        },
        passwordValidate:{
          divPassWord:[
            {required:true,validator:validLoginPassword,trigger:'blur'}
          ]
        },
        //主机名称
        computerName:''
      }
    },
    created(){
      this.getTemplates();
      // this.getCapacityPrice();
      this.getZonesConfig();
      this.getPrivateMirror();
      this.closeHostList();
      setTimeout(()=>{
        this.getMoeny();
      },200)
    },
    methods:{
      //选择cpu，内存，系统盘
      cpuClick(name,val){
        if(name == 'cpu'){
          this.hostSpecification.cpuIndex = val;
          this.hostSpecification.memoryList = this.hostSpecification.cpuList[val].list;
          this.hostSpecification.memoryIndex = 0;
          this.getMoeny();
        }else if (name == 'memory') {
          this.hostSpecification.memoryIndex = val;
          this.getMoeny();
        }else if (name == 'system') {
          this.hostSpecification.systemIndex = val;
          this.getMoeny();
        }else if (name == 'mirror'){
          this.mirrorIndex = val;
        }else if (name == 'data'){
          this.dataIndex = val;
          this.getCapacityPrice();
        }
      },

      //下一步
      next(){
        if(this.hostSpecification.nextIndex == 3){
          if(this.mirrorIndex == 0){
            if(this.mirrorName == ''){
              this.$Modal.info({
                title:'提示',
                content:'请选择一个镜像'
              })
            }
          }else{
            if(this.systemMirror.publicList[this.systemIndex].selectSystem == ''){
              this.$Modal.info({
                title:'提示',
                content:'请选择一个镜像'
              })
            }
          }
        }
        let params ={
          hostFormat:this.hostSpecification.cpuList[this.hostSpecification.cpuIndex].CPU+'核'+this.hostSpecification.memoryList[this.hostSpecification.memoryIndex].memory+'G',
          name:this.config.configName,
          timeType:'实时计费',
          timeValue:'1',
          diskSize:this.diskSize,
          systemDiskType:this.hostSpecification.systemData[this.hostSpecification.systemIndex].value,
          zoneName:this.$store.state.zone.zonename,
          mirrorName:this.mirrorIndex == 0? this.mirrorName :this.systemMirror.publicList[this.systemIndex].selectSystem,
          dataDiskType:this.dataIndex == -1 ? '':this.dataDiskType[this.dataIndex].value,
          bandWidth:this.single == true ? this.bandWidth:'',
          publicIp:this.single == true ? '有' :'无',
          money:(this.hostSpecification.money+Number(this.price)).toFixed(2)
        }
        this.$refs.config.validate((vaild)=>{
          if(vaild){
            if(this.hostSpecification.nextIndex == 2){
              if(this.systemMirror.publicList[this.systemIndex].selectSystem == '' && this.mirrorName == ''){
                this.$Modal.info({
                  title: '信息',
                  content: '请选择一个镜像'
                });
              }else{
                if(this.hostSpecification.nextIndex<this.nextList.length){
                  let i =  this.hostSpecification.nextIndex++;
                  this.nextList[i].className ='next_pace_select';
                  this.nextList[i].yuanName = 'next_numbers';
                  this.nextList[i].arrowName = 'next_arrows';
                  this.selectedList = JSON.parse(JSON.stringify(params));
                }
              }
            }else{
              if(this.hostSpecification.nextIndex<this.nextList.length){
                let i =  this.hostSpecification.nextIndex++;
                this.nextList[i].className ='next_pace_select';
                this.nextList[i].yuanName = 'next_numbers';
                this.nextList[i].arrowName = 'next_arrows';
                this.selectedList = JSON.parse(JSON.stringify(params));
              }
            }
          }
        })
      },

      //上一步
      upper(){
        if(this.hostSpecification.nextIndex >1){
          let i =  --this.hostSpecification.nextIndex;
          this.nextList[i].className ='next_box';
          this.nextList[i].yuanName = 'next_number';
          this.nextList[i].arrowName = 'next_arrow';
        }
      },

      //获取金额
      getMoeny(){
       this.$http.post('device/QueryBillingPrice.do',{
          cpuNum:this.hostSpecification.cpuList[this.hostSpecification.cpuIndex].CPU,
          memory:this.hostSpecification.memoryList[this.hostSpecification.memoryIndex].memory,
          timeType:'current',
          timeValue:'1',
          diskType:this.hostSpecification.systemData[this.hostSpecification.systemIndex].label,
          diskSize:this.diskSize
        }).then(res => {
          if(res.data.cost){
            this.hostSpecification.money = res.data.cost;
          }else{
            this.hostSpecification.money = 0;
          }
        })
      },

      //系统镜像
      getTemplates(){
        this.$http.get('information/listTemplates.do',{
          params:{
            user:'0'
          }
        }).then(res =>{
          this.systemMirror.publicList[0].systemList = res.data.result.window;
          this.systemMirror.publicList[1].systemList = res.data.result.centos;
          this.systemMirror.publicList[2].systemList = res.data.result.ubuntu;
          this.systemMirror.publicList[3].systemList = res.data.result.debian;
          this.systemMirror.system = {};
        })
      },

      //镜像
      setOs(name){
        let arg = name.split('#');
        this.systemIndex = arg[2];
        for (var item of this.systemMirror.publicList) {
          item.selectSystem = '';
        }
        this.systemMirror.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        // 根据镜像名称第一个字符确定系统用户名是admin还是root
        let str = this.systemMirror.system.systemName.substr(0, 1);
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
        this.systemMirror.publicList[arg[2]].selectSystem = arg[0];
      },

      //获取资费
      getCapacityPrice(){
        let bindWidth = this.single ? this.$http.post('device/queryIpPrice.do',{timeType:'current',timeValue:'1',brand:this.bandWidth}):null;
        let params = {  cpuNum:'0',
          memory:'0',
          timeType:'current',
          timeValue:'1',
          diskType:this.dataDiskType[this.dataIndex].label,
          diskSize:this.diskSize.toString()}
        let capacity =this.dataCheckout ? this.$http.post('device/QueryBillingPrice.do',params):null;
        Promise.all([bindWidth,capacity]).then(res =>{
          if(this.single && this.dataCheckout){
             this.price = (res[0].data.cost + res[1].data.cost).toFixed(2);
          }else if(this.dataCheckout){
             this.price = res[1].data.cost;
          }else if(this.single){
             this.price = res[0].data.cost;
          }else{
             this.price = 0;
          }
        }).catch(error =>{
          console.log(error+'带宽容量资费');
        })
      },

      //获取cpu和内存
      getZonesConfig(){
        this.$http.get("information/getZonesConfig.do",{}).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.hostSpecification.cpuList = res.data.data;
            this.hostSpecification.memoryList = res.data.data[0].list;
          }
        });
     },

      //完成设置
      okSetting(){
        if(this.passwordList == '1'){
          this.$refs.password.validate((vaild)=>{
            if(vaild){
              this.$http.post('elasticScaling/newCreateElasticScalingRunConfig.do',{
                ElasticScalingName:this.selectedList.name,
                systemTemplateId:this.systemMirror.system.systemId,
                cpu:this.hostSpecification.cpuList[this.hostSpecification.cpuIndex].CPU,
                memory:this.hostSpecification.memoryList[this.hostSpecification.memoryIndex].memory.toString(),
                diskSize:this.dataCheckout ? this.diskSize : '',
                bandwidth:this.selectedList.bandWidth.toString(),
                computerName:this.computerName,
                loginPassword:this.password.divPassWord,
                billingtype:this.selectedList.money,
                diskType:this.dataCheckout ? this.dataDiskType[this.dataIndex].label : '',
                loginWay:this.passwordList,
                systemDiskType:this.hostSpecification.systemData[this.hostSpecification.systemIndex].label,
                systemUserName:this.systemUsername
              }).then(res => {
                if(res.status == 200 && res.data.status ==1){
                  this.$Message.success('启动配置创建成功');
                  this.$router.push({path:'elastic'});
                }else{
                  this.$Modal.confirm({
                    content:res.data.message
                  })
                  // this.$Message.info(res.data.message);
                }
              })
            }
          })
        }else {
          this.$http.post('elasticScaling/newCreateElasticScalingRunConfig.do',{
            ElasticScalingName:this.selectedList.name,
            systemTemplateId:this.systemMirror.system.systemId,
            cpu:this.hostSpecification.cpuList[this.hostSpecification.cpuIndex].CPU,
            memory:this.hostSpecification.memoryList[this.hostSpecification.memoryIndex].memory.toString(),
            diskSize:this.dataCheckout ? this.selectedList.diskSize : '',
            bandwidth:this.selectedList.bandWidth.toString(),
            computerName:this.computerName,
            loginPassword:this.password.divPassWord,
            billingtype:this.selectedList.money,
            diskType:this.dataCheckout ? this.dataDiskType[this.dataIndex].label : '',
            loginWay:this.passwordList,
            systemDiskType:this.hostSpecification.systemData[this.hostSpecification.systemIndex].label,
            systemUserName:this.systemUsername
          }).then(res => {
            if(res.status == 200 && res.data.status ==1){
              this.$Message.success('启动配置创建成功');
              this.$router.push({path:'elastic'});
            }else{
              this.$Modal.confirm({
                content:"启动创建配置失败,您可以联系客服，或重试"
              })
            }
          })
        }
      },

      //获取私有镜像
      getPrivateMirror(){
        this.$http.get('information/listTemplates.do',{
            params:{
              user:'1',
            }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
           this.mirrorList = res.data.result.window.concat(res.data.result.centos, res.data.result.debian, res.data.result.ubuntu);
          }
        })
      },

      //新建镜像
      checkFormItem(){
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用制作镜像的方法
            this.ok()
          }
        })
      },
      ok() {
        this.showModal.createMirror = false
        this.$http.get('Snapshot/createTemplate.do',{
          params: {
            rootDiskId: this.formItem.vmInfo.split('#')[0],
            templateName: this.formItem.mirrorName,
            descript: this.formItem.mirrorDescription
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.getPrivateMirror();
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 查询已关闭主机
      closeHostList() {
        var vmcloselist = []
        this.hostName = []
        this.$http.get(`information/listVirtualMachines.do`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.close) {
                vmcloselist = response.data.result.close.list
              }
              this.hostName = vmcloselist
            }
          })
      },
    },
    mounted(){
    },
    watch:{
      diskSize:function(){
          this.getCapacityPrice();
      },
      bandWidth:function(){
        this.getCapacityPrice();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .ela_head{
    .head_right{
      display: inline-block;
      .back{
        width: 52px;
        height: 25px;
        position: relative;
        line-height: 25px;
        display: inline-block;
        cursor: pointer;
        .back_icon{
          border-top: 1px solid #2A99F2;
          border-left: 1px solid #2A99F2;
          width: 9px;
          height:9px;
          display: inline-block;
          transform: rotate(-45deg);
        }
        >span{
          font-size: 14px;
          color: #2A99F2;
        }
      }
      .back::after{
        content: '';
        width: 1px;
        height: 25px;
        position: absolute;
        right: 0px;
        background: #D8D8D8;
      }
      >span{
        margin-left: 10px;
        vertical-align: middle;
        font-size: 18px;
        color: #111111;
      }
    }
  }
  /*下一步*/
  .next_pace{
    box-shadow: 0px 2px 3px 0px RGBA(0, 0, 0, 0.35);
    height: 49px;
    padding: 0 65px;
    line-height: 49px;
    display: flex;
    font-family: 'Microsoft YaHei';
    .next_pace_select{
      color: #2A99F2;
      .next_numbers{
        border:1px solid #2A99F2;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        line-height: 14px;
        font-family: "Microsoft YaHei";
      }
    }
    .next_box{
      width: 33%;
      position: relative;
      .next_number{
        border: 1px solid #666666;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        line-height: 14px;
        font-family: "Microsoft YaHei";
      }
      .next_arrow{
        position: relative;
        left: 27%;
        top: 20px;
        i{
          height: 1px;
          width: 14px;
          background: #666666;
          position:absolute;
          top:-0.71973rem;
          left: -4px;
        }
      }
      .next_arrow::after{
        content:'';
        width:10px;
        height: 10px;
        transform: rotate(45deg);
        border-top: 1px solid #666666;
        border-right: 1px solid #666666;
        position: absolute;
      }
      .next_arrows{
          position: relative;
          left: 27%;
          top: 20px;
          i{
            height: 1px;
            width: 14px;
            background: #2A99F2;
            position:absolute;
            top:-0.71973rem;
            left: -4px;
          }
        }
      .next_arrows::after{
        content:'';
        width:10px;
        height: 10px;
        transform: rotate(45deg);
        border-top: 1px solid #2A99F2;
        border-right: 1px solid #2A99F2;
        position: absolute;
      }
    }
  }

  .cpu_list{
    display: flex;
    height: 32px;
    ul{
    width: 90%;
    }
    span{
      margin-right: 28px;
      vertical-align: middle;
      display: inline-block;
      line-height: 32px;
      color: #333333;
    }
  }
  .nav_item{
    border: 1px solid #2A99F2;
    padding: 6px 22px;
    display: inline-block;
    color: #2A99F2;
    cursor: pointer;
    margin-right: 2%;
  }
  .nav_item_click{
    background: #2A99F2;
    color: #FFFFFF;
  }
  /*第二步*/
  .selected{
    display: flex;
    padding: 0 0 20px 0;
    border-bottom: 1px solid #D8D8D8;
    font-family: 'MicrosoftYaHei';
    .next_two{
      font-size: 14px;
      p{
        margin-bottom: 10px;
      }
    }
  }
  .next_wo{
    font-size: 14px;
    width: 90px;
    p{
      margin-bottom: 10px;
    }
  }
  .mirror{
    border: 1px solid #2A99F2;
    color: #2A99F2;
    width: 184px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    margin-right: 20px;
  }
  .mirror:hover{
    background: #2A99F2;
    color: #FFFFFF;
  }
</style>
