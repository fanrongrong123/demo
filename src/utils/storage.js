// local数据存储的工具函数封装
import store from 'store'

// 保存指定key和value的数据
function set(key,value) {
  store.set(key,value)
}

// 获取指定key的对应的值,如果没有返回指定得默认值
function get(key,defaultValue) {
  if (defaultValue === undefined) {
    throw new Error('get()必须=指定默认值')
  }
  return store.get(key,defaultValue)
}

// 删除指定的key的数据
function remove(key) {
  if (key) {
    store.remove(key)
  }else{
    store.clearAll()
  }
}

// 暴露
export default{
  set,
  get,
  remove,
    KEYS:{
      USER_KEY:'user_key',
      TOKEN_KEY:'token_key'
  }
}