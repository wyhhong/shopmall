import  axios from 'axios'

export function request2(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL:"http://124.70.109.15",
    timeout:5000
  })

  //2.axios请求拦截器
  instance.interceptors.request.use(
    config =>{
      return config
    },error => {

    })

  //响应拦截器
  instance.interceptors.response.use(
    res=>{
      return res
    },error => {
      console.log(error)
    })

  //3.发送真正的网络请求
  return instance(config)
}