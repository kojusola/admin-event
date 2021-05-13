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
            :rules="loginFormRules"
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
              @click="validateForm('loginForm')"
              >Login <Loader v-if="loading"
            /></el-button>
          </el-form>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/layouts/navbar/index";
import Loader from "@/components/loader/index";
import auth from "@/helpers/auth/auth";
export default {
  name: "login",
  components: {
    Navbar,
    Loader,
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
      loading: false,
      loginForm: {
        email: "",
        password: "",
      },
      errorMessage: "error message",
      successMessage: "Success message",
      loginFormRules: {
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
    validateForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          const formData = { ...this.loginForm };
          Object.keys(formData).map((item) => {
            if (typeof formData[item] == "string") {
              formData[item] = formData[item].trim();
            }
          });
          this.login(formData);
        } else {
          return false;
        }
      });
    },
    async login(formData) {
      this.loading = true;
      try {
        const response = await auth.login(this.$axios, formData);
        const token = response.data.data.accessJWT;
        response ? localStorage.setItem("auth-token", token) : false;
        this.loading = false;
        this.$router.push({ path: "dashboard" });
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
