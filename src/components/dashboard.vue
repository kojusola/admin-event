<template>
  <div class="wrapper">
    <Sidebar/>
    <div id="content">
      <Subnav/>
      <div class="container-fluid h-auto my-3">
         <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './layouts/sidebar.vue'
import Subnav from './layouts/subnav.vue'
export default {
    name: 'dashboard',
    components: {
        Sidebar,
        Subnav
    },
    data(){
      return {
        
      }
    }
}
</script>

<style>
.wrapper{
    display: flex;
    width: 100%;
    align-items: stretch;
}
  #content {
    width: calc(100% - 300px);
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    right: 0;
}
</style>