const mongoose = require('mongoose');
const config = require('./config'); 

// Enable Mongoose Debugging
if (config.mongooseDebug) {
    mongoose.set('debug', true); 
}

const connectToDb = async () => {
    try {
        const uri = `mongodb://${config.mongo.host}:${config.mongo.port}`;
        await mongoose.connect(uri, { keepAlive: true });
        console.log(`Successfully connected to the database at ${uri}`);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw new Error(`Unable to connect to database: ${uri}`);
    }
};

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    throw new Error(`Unable to connect to database: ${config.mongo.host}`);
});

connectToDb();