<template>
  <div>
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
    this.getData()
    this.getPermiss()
  },
  methods: {
    getData() {
      this.axios.get('/ums-role-permission/getByRoleId',response => {
        if(response.obj) {
          this.form.id = response.obj.id
          this.defaultchecked = response.obj.permissionId.split(',').map(Number)
        }
      },{roleId: this.form.roleId})
    },
    getPermiss() {
      this.axios.get('/ums-role-permission/get-permiss',response => {
        this.permiss = response.obj
      })
    },
    getCheckedKeys() {
      this.form.permissionId = this.$refs.tree.getCheckedKeys()
      this.axios.post('/ums-role-permission/save',response => {
        this.$router.push('/role')
      },this.form)
    }
  }
}
</script>
<style scoped>
</style>
