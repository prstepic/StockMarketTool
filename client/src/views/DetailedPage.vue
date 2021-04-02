<template>
  <div class="detailedPage">
    <h1 class="symbolTitle"> {{ symbol.ticker }} </h1>
    <p class="lastPrice"> Last Price: ${{ symbol.lastPrice }} </p>
    <p class="asOfDate"> As of: {{ symbol.date }} </p>
    <p class="marketHours"
      v-show="!marketOpen"
    >
      MARKET IS CLOSED
    </p>
  </div>
</template>

<script>
  import { fakeLastPrices } from '../dummy-data'
  export default {
    name: 'DetailedPage',
    data() {
      return {
        symbol: fakeLastPrices.find( (stock) => stock.ticker === this.$route.params.ticker),
        marketClose: false
      }
    },
    methods: {
      isMarketOpen() {
        var d = new Date()
        var minutes = d.getMinutes()
        var hours = d.getHours()
        var day = d.getDay()
        if((day > 0 && day < 6) && ((hours > 8 && hours < 15) || (hours == 8 && minutes > 30 && hours < 15))){
          this.marketOpen = true
        }
        else {
          this.marketClose = false
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: green;
  }
</style>