// server.js
const app = require('./app');
const config = require('./config/config');
const { connectToQuestDB, closeQuestDB } = require('./config/database');
const { insertData } = require('./models/stock');

// Separate server instance
let server;

// Separate shutdown handler
const shutdown = async () => {
    console.log('Shutdown signal received');
    
    try {
        // Close QuestDB connection
        await closeQuestDB();
        console.log('QuestDB connection closed');

        // Close server if it exists
        if (server) {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });

            // Failsafe: force exit after 5 seconds if server.close() hangs
            setTimeout(() => {
                console.log('Forcing shutdown after timeout');
                process.exit(1);
            }, 5000);
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

// Initialize data function
const initializeData = async () => {
    try {
        await insertData();
        console.log("Trade data insertion completed.");
    } catch (error) {
        console.error("Error inserting trade data:", error);
        // You can decide whether to throw the error or just log it
        // throw error; // Uncomment if you want to crash the server on data insertion failure
    }
};

// Server start function
const startServer = async () => {
    try {
        // Connect to QuestDB
        await connectToQuestDB();
        console.log('Successfully connected to QuestDB');

        // Start the server
        server = app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });

        // Initialize data after server starts
        await initializeData();

        return server;
    } catch (error) {
        console.error('Failed to start server:', error);
        throw error;
    }
};

// Register shutdown handlers
const registerShutdownHandlers = () => {
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
};

// Main function to orchestrate startup
const main = async () => {
    try {
        registerShutdownHandlers();
        await startServer();
    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
};

// Start everything
main();

// Export for testing purposes if needed
module.exports = {
    startServer,
    shutdown,
    initializeData
};