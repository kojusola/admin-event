<template>
  <div>
    <Navbar />
    <main>
      <el-card shadow="never">
        <div class="container-fluid">
          <div class="d-flex justify-content-center my-3">
            <ion-icon
              class="text-primary"
              name="lock-closed-outline"
              size="large"
            ></ion-icon>
          </div>
          <h5 class="text-center">Administrator Login</h5>
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
    </main>
  </div>
</template>

<script>
import Navbar from "../../components/layouts/navbar.vue";
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
          this.$message({
            message: "Login Successful",
            type: "success",
          });
          this.$router.push("/dashboard");
        } else {
          this.$message.error("Oops, Something is not right");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
main {
  width: 100%;
  height: calc(100vh - 57px);
  display: flex !important;
  justify-content: center;
  align-items: center;

  .el-card {
    width: 500px;
    height: min-content;
    border: 0;
  }
}
label {
  margin: 0;
  padding: 0 !important;
}
</style>
