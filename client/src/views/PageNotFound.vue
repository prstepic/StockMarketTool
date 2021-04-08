<template>
  <div class="pageView">
    <h1> 404: Not Found </h1>
    <button v-on:click="backHome">
      Back Home
    </button>
  </div>
</template>

<script>
  export default {
    name: 'PageNotFound',
    methods: {
      backHome() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>