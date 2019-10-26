
// 向外暴露总的reducer函数

import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'

// 暴露
export default combineReducers({
  user,
  headerTitle
})