const express = require('express');
const cors = require('cors');
const https = require('node:https');

const app = express();
const { PORT, PROJECT_NAME, IS_SERVER, SERVER_CERT, SERVER_KEY } = require('./config/index');

const server = https.createServer({
    key: SERVER_KEY,
    cert: SERVER_CERT
}, app);
const db = require('./config/database');

app.use(express.json());

/* cors middleware */
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use('/', require('./routes/index'));

try {
    db();
    server.listen(PORT, () => {
        console.info(`${PROJECT_NAME} application is running on Port-${PORT} & on ${IS_SERVER} server`);
    });
    server.on('error', (err) => {
        console.error('Error at app start', err);
        process.exit(1);
    });
} catch (err) {
    console.error('App startup error', err);
    process.exit(1);
}