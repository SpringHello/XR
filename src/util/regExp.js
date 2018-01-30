var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
var phoneRegExp = /^1[0-9]{10}$/
var passwordLengthRegExp = /^\w{8,}$/
var passwordRegExp = /(?:\d[a-zA-Z])|(?:[a-zA-Z]\d)/
//var passwordRegExp = /ddd/;
export default{
  emailVail: (email) => {
    return emailRegExp.test(email)||phoneRegExp.test(email);
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
  }
}
