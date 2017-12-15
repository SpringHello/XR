/**
 * Created by yunrui001 on 2017-12-15.
 */
import axios from 'axios'
export default {
  getUserInfo(){
    return new Promise(resolve => {
      if (sessionStorage.getItem('userInfo')) {
        resolve(JSON.parse(sessionStorage.getItem('userInfo')))
      } else {
        axios.get('user/GetUserInfo.do').then(response => {
          sessionStorage.setItem('userInfo', JSON.stringify(response.data.result))
          resolve(response.data.result)
        })
      }
    })
  },
  getZoneList(){
    return new Promise(resolve => {
      if (sessionStorage.getItem('zoneList')) {
        resolve(JSON.parse(sessionStorage.getItem('zoneList')))
      } else {
        axios.get('information/zone.do').then(response => {
          sessionStorage.setItem('zoneList', JSON.stringify(response.data.result))
          resolve(response.data.result)
        })
      }
    })
  }
}
