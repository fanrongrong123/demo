// redux最核心的管理对象store

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers'   //总reducer   总状态:{CountQueuingStrategy,products}

const IS_DEV = process.env.NODE_ENV === 'development'  //当前环境是否是开发环境

