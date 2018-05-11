<template>
  <div class="background">
    <div class="card">
      <span>首页 / 备案详情</span>
      <div class="center">
        <div class="center_title">
          <div style="width:1020px;">
            <div style="display:flex">
              <span style="font-size:16px;color:#2A99F2;">备案域名</span>
              <div class="click_icon icons" @click="toolShow(isIcon)" :class="{hide_icon:!isIcon}"></div>
            </div>
            <div style="width:100%;">
              <ul>
                <li class="list_item">备案ID:rtr-589jg294</li>
                <li class="list_item">备案类型:{{hostUnitList[0].recordtype}}</li>
                <li class="list_item">备案主体:{{hostUnitList[0].webname}}</li>
                <li class="list_item">当前状态:{{hostUnitList[0].status}}</li>
                <li class="list_item">最近更新时间:{{hostUnitList[0].lastupdatetime}}</li>
              </ul>
            </div>
          </div>
          <div style="width:120px;">
            <div class="back_button" @click="$router.go(-1)"><span>返回</span></div>
            <div class="refresh_button" @click="details"><span>刷新</span></div>
          </div>
        </div>
        <!--主办单位信息-->
        <div v-show="isIcon">
          <div class="info_box" >
            <div style="margin-bottom:10px;display:flex;display:-webkit-flex;width:100%;">
              <div class="click_icon icons" :class="{hide_icon:!isIconSon}" @click="infoBoxShow('information')"></div>
              <div style="margin-left:5px;">
                <span>主办单位信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconSon">
              <ul class="nav_list">
                <li class="nav_item">主体单位所属区域</li>
                <li class="nav_item">主体单位证件类型</li>
                <li class="nav_item">主体单位性质</li>
                <li class="nav_item">主体单位证件号码</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">{{hostUnitList[0].maincompanyarea}}</li>
                <li class="nav_item">{{hostUnitList[0].maincompanycertificatestype}}</li>
                <li class="nav_item">{{hostUnitList[0].maincompanynature}}</li>
                <li class="nav_item">2019xxxxxxxxxx222</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">主体单位名称</li>
                <li class="nav_item">主体单位证件住所</li>
                <li class="nav_item">主体单位通信地址</li>
                <li class="nav_item">投资人或主管单位姓名</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">我是单位名称</li>
                <li class="nav_item">我是住所</li>
                <li class="nav_item">我是通信地址</li>
                <li class="nav_item">我是姓名</li>
              </ul>
            </div>
          </div>
          <!--主办单位负责人信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconPerson}" @click="infoBoxShow('personInfo')"></div>
              <div style="margin-left:5px;">
                <span>主办单位负责人信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconPerson">
              <ul class="nav_list">
                <li class="nav_item">法人姓名</li>
                <li class="nav_item">法人证件类型</li>
                <li class="nav_item">法人证件号码</li>
                <li class="nav_item">办公室电话</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">最多显示长度为20个字符站位站位站位站站</li>
                <li class="nav_item">我是证件类型</li>
                <li class="nav_item">我是单位性质</li>
                <li class="nav_item">2019xxxxxxxxxx222</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">主体单位名称</li>
                <li class="nav_item">主体单位证件住所</li>
                <li class="nav_item">主体单位通信地址</li>
                <li class="nav_item">投资人或主管单位姓名</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">我是单位名称</li>
                <li class="nav_item">我是住所</li>
                <li class="nav_item">我是通信地址</li>
                <li class="nav_item">我是姓名</li>
              </ul>
            </div>
          </div>
          <!--网站基本信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconInfo}" @click="infoBoxShow('webInfo')"></div>
              <div style="margin-left:5px;">
                <span>网站基本信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconInfo">
              <ul class="nav_list">
                <li class="nav_item">网站名称</li>
                <li class="nav_item">网站域名</li>
                <li class="nav_item">网站首页URL</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">最多显示长度为20个字符站位站位站位站站</li>
                <li class="nav_item">我是证件类型</li>
                <li class="nav_item">我是单位性质</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">网站服务内容</li>
                <li class="nav_item">网站语言</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">我是单位名称</li>
                <li class="nav_item">我是住所</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <!--网站负责人基本信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconWebPerson}" @click="infoBoxShow('webPersonInfo')"></div>
              <div style="margin-left:5px;">
                <span>网站负责人基本信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconWebPerson">
              <ul class="nav_list">
                <li class="nav_item">姓名</li>
                <li class="nav_item">有效证件类型</li>
                <li class="nav_item">有效证件号码</li>
           
              </ul>
              <ul class="nav_list">
                <li class="nav_item">最多显示长度为20个字符站位站位站位站站</li>
                <li class="nav_item">我是证件类型</li>
                <li class="nav_item">我是单位性质</li>
                
              </ul>
              <ul class="nav_list">
                <li class="nav_item">办公室电话号码</li>
                <li class="nav_item">移动电话号码</li>
                <li class="nav_item">电子邮箱地址</li>
                
              </ul>
              <ul class="nav_list">
                <li class="nav_item">我是单位名称</li>
                <li class="nav_item">我是住所</li>
                <li class="nav_item">我是通信地址</li>
                
              </ul>
            </div>
          </div>
          <!--ISP备案网站接入信息-->
          <div class="info_box">
            <div style="margin-bottom:10px;display:flex">
              <div class="click_icon icons" :class="{hide_icon:!isIconISP}" @click="infoBoxShow('inforISP')"></div>
              <div style="margin-left:5px;">
                <span>ISP备案网站接入信息</span>
              </div>
            </div>
            <div class="tables" v-show="isIconISP">
              <ul class="nav_list">
                <li class="nav_item">ISP名称</li>
                <li class="nav_item">网站IP地址</li>
                <li class="nav_item">网站接入方式</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">最多显示长度为20个字符站位站位站位站站</li>
                <li class="nav_item">我是证件类型</li>
                <li class="nav_item">我是单位性质</li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">服务器放置地</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
              <ul class="nav_list">
                <li class="nav_item">我是单位名称</li>
                <li class="nav_item"></li>
                <li class="nav_item"></li>
              </ul>
            </div>
          </div>
          <div class="info_box">
            <div>
              <div style="margin-bottom:10px;">
                <div style="margin-left:5px;">
                  <span>主办单位与负责人相关资料</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">主办单位负责人照片</li>
                  <li class="tab_item">点击查看</li>
                  <li class="tab_item">主办单位照片</li>
                  <li class="tab_item">位置</li>
                </ul>
              </div>
            </div>
            <div>
              <div style="margin-bottom:10px;margin-top: 6px;">
                <div style="margin-left:5px;">
                  <span>域名证书与网站核验单</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">域名证书</li>
                  <li class="tab_item">点击查看</li>
                  <li class="tab_item">网站核验单</li>
                  <li class="tab_item" @click="checkList = true">位置</li>
                </ul>
              </div>
            </div>
            <div>
              <div style="margin-bottom:10px;margin-top: 6px;">
                <div style="margin-left:5px;">
                  <span>其他资料</span>
                </div>
              </div>
              <div class="tables">
                <ul class="tab_list">
                  <li class="tab_item">其他资料</li>
                  <li class="tab_item">点击查看</li>
                  <li class="tab_item"></li>
                  <li class="tab_item"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Modal
        v-model="checkList"
        title="重新上传网站备案信息真实性核验单信息"
        @on-ok="ok"
        >
        <p>1、点击下载《网站备案信息真实性核验单》</p>
        <p>2、查看核验单样例图，填写以下载的核验单，不得涂改</p>
        <p>3、请您保存3份签字的核验单原件以备后续环节试用</p>
        <div style="width:490px;height:351px;margin-top:10px;border:1px solid #D8D8D8;">
            
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //图标切换
      isIcon: true,
      //主办单位信息隐藏与否
      isIconSon: true,
      //主办单位负责人隐藏与否
      isIconPerson: true,
      //网站基本信息
      isIconInfo: true,
      //网站负责人基本信息
      isIconWebPerson: true,
      //ISP备案网站接入信息
      isIconISP: true,
      //网站核验单
      checkList: false,
      hostUnitList: []
    };
  },
  methods: {
    //图标切换方法
    toolShow(isIcon) {
      this.isIcon = !isIcon;
    },
    infoBoxShow(value) {
      if (value == "information") {
        this.isIconSon = !this.isIconSon;
      } else if (value == "personInfo") {
        this.isIconPerson = !this.isIconPerson;
      } else if (value == "webInfo") {
        this.isIconInfo = !this.isIconInfo;
      } else if (value == "webPersonInfo") {
        this.isIconWebPerson = !this.isIconWebPerson;
      } else if (value == "inforISP") {
        this.isIconISP = !this.isIconISP;
      }
    },
    //查看备案详情
    details() {
      let id = sessionStorage.getItem("id");
      this.$http
        .get("recode/listMainWeb.do", {
          params: {
            id: id,
            recordtype: "",
            status: ""
          }
        })
        .then(res => {
          if(res.data.status == 1){
             this.hostUnitList = res.data.result;
            
          }else{
            console.log('出错了');
          }
        });
    }
  },
  mounted() {
    this.details();
  }
};
</script>

