<template>
  <div>
    <el-table :data="result.tableData" style="width: 100%">
      <el-table-column label="队伍序号" width="80px" prop="id">
      </el-table-column>
      <el-table-column label="队伍名称" prop="teamName">
      </el-table-column>
      <el-table-column label="学生姓名" prop="studentName">
      </el-table-column>
      <el-table-column label="学生学号" prop="studentId">
      </el-table-column>
      <el-table-column label="审核状态" prop="verifyName">
      </el-table-column>
      <el-table-column label="操作">

        <template slot-scope="scope">
          <template v-if="scope.row.verify === 0">
          	<el-button size="mini" type="success" @click="tdoVerify(scope.row.id)">通过</el-button>
            <el-button size="mini" type="info" @click="tbadVerify(scope.row.id)">驳回</el-button>
          </template>
          <template v-else-if="scope.row.verify === 1">
          	<el-tag type="success">已通过</el-tag>
            <el-button size="mini" type="info" @click="backVerify(scope.row.id)">撤销</el-button>
          </template>
          <template v-else>
          	<el-tag type="warning">已驳回</el-tag>
            <el-button size="mini" type="info" @click="backVerify(scope.row.id)">撤销</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Person',
    props: ['competitionId'],
    data() {
      return {
        result: {
          tableData: []
        }
      }
    },
    created() {
      this.getPersonData()
    },
    methods:{
      getPersonData(){
        this.axios.get('/sign/getlist',response => {
          this.result.tableData = response.data
          //console.log(response)
        },{competitionId: this.competitionId})
      },
      tdoVerify(id){
        this.axios.post('/sign/verify', response => {
          //console.log(response)
          this.getPersonData()
        },{id: id})
      },
      tbadVerify(id){
        this.axios.post('/sign/badVerify', response => {
          this.getPersonData()
        },{id: id})
      },
      backVerify(id) {
        this.axios.post('/sign/backVerify', response => {
          this.getPersonData()
        },{id: id})
      }
    }
  }
</script>

<style>
</style>
