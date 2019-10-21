
import React from 'react'
import {connect} from 'react-redux'

import Counter from '../components/counter'
import {increment,decrement,incrementAsync} from '../redux/action-creators/count'



// 容器组件:通过connect告诫函数产生的容器组件负责与UI组件和redux通信

export default connect(
  state =>({count:state.count}),   //制定向ui组件传递哪些一般属性
  {increment,decrement,incrementAsync}   //制定向ui组件传递哪些函数属性increment(){}/decrement(){}
  )(Counter)


/*   // 指定
  (number) => ({type:INCREEMENT,data:number})
// 内部会包装成一个新的函数传入ui组件
function fn(...args) {
  dispatch(increment(...args))
}
number => dispatch(increment(number))

this.props.increment(3) */
