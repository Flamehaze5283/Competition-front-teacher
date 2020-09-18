<template>
   <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :unique-opened="true"
    router
    >


<!--    <el-submenu v-for="(menu, index) in menus"  :index="change(menu.id)" :key="index">
      <template slot="title">
        <span>{{menu.name}}</span>
      </template>
      <ChilrenMenu v-for="(item, index) in menu.children" :menu="item" :key="index"></ChilrenMenu>
    </el-submenu> -->



    <el-submenu index="1">
      <template slot="title">
		<i class="el-icon-collection"></i>
        <span>学科竞赛管理</span>
      </template>
        <el-menu-item index="/regist"><i class="el-icon-tickets"></i>竞赛列表</el-menu-item>
        <el-menu-item index="/fee"><i class="el-icon-circle-plus"></i>创办竞赛</el-menu-item>
    </el-submenu>

    <el-menu-item index="/role">
      <template slot="title">
		<i class="el-icon-s-custom"></i>
        <span>教师权限管理</span>
      </template>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
		<i class="el-icon-document-copy"></i>
        <span>基本信息管理</span>
      </template>
        <el-menu-item index="/constant-type">常数类别管理</el-menu-item>
        <el-menu-item index="/constant-item">常数项目管理</el-menu-item>
		<!--        <el-menu-item index="/registlevel">挂号级别</el-menu-item>
		        <el-menu-item index="/dept">科室管理</el-menu-item> -->
    </el-submenu>
  </el-menu>
</template>

<script>
  import ChilrenMenu from '@/components/childrenMenu'
  export default {
    name: 'WyMenu',
    components:{
      ChilrenMenu
    },
    data() {
      return {
        menus:[]
      }
    },
	methods: {
		change(item) {
			return item.toString()
		}
	},
    created() {
        this.axios.post('/ums-permission/userPermissionList',response =>{
          this.menus = response.obj
        },{

        })
    }
  }
</script>

<style>
</style>
