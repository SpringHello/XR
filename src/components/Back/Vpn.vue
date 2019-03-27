<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>虚拟专网VPN</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-xunizhuanwangVPN"></use>
          </svg>
          <span id="title">VPN</span>
          <button id="refresh_button" @click="$router.go(0)" >刷新</button>
        </div>
        <div class="universal-alert">
          <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
        </div>

        <Tabs type="card" :animated="false" v-model="paneStatus.vpn">
          <TabPane label="VPN连接" name="VPN">
            <div class="operator-bar">
              <!-- <Button type="primary" @click="newTunnelVpn">创建VPN连接old</Button> -->
              <!--<Button type="primary">重启隧道</Button>-->
              <Button type="primary" @click="newTunnelVpnlink">创建VPN连接</Button>
              <Button type="primary" @click="delTunnelVpn">删除VPN连接</Button>
              <Button type="primary" @click="restartVpn">重启VPN连接</Button>
              <Table :columns="tunnelVpnColumns" :data="tunnelVpnData" @radio-change="tunnelRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
          <TabPane label="VPN本地网关" name="localGateway">
            <div class="operator-bar">
              <Button type="primary" @click="newTunnelVpn1">创建VPN本地网关</Button>
              <Table :columns="localGatewayColumns" :data="localGatewayData" @radio-change="localGatewayRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
          <TabPane label="VPN客户网关" name="customerGateway">
						 <Button type="primary" @click="opencustomerModal_open('new')">创建VPN客户网关</Button>
						 <Table :columns="VpnClientColumns" :data="VpnClientGaData" @radio-change="VpnClientRadio"
						        style="margin-top:10px;"></Table>
          </TabPane>
          <TabPane label="VPN拨入" name="remote">
            <div class="operator-bar">
              <Button type="primary" @click="newRemoteAccess">创建VPN接入点</Button>
              <Button type="primary" @click="delRemoteAccess">挂断VPN接入</Button>
              <Table :columns="remoteVpnColumns" :data="remoteVpnData" @radio-change="remoteRadio"
                     style="margin-top:20px;"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 新建vpn接入点 modal -->
    <Modal v-model="showModal.newRemoteAccess" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新增VPN接入点</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newRemoteAccessForm" :rules="newRemoteAccessFormValidate" ref="newRemoteAccessFormValidate">
          <FormItem label="接入点名称" prop="vpnName">
            <Input v-model="newRemoteAccessForm.vpnName" placeholder="请输入接入点名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpcId">
            <Select v-model="newRemoteAccessForm.vpcId" @on-change="isHaveNat">
              <Option v-for="item in newRemoteAccessForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="newRemoteAccessForm.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="newRemoteAccessForm.password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="newRemoteAccessOk">完成配置</Button>
      </div>
    </Modal>
    <!-- 新建vpn隧道 modal -->
    <Modal v-model="showModal.newTunnelVpn" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建隧道</span>
      </p>
      <Steps :current="newTunnelVpnForm.step" size="small">
        <Step title="创建本地网关"></Step>
        <Step title="创建客户网关"></Step>
        <Step title="创建连接"></Step>
      </Steps>
      <div class="universal-modal-content-flex">
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate0">
          <FormItem label="源VPC" prop="vpcId1" v-show="newTunnelVpnForm.step==0">
            <Select v-model="newTunnelVpnForm.vpcId1">
              <Option v-for="item in newTunnelVpnForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=newTunnelVpnForm.vpcId2">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <Form :model="newTunnelVpnForm" v-if="newTunnelVpnForm.step==1" :rules="newTunnelVpnFormValidate"
              ref="newTunnelVpnFormValidate1">
          <FormItem label="名称" prop="name1">
            <Input v-model="newTunnelVpnForm.name1" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <FormItem label="对端源IP地址" prop="IP">
            <Input v-model="newTunnelVpnForm.IP" placeholder="例如10.132.31.27"></Input>
          </FormItem>
          <FormItem label="对端网络CIDR" prop="CIDR">
            <Input v-model="newTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16"></Input>
          </FormItem>
          <FormItem label="预共享密钥" prop="key">
            <Input v-model="newTunnelVpnForm.key" placeholder="请输入0-128字节密码"></Input>
          </FormItem>
        </Form>
        <p v-if="newTunnelVpnForm.step==1" style="opacity: 0.8;text-align: right;">本端的共享密钥必须和对端的共享密钥一致</p>
        <span style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="newTunnelVpnForm.showDetail=true"
              v-show="!newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            高级选项&nbsp;
          </span>
        <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="newTunnelVpnForm.showDetail=false"
              v-show="newTunnelVpnForm.showDetail&&newTunnelVpnForm.step==1">
            隐藏高级选项
          </span>

        <!--高级选项FormItem-->
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="IKE加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKE">
              <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP加密算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESP">
              <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKEHash">
              <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP哈希算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.ESPHash">
              <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE DH算法" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.IKEDH">
              <Option v-for="item in newTunnelVpnForm.IKEDHoptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="完全正向保密" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <Select v-model="newTunnelVpnForm.secret">
              <Option v-for="item in newTunnelVpnForm.secretOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <InputNumber v-model="newTunnelVpnForm.ikelifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="ESP使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">
            <InputNumber v-model="newTunnelVpnForm.esplifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">

            <Checkbox v-model="newTunnelVpnForm.checkGroup1">失效对等检测</Checkbox>

          </FormItem>
          <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.step==1&&newTunnelVpnForm.showDetail">

            <Checkbox v-model="newTunnelVpnForm.checkGroup2">Force UDP</Checkbox>

          </FormItem>

        </Form>

        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
          <FormItem label="连接方式" v-if="newTunnelVpnForm.step==2" prop="password">
            <Select v-model="newTunnelVpnForm.connType">
              <Option v-for="item in newTunnelVpnForm.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <Poptip trigger="hover" style="float: right;position: relative;right: 250px;top: 40px;"
                  v-if="newTunnelVpnForm.step==2">
            <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
            <div slot="content">
              <div>
                <p style="line-height: 20px;">注意在选择连接方式的时候:</p>
                <p style="line-height: 18px;">本端连接方式选择的是主动,对端的连接方式必须是被动。</p>
                <p style="line-height: 18px;">本端连接方式选择的是被动,对端的连接方式必须是主动。</p>
              </div>
            </div>
          </Poptip>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.newTunnelVpn = false" v-if="newTunnelVpnForm.step==0">取消</Button>
        <Button @click="newTunnelVpnForm.step--" v-if="newTunnelVpnForm.step!=0">上一步</Button>
        <Button type="primary" @click="nextStep" v-if="newTunnelVpnForm.step!=2">下一步</Button>
        <Button type="primary" @click="newTunnelVpnOk" v-if="newTunnelVpnForm.step==2">完成</Button>
      </div>
    </Modal>
		
		<Modal v-model="showModal.newTunnelVpntwo" width="500" :scrollable="true">
		  <p slot="header" class="modal-header-border">
		    <span class="universal-modal-title">创建隧道</span>
		  </p>
		  <div class="universal-modal-content-flex" id="moli5">
		    <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate"
		          ref="newTunnelVpnFormValidate1" style="width: 100%">
		      <FormItem label="客户网关名称" prop="name1">
		        <Input v-model="newTunnelVpnForm.name1" placeholder="请输入0-16字节名称" style="width:300px;float: right;"></Input>
		      </FormItem>
		      <FormItem label="对端源IP地址" prop="IP" style="margin-top: 20px;">
		        <Input v-model="newTunnelVpnForm.IP" placeholder="例如10.132.31.27" style="width:300px;float: right;"></Input>
		      </FormItem>
		      <FormItem label="对端网络CIDR" prop="CIDR" style="margin-top: 20px;">
		        <Input v-model="newTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16" style="width:300px;float: right;"></Input>
		      </FormItem>
		      <FormItem label="预共享密钥" prop="key" style="margin-top: 20px;">
		        <Input v-model="newTunnelVpnForm.key" placeholder="请输入0-128字节密码" style="width:300px;float: right;"></Input>
		      </FormItem>
		    </Form>
		    <p style="opacity: 0.8;text-align: left;margin-top: 20px; color:rgba(255,152,1,1);margin-left: 115px;">本端的共享密钥必须和对端的共享密钥一致</p>
				<div class="clock-show icon" @click=""
				     :class="{rotateup:newTunnelVpnForm.showDetail}" style=""></div>
		    <span style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;margin-left: 115px;"
		          @click="newTunnelVpnForm.showDetail=true"
		          v-show="!newTunnelVpnForm.showDetail">
		        展开高级选项&nbsp;
		      </span>
		    <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer;margin-top: 10px;margin-left: 115px;"
		          @click="newTunnelVpnForm.showDetail=false"
		          v-show="newTunnelVpnForm.showDetail">
		        隐藏高级选项
		      </span>
					<div class="divbox" v-show="newTunnelVpnForm.showDetail">
						与对端网关的IKE加密算法、IKE哈希算法、ESP加密算法、ESP哈希算法保持一致
					</div>
		
		    <!--高级选项FormItem-->
		    <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate">
		      <FormItem label="IKE加密算法" prop="vpcId" v-show="newTunnelVpnForm.showDetail">
		        <Select v-model="newTunnelVpnForm.IKE" style="width:300px;float: right;">
		          <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
					<FormItem label="IKE哈希算法" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 10px;">
					  <Select v-model="newTunnelVpnForm.IKEHash" style="width:300px;float: right;">
					    <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
					      {{item.label}}
					    </Option>
					  </Select>
					</FormItem>
		      <FormItem label="ESP加密算法" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 10px;">
		        <Select v-model="newTunnelVpnForm.ESP" style="width:300px;float: right;">
		          <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="ESP哈希算法" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 10px;">
		        <Select v-model="newTunnelVpnForm.ESPHash" style="width:300px;float: right;">
		          <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="IKE DH算法" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 10px;">
		        <Select v-model="newTunnelVpnForm.IKEDH" style="width:300px;float: right;">
		          <Option v-for="item in newTunnelVpnForm.IKEDHoptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="完全正向保密" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 10px;">
		        <Select v-model="newTunnelVpnForm.secret" style="width:300px;float: right;">
		          <Option v-for="item in newTunnelVpnForm.secretOptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="IKE使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: 3px;">
		        <InputNumber v-model="newTunnelVpnForm.ikelifetime" :min="-1" style="width:300px;float: right;margin-top: 7px;" :precision="0"></InputNumber>
		      </FormItem>
		      <FormItem label="ESP使用期限第二阶段" prop="vpcId" v-show="newTunnelVpnForm.showDetail" style="margin-top: -3px;">
		        <InputNumber v-model="newTunnelVpnForm.esplifetime" :min="-1" style="width:300px;float: right;margin-top: 7px;" :precision="0"></InputNumber>
		      </FormItem>
		      <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.showDetail" id="firstff">
		
		        <Checkbox v-model="newTunnelVpnForm.checkGroup1">失效对等检测</Checkbox>
		
		      </FormItem>
		      <FormItem label="" prop="vpcId" v-show="newTunnelVpnForm.showDetail" id="twoff">
		
		        <Checkbox v-model="newTunnelVpnForm.checkGroup2">Force UDP</Checkbox>
		
		      </FormItem>
		
		    </Form>
		  </div>
		  <div slot="footer" class="modal-footer-border">
		    <Button @click="showModal.newTunnelVpntwo = false">取消</Button>
		    <Button type="primary" @click="testOk">确定创建</Button>
		  </div>
		</Modal>
    <!--vpn修改配置-->
    <Modal v-model="showModal.FixVPN" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改配置</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="modifyTunnelVpnForm" :rules="newTunnelVpnFormValidate" ref="newTunnelVpnFormValidate1">
          <FormItem label="名称" prop="name1">
            <Input v-model="modifyTunnelVpnForm.name1" placeholder="请输入0-16字节名称"></Input>
          </FormItem>
          <FormItem label="对端源IP地址" prop="IP">
            <Input v-model="modifyTunnelVpnForm.IP" placeholder="例如10.132.31.27"></Input>
          </FormItem>
          <FormItem label="对端网络CIDR" prop="CIDR">
            <Input v-model="modifyTunnelVpnForm.CIDR" placeholder="例如192.168.0.0/16"></Input>
          </FormItem>
          <FormItem label="预共享密钥" prop="key">
            <Input v-model="modifyTunnelVpnForm.key" placeholder="请输入0-128字节密码"></Input>
          </FormItem>
        </Form>
        <p style="opacity: 0.8;text-align: right;">本端的共享密钥必须和对端的共享密钥一致</p>
        <span style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="modifyTunnelVpnForm.showDetail=true"
              v-show="!modifyTunnelVpnForm.showDetail">
            高级选项&nbsp;
          </span>
        <span style="display: inline-block;margin-bottom: 10px;color:#2A99F2;cursor:pointer;margin-top: 10px;"
              @click="modifyTunnelVpnForm.showDetail=false"
              v-show="modifyTunnelVpnForm.showDetail">
            隐藏高级选项
          </span>

        <!--高级选项FormItem-->
        <Form :model="modifyTunnelVpnForm" :rules="newTunnelVpnFormValidate">
          <FormItem label="IKE加密算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKE">
              <Option v-for="item in newTunnelVpnForm.IKEOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP加密算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.ESP">
              <Option v-for="item in newTunnelVpnForm.ESPOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE哈希算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKEHash">
              <Option v-for="item in newTunnelVpnForm.IKEHashOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ESP哈希算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.ESPHash">
              <Option v-for="item in newTunnelVpnForm.ESPHashOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE DH算法" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.IKEDH">
              <Option v-for="item in newTunnelVpnForm.IKEDHoptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="完全正向保密" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <Select v-model="modifyTunnelVpnForm.secret">
              <Option v-for="item in newTunnelVpnForm.secretOptions" :value="item.key" :key="item.label">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="IKE使用期限第二阶段" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <InputNumber v-model="modifyTunnelVpnForm.ikelifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="ESP使用期限第二阶段" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">
            <InputNumber v-model="modifyTunnelVpnForm.esplifetime" :min="-1" style="width: 230px;" :precision="0"></InputNumber>
          </FormItem>
          <FormItem label="" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">

            <Checkbox v-model="modifyTunnelVpnForm.checkGroup1">失效对等检测</Checkbox>

          </FormItem>
          <FormItem label="" prop="vpcId" v-show="modifyTunnelVpnForm.showDetail">

            <Checkbox v-model="modifyTunnelVpnForm.checkGroup2">Force UDP</Checkbox>

          </FormItem>

        </Form>

      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.FixVPN = false">取消</Button>
        <Button type="primary" @click="fixConfig">完成</Button>
      </div>
    </Modal>
    <!--修改连接方式-->
    <Modal v-model="showModal.FixVPNContent" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改连接方式</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newTunnelVpnForm" :rules="newTunnelVpnFormValidate">
          <FormItem label="连接方式" prop="password">
            <Select v-model="modifyForm.connectType">
              <Option v-for="item in newTunnelVpnForm.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <Poptip trigger="hover" style="float: right;position: relative;right: 250px;top: 40px;">
            <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
            <div slot="content">
              <div>
                <p style="line-height: 20px;">注意在选择连接方式的时候:</p>
                <p style="line-height: 18px;">本端连接方式选择的是主动,对端的连接方式必须是被动。</p>
                <p style="line-height: 18px;">本端连接方式选择的是被动,对端的连接方式必须是主动。</p>
              </div>
            </div>
          </Poptip>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.FixVPNContent = false">取消</Button>
        <Button type="primary" @click="modifyConnection">确认</Button>
      </div>
    </Modal>
    <!-- 接入点用户管理 modal -->
    <Modal v-model="showModal.userManage" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">接入点用户管理</span>
      </p>
      <div>
        <p style="color: rgba(17,17,17,0.65);margin-bottom: 20px">您在对接入点进行用户管理</p>
        <div>
          <p v-for="(item,index) in userList" :key="item"
             style="display: flex;font-size: 12px;color: rgba(17,17,17,0.65);margin-bottom: 20px">
            <span style="width:60%">{{item.name||item}}</span>
            <span style="width:30%">用户密码：**********</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==1">创建中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-if="item.status==2">删除中</span>
            <span style="color:#2A99F2;width:10%;text-align:right;cursor: pointer" v-else
                  @click="delUser(item,index)">删除</span>
          </p>
        </div>
        <div class="universal-modal-content-flex">
          <Form :model="addUserForm" :rules="addUserFormValidate" ref="addUserFormValidate">
            <FormItem label="用户名称" prop="userName">
              <Input v-model="addUserForm.userName" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="addUserForm.password" placeholder="请输入密码"></Input>
            </FormItem>
          </Form>
          <div style="clear: both"></div>
        </div>
        <p style="color:#999999">提示：若您忘记用户密码，可删除该账户并重新添加新的用户名与密码。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="addUser">确定添加</Button>
      </div>
    </Modal>
    <!-- 只有一个vpc时创建互联-->
    <Modal v-model="showModal.notHaveNAT" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">VPC不存在NAT网关或者NAT网关没有绑定公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.notHaveNAT = false">取消</Button>
        <Button type="primary" @click="createNAT">创建NAT网关</Button>
      </p>
    </Modal>
    <!-- 2.1改版弹窗 -->
    <!-- 新建VPN本地网关-->
    <Modal v-model="showModal.newLocalGateway" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建VPN本地网关</span>
      </p>
      <div class="universal-modal-label-14px">
        <Form :model="formValidateLocalGateway" :rules="ruleValidateLocalGateway" ref="formValidateLocalGateway" :label-width="110" style="width:410px;" label-position="left">
          <FormItem label="本地网关名称" prop="name"> 
            <Input v-model="formValidateLocalGateway.name" placeholder="请输入10个字符以内的名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpcId">
            <Select v-model="formValidateLocalGateway.vpcId">
              <Option v-for="item in formValidateLocalGateway.vpcIdOptions" :value="item.vpcid" :key="item.vpcid">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="本地网络CIDR">
            <span style="font-size:14px;color:#FF9801">{{formValidateLocalGateway.cidr}}</span>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="default" @click="showModal.newLocalGateway = false">取消</Button>
        <Button type="primary" @click="newLocalGatewayOk('formValidateLocalGateway')">确认创建</Button>
      </div>
    </Modal>
    <!-- 新建VPN客户网关-->
    <Modal v-model="showModal.newTunnelVpntwo" width="500" :scrollable="true">
		  <p slot="header" class="modal-header-border">
		    <span class="universal-modal-title">创建VPN客户网关</span>
		  </p>
		  <div class="universal-modal-label-14px">
		    <Form :model="formCustomerGateway" :rules="newTunnelVpnFormValidate"
		          ref="formCustomerGateway" :label-width="120" style="width:420px;" label-position="left">
		      <FormItem label="客户网关名称" prop="name1">
		        <Input v-model="formCustomerGateway.name1" placeholder="请输入0-16字节名称" ></Input>
		      </FormItem>
		      <FormItem label="目的IP地址" prop="IP">
            <!-- v-on:input="funInput(formCustomerGateway.IP1,'formCustomerGateway.IP1')" title="请输入0-255内数字" -->
		        <Input v-model="formCustomerGateway.IP1" value="formCustomerGateway.IP1"  style="width:64px" ></Input> .
            <Input v-model="formCustomerGateway.IP2"  style="width:64px"></Input> .
            <Input v-model="formCustomerGateway.IP3"  style="width:64px"></Input> .
            <Input v-model="formCustomerGateway.IP4"  style="width:64px"></Input>
		      </FormItem>
		      <FormItem label="目的网络CIDR" prop="CIDR">
		        <Input v-model="formCustomerGateway.CIDR1"  style="width:50px"></Input> .
            <Input v-model="formCustomerGateway.CIDR2"  style="width:50px"></Input> .
            <Input v-model="formCustomerGateway.CIDR3"  style="width:50px"></Input> .
            <Input v-model="formCustomerGateway.CIDR4"  style="width:50px"></Input> /
            <Input v-model="formCustomerGateway.CIDR5"  style="width:50px"></Input>
		      </FormItem>
          <p style="opacity: 0.8;text-align: left;margin-top: 20px; color:rgba(255,152,1,1);margin-left: 115px;line-height:20px;margin-bottom:10px">提示：目的网络CIDR与本地网络CIDR号码不能相同，否则会造成目的网络CIDR创建失败</p>
		      <FormItem label="预共享密钥" prop="key" >
		        <Input v-model="formCustomerGateway.key" placeholder="请输入0-128字节密码" ></Input>
		      </FormItem>
          <p style="opacity: 0.8;text-align: left;margin-top: 20px; color:rgba(255,152,1,1);margin-left: 115px;">提示：本端的共享秘钥必须和对端的共享秘钥一致</p>
		    
		    <!-- <p style="opacity: 0.8;text-align: left;margin-top: 20px; color:rgba(255,152,1,1);margin-left: 115px;">本端的共享密钥必须和对端的共享密钥一致</p> -->
        <div @click="showDetailIcon=!showDetailIcon" style="display: inline-block;color:#2A99F2;cursor:pointer;margin-top: 10px;margin-left: 105px;">
          <i class="clock-show icon" :class="{rotateup:showDetailIcon}" style="display:inline-block;vertical-align: text-top;margin-right:2px;"></i>
          <span>
		        {{showDetailIcon?'隐藏':'展开'}}高级选项&nbsp;
          </span>
        </div>
        <div class="hint" v-show="showDetailIcon">
          与对端网关的IKE加密算法、IKE哈希算法、ESP加密算法、ESP哈希算法保持一致
        </div>
		    <!--高级选项FormItem-->
		    <div v-show="showDetailIcon">
		      <FormItem label="IKE加密算法">
		        <Select v-model="formCustomerGateway.IKE" >
		          <Option v-for="item in formCustomerGateway.IKEOptions" :value="item.key" :key="item.key">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
					<FormItem label="IKE哈希算法">
					  <Select v-model="formCustomerGateway.IKEHash" >
					    <Option v-for="item in formCustomerGateway.IKEHashOptions" :value="item.key" :key="item.key">
					      {{item.label}}
					    </Option>
					  </Select>
					</FormItem>
		      <FormItem label="ESP加密算法">
		        <Select v-model="formCustomerGateway.ESP" >
		          <Option v-for="item in formCustomerGateway.ESPOptions" :value="item.key" :key="item.key">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="ESP哈希算法">
		        <Select v-model="formCustomerGateway.ESPHash" >
		          <Option v-for="item in formCustomerGateway.ESPHashOptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="IKE DH算法">
		        <Select v-model="formCustomerGateway.IKEDH" >
		          <Option v-for="item in formCustomerGateway.IKEDHoptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="完全正向保密">
		        <Select v-model="formCustomerGateway.secret" >
		          <Option v-for="item in formCustomerGateway.secretOptions" :value="item.key" :key="item.label">
		            {{item.label}}
		          </Option>
		        </Select>
		      </FormItem>
		      <FormItem label="IKE使用期限第二阶段">
		        <InputNumber v-model="formCustomerGateway.ikelifetime" :min="-1" style="width: 300px;" :precision="0"></InputNumber>
		      </FormItem>
		      <FormItem label="ESP使用期限第二阶段">
		        <InputNumber v-model="formCustomerGateway.esplifetime" :min="-1" style="width: 300px;" :precision="0"></InputNumber>
		      </FormItem>
          <Checkbox v-model="formCustomerGateway.checkGroup1">失效对等检测</Checkbox>
          <Checkbox v-model="formCustomerGateway.checkGroup2">Force UDP</Checkbox>
          </div>
          </Form>
		    </div>
		  <div slot="footer" class="modal-footer-border">
		    <Button @click="showModal.newTunnelVpntwo = false">取消</Button>
		    <Button type="primary" @click="testOk('formCustomerGateway', customerModalType)">确定{{customerModalType=='new'?'创建':'修改'}}</Button>
		  </div>
		</Modal>
    <!-- 新建VPN连接-->
    <Modal v-model="showModal.vpnLink" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建隧道</span>
      </p>
      <div class="universal-modal-label-14px">
        <Form :model="formValidateVpnLink" :rules="ruleValidateVpnLink" ref="formValidateVpnLink" :label-width="80" style="width:380px;" label-position="left">
          <FormItem label="隧道名称" prop="name"> 
            <Input v-model="formValidateVpnLink.name" placeholder="请输入10个字符以内的名称"></Input>
          </FormItem>
          <FormItem label="本地网关" prop="localGateway">
            <Select v-model="formValidateVpnLink.localGateway">
              <Option v-for="item in localGatewayData" :value="item.sourcenatipid" :key="item.sourcenatipid">
                {{item.localgatewayname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="客户网关" prop="customerGateway">
            <Select v-model="formValidateVpnLink.customerGateway">
              <Option v-for="item in VpnClientGaData" :value="item.customergatewayid" :key="item.customergatewayid">
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="方式" prop="way">
            <Select v-model="formValidateVpnLink.way">
              <Option v-for="item in formValidateVpnLink.connTypeOptions" :value="item.key" :key="item.key">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="default" @click="showModal.vpnLink = false">取消</Button>
        <Button type="primary" @click="vpnLinkOk('formValidateVpnLink')">确认创建</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  import {mapState} from 'vuex'

  export default {
    beforeRouteEnter(from, to, next) {
      // 远程接入列表
      var remote = axios.get('network/listRemoteVpn.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      
      // 隧道VPN
      var customer = axios.get('network/listVpnConnections.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      })
			// VPN客户网关
			var coustomerGateway = axios.get('network/listCustomergateway.do', {
			    params: {
			      zoneId: $store.state.zone.zoneid,
			    }
      })
      // VPN本地网关
      var localGateway = axios.get('network/listLocalGateway.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      })
      Promise.all([remote, customer,coustomerGateway,localGateway]).then(values => {
        next(vm => {
          vm.initRemoteData(values[0])
          vm.initCustomerData(values[1])
          vm.initClientData(values[2])
          vm.initLocalGateway(values[3])
        })
      })
    },
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      function regNumberCF(val) {
         return /^\d{1,}$/.test(val) && val>=0 && val<=255
        }
      const validateIp = (rule, value, callback) => {
        if (this.formCustomerGateway.IP1=='' || this.formCustomerGateway.IP2=='' || this.formCustomerGateway.IP3=='' || this.formCustomerGateway.IP4 == '') {
          callback('请输入目的IP地址')
        } else if (regNumberCF(this.formCustomerGateway.IP1)&&regNumberCF(this.formCustomerGateway.IP2)&&regNumberCF(this.formCustomerGateway.IP3)&&regNumberCF(this.formCustomerGateway.IP4)){
          callback()
        } else {
          callback('请输入0-255内数字')
        }
      }
      const validateCidr = (rule, value, callback) => {
        if (this.formCustomerGateway.CIDR1=='' || this.formCustomerGateway.CIDR2=='' || this.formCustomerGateway.CIDR3=='' || this.formCustomerGateway.CIDR4 == '' || this.formCustomerGateway.CIDR5 == ''){
          callback('请输入目的网络CIDR')
        } else if(regNumberCF(this.formCustomerGateway.CIDR1)&&regNumberCF(this.formCustomerGateway.CIDR2)&&regNumberCF(this.formCustomerGateway.CIDR3)&&regNumberCF(this.formCustomerGateway.CIDR4)&&regNumberCF(this.formCustomerGateway.CIDR5)){
          callback()
        } else {
          callback('请输入0-255内数字')
        }
      }
      // 校验接入点用户名
      const validateUserName = (rule, value, callback) => {
        if (!/^\w{1,6}$/.test(value)) {
          callback(new Error('用户名由1-6位字母或数字组成'))
        }
        callback()
      }
      const validalength = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        }
        if (value.length > 8) {
          callback(new Error('长度小于等于8位'))
        } else {
          callback()
        }
      }
      return {
        customergatewayId: '',
        customerModalType: 'new',
        showDetailIcon: false,
        $store,
        loadingMessage: '',
        loading: false,
        showModal: {
          vpnLink: false,
          newLocalGateway: false,
          // 远程VPN
          newRemoteAccess: false,
          // 隧道VPN
          newTunnelVpn: false,
          // vpn 修改
          FixVPN: false,
          FixVPN1: false,
          FixVPNContent: false,
          // 接入点用户管理
          userManage: false,
          notHaveNAT: false,
					newTunnelVpntwo:false
        },
        // 新建vpc接入点表单
        newRemoteAccessForm: {
          userName: '',
          password: '',
          vpcId: '',
          vpcIdOptions: [],
          vpnName: ''
        },
        newRemoteAccessFormValidate: {
          userName: [
            {required: true, validator: validalength, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          vpcId: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpnName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
        },
        formCustomerGateway: {
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP1: '',
          IP2: '',
          IP3: '',
          IP4: '',
          gateway: '',
          CIDR1: '',
          CIDR2: '',
          CIDR3: '',
          CIDR4: '',
          CIDR5: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          IKEDH: 'modp1536',
          IKEDHoptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          secret: 'modp1536',
          secretOptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          ikelifetime: 86400,
          esplifetime: 3600,
          checkGroup1: true,
          checkGroup2: true,
          showDetail: false,
          step: 0
        },
        // 新建隧道VPN表单
        newTunnelVpnForm: {
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP: '',
          gateway: '',
          CIDR: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          IKEDH: 'modp1536',
          IKEDHoptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          secret: 'modp1536',
          secretOptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          ikelifetime: 86400,
          esplifetime: 3600,
          checkGroup1: true,
          checkGroup2: true,
          showDetail: false,
          step: 0
        },
        modifyTunnelVpnForm: {
          customerVPNid: '',
          // 源VPC
          vpcId1: '',
          // 目标VPC
          vpcId2: '',
          vpcIdOptions: '',
          // 源VPC对应名称
          name1: '',
          // 目标VPC对应名称
          name2: '',
          IP: '',
          gateway: '',
          CIDR: '',
          key: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
          IKE: '3des',
          IKEOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          IKEHash: 'md5',
          IKEHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          ESP: '3des',
          ESPOptions: [
            {label: '3des', key: '3des'},
            {label: 'aes128', key: 'aes128'},
            {label: 'aes192', key: 'aes192'},
            {label: 'aes256', key: 'aes256'}
          ],
          ESPHash: 'md5',
          ESPHashOptions: [
            {label: 'md5', key: 'md5'},
            {label: 'sha1', key: 'sha1'}
          ],
          IKEDH: 'modp1536',
          IKEDHoptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          secret: 'modp1536',
          secretOptions: [
            {label: 'modp1024', key: 'modp1024'},
            {label: 'modp1536', key: 'modp1536'}
          ],
          ikelifetime: 86400,
          esplifetime: 3600,
          checkGroup1: true,
          checkGroup2: true,
          showDetail: false,
        },
        newTunnelVpnFormValidate: {
          vpcId1: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpcId2: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          name1: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          name2: [
            {required: true, message: '请输入隧道名称', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '请输入预共享密钥', trigger: 'blur'}
          ],
          IP: [
            {required: true, validator: validateIp, trigger: 'blur'}
          ],
          CIDR: [
            {required: true, validator: validateCidr, trigger: 'blur'}
          ],
        },
        formValidateLocalGateway: {
          name: '',
          vpcId: '',
          cidr: '',
          vpcIdOptions: []
        },
        ruleValidateLocalGateway: {
          name: [
              { required: true, message: '请输入本地网关名称', trigger: 'blur' }
          ],
          vpcId: [
              { required: true, message: '请选择VPCID', trigger: 'change' }
          ]
        },
        formValidateVpnLink: {
          name: '',
          localGateway: '',
          customerGateway: '',
          way: '',
          connType: 'true',
          connTypeOptions: [
            {label: '被动', key: 'true'},
            {label: '主动', key: 'false'},
          ],
        },
        ruleValidateVpnLink: {
          name: [
              { required: true, message: '请输入本地网关名称', trigger: 'blur' }
          ],
          localGateway: [
              { required: true, message: '请选择本地网关', trigger: 'change' }
          ],
          customerGateway: [
              { required: true, message: '请选择客户网关', trigger: 'change' }
          ],
          way: [
              { required: true, message: '请选择连接方式', trigger: 'change' }
          ]
        },
        // 远程vpn列表
        remoteVpnColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: 'VPN',
            width: 120,
            key: 'remoteVpnName'
          },
          {
            title: '预共享密钥',
            width: 260,
            key: 'ipseckey'
          },
          {
            title: '弹性IP地址',
            width: 200,
            key: 'publicip'
          },
          {
            title: '用户名',
            width: 160,
            render: (h, object) => {
              var resultArr = []
              var arr = object.row.username.split(',')
              for (var i = 0; i < arr.length; i++) {
                resultArr.push(h('p', {style: {lineHeight: '1.5'}}, arr[i]))
              }
              return h('div', resultArr)
            }
          },
          {
            title: '创建时间',
            width: 220,
            key: 'createtime'
          },
          {
            title: '操作',
            render: (h, object) => {
              if (object.row.status) {
                let message = object.row.status == 1 ? '正在创建VPN接入点...' : '正在删除VPN接入点...'
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, message)])
              }
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.current = object.row
                    this.listUser()
                    this.showModal.userManage = true
                  }
                }
              }, '管理用户')
            }
          }
        ],
        remoteVpnData: [],
        // 隧道vpn
        tunnelVpnColumns: [
          {
            type: 'radio',
            align: 'center',
            width: 60,
          },
          {
            title: '连接名称',
            key: 'name'
          },
          {
            title: '客户网关名称',
            key: 'vpncustomergatewayname',
            render: (h,params) => {
              return h('span', {
                style: {
                  color: '#2A99F2'
                }
              }, params.row.vpncustomergatewayname)
            }
          },
          {
            title: '本地网关名称',
            key: 'localGateway',
            render: (h,params) => {
              return h('span', {
                style: {
                  color: '#2A99F2'
                }
              }, params.row.localGateway)
            }
          },
          {
            title: '连接方式',
            key: 'connectionstatus',
            render: (h,params) => {
              return h('span', params.row.passive?'被动':'主动')
            }
          },
          {
            title: '状态',
            key: 'sourcestatus',
            render: (h, params) => {
              var text = params.row.connectionstatus == 1 ?'正常':'异常'
              return h('span', {}, text)
            }
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '操作',
            width: 200,
            render: (h, params) => {
              
              return h('div', {}, [
                h('span',{
                  style: {
                    marginRight: '10px',
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: ()=> {
                      this.$message.confirm({
                        content: '确认重启连接？',
                        onOk: () => {
                          if (this.currentTunnel.sourcestatus == 1) {
                            this.$http.get('network/resetVpnConnection.do', {
                              params: {
                                zoneId: $store.state.zone.zoneid,
                                vpnConnectionId: params.row.id
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.$Message.success({
                                  content: response.data.message
                                })
                                this.refresh()
                              } else {
                                this.$message.info({
                                  content: response.data.message
                                })
                                this.refresh()
                              }
                            })
                          } else {
                            this.$Message.info({
                              content: '请先连接在重启连接'
                            })
                          }
                        }
                      })
                    }
                  }
                },'重启'),
                h('span',{
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                        this.$message.confirm({
                          content: '确定要删除该隧道VPN吗',
                          onOk: () => {
                            this.$http.get('network/deleteVpnConnection.do', {
                              params: {
                                // s2sVpnGatewayId: this.currentTunnel.sourcevpnId,
                                // vpcId: this.currentTunnel.sourcevpcId,
                                zoneId: $store.state.zone.zoneid,
                                id: params.row.id
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.$Message.success({
                                  content: response.data.message
                                })
                                this.refresh()
                              } else {
                                this.$message.info({
                                  content: response.data.message
                                })
                                this.refresh()
                              }
                            })
                          }
                        })
                    }
                  }
                },'删除'),
              ])
            }
          }
        ],
        localGatewayColumns: [
          {
            type: 'radio',
            align: 'center',
            width: 60,
          },
          {
            title: '本地网关名称',
            key: 'localgatewayname'
          },
          {
            title: 'VPC名称',
            key: 'vpcname',
          },
          {
            title: 'VPC ID',
            key: 'vpcid'
          },
          {
            title: '公网IP地址',
            key: 'sourctnatip',
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '操作',
            width: 200,
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '删除选中的VPN本地网关？',
                  okText: "删除"
                },
                on: {
                  'on-ok': () => {
                    axios.get('network/deleteVpnGateway.do', {
                      params: {
                        zoneId: $store.state.zone.zoneid,
                        id: params.row.id
                      }
                    }).then(response => {
                      if (response.status == 200 && response.data.status == 1) {
                        this.getlocalGateway()
                        this.$Message.success(response.data.message)
                      } else {
                        this.$Message.error(response.data.message)
                      }
                    })
                  }
                }
              }, [
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                },'删除')
              ])
            }
          }
        ],
        localGatewayData: [],
				VpnClientColumns: [
				  {
				    type: 'radio',
				    align: 'center',
				    width: 60,
				  },
				  {
				    title: '名称',
				    key: 'name'
				  },
				  {
				    title: '目的IP地址',
				    key: 'destinationipaddress',
				  },
				  {
				    title: '目的网络CIDR',
				    key: 'cidr'
				  },
				  {
				    title: '预共享秘钥',
				    key: 'ipseckey',
				  },
				  {
				    title: 'IKE算法',
				    key: 'ikedhalgorithm'
				  },
				  {
				    title: 'ESP算法',
				    key: 'espencryptionalgorithm'
				  },
					{
					  title: '创建时间',
						width: 200,
					  key: 'createTime'
					},
				  {
            title: '管理',
            render: (h, params) => {
              return h('div', {
                style: {
                  color: '#2A99F2'
                }
              }, [
                h('span', {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.customergatewayId = params.row.customergatewayid
                      this.opencustomerModal_open('modify')
                    }
                  }
                }, '修改'),
                h('Poptip', {
                props: {
                  confirm: true,
                  title: '删除选中的VPN客户网关？',
                  okText: "删除",
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.$http.get('network/deleteVpnCustomerGateway.do', {
                      params: {
                      id: params.row.id
                      }
                    }).then(response => {
                      if (response.status == 200 && response.data.status == 1) {
                          this.getCustomerGateway()
                        } else {
                          this.$Message.error(response.data.message)
                        }
                    })
                  }
                }
              }, [
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                },'删除')
              ])
              ])          
            }
				  }
				],
        tunnelVpnData: [],
				VpnClientGaData: [],
        // 管理用户列表
        userList: [],
        // 远程VPN id
        current: null,
        // 添加用户Form表单
        addUserForm: {
          userName: '',
          password: '',
        },
        addUserFormValidate: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validateUserName, trigger: 'blur'}
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        // 当前选中远程接入
        currentRemote: null,
        currentTunnel: null,
				VpnClientTunnel: null,
        modifyForm: {
          sourcevpnId: '',
          connectType: '',
          sourcevpnconId: ''
        }

      }
    },
    created() {
      this.testjump()
    },
    methods: {
      funInput(value,attr) {
        // console.log(value)
        // console.log(attr)
        
        // console.log(reg.test(value))
        // var reg = 
        // this.formCustomerGateway.IP1 = 
        // this.formCustomerGateway.IP1.replace(/[^\d]/g,'')
        // console.log(value.replace(/[^\d]/g,''))
        var reg = /[^\d]/
        if(reg.test(value)){
          this.formCustomerGateway.IP1 = ''
        } else {
          if (value>255) {
            this.formCustomerGateway.IP1 = ''
            console.log(this.formCustomerGateway.IP1)
          }
        }
        
      },
      opencustomerModal_open(type) {
        this.customerModalType = type
        // this.formCustomerGateway.CIDR1 = ''
        // this.formCustomerGateway.name1 = ''
        // this.formCustomerGateway.CIDR2 = ''
        // this.formCustomerGateway.CIDR4 = ''
        // this.formCustomerGateway.IP1 = ''
        // this.formCustomerGateway.IP2 = ''
        // this.formCustomerGateway.IP3 = ''
        // this.formCustomerGateway.IP4 = ''
        // this.formCustomerGateway.key = ''
        this.showModal.newTunnelVpntwo=true
      },
      newTunnelVpnlink() {
        this.showModal.vpnLink = true
      },
      testjump(){
        this.paneStatus.vpn = this.$route.query.pane
        if (sessionStorage.getItem('modal')) {
          var modalName = sessionStorage.getItem('modal')
          this.showModal[modalName] = true
          sessionStorage.removeItem('modal')
        }
      },
			toggle: function (item) {
			  item._show = !item._show
			},
      // 切换地区重新获取数据
      refresh() {
        // 远程接入列表
        var remote = axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        })
        // 隧道VPN
        var customer = axios.get('network/listVpnConnections.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
          }
        })
				// VPN客户网关
				var coustomerGateway = axios.get('network/listCustomergateway.do', {
				  params: {
				    zoneId: $store.state.zone.zoneid,
				  }
        })
         // VPN本地网关
        var localGateway = axios.get('network/listLocalGateway.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
          }
        })
        Promise.all([remote, customer,coustomerGateway]).then(values => {
          this.initRemoteData(values[0])
          this.initCustomerData(values[1])
          this.initClientData(values[2])
          this.initLocalGateway(values[3])
          this.currentTunnel = null
          this.currentRemote = null
					this.VpnClientTunnel =null
        })
      },
      initRemoteData(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.remoteVpnData = response.data.result
        }
      },
      initCustomerData(response) {
        // if (response.status == 200 && response.data.status == 1) {
          if (response.status == 200) {
          this.tunnelVpnData = response.data.result
        }
      },
			initClientData(response) {
			  if (response.status == 200 && response.data.status == 1) {
			    this.VpnClientGaData = response.data.list
			  }
      },
      initLocalGateway(response) {
			  if (response.status == 200 && response.data.status == 1) {
			    this.localGatewayData = response.data.result
			  }
      },
      getlocalGateway() {
        axios.get('network/listLocalGateway.do', {
				   params: {
				     zoneId: $store.state.zone.zoneid,
				   }
				}).then(response => {
          this.initLocalGateway(response)
        })
      },
      getCustomerGateway() {
        axios.get('network/listCustomergateway.do', {
				   params: {
				     zoneId: $store.state.zone.zoneid,
				   }
				}).then(response => {
          this.initClientData(response)
        })
      },
      // 打开远程接入modal
      newRemoteAccess() {
        this.showModal.newRemoteAccess = true
        this.$http.get('network/listIsBindSourceIP.do').then(response => {
          this.newRemoteAccessForm.vpcIdOptions = response.data.result
        })
      },
      isHaveNat(val) {
        let url = 'network/isNatWay.do'
        this.$http.get(url, {
          params: {
            vpcId: val
          }
        }).then(res => {
          if (res.data.status == 1 && !res.data.result) {
            this.showModal.newRemoteAccess = false
            this.showModal.notHaveNAT = true
          }
        })
      },
      createNAT() {
        this.paneStatus.vpc = 'NAT'
        this.$router.push('vpc')
      },
      // 提交远程接入请求
      newRemoteAccessOk() {
        this.$refs.newRemoteAccessFormValidate.validate(validate => {
          if (validate) {
            this.showModal.newRemoteAccess = false
            this.remoteVpnData.push({
              vpcname: this.newRemoteAccessForm.vpnName,
              ipseckey: '******',
              publicip: '******',
              username: '',
              // 状态1代表创建中
              status: 1
            })
            this.$http.get('network/createRemoteAccessVpn.do', {
              params: {
                remoteVpnName: this.newRemoteAccessForm.vpnName,
                vpcId: this.newRemoteAccessForm.vpcId,
                userName: this.newRemoteAccessForm.userName,
                password: this.newRemoteAccessForm.password
              }
            }).then(response => {
              this.refresh()
              if (response.status == 200 && response.data.status == 1) {
                this.$message.info({
                  content: response.data.message
                })
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
        this.showModal.newTunnelVpn = false

      },
      // 打开创建隧道VPN modal
      newTunnelVpn() {
        this.showModal.newTunnelVpn = true
        this.$http.get('network/listIsBindSourceIP.do').then(response => {
          this.newTunnelVpnForm.vpcIdOptions = response.data.result
        })
      },
      newTunnelVpn1() {
        this.showModal.newLocalGateway = true
        this.$http.get('network/listIsBindSourceIP.do').then(response => {
          this.formValidateLocalGateway.vpcIdOptions = response.data.result
        })
      },
      newLocalGatewayOk(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post('network/createSiteToSiteVpnGateway.do', {
              zoneId: $store.state.zone.zoneid,
              vpcId: this.formValidateLocalGateway.vpcId,
              localGatewayName: this.formValidateLocalGateway.name
            }).then(response => {
              this.showModal.newLocalGateway = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getlocalGateway()
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      vpnLinkOk(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post('network/createVpnConnections.do', {
              zoneId: $store.state.zone.zoneid,
              s2sVpnGatewayid: this.formValidateVpnLink.localGateway,
              s2sCustomerGatewayid: this.formValidateVpnLink.customerGateway,
              passive: this.formValidateVpnLink.connType,
              name: this.formValidateVpnLink.name
            }).then(response => {
              this.showModal.newLocalGateway = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                // this.getlocalGateway()
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      nextStep() {
        this.$refs[`newTunnelVpnFormValidate${this.newTunnelVpnForm.step}`].validate(validate => {
          if (validate) {
            this.newTunnelVpnForm.step++
          }
        })
      },
      // 提交新建VPN隧道请求
      newTunnelVpnOk() {
        this.showModal.newTunnelVpn = false
        this.newTunnelVpnForm.step = 0
        this.newTunnelVpnForm.showDetail = false
        let localcidr, localgateway
        this.newTunnelVpnForm.vpcIdOptions.forEach(item => {
          if (this.newTunnelVpnForm.vpcId1 == item.vpcid) {
            localcidr = item.cidr
            localgateway = item.sourcenatip
          }
        })
        this.tunnelVpnData.push({
          localcidr,
          localgateway,
          targetdestinationipaddress: this.newTunnelVpnForm.IP,
          targetcidr: this.newTunnelVpnForm.CIDR,
          sourcestatus: '-2',
          sourceipsecKey: this.newTunnelVpnForm.key,
          sourcecreatetime: '创建中'
        })
        this.$http.get('network/createTunnelVpn.do', {
          params: {
            vpcId: this.newTunnelVpnForm.vpcId1, // 源vpcid   目标vpcid
            // targetVpcId: this.newTunnelVpnForm.vpcId2, // 源vpcid   目标vpcid
            name: this.newTunnelVpnForm.name1, // 源vpcid   目标vpcid  名称1
            // nameTwo: this.newTunnelVpnForm.name2, // 源vpcid   目标vpcid
            destinationIpAddress: this.newTunnelVpnForm.IP,
            cidr: this.newTunnelVpnForm.CIDR,
            ipsecKey: this.newTunnelVpnForm.key,
            ikeEncryption: this.newTunnelVpnForm.IKE,
            ikeHash: this.newTunnelVpnForm.IKEHash,
            espEncryption: this.newTunnelVpnForm.ESP,
            espHash: this.newTunnelVpnForm.ESPHash,
            passive: this.newTunnelVpnForm.connType,
            completeSecrecy: this.newTunnelVpnForm.secret,
            ikeDH: this.newTunnelVpnForm.IKEDH,
            ikelifetime: this.newTunnelVpnForm.ikelifetime,
            esplifetime: this.newTunnelVpnForm.esplifetime,
            failureDetection: this.newTunnelVpnForm.checkGroup1,
            forceUdpEspPackets: this.newTunnelVpnForm.checkGroup2,

          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.refresh()
            this.$Message.success({
              content: response.data.message
            })
          } else {
            this.refresh()
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
			testOk(name,type) {
        // let localcidr, localgateway
        // this.newTunnelVpnForm.vpcIdOptions.forEach(item => {
        //   if (this.newTunnelVpnForm.vpcId1 == item.vpcid) {
        //     localcidr = item.cidr
        //     localgateway = item.sourcenatip
        //   }
        // })
        // this.tunnelVpnData.push({
        //   localcidr,
        //   localgateway,
        //   targetdestinationipaddress: this.newTunnelVpnForm.IP,
        //   targetcidr: this.newTunnelVpnForm.CIDR,
        //   sourcestatus: '-2',
        //   sourceipsecKey: this.newTunnelVpnForm.key,
        //   sourcecreatetime: '创建中'
        // })
        let url = ''
        let params = {}
        if (type == 'new') {
          url = 'network/createVpnCustomer.do'
          params = {
            name:this.formCustomerGateway.name1,
            cidr: this.formCustomerGateway.CIDR1+'.'+this.formCustomerGateway.CIDR2+'.'+this.formCustomerGateway.CIDR3+'.'+this.formCustomerGateway.CIDR4+'/'+ this.formCustomerGateway.CIDR5,
            ipsecKey: this.formCustomerGateway.key,
            ikeEncryption: this.formCustomerGateway.IKE,  
            ikeHash: this.formCustomerGateway.IKEHash,
            ikeDH: this.formCustomerGateway.IKEDH,
            espEncryption: this.formCustomerGateway.ESP,
            espHash: this.formCustomerGateway.ESPHash, 
            destinationIpAddress: this.formCustomerGateway.IP1+'.'+this.formCustomerGateway.IP2+'.'+this.formCustomerGateway.IP3+'.'+this.formCustomerGateway.IP4,
            ikelifetime: this.formCustomerGateway.ikelifetime,
            esplifetime: this.formCustomerGateway.esplifetime,
            completeSecrecy: this.formCustomerGateway.secret,
            failureDetection: this.formCustomerGateway.checkGroup1,
            forceUdpEspPackets: this.formCustomerGateway.checkGroup2,
          }
        } else {
          url = 'network/updateVpnCustomerGateway.do'
          params = {
            customerGatewayId: this.customergatewayId,
            targetCidr: this.formCustomerGateway.CIDR1+'.'+this.formCustomerGateway.CIDR2+'.'+this.formCustomerGateway.CIDR3+'.'+this.formCustomerGateway.CIDR4+'/'+ this.formCustomerGateway.CIDR5,
            targetIP: this.formCustomerGateway.IP1+'.'+this.formCustomerGateway.IP2+'.'+this.formCustomerGateway.IP3+'.'+this.formCustomerGateway.IP4,
            ipsecKey: this.formCustomerGateway.key,
            name: this.formCustomerGateway.name1,
            ikeEncryption: this.formCustomerGateway.IKE,
            ikeHash: this.formCustomerGateway.IKEHash,
            espEncryption: this.formCustomerGateway.ESP,
            espHash: this.formCustomerGateway.ESPHash,
            completeSecrecy: this.formCustomerGateway.secret,
            ikeDH: this.formCustomerGateway.IKEDH,
            ikelifetime: this.formCustomerGateway.ikelifetime,
            esplifetime: this.formCustomerGateway.esplifetime,
            failureDetection: this.formCustomerGateway.checkGroup1,
            forceUdpEspPackets: this.formCustomerGateway.checkGroup2,
          }
        }
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$http.post(url, params).then(response => {
                this.showModal.newTunnelVpntwo = false
                if (response.status == 200 && response.data.status == 1) {
                  this.getCustomerGateway()
                  this.$Message.success({
                    content: response.data.message
                  })
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
        })
			},
      // 选中远程接入
      remoteRadio(current) {
        this.currentRemote = current
      },
      // 选中隧道VPN
      tunnelRadio(current) {
        this.currentTunnel = current
      },
      localGatewayRadio() {

      },
			VpnClientRadio(current) {
			  this.VpnClientTunnel = current
			},
      // 挂断VPN接入
      delRemoteAccess() {
        if (this.currentRemote == null) {
          this.$Message.info({
            content: '请选择要挂断的远程VPN接入'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该远程VPN接入吗',
            onOk: () => {
              this.remoteVpnData.forEach(item => {
                if (item.id == this.currentRemote.id) {
                  // status为2代表正在删除
                  this.$set(item, 'status', 2)
                }
              })
              this.$http.get('network/deleteRemoteAccessVpn.do', {
                params: {
                  id: this.currentRemote.id
                }
              }).then(response => {
                this.refresh()
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          })
        }
      },
      // 删除隧道VPN
      delTunnelVpn() {
        if (this.currentTunnel == null) {
          this.$Message.info({
            content: '请选择要删除的隧道VPN'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该隧道VPN吗',
            onOk: () => {
              this.$http.get('network/deleteVpnConnection.do', {
                params: {
                  s2sVpnGatewayId: this.currentTunnel.sourcevpnId,
                  vpcId: this.currentTunnel.sourcevpcId,
                  zoneId: $store.state.zone.zoneid

                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.refresh()
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                  this.refresh()
                }
              })
            }
          })
        }
      },
      //vpn 删除连接
      disconnect(sourcevpnconId) {
        this.$http.get('network/deleteVpnConnection.do', {
          params: {
            id: sourcevpnconId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message
            })
            this.refresh()
          } else {
            this.$message.info({
              content: response.data.message
            })
            this.refresh()
          }
        })
      },
      // vpn 重新连接
      connect(row) {
        this.tunnelVpnData.forEach(item => {
          if (item.sourcevpnId == row.sourcevpnId) {
            this.$set(item, 'sourcestatus', '-3')
          }
        })
        this.$http.get('network/createVpnConnection.do', {
          params: {
            s2sVpnGatewayid: row.sourcevpnId,
            s2sCustomerGatewayid: row.customerVPNid,
            passive: false
          }
        }).then(response => {
          this.refresh()
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // vpn 修改配置
      fixConfig() {
        this.showModal.FixVPN = false
        this.tunnelVpnData.forEach(item => {
          if (item.customerVPNid == this.modifyTunnelVpnForm.customerVPNid) {
            this.$set(item, 'sourcestatus', '-5')
          }
        })
        this.$http.post('network/updateVpnCustomerGateway.do', {
          customerGatewayId: this.modifyTunnelVpnForm.customerVPNid,
          targetCidr: this.modifyTunnelVpnForm.CIDR,
          targetIP: this.modifyTunnelVpnForm.IP,
          ipsecKey: this.modifyTunnelVpnForm.key,
          name: this.modifyTunnelVpnForm.name1,
          ikeEncryption: this.modifyTunnelVpnForm.IKE,
          ikeHash: this.modifyTunnelVpnForm.IKEHash,
          espEncryption: this.modifyTunnelVpnForm.ESP,
          espHash: this.modifyTunnelVpnForm.ESPHash,
          completeSecrecy: this.modifyTunnelVpnForm.secret,
          ikeDH: this.modifyTunnelVpnForm.IKEDH,
          ikelifetime: this.modifyTunnelVpnForm.ikelifetime,
          esplifetime: this.modifyTunnelVpnForm.esplifetime,
          failureDetection: this.modifyTunnelVpnForm.checkGroup1,
          forceUdpEspPackets: this.modifyTunnelVpnForm.checkGroup2,
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message
            })
            this.refresh()
          } else {
            this.$message.info({
              content: response.data.message
            })
            this.refresh()
          }
        })
      },
      // 修改连接方式
      modifyConnection() {
        this.showModal.FixVPNContent = false
        this.tunnelVpnData.forEach(item => {
          if (item.sourcevpnId == this.modifyForm.sourcevpnId) {
            this.$set(item, 'sourcestatus', '-4')
          }
        })
        this.$http.get('network/updateVpnConnection.do', {
          params: {
            vpnconId: this.modifyForm.sourcevpnconId,
            passive: this.modifyForm.connectType
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message
            })
            this.refresh()
          } else {
            this.$message.info({
              content: response.data.message
            })
            this.refresh()
          }
        })
      },
      // 重启VPN
      restartVpn() {
        if (this.currentTunnel == null) {
          this.$Message.info({
            content: '请选择要重启隧道VPN'
          })
          return
        } else (
          this.$message.confirm({
            content: '确认重启连接？',
            onOk: () => {
              if (this.currentTunnel.sourcestatus == 1) {
                this.$http.get('network/resetVpnConnection.do', {
                  params: {
                    zoneId: $store.state.zone.zoneid,
                    // vpnConnectionId: this.currentTunnel.sourcevpnconId
                    vpnConnectionId: this.currentTunnel.id
                  }
                }).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    this.$Message.success({
                      content: response.data.message
                    })
                    this.refresh()
                  } else {
                    this.$message.info({
                      content: response.data.message
                    })
                    this.refresh()
                  }
                })
              } else {
                this.$Message.info({
                  content: '请先连接在重启连接'
                })
              }
            }
          })
        )
      },
      // 列出所有用户
      listUser() {
        this.$http.get('network/listVpnUsers.do', {
          params: {
            remoteVpnId: this.current.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.userList = response.data.result
          }
        })
      },
      // 远程vpn数据
      remoteData() {
        axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.remoteVpnData = response.data.result
          }
        })
      },
      // 用户管理添加用户
      addUser() {
        this.$refs.addUserFormValidate.validate(validate => {
          if (validate) {
            // status   1：创建中  2：删除中
            this.userList.push({name: this.addUserForm.userName, status: 1})
            this.$http.get('network/addVpnUser.do', {
              params: {
                vpcId: this.current.vpcid,
                userName: this.addUserForm.userName,
                password: this.addUserForm.password,
                remoteVpnId: this.current.id,
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.listUser()
                this.remoteData()
              } else {
                this.$Message.error(response.data.message)
              }
            })
            this.addUserForm.userName = ''
            this.addUserForm.password = ''
          }
        })
      },
      // 删除用户
      delUser(userName, index) {
        this.userList.splice(index, 1, {
          name: userName,
          status: 2
        })
        this.$http.get('network/removeVpnUser.do', {
          params: {
            userName,
            remoteVpnId: this.current.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listUser()
            this.remoteData()
          } else {
            this.$message.info(response.data.message)
          }
        })
      }
    },
    watch: {
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      },
      'formValidateLocalGateway.vpcId' : {
        handler: function (val) {
          this.formValidateLocalGateway.vpcIdOptions.map(element => {
            if(element.vpcid == val) {
              this.formValidateLocalGateway.cidr = element.cidr
              // this.sourcenatip = element.sourcenatip
            }
          })
        },
        deep: true
      }
    },
    computed: mapState({
      paneStatus: state => state.paneStatus,
      auth() {
        return this.$store.state.authInfo != null
      }
    })
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.hint{
		width:460px;
		height:36px;
		background:rgba(255,196,57,0.1);
		border-radius:2px;
		border:1px solid rgba(255,196,57,1);
		margin-bottom: 15px;
		text-align: center;
    line-height: 36px;
    margin-top: 10px;
	}
</style>
