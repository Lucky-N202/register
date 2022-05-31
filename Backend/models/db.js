const Pool = require('pg').Pool;
const dotenv = require('dotenv');
const path = require('path');
const rootDir = __dirname.slice(0, __dirname.search('models'));

dotenv.config({ path: path.join(rootDir, '.env')});

const devConfig = {
    user: process.env.DBUSER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_LOCALHOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(
    process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = pool;