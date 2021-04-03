<template>
  <div class="detailedPage" v-if="symbol">
    <h1 class="symbolTitle"> {{ symbol.ticker }} </h1>
    <p class="lastPrice"> Last Price: ${{ symbol.lastPrice }} </p>
    <p class="asOfDate"> As of: {{ symbol.date }} </p>
    <p class="marketHours"
      v-show="!isMarketOpen()"
    >
      MARKET IS CLOSED
    </p>
  </div>
  <PageNotFound v-else/>
</template>

<script>
  import { fakeLastPrices } from '../dummy-data'
  import PageNotFound from './PageNotFound'
  export default {
    name: 'DetailedPage',
    data() {
      return {
        symbol: fakeLastPrices.find( (stock) => stock.ticker === this.$route.params.ticker)
      }
    },
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
      }
    },
    components: {
      PageNotFound
    }
    
  }
</script>

<style scoped>
  
</style>