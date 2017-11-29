/**
 * Created by yunrui001 on 2017-11-29.
 */

var Promise = require('es6-promise-polyfill').Promise
var p = new Promise(function (resolve, reject) {
  console.log(this)
})
