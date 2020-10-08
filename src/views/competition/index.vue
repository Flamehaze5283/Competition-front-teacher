<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人赛" name="first">
        <PersonIndex :key="keynum"></PersonIndex>
      </el-tab-pane>
      <el-tab-pane label="团队赛" name="second" >
        <teamIndex  :key="keynum2"></teamIndex>
      </el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
	import PersonIndex from '@/views/competition/personIndex'
  import teamIndex from '@/views/competition/teamIndex'
	export default {
		name: 'Competition',
		data() {
			return {
        keynum: 0,
        keynum2: 1,
        activeName: 'first'
			}
		},
		components: {
			PersonIndex,
      teamIndex
		},
		created() {

		},
		methods: {
      handleClick(tab, event) {

      }
		},
    update() {
      ++this.keynum
      ++this.keynum2
    }
	}
</script>
<style scoped>
</style>
