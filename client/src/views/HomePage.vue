<template>
  <div class="pageView">
    <h1> Your Stock Dashboard </h1>
    <div class="tickerGrid">
      <div 
        v-for="stock in fakeLastPrices" 
        class="stockItem" 
        v-bind:key="stock.ticker"
      >
        <h3 class="tickerName"> {{ stock.ticker }} </h3>
        <h5 class="tickerPrice"> ${{ stock.lastPrice }} </h5>
        <p class="marketDate"> {{ stock.date }} </p>
        <router-link v-bind:to="'/detailed/' + stock.ticker">
          <button> View stock </button> 
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { fakeLastPrices } from '../dummy-data'
  export default {
    name: 'HomePage',
    data() {
      return {
        fakeLastPrices
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
  .tickerGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    grid-auto-rows: minmax(100px, auto);
  }
  .stockItem {
    border: 1px solid black;
  }
</style>

