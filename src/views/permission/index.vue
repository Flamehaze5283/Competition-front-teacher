<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5"><el-input v-model="search.name" placeholder="请输入要查询的权限名"></el-input></el-col>
      <el-col :span="19">
        <el-button type="primary" icon="el-icon-search" plain @click="searchData()">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="add(0)">添加权限</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="result.tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column label="序号" prop="id" >
      </el-table-column>
      <el-table-column label="权限名" prop="name" >
      </el-table-column>
      <el-table-column label="资源地址" prop="url" >
      </el-table-column>
      <el-table-column label="资源类别" width="100" >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">资源</span>
          <span v-else-if="scope.row.type === 1">导航</span>
          <span v-else>目录</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效" width="100" >
        <template slot-scope="scope">
          <span v-if="scope.row.active === 1">有效</span>
          <span v-else>无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270px" >
        <template slot-scope="scope">
          <template v-if="scope.row.active === 1">
            <el-button size="mini" v-if="scope.row.type !== 0" @click="add(scope.row.id)">添加子权限</el-button>
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
          <template v-else>
            <el-button size="mini" type="info" @click="handleBack(scope.row.id)">恢复</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px;"
      background
      layout="prev, pager, next"
      :page-count="result.pages"
      :current-page.sync="query.pageNo"
      :page-size="query.pageSize"
      @current-change="getData()">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="show" :close-on-click-modal = "false" width="500px" >
      <PermissEdit v-if="show" :show.sync="show" :parentId="parentId" @getData="getData()" :editid="editid" ></PermissEdit>
    </el-dialog>
  </div>
</template>

<script>
import PermissEdit from '@/views/permission/edit'
export default {
  name: 'Permission',
  data() {
    return {
      search: {
        name: ''
      },
      query: {
        name: '',
        pageNo: 1,
        pageSize: 8
      },
      result:{
        tableData: [],
        pages: 0
      },
      parentId: 0,
      show: false,
      editid: null,
      selectedrow: [],
      title: ''
    }
  },
  components:{
    PermissEdit
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios.get('/teacher-permission/list',response => {
        this.result.tableData = response.data.records
        this.result.pages = response.data.pages
      },this.query)
    },
    searchData() {
      this.query.name = this.search.name
      this.query.pageNo = 1
      this.getData()
    },
    handleEdit(id) {
      this.title = '修改权限'
      this.editid = id
      this.show = true
    },
    add(parentId){
      this.parentId = parentId
      this.title = '添加权限'
      this.editid = null
      this.show = true
    },
    handleDelete(id) {
      this.axios.del('/teacher-permission/del',response => {
        this.getData()
      },{ id: id })
    },
    handleSelectionChange(val) {
      // val参数为所有选中行的数据
      this.selectedrow = val
    },
    handleBack(id) {
      this.axios.del('/teacher-permission/back',response => {
        this.getData()
      }, { id: id }, 'back')
    }
  }
}
</script>
<style scoped>
</style>
