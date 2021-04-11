const express = require("express")
const mongodb = require("mongodb")
const axios = require('axios')

import { fakeLastPrices } from '../dummy-data'
import { indices } from '../dummy-data'
import { stockPrices } from '../dummy-data'
import { loginInfo} from '../loginInfo'

const fhKey = loginInfo.finnhubKey
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
  if(userList){
    res.status(200).json(userList.stockList)
  }
  else {
    res.status(400).json('User not found')
  }
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
  const stockData = stockPrices.find( (stock) => stock.ticker === symb)
  if(stockData){
    res.status(200).json(stockData)
  }
  else {
    res.status(404).json('Could not get information for request')
  }
})

// --TODO-- When connecting client and server
app.post('/API/addStockToList', (req, res) => {
  const stockToGet = req.body.stockTicker
  const stockData = stockPrices.find( (stock) => stock.ticker === stockToGet)
  if(stockData){
    res.status(200).json(stockData)
  }
  else{
    res.status(404).json('Could not retrieve: ' + stockToGet)
  }
})

//--TODO-- When connecting server to database
app.post('/API/addUser', (req, res) => {

})

//--TODO-- When connecting client and server
app.post('/API/removeStockFromList', (req, res) => {
  res.status(200).json('Success')
})
