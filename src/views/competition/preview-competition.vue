<template>
	<div>
		<el-steps :active="step" finish-status="success" align-center>
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
							<el-select v-model="form.optionValue" placeholder="请选择">
								<el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</div>
			</div>
		</div>
		<div id="button">
			<el-button type="danger" plain @click="reEdit()">重新编辑</el-button>
			<el-button type="primary" plain @click="saveCompetition()">确认发布</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PreviewCompetition',
		data() {
			return {
				form: {
					id: '',
					studentId: [],
					captainId: '',
					teamName: '',
					optionItem: '',
					optionValue: ''
				},
				step: 2,
				name: '测试比赛报名表',
				types: [],
				front_components: [],
				parts: {},
				competition_name: '',
				options: []
			}
		},
		methods: {
			outputView() {
				console.log("preview_parts: " + this.parts)
			},
			reEdit() {
				this.$router.push({
					path: '/create-competition',
					name: 'CreateCompetition',
					params: {
						'name': this.$route.params.name,
						'parts': this.parts,
						'type': this.$route.params.type,
						'front_components': this.front_components
					}
				})
			},
			saveCompetition() {
				const activeParams = []
				for(let part in this.parts) {
					let code = JSON.parse(this.parts[part].code)
					if(code['value'] === '通用') {
						let labels = code['label']
						for(let label in labels) {
							activeParams.push(labels[label]['model'])
						}
					}
				}
				console.log(activeParams)
				this.axios.post('/competition/save-sign', response => {
					if(response.code === 200) {
						this.$router.replace('/success-competition')
					}
				},{
					'id': this.form.id,
					'parts': JSON.stringify(this.parts),
					'activeParams': activeParams
				})
			}
		},
		created() {
			this.axios.get('/competition/getByName', response => {
				this.form.id = response.data.id
			}, {
				'name': this.$route.params.name
			})
			this.name = this.$route.params.name + "报名表"
			this.parts = this.$route.params.parts
			this.front_components = this.$route.params.front_components
			this.axios.get('/constant-item/get-items', response => {
				this.options = response.data
			}, {
				'typeName': '获取信息渠道',
			})
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	#button {
		padding-top: 35%;
		text-align: center;
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
