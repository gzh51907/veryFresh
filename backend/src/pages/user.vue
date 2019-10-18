<template>
  <div>
      <div class="header">
        <div class="user-header">
            <h1>用户列表</h1>
        </div>
      </div>
      <div class="main">
        <div class="button">
          <el-button type="success" @click="goto_adduser"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
          <el-button type="danger"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <!-- 商品列表内容 -->
         <el-table
          ref="multipleTable"
          :data="tableData3.result"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            prop="gfreshBaId"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="ID"
            width="300">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="100">
          </el-table-column>
          <el-table-column
            label="注册时间"
            width="200">
            <template slot-scope="scope">{{ scope.row.regtime }}</template>
          </el-table-column>
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5,10,15,20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData3.AllNum">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,   // 初始页码
      pagesize:5,        //每页显示条数
      tableData3: [],
      multipleSelection: []
    };
  },

  //请求数据
   created() {
   this.handlepages(this.currentPage4);
  },

  methods: {
    goto_adduser() {
        this.$router.push('/adduser')
    },

    async handlepages(page){
      let { data:{data} } = await this.$axios.get(
      "http://10.3.133.72:10086/admin/userList",{
        params:{
          pages:page,
          number:this.pagesize
        }
      }
    );
    // console.log(data);
    this.tableData3 = data;
    },
    //分页功能
    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(page) {
      console.log(page);
      this.handlepages(page);
    },
    

    //用户列表内容
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

    //编辑和删除
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
.user-header {
  height: 50px;
  width: 100%;
  h1 {
    height: 50px;
    width: 1100px;
    line-height: 50px;
    font-size: 20px;
    color: #000;
    margin: auto;
    border-bottom: 2px solid orangered;
  }
}
i {
  margin-right: 10px;
}
.main {
  padding: 0 50px;
  line-height: 0px;
}
.button {
  padding: 10px;
  text-align: left;
}
.el-table /deep/ td {
  text-align: center;
}
.el-table /deep/ th > .cell {
  text-align: center;
}
.block {
  padding-top: 20px;
  text-align: right;
}
</style>