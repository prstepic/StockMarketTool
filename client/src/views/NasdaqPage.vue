<template>
  <!-- Display the detailed information of the NASDAQ using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <div class="pageView">
    <div class="summary" v-if="isLoaded">
      <StockDetail :stockSymbol="marketIndex" />
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="light"></b-spinner>
    </div>
  </div>
</template>

<script>
  import StockDetail from '../components/StockDetail.vue'
  import axios from 'axios'
  /* Export the Vue with name NasdaqPage so it can be referenced elsewhere (i.e. the router)
  The symbol will be found in the indices Array using find()
  The StockDetail component will be used to show the information the NASDAQ
  */
  export default {
    name: 'NasdaqPage',
    data() {
      return {
        marketIndex: {
          ticker: 'QQQ',
          currentPrice: '',
          highPrice: '',
          openPrice: '',
          lowPrice: '',
          prevClose: '',
          dayDiff: ''
        },
        isLoaded: false
      }
    },
    components: {
      StockDetail
    },

    // On creation make a request to the server for info on QQQ (Invesco NASDAQ ETF)
    created() {
      axios.get('/API/NASDAQ')
      .then((response) => {
        this.marketIndex.openPrice = (response.data.o).toFixed(2)
        this.marketIndex.highPrice = (response.data.h).toFixed(2)
        this.marketIndex.lowPrice = (response.data.l).toFixed(2)
        this.marketIndex.currentPrice = (response.data.c).toFixed(2)
        this.marketIndex.prevClose = (response.data.pc).toFixed(2)
        this.marketIndex.dayDiff = (this.marketIndex.currentPrice - this.marketIndex.prevClose).toFixed(2)
        this.isLoaded = true
      })
      .catch( (error) => {
        console.log(error)
        this.isLoaded = true
        this.marketIndex = null
      })
    }
  }
</script>

<style scoped>
  .spinner {
    margin-top:100px;
  }
</style>