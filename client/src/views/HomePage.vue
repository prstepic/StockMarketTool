<template>
  <!-- Div that will contain a StockGrid containing StockGridItem components
  The stocks prop value of StockGrid will be filled with the Array in fakeLastPrices
  This means each StockGridItem's stock prop value will be filled with an object from
  fakeLastPrices because StockGrid's stocks prop value has been filled with it which
  it then passes on to each StockGridItem
  -->
  <div class="pageView" v-if="stockList">
    <StockGrid :stocks="stockList" />
    <div>
      <button v-on:click="addStock"> Test: Add stock </button>
    </div>
  </div>
  <PageNotFound v-else/>
</template>

<script>
  import StockGrid from '../components/StockGrid.vue'
  import axios from 'axios'
  import PageNotFound from './PageNotFound.vue'
  /* Export the Vue with name HomePage so it can be referenced elsewhere (i.e. the router)
  This Vue will use StockGrid to display different StockGridItems in a grid layout
  */
  export default {
    name: 'HomePage',
    data() {
      return {
        stockList: []
      }
    },
    components: {
      StockGrid,
      PageNotFound
    },
    methods: {
      addStock() {
        this.stockList.push({
          ticker: "SOXX",
          lastPrice: "450"
        })
      }
    },
    created(){
      const userRequest = '/API/user/' + localStorage.getItem('username') + '/stockList'
      axios.get(userRequest)
      .then( (response) => {
        this.stockList = response.data
      })
      .catch((error) => {
        console.log(error)
        console.log('testing 1')
        this.stockList = null
      })
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>

