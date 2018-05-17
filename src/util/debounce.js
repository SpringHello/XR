/**
 * Created by yunrui001 on 2017-11-29.
 */

export default {
  throttle: function (delay, noTrailing, cb, debounceMode) {

    if (typeof noTrailing !== 'boolean') {
      debounceMode = cb
      cb = noTrailing
      noTrailing = undefined
    }

    /*如果是debounceMode则timeoutID是执行函数的setTimeout的返回，如果是throttleMode则timeoutID是clear函数的setTimeout的返回*/
    var timeoutID
    var lastExec = 0


    return function wrapper() {
      var self = this
      var arg = arguments
      // 本次调用与上次调用的时间差，第一次调用时间戳为0
      var elapsed = Number(new Date()) - lastExec;

      if (timeoutID) {
        clearTimeout(timeoutID)
      }
      // throttleMode
      if (debounceMode == undefined && elapsed > delay) {
        exec()
      }

      function exec() {
        lastExec = Number(new Date())
        cb.apply(self, arg)
      }

    }
  },

  debounce: function () {

  }
}
