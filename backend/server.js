const config = require('./config/config');
const app = require('./config/app');
const server = require('http').createServer(app);
require('./config/db')

server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
})

module.exports = app;