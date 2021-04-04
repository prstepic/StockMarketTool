const express = require("express")
const mongodb = require("mongodb")

import { fakeLastPrices } from '../dummy-data'
import { indices } from '../dummy-data'

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
  res.status(200).json(fakeLastPrices)
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
  const stockData = fakeLastPrices.find( (stock) => stock.ticker === symb)
  if(stockData){
    res.status(200).json(stockData)
  }
  else {
    res.status(404).json('Could not get information for request')
  }
})

app.post('/API/addStockToList', (req, res) => {

})

app.post('/API/addUser', (req, res) => {

})

app.delete('/API/removeStockFromList', (req, res) => {

})
