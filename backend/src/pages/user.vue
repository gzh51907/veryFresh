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

  //一进入页面时发请求获取数据渲染页面
   created() {
   this.handlepages(this.currentPage4);
  },

  methods: {
    //点击添加按钮跳转到添加用户列
    goto_adduser() {
        this.$router.push('/adduser')
    },
    
    //点击删除全部的按钮删除所有用户数据
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
      console.log(size);  //每页下拉显示的数据  
    },
    handleCurrentChange(page) {
      console.log(page);  //点击第几页
      this.currentPage4=page;
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
      let data1=this.tableData3.result[index];
      let id=data1.userId;
      let name=data1.username;
      if(name=="lh"||name=="yani"){
          alert("该用户为超级VIP用户,不可删除！")
      }else{
        alert("您确定删除此用户吗？");
        this.getlist(id);   //发请求删除数据库中的数据
        this.tableData3.result.splice(index,1);  //删除页面中被选中删除的数据
        this.handlepages(this.currentPage4);     //重新发请求渲染数据
      }
      // console.log(index, row);
    },
    //删除单行
    async getlist(id){
      let {data}=await this.$axios.get("http://10.3.133.72:10086/admin/delUser",{
        params:{
          userId:id
        }
      }) 
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