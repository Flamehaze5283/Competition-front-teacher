<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
			<el-form-item label="常数类别" prop="typeId">
				<el-select v-model="form.typeId" placeholder="请选择">
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="常数项代码" prop="code">
				<el-input v-model="form.code"></el-input>
			</el-form-item>
			<el-form-item label="常数项名称" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="序号" prop="sort">
				<el-input v-model="form.sort"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'ConstantItemEdit',
		props: ['editid'],
		data() {
			return {
				form: {
					typeId: '',
					name: '',
					code: '',
					sort: ''
				},
				rules: {
					code: [{
							required: true,
							message: '编码不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 1000,
							message: '长度在 1 到 1000 个字符',
							trigger: 'blur'
						}
					],
					name: [{
							required: true,
							message: '类别名不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字符',
							trigger: 'blur'
						}
					],
				},
				url: '/constant-item/add',
				options: []
			}
		},
		created() {
			this.getConstantTypes()
			if (this.editid) {
				// 如果是修改 提交地址变成修改的提交地址
				this.url = '/constant-item/update'
				// 通过id 读原始数据
				this.axios.get('/constant-item/getById', response => {
					this.form.id = response.data.id
					this.form.typeId = response.data.typeId
					this.form.code = response.data.code
					this.form.name = response.data.name
					this.form.sort = response.data.sort
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
			},
			getConstantTypes() {
				this.axios.get('/constant-type/list', response => {
					this.options = response.data
				}, {
					withPage: 0
				})
			}
		}
	}
</script>

<style>
</style>
