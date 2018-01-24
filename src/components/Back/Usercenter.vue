<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 用户信息</span>
      <div id="content">
        <p class="title">用户信息</p>
        <Tabs type="card" :animated="false">
          <!--未认证-->
          <TabPane label="个人信息" v-if="authInfo==undefined">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;color: #2A99F2;">添加认证信息</span>
                </div>
                <div>
                  <img src="../../assets/img/usercenter/avatar.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">未认证用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">个人认证信息</p>
            <div v-for="(authType,index) in authTypes" :key="index">
              <div class="authType-wrapper">
                <p>{{authType.title}}</p>
                <Button type="primary" style="float:right">立即验证</Button>
              </div>
              <div>认证流程</div>
            </div>
          </TabPane>
          <!--个人认证-->
          <TabPane label="个人信息" v-else-if="userInfo.personalauth==0&&userInfo.companyauth==1">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.realname}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:4px 8px;color:#ffffff;border-radius: 5px;">
                    个人认证
                  </div>
                </div>
                <div>
                  <img src="../../assets/img/usercenter/avatar.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">个人用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{authInfo.phone}}</span>
                </div>

              </div>
            </div>
          </TabPane>
          <TabPane label="提醒设置">

          </TabPane>
          <TabPane label="安全设置">

          </TabPane>
          <TabPane label="企业信息">

          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        authTypes: [
          {
            title: '通过身份证照片验证',
            step: ['填写个人资料', '平台审核', '认证完成']
          },
          {
            title: '快速验证',
            step: ['填写个人资料', '填写个人身份资料', '认证完成']
          }
        ]
      }
    },
    computed: mapState({
      // 传字符串参数 'count' 等同于 `state => state.count`
      userInfo: 'userInfo',
      authInfo: 'authInfo'
    })
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #background {
    background-color: #f5f5f5;
    width: 100%;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      #content {
        > .title {
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          margin-bottom: 20px;
        }
        .info-title {
          font-size: 22px;
          color: rgba(17, 17, 17, 0.75);
          letter-spacing: 1.31px;
          margin-bottom: 20px;
        }
        .user-info {
          display: flex;
        }
        .authType-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #D9D9D9;
          border-radius: 4px;
          padding: 20px;
          > p {
            display: inline-flex;
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }
</style>
