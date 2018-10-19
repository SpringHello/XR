<template>
  <div style="background: #FFF">
    <div class="center">
      <ul class="title">
        <p>{{ hotTags }}</p>
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
                <p class="item-title" :title="item.title">{{ item.title}}</p><span>{{ item.createDate}} </span>
                <p class="item-content" v-html="item.abstracts"></p>
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
        <div class="body-right">
          <div class="hot-tags">
            <h3>热门标签</h3>
            <div class="tags">
              <router-link class="tagslink" v-for="(tag,index) in tags" :key="index" target="_blank"  :to="tag.keywordsval.toString()" :class="{active:hotTags==tag.keywordsval}">{{
                tag.keywordsval }}
              </router-link>
            </div>
          </div>
          <div class="hot-information">
            <h3>热门资讯</h3>
            <div v-for="h in hot" class="info">
              <router-link :to="`${h.code}.html`" target="_blank">
                <div class="hotInfo-title">
                  <p :title="h.title"><span class="htitle">{{h.title}}</span><span class="time">{{h.createDate}}</span></p>
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
        width: 100%;
        font-size: 28px;
        line-height: 28px;
        display: inline-block;
        margin-bottom: 20px;
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
          border-bottom: 1px solid #D8D8D8;
          a {
            display: flex;
          }
          .item-left {
            margin-right: 20px;
          }
          .item-right {
            width: 80%;
            /*border-bottom: 1px solid #D8D8D8;*/
            .item-title {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              width: 450px;
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
          }
          .item-label {
            margin-left: 20%;
            width: 80%;
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
            padding-top: 20px;
            Button {
              margin-bottom: 10px;
              margin-right: 10px;
            }
            .tagslink {
              display: inline-block;
              padding: 6px 18px;
              margin-bottom: 10px;
              margin-right: 10px;
              border-radius:4px;
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
