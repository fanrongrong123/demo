// 指定商品详情的富文本编辑器组件

import React,{Component} from 'react'
import {message} from 'antd'
import PropTypes from 'prop-types'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState,convertToRaw,ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component{
  static PropTypes = {
    detail:PropTypes.string
  }

  constructor(props) {
    super(props)
    const detail = this.props.detail
    let EditorState
    if (detail) {
      const blocksFromHtml = htmlToDraft(detail)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      editorState = EditorState.createWithContent(contentState)
    }else {
      editorState = EditorState.createEmpty()
    }
    // 初始化状态
    this.state = {
      editorState
    }
  }

  onEditorStateChange = (editorState) =>{
    this.setState({
      editorState,
    })
  }

  // 得到输入的富文本数据
  getDetail = () =>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render(){
    const {editorState}
 
  // 渲染
  return (
    <Editor
      editorState={editorState}
      editorStyle={{ height: 250, border: '1px solid #000', padding: '0 30px' }}
      onEditorStateChange={this.onEditorStateChange}
    />
  )
}
}
