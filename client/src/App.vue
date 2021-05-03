<template>
  <div id="app">
    <h1 id="title"> Market QuickCheck </h1>
    <NavigationBar :username="currentUser"/>
    <router-view/>
  </div>
</template>

<script>
  import NavigationBar from './components/NavigationBar.vue'
  export default {
    name: 'App',
    components: {
      NavigationBar
    },
    data() {
      return {
        currentUser: localStorage.getItem('username')
      }
    }
  }
</script>

<style lang="scss">
@import "./overrideVariables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#title {
  color: #ab8bc9;
}

label {
  color: #ab8bc9;
}

input {
  width: 30%;
  background-color:transparent;
  border: none;
  border-bottom: 2px solid #ab8bc9;
  color: white;
  text-align: center;
}
input:focus {
  outline: none;
}
</style>
