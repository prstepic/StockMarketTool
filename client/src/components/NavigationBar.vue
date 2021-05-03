<template>
  <!-- div to contain router links that will link to different pages -->
  <div id="navBar">
    <b-button pill variant="outline-primary" to="/" id="homeLink">
      Home
    </b-button>
    <b-button pill variant="outline-primary" :to="goToUserHome()" id="dashLink">
      Dashboard
    </b-button>
    <b-button pill variant="outline-primary" to="/djia" id="dowLink">
      Dow Jones
    </b-button>
    <b-button pill variant="outline-primary" to="/ixic" id="nasLink">
      NASDAQ
    </b-button>
    <b-button pill variant="outline-primary" to="/inx" id="sapLink">
      S &amp; P 500
    </b-button>
  </div>
</template>

<script>
  // Export the component with name NavigationBar so it can be used elsewhere
  export default {
    name: 'NavigationBar',
    props: ['username'],
    methods: {
      goToUserHome(){
        const url = "/" + this.username + "/homepage"
        return url
      }
    }
  }
</script>

<style scoped lang="scss">
  #navBar {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
</style>