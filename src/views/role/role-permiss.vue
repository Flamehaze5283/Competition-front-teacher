<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3"><el-tag class="tag">{{name}}</el-tag></el-col>
      <el-col :span="21">
        <el-button type="info" icon="el-icon-back" class="btn" @click="goback()">返回</el-button>
      </el-col>
    </el-row>
    <el-tree
      :data="permiss"
      show-checkbox
      ref="tree"
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="defaultchecked"
      :props="{label: 'name'}">
    </el-tree>
    <el-button type="primary" plain @click="getCheckedKeys()" style="margin-top: 30px;">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'RolePermiss',
  data() {
    return {
      name: '',
      permiss: [],
      defaultchecked: [],
      form: {
        roleId: 0,
        permissionId: []
      }
    }
  },
  created() {
    this.form.roleId = this.$route.query.id
    this.name = this.$route.query.name
    this.getData()
    this.getPermiss()
  },
  methods: {
    getData() {
      this.axios.get('/teacher-role-permission/getByRoleId',response => {
        if(response.data) {
          this.form.id = response.data.id
          this.defaultchecked = response.data.permissionId.split(',').map(Number)
        }
      },{roleId: this.form.roleId})
    },
    getPermiss() {
      this.axios.get('/teacher-role-permission/get-permiss',response => {
        this.permiss = response.data
      })
    },
    getCheckedKeys() {
      this.form.permissionId = this.$refs.tree.getCheckedKeys()
      this.axios.post('/teacher-role-permission/save',response => {
        this.$router.push('/role')
      },this.form)
    },
    goback(){
      this.$router.push({
        path: '/role'
      })
    }
  }
}
</script>
<style scoped>
  .tag{
    margin-bottom: 20px;
  }
  .btn{
    height: 35px;
  }
</style>
