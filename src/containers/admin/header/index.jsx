import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件
import dayjs from 'dayjs'
import format from 'date-fns/format'



import LinkButton from '../../../components/link-button'
import './index.less'

// 管理页面的头部组件
@connect(state =>({username:state.user.user.username}))
@withRouter class Header extends Component {
  state = {
    currentTime:format(Date.now(),'YYYY-MM-DD HH:mm:ss')
  }

  logout = ()=>{
    alert('logout')
  }

  componentDidMount(){
    // 启动定时器,每隔1秒更新显示时间
    this.intercalId = setInterval(() => {
      this.setState({
        currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
  }

  // 清除定时器
  componentWillMount(){
    clearInterval(this.intercalId)
  }

  // 渲染到也页面
  // 得到当前请求路径
  render(){
    const path = this.props.location.pathname
    const {currentTime} = this.state


    
  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎, {this.props.username}</span>
        <LinkButton onClick={this.logout}>退出</LinkButton>
      </div>

      <div className="header-bottom">
        <div className="header-bottom-left">{path}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
          <span>小雨转多云</span>
        </div>
      </div>
    </div>
  )
  }

}


// 暴露
export default Header