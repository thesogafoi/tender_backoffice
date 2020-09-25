export default function ({
  $axios,
  store
}) {
  $axios.onError(error => {
    if (error.response.status == 422) {
      store.dispatch("errorHandling/setErrors", error.response.data.errors);
      // return Promise.reject(error);
    }
  });
  $axios.onError(error => {
    if (error.response.status == 500) {
      this.$store.state.snackbarText = "برقراری با سرور امکان پذیر نیست";
      this.$store.state.snackbarColor = "red";
      this.$store.state.snackbar = true;
    }
  });
  $axios.onRequest(() => {
    store.dispatch("errorHandling/clearErrors");
  });
}
