/**
 * Created by silence.w on 2017-06-10.
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

export function axiosGet(url,params) {
    return new Promise((resolve,reject) => {
      axios.get(url,params)
        .then(response => {
            resolve(response.data);
        },err => {
          reject(err);
        })
        .catch((error) => {
            reject(error);
        })
    })

}
export function axiosPost(url,params) {
  return new Promise((resolve,reject) => {
    axios.post(url,params)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      })
  })

}
export default {
  //登录
  Login(data){
    return axiosPost('/api/user/login',data);
  },
  //获取个人信息
  UserInfo(id,token){
    console.log(token);
    return axiosGet('/api/user/'+id,{params:{token:token}});
  }
}
