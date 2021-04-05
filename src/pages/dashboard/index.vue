<template>
  <div class="wrapper">
    <Sidebar />
    <div id="content">
      <Subnav />
      <div class="container-fluid h-auto my-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/layouts/sidebar/index.vue";
import Subnav from "../../components/layouts/subnav/index.vue";
export default {
  name: "dashboard",
  components: {
    Sidebar,
    Subnav,
  },
  data() {
    return {};
  },
};
</script>

<style>
* {
  transition: all 0.3s;
}
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}
#content {
  width: calc(100% - 300px);
  min-height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
}
#content.active {
  width: 100%;
}
@media screen and (max-width: 576px) {
  #content {
    width: 100%;
  }
  #content.active {
    width: 100%;
  }
}
</style>