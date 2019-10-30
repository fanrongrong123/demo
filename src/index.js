// 入口文件

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import {Spin} from 'antd'

import store from './redux/store'
import App from './App'
// import './config/i18n'

ReactDOM.render((
<Provider store = {store}>
  <App/>
</Provider>
),document.getElementById('root'))
