<template>
  <div>
    <Navbar />
    <el-main>
      <el-card shadow="never">
        <div class="container-fluid">
          <img
            src="../assets/illustrations/lock-icon.svg"
            class="d-block mx-auto mb-3"
            alt="lock-icon"
          />
          <h5 class="text-center text-primary">Administrator Login</h5>
          <el-form
            status-icon
            :label-position="'top'"
            :rules="rules"
            ref="loginForm"
            :model="loginForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input
                type="password"
                auto-complete="off"
                :min="3"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-button
              class="w-100 my-3"
              type="primary"
              @click="login('loginForm')"
              >Login</el-button
            >
          </el-form>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import Navbar from "./layouts/navbar.vue";
export default {
  name: "login",
  components: {
    Navbar,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input your password"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
      },
      errorMessage: "error message",
      successMessage: "Success message",
      rules: {
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input a correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          const notification = this.$createElement;
          this.$notify.success({
            title: "Sucess",
            message: notification("span", this.successMessage),
          });
        } else {
          const notification = this.$createElement;
          this.$notify.error({
            title: "Error",
            message: notification("span", this.errorMessage),
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.el-main {
  width: 100%;
  height: calc(100vh - 56px);
  display: flex !important;
  justify-content: center;
  align-items: center;

  .el-card {
    width: 500px;
    height: min-content;
  }
}
label {
  margin: 0;
  padding: 0 !important;
}
</style>
