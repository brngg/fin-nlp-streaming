const Alpaca = require("@alpacahq/alpaca-trade-api");

require('dotenv').config({ path: '../.env' });

// Alpaca() requires the API key and sectret to be set, even for crypto
const alpaca = new Alpaca({
    keyId: process.env.ALPACA_API_KEY,       // Directly from environment variables
    secretKey: process.env.ALPACA_API_SECRET // Directly from environment variables
  });

let options = {
    start: "2024-10-01",
    end: "2024-11-17",
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY),
  };

  (async () => {  
    const bars = await alpaca.getCryptoBars(["BTC/USD"], options);
  
    console.table(bars.get("BTC/USD"));
  })();