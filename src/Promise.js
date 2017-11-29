/**
 * Created by yunrui001 on 2017-11-29.
 */

function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value)
  }

  function rejectPromise(value) {
    reject(promise, value)
  }

  resolver(resolvePromise, rejectPromise)
}

function resolve(promise, value) {
  promise.status = 'full'
}

function reject(promise, value) {
  promise.status = 'reject'
}
function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new Error('Promise resolver must be a function')
  }
  if (!this instanceof Promise) {
    throw new Error('Promise must use new operator')
  }
  invokeResolver(resolver, this)
}
