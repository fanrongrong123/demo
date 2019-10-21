import {DECREEMENT,INCREEMENT} from '../action-types'

// 用于管理count数据的reducer函数

const initCount = 1
export default function count(state = initCount,action) {
  console.log('count()',state,acion)
  switch (action.type){
    case INCREEMENT:
      return start + action.data
    case DECREEMENT:
      return state-action.data
      default:
        return start  //返回原来的值
  }
}