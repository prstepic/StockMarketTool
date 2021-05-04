<template>
  <!-- div that will contain information on a specific stock, if the stock is not found, page not found displays
  The stock information comes from the prop value stockSymbol
  -->
  <div class="detailedPage" v-if="stockSymbol">
    <h1 class="symbolTitle" :style="{color: priceColor}" > {{ stockSymbol.ticker }} </h1>
    <p class="lastPrice"> Last Price: ${{ stockSymbol.currentPrice }} </p>
    <p class="dayChange" :style="{color: priceColor}"> Change: {{ stockSymbol.dayDiff }} </p>
    <p class="asOfDate"> As of: {{ month }}/{{ day }}/{{ year }}</p>
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
    data() {
      return {
        month: '',
        day: '',
        year: '',
        seconds: '',
        minutes: '',
        hours: '',
        pmOrAM: '',
        priceColor: '#1ce63a',
        marketOpen: true
      }
    },
    methods: {
      isMarketOpen() { 
        if((this.day > 0 && this.day < 6) && ((this.hours > 8 && this.hours < 15) || (this.hours == 8 && this.minutes > 30 && this.hours < 15))){
          this.marketOpen = true
        }
        else {
          this.marketOpen = false
        }
      },
      getDayChange() {
        if(this.stockSymbol.dayDiff < 0){
          this.priceColor = '#e02f61'
        }
        else {
          this.priceColor = '#1ce63a'
        }
      }
    },
    created() {
      var d = new Date()
      this.month = d.getMonth() + 1
      this.day = d.getDate()
      this.year = d.getFullYear()
      this.minutes = d.getMinutes()
      const military = d.getHours()
      if(military > 12) {
        this.pmOrAM = 'PM'
        this.hours = military - 12
      }
      else if(military == 0){
        this.pmOrAM = 'AM'
        this.hours = 12
      }
      else {
        this.pmOrAm = 'AM'
        this.hours = military
      }
      this.isMarketOpen()
      this.getDayChange()
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