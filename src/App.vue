<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
:root {
  --primary: #30a2e2;
  --light-primary: #364d6e;
  --dark-primary: #222831;
  --gray: #afada7;
  --space: 15px;
}
body {
  font-family: "Inter", sans-serif !important;
  margin: 0;
  padding: 0;
}
.d-flex {
  display: flex;
}
.justify-content-center {
  justify-content: center;
}
.align-items-center {
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
  }
}
.text-primary {
  color: #30a2e2 !important;
}
.bg-light-primary {
  background-color: var(--light-primary);
}
ion-icon {
  width: 24px;
  stroke-width: 20px;
  text-align: center;
  font-size: 20px;
  vertical-align: middle;
}
button:focus {
  outline: 0 !important;
}
.row > div {
  margin-bottom: var(--space);
}
.text-gray {
  color: var(--gray);
}
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
}
</style>
