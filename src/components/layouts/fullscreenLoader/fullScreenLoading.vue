<template>
  <div
    id="wrapper"
    class="w-100 d-flex justify-content-center align-items-center"
  >
    hello
  </div>
</template>
<script>
import { Loading } from "element-ui";
Loading.service(options);
export default {
  name: "fullScreenLoading",
  methods: {
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
  },
};
</script>

<style scoped>
#wrapper {
  height: calc(100vh - 79px);
}
</style>