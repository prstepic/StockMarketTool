const express = require('express')
const MongoDBClient = require('mongodb').MongoClient
const finnhub = require('finnhub')
const axios = require('axios')

import { loginInfo } from '../loginInfo'

/*
Create the Finnhub API Client and Express app
Set the url path to the MongoDB
*/
const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = loginInfo.finnhubKey
const finnhubClient = new finnhub.DefaultApi()
const mongoCreds = loginInfo.mongoAuth
const app = express()
const port = 9090
const uri = 'mongodb+srv://' + mongoCreds.username + ':' + mongoCreds.password 
            + '@stockmarkettoolcluster.ejvhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())

// The express interface will listen on port 9090 for connections
app.listen(port, () => {
  console.log('Server Up')
})

// request for localhost:9090
// TODO serve client files from this endpoint
app.get('/', (req, res) => {
  res.send("Hello, the server is up")
})

/* 
Endpoint that will return a user's stock list from the database.
Flow: database connection -> find user in database, get user's stock list -> once user found, make Finnhub API
requests for each stock in their list and Use axios.all to wait until all stock requests are complete ->
Send the data to the client once axios requests are finished.
Promises are used to ensure proper flow holds and data is filled before next step 
*/
app.get('/API/user/:username/stockList', (req, res) => {
  const user = req.params.username
  const client = new MongoDBClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect()
  .then( () => {
    const dbClient = client.db(mongoCreds.dbName)
    const userLists = dbClient.collection(mongoCreds.collection)
    return userLists.findOne( { userName: user } )
  })
  .then( (result) => {
    client.close()
    if(result) {
      var url = 'https://finnhub.io/api/v1/quote?token=' + loginInfo.finnhubKey + '&symbol='
      var axiosList = []
      for(var i = 0; i < result.listOfStocks.length; i++) {
        const reqUrl = url + result.listOfStocks[i]
        axiosList.push(axios.get(reqUrl))
      }
      axios.all(axiosList)
      .then( axios.spread( (...responses) => {
        var listToReturn = []
        for(var i = 0; i < responses.length; i++){
          listToReturn.push({
            ticker: result.listOfStocks[i],
            tickerData: responses[i].data
          })
        }
        return listToReturn
      }))
      .then( (stocks) => {
        res.status(200).json(stocks)
      })
      .catch( (error) => {
        console.log(error)
        res.status(500).json('Internal Server Error')
      })
    }
    else {
      res.status(400).json('User Not Found')
    }
  })
  .catch( (error) => {
    client.close()
    res.status(500).json('Internal Server Error')
    console.log(error)
  })
})

