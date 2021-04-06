<template>
  <!-- Div that will contain a StockGrid containing StockGridItem components
  The stocks prop value of StockGrid will be filled with the Array in fakeLastPrices
  This means each StockGridItem's stock prop value will be filled with an object from
  fakeLastPrices because StockGrid's stocks prop value has been filled with it which
  it then passes on to each StockGridItem
  -->
  <div class="pageView">
    <StockGrid :stocks="fakeLastPrices" />
    <div>
      <button v-on:click="addStock"> Test: Add stock </button>
    </div>
  </div>
</template>

<script>
  import { fakeLastPrices } from '../dummy-data'
  import StockGrid from '../components/StockGrid.vue'

  /* Export the Vue with name HomePage so it can be referenced elsewhere (i.e. the router)
  This Vue will use StockGrid to display different StockGridItems in a grid layout
  */
  export default {
    name: 'HomePage',
    data() {
      return {
        fakeLastPrices
      }
    },
    components: {
      StockGrid
    },
    methods: {
      addStock() {
        fakeLastPrices.push({
          ticker: "SOXX",
          lastPrice: "450"
        })
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>

