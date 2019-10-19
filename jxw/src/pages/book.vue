<template>
  <div class="book">
    <div class="book_header">
      <div class="title">
          <div class="book_title">
                <h4>我要预订</h4>
          </div>
           <p class="book_p">选择你想预订的商品品类</p>
      </div>
    </div>
    <div class="book_con">
      <dl>
        <dt class="book_dt">
          <img src="../assets/book/01螯龙虾.png" alt="">
        </dt>
        <dd class="book_dd">
          <p class="dd_p1">螯龙虾</p>
          <p class="dd_p2">(活鲜产品)</p>
        </dd>
      </dl>
      <dl>
        <dt class="book_dt">
          <img src="../assets/book/02棕蟹.jpg" alt="">
        </dt>
        <dd class="book_dd">
          <p class="dd_p1">棕蟹</p>
          <p class="dd_p2">(活鲜产品)</p>
        </dd>
      </dl>
      <dl>
        <dt class="book_dt">
          <img src="../assets/book/03新西兰岩龙虾.png" alt="">
        </dt>
        <dd class="book_dd">
          <p class="dd_p1">新西兰岩龙虾</p>
          <p class="dd_p2">(活鲜产品)</p>
        </dd>
      </dl>
      <dl>
        <dt class="book_dt">
          <img src="../assets/book/04西澳大利亚龙虾.png" alt="">
        </dt>
        <dd class="book_dd">
          <p class="dd_p1">西澳大利亚龙虾</p>
          <p class="dd_p2">(活鲜产品)</p>
        </dd>
      </dl>
      <dl>
        <dt class="book_dt">
          <img src="../assets/goods/01.jpg" alt="">
        </dt>
        <dd class="book_dd">
          <p class="dd_p1">螯龙虾</p>
          <p class="dd_p2">(活鲜产品)</p>
        </dd>
      </dl>
    </div>    
  </div>
</template>

<script>
export default {
  data(){
    return {
      // booklist: [],
     
    };
  },
  created(){
     this.$store.state.footer = 1;
  }
  
};
</script>

<style lang="scss" scoped>
.book{
  .book_header{
    background: #fff;
    padding-top: 44px;
    margin-top: -44px;
    .title{
      background: #fff;
      padding: 52px 16px 32px;
     
      .book_title{
        h4{
          font-size: 24px;
          color: #333;
         font-weight: 400;
        }      
      }
      .book_p{
          color: #777;
          font-size: 14px;
      }        
    }
  }
  .book_con{
    display: flex;
    -webkit-box-align: stretch;
    flex-wrap: wrap;
    padding-left: 10px;
    overflow: hidden;
    dl{
      float: left;
       width: 33.333%;
       box-sizing: border-box;
       padding-right: 10px;
       text-align: center;
       margin-bottom: 15px;
      .book_dt{
        max-width: 100%;
        padding-top: 100%;
        position: relative;
        background-size: 100% 100%;
        img{
          width: 100%;
           height: 100%;
           max-width: 100%;
           display: block;
           position: absolute;
           top: 0;
           left: 0;
        }
      }
      .book_dd{
        p{
          display: block;
          width: 100%;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>