<template>
  <div class="submissionPage">
    <form>
      <label for="usernameInput"> Please enter your username </label>
      <input type="text" v-model="username" id="usernameInput">
    </form>
    <button v-on:click="setUser(username)">
      Go
    </button>
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
        localStorage.setItem('username', user)
        const userPage = '/' + user + '/homepage'
        this.$router.push(userPage)
      }
    }
  }
</script>

<style scoped>
</style>