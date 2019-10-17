<template>
  <div>
      <div class="header">
        <div class="user-header">
            <h1>订单列表</h1>
        </div>
      </div>
      <div class="main">
        <div class="button">
          <el-button type="danger"><i class="el-icon-delete"></i>删除</el-button>
        </div>
         <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="goodname"
            label="商品名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="sale_price"
            label="现价"
            width="100">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="goodsprice"
            label="商品总价"
            width="100">
          </el-table-column>
          <el-table-column
            prop="bookprice"
            label="订单总价"
            width="100">
          </el-table-column>
          <el-table-column
            label="下单日期"
            width="100">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
     currentPage4: 4,
      tableData3: [{
          id:"1",
          date: '2016-05-03',
          goodname: '王小虎',
          sale_price:99.8,
          goodsprice:998,
          bookprice:1300,
          number:10,
        }, {
          id:"2",
          date: '2016-05-02',
          goodname: '王小虎',
          sale_price:99.8,
          goodsprice:998,
          bookprice:1300,
          number:10,
        }, {
          id:"3",
          date: '2016-05-04',
          goodname: '王小虎',
           sale_price:99.8,
          goodsprice:998,
          bookprice:1300,
          number:10,
        }, {
          id:"4",
          date: '2016-05-01',
          goodname: '王小虎',
          goodsprice:998,
          bookprice:1300,
          sale_price:99.8,
          number:10,
        }],
        multipleSelection: []
    }
  },
   methods: {
     //分页功能
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }, 

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
};
</script>
<style lang="scss" scoped>
.user-header{
    height:50px;
    width:100%;
    h1{
        height:50px;
        width:1100px;
        line-height: 50px;
        font-size:20px;
        color:#000;
        margin:auto;
        border-bottom:2px solid orangered;
    }
}
i{
  margin-right:10px;
}
.main{
  padding:0 50px;
  line-height:0px;
}
.button{
  padding:10px;
  text-align:left;
}
.el-table /deep/ td{
  text-align:center;
}
.el-table  /deep/ th>.cell {
    text-align: center;
}
.block{
  padding-top:20px;
  text-align:right;
}
</style>