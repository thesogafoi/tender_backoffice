export const flexContentMixin = {
  methods: {
    resetDialogAddCols() {
      this.$store.state.dialog = false
      this.$store.state.flexContent.isEdit = false
      this.$store.commit('dialogForCols', false)
      this.$store.commit('flexContent/changeDialogContent', 'content-list')
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    showSnackbar(snackbarMessage) {
      this.$store.state.snackbarText = snackbarMessage
      this.$store.state.snackbarColor = 'error'
      this.$store.state.snackbar = true
    }
  }
}
