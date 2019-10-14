<template>
  <el-container>
 

    <!-- 中间 -->
    <el-main style="padding:0px; margin-bottom:47px;">
      <router-view />
    </el-main>

    <!-- 底部 -->
    <!-- <div class="app_footer" style="height:56px"> -->
      <el-footer style="padding:0px; position:fixed;bottom:0px;width:100%;height:47px;">
        <el-row>
          <ul id="footers" :default-active="activeIndex">
            <li v-for="item in menus" :key="item.path" @click="goto(item.path)">
              <i v-if="activeIndex == item.path" :class="item.activeIcon"></i>
              <i v-else :class="item.iconClassName" ref="active-icon"></i>
              <span>{{item.text}}</span>
            </li>
          </ul>
        </el-row>
      </el-footer>
    <!-- </div> -->
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
          iconClassName: "el-icon-house",
          activeIcon: "homeactive"
        },
        {
          name: "type",
          path: "/type",
          text: "分类",
          iconClassName: "el-icon-document",
          activeIcon: "typeactive"
        },
        {
          name: "book",
          path: "/book",
          text: "我要预订",
          iconClassName: "el-icon-timer",
          activeIcon: "bookactive"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车",
          iconClassName: "el-icon-shopping-cart-2",
          activeIcon: "cartactive"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的",
          iconClassName: "el-icon-coordinate",
          activeIcon: "mineactive"
        }
      ]
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
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
</style>
<style lang="scss">

// .app_footer {
  #footers {
    height: 60px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    background: #fff;
    li {
      width: 20%;
      height: 47px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 9px 0 0 0;
      span {
        font-size: 10px;
        color: #333333;
      }
      i {
        width: 22px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        &::before {
          font-size: 20px;
          color: #999;
          // #0463de
        }
      }
      .homeactive {
        background-image: url("./assets/icon/home.png");
      }
      .typeactive {
        background-image: url("./assets/icon/type.png");
      }
      .cartactive {
        background-image: url("./assets/icon/cart.png");
      }
      .bookactive {
        background-image: url("./assets/icon/book.png");
      }
      .mineactive {
        background-image: url("./assets/icon/mine.png");
      }
    }
  // }
}
</style>