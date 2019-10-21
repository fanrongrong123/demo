// reduer函数：根据原有的state和指定的action，产生并返回一个新的state

import {combineReducers} from 'redux'
import count from './count'
import products from './products'

// 向外暴露整合多个reducer产生的reducer函数，总函数
export default combineReducers({count,products})