<template>
  <div id="background">
    <div id="wrapper">
      <p style="margin: 10px 0;color: #999999;">对象存储 / 图片处理</p>
      <div id="content">
        <div class="ela_head">
          <div class="head_right">
            <div class="back" @click="$router.push({path:'SpaceDetails'})">
              <div class="back_icon"></div>
              <span>返回</span>
            </div>
            <span>新建图片样式</span>
          </div>
          <Button type="ghost" style="float: right;">刷新</Button>
        </div>
        <br>
        <hr color="#D8D8D8" size="1">
        <br>

        <div style="display: flex;">
          <div class="water_box">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="样式名称" prop="styleName" style="width: 69.8%;">
                <Input v-model="formValidate.styleName"></Input>
                <p style="color:#999999;margin-top: 10px;">长度1-36个字符，只能包含数字、大小写字母与下划线“_”短横线“-”</p>
              </FormItem>
            </Form>
            <div>
              <div class="water_font">
                <span>缩放类型</span>
              </div>
              <div class="water_right">
                <Select v-model="zoomType">
                  <Option v-for="item in zoomTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <!--指定宽高显示-->
            <div v-if="zoomType != 0 && zoomType != 1">
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>图片高度</span>
                </div>
                <div class="water_right">
                  <Input v-model="imgWidth" ></Input>
                </div>
                <span>
                  px
                </span>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>图片宽度</span>
                </div>
                <div class="water_right">
                  <Input v-model="imgHeight" ></Input>
                  <p style="margin-top: 15px;color: #999999;font-size: 12px;">图片宽高取值范围为8-5120px</p>
                </div>
                <span style="vertical-align:top;display: inline-block;margin-top: 6px;">
                  px
               </span>
              </div>
            </div>

            <!--等比例缩放显示-->
            <div  v-if="zoomType == 1">
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>缩放比例</span>
                </div>
                <div class="water_right">
                  <Slider v-model="resizerpercent" show-input></Slider>
                </div>
              </div>
            </div>

            <!---->
            <div>
              <div class="water_font">
                <span>输出格式</span>
              </div>
              <div class="water_right">
                <Select v-model="formatValue">
                  <Option v-for="item in formatList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div>
              <div class="water_font">
                <span>输出质量</span>
              </div>
              <div class="water_right">
                <Slider v-model="outQuality" show-input></Slider>
              </div>
            </div>
            <div>
              <div class="water_font">
                <span>水印类型</span>
              </div>
              <div class="water_right">
                <ul>
                  <li  @click="watermarkIndex = index" v-for="(item,index) in watermark" :class="watermarkIndex == index ? 'water_listB' :'water_list'">{{item.label}}</li>
                </ul>
              </div>
            </div>
            <!--图片水印-->
            <div v-if="watermarkIndex == 1">
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>水印图片</span>
                </div>
                <div class="water_right">
                  <Input v-model="waterImg.imgUrl" placeholder="请输入图片文件在Bucket中的路径"></Input>
                  <p style="color: #999999;margin-top: 10px;">水印图片格式只支持：jpg、png、gif、webp</p>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>水印透明度</span>
                </div>
                <div class="water_right">
                  <Slider v-model="waterImg.transparency" show-input></Slider>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>水印图片大小</span>
                </div>
                <div class="water_right">
                  <Slider v-model="waterImg.imgSize" show-input></Slider>
                </div>
              </div>
            </div>

            <!--文字水印-->
            <div  v-if="watermarkIndex == 2">
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>水印文字</span>
                </div>
                <div class="water_right">
                  <Input v-model="waterFont.font" placeholder="文字内容"></Input>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>文字字体</span>
               </div>
                <div class="water_right">
                  <Select v-model="waterFont.typeface">
                    <Option v-for="item in waterFont.typefaceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>文字大小</span>
                </div>
                <div class="water_right">
                  <InputNumber  :min="0"  :max="1000"  :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="waterFont.size"></InputNumber>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>文字颜色</span>
                </div>
                <div class="water_right">
                  <ColorPicker format="rgb" v-model="waterFont.color" size="small" />
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>水印透明度</span>
                </div>
                <div class="water_right">
                  <Slider v-model="waterImg.transparency" show-input></Slider>
                </div>
              </div>
            </div>

            <!--水印位置-->
            <div style="padding-left: 36px;"v-if="watermarkIndex != '0'">
              <p style="margin-bottom: 10px;">水印位置</p>
              <ul style="width:200px;display: inline-block;">
                <li  v-for="(item,index) in waterPosition" @click="positionIndex = index" :class="positionIndex == index ?'water_listB':'water_list'">{{item.label}}</li>
              </ul>
              <div style="display: inline-block;vertical-align: top;">
                <div style="margin-bottom: 10px;">
                  <div class="water_font">
                    <span>垂直边距</span>
                  </div>
                  <div style="display:inline-block;width:76px;">
                    <Input v-model="vertical"></Input>
                  </div>
                  <span>px</span>
                </div>
                <div>
                  <div class="water_font">
                    <span>水平边距</span>
                  </div>
                  <div style="display:inline-block;width: 76px;">
                    <Input v-model="level"></Input>
                  </div>
                  <span>px</span>
                </div>
              </div>
            </div>

            <!--图片旋转-->
            <div>
              <div style="margin-bottom: 20px;">
                <div class="water_font">
                  <span>图片旋转</span>
                </div>
                <div class="water_right">
                  <Select v-model="rotateValue">
                    <Option v-for="item in rotateType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div style="margin-bottom: 20px;" v-if="rotateValue == '1'">
                <div class="water_font">
                  <span>图片旋转</span>
                </div>
                <div class="water_right">
                  <Input v-model="angle"></Input>
                </div>
              </div>
            </div>
          </div>
          <!--图片展示-->
          <div>
            <p style="margin-bottom: 10px;">原图</p>
            <div class="origin_img">
              <img src="../../assets/img/objectPicture/Rectangle.png">
            </div>
            <div style="margin: 10px 0 5px 0;">
              <span>修改预览</span><span style="color: #2A99F2;cursor: pointer;float: right;" @click="imgGet">刷新</span>
            </div>

            <div class="origin_img">
              <img v-if="imgSrc != ''" :src="imgSrc">
              <img v-else src="../../assets/img/objectPicture/Rectangle.png">
            </div>
            <p style="margin-top: 10px">预览图片尺寸受限，点击<a target="_blank" :href="originUrl">查看预览图</a></p>
          </div>
        </div>

        <br>
        <hr color="#D8D8D8" size="1">
        <br>
        <Button>取消</Button>
        <Button type="primary" @click="createStyle">保存设置</Button>
      </div>
    </div>
  </div>
