<template>
  <!-- Display the detailed information of the S&P 500 using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <div class="pageView">
    <StockDetail :stockSymbol="marketIndex" />
  </div>
</template>

<script>
  import StockDetail from '../components/StockDetail.vue'
  import axios from 'axios'
  /* Export the Vue with name SandP500Page so it can be referenced elsewhere (i.e. the router)
  The symbol will be found in the indices Array using find()
  The StockDetail component will be used to show the information the S&P 500
  */
  export default {
    name: 'SandP500Page.vue',
    data() {
      return {
        marketIndex: {}
      }
    },
    components: {
      StockDetail
    },
    created() {
      axios.get('/API/SandP500')
      .then((response) => {
        this.marketIndex = response.data
      })
      .catch( (error) => {
        console.log(error)
        this.marketIndex = null
      })
    }
  }
</script>

<style scoped>
</style>