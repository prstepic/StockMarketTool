<template>
  <div id="navBar">
    <router-link to="/homepage" id="homeLink">
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
  export default {
    name: 'NavigationBar'
  }
</script>

<style scoped>
  h1 {

  }
</style>