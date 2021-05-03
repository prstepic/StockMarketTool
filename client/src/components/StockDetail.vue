<template>
  <!-- div that will contain information on a specific stock, if the stock is not found, page not found displays
  The stock information comes from the prop value stockSymbol
  -->
  <div class="detailedPage" v-if="stockSymbol">
    <h1 class="symbolTitle" :style="{color: getDayChange()}" > {{ stockSymbol.ticker }} </h1>
    <p class="lastPrice"> Last Price: ${{ stockSymbol.currentPrice }} </p>
    <p class="dayChange" :style="{color: getDayChange()}"> Change: {{ stockSymbol.dayDiff }} </p>
    <p class="asOfDate"> As of: {{ currentDate().month }}/{{ currentDate().day }}/{{ currentDate().year }}</p>
    <p class="marketHours"
      v-show="!isMarketOpen()"
    >
      MARKET IS CLOSED
    </p>
  </div>
  <PageNotFound v-else/>
</template>

<script>
  import PageNotFound from '../views/PageNotFound.vue'

  /* Export the component with name StockDetail so it can be used elsewhere
  The component will contain a prop value, stockSymbol, in which its parent component can pass it a value
  The isMarketOpen function will return if the market is open or not to the component
  The currentDate function calculates the current date (MM/DD/YYYY) to the component
  PageNotFound component will be used to display a 404 error for /detailed/<stock> if the stock is not found 
  */
  export default {
    name: 'StockDetail',
    props: ['stockSymbol'],
    methods: {
      isMarketOpen() { 
        var d = new Date()
        var minutes = d.getMinutes()
        var hours = d.getHours()
        var day = d.getDay()
        if((day > 0 && day < 6) && ((hours > 8 && hours < 15) || (hours == 8 && minutes > 30 && hours < 15))){
          return true
        }
        else {
          return false
        }
      },
      currentDate() {
        var d = new Date()
        var today = {
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear()
        }
        return today
      },
      getDayChange() {

        if(this.stockSymbol.dayDiff < 0){
          return '#e02f61'
        }
        else {
          return '#1ce63a'
        }
      }
    },
    components: {
      PageNotFound
    }
  }
</script>

<style scoped>
  .symbolTitle {
    margin-top: 50px;
  }
  p {
    color: #ab8bc9;
  }
  .lastPrice {
    font-weight: bold;
  }
</style>