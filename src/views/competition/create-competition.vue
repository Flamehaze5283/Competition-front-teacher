<template>
	<div>
		<el-container>
			<el-header class="create-header">
				<el-steps :active="active" finish-status="success" align-center>
					<el-step title="填写竞赛信息"></el-step>
					<el-step title="创建报名表"></el-step>
					<el-step title="预览报名表"></el-step>
					<el-step title="创建成功"></el-step>
				</el-steps>
			</el-header>
			<el-container class="main-aside">
				<el-aside id="aside-title" width="300px">
					<div>选择需要的组件</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
					<div id="checked-button">
						<el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
					</div>
				</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'CreateCompetition',
		data() {
			return {
				active: 1
			}
		},
		methods: {

		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	.create-header {
		border-bottom: 1px solid #919191;
	}

	#aside-title {
		text-align: center;
		border-right: 1px solid #919191;
	}

	.main-aside {
		padding-top: 35px;
	}
	
	#checked-button {
		padding-top: 25px;
	}
</style>
