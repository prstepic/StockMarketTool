<template>
  <!-- Display the detailed information of a stock using the StockDetail component 
  StockDetail's stockSymbol prop value will be filled with symbol using v-bind
  -->
  <div class="pageView">
    <div class="summary" v-if="isLoaded">
      <StockDetail :stockSymbol="symbol"/>
      <div class="additionalData">
        <CompanyNews :stockSymbol="symbol.ticker"/>
        <div class="sentimentInfo"> 
          <div class="sentimentContainer">
            <StockSentiment :stockSymbol="symbol.ticker"/>
          </div>
          <div class="sentimentContainer">
            <StockRecommendations :stockSymbol="symbol.ticker"/>
          </div>
        </div>
        <div class="earningsContainter">
          <StockEarnings :stockSymbol="symbol.ticker"/>
        </div>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="light"></b-spinner>
    </div>
  </div>
</template>

<script>
  import StockDetail from '../components/StockDetail.vue'
  import CompanyNews from '../components/CompanyNews.vue'
  import StockSentiment from '../components/StockSentiment.vue'
  import StockRecommendations from '../components/StockRecommendations.vue'
  import StockEarnings from '../components/StockEarnings.vue'
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
          ticker: '',
          openPrice: '',
          highPrice: '',
          lowPrice: '',
          currentPrice: '',
          prevClose: '',
          dayDiff: ''
        },
        isLoaded: false
      }
    },
    components: {
      StockDetail,
      CompanyNews,
      StockSentiment,
      StockRecommendations,
      StockEarnings
    },
    created() {
      const upperSymbol = this.$route.params.ticker.toUpperCase()
      this.symbol.ticker = upperSymbol
      const requestUrl = '/API/info/' + upperSymbol
      axios.get(requestUrl)
      .then( (response) => {
        this.symbol.openPrice = (response.data.o).toFixed(2)
        this.symbol.highPrice = (response.data.h).toFixed(2)
        this.symbol.lowPrice = (response.data.l).toFixed(2)
        this.symbol.currentPrice = (response.data.c).toFixed(2)
        this.symbol.prevClose = (response.data.pc).toFixed(2)
        this.symbol.dayDiff = (this.symbol.currentPrice - this.symbol.prevClose).toFixed(2)
        this.isLoaded = true
      })
      .catch( (error) => {
        console.log(error)
        this.isLoaded = true
        this.symbol = null
      })
    }
  }
</script>

<style scoped>
  .spinner {
    margin-top:100px;
  }
  .additionalData {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    grid-auto-rows: minmax(200px, auto);
    margin-top: 75px;
  }
  .sentimentContainer {
    margin-bottom: 50px;
  }
</style>