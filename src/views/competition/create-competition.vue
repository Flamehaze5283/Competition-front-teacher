<template>
	<div>
		<el-container>
			<el-header class="create-header">
				<el-steps :active="step" finish-status="success" align-center>
					<el-step title="填写竞赛信息"></el-step>
					<el-step title="创建报名表"></el-step>
					<el-step title="预览报名表"></el-step>
					<el-step title="创建成功"></el-step>
				</el-steps>
			</el-header>
			<el-container class="main-aside">
				<el-aside id="aside-title" width="300px">
					<el-tag class="tag">选择组件</el-tag>
					<el-checkbox-group v-model="front_components" @change="updateParts()">
						<el-checkbox v-for="type in this.types" id="check_box" :label="type.name" :key="type.name"></el-checkbox>
					</el-checkbox-group>
				</el-aside>
				<el-main class="main">
					<el-tag class="tag">预览报名表</el-tag>
					<div id="form" class="form-title">{{this.name}}</div>
					<div v-for="part in this.parts" :key="part.name">
						<div v-if="JSON.parse(part.code).type == 'el-input'">
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
							<el-col :span="24" id="form" class="partner-detail">队员信息</el-col>
							<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;">
								<el-col :span="24" id="form">
									<div v-for="lab in label">
										<el-col :span="2" :offset="1">{{lab}}</el-col>
										<el-col :span="4"><el-input></el-input></el-col>
									</div>
								</el-col>
							</div>
						</div>
					</div>
					<el-button type="primary" plain @click="outputChecked()">预览</el-button>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'CreateCompetition',
		data() {
			return {
				step: 1,
				name: '测试比赛报名表',
				types: [],
				front_components: [],
				parts: {},
				studentName: '张三'
			}
		},
		methods: {
			outputChecked() {
				let labels = JSON.parse(this.parts[0].code).label
				for(let label in labels)
					console.log(labels[label])
			},
			updateParts() {
				const datas = []
				for (let i = 0; i < this.front_components.length; i++) {
					for (let j = 0; j < this.types.length; j++) {
						if (this.types[j].name === this.front_components[i]) {
							datas.push(this.types[j])
							break
						}
					}
				}
				this.parts = JSON.stringify(datas)
				this.parts = JSON.parse(this.parts)
			}
		},
		created() {
			// this.name = this.$route.params.name + "报名表"
			this.axios.get('/constant-item/get-items', response => {
				this.types = response.data
			}, {
				'typeName': '前端组件'
			})
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
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

	#checked-button {
		padding-top: 25px;
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
