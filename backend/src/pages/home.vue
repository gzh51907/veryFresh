<template>
<el-container style="height:100%;margin-bottom:0px;">
  <el-header style="background-color:#2E363F;">
     <h1 class="bt"><a href="###">极鲜网后台管理系统</a></h1>
     <p class="log"><a href="###"><i class="el-icon-position"></i>登陆</a></p>
  </el-header>
  <el-container style="height:calc(100% - 50px)">
    <el-aside width="180px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open.native="handleOpen"
      @close.native="handleClose"
      background-color="rgba(32, 34, 42, 1)"
      text-color="#fff"
      active-text-color="#28bc58"
      style="height:100%;"
      router
      >
      <el-submenu index="1" v-for="item in menus" :key='item.name'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="i in item.childs" :key="i.name" >
          <el-menu-item :index="i.path" ><i class="el-icon-caret-right"></i>{{i.text}}</el-menu-item>
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
          name: "商品管理",
          childs: [
            {
              name: "goods",
              path: "/goods",
              text: "商品列表"
            },
            {
              name: "addgoods",
              path: "/addgoods",
              text: "添加商品"
            }, 
          ]
        },
        {
          name: "用户管理",
          childs: [
            {
              name: "user",
              path: "/user",
              text: "用户列表"
            },
            {
              name: "adduser",
              path: "/adduser",
              text: "添加用户"
            },
          ]
        },
        {
          name: "订单管理",
          childs: [
            {
              name: "booklist",
              path: "booklist",
              text: "订单列表"
            }
          ]
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
body,
html {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.bt {
  float: left;
  a {
    color: #58bc58;
  }
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
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
  font-size: 12px;
}

.log {
  float: right;
  a {
    color: #9b9797;
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
      color: #000;
      height: 38px;
      width: 100%;
      display: block;
      font-size: 12px;
      line-height: 38px;
    }
  }
}
</style>