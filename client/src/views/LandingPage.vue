<template>
  <div class="submissionPage">
    <div id="userSubmission">
      <form autocomplete="off">
        <label for="usernameInput"> Please enter your username </label>
        <div>
          <input type="text" v-model="username" id="usernameInput">
        </div>
      </form>
    </div>
    <div class="goButton">
      <b-button pill variant="outline-primary" v-on:click="setUser(username)" :disabled="!settingUser">
        <span v-if="settingUser"> Go </span>
        <b-spinner small v-else></b-spinner>
      </b-button>
    </div>
    <p> or </p>
    <div class="createButton">
      <b-button pill variant="outline-primary" v-on:click="createNewUser(username)" :disabled="!newUserEnabled">
        <span v-if="newUserEnabled"> Create User </span>
        <b-spinner small v-else></b-spinner>
      </b-button>
    </div>
  </div>
</template>

<script>
  /*
  This component is the landing page of the site. Users will be able to create usernames and 
  view existing user's dashboards. This component will set the localStorage to the user that
  enters their username
  */
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
      // set localStorage to 'user' so it can be obtained elsewhere on the site
      // go to that user's homepage
      setUser(user) {
        this.settingUser = false
        localStorage.setItem('username', user)
        const userPage = '/homepage'
        this.userName = user
        this.$parent.currentUser = user
        this.$router.push(userPage)
        this.settingUser = true
      },

      // Using axios make a post request to the server to add the username with an empty list of stocks
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
.goButton {
  margin-bottom: 2px;
}
p {
  color: white;
  margin-bottom: 2px;
}
</style>