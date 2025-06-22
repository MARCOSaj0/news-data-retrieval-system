require('dotenv').config();

module.exports = {
    PROJECT_NAME: process.env.PROJECT_NAME,
    IS_SERVER: process.env.IS_SERVER,
    PORT: Number(process.env.PORT),
    SERVER_CERT: process.env.SERVER_CERT,
    SERVER_KEY: process.env.SERVER_KEY,
    MongoDB_HOST: process.env.MongoDB_HOST,
    MongoDB_URI: process.env.MongoDB_URI,
    GROQ_API_URL: process.env.GROQ_API_URL,
    GROQ_API_KEY: process.env.GROQ_API_KEY
};