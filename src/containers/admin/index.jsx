// 后台管理一级路由的组件
// 引入
import React,{Component} from 'react'
import {Layout} from 'antd'
import {Route,Switch,Redirect} from 'react-router-dom'


import LeftNav from './left-nav'
import Header from './header'
import WithCheckLogin from '../with-check-login'



import User from '../user'
import Role from '../role'
import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import ProductDetail from '../product/detail'
import ProductAddUpdate from '../product/add-update'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'

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
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/product/detail/:id" component={ProductDetail} exact/>
              <Route path="/product/addupdate" component={ProductAddUpdate} exact/>
              <Route path="/role" component={Role}/>
              <Route path="/user" component={User}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    )
  }
}
// 暴露
export default Admin