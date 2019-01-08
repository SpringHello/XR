<template>
    <div  :class="wrapClasses" style=" height: 46px;border-radius:4px;">
      <img class="ver_img" :src="icon">
        <div class="ver_select" >
            <div @click="isShow = !isShow" class="verNumber" :class="[isShow ?'verNumber':'verNumbers']">
                +{{selectValue}}
            </div>
             <transition name="fade"  >
                <div class="ver_option" v-if="isShow" @click="handleClose">
                    <ul class="ver_ul" >
                        <li  :class="selectIndex == index ?'ver_li':''" v-for="(item,index) in telList" :key="index" @click="selectLiValue(item.tel,index)">{{item.tel}}</li>
                    </ul>
                </div>
             </transition>
        </div>
        <input :value='account'  :style="style"
        :id="elementId"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck" 
        :disabled="disabled"
        :readonly="readonly"
        ref='xInput'
        :class="inputClasses"
        :placeholder="placeholder" 
        @blur="inputBlur"
        @input="inputValue"
        @change='inputChange'
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        >
        <div class="ver_yan" >
            <span @click="timeReduce" v-if="timeBoo" style="cursor: pointer;">获取验证码</span>
            <span v-else style="color:#666666;">{{count}}</span>
        </div>
        <img class="ver_eye" @click="isEye = !isEye" :src="eye" v-if="isSelect == 'ear'">
        <p v-if="timeP" style="color:#F10C0C;margin-top:6px;">收不到验证码？请换<span style="color:#4A97EE">重新获取</span>或<span  style="color:#4A97EE">接收语音验证</span></p>
    </div>
</template>

<script>
 import { oneOf, findComponentUpward } from '../../../node_modules/iview/src/utils/assist';
 import telList from '../../options/area_tel'
  const prefixCls = 'ivu-input';
export default {
    name:'xInput',
    props:{
        icon:{
            type:String,
            default:require('../../assets/img/updatePaw/paw_zhanghao.png')
        },
        value:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        spellcheck: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            validator (value) {
                return oneOf(value, ['on', 'off']);
            },
            default: 'off'
        },
        elementId: {
            type: String
        }, 
        choice:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            account:this.value,
            style:'height: 44px;padding-left: 96px;',
            prefixCls: prefixCls,
            isSelect:'',
            telList:telList,
            selectIndex:null,
            selectValue:'86',
            isShow:false,
            count:10,
            timeBoo:true,
            isEye:false,
            timeP:false
        }
    },
    methods:{
        setInputValue(value){
            this.account = value;
            this.dispatch('FormItem','on-form-blur',this.account);
        },
        inputValue(e){
            let value = e.target.value;
            this.$emit('input',value);
            this.setInputValue(value);
            this.$emit('on-change', e);
        },
        inputChange(e){   
            this.$emit('on-change',e);
        },
        inputBlur(e){
            this.$emit('on-blur', e);
            let val = e.target.value;
            this.dispatch('FormItem', 'on-form-blur', this.account);
        },
        handleEnter (event) {
            this.$emit('on-enter', event);
        },
        handleKeydown (event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress(event) {
            this.$emit('on-keypress', event);
        },
        handleKeyup (event) {
            this.$emit('on-keyup', event);
        },
        handleFocus (event) {
            this.$emit('on-focus', event);
        },
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        selectLiValue(tel,index){
            this.selectIndex = index;
            this.selectValue = tel;
            this.isShow = !this.isShow;
        },
        timeReduce(){
            if(this.account != ''){
                this.$emit('on-click',this.account);
                this.timeBoo = false;
                this.timeP = false;
               let char = setInterval(()=>{
                    if(this.count != 0){
                        this.count --;
                    }else{
                        clearInterval(char);
                        this.count = 10;
                        this.timeBoo = true;
                        this.timeP = true;
                    }
                },1000);
            }
        },
        handleClose () {
            document.addEventListener('click',function(e){
                console.log(e);
                if(e.target.className!='usermessage'){
                    that.userClick=false;
                }
            })
            // this.isShow = false;
        },
    },
    created(){
     
    },
    computed:{
         inputClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ];
            },
        wrapClasses () {
                return [
                    `${prefixCls}-wrapper`
                ];
        },
        eye(){
            return this.isEye ?require('../../assets/img/login/lr-icon3.png') :require('../../assets/img/updatePaw/paw_closeEye.png')
        }
    },
    watch:{
      value (val) {
        this.setInputValue(val);
      },
      choice(){
        if(this.choice == 'select'){
            this.isSelect = 'select';
            this.style = 'height: 44px;padding-left: 96px;';
        }else if(this.choice == 'validate'){
            this.isSelect = 'validate';
            this.style='height: 44px;padding-left: 39px;padding-right:98px;'
        }else if(this.choice == 'eye'){
             this.isSelect = 'eye';
            //  this.isValid = false;
             this.style='height: 44px;padding-left: 39px;padding-right:70px;'
        }else{
            this.isSelect = '';
            this.style='height: 44px;padding-left: 39px;'
        }
        immediate:true;    
      }
    }
}
</script>


