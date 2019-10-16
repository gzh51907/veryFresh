<template>
<el-container style="height:100%;margin-bottom:0px;">
  <el-header style="background-color:#2E363F;">
     <h1 class="bt"><a href="###">后台管理系统</a></h1>
     <p class="log"><a href="###"><i class="el-icon-position"></i>登陆</a></p>
  </el-header>
  <el-container style="height:calc(100% - 60px)">
    <el-aside width="180px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="rgba(32, 34, 42, 1)"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:100%;"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-caret-right"></i>商品列表</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-caret-right"></i>添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><i class="el-icon-caret-right"></i>用户列表</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-caret-right"></i>添加用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><i class="el-icon-caret-right"></i>订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span>错误页面</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1"><i class="el-icon-caret-right"></i>403</el-menu-item>
          <el-menu-item index="4-2"><i class="el-icon-caret-right"></i>404</el-menu-item>
          <el-menu-item index="4-3"><i class="el-icon-caret-right"></i>500</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main style="padding:0px;">
      <div class="main_head">
          <div class="main_tab">
              <a href="" class="a3">
                  <i class="el-icon-s-home"></i>
                  主页
              </a>
          </div>
      </div>
      <router-view />
      </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页",
        },
        {
          name: "user",
          path: "/user",
          text: "用户信息管理",
        },
        {
          name: "goods",
          path: "/goods",
          text: "商品信息管理",
        },
        {
          name: "login",
          path: "/login",
          text: "登陆",
        },
        {
          name: "regist",
          path: "/regist",
          text: "注册",
        }
      ]
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
  },
  created() {
    //获取到当前路由信息
    this.activeIndex = this.$route.path; //刷新时高亮不会还原到首页
  },
  watch: {
    $route(to, from) {
      // console.log("to,from", to, from);
      // console.log("activeIndex", this.activeIndex);
      if (to.path != from.path) {
        this.activeIndex = to.path; //高亮跟随
      }
    }
  }
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
body,html{
height:100%;
}
</style>
<style lang="scss">

 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu-item-group /deep/ .el-menu-item {
    font-size:12px;
  }

  .bt{
     float:left;
  }
  .log{
     float:right;
     a{
       color:#9b9797;
     }
  }

  .main_head {
      height: 38px;
      width: 100%;
      background: #fff;
      .main_tab {
          height: 100%;
          width: 100px;
          margin-left: 2;
          .a3 {
             color:#000;
              height: 38px;
              width: 100%;
              display: block;
              font-size:12px;
              line-height: 38px;
          }
      }
  }
</style>