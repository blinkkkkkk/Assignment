const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const routes = require('../routes/index.route');
const config = require('./config');
const app = express();

if (config.env === 'development') {
    app.use(logger('dev'))
}

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