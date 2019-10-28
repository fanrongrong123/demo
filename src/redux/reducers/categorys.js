// 管理所有分类列表数据的reducer

import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPATE_CATEGORY
}from'../action-types.js'

const initCategorys = []
export default function categorys(state = initCategorys,action) {
  switch(action.type){
    case RECEIVE_CATEGORYS:
      return action.data
      case ADD_CATEGORY:
        return [action.data,...state]
      case UPATE_CATEGORY:
        return this.state.map(iten =>{
          if (item._id === action.data._id) {
            return action.data
          } else  {
            return item
          }
        })
        default:
          return state
  }
}