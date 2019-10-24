// 封装一个能发ajax请求的函数/对象,进行axios的二次封装(ajax请求)



// 引入
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个instance
const instance = axios.create({
  timeout:10000   //时间超过10秒走失败
})

// 添加请求拦截器
instance.interceptors.request.use(config =>{
  console.log('request interceptor onResolved()')

// 显示请求进度
NProgress.start()

  // 将post/put请求的data对象数据转换为urlencode格式的字符串数据
  const {data} = config
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }
  

  // 如果有token,添加到请求头中
  const token = store.getState().user.token
  if (token) {
    config.headers['Authorization'] = 'atguigu_'+token
  }
  return config
})

// 添加响应拦截器
instance .interceptors.response.use(
  response =>{
    console.log('response interceptor onResolved()')

    // 隐藏请求进度
    NProgress.done()


    // 2.发送请求成功,判断登陆操作是否成功
    const result = response.data
    return result
  },
  error =>{
    console.log('response interceptor onRejected()')

      // 隐藏请求进度
      NProgress.done()

      //3. 统一处理请求异常,外部调用不再处理请求异常
      const{status,data:{msg} = {}} = console.error.response
      // 如果staus为401,token有问题
      if (status === 401) {
        if (history.location.pathname !=='./login') {
          // 显示错误的提示
       message.error(msg)
      //  删除用户信息,自动跳转到登陆界面
      store.dispath(removeUserToken())
        }
      }else if (status === 404) {
        message.error('请求资源不存在')
     }else {
       message.error('请求出错'+error.message)
     }
     
      // 显示请求错误的提示
      // 中断promise链,外部不需要再处理请求出错
      return new Promise(()=>{})
  }
  
)

// 暴露instance
export default instance