</template>

<script>
  const Qs = require('qs')
  import axios from  'axios'
  const styleValidor = (rule,value,callback) =>{
    let reg = /^[a-z0-9-_]{1,36}$/;
      if(value == ''){
        return callback(new Error('请输入样式名字'));
      }else if(!reg.test(value)){
        return callback(new Error('样式名字格式不正确'));
      }else {
        callback();
      }
  }

  export  default {
    data() {
      return {
        //刷新的图片
        imgSrc:'',
        originUrl:'',

        formValidate: {
          styleName: ''
        },
        ruleValidate: {
          styleName: [
            {required: true, validator: styleValidor, trigger: 'blur'}
          ]
        },

        //缩放类型
        zoomType: '0',
        zoomTypeList: [
          {
            value: '0',
            label: '不使用缩放'
          },
          {
            value: '1',
            label: '等比例缩放'
          },
          {
            value: '2',
            label: '长边优先,指定宽高'
          },
          {
            value: '3',
            label: '短边优先,指定宽高'
          },
          {
            value: '4',
            label: '强制缩放,指定宽高'
          },
          {
            value: '5',
            label: '居中剪裁,指定宽高'
          }
        ],

        //水印类型
        watermark: [
          {
            value: '0',
            label: '不使用水印'
          },
          {
            value: '1',
            label: '图片水印'
          },
          {
            value: '2',
            label: '文字水印'
          }
        ],
        watermarkIndex: '0',

        //水印位置
        waterPosition: [
          {
            value: '1',
            label: '左上'
          },
          {
            value: '4',
            label: '左中'
          },
          {
            value: '7',
            label: '左下'
          },
          {
            value: '2',
            label: '中上'
          },
          {
            value: '5',
            label: '中--.'
          },
          {
            value: '5',
            label: '中下'
          },
          {
            value: '3',
            label: '右上'
          },
          {
            value: '6',
            label: '右中'
          },
          {
            value: '9',
            label: '右下'
          }
        ],
        positionIndex: '0',
        vertical: '0',
        level: '0',

        //输出格式
        formatValue: '0',
        formatList: [
          {
            value: '0',
            label: '原图格式'
          },
          {
            value: '1',
            label: 'JPG'
          },
          {
            value: '2',
            label: 'PNG'
          },
          {
            value: '3',
            label: 'GIF'
          },
          {
            value: '4',
            label: 'WebG'
          }
        ],

        //图片高宽
        imgWidth: '250',
        imgHeight: '250',
        //缩放比例
        resizerpercent:50,
        //输出质量
        outQuality: 50,

        //水印图片
        waterImg: {
          imgUrl: '',
          transparency: 50,
          imgSize: 20
        },

        //文字水印
        waterFont: {
          font: '今天我让你高攀不起',
          typeface: 'Dialog',
          size: 10,
          color: 'rgba(10, 127, 144, 1)',
          typefaceList: [
            {
              value: 'SourceHanSansSC-Bold.otf',
              label: 'Dialog'
            },
            {
              value: 'DialogInput',
              label: 'DialogInput'
            },
            {
              value: 'SansSerif',
              label: 'SansSerif'
            },
            {
              value: 'Serif Monospaced',
              label: 'Serif Monospaced'
            }
          ]
        },

        //图片旋转
        rotateValue: '0',
        rotateType: [
          {
            value: '0',
            label: '不开启'
          },
          {
            value: '1',
            label: '自定义角度旋转'
          },
          {
            value: '2',
            label: '根据exif自动旋转'
          },
        ],
        angle: ''
      }
    },
    methods: {
      imgGet() {
        this.$refs.formValidate.validate(valid => {
          if (valid) {
            let dd = this.waterFont.color.substring(this.waterFont.color.indexOf('(')+1,this.waterFont.color.indexOf(')'));
            axios({
              url: 'picture/picturePreview.do',
              method: 'post',
              responseType:'arraybuffer',
              headers:{ 'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"}
             ,
              transformRequest: [(data) => {
                return Qs.stringify(data);
              }],
              data: {
                cssname: this.formValidate.styleName,
                resizertype: this.zoomType,
                width: this.zoomType == '0' ? '' : this.imgWidth,
                height: this.zoomType == '0' ? '' : this.imgHeight,
                resizerpercent: this.zoomType == '1' ? this.resizerpercent : '',
                outformattype: this.formatValue,
                outquality: this.outQuality.toString(),
                waterprinttype: this.watermarkIndex,
                waterurl: this.watermarkIndex == '1' ? this.waterImg.imgUrl : '',
                wateroffsettype: this.waterPosition[this.positionIndex].value,
                horizontaloff: this.level,
                verticaloff: this.vertical,
                rotatetype: this.rotateValue,
                rotationangle: this.angle,
                fontsize: this.watermarkIndex == '2' ? this.waterFont.size.toString() : '',
                text: this.watermarkIndex == '2' ? this.waterFont.font : '',
                color:this.watermarkIndex == '2' ?  dd.substring(0,dd.length-3) : '',
                thickness: '0',
                watermarktransparency: this.waterImg.transparency.toString(),
                font: this.watermarkIndex == '2' ? this.waterFont.typeface : '',
                bucketname: sessionStorage.getItem("bucketName"),
                companyid: sessionStorage.getItem('companyId'),
                zoneid: this.$store.state.zone.zoneid
              }
            }).then(res => {
              if(res.data == undefined || res.data == ''){
                return this.$Message.info('获取图片失败');
              }
              function utf8_to_b64( str ) {
                return 'data:image/png;base64,' + btoa(
                  new Uint8Array(str).reduce((data,byte) => data + String.fromCharCode(byte),''))
              }
              function checkImg(code){
                var parts = code.split(';base64,');
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;
                var uInt8Array = new Uint8Array(rawLength);
                for (var i = 0; i < rawLength; ++i) {
                  uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {type: contentType});
              }
              let blob = checkImg(utf8_to_b64(res.data));
              this.originUrl = URL.createObjectURL(blob);
              this.imgSrc = utf8_to_b64(res.data);
            })
          }
        })
      },
      createStyle() {
        this.$refs.formValidate.validate(valid => {
          if (valid) {
            axios({
              url: 'picture/creatStyle.do',
              method: 'post',
              transformRequest: [(data) => {
                return Qs.stringify(data);
              }],
              data: {
                cssname: this.formValidate.styleName,
                resizertype: this.zoomType,
                width: this.zoomType == '0' ? '' : this.imgWidth,
                height: this.zoomType == '0' ? '' : this.imgHeight,
                resizerpercent: this.watermarkIndex == '1' ? this.waterImg.imgSize.toString() : '',
                outformattype: this.formatValue,
                outquality: this.outQuality.toString(),
                waterprinttype: this.watermarkIndex,
                waterurl: this.watermarkIndex == '1' ? this.waterImg.imgUrl : '',
                wateroffsettype: this.waterPosition[this.positionIndex].value,
                horizontaloff: this.level,
                verticaloff: this.vertical,
                rotatetype: this.rotateValue,
                rotationangle: this.angle,
                fontsize: this.watermarkIndex == '2' ? this.waterFont.size.toString() : '',
                text: this.watermarkIndex == '2' ? this.waterFont.font : '',
                color:this.watermarkIndex == '2' ?this.waterFont.color : '',
                thickness: '0',
                watermarktransparency: this.waterImg.transparency.toString(),
                font: this.watermarkIndex == '2' ? this.waterFont.typeface : '',
                bucketname: sessionStorage.getItem("bucketName"),
                companyid: sessionStorage.getItem('companyId'),
                zoneid: this.$store.state.zone.zoneid
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == '1') {
                this.$Message.success('新建样式成功');
                this.$router.push({path: 'SpaceDetails'});
              } else {
                this.$Message.info('新建样式出小差了');
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .ela_head{
    .head_right{
      display: inline-block;
      .back{
        width: 52px;
        height: 25px;
        position: relative;
        line-height: 25px;
        display: inline-block;
        cursor: pointer;
        .back_icon{
          border-top: 1px solid #2A99F2;
          border-left: 1px solid #2A99F2;
          width: 9px;
          height:9px;
          display: inline-block;
          transform: rotate(-45deg);
        }
        >span{
          font-size: 14px;
          color: #2A99F2;
        }
      }
      .back::after{
        content: '';
        width: 1px;
        height: 25px;
        position: absolute;
        right: 0px;
        background: #D8D8D8;
      }
      >span{
        margin-left: 10px;
        vertical-align: middle;
        font-size: 18px;
        color: #111111;
      }
    }
  }
  .water_box{
    font-family: 'MicrosoftYaHei';
    width: 50%;
    >div{
      margin-bottom: 20px;
    }
    .water_font{
      display: inline-block;width: 85px;text-align: right;padding:8px 12px 10px 0;float: left;
    }
    .water_listB{
      display: inline-block;
      padding: 5px 15px;
      border: 1px solid #2A99F2;
      margin-right: 10px;
      cursor: pointer;
      background: #2A99F2;
      color: #FFFFFF;
    }
    .water_list{
      display: inline-block;
      padding: 5px 15px;
      color: #2A99F2;
      border: 1px solid #2A99F2;
      margin-right: 10px;
      cursor: pointer;
    }
    .water_list:hover{
      background: #2A99F2;
      color: #FFFFFF;
    }
    .water_right{
      display: inline-block;width: 55%;
      .ivu-slider .ivu-slider-input .ivu-slider-wrap .ivu-slider-bar{
        height: 16px;
        background: #ADD8F7;
      }
      .ivu-slider-button-wrap .ivu-slider-button{
        width: 8px;
        height: 16px;
        border-radius: 100%;
        background-color: #2A99F2;
      }
    }

  }
  .origin_img{
    width: 252px;
    height: 252px;
    border: 1px dashed #666666;
    img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
