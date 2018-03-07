var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
var phoneRegExp = /^1[0-9]{10}$/
var passwordLengthRegExp = /^\w{8,}$/
var passwordRegExp = /(?:\d[a-zA-Z])|(?:[a-zA-Z]\d)/
//var passwordRegExp = /ddd/;
export default{
  emailVail: (email) => {
    return emailRegExp.test(email) || phoneRegExp.test(email);
  },
  phoneVail: (phone) => {
    return phoneRegExp.test(phone);
  },
  passwordVail: (password) => {
    if (!passwordLengthRegExp.exec(password)) {
      return false
    }
    if (!passwordRegExp.exec(password)) {
      return false
    }
    return true;
  },
  validaRegisteredName: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('输入名称不能为空'));
    }
    if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value))||(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value))||(/\s+/.test(value))) {
      callback(new Error('输入名称中不能包含特殊字符或空格'));
    } else {
      callback()
    }
  }
}
