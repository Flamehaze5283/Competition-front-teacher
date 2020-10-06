<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="9"><el-tag class="tag">{{name}}</el-tag></el-col>
      <el-col :span="15">
        <el-button type="info" icon="el-icon-back"  @click="goback()">返回</el-button>
      </el-col>
    </el-row>
    <el-transfer
        v-model="form.roleId"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :data="roles">
      </el-transfer>
      <el-button type="primary" plain style="margin-top: 50px;" @click="save()">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'TeacherRole',
  data() {
    return {
      name: '',
      roles: [],
      form: {
        userId: 0,
        roleId: []
      }
    }
  },
  created() {
    this.form.userId = this.$route.query.id
    this.name = this.$route.query.realname
    this.getData()
    this.getRoles()
  },
  methods: {
    getData() {
      this.axios.get('/teacher-user-role/getByUserId', response => {
        if(response.data) {
          this.form.roleId = response.data.roleId.split(',').map(Number)
          this.form.id = response.data.id
        }
      },
      {userId: this.form.userId})
    },
    getRoles() {
      this.axios.get('/teacher-role/list', response => {
        this.roles = response.data
      },
      {active: 1,withPage: 0})
    },
    save() {
      this.axios.post('/teacher-user-role/save',response => {
        this.$router.push('/teacher')
      },
      this.form)
    },
    goback(){
      this.$router.push({
        path: '/teacher'
      })
    }
  }
}
</script>
<style scoped>
  .tag{
    margin-bottom: 20px;
  }
</style>
