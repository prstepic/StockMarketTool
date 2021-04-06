<template>
  <div class="submissionPage">
    <form>
      <label for="usernameInput"> Please enter your username </label>
      <input type="text" v-model="username" id="usernameInput">
    </form>
    <router-link :to="'/' + username + '/homepage'">
      Go
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "LandingPage",
    data() {
      return {
        username: ''
      }
    },
    methods: {
      setUser(user) {
        console.log(user)
      }
    }
  }
</script>

<style scoped>
</style>