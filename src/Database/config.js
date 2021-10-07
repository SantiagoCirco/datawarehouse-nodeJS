const env = process.env;

const DB_CONFIG = {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'data_warehouse',
};


module.exports = { DB_CONFIG };