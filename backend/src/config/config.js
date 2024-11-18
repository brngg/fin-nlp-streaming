require('dotenv').config({ path: '../.env' });

module.exports = {
    port: process.env.PORT,
    questDBUrl: process.env.QUESTDB_URL,            // Normal URL
    questDBUrlSender: process.env.QUESTDB_URL_SENDER // Sender notation
};
