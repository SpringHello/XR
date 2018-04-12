/**
 * Created by yunrui001 on 2018-04-10.
 */
import axios from 'axios'
import md5 from 'md5'

function appendMD5(params, bol) {
  if (params === undefined) {
    return undefined
  }
  var str = '', count = 0
  for (let i in params) {
    str += i.substr(0, 1) + params[i]
    count++
  }
  str += count
  if (str !== '') {
    str = md5(str)
    var mac = str.substr(0, count) + count + str.substr(count)
    if (bol) {
      return mac
    }
    return {
      ...params,
      mac: mac.toUpperCase()
    }
  }
}

function macIntercept(config) {
  if (config.method == 'get') {
    if (config.url.indexOf('?') != -1) {
      let params = {}
      config.url.split(/\?|\&/).forEach((item, index) => {
        if (index) {
          let arr = item.split('=')
          params[arr[0]] = arr[1]
        }
      })
      let mac = appendMD5(params, true).toUpperCase()
      config.url = `${config.url}&mac=${mac}`
    } else if (config.params) {
      config.params = appendMD5(config.params)
    }
  } else if (config.method == 'post') {
    config.data = appendMD5(config.data)
  }
  return config
}
axios.interceptors.request.use(macIntercept)

export default axios
