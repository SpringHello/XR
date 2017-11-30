/**
 * Created by yunrui001 on 2017-11-29.
 */

function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    setTimeout(function () {
      resolve(promise, value)
    }, 0)
  }

  function rejectPromise(value) {
    setTimeout(function () {
      reject(promise, value)
    }, 0)
  }

  resolver(resolvePromise, rejectPromise)
}

function resolve(promise, value) {
  promise.status = 'full'
  promise.stack[0].resolve(value)
}

function reject(promise, value) {
  promise.status = 'reject'
  promise.stack[0].reject(value)
}
function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new Error('Promise resolver must be a function')
  }
  if (!this instanceof Promise) {
    throw new Error('Promise must use new operator')
  }
  this.stack = []
  this.status = 'pending'

  invokeResolver(resolver, this)
  return this
}

Promise.prototype.then = function (resolve, reject) {
  this.stack.push({
    resolve,
    reject
  })
}

exports.Promise = Promise

