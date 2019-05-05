<template>
  <div style="background: #FFF; font-family:PingFangSC-Regular;" id="domain">
    <h1 id="hide-h1">域名注册查询</h1>
    <div class="domain-wrapper">
      <div class="topOne">
        <h3>域名注册全新上线</h3>
        <span>帮助建立您的网上业务，从这里开始…</span>
        <div class="search">
          <Input v-model="searchText" style="width: 550px;border-radius: 0" size="large" placeholder="请输入您要查找的域名">
          <div slot="append" @click="choose=!choose"
               style="margin: -14px -7px;width: 70px;height: 50px;vertical-align: middle;cursor:pointer;border-radius:0;">
            <Icon type="arrow-down-b"
                  style="margin: 0px -7px;top: 50%;position: absolute;transform: translateY(-50%);"></Icon>
          </div>
          </Input>
          <button @click="textSearch" class="btn">搜索</button>
          <div v-show="choose" class="change">
            <div class="change-top">
              <RadioGroup v-model="suffix" @on-change="changeSuffix">
                <Radio label="english">英文域名</Radio>
                <Radio label="chinese">中文域名</Radio>
                <Radio label="administrative">行政域名</Radio>
              </RadioGroup>
              <Checkbox v-model="showButton" @on-change="showBtn">所有后缀</Checkbox>
            </div>
            <div class="content">
              <CheckboxGroup v-model="suffixList" style="display: flex;flex-wrap: wrap;justify-content: flex-start">
                <Checkbox v-for="(item,index) in showSuffix" :key="index" :label="item" style="width:85px;">{{item}}
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-steps">
        <p><span><<<<<<<<<<</span>域名申请流程<span>>>>>>>>>>></span></p>
        <ul>
          <li v-for="(item,index) in domainList" :key="index">
            <img :src="item.img" alt="描述">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="content-price">
        <p><span><<<<<<<<<<</span>域名价格<span>>>>>>>>>>></span></p>
        <div class="table">
          <Table border :columns="columns" :data="data" stripe></Table>
        </div>
      </div>
      <div class="content-advantage">
        <h3><span><<<<<<<<<<</span>平台优势<span>>>>>>>>>>></span></h3>
        <ul>
          <li v-for="(adv,index) in advantage" :key="index">
            <img :src="adv.img" :alt="adv.title" alt="标题">
            <h3>{{adv.title}}</h3>
            <span>{{adv.desc}}</span>
          </li>
        </ul>
      </div>
      <div class="selective">
        <h3><span><<<<<<<<<<</span>域名选购技巧<span>>>>>>>>>>></span></h3>
        <ul>
          <li><span>1、</span>
            <p>系统会对您第一次注册结算成功的域名注册信息进行保存，您再次注册域名时，可以看到之前创建成功的域名信息模板;</p></li>
          <li><span>2、</span>
            <p>如果您还是用相同信息进行注册，可以选择模板，省去重复填写的工作;</p></li>
          <li><span>3、</span>
            <p>如果修改模板信息，使用此模板的域名信息会随之批量修改，此功能为批量操作，如果针对单一域名信息修改的话，只针对本条域名信息生效;</p></li>
          <li>
            <span>4、</span>
            <p>
              域名付款完成后我们会将您的注册信息提交到注册管理局做审核，在这个状态下域名为预注册状态，如果注册信息通过注册管理局后域名即为正常状态，如果您注册信息包含非常规信息可能被审核驳回，我们会将您的支付金额退还到余额中。一般域名预注册状态为瞬时状态，不会大于5分钟，如果域名一直为预注册并且已经支付成功，请联系我们客服;</p>
          </li>
          <li><span>5、</span>
            <p>域名的注册遵循先申请先注册为原则，管理认证机构对申请企业提出的域名是否违反了第三方的权利不进行任何实质性审查。在ICANN每一个域名的注册都是独一无二、不可重复的;</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  export default{
    metaInfo: {
      title: 'com、cn域名注册查询 - 个人域名注册申请 - 网站域名注册商 - 域名与备案 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '域名注册,注册域名,域名注册查询,cn域名注册,com域名注册,域名注册com,域名注册商,网站域名注册,个人注册域名,域名注册申请,个人域名注册,域名注册网站'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云提供专业的域名注册、域名查询、域名申请等服务，域名包含但不限于com域名、cn域名，是您网站域名购买的首选域名注册服务商。'
        }]
    },
    data(){
      window.scrollTo(0, 0);
      return {
        choose: false,
        searchText: '',
        domainList: [
          {name: '域名查询', img: require('../../../assets/img/domain/s-1.png')},
          {name: '加入购物清单', img: require('../../../assets/img/domain/s-2.png')},
          {name: '填写信息', img: require('../../../assets/img/domain/s-3.png')},
          {name: '确认订单', img: require('../../../assets/img/domain/s-4.png')},
          {name: '支付完成', img: require('../../../assets/img/domain/s-5.png')}
        ],
        columns: [
          {
            title: '域名类型',
            key: 'type',
            align: 'center'
          },
          {
            title: '首年注册',
            key: 'resgister',
            align: 'center',
            className: 'demo-table-info-column'
          },
          {
            title: '续费价格',
            key: 'priceNew',
            align: 'center'
          },
          {
            title: '转入价格',
            key: 'priceOld',
            align: 'center',
            className: 'demo-table-info-column'
          },
        ],
        data: [
          {
            type: '.com',
            resgister: '55（元/年）',
            priceNew: '78（元/年）',
            priceOld: '60（元/年）',
          },
          {
            type: '.cn',
            resgister: '35（元/年）',
            priceNew: '68（元/年）',
            priceOld: '30（元/年）',
          },
          {
            type: '.top',
            resgister: '9（元/年）',
            priceNew: '34（元/年）',
            priceOld: '34（元/年）',
          },
          {
            type: '.net',
            resgister: '70（元/年）',
            priceNew: '78（元/年）',
            priceOld: '68（元/年）',
          },
          {
            type: '.com.cn',
            resgister: '35（元/年）',
            priceNew: '68（元/年）',
            priceOld: '30（元/年）',
          },
          {
            type: '.wang',
            resgister: '29（元/年）',
            priceNew: '48（元/年）',
            priceOld: '48（元/年）',
          },
          {
            type: '.xyz',
            resgister: '6（元/年）',
            priceNew: '78（元/年）',
            priceOld: '78（元/年）',
          },
          {
            type: '.online',
            resgister: '7（元/年）',
            priceNew: '68（元/年）',
            priceOld: '68（元/年）',
          },
          {
            type: '.shop',
            resgister: '58（元/年）',
            priceNew: '198（元/年）',
            priceOld: '198（元/年）',
          },


        ],
        advantage: [
          {
            title: '简单方便的解析操作',
            desc: '行业通用的标准操作流程和清新便捷 的控制台界面，让域名服务有了更多的选择',
            img: require('../../../assets/img/domain/ad-1.png')
          },
          {
            title: '便捷的域名管理',
            desc: '智能查询，快速注册，您可以通过强 大的域名自助平台轻松管理。',
            img: require('../../../assets/img/domain/ad-2.png')
          },
          {
            title: '7X24小时服务',
            desc: '7X24全时售后服务，及时解决各种 售后使用问题。',
            img: require('../../../assets/img/domain/ad-3.png')
          },
        ],
        suffix: 'english',
        getSuffix: {},
        showSuffix: [],
        suffixList: [],

        showButton: false
      }
    },
    methods: {
      changeSuffix(){
        this.suffixList = []
        this.showSuffix = []
        this.showButton = false
        switch (this.suffix) {
          case 'english':
            var arry = this.getSuffix.en
            break;
          case 'chinese':
            var arry = this.getSuffix.cn
            break;
          case 'administrative':
            var arry = this.getSuffix.xz
            break;
        }
        for (var i = 0; i < arry.length; i++) {
          if (this.showSuffix.indexOf(arry[i]) == -1) {
            this.showSuffix.push(arry[i])
          }
        }
      },

      textSearch(){
        if (this.searchText == '') {
          return this.$Message.info('请输入您要查找的域名')
        }
        sessionStorage.setItem('name', this.searchText)
        sessionStorage.setItem('suffix', JSON.stringify(this.suffixList))
        sessionStorage.setItem('suffixChange', JSON.stringify(this.getSuffix))
        this.$router.push('/DomainResult')
      },

      showBtn(){
        if (this.showButton) {
          this.suffixList = this.showSuffix
        } else {
          this.suffixList = []
        }
      }
    },
    created(){
      axios.post('https://zschj.xrcloud.net/domain/getSuffix.do', {}).then(res => {
        this.getSuffix = res.data.data
        this.showSuffix = []
        var arry = this.getSuffix.en
        for (var i = 0; i < arry.length; i++) {
          if (this.showSuffix.indexOf(arry[i]) == -1) {
            this.showSuffix.push(arry[i])
          }
        }
      })
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .domain-wrapper {
    width: 100%;
    background: linear-gradient(90deg, rgba(2, 116, 255, 1) 0%, rgba(83, 160, 255, 1) 50%, rgba(4, 117, 255, 1) 100%);
    .topOne {
      width: 100%;
      height: 400px;
      padding: 87px 0 81px 0;
      text-align: center;
      background: url('../../../assets/img/domain/domain-banner.png') no-repeat center;
      h3 {
        font-size: 48px;
        color: rgba(255, 255, 255, 1);
        font-weight: normal;
      }
      span {
        display: block;
        padding: 23px 0 29px 0;
        font-size: 24px;
        color: rgba(255, 255, 255, 1);

      }
      .search {
        position: relative;
        width: 800px;
        height: 68px;
        border-radius: 4px;
        background: rgba(55, 125, 255, 0.5);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        .btn {
          height: 33px;
          padding: 3px 83px;
          background: rgba(255, 231, 119, 1);
          font-size: 20px;
          color: rgba(0, 0, 0, 1);
          outline: none;
          border: none;
          cursor: pointer;
        }
        .change {
          position: absolute;
          top: 70px;
          text-align: left;
          margin: 0 auto;
          width: 770px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(230, 230, 230, 1);
          .change-top {
            margin: 30px 35px 20px 35px;
            padding-bottom: 10px;
            border-bottom: 1px solid #D9D9D9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button {
              width: 80px;
            }
          }
          .content {
            padding: 0 38px 33px 38px;
            text-align: left;
          }
        }
      }
    }
  }

  .content {
    text-align: center;
  }

  .content-steps {
    p {
      font-size: 36px;
      color: rgba(55, 125, 255, 1);
      padding: 100px 0 51px 0;
      span {
        display: inline-block;
        font-size: 24px;
        &:first-of-type {
          padding-right: 30px;
        }
        &:last-of-type {
          padding-left: 30px;
        }
      }
    }
    ul {
      width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      display: flex;
      li {
        width: 50%;
        &:after {
          display: block;
          content: '';
          width: 150px;
          height: 1px;
          border: 1px dashed rgba(78, 140, 238, 1);
          position: relative;
          bottom: 135px;
          left: 165px;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
        list-style: none;
        > img {
          width: 48px;
          height: 47px;
        }
        > p {
          padding-top: 30px;
          font-size: 18px;
          color: rgba(145, 145, 145, 1);
        }
      }
    }
  }

  .content-price {
    p {
      font-size: 36px;
      color: rgba(55, 125, 255, 1);
      padding: 49px 0 40px 0;
      span {
        display: inline-block;
        font-size: 24px;
        &:first-of-type {
          padding-right: 30px;
        }
        &:last-of-type {
          padding-left: 30px;
        }
      }
    }
    .table {
      width: 1100px;
      margin: 0 auto;
      border: 1px solid #53A0FD;
    }
  }

  .content-advantage {
    padding-bottom: 70px;
    h3 {
      font-size: 36px;
      color: rgba(55, 125, 255, 1);
      padding: 100px 0 51px 0;
      font-weight: normal;
      span {
        display: inline-block;
        font-size: 24px;

        &:first-of-type {
          padding-right: 30px;
        }
        &:last-of-type {
          padding-left: 30px;
        }
      }
    }
    ul {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      li {
        list-style: none;
        width: 45%;
        text-align: center;
        img {
          height: 99px;
          width: 99px;
        }
        p {
          padding: 47px 0 30px 0;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);

        }
        span {
          display: block;
          width: 224px;
          margin: 0 auto;
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;

        }
      }
    }
  }

  .selective {
    background: rgba(237, 242, 250, 1);
    padding-bottom: 80px;
    h3 {
      font-weight: normal;
      font-size: 36px;
      color: rgba(55, 125, 255, 1);
      padding: 72px 0 36px 0;
      span {
        display: inline-block;
        font-size: 24px;
        &:first-of-type {
          padding-right: 30px;
        }
        &:last-of-type {
          padding-left: 30px;
        }
      }
    }
    ul {
      width: 905px;
      margin: 0 auto;
      text-align: left;
      li {
        padding-bottom: 20px;
        list-style: none;
        display: flex;
        p {
          font-size: 16px;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          padding: 0;
        }
        span {
          font-size: 16px;
          color: rgba(102, 102, 102, 1);
          display: block;
        }
      }
    }
  }
</style>
