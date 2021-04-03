<template>
  <div class="pageView">
    <h1> {{ marketIndex.symbol }} </h1>
    <h3> {{ marketIndex.lastValue }} </h3>
  </div>
</template>

<script>
  import { indices } from '../dummy-data'
  export default {
    name: 'NasdaqPage',
    data() {
      return {
        marketIndex: indices.find( (index) => index.symbol === 'IXIC')
      }
    }
  }
</script>

<style scoped>
</style>