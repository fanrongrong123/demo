import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件
import dayjs from 'dayjs'
import format from 'date-fns/format'
import {Modal,Button,Icon} from 'antd'
import screenfull from 'screenfull'
import {withTranslation} from 'react-i18next'


import {removeUserToken} from '../../../redux/action-creators/user'
import LinkButton from '../../../components/link-button'
import {reqWeather} from '../../../api'

import './index.less'
import { withTranslation } from 'react-i18next'



// 管理页面的头部组件
@connect(state =>({username:state.user.user.username,
                    headerTitle:state.headerTitle}),
                    {removeUserToken}
)

@withRouter class Header extends Component {
  state = {
    currentTime:format(Date.now(),'YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl:'',  //天气图片
    weather:'',        //天气文本
    isFullScreen:false ,  //当前是否全屏
  }

  logout = ()=>{
    // 显示确认框
    Modal.confirm({
      title:'确定退出吗?',
      onOk:() =>{
        this.props.removeUserToken()
      },
      onCancel(){
        console.log('Cancel');
      },
    })
  }

  showWeather = async() =>{
    // 请求获取数据
    const {dayPictureUrl,weather} = await reqWeather('北京')
    // 更新状态
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  handleFullScreen = ()=>{
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  // 切换中英文版本
  changeLanguage = () =>{
    const language = this.state.language === 'en'?'zh-CN':'en'
    this.props.i18n.changeLanguage(language)
    this.setState({
      language
    })
  }
  
  componentDidMount(){
    // 启动定时器,每隔1秒更新显示时间
    this.intercalId = setInterval(() => {
      this.setState({
        currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);


    // 请求获取天气信息显示
   this.showWeather()

  //  给screenfull绑定change
  screenfull.onchange(()=>{
    // 切换数据
    this.setState({
      isFullScreen:!this.state.isFullScreen
    })
  })
  }

  
  // 清除定时器
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  // 渲染到页面
  // 得到当前请求路径
  render(){
    const {currentTime, dayPictureUrl, weather, isFullScreen} = this.state
    const {username, headerTitle} = this.props


    // 页面结构
  return (
    <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button> &nbsp;
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            < img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
  )
  }

}


// 暴露
export default Header