// Endpoint to get quote data for the Dow Jones index using axios request to Finnhub.io
app.get('/API/DowJones', (req, res) => {
  finnhubClient.quote('DIA', (error, data, response) => {
    if(data){
      if(data.c != 0 && !error){
        res.status(200).json(data)
      }
      else{
        res.status(500).json('Internal Server Error')
      }
    }
    else {
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

// Endpoint to get quote data for the NASDAQ index using axios request to Finnhub.io
app.get('/API/NASDAQ', (req, res) => {
  finnhubClient.quote('QQQ', (error, data, response) => {
    if(data){
      if(data.c != 0 && !error){
        res.status(200).json(data)
      }
      else{
        res.status(500).json('Internal Server Error')
      }
    }
    else {
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

// Endpoint to get quote data for the S&P 500 index using axios request to Finnhub.io
app.get('/API/SandP500', (req, res) => {
  finnhubClient.quote('SPY', (error, data, response) => {
    if(data){
      if(data.c != 0 && !error){
        res.status(200).json(data)
      }
      else{
        res.status(500).json('Internal Server Error')
      }
    }
    else {
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

// Using the url parameter :symbol, get the stock symbol quote data using axios request to Finnhub.io
app.get('/API/info/:symbol', (req, res) => {
  const symb = req.params.symbol
  finnhubClient.quote(symb, (error, data, response) => {
    if(data){
      if(data.c != 0 && !error){
        res.status(200).json(data)
      }
      else{
        res.status(500).json('Internal Server Error')
      }
    }
    else {
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

/*
Endpoint that will add a stock to a user's list
Flow is make a request to Finnhub.io for the stock symbol provided in the body (using Axios) ->
establish connection to the MongoDB if stock data available (if not, send error) -> 
add the stock symbol to the user list in the database (client handles duplicate stock symbols) ->
send an OK status to the client if no errors are caught
*/
app.post('/API/addStockToList', (req, res) => {
  const stockToGet = req.body.stockTicker
  const requestedUser = req.body.userName
  finnhubClient.quote(stockToGet, (error, data, response) => {
    if(data){
      if(data.c != 0 && !error) {
        const client = new MongoDBClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect()
        .then( () => {
          const dbClient = client.db(mongoCreds.dbName)
          const userLists = dbClient.collection(mongoCreds.collection)
          return userLists.updateOne( { userName: requestedUser }, { $addToSet: { listOfStocks: stockToGet } } )
        })
        .then( () => {
          client.close()
          res.status(200).json(data)
        })
        .catch( (error) => {
          console.log(error)
          client.close()
          res.status(500).json('Internal Server Error')
        })
      }
      else {
        res.status(500).json('Internal Server Error')
      }
    }
    else{
      res.status(404).json('Can not retrieve symbol')
    }
  })
})

/*
Enpoint that will add a user to the database (initialized with empty stock list)
Flow: establish a database connection -> find user in the database -> once search is complete,
determine if the user is in the database, if so send back error. If not, initialize the user's
stock list as empty and add to the database and send an OK response
*/
app.post('/API/addUser', (req, res) => {
  const requestedUser = req.body.requestingUser
  const client = new MongoDBClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect()
  .then( () => {
    const dbClient = client.db(mongoCreds.dbName)
    const userLists = dbClient.collection(mongoCreds.collection)
    const findUser = userLists.find( {userName: requestedUser} )
    return findUser.toArray().then( (result) => {
      if(result.length == 0){
        return userLists.insertOne({
          userName: requestedUser,
          listOfStocks: []
        })
        .then( () => {
          res.status(200).json('Successful user addition')
        })
        .catch( (error) => {
          res.status(500).json('Internal Server Error')
        })
      }
      else {
        res.status(409).json('User Already Exists')
      }
    })
    .catch( (error) => {
      res.status(400).json('Internal Server Error')
    })
  })
  .then( () => {
    client.close()
  })
  .catch( (error) => {
    console.log('Server Error: ' + error)
    client.close()
    res.status(400).json('Internal Server Error')
  })
})

/*
Endpoint that will remove a stock from the user's list (user and stock in request body)
Flow: establish database connection -> update user's list by removing the targeted stock ->
send an OK response if no errors are caught
*/
app.post('/API/removeStockFromList', (req, res) => {
  const requestedUser = req.body.userName
  const stockToRemove = req.body.stockTicker
  const client = new MongoDBClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect()
  .then( () => {
    const dbClient = client.db(mongoCreds.dbName)
    const userLists = dbClient.collection(mongoCreds.collection)
    return userLists.updateOne({ userName: requestedUser }, { $pull: { listOfStocks: stockToRemove } } )
  })
  .then( () => {
    client.close()
    res.status(200).json('Stock Removed')
  })
  .catch( (error) => {
    console.log(error)
    client.close()
    res.status(500).json('Internal Server Error')
  })
})

/*
Endpoint that will respond with a company's news (company symbol in url parameter :symbol)
First format the date so it is readable by Finnhub.io. Get the news for the current year
and return a max of the most recent 10 articles
*/
app.get('/API/news/:symbol', (req, res) => {
  const stockToGet = req.params.symbol
  const d = new Date()
  var dayOfMonth = d.getDate()
  if(dayOfMonth < 10) {
    dayOfMonth = '0' + String(dayOfMonth)
  }
  var month = d.getMonth() + 1
  if(month < 10) {
    month = '0' + String(month)
  }
  const year = d.getFullYear()
  const today = String(year) + '-' + String(month) + '-' + String(dayOfMonth)
  const beginningOfYear = String(year) + '-' + '01' + '-' + '01'
  finnhubClient.companyNews(stockToGet, beginningOfYear, today, (error, data, response) => {
    if(error) {
      console.log(error)
      res.status(500).json('Internal Server Error')
    }
    else {
      if(data.length > 10){
        res.status(200).json(data.slice(data.length - 10))
      }
      else {
        res.status(200).json(data)
      }
    }
  })
})

// Endpoint that will return the stock sentiment report using Axios request to Finnhub.io (stock in url param :symbol)
app.get('/API/sentiment/:symbol', (req, res) => {
  const stockToGet = req.params.symbol
  finnhubClient.newsSentiment(stockToGet, (error, data, response) => {
    if(error) {
      console.log(error)
      res.status(500).json('Internal Server Error')
    }
    else {
      res.status(200).json(data)
    }
  })
})

// Endpoint that will return the stock recommendation report using Axios request to Finnhub.io (stock in url param :symbol)
app.get('/API/recommendations/:symbol', (req, res) => {
  const stockToGet = req.params.symbol
  finnhubClient.recommendationTrends(stockToGet, (error, data, response) => {
    if(error) {
      console.log(error)
      res.status(500).json('Internal Server Error')
    }
    else {
      res.status(200).json(data[0])
    }
  })
})

// Endpoint that will return the stock earnings report using Axios request to Finnhub.io (stock in url param :symbol)
app.get('/API/earnings/:symbol', (req, res) => {
  const stockToGet = req.params.symbol
  finnhubClient.earningsCalendar({"symbol": stockToGet}, (error, data, response) => {
    if(error) {
      console.log(error)
      res.status(500).json('Internal Server Error')
    }
    else {
      res.status(200).json(data)
    }
  })
})