// 左侧menu导航数据自定义模块
// 根据menuList生成<item>和<subMenu>组件的数组

const menuList =[
  {
    title:'首页',  //菜单标体名称
    key:'/home',   //对应的path
    icon:'home',   //图标
    isPublic:true,  //图片不需要校验
},
{
    title:'menus.products',  
    key:'/products',   
    icon:'appstore',
    children:[  //子菜单,有子菜单的是menulist,没有的是item
      {
        title:'menus.category',
        key:'/category',
        icon:'bars'
      },
      {
        title:'menus.product',
        key:'/product',
        icon:'tool'
      },
    ],
},

{
  title:'menus.user',  
  key:'/user',   
  icon:'user',   
},
{
  title:'menus.role',  
  key:'/role',   
  icon:'safety',   
},
{
  title:'menus.charts',  
  key:'/charts',   
  icon:'area-chart',  
    children:[
      {
        title:'menus.bar',  
        key:'/charts/bar',   
        icon:'bar-chart',   
      },
      {
        title:'menus.line',  
        key:'/charts/line',   
        icon:'line-chart',   
      },
      {
        title:'menus.pie',  
        key:'/chart/pie',   
        icon:'pie-chart',   
      },
    ],
},
]

// 暴露模块
export default menuList