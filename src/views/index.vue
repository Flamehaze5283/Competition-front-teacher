<template>
	<el-container class="wrap">
		<el-header class="header" id="head">
			<el-row>
				<el-col :span="16" :offset="4">大学生学科竞赛教师端</el-col>
				<el-col :span="2">
					<el-dropdown split-button type="primary" @command="handleCommand">
							{{getUsername}}
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="Personal">个人设置</el-dropdown-item>
							<el-dropdown-item command="Logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px" class="left">
				<WyMenu></WyMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import WyMenu from '@/components/wyMenu'
	import { mapMutations, mapGetters } from 'vuex'
	export default {
		name: 'Index',
		data() {
			return {
				username: ''
			}
		},
		components: {
			WyMenu
		},
		methods: {
			...mapMutations(['setToken']),
			logout() {
				//this.$alert("退出");
				//清空token （axios header ，vuex sessionStorage）
				// axios
				this.axios.post('/ums-user/logout', response => {
					this.axios.setToken(null)
					this.setToken(null)
					// this.setUsername(null)
					this.$router.push({
						path: '/login'
					})
				})
				//清空服务器端的登录状态
			},
			handleCommand(command) {
				//this.$message('click on item ' + command);
				if (command === 'Logout') {
					this.logout();
				}
			}
			// getRealName() {
			// 	this.axios.get('/ums-user/getRealName', response => {
			// 		  console.log('this.getusername: ' + this.getUsername)
			// 		  let user = response.obj
			// 		  console.log(this.login.username)
			// 		  this.setUsername('abcd')
			// 	}, {
			// 		 "username": this.getUsername
			// 	})
			// }
		},
		created() {
		},
		computed: {
			...mapGetters(['getUsername'])
		}
	}
</script>
<style scoped>
	.wrap {
		height: 100vh;
	}

	.header {
		border-bottom: 1px solid #919191;
		line-height: 60px;
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
	}

	.left {
		border-right: 1px solid #919191;
	}
	
	#head {
		background-color: #06c5ff;
		color: white;
	}
</style>
