<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
			<el-form-item label="检查项目名称" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="费用单价" prop="fee">
				<el-input v-model="form.fee"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'CheckItemEdit',
		props: ['editid'],
		data() {
			return {
				form: {
					name: '',
					fee: 0
				},
				rules: {
					fee: [{
							required: true,
							message: '费用不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字符',
							trigger: 'blur'
						}
					],
					name: [{
							required: true,
							message: '检查项目名称不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字符',
							trigger: 'blur'
						}
					]
				},
				url: '/check-item/add'
			}
		},
		created() {
			if (this.editid) {
				// 如果是修改 提交地址变成修改的提交地址
				this.url = '/check-item/update'
				// 通过id 读原始数据
				this.axios.get('/check-item/getById', response => {
					this.form.id = response.obj.id
					this.form.fee = response.obj.fee
					this.form.name = response.obj.name
				}, {
					id: this.editid
				})
			}
		},
		methods: {
			save() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						this.axios.post(this.url, response => {
							// 子组件要改变父组件的值
							this.$emit('update:show', false)
							this.$emit('getData')
						}, this.form)
					}
				})
			}
		}
	}
</script>

<style>
</style>
