<template>
  <div id="buy">
    <div id="wrapper">
      <div id="header" style="margin-bottom: 30px">
        <Select v-model="product.currentProduct" class="mySelect" style="width: 102px">
          <Option v-for="item in product.productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <router-link :to="product.currentProduct" target="_blank">查看产品详情</router-link>
      </div>
      <div id="body">
        <!--云主机div-->
        <div id="Pecs" v-show="product.currentProduct=='Pecs'">
          <!--选择配置方式，快速配置、自定义配置-->
          <div style="height:60px;display: flex">
            <div v-for="item in PecsInfo.createTypeList" :key="item.value" @click="PecsInfo.createType=item.value"
                 :class="{'typeSelect':item.value==PecsInfo.createType}" class="config-title">{{item.label}}
            </div>
          </div>
          <div style="padding:40px;">
            <!--两种配置方式公共页面-->
            <!--区域选择-->
            <div style="border-bottom: 1px solid #D9D9D9;">
              <h2>区域选择</h2>
              <div class="item-wrapper">
                <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
                     :class="{zoneSelect:PecsInfo.zone.zoneid==item.zoneid}"
                     @click="PecsInfo.zone=item">{{item.zonename}}
                </div>
              </div>
              <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
                不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
            </div>

            <!--计费方式选择-->
            <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
              <h2>计费方式选择</h2>
              <div class="item-wrapper">
                <div v-for="item in PecsInfo.timeType" :key="item.value" class="zoneItem"
                     :class="{zoneSelect:PecsInfo.timeForm.currentTimeType==item.value}"
                     @click="PecsInfo.timeForm.currentTimeType=item.value">{{item.label}}
                </div>
              </div>
              <div class="item-wrapper" v-if="PecsInfo.timeForm.currentTimeType=='annual'">
                <div v-for="item in PecsInfo.timeValue" :key="item.value" class="timeType"
                     :class="{zoneSelect:PecsInfo.timeForm.currentTimeValue.label==item.label}"
                     @click="PecsInfo.timeForm.currentTimeValue=item"
                     style="margin:0px;width:55px">
                  {{item.label}}
                  <span v-if="item.type=='year'" class="discount-icon">惠</span>
                </div>
              </div>
              <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
                满一年打8.3折，满两年打7折，满3年6折</p>
            </div>

            <!--快速配置主体页面-->
            <div v-show="PecsInfo.createType=='fast'">
              <!--主机规格选择-->
              <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px;padding-bottom: 20px">
                <h2>主机规格选择</h2>
                <!--镜像选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">镜像类型</p>
                      <p class="item-title" style="margin-top: 40px;">镜像系统</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.mirrorType" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.currentType==item.value}"
                           @click="PecsInfo.currentType=item.value">{{item.label}}
                      </div>
                      <!--镜像+应用 列表-->
                      <div v-if="PecsInfo.currentType=='app'">
                        <div v-for="item in PecsInfo.appList" class="mirror"
                             :class="{mirrorSelect:item==PecsInfo.currentApp}"
                             @click="PecsInfo.currentApp=item">
                          <div>
                            <p class="appName">{{item.templatename}}</p>
                            <p class="desc">{{item.templatedescript}}</p>
                          </div>
                        </div>
                      </div>

                      <!--公共镜像 列表-->
                      <div v-if="PecsInfo.currentType=='public'">
                        <Dropdown v-for="(item,index) in PecsInfo.publicList" style="margin-right:10px;margin-top:20px;"
                                  @on-click="setOS" :key="item.ostypeid">
                          <div
                            style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                            {{item.selectSystem||item.system}}
                          </div>
                          <Dropdown-menu slot="list">
                            <Dropdown-item v-for="system in item.systemList" :key="system.ostypeid"
                                           :name="`${system.templatename}#${system.systemtemplateid}#${index}`"
                                           style="white-space: pre-wrap;display:block;">
                              <span>{{system.templatename}}</span>
                            </Dropdown-item>
                          </Dropdown-menu>
                        </Dropdown>
                      </div>

                      <!--自定义镜像 列表-->
                      <div v-if="PecsInfo.currentType=='custom'">
                        <div v-for="item in PecsInfo.customList" :key="item.value" class="zoneItem"
                             :class="{zoneSelect:PecsInfo.customMirror.id==item.id}"
                             @click="setOwnTemplate(item)" style="margin-top: 20px;">{{item.templatename}}
                        </div>
                        <div v-if="PecsInfo.customList.length==0" class="zoneItem" style="margin-top: 20px;">
                          暂无镜像
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!--是否需要公网IP-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:2px;">公网IP</p>
                    </div>
                    <div>
                      <Checkbox v-model="PecsInfo.publicIP" size="large">购买公网IP</Checkbox>
                    </div>
                  </div>
                </div>

                <!--系统配置 购买公网IP-->
                <div class="item-wrapper" v-if="PecsInfo.publicIP == true">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">配置</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.systemConfig" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.currentSystem.kernel==item.kernel&&PecsInfo.currentSystem.RAM==item.RAM}"
                           @click="PecsInfo.currentSystem=item"
                           style="display: block;width:360px;margin-bottom:20px;">
                        {{`${item.kernel}核${item.RAM}G、${item.bandWidth}M带宽、${item.diskSize}G系统盘（${item.diskDesc}）`}}
                      </div>

                    </div>
                  </div>
                </div>
                <!--系统配置 不购买公网ip-->
                <div class="item-wrapper" v-if="PecsInfo.publicIP == false">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">配置</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.systemConfigNoNet" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.currentSystem.kernel==item.kernel&&PecsInfo.currentSystem.RAM==item.RAM}"
                           @click="PecsInfo.currentSystem=item"
                           style="display: block;width:360px;margin-bottom:10px;">
                        {{`${item.kernel}核${item.RAM}G、${item.bandWidth}M带宽、${item.diskSize}G系统盘（${item.diskDesc}）`}}
                      </div>

                    </div>
                  </div>
                </div>
                <!-- 防火墙选择 -->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">防火墙</p>
                    </div>
                    <div>
                      <p
                        style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:25px;    border: 1px solid #D9D9D9;padding: 5px 25px;">
                        默认设置</p>
                    </div>
                  </div>
                  <p
                    style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-top: 10px;margin-left: 90px;line-height: 1.5;">
                    默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。<span style="color: #377DFF;cursor: pointer"
                                                                        @click="$router.push('firewall')">如何修改</span>
                  </p>
                </div>
              </div>
            </div>

            <!--自定义配置主体页面-->
            <div v-show="PecsInfo.createType=='custom'">
              <!--主机规格选择-->
              <div style="padding-bottom: 20px;border-bottom: 1px solid #EDEDED;margin-top: 20px">
                <h2>主机规格选择</h2>
                <!--类型选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">类型</p>
                    </div>
                    <div>
                      <Poptip v-for="item in PecsInfo.vmTypeList" trigger="hover" :content="item.content"
                              :key="item.value">
                        <div class="zoneItem"
                             :class="{zoneSelect:PecsInfo.vmType==item.value}"
                             @click="changeType(item.value)">
                          {{item.label}}
                        </div>
                      </Poptip>
                    </div>
                  </div>
                </div>
                <!--镜像选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">镜像类型</p>
                      <p class="item-title" style="margin-top: 40px;">镜像系统</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.mirrorType" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.currentType==item.value}"
                           @click="PecsInfo.currentType=item.value">{{item.label}}
                      </div>
                      <!--镜像+应用 列表-->
                      <div v-if="PecsInfo.currentType=='app'">
                        <div v-for="item in PecsInfo.appList" class="mirror"
                             :class="{mirrorSelect:item==PecsInfo.currentApp}"
                             @click="PecsInfo.currentApp=item">
                          <div>
                            <p class="appName">{{item.templatename}}</p>
                            <p class="desc">{{item.templatedescript}}</p>
                          </div>
                        </div>
                      </div>

                      <!--公共镜像 列表-->
                      <div v-if="PecsInfo.currentType=='public'">
                        <Dropdown v-for="(item,index) in PecsInfo.publicList" style="margin-right:10px;margin-top:20px;"
                                  @on-click="setOS" :key="item.ostypeid">
                          <div
                            style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                            {{item.selectSystem||item.system}}
                          </div>
                          <Dropdown-menu slot="list">
                            <Dropdown-item v-for="system in item.systemList" :key="system.ostypeid"
                                           :name="`${system.ostypename}#${system.systemtemplateid}#${index}`"
                                           style="white-space: pre-wrap;display:block;">
                              <span>{{system.templatename}}</span>
                            </Dropdown-item>
                          </Dropdown-menu>
                        </Dropdown>
                      </div>
                      <!--自定义镜像 列表-->
                      <div v-if="PecsInfo.currentType=='custom'">
                        <div v-for="item in PecsInfo.customList" :key="item.value" class="zoneItem"
                             :class="{zoneSelect:PecsInfo.customMirror.id==item.id}"
                             @click="setOwnTemplate(item)" style="margin-top: 20px;">{{item.templatename}}
                        </div>
                        <div v-if="PecsInfo.customList.length==0" class="zoneItem" style="margin-top: 20px;">
                          暂无镜像
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--系统盘类型选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">系统盘</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.diskTypeList" :key="item.value" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmConfig.diskType==item.value}"
                           @click="PecsInfo.vmConfig.diskType=item.value">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 核心数选择 -->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">核心数</p>
                    </div>
                    <div v-for="item in PecsInfo.info" v-if="item.zoneId === PecsInfo.zone.zoneid">
                      <div v-for="cpu in item.kernelList" :key="cpu.value" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmConfig.kernel==cpu.value}"
                           @click="changeKernel(cpu,'PecsInfo')">{{cpu.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 内存选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">内存</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.RAMList" :key="item.value" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmConfig.RAM==item.value}"
                           @click="PecsInfo.vmConfig.RAM=item.value">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!--自定义主机价格-->
                <div class="item-wrapper" style="margin-top: 28px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PecsInfo.vmConfig.cost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>

              <!--主机网络与带宽-->
              <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
                <h2>网络与带宽</h2>
                <!--虚拟私有云-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
                    </div>
                    <div>
                      <Select v-model="PecsInfo.vpc" style="width:200px">
                        <Option v-for="item in PecsInfo.vpcList" :key="item.vpcid" :value="item.vpcid">
                          {{item.vpcname}}
                        </Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
                  如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span style="color: rgb(42, 153, 242);cursor: pointer"
                                                               @click="$router.push('vpc')">控制台新建。</span></p>
                <!--网卡选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">网卡</p>
                    </div>
                    <div>
                      <Select v-model="PecsInfo.network" style="width:200px">
                        <Option v-for="item in PecsInfo.networkList" :key="item.ipsegmentid" :value="item.ipsegmentid">
                          {{item.name}}
                        </Option>
                      </Select>
                    </div>
                  </div>
                </div>

                <!--是否需要公网IP-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 6px;">公网IP</p>
                    </div>
                    <div style="margin-top: 4px;">
                      <Checkbox v-model="PecsInfo.IPConfig.publicIP" size="large">购买公网IP</Checkbox>
                    </div>
                  </div>
                </div>
                <!--如果需要公网IP，请选择公网IP带宽-->
                <div class="item-wrapper" v-show="PecsInfo.IPConfig.publicIP">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">带宽</p>
                    </div>
                    <div style="width:500px;display: flex;align-items:center">
                      <i-slider
                        v-model="PecsInfo.IPConfig.bandWidth"
                        unit="MB"
                        :min=1
                        :max=100
                        :step=1
                        :points="[20,50]"
                        style="margin-right:30px;vertical-align: middle;">
                      </i-slider>
                      <InputNumber :max="100" :min="1" v-model="PecsInfo.IPConfig.bandWidth" size="large"></InputNumber>
                    </div>
                  </div>
                </div>
                <!-- 防火墙选择 -->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">防火墙</p>
                    </div>
                    <div>
                      <p
                        style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:25px; border: 1px solid #D9D9D9;padding: 5px 25px;">
                        默认设置
                      </p>
                    </div>
                  </div>
                  <p
                    style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-top: 10px;margin-left: 90px;line-height: 1.5;">
                    默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。<span style="color: #377DFF;cursor: pointer"
                                                                        @click="$router.push('firewall')">如何修改</span>
                  </p>
                </div>
                <!--公网IP价格-->
                <div class="item-wrapper" style="margin-top: 28px;" v-show="PecsInfo.IPConfig.publicIP">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PecsInfo.IPConfig.cost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>

              <!--云硬盘-->
              <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
                <h2>云硬盘</h2>
                <!--虚拟私有云-->
                <div v-for="(disk,index) in PecsInfo.dataDiskList">
                  <div class="item-wrapper">
                    <div style="display: flex">
                      <div>
                        <p class="item-title" style="margin-top: 7px;">类型</p>
                      </div>
                      <div>
                        <div v-for="item in PecsInfo.dataDiskType" :key="item.value" class="zoneItem"
                             :class="{zoneSelect:disk.type==item.value}"
                             @click="disk.type=item.value">{{item.label}}
                        </div>
                      </div>
                      <img src="../../assets/img/buy/across.png" @click="removeHostDisk(index)"
                           style="cursor: pointer;height:11px;">
                    </div>
                  </div>
                  <div class="item-wrapper">
                    <div style="display: flex">
                      <div>
                        <p class="item-title" style="">容量</p>
                      </div>
                      <div style="width:500px;display: flex;align-items:center">
                        <i-slider
                          v-model="disk.size"
                          unit="GB"
                          :min=20
                          :max=1000
                          :step=10
                          :points="[500,800]"
                          style="margin-right:30px;vertical-align: middle;">
                        </i-slider>
                        <InputNumber :max="1000" :min="20" v-model="disk.size" size="large" :step=10
                                     @on-blur="changeDiskSize(index,disk.size)"
                                     @on-focus="changeDiskSize(index,disk.size)"></InputNumber>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item-wrapper" v-if="remainDisk>0" style="margin-top: 10px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title"></p>
                    </div>
                    <div>
                      <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk('PecsInfo')">添加数据盘</span>
                        您还可以添加{{remainDisk}}块数据盘</p>
                    </div>
                  </div>
                </div>
                <!--数据盘价格-->
                <div class="item-wrapper" style="margin-top: 28px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PecsInfo.dataDiskCost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--登录设置-->
            <div style="margin-top: 20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px">
              <h2>登录设置</h2>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title">主机信息</p>
                  </div>
                  <div v-for="item in PecsInfo.loginType" :key="item.type" class="zoneItem"
                       :class="{zoneSelect:PecsInfo.currentLoginType==item.type}"
                       @click="PecsInfo.currentLoginType=item.type">{{item.label}}
                  </div>
                </div>
              </div>

              <!--默认设置显示的设置-->
              <div v-if="PecsInfo.currentLoginType=='default'">
                <!--安全组选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">系统用户名</p>
                    </div>
                    <span style="padding:10px 0;font-size: 14px;color: #666666;">{{ systemUsername }}</span>
                  </div>
                </div>
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">登录密码</p>
                    </div>
                    <span style="padding:10px 0;font-size: 14px;color: #666666;">默认密码 创建成功后通过短信和站内信查看</span>
                  </div>
                </div>
              </div>

              <!--自定义设置显示的设置-->
              <div v-if="PecsInfo.currentLoginType=='custom'">
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">主机名称</p>
                    </div>
                    <Input v-model="PecsInfo.computerName" placeholder="请输入主机名" style="width: 300px"
                           @on-change="PecsInfo.computerNameWarning=''"></Input>
                    <span style="line-height: 32px;color:red;margin-left:10px">{{PecsInfo.computerNameWarning}}</span>
                  </div>
                  <p class="item-desc">当购买数量大于1台之时，主机命名规则为主机名称加随机数字。</p>
                </div>
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">系统用户名</p>
                    </div>
                    <span style="padding:10px 0;font-size: 14px;color: #666666;">{{ systemUsername }}</span>
                  </div>
                </div>
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">登录密码</p>
                    </div>
                    <Input v-model="PecsInfo.password" placeholder="请输入至少6位包含大小写与数字的密码"
                           style="width: 300px" @on-change="PecsInfo.passwordWarning=''"></Input>
                    <span style="line-height: 32px;color:red;margin-left:10px">{{PecsInfo.passwordWarning}}</span>
                  </div>
                </div>
              </div>

              <!--是否自动续费-->
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 4px">自动续费</p>
                  </div>
                  <i-switch v-model="PecsInfo.autoRenewal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                  </i-switch>
                  <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
                </div>
              </div>
            </div>
            <!--费用、以及加入预算清单-->
            <div style="margin-top: 20px">
              <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
                 @click="$router.push('computed/3-1')">查看计价详情</p>
              <p v-if="PecsInfo.createType=='fast'"
                 style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">费用：<span
                style="font-size: 24px;color: #EE6723;">{{PecsInfo.cost.toFixed(2)}}元</span><span
                v-show="PecsInfo.timeForm.currentTimeType == 'current'">/小时</span></p>
              <p v-if="PecsInfo.createType=='fast'&&PecsInfo.fastCoupon!=0"
                 style="text-align: right;font-size: 14px;color: #666666;">优惠费用：<span
                style="font-size: 14px;color: #EE6723;">{{PecsInfo.fastCoupon.toFixed(2)}}元</span></p>
              <p v-if="PecsInfo.createType=='custom'"
                 style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
                费用：<span
                style="font-size: 24px;color: #EE6723;">{{totalCost.toFixed(2)}}元</span><span
                v-show="PecsInfo.timeForm.currentTimeType == 'current'">/小时</span>
              </p>
              <p v-if="PecsInfo.createType=='custom'&&totalCoupon!=0"
                 style="text-align: right;font-size: 14px;color: #666666;">
                优惠费用：<span
                style="font-size: 14px;color: #EE6723;">{{totalCoupon.toFixed(2)}}元</span></p>
              <div style="text-align: right;margin-top: 20px;">
                <Button size="large"
                        class="btn" @click="addCart">
                  加入预算清单
                </Button>
                <Button @click="buyHost" type="primary"
                        style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
                  立即购买
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!--云硬盘div-->
        <div id="Pdisk" style="padding: 30px 40px 40px 40px;" v-show="product.currentProduct=='Pdisk'">
          <!--两种配置方式公共页面-->
          <!--区域选择-->
          <div style="border-bottom: 1px solid #EDEDED;">
            <h2>区域选择</h2>
            <div class="item-wrapper">
              <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
                   :class="{zoneSelect:PdiskInfo.zone.zoneid==item.zoneid}"
                   @click="PdiskInfo.zone=item">{{item.zonename}}
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
          </div>
          <!--计费方式选择-->
          <div style="border-bottom: 1px solid #EDEDED;margin-top: 20px">
            <h2>计费方式选择</h2>
            <div class="item-wrapper">
              <div v-for="item in PecsInfo.timeType" :key="item.value" class="zoneItem"
                   :class="{zoneSelect:PdiskInfo.timeForm.currentTimeType==item.value}"
                   @click="PdiskInfo.timeForm.currentTimeType=item.value">{{item.label}}
              </div>
            </div>
            <div class="item-wrapper" v-if="PdiskInfo.timeForm.currentTimeType=='annual'">
              <div v-for="item in PecsInfo.timeValue" :key="item.value" class="timeType"
                   :class="{zoneSelect:PdiskInfo.timeForm.currentTimeValue.label==item.label}"
                   @click="PdiskInfo.timeForm.currentTimeValue=item"
                   style="margin:0px;border-right:none;width:55px">
                {{item.label}}
                <span v-if="item.type=='year'" class="discount-icon">惠</span>
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              满一年打8.3折，满两年打7折，满3年6折</p>
          </div>
          <!--云硬盘-->
          <div style="margin-top:20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>云硬盘</h2>
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">磁盘名称</p>
                </div>
                <div>
                  <Input v-model="PdiskInfo.diskName" placeholder="请输入磁盘名" style="width: 300px"></Input>
                </div>
              </div>
            </div>
            <!--虚拟私有云-->
            <div v-for="(disk,index) in PdiskInfo.dataDiskList" :key="index">
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 7px;">类型</p>
                  </div>
                  <div>
                    <div v-for="(item,index) in PdiskInfo.dataDiskType" :key="item.value" class="zoneItem"
                         :class="{zoneSelect:disk.type==item.value}"
                         @click="disk.type=item.value;disk.label=item.label">{{item.label}}
                    </div>
                  </div>
                  <img src="../../assets/img/buy/across.png" @click="removeDisk(index)"
                       v-show="PdiskInfo.dataDiskList.length>1"
                       style="cursor: pointer;height:11px;">
                </div>
              </div>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="">容量</p>
                  </div>
                  <div style="width:500px;display: flex;align-items:center">
                    <i-slider
                      v-model="disk.size"
                      unit="GB"
                      :min=20
                      :max=1000
                      :step=10
                      :points="[500,800]"
                      style="margin-right:30px;vertical-align: middle;">
                    </i-slider>
                    <InputNumber :max="500" :min="20" v-model="disk.size" size="large" :step=10
                                 @on-blur="change_DiskSize(index,disk.size)"
                                 @on-focus="change_DiskSize(index,disk.size)"></InputNumber>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-wrapper" v-if="remainDiskInDisk>0">
              <div style="display: flex">
                <div>
                  <p class="item-title"></p>
                </div>
                <div>
                  <p><span style="color:#2A99F2;cursor:pointer" @click="pushDiskInDisk">添加数据盘</span>
                    您还可以添加{{remainDiskInDisk}}块数据盘</p>
                </div>

              </div>
            </div>
            <!--是否自动续费-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 4px">自动续费</p>
                </div>
                <i-switch v-model="PdiskInfo.autoRenewal">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>
                <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
              </div>
            </div>
          </div>
          <!--数据盘价格-->
          <div style="margin-top: 20px">
            <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
               @click="$router.push('computed/3-1')">查看计价详情</p>
            <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
              费用：<span style="font-size: 24px;color: #EE6723;">{{PdiskInfo.dataDiskCost.toFixed(2)}}元</span><span
              v-show="PdiskInfo.timeForm.currentTimeType == 'current'">/小时</span>
            </p>
            <p style="text-align: right;font-size: 14px;color: #666666;" v-if="PdiskInfo.coupon!=0">优惠费用：<span
              style="font-size: 14px;color: #EE6723;">{{PdiskInfo.coupon.toFixed(2)}}元</span></p>
            <div style="text-align: right;margin-top: 20px;">
              <Button size="large"
                      class="btn" @click="addDiskCart">
                加入预算清单
              </Button>
              <Button @click="buyDisk" type="primary"
                      style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
                立即购买
              </Button>
            </div>
          </div>
        </div>

        <!--公网IP div-->
        <div id="Peip" style="padding: 30px 40px 40px 40px;" v-show="product.currentProduct=='Peip'">
          <!--两种配置方式公共页面-->
          <!--区域选择-->
          <div style="border-bottom: 1px solid #D9D9D9;">
            <h2>区域选择</h2>
            <div class="item-wrapper">
              <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
                   :class="{zoneSelect:PeipInfo.zone.zoneid==item.zoneid}"
                   @click="PeipInfo.zone=item">{{item.zonename}}
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
          </div>
          <!--计费方式选择-->
          <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
            <h2>计费方式选择</h2>
            <div class="item-wrapper">
              <div v-for="item in PecsInfo.timeType" :key="item.value" class="zoneItem"
                   :class="{zoneSelect:PeipInfo.timeForm.currentTimeType==item.value}"
                   @click="PeipInfo.timeForm.currentTimeType=item.value">{{item.label}}
              </div>
            </div>
            <div class="item-wrapper" v-if="PeipInfo.timeForm.currentTimeType=='annual'">
              <div v-for="item in PecsInfo.timeValue" :key="item.value" class="timeType"
                   :class="{zoneSelect:PeipInfo.timeForm.currentTimeValue.label==item.label}"
                   @click="PeipInfo.timeForm.currentTimeValue=item"
                   style="margin:0px;border-right:none;width:55px">
                {{item.label}}
                <span v-if="item.type=='year'" class="discount-icon">惠</span>
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              满一年打8.3折，满两年打7折，满3年6折</p>
          </div>

          <!--主机网络与带宽-->
          <div style="margin-top:20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>网络与带宽</h2>
            <!--虚拟私有云-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
                </div>
                <div>
                  <Select v-model="PeipInfo.vpc" style="width:200px">
                    <Option v-for="item in PeipInfo.vpcList" :key="item.vpcid" :value="item.vpcid">
                      {{item.vpcname}}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
            <!--IP，请选择公网IP带宽-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">带宽</p>
                </div>
                <div style="width:500px;display: flex;align-items:center">
                  <i-slider
                    v-model="PeipInfo.bandWidth"
                    unit="MB"
                    :min=1
                    :max=100
                    :step=1
                    :points="[20,50]"
                    style="margin-right:30px;vertical-align: middle;">
                  </i-slider>
                  <InputNumber :max="100" :min="1" v-model="PeipInfo.bandWidth" size="large"
                               style="position: relative;bottom: 5px"></InputNumber>
                </div>
              </div>
            </div>
            <!--是否自动续费-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 4px">自动续费</p>
                </div>
                <i-switch v-model="PeipInfo.autoRenewal">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>
                <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
              </div>
            </div>
            <!--公网IP价格-->
            <!--<div class="item-wrapper" style="margin-top: 28px;">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{PeipInfo.cost}}元</p>
                </div>
              </div>
            </div>-->
          </div>

          <!--费用、以及加入预算清单-->
          <div style="margin-top: 20px">
            <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
               @click="$router.push('computed/3-1')">查看计价详情</p>
            <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">费用：<span
              style="font-size: 24px;color: #EE6723;">{{PeipInfo.cost.toFixed(2)}}元</span><span
              v-show="PeipInfo.timeForm.currentTimeType == 'current'">/小时</span></p>
            <p style="text-align: right;font-size: 14px;color: #666666;" v-if="PeipInfo.coupon!=0">优惠费用：<span
              style="font-size: 14px;color: #EE6723;">{{PeipInfo.coupon.toFixed(2)}}元</span>
            </p>
            <div style="text-align: right;margin-top: 20px;">
              <Button size="large"
                      class="btn" @click="addIPCart">
                加入预算清单
              </Button>
              <Button @click="buyIP" type="primary"
                      style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377dff;">
                立即购买
              </Button>
            </div>
          </div>
        </div>

        <!--数据库div-->
        <div id="Pdata" v-show="product.currentProduct=='Pdata'">
          <div style="padding:40px;">
            <!--两种配置方式公共页面-->
            <!--区域选择-->
            <div style="border-bottom: 1px solid #D9D9D9;">
              <h2>区域选择</h2>
              <div class="item-wrapper">
                <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
                     :class="{zoneSelect:PecsInfo.zone.zoneid==item.zoneid}"
                     @click="PecsInfo.zone=item">{{item.zonename}}
                </div>
              </div>
              <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
                不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
            </div>

            <!--计费方式选择-->
            <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
              <h2>计费方式选择</h2>
              <div class="item-wrapper">
                <div v-for="item in PecsInfo.timeType" :key="item.value" class="zoneItem"
                     :class="{zoneSelect:PdataInfo.timeForm.currentTimeType==item.value}"
                     @click="PdataInfo.timeForm.currentTimeType=item.value">{{item.label}}
                </div>
              </div>
              <div class="item-wrapper" v-if="PdataInfo.timeForm.currentTimeType=='annual'">
                <div v-for="item in PecsInfo.timeValue" :key="item.value" class="timeType"
                     :class="{zoneSelect:PdataInfo.timeForm.currentTimeValue.label==item.label}"
                     @click="PdataInfo.timeForm.currentTimeValue=item"
                     style="margin:0px;width:55px">
                  {{item.label}}
                  <span v-if="item.type=='year'" class="discount-icon">惠</span>
                </div>
              </div>
              <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
                满一年打8.3折，满两年打7折，满3年6折</p>
            </div>

            <!--自定义配置主体页面-->
            <div>
              <!--主机规格选择-->
              <div style="padding-bottom: 20px;border-bottom: 1px solid #EDEDED;margin-top: 20px">
                <h2>数据库版本类型</h2>
                <!--镜像选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">镜像系统</p>
                    </div>
                    <div>
                      <!--自定义镜像 列表-->
                      <div>
                        <Dropdown v-for="(item,index) in PdataInfo.publicList"
                                  style="margin-right:10px;margin-bottom:20px;"
                                  @on-click="setDataOS" :key="item.templateid">
                          <div
                            style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                            {{item.selectSystem||item.system}}
                          </div>
                          <Dropdown-menu slot="list">
                            <Dropdown-item v-for="system in item.systemList" :key="system.ostypeid"
                                           :name="`${system.dbname}#${system.systemtemplateid}#${index}#${system.dbloginname}`"
                                           style="white-space: pre-wrap;display:block;">
                              <span>{{system.dbname}}</span>
                            </Dropdown-item>
                          </Dropdown-menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 核心数选择 -->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">核心数</p>
                    </div>
                    <div v-for="item in PecsInfo.info" v-if="item.zoneId === PecsInfo.zone.zoneid">
                      <div v-for="cpu in item.kernelList" :key="cpu.value" class="zoneItem"
                           :class="{zoneSelect:PdataInfo.vmConfig.kernel==cpu.value}"
                           @click="changeKernel(cpu,'PdataInfo')">{{cpu.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 内存选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">内存</p>
                    </div>
                    <div>
                      <div v-for="item in PdataInfo.RAMList" :key="item.value" class="zoneItem"
                           :class="{zoneSelect:PdataInfo.vmConfig.RAM==item.value}"
                           @click="PdataInfo.vmConfig.RAM=item.value">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!--自定义主机价格-->
                <div class="item-wrapper" style="margin-top: 28px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PdataInfo.vmConfig.cost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>

              <!--主机网络与带宽-->
              <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
                <h2>网络与带宽</h2>
                <!--虚拟私有云-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
                    </div>
                    <div>
                      <Select v-model="PecsInfo.vpc" style="width:200px">
                        <Option v-for="item in PecsInfo.vpcList" :key="item.vpcid" :value="item.vpcid">
                          {{item.vpcname}}
                        </Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
                  如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span style="color: rgb(42, 153, 242);cursor: pointer"
                                                               @click="$router.push('vpc')">控制台新建。</span></p>
                <!--网卡选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">网卡</p>
                    </div>
                    <div>
                      <Select v-model="PecsInfo.network" style="width:200px">
                        <Option v-for="item in PecsInfo.networkList" :key="item.ipsegmentid" :value="item.ipsegmentid">
                          {{item.name}}
                        </Option>
                      </Select>
                    </div>
                  </div>
                </div>

                <!--是否需要公网IP-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 6px;">公网IP</p>
                    </div>
                    <div style="margin-top: 4px;">
                      <Checkbox v-model="PdataInfo.IPConfig.publicIP" size="large">购买公网IP</Checkbox>
                    </div>
                  </div>
                </div>
                <!--如果需要公网IP，请选择公网IP带宽-->
                <div class="item-wrapper" v-show="PdataInfo.IPConfig.publicIP">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">带宽</p>
                    </div>
                    <div style="width:500px;display: flex;align-items:center">
                      <i-slider
                        v-model="PdataInfo.IPConfig.bandWidth"
                        unit="MB"
                        :min=1
                        :max=100
                        :step=1
                        :points="[20,50]"
                        style="margin-right:30px;vertical-align: middle;">
                      </i-slider>
                      <InputNumber :max="100" :min="1" v-model="PdataInfo.IPConfig.bandWidth"
                                   size="large"></InputNumber>
                    </div>
                  </div>
                </div>
                <!-- 防火墙选择 -->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">防火墙</p>
                    </div>
                    <div>
                      <p
                        style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:25px; border: 1px solid #D9D9D9;padding: 5px 25px;">
                        默认设置
                      </p>
                    </div>
                  </div>
                  <p
                    style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-top: 10px;margin-left: 90px;line-height: 1.5;">
                    默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。<span style="color: #377DFF;cursor: pointer"
                                                                        @click="$router.push('firewall')">如何修改</span>
                  </p>
                </div>
                <!--公网IP价格-->
                <div class="item-wrapper" style="margin-top: 28px;" v-show="PdataInfo.IPConfig.publicIP">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PdataInfo.IPConfig.cost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>

              <!--云硬盘-->
              <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
                <h2>云硬盘</h2>
                <!--虚拟私有云-->
                <div v-for="(disk,index) in PdataInfo.dataDiskList">
                  <div class="item-wrapper">
                    <div style="display: flex">
                      <div>
                        <p class="item-title" style="margin-top: 7px;">类型</p>
                      </div>
                      <div>
                        <div v-for="item in PdataInfo.dataDiskType" :key="item.value" class="zoneItem"
                             :class="{zoneSelect:disk.type==item.value}"
                             @click="disk.type=item.value">{{item.label}}
                        </div>
                      </div>
                      <img src="../../assets/img/buy/across.png" @click="removeHostDisk(index)"
                           style="cursor: pointer;height:11px;">
                    </div>
                  </div>
                  <div class="item-wrapper">
                    <div style="display: flex">
                      <div>
                        <p class="item-title" style="">容量</p>
                      </div>
                      <div style="width:500px;display: flex;align-items:center">
                        <i-slider
                          v-model="disk.size"
                          unit="GB"
                          :min=20
                          :max=1000
                          :step=10
                          :points="[500,800]"
                          style="margin-right:30px;vertical-align: middle;">
                        </i-slider>
                        <InputNumber :max="1000" :min="20" v-model="disk.size" size="large" :step=10
                                     @on-blur="changeDiskSize(index,disk.size)"
                                     @on-focus="changeDiskSize(index,disk.size)"></InputNumber>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item-wrapper" v-if="remainDisk>0" style="margin-top: 10px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title"></p>
                    </div>
                    <div>
                      <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk('PdataInfo')">添加数据盘</span>
                        您还可以添加{{remainDiskData}}块数据盘</p>
                    </div>
                  </div>
                </div>
                <!--数据盘价格-->
                <div class="item-wrapper" style="margin-top: 28px;">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top:0px;">价格</p>
                    </div>
                    <div>
                      <p style="font-size: 16px;color: #F85E1D;">{{PdataInfo.dataDiskCost.toFixed(2)}}元</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--登录设置-->
            <div style="margin-top: 20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px">
              <h2>登录设置</h2>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title">数据库账号</p>
                  </div>
                  <span
                    style="padding: 10px 0px; font-size: 14px; color: rgb(102, 102, 102);">{{PdataInfo.account}}</span>
                </div>
              </div>

              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 8px">数据库密码</p>
                  </div>
                  <Input v-model="PdataInfo.password" placeholder="请输入至少6位仅包含字母大小写与数字的密码" style="width: 300px"
                         @on-change="PdataInfo.passwordWarning=''"></Input>
                  <span style="line-height: 32px;color:red;margin-left:10px">{{PdataInfo.passwordWarning}}</span>
                </div>
              </div>

              <!--是否自动续费-->
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 4px">自动续费</p>
                  </div>
                  <i-switch v-model="PdataInfo.autoRenewal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                  </i-switch>
                  <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
                </div>
              </div>
            </div>
            <!--费用、以及加入预算清单-->
            <div style="margin-top: 20px">
              <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
                 @click="$router.push('document')">查看计价详情</p>
              <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
                费用：<span
                style="font-size: 24px;color: #EE6723;">{{totalDataCost.toFixed(2)}}元</span><span
                v-show="PdataInfo.timeForm.currentTimeType == 'current'">/小时</span>
              </p>
              <p v-if="totalDataCoupon!=0" style="text-align: right;font-size: 14px;color: #666666;">
                优惠费用：<span
                style="font-size: 14px;color: #EE6723;">{{totalDataCoupon.toFixed(2)}}元</span></p>
              <div style="text-align: right;margin-top: 20px;">
                <Button size="large"
                        class="btn" @click="addDataCart">
                  加入预算清单
                </Button>
                <Button @click="buyData" type="primary"
                        style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
                  立即购买
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div id="list">
          <div ref="list"
               style="padding:30px 30px 0 30px;background-color: #ffffff;max-height: 1050px;overflow-y: auto">
            <p
              style="font-size: 24px;color: #333333;line-height: 43px;text-align: center;border-bottom: 1px solid #D9D9D9; padding-bottom: 30px;">
              价格预算清单</p>
            <div v-for="(prod,index) in cart" ref="detailed" style="padding-top: 20px">
              <div style="display: flex;justify-content: space-between;">
                <h2 style="width:70px;text-align: right;font-size: 18px;color: #333333;line-height: 32px;">
                  {{prod.typeName}}</h2>
                <p
                  style="cursor: pointer;font-family: Microsoft YaHei;font-size: 14px;color: #2A99F2; line-height: 25px;"
                  @click="delDetailed(index)">删除</p>
              </div>
              <!--主机清单字段-->
              <div v-if="prod.type=='Pecs'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="hidden">$</span><span class="title">区域</span><span class="hidden">#</span>{{prod.zone.zonename}}
                </p>

                <p class="item">
                  <span class="hidden">$</span><span class="title">计费模式</span><span class="hidden">#</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月`:'实时计费'}}
                </p>
                <p class="item" v-if="prod.timeForm.currentTimeType=='annual'">
                  <span class="hidden">$</span><span class="title">购买时长</span><span
                  class="hidden">#</span>{{prod.timeForm.currentTimeValue.label}}
                </p>
                <!--镜像+应用-->
                <p class="item" v-if="prod.currentType=='app'">
                  <span class="hidden">$</span><span class="title">镜像</span><span
                  class="hidden">#</span>{{prod.currentApp.templatename}}
                </p>
                <!--公共镜像-->
                <p class="item" v-if="prod.currentType=='public'">
                  <span class="hidden">$</span>
                  <span class="title">镜像</span><span
                  class="hidden">#</span>{{prod.system.systemName}}
                </p>
                <!--自定义镜像-->
                <p class="item" v-if="prod.currentType=='custom'">
                  <span class="hidden">$</span><span class="title">镜像</span><span
                  class="hidden">#</span>{{prod.customMirror.templatename}}
                </p>
                <!--快速配置-->
                <div v-if="prod.createType=='fast'">
                  <p class="item" v-if="prod.publicIP"><span class="hidden">$</span><span class="title">配置</span><span
                    class="hidden">#</span>{{`${prod.currentSystem.kernel}核${prod.currentSystem.RAM}G、${prod.currentSystem.bandWidth}带宽、${prod.currentSystem.diskSize}G系统盘`}}
                  </p>
                  <p class="item" v-if="prod.publicIP==false"><span class="hidden">$</span><span class="title">配置</span><span
                    class="hidden">#</span>{{`${prod.currentSystem.kernel}核${prod.currentSystem.RAM}G、${prod.currentSystem.diskSize}G系统盘`}}
                  </p>
                </div>
                <!--自定义配置-->
                <div v-if="prod.createType=='custom'">
                  <p class="item" v-if="prod.IPConfig.publicIP">
                    <span class="hidden">$</span>
                    <span class="title">配置</span><span
                    class="hidden">#</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.IPConfig.bandWidth}M带宽、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <p class="item" v-else><span class="title">配置</span><span class="hidden">#</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <!--快速创建没有数据盘，只有自定义配置包含硬盘-->
                  <p class="item" v-for="disk in prod.dataDiskList">
                    <span class="hidden">$</span>
                    <span class="title">硬盘</span><span
                    class="hidden">#</span>{{disk.size+disk.label}}
                  </p>
                </div>

                <p class="item" v-if="prod.createType=='fast'" style="margin-top: 10px">
                  <span class="hidden">$</span>
                  <span class="title" style="vertical-align: middle">价格</span>
                  <span class="hidden">#</span>
                  <span style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{prod.cost.toFixed(2)}}元</span>
                <ul style="float: right;font-size: 14px;user-select: none">
                  <span class="numberAdd" v-if="prod.count == 1">-</span>
                  <span class="numberAdd" style="cursor: pointer"
                        @click="prod.count -= 1,prod.cost = PecsInfo.cost * prod.count" v-else>-</span>
                  <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                  <span class="numberMinus" v-if="prod.count == 5">+</span>
                  <span class="numberMinus" style="cursor: pointer"
                        @click="prod.count += 1,prod.cost = PecsInfo.cost * prod.count" v-else>+</span></ul>
                </p>
                <p class="item" v-if="prod.createType=='custom'" style="margin-top: 10px;">
                  <span class="hidden">$</span>
                  <span class="title" style="vertical-align: middle">价格</span>
                  <span class="hidden">#</span><span
                  style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{prod.customCost.toFixed(2)}}元</span>
                <ul style="float: right;font-size: 14px;user-select: none">
                  <span class="numberAdd" v-if="prod.count == 1">-</span>
                  <span class="numberAdd" style="cursor: pointer"
                        @click="prod.count -= 1,prod.customCost = totalCost * prod.count" v-else>-</span>
                  <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                  <span class="numberMinus" v-if="prod.count == 5">+</span>
                  <span class="numberMinus" style="cursor: pointer"
                        @click="prod.count += 1,prod.customCost = totalCost * prod.count" v-else>+</span></ul>
                </p>
              </div>
              <!--磁盘清单字段-->
              <div v-if="prod.type=='Pdisk'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="hidden">$</span><span class="title">区域</span><span class="hidden">#</span>{{prod.zone.zonename}}
                </p>
                <p class="item">
                  <span class="hidden">$</span><span class="title">计费模式</span><span class="hidden">#</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月`:'实时计费'}}
                </p>
                <p class="item"><span class="hidden">$</span><span class="title">购买时长</span><span
                  class="hidden">#</span>{{prod.timeForm.currentTimeValue.label}}
                </p>
                <p class="item" v-for="disk in prod.dataDiskList">
                  <span class="hidden">$</span>
                  <span class="title">硬盘</span><span class="hidden">#</span>{{disk.size}}G{{disk.label}}
                </p>
                <p class="item" style="margin-top: 10px"><span class="hidden">$</span><span class="title"
                                                                                            style="vertical-align: middle">价格</span>
                  <span class="hidden">#</span>
                  <span
                    style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{prod.dataDiskCost.toFixed(2)}}元</span>
                <ul style="float: right;font-size: 14px;user-select: none">
                  <span class="numberAdd" v-if="prod.count == 1">-</span>
                  <span class="numberAdd" style="cursor: pointer"
                        @click="prod.count -= 1,prod.customCost = totalCost * prod.count" v-else>-</span>
                  <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                  <span class="numberMinus" v-if="prod.count == 5">+</span>
                  <span class="numberMinus" style="cursor: pointer"
                        @click="prod.count += 1,prod.customCost = totalCost * prod.count" v-else>+</span></ul>
                </p>
              </div>

              <!--公网IP清单字段-->
              <div v-if="prod.type=='Peip'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="hidden">$</span><span class="title">区域</span><span class="hidden">#</span>{{prod.zone.zonename}}
                </p>
                <p class="item">
                  <span class="hidden">$</span><span class="title">计费模式</span><span class="hidden">#</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月`:'实时计费'}}
                </p>
                <p class="item"><span class="hidden">$</span><span class="title">购买时长</span><span
                  class="hidden">#</span>{{prod.timeForm.currentTimeValue.label}}
                </p>
                <p class="item">
                  <span class="hidden">$</span>
                  <span class="title">带宽</span><span class="hidden">#</span>{{prod.bandWidth}}
                </p>
                <p class="item" style="margin-top: 10px">
                  <span class="hidden">$</span>
                  <span class="title" style="vertical-align: middle">价格</span>
                  <span class="hidden">#</span>
                  <span style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{prod.cost.toFixed(2)}}元</span>
                <ul style="float: right;font-size: 14px;user-select: none">
                  <span class="numberAdd" v-if="prod.count == 1">-</span>
                  <span class="numberAdd" style="cursor: pointer"
                        @click="prod.count -= 1,prod.cost = PeipInfo.cost * prod.count" v-else>-</span>
                  <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                  <span class="numberMinus" v-if="prod.count == 5">+</span>
                  <span class="numberMinus" style="cursor: pointer"
                        @click="prod.count += 1,prod.cost = PeipInfo.cost * prod.count" v-else>+</span></ul>
                </p>
              </div>

              <!--磁盘清单字段-->
              <div v-if="prod.type=='Pdata'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="hidden">$</span><span class="title">区域</span><span class="hidden">#</span>{{prod.zone.zonename}}
                </p>
                <p class="item">
                  <span class="hidden">$</span><span class="title">计费模式</span><span class="hidden">#</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月`:'实时计费'}}
                </p>
                <p class="item"><span class="hidden">$</span><span class="title">购买时长</span><span
                  class="hidden">#</span>{{prod.timeForm.currentTimeValue.label}}
                </p>
                <p class="item">
                  <span class="hidden">$</span><span class="title">镜像</span><span
                  class="hidden">#</span>{{prod.system.systemName}}
                </p>
                <p class="item" v-if="prod.IPConfig.publicIP">
                  <span class="hidden">$</span>
                  <span class="title">带宽</span><span class="hidden">#</span>{{prod.IPConfig.bandWidth}}
                </p>
                <p class="item" v-for="disk in prod.dataDiskList">
                  <span class="hidden">$</span>
                  <span class="title">硬盘</span><span class="hidden">#</span>{{disk.size}}G{{disk.label}}
                </p>
                <p class="item" style="margin-top: 10px"><span class="hidden">$</span><span class="title"
                                                                                            style="vertical-align: middle">价格</span>
                  <span class="hidden">#</span>
                  <span
                    style="font-size: 24px;color: #F85E1D;vertical-align: middle;user-select: none;">{{prod.dataDiskCost.toFixed(2)}}元</span>
                <ul style="float: right;font-size: 14px;user-select: none">
                  <span class="numberAdd" v-if="prod.count == 1">-</span>
                  <span class="numberAdd" style="cursor: pointer"
                        @click="prod.count -= 1,prod.customCost = totalCost * prod.count" v-else>-</span>
                  <span style="border: 1px solid #D9D9D9;padding: 4px 15px">{{prod.count}}</span>
                  <span class="numberMinus" v-if="prod.count == 5">+</span>
                  <span class="numberMinus" style="cursor: pointer"
                        @click="prod.count += 1,prod.customCost = totalCost * prod.count" v-else>+</span></ul>
                </p>
              </div>
            </div>
          </div>
          <div
            style="padding:30px 40px;box-shadow: 0 2px 14px 0 rgba(193,193,193,0.30);background-color: #ffffff;width:380px;"
            ref="buyDiv">
            <p
              style="font-size: 14px;margin:10px 0px;vertical-align:middle;color: #666666;line-height: 25px;text-align: center">
              总计：<span class="hidden">#</span><span
              style="font-size: 24px;color: #F85E1D;line-height: 25px;vertical-align: middle;margin-left:10px;user-select: none;">{{billListCost.toFixed(2)}}元</span>
            </p>
            <button @click="buyNow"
                    style="display:block;width:300px;margin-bottom: 10px;cursor: pointer;outline: none;padding: 10px 38px; border: 1px solid #2A99F2;border-radius: 10px;background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);border-radius: 10px;font-size: 16px;color: #FFF;">
              立即购买
            </button>
            <button class="buyButton" style="display:block;width:300px;" @click="exportXLSX">导出预算清单</button>
            <p style="font-size: 12px;color: #333333;margin:20px 0px 10px;">如有需要请联系客服，或者致电：010-82527988</p>
            <p style="font-size: 12px;color: #999999;line-height: 21px;">关闭该页面后系统不会保存清单内容，如您需要请及时导出清单。</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showModal.login" width="420" class="login-modal" :scrollable="true">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="body">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="text" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit" onfocus="this.type='password'">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import XLSX from 'xlsx'
  import XLSX_SAVE from 'file-saver'
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  import regExp from '../../util/regExp'
  import uuid from 'uuid'

  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码'
    },
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
  var debounce = require('throttle-debounce/debounce')

  // xlsx 文件输出操作方法
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path == '/ruicloud/Pdisk') {
          vm.product.currentProduct = 'Pdisk'
        } else if (from.path == '/ruicloud/Peip') {
          vm.product.currentProduct = 'Peip'
        } else {
          vm.product.currentProduct = 'Pecs'
        }
        if (sessionStorage.getItem('pane')) {
          switch (sessionStorage.getItem('pane')) {
            case '':
              break
            case 'Pecs':
              vm.product.currentProduct = 'Pecs'
              break
            case 'Pdisk':
              vm.product.currentProduct = 'Pdisk'
              break
            case 'Peip':
              vm.product.currentProduct = 'Peip'
              break
            case 'Pdatabase':
              vm.product.currentProduct = 'Pdata'
              break
          }
          sessionStorage.removeItem('pane')
        }
      })
    },
    data() {
      var zone = null
      $store.state.zoneList.forEach(item => {
        if (item.isdefault === 1
        ) {
          zone = item
        }
      })
      var cart = []
      if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'))
      }

      return {
        popList: ['1', '2', '3'],
        // 当前可以创建的剩余资源数
        remainCount: {},
        // 登录Modal需要的数据
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
        },
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          }
        },
        imgSrc: 'user/getKaptchaImage.do',
        showModal: {
          login: false
        },
        // 产品类型及选中类型
        product: {
          currentProduct: 'Pecs',
          productList: [{label: '云主机', value: 'Pecs'}, {label: '云硬盘', value: 'Pdisk'}, {
            label: '公网IP',
            value: 'Peip'
          }, /*{label: '数据库', value: 'Pdata'}*/]
        },
        // 云主机信息对象
        PecsInfo: {
          zone,

          // 配置类型
          createType: 'fast',
          createTypeList: [{label: '快速配置', value: 'fast'}, {label: '自定义配置', value: 'custom'}],

          // 计费方式
          timeType: [{label: '包年包月', value: 'annual'}, {label: '实时计费', value: 'current'}],
          timeValue: [
            {label: '1月', value: '1', type: 'month'},
            {label: '2月', value: '2', type: 'month'},
            {label: '3月', value: '3', type: 'month'},
            {label: '4月', value: '4', type: 'month'},
            {label: '5月', value: '5', type: 'month'},
            {label: '6月', value: '6', type: 'month'},
            {label: '7月', value: '7', type: 'month'},
            {label: '8月', value: '8', type: 'month'},
            {label: '9月', value: '9', type: 'month'},
            {label: '10月', value: '10', type: 'month'},
            {label: '1年', value: '1', type: 'year'},
            {label: '2年', value: '2', type: 'year'},
            {label: '3年', value: '3', type: 'year'}
          ],
          timeForm: {
            currentTimeType: 'annual',
            currentTimeValue: {label: '1月', value: '1', type: 'month'}
          },
          // 镜像
          mirrorType: [
            /*{label: '镜像+应用', value: 'app'},*/
            {label: '公共镜像', value: 'public'},
            {label: '自定义镜像', value: 'custom'}
          ],
          currentType: 'public',
          // 镜像+应用 列表
          appList: [],
          currentApp: {},

          // 公共镜像 列表
          publicList: [
            {system: 'Windows', systemList: [], selectSystem: ''},
            {system: 'Centos', systemList: [], selectSystem: ''},
            {system: 'Ubuntu', systemList: [], selectSystem: ''},
            {system: 'Debian', systemList: [], selectSystem: ''}
          ],
          // 自定义镜像 列表
          customList: [],
          customMirror: {},
          // 选中的镜像
          system: {},

          // 快速创建主机是否需要公网IP
          publicIP: true,

          // 系统配置 需要购买公网ip时
          systemConfig: [
            {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
            {kernel: '2', RAM: '4', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
            {kernel: '4', RAM: '4', bandWidth: '2', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'},
            {kernel: '4', RAM: '8', bandWidth: '2', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'}
          ],
          // 系统配置 不需要购买公网ip时
          systemConfigNoNet: [
            {kernel: '1', RAM: '1', bandWidth: '0', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
            {kernel: '2', RAM: '4', bandWidth: '0', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
            {kernel: '4', RAM: '4', bandWidth: '0', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'},
            {kernel: '4', RAM: '8', bandWidth: '0', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'}
          ],
          // 选中的系统配置
          currentSystem: {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},

          // 两种登录设置  默认设置/自定义设置
          loginType: [{type: 'default', label: '默认设置'}, {type: 'custom', label: '自定义设置'}],
          currentLoginType: 'default',

          safe: 'default',

          autoRenewal: false,
          // 主机名称
          computerName: '',
          // 主机名称提示信息
          computerNameWarning: '',
          // 登录密码
          password: '',
          // 登录密码提示信息
          passwordWarning: '',

          // 下面是自定义配置的数据
          // 主机类型
          vmTypeList: [
            {label: '标准型', value: 'standard', content: '经典1：2与1：4配比，实现计算、网络与资源的良好平衡，高性价比。'},
            {label: '内存优化型', value: 'optimization', content: '内存优化型系统内存比例更高的实例，最高可达1：16，适用于对内存要求较高，数据量大的产品。'},
            {label: '高I/O型', value: 'IO', content: '高I/O型提供更稳定，具备更高数据吞吐速度与读写速度的主机，适用于高吞吐量场景，如科学计算。'}
          ],
          vmType: 'standard',

          // 系统磁盘类型选择
          diskTypeList: [
            {label: 'SAS存储', value: 'sas'},
            {label: 'SSD存储', value: 'ssd'}
          ],
          // 购买主机地区、核心数、内存关联配置，用于选择
          info: [
            {
              zoneId: '39a6af0b-6624-4194-b9d5-0c552d903858',
              zoneName: '北京一区（测试）',
              kernelList: [
                {
                  label: '1核',
                  value: 1,
                  RAMList: [
                    {label: '1G', value: 1},
                    {label: '2G', value: 2},
                    {label: '4G', value: 4},
                    {label: '8G', value: 8}
                  ]
                },
                {
                  label: '2核',
                  value: 2,
                  RAMList: [
                    {label: '2G', value: 2},
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '16G', value: 16}
                  ]
                },
                {
                  label: '4核',
                  value: 4,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '8核',
                  value: 8,
                  RAMList: [
                    {label: '8G', value: 8},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32},
                    {label: '64G', value: 64}
                  ]
                },
                {
                  label: '16核',
                  value: 16,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '32G', value: 32},
                    {label: '64G', value: 64},
                    {label: '128G', value: 128}
                  ]
                },
                {
                  label: '32核',
                  value: 32,
                  RAMList: [
                    {label: '64G', value: 64},
                    {label: '128G', value: 128}
                  ]
                },
                {
                  label: '64核',
                  value: 64,
                  RAMList: [
                    {label: '128G', value: 128},
                    {label: '256G', value: 256},
                  ]
                }
              ],
            },
            {
              zoneId: '1ce0d0b9-a964-432f-8078-a61100789e30',
              zoneName: '北方二区(沈阳)',
              kernelList: [
                {
                  label: '1核',
                  value: 1,
                  RAMList: [
                    {label: '1G', value: 1},
                    {label: '2G', value: 2},
                    {label: '4G', value: 4},
                    {label: '8G', value: 8}
                  ]
                },
                {
                  label: '2核',
                  value: 2,
                  RAMList: [
                    {label: '2G', value: 2},
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '16G', value: 16}
                  ]
                },
                {
                  label: '4核',
                  value: 4,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '8核',
                  value: 8,
                  RAMList: [
                    {label: '8G', value: 8},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32},
                    {label: '64G', value: 64}
                  ]
                },
                {
                  label: '16核',
                  value: 16,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '32G', value: 32},
                    {label: '64G', value: 64},
                    {label: '128G', value: 128}
                  ]
                },
                {
                  label: '32核',
                  value: 32,
                  RAMList: [
                    {label: '64G', value: 64},
                    {label: '128G', value: 128}
                  ]
                },
                {
                  label: '64核',
                  value: 64,
                  RAMList: [
                    {label: '128G', value: 128},
                    {label: '256G', value: 256},
                  ]
                }
              ],
            },
            {
              zoneId: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d',
              zoneName: '北方一区',
              kernelList: [
                {
                  label: '1核',
                  value: 1,
                  RAMList: [
                    {label: '1G', value: 1},
                    {label: '2G', value: 2},
                    {label: '4G', value: 4}
                  ]
                },
                {
                  label: '2核',
                  value: 2,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '12G', value: 12},
                  ]
                },
                {
                  label: '4核',
                  value: 4,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '12G', value: 12},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '8核',
                  value: 8,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '24G', value: 24},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '16核',
                  value: 16,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '24G', value: 24},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '32核',
                  value: 32,
                  RAMList: [
                    {label: '32G', value: 32}
                  ]
                }
              ],
            },
            {
              zoneId: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c',
              zoneName: '华中一区',
              kernelList: [
                {
                  label: '1核',
                  value: 1,
                  RAMList: [
                    {label: '1G', value: 1},
                    {label: '2G', value: 2},
                    {label: '4G', value: 4}
                  ]
                },
                {
                  label: '2核',
                  value: 2,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '12G', value: 12},
                  ]
                },
                {
                  label: '4核',
                  value: 4,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '12G', value: 12},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '8核',
                  value: 8,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '24G', value: 24},
                    {label: '32G', value: 32},
                  ]
                },
                {
                  label: '16核',
                  value: 16,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '24G', value: 24},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '32核',
                  value: 32,
                  RAMList: [
                    {label: '32G', value: 32}
                  ]
                }
              ],
            },
            {
              zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
              zoneName: '华中二区',
              kernelList: [
                {
                  label: '1核',
                  value: 1,
                  RAMList: [
                    {label: '1G', value: 1},
                    {label: '2G', value: 2},
                    {label: '4G', value: 4}
                  ]
                },
                {
                  label: '2核',
                  value: 2,
                  RAMList: [
                    {label: '2G', value: 2},
                    {label: '4G', value: 4},
                    {label: '8G', value: 8}
                  ]
                },
                {
                  label: '4核',
                  value: 4,
                  RAMList: [
                    {label: '4G', value: 4},
                    {label: '8G', value: 8},
                    {label: '16G', value: 16}
                  ]
                },
                {
                  label: '8核',
                  value: 8,
                  RAMList: [
                    {label: '8G', value: 8},
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '16核',
                  value: 16,
                  RAMList: [
                    {label: '16G', value: 16},
                    {label: '32G', value: 32}
                  ]
                },
                {
                  label: '32核',
                  value: 32,
                  RAMList: [
                    {label: '32G', value: 32}
                  ]
                }
              ],
            }
          ],
          // 主机RAM内存配置用于ajax请求
          RAMList: [
            {label: '1G', value: 1},
            {label: '2G', value: 2},
            {label: '4G', value: 4},
            {label: '8G', value: 8}
          ],
          // 自定义主机配置
          vmConfig: {
            diskType: 'sas',
            kernel: 1,
            RAM: 1,
            diskSize: 40,
            cost: 0,
            coupon: 0
          },
          // 虚拟私有云列表
          vpcList: [],
          vpc: '',
          // vpc下所有子网
          networkList: [],
          network: '',
          // 自定义公网IP配置
          IPConfig: {
            // 是否需要公网IP
            publicIP: true,
            // 带宽大小
            bandWidth: 1,
            cost: 0,
            coupon: 0
          },

          // 云硬盘（数据盘）
          dataDiskType: [
            {label: 'SATA存储', value: 'sata'},
            {label: 'SAS存储', value: 'sas'},
            {label: 'SSD存储', value: 'ssd'}
          ],
          // 添加购买的数据盘
          dataDiskList: [
            {type: 'ssd', size: 20, label: 'SSD存储'}
          ],
          dataDiskCost: 0,
          // 磁盘优惠价
          coupon: 0,
          // 快速创建价格计算花费
          cost: 0,
          // 快速创建优惠价格
          fastCoupon: 0
        },
        // 云硬盘信息对象
        PdiskInfo: {
          zone,
          // 计费方式
          timeForm: {
            currentTimeType: 'annual',
            currentTimeValue: {label: '1月', value: '1', type: 'month'}
          },

          // 云硬盘（数据盘）
          dataDiskType: [
            {label: 'SATA存储', value: 'sata'},
            {label: 'SAS存储', value: 'sas'},
            {label: 'SSD存储', value: 'ssd'}
          ],
          // 添加购买的数据盘
          dataDiskList: [
            {type: 'ssd', size: 20, label: 'SSD存储'}
          ],
          diskName: '',
          // 自动续费
          autoRenewal: true,
          dataDiskCost: 0,
          coupon: 0
        },
        // 公网IP
        PeipInfo: {
          zone,
          // 计费方式
          timeForm: {
            currentTimeType: 'annual',
            currentTimeValue: {label: '1月', value: '1', type: 'month'}
          },

          // 虚拟私有云列表
          vpcList: [],
          vpc: '',
          // 带宽大小
          bandWidth: 1,
          // 自动续费
          autoRenewal: true,
          // 花费
          cost: 0,
          coupon: 0
        },
        // 数据库
        PdataInfo: {
          zone,
          // 计费方式
          timeForm: {
            currentTimeType: 'annual',
            currentTimeValue: {label: '1月', value: '1', type: 'month'}
          },
          // 数据库镜像列表
          dataList: [
            {system: 'Mysql', systemList: [], selectSystem: ''},
            {system: 'SqlServer', systemList: [], selectSystem: ''},
            {system: 'MangoDB', systemList: [], selectSystem: ''},
            {system: 'PostGres', systemList: [], selectSystem: ''}
          ],
          vmConfig: {
            diskType: 'sas',
            kernel: 1,
            RAM: 1,
            diskSize: 40,
            cost: 0,
            coupon: 0
          },
          RAMList: [
            {label: '1G', value: 1},
            {label: '2G', value: 2},
            {label: '4G', value: 4},
            {label: '8G', value: 8}
          ],

          // 公共镜像 列表
          publicList: [
            {system: 'mongo', systemList: [], selectSystem: ''},
            {system: 'mysql', systemList: [], selectSystem: ''},
            {system: 'postgresql', systemList: [], selectSystem: ''},
            {system: 'redis', systemList: [], selectSystem: ''}
          ],

          // 选中的镜像
          system: {},

          // 快速创建主机是否需要公网IP
          publicIP: true,

          // 两种登录设置  默认设置/自定义设置
          loginType: [{type: 'default', label: '默认设置'}, {type: 'custom', label: '自定义设置'}],
          currentLoginType: 'default',

          safe: 'default',

          autoRenewal: false,
          // 主机名称
          password: '',
          // 主机名称提示信息
          passwordWarning: '',

          // 系统磁盘类型选择
          diskTypeList: [
            {label: 'SAS存储', value: 'sas'},
            {label: 'SSD存储', value: 'ssd'}
          ],
          // 虚拟私有云列表
          vpc: '',
          // vpc下所有子网
          network: '',
          // 自定义公网IP配置
          IPConfig: {
            // 是否需要公网IP
            publicIP: true,
            // 带宽大小
            bandWidth: 1,
            cost: 0,
            coupon: 0
          },

          // 云硬盘（数据盘）
          dataDiskType: [
            {label: 'SATA存储', value: 'sata'},
            {label: 'SAS存储', value: 'sas'},
            {label: 'SSD存储', value: 'ssd'}
          ],
          // 添加购买的数据盘
          dataDiskList: [
            {type: 'ssd', size: 20, label: 'SSD存储'}
          ],
          dataDiskCost: 0,
          // 磁盘优惠价
          coupon: 0,
          // 快速创建价格计算花费
          cost: 0,
          // 快速创建优惠价格
          fastCoupon: 0,
          // 数据库帐号
          account: ''
        },
        // 系统用户名
        systemUsername: '',
        // 购物车
        cart,
        scrollFun: () => {
          if (window.innerHeight - this.$refs.list.getBoundingClientRect().bottom < 246
          ) {
            this.$refs.buyDiv.style.position = 'fixed'
            this.$refs.buyDiv.style.bottom = 0
          }
          else {
            this.$refs.buyDiv.style.position = 'unset'
          }
        }
      }
    },
    created() {
      if (this.$store.state.userInfo && this.$store.state.userInfo.personalauth != 0 && this.$store.state.userInfo.companyauth != 0) {
        this.$Message.info('当前账户尚未认证通过，创建的主机无法操作');
      }
      scrollTo(0, 0)
      window.addEventListener('scroll', this.scrollFun)
      /*// 自定义主机所在的vpc列表
       axios.get('network/listVpc.do', {
       params: {
       zoneId: this.PecsInfo.zone.zoneid
       }
       }).then(response => {
       this.PecsInfo.vpcList = response.data.result
       this.PeipInfo.vpcList = response.data.result
       })*/
      this.queryRemainCount()
      this.queryQuick()
      this.queryCustomVM()
      this.queryDiskPrice()
      this.queryIPPrice()
      this.queryDiskPriceInDisk()
      this.queryVpc()
      this.queryIPVpc()
      this.setTemplate()
      this.listDbTemplates()
      this.ownMirrorList()
      this.queryIPPriceInIP()
      this.queryIPPriceInData()
      this.queryDiskPriceInData()
      this.queryCustomVMInData()
      /* 自定义镜像生成主机 页面跳转  页面赋值 */
      if (this.$route.query.mirror) {
        this.PecsInfo.zone.zoneid = this.$route.query.zoneid
        this.PecsInfo.currentType = this.$route.query.mirrorType
      }
    },
    methods: {
      queryRemainCount() {
        axios.get('user/getRemainCount.do', {
          params: {
            zoneId: this[`${this.product.currentProduct}Info`].zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.remainCount.hostCount = response.data.result.computer
            this.remainCount.diskCount = response.data.result.disk
            this.remainCount.publicIpCount = response.data.result.publicIp
          }
        })
      },
      // 设置镜像数据
      setTemplate() {
        axios.get('information/getSoftTempList.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            /* var len = response.data.result.length
             if ( len != 0) {
             response.data.result[0].src = '../../assets/img/buy/across.png'
             response.data.result[1].src = '../../assets/img/buy/across.png'
             response.data.result[2].src = '../../assets/img/buy/across.png'
             }*/
            this.PecsInfo.appList = response.data.result
            this.PecsInfo.currentApp = response.data.result[0] || {}
          }
        })
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid,
            // 0代表系统镜像
            user: '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.PecsInfo.publicList[0].systemList = response.data.result.window
            this.PecsInfo.publicList[1].systemList = response.data.result.centos
            this.PecsInfo.publicList[2].systemList = response.data.result.ubuntu
            this.PecsInfo.publicList[3].systemList = response.data.result.debian
            this.PecsInfo.system = {}
          }
        })
      },
      listDbTemplates(){
        axios.get('database/listDbTemplates.do', {
          params: {
            zoneId: this.PdataInfo.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.PdataInfo.publicList[0].systemList = response.data.result.mongo
            this.PdataInfo.publicList[1].systemList = response.data.result.mysql
            this.PdataInfo.publicList[2].systemList = response.data.result.postgresql
            this.PdataInfo.publicList[3].systemList = response.data.result.redis
            this.PdataInfo.system = {}
          }
        })
      },
      // 设置自有镜像
      ownMirrorList() {
        if (this.userInfo != null) {
          axios.get('information/listTemplates.do', {
            params: {
              user: '1',
              zoneId: this.PecsInfo.zone.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.PecsInfo.customList = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
            }
          })
          if (!this.$route.query.mirror) {
            this.PecsInfo.customMirror = this.PecsInfo.customList[0] || {}
          } else {
            this.PecsInfo.customMirror = this.$route.query.mirror || {}
            var str = this.$route.query.mirror.ostypename.substr(0, 1)
            if (str === 'W' || str === 'w') {
              this.systemUsername = 'administrator'
            } else {
              this.systemUsername = 'root'
            }
          }
        }
      },
      // 重新选择系统镜像
      setOS(name) {
        var arg = name.split('#')
        for (var item of this.PecsInfo.publicList) {
          item.selectSystem = ''
        }
        this.PecsInfo.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        // 根据镜像名称第一个字符确定系统用户名是admin还是root
        var str = this.PecsInfo.system.systemName.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
        this.PecsInfo.publicList[arg[2]].selectSystem = arg[0]
      },
      setDataOS(name){
        var arg = name.split('#')
        for (var item of this.PdataInfo.publicList) {
          item.selectSystem = ''
        }
        this.PdataInfo.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        this.PdataInfo.account = arg[3]
        this.PdataInfo.publicList[arg[2]].selectSystem = arg[0]
      },
      // 根据选择自定义镜像判断登录名是admin还是root
      setOwnTemplate(item) {
        this.PecsInfo.customMirror = item
        var str = item.ostypename.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
      },
      // 新建公网IP所在vpc
      queryIPVpc() {
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.PeipInfo.zone.zoneid
          }
        }).then(response => {
          this.PeipInfo.vpcList = response.data.result
          this.PeipInfo.vpc = this.PeipInfo.vpcList[0].vpcid
        })
      },
      // 重新查询虚拟私有云（vpc）
      queryVpc() {
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid
          }
        }).then(response => {
          this.PecsInfo.vpcList = response.data.result
          this.PecsInfo.vpc = this.PecsInfo.vpcList[0].vpcid
          this.PdataInfo.vpc = this.PecsInfo.vpcList[0].vpcid
        })
      },
      // 重新查询vpc所属的子网
      changeNetwork() {
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid,
            vpcId: this.PecsInfo.vpc
          }
        }).then(response => {
          this.PecsInfo.networkList = response.data.result
          this.PecsInfo.network = this.PecsInfo.networkList[0].ipsegmentid
          this.PdataInfo.network = this.PecsInfo.networkList[0].ipsegmentid
        })
      },
      // 查询云主机快速配置价格
      queryQuick() {
        var params = {
          cpuNum: this.PecsInfo.currentSystem.kernel,
          diskSize: this.PecsInfo.currentSystem.diskSize,
          diskType: this.PecsInfo.currentSystem.diskType,
          memory: this.PecsInfo.currentSystem.RAM,
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        var ipParams = {
          brand: this.PecsInfo.currentSystem.bandWidth,
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        if (this.PecsInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
          ipParams.timeType = 'current'
        }
        var host = axios.post('device/QueryBillingPrice.do', params)
        var ip = axios.post('device/queryIpPrice.do', ipParams)
        Promise.all([host, ip]).then(response => {
          this.PecsInfo.cost = response[0].data.cost + response[1].data.cost
          if (response[0].data.coupon) {
            this.PecsInfo.fastCoupon = response[0].data.coupon + response[1].data.coupon
          } else {
            this.PecsInfo.fastCoupon = 0
          }
        })
      },
      // 查询自定义主机配置价格  （仅包含主机，因为主机与公网IP是分开计算并显示的）
      queryCustomVM() {
        var params = {
          cpuNum: this.PecsInfo.vmConfig.kernel.toString(),
          diskSize: '40',
          diskType: this.PecsInfo.vmConfig.diskType,
          memory: this.PecsInfo.vmConfig.RAM.toString(),
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        if (this.PecsInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PecsInfo.vmConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.PecsInfo.vmConfig.coupon = response.data.coupon
          } else {
            this.PecsInfo.vmConfig.coupon = 0
          }
        })
      },
      queryCustomVMInData(){
        var params = {
          cpuNum: this.PdataInfo.vmConfig.kernel.toString(),
          // 数据库系统盘默认40G、ssd磁盘
          diskSize: '40',
          diskType: 'ssd',
          memory: this.PdataInfo.vmConfig.RAM.toString(),
          timeType: this.PdataInfo.timeForm.currentTimeValue.type,
          timeValue: this.PdataInfo.timeForm.currentTimeValue.value,
          zoneId: this.PdataInfo.zone.zoneid
        }
        if (this.PdataInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PdataInfo.vmConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.PdataInfo.vmConfig.coupon = response.data.coupon
          } else {
            this.PdataInfo.vmConfig.coupon = 0
          }
        })
      },
      // 三种推荐配置切换
      changeType(type) {
        this.PecsInfo.vmType = type
        switch (type) {
          case 'standard':
            this.PecsInfo.vmConfig.diskType = 'sas'
            this.PecsInfo.vmConfig.kernel = '1'
            this.PecsInfo.vmConfig.RAM = '1'
            break
          case 'optimization':
            this.PecsInfo.vmConfig.diskType = 'ssd'
            this.PecsInfo.vmConfig.kernel = '4'
            this.PecsInfo.vmConfig.RAM = '4'
            break
          case 'IO':
            this.PecsInfo.vmConfig.diskType = 'ssd'
            this.PecsInfo.vmConfig.kernel = '16'
            this.PecsInfo.vmConfig.RAM = '16'
            break
        }
      },
      // 切换核心数
      changeKernel(cpu, type) {
        this[type].vmConfig.kernel = cpu.value
        this[type].RAMList = cpu.RAMList
        this[type].vmConfig.RAM = this[type].RAMList[0].value
      },
      // 查看主机IP价格
      queryIPPrice: debounce(500, function () {
        var params = {
          brand: this.PecsInfo.IPConfig.bandWidth,
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        if (this.PecsInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.PecsInfo.IPConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.PecsInfo.IPConfig.coupon = response.data.coupon
          } else {
            this.PecsInfo.IPConfig.coupon = 0
          }
        })
      }),
      // 查询IP价格
      queryIPPriceInIP: debounce(500, function () {
        var params = {
          brand: this.PeipInfo.bandWidth,
          timeType: this.PeipInfo.timeForm.currentTimeValue.type,
          timeValue: this.PeipInfo.timeForm.currentTimeValue.value,
          zoneId: this.PeipInfo.zone.zoneid
        }
        if (this.PeipInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.PeipInfo.cost = response.data.cost
          if (response.data.coupon) {
            this.PeipInfo.coupon = response.data.coupon
          } else {
            this.PeipInfo.coupon = 0
          }
        })
      }),
      // 查询数据库IP价格
      queryIPPriceInData: debounce(500, function () {
        var params = {
          brand: this.PdataInfo.IPConfig.bandWidth,
          timeType: this.PdataInfo.timeForm.currentTimeValue.type,
          timeValue: this.PdataInfo.timeForm.currentTimeValue.value,
          zoneId: this.PdataInfo.zone.zoneid
        }
        if (this.PdataInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.PdataInfo.IPConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.PdataInfo.IPConfig.coupon = response.data.coupon
          } else {
            this.PdataInfo.IPConfig.coupon = 0
          }
        })
      }),
      // 添加主机数据盘
      pushDisk(type) {
        this[type].dataDiskList.push({type: 'ssd', size: 20, label: 'SSD存储'})
      },
      /* 改变自定义主机页面磁盘容量，查询价格 */
      changeDiskSize(index, value) {
        var params = {
          diskType: this.PecsInfo.dataDiskList[index].diskType,
          diskSize: value
        }
        this.PecsInfo.dataDiskList.splice(index, 1, params)
      },
      /* 改变磁盘页面 */
      change_DiskSize(index, value) {
        var params = {
          diskType: this.PdiskInfo.dataDiskList[index].diskType,
          diskSize: value
        }
        this.PdiskInfo.dataDiskList.splice(index, 1, params)
      },

      // 删除磁盘
      removeDisk(index) {
        this.PdiskInfo.dataDiskList.splice(index, 1)
      },
      // 查询数据盘价格
      queryDiskPrice: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.PecsInfo.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        if (this.PecsInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PecsInfo.dataDiskCost = response.data.cost
          if (response.data.coupon) {
            this.PecsInfo.coupon = response.data.coupon
          } else {
            this.PecsInfo.coupon = 0
          }
        })
      }),

      // 查询数据盘价格(数据库页面)
      /*queryDiskPriceInData: debounce(500, function () {
       var diskSize = ''
       var diskType = ''
       for (var disk of this.PdataInfo.dataDiskList) {
       diskSize += `${disk.size},`
       diskType += `${disk.type},`
       }
       var params = {
       cpuNum: '0',
       diskSize,
       diskType,
       memory: '0',
       timeType: this.PdataInfo.timeForm.currentTimeValue.type,
       timeValue: this.PdataInfo.timeForm.currentTimeValue.value,
       zoneId: this.PdataInfo.zone.zoneid
       }
       if (this.PdataInfo.timeForm.currentTimeType === 'current') {
       params.timeType = 'current'
       }
       axios.post('device/QueryBillingPrice.do', params).then(response => {
       this.PdataInfo.dataDiskCost = response.data.cost
       if (response.data.coupon) {
       this.PdataInfo.coupon = response.data.coupon
       } else {
       this.PdataInfo.coupon = 0
       }
       })
       }),*/
      // 磁盘页面数据盘价格
      queryDiskPriceInDisk: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.PdiskInfo.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          timeType: this.PdiskInfo.timeForm.currentTimeValue.type,
          timeValue: this.PdiskInfo.timeForm.currentTimeValue.value,
          zoneId: this.PdiskInfo.zone.zoneid
        }
        if (this.PdiskInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PdiskInfo.dataDiskCost = response.data.cost
          if (response.data.coupon) {
            this.PdiskInfo.coupon = response.data.coupon
          } else {
            this.PdiskInfo.coupon = 0
          }
        })
      }),

      // 数据库页面数据盘价格
      queryDiskPriceInData: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.PdataInfo.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          timeType: this.PdataInfo.timeForm.currentTimeValue.type,
          timeValue: this.PdataInfo.timeForm.currentTimeValue.value,
          zoneId: this.PdataInfo.zone.zoneid
        }
        if (this.PdataInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PdataInfo.dataDiskCost = response.data.cost
          if (response.data.coupon) {
            this.PdataInfo.coupon = response.data.coupon
          } else {
            this.PdataInfo.coupon = 0
          }
        })
      }),

      pushDiskInDisk() {
        this.PdiskInfo.dataDiskList.push({type: 'ssd', size: 20, label: 'SSD存储'})
      },
      // 主机加入购物车
      addCart() {
        if (this.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        if (this.PecsInfo.currentType == 'app' && this.PecsInfo.currentApp.templatename == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PecsInfo.currentType == 'public' && this.PecsInfo.system.systemName == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PecsInfo.currentType == 'custom' && this.PecsInfo.customMirror.templatename == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PecsInfo.currentLoginType == 'custom') {
          if (this.PecsInfo.computerName.trim() == '') {
            this.PecsInfo.computerNameWarning = '请输入主机名称'
            return
          }
          if (!regExp.hostPassword(this.PecsInfo.password)) {
            this.PecsInfo.passwordWarning = '请输入6-23位包含大小写与数字的密码'
            return
          }
        }
        var obj = JSON.parse(JSON.stringify(this.PecsInfo))
        var prod = Object.assign({
          typeName: '云主机',
          zone: this.PecsInfo.zone,
          type: 'Pecs',
          customCost: this.totalCost,
          count: 1
        }, obj)
        this.cart.push(prod)
        this.store()
        window.scrollTo(0, 170)
      },
      buyHost() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        if (this.PecsInfo.currentType == 'app' && this.PecsInfo.currentApp.templatename == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PecsInfo.currentType == 'public' && this.PecsInfo.system.systemName == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PecsInfo.currentType == 'custom' && this.PecsInfo.customMirror.templatename == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }

        if (this.PecsInfo.currentLoginType == 'custom') {
          if (this.PecsInfo.computerName.trim() == '') {
            this.PecsInfo.computerNameWarning = '请输入主机名称'
            return
          }
          if (!regExp.hostPassword(this.PecsInfo.password)) {
            this.PecsInfo.passwordWarning = '请输入6-23位包含大小写与数字的密码'
            return
          }
        }

        var obj = JSON.parse(JSON.stringify(this.PecsInfo))
        var prod = Object.assign({
          typeName: '云主机',
          zone: this.PecsInfo.zone,
          type: 'Pecs',
          customCost: this.totalCost,
          count: 1
        }, obj)

        var hostCount = 0, ipCount = 0, diskCount = 0

        if (prod.type == 'Pecs') {
          hostCount++
          var params = {
            zoneId: prod.zone.zoneid,
            timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
            timeValue: prod.timeForm.currentTimeValue.value,
            templateId: prod.currentType == 'app' ? prod.currentApp.systemtemplateid : prod.currentType == 'public' ? prod.system.systemtemplateid : prod.customMirror.systemtemplateid,
            isAutoRenew: prod.autoRenewal ? '1' : '0',
            count: prod.count
          }
          // 快速创建主机
          if (prod.createType == 'fast') {
            params.cpuNum = prod.currentSystem.kernel
            params.memory = prod.currentSystem.RAM
            params.bandWidth = prod.publicIP ? prod.currentSystem.bandWidth : 0
            params.rootDiskType = prod.currentSystem.diskType
            params.networkId = 'no'
            params.vpcId = 'no'
            if (params.bandWidth != 0) {
              ipCount++
            }
          } else {
            params.cpuNum = prod.vmConfig.kernel
            params.memory = prod.vmConfig.RAM
            params.bandWidth = prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0
            params.rootDiskType = prod.vmConfig.diskType
            params.networkId = prod.network
            params.vpcId = prod.vpc
            var diskType = '', diskSize = ''
            diskCount += prod.dataDiskList.length
            if (params.bandWidth != 0) {
              ipCount++
            }
            for (let disk of prod.dataDiskList) {
              diskType += `${disk.type},`
              diskSize += `${disk.size},`
            }
            params.diskType = diskType
            params.diskSize = diskSize
          }
          // 设置了主机名和密码
          if (prod.currentLoginType == 'custom') {
            params.VMName = prod.computerName
            params.password = prod.password
          }
          if (prod.currentType === 'app') {
            params.templateId = prod.currentApp.templateid
          } else if (prod.currentType === 'public') {
            params.templateId = prod.system.systemId
          } else {
            params.templateId = prod.customMirror.systemtemplateid
          }
        }
        if (this._checkCount(hostCount, diskCount, ipCount)) {
          axios.get('information/deployVirtualMachine.do', {params}).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('order')
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      // 磁盘加入购物车
      addDiskCart() {
        if (this.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        if (this.PdiskInfo.diskName == '') {
          this.$message.info({
            content: '请输入磁盘名'
          })
          return
        }
        var obj = JSON.parse(JSON.stringify(this.PdiskInfo))
        var prod = Object.assign({typeName: '云硬盘', zone: this.PdiskInfo.zone, type: 'Pdisk', count: 1}, obj)
        this.cart.push(prod)
        this.store()
        window.scrollTo(0, 170)
      },
      buyDisk() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var obj = JSON.parse(JSON.stringify(this.PdiskInfo))
        var prod = Object.assign({typeName: '云硬盘', zone: this.PdiskInfo.zone, type: 'Pdisk', count: 1}, obj)
        let diskCount = 0
        if (prod.type == 'Pdisk') {
          diskCount += prod.dataDiskList.length
          if (this._checkCount(0, diskCount, 0)) {
            var diskSize = ''
            var diskType = ''
            prod.dataDiskList.forEach(item => {
              diskSize += `${item.size},`
              diskType += `${item.type},`
            })
            var params = {
              zoneId: prod.zone.zoneid,
              diskSize,
              diskName: prod.diskName,
              diskOfferingId: diskType,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutorenew: prod.autoRenewal ? '1' : '0',
            }
            axios.get('Disk/createVolume.do', {params}).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        }
      },
      // 公网IP加入购物车
      addIPCart() {
        if (this.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        var obj = JSON.parse(JSON.stringify(this.PeipInfo))
        var prod = Object.assign({typeName: '公网IP', zone: this.PeipInfo.zone, type: 'Peip', count: 1}, obj)
        this.cart.push(prod)
        this.store()
        window.scrollTo(0, 170)
      },
      buyIP() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var obj = JSON.parse(JSON.stringify(this.PeipInfo))
        var prod = Object.assign({typeName: '公网IP', zone: this.PeipInfo.zone, type: 'Peip', count: 1}, obj)
        if (this._checkCount(0, 0, 1)) {
          var params = {
            zoneId: prod.zone.zoneid,
            timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
            timeValue: prod.timeForm.currentTimeValue.value,
            count: prod.count,
            isAutorenew: prod.autoRenewal ? '1' : '0',
            brandWith: prod.bandWidth,
            vpcId: prod.vpc
          }
          axios.get('network/createPublicIp.do', {params}).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            }
          )
        }
      },
      // 数据库加入购物车
      addDataCart(){
        if (this.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        if (this.PdataInfo.system.systemName == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PdataInfo.password.trim() == '') {
          this.PdataInfo.passwordWarning = '请输入主机名称'
          return
          if (!regExp.hostPassword(this.PdataInfo.password)) {
            this.PdataInfo.passwordWarning = '请输入6-23位包含大小写与数字的密码'
            return
          }
        }
        var obj = JSON.parse(JSON.stringify(this.PdataInfo))
        var prod = Object.assign({
          typeName: '数据库',
          zone: this.PdataInfo.zone,
          type: 'Pdata',
          count: 1,
          vpc: this.PecsInfo.vpc,
          network: this.PecsInfo.vpc
        }, obj)
        this.cart.push(prod)
        this.store()
        window.scrollTo(0, 170)
      },
      buyData() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        if (this.PdataInfo.system.systemName == undefined) {
          this.$message.info({
            content: '请选择一个镜像'
          })
          return
        }
        if (this.PdataInfo.password.trim() == '') {
          this.PdataInfo.passwordWarning = '请输入主机名称'
          return
          if (!regExp.hostPassword(this.PdataInfo.password)) {
            this.PdataInfo.passwordWarning = '请输入6-23位包含大小写与数字的密码'
            return
          }
        }
        var diskSize = '', diskType = ''

        this.PdataInfo.dataDiskList.forEach(item => {
          diskSize += `${item.size},`
          diskType += `${item.type},`
        })

        var params = {
          zoneId: this.PdataInfo.zone.zoneid,
          templateId: this.PdataInfo.system.systemId,
          bandWidth: this.PdataInfo.IPConfig.publicIP ? this.PdataInfo.IPConfig.bandWidth : 0,
          timeType: this.PdataInfo.timeForm.currentTimeType == 'annual' ? this.PdataInfo.timeForm.currentTimeValue.type : 'current',
          timeValue: this.PdataInfo.timeForm.currentTimeValue.value,
          isAutoRenew: this.PdataInfo.autoRenewal ? '1' : '0',
          cpuNum: this.PdataInfo.vmConfig.kernel,
          memory: this.PdataInfo.vmConfig.RAM,
          networkId: this.PecsInfo.network,
          rootDiskType: 'ssd',
          vpcId: this.PecsInfo.vpc,
          diskSize,
          diskType
        }

        axios.get('database/createDB.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /* 删除一条购买清单 */
      delDetailed(index) {
        this.cart.splice(index, 1)
        this.store()
      },
      // 订单信息存入sessionStorage
      store() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart))
      },
      // 导出清单
      exportXLSX() {
        if (this.cart.length != 0) {
          // 记录当前行数
          let currentRow = 0
          let data = []
          for (let i = 0; i < this.cart.length; i++) {
            let contentArray = this.$refs.detailed[i].innerText.replace(/[\r\n'删除']/g, ' ').split('$')
            //第一行字段代表订单类型特殊处理
            data[currentRow] = new Array(2)
            data[currentRow][0] = contentArray[0].trim()
            currentRow++
            for (let j = 1; j < contentArray.length; j++) {
              data[currentRow] = new Array(2)
              data[currentRow][0] = contentArray[j].split('#')[0].trim()
              data[currentRow][1] = contentArray[j].split('#')[1].trim()
              currentRow++
            }
            data[currentRow] = new Array(2)
            currentRow++
          }
          // covert json to sheet
          const ws = XLSX.utils.aoa_to_sheet(data)
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
          // save
          const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
          XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'detailedList.xlsx')
        }
      },
      // 立即购买
      buyNow() {
        if (this.cart.length == 0) {
          this.$message.info({
            content: '请添加商品到清单'
          })
          return
        }
        for (var prod of this.cart) {
          console.log(prod)
        }
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var PromiseList = []
        // 批次号
        var countOrder = uuid.v4()
        // 创建的主机数量  创建的磁盘数量 创建的公网IP数量
        var hostCount = 0, diskCount = 0, ipCount = 0
        for (var prod of this.cart) {
          if (prod.type == 'Pecs') {
            hostCount++
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              templateId: prod.currentType == 'app' ? prod.currentApp.systemtemplateid : prod.currentType == 'public' ? prod.system.systemtemplateid : prod.customMirror.systemtemplateid,
              isAutoRenew: prod.autoRenewal ? '1' : '0',
              count: prod.count,
              countOrder
            }
            // 快速创建主机
            if (prod.createType == 'fast') {
              params.cpuNum = prod.currentSystem.kernel
              params.memory = prod.currentSystem.RAM
              params.bandWidth = prod.publicIP ? prod.currentSystem.bandWidth : 0
              params.rootDiskType = prod.currentSystem.diskType
              params.networkId = 'no'
              params.vpcId = 'no'
              if (params.bandWidth != 0) {
                ipCount++
              }
            } else {
              params.cpuNum = prod.vmConfig.kernel
              params.memory = prod.vmConfig.RAM
              params.bandWidth = prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0
              params.rootDiskType = prod.vmConfig.diskType
              params.networkId = prod.network
              params.vpcId = prod.vpc
              var diskType = '', diskSize = ''
              diskCount += prod.dataDiskList.length
              if (params.bandWidth != 0) {
                ipCount++
              }
              for (let disk of prod.dataDiskList) {
                diskType += `${disk.type},`
                diskSize += `${disk.size},`
              }
              params.diskType = diskType
              params.diskSize = diskSize
            }
            if (prod.currentType === 'app') {
              params.templateId = prod.currentApp.templateid
            } else if (prod.currentType === 'public') {
              params.templateId = prod.system.systemId
            } else {
              params.templateId = prod.customMirror.systemtemplateid
            }
            // 设置了主机名和密码
            if (prod.currentLoginType == 'custom') {
              params.VMName = prod.computerName
              params.password = prod.password
            }
            PromiseList.push(axios.get('information/deployVirtualMachine.do', {params}))
          } else if (prod.type == 'Pdisk') {
            diskCount += prod.dataDiskList.length
            var diskSize = ''
            var diskType = ''
            var count = prod.count
            // 多个磁盘订单
            for (var i = 0; i < count; i++) {
              prod.dataDiskList.forEach(item => {
                diskSize += `${item.size},`
                diskType += `${item.type},`
              })
            }
            var params = {
              zoneId: prod.zone.zoneid,
              diskSize: diskSize,
              diskName: prod.diskName,
              diskOfferingId: diskType,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutorenew: prod.autoRenewal ? '1' : '0',
              countOrder
            }
            PromiseList.push(axios.get('Disk/createVolume.do', {params}))
          } else if (prod.type == 'Peip') {
            ipCount++
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              count: prod.count,
              isAutorenew: prod.autoRenewal ? '1' : '0',
              brandWith: prod.bandWidth,
              vpcId: prod.vpc,
              countOrder
            }
            PromiseList.push(axios.get('network/createPublicIp.do', {params}))
          } else if (prod.type == 'Pdata') {
            for (var i = 0; i < count; i++) {
              prod.dataDiskList.forEach(item => {
                diskSize += `${item.size},`
                diskType += `${item.type},`
              })
            }
            var params = {
              zoneId: prod.zone.zoneid,
              templateId: prod.system.systemId,
              bandWidth: prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutoRenew: prod.autoRenewal ? '1' : '0',
              count: prod.count,
              cpuNum: prod.vmConfig.kernel,
              memory: prod.vmConfig.RAM,
              networkId: prod.network,
              rootDiskType: 'ssd',
              vpcId: prod.vpc,
              diskSize,
              diskType,
              countOrder,
            }
            PromiseList.push(axios.get('database/createDB.do', {params}))
          }
        }
        if (this._checkCount(hostCount, diskCount, ipCount)) {
          sessionStorage.removeItem('cart')
          Promise.all(PromiseList).then(responseList => {
            if (responseList.every(item => {
                return item.status == 200 && item.data.status == 1
              })) {
              this.$router.push({
                path: 'order', query: {
                  countOrder
                }
              })
            } else {
              this.$message.info({
                content: responseList[0].data.message
              })
            }
          })
        }
      },
      _checkCount(hostCount, diskCount, ipCount) {
        if (hostCount > this.remainCount.hostCount) {
          this.$message.info({
            content: '创建的主机数超过限制'
          })
          return false
        } else if (diskCount > this.remainCount.diskCount) {
          this.$message.info({
            content: '创建的磁盘数超过限制'
          })
          return false
        } else if (ipCount > this.remainCount.publicIpCount) {
          this.$message.info({
            content: '创建的公网IP数超过限制'
          })
          return false
        }
        return true
      },
      // 登录弹窗需要的方法
      vail(field) {
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field) {
        if (field == 'vailCode') {
          // this.vailForm.vailCode.message = messageMap.vailCode.placeholder
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }
      },
      focus(field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      submit() {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$router.go(0)
            } else {
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        })
      }
    },
    computed: mapState({
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      totalCost() {
        if (this.PecsInfo.IPConfig.publicIP) {
          return this.PecsInfo.vmConfig.cost + this.PecsInfo.IPConfig.cost + this.PecsInfo.dataDiskCost
        } else {
          return this.PecsInfo.vmConfig.cost + this.PecsInfo.dataDiskCost
        }
      },
      totalDataCost(){
        if (this.PdataInfo.IPConfig.publicIP) {
          return this.PdataInfo.vmConfig.cost + this.PdataInfo.IPConfig.cost + this.PdataInfo.dataDiskCost
        } else {
          return this.PdataInfo.vmConfig.cost + this.PdataInfo.dataDiskCost
        }
      },
      totalDataCoupon(){
        if (this.PdataInfo.IPConfig.publicIP) {
          return this.PdataInfo.vmConfig.coupon + this.PdataInfo.IPConfig.coupon + this.PdataInfo.coupon
        } else {
          return this.PdataInfo.vmConfig.coupon + this.PdataInfo.coupon
        }
      },
      totalCoupon() {
        return this.PecsInfo.vmConfig.coupon + this.PecsInfo.IPConfig.coupon + this.PecsInfo.coupon
      },
      // 剩余添加磁盘数量
      remainDisk() {
        return 5 - this.PecsInfo.dataDiskList.length
      },
      // 剩余添加磁盘数量（数据库页面）
      remainDiskData() {
        return 5 - this.PdataInfo.dataDiskList.length
      },
      // 商品清单总价
      billListCost() {
        var cost = 0
        for (var prod of this.cart) {
          switch (prod.type) {
            case'Pecs':
              if (prod.createType == 'custom') {
                cost += prod.customCost
              } else {
                cost += prod.cost
              }
              break;
            case'Pdisk':
              cost += prod.dataDiskCost
              break;
            case'Peip':
              cost += prod.cost
              break;
          }
        }
        return cost
      },
      remainDiskInDisk() {
        return 5 - this.PdiskInfo.dataDiskList.length
      },
      zoneList: state => state.zoneList,
      userInfo: state => state.userInfo
    }),
    watch: {
      'product.currentProduct'() {
        this.queryRemainCount()
      },
      // 选择区域发生变化
      'PecsInfo.zone': {
        handler: function () {
          // 重新查询自定义IP的所属vpc，即虚拟私有云
          this.queryVpc()
          this.setTemplate()
          this.ownMirrorList()
          this.queryRemainCount()
          // 区域的主机配额不同 初始化相关主机配置核心数，内存
          if (this.PecsInfo.createType != 'fast') {
            this.PecsInfo.RAMList = [
              {label: '1G', value: 1},
              {label: '2G', value: 2},
              {label: '4G', value: 4},
              {label: '8G', value: 8}
            ]
            this.PecsInfo.vmConfig = {
              diskType: 'sas',
              kernel: 1,
              RAM: 1,
              diskSize: 40,
              cost: 0,
              coupon: 0
            }
          } else {
            this.queryQuick()
          }
        }
        ,
        deep: true
      }
      ,
      // 配置变化
      'PecsInfo.createType': {
        handler: function () {
          if (this.PecsInfo.createType == 'fast') {
            this.queryQuick()
          } else {
            // 查询自定义配置主机价格
            this.queryCustomVM()
            // 查询数据盘价格
            this.queryDiskPrice()
            // 查询公网IP价格
            this.queryIPPrice()
          }
        }
        ,
        deep: true
      },
      // 观测到计费方式变化
      'PecsInfo.timeForm': {
        handler: function () {
          // 查询快速配置价格
          this.queryQuick()
          // 查询自定义配置主机价格
          this.queryCustomVM()
          // 查询数据盘价格
          this.queryDiskPrice()
          // 查询公网IP价格
          this.queryIPPrice()
        }
        ,
        deep: true
      }
      ,
      // 观测到快速配置主机规格变化
      'PecsInfo.currentSystem': {
        handler: function () {
          // 查询快速配置价格
          this.queryQuick()
        }
        ,
        deep: true
      }
      ,
      // 观测到快速配置主机是否购买公网IP
      'PecsInfo.publicIP': {
        handler: function () {
          if (this.PecsInfo.publicIP) {
            this.PecsInfo.currentSystem = {
              kernel: '1',
              RAM: '1',
              bandWidth: '1',
              diskSize: '40',
              diskType: 'sas',
              diskDesc: '性能型'
            }
          } else {
            this.PecsInfo.currentSystem = {
              kernel: '1',
              RAM: '1',
              bandWidth: '0',
              diskSize: '40',
              diskType: 'sas',
              diskDesc: '性能型'
            }
          }
        }
        ,
        deep: true
      }
      ,
      // 观测到自定义配置主机规格变化
      'PecsInfo.vmConfig': {
        handler: function () {
          // 查询自定义配置价格
          this.queryCustomVM()
        }
        ,
        deep: true
      }
      ,
      // 选中的VPC发生变化
      'PecsInfo.vpc'() {
        this.changeNetwork()
      }
      ,
      // 公网IP带宽变化
      'PecsInfo.IPConfig.bandWidth'() {
        this.queryIPPrice()
      },
      // 数据库IP带宽变化
      'PdataInfo.IPConfig.bandWidth'() {
        this.queryIPPriceInData()
      }
      ,
      // 磁盘变化，重新计算价格
      'PecsInfo.dataDiskList': {
        handler: function () {
          this.queryDiskPrice()
        },
        deep: true
      },
      // 磁盘变化，重新计算价格
      'PdataInfo.dataDiskList': {
        handler: function () {
          this.queryDiskPriceInData()
        },
        deep: true
      },
      // 观测到数据库配置变化
      'PdataInfo.vmConfig': {
        handler: function () {
          // 查询自定义配置价格
          this.queryCustomVMInData()
        },
        deep: true
      },
      /*磁盘页面需要价格计算的变化*/
      'PdiskInfo.timeForm': {
        handler: function () {
          // 查询数据盘价格
          this.queryDiskPriceInDisk()
        },
        deep: true
      }
      ,
      // 磁盘变化，重新计算价格
      'PdiskInfo.dataDiskList': {
        handler: function () {
          this.queryDiskPriceInDisk()
        },
        deep: true
      }
      ,
      // 公网IP选择区域发生变化
      'PeipInfo.zone': {
        handler: function () {
          // 重新查询自定义IP的所属vpc，即虚拟私有云
          this.queryIPVpc()
          // 查询当前区域的剩余资源
          this.queryRemainCount()
        },
        deep: true
      },

      // 公网IP选择区域发生变化
      'PdiskInfo.zone': {
        handler: function () {
          // 查询当前区域的剩余资源
          this.queryRemainCount()
        },
        deep: true
      },
      /*公网IP页面需要价格计算的变化*/
      'PeipInfo.timeForm': {
        handler: function () {
          // 查询公网IP价格
          this.queryIPPriceInIP()
        },
        deep: true
      },
      // 公网IP变化，重新计算价格
      'PeipInfo.bandWidth': {
        handler: function () {
          this.queryIPPriceInIP()
        },
        deep: true
      },
      /*数据库页面需要价格计算的变化*/
      'PdataInfo.timeForm': {
        handler: function () {
          // 查询数据库IP价格
          this.queryIPPriceInData()
          // 查询数据库磁盘价格
          this.queryDiskPriceInData()
          // 查询数据库自身价格
          this.queryCustomVMInData()
        },
        deep: true
      },
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollFun)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #buy {

    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          width: 101px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          padding: 6px 0px;
          display: inline-block;
        }
        .zoneItem:nth-child(6) {
          margin-top: 20px;
        }
        .timeType {
          width: 55px;
          margin: 0px;
          border: 1px solid #d9d9d9;
          border-right: none;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          padding: 6px 0px;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .item-wrapper {
          margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
      }
    }
  }

  .body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .foot {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
</style>
