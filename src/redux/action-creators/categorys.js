// 操作所有数据

// 操作所有分类列表数据的action creator
import Category from '../../containers/category'

import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action-types'

import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
} from '../../api'




// 同步action creator
const receiveCategorys = (categorys) => ({type: RECEIVE_CATEGORYS, data: categorys})
const addCategory = (category) => ({type: ADD_CATEGORY, data: category})
const updateCategory = (category) => ({type: UPDATE_CATEGORY, data: category})

// 获取所有分类列表的异步action creator
export const getCategorysAsync = () =>{
  return async dispatch =>{
    // 发异步请求
    const result = await reqCategorys()
    if (result.status === 0) {
      const categorys = result.data
      dispatch(receiveCategorys(categorys))
    }
    // 外部组件调用的promise的成功的value
    return result.msg 
  }
}

// 添加异步action creator

export const addCategoryAsync = (categoryName) =>{
  return async  dispatch =>{
    // 发送异步请求
    const result = await reqAddCategory(categoryName)
    if (result.status === 0) {
      const category = result.data
      dispatch(addCategory(category))
    }
    return result.msg
  }
}

// 更新分类的异步action creator
export const updateCategoryAsync = ({categoryId,categoryName}) =>{
  return async dispatch => {
    // 发送异步ajax请求
    const result = await reqUpdateCategory({categoryId,categoryName})
    if (result.status === 0) {
      const category = {_id:categoryId,name:categoryName}
      dispatch(updateCategory(category))
    }
    return result.msg
  }
}