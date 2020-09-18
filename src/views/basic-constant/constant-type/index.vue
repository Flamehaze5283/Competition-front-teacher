<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="5">
				<el-input v-model="search.name" placeholder="请输入要查询的常数类别名"></el-input>
			</el-col>
			<el-col :span="19">
				<el-button type="primary" icon="el-icon-search" plain @click="searchData()">搜索</el-button>
				<el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="add()">添加常数类别</el-button>
				<el-button type="warning" icon="el-icon-delete" plain @click="batchdel()">批量删除</el-button>
			</el-col>
		</el-row>
		<el-table :data="result.tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column label="ID" width="80" prop="id">
			</el-table-column>
			<el-table-column label="编码" prop="code">
			</el-table-column>
			<el-table-column label="常数类别名" prop="name">
			</el-table-column>

			<el-table-column label="是否有效" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="220px">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
					</template>
					<template v-else>
						<el-button size="mini" type="info" @click="handleBack(scope.row.id)">恢复</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="margin-top:20px;" background layout="prev, pager, next" :page-count="result.pages"
		 :current-page.sync="query.pageNo" :page-size="query.pageSize" @current-change="getData()">
		</el-pagination>
		<el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" width="500px">
			<ConstantTypeEdit v-if="show" :show.sync="show" @getData="getData()" :editid="editid"></ConstantTypeEdit>
		</el-dialog>
	</div>
</template>

<script>
	import ConstantTypeEdit from '@/views/basic-constant/constant-type/edit'
	export default {
		name: 'ConstantType',
		data() {
			return {
				search: {
					name: ''
				},
				query: {
					name: '',
					pageNo: 1,
					pageSize: 8
				},
				result: {
					tableData: [],
					pages: 0
				},
				show: false,
				editid: null,
				selectedrow: [],
				title: ''
			}
		},
		components: {
			ConstantTypeEdit
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.axios.get('/constant-type/list', response => {
					this.result.tableData = response.obj.records
					this.result.pages = response.obj.pages
				}, this.query)
			},
			searchData() {
				this.query.name = this.search.name
				this.query.pageNo = 1
				this.getData()
			},
			handleEdit(id) {
				this.title = '修改常数类别'
				this.editid = id
				this.show = true
			},
			add() {
				this.title = '添加常数类别'
				this.editid = null
				this.show = true
			},
			handleDelete(id) {
				this.axios.del('/constant-type/del', response => {
					this.getData()
				}, {
					id: id
				})
			},
			handleSelectionChange(val) {
				// val参数为所有选中行的数据
				this.selectedrow = val
			},
			batchdel() {
				if (this.selectedrow.length === 0) {
					this.$message('没有任何被选中的数据');
				} else {
					const ids = []
					for (let i = 0; i < this.selectedrow.length; i++) {
						ids.push(this.selectedrow[i].id)
					}
					this.axios.del('/constant-type/batchdel', response => {
						this.getData()
					}, {
						ids: ids
					})
				}
			},
			handleBack(id) {
				this.axios.del('/constant-type/back', response => {
					this.getData()
				}, {
					id: id
				}, 'back')
			},
			gopermission(id) {
				this.$router.push({
					path: '/role-permiss',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>
<style scoped>
</style>
