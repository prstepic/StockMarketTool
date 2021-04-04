const express = require("express")
const mongodb = require("mongodb")
import { fakeLasPrices } from '../dummy-data'
import { indices } from '../dummy-data'

const app = express()
const port = 9090

app.listen(port, () => {
    console.log('server running on port ' + port)
})

app.get('/', (req, res) => {
    res.send("Hello, the server is up")
})

app.get('/API/:username/stockList', (req, res) => {

})

app.get('/API/DowJones', (req, res) => {

})

app.get('/API/NASDAQ', (req, res) => {

})

app.get('/API/SandP500', (req, res) => {

})

app.get('/API/info/:symbol', (req, res) => {

})

app.post('/API/addStockToList', (req, res) => {

})

app.post('/API/addUser', (req, res) => {

})

app.delete('/API/removeStockFromList', (req, res) => {

})
