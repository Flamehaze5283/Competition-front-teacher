<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="角色名"  prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="save">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'RoleEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          name: ''
        },
        rules: {
          name: [
            { required: true,message: '角色名不能为空', trigger: 'blur'},
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
        url: '/ums-role/add'
      }
    },
    created() {
      if(this.editid) {
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/ums-role/update'
        // 通过id 读原始数据
        this.axios.get('/ums-role/getById',response => {
          this.form.id = response.obj.id
          this.form.name = response.obj.name
        },{id:this.editid})
      }
    },
    methods:{
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.axios.post(this.url,response => {
              // 子组件要改变父组件的值
              this.$emit('update:show',false)
              this.$emit('getData')
            },this.form)
          }
        })
      }
    }
  }
</script>

<style>
</style>
