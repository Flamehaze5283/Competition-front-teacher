<template>
  <div>
    <el-table
        :data="result.teamData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item  v-for="(item,index) in result.personData[props.$index]" :key="index">
                <span>成员{{index+1}}名称: {{item.studentName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>成员{{index+1}}学号: {{item.numId}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="队伍序号"
          prop="id"
          >
        </el-table-column>
        <el-table-column
          label="队伍名称"
          prop="teamName">
        </el-table-column>
        <el-table-column
          label="队长"
          prop="captainName">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="verifyName">
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
    name: 'Team',
    props: ['competitionId'],
    data() {
      return {
        xd: 0,
        result:{
          teamData: [],
          personData: [[]],
          students:[]
        }
      }
    },
    created() {
      this.getTeamData()
    },
    methods:{
      getTeamData(){
        this.axios.get('/sign/teamList',response => {
          //console.log(response)
          for(let i = 0; i < response.data.length; i++){
            this.result.students = response.data[i].studentId.split(",").map(String)
            this.axios.post('/sign/students', res => {

              //console.log(res)
              this.result.teamData = res.data.teamArrayList
              this.result.personData[i] = res.data.personArrayList

              //console.log(this.result.teamData)
              //console.log(i + this.result.personData[i])
            },{competitionId: this.competitionId,students: this.result.students})

          }

        },{competitionId: this.competitionId})
      },
      tdoVerify(id){
        this.axios.post('/sign/verify', response => {
          //console.log(response)
          this.getTeamData()
        },{id: id})
      },
      tbadVerify(id){
        this.axios.post('/sign/badVerify', response => {
          this.getTeamData()
        },{id: id})
      },
      backVerify(id) {
        this.axios.post('/sign/backVerify', response => {
          this.getTeamData()
        },{id: id})
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
</style>
