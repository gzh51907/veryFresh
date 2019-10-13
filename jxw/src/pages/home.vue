<template>
  <div>
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
        <span>极鲜</span>
        <i>icon</i>
      </div>
      <p class="nt_con">紧急！积分即将清零</p>
      <div class="nt_more">更多 ></div>
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

<style lang="scss" >
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
  .nt_pic {
    height: 100%;
    width: 60px;
    background: #aaa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .nt_con {
    width: 237px;
    height: 100%;
    background: #bbb;
    display: flex;
    align-items: center;
    // justify-content: center;
  }
  .nt_more {
    width: 78px;
    height: 100%;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>