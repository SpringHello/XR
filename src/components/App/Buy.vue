<template>
  <div id="buy">
    <div id="wrapper">
      <div id="header">
        <Select v-model="product.currentProduct" class="mySelect" style="width: 102px">
          <Option v-for="item in product.productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <router-link :to="product.currentProduct" target="_blank">查看产品详情</router-link>
      </div>
      <div id="body">
        <!--云主机div-->
        <div id="Pecs" v-show="product.currentProduct=='Pecs'">
          <!--选择配置方式，快速配置、自定义配置-->
          <div style="height:83px;display: flex">
            <div v-for="item in PecsInfo.createTypeList" :key="item.value" @click="PecsInfo.createType=item.value"
                 :class="{'typeSelect':item.value==PecsInfo.createType}" class="config-title">{{item.label}}
            </div>
          </div>
          <div style="padding:40px;">

            <!--两种配置方式公共页面-->
            <!--区域选择-->
            <div>
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
            <div>
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
                </div>
              </div>
              <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
                满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
            </div>

            <!--快速配置主体页面-->
            <div v-show="PecsInfo.createType=='fast'">
              <!--主机规格选择-->
              <div>
                <h2>主机规格选择</h2>
                <!--镜像选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">镜像</p>
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

                <!--系统配置-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">配置</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.systemConfig" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.currentSystem.kernel==item.kernel&&PecsInfo.currentSystem.RAM==item.RAM}"
                           @click="PecsInfo.currentSystem=item"
                           style="display: block;width:360px;margin-bottom:10px;">
                        {{`${item.kernel}核${item.RAM}G、${item.bandWidth}M带宽、${item.diskSize}G系统盘（${item.diskDesc}）`}}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--自定义配置主体页面-->
            <div v-show="PecsInfo.createType=='custom'">
              <!--主机规格选择-->
              <div style="padding-bottom: 20px;border-bottom: 1px solid #EDEDED">
                <h2>主机规格选择</h2>
                <!--类型选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">类型</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.vmTypeList" :key="item.value" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmType==item.value}"
                           @click="changeType(item.value)">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!--镜像选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">镜像</p>
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
                <!--核心个数选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">核心数</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.kernelList" :key="item.value" class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmConfig.kernel==item.value}"
                           @click="changeKernel(item.value)">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!--内存大小选择-->
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title">内存</p>
                    </div>
                    <div>
                      <div v-for="item in PecsInfo.RAMList" :key="item.value"
                           v-if="item.value>=PecsInfo.vmConfig.kernel&&item.value<=4*PecsInfo.vmConfig.kernel"
                           class="zoneItem"
                           :class="{zoneSelect:PecsInfo.vmConfig.RAM==item.value}"
                           @click="PecsInfo.vmConfig.RAM=item.value">{{item.label}}
                      </div>
                    </div>
                  </div>
                </div>
                <!--自定义主机价格-->
                <div class="item-wrapper">
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
              <div style="margin-top:20px;">
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
                    <div style="width:300px;margin-top: 7px">
                      <i-slider
                        v-model="PecsInfo.IPConfig.bandWidth"
                        unit="M"
                        :min=1
                        :max=100
                        :step=1
                        :points="[20,50]"
                        style="margin-right:30px;vertical-align: middle;">
                      </i-slider>
                    </div>
                  </div>
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
              <div style="margin-top:20px;">
                <h2>云硬盘</h2>
                <!--虚拟私有云-->
                <div v-for="disk in PecsInfo.dataDiskList">
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
                        <p class="item-title" style="margin-top: 7px;">容量</p>
                      </div>
                      <div style="width:300px;margin-top: 7px">
                        <i-slider
                          v-model="disk.size"
                          unit="G"
                          :min=20
                          :max=1000
                          :step=10
                          :points="[500,800]"
                          style="margin-right:30px;vertical-align: middle;">
                        </i-slider>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item-wrapper" v-if="remainDisk>0">
                  <div style="display: flex">
                    <div>
                      <p class="item-title"></p>
                    </div>
                    <div>
                      <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk">添加数据盘</span>
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
            <div style="margin-top: 20px;">
              <h2>登录设置</h2>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title">镜像</p>
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
                      <p class="item-title" style="margin-top: 8px">安全组</p>
                    </div>
                    <Select v-model="PecsInfo.safe" style="width:200px">
                      <Option value="default">默认安全组</Option>
                    </Select>
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
                    <Input v-model="PecsInfo.computerName" placeholder="请输入主机名" style="width: 300px"></Input>
                  </div>
                </div>
                <div class="item-wrapper">
                  <div style="display: flex">
                    <div>
                      <p class="item-title" style="margin-top: 8px">登录密码</p>
                    </div>
                    <Input v-model="PecsInfo.password" placeholder="请输入主机登录密码"
                           style="width: 300px"></Input>
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
            <div>
              <p v-if="PecsInfo.createType=='fast'" style="text-align: right;font-size: 14px;color: #666666;">总计费用：<span
                style="font-size: 24px;color: #EE6723;">{{PecsInfo.cost.toFixed(2)}}元</span></p>
              <p v-if="PecsInfo.createType=='custom'" style="text-align: right;font-size: 14px;color: #666666;">
                总计费用：<span
                style="font-size: 24px;color: #EE6723;">{{totalCost.toFixed(2)}}元</span>
              </p>
              <div style="text-align: right;margin-top: 20px;">
                <button class="buyButton" @click="addCart">
                  加入预算清单
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--云硬盘div-->
        <div id="Pdisk" style="padding: 30px 40px 40px 40px;" v-show="product.currentProduct=='Pdisk'">
          <!--两种配置方式公共页面-->
          <!--区域选择-->
          <div>
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
          <div>
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
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              满一年打8折，满两年打7.5折，满3年5折</p>
          </div>
          <!--云硬盘-->
          <div style="margin-top:20px;">
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
                    <div v-for="item in PdiskInfo.dataDiskType" :key="item.value" class="zoneItem"
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
                    <p class="item-title" style="margin-top: 7px;">容量</p>
                  </div>
                  <div style="width:300px;margin-top: 7px">
                    <i-slider
                      v-model="disk.size"
                      unit="G"
                      :min=20
                      :max=1000
                      :step=10
                      :points="[500,800]"
                      style="margin-right:30px;vertical-align: middle;">
                    </i-slider>
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
          <div>
            <p style="text-align: right;font-size: 14px;color: #666666;">
              总计费用：<span style="font-size: 24px;color: #EE6723;">{{PdiskInfo.dataDiskCost.toFixed(2)}}元</span>
            </p>
            <div style="text-align: right;margin-top: 20px;">
              <button class="buyButton" @click="addDiskCart">
                加入预算清单
              </button>
            </div>
          </div>
        </div>

        <!--公网IP div-->
        <div id="Peip" style="padding: 30px 40px 40px 40px;" v-show="product.currentProduct=='Peip'">
          <!--两种配置方式公共页面-->
          <!--区域选择-->
          <div>
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
          <div>
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
              </div>
            </div>
            <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
              满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
          </div>

          <!--主机网络与带宽-->
          <div style="margin-top:20px;">
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
                <div style="width:300px;margin-top: 7px">
                  <i-slider
                    v-model="PeipInfo.bandWidth"
                    unit="M"
                    :min=1
                    :max=100
                    :step=1
                    :points="[20,50]"
                    style="margin-right:30px;vertical-align: middle;">
                  </i-slider>
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
          <div>
            <p style="text-align: right;font-size: 14px;color: #666666;">总计费用：<span
              style="font-size: 24px;color: #EE6723;">{{PeipInfo.cost.toFixed(2)}}元</span></p>
            <div style="text-align: right;margin-top: 20px;">
              <button class="buyButton" @click="addIPCart">
                加入预算清单
              </button>
            </div>
          </div>
        </div>

        <div id="list">
          <div ref="list"
               style="padding:30px 30px;box-shadow: 0 2px 14px 0;background-color: #ffffff;max-height: 1050px;overflow-y: auto">
            <p style="font-size: 24px;color: #333333;line-height: 43px;text-align: center">价格预算清单</p>
            <div v-for="prod in cart" ref="detailed">
              <h2 style="width:70px;text-align: right;font-size: 18px;color: #333333;line-height: 32px;">
                {{prod.typeName}}</h2>
              <!--主机清单字段-->
              <div v-if="prod.type=='Pecs'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="title">区域</span>{{prod.zone.zonename}}</p>
                <p class="item">
                  <span class="title">计费模式</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月
                  ${prod.timeForm.currentTimeValue.label}`:'实时计费'}}
                </p>
                <!--镜像+应用-->
                <p class="item" v-if="prod.currentType=='app'"><span class="title">镜像</span>{{prod.currentApp.templatename}}
                </p>
                <!--公共镜像-->
                <p class="item" v-if="prod.currentType=='public'"><span class="title">镜像</span>{{prod.system.systemName}}
                </p>
                <!--快速配置-->
                <div v-if="prod.createType=='fast'">
                  <p class="item" v-if="prod.publicIP"><span class="title">配置</span>{{`${prod.currentSystem.kernel}核${prod.currentSystem.RAM}G、${prod.currentSystem.bandWidth}带宽、${prod.currentSystem.diskSize}G系统盘`}}
                  </p>
                  <p class="item" v-if="prod.publicIP==false"><span class="title">配置</span>{{`${prod.currentSystem.kernel}核${prod.currentSystem.RAM}G、${prod.currentSystem.diskSize}G系统盘`}}
                  </p>
                </div>
                <!--自定义配置-->
                <div v-if="prod.createType=='custom'">
                  <p class="item" v-if="prod.IPConfig.publicIP"><span class="title">配置</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.IPConfig.bandWidth}M带宽、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <p class="item" v-else><span class="title">配置</span>{{`${prod.vmConfig.kernel}核${prod.vmConfig.RAM}G、${prod.vmConfig.diskSize}G系统盘`}}
                  </p>
                  <!--快速创建没有数据盘，只有自定义配置包含硬盘-->
                  <p class="item" v-for="disk in prod.dataDiskList"><span class="title">硬盘</span>{{disk.size+disk.label}}
                  </p>
                </div>
                <p class="item" v-if="prod.createType=='fast'" style="margin-top: 10px"><span class="title"
                                                                                              style="vertical-align: middle">价格</span>
                  <span style="font-size: 24px;color: #F85E1D;vertical-align: middle">{{prod.cost.toFixed(2)}}元</span>
                </p>
                <p class="item" v-if="prod.createType=='custom'" style="margin-top: 10px;"><span
                  class="title" style="vertical-align: middle">价格</span><span
                  style="font-size: 24px;color: #F85E1D;vertical-align: middle">{{prod.customCost.toFixed(2)}}元</span>
                </p>
              </div>
              <!--磁盘清单字段-->
              <div v-if="prod.type=='Pdisk'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="title">区域</span>{{prod.zone.zonename}}</p>
                <p class="item">
                  <span class="title">计费模式</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月
                  ${prod.timeForm.currentTimeValue.label}`:'实时计费'}}
                </p>
                <p class="item" v-for="disk in prod.dataDiskList">
                  <span class="title">硬盘</span>{{disk.size}}G{{disk.label}}
                </p>
                <p class="item" style="margin-top: 10px"><span class="title" style="vertical-align: middle">价格</span>
                  <span
                    style="font-size: 24px;color: #F85E1D;vertical-align: middle">{{prod.dataDiskCost.toFixed(2)}}元</span>
                </p>
              </div>

              <!--公网IP清单字段-->
              <div v-if="prod.type=='Peip'" style="border-bottom:1px solid #ccc;padding:20px 0px;">
                <p class="item"><span class="title">区域</span>{{prod.zone.zonename}}</p>
                <p class="item">
                  <span class="title">计费模式</span>{{prod.timeForm.currentTimeType=='annual'?`包年包月
                  ${prod.timeForm.currentTimeValue.label}`:'实时计费'}}
                </p>
                <p class="item">
                  <span class="title">带宽</span>{{prod.bandWidth}}
                </p>
                <p class="item" style="margin-top: 10px"><span class="title" style="vertical-align: middle">价格</span>
                  <span style="font-size: 24px;color: #F85E1D;vertical-align: middle">{{prod.cost.toFixed(2)}}元</span>
                </p>
              </div>
            </div>
          </div>
          <div style="padding:30px 40px;box-shadow: 0 2px 14px 0;background-color: #ffffff;width:380px;" ref="buyDiv">
            <p
              style="font-size: 14px;margin:10px 0px;vertical-align:middle;color: #666666;line-height: 25px;text-align: center">
              总计：<span
              style="font-size: 24px;color: #F85E1D;line-height: 25px;vertical-align: middle;margin-left:10px;">{{billListCost.toFixed(2)}}元</span>
            </p>
            <button class="buyButton" @click="buyNow"
                    style="display:block;width:300px;color:#ffffff;margin-bottom: 10px;background-image: linear-gradient(-42deg, #4481EB 0%, #04BEFE 100%);">
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
            <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit">
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
  import axios from 'axios'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  import regExp from '../../util/regExp'

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
  export default{
    beforeRouteEnter(to, from, next){
      next(vm => {
        if (from.path == '/ruicloud/Pdisk') {
          vm.product.currentProduct = 'Pdisk'
        } else if (from.path == '/ruicloud/Peip') {
          vm.product.currentProduct = 'Peip'
        }
        if (sessionStorage.getItem('type')) {
        switch (sessionStorage.getItem('type')) {
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
        }
        sessionStorage.removeItem('type')
      }
      })
    },
    data(){
      var zone = null
      $store.state.zoneList.forEach(item => {
        if (item.isdefault === 1) {
          zone = item
        }
      })
      var cart = []
      if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'))
      }

      return {
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
          productList: [{label: '云主机', value: 'Pecs'}, {label: '云硬盘', value: 'Pdisk'}, {label: '公网IP', value: 'Peip'}]
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
            {label: '镜像+应用', value: 'app'},
            {label: '公共镜像', value: 'public'},
            {label: '自定义镜像', value: 'custom'}
          ],
          currentType: 'app',
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
          // 选中的镜像
          system: {},

          // 快速创建主机是否需要公网IP
          publicIP: true,

          // 系统配置
          systemConfig: [
            {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '50', diskType: 'sas', diskDesc: '性能型'},
            {kernel: '2', RAM: '4', bandWidth: '1', diskSize: '50', diskType: 'sas', diskDesc: '性能型'},
            {kernel: '4', RAM: '4', bandWidth: '2', diskSize: '50', diskType: 'ssd', diskDesc: '超高性能型'},
            {kernel: '4', RAM: '8', bandWidth: '2', diskSize: '50', diskType: 'ssd', diskDesc: '超高性能型'}
          ],
          // 选中的系统配置
          currentSystem: {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '50', diskType: 'sas', diskDesc: '性能型'},

          // 两种登录设置  默认设置/自定义设置
          loginType: [{type: 'default', label: '默认设置'}, {type: 'custom', label: '自定义设置'}],
          currentLoginType: 'default',

          safe: 'default',

          autoRenewal: false,
          // 主机名称
          computerName: '',
          // 登录密码
          password: '',

          // 下面是自定义配置的数据
          // 主机类型
          vmTypeList: [
            {label: '标准型', value: 'standard'},
            {label: '内存优化型', value: 'optimization'},
            {label: '高I/O型', value: 'IO'}
          ],
          vmType: 'standard',

          // 系统磁盘类型选择
          diskTypeList: [
            {label: '高IO型', value: 'sas'},
            {label: '超高IO型', value: 'ssd'}
          ],

          // 核心个数选择
          kernelList: [
            {label: '1核', value: 1},
            {label: '2核', value: 2},
            {label: '4核', value: 4},
            {label: '8核', value: 8},
            {label: '16核', value: 16}
          ],

          // 内存大小选择
          RAMList: [
            {label: '1G', value: 1},
            {label: '2G', value: 2},
            {label: '4G', value: 4},
            {label: '8G', value: 8},
            {label: '16G', value: 16},
            {label: '32G', value: 32}
          ],

          // 自定义主机配置
          vmConfig: {
            diskType: 'sas',
            kernel: 1,
            RAM: 1,
            diskSize: 50,
            cost: 0
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
            cost: 0
          },

          // 云硬盘（数据盘）
          dataDiskType: [
            {label: '存储型', value: 'sata'},
            {label: '性能型', value: 'sas'},
            {label: '超高性能型', value: 'ssd'}
          ],
          // 添加购买的数据盘
          dataDiskList: [
            {type: 'ssd', size: 20, label: '超高性能型'}
          ],
          dataDiskCost: 0,

          // 快速创建价格计算花费
          cost: 0
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
            {label: '存储型', value: 'sata'},
            {label: '性能型', value: 'sas'},
            {label: '超高性能型', value: 'ssd'}
          ],
          // 添加购买的数据盘
          dataDiskList: [
            {type: 'ssd', size: 20, label: '超高性能型'}
          ],
          diskName: '',
          // 自动续费
          autoRenewal: true,
          dataDiskCost: 0
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
          cost: 0
        },
        // 购物车
        cart,
      }
    },
    created(){
      window.addEventListener('scroll', () => {
        if (window.innerHeight - this.$refs.list.getBoundingClientRect().bottom < 246) {
          this.$refs.buyDiv.style.position = 'fixed'
          this.$refs.buyDiv.style.bottom = 0
        } else {
          this.$refs.buyDiv.style.position = 'unset'
        }
      })
      /*// 自定义主机所在的vpc列表
       axios.get('network/listVpc.do', {
       params: {
       zoneId: this.PecsInfo.zone.zoneid
       }
       }).then(response => {
       this.PecsInfo.vpcList = response.data.result
       this.PeipInfo.vpcList = response.data.result
       })*/
      this.queryQuick()
      this.queryCustomVM()
      this.queryDiskPrice()
      this.queryIPPrice()
      this.queryDiskPriceInDisk()
      this.queryVpc()
      this.queryIPVpc()
      this.setTemplate()
      this.queryIPPriceInIP()
    },
    methods: {
      // 设置镜像数据
      setTemplate(){
        axios.get('information/getSoftTempList.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
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
      // 重新选择镜像
      setOS(name){
        var arg = name.split('#')
        for (var item of this.PecsInfo.publicList) {
          item.selectSystem = ''
        }
        this.PecsInfo.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        this.PecsInfo.publicList[arg[2]].selectSystem = arg[0]
      },
      // 新建公网IP所在vpc
      queryIPVpc(){
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.PeipInfo.zone.zoneid
          }
        }).then(response => {
          this.PeipInfo.vpcList = response.data.result
        })
      },
      // 重新查询虚拟私有云（vpc）
      queryVpc(){
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid
          }
        }).then(response => {
          this.PecsInfo.vpcList = response.data.result
        })
      },
      // 重新查询vpc所属的子网
      changeNetwork(){
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.PecsInfo.zone.zoneid,
            vpcId: this.PecsInfo.vpc
          }
        }).then(response => {
          this.PecsInfo.networkList = response.data.result
        })
      },
      // 查询云主机快速配置价格
      queryQuick(){
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
        })
      },
      // 查询自定义主机配置价格  （仅包含主机，因为主机与公网IP是分开计算并显示的）
      queryCustomVM(){
        var params = {
          cpuNum: this.PecsInfo.vmConfig.kernel.toString(),
          diskSize: '50',
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
        })
      },
      // 三种推荐配置切换
      changeType(type){
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
      changeKernel(kernel){
        this.PecsInfo.vmConfig.kernel = kernel
        if (this.PecsInfo.vmConfig.RAM < this.PecsInfo.vmConfig.kernel) {
          this.PecsInfo.vmConfig.RAM = this.PecsInfo.vmConfig.kernel
        }
        if (this.PecsInfo.vmConfig.RAM > this.PecsInfo.vmConfig.kernel * 4) {
          this.PecsInfo.vmConfig.RAM = this.PecsInfo.vmConfig.kernel * 4
        }
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
        })
      }),
      // 添加主机数据盘
      pushDisk(){
        this.PecsInfo.dataDiskList.push({type: 'ssd', size: 20, label: '超高性能型'})
      },
      // 删除主机数据盘
      removeHostDisk(index){
        this.PecsInfo.dataDiskList.splice(index, 1)
      },
      // 删除磁盘
      removeDisk(index){
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
        })
      }),
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
        })
      }),
      pushDiskInDisk(){
        this.PdiskInfo.dataDiskList.push({type: 'ssd', size: 20, label: '超高性能型'})
      },
      // 主机加入购物车
      addCart(){
        if (this.cart.length > 4) {
          this.$message.error({
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
        var obj = JSON.parse(JSON.stringify(this.PecsInfo))
        var prod = Object.assign({
          typeName: '云主机',
          zone: this.PecsInfo.zone,
          type: 'Pecs',
          customCost: this.totalCost,
          count: 1
        }, obj)
        console.log(prod)
        this.cart.push(prod)
        this.store()
      },
      // 磁盘加入购物车
      addDiskCart(){
        if (this.cart.length > 4) {
          this.$message.error({
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
      },
      // 公网IP加入购物车
      addIPCart(){
        if (this.cart.length > 4) {
          this.$message.error({
            content: '购物车已满'
          })
        }
        var obj = JSON.parse(JSON.stringify(this.PeipInfo))
        var prod = Object.assign({typeName: '公网IP', zone: this.PeipInfo.zone, type: 'Peip', count: 1}, obj)
        this.cart.push(prod)
        this.store()
      },
      // 订单信息存入sessionStorage
      store(){
        sessionStorage.setItem('cart', JSON.stringify(this.cart))
      },
      // 导出清单
      exportXLSX(){
        var data = []
        if (this.cart.length != 0) {
          for (var i = 0; i < this.cart.length; i++) {
            data[i] = new Array(2)
            data[i][0] = '订单' + '：'
            data[i][1] = this.$refs.detailed[i].innerText.replace(/[\r\n'删除']/g, ' ')
            console.log(data[i][1])
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
      buyNow(){
        if (this.cart.length == 0) {
          this.$message.info({
            content: '请添加商品到清单'
          })
          return
        }
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var PromiseList = []
        for (var prod of this.cart) {
          if (prod.type == 'Pecs') {
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              templateId: prod.currentType == 'app' ? prod.currentApp.systemtemplateid : prod.system.systemtemplateid,
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
            } else {
              params.cpuNum = prod.vmConfig.kernel
              params.memory = prod.vmConfig.RAM
              params.bandWidth = prod.IPConfig.publicIP ? prod.IPConfig.bandWidth : 0
              params.rootDiskType = prod.vmConfig.diskType
              params.networkId = prod.network
            }
            if (prod.currentType === 'app') {
              params.templateId = prod.currentApp.templateid
            } else {
              params.templateId = prod.system.systemId
            }
            PromiseList.push(axios.get('information/deployVirtualMachine.do', {params}))
          } else if (prod.type == 'Pdisk') {
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
            PromiseList.push(axios.get('Disk/createVolume.do', {params}))
          } else if (prod.type == 'Peip') {
            var params = {
              zoneId: prod.zone.zoneid,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              count: prod.count,
              isAutorenew: prod.autoRenewal ? '1' : '0',
              brandWith: prod.bandWidth,
              vpcId: prod.vpc
            }
            PromiseList.push(axios.get('network/createPublicIp.do', {params}))
          }
        }
        sessionStorage.removeItem('cart')
        Promise.all(PromiseList).then(responseList => {
          this.$router.push('order')
        })
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
      totalCost(){
        return this.PecsInfo.vmConfig.cost + this.PecsInfo.IPConfig.cost + this.PecsInfo.dataDiskCost
      },
      // 剩余添加磁盘数量
      remainDisk(){
        return 5 - this.PecsInfo.dataDiskList.length
      },
      // 商品清单总价
      billListCost(){
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
      remainDiskInDisk(){
        return 5 - this.PdiskInfo.dataDiskList.length
      },
      zoneList: state => state.zoneList,
      userInfo: state => state.userInfo
    }),
    watch: {
      // 选择区域发生变化
      'PecsInfo.zone': {
        handler: function () {
          // 重新查询自定义IP的所属vpc，即虚拟私有云
          this.queryVpc()
          this.setTemplate()
        },
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
        },
        deep: true
      },
      // 观测到快速配置主机规格变化
      'PecsInfo.currentSystem': {
        handler: function () {
          // 查询快速配置价格
          this.queryQuick()
        },
        deep: true
      },
      // 观测到自定义配置主机规格变化
      'PecsInfo.vmConfig': {
        handler: function () {
          // 查询自定义配置价格
          this.queryCustomVM()
        },
        deep: true
      },
      // 选中的VPC发生变化
      'PecsInfo.vpc'(){
        this.changeNetwork()
      },
      // 公网IP带宽变化
      'PecsInfo.IPConfig.bandWidth'(){
        this.queryIPPrice()
      },
      // 磁盘变化，重新计算价格
      'PecsInfo.dataDiskList': {
        handler: function () {
          this.queryDiskPrice()
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
      },
      // 磁盘变化，重新计算价格
      'PdiskInfo.dataDiskList': {
        handler: function () {
          this.queryDiskPriceInDisk()
        },
        deep: true
      },

      // 公网IP选择区域发生变化
      'PeipInfo.zone': {
        handler: function () {
          // 重新查询自定义IP的所属vpc，即虚拟私有云
          this.queryIPVpc()
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
          line-height: 83px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background-color: #F7F7F7;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2
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
          &:last-of-type {
            border-right: 1px solid #d9d9d9;
          }
        }
        .zoneSelect {
          border-color: #2A99F2;
          background-color: #2A99F2;
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
            background-color: #2A99F2;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
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
      border: 1px solid #2A99F2;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #2A99F2
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
</style>
