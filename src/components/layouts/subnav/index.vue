<template>
  <div>
    <nav class="w-100 navbar py-3">
      <div>
        <el-button type="text" class="toogleBtn" @click="toggleSidebar">
          <ion-icon ref="toggleBtn" name="menu-outline"></ion-icon>
        </el-button>
        <span class="ml-2 font-weight-bold text-capitalize">{{ getRoute() }}</span>
      </div>
      <div>
        <el-dropdown trigger="click">
          <el-button
            icon="el-icon-bell"
            class="el-dropdown-link mr-2"
            circle
          ></el-button>
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
  name: "subnav",
  methods: {
    getRoute() {
      const path = this.$route.path.split("/");
      if (path.length === 2) {
        return "Overview";
      } else {
        return path[2];
      }
    },
    toggleSidebar() {
      document.getElementById("sidebar").classList.toggle("active");
      document.getElementById("content").classList.toggle("active");
    },
  },
};
</script>

<style lang="scss">
nav.navbar {
  border-bottom: 1px solid #e0e0e0;
}
.el-dropdown-menu {
  width: 300px;
}
</style>