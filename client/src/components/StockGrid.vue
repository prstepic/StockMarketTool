<template>
  <!-- div to contain StockGridItems from StockGridItem.vue displayed using v-for
  bind each StockGridItem with a object from the stocks Array 
  The StockGridItem's stock prop then is filled with stock from the Array 
  -->
  <div class="tickerGrid">
    <StockGridItem
      v-for="stock in stocks"
      v-on:stockRemovalItem="removeStock($event)"
      :key="stock.ticker"
      :stock="stock"/>
  </div>
</template>

<script>
  import StockGridItem from './StockGridItem'
  import axios from 'axios'
  /* Export the component with name StockGrid so it can be used elsewhere
  This component will use StockGridItem components found in StockGridItem.vue
  A prop value of stocks will be passed to the component which will be an Array of objects
  */
  export default {
    name: 'StockGrid',
    components: {
      StockGridItem
    },
    props: ['stocks', 'user'],
    methods: {
      // this function will fire when the StockGrid component receives a removal event from StockGridItem
      // it will remove the stock from the list of stocks and the item will be removed from the grid display
      removeStock(stockToRemove){
        this.itemToBeDeleted = stockToRemove
        const indexOfStock = this.findIndex(stockToRemove, this.stocks)
        if(indexOfStock != -1){
          axios.post('/API/removeStockFromList', {
            stockTicker: stockToRemove,
            userName: this.user
          })
          .then( () => {
            this.stocks.splice(indexOfStock, 1)
          })
          .catch( (error) => {
            console.log(error)
          })
        }
        else{
          console.log('Stock already in list')
        }
      },
      findIndex(stock, stockList){
        for(var i = 0; i < stockList.length; i++){
          if(stockList[i].ticker === stock){
            return i
          }
        }
        return -1
      }
    }
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