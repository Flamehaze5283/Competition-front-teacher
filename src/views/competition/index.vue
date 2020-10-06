<template>
	<div>
		<el-row :gutter="10">
      <el-col :span="2">
      	<el-tag>按名称查找</el-tag>
      </el-col>
      <el-col :span="5">
      	<el-input v-model="search.name" placeholder="请输入竞赛名称"></el-input>
      </el-col>
      <el-col :span="2">
      	<el-tag>按创建人查找</el-tag>
      </el-col>
			<el-col :span="5">
				<el-input v-model="search.teacherName" placeholder="请输入创建者姓名"></el-input>
			</el-col>
			<el-col :span="8">
				<el-button type="primary" icon="el-icon-search" plain @click="searchData()">搜索</el-button>
				<el-button type="warning" icon="el-icon-delete" plain @click="batchdel()">批量删除</el-button>
			</el-col>
		</el-row>
		<el-table :data="result.tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column label="序号" width="80" prop="id">
			</el-table-column>
			<el-table-column label="竞赛名称" prop="name">
			</el-table-column>
			<el-table-column label="开始时间" prop="startTime">
			</el-table-column>
      <el-table-column label="结束时间" prop="endTime">
      </el-table-column>
      <el-table-column label="创建者" prop="teacherName">
      </el-table-column>
      <!-- <el-table-column label="状态" prop="optionList">
      </el-table-column> -->

			<el-table-column label="是否有效" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="220px">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<el-button size="mini" @click="handleDetail(scope.row.id,scope.row.name)">查看详情</el-button>
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
	</div>
</template>

<script>
	import CompetitionDetail from '@/views/competition/detail'
	export default {
		name: 'Competition',
		data() {
			return {
				search: {
					name: '',
          teacherName: ''
				},
				query: {
					name: '',
          teacherName: '',
					pageNo: 1,
					pageSize: 8
				},
				result: {
					tableData: [],
					pages: 0
				},
				selectedrow: []
			}
		},
		components: {
			CompetitionDetail
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.axios.post('/competition/list', response => {
          //console.log(response)
					this.result.tableData = response.data.records
					this.result.pages = response.data.pages
				}, this.query)
			},
			searchData() {
				this.query.name = this.search.name
        this.query.teacherName = this.search.teacherName
				this.query.pageNo = 1
				this.getData()
			},
			handleDetail(id,name) {
        this.$router.push({
          path: '/competition-detail',
          query: {
            id: id,
            name: name
          }
        })
			},
			handleDelete(id) {
				this.axios.del('/competition/del', response => {
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
					this.axios.del('/competition/batchdel', response => {
						this.getData()
					}, {
						ids: ids
					})
				}
			},
			handleBack(id) {
				this.axios.del('/competition/back', response => {
					this.getData()
				}, {
					id: id
				}, 'back')
			}
		}
	}
</script>
<style scoped>
</style>
