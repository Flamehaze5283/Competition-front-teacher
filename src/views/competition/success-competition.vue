<template>
	<div>
		<el-steps :active="step" finish-status="success" align-center>
			<el-step title="填写竞赛信息"></el-step>
			<el-step title="创建报名表"></el-step>
			<el-step title="预览报名表"></el-step>
			<el-step title="创建成功"></el-step>
		</el-steps>
		<span>操作成功</span>
	</div>
</template>

<script>
  export default {
    name: 'SuccessCompetition',
    data() {
      return {
		step: 3
      }
    },
    methods: {

    }
  }
</script>

<style>
</style>
