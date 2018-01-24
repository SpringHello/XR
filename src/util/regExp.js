var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
var phoneRegExp = /^(13|14|15|17|18|)[0-9]{9}$/
var passwordLengthRegExp = /^\w{8,}$/
var passwordRegExp = /(?:\d[a-zA-Z])|(?:[a-zA-Z]\d)/
// var passwordRegExp = /ddd/;
export default {
  emailValidate: (email) => {
    return emailRegExp.test(email)
  },
  phoneValidate: (phone) => {
    return phoneRegExp.test(phone)
  },
  passwordValidate: (password) => {
    if (!passwordLengthRegExp.exec(password)) {
      return false
    }
    if (!passwordRegExp.exec(password)) {
      return false
    }
    return true
  }
}
