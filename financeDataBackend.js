console.log('Hello World');
const apiKey = 'btdehvf48v6r4rftnp00';

const axiosRequest = require('axios');

let requestUrl = 'https://finnhub.io/api/v1/stock/candle?'

let symbol = 'AAPL';
let fromTime = '1572651390';
let toTime = '1575243390';
let resolution = '1';

let request = requestUrl + 'symbol=' + symbol + '&resolution=' + resolution + '&from=' + fromTime + '&to=' + toTime;
request += '&token=' + apiKey;

axiosRequest.get(request)
    .then( response => {
        console.log(response.data);
    })
    .catch( error => {
        console.log(error);
    });


