<template>
  <div>
      <div class="title">
        <div class="list_title">
            <h3>螯龙虾</h3>
            <span class="title_right">搜索</span>
        </div> 
        <p class="title_del">鲜活产品/龙虾类</p>
      </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
    // async created(){
    //     //发起请求获取数据
    //     let {data}=await this.$axios.get(

    //     )
    // }
};
</script>
<style lang="scss" scoped>
.title{
padding: 30px 0px 30px 20px;
.list_title {
  
   h3{
      font-size: 24px;
     color: #000;
     display: inline-block; 
   } 
   .title_right{
       float:right;
       margin-right:20px;
      font-size:16px;
      color: gray;
   }
}
  .title_del{
       font-size:14px;
      color: gray;
   }
}

</style>