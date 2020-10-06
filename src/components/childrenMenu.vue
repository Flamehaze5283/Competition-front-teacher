<template>
  <el-menu-item :index="menu.url">
     <i :class="iocnhh"></i>
     {{menu.name}}
  </el-menu-item>
</template>

<script>
  export default {
    name: 'ChilrenMenu',
    props: [
        'menu',
        'iocnhh'
    ],
    components: {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    created() { }
  }
</script>

<style>
</style>
