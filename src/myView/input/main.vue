<template>
    <div  :class="wrapClasses" style=" height: 46px;border-radius:4px;">
      <img class="ver_img" :src="icon">
        <div style="ver_select" v-if="isSelect">
            <div>
                +86
            </div>
            <div class="ver_option">
                <ul>
                    <li v-for="(item,index) in telList" :key="index">{{item.tel}}</li>
                </ul>
            </div>
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
        <!-- <img class="ver_img"  :src="icon"> -->
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
        valid:{
            type:Function,
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
            style:'height: 44px;padding-left: 39px;',
            prefixCls: prefixCls,
            isSelect:false,
            isValid:true,
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
    },
    watch:{
      value (val) {
        this.setInputValue(val);
      },
      choice(){
        if(this.choice == 'select'){
            this.isSelect = true;
            this.style = 'height: 44px;padding-left: 96px;';
        }else if(this.choice == 'validate'){
            this.isValid = true;
            this.style='height: 44px;padding-left: 39px;padding-right:70px;'
        }else{
             this.isSelect = false;
             this.isValid = false;
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
          border: none;
          width:35px;
          background-color: rgba(0, 0, 0, 0);
          background-image: none;
          position: absolute;
          left: 35px;
          z-index: 3;
          -webkit-appearance: none;
		-moz-appearance: none;
      }
      .ver_select::after{
          content: '';
      }
    .ver_select::-ms-expand { display: none; }
    .ver_option{
        max-height: 200px;
        overflow: auto;
    }
    .ver_option::-webkit-scrollbar{
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .ver_option::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background:rgba(216,216,216,0.5);
    }
    .ver_option::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background:rgba(216,216,216,0.5);
    }
</style>


