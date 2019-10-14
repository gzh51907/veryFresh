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
                <p class="p_title">极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span class="p_price">￥38.00</span>
                  <span class="p_weight">/ 500g</span>
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
                <p class="p_title">极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span class="p_price">￥38.00</span>
                  <span class="p_weight">/ 500g</span>
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
                <p class="p_title">极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span class="p_price">￥38.00</span>
                  <span class="p_weight">/ 500g</span>
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
                <p class="p_title">极鲜仓配 中国 国产鲍鱼 养殖（上海市发货）</p>
                <p>
                  <span class="p_price">￥38.00</span>
                  <span class="p_weight">/ 500g</span>
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

  .productBox {
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
      }
    }
    .productList {
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
          .goods_pic {
            img {
              width: 136px;
              height: 136px;
            }
          }
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
            .p_price {
              font-size: 14px;
              font-weight: bold;
            }
            .p_weight {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>