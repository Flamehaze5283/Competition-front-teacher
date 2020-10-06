<template>
  <div>
    <div class="grap">
      <div class="login-container" >
        <el-form ref="form" label-width="120px" >
          <h3 class="login-title">密码重置</h3>
          <el-form-item label="邮箱" >
            <el-input v-model="passwdform.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" >
            <el-input v-model="passwdform.code" class="code" placeholder="请输入验证码"></el-input>
            <el-button type="primary" class="codebtn" @click="getCode()">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="设置新密码">
            <el-input v-model="passwdform.newPassword" placeholder="请输入新密码" type="password" show-password auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="passwdform.newPasswordAgain" placeholder="请再次输入密码" type="password" show-password auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login" @click="resetPassword()">确认重置</el-button>
            <el-button type="primary" plain class="login" @click="backToLogin()">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Passwd',
    data() {
      return {
        passwdform:{
          email: '',
          code: '',
          newPassword: '',
          newPasswordAgain: ''
        }
      }
    },
    created() {

    },
    methods:{
      backToLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      getCode(){
        this.axios.post('/email/sendSecurityCode',response => {

        },{email: this.passwdform.email})
      },
      resetPassword(){
        this.axios.post('/teacher/rePassword', response => {
          //console.log(response)
          if(response.code === 200){
            this.$router.push({
              path: '/login'
            })
          }
        },this.passwdform)
      }
    }
  }
</script>

<style scoped>
  .login-container{
    border-radius: 10px;
    position: absolute;
    left: 480px;
    top: 140px;
    background-clip: padding-box;
    width: 500px;
    border: 1px solid #A9A9A9;
    padding: 35px 35px 15px 5px;
    box-shadow: 0 0 25px #8fbcd0 ;

    background-color: #d6d6d6;
  }
  .code{
    width: 220px;
  }
  .codebtn{
     width: 130px;
  }
  .login-title{
    margin:  0 auto 20px 235px;
  }

  .grap{
    margin: 0;
    padding: 0;
    position: relative;
    background-image: url(../../assets/teacherpasswd.jpg);
    height: 100vh;
    width: 100vw;
    background-repeat:no-repeat;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  .login{
    width: 150px;
  }
</style>
