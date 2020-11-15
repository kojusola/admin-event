<template>
  <div class="sidebar">
    <!-- <el-button circle @click="toggleSidebar" class="d-block mr-auto ml-1"><ion-icon name="menu-outline"></ion-icon></el-button> -->
    <el-menu
      background-color="#222831"
      text-color="#fff"
      active-text-color="#30A2E2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
    <div class="my-5 d-flex flex-column justify-center">
        <div class="avatar mx-auto">
        </div>
        <h6 class="text-center text-light mt-3">Amanam Israel</h6>
        <p class="badge bg-light-primary text-primary text-center m-0 mx-auto">Admin</p>
    </div>
      <div class="menu">
        <el-menu-item index="1">
          <ion-icon name="grid-outline"></ion-icon>
          <span slot="title">Overview</span>
        </el-menu-item>
        <el-menu-item index="2">
          <ion-icon name="book-outline"></ion-icon>
          <span slot="title">Blog</span>
        </el-menu-item>
        <el-menu-item index="3">
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
    },
  },
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
.avatar{
  width: 100px;
  height: 100px;
  background-color: aliceblue;
  border-radius: 50%;
}
.badge{
  padding: 1em;
  width: min-content;
}
</style>