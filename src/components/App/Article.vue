<template>
  <div style="background: #FFF">
    <div class="center">
      <ul class="title">
        <p>新闻资讯</p>
        <li v-for="type in articleType">
          <router-link :to="type.id.toString()">{{ type.typename }}</router-link>
        </li>
      </ul>
      <div class="body">
        <div class="body-left">
          <div class="item" v-for="item in articleList">
            <router-link :to="`${item.code}.html`" target="_blank">
              <div class="item-left">
                <img style="width:121px;height:75px;"
                     :src="item.coverUrl"/>
              </div>
              <div class="item-right">
                <p class="item-title">{{ item.title}}</p><span>{{ item.createtime}} </span>
                <p class="item-content" v-html="item.abstracts"></p>
                <div class="item-label">
                  <span v-for="label in item.labels">{{ label.name}}</span>
                </div>
              </div>
            </router-link>
          </div>
          <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.currentPage"
                style="float:right;margin-top: 20px;"
                @on-change="pageUpdate"></Page>
        </div>
        <div class="body-right">
          <div class="hot-tags">
            <h3>热门标签</h3>
            <div class="tags">
              <Button type="ghost" v-for="(tag,index) in tags" :key="index" shape="circle"
                      @click="update(tag.keywordsval)" :class="{active:keywordVal==tag.keywordsval}">{{
                tag.keywordsval }}
              </Button>
            </div>
          </div>
          <div class="hot-information">
            <h3>热门资讯</h3>
            <div v-for="h in hot" class="info">
              <router-link :to="`${h.code}.html`" target="_blank">
                <div class="hotInfo-title">
                  <p><span class="htitle">{{h.title}}</span><span class="time">{{h.createtime}}</span></p>
                </div>
                <p class="hotInfo-content" v-html="h.abstracts"></p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default{
    name: 'art',
    beforeRouteEnter (to, from, next) {
      let keywordVal = sessionStorage.getItem('keywords') || ''
      let articleType = axios.get('article/getArticleType.do')
      let moreArticle = axios.post('article/getMoreArticle.do', {
        articleTypeId: to.params.typeId,
        keywordVal: keywordVal,
        page: '1',
        pageSize: '5'
      })
      let keywords = axios.get('article/getKeywords.do')
      let hot = axios.get('article/getHotInformation.do', {
        params: {
          size: 4
        }
      })
      Promise.all([articleType, moreArticle, keywords, hot]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    data(){
      let keywords = sessionStorage.getItem('keywords') || ''
      sessionStorage.removeItem('keywords')
      return {
        articleType: [],
        articleList: [],
        tags: [],
        hot: [],
        pageInfo: {
          currentPage: 1,
          pageSize: 5,
          total: 0
        },
        // 选中的标签
        keywordVal: keywords
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.pageInfo.currentPage = 1
      axios.post('article/getMoreArticle.do', {
        articleTypeId: to.params.typeId,
        keywordVal: this.keywordVal,
        page: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      }).then(response => {
        this.articleList = response.data.result.data
        this.pageInfo.total = response.data.result.total
      })
      next()
    },
    methods: {
      setData(values){
        this.articleType = values[0].data.result
        this.articleList = values[1].data.result.data
        this.pageInfo.total = values[1].data.result.total
        this.tags = values[2].data.result
        this.hot = values[3].data.result
      },
      update(keywordVal){
        this.keywordVal = this.keywordVal == keywordVal ? '' : keywordVal
        axios.post('article/getMoreArticle.do', {
          articleTypeId: this.$route.params.typeId,
          keywordVal: this.keywordVal,
          page: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(response => {
          this.articleList = response.data.result.data
          this.pageInfo.total = response.data.result.total
        })
      },
      pageUpdate(current){
        this.pageInfo.currentPage = current
        this.update('')
      }
    }
  }
</script>


<style rel="stylesheet/less" lang="less" scoped>
  .center {
    width: 1200px;
    margin: 0 auto;
    padding: 46px 0 61px;
    .title {
      border-bottom: 1px solid #D8D8D8;
      p {
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        width: 160px;
        font-size: 28px;
        line-height: 28px;
        display: inline-block;
        margin-bottom: 20px;
      }
      li {
        display: inline-block;
        vertical-align: baseline;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        a {
          padding: 18px 10px;
          color: #333;
          &.router-link-active {
            color: #2d8cf0;
            border-bottom: 2px solid #2d8cf0;
          }
        }
      }
    }
    .body {
      display: flex;
      padding-top: 20px;
      .body-left {
        width: 60%;
        float: left;
        border-right: 1px solid #D8D8D8;
        padding-right: 20px;
        .item {
          margin-top: 20px;
          a {
            display: flex;
          }
          .item-left {
            margin-right: 20px;
          }
          .item-right {
            width: 80%;
            border-bottom: 1px solid #D8D8D8;
            .item-title {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
            }
            span {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(153, 153, 153, 1);
              float: right;
              line-height: 18px;
            }
            .item-content {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
              margin-top: 10px;
            }
            .item-label {
              margin-top: 11px;
              margin-bottom: 20px;
              span {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                padding: 6px 18px;
                border: 1px solid #d8d8d8;
                border-radius: 18px;
                margin-right: 20px;
              }
            }
          }
        }
        .item:nth-child(1) {
          margin-top: 0;
        }
      }
      .body-right {
        padding-left: 20px;
        padding-right: 20px;
        width: 40%;
        h3 {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          font-weight: normal;
        }
        .hot-tags {
          .tags {
            button {
              margin-top: 20px;
              margin-right: 20px;
            }
          }
        }
        .hot-information {
          margin-top: 20px;
          .info {
            margin-top: 20px;
            .hotInfo-title {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              .htitle {
                width: 250px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .time {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                float: right;
              }
            }
            .hotInfo-content {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }

</style>
