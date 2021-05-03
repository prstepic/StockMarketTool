<template>
  <!-- div to contain information on a particular stock which will be displayed with other items in a grid
  Use the prop value, stock, to fill in information about a passed down stock from the parent component
  StockGrid will pass this stock value to the stock prop in this component
  Each item will also have a link to the detailed page of the stock using v-bind:to 
  -->
  <div class="stockItem">
    <h3 class="tickerName" :style="{color: priceColor}"> {{ stock.ticker }} </h3>
    <h5 class="tickerPrice"> ${{ (stock.tickerData.c).toFixed(2)}} </h5>
    <p class="dayChange" :style="{color: priceColor}"> {{ dayDifference}} </p>
    <p class="marketDate"> {{ month }}/{{ day }}/{{ year }} </p>
    <b-button pill variant="outline-primary" :to="'/detailed/' + stock.ticker"> 
      View stock 
    </b-button> 
    <b-button pill variant="outline-primary" v-on:click="$emit('stockRemovalItem', stock.ticker)">
      Remove from Dashboard
    </b-button>
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
        year: '',
        priceColor: '#1ce63a',
        dayDifference: 0
      }
    },
    created() {
      var d = new Date()
      this.month = d.getMonth() + 1
      this.day = d.getDate()
      this.year = d.getFullYear()
      this.dayDifference = (this.stock.tickerData.c - this.stock.tickerData.o).toFixed(2)
      if(this.dayDifference < 0) {
        this.priceColor = '#e02f61'
      }
    }
  }
</script>

<style scoped>
  .stockItem {
    border: 1px solid #ab8bc9;
  }
  h3 {
    color: #17e610;
  }
  .tickerPrice {
    color: #ab8bc9;
    font-weight: bold;
  }
  p {
    color: #ab8bc9;
  }

  .dayChange {
    margin-bottom: 10px;
  }
</style>