<template>
  <div class="pageView">
    <h1> 404: Not Found </h1>
    <b-button pill variant="outline-primary" v-on:click="backHome">
      Back Home
    </b-button>
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

<style scoped lang="scss">
  h1 {
    margin-top: 100px;
    color: #ab8bc9;
  }
</style>