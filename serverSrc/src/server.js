const express = require('express')
const MongoDBClient = require('mongodb').MongoClient
const finnhub = require('finnhub')
const axios = require('axios')

import { loginInfo } from '../loginInfo'

const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = loginInfo.finnhubKey
const finnhubClient = new finnhub.DefaultApi()
const mongoCreds = loginInfo.mongoAuth
const app = express()
const port = 9090
const uri = 'mongodb+srv://' + mongoCreds.username + ':' + mongoCreds.password 
            + '@stockmarkettoolcluster.ejvhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())

app.listen(port, () => {
  console.log('Server Up')
})

app.get('/', (req, res) => {
  res.send("Hello, the server is up")
})

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
          res.status(400).json('Internal Server Error')
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

