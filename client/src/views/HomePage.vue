<template>
  <!-- Div that will contain a StockGrid containing StockGridItem components
  The stocks prop value of StockGrid will be filled with the Array in fakeLastPrices
  This means each StockGridItem's stock prop value will be filled with an object from
  fakeLastPrices because StockGrid's stocks prop value has been filled with it which
  it then passes on to each StockGridItem
  -->
  <div class="pageView" v-if="stockList">
    <StockGrid :stocks="stockList" />
    <form>
      <label for="stockAddInput"> Add stock: </label>
      <input type="text" v-model="stockName" id="stockAddInput">
    </form>
    <button v-on:click="addStock(stockName)">
      Add Stock To Dashboard
    </button>
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
        stockList: [],
        stockName: ''
      }
    },
    components: {
      StockGrid,
      PageNotFound
    },
    methods: {
      addStock(ticker) {
        const upperTicker = ticker.toUpperCase()
        if(this.foundInList(upperTicker)) {
          alert('Sorry, stock already in dashboard!')
        }
        else{
          axios.post('/API/addStockToList', {
          stockTicker: upperTicker
          })
          .then( (response) => {
            this.stockList.push(response.data)
          })
          .catch( (error) => {
            alert('Sorry, stock not found!')
            console.log(error)
          })
        }
      },
      foundInList(stockTicker){
        for(var i = 0; i < this.stockList.length; i++){
          if(this.stockList[i].ticker == stockTicker) {
            return true
          }
        }
        return false
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

