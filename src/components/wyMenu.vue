<template>
	<el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true" router>


		<el-submenu v-for="(menu, index) in menus" :index="change(menu.id)" :key="index">
			<template slot="title">
				<i :class="iocns[index]"></i>
				<span>{{menu.name}}</span>
			</template>
			<ChilrenMenu v-for="(item, index2) in menu.children" :menu="item" :iocnhh="childrenIocns[index][index2]" :key="index2"></ChilrenMenu>
		</el-submenu>



		<!-- <el-submenu index="1">
      <template slot="title">
		<i class="el-icon-collection"></i>
        <span>学科竞赛管理</span>
      </template>
        <el-menu-item index="/competition"><i class="el-icon-tickets"></i>竞赛列表</el-menu-item>
        <el-menu-item index="/add-competition"><i class="el-icon-circle-plus"></i>创办竞赛</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
		<i class="el-icon-s-custom"></i>
        <span>教师权限管理</span>
      </template>
			<el-menu-item index="/teacher"><i class="el-icon-user"></i>教师列表</el-menu-item>
			<el-menu-item index="/role"><i class="el-icon-news"></i>角色列表</el-menu-item>
			<el-menu-item index="/permission"><i class="el-icon-notebook-1"></i>权限列表</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
		<i class="el-icon-document-copy"></i>
        <span>基本信息管理</span>
      </template>
        <el-menu-item index="/constant-type">常数类别管理</el-menu-item>
        <el-menu-item index="/constant-item">常数项目管理</el-menu-item>
    </el-submenu> -->
	</el-menu>
</template>

<script>
	import ChilrenMenu from '@/components/childrenMenu'
	export default {
		name: 'WyMenu',
		components: {
			ChilrenMenu
		},
		data() {
			return {
				menus: [],
				iocns: [
					'el-icon-collection',
					'el-icon-s-custom',
					'el-icon-document-copy'
				],
				childrenIocns: [
					[
						'el-icon-tickets',
						'el-icon-circle-plus'
					],
					[
						'el-icon-user',
						'el-icon-news',
						'el-icon-notebook-1'
					],
					[
						'el-icon-notebook-2',
						'el-icon-document'
					]
				]
			}
		},
		methods: {
			change(item) {
				return item.toString()
			}
		},
		created() {
			this.axios.post('/teacher-permission/teacherPermissionList', response => {
				console.log(response)
				this.menus = response.data
			})
		}
	}
</script>

<style>
</style>
