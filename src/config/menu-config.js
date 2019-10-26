// 左侧menu导航数据自定义模块
// 根据menuList生成<item>和<subMenu>组件的数组

const menuList =[
  {
    title:'首页',  //菜单标体名称
    key:'/home',   //对应的path
    icon:'home',   //图标
},
{
    title:'商品',  
    key:'/products',   
    icon:'appstore',
    children:[  //子菜单,有子菜单的是menulist,没有的是item
      {
        title:'品类管理',
        key:'/category',
        icon:'bars'
      },
      {
        title:'品类管理',
        key:'/product',
        icon:'tool'
      },
    ],
},

{
  title:'用户管理',  
  key:'/user',   
  icon:'user',   
},
{
  title:'角色管理',  
  key:'/role',   
  icon:'safety',   
},
{
  title:'图形列表',  
  key:'/charts',   
  icon:'area-chart',  
    children:[
      {
        title:'柱形图',  
        key:'/charts/bar',   
        icon:'bar-chart',   
      },
      {
        title:'折线图',  
        key:'/charts/line',   
        icon:'line-chart',   
      },
      {
        title:'饼图',  
        key:'/chart/pie',   
        icon:'pie-chart',   
      },
    ],
},
]

// 暴露模块
export default menuList