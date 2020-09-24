<template>
  <div>
    <el-table :data="result.teamTableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="队伍名称">
              <span>{{ props.row.teamName }}</span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="队长姓名">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="队长学号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="队员1姓名">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="队员1学号">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="队员2姓名">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="队员2学号">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="队伍序号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="队伍名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="队长姓名"
        prop="desc">
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="success">通过</el-button>
        <el-button size="mini" type="infor">驳回</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Person',
    data() {
      return {
        result:{
          teamTableData: []
        }
      }
    },
    methods:{

    }
  }
</script>

<style>
</style>
