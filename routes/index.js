const app = require('express')();
const httpConst = require('../config/httpConst');
const { ReS } = require('../service/util');

const healthCheck = require('./healthCheck');
const news = require('./news');

app.use((req, res, next) => {
    if (/\/{2,}/.test(req.url)) {
        console.warn('URL contains multiple slashes', req.url);
        return ReS(res, httpConst.NotFound, 'Resource not found');
    }
    next();
});

app.use('/api/health-check', healthCheck);
app.use('/api/v1/news', news);

module.exports = app;