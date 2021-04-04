<template>
  <!-- Display the detailed information of a stock using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <StockDetail :stockSymbol="symbol" />
</template>

<script>
  import { fakeLastPrices } from '../dummy-data'
  import StockDetail from '../components/StockDetail.vue'

  /* Export the Vue with name DetailedPage so it can be referenced elsewhere (i.e. the router)
  The symbol will be found in the Array of stocks using find()
  The StockDetail component will be used to show the information about a stock
  */
  export default {
    name: 'DetailedPage',
    data() {
      return {
        symbol: fakeLastPrices.find( (stock) => stock.ticker === this.$route.params.ticker)
      }
    },
    methods: {
      
    },
    components: {
      StockDetail
    }
    
  }
</script>

<style scoped>
  
</style>