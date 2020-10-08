<template>
	<div>
		<div id="form-add">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="竞赛名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="竞赛类别">
					<el-select v-model="form.type" placeholder="请选择类别">
						<el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="竞赛级别">
					<el-select v-model="form.level" placeholder="请选择级别">
						<el-option v-for="level in levels" :key="level.id" :label="level.name" :value="level.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="竞赛详情">
					<el-button size="mini" type="primary" plain @click="handleEdit()">点击编辑详情</el-button>
				</el-form-item>
				<el-form-item label="报名时间">
					<el-col :span="9">
						<el-date-picker type="date" v-model="form.startTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="1">-</el-col>
					<el-col :span="9">
						<el-date-picker type="date" v-model="form.endTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="负责教师">
					<el-select v-model="form.teacherId" placeholder="请选择负责教师">
						<el-option v-for="teacher in teachers" :key="teacher.id" :label="teacher.realname" :value="teacher.teacherId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传图标">
					<el-upload class="avatar-uploader" :on-change="changeImage" :auto-upload="false" action="#" :show-file-list="false"
					 :on-success="handleAvatarSuccess">
						<img v-if="form.image" :src="form.image" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item style="margin-top: 25px;margin-left: 22.5%;">
					<el-button type="primary" @click="update()">提交修改</el-button>
				</el-form-item>
			</el-form>
			<el-dialog id="edit-dialog" :title="title" :visible.sync="show" :close-on-click-modal="false" width="950px">
				<DetailEdit v-if="show" :show.sync="show" :detail.sync="form.detail"></DetailEdit>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import DetailEdit from '@/views/competition/detail-edit'
	export default {
		name: 'AddCompetition',
		data() {
			return {
				step: 0,
				success: false,
				form: {
					id: '',
					name: '',
					type: '',
					level: '',
					detail: '',
					startTime: '',
					endTime: '',
					detail: '',
					image: '',
					teacherId: '',
					detail: ''
				},
				file: null,
				show: false,
				title: '编辑竞赛详情',
				teachers: [],
				types: [],
				levels: []
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			showParams() {
				console.log(this.form)
			},
			handleEdit() {
				this.show = true
			},
			update() {
				if(this.file != null) {
					this.axios.post("/competition/upload-image", res => {
						this.form.image = res.data.data
						this.file = null
						this.axios.post('/competition/update-competition', response => {
							if (response.code === 200) {
								this.$router.replace('/competition')
							}
						}, this.form)
					}, {
						'file': this.file.raw
					})
				} else {
					this.axios.post('/competition/update-competition', response => {
						if (response.code === 200) {
							this.$router.replace('/competition')
						}
					}, this.form)
				}
			},
			changeImage(file, fileList) {
				const isJPG = file.raw.type === 'image/jpeg'
				const isPNG = file.raw.type === 'image/png'
				const isBMP = file.raw.type === 'image/bmp'
				const isLt10M = file.raw.size / 1024 / 1024 < 10
				if (!isLt10M) {
					this.$message.error("图片不能大于10M")
					return
				}
				if (!isJPG && !isPNG && !isBMP) {
					this.$message.error("图片只能上传jpg/bmp/png格式")
					return
				}
				this.file = file
				this.form.image = URL.createObjectURL(file.raw)
			}
		},
		components: {
			DetailEdit
		},
		created() {
			this.axios.get('/teacher/list', response => {
				this.teachers = response.data
			})
			this.axios.get('/constant-item/get-items', response => {
				this.types = response.data
			}, {'typeName': '竞赛类别'})
			this.axios.get('/constant-item/get-items', response => {
				this.levels = response.data
			}, {'typeName': '竞赛级别'})
		},
		mounted() {
			this.axios.get('/competition/get-competition', response => {
				this.form = response.data
				this.form.type = this.form.type.toString()
				this.form.level = this.form.level.toString()
			},{
				'id': this.$route.params.id
			})
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	#form-add {
		width: 500px;
		margin-top: 40px;
		margin-left: 32%;
	}

	.line {
		text-align: center;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	#edit-dialog {
		color: #42B983;
		font-family: "微软雅黑";
	}
</style>
