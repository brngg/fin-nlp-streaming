const { apiKey_ALPACA, secretKey_ALPACA } = require('../config/config')
const axios = require('axios')

const alpacaClient = axios.create({
    baseURL: "https://data.alpaca.markets/",
    headers: {
        'APCA-API-KEY-ID': apiKey_ALPACA,
        'APCA-API-SECRET-KEY': secretKey_ALPACA,
    }
});

async function getHistoricalAuctions(symbols, start, end) {
    const url = "https://data.alpaca.markets/v2/stocks/auctions";
    const params = {
        symbols,
        start,
        end,
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'APCA-API-KEY-ID': apiKey_ALPACA,
                'APCA-API-SECRET-KEY': secretKey_ALPACA
            },
            params, 
        });

        console.log("CHECK HERE" + response.data);
        return response.data;

    }
    
    catch(error) {
        console.log(error.message);
        throw error;
    }
}

async function getLatestQuotes(symbols, feed) {
    try {
        const response = await alpacaClient.get('v2/stocks/quotes/latest', {
            params: {symbols, feed}
        });

        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

async function getSnapshots(symbols, feed) {
    try {
        const response = await alpacaClient.get('v2/stocks/snapshots', {
            params: {symbols, feed}
        });

        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

async function getHistoricalTrade(symbols, start, end) {
    try {
        const response = await alpacaClient.get('v2/stocks/trades', {
            params: {symbols, start, end}
        });
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

async function getNewsArticles(start, end, symbols) {
    try {
        const response = await alpacaClient.get('v1beta1/news', {
            params : {start, end, symbols}
        });
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

getLatestQuotes('AAPL', 'iex')
