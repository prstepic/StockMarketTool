const apiKey = '';

const expressServer = require('express');
const server = expressServer();
const port = 8080;
const axiosRequest = require('axios');

server.listen(port, () => {
    console.log('Now accepting connections on port 8080');
});

server.get('/financialData', (req, res) => {
    getFinancialInfo()
    .then( (response) => {
        res.send(response.data);
        console.log(response.data);
    })
    .catch((error) =>{
        res.send('data unavailable');
        console.log(error);
    })
    
});

server.get('/', (req,res) => {
    res.send('Server is up and running');
});

function getFinancialInfo() {
    let requestUrl = 'https://finnhub.io/api/v1/stock/candle?'

    let symbol = 'AAPL';
    let fromTime = '1572651390';
    let toTime = '1575243390';
    let resolution = '1';
    
    let request = requestUrl + 'symbol=' + symbol + '&resolution=' + resolution + '&from=' + fromTime + '&to=' + toTime;
    request += '&token=' + apiKey;
    
    return axiosRequest.get(request);
}



