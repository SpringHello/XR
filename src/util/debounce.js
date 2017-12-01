/**
 * Created by yunrui001 on 2017-11-29.
 */

export default function (delay, cb) {
  /* timeoutID */
  var timeoutID

  function wrapper(){
    var arg = arguments
    var content = this
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(exec, delay)
    /* 执行函数 */
    function exec() {
      cb.apply(content, arg)
    }
  }

  return wrapper
}
