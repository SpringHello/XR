
webpackJsonp([85],{

  /***/ "+juY":
  /***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
    var content = __webpack_require__("XBz/");
    if(typeof content === 'string') content = [[module.i, content, '']];
    if(content.locals) module.exports = content.locals;
// add the styles to the DOM
    var update = __webpack_require__("rjj0")("6a625403", content, true, {});

    /***/ }),

  /***/ "XBz/":
  /***/ (function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
    exports.push([module.i, "\n#background[data-v-6c92498e] {\n  min-height: calc(100% - 102px);\n}\n.upgrade[data-v-6c92498e] {\n  background-color: white;\n  padding: 20px;\n}\n.upgrade .title[data-v-6c92498e] {\n  font-family: Microsoft YaHei-Bold;\n  font-size: 24px;\n  color: rgba(18, 18, 18, 0.75);\n  font-weight: 700;\n}\n.upgrade .body[data-v-6c92498e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 15px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.upgrade .body .content-title[data-v-6c92498e] {\n  font-size: 16px;\n  font-weight: 700;\n  color: rgba(17, 17, 17, 0.75);\n  line-height: 18px;\n}\n.upgrade .body .cpu[data-v-6c92498e] {\n  margin-top: 13px;\n  margin-bottom: 25px;\n}\n.upgrade .body .cpu span[data-v-6c92498e] {\n  width: 63px;\n  padding: 7px 15px;\n  background: #FFFFFF;\n  border: 1px solid #D9D9D9;\n  border-radius: 4px;\n  font-family: Microsoft Yahei, 微软雅黑;\n  font-size: 14px;\n  color: rgba(17, 17, 17, 0.65);\n  margin-right: 10px;\n  display: inline-block;\n  text-align: center;\n  cursor: pointer;\n}\n.upgrade .body .cpu .select[data-v-6c92498e] {\n  border: 1px solid #118FEA;\n}\n.upgrade .body .cpu .disabled[data-v-6c92498e] {\n  cursor: not-allowed;\n}\n.upgrade .body .conf-wrapper[data-v-6c92498e] {\n  width: 274px;\n  height: 245px;\n  background: #FFFFFF;\n  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  padding: 23px 19px;\n  position: relative;\n}\n.upgrade .body .conf-wrapper .money[data-v-6c92498e] {\n  font-size: 24px;\n  color: #2A99F2;\n  font-style: normal;\n  float: right;\n}\n.upgrade .body .conf-wrapper .disabled[data-v-6c92498e] {\n  cursor: not-allowed;\n  color: #bbbec4;\n  background-color: #f7f7f7;\n  border-color: #dddee1;\n}\n.upgrade .body .conf-wrapper > h1[data-v-6c92498e] {\n  font-family: Microsoft Yahei, 微软雅黑;\n  font-size: 18px;\n  color: rgba(17, 17, 17, 0.65);\n  line-height: 18px;\n  margin-bottom: 20px;\n}\n.upgrade .body .conf-wrapper span[data-v-6c92498e] {\n  font-family: Microsoft Yahei, 微软雅黑;\n  font-size: 12px;\n  color: rgba(17, 17, 17, 0.65);\n  line-height: 12px;\n  margin-bottom: 10px;\n  display: block;\n}\n.upgrade .body .conf-wrapper button[data-v-6c92498e] {\n  margin-top: 10px;\n  padding: 7px 0px;\n  width: 100%;\n  background: #2A99F2;\n  border-radius: 4.46px;\n  outline: none;\n  border: 1px solid #2a99f2;\n  cursor: pointer;\n  font-size: 12px;\n  color: #FFFFFF;\n}\n", ""]);

// exports


    /***/ }),

  /***/ "nuZg":
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/number/parse-int.js
    var parse_int = __webpack_require__("gBtx");
    var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./src/vuex/index.js
    var vuex = __webpack_require__("l+I4");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Back/Upgrade.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

    var info = [{
      zoneId: '39a6af0b-6624-4194-b9d5-0c552d903858',
      zoneName: '北京一区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }, { label: '64G', value: 64 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '32G', value: 32 }, { label: '64G', value: 64 }, { label: '128G', value: 128 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '64G', value: 64 }, { label: '128G', value: 128 }]
      }, {
        label: '64核',
        value: 64,
        RAMList: [{ label: '128G', value: 128 }, { label: '256G', value: 256 }]
      }]
    }, {
      zoneId: '1ce0d0b9-a964-432f-8078-a61100789e30',
      zoneName: '北方二区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }, { label: '64G', value: 64 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '32G', value: 32 }, { label: '64G', value: 64 }, { label: '128G', value: 128 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '64G', value: 64 }, { label: '128G', value: 128 }]
      }, {
        label: '64核',
        value: 64,
        RAMList: [{ label: '128G', value: 128 }, { label: '256G', value: 256 }]
      }]
    }, {
      zoneId: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d',
      zoneName: '北方一区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '12G', value: 12 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '12G', value: 12 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '16G', value: 16 }, { label: '24G', value: 24 }, { label: '32G', value: 32 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '24G', value: 24 }, { label: '32G', value: 32 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '32G', value: 32 }]
      }]
    }, {
      zoneId: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c',
      zoneName: '华中一区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '12G', value: 12 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '12G', value: 12 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '16G', value: 16 }, { label: '24G', value: 24 }, { label: '32G', value: 32 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '24G', value: 24 }, { label: '32G', value: 32 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '32G', value: 32 }]
      }]
    }, {
      zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
      zoneName: '华中二区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '32G', value: 32 }]
      }]
    },{
      zoneId: 'a6a20cc2-f84c-409d-9c11-c88a04cce852',
      zoneName: '华南一区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '32G', value: 32 }]
      }]
    },{
      zoneId: 'c6dcb310-3e37-4431-87f3-d8ada0cf3d91',
      zoneName: '华东一区',
      kernelList: [{
        label: '1核',
        value: 1,
        RAMList: [{ label: '1G', value: 1 }, { label: '2G', value: 2 }, { label: '4G', value: 4 }]
      }, {
        label: '2核',
        value: 2,
        RAMList: [{ label: '2G', value: 2 }, { label: '4G', value: 4 }, { label: '8G', value: 8 }]
      }, {
        label: '4核',
        value: 4,
        RAMList: [{ label: '4G', value: 4 }, { label: '8G', value: 8 }, { label: '16G', value: 16 }]
      }, {
        label: '8核',
        value: 8,
        RAMList: [{ label: '8G', value: 8 }, { label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '16核',
        value: 16,
        RAMList: [{ label: '16G', value: 16 }, { label: '32G', value: 32 }]
      }, {
        label: '32核',
        value: 32,
        RAMList: [{ label: '32G', value: 32 }]
      }]
    }];

    /* harmony default export */ var Upgrade = ({
      data: function data() {
        var confInfo = localStorage.serviceoffername.match(/\d+/g);
        var currentCPUNum = parse_int_default()(confInfo[0]);
        var currentRAMSize = parse_int_default()(confInfo[2]);
        var hostname = sessionStorage.getItem('hostname');
        var endtime = sessionStorage.getItem('endtime');
        sessionStorage.removeItem('hostname');
        sessionStorage.removeItem('endtime');
        var zoneInfo = null;
        info.forEach(function (item) {
          if (item.zoneId == vuex["a" /* default */].state.zone.zoneid) {
            zoneInfo = item;
          }
        });
        return {
          currentCPUNum: currentCPUNum,
          currentRAMSize: currentRAMSize,
          hostname: hostname,
          endtime: endtime,
          CPUNum: currentCPUNum,
          RAMSize: currentRAMSize,
          virtualMachineid: localStorage.virtualMachineid,
          cost: 0,
          CPU: [1, 2, 4, 8, 16, 32],
          RAM: [1, 2, 4, 8, 16, 32],
          zoneInfo: zoneInfo
        };
      },
      created: function created() {},

      methods: {
        changeCPU: function changeCPU(cpu) {
          var _this = this;

          /*if (this.currentCPUNum > cpu) {
            this.$Message.info("无法选择更低的配置")
            return
          }*/
          this.zoneInfo.kernelList.forEach(function (item) {
            if (item.value == cpu) {
              _this.RAMSize = _this.currentRAMSize > item.RAMList[0].value ? _this.currentRAMSize : item.RAMList[0].value;
            }
          });
          this.CPUNum = cpu;
          this.calCost();
        },
        changeCache: function changeCache(ram) {
          /*if (ram < this.currentRAMSize) {
            this.$Message.info("无法选择更低的配置")
            return
          }*/
          this.RAMSize = ram;
          this.calCost();
        },
        calCost: function calCost() {
          var _this2 = this;

          this.$http.get('information/UpVMConfigCost.do', {
            params: {
              cpunum: this.CPUNum,
              memory: this.RAMSize,
              VMId: this.virtualMachineid
            }
          }).then(function (response) {
            if (response.status == 200 && response.data.status == 1) {
              _this2.cost = response.data.result;
            } else {
              _this2.$Message.error(response.data.result.message);
            }
          });
        },
        payOrder: function payOrder() {
          var _this3 = this;

          if (this.CPUNum + this.RAMSize == this.currentCPUNum + this.currentRAMSize) {
            return;
          }
          this.$http.get('information/UpVMConfig.do', {
            params: {
              cpunum: this.CPUNum,
              memory: this.RAMSize,
              VMId: this.virtualMachineid
            }
          }).then(function (response) {
            if (response.status == 200 && response.data.status == 1) {
              _this3.$Message.success('订单提交成功');
              _this3.$router.replace("order");
            } else {
              _this3.$Message.error(response.data.message);
            }
          });
        }
      }
    });
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6c92498e","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Back/Upgrade.vue
    var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"background"}},[_c('div',{attrs:{"id":"wrapper"}},[_c('span',{staticClass:"title"},[_c('router-link',{staticStyle:{"color":"rgba(17, 17, 17, 0.43)"},attrs:{"to":"overview"}},[_vm._v("总览")]),_vm._v(" /\n        "),_c('router-link',{staticStyle:{"color":"rgba(17, 17, 17, 0.43)"},attrs:{"to":"host"}},[_vm._v("云主机")]),_vm._v(" / "),_c('span',[_vm._v("升级")])],1),_vm._v(" "),_c('div',{staticClass:"upgrade",attrs:{"id":"content"}},[_c('div',{staticStyle:{"padding-bottom":"20px","border-bottom":"1px solid #E9E9E9"}},[_c('span',{staticClass:"title"},[_vm._v("升级配置")]),_vm._v(" "),_c('Button',{staticClass:"btnnormal",staticStyle:{"float":"right"},on:{"click":function($event){_vm.$router.go(-1)}}},[_vm._v("返回")])],1),_vm._v(" "),_c('div',{staticClass:"body"},[_c('div',{staticStyle:{"width":"50%"}},[_c('p',{staticClass:"content-title"},[_vm._v("CPU")]),_vm._v(" "),_c('div',{staticClass:"cpu"},_vm._l((_vm.zoneInfo.kernelList),function(item){return _c('span',{class:{select:item.value==_vm.CPUNum},on:{"click":function($event){_vm.changeCPU(item.value)}}},[_vm._v(_vm._s(item.value)+"核")])})),_vm._v(" "),_c('p',{staticClass:"content-title"},[_vm._v("内存")]),_vm._v(" "),_vm._l((_vm.zoneInfo.kernelList),function(item){return (item.value==_vm.CPUNum)?_c('div',{staticClass:"cpu"},_vm._l((item.RAMList),function(ram){return _c('span',{directives:[{name:"show",rawName:"v-show",value:(ram.value>=_vm.CPUNum),expression:"ram.value>=CPUNum"}],class:{select:ram.value==_vm.RAMSize},on:{"click":function($event){_vm.changeCache(ram.value)}}},[_vm._v(_vm._s(ram.value)+"G")])})):_vm._e()})],2),_vm._v(" "),_c('div',{staticClass:"conf-wrapper"},[_c('h1',[_vm._v("升级前配置")]),_vm._v(" "),_c('span',[_vm._v("主机名称 : "+_vm._s(_vm.hostname))]),_vm._v(" "),_c('span',[_vm._v("主机配置 : "+_vm._s(_vm.currentCPUNum)+"核"+_vm._s(_vm.currentRAMSize)+"G")]),_vm._v(" "),_c('span',[_vm._v("剩余时长 : "+_vm._s(_vm.endtime))]),_vm._v(" "),_c('router-link',{staticStyle:{"bottom":"23px","position":"absolute"},attrs:{"to":"home"}},[_vm._v("全民普惠，3折减单，最高减免7000元！")])],1),_vm._v(" "),_c('div',{staticClass:"conf-wrapper"},[_c('h1',[_vm._v("升级后配置")]),_vm._v(" "),_c('span',[_vm._v("主机名称 : "+_vm._s(_vm.hostname))]),_vm._v(" "),_c('span',[_vm._v("主机配置 : "+_vm._s(_vm.CPUNum)+"核"+_vm._s(_vm.RAMSize)+"G")]),_vm._v(" "),_c('span',[_vm._v("剩余时长 : "+_vm._s(_vm.endtime))]),_vm._v(" "),_c('span',{staticStyle:{"line-height":"24px"}},[_vm._v("应付差价 :\n               "),_c('i',{staticClass:"money"},[_vm._v(_vm._s(_vm.cost)+"元")])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('button',{on:{"click":_vm.payOrder}},[_vm._v("立即购买")])])])])])])}
    var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticStyle:{"margin-top":"10px"}},[_c('a',{attrs:{"href":"/ruicloud/#/computed/3-1","target":"_blank"}},[_vm._v("购买和计费说明")])])}]
    var esExports = { render: render, staticRenderFns: staticRenderFns }
    /* harmony default export */ var Back_Upgrade = (esExports);
// CONCATENATED MODULE: ./src/components/Back/Upgrade.vue
    function injectStyle (ssrContext) {
      __webpack_require__("+juY")
    }
    var normalizeComponent = __webpack_require__("VU/8")
    /* script */


    /* template */

    /* template functional */
    var __vue_template_functional__ = false
    /* styles */
    var __vue_styles__ = injectStyle
    /* scopeId */
    var __vue_scopeId__ = "data-v-6c92498e"
    /* moduleIdentifier (server only) */
    var __vue_module_identifier__ = null
    var Component = normalizeComponent(
      Upgrade,
      Back_Upgrade,
      __vue_template_functional__,
      __vue_styles__,
      __vue_scopeId__,
      __vue_module_identifier__
    )

    /* harmony default export */ var components_Back_Upgrade = __webpack_exports__["default"] = (Component.exports);


    /***/ })

});
