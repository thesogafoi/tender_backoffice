<template>
  <div class="parent-loader" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.parent-loader {
  width: 100%;
  position: fixed;
  height: 100vh;
  background: #fff;
  display: flex;
  z-index: 14;
  align-items: center;
  justify-content: center;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin-data-v-3f9bef8e 2s linear infinite;
  animation: spin-data-v-3f9bef8e 2s linear infinite;
  z-index: 99999;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>