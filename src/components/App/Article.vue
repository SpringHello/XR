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
            <router-link :to="`https://zschj.xrcloud.net/ruicloud/article/${item.code}.html`">
              <div class="item-left">
                <img style="width:121px;height:75px;"
                     :src="item.coverUrl"/>
              </div>
              <div class="item-right">
                <p class="item-title">{{ item.title}} <span>{{ item.createtime}} </span></p>
                <p class="item-content" v-html="item.abstracts"></p>
                <div class="item-label">
                  <span v-for="label in item.labels">{{ label.name}}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="body-right">
          <div class="hot-tags">
            <h3>热门标签</h3>
            <div class="tags">
              <Button type="ghost" v-for="tag in tags" shape="circle" @click="update(tag.keywordsval)">{{
                tag.keywordsval }}
              </Button>
            </div>
          </div>
          <div class="hot-information">
            <h3>热门资讯</h3>
            <div v-for="h in hot" class="info">
              <div class="hotInfo-title">
                <p>{{h.title}}</p>
                <span>{{h.createtime}}</span>
              </div>
              <p class="hotInfo-content" v-html="h.abstracts"></p>
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
      let articleType = axios.get('article/getArticleType.do')
      let moreArticle = axios.get('article/getMoreArticle.do', {
        params: {
          articletypeId: to.params.typeId,
          page: '1',
          pageSize: '5'
        }
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
      return {
        articleType: [],
        articleList: [],
        tags: [],
        hot: []
      }
    },
    beforeRouteUpdate (to, from, next) {
      axios.get('article/getMoreArticle.do', {
        params: {
          articletypeId: to.params.typeId,
          page: '1',
          pageSize: '5'
        }
      }).then(response => {
        this.articleList = response.data.result.data
      })
      next()
    },
    methods: {
      setData(values){
        this.articleType = values[0].data.result
        this.articleList = values[1].data.result.data
        this.tags = values[2].data.result
        this.hot = values[3].data.result
      },
      update(keywords){

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
      display: flex;
      p {
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        width: 160px;
        font-size: 28px;
        line-height: 28px;
      }
      li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 14px;
        a {
          padding: 12px 10px;
          &.router-link-active {
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
          display: flex;
          margin-top: 20px;
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
              span {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                float: right;
              }
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
              span {
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
