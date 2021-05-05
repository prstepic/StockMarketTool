<template>
  <!-- div to contain router links that will link to different pages -->
  <div id="navBar">
    <b-button pill variant="outline-primary" exact-active-class="active" to="/" id="homeLink">
      <span> Home </span>
    </b-button>
    <b-button pill variant="outline-primary" exact-active-class="active" :to="goToUserHome()" id="dashLink">
      <span> Dashboard </span>
    </b-button>
    <b-button pill variant="outline-primary" exact-active-class="active" to="/djia" id="dowLink">
      <span> Dow Jones </span>
    </b-button>
    <b-button pill variant="outline-primary" exact-active-class="active" to="/ixic" id="nasLink">
      <span> NASDAQ </span>
    </b-button>
    <b-button pill variant="outline-primary" exact-active-class="active" to="/inx" id="sapLink">
      <span> S &amp; P 500 </span>
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
  .active {
    background-color: var(--primary);
  }

</style>