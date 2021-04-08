<template>
  <!-- div to contain router links that will link to different pages -->
  <div id="navBar">
    <router-link to="/" id="homeLink">
      <p> Stock Dashboard </p>
    </router-link>
    <router-link to="/djia" id="dowLink">
      <p> Dow Jones </p>
    </router-link>
    <router-link to="/ixic" id="nasLink">
      <p> NASDAQ </p>
    </router-link>
    <router-link to="/inx" id="sapLink">
      <p> S &amp; P 500</p>
    </router-link>
  </div>
</template>

<script>
  // Export the component with name NavigationBar so it can be used elsewhere
  export default {
    name: 'NavigationBar',
    methods: {
      getUserName(){
        return localStorage.getItem('username')
      }
    }
  }
</script>

<style scoped>
  #navBar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>