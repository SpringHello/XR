<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云主机</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云主机是一台配置好了的服务器，它有您期望的硬件配置、操作系统和网络配置。XRcloud为您提供的云主机具有安全、弹性、高性能等特点。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary">+ 创建</Button>
          <Button type="primary" :disabled="true">关机</Button>
          <Button type="primary">开机</Button>
          <Button type="primary">重启</Button>
          <Button type="primary">删除</Button>
          <Dropdown style="margin-left: 10px;vertical-align: middle;" @on-click="hideEvent" class="moreOperation">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <!-- 加入负载均衡 -->
              <Dropdown-item name="backup">加入负载均衡</Dropdown-item>
              <!-- 绑定ip-->
              <Dropdown-item name="backup">绑定IP</Dropdown-item>
              <!-- 重命名 -->
              <Dropdown-item name="rename">重命名</Dropdown-item>
              <!--资费变更 -->
              <Dropdown-item name="ratesChange">资费变更</Dropdown-item>
              <!-- 续费 -->
              <Dropdown-item name="renewal">主机续费</Dropdown-item>
              <!-- 备份 -->
              <Dropdown-item name="backup">制作快照</Dropdown-item>
              <!-- 镜像 -->
              <Dropdown-item name="mirror">制作镜像</Dropdown-item>
              <!-- 解绑公网IP-->
              <Dropdown-item name="mirror">解绑公网IP</Dropdown-item>
              <!-- 升级 -->
              <Dropdown-item name="upgrade">
                主机升级<span
                style="display:inline-block;background-color: #f24746;color:#fff;margin-left:20px;width: 18px;height: 18px;border-radius: 50%;text-align: center;line-height: 17px;">惠</span>
              </Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <Table :columns="hostListColumns" :data="hostListData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="hostPages" :current="1" :page-size="5"></Page>
          </div>
        </div>
      </div>
    </div>

    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择认证方式
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>企业级无限量的资源建立额度</p>
          <p><i></i>专业免费的点对点咨询服务</p>
        </div>
      </div>
      <div style="display: flex;margin-top:20px">
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('person')">立即认证</Button>
        </div>
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('company')">立即认证</Button>
        </div>
      </div>
      <div slot="footer">
        <p class="modal-text-hint-bottom">
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        showModal: {
          selectAuthType: false
        },
        hostListColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名称/唯一名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'name'
          },
          {
            title: '主机配置',
            key: 'name'
          },
          {
            title: '镜像系统',
            key: 'name'
          },
          {
            title: 'IP地址',
            key: 'name'
          },
          {
            title: '创建时间/到期时间',
            key: 'name'
          },
          {
            title: '计费类型',
            key: 'name',
            filters: [
              {
                label: '包年',
                value: 1
              },
              {
                label: '包月',
                value: 2
              },
              {
                label: '实时',
                value: 3
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.name === 'Joe';
              } else if (value === 2) {
                return row.name === 'John Brown';
              }
            }
          },
          {
            title: '操作',
            key: 'name'
          },
        ],
        hostListData: [{}, {}, {}, {}],
        hostPages: 50
      }
    },
    created() {
      // 用户未认证，弹出认证提示框
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true
      }
    },
    methods: {
      hideEvent(name) {
        console.log(name)
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .selectAuthType {
    width: 50%;
    h2 {
      text-align: center;
      font-size: 16px;
      color: rgba(17, 17, 17, 0.75);
      margin-bottom: 20px;
    }
    p {
      position: relative;
      font-size: 14px;
      color: rgba(17, 17, 17, 0.65);
      margin-bottom: 10px;
      padding-left: 60px;
      i {
        transform: rotate(-45deg);
        position: absolute;
        width: 7px;
        height: 4px;
        top: 5px;
        left: 62px;
        border-left: 1px solid #3DBD7D;
        border-bottom: 1px solid #3DBD7D;
        display: inline-block;
      }
      &::before {
        margin-right: 7px;
        content: '';
        width: 12px;
        height: 12px;
        border: 1px solid #3DBD7D;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

</style>
