// 左边导航

// 引入
import React, { Component } from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
// 用于切换中英文版本
import {withTranslation,getI18n} from 'react-i18next'

import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import {setHeaderTitle} from '../../../redux/action-creators/header-title'
import './index.less'


const {SubMenu,Item} = Menu

@connect(state =>({headerTitle:state.headerTitle}),{setHeaderTitle})
@withRouter
@withTranslation()  //向组件传递i18n对象
class LeftNav extends Component{

  hasAuth = (item) =>{
    const {username,role:{menus}} = this.props.user
    if (username === 'admin'|| item.isPublic || menus.indexOf(item.key)!== -1) {
      return true
    }else if (item.children) {
      return item.children.some(cItem => menus.indexOf(cItem.key) !== -1)
    }
    return false
  }

    // 使用reduce和递归调用生成多级菜单项数组
    getMenuNodes_reduce = (menuList) => {
      return menuList.reduce((pre,item) =>{
        const  path =this.props.location.pathname

        if (this.hasAuth(item)) {
          
        }
    

      // 向pre添加<item>
      if (!item.children) {
        // 如果当前请求的是item对应的路径,将当前title保存到state中
          if (path.indexOf(item.key)===0 && this.props.headerTitle!==item.title) {
          this.props.setHeaderTitle(item.title)
        }

        // 往pre中添加item
        pre.push((
          <Item key={item.key}>
          <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
            <Icon type={item.icon} />
            <span>{this.props.t(item.title)}</span>
          </Link>
        </Item>
        ))
      }else{
        // 向pre中添加submenu
        if (item.children.some(item =>path.indexOf(item.key) === 0)) {
          this.openKey = item.key
        }

        pre.push(
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
        </SubMenu>
      )
       }

      //  返回此次累计结果数据
      return pre
    },[])
  }

  // 使用map()(数组方法)+递归调用生成多级菜单
  getMenuNodes = (menuList) =>{
    return menuList.map(item =>{
      if (!item.children) {
        return (
         <Item key={item.key}>
           <Link to={item.key}>
             <Icon type={item.icon} />
             <span>{this.props.t('menus.home')}</span>
           </Link>
         </Item>
        )
      } else { 
       return (
         <SubMenu
           key={item.key}
           title={
             <span>
               <Icon type={item.icon} />
               <span>{item.title}</span>
             </span>
           }
         >
           {this.getMenuNodes(item.children)} 
         </SubMenu>
       )
      }
      })
  }


// 渲染到页面

render(){
  const menuNodes = this.getMenuNodes_reduce(menuList)
  let selectedKey = this.props.location.pathname
  if (selectedKey.indexOf('/product/') === 0) {
    selectedKey = '/producct'
  }
  
  const openKey = this.openKey
  console.log('left-nav render()',selectedKey,openKey)
  return(
    <div className="left-nav">
        <div className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>{this.props.t('title')}</h1>
        </div>
       
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
    { menuNodes }
          </Menu>
      </div>
  )
}

}
// 暴露
export default LeftNav

