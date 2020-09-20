<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="常数类别代码"  prop="name">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
	  <el-form-item label="常数类别名"  prop="name">
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
    name: 'ConstantTypeEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          name: '',
		  code: ''
        },
        rules: {
		  code: [
		    { required: true,message: '编码不能为空', trigger: 'blur'},
	        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
		  ],
          name: [
            { required: true,message: '类别名不能为空', trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        url: '/constant-type/add'
      }
    },
    created() {
      if(this.editid) {
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/constant-type/update'
        // 通过id 读原始数据
        this.axios.get('/constant-type/getById',response => {
		  this.form.id = response.data.id
          this.form.code = response.data.code
          this.form.name = response.data.name
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
