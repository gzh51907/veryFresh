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
  </div>
</template>

<script>
export default {
  data(){
    return {

    };
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
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      .book_title{
        h4{
          font-size: 24px;
          color: #333;
         font-weight: 400;
         display: block; 
        }      
      }
      .book_p{
          color: #777;
          font-size: 14px;
      } 
       
    }

    

  }
}
</style>