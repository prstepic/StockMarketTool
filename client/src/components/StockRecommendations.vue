<template>
  <div class="container" v-if="recommendations">
    <h3 class="analystRatings"> Analyst Ratings </h3>
    <p class="buys"> Buy: {{ recommendations.buy }} </p>
    <p class="holds"> Hold: {{ recommendations.hold }} </p>
    <p class="sells"> Sell: {{ recommendations.sell }} </p>
  </div>
</template>

<script>
  /*
  This component will display analyst stock recommendations using Finnhub.io
  It will display the analyst buy, sell, and hold counts. The stockSymbol prop will be passed
  by the parent view and will represent the stock symbol
  */
  import axios from 'axios'
  export default {
    name: 'StockRecommendations',
    props: ['stockSymbol'],
    data() {
      return {
        recommendations: null
      }
    },

    // On creation get the recommendation report
    created() {
      const requestUrl = '/API/recommendations/' + this.stockSymbol
      axios.get(requestUrl)
      .then( (response) => {
        this.recommendations = response.data
      })
      .catch( (error) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="scss">
  .buys {
    color: #1ce63a;
  }
  .holds {
    color: white;
  }
  .sells {
    color: #e02f61;
  }
  .analystRatings {
    color: white;
    margin-top: 10px;
  }
  .container {
    border: 1px solid #ab8bc9;
    border-radius: 20px;
  }
</style>