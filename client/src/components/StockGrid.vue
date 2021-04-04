<template>
  <!-- div to contain StockGridItems from StockGridItem.vue displayed using v-for
  bind each StockGridItem with a object from the stocks Array 
  The StockGridItem's stock prop then is filled with stock from the Array 
  -->
  <div class="tickerGrid">
    <StockGridItem
      v-for="stock in stocks"
      :key="stock.ticker"
      :stock="stock"/>
  </div>
</template>

<script>
  import StockGridItem from './StockGridItem'

  /* Export the component with name StockGrid so it can be used elsewhere
  This component will use StockGridItem components found in StockGridItem.vue
  A prop value of stocks will be passed to the component which will be an Array of objects
  */
  export default {
    name: 'StockGrid',
    components: {
      StockGridItem
    },
    props: ['stocks']
  }
</script>

<style scoped>
  .tickerGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    grid-auto-rows: minmax(200px, auto);
  }
</style>