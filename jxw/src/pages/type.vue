<template>
  <div>
    <h2>分类专区</h2>
      <van-tabs>
        <van-tab v-for="item in navlist" :title="item.name" :key="item.name">
          <el-tabs :tab-position="tabPosition" style="padding-top:20px;">
            <el-tab-pane :label="ele.name" v-for="ele in item.childList" :key="ele.name">
              <van-grid :gutter="10">
                <van-grid-item
                  v-for="elec in ele.childList"
                  :key="elec.name"
                  :icon="elec.picImg"
                  :text="elec.name"
                  style="flex-basis:33%;"
                />
              </van-grid>
            </el-tab-pane>
         </el-tabs>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // name: 'type',
  data() {
    return {
      navlist: [],
       tabPosition: 'left'
    };
  },
  async created() {
    //发起请求获取数据
    let { data: { data } } = await this.$axios.get(
      "https://zuul.gfresh.cn/api/product/product/queryAllCategory"
    );
    // console.log(data);
    this.navlist = data;
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
  color: #333;
  padding: 30px 0px 30px 20px;
}
.van-grid-item:nth-child(4){
margin-top: 10px;
}
.van-grid-item /deep/ .van-grid-item__content{
  padding: 0; 
}
.van-grid-item /deep/ .van-grid-item__icon{
  font-size: 81px;
}
.van-grid-item /deep/ [class*=van-hairline]::after {
  border:0 solid #ffffff;
}
.van-grid-item /deep/ .van-grid-item__text{
  color:#000;
}
</style>