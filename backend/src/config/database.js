// config/database.js
const { Sender } = require("@questdb/nodejs-client");
const config = require("./config");
const axios = require("axios");

let questDBSender;

const isQuestDBRunning = async () => {
    try {
        const response = await axios.get(`${config.questDBUrl}`);
        return response.status === 200;
    } catch (err) {
        console.error("QuestDB is not running or unreachable:", err);
        return false;
    }
};

const connectToQuestDB = async () => {
    try {
        const isRunning = await isQuestDBRunning();
        if (!isRunning) {
            throw new Error("QuestDB is not running");
        }
        questDBSender = Sender.fromConfig(config.questDBUrlSender);
        console.log("Connected to QuestDB");
    } catch (err) {
        console.error("Connection to QuestDB failed:", err.message);
        process.exit(1);
    }
};

// Add this getter function
const getSender = () => {
    if (!questDBSender) {
        throw new Error("QuestDB sender not initialized. Call connectToQuestDB first.");
    }
    return questDBSender;
};

const closeQuestDB = async () => {
    if (questDBSender) {
        try {
            await questDBSender.close();
            console.log("QuestDB connection closed");
            process.exit(0);
        } catch (err) {
            console.error("Error closing QuestDB connection:", err);
            process.exit(1);
        }
    } else {
        console.log("No active QuestDB connection to close");
        process.exit(1);
    }
};

module.exports = {
    isQuestDBRunning,
    connectToQuestDB,
    closeQuestDB,
    getSender  // Make sure to export getSender
};