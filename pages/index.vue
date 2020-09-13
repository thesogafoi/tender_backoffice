<template>
  <div class="main-container">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <div class="c-loading-wrapper">
          <div class="left">
            <img src="/30462.jpg" alt="Arad Mobile Logo" />
          </div>
          <div class="right">
            <div class="right-logo mb-4">
              <img class="animatedLogo" src="/Asan-2.png" alt />
            </div>
            <v-form
              v-if="forgotPassword"
              class="form-style"
              ref="form"
              v-model="validLogin"
              @submit.prevent="login"
            >
              <h2 class="welcome mt-4 mb-4">Welcome Back</h2>
              <v-text-field v-model="loginData.mobile" label="Username" outlined :rules="required"></v-text-field>
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                :rules="required"
                :type="show3 ? 'text' : 'password'"
                v-model="loginData.password"
                label="Password"
                @click:append="show3 = !show3"
              ></v-text-field>
              <v-btn block color="primary" class="my-3" type="submit">LOGIN</v-btn>
              <div class="flex-end"></div>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "plain",
  middleware: ["isLoggedIn"],
  auth: false,
  data() {
    return {
      show3: false,
      validLogin: true,
      validForgotPassword: true,
      forgotPassword: true,
      loginData: {
        mobile: "",
        password: "",
      },
      required: [(v) => !!v || "This Field Is Required"],
      usernameRules: [(v) => !!v || "This Field Is Required"],
      passwordRules: [(v) => !!v || "This Field Is Required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "E-mail address is not valid",
      ],
    };
  },
  methods: {
    validateForgotPassword() {
      this.$refs.form.validate();
    },
    async login() {
      var validate = this.$refs.form.validate();

      if (!validate) return;

      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData,
        });
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: 100%;
  background: #e3e3e3 100% fixed;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-loading-wrapper {
  width: 59vw;
  min-height: 65vh;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(171, 171, 171, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(171, 171, 171, 1);
  box-shadow: 0px 0px 5px 1px rgba(171, 171, 171, 1);
}
.c-loading-wrapper .left {
  width: 60%;
  height: 100%;
  background-size: cover;
  background-position: bottom;
  position: relative;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.c-loading-wrapper .left img {
  position: absolute;
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 33;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  object-fit: cover;
  object-position: left center;
}
.c-loading-wrapper .left:after {
  background-color: rgba(17, 98, 153, 0.5);
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 999;
}
.c-loading-wrapper .right {
  width: 40%;
  padding: 40px 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.c-loading-wrapper .right .welcome {
  font-size: 20px;
  color: #696969;
}
.c-loading-wrapper .right .right-logo img {
  max-width: 200px;
  width: 100%;
  height: auto;
}
@media (max-width: 1444px) {
  .c-loading-wrapper {
    width: 80vw;
  }
  .c-loading-wrapper .right {
    width: 50%;
    padding: 40px 50px;
  }
  .c-loading-wrapper .left {
    width: 50%;
  }
}
@media (max-width: 991px) {
  .c-loading-wrapper {
    width: 80vw;
  }
  .c-loading-wrapper .right {
    width: 50%;
  }
  .c-loading-wrapper .left {
    width: 50%;
  }
}
@media (max-width: 767px) {
  .c-loading-wrapper {
    width: 80vw;
  }
  .c-loading-wrapper .right {
    width: 50%;
    padding: 40px 20px;
  }
  .c-loading-wrapper .left {
    width: 50%;
  }
}
@media (max-width: 575px) {
  .c-loading-wrapper {
    width: 80vw;
  }
  .c-loading-wrapper .right {
    width: 100%;
    padding: 40px 15px;
  }
  .c-loading-wrapper .left {
    display: none;
  }
}
</style>
