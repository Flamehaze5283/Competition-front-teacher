<template>
 <el-menu-item  :index="menu.url">{{menu.name}}
   <!-- <el-submenu v-for="menu in menus"  :index="menu.id">
      <template slot="title">
        <span>{{menu.name}}</span>
      </template>
    </el-submenu> -->
    
     <!-- <ChilrenMenu v-for="item in menu.children" :menu="item"></ChilrenMenu> -->
    
 </el-menu-item>
</template>

<script>
  export default {
    name: 'ChilrenMenu',
    props: [
        'menu'
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
