// 引入
import React from 'react'
import './index.less'

function LinkButton (props) {
  /* 将接收到所有属性都传给button */
  return <button className="link-button" {...props}/>
}

export default LinkButton