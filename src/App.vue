<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
   /* @import url('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'); */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  body{
    font-family: 'Inter', sans-serif !important;
    margin: 0;
    padding: 0;
  }
  .d-flex{
    display: flex;
  }
  .justify-content-center{
    justify-content: center;
  }
  .align-items-center{
    align-items: center;
  }
</style>
