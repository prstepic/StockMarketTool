<template>

  <div class="pageView">
    <h1> Your Stock Dashboard </h1>
    <div class="tickerGrid">
      <div v-for="stock in fakeLastPrice" class="stockItem" v-bind:key="stock.ticker">
        <h3 class="tickerName"> {{ stock.ticker }} </h3>
        <h5 class="tickerPrice"> ${{ stock.lastPrice }} </h5>
        <p class="marketDate"> {{ stock.date }} </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { fakeLastPrice } from '../dummy-data'
  export default {
    name: 'HomePage',
    data() {
      return {
        fakeLastPrice
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

