<template>
  <div>
    <div class="scene-page" v-for="item in currentSceneGroup" v-if="item.currentScene == scene"
         :style="{ 'background-image': 'url(' + item.bannerImg + ')','background-repeat':'no-repeat','background-size':'cover' }">
      <div class="center">
        <div class="head">
          <div class="title">
            <h3>{{ item.currentScene }}</h3>
          </div>
          <div class="content">
            {{ item.disc }}
          </div>
          <div class="footer">
            <a @click="otherSceneShow = !otherSceneShow">查看其它场景></a>
            <transition name="slide-fade">
              <ul v-show="otherSceneShow">
                <li v-for="otherScene in sceneGroup">
                  <a :href="'/ruicloud/sceneInfo/'+otherScene.link">
                    {{otherScene.name}}
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="body">
          <h2>典型配置推荐</h2>
          <div class="configGroup">
            <div v-for="(cfg,index1) in item.configGroup" class="config" :class="{gpu: scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'}">
              <div class="cf-title">{{cfg.title}}</div>
              <div class="cf-body">
                <div class="cf-content">
                  <ul v-if="scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'">
                    <li v-for="(item1,index) in cfg.configs" :class="{special: index == 6|| index == 9}">
                      <span :class="{s1: index == 0||index == 6|| index == 9}">{{ item1.text}}</span>
                      <span :class="{s2: index == 1|| index == 2 || index == 3|| index == 4}">{{ item1.value}}</span></li>
                    <li class="special"><span class="s1">选择系统</span></li>
                    <Select v-model="cfg.system" style="width:170px;margin-bottom: 10px">
                      <Option v-for="item3 in systemGroup" :value="item3.value" :key="item3.value">{{ item3.label }}</Option>
                    </Select>
                    <li style="margin-top: 10px"><span class="s1">选择区域</span></li>
                    <Select v-model="cfg.zoneId" style="width:170px;">
                      <Option v-for="item2 in areaGroup" :value="item2.value" :key="item2.value">{{ item2.name }}</Option>
                    </Select>
                  </ul>
                  <ul v-else>
                    <li v-for="(item1,index) in cfg.configs" :class="{special: index == 4|| index == 7}">
                      <span :class="{s1: index == 0||index == 4|| index == 7}">{{ item1.text}}</span>
                      <span :class="{s2: index == 1|| index == 2 || index == 5}">{{ item1.value}}</span></li>
                    <li class="special"><span class="s1">选择系统</span></li>
                    <Select v-model="cfg.system" style="width:170px;margin-bottom: 10px">
                      <Option v-for="item3 in systemGroup" :value="item3.value" :key="item3.value">{{ item3.label }}</Option>
                    </Select>
                    <li style="margin-top: 10px"><span class="s1">选择区域</span></li>
                    <Select v-model="cfg.zoneId" style="width:170px;"
                            @on-change="getOriginalPrice(index1)">
                      <Option v-for="item2 in areaGroup" :value="item2.value" :key="item2.value">{{ item2.name }}</Option>
                    </Select>
                  </ul>
                </div>
                <div class="cf-footer">
                  <p><span>押金：</span>{{ cfg.currentPrice}}</p>
                  <p>原价：¥{{cfg.originalPrice}}</p>
                  <Button type="primary" :disabled="scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'">立即使用</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../util/axiosInterceptor'
  import $store from '../../vuex'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setData(to.params.type)
        vm.getRegion()
      })
    },
    beforeRouteUpdate(to, from, next) {
      next(vm => {
        vm.setData(to.params.type)
        vm.getRegion()
      })
    },
    data() {
      return {
        currentSceneGroup: [
          {
            currentScene: '云电脑',
            disc: ' 云电脑是由新睿云所提供的云上虚拟Windows桌面服务，为用户提供随时随地高效接入PC的便利。云电脑可按需申请轻松使用，助您打造更精简、更安全、更低维护成本、更高服务效率的个人PC使用系统。借助新睿云，无论您使用何种终端设备，云电脑都可以让您拥有完整的高性能PC使用体验。云电脑为您提供持续、安全、稳定、高性价比的BYOD模式云端计算服务。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner1.png')
          },
          {
            currentScene: '个人建站',
            disc: ' 基于新睿云个人建站服务，助您轻松获得一站式的建站服务方案支持。包括配置好各类开源建站镜像模板，帮助您快速搭建网站、微博、论坛等服务内容；可无限扩容的对象存储OSS服务帮助您存储网站内容与数据；域名购买注册系统、备案系统等一套完整的服务流程。并且因所有内容部署于云端，您可以根据内容与实际需要，弹性调整您的计算规格与资源大小，合理控制预算，以极具性价比的方式完成个人网站搭建。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner2.png')
          },
          {
            currentScene: '个人网盘',
            disc: ' 独立服务模式数据安全存储、多终端同步、文件在线预览，个人网盘让您的数据存储于传输有更简单可靠的选择。新睿云个人网盘服务具有使用方便、管理简单、稳定可靠等特点。具备多协议支持能力（包括FTP、FTPS、SFTP等文件传输协议）；远程文件查找能力；多标签界面管理能力；断点续传；站点管理与传输队列管理等能力。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner3.png')
          },
          {
            currentScene: '软件研发',
            disc: '基于新睿云云主机的集成开发环境包含jave的Eclipse、PHP的Sublime、PHPstrom、Python的PyCharm。帮助您快速部署开发环境与依赖包，降低开发前期准备并提升研发效率。借助新睿云成熟的云计算基础服务能力，开发人员可以随时创建与释放所需的开发环境与相关计算资源，主机信息可自动与手动备份，多种方式保障您的数据安全。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner4.png')
          },
          {
            currentScene: '云游戏服务',
            disc: '新睿云游戏应用能够帮助您实现任意设备的游戏体验: 在任意 PC、Mac、平板电脑、智能手机以及电视上的高画质、低延迟的多设备游戏体验；点击即玩的便捷: 任何时候都可以在云端访问一系列游戏和保存游戏。 在任何地点、任意设备上均可开始新游戏或继续之前的游戏进度；减少麻烦: 没有新硬件、没有复杂的设置、没有游戏光盘、没有数字下载、没有游戏安装、没有游戏补丁。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '329.00',
                originalPrice: '678.00',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '699.00',
                originalPrice: '1278.00',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '2083.00',
                originalPrice: '3678.00',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '',
                  }
                ],
                currentPrice: '2083.00',
                originalPrice: '3678.00',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner5.png')
          },
          {
            currentScene: '图形设计',
            disc: '工程制图、游戏、电影领域有大量需要高计算量的场景需要企业或个人投入较高成本来提高生产计算能力和生产效率。现在借助新睿云3D设计，以远低于自购设备的价格来获取更为稳定优质的计算资源能力提升，成倍提高您的设计工作效率和渲染效率。并且，新睿云3D设计提供按需付费方式，以小时级为单位来获取工业级GPU计算服务能力。 ',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner6.png')
          },
          {
            currentScene: '人工智能',
            disc: ' 云电脑是由新睿云所提供的云上虚拟Windows桌面服务，为用户提供随时随地高效接入PC的便利。云电脑可按需申请轻松使用，助您打造更精简、更安全、更低维护成本、更高服务效率的个人PC使用系统。借助新睿云，无论您使用何种终端设备，云电脑都可以让您拥有完整的高性能PC使用体验。云电脑为您提供持续、安全、稳定、高性价比的BYOD模式云端计算服务。',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner7.png')
          },
          {
            currentScene: '超级运算',
            disc: '新睿云深度学习平台基于强劲的 GPU 计算资源，在配置Tesla P40和Tesla P100的基础上。各个行业都可以帮助您成倍提高计算和工作效率。比如在计算机视觉与图像处理领域，图像处理与计算机视觉算法是计算密集型算法。NVIDIA&#174 CUDA&#174 加速技术可帮助解决该挑战，从而帮助此类应用程序实现交互式视频的帧率性能。用户可在深度学习平台上使用 GPU 或 CPU 进行单机或分布式深度学习模型训练与推断，并可享受云计算弹性特性，按需进行横向、纵向扩展。',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner8.png')
          },
        ],
        scene: '云电脑',
        sceneGroup: [
          {name: '云电脑', link: 'host'},
          {name: '个人建站', link: 'web'},
          {name: '个人网盘', link: 'disk'},
          {name: '软件研发', link: 'software'},
          {name: '云游戏服务', link: 'game'},
          {name: '图形设计', link: 'design'},
          {name: '人工智能', link: 'AI'},
          {name: '超级运算', link: 'supercomputing'},
        ],
        otherSceneShow: false,
        areaGroup: [],
        systemGroup: [
          {
            label: 'Centos',
            value: 'linux'
          },
          {
            label: 'Windows',
            value: 'windows'
          },]
      }
    },
    methods: {
      setData(val) {
        switch (val) {
          case 'host':
            this.scene = '云电脑'
            break
          case 'web':
            this.scene = '个人建站'
            break
          case 'disk':
            this.scene = '个人网盘'
            break
          case 'software':
            this.scene = '软件研发'
            break
          case 'game':
            this.scene = '云游戏服务'
            break
          case 'design':
            this.scene = '图形设计'
            break
          case 'AI':
            this.scene = '人工智能'
            break
          case 'supercomputing':
            this.scene = '超级运算'
            break
        }
      },
      getOriginalPrice(index1) {
        console.log(index1)
      },
      getRegion() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '免费领主机'
        }).then(res => {
          if (res.data.status == 1) {
            this.areaGroup = res.data.result.optionalArea
            this.currentSceneGroup.forEach(config => {
              config.configGroup.forEach(host => {
                host.zoneId = this.areaGroup[0].value
              })
            })
          }
        })
      },
    },
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .scene-page {
    padding: 50px 0;
    .center {
      width: 1200px;
      margin: 0 auto;
      background: linear-gradient(360deg, rgba(249, 249, 249, 1) 0%, rgba(247, 247, 247, 1) 100%);
      .head {
        padding: 35px 100px 30px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        .title {
          display: flex;
          h3 {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }
        .content {
          margin: 20px 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .footer {
          position: relative;
          > a {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(42, 153, 242, 1);
          }
          ul {
            position: absolute;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            border: 1px solid rgba(232, 232, 232, 1);
            top: 20px;
            left: 0;
            width: 110px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            li {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              line-height: 32px;
              cursor: pointer;
              height: 32px;
              padding-left: 15px;
              > a {
                color: rgba(0, 0, 0, 0.65);
              }
              &:hover {
                background: #108EE9;
                > a {
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
      .body {
        padding: 30px 100px 50px;
        h2 {
          text-align: center;
          font-size: 28px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .configGroup {
          margin-top: 40px;
          display: flex;
          justify-content: space-around;
          .config {
            width: 240px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 20px 0px rgba(179, 179, 179, 1);
            &.gpu{
              width: 300px;
            }
            .cf-title {
              padding: 29px 30px 28px;
              background: rgba(55, 125, 255, 1);
              font-size: 24px;
              font-family: MicrosoftYaHei;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
            }
            .cf-body {
              padding: 20px 30px;
              .cf-content {
                border-bottom: 1px solid rgba(217, 217, 217, 1);
                padding-bottom: 10px;
                > ul {
                  > li {
                    margin-bottom: 10px;
                    span {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(102, 102, 102, 1);
                      &.s1 {
                        font-size: 16px;
                        font-family: MicrosoftYaHei;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);
                      }
                    }
                    span:nth-child(2) {
                      float: right;
                      color: rgba(178, 178, 178, 1);
                      &.s2 {
                        color: #F85E1D;
                      }
                    }
                    &.special {
                      margin-top: 20px;
                    }
                  }
                }
              }
              .cf-footer {
                > p {
                  font-size: 28px;
                  font-family: MicrosoftYaHei;
                  font-weight: 600;
                  color: rgba(208, 2, 27, 1);
                  margin-top: 10px;
                  span {
                    font-size: 20px;
                  }
                }
                p:nth-child(2) {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                  text-decoration: line-through;
                }
                button {
                  margin-top: 10px;
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  padding: 8px 40px 7px;
                }
              }
            }
          }
        }
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .6s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }
</style>
