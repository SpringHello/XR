<template>
  <div style="background: #FFF">
    <div class="center">
      <div class="change-left">
        <ul class="title">
          <p>{{ hotTags }}</p>
        </ul>
        <div class="body">
          <div class="body-left">
            <div class="item" v-for="item in articleList">
              <router-link :to="'/ruicloud/article/'+`${item.code}.html`" target="_blank">
                <div class="item-left">
                  <div class="item-img" :style="{backgroundImage: 'url('+item.coverUrl+')'}"></div>
                </div>
                <div class="item-right">
                  <Poptip class="item-title" slot="content" trigger="hover" :content="item.title">{{ item.title}}</Poptip>
                  <p class="create-time">{{ item.author }}发布于: {{ item.createDate }} </p>
                  <p class="item-content" v-html="AppendHtml(item.abstracts)"></p>
                </div>
              </router-link>
              <div class="item-label">
                <router-link class="labelhref" v-for="label in item.keywordval" :key="item.keywordval.index" :to="label.toString()" @click.native="changeHot(label)">{{ label }}</router-link>
              </div>
            </div>
            <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.currentPage"
                  style="float:right;margin-top: 20px;"
                  @on-change="pageUpdate"></Page>
          </div>
        </div>
      </div>
      <div class="change-right">
        <div class="body-right">
          <div class="changeLabel">
            <div class="hot-tags">
              <h3><div class="licon1"></div>热门标签</h3>
              <div class="tags">
                <router-link class="tagslink" v-for="(tag,index) in tags" :key="index" target="_blank"  :to="tag.keywordsval">{{
                  tag.keywordsval }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="changeHot">
            <div class="hot-information">
              <h3><div class="licon2"></div>热门资讯</h3>
              <div v-for="h in hot" class="info">
                <router-link :to="`/ruicloud/article/${h.code}.html`" target="_blank">
                  <div class="hotInfo-title">
                    <Poptip :content="h.title" slot="content" trigger="hover" class="htitle">{{h.title}}</Poptip>
                    <p class="time">{{h.author}}发布于: {{h.createDate}}</p>
                  </div>
                  <p class="hotInfo-content" v-html="HotAppend(h.abstracts)"></p>
                </router-link>
              </div>
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
      let keywords = axios.get('article/getKeywords.do')
      let hot = axios.get('article/getHotInformation.do', {
        params: {
          size: 4
        }
      })
      Promise.all([keywords, hot]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    data(){
      let keywordsVal = sessionStorage.getItem('keywords') || ''
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
        keywordVal: keywordsVal,
        hotTags: '新闻资讯',
        noSelect: true,
        tagTypeId: 0
      }
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    watch: {
      "$route" (to, from) {
        axios.post('article/getMoreArticle.do', {
          articleTypeId: '',
          keywordVal: this.$router.history.current.params.typeId,
          page: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(response => {
          this.articleList = response.data.result.data
          this.pageInfo.total = response.data.result.total
        })
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.loadDate()
      })
    },
    methods: {
      setData(values){
        this.tags = values[0].data.result
        this.hot = values[1].data.result
      },
      loadDate(){
         // 获取到当前的路由的参数
        let searchWords = this.$router.history.current.params.typeId
        this.hotTags = searchWords
          axios.post('article/getMoreArticle.do', {
            articleTypeId: '',
            keywordVal: searchWords,
            page: '1',
            pageSize: '5'
          }).then(response => {
            this.articleList = response.data.result.data
            this.pageInfo.total = response.data.result.total
          })
      },
      pageUpdate(current){
        this.pageInfo.currentPage = current
        axios.post('article/getMoreArticle.do', {
          articleTypeId: '',
          keywordVal: this.hotTags,
          page: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(response => {
          this.articleList = response.data.result.data
          this.pageInfo.total = response.data.result.total
        })
      },
      changeHot (changeText) {
        this.hotTags = changeText
      },
      AppendHtml(str){
        return str + '...<span style="color: #4B97EE;">查看详情&gt;</span>'
      },
      HotAppend(string) {
        return string + '...<span style="color: #4B97EE;">查看详情&gt;</span>'
      }
    }
  }
</script>


<style rel="stylesheet/less" lang="less" scoped>
  .center {
    width: 1200px;
    margin: 0 auto;
    padding: 46px 0 61px;
    overflow: hidden;
    .change-left{
      float: left;
      margin-right: 40px;
      width: 730px;
      .title {
        border-bottom: 1px solid #D8D8D8;
        p {
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
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
        padding-top: 20px;
        width: 100%;
        .body-left {
          width: 100%;
          .item {
            margin-top: 20px;
            border-bottom: 1px solid #D8D8D8;
            a {
              display: flex;
            }
            .item-left {
              margin-right: 20px;
              .item-img {
                width: 160px;
                height: 140px;
                background-position: center top;
                background-repeat: no-repeat;
                background-size: cover;
              }
            }
            .item-right {
              width: 80%;
              /*border-bottom: 1px solid #D8D8D8;*/
              .item-title {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
              }
              .create-time {
                margin-top: 10px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: #999999;
                line-height: 18px;
              }
              .item-content {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 28px;
                margin-top: 10px;
              }
            }
            .item-label {
              margin-left: 180px;
              width: auto;
              margin-top: 12px;
              padding-bottom: 10px;
              overflow: hidden;
              .labelhref {
                float: left;
                font-size: 12px;
                cursor: pointer;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                padding: 6px 18px;
                border-radius:4px;
                line-height: 14px;
                border:1px solid rgba(153,153,153,1);
                margin-right: 20px;
                margin-bottom: 8px;
                &:hover  {
                  color: #ffffff;
                  border: 1px solid #ffffff;
                  background: #387dff;
                }
              }
            }
          }
          .item:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
    .change-right{
      width: 426px;
      float: right;
      .body-right {
        width: 100%;
        .changeLabel {
          padding: 15px 20px;
          width: 100%;
          background: #f5f8fe;
          .hot-tags {
            width: 100%;
            h3 {
              padding-bottom: 15px;
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: #333333;
              font-weight: normal;
              border-bottom: 1px solid #D8D8D8;
              .licon1 {
                float: left;
                margin-top: 3px;
                width: 20px;
                height: 20px;
                margin-right: 15px;
                background: url(../../assets/img/app/icon_tag.png) no-repeat center top;
                background-size: cover;
              }
            }
            .tags {
              padding-top: 20px;
              .tagslink {
                display: inline-block;
                padding: 6px 18px;
                margin-bottom: 10px;
                margin-right: 10px;
                border-radius:4px;
                cursor: pointer;
                line-height: 14px;
                background: #fff;
                border:1px solid rgba(153,153,153,1);
                font-size:14px;
                color: #333333;
                &:hover {
                  border:1px solid #57a3f3;
                  color: #57a3f3;
                }
              }
              .active {
                border:1px solid #57a3f3;
                color: #57a3f3;
              }
            }
          }
        }
        .changeHot{
          margin-top: 20px;
          width: 100%;
          padding: 15px 20px;
          background: #f5f8fe;
          .hot-information {
            width: 100%;
            h3 {
              padding-bottom: 15px;
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: #333333;
              font-weight: normal;
              border-bottom: 1px solid #D8D8D8;
              .licon2 {
                float: left;
                margin-top: 3px;
                width: 20px;
                height: 20px;
                margin-right: 15px;
                background: url(../../assets/img/app/icon_news.png) no-repeat center top;
                background-size: cover;
              }
            }
            .info {
              margin-top: 20px;
              .hotInfo-title {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                .htitle {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  width: 100%;
                  max-height: 56px;
                  font-size: 18px;
                  color: #333333;
                  font-weight: 500;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  .ivu-poptip-rel {
                    overflow: hidden!important;
                    text-overflow: ellipsis!important;
                    display: -webkit-box!important;
                    -webkit-line-clamp: 2!important;
                    -webkit-box-orient: vertical!important;
                  }
                }
                .time {
                  margin-top: 8px;
                  width: 100%;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  color: #999;
                }
              }
              .hotInfo-content {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #666666;
                line-height: 28px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }

</style>
