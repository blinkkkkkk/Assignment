const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.host, { keepAlive: true }).then(() => {
    console.log("success coonect to database")
});

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongo.host}`);
});