<style lang="less" scoped>
      .v_input{
        border:1px solid #ed3f14;
      }
      .ver_input{
        height: 46px;
        border-radius:4px;
        margin-bottom: 10px;
        border: 1px solid #999999;
        position: relative;
        background: #fff;
      }
       .input_o{
        width: 100%;
        border: none;
        vertical-align: top;
        height: 44px;
        padding-left:39px;
        outline:0;
        text-decoration: none;
        }
      .ver_img{
        margin:14px 0 11px 14px;
        position:absolute;
        z-index: 3;
      }
      .ver_select{
          margin:16px 0 11px 14px;
          cursor: pointer;
          width:35px;
          background-image: none;
          position: absolute;
          left: 35px;
          z-index: 3;
          display: inline-block;
          div{
              display: inline-block;
          }
          .ver_ul{
              line-height: 17px;
          }
      }
      .verNumber{
          width: inherit;
      }
      .verNumber::after{
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          left: 31px;
          top: 4px;
          border: solid #999999;
          border-width: 0 1px 1px 0;
          position: absolute;
          transform: rotate(45deg);
          transition: transform 0.2 ease-in-out;
      }
      .verNumbers::after{
           content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          left: 31px;
          top: 4px;
          border: solid #999999;
          border-width: 0 1px 1px 0;
          position: absolute;
          transform: rotate(224deg);
          transition: transform 0.2 ease-in-out;
      }
    .ver_option{
        max-height: 200px;
        background: #fff;
        overflow: auto;
        transition:display 0.4 ease-in-out;
        position: relative;
        z-index: 999;
        margin-top: 5px; 
        .ver_li{
            background:  #2A99F2 !important;
            color: #fff;
        }
        li{
            padding: 2px 2px 2px 5px;
            transition:background 0.2 ease-in-out;
        }
        li:hover{
            background: rgba(216,216,216,0.5);
        }
    }
    .ver_option::-webkit-scrollbar{
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .ver_option::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

      -webkit-box-shadow: inset 0 0 5px rgba(189, 188, 188, 0.651);
      background:rgba(189, 188, 188, 0.651);
    }
    .ver_option::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(216,216,216,0.5);
      background:rgba(216,216,216,0.5);
    }
    .ver_yan{
        width: 98px;
        height: 28px;
        line-height: 28px;
        margin-top: 8px;
        padding: 0 20px 0 17px;
        border-left: 1px solid  #C8C8C8;
        color: #4A97EE;
        position: absolute;
        top: 0;
        right: 0;
        
    }
    .ver_eye{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform,opacity 0.2s ease-in-out;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(0,100px);
        opacity: 0;
    }
</style>


