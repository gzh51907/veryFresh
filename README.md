## 项目名称:《极鲜网》 

#### 地址

- 官网：[https://www.gfresh.cn/#/homePage](https://www.gfresh.cn/#/homePage)

- 项目地址

  - 前台：[http://47.97.41.248:8888/home](http://47.97.41.248:8888/home)
    - 账号可自行注册
  - 后台：[http://47.97.41.248:9999/user](http://47.97.41.248:9999/user)  
    - 管理员账号：admin 密码：123

- github地址：[https://github.com/gzh51907/veryFresh](https://github.com/gzh51907/veryFresh)

  > 源码在`dev`分支上

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

├─backend   			后台管理系统文件夹
│  │  .gitignore
│  │  babel.config.js  
│  │  package-lock.json
│  │  package.json
│  │  README.md
│  │  
│  ├─public  
│  │      favicon.ico
│  │      index.html
│  │      jxw.png
│  │      
│  └─src    		后台系统源码文件夹
│      │  App.vue   
│      │  main.js
│      │  
│      ├─assets  		静态资源文件夹
│      │  │  logo.png   
│      │  │    
│      │  ├─font 			字体文件夹
│      │  │      
│      │  ├─goods  			商品图片文件夹
│      │  │      
│      │  ├─icon			icon图片文件夹
│      │  │      
│      │  └─mine	mine.vue 用的图片
│      │          
│      ├─pages				子页面文件夹
│      │      addgoods.vue		添加商品
│      │      adduser.vue		添加用户	
│      │      booklist.vue		订单列表(购物车相关)
│      │      goods.vue			商品列表
│      │      login.vue			管理员登录
│      │      NotFound.vue		404页面
│      │      user.vue			用户列表
│      │      
│      └─routes				路由文件夹
│              index.js		
│              routes.js		各路由信息配置
│              
├─backEndServer			后台服务器，接口
│  │  .gitignore
│  │  package-lock.json		依赖版本锁定
│  │  package.json			用到的依赖
│  │  
│  ├─node_modules			依赖文件
│  └─src				源码文件夹
│      │  server.js			静态服务器
│      │  test.html			测试接口用的前端页面
│      │  
│      ├─assert				静态资源文件夹，
│      │      common.js			公共方法的封装
│      │      	
│      ├─db				数据库文件夹
│      │      index.js
│      │      mongodb.js	mongodb数据库操作数据库的方法封装
│      │      
│      ├─routes			接口文件夹
│      │      admin.js		管理员admin相关的接口
│      │      cart.js		 	购物车相关的接口
│      │      goods.js		 商品数据接口
│      │      index.js		  请求的入口文件，调用封装的接口，处理各种请求
│      │      user.js		    用户相关的接口
│      │      verify.js		  token校验接口
│      │      
│      └─utils					公共事务文件夹
│              getuserInfo.js		通过token获取用户信息的接口，封装了但未使用
│              index.js	
│              token.js				token的校验与生成
│              
└─jxw						（极鲜网）前端页面文件夹
    │  .gitignore		
    │  babel.config.js	
    │  package-lock.json
    │  package.json	
    │  README.md
    │  项目进度记录.md		项目进度记录(不完整的记录)
    │  
    ├─node_modules			依赖文件
    ├─public				
    │      favicon.ico
    │      index.html
    │      jxw.png
    │      
    └─src				源码
        │  .babelrc
        │  App.vue
        │  main.js
        │  
        ├─assets			静态资源
        │  │  logo.png
        │  │  
        │  ├─book				预订页面(book.vue)相关图片
        │  │      
        │  ├─font				  相关字体文件夹(未使用)
        │  │      	
        │  ├─goods				商品相相关图片文件夹
        │  │      
        │  ├─icon				  项目用到的icon图片文件夹
        │  │      
        │  └─mine				mine.vue(我的)用到的图片
        │          
        ├─components		组件文件夹(未封装有组件)
        ├─css				css文件夹(主要用途：引入base.css)
        │      
        ├─js				js文件夹(引入外部js)
        │      
        ├─pages					子页面文件夹
        │      book.vue				预订页面
        │      cart.vue			   	购物车
        │      cart_rules.vue		购物车/规则详情
        │      detail.vue			   商品详情
        │      home.vue			   首页
        │      list.vue				    商品列表(只做了静态)
        │      mine.vue				我的
        │      NotFound.vue	   404页面
        │      quit.vue			 	个人中心
        │      register_login.vue	登录注册
        │      type.vue				分类
        │      
        ├─routes			路由相关文件夹
        │      index.js
        │      routes.js	路由信息配置文件
        │      
        └─store				vuex的库
                index.js
                

### 项目截图

#### 1.首页`home.vue`

![3c71c5e6e4a8045da65aa2b1d31abf4](C:\Users\LH\AppData\Local\Temp\WeChat Files\3c71c5e6e4a8045da65aa2b1d31abf4.png)



#### 2.详情页`detail.vue`

![aac2e6d8ae4790430852f1a7a8a4814](C:\Users\LH\AppData\Local\Temp\WeChat Files\aac2e6d8ae4790430852f1a7a8a4814.png)

#### 3.购物车`cart.vue`

![45187de0b4405b6e9fd06f406e49bf0](C:\Users\LH\AppData\Local\Temp\WeChat Files\45187de0b4405b6e9fd06f406e49bf0.png)

#### 4.我的`mine.vue`

![015eb5db1eafae025ac4915ed7f89fa](C:\Users\LH\AppData\Local\Temp\WeChat Files\015eb5db1eafae025ac4915ed7f89fa.png)



#### 5.登录注册`register_login.vue`

![ae5be780934249394935a30f69211ef](C:\Users\LH\AppData\Local\Temp\WeChat Files\ae5be780934249394935a30f69211ef.png)

#### 6.后台管理系统

![1571548137613](C:\Users\LH\AppData\Roaming\Typora\typora-user-images\1571548137613.png)

