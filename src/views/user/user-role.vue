<template>
  <div>
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
  name: 'UserRole',
  data() {
    return {
      roles: [],
      form: {
        userId: 0,
        roleId: []
      }
    }
  },
  created() {
    this.form.userId = this.$route.query.id
    this.getData()
    this.getRoles()
  },
  methods: {
    getData() {
      this.axios.get('/ums-user-role/getByUserId', response => {
        if(response.obj) {
          this.form.roleId = response.obj.roleId.split(',').map(Number)
          this.form.id = response.obj.id
        }
      },
      {userId: this.form.userId})
    },
    getRoles() {
      this.axios.get('/ums-role/list', response => {
        this.roles = response.obj
      },
      {active: 1,withPage: 0})
    },
    save() {
      this.axios.post('/ums-user-role/save',response => {
        this.$router.push('/user')
      },
      this.form)
    }
  }
}
</script>
<style scoped>
</style>
