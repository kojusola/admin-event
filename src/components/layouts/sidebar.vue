<template>
  <div class="sidebar">
    <el-menu
      background-color="#222831"
      text-color="#fff"
      active-text-color="#30A2E2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      default-active="1"
    >
    <!-- <el-button type="text" class="toogleBtn" @click="toggleSidebar"><ion-icon ref="toggleBtn" name="menu-outline"></ion-icon></el-button> -->
          <div v-if="isCollapse">
            <div class="bg-light my-5 avatar-small mx-auto">
            </div>
          </div>
          <div v-else class="my-5 d-flex flex-column justify-center">
              <div class="avatar bg-light mx-auto">
              </div>
              <h6 class="text-center text-light mt-3">Amanam Israel</h6>
              <p class="badge bg-light-primary text-primary text-center m-0 mx-auto">Admin</p>
          </div>
          <div class="menu">
            <el-menu-item class="is-active"  index="1" @click="toOverview">
              <ion-icon name="grid-outline"></ion-icon>
              <span tag="span" slot="title">Overview</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toBlog">
              <ion-icon name="book-outline"></ion-icon>
              <span slot="title">Blog</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toRentals">
            <ion-icon name="key-outline"></ion-icon>
              <span slot="title">Rentals</span>
            </el-menu-item>
          </div>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
      return {
      isCollapse: false,
    };

  },
  methods: {
    toggleSidebar() {
      this.isCollapse === false
        ? (this.isCollapse = true)
        : (this.isCollapse = false);
        document.querySelector('.sidebar').classList.toggle('sidebar-active');
        document.getElementById('content').classList.toggle('content-active');
    },
    toRentals(){
      this.$router.push('/dashboard/rentals').catch(()=>{});
    },
    toBlog(){
      this.$router.push('/dashboard/blog').catch(()=>{});
    },
    toOverview(){
      this.$router.push('/dashboard').catch(()=>{});
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  width: 300px;
  height: 100vh;
  position: fixed;

  .el-menu {
    height: 100%;
  }
}
.avatar,.avatar-small {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.avatar-small{
  width: 50px;
  height: 50px;
}
.badge{
  padding: 1em;
  width: min-content;
}
.sidebar-active{
  width: min-content;
}
.content-active{
  width: calc(100% - 64px) !important;
}
// @media (max-width: 576px) {
//     .sidebar{
//       width: 90%;
//     }
    
// }
.toogleBtn{
  position: absolute;
    z-index: 99;
    right: 10px;
    top: 10px;
}
</style>