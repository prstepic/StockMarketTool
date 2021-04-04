<template>
  <!-- Display the detailed information of the NASDAQ using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <div class="pageView">
    <StockDetail :stockSymbol="marketIndex" />
  </div>
</template>

<script>
  import { indices } from '../dummy-data'
  import StockDetail from '../components/StockDetail.vue'

  /* Export the Vue with name NasdaqPage so it can be referenced elsewhere (i.e. the router)
  The symbol will be found in the indices Array using find()
  The StockDetail component will be used to show the information the NASDAQ
  */
  export default {
    name: 'NasdaqPage',
    data() {
      return {
        marketIndex: indices.find( (index) => index.ticker === 'IXIC')
      }
    },
    components: {
      StockDetail
    }
  }
</script>

<style scoped>
</style>