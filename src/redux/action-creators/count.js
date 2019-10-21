/* n个用于创建action对象的工厂函数
同步action是对象:{type:'add',data:3}
异步action是函数:
dispatch =>{
  1.执行异步操作
  2.有结果后,dispatch (同步action对象)
} */


import{DECREEMENT,INCREEMENT} from '../action-types'
import { number } from 'C:/Users/范荣荣/AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/prop-types'
import { dispatch } from 'C:/Users/范荣荣/AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/observable/range'

// 同步增加
export const increment = (number) =>({type:INCREEMENT,data:number})

// 同步减少
export const decrement = (number) =>({type:DECREEMENT,data:number})

// 异步增加
export const incrementAsync = (number,delayTime) =>{
  // 返回一个回调函数
  return dispatch =>{
    // 1.执行异步操作
    setTimeout(() => {
      // 2.有了结果后，分发一个同步action对象（增加的）
        dispatch(increment(number))
    }, delayTime);
  }
}