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
         <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
           @cell-click="celledit"
           v-model="tableData3"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            prop="id"
            label="#"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="120"
           @change="username"
           slot-scope="{row,$index}">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="250">
          </el-table-column>
          <el-table-column
            prop='regtime'
            label="注册日期"
            width="">
            <template slot-scope="scope">{{ scope.row.regtime }}</template>
          </el-table-column>
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
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
  data() {
    return {
      currentPage4: 4,
      tableData3: [],
      multipleSelection: []
    };
  },
  methods: {
    celledit(row, column, cell, event) {
      cell.contentEditable = true;
      cell.focus();
    },
    username() {},
    goto_adduser() {
      this.$router.push("/adduser");
    },
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
    handleEdit(index, data, a) {
      console.log(index, data, a);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  //请求数据
  async created() {
    let { data: { data } } = await this.$axios.get(
      "http://10.3.133.72:10086/admin/userList"
    );
    console.log(data);
    this.tableData3 = data;
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