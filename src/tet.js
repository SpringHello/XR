/**
 * Created by yunrui001 on 2017-11-29.
 */

var Promise = require('./Promise').Promise

var p = new Promise(function (resolve, reject) {
  resolve('hello')
  reject('hello')
})

p.then(function (value) {
  console.log('resolve', value)
}, function (value) {
  console.log('reject', value)
})
