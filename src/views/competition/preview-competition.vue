<template>
	<div>
		<el-steps :active="active" finish-status="success" align-center>
			<el-step title="填写竞赛信息"></el-step>
			<el-step title="创建报名表"></el-step>
			<el-step title="预览报名表"></el-step>
			<el-step title="创建成功"></el-step>
		</el-steps>
		<div class="main">
			<div id="form" class="form-title">{{this.name}}</div>
			<div v-for="part in this.parts" :key="part.name">
				<div v-if="JSON.parse(part.code).type == 'el-input'">
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<el-col :span="24" id="form">
						<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;">
							<el-col :span="2" :offset="1">{{label}}</el-col>
							<el-col :span="4">
								<el-input></el-input>
							</el-col>
						</div>
					</el-col>
				</div>
				<div v-else>
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;">
						<el-col :span="24" id="form">
							<div v-for="lab in label">
								<el-col :span="2" :offset="1">{{lab}}</el-col>
								<el-col :span="4">
									<el-input></el-input>
								</el-col>
							</div>
						</el-col>
					</div>
				</div>
			</div>
			<div id="button">
				<el-button type="danger" plain @click="">重新编辑</el-button>
				<el-button type="primary" plain @click="outputView()">确认发布</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PreviewCompetition',
		data() {
			return {

			}
		},
		data() {
			return {
				step: 1,
				name: '测试比赛报名表',
				front_components: [],
				parts: {},
				competition_name: '',
				active: 2
			}
		},
		methods: {
			outputView() {
				console.log("preview_parts: " + this.parts)
			}
		},
		created() {
			console.log(this.$route.params.parts)
			this.competition_name = this.$route.params.name
			this.name = this.competition_name + "报名表"
			this.parts = this.$route.params.parts
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	#button {
		padding-top: 10%;
	}

	.create-header {
		/* border-bottom: 1px solid #919191; */
	}

	#aside-title {
		text-align: center;
		border-right: 1px solid #919191;
		height: 79vh;
	}

	.main-aside {
		padding-top: 35px;
	}

	.main {
		padding: 0;
		text-align: center;
	}

	::-webkit-scrollbar {
		display: none;
	}

	#check_box {
		width: 100%;
		padding-top: 20px;
	}

	#form {
		padding-bottom: 20px;
	}

	.form-title {
		padding-top: 20px;
		font-size: 25px;

	}

	.partner-detail {
		text-align: left;
		padding-left: 25%;
		font-size: 20px;
		font-family: "微软雅黑";
		font-weight: 700;
	}
</style>
