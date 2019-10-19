<template>
  <div class="home">
    <!-- 头部 -->
    <div class="app_header" style="height:56px;">
      <el-header class="header" style="padding:0px; height: 56px">
        <el-row>
          <el-col :span="4">
            <i class="el-icon-location-information">广州</i>
          </el-col>
          <el-col :span="16">
            <div class="demo-input-suffix">
              <el-input placeholder="请搜索您感兴趣的商品" prefix-icon="el-icon-search"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <i class="el-icon-chat-round"></i>
          </el-col>
        </el-row>
      </el-header>
    </div>

    <!-- vant 写的轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#04be02">
      <van-swipe-item v-for="item in bannerUrl" :key="item.id">
        <a href="javascript:void(0)">
          <img :src="item.filePath" style="width:100%" />
        </a>
      </van-swipe-item>
    </van-swipe>

    <!-- 公告信息 -->
    <div class="notice">
      <div class="nt_pic">
        <span class="jx">极鲜</span>
        <div class="gg">公告</div>
      </div>
      <p class="nt_con">紧急！积分即将清零</p>
      <div class="nt_more">
        更多
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>

    <!-- 菜单 -->
    <div class="nav_box">
      <ul class="nav">
        <li>
          <a href="javascript:void(0)">
            <img src="../assets/icon/icon1.png" class="nav_icon" />
            <p>极鲜仓配</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../assets/icon/icon2.png" class="nav_icon" />
            <p>极鲜拍</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../assets/icon/icon3.png" class="nav_icon" />
            <p>极鲜代采</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../assets/icon/icon4.png" class="nav_icon" />
            <p>极鲜礼包</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- 优选现货 | 好货限时购 -->
    <div class="productBox" v-for="item in activeList" :key="item.id">
      <!-- 标题 -->
      <div class="productListTitle">
        <h4>{{item.actName}}</h4>
        <span class="listMore">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <!-- 内容 -->
      <div class="productList">
        <ul class="productList_css">
          <li
            v-for="supitem in item.products"
            :key="supitem.productId"
            @click="goto(supitem.productId)"
          >
            <div class="goods">
              <div class="goods_pic">
                <img :src="supitem.imgUrl" />
                <span class="data-style" v-if="supitem.sendDate === '现货'">{{supitem.sendDate}}</span>
                <span class="data-style" v-else>{{supitem.sendDate}}到港</span>
                <span class="abroad-style" v-if="supitem.abroad === 2">国内精品</span>
                <span class="abroad-style" v-if="supitem.abroad === 1">海外原包</span>
              </div>
              <div class="good_con">
                <p class="p_title">
                  <i class="Self-support" v-if="supitem.isProprietary === 1">自营</i>
                  {{supitem.name}}
                </p>
                <p style="margin-top:4px;">
                  <span class="p_price" v-if="supitem.unitPrice == null">￥__.__</span>
                  <span class="p_price" v-else>￥{{(supitem.unitPrice-0).toFixed(2)}}</span>
                  <span class="p_weight">/{{supitem.unitName}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="productBox">
      <div class="productListTitle">
        <h4>
          猜你喜欢
          <b></b>
        </h4>
      </div>
      <div class="productList">
        <ul class="productList_css">
          <li v-for="supitem in likeData" :key="supitem.productId" @click="goto(supitem.productId)">
            <div class="goods">
              <div class="goods_pic">
                <img :src="supitem.imgUrl" />
                <span class="data-style" v-if="supitem.sendDate === '现货'">{{supitem.sendDate}}</span>
                <span class="data-style" v-else>{{supitem.sendDate}}到港</span>
                <span class="abroad-style" v-if="supitem.abroad === 2">国内精品</span>
                <span class="abroad-style" v-if="supitem.abroad === 1">海外原包</span>
              </div>
              <div class="good_con">
                <p class="p_title">
                  <i class="Self-support" v-if="supitem.isProprietary === 1">自营</i>
                  {{supitem.name}}
                </p>
                <p style="margin-top:4px;">
                  <span class="p_price" v-if="supitem.unitPrice == null">￥__.__</span>
                  <span class="p_price" v-else>￥{{(supitem.unitPrice-0).toFixed(2)}}</span>
                  <span class="p_weight">/{{supitem.unitName}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 龙虾专区 -->
    <div class="Special_area" v-for="item in AreaDatalist" :key="item.areaId">
      <!-- 标题 -->
      <div class="productListTitle">
        <h4>{{item.areaName}}</h4>
        <span class="listMore">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="goodlist">
        <dl v-for="subitem in item.quoteList" :key="subitem.productId" @click="goto(subitem.productId)">
          <dt>
            <div class="goods_pic">
              <img :src="subitem.imgUrl" />
              <span class="data-style" v-if="subitem.sendDate === '现货'">{{subitem.sendDate}}</span>
              <span class="data-style" v-else>{{subitem.sendDate}}到港</span>
              <span class="abroad-style" v-if="subitem.abroad === 2">国内精品</span>
              <span class="abroad-style" v-if="subitem.abroad === 1">海外原包</span>
            </div>
          </dt>
          <dd>
            <div class="good_name">
              <i class="Self-support" v-if="subitem.isProprietary === 1">自营</i>
              {{subitem.name}}
            </div>
            <div class="row2">
              <span class="sale-volume">已售:{{subitem.saledQty}}{{subitem.salePriceUnitName}}</span>
              <span class="guige" style="margin-left:15px;">{{subitem.specName}}</span>
            </div>
            <div class="row3">
              <div>
                <span class="p_price" style="font-size:16px" v-if="subitem.unitPrice == null">￥__.__</span>
                <span class="p_price" v-else>￥{{(subitem.unitPrice-0).toFixed(2)}}</span>
                <span class="p_weight">/{{subitem.unitName}}</span>
              </div>
              <i class="el-icon-shopping-cart-2" @click.stop="addCart(subitem)"></i>
            </div>
          </dd>
        </dl>
        <div class="line-css"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //轮播图数据
      bannerUrl: "",
      activeList: "",
      likeData: "",
      AreaDatalist: ""
      // typeList: ""
    };
  },
  async created() {
     this.$store.state.footer = 1;
    let { data: { data: { content } } } = await this.$axios.get(
      "https://zuul.gfresh.cn/api/product/banner/queryBannerList?",
      {
        params: {
          pageNum: 1,
          showNum: 10
        }
      }
    );
    // console.log(content);
    this.bannerUrl = content;
    //优选现货 好货限时购 的数据请求
    let { data: { data } } = await this.$axios.get(
      "https://zuul.gfresh.cn/api/product/product/queryHomeActivityProduct?",
      {
        params: {
          cityId: "44769e16-ecc6-4d18-a210-caf1c6ec1dea",
          abroad: "0",
          pageSize: "5"
        }
      }
    );
    this.activeList = data;

    //猜你喜欢数据
    let { data: { data: { quoteList } } } = await this.$axios.get(
      "https://zuul.gfresh.cn/api/product/product/queryGuessYouLikeProduct?",
      {
        params: {
          pageNumber: "1",
          cityId: "44769e16-ecc6-4d18-a210-caf1c6ec1dea",
          abroad: "0",
          pageSize: "5"
        }
      }
    );
    this.likeData = quoteList;

    //分区数据
    // let {
    //   data: { data: Arealist }
    // } = await this.$axios.get(
    //   "https://zuul.gfresh.cn/api/product/homeArea/getHomeAreas"
    // );
    // // console.log(Arealist);
    // this.AreaDatalist = Arealist;
    // let axios1 = this.$axios;
    // let len = Arealist.length;
    // let arrlist = [];
    // this.typeList = arrlist;
    // // let datastr = "";

    // // console.time();
    // //在这里拿到数据分区
    // (function fn(num) {
    //   if (num >= len) {
    //     // console.log("递归结束");
    //     return;
    //   } else {
    //     let str = "";
    //     let lh = Arealist[num].categoryVos.length;
    //     // console.log("lh", lh);
    //     Arealist[num].categoryVos.forEach((item, idx) => {
    //       str += item.categoryId + ",";
    //       if (idx == lh - 1) {
    //         // console.log(Arealist[num].areaName);
    //         str = str.slice(0, -1);
    //         let url = `https://zuul.gfresh.cn/api/product/product/queryProductByCateIdShowNum?cateId=${str}&showNum=5&showNoQuote=1&cityId=44769e16-ecc6-4d18-a210-caf1c6ec1dea&abroad=0`;
    //         // console.log(url);
    //         axios1.get(url).then(res => {
    //           let {
    //             data: {
    //               data: { quoteList }
    //             }
    //           } = res;
    //           arrlist.push({ type: Arealist[num].areaName, data: quoteList });
    //           return fn(++num);
    //         });
    //       }
    //     });
    //   }
    // })(0);

    //分区数据 {data:AreaData}
    let { data: { data: AreaData } } = await this.$jxw_axios.get(
      "/goods/queryArea?pagesNum=5"
    );
    // console.log("分区的数据：",AreaData)
    this.AreaDatalist = AreaData;
    console.log("this.AreaDatalist", this.AreaDatalist);
  },
  methods: {
    goto(gid) {
      //路由跳转详情页
      this.$router.push({ name: "detail", params: { gid } });
    },
    //添加到购物车
    async addCart(subitem) {
      // console.log("添加购物车");
      subitem.qty = 1;
      subitem.username = localStorage.getItem("username");;
      let data = await this.$jxw_axios.post(
        "/cart/AddToCart",
        subitem
      );

      console.log("subitem", subitem);
      console.log(data);
      // if (code === 1) {
      //   alert("加入成功！");
      // }
    }
  }
};
</script>

