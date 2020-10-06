<template>
	<div>
		<el-steps :active="step" finish-status="success" align-center>
			<el-step title="填写竞赛信息"></el-step>
			<el-step title="创建报名表"></el-step>
			<el-step title="预览报名表"></el-step>
			<el-step title="创建成功"></el-step>
		</el-steps>
		<img id="image" src="../../assets/timg.jpg" /><br />
		<span id="text">创建成功！！</span><br />
		<div id="button">
			<el-button type="primary" style="font-size: 20px;" plain @click="jump()">返回竞赛列表</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SuccessCompetition',
		data() {
			return {
				step: 3
			}
		},
		methods: {
			jump() {
				this.$router.replace('/competition')
			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	#image {
		height: 300px;
		width: 300px;
		padding-left: 43.7%;
		padding-top: 4%;
		padding-bottom: 2%;
	}
	
	#text {
		padding-left: 44.5%;
		font-size: 40px;
	}
	
	#button {
		padding-top: 3%;
		text-align: center;
	}
</style>
