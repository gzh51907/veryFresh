<template>
  <div class="home">
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

    <!-- goodlist -->
    <div class="productBox">
      <div class="productListTitle">
        <h4>优选现货</h4>
        <span class="listMore">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="productList">
        <ul class="productList_css">
          <li>
            <div class="goods">
              <div class="goods_pic">
                <img src="../assets/goods/good1.jpg" />
              </div>
              <div class="good_con">
                <p>极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span>￥38.00</span>
                  <span>/ 500g
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="goods">
              <div class="goods_pic">
                <img src="../assets/goods/good1.jpg" />
              </div>
              <div class="good_con">
                <p>极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span>￥38.00</span>
                  <span>/ 500g
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="goods">
              <div class="goods_pic">
                <img src="../assets/goods/good1.jpg" />
              </div>
              <div class="good_con">
                <p>极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span>￥38.00</span>
                  <span>/ 500g
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="goods">
              <div class="goods_pic">
                <img src="../assets/goods/good1.jpg" />
              </div>
              <div class="good_con">
                <p>极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span>￥38.00</span>
                  <span>/ 500g
                  </span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //轮播图数据
      bannerUrl: ""
    };
  },
  async created() {
    let {
      data: {
        data: { content }
      }
    } = await this.$axios.get(
      "https://zuul.gfresh.cn/api/product/banner/queryBannerList?pageNum=1&showNum=10"
    );
    // console.log(content);
    this.bannerUrl = content;
  }
};
</script>

<style lang="scss">
.home {
  // padding-bottom: 56px;
  .van-swipe__indicators {
    bottom: 20px;
    .van-swipe__indicator {
      background-color: gray;
    }
  }

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
      // background: #aaa;
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

  .productBox {
    .productListTitle {
      height: 56px;
      padding: 0 16px;
      background: #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4 {
        box-sizing: border-box;
        font-size: 24px;
        color: #333333;
        line-height: 24px;
      }
    }
  }
}
</style>