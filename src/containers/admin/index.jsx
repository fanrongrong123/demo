// 后台管理一级路由的组件
// 引入
import React,{Component} from 'react'
import {Layout} from 'antd'



import LeftNav from './left-nav'
import Header from './header'
import WithCheckLogin from '../with-check-login'



// import User from '../user'
// import Role from '../role'
// import Home from '../../components/home'
// import Category from '../category'
// import Product from '../product'
// import ProductDetail from '../product/detail'
// import ProductAddUpdate from '../product/add-update'
// import Line from '../../components/charts/line'
// import Bar from '../../components/charts/bar'
// import Pie from '../../components/charts/pie'

const { Footer, Sider, Content } = Layout

@WithCheckLogin
class Admin extends Component {

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{backgroundColor: 'white', margin: '30px 15px 0 15px'}}>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    )
  }
}
// 暴露
export default Admin