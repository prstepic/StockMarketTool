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
    <b-button pill variant="outline-primary" v-on:click="setUser(username)" :disabled="!settingUser">
      <span v-if="settingUser"> Go </span>
      <b-spinner small v-else></b-spinner>
    </b-button>
    <b-button pill variant="outline-primary" v-on:click="createNewUser(username)" :disabled="!newUserEnabled">
      <span v-if="newUserEnabled"> Create User </span>
      <b-spinner small v-else></b-spinner>
    </b-button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "LandingPage",
    data() {
      return {
        username: '',
        newUserEnabled: true,
        settingUser: true
      }
    },
    methods: { 
      setUser(user) {
        this.settingUser = false
        localStorage.setItem('username', user)
        const userPage = '/' + user + '/homepage'
        this.userName = user
        this.$parent.currentUser = user
        this.$router.push(userPage)
        this.settingUser = true
      },
      createNewUser(user) {
        this.newUserEnabled = false
        axios.post('/API/addUser', {requestingUser: user})
        .then( () => {
          alert('User created!')
          this.newUserEnabled = true
        })
        .catch( (error) => {
          if(error.response.status == 409) {
            alert('User already exists!')
          }
          else {
            alert('Unable to create user')
          }
          this.newUserEnabled = true
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