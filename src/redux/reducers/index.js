
// 向外暴露总的reducer函数

import { combineReducers } from 'redux'

import categorys from './categorys'
import user from './user'
import headerTitle from './header-title'

// 暴露
export default combineReducers({
  user,
  headerTitle,
  categorys
})