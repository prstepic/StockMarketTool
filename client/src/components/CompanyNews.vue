<template>
  <div class="container">
    <h3 class="title"> Company News </h3>
    <div class="newsContainer" v-if="isLoaded">
      <div class="companyNewsList" v-if="newsArray">
        <div v-for="article in newsArray" 
        class="newsArticle"
        :key="article.id">
          <div class="links">
            <a :href="article.url"> {{ article.headline }} </a>
          </div>
        </div>
      </div>
      <div class="noNews" v-else>
        <p> No News </p>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="light"> </b-spinner>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CompanyNews',
  props: ['stockSymbol'],
  data() {
    return {
      newsArray: null,
      isLoaded: false
    }
  },
  created() {
    const requestUrl = '/API/news/' + this.stockSymbol
    axios.get(requestUrl)
    .then( (response) => {
      this.newsArray = response.data
      this.isLoaded = true
    })
    .catch( (error) => {
      console.log(error)
      this.newsArray = null
      this.isLoaded = true
    })
  }
}
</script>

<style scoped lang="scss">
  .title {
    color: white;
  }
  .links {
    margin-bottom: 20px;
  }
  a {
    color: white;
    text-decoration: underline;
  }
  .container {
    border: 1px solid #ab8bc9;
    border-radius: 20px
  }
  .title {
    margin-top: 10px;
  }
</style>