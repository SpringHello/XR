<template>
    <div class="ver_input" >
      <img style="margin:14px 0 14px 14px;" :src="icon">
        <input :value='account'  class="input_o"
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
    </div>
</template>

<script>
 import { oneOf, findComponentUpward } from '../../../node_modules/iview/src/utils/assist';
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
    },
    data(){
        return{
            account:this.value,
            style:'',
            prefixCls: prefixCls
        }
    },
    methods:{
        setInputValue(value){
            this.account = value
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
            this.$emit('FormItem','on-form-blur', this.account);
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
        // valid(rule,value,callback){
        //     if(!rule.test(value)){
        //        function callback(error){
        //            return this.error = error;
        //        }
        //     }
        // }
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
    },
    watch:{
      value (val) {
        this.setInputValue(val);
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
        background: #fff;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
      }
       .input_o{
          width: 85%;
          border: none;
          vertical-align: top;
        height: 44px;
          margin-left:20px;
          outline:0;
          text-decoration: none;
        }
      
</style>


