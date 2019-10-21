// 登陆路由组件


// 引入,第三方一般写在上面,本地写在下面
import React,{Component} from 'react'
import {Form,Input,Icon,Button} from 'antd'
import logo from './images/logo.png'
import './login.less'
// import { getActiveKey } from 'rc-menu/lib/SubPopupMenu'

const {Item} = Form

// 定义一个类继承
class Login extends Component{

  // 登陆
  login = (e)=>{
    // 阻止默认事件,(不提交表单)m
    e.preventDefault()
    this.props.form.validateFields(async(err,values)=>{
      // 进行表单进行校验
      if (!err) {
        const {username,password} = values  //校验成功
        console.log('提交登陆请求',username,password)
      }else {
        console.log(err)  //校验失败
      }
    })
  }


  // 制定表单验证规则
  validator = (rule,value,callback) => {
    // 验证用户名和密码位数格式是否合法
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/


    // 判断
    if (!value) {
      // callback如果不传参代表校验成功,传参代表失败
      callback('密码必填!')
    }else if(length<4){
      callback('密码必须大于4位!')
    }else if (length>12) {
      callback('密码必须小于12位')
    }else if (!pwdReg.test(value)) {
      callback('密码必须是英文,数字或者下划线组成!')
    }else {
      // 不传参代表成功,必须调用callback
      callback()
    }
  }

  // 虚拟DOM渲染到页面
  render(){
    const {getFieldDecorator} = this.props.form
    return (
      // 页面布局头部
        <div className ='login'>
        <header className = 'login-header'>
          <img src={logo} alt='logo图片'/>
          <h1>React项目:  后台管理系统</h1>
        </header>


       
     {/* 内容区 */}
        <section className = 'login-content'>
          <h3>用户登陆</h3>
          <from onSubmit = {this.login} className = 'login-form'>
            <Item>
                  {/* js代码 */}
              {
                  getFieldDecorator('username',{
                    // 声明式验证
                    rules:[
                      {required:true,whitspace:true,message:'用户名必须输入!'},
                      {min:4,message:'用户名必须大于4位'},
                      {max:12,message:'用户名必须小于12位!'},
                      {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
                    ]
                  })(
                      <Input prefix = {<Icon type = 'user' style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                  )
              }
            </Item>



              {/* 自定义表单校验规则,js代码 */}
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules:[
                    {validator:this.validator}
                  ]
                })(
                  <Input prefix = {<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                  placeholder = '密码'/>
                )
              }
            </Form.Item>

            {/* 登陆按钮 */}
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>

          </from>
        </section>
        </div>
    )
  }
}


// 用户名/密码的的合法性要求
//   1). 必须输入
//   2). 必须大于4位
//   3). 必须小于12位
//   4). 必须是英文、数组或下划线组成

// 暴露
export default Form.create()(Login)
