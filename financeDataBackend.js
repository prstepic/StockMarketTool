// api key for Finnhub.io
const apiKey = '<apiKey-hidden>';

// Setting up an Express server to listen on port 8080
const expressServer = require('express');
const server = expressServer();
const port = 8080;

// Axios will be used to make web GET requests to Finnhub.io
const axiosRequest = require('axios');

// Mongo DB to store user and financtial data for the force
// variables for Mongo DB name, password, username, and url
// connection will fail until proper authentication is added
const database = require('mongodb');
const userDbPassword = '<password-hidden>';
const user = '<user-hidden>';
const dbName = 'userFinancialData';
const clusterUrl = 'mongodb+srv://'+ user + ':' + userDbPassword + 
                    '@stockmarkettoolcluster.ejvhb.mongodb.net/' + dbName + '?retryWrites=true&w=majority';
const dbClient = new database.MongoClient(clusterUrl, {useUnifiedTopology: true});

// Use the express server to listen on the port
server.listen(port, () => {
    console.log('Now accepting connections on port 8080');
});

// When the client makes a request for /financialData
server.get('/financialData', (req, res) => {
    getTickers('US')
    .then( (response) => { // once the request and promise in getTickers is resolved
        // collect all the tickers for the given market
        let listOfTickers = [];
        for(let i = 0; i < response.data.length; i++){
            listOfTickers[i] = response.data[i].symbol;
        }
        // return the list back to the user
        res.send(listOfTickers);
    })
    .catch( (error) => { // catch any errors with the Finnhub.io connection
        res.send("Error: " + error);
    });
});

// if the client makes a request for the root directory
server.get('/', (req,res) => {
    res.send('Server is up and running');
});

// connect to the MongoDB
dbClient.connect()
.then( () => {
    console.log('Database connected');
})
.catch( (error) => { // catch any DB connection errors
    console.log('Error: ' + error);
});

// this function will request all the stocks within a given market
// this will include stock symbols, descriptions, types, and currency
// a list of markets can be found here: https://docs.google.com/spreadsheets/d/1I3pBxjfXB056-g_JYf_6o3Rns3BV2kMGG1nCatb91ls/edit#gid=0
function getTickers(market){
    let requestUrl = 'https://finnhub.io/api/v1/stock/symbol?exchange=' + market + '&token=' + apiKey;
    return axiosRequest.get(requestUrl);
}





