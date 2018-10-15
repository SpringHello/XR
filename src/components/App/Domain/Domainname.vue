<template>
  <div style="background: #FFF; font-family:PingFangSC-Regular;" id="domain">
    <div class="topOne">
      <p>域名注册全新上线</p>
      <span>帮助建立您的网上业务，从这里开始…</span>
      <div class="search">
        <Input v-model="searchText" style="width: 550px;" size="large" placeholder="请输入您要查找的域名">
        <div slot="append" @click="choose=!choose"
             style="margin: -14px -7px;width: 70px;height: 50px;vertical-align: middle;cursor:pointer">
          <Icon type="arrow-down-b"
                style="margin: 0px -7px;top: 50%;position: absolute;transform: translateY(-50%);"></Icon>
        </div>
        </Input>
        <button @click="textSearch">搜索</button>
        <div v-show="choose" class="change">
          <div class="change-top">
            <RadioGroup v-model="suffix" @on-change="changeSuffix">
              <Radio label="english">英文域名</Radio>
              <Radio label="chinese">中文域名</Radio>
              <Radio label="administrative">行政域名</Radio>
            </RadioGroup>
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
    <div class="content">
      <div class="content-steps">
        <p><span><<<<<<<<<<</span>域名申请流程<span>>>>>>>>>>></span></p>
        <ul>
          <li v-for="(item,index) in domainList" :key="index">
            <img :src="item.img">
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
        <p><span><<<<<<<<<<</span>平台优势<span>>>>>>>>>>></span></p>
        <ul>
          <li v-for="(adv,index) in advantage" :key="index">
            <img :src="adv.img">
            <p>{{adv.title}}</p>
            <span>{{adv.desc}}</span>
          </li>
        </ul>
      </div>
      <div class="selective">
        <p><span><<<<<<<<<<</span>域名选购技巧<span>>>>>>>>>>></span></p>
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
    beforeRouteEnter(to, from, next){
      next()
    },
    data(){
      window.scrollTo(0, 0);
      return {
        choose: false,
        searchText: '',
        select: ['com'],
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
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#F85E1D',
                  fontSize: '16px'
                }
              }, '35')
            }
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
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#F85E1D',
                  fontSize: '14px'
                }
              }, '2000')
            }
          },
        ],
        data: [
          {
            type: '.com',
            priceNew: '38/年',
          },
          {
            type: '.cn',
            priceNew: '23/年',
          },
          {
            type: '.top',
            priceNew: '35/年',
          },
          {
            type: '.net',
            priceNew: '32/年',
          },
          {
            type: '.com.cn',
            priceNew: '20/年',
          },
          {
            type: '.wang',
            priceNew: '20/年',
          },
          {
            type: '.xyz',
            priceNew: '21/年',
          },
          {
            type: '.online',
            priceNew: '45/年',
          },
          {
            type: '.shop',
            priceNew: '34/年',
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
        tokenId: '',
        suffix: 'english',
        getSuffix: {},
        showSuffix: [],
        suffixList: []
      }
    },
    methods: {
      changeSuffix(){
        switch (this.suffix) {
          case 'english':
            this.showSuffix = this.getSuffix.en
            break;
          case 'chinese':
            this.showSuffix = this.getSuffix.cn
            break;
          case 'administrative':
            this.showSuffix = this.getSuffix.xz
            break;
        }
      },

      textSearch(){
        if (this.searchText == '') {
          return this.$Message.info('请输入您要查找的域名')
        } else {
          sessionStorage.setItem('name', this.searchText)
          sessionStorage.setItem('token', this.tokenId)
          sessionStorage.setItem('suffix', JSON.stringify(this.suffixList))
          sessionStorage.setItem('suffixChange', JSON.stringify(this.getSuffix))
          this.$router.push('DomainResult')
        }
      },

    },
    created(){
      axios.post('user/getRuiRadosApiacess.do', {
        zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
        companyId: '153250898029'
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          axios.get('user/getXrdomainToken.do', {
            params: {
              companyId: '153250898029',
              secret: response.data.data.data
            }
          }).then(res => {
            this.tokenId = res.data.token
            axios.post('domain/getSuffix.do', {
              token: this.tokenId
            }).then(res => {
              this.getSuffix = res.data.data
              this.showSuffix = this.getSuffix.en
            })
          })
        }
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .topOne {
    height: 400px;
    padding: 87px 0 81px 0;
    text-align: center;
    background: url('../../../assets/img/domain/banner.png') no-repeat;
    p {
      font-size: 48px;
      color: rgba(255, 255, 255, 1);

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
      height: 70px;
      border-radius: 4px;
      background: rgba(55, 125, 255, 0.5);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        height: 36px;
        background: rgba(255, 231, 119, 1);
        font-size: 20px;
        color: rgba(0, 0, 0, 1);
        padding: 4px 90px;
        outline: none;
        border: none;
        cursor: pointer;
      }
      .change {
        position: absolute;
        top: 70px;
        text-align: left;
        margin: 0 auto;
        width: 780px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(230, 230, 230, 1);
        .change-top {
          margin: 30px 35px 20px 35px;
          padding-bottom: 10px;
          border-bottom: 1px solid #D9D9D9;
        }
        .content {
          padding: 0 38px 33px 38px;
          border-top: 1px dashed #ccc;
          text-align: left;
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
      padding: 101px 0 51px 0;
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
        img {
          width: 48px;
          height: 47px;
        }
        p {
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
      padding: 101px 0 40px 0;
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
    background: linear-gradient(360deg, rgba(247, 250, 255, 1) 0%, rgba(252, 253, 255, 1) 100%);
    margin-top: 101px;
    p {
      font-size: 36px;
      color: rgba(55, 125, 255, 1);

      padding: 40px 0 51px 0;
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
    margin-top: 70px;
    padding-bottom: 80px;
    p {
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
