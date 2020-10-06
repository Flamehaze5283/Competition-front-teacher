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
							<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
							<el-col :span="24" id="form">
								<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;">
									<el-col :span="2" :offset="1">{{label.name}}</el-col>
									<el-col :span="4">
										<el-input></el-input>
									</el-col>
								</div>
							</el-col>
						</div>
						<div v-if="JSON.parse(part.code).type == 'el-input-multi'">
							<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
							<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;">
								<el-col :span="24" id="form">
									<div v-for="lab in label">
										<el-col :span="2" :offset="1">{{lab.name}}</el-col>
										<el-col :span="4">
											<el-input></el-input>
										</el-col>	
									</div>
								</el-col>
							</div>
						</div>
						<div v-if="JSON.parse(part.code).type == 'el-select'">
							<el-col :span="24" id="form" class="partner-detail">{{JSON.parse(part.code).label[0]['name']}}</el-col>
							<el-col :span="24" id="form" style="padding-left: 27.8%;">
								<el-col :span="3">{{JSON.parse(part.code).label[0]['name']}}</el-col>
								<el-col :span="4">
									<el-select v-model="form.optionValue"  placeholder="请选择">
										<el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.code"></el-option>
									</el-select>
								</el-col>
							</el-col>
						</div>
					</div>
					<el-button type="primary" plain @click="preview()">预览</el-button>
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
				form: {
					competitionId: '',
					studentId: [],
					captainId: '',
					teamName: '',
				},
				step: 1,
				name: '测试比赛报名表',
				types: [],
				front_components: [],
				parts: {},
				competition_name: '',
				options: []
			}
		},
		methods: {
			updateParts() {
				const datas = []
				for (let component in this.front_components) {
					for (let type in this.types) {
						if (this.types[type].name === this.front_components[component]) {
							datas.push(this.types[type])
							break
						}
					}
				}
				this.parts = JSON.stringify(datas)
				this.parts = JSON.parse(this.parts)
			},
			preview() {
				this.$router.push({
					path: '/preview-competition',
					name: 'PreviewCompetition',
					params: {
						'name': this.competition_name,
						'parts': this.parts,
						'type': this.$route.params.type,
						'front_components': this.front_components
					}
				})
			}
		},
		created() {
			this.competition_name = this.$route.params.name
			this.name = this.competition_name + "报名表"
			this.axios.get('/constant-item/get-parts', response => {
				this.types = response.data
			}, {
				'typeName': '前端组件',
				'type': this.$route.params.type
			})
			this.axios.get('/constant-item/get-items', response => {
				this.options = response.data
			}, {
				'typeName': '获取信息渠道',
			})
			if(this.$route.params.front_components != undefined) {
				this.front_components = this.$route.params.front_components
			}
			if(this.$route.params.parts != undefined) {
				this.parts = this.$route.params.parts
			}
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
