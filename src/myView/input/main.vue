<template>
    <div  :class="wrapClasses" style=" height: 46px;border-radius:4px;width:363px;">
      <img class="ver_img" :src="icon" style="width:16px;height:18px;">
        <div class="ver_select" v-if="isSelect == 'select'">
            <div @click="isShow = !isShow" class="verNumber" :class="[isShow ?'':'verNumbers']">
               <span>+{{selectValue}}</span> 
            </div>
             <transition name="fade">
                <div class="ver_option" v-if="isShow" @click="handleClose">
                    <ul class="ver_ul" >
                        <li  :class="selectIndex == index ?'ver_li':''" v-for="(item,index) in telList" :key="index" @click="selectLiValue(item.tel,index)">{{item.tel}}</li>
                    </ul>
                </div>
             </transition>
        </div>
        <input type='text' style='display:none'>
        <input :value='account'  :style="style" 
        :id="elementId"
         autocomplete="new-password"
        :spellcheck="spellcheck" 
        :disabled="disabled"
        :readonly="readonly"
        :type="passwordType"
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
        <slot name="code"></slot>
        <img class="ver_eye" @click="eyeType" :src="eye" v-if="isSelect == 'eye'">
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
            default:''
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
        elementId: {
            type: String
        }, 
        choice:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            account:this.value,
            style:'height: 44px;padding-left:48px;',
            prefixCls: prefixCls,
            isSelect:'',
            telList:telList,
            selectIndex:null,
            selectValue:'86',
            isShow:false,
            count:10,
            timeBoo:true,
            isEye:false,
            timeP:false,
            passwordType:''
        }
    },
    mounted(){
        this.handleClose();
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
            // this.$emit('on-change', e);
        },
        inputChange(e){   
            this.$emit('on-change',e);
          
            this.dispatch('FormItem', 'on-form-change', this.account);
        },
        inputBlur(e){
            this.$refs.xInput.setAttribute('readonly',true); // 添加只读
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
            this.$refs.xInput.removeAttribute('readonly');
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
       
        handleClose () {
            if(this.isSelect == 'select'){
            document.addEventListener('click',e=>{
                if(e.target.className !='verNumbers' && e.target.className =='login-form' ||  e.target.className ==''){
                    this.isShow = false;
                }
            })
            }
        },
        eyeType(){
            this.isEye = !this.isEye;
            if(this.isEye){
                this.passwordType ='';
            }else{
                this.passwordType = 'password';
            }
        }
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
      choice:{
         handler(){
            if(this.choice == 'select'){
            this.isSelect = 'select';
            this.style = 'height: 44px;padding-left: 96px;';
            }
            if(this.choice == 'validate'){
                this.isSelect = 'validate';
                this.style='height: 44px;padding-left: 48px;padding-right:98px;';
            }
            if(this.choice == 'eye'){
                this.isSelect = 'eye';
                this.style='height: 44px;padding-left: 48px;padding-right:70px;';
                this.passwordType = 'password';
            }
            if(this.choice ==''){
                this.isSelect = '';
                this.style='height: 44px;padding-left:48px;';
            }
            if(this.icon == ''){
                this.isSelect = '';
                this.style='height: 44px;padding-left:48px;';
            }
         },
        immediate:true
      },
      icon:{
          handler(){
            if(this.icon == ''){
              this.style = 'height:44px;padding-left:10px;'
            }
          },
          immediate:true
      },
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
          width:50px;
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
        padding: 0 3% 0 3%;
        border-left: 1px solid  #C8C8C8;
        color: #4A97EE;
        position: absolute;
        top: 0;
        right: 0;
        
    }
    .ver_eye{
        position: absolute;
        top: 17px;
        right: 20px;
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


