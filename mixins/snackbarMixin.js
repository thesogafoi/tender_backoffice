export const snackbarMixin = {
  methods: {
    showSnackbar(snackbarMessage, snackbarColor) {
      this.$store.state.snackbarText = snackbarMessage
      this.$store.state.snackbarColor = snackbarColor
      this.$store.state.snackbar = true
    }
  }
}
