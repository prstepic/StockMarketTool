<template>
  <div class="submissionPage">
    <form>
      <label for="usernameInput"> Please enter your username </label>
      <input type="text" v-model="username" id="usernameInput">
    </form>
    <button v-on:click="setUser(username)">
      Go
    </button>
    <button v-on:click="createNewUser(username)">
      Create User
    </button>
  </div>
</template>

<script>
  import axios from 'axios'
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
        this.userName = user
        this.$parent.currentUser = user
        this.$router.push(userPage)
      },
      createNewUser(user) {
        axios.post('/API/addUser', {requestingUser: user})
        .then( () => {
          alert('User created!')
        })
        .catch( (error) => {
          if(error.response.status == 409) {
            alert('User already exists!')
          }
          else {
            alert('Unable to create user')
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>