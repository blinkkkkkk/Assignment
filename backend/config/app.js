const express = require('express');
const cors = require('cors');
const httpError = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const routes = require('../routes/index.route');
const config = require('./config');
const app = express();

const errorHandler = require('../middlewares/errorHandler.middleware'  );
app.use(errorHandler);
if (config.env === 'development') {
    app.use(logger('dev'))
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use('/api', routes);
app.use((req, res, next) => {
    const err = new httpError(404)
    return next(err);
});

app.use((err, req, res, next) => {
    if (err.isJoi) {
        err.message = err.details.map(e => e.message).join("; ");
        err.status = 400;
    }

    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;