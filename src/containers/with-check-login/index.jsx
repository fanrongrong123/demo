
// 封装一个用来检查用户登陆的高阶组件

import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

 // WrappedComponent被包装组件
export default function WithCheckLogin(WrappedComponent) {

  // 高阶组件函数返回一个新的组件
  @connect(state => ({hasLogin: state.user.hasLogin}))
  class HocComponent extends React.Component {

    // rest是包含其它所有属性的对象
    render () {
      const path = this.props.location.pathname
      const {hasLogin, ...rest} = this.props 

      // 如果请求的是login, 但已经登陆, 自动跳转到admin
      if (path==='/login' && hasLogin) return <Redirect to="/"/> 
      // 如果请求的不是login, 但没有登陆, 自动跳转到login
      if (path!=='/login' && !hasLogin) return <Redirect to="/login"/> 

      // 将所有接收的属性传递给被包装组件
      return <WrappedComponent {...rest}/>
    }
  }

  return HocComponent
}
