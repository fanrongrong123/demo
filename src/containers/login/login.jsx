/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Form,Input,Icon,Button} from "antd";
import {connect} from 'react-redux'
import qs from 'qs'



import logo from './images/logo.png'
import './login.less'
import {loginAsync} from '../../redux/action-creators/user'
import WithCheckLogin from './with-check-login'


const {Item} = Form


@connect(
  state => ({hasLogin:state.user.hasLogin}),
  {loginAsync}
)
@Form.create()
@WithCheckLogin

class Login extends Component {
  handleSubmit = e =>{
    // 阻止默认行为
    e.preventDefault()
    // 对表单字段进行统一验证
    this.props.form.validateFields((err,values)=>{
      if (!err) {
        // 验证成功
        console.log('发送ajax请求',{username,password});
        const {username,password} = values
        this.props.loginAsync(username,password)

       
        }else{
        // 不写
      }
    });
  }
  // 自定义验证密码
  validatePwd = (rule,value,callback) => {
    if (value==='') {
      callback('密码不能为空')
    }else if (value.length<4) {
      callback('密码不能小于4位')
    }else if (value.length>12) {
      callback('密码不能大于12位')
    }else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    }else {
      // 验证通过
      callback()
    }
  }
  render () {
    const {hasLogin} = this.props
    // 判断登陆成功自动跳转界面
    if (hasLogin) {
      return<Redirect to="/"/>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/> 
          <h1>后台管理系统</h1>
        </header>
        <div className='login-content'>
          <h1>用户登录</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Item>
                {getFieldDecorator('username', {
                   /*
                    用户名/密码的的合法性要求
                    1). 必须输入
                    2). 必须大于等于4位
                    3). 必须小于等于12位
                    4). 必须是英文、数字或下划线组成
                    whitespace:true 空格是否会被视为错误
                    声明式验证:利用已有的验证规则进行验证,方便快捷
                    initialValue:'' 初始值,避免报错 
                  */
                  initialValue:'', 
                  rules: [
                    { required: true, whitespace:true,message: '请输入用户名' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或下划线组成' }
                  ],
                })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )} 
              </Item>
              <Form.Item> 
              {getFieldDecorator('password', {
                initialValue:'', 
                  rules: [
                    /* 
                      自定义校验
                    */
                    { validator:this.validatePwd }
                  ],
                })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}             
                
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
              </Form.Item>
              </Form>
        </div>
      </div>
    )
  }
}
// 暴露
export default Login
