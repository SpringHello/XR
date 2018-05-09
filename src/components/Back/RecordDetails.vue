<template>
    <div class="background">
        <div class="card">
            <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
        <div class="center">
            <div class="center_title">
                <div style="width:1020px;">
                     <div style="display:flex">
                         <span style="font-size:16px;color:#2A99F2;">备案域名</span>
                         <div class="click_icon icons" @click="toolShow(isIcon)" :class="{hide_icon:!isIcon}" ></div>
                    </div>
                    <div style="width:100%;">
                        <ul>
                            <li class="list_item">备案ID:rtr-589jg294</li>
                            <li class="list_item">备案类型:首次备案</li>
                            <li class="list_item">备案主体:XXXXXXXXXXXX</li>
                            <li class="list_item">当前状态:初审中</li>
                            <li class="list_item">最近更新时间:2017-12-30 09：50:08</li>
                        </ul>
                    </div>
                </div>
                <div style="width:120px;">
                    <div class="back_button"><span>返回</span></div>
                    <div class="refresh_button"><span>刷新</span></div>
                </div>
            </div>
            <div class="info_box" v-show="isIcon">
                <div style="margin-bottom:10px;display:flex">
                    <div class="click_icon icons"></div>
                    <div style="margin-left:5px;">
                         <span>主办单位信息</span>
                    </div>
                   
                </div>
            </div>
             <div class="info_box" v-show="isIcon">
                <div style="margin-bottom:10px;display:flex">
                    <div class="click_icon icons"></div>
                    <div style="margin-left:5px;">
                         <span>主办单位负责人信息</span>
                    </div>
                   
                </div>
            </div>
            <div class="info_box" v-show="isIcon">
                <div style="margin-bottom:10px;display:flex">
                    <div class="click_icon icons"></div>
                    <div style="margin-left:5px;">
                         <span>网站基本信息</span>
                    </div>
                   
                </div>
            </div>

            <div class="info_box" v-show="isIcon">
                <div style="margin-bottom:10px;display:flex">
                    <div class="click_icon icons"></div>
                    <div style="margin-left:5px;">
                         <span>网站负责人基本信息</span>
                    </div>
                   
                </div>
            </div>
            <div class="info_box" v-show="isIcon">
                <div style="margin-bottom:10px;display:flex">
                    <div class="click_icon icons"></div>
                    <div style="margin-left:5px;">
                         <span>ISP备案网站接入信息</span>
                    </div>
                   
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        isIcon:true
    };
  },
  methods: {
    toolShow(isIcon) {
        this.isIcon = !isIcon
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-family: MicrosoftYaHei;
  .click_icon.icons {
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #2a99f2;
    border-radius: 50%;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 3px;
  }
  .click_icon.icons::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 7px !important;
    height: 6px !important;
    border: #2a99f2 solid 1px;
    border-top-style: none;
    border-right-style: none;
  }
  .hide_icon.icons {
     transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }
  .card {
    width: 1200px;
    margin: 0 auto;
    .center {
      width: 1200px;
      background: #ffffff;
      margin-top: 30px;
      padding: 10px 20px;
      .center_title {
        border-bottom: 1px solid #d8d8d8;
        height: 64px;
        display: flex;
        .back_button {
          width: 58px;
          height: 30px;
          border: 1px solid #2a99f2;
          border-radius: 2px;
          display: inline-block;
          cursor: pointer;
          > span {
            display: block;
            height: inherit;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: #2a99f2;
          }
        }
        .refresh_button {
          width: 58px;
          height: 30px;
          border: 1px solid #2a99f2;
          border-radius: 2px;
          background-color: #2a99f2;
          display: inline-block;
          cursor: pointer;
          > span {
            display: block;
            height: inherit;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
    }
    li {
      list-style: none;
    }
    .list_item {
      display: inline;
      line-height: 40px;
      margin-right: 40px;
      font-size: 14px;
    }
    .info_box {
      width: 1160px;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      padding: 20px 20px;
      margin-top: 20px;
      display: flex;
      > span {
        color: #333333;
      }
    }
  }
}
</style>

