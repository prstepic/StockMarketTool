<template>
  <!-- Display the detailed information of a stock using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <StockDetail :stockSymbol="symbol" />
</template>

<script>
  import StockDetail from '../components/StockDetail.vue'
  import axios from 'axios'
  /* Export the Vue with name DetailedPage so it can be referenced elsewhere (i.e. the router)
  The symbol will be found in the Array of stocks using find()
  The StockDetail component will be used to show the information about a stock
  */
  export default {
    name: 'DetailedPage',
    data() {
      return {
        symbol: {
          ticker: this.$route.params.ticker.toUpperCase(),
          openPrice: '',
          highPrice: '',
          lowPrice: '',
          currentPrice: '',
          prevClose: '',
          dayDiff: ''
        }
      }
    },
    components: {
      StockDetail
    },
    created() {
      const upperSymbol = this.$route.params.ticker.toUpperCase()
      const requestUrl = '/API/info/' + upperSymbol
      axios.get(requestUrl)
      .then( (response) => {
        this.symbol.openPrice = (response.data.o).toFixed(2)
        this.symbol.highPrice = (response.data.h).toFixed(2)
        this.symbol.lowPrice = (response.data.l).toFixed(2)
        this.symbol.currentPrice = (response.data.c).toFixed(2)
        this.symbol.prevClose = (response.data.pc).toFixed(2)
        this.symbol.dayDiff = (this.symbol.currentPrice - this.symbol.openPrice).toFixed(2)
      })
      .catch( (error) => {
        console.log(error)
        this.symbol = null
      })
    }
  }
</script>

<style scoped>
  
</style>