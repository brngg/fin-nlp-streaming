/*WebSocket service is constantly receiving data (like stock trades) and passing 
  it directly to the model for processing and insertion into QuestDB 
  
  
  When using HTTP, data is received on-demand through requests like POST, GET, etc. 
  A controller typically handles the incoming HTTP request, performs logic 
  (such as validation or transformation), 
  and then calls the model to interact with the database.
  */



// models/stock.js
const { getSender } = require('../config/database');

async function insertData() {
    const sender = getSender();

    try {
        await sender

            .table('trades')
            .symbol('symbol', 'digger')
            .atNow();

        await sender.flush() 
    } catch (err) {
        console.error("Error inserting", error);
        throw error;
    }
}

module.exports = { 
    insertData,
};

