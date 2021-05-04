<template>
  <!-- Div that will contain a StockGrid containing StockGridItem components
  The stocks prop value of StockGrid will be filled with the Array in fakeLastPrices
  This means each StockGridItem's stock prop value will be filled with an object from
  fakeLastPrices because StockGrid's stocks prop value has been filled with it which
  it then passes on to each StockGridItem
  -->
  <div class="pageView" v-if="stockList">
    <div class="stockList" v-if="listLoaded">
      <StockGrid :stocks="stockList" 
      :user="this.$route.params.username" 
      v-if="listLoaded"/>
      <form class="addStockForm">
        <label for="stockAddInput"> Add stock: </label>
        <input type="text" v-model="stockName" id="stockAddInput">
      </form>
      <b-button pill variant="outline-primary" v-on:click="addStock(stockName)" :disabled="!addStockLoaded">
        <span v-if="addStockLoaded"> Add Stock To Dashboard </span>
        <b-spinner small v-else></b-spinner>
      </b-button>
    </div>
    <b-spinner variant="light" v-else></b-spinner>
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
        stockName: '',
        listLoaded: false,
        addStockLoaded: true
      }
    },
    components: {
      StockGrid,
      PageNotFound
    },
    methods: {
      addStock(ticker) {
        this.addStockLoaded = false
        const upperTicker = ticker.toUpperCase()
        if(this.foundInList(upperTicker)) {
          alert('Sorry, stock already in dashboard!')
          this.addStockLoaded = true
        }
        else{
          axios.post('/API/addStockToList', {
          stockTicker: upperTicker,
          userName: this.$route.params.username
          })
          .then( (response) => {
            this.stockList.push({
              ticker: upperTicker,
              tickerData: response.data,
            })
            this.addStockLoaded = true
          })
          .catch( (error) => {
            alert('Sorry, stock not found!')
            console.log(error)
            this.addStockLoaded = true
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
      const userRequest = '/API/user/' + this.$route.params.username + '/stockList'
      axios.get(userRequest)
      .then( (response) => {
        this.stockList = response.data
        this.listLoaded = true
      })
      .catch((error) => {
        console.log(error)
        this.stockList = null
        this.listLoaded = true
      })
    }
  }
</script>

<style scoped>
  .pageView {
    margin-top: 20px;
  }
  .addStockForm {
    margin-top: 50px;
  }
  #stockAddInput {
    margin-bottom: 20px;
  }
</style>

