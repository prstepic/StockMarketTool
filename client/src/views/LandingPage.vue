<template>
  <div class="submissionPage">
    <div id="userSubmission">
      <form>
        <label for="usernameInput"> Please enter your username </label>
        <div>
          <input type="text" v-model="username" id="usernameInput">
        </div>
      </form>
    </div>
    <b-button pill variant="outline-primary" v-on:click="setUser(username)">
      Go
    </b-button>
    <b-button pill variant="outline-primary" v-on:click="createNewUser(username)">
      Create User
    </b-button>
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

<style scoped lang="scss">
#userSubmission {
  margin-top: 100px;
  margin-bottom: 20px;
}
label {
  font-size: 200%;
}

</style>