<style lang="less" scoped>
.background {
  background-color: #f5f5f5;
  width: 100%;
  // height: 100%;
  font-family: MicrosoftYaHei;
  //图标箭头向下样式
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
  //图标向上样式
  .hide_icon.icons {
    transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }
  .card {
    width: 1200px;
    margin: 0 auto;
    & > span {
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 12px;
      color: rgba(17, 17, 17, 0.43);
      line-height: 22px;
      padding: 11px 0px;
      display: block;
    }
    .center {
      width: 1200px;
      background: #ffffff;
      // height: 900px;
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
      > span {
        color: #333333;
      }
      .tables {
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        display: flex;
        display: -webkit-flex;
      }
      .nav_list {
        width: 280px;
        height: 150px;
        .nav_item {
          padding: 5px 10px 5px 10px;
          height: 38px;
          border-right: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
        }
        .nav_item:nth-child(odd) {
          background-color: #d9d9d9;
        }
      }
      .tab_list {
        height: 39px;

        .tab_item {
          padding: 5px 10px 5px 10px;
          float: left;
          width: 279px;
          height: 39px;
          border-right: 1px solid #e9e9e9;
        }
        .tab_item:last-child {
          border: none;
        }
        .tab_item:nth-child(even) {
          color: #2a99f2;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

