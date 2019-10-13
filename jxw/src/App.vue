<template>
  <el-container >
    <!-- 头部 -->
    <el-header class="header" style="padding:0px; height: 56px">
      <el-row>
        <h2>柠檬购</h2>
      </el-row>
    </el-header>

    <!-- 中间 -->
    <el-main  style="padding:0px;">
      <router-view />
    </el-main>

    <!-- 底部 -->
    <el-footer style="padding:0px; position:fixed;bottom:0px;width:100%">
      <el-row>
        <ul id="footers"  :default-active="activeIndex">
          <li
            v-for="item in menus"
            :key="item.path"
            @click="goto(item.path)"
          >
            <i></i>
            <el-badge :value="12" class="item" v-if="item.name==='cart'" >{{item.text}}</el-badge>
            <template v-else>{{item.text}}</template>
          </li>
        </ul>
      </el-row>
    </el-footer>
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
          text: "首页"
        },
        {
          name: "type",
          path: "/type",
          text: "分类"
        },
        {
          name: "book",
          path: "/book",
          text: "我要预订"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的"
        }
      ]
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  },
  components: {}
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss">
.header{
  padding: 0;
  background: #58bc58;
}
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
  li {
    width: 20%;
    height: 60px;
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    i {
      width: 22px;
      height: 20px;
      background-size: contain;
    }
    .el-badge .el-badge__content.is-fixed {
      top: -15px;
    }
  }
  // li:nth-child(1) i {
  //   background-image: url(./assets/icon/home1.png);
  // }
  // li:nth-child(2) i {
  //   background-image: url(./assets/icon/Type1.png);
  // }
  // li:nth-child(3) i {
  //   background-image: url(./assets/icon/search1.png);
  // }
  // li:nth-child(4) i {
  //   background-image: url(./assets/icon/cart1.png);
  // }
  // li:nth-child(5) i {
  //   background-image: url(./assets/icon/mine1.png);
  // }
}
</style>