<template>
  <div class="login-container">
    <el-form ref="form"  :model="login" label-width="120px" >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名"  prop="code">
        <el-input v-model="login.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="name">
        <el-input v-model="login.password" type="password" show-password auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="loginform">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  created() {
  },
  methods: {
    ...mapMutations(['setToken', 'setUsername']),
    loginform() {
      this.axios.post('/ums-user/token',response => {
        // 登录成功后 转到一个成功页面
        if(response.code == 200) {
          this.axios.setToken(response.obj)
          this.setToken(response.obj)
          this.$router.push({
            path: '/'
          })
		  this.setUsername(null)
		  // this.setUsername(this.login.username)
		  // console.log('getUsername: ' + this.getUsername)
		  this.axios.get('/ums-user/getRealName', response => {
			  let user = response.obj
			  console.log(user)
			  this.setUsername(user)
		  }, {
			  "username": this.login.username
		  })
        }
      },this.login)
    }
  }
}
</script>
<style scoped >
  .login-container{
    border-radius: 10px;
      margin: 180px auto;
      background-clip: padding-box;
      width: 500px;
      border: 1px solid #A9A9A9;
      padding: 35px 35px 15px 35px;
      box-shadow: 0 0 25px #8fbcd0 ;
  }

.login-title{
  margin:  0 auto 20px 100px;
}


</style>