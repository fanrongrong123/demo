// 操作所有数据

// 操作所有分类列表数据的action creator

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

import Category from '../../containers/category'

// 同步action creator
const receiveCategorys = (categorys) => ({type: RECEIVE_CATEGORYS, data: categorys})
const addCategory = (category) => ({type: ADD_CATEGORY, data: category})
const updateCategory = (category) => ({type: UPDATE_CATEGORY, data: category})