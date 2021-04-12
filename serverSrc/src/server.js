const express = require('express')
const mongodb = require('mongodb')
const finnhub = require('finnhub')
const axios = require('axios')

import { fakeLastPrices } from '../dummy-data'
import { indices } from '../dummy-data'
import { loginInfo } from '../loginInfo'

const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = loginInfo.finnhubKey
const finnhubClient = new finnhub.DefaultApi()
const mongoCreds = loginInfo.mongoAuth
const app = express()
const port = 9090



app.use(express.json())

app.listen(port, () => {
    console.log('server running on port ' + port)
})

app.get('/', (req, res) => {
    res.send("Hello, the server is up")
})

// --TODO-- Database implementation
app.get('/API/user/:username/stockList', (req, res) => {
  const user = req.params.username
  const userList = fakeLastPrices.find( (id) => id.username === user)
  if(userList) {
    var url = 'https://finnhub.io/api/v1/quote?token=' + loginInfo.finnhubKey + '&symbol='
    var axiosList = []
    for(var i = 0; i < userList.stockList.length;i++){
      const reqUrl = url + userList.stockList[i].ticker
      axiosList.push(axios.get(reqUrl))
    }
    axios.all(axiosList)
    .then( axios.spread( (...responses) => {
      var listToReturn = []
      for(var i = 0; i < responses.length; i++){
        listToReturn.push({
          ticker: userList.stockList[i].ticker,
          lastPrice: responses[i].data.c
        })
      }
      return listToReturn
    }))
    .then( (stocks) => {
      res.status(200).json(stocks)
    })
    .catch( (error) => {
      console.log('could not get stock data from finnhub')
      res.status(404).json('Could not retrieve stock data: ' + error)
    })
  }
  else{
    res.status(404).json('User not found')
  }
})

app.get('/API/DowJones', (req, res) => {
  finnhubClient.quote('DIA', (error, data, response) => {
    if(data.c != 0 && !error){
      res.status(200).json(data.c)
    }
    else{
      res.status(404).json('Server error')
    }
  })
})

app.get('/API/NASDAQ', (req, res) => {
  finnhubClient.quote('QQQ', (error, data, response) => {
    if(data.c != 0 && !error){
      res.status(200).json(data.c)
    }
    else {
      res.status(404).json('Server error')
    }
  })
})

app.get('/API/SandP500', (req, res) => {
  finnhubClient.quote('SPY', (error, data, response) => {
    if(data.c != 0 && !error){
      res.status(200).json(data.c)
    }
    else {
      res.status(404).json('Server error')
    }
  })
})

app.get('/API/info/:symbol', (req, res) => {
  const symb = req.params.symbol
  finnhubClient.quote(symb, (error, data, response) => {
    if(data.c != 0 && !error){
      res.status(200).json(data)
    }
    else {
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

// --TODO-- Database implementation
app.post('/API/addStockToList', (req, res) => {
  const stockToGet = req.body.stockTicker
  finnhubClient.quote(stockToGet, (error, data, response) => {
    if(data.c != 0 && !error){
      res.status(200).json(data.c)
    }
    else{
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

//--TODO-- When connecting server to database
app.post('/API/addUser', (req, res) => {

})

//--TODO-- When connecting server to database
app.post('/API/removeStockFromList', (req, res) => {
  res.status(200).json('Success')
})
