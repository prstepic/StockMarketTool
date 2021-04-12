<template>
  <!-- div to contain information on a particular stock which will be displayed with other items in a grid
  Use the prop value, stock, to fill in information about a passed down stock from the parent component
  StockGrid will pass this stock value to the stock prop in this component
  Each item will also have a link to the detailed page of the stock using v-bind:to 
  -->
  <div class="stockItem">
    <h3 class="tickerName"> {{ stock.ticker }} </h3>
    <h5 class="tickerPrice"> ${{ stock.lastPrice }} </h5>
    <p class="marketDate"> {{ month }}/{{ day }}/{{ year }} </p>
    <router-link v-bind:to="'/detailed/' + stock.ticker">
      <button> View stock </button> 
    </router-link>
    <button v-on:click="$emit('stockRemovalItem',stock.ticker)">
      Remove from Dashboard
    </button>
  </div>
    
</template>

<script>
  /* Export the component with name StockGridItem so it can be used elsewhere
  The prop stock will be filled by the parent component and will be used to show info about a stock
  The currentDate function will return the current date (MM/DD/YYYY) to the component
  */
  export default {
    name: 'StockGridItem',
    props: ['stock'],
    data() {
      return {
        month: '',
        day: '',
        year: ''
      }
    },
    created() {
      var d = new Date()
      this.month = d.getMonth() + 1
      this.day = d.getDate()
      this.year = d.getFullYear()
    }
  }
</script>

<style scoped>
  .stockItem {
    border: 1px solid black;
  }
</style>