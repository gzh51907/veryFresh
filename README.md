## 项目名称:《极鲜网》 

#### 地址

- 官网：[https://www.gfresh.cn/#/homePage](https://www.gfresh.cn/#/homePage)

- 项目地址

  - 前台：[http://47.97.41.248:8888/home](http://47.97.41.248:8888/home)
    - 账号可自行注册
  - 后台：[http://47.97.41.248:9999/user](http://47.97.41.248:9999/user)  
    - 管理员账号：admin 密码：123

- github地址：[https://github.com/gzh51907/veryFresh](https://github.com/gzh51907/veryFresh)


#### 团队与分工

**团队**   组长:罗浩        组员：陈秋燕   罗晓芳

**负责模块说明：**

​	罗浩：前台首页，前台路由相关，接口编写，数据库、数据整合

​	陈秋燕：购物车模块，登录注册页面，购物车详情规则页面，我的页面，项目部署、上线。

​	罗晓芳：分类页面，个人中心页面，预订页面，后台管理系统(包括页面的制作和数据的渲染)

**项目目录说明**

- backEnd    管理系统文件夹
- jxw    前端文件夹
- backEndServer   接口文件夹

**目录结构：**

1. backEnd 管理系统
```txt
│  .gitignore   忽略文件
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  
├─public              公共资源
│      favicon.ico
│      index.html
│      jxw.png
│      
└─src                 源码
    │  App.vue          
    │  main.js          入口配置文件
    │  
    ├─assets            静态资源
    │  │  logo.png      
    │  │  
    │  ├─font           字体文件夹
    │  │      
    │  ├─goods          商品图片文件夹
    │  │      
    │  ├─icon           icon图片文件夹
    │  │      
    │  └─mine           me.vue用的图片文件夹
    │          
    ├─pages                 子页面文件夹
    │      addgoods.vue       添加商品
    │      adduser.vue        添加用户
    │      booklist.vue       订单表
    │      goods.vue          商品列表
    │      login.vue          登录页
    │      NotFound.vue       404页面
    │      user.vue           用户列表
    │      
    └─routes                路由相关文件夹
            index.js           路由配置
            routes.js          子路由配置文件
            
```

2. backEndServer		后台服务器，接口
```txt
│  .gitignore         忽略文件
│  package-lock.json  依赖版本锁定
│  package.json       依赖关系
│  
├─node_modules       依赖文件夹
└─scr                源码文件夹
    │  server.js        静态资源服务器
    │  test.html        测试接口用的前端页面
    │  
    ├─assert            静态资源
    │      common.js        封装的公用方法
    │         
    ├─db                数据库相关
    │      index.js       
    │      mongodb.js       数据库方法封装
    │      
    ├─routes            接口文件夹
    │      admin.js       管理员相关接口
    │      cart.js        购物车相关接口
    │      goods.js       商品相关接口
    │      index.js               
    │      user.js        用户相关接口
    │      verify.js      token相关
    │      
    └─utils                   公共事务文件夹
            index.js
            token.js              token的校验与生成
```
3. `jxw`前端文件夹
```txt
│  .gitignore             忽略问件
│  babel.config.js        
│  package-lock.json  
│  package.json     
│  README.md        
│  项目进度记录.md          记录项进度
│  
├─node_modules            依赖文件
├─public                  公共文件夹
│      favicon.ico    
│      index.html
│      jxw.png
│      
└─src                   源码
    │  .babelrc
    │  App.vue            
    │  main.js          入口配置文件
    │  
    ├─assets              静态资源
    │  │  logo.png
    │  │  
    │  ├─book               预订页面用到的图片文文件夹
    │  │      
    │  ├─font               字体图标文件(没用上)
    │  │      
    │  ├─goods              商品相关图片文件夹
    │  │      
    │  ├─icon               icon图标文件夹
    │  │      
    │  └─mine               我的(mine.vue)用到的图片
    │          
    ├─components        组件文件夹
    ├─css               外局样式表文件夹
    │      base.css
    │      font.css
    │      
    ├─js                外部js文件夹
    │      rem.js
    │      
    ├─pages                     子页面文件夹
    │      book.vue               预订页面
    │      cart.vue               购物车页面
    │      cart_rules.vue         购物车/规则页面
    │      detail.vue             详情页
    │      home.vue               首页
    │      list.vue               列表页
    │      mine.vue               我的页面
    │      NotFound.vue           404页面
    │      quit.vue               退出页面
    │      register_login.vue     登录注册页面
    │      type.vue               分类页面
    │      
    ├─routes                  路由相关文件夹
    │      index.js               
    │      routes.js               各路由信息配置
    │      
    └─store                   vuex状态管理库
            index.js      
```

### 项目截图

#### 1.首页`home.vue`

![3c71c5e6e4a8045da65aa2b1d31abf4](C:\Users\LH\AppData\Local\Temp\WeChat Files\3c71c5e6e4a8045da65aa2b1d31abf4.png)

#### 2.详情页`detail.vue`

![aac2e6d8ae4790430852f1a7a8a4814](C:\Users\LH\AppData\Local\Temp\WeChat Files\aac2e6d8ae4790430852f1a7a8a4814.png)

#### 3.购物车`cart.vue`

![45187de0b4405b6e9fd06f406e49bf0](C:\Users\LH\AppData\Local\Temp\WeChat Files\45187de0b4405b6e9fd06f406e49bf0.png)

#### 4.我的`mine.vue`

![015eb5db1eafae025ac4915ed7f89fa](https://github.com/gzh51907/veryFresh/blob/dev/readme%E7%94%A8%E5%88%B0%E7%9A%84%E5%9B%BE%E7%89%87/015eb5db1eafae025ac4915ed7f89fa.png)

#### 5.登录注册`register_login.vue`

![ae5be780934249394935a30f69211ef](C:\Users\LH\AppData\Local\Temp\WeChat Files\ae5be780934249394935a30f69211ef.png)

#### 6.后台管理系统

![1571548137613](C:\Users\LH\AppData\Roaming\Typora\typora-user-images\1571548137613.png)

