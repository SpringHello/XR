<template>
  <div id="document">
    <!--帮助文档-->
    <div class="document">
      <div class="dotitle">
        帮助文档
        <span :class="{select:selectDoc}" @click="selectDoc = true,selectPro = false">产品文档</span>
        <span :class="{select:selectPro}" @click="selectDoc = false,selectPro = true">常见问题</span>
      </div>
      <div class="content" v-if="selectDoc">
        <div v-for="(item,index) in contentList" :key="index">
          <div class="header">
            <i class="iconfont" :class="item.img" style="font-size:30px;color:#fff;line-height:1"></i>
            <p>{{item.firstTitle}}</p>
          </div>
          <div class="body">
            <div v-for="(item,index) in item.secondTitle" :key="index" class="wrapper">
              <router-link :to="item.url" class="title">
                {{item.name}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="problem" v-if="selectPro">
        <p class="problem-title">热门问题</p>
        <div class="problem-desc">
          <div v-for="(item,index) in problems" :key="index">
            <p>{{item.key.name}}</p>
            <ul>
              <li v-for="(subTitle,subIndex) in item.value">
                <router-link :to="subTitle.url" target="_blank" class="quest-item">
                  {{subTitle.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default {
    data () {
      return {
        // 选中项
        selectDoc: true,
        selectPro: false,
        // 帮助文档
        contentList: [],
        // 常见问题
        problems: []
      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('document/getFirstTitle.do').then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    created(){
      axios.get('document/listHotQuestion.do').then(response => {
        this.problems = response.data.result
      })
    },
    methods: {
      setData(response){
        this.contentList = response.data.result
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #document {
    background-color: #fff;
  }

  .document {
    width: 1200px;
    margin: 0 auto;
    padding: 60px 0px 80px;
    .dotitle {
      font-size: 28px;
      color: #333;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D8D8D8;
      span {
        cursor: pointer;
        font-size: 14px;
        color: #333;
        margin-left: 40px;
        padding-bottom: 15px;
        &:first-of-type {
          margin-left: 67px;
        }
      }
      .select {
        color: #377DFF;
        border-bottom: 3px solid #377DFF;
      }
    }
    .content {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        background: #FFF;
        width: 208px;
        height: 380px;
        border: 1px solid #d8d8d8;
        &:hover {
          box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        }
        > .header {
          height: 60px;
          background-color: #377Dff;
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            height: 26px;
            width: 30px;
          }
          p {
            font-size: 24px;
            color: #FFF;
            line-height: 40px;
            margin-left: 10px;
          }
        }
        > .body {
          .wrapper {
            margin: 20px;
            .title {
              font-size: 14px;
              color: #111;
              cursor: pointer;
              user-select: none;
              &::after {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-right: 1px solid #333;
                border-bottom: 1px solid #333;
                transform: translateY(3px) rotate(311deg);
                float: right;
              }
              &:hover {
                color: #377DFF;
                &::after {
                  border-right: 1px solid #377DFF;
                  border-bottom: 1px solid #377DFF;
                }
              }
            }
          }
        }
      }
    }
    .problem {
      margin-top: 20px;
      .problem-title {
        font-size: 18px;
        color: #333;
      }
      .problem-desc {
        margin-top: 20px;
        color: #FFF;
        height: 273px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 0 0 20px;
        > div {
          width: 18.5%;
          p {
            font-size: 14px;
            color: #377DFF;
          }
          ul {
            height: 180px;
            margin-top: 20px;
            border-right: 1px solid #D8D8D8;
            li {
              list-style: none;
              font-size: 14px;
              color: #333;
              margin-bottom: 10px;
              line-height: 22px;
              &:hover {
                color: #377DFF;
                cursor: pointer;
              }
            }

          }
          &:last-of-type {
            ul {
              border-right: none;
            }
          }
        }
        .quest-item {
          color: rgba(17, 17, 17, 0.82);
          &:hover {
            color: #2d8cf0
          }
        }
      }
    }
  }
</style>
