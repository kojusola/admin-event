<template>
  <div>
    <Sidebar/>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Sidebar from './layouts/sidebar.vue'
export default {
    name: 'dashboard',
    components: {
        Sidebar
    },
    data(){
      return {
        
      }
    }
}
</script>

<style>
  .el-aside{
    width: 300px;
    height: 100vh;
    background-color: aliceblue;
  }
</style>