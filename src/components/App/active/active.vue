<template>
  <div id="quest">
    <!-- banner div -->
    <div id="banner">
      <div style="width:1200px;height:560px;margin:0px auto;position:relative">
        <transition name="active" >
          <img v-if="active" src="../../../assets/img/home/carousel-2-1.png" style="position:absolute;right:0px;top:20px;">
        </transition>

        <div style="position: relative; top: 30%">
          <p style="font-size: 48px;color: rgb(86, 146, 254);margin-bottom: 20px;">新睿云盛大上线</p>
          <p style="font-size: 20px;color: rgb(86, 146, 254);margin-bottom: 20px;">全品类折扣优惠 礼包零门槛领取</p>
          <p style="font-size: 24px;color:rgb(86, 146, 254);">最高省500元</p>
        </div>
      </div>
    </div>
    <!-- 优惠券div -->
    <div id="coupon">
      <div id="content">
        <div id="title">
          <p>1分钟填写问卷，新睿云为您奉上礼品券大礼包。</p>
          <p>开始填写吧！</p>
        </div>
        <div id="coupon-flex">
          <div v-for="(item,index) in coupons" :key="index">
            <img :src="item">
          </div>
        </div>
      </div>
    </div>
    <!-- 问卷div -->
    <div id="question">
      <div id="question-content">
        <div id="radio">
          <!-- 单选 -->
          <div v-for="(radio,index) in questions.radio" :key="index" class="quest-item">
            <div class="questDesc">
              <span><span class="questIndex">{{index+1}}</span>{{radio.questDesc}}(单选)</span>
            </div>
            <div class="questAnswers">
              <RadioGroup v-model="radio.value" style="width: 100%;display: flex;flex-wrap: wrap">
                <div v-for="(answer,aIndex) in radio.answers" :key="aIndex" class="answer"
                     :class="{active:radio.value==answer.key}">
                  <Radio :label="answer.key">
                    <span>{{answer.value}}</span>
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>
          <!-- 多选 -->
          <div v-for="(checkbox,index) in questions.checkBox" :key="index" class="quest-item">
            <div class="questDesc">
              <span><span class="questIndex">{{index+1}}</span>{{checkbox.questDesc}}(多选)</span>
            </div>
            <div class="questAnswers">
              <CheckboxGroup v-model="checkbox.select" style="width: 100%;display: flex;flex-wrap: wrap">
                <div v-for="(answer,aIndex) in checkbox.answers" :key="aIndex" class="answer"
                     :class="{active:checkbox.select.includes(answer.key)}">
                  <Checkbox :label="answer.key">
                    <span>{{answer.value}}</span>
                  </Checkbox>
                </div>
              </CheckboxGroup>
            </div>
          </div>
          <!-- 问答框 -->
          <div v-for="(text,index) in questions.text" :key="index" class="quest-item">
            <div class="questDesc">
              <span><span class="questIndex">{{index+1}}</span>{{text.questDesc}}</span>
            </div>
            <div class="text-wrapper">
              <Input v-model="text.answer" type="textarea" rows="5" placeholder="" style="width:672px"></Input>
            </div>
          </div>
          <div style="text-align: center">
            <button class="submit" @click="submit">确认提交</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var banner = require('../../../assets/img/home/carousel-2-1.png')
  var coupon50 = require('../../../assets/img/active/coupon-50RMB.png')
  var coupon150 = require('../../../assets/img/active/coupon-150RMB.png')
  var coupon300 = require('../../../assets/img/active/coupon-300RMB.png')
  export default{

    data(){
      return {
        active: false,
        banner,
        coupons: {
          coupon50,
          coupon150,
          coupon300
        },
        questions: {
          // 单选
          radio: [
            {
              questDesc: '您是从哪里知道新睿云的？',
              answers: [
                {key: 'a', value: '搜索引擎'},
                {key: 'b', value: '朋友介绍'},
                {key: 'c', value: '广告投放'},
                {key: 'd', value: '线下活动'},
                {key: 'e', value: '其他'}
              ],
              value: ''
            },
            {
              questDesc: '您使用云主机相关产品多久？',
              answers: [
                {key: 'a', value: '初步了解'},
                {key: 'b', value: '使用一段时间'},
                {key: 'c', value: '多年老司机'}
              ],
              value: ''
            }
          ],
          // 多选
          checkBox: [
            {
              questDesc: '您使用云主机的原因是什么？',
              answers: [
                {key: 'a', value: '提高工作效率'},
                {key: 'b', value: '减少软硬件成本'},
                {key: 'c', value: '不用担心数据安全'},
                {key: 'd', value: '其他'}
              ],
              select: []
            },
            {
              questDesc: '您最看重云主机的哪些方面？',
              answers: [
                {key: 'a', value: '云主机性能'},
                {key: 'b', value: '价格'},
                {key: 'c', value: '数据安全'},
                {key: 'd', value: '操作方便'},
                {key: 'e', value: '其他'}
              ],
              select: []
            },
            {
              questDesc: '您想要在云主机上部署什么应用？',
              answers: [
                {key: 'a', value: '数据存储'},
                {key: 'b', value: '应用程序'},
                {key: 'c', value: '网站'},
                {key: 'd', value: 'APP应用'},
                {key: 'e', value: '其他'}
              ],
              select: []
            },
            {
              questDesc: '如果您把业务布置在新睿云，您最担心什么？',
              answers: [
                {key: 'a', value: '云主机性能'},
                {key: 'b', value: '成本'},
                {key: 'c', value: '安全性'},
                {key: 'd', value: '客户服务'},
                {key: 'e', value: '其他'}
              ],
              select: []
            },
            {
              questDesc: '您最希望新睿云近期上线哪类产品？',
              answers: [
                {key: 'a', value: '云数据库'},
                {key: 'b', value: '云存储'},
                {key: 'c', value: 'CDN'},
                {key: 'd', value: '子账号系统'}
              ],
              select: []
            }
          ],
          text: [
            {
              questDesc: '云主机操作系统有什么不便？',
              answer: ''
            },
            {
              questDesc: '新睿云控制台是否有需要改进的地方？',
              answer: ''
            }
          ]
        }
      }
    },
    methods: {
      // 提交问卷
      submit(){
        var answer = ''
        for (var radio of this.questions.radio) {
          answer += `${radio.value}###`
        }
        for (var checkBox of this.questions.checkBox) {
          answer += `${checkBox.select.join('')}###`
        }
        for (var text of this.questions.text) {
          answer += `${text.answer}###`
        }
        if (answer.includes("######")) {
          this.$Notice.open({
            title: '问卷答案不完整',
            desc: '请提交完整的问卷答案'
          });
          return
        }
        this.$http.post('information/userQuestion.do', {
          name: 'newhand',
          answer: answer
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Notice.open({
              title: '提交成功',
              desc: response.data.message
            });
          } else if (response.status == 200 && response.data.status == 2) {
            this.$Notice.open({
              title: '您已参加过该问卷',
              desc: '您已参加本次活动!'
            });
          }
        })

      }
    },
    mounted() {
      this.active = true
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #quest {
    background-color: #f9f9f9;
    #banner {
      width: 100%;
      height: 560px;
      cursor: pointer;
      background-image: linear-gradient(90deg, #E7F0FD, #ACCBEE);
    }
    #coupon {
      background: #ffffff url(../../../assets/img/active/coupon-background.png);
      #content {
        width: 1200px;
        padding: 122px 0px 100px;
        margin: 0px auto;
        #title {
          > p {
            font-size: 28px;
            color: #333333;
            text-align: center;
            &:first-of-type {
              margin-bottom: 14px;
            }
          }
        }
        #coupon-flex {
          margin-top: 83px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    #question {
      background-color: #f9f9f9;
      padding: 82px 0px;
      #question-content {
        width: 1000px;
        margin: 0px auto;
        .quest-item {
          margin-bottom: 88px;
          &:last-child {
            margin-bottom: 82px;
          }
          .questDesc {
            margin-bottom: 48px;
            span {
              line-height: 30px;
              font-size: 16px;
              color: #666666;
            }
            .questIndex {
              margin-right: 10px;
              text-align: center;
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #ffffff;
            }
          }
          .questAnswers {
            display: flex;
            flex-wrap: wrap;
            margin-left: 40px;
            .answer {
              margin-right: 16px;
              padding: 18px;
              width: 432px;
              background-color: #ffffff;
              margin-bottom: 16px;
              font-size: 14px;
              color: #666666;
              border-radius: 5px;
            }
            .active {
              background-color: #377dff;
              color: #ffffff;
            }
          }
          .text-wrapper {
            margin-left: 40px;
          }
        }
        .submit {
          padding: 13px 60px;
          background-color: #FFE777;
          color: #377dff;
          font-size: 14px;
          border: none;
          outline: none;
        }
      }
    }
    .active-enter-active, .active-leave-active {
      transition: all 1s;
    }

    .active-enter, .active-leave-to
      {
      opacity: 0;
      transform: translateY(150px);
    }
  }
</style>
