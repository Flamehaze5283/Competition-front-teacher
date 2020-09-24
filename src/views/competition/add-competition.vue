<template>
	<div>
		<el-steps :active="active" finish-status="success" align-center>
			<el-step title="填写竞赛信息"></el-step>
			<el-step title="创建报名表"></el-step>
			<el-step title="预览报名表"></el-step>
			<el-step title="创建成功"></el-step>
		</el-steps>

		<div id="form-add">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="竞赛名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="竞赛类别">
					<el-select v-model="form.type" placeholder="请选择类别">
						<el-option label="个人赛" value="1"></el-option>
						<el-option label="团队赛" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="竞赛级别">
					<el-select v-model="form.level" placeholder="请选择级别">
						<el-option label="国家级" value="1"></el-option>
						<el-option label="省级" value="2"></el-option>
						<el-option label="校级" value="3"></el-option>
						<el-option label="院级" value="4"></el-option>
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
						<el-option label="张炳" value="1"></el-option>
						<el-option label="穆运峰" value="2"></el-option>
						<el-option label="窦燕" value="3"></el-option>
						<el-option label="景荣" value="4"></el-option>
						<el-option label="冯建周" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传图标">
					<el-upload action="http://localhost:8080/img/upload" :auto-upload="false" :limit="1" list-type="picture-card" :on-preview="handlePictureCardPreview"
					 :on-remove="handleRemove" :on-change="changefile">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item style="margin-top: 25px;margin-left: 22.5%;">
					<el-button type="primary" @click="nextAndSave()">下一步</el-button>
					<!-- <el-button @click="">取消</el-button> -->
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
				active: 0,
				success: false,
				form: {
					name: '',
					type: '',
					level: '',
					detail: '',
					startTime: '',
					endTime: '',
					detail: '',
					teacherId: '',
					fileImage: '',
					detail: ''
				},
				dialogImageUrl: '',
				dialogVisible: false,
				show: false,
				title: '编辑竞赛详情'
			}
		},
		methods: {
			next() {
				if (this.active++ > 3) this.active = 0;
			},
			handleRemove(file, fileList) {
				console.log("删除文件")
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleEdit() {
				this.show = true
			},
			nextAndSave() {
				this.axios.post('/competition/save-competition', response => {
					if(response.code === 200) {
						this.$router.replace('/')
					} 
				}, this.form)
			},
			changefile(file, fileList) {
				console.log(file)
				this.form.fileImage = file.raw
			}
		},
		components: {
			DetailEdit
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
