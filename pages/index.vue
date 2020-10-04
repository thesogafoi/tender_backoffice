<template>
  <div class="main-container c-relative-row">
    <div class="c-loading-wrapper">
      <div class="right">
        <div class="right-logo mb-4">
          <img class="animatedLogo c-mb-20" src="/Asan-2.png" alt />
          <h2 class="welcome mt-4 mb-4">به پنل کاربری آسان‌تندر خوش‌آمدید .</h2>
        </div>
        <v-form
          v-if="forgotPassword"
          class="form-style"
          ref="form"
          v-model="validLogin"
          @submit.prevent="login"
        >
          <div
            class="input-panel"
            :class="{
              'c-mb-0': formValidate == false,
              'c-mb-40': formValidate == true,
            }"
          >
            <v-text-field
              v-model="loginData.mobile"
              label="شماره موبایل خود را وارد کنید"
              solo
              :rules="required"
            ></v-text-field>
            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              solo
              :rules="required"
              :type="show3 ? 'text' : 'password'"
              v-model="loginData.password"
              label="رمز عبور"
              @click:append="show3 = !show3"
            ></v-text-field>
          </div>
          <p class="validation-alert text-center" v-if="formValidate == false">
            {{ errorMessage }}
          </p>
          <v-btn block color="primary" class="my-3" type="submit"
            >ورود به پنل کاربری</v-btn
          >
          <div class="flex-end"></div>
        </v-form>
      </div>
    </div>
    <div class="version-line">Version 1.0068</div>
  </div>
</template>
<script>
export default {
  layout: "plain",
  middleware: ["isLoggedIn"],
  auth: false,
  data() {
    return {
      errorMessage: "رمز عبور یا تلفن اشتباه است",
      show3: false,
      formValidate: true,
      validLogin: true,
      validForgotPassword: true,
      forgotPassword: true,
      loginData: {
        mobile: "",
        password: "",
      },
      required: [(v) => !!v],
      usernameRules: [(v) => !!v || "شماره موبایل را وارد کنید"],
      passwordRules: [(v) => !!v || "رمز عبور را وارد کنید"],
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
    checkValidation() {

    },
    async login() {
      var validate = this.$refs.form.validate();
      if (!this.$refs.form.validate()) {
        this.formValidate = false
      } else {
        this.formValidate = true
      }
      if (!validate) return;

      try {
        let response = await this.$auth
          .loginWith("local", {
            data: this.loginData,
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.errorMessage = "شماره موبایل یا رمز عبور نادرست است";
            }
          });
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.version-line {
  &:before {
    width: 120px;
    position: absolute;
    height: 2px;
    content: "";
    left: -150px;
    bottom: 12px;
    background-color: #fff;
  }
  position: absolute;
  color: #fff;
  bottom: 40px;
  left: 130px;
  &:after {
    width: 100vw;
    height: 2px;
    content: "";
    background-color: #fff;
    position: absolute;
    left: 148px;
    bottom: 12px;
  }
}
.validation-alert {
  margin-top: 10px;
  color: #c62828;
  font-weight: 600;
  font-size: 13px;
}
.c-relative-row {
  .c-loading-wrapper {
    position: absolute;
    top: 10%;
    right: 200px;
    display: flex;
    flex-flow: column;
    .right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .v-text-field.v-text-field--solo .v-label {
        right: 50% !important;
        transform: translateX(50%) !important;
      }
      input {
        text-align: center !important;
      }
      .v-icon.v-icon {
        font-size: 18px !important;
      }
      .v-text-field.v-text-field--solo .v-input__control {
        min-height: 40px !important;
      }
      .v-text-field.v-text-field--solo .v-input__append-inner,
      .v-text-field.v-text-field--solo .v-input__prepend-inner {
        position: absolute !important;
        left: 15px;
      }
      .v-form {
        width: 100%;
        .v-text-field.v-text-field--enclosed .v-text-field__details {
          display: none;
        }
      }
    }
    .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: #ff9600 !important;
      min-width: 50% !important;
      margin: auto;
      .v-btn__content {
        color: #333 !important;
        font-weight: 700 !important;
      }
    }
  }
}
.main-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  backdrop-filter: grayscale(100%);
  position: relative;
  &:before {
    background: #e3e3e3 100% fixed;
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(/کاربرد-گاز-نیتروژن-در-پالایشگاه-ها.jpg);
    content: "";
  }
}
.c-loading-wrapper {
  width: 23vw;
  max-width: 90%;
  min-height: 66vh;
  max-height: 90vh;
  background-color: rgba($color: #fff, $alpha: 0.75);
  border-radius: 5px;
}
.c-loading-wrapper .left {
  width: 100%;
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
  width: 100%;
  padding: 40px 30px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.welcome {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.c-loading-wrapper .right .right-logo img {
  max-width: 200px;
  width: 100%;
  height: auto;
}

@media (max-width: 991px) {
  .c-loading-wrapper {
    width: 80vw;
    right: 50% !important;
    transform: translateX(50%);
  }
}
</style>
