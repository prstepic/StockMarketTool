<template>
  <div class="container" v-if="earnings">
    <h3 class="title"> Earnings </h3>
    <p class="quarter"> Quarter: Q{{ earnings.quarter }} {{ earnings.year }} </p>
    <div class="epsInfo"> 
      <p class="estimatedEPS"> Estimated EPS: {{ earnings.estimateEPS }} </p>
      <p class="actualEPS"> Actual EPS: 
        <span class="epsResult" :style="{color: epsBeatColor}">
          {{ earnings.actualEPS }} {{ epsBeatLabel }} 
        </span>
      </p>
    </div>
    <div class="revInfo"> 
      <p class="estimatedRev"> Estimated Revenue: {{ earnings.estimateRev }} </p>
      <p class="actualRev"> Actual Revenue: 
        <span class="revResult" :style="{color: revBeatColor}">
          {{ earnings.actualRev }} {{ revBeatLabel }} 
        </span>
      </p>
    </div>
    <p class="reportedDate"> Reported: {{ earnings.date }} </p>
  </div>
</template>

<script>
  /* 
  This component will show the last earnings report of a given stock (report from Finnhub.io)
  it will also show whether the company beat or missed estimated earnings and revenues
  */
  import axios from 'axios'
  export default {
    name: 'StockEarnings',
    props: ['stockSymbol'],
    data() {
      return {
        earnings: null,
        epsBeatColor: '#e02f61',
        epsBeatLabel: '',
        revBeatColor: '#e02f61',
        revBeatLabel: ''
      }
    },

    // On creation get the data for last earnings and revenue reports
    // Update the whether the company beat or missed the estimated reports and update styling
    created() {
      const requestUrl = '/API/earnings/' + this.stockSymbol
      axios.get(requestUrl)
      .then( (response) => {
        const earningsData = response.data.earningsCalendar[0]
        const earningsInfo = {
          date: earningsData.date,
          quarter: earningsData.quarter,
          year: earningsData.year,
          estimateEPS: earningsData.epsEstimate.toFixed(2),
          actualEPS: earningsData.epsActual.toFixed(2),
          estimateRev: earningsData.revenueEstimate.toFixed(2),
          actualRev: earningsData.revenueActual.toFixed(2)
        }
        this.earnings = earningsInfo
        if(this.earnings.estimateEPS <= this.earnings.actualEPS) {
          this.epsBeatColor = '#1ce63a'
          this.epsBeatLabel = 'BEAT'
        }
        else {
          this.epsBeatLabel = 'MISS'
        }
        if(this.earnings.estimateRev <= this.earnings.actualRev) {
          this.revBeatColor = '#1ce63a'
          this.revBeatLabel = 'BEAT'
        }
        else {
          this.revBeatLabel = 'MISS'
        }
      })
      .catch( (error) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="scss">
  .title {
    color: white;
    margin-top: 10px;
  }
  .quarter {
    color: white;
  }
  .epsInfo {
    color: white;
  }
  .revInfo {
    color: white;
  }
  .container {
    border: 1px solid #ab8bc9;
    border-radius: 20px;
  }
  .reportedDate {
    color: white;
  }
</style>
