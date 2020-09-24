<template>
  <div>
    <el-container class="detail-container">
      <el-aside width="420px" class="left">
        <el-tag class="tag">竞赛详细信息</el-tag>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="back()">返回上一页</el-button>
          </div>
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div class="text item">
            <div class="clearfix">
             <el-tag class="tag1">竞赛简介</el-tag>
             <div>{{result.tableData.detail}}</div>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">创建时间</el-tag>
             <span>{{result.tableData.createTime}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">开始时间</el-tag>
             <span>{{result.tableData.startTime}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">结束时间</el-tag>
             <span>{{result.tableData.endTime}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">竞赛级别</el-tag>
             <span>{{result.tableData.levelName}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">竞赛类型</el-tag>
             <span>{{result.tableData.typeName}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">当前状态</el-tag>
             <span>{{result.tableData.optionList}}</span>
            </div>
            <div class="clearfix">
             <el-tag class="tag1">负责教师</el-tag>
             <span>{{result.tableData.teacherName}}</span>
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main class="right">
        <template v-if="result.tableData.type === 1">
          <el-tag class="tag2">个人赛报名队伍</el-tag>
          <Person :competitionId="competitionId"></Person>
        </template>
        <template v-else>
          <el-tag class="tag2">团体赛报名队伍</el-tag>
          <Team></Team>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Person from '@/views/competition/person'
  import Team from '@/views/competition/team'
  export default {
    name: 'CompetitionDetail',
    data() {
      return {
        id: 0,
        name: '',
        result: {
          tableData: []
        },
        competitionId: 0
      }
    },
    components:{
      Person,
      Team
    },
    created() {
      this.id = this.$route.query.id
      this.competitionId = this.id
      this.name = this.$route.query.name
      this.getData()
    },
    methods:{
      getData() {
      	this.axios.get('/competition/getById', response => {
      		this.result.tableData = response.data[0]
      	}, {id: this.id})
      },
      back(){
        this.$router.push({
          path: '/competition'
        })
      },
      test() {
        console.log(this.result.tableData)
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
  .detail-container {
      height: 100vh;
  }
  .left {
    border-right: 1px solid #A9A9A9;
  }
  .right {
    margin-left: 30px;
    padding: 0;
  }
  .tag{
    margin-bottom: 20px;
  }
  .tag2{
    margin-bottom: 10px;
  }
  .tag1{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .text {
      font-size: 14px;
    }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
  }
  .image {
    width: 100%;
    display: block;
  }
</style>
