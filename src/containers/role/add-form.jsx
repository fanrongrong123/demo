// 添加角色的FROM组件
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'
import { create } from 'istanbul-reports'

const {Item} = Form
@Form.create()
class AddFrom extends Component{
  static PropTypes = {
    setForm:PropTypes.func.isRequired,
  }

  constructor (props){
    super(props)
    this.props.setForm(this.props.form)
  }

  render(){
    const {getFieDecorator} = this.props.form
    const formLayout = {
      labelCol:{span:4},
      wrapperCol:{span:20},
    }

    return (
      <Form>
        <Item label="角色名称" {...formLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: '角色名称必须输入'}
              ]
            })(
              <Input placeholder="请输入角色名称"/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddFrom