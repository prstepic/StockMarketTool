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
      :user="currentUser" 
      v-if="listLoaded"/>
      <form class="addStockForm" autocomplete="off">
        <label for="stockAddInput"> Add stock: </label> <br>
        <input type="text" v-model="stockName" id="stockAddInput">
      </form>
      <b-button pill variant="outline-primary" v-on:click="addStock(stockName)" :disabled="!addStockLoaded">
        <span v-if="addStockLoaded"> Add Stock To Dashboard </span>
        <b-spinner small v-else></b-spinner>
      </b-button>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="light"></b-spinner>
    </div>
  </div>
  <div class="notFound" v-else>
    <PageNotFound />
    <p> If you haven't already, create your user on the Home page </p>
    <p> or try again later </p>
  </div>
</template>

<script>
  import StockGrid from '../components/StockGrid.vue'
  import axios from 'axios'
  import PageNotFound from './PageNotFound.vue'
  /* Export the Vue with name HomePage so it can be referenced elsewhere (i.e. the router)
  This Vue will use StockGrid to display different StockGridItems in a grid layout
  This Vue wiill also allow users to add stocks to the StockGrid
  */
  export default {
    name: 'HomePage',
    data() {
      return {
        stockList: [],
        stockName: '',
        listLoaded: false,
        addStockLoaded: true,
        currentUser: null
      }
    },
    components: {
      StockGrid,
      PageNotFound
    },
    methods: {

      // Add a stock to the stocklist array, this will update the passed prop value in StockGrid
      // this will be done in a post request to the server, so it can also persist in the database
      addStock(ticker) {
        if(this.stockList.length < 20){
          this.addStockLoaded = false
          const upperTicker = ticker.toUpperCase()
          if(this.foundInList(upperTicker)) {
            alert('Sorry, stock already in dashboard!')
            this.addStockLoaded = true
          }
          else{
            axios.post('/API/addStockToList', {
            stockTicker: upperTicker,
            userName: this.currentUser
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
        }
        else {
          alert('Sorry, Can not add more than 20 stocks')
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

    // On creation get the current user's stock list by requesting the list from the server
    created(){
      this.currentUser = localStorage.getItem('username')
      const userRequest = '/API/user/' + this.currentUser + '/stockList'
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
  .spinner {
    margin-top: 100px;
  }
  p {
    color: white;
  }
</style>

