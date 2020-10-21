export const snackbarMixin = {

  methods: {
    showSnackbar(snackbarMessage, snackbarColor) {
      this.$store.state.snackbarText = snackbarMessage
      this.$store.state.snackbarColor = snackbarColor
      this.$store.state.snackbar = true
    },

    afterAdmin() {
      return (this.$store.state.auth.user.type == 'ADMIN' || this.$store.state.auth.user.type == 'STAFF') ? false : true;
    },

    afterStaff() {
      return (this.$store.state.auth.user.type == 'STAFF') ? false : true;
    },

  }
}
