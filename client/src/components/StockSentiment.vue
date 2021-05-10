<template>
  <div class="container" v-if="newsSentiment">
    <h3 class="subSentiment"> News Sentiment </h3>
    <p class="stockNewsTitle"> Stock News Sentiment </p>
    <p class="stockNewsSenti" :style="{color: newsColorStock}">
      {{ newsSentiment.bullishNews }}
    </p>
    <p class="sectorNewsTitle"> Sector News Sentiment </p>
    <p class="SectorNewsSenti" :style="{color: newsColorSector}">
      {{ newsSentiment.sectorAvgBullish }}
    </p>
    <p class="sentimentResult">
      Compared to sector:
      <span :style="{color: resultSentiment}"> 
        {{ isBetterThanSector }} 
      </span>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StockSentiment',
  props: ['stockSymbol'],
  data() {
    return {
      newsSentiment: null,
      newsColorStock: '#e02f61',
      newsColorSector: '#e02f61',
      resultSentiment: '#e02f61',
      isBetterThanSector: ''
    }
  },
  created() {
    const requestUrl = '/API/sentiment/' + this.stockSymbol
    axios.get(requestUrl)
    .then( (response) => {
      const sentiment = {
        bullishNews: response.data.sentiment.bullishPercent,
        sectorAvgBullish: response.data.sectorAverageBullishPercent
      }
      this.newsSentiment = sentiment
      if(sentiment.bullishNews >= .5){
        this.newsColorStock = '#1ce63a'
      }
      if(sentiment.sectorAvgBullish >= .5){
        this.newsColorSector = '#1ce63a'
      }
      if(sentiment.bullishNews >= sentiment.sectorAvgBullish){
        this.isBetterThanSector = 'Better'
        this.resultSentiment = '#1ce63a'
      }
      else {
        this.isBetterThanSector = 'Worse'
      }
    })
    .catch( (error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped lang="scss">
.stockNewsTitle {
  color: white;
}
.sectorNewsTitle {
  color: white;
}
.sentimentResult {
  color: white;
}
.container {
  border: 1px solid #ab8bc9;
  border-radius: 20px;
}
.subSentiment {
  color: white;
  margin-top: 10px;
}
</style>