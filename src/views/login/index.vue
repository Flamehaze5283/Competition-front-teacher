<template>
  <div class="grap">
    <div class="login-container" >
      <el-form ref="form" :rules="rules" :model="login" label-width="120px" >
        <h3 class="login-title">欢迎登录学科竞赛管理系统教师端</h3>
        <el-form-item label="邮箱" prop="email"  >
          <el-input v-model="login.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="login.password" placeholder="请输入密码" type="password" show-password auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="loginform()" class="login">登录</el-button>
          <el-link type="primary" class="link" @click="passwd()">忘记密码？</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapMutations} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      rules: {
        password: [
          { required: true,message: '密码不能为空', trigger: 'blur'}
       ],
        email: [
          { required: true,message: '邮箱不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
  },
  methods: {
    ...mapMutations(['setToken']),
    loginform() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.axios.post('/teacher/token',response => {
            // 登录成功后 转到一个成功页面
            if(response.code == 200) {
              this.axios.setToken(response.data)
              this.setToken(response.data)
              this.$router.push({
                path: '/'
              })
            }
          },this.login)
        }
      })
    },
    passwd(){
      this.$router.push({
        path: '/passwd'
      })
    }
  }
}
</script>
<style scoped >

  .login-container{
    border-radius: 10px;
    position: absolute;
    left: 480px;
    top: 180px;
    background-clip: padding-box;
    width: 500px;
    border: 1px solid #A9A9A9;
    padding: 35px 35px 15px 5px;
    box-shadow: 0 0 25px #8fbcd0 ;

    background-color: #d6d6d6;
  }

  .login-title{
    margin:  0 auto 20px 135px;
  }

  .grap{
    margin: 0;
    padding: 0;
    position: relative;
    background-image: url(../../assets/teacherlogin.jpg);
    height: 100vh;
    width: 100vw;
    background-repeat:no-repeat;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  .link{
    position: absolute;
    right: 20px;
  }

  .login{
    width: 250px;
  }

</style>
