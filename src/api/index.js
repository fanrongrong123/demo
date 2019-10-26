// 包含n个接口请求函数的模块,函数的返回值是promise
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
// import { resolve } from 'dns'
// import { reject } from 'q'
// import { json } from 'graphlib'

// 登陆
export const reqLogin = ({username,password}) => ajax({
 url:'/login',
 method:'POST',
 data:{username,password}
})

// 获取用户列表
export const reqUsers =()=> ajax({
  url:'/manage/user/list',
  method:'GET',
})


// 封装获取指定城市的天气信息
export const reqWeather = (city) =>{
  return new Promise((resolve,reject) =>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
      console.log(err,data)
      if (!err && data.status === 'success') {
        const {dayPictureUrl,weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl,weather})
      }else{
        message.error('获取天气失败!')
        return new Promise(()=>{})
      }
    })
  })
}
// 获取所有分类列表
export const reqCategorys = () => ajax('/manage/category/list')