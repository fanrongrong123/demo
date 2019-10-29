// 添加角色的from组件
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {From,Input,Tree} from 'antd'
import {getI18n} from 'react-i18next'

import menuList from '../../config/menu-config'

const {TreeNode} = Tree
const {Item} = form

class AddForm extends Component{
  static PropTypes = {
    role:PropTypes.object
  }

  state = {
    checkedKeys:this.props.role.menus || []
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      chenkedKeys: nextProps.role.menus
    })
  }

  
  // 向外部组件提供所有勾选的key数组

 getMenus = () => this.state.checkedKeys

 renderTreeNodes = (menuList) => {
   return menuList.reduce((pre, item) => {

     if (!item.isPublic) {
       // 向pre中<TreeNode>
       pre.push(
         <TreeNode title={getI18n().t(item.title)} key={item.key}>
           {item.children ? this.renderTreeNodes(item.children) : null}
         </TreeNode>
       )
     }
     return pre
   }, [])
 }

 onCheck = (checkedKeys) => {// checkedKeys所有勾选的key的数组
   // 更新状态
   this.setState({
     checkedKeys
   })
 }


 render() {
   const formLayout = {
     labelCol: { span: 4 },
     wrapperCol: { span: 20 },
   }
   const {roleName} = this.props.role
   const {checkedKeys} = this.state

   return (
     <div>
       <Item label="角色名称" {...formLayout}>
         <Input placeholder="请输入角色名称" value={roleName} disabled/>
       </Item>

       <Tree
         checkable
         defaultExpandAll
         onCheck={this.onCheck}
         checkedKeys={checkedKeys}
       >
         <TreeNode title="平台权限" key="all">
           {this.renderTreeNodes(menuList)}
         </TreeNode>
        
       </Tree>
     </div>
   )
 }
}
export default AddForm