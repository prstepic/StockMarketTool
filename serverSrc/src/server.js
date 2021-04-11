const express = require('express')
const mongodb = require('mongodb')
const finnhub = require('finnhub')

import { fakeLastPrices } from '../dummy-data'
import { indices } from '../dummy-data'
import { stockPrices } from '../dummy-data'
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

app.get('/API/user/:username/stockList', (req, res) => {
  const user = req.params.username
  const userList = fakeLastPrices.find( (id) => id.username === user)
  res.status(200).json(userList.stockList)
})

app.get('/API/DowJones', (req, res) => {
  res.status(200).json(indices.find( (symbol) => symbol.ticker === 'DJIA'))
})

app.get('/API/NASDAQ', (req, res) => {
  res.status(200).json(indices.find( (symbol) => symbol.ticker === 'IXIC'))
})

app.get('/API/SandP500', (req, res) => {
  res.status(200).json(indices.find( (symbol) => symbol.ticker === 'INX'))
})

app.get('/API/info/:symbol', (req, res) => {
  const symb = req.params.symbol
  finnhubClient.quote(symb, (error, data, response) => {
    if(data.c == 0){
      res.status(404).json('Can not retrieve symbol')
    }
    else{
      res.status(200).json(data)
    }
  })
})

// --TODO-- When connecting client and server
app.post('/API/addStockToList', (req, res) => {
  const stockToGet = req.body.stockTicker
  finnhubClient.quote(stockToGet, (error, data, response) => {
    if(data.c == 0){
      res.status(404).json('Can not retrieve symbol')
    }
    else{
      res.status(200).json(data.c)
    }
  })
})

//--TODO-- When connecting server to database
app.post('/API/addUser', (req, res) => {

})

//--TODO-- When connecting client and server
app.post('/API/removeStockFromList', (req, res) => {
  res.status(200).json('Success')
})
