<template>
  <div>
      <nav class="navbar py-3">
          <span class="font-weight-bold text-capitalize">{{getRoute()}}</span>
          <div>
            <el-dropdown trigger="click">
            <el-button icon="el-icon-bell" class="el-dropdown-link mr-2" circle></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>No notifications yet</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <el-button icon="el-icon-chat-line-square" circle></el-button>
          </div>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'subnav',
    methods: {
      getRoute(){
        const path =  this.$route.path.split('/');
        if(path.length === 2){
          return 'Overview'
        }else{
          return path[2]
        }
      }
    }
}
</script>

<style lang="scss">
  nav.navbar{
    border-bottom: 1px solid #E0E0E0 ;
  }
  .el-dropdown-menu{
    width: 350px;
  }
</style>