<style lang="scss">
.home {
  .app_header {
    .header {
      background: #fff;
      box-shadow: 1px 1px 4px hsla(0, 0%, 49%, 0.3);
      padding: 0;
      position: fixed;
      top: -1px;
      left: 0px;
      right: 0px;
      width: 100%;
      z-index: 999;
      .el-row {
        margin-top: 8px;
        display: flex;
        align-items: center;

        .el-col-4 {
          text-align: center;
          font-size: 14px;
          i {
            color: #333333;
            display: block;
            font-size: 14px;
            &::before {
              color: #333333;
              font-size: 18px;
            }
          }
        }
        .el-col-16 {
          input {
            background: #f5f5f5;
            outline-style: none;
          }
        }
      }
    }
  }
  // 轮播图
  .van-swipe__indicators {
    bottom: 20px;
    .van-swipe__indicator {
      background-color: gray;
    }
  }
  // 公告
  .notice {
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #333333;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    .nt_pic {
      height: 100%;
      width: 60px;
      font-size: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .jx {
        line-height: 16px;
      }
      .gg {
        font-size: 10px;
        background-image: linear-gradient(90deg, #ff4081, #ff9800);
        color: #fff;
        line-height: 16px;
        width: 28px;
        text-align: center;
        border-radius: 3px;
      }
    }
    .nt_con {
      width: 237px;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    .nt_more {
      width: 78px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .nav_box {
    height: 100px;
    padding: 0px 16px;
    box-sizing: border-box;
    .nav {
      height: 100%;
      padding: 16px 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #eaeaea;
      li {
        a {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 14px;
          color: #000;
          .nav_icon {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }

  //分隔线
  .line-css {
    border-bottom: 1px solid #f5f5f5;
    margin-left: 16px;
    margin-right: 16px;
  }
  // .productBox {
  // 标题
  .productListTitle {
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      box-sizing: border-box;
      font-size: 24px;
      color: #333333;
      line-height: 24px;
      position: relative;
    }
    b {
      position: absolute;
      right: -25px;
      bottom: 50%;
      transform: translateY(50%);
      width: 17px;
      height: 17px;
      background-image: url("../assets/icon/icon-love.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }
  .productList {
    padding-bottom: 16px;
    .productList_css {
      display: flex;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0; //可滚动时隐藏滚动条
      }
      li {
        margin-left: 16px;
        display: flex;
        width: 136px;
        .good_con {
          color: #333;
          margin-top: 4px;
          .p_title {
            text-align: left;
            height: 30px;
            line-height: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      li:last-child {
        padding-right: 16px;
      }
    }
  }

  // 图片
  .goods_pic {
    position: relative;
    img {
      width: 136px;
      height: 136px;
    }
    .data-style {
      text-align: center;
      font-size: 10px;
      height: 22px;
      position: absolute;
      top: 4px;
      left: 0;
      color: #fff;
      line-height: 22px;
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
      background-image: -webkit-linear-gradient(left, #66bdf8, #0091f3);
      background-image: linear-gradient(90deg, #66bdf8, #0091f3);
      min-width: 40px;
      padding: 0 5px 0 0;
      font-weight: 600;
    }
    .abroad-style {
      text-align: center;
      font-size: 10px;
      height: 14px;
      position: absolute;
      bottom: 5px;
      left: 6px;
      color: #333;
      padding: 0 3px;
      line-height: 14px;
      border-radius: 2px;
      background-color: #fff;
    }
  }
  // 自营
  .Self-support {
    background: RGB(255, 64, 129);
    display: block;
    width: 25px;
    height: 16px;
    color: #fff;
    font-size: 10px;
    text-align: center;
    // line-height: 16px;
    border-radius: 3px;
    float: left;
    margin-right: 5px;
  }
  // 价格
  .p_price {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }
  // 重量
  .p_weight {
    font-size: 10px;
  }
  // }

  .Special_area {
    padding-bottom: 16px;
    .goodlist {
      dl {
        // background: #58bc58;
        padding: 16px;
        display: flex;
        justify-content: flex-start;
        dd {
          width: 233px;
          position: relative;
          padding-left: 8px;
          .good_name {
            text-align: left;
            font-size: 12px;
            color: #333;
            height: 15px;
            line-height: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .row2 {
            padding-top: 8px;
            font-size: 12px;
            color: rgba(51, 51, 51, 0.6);
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .row3 {
            // width: 100%;
            width: calc(100% - 8px);
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            i {
              color: rgb(4, 99, 222);
              font-size: 25px;
              position: absolute;
              bottom: 0;
              right: 0;
              min-width: 48px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid rgb(4, 99, 222);
              border-radius: 15px;
            }
          }
        }
      }
    }
  }
}
</style>