<template>
  <!-- div to contain information on a particular stock which will be displayed with other items in a grid
  Use the prop value, stock, to fill in information about a passed down stock from the parent component
  StockGrid will pass this stock value to the stock prop in this component
  Each item will also have a link to the detailed page of the stock using v-bind:to 
  -->
  <div class="stockItem">
    <h3 class="tickerName" :style="{color: priceColor}"> {{ stock.ticker }} </h3>
    <h5 class="tickerPrice"> ${{ (stock.tickerData.c).toFixed(2)}} </h5>
    <p class="dayChange" :style="{color: priceColor}"> {{ dayDifference}} </p>
    <p class="marketTime"> {{ hours }}:{{ minutes }} {{ pmOrAM }} </p>
    <p class="marketDate"> {{ month }}/{{ day }}/{{ year }} </p>
    <div class="buttons">
      <div class="viewButton">
        <b-button pill variant="outline-primary" :to="'/detailed/' + stock.ticker"> 
          <span> View stock </span>
        </b-button> 
      </div>
      <div class="removeButton">
        <b-button pill variant="outline-primary" v-on:click="emitRemoval(stock.ticker)" :disabled="!isEnabled">
          <span v-if="isEnabled"> Remove from Dashboard </span>
          <b-spinner small v-else></b-spinner>
        </b-button>
      </div>
    </div>
  </div>
    
</template>

<script>
  /* Export the component with name StockGridItem so it can be used elsewhere
  The prop stock will be filled by the parent component and will be used to show info about a stock
  The currentDate function will return the current date (MM/DD/YYYY) to the component
  */
  export default {
    name: 'StockGridItem',
    props: ['stock'],
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
        dayDifference: 0,
        isEnabled: true
      }
    },

    // On creation get the current time and date
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
      if(this.minutes < 10) {
        this.minutes = '0' + this.minutes
      }
      this.dayDifference = (this.stock.tickerData.c - this.stock.tickerData.pc).toFixed(2)
      if(this.dayDifference < 0) {
        this.priceColor = '#e02f61'
      }
    },
    methods: {
      // emit a removal event to StockGrid (parent) with the stock symbol so it can be removed from the grid
      emitRemoval(stock) {
        this.isEnabled=false
        this.$emit('stockRemovalItem', stock)
      }
    }
  }
</script>

<style scoped>
  .stockItem {
    border: 1px solid #ab8bc9;
    border-radius: 20px
  }
  h3 {
    color: #17e610;
    margin-top: 5px;
  }
  .tickerPrice {
    color: white;
    font-weight: bold;
  }
  p {
    color: white;
  }
  .dayChange {
    margin-bottom: 10px;
  }
  .buttons {
    margin-bottom: 5px;
    padding: 2px;
  }
  .viewButton {
    margin-bottom: 5px;
  }
  .marketTime {
    margin-bottom: 2px;
  }
</style>