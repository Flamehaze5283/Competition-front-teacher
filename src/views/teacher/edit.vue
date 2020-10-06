<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="mini">
      <el-form-item label="教师工号" prop="teacherId">
        <el-input v-model="form.teacherId" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" show-password></el-input>
      </el-form-item>

       <el-form-item label="姓名" prop="realname">
        <el-input v-model="form.realname" ></el-input>
      </el-form-item>

      <el-form-item label="电话号" prop="mobilephone">
        <el-input v-model="form.mobilephone" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" plain @click="save">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'TeacherEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          teacherId: '',
          password: '',
          realname: '',
          mobilephone: '',
          email: ''
        },
        isupdate:false,
        url: '/teacher/add',
        rules: {
          teacherId: [
            { required: true,message: '教师工号不能为空', trigger: 'blur'}
          ],
          password: [
            { required: true,message: '密码不能为空', trigger: 'blur'},
            { min: 1, max: 200, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          realname: [
            { required: true,message: '姓名不能为空', trigger: 'blur'},
            { min: 1, max: 200, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          mobilephone: [
            { required: true,message: '电话号码不能为空', trigger: 'blur'},
            { min: 11, max: 11, message: '长度为 11 个数字', trigger: 'blur' }
          ],
          email: [
            { required: true,message: '邮箱不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {

      if(this.editid) {
        // 如果是修改 教师工号输入框禁用
        this.isupdate = true
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/teacher/update'
        // 通过id 读原始数据
        this.axios.get('/teacher/getById',response => {
          //console.log(response)
          this.form.id = response.data.id
          this.form.teacherId = response.data.teacherId
          this.form.realname = response.data.realname
          this.form.mobilephone = response.data.mobilephone
          this.form.email = response.data.email
        },{id:this.editid})
      }
    },
    methods:{
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
            let phonex = /^1[3456789]\d{9}$/;
            if(reg.test(this.form.email)){
              if(phonex.test(this.form.mobilephone)){
                this.axios.post(this.url,response => {
                  // 子组件要改变父组件的值
                  this.$emit('update:show',false)
                  this.$emit('getData')
                },this.form)
              }else{
                alert("请输入正确的手机号")
              }
            } else{
              alert("请输入正确的邮箱")
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>
