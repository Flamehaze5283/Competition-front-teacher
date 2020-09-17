<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" show-password></el-input>
      </el-form-item>

       <el-form-item label="真实姓名">
        <el-input v-model="form.realname" ></el-input>
      </el-form-item>

      <el-form-item label="电话号">
        <el-input v-model="form.telephone" ></el-input>
      </el-form-item>


      <el-form-item label="医生类型">
        <el-radio-group v-model="form.userType">
          <el-radio-button label="1">门诊 </el-radio-button>
          <el-radio-button label="2">医技 </el-radio-button>
        </el-radio-group>

      </el-form-item>

      <el-form-item label="医生级别">

        <el-select v-model="form.registlevel">
          <el-option v-for="item in registerlevel" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>



      </el-form-item>
      <el-form-item label="归属部门">
        <el-select v-model="form.deptId">
          <el-option v-for="item in depts" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" plain @click="save">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'UserEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          username: '',
          password: '',
          realname: '',
          telephone: '',
          registlevel: null,
          userType: 1,
          deptId: null
        },
        isupdate:false,
        url: '/ums-user/add',
        registerlevel:[ ],
        depts: [ ],
        }

    },
    created() {
      this.init()

      if(this.editid) {
        // 如果是修改 用户名输入框禁用
        this.isupdate = true
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/ums-user/update'
        // 通过id 读原始数据
        this.axios.get('/ums-user/getById',response => {
          this.form.id = response.obj.id
          this.form.username = response.obj.username
          this.form.realname = response.obj.realname
          this.form.telephone = response.obj.telephone
          this.form.userType = response.obj.userType
          this.form.registlevel = response.obj.registlevel
          this.form.deptId = response.obj.deptId
        },{id:this.editid})
      }
    },
    methods:{
      save() {
        this.axios.post(this.url,response => {
          // 子组件要改变父组件的值
          this.$emit('update:show',false)
          this.$emit('getData')
        },this.form)
      },
      init() {
       // alert('初始化页面...')
        //查询部门列表

        this.axios.get('/department/list',response =>{
          this.depts = response.obj
        },{
           withPage: 0,
           active: 1
        })
        //查询医生级别 registerlevel
        this.axios.get('/regist-level/list',response =>{
          this.registerlevel = response.obj
        },{
           withPage: 0,
           active: 1
        })
      }
    }
  }
</script>

<style>
</